import { memo, type ReactNode } from "react"
import ReactMarkdown, { type Components } from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import { cn } from "@/lib/utils"
import { slugify } from "@/lib/texto"

// Plugin rehype mínimo: dá id (slug) a h2–h4 para o índice lateral e links ?h=
type HNode = { type: string; tagName?: string; value?: string; properties?: Record<string, unknown>; children?: HNode[] }
const textOf = (n: HNode): string => (n.type === "text" ? n.value || "" : (n.children || []).map(textOf).join(""))
function rehypeHeadingIds() {
  return (tree: HNode) => {
    const used = new Set<string>()
    const walk = (n: HNode) => {
      if (n.type === "element" && /^h[2-4]$/.test(n.tagName || "")) {
        let id = slugify(textOf(n)) || "secao"
        while (used.has(id)) id += "-"
        used.add(id)
        n.properties = { ...n.properties, id }
      }
      n.children?.forEach(walk)
    }
    walk(tree)
  }
}

const components: Components = {
  table: ({ children }) => (
    <div className="table-wrap">
      <table>{children}</table>
    </div>
  ),
  a: ({ href, children }) =>
    href?.startsWith("http") ? (
      <a href={href} target="_blank" rel="noopener">
        {children}
      </a>
    ) : (
      <a href={href}>{children}</a>
    ),
}

export const Markdown = memo(function Markdown({ children, className }: { children: string; className?: string }) {
  return (
    <div className={cn("apostila", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeHeadingIds]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  )
})

// Markdown de uma linha (alternativas, cartões): sem parágrafo em volta
const inlineComponents: Components = { ...components, p: ({ children }) => <>{children}</> }
export function MdInline({ children, className }: { children: string; className?: string }): ReactNode {
  return (
    <span className={cn("apostila-inline", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={inlineComponents}>
        {children}
      </ReactMarkdown>
    </span>
  )
}
