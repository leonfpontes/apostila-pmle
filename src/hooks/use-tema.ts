import { useContext } from "react"
import { ContextoDeTema } from "@/lib/tema"

/** Tema atual e a função para alternar entre claro e escuro. */
export const useTema = () => useContext(ContextoDeTema)
