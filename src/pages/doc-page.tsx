import { useEffect, useRef, useState, type ReactNode } from "react"
import { Link, useLocation, useSearchParams } from "react-router-dom"
import { SearchIcon } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Markdown } from "@/components/markdown"
import { ErrorState, Footer, Loading, Page, PageHeader, type Crumb } from "@/components/page"
import { norm, tituloLimpo, useJSON, type Doc } from "@/lib/data"
import { cn } from "@/lib/utils"

export function useHeadingScroll(ready: boolean) {
  const [params] = useSearchParams()
  const h = params.get("h")
  useEffect(() => {
    if (!ready) return
    if (h) requestAnimationFrame(() => document.getElementById(h)?.scrollIntoView({ block: "start" }))
    else window.scrollTo(0, 0)
  }, [ready, h])
}

function Toc({ container }: { container: HTMLElement | null }) {
  const [items, setItems] = useState<{ id: string; text: string; level: number }[]>([])
  const [active, setActive] = useState("")
  const { pathname } = useLocation()
  useEffect(() => {
    if (!container) return
    const hs = [...container.querySelectorAll<HTMLElement>("h2, h3")]
    setItems(hs.map((h) => ({ id: h.id, text: (h.textContent || "").replace(/⭐+/g, "").trim(), level: +h.tagName[1] })))
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-70px 0px -70% 0px" }
    )
    hs.forEach((h) => obs.observe(h))
    return () => obs.disconnect()
  }, [container])
  if (items.length < 3) return null
  return (
    <nav className="sticky top-20 hidden max-h-[calc(100vh-6rem)] overflow-y-auto border-l pl-4 text-sm xl:block" aria-label="Nesta página">
      <div className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">Nesta página</div>
      {items.map((it) => (
        <Link
          key={it.id}
          to={`${pathname}?h=${it.id}`}
          replace
          className={cn(
            "block py-1 leading-snug text-muted-foreground hover:text-primary",
            it.level === 3 && "pl-3 text-[13px]",
            active === it.id && "font-medium text-primary"
          )}
        >
          {it.text}
        </Link>
      ))}
    </nav>
  )
}

function useTableFilter(container: HTMLElement | null, query: string) {
  useEffect(() => {
    if (!container) return
    const terms = norm(query).split(/\s+/).filter(Boolean)
    const match = (el: Element) => terms.every((t) => norm(el.textContent || "").includes(t))
    container.querySelectorAll<HTMLElement>("tbody tr, li").forEach((el) => (el.hidden = !!terms.length && !match(el)))
    container.querySelectorAll<HTMLElement>(".apostila > p, .apostila > blockquote, .apostila > .callout").forEach((el) => (el.hidden = !!terms.length && !match(el)))
    container.querySelectorAll<HTMLElement>(".table-wrap").forEach((tw) => {
      tw.hidden = !!terms.length && ![...tw.querySelectorAll<HTMLElement>("tbody tr")].some((tr) => !tr.hidden)
    })
  }, [container, query])
}

export function DocPage({
  id,
  crumbs = [],
  toc = true,
  filter = false,
  title,
  sub,
  tabs,
  before,
  after,
  narrow,
}: {
  id: string
  crumbs?: Crumb[]
  toc?: boolean
  filter?: boolean
  title?: string
  sub?: ReactNode
  tabs?: ReactNode
  before?: ReactNode
  after?: ReactNode
  narrow?: boolean
}) {
  const { data: doc, error } = useJSON<Doc>(`docs/${id}.json`)
  const [el, setEl] = useState<HTMLDivElement | null>(null)
  const [q, setQ] = useState("")
  const ref = useRef<HTMLDivElement>(null)
  useHeadingScroll(!!doc)
  useTableFilter(el, q)
  useEffect(() => {
    if (doc) document.title = `${tituloLimpo(doc.title)} · Apostila PMLE`
  }, [doc])
  useEffect(() => setQ(""), [id])

  if (error) return <ErrorState error={error} />
  if (!doc) return <Loading />
  const t = title ?? tituloLimpo(doc.title)
  return (
    <Page narrow={narrow} className={toc ? "xl:max-w-6xl" : undefined}>
      <PageHeader crumbs={[...crumbs, [t]]} kicker={doc.kind} title={t} sub={sub} />
      {tabs}
      {before}
      {filter && (
        <InputGroup className="mb-6 h-10 max-w-xl">
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput placeholder="Filtrar termos, linhas de tabela e itens…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Filtrar" />
        </InputGroup>
      )}
      <div className={cn("grid grid-cols-[minmax(0,1fr)] gap-10", toc && "xl:grid-cols-[minmax(0,1fr)_220px]")}>
        <div ref={(n) => { ref.current = n; setEl(n) }} key={id}>
          <Markdown>{doc.md}</Markdown>
        </div>
        {toc && <Toc container={el} key={`toc-${id}`} />}
      </div>
      {after}
      <Footer />
    </Page>
  )
}
