// Tipos dos dados gerados por scripts/build.mjs (public/data/).
// Vocabulário: a trilha tem MÓDULOS; um módulo com material tem SEÇÕES; cada
// seção tem AULAS e MATERIAIS (revisão, glossário, flashcards, simulado).
// O exame tem SEÇÕES DO EXAME (as 6 do guia oficial), que não se confundem com
// as seções de um módulo.

import type { TipoMaterial } from "../../shared/contrato"

export type { TipoMaterial }

export type Material = { tipo: TipoMaterial; total?: number }

/** Item da ementa da seção na plataforma (vídeo, lab, quiz, reading). */
export type ItemDaEmenta = { id: string; titulo: string; tipo: string; estrelas: number }

export type Secao = { n: number; titulo: string; nota: string; itens: ItemDaEmenta[]; aulas: string[]; materiais: Material[] }

export type Aula = {
  id: string
  secao: number
  titulo: string
  data: string
  resumo: string
  transcricao: boolean
  tema?: string
  duracao?: string
}

export type Modulo = {
  n: number
  titulo: string
  duracao: string
  nomeCurto: string
  /** true quando o módulo já tem resumos, flashcards e simulados */
  material: boolean
  /** questões do banco do exame ligadas a este módulo */
  questoes: number
  armadilhas?: boolean
  secoes?: Secao[]
  aulas?: Aula[]
}

/** Módulo que já tem material: seções e aulas sempre presentes. */
export type ModuloComMaterial = Modulo & { material: true; secoes: Secao[]; aulas: Aula[] }
export const temMaterial = (m: Modulo | undefined): m is ModuloComMaterial => !!m?.material && !!m.secoes && !!m.aulas

export type SecaoDoExame = { n: number; titulo: string; peso: number | null; subsecoes: { id: string; titulo: string }[] }

export type Site = {
  geradoEm: string
  /** acerto mínimo (%) para marcar o exame, regra da turma */
  metaExame: number
  stats: { aulas: number; flashcards: number; simulado: number; questoes: number; modulosComMaterial: number }
  modulos: Modulo[]
  secoesExame: SecaoDoExame[]
  docs: { id: string; title: string; route: string; kind: string }[]
}

export type Doc = { id: string; title: string; route: string; kind: string; summary?: string; md: string }

export type Cartao = { q: string; a: string }
export type Baralho = { titulo: string; blocos: { titulo: string; cards: Cartao[] }[] }

export type Alternativa = { l: string; t: string }

export type Simulado = {
  titulo: string
  intro: string
  fechamento: string
  questoes: { n: number; parte: string; enunciado: string; opcoes: Alternativa[]; resposta: string | null; explicacao: string }[]
}

export type Dificuldade = "fácil" | "média" | "difícil"

export type QuestaoDoExame = {
  id: string
  secao: number
  sub: string
  modulo: number
  dif: Dificuldade
  enunciado: string
  opcoes: Alternativa[]
  resposta: string[]
  nota: string
  explicacao: string
  conceitos: string
  nomeAtual: string
}

export type BancoDeQuestoes = { secoes: SecaoDoExame[]; questoes: QuestaoDoExame[] }

/** Entrada do índice de busca (chaves curtas para o arquivo ficar leve). */
export type EntradaDeBusca = { r: string; t: string; h: string; a: string; k: string; x: string }

export type MaterialDaTurma = { titulo: string; categoria: string; descricao: string; url?: string; interno?: string; privado?: string; capitulos?: string[] }
export type MateriaisDaTurma = { metaExame: number; fonte: string; grupos: { titulo: string; itens: MaterialDaTurma[] }[] }

export const ROTULO_MATERIAL: Record<TipoMaterial, { label: string; desc: string }> = {
  revisao: { label: "Revisão", desc: "Roteiro de revisão e armadilhas da seção" },
  glossario: { label: "Glossário", desc: "Termos e serviços do Google Cloud" },
  flashcards: { label: "Flashcards", desc: "Revisão ativa por blocos" },
  simulado: { label: "Simulado", desc: "Questões no estilo da prova" },
}
