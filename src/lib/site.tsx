import { createContext, useContext } from "react"
import type { Site } from "./data"

export const SiteContext = createContext<Site | null>(null)

export function useSite() {
  const s = useContext(SiteContext)
  if (!s) throw new Error("useSite fora do SiteContext")
  return s
}

export function useCurso(n: number) {
  return useSite().cursos.find((c) => c.n === n)
}
