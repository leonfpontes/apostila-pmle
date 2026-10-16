import { useSyncExternalStore } from "react"

// Progresso de estudo salvo só neste navegador (o site não tem login).

type Resultado = { ok: boolean; t: number; sel?: string[] }
export type Progresso = {
  fc: Record<string, Resultado> // flashcards: "c1-m2:bloco:indice"
  sim: Record<string, { best: number; last: number; t: number }> // simulados por módulo
  q: Record<string, Resultado> // banco de questões do exame: "Q63"
  cursos: Record<string, number> // cursos da trilha marcados como concluídos
  aulas: Record<string, number> // aulas marcadas como estudadas: "c1-5.3"
  last?: { route: string; title: string }
}

const KEY = "pmle:v1"
const empty = (): Progresso => ({ fc: {}, sim: {}, q: {}, cursos: {}, aulas: {} })

function read(): Progresso {
  try {
    const raw = localStorage.getItem(KEY)
    return { ...empty(), ...(raw ? JSON.parse(raw) : {}) }
  } catch {
    return empty()
  }
}

let snapshot = read()
const listeners = new Set<() => void>()

export function updateProgress(fn: (p: Progresso) => void) {
  const next = structuredClone(snapshot)
  fn(next)
  snapshot = next
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    /* modo privado: segue só em memória */
  }
  listeners.forEach((l) => l())
}

export function getProgress() {
  return snapshot
}

export function useProgress() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => snapshot
  )
}
