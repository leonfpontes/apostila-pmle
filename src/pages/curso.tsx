import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeftIcon, ArrowRightIcon, CheckCircle2Icon, InfoIcon, TargetIcon, TriangleAlertIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Markdown } from "@/components/markdown"
import { Footer, Loading, NotFound, Page, PageHeader } from "@/components/page"
import { MATERIAIS, plural, useJSON, type Curso as TCurso, type Doc } from "@/lib/data"
import { updateProgress, useProgress } from "@/lib/progress"
import { useCurso, useSite } from "@/lib/site"
import { cn } from "@/lib/utils"
import { DocPage } from "./doc-page"

export const cursoCrumbs = (n: number): [string, string][] => [
  ["Trilha", "/trilha"],
  [`Curso ${n}`, `/curso/${n}`],
]

export function CursoPage() {
  const n = Number(useParams().n)
  const c = useCurso(n)
  if (!c) return <NotFound />
  return c.material ? <CursoComMaterial c={c} /> : <CursoSemMaterial c={c} />
}

function CursoComMaterial({ c }: { c: TCurso }) {
  const { data: doc } = useJSON<Doc>(`docs/c${c.n}-curso.json`)
  useEffect(() => {
    document.title = `Curso ${c.n} · Apostila PMLE`
    window.scrollTo(0, 0)
  }, [c.n])
  if (!doc) return <Loading />
  return (
    <Page>
      <PageHeader crumbs={[["Trilha", "/trilha"], [`Curso ${c.n}`]]} kicker={`Curso ${c.n} de 15 · ${c.duracao}`} title={c.titulo} sub={doc.summary} />
      <div className="grid gap-4 md:grid-cols-2">
        {c.modulos!.map((m) => (
          <Card key={m.n}>
            <CardHeader className="flex flex-row items-start gap-3">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-lg font-extrabold text-primary-foreground">{m.n}</div>
              <div>
                <CardTitle className="text-base leading-snug">
                  <Link to={`/curso/${c.n}/modulo/${m.n}`} className="hover:text-primary hover:underline">
                    {m.titulo}
                  </Link>
                </CardTitle>
                <CardDescription>
                  {plural(m.aulas.length, "aula resumida", "aulas resumidas")} · {plural(m.itens.length, "item", "itens")} na plataforma
                </CardDescription>
              </div>
            </CardHeader>
            {m.materiais.length > 0 && (
              <CardContent className="flex flex-wrap gap-1.5">
                {m.materiais.map((mt) => (
                  <Badge key={mt.tipo} variant="outline" render={<Link to={`/curso/${c.n}/modulo/${m.n}/${mt.tipo}`} />} className="h-6 hover:border-primary hover:text-primary">
                    {MATERIAIS[mt.tipo].label}
                    {mt.total ? ` (${mt.total})` : ""}
                  </Badge>
                ))}
              </CardContent>
            )}
            <CardFooter className="mt-auto">
              <Button variant="outline" render={<Link to={`/curso/${c.n}/modulo/${m.n}`} />} nativeButton={false}>
                Abrir módulo <ArrowRightIcon />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {c.armadilhas && (
        <Link to={`/curso/${c.n}/armadilhas`} className="group mt-4 block">
          <Card className="bg-brand-tint transition-colors group-hover:ring-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TriangleAlertIcon className="size-4 text-brand-orange" /> Armadilhas e cheat-sheet do curso
              </CardTitle>
              <CardDescription>Revisão final antes da prova: as armadilhas acumuladas, as três tabelas mais cobráveis e as datas decoráveis.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      )}
      <h2 className="mt-10 mb-4 text-xl font-bold">Sobre o curso</h2>
      <Markdown>{doc.md}</Markdown>
      <Footer />
    </Page>
  )
}

function CursoSemMaterial({ c }: { c: TCurso }) {
  const site = useSite()
  const { data } = useJSON<{ md: string }>(`roteiros/${c.n}.json`)
  useEffect(() => {
    document.title = `Curso ${c.n} · Apostila PMLE`
    window.scrollTo(0, 0)
  }, [c.n])
  const prev = site.cursos.find((x) => x.n === c.n - 1)
  const next = site.cursos.find((x) => x.n === c.n + 1)
  return (
    <Page narrow>
      <PageHeader crumbs={[["Trilha", "/trilha"], [`Curso ${c.n}`]]} kicker={`Curso ${c.n} de 15 · ${c.duracao}`} title={c.titulo} />
      <Alert className="mb-6">
        <InfoIcon />
        <AlertTitle>Material em breve</AlertTitle>
        <AlertDescription>
          Os resumos, flashcards e simulados deste curso entram aqui conforme as aulas forem transcritas. Abaixo está o roteiro oficial, item a item.
        </AlertDescription>
      </Alert>
      {c.questoes > 0 && (
        <Link to={`/questoes?curso=${c.n}`} className="group mb-6 block">
          <Card className="transition-colors group-hover:ring-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TargetIcon className="size-4 text-brand-orange" /> {c.questoes} questões do exame ligadas a este curso
              </CardTitle>
              <CardDescription>Pratique logo depois de terminar o curso, enquanto o assunto está fresco.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      )}
      <h2 className="mb-3 text-xl font-bold">Roteiro</h2>
      {data ? <Markdown>{data.md}</Markdown> : null}
      <Pager
        prev={prev && { to: `/curso/${prev.n}`, small: "Curso anterior", label: prev.titulo }}
        next={next && { to: `/curso/${next.n}`, small: "Próximo curso", label: next.titulo }}
      />
      <Footer />
    </Page>
  )
}

export function Pager({ prev, next }: { prev?: { to: string; small: string; label: string }; next?: { to: string; small: string; label: string } }) {
  return (
    <nav className="mt-12 grid grid-cols-2 gap-3">
      {prev ? (
        <Link to={prev.to} className="rounded-xl border bg-card p-3.5 transition-colors hover:border-primary">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <ArrowLeftIcon className="size-3" /> {prev.small}
          </span>
          <span className="line-clamp-2 font-medium">{prev.label}</span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link to={next.to} className="col-start-2 rounded-xl border bg-card p-3.5 text-right transition-colors hover:border-primary">
          <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
            {next.small} <ArrowRightIcon className="size-3" />
          </span>
          <span className="line-clamp-2 font-medium">{next.label}</span>
        </Link>
      )}
    </nav>
  )
}

export function ModuloTabs({ n, m, active }: { n: number; m: number; active: string }) {
  const c = useCurso(n)!
  const mod = c.modulos!.find((x) => x.n === m)!
  const base = `/curso/${n}/modulo/${m}`
  return (
    <Tabs value={active} className="mb-6">
      <TabsList variant="line" className="w-full justify-start overflow-x-auto border-b">
        <TabsTrigger value="aulas" render={<Link to={base} />} nativeButton={false} className="flex-none px-3">
          Aulas
        </TabsTrigger>
        {mod.materiais.map((mt) => (
          <TabsTrigger key={mt.tipo} value={mt.tipo} render={<Link to={`${base}/${mt.tipo}`} />} nativeButton={false} className="flex-none px-3">
            {MATERIAIS[mt.tipo].label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

export function ModuloPage() {
  const params = useParams()
  const n = Number(params.n)
  const m = Number(params.m)
  const c = useCurso(n)
  const mod = c?.modulos?.find((x) => x.n === m)
  const p = useProgress()
  useEffect(() => {
    document.title = `Módulo ${m} · Apostila PMLE`
    window.scrollTo(0, 0)
  }, [m])
  if (!c || !mod) return <NotFound />
  const aulaMap = new Map(c.aulas!.map((a) => [a.id, a]))
  const itens = mod.itens.length ? mod.itens : mod.aulas.map((id) => ({ id, titulo: aulaMap.get(id)!.titulo, tipo: "🎬", estrelas: 0 }))
  return (
    <Page narrow>
      <PageHeader crumbs={[...cursoCrumbs(n), [`Módulo ${m}`]]} kicker={`Módulo ${m}`} title={mod.titulo} sub={mod.nota ? mod.nota.replace(/\*\*/g, "") : undefined} />
      <ModuloTabs n={n} m={m} active="aulas" />
      <Card className="gap-0 py-0">
        {itens.map((it, k) => {
          const a = aulaMap.get(it.id)
          const done = a && p.aulas[`c${n}-${a.id}`]
          const inner = (
            <>
              <span className={cn("font-extrabold tabular-nums", a ? "text-primary" : "text-muted-foreground")}>{it.id}</span>
              <span className="min-w-0">
                <span className={cn("block leading-snug font-semibold", !a && "font-normal text-muted-foreground")}>{a ? a.titulo : it.titulo}</span>
                {a && <span className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">{a.resumo}</span>}
              </span>
              <span className="flex flex-wrap items-center justify-end gap-1.5">
                {it.estrelas > 0 && (
                  <span className="text-xs tracking-tighter text-brand-orange" title="Relevância para a prova">
                    {"★".repeat(it.estrelas)}
                  </span>
                )}
                {done && (
                  <Badge className="bg-success-bg text-success">
                    <CheckCircle2Icon /> estudada
                  </Badge>
                )}
                <Badge variant="outline">{it.tipo.replace(" obrigatório", "")}</Badge>
              </span>
            </>
          )
          const cls = cn("grid grid-cols-[3rem_1fr_auto] items-center gap-3 px-4 py-3.5", k > 0 && "border-t")
          return a ? (
            <Link key={it.id} to={`/curso/${n}/aula/${a.id}`} className={cn(cls, "transition-colors hover:bg-muted")}>
              {inner}
            </Link>
          ) : (
            <div key={it.id} className={cls}>
              {inner}
            </div>
          )
        })}
      </Card>
      <p className="mt-3 text-sm text-muted-foreground">Labs, quizzes e readings ficam na plataforma Google Skills; os itens com link têm resumo de estudo.</p>
      <Footer />
    </Page>
  )
}

export function ModuloDocPage({ tipo }: { tipo: "revisao" | "glossario" }) {
  const params = useParams()
  const n = Number(params.n)
  const m = Number(params.m)
  const c = useCurso(n)
  if (!c?.modulos?.find((x) => x.n === m && x.materiais.some((mt) => mt.tipo === tipo))) return <NotFound />
  return (
    <DocPage
      id={`c${n}-m${m}-${tipo}`}
      crumbs={[...cursoCrumbs(n), [`Módulo ${m}`, `/curso/${n}/modulo/${m}`]]}
      filter={tipo === "glossario"}
      tabs={<ModuloTabs n={n} m={m} active={tipo} />}
    />
  )
}

export function AulaPage({ transcricao = false }: { transcricao?: boolean }) {
  const params = useParams()
  const n = Number(params.n)
  const id = params.id!
  const c = useCurso(n)
  const p = useProgress()
  const idx = c?.aulas?.findIndex((a) => a.id === id) ?? -1
  if (!c || idx < 0) return <NotFound />
  const aula = c.aulas![idx]
  const prev = c.aulas![idx - 1]
  const next = c.aulas![idx + 1]
  const key = `c${n}-${id}`
  const base = `/curso/${n}/aula/${id}`
  return (
    <DocPage
      id={transcricao ? `c${n}-transc-${id}` : `c${n}-aula-${id}`}
      title={`Aula ${id} — ${aula.titulo}`}
      crumbs={[...cursoCrumbs(n), [`Módulo ${aula.modulo}`, `/curso/${n}/modulo/${aula.modulo}`]]}
      toc={!transcricao}
      tabs={
        aula.transcricao ? (
          <Tabs value={transcricao ? "t" : "r"} className="mb-5">
            <TabsList variant="line" className="w-full justify-start border-b">
              <TabsTrigger value="r" render={<Link to={base} />} nativeButton={false} className="flex-none px-3">
                Resumo de estudo
              </TabsTrigger>
              <TabsTrigger value="t" render={<Link to={`${base}/transcricao`} />} nativeButton={false} className="flex-none px-3">
                Transcrição original (EN)
              </TabsTrigger>
            </TabsList>
          </Tabs>
        ) : undefined
      }
      before={
        transcricao ? (
          <Alert className="mb-6">
            <InfoIcon />
            <AlertDescription>Transcrição bruta da aula, no idioma original. O resumo em português está na outra aba.</AlertDescription>
          </Alert>
        ) : (
          <div className="mb-6 flex items-center gap-2">
            <Checkbox
              id="aula-done"
              checked={!!p.aulas[key]}
              onCheckedChange={(v) =>
                updateProgress((pr) => {
                  if (v) pr.aulas[key] = Date.now()
                  else delete pr.aulas[key]
                })
              }
            />
            <Label htmlFor="aula-done">Marcar como estudada</Label>
          </div>
        )
      }
      after={
        <Pager
          prev={prev && { to: `/curso/${n}/aula/${prev.id}`, small: `Aula ${prev.id}`, label: prev.titulo }}
          next={next && { to: `/curso/${n}/aula/${next.id}`, small: `Aula ${next.id}`, label: next.titulo }}
        />
      }
    />
  )
}
