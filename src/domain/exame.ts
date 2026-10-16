// Regras do banco de questões do exame: filtros, montagem de rodadas e prontidão.

import type { DadosDeProgresso } from "./progresso"
import type { BancoDeQuestoes, Dificuldade, QuestaoDoExame } from "./tipos"
import { embaralhar, percentual } from "@/lib/texto"

export const MINIMO_PARA_PRONTIDAO = 100 // questões respondidas antes de avaliar a prontidão

export type FiltrosDoBanco = {
  secao: number | "todas"
  modulo: number | "todos"
  dificuldade: Dificuldade | "todas"
  situacao: "todas" | "novas" | "erradas"
  quantidade: number | "todas"
}

export const FILTROS_PADRAO: FiltrosDoBanco = { secao: "todas", modulo: "todos", dificuldade: "todas", situacao: "todas", quantidade: 20 }

export function filtrar(banco: BancoDeQuestoes, f: FiltrosDoBanco, progresso: DadosDeProgresso) {
  return banco.questoes.filter((q) => {
    const r = progresso.q[q.id]
    return (
      (f.secao === "todas" || q.secao === f.secao) &&
      (f.modulo === "todos" || q.modulo === f.modulo) &&
      (f.dificuldade === "todas" || q.dif === f.dificuldade) &&
      (f.situacao === "todas" || (f.situacao === "novas" ? !r : !!r && !r.ok))
    )
  })
}

/**
 * Sorteia a rodada. Sem seção escolhida e com menos questões que o filtro,
 * respeita o peso de cada seção na prova (como no exame real).
 */
export function montarRodada(banco: BancoDeQuestoes, candidatas: QuestaoDoExame[], f: FiltrosDoBanco): QuestaoDoExame[] {
  const n = f.quantidade === "todas" ? candidatas.length : f.quantidade
  if (f.secao !== "todas" || n >= candidatas.length) return embaralhar(candidatas).slice(0, n)
  const pesoTotal = banco.secoes.reduce((s, x) => s + (x.peso || 0), 0)
  const escolhidas: QuestaoDoExame[] = []
  for (const secao of banco.secoes) {
    const cota = Math.round((n * (secao.peso || 0)) / pesoTotal)
    escolhidas.push(...embaralhar(candidatas.filter((q) => q.secao === secao.n)).slice(0, cota))
  }
  const sobras = embaralhar(candidatas.filter((q) => !escolhidas.includes(q)))
  while (escolhidas.length < n && sobras.length) escolhidas.push(sobras.pop()!)
  return embaralhar(escolhidas.slice(0, n))
}

/** Pronto para marcar a prova: respondeu o mínimo e está acima da meta da turma. */
export function prontidao(banco: BancoDeQuestoes, progresso: DadosDeProgresso, meta: number) {
  const ids = new Set(banco.questoes.map((q) => q.id))
  const respondidas = Object.keys(progresso.q).filter((id) => ids.has(id))
  const acertos = respondidas.filter((id) => progresso.q[id].ok).length
  const taxa = percentual(acertos, respondidas.length)
  return { respondidas: respondidas.length, taxa, pronto: respondidas.length >= MINIMO_PARA_PRONTIDAO && taxa >= meta }
}

/** Desempenho por seção do exame. */
export function desempenhoPorSecao(banco: BancoDeQuestoes, progresso: DadosDeProgresso) {
  return banco.secoes.map((s) => {
    const questoes = banco.questoes.filter((q) => q.secao === s.n)
    const respondidas = questoes.filter((q) => progresso.q[q.id])
    return { ...s, total: questoes.length, respondidas: respondidas.length, acertos: respondidas.filter((q) => progresso.q[q.id].ok).length }
  })
}
