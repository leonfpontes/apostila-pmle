import type { EntradaDeBusca } from "@/domain/tipos"
import { normalizar } from "./texto"

// Busca no índice gerado pelo build (search.json). Usada pela busca rápida
// (Ctrl K) e pela página de busca.

const PESO_TITULO = 6
const PESO_SECAO = 4
const MAX_OCORRENCIAS = 5

export const termosDaBusca = (consulta: string) =>
  normalizar(consulta)
    .split(/\s+/)
    .filter((t) => t.length > 1)

/** Entradas que contêm todos os termos, das mais relevantes para as menos. */
export function buscar(indice: EntradaDeBusca[], consulta: string) {
  const termos = termosDaBusca(consulta)
  if (!termos.length) return []
  const achados: { entrada: EntradaDeBusca; pontos: number }[] = []
  for (const entrada of indice) {
    const t = normalizar(entrada.t)
    const h = normalizar(entrada.h)
    const x = normalizar(entrada.x)
    if (!termos.every((w) => t.includes(w) || h.includes(w) || x.includes(w))) continue
    let pontos = 0
    for (const w of termos) pontos += (t.includes(w) ? PESO_TITULO : 0) + (h.includes(w) ? PESO_SECAO : 0) + Math.min(x.split(w).length - 1, MAX_OCORRENCIAS)
    if (entrada.k === "Questão do exame") pontos -= 2 // questões são muitas; aulas e glossários vêm antes
    achados.push({ entrada, pontos })
  }
  return achados.sort((a, b) => b.pontos - a.pontos).map((a) => a.entrada)
}

/** Rota do resultado, já com a âncora do título quando houver. */
export function destinoDoResultado(e: EntradaDeBusca) {
  const rota = e.r.replace(/^#/, "")
  return e.a ? `${rota}${rota.includes("?") ? "&" : "?"}h=${e.a}` : rota
}

/** Trecho de ~240 caracteres em volta do primeiro termo, com as posições dos termos para destacar. */
export function trecho(texto: string, termos: string[]) {
  const inicio = Math.max(0, normalizar(texto).indexOf(termos[0]) - 80)
  const s = (inicio > 0 ? "…" : "") + texto.slice(inicio, inicio + 240) + (inicio + 240 < texto.length ? "…" : "")
  const ns = normalizar(s)
  const marcas: [number, number][] = []
  for (const t of termos) for (let i = ns.indexOf(t); i >= 0; i = ns.indexOf(t, i + t.length)) marcas.push([i, i + t.length])
  marcas.sort((a, b) => a[0] - b[0])
  const partes: { texto: string; marcado: boolean }[] = []
  let cursor = 0
  for (const [a, b] of marcas) {
    if (a < cursor) continue
    partes.push({ texto: s.slice(cursor, a), marcado: false }, { texto: s.slice(a, b), marcado: true })
    cursor = b
  }
  partes.push({ texto: s.slice(cursor), marcado: false })
  return partes
}
