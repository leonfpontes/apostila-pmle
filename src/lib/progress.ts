import { useSyncExternalStore } from "react"

// Progresso de estudo salvo só neste navegador (o site não tem login).

type Resultado = { ok: boolean; t: number; sel?: string[] }
export type Progresso = {
  fc: Record<string, Resultado> // flashcards: "c1-m2:bloco:indice"
  sim: Record<string, { best: number; last: number; t: number }> // simulados por módulo
  q: Record<string, Resultado> // banco de questões do exame: "Q63"
  cursos: Record<string, number> // cursos da trilha marcados como concluídos
  aulas: Record<string, number> // aulas marcadas como estudadas: "c1-5.3"
  vistos: Record<string, number> // revisão/glossário do módulo aberto: "c1-m2"
  nome?: string // como o aluno quer ser chamado (opcional, só local)
  last?: { route: string; title: string }
}

const KEY = "pmle:v1"
const empty = (): Progresso => ({ fc: {}, sim: {}, q: {}, cursos: {}, aulas: {}, vistos: {} })

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

// Exportar/importar: como não há login, é assim que o aluno leva o progresso para outro dispositivo.
export function exportProgress() {
  const blob = new Blob([JSON.stringify({ app: "apostila-pmle", versao: 1, exportadoEm: new Date().toISOString(), progresso: snapshot }, null, 2)], {
    type: "application/json",
  })
  const a = document.createElement("a")
  a.href = URL.createObjectURL(blob)
  a.download = `progresso-apostila-pmle-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(a.href)
}

export async function importProgress(file: File) {
  const data = JSON.parse(await file.text())
  const p = data?.progresso
  if (data?.app !== "apostila-pmle" || !p || typeof p !== "object") throw new Error("Este arquivo não é um progresso exportado da apostila.")
  updateProgress((cur) => {
    Object.assign(cur, empty(), p)
  })
}

export function resetProgress() {
  updateProgress((cur) => {
    const nome = cur.nome
    Object.assign(cur, empty(), { nome })
    delete cur.last
  })
}
