import { useCallback, useMemo, useState } from "react"
import type { ReactNode } from "react"
import type { Alternativa } from "@/domain/tipos"
import { percentual } from "@/lib/texto"

// Estado e regras do quiz, separados da tela. Usado pelos simulados das seções
// e pelo banco de questões do exame.

export type QuestaoDoQuiz = {
  id: string | number
  rotulo?: string
  enunciado: string
  alternativas: Alternativa[]
  /** letras corretas; vazio = questão aberta (autoavaliação) ou sem gabarito */
  gabarito: string[]
  explicacao: string
  meta?: ReactNode
  extra?: ReactNode
  idioma?: string
}

export type Modo = "estudo" | "prova"
export type Resposta = { sel: string[]; respondida: boolean; certa: boolean | null }
export type ResultadoDoQuiz = { acertos: number; total: number; nota: number; erradas: { questao: QuestaoDoQuiz; indice: number }[] }

export const ehAberta = (q: QuestaoDoQuiz) => q.alternativas.length === 0
export const ehMultipla = (q: QuestaoDoQuiz) => q.gabarito.length > 1
const acertou = (q: QuestaoDoQuiz, sel: string[]) => q.gabarito.length === sel.length && q.gabarito.every((l) => sel.includes(l))
const respostasVazias = (n: number): Resposta[] => Array.from({ length: n }, () => ({ sel: [], respondida: false, certa: null }))

export function useQuiz(inicial: QuestaoDoQuiz[], aoResponder?: (q: QuestaoDoQuiz, certa: boolean, sel: string[]) => void) {
  const [questoes, setQuestoes] = useState(inicial)
  const [respostas, setRespostas] = useState(() => respostasVazias(inicial.length))
  const [indice, setIndice] = useState(0)
  const [modo, setModo] = useState<Modo>("estudo")
  const [finalizado, setFinalizado] = useState(false)

  const questao = questoes[indice]
  const resposta = respostas[indice]
  const mostrarCorrecao = modo === "estudo" && resposta.respondida

  const atualizar = useCallback((k: number, parcial: Partial<Resposta>) => setRespostas((r) => r.map((x, j) => (j === k ? { ...x, ...parcial } : x))), [])

  function corrigir(sel: string[]) {
    const certa = questao.gabarito.length ? acertou(questao, sel) : null
    atualizar(indice, { sel, respondida: true, certa })
    if (certa !== null) aoResponder?.(questao, certa, sel)
  }

  function escolher(letra: string) {
    if (mostrarCorrecao) return
    if (!ehMultipla(questao)) return corrigir([letra])
    const sel = (resposta.sel.includes(letra) ? resposta.sel.filter((x) => x !== letra) : [...resposta.sel, letra].slice(-questao.gabarito.length)).sort()
    if (modo === "prova" && sel.length === questao.gabarito.length) corrigir(sel)
    else atualizar(indice, { sel, respondida: false })
  }

  const confirmarMultipla = () => corrigir(resposta.sel)
  const revelarAberta = () => atualizar(indice, { respondida: true })
  const autoavaliar = (certa: boolean) => atualizar(indice, { certa })

  /** Volta ao modo estudo mostrando a correção das já respondidas. */
  function revisar(desde = 0) {
    setModo("estudo")
    setRespostas((r) => r.map((x) => (x.sel.length ? { ...x, respondida: true } : x)))
    setFinalizado(false)
    setIndice(desde)
  }

  function recomecar(lista: QuestaoDoQuiz[] = questoes) {
    setQuestoes(lista)
    setRespostas(respostasVazias(lista.length))
    setIndice(0)
    setFinalizado(false)
  }

  const resultado: ResultadoDoQuiz = useMemo(() => {
    const avaliaveis = questoes.map((questao, indice) => ({ questao, r: respostas[indice], indice })).filter(({ questao }) => questao.gabarito.length || ehAberta(questao))
    const total = avaliaveis.filter(({ questao, r }) => !ehAberta(questao) || r.certa !== null).length
    const acertos = avaliaveis.filter(({ r }) => r.certa).length
    const erradas = avaliaveis.filter(({ questao, r }) => r.certa === false || (!ehAberta(questao) && !r.sel.length))
    return { acertos, total, nota: percentual(acertos, total), erradas }
  }, [questoes, respostas])

  return {
    questoes,
    respostas,
    indice,
    questao,
    resposta,
    modo,
    finalizado,
    mostrarCorrecao,
    resultado,
    respondidas: respostas.filter((x) => x.respondida || x.sel.length).length,
    pendentes: respostas.filter((x, k) => !ehAberta(questoes[k]) && !x.sel.length).length,
    irPara: setIndice,
    setModo,
    escolher,
    confirmarMultipla,
    revelarAberta,
    autoavaliar,
    finalizar: () => setFinalizado(true),
    revisar,
    recomecar,
  }
}

export type EstadoDoQuiz = ReturnType<typeof useQuiz>
