import { useEffect, useMemo, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { SearchIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Footer, Page, PageHeader } from "@/components/page"
import { entryRoute, searchIndex } from "@/components/site-header"
import { loadJSON, norm, plural, type SearchEntry } from "@/lib/data"

function Snippet({ text, terms }: { text: string; terms: string[] }) {
  const n = norm(text)
  const at = Math.max(0, n.indexOf(terms[0]) - 80)
  const s = (at > 0 ? "…" : "") + text.slice(at, at + 240) + (at + 240 < text.length ? "…" : "")
  // destaca ignorando acentos (o texto normalizado tem o mesmo comprimento para PT-BR)
  const ns = norm(s)
  const marks: [number, number][] = []
  for (const t of terms) {
    let i = ns.indexOf(t)
    while (i >= 0) {
      marks.push([i, i + t.length])
      i = ns.indexOf(t, i + t.length)
    }
  }
  marks.sort((a, b) => a[0] - b[0])
  const out: (string | React.ReactElement)[] = []
  let cur = 0
  marks.forEach(([a, b], k) => {
    if (a < cur) return
    out.push(s.slice(cur, a), <mark key={k}>{s.slice(a, b)}</mark>)
    cur = b
  })
  out.push(s.slice(cur))
  return <>{out}</>
}

export function BuscaPage() {
  const [params, setParams] = useSearchParams()
  const [q, setQ] = useState(params.get("q") || "")
  const [index, setIndex] = useState<SearchEntry[] | null>(null)
  useEffect(() => {
    document.title = "Busca · Apostila PMLE"
    loadJSON<SearchEntry[]>("search.json").then(setIndex)
  }, [])
  useEffect(() => {
    const t = setTimeout(() => setParams(q ? { q } : {}, { replace: true }), 200)
    return () => clearTimeout(t)
  }, [q, setParams])
  const terms = norm(q).split(/\s+/).filter((t) => t.length > 1)
  const hits = useMemo(() => searchIndex(index || [], q), [index, q])

  return (
    <Page narrow>
      <PageHeader crumbs={[["Busca"]]} title="Buscar no material" />
      <InputGroup className="mb-6 h-11">
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput autoFocus placeholder="Ex.: recall, Feature Store, TPU, one-hot…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Buscar" />
      </InputGroup>
      {!terms.length ? (
        <p className="text-muted-foreground">Digite pelo menos duas letras.</p>
      ) : !index ? (
        <p className="text-muted-foreground">Carregando o índice…</p>
      ) : !hits.length ? (
        <p className="py-10 text-center text-muted-foreground">Nada encontrado. Tente outra palavra.</p>
      ) : (
        <>
          <p className="mb-3 text-sm text-muted-foreground">{plural(hits.length, "resultado", "resultados")}</p>
          <div className="grid gap-2.5">
            {hits.slice(0, 60).map(({ r }, i) => (
              <Link key={i} to={entryRoute(r)} className="rounded-xl border bg-card p-4 transition-colors hover:border-primary">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">{r.k}</Badge>
                  <span className="font-semibold">{r.t.replace(/^Google AI\/ML — /, "")}</span>
                </div>
                {r.h && <div className="mt-1 text-sm text-primary">{r.h.replace(/⭐+/g, "")}</div>}
                <div className="mt-1 text-sm text-muted-foreground">
                  <Snippet text={r.x} terms={terms} />
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
      <Footer />
    </Page>
  )
}
