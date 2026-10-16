import { createContext, useCallback, useEffect, useState, type ReactNode } from "react"

// Tema claro/escuro: segue o sistema até a pessoa escolher; a escolha fica no
// navegador. As cores de cada tema estão em src/index.css (:root e .dark).
type Tema = "light" | "dark"
const KEY = "pmle:theme"
export const ContextoDeTema = createContext<{ tema: Tema; alternar: () => void }>({ tema: "light", alternar: () => {} })

const systemDark = () => window.matchMedia("(prefers-color-scheme: dark)").matches
function initial(): Tema {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === "light" || saved === "dark") return saved
  } catch {
    /* ignore */
  }
  return systemDark() ? "dark" : "light"
}

export function ProvedorDeTema({ children }: { children: ReactNode }) {
  const [tema, setTema] = useState<Tema>(initial)
  useEffect(() => {
    document.documentElement.classList.toggle("dark", tema === "dark")
  }, [tema])
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => {
      try {
        if (localStorage.getItem(KEY)) return
      } catch {
        /* ignore */
      }
      setTema(mq.matches ? "dark" : "light")
    }
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])
  const alternar = useCallback(() => {
    setTema((t) => {
      const next = t === "dark" ? "light" : "dark"
      try {
        localStorage.setItem(KEY, next)
      } catch {
        /* ignore */
      }
      return next
    })
  }, [])
  return <ContextoDeTema.Provider value={{ tema, alternar }}>{children}</ContextoDeTema.Provider>
}

