import { useParams } from "react-router-dom"
import { rotas } from "../../../shared/contrato"
import type { Migalha } from "@/components/shared/pagina"
import { temMaterial, type ModuloComMaterial, type Secao } from "@/domain/tipos"
import { useModulo } from "@/lib/site"

// Leitura dos parâmetros da rota e migalhas das páginas de dentro de um módulo.

/** Módulo e seção a partir da URL (/modulo/:n/secao/:s). Retorna undefined se não existirem. */
export function useSecaoDaRota(): { modulo?: ModuloComMaterial; secao?: Secao } {
  const params = useParams()
  const modulo = useModulo(Number(params.n))
  if (!temMaterial(modulo)) return {}
  return { modulo, secao: modulo.secoes.find((s) => s.n === Number(params.s)) }
}

export const migalhasDoModulo = (n: number): Migalha[] => [
  ["Trilha", rotas.trilha()],
  [`Módulo ${n}`, rotas.modulo(n)],
]

export const migalhasDaSecao = (n: number, s: number): Migalha[] => [...migalhasDoModulo(n), [`Seção ${s}`, rotas.secao(n, s)]]
