import { useEffect, useState } from "react"

// Tipos dos JSON gerados por scripts/build.mjs em public/data/

export type Material = { tipo: "revisao" | "glossario" | "flashcards" | "simulado"; total?: number }
export type ItemModulo = { id: string; titulo: string; tipo: string; estrelas: number }
export type Modulo = { n: number; titulo: string; nota: string; itens: ItemModulo[]; aulas: string[]; materiais: Material[] }
export type Aula = { id: string; modulo: number; titulo: string; data: string; resumo: string; transcricao: boolean }
export type Curso = {
  n: number
  titulo: string
  duracao: string
  nomeCurto: string
  material: boolean
  questoes: number
  armadilhas?: boolean
  modulos?: Modulo[]
  aulas?: Aula[]
}
export type Secao = { n: number; titulo: string; peso: number | null; subsecoes: { id: string; titulo: string }[] }
export type Site = {
  geradoEm: string
  stats: { aulas: number; flashcards: number; simulado: number; questoes: number; cursosComMaterial: number }
  cursos: Curso[]
  secoes: Secao[]
  docs: { id: string; title: string; route: string; kind: string }[]
}
export type Doc = { id: string; title: string; route: string; kind: string; summary?: string; md: string }
export type Deck = { titulo: string; blocos: { titulo: string; cards: { q: string; a: string }[] }[] }
export type Opcao = { l: string; t: string }
export type Simulado = {
  titulo: string
  intro: string
  fechamento: string
  questoes: { n: number; parte: string; enunciado: string; opcoes: Opcao[]; resposta: string | null; explicacao: string }[]
}
export type QuestaoPMLE = {
  id: string
  secao: number
  sub: string
  curso: number
  dif: "fácil" | "média" | "difícil"
  enunciado: string
  opcoes: Opcao[]
  resposta: string[]
  nota: string
  explicacao: string
  conceitos: string
  nomeAtual: string
}
export type Banco = { secoes: Secao[]; questoes: QuestaoPMLE[] }
export type SearchEntry = { r: string; t: string; h: string; a: string; k: string; x: string }

const cache = new Map<string, Promise<unknown>>()

export function loadJSON<T>(path: string): Promise<T> {
  if (!cache.has(path)) {
    cache.set(
      path,
      fetch(`${import.meta.env.BASE_URL}data/${path}`).then((r) => {
        if (!r.ok) throw new Error(`Não consegui carregar ${path} (${r.status})`)
        return r.json()
      })
    )
  }
  return cache.get(path) as Promise<T>
}

export function useJSON<T>(path: string | null) {
  const [state, setState] = useState<{ path: string | null; data?: T; error?: Error }>({ path })
  useEffect(() => {
    if (!path) return
    let alive = true
    loadJSON<T>(path).then(
      (data) => alive && setState({ path, data }),
      (error: Error) => alive && setState({ path, error })
    )
    return () => {
      alive = false
    }
  }, [path])
  const fresh = state.path === path
  return { data: fresh ? state.data : undefined, error: fresh ? state.error : undefined, loading: fresh ? !state.data && !state.error : true }
}

export const MATERIAIS = {
  revisao: { label: "Revisão", desc: "Roteiro de revisão e armadilhas do módulo" },
  glossario: { label: "Glossário", desc: "Termos e serviços do Google Cloud" },
  flashcards: { label: "Flashcards", desc: "Revisão espaçada por blocos" },
  simulado: { label: "Simulado", desc: "Questões no estilo da prova" },
} as const

export const tituloLimpo = (t: string) => t.replace(/^Google AI\/ML — /, "")

export const norm = (s: string) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()

export const slugify = (s: string) =>
  norm(s)
    .replace(/<[^>]+>/g, "")
    .replace(/[*_`~[\]()]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")

export function shuffle<T>(a: T[]): T[] {
  const b = [...a]
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[b[i], b[j]] = [b[j], b[i]]
  }
  return b
}

export const pct = (a: number, b: number) => (b ? Math.round((a / b) * 100) : 0)
export const plural = (n: number, s: string, p: string) => `${n} ${n === 1 ? s : p}`
