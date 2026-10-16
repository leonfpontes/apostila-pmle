import { useParams } from "react-router-dom"
import { docIds } from "../../shared/contrato"
import { migalhasDoModulo } from "@/features/secao/use-secao"
import { PaginaDeDocumento } from "./documento"

/** Armadilhas e cheat-sheet do módulo, com filtro de termos. */
export function PaginaDeArmadilhas() {
  const n = Number(useParams().n)
  return <PaginaDeDocumento id={docIds.armadilhas(n)} migalhas={migalhasDoModulo(n)} filtro />
}
