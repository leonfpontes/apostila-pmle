import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTheme } from "@/lib/theme"
import { FileTextIcon, MoonIcon, SearchIcon, SunIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Kbd } from "@/components/kbd"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { loadJSON, norm, type SearchEntry } from "@/lib/data"
import { useSite } from "@/lib/site"

export function SiteHeader() {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !(e.target as HTMLElement).matches("input, textarea, select"))) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b bg-background/85 px-3 backdrop-blur md:px-4">
      <SidebarTrigger aria-label="Abrir ou fechar o menu" />
      <Separator orientation="vertical" className="mr-1 h-5!" />
      <Button
        variant="outline"
        className="h-9 flex-1 justify-start gap-2 text-muted-foreground md:max-w-md"
        onClick={() => setOpen(true)}
      >
        <SearchIcon />
        <span className="truncate">Buscar em todo o material…</span>
        <Kbd className="ml-auto hidden sm:inline-flex">Ctrl K</Kbd>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="ml-auto"
        aria-label="Alternar tema claro/escuro"
        onClick={toggle}
      >
        {theme === "dark" ? <MoonIcon /> : <SunIcon />}
      </Button>
      <SearchDialog open={open} onOpenChange={setOpen} />
    </header>
  )
}

function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const site = useSite()
  const navigate = useNavigate()
  const [index, setIndex] = useState<SearchEntry[] | null>(null)
  const [q, setQ] = useState("")

  useEffect(() => {
    if (open && !index) loadJSON<SearchEntry[]>("search.json").then(setIndex)
  }, [open, index])

  const results = useMemo(() => searchIndex(index || [], q).slice(0, 30), [index, q])
  const go = (to: string) => {
    onOpenChange(false)
    navigate(to)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} title="Buscar" description="Busque em aulas, glossários, flashcards e questões">
      <Command shouldFilter={false}>
      <CommandInput placeholder="Ex.: recall, Feature Store, TPU, one-hot…" value={q} onValueChange={setQ} />
      <CommandList className="max-h-[60vh]">
        <CommandEmpty>{q.trim().length < 2 ? "Digite pelo menos duas letras." : "Nada encontrado."}</CommandEmpty>
        {q.trim().length < 2 ? (
          <CommandGroup heading="Atalhos">
            {[
              ["/trilha", "Trilha dos 15 cursos"],
              ["/questoes", `Banco de ${site.stats.questoes} questões`],
              ["/flashcards", "Flashcards"],
              ["/simulados", "Simulados dos módulos"],
              ["/curso/1/armadilhas", "Armadilhas e cheat-sheet do curso 1"],
            ].map(([to, label]) => (
              <CommandItem key={to} value={label} onSelect={() => go(to)}>
                <FileTextIcon />
                {label}
              </CommandItem>
            ))}
          </CommandGroup>
        ) : (
          <CommandGroup heading={`${results.length} resultados`}>
            {results.map(({ r }, i) => (
              <CommandItem key={i} value={`${i}-${r.t}-${r.h}`} onSelect={() => go(entryRoute(r))} className="flex-col items-start gap-0.5">
                <span className="text-xs text-muted-foreground">{r.k}</span>
                <span className="font-medium">{r.t.replace(/^Google AI\/ML — /, "")}</span>
                {r.h && <span className="text-xs text-primary">{r.h.replace(/⭐+/g, "")}</span>}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
      <div className="border-t px-3 py-2 text-xs text-muted-foreground">
        <button className="underline" onClick={() => go(`/busca?q=${encodeURIComponent(q)}`)}>
          Ver todos os resultados com trechos
        </button>
      </div>
      </Command>
    </CommandDialog>
  )
}

export function entryRoute(r: SearchEntry) {
  const base = r.r.replace(/^#/, "")
  return r.a ? `${base}${base.includes("?") ? "&" : "?"}h=${r.a}` : base
}

export function searchIndex(index: SearchEntry[], query: string) {
  const terms = norm(query).split(/\s+/).filter((t) => t.length > 1)
  if (!terms.length) return []
  const hits: { r: SearchEntry; score: number }[] = []
  for (const r of index) {
    const t = norm(r.t)
    const h = norm(r.h)
    const x = norm(r.x)
    if (!terms.every((w) => t.includes(w) || h.includes(w) || x.includes(w))) continue
    let score = 0
    for (const w of terms) score += (t.includes(w) ? 6 : 0) + (h.includes(w) ? 4 : 0) + Math.min(x.split(w).length - 1, 5)
    if (r.k === "Questão PMLE") score -= 2
    hits.push({ r, score })
  }
  return hits.sort((a, b) => b.score - a.score)
}
