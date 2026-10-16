import { useEffect } from "react"

/** Abre a busca com Ctrl K / Cmd K ou "/" (fora de campos de texto). */
export function useAtalhoDeBusca(abrir: () => void) {
  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      const emCampo = (e.target as HTMLElement).matches("input, textarea, select")
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !emCampo)) {
        e.preventDefault()
        abrir()
      }
    }
    document.addEventListener("keydown", aoTeclar)
    return () => document.removeEventListener("keydown", aoTeclar)
  }, [abrir])
}
