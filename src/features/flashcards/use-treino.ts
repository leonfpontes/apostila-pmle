import { useCallback, useEffect, useMemo, useState } from "react"
import { progresso, ProgressStore } from "@/domain/progresso"
import type { Baralho } from "@/domain/tipos"
import { embaralhar } from "@/lib/texto"

// Lógica do treino de flashcards: filtro por bloco, fila, virar e registrar.

export type CartaoNaFila = { q: string; a: string; bloco: number; chave: string }
export type Filtro = "todos" | number

export function useTreino(baralho: Baralho, modulo: number, secao: number) {
  const todos = useMemo<CartaoNaFila[]>(
    () => baralho.blocos.flatMap((b, bi) => b.cards.map((c, ci) => ({ ...c, bloco: bi, chave: ProgressStore.chaves.cartao(modulo, secao, bi, ci) }))),
    [baralho, modulo, secao]
  )
  const [filtro, setFiltro] = useState<Filtro>("todos")
  const [soPendentes, setSoPendentes] = useState(false)
  const [aleatorio, setAleatorio] = useState(true)
  const [fila, setFila] = useState<CartaoNaFila[]>([])
  const [posicao, setPosicao] = useState(0)
  const [virado, setVirado] = useState(false)
  const [placar, setPlacar] = useState({ certos: 0, errados: 0 })

  const montarFila = useCallback(
    (opcoes: Partial<{ filtro: Filtro; soPendentes: boolean; aleatorio: boolean }> = {}) => {
      const f = opcoes.filtro ?? filtro
      const pendentes = opcoes.soPendentes ?? soPendentes
      const misturar = opcoes.aleatorio ?? aleatorio
      let cartoes = f === "todos" ? todos : todos.filter((c) => c.bloco === f)
      if (pendentes) cartoes = cartoes.filter((c) => !progresso.dados.fc[c.chave]?.ok)
      setFila(misturar ? embaralhar(cartoes) : cartoes)
      setPosicao(0)
      setVirado(false)
      setPlacar({ certos: 0, errados: 0 })
    },
    [todos, filtro, soPendentes, aleatorio]
  )

  useEffect(() => {
    montarFila()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos])

  const responder = useCallback(
    (certo: boolean) => {
      const cartao = fila[posicao]
      if (!cartao) return
      progresso.registrarCartao(cartao.chave, certo)
      setPlacar((p) => (certo ? { ...p, certos: p.certos + 1 } : { ...p, errados: p.errados + 1 }))
      setPosicao((p) => p + 1)
      setVirado(false)
    },
    [fila, posicao]
  )

  const andar = useCallback(
    (passo: number) => {
      setPosicao((p) => Math.min(Math.max(p + passo, 0), fila.length))
      setVirado(false)
    },
    [fila.length]
  )

  return {
    todos,
    fila,
    posicao,
    cartao: fila[posicao] as CartaoNaFila | undefined,
    virado,
    placar,
    filtro,
    soPendentes,
    aleatorio,
    virar: () => setVirado((v) => !v),
    responder,
    andar,
    filtrar: (f: Filtro) => (setFiltro(f), montarFila({ filtro: f })),
    alternarPendentes: (v: boolean) => (setSoPendentes(v), montarFila({ soPendentes: v })),
    alternarAleatorio: (v: boolean) => (setAleatorio(v), montarFila({ aleatorio: v })),
    recomecar: () => montarFila(),
    zerar: () => (progresso.limparCartoes(todos.map((c) => c.chave)), montarFila()),
  }
}

export type EstadoDoTreino = ReturnType<typeof useTreino>
