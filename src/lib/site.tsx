import { createContext, useContext, useEffect } from "react"
import { temMaterial, type Site } from "@/domain/tipos"

// Dados globais do site (site.json), disponíveis para qualquer componente.

export const SiteContext = createContext<Site | null>(null)

export function useSite() {
  const site = useContext(SiteContext)
  if (!site) throw new Error("useSite precisa estar dentro de <SiteContext.Provider>")
  return site
}

export function useModulo(n: number) {
  return useSite().modulos.find((m) => m.n === n)
}

/** O primeiro módulo da trilha que já tem material (hoje, o módulo 1). */
export function usePrimeiroModuloComMaterial() {
  return useSite().modulos.find(temMaterial)!
}

/** Título da aba do navegador; com `topo`, a página volta ao início ao abrir. */
export function useTituloDaPagina(titulo: string | undefined, { topo = true } = {}) {
  useEffect(() => {
    document.title = titulo ? `${titulo} · Apostila PMLE` : "Apostila PMLE · ATRA"
  }, [titulo])
  useEffect(() => {
    if (topo) window.scrollTo(0, 0)
  }, [topo, titulo])
}
