// Funções puras de texto e números usadas em várias telas.

/** Minúsculas e sem acentos, para comparar textos. */
export const normalizar = (s: string) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()

/** Mesmo slug do build (scripts/lib/markdown.mjs): âncoras de títulos. */
export const slugify = (s: string) =>
  normalizar(s)
    .replace(/<[^>]+>/g, "")
    .replace(/[*_`~[\]()]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")

export const percentual = (parte: number, total: number) => (total ? Math.round((parte / total) * 100) : 0)

export const plural = (n: number, singular: string, pluralForm: string) => `${n} ${n === 1 ? singular : pluralForm}`

export function embaralhar<T>(lista: T[]): T[] {
  const copia = [...lista]
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia
}

/** Tira marcações de Markdown para mostrar um trecho como texto. */
export const semMarkdown = (s: string) =>
  String(s || "")
    .replace(/[*_`#>]/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim()
