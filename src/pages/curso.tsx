import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeftIcon, ArrowRightIcon, CheckCircle2Icon, CheckIcon, ClockIcon, InfoIcon, TargetIcon, TriangleAlertIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Markdown } from "@/components/markdown"
import { ModuleRoadmap, ProgressRing } from "@/components/journey"
import { moduloStatus } from "@/lib/journey"
import { Footer, Loading, NotFound, Page, PageHeader } from "@/components/page"
import { MATERIAIS, plural, useJSON, type Aula, type Curso as TCurso, type Doc } from "@/lib/data"
import { getProgress, updateProgress, useProgress } from "@/lib/progress"
import { useCurso, useSite } from "@/lib/site"
import { cn } from "@/lib/utils"
import { DocPage } from "./doc-page"

export const cursoCrumbs = (n: number): [string, string][] => [
  ["Trilha", "/trilha"],
  [`Módulo ${n}`, `/curso/${n}`],
]

export function CursoPage() {
  const n = Number(useParams().n)
  const c = useCurso(n)
  if (!c) return <NotFound />
  return c.material ? <CursoComMaterial c={c} /> : <CursoSemMaterial c={c} />
}

function CursoComMaterial({ c }: { c: TCurso }) {
  const { data: doc } = useJSON<Doc>(`docs/c${c.n}-curso.json`)
  const prog = useProgress()
  useEffect(() => {
    document.title = `Módulo ${c.n} · Apostila PMLE`
    window.scrollTo(0, 0)
  }, [c.n])
  if (!doc) return <Loading />
  return (
    <Page>
      <PageHeader crumbs={[["Trilha", "/trilha"], [`Módulo ${c.n}`]]} kicker={`Módulo ${c.n} de 15 · ${c.duracao}`} title={c.titulo} sub={doc.summary} />
      <div className="grid gap-4 md:grid-cols-2">
        {c.modulos!.map((m) => (
          <Card key={m.n}>
            <CardHeader className="flex flex-row items-start gap-3">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-lg font-extrabold text-primary-foreground">{m.n}</div>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-base leading-snug">
                  <Link to={`/curso/${c.n}/modulo/${m.n}`} className="hover:text-primary hover:underline">
                    {m.titulo}
                  </Link>
                </CardTitle>
                <CardDescription>
                  {plural(m.aulas.length, "aula resumida", "aulas resumidas")} · {plural(m.itens.length, "item", "itens")} na plataforma
                </CardDescription>
              </div>
              <ProgressRing value={moduloStatus(c, m, prog).pct} size={28} />
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
                Abrir seção <ArrowRightIcon />
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
    document.title = `Módulo ${c.n} · Apostila PMLE`
    window.scrollTo(0, 0)
  }, [c.n])
  const prev = site.cursos.find((x) => x.n === c.n - 1)
  const next = site.cursos.find((x) => x.n === c.n + 1)
  return (
    <Page narrow>
      <PageHeader crumbs={[["Trilha", "/trilha"], [`Módulo ${c.n}`]]} kicker={`Módulo ${c.n} de 15 · ${c.duracao}`} title={c.titulo} />
      <Alert className="mb-6">
        <InfoIcon />
        <AlertTitle>Material em breve</AlertTitle>
        <AlertDescription>
          Os resumos, flashcards e simulados deste módulo entram aqui conforme as aulas forem transcritas. Abaixo está o roteiro oficial, item a item.
        </AlertDescription>
      </Alert>
      {c.questoes > 0 && (
        <Link to={`/questoes?curso=${c.n}`} className="group mb-6 block">
          <Card className="transition-colors group-hover:ring-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TargetIcon className="size-4 text-brand-orange" /> {c.questoes} questões do exame ligadas a este curso
              </CardTitle>
              <CardDescription>Pratique logo depois de terminar o módulo, enquanto o assunto está fresco.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      )}
      <h2 className="mb-3 text-xl font-bold">Roteiro</h2>
      {data ? <Markdown>{data.md}</Markdown> : null}
      <Pager
        prev={prev && { to: `/curso/${prev.n}`, small: "Módulo anterior", label: prev.titulo }}
        next={next && { to: `/curso/${next.n}`, small: "Próximo módulo", label: next.titulo }}
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
    document.title = `Seção ${m} · Apostila PMLE`
    window.scrollTo(0, 0)
  }, [m])
  if (!c || !mod) return <NotFound />
  const aulaMap = new Map(c.aulas!.map((a) => [a.id, a]))
  const itens = mod.itens.length ? mod.itens : mod.aulas.map((id) => ({ id, titulo: aulaMap.get(id)!.titulo, tipo: "🎬", estrelas: 0 }))
  return (
    <Page narrow>
      <PageHeader crumbs={[...cursoCrumbs(n), [`Seção ${m}`]]} kicker={`Módulo ${n} · Seção ${m}`} title={mod.titulo} />
      <ModuloTabs n={n} m={m} active="aulas" />
      <ModuleRoadmap status={moduloStatus(c, mod, p)} />
      <h2 className="mb-3 text-lg font-bold">Aulas e atividades da seção</h2>
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
      {mod.nota && (
        <p className="mt-2 text-sm text-muted-foreground">
          <InfoIcon className="mr-1 inline size-3.5 align-[-2px]" />
          Numeração: {mod.nota.replace(/\*\*/g, "")}.
        </p>
      )}
      <Footer />
    </Page>
  )
}

export function ModuloDocPage({ tipo }: { tipo: "revisao" | "glossario" }) {
  const params = useParams()
  const n = Number(params.n)
  const m = Number(params.m)
  const c = useCurso(n)
  useEffect(() => {
    if (!getProgress().vistos[`c${n}-m${m}`]) updateProgress((pr) => void (pr.vistos[`c${n}-m${m}`] = Date.now()))
  }, [n, m])
  if (!c?.modulos?.find((x) => x.n === m && x.materiais.some((mt) => mt.tipo === tipo))) return <NotFound />
  return (
    <DocPage
      id={`c${n}-m${m}-${tipo}`}
      crumbs={[...cursoCrumbs(n), [`Seção ${m}`, `/curso/${n}/modulo/${m}`]]}
      filter={tipo === "glossario"}
      tabs={<ModuloTabs n={n} m={m} active={tipo} />}
    />
  )
}

function proximoDestino(c: TCurso, aula: Aula) {
  const mod = c.modulos!.find((x) => x.n === aula.modulo)!
  const idx = mod.aulas.indexOf(aula.id)
  const nextId = mod.aulas[idx + 1]
  if (nextId) {
    const a = c.aulas!.find((x) => x.id === nextId)!
    return { to: `/curso/${c.n}/aula/${a.id}`, label: `Próxima aula: ${a.id} ${a.titulo}`, cta: "Concluir e ir para a próxima aula" }
  }
  const st = moduloStatus(c, mod, { ...getProgress(), aulas: { ...getProgress().aulas, [`c${c.n}-${aula.id}`]: 1 } })
  if (st.proxima?.id === "aulas") {
    const pend = st.proxima.to.split("/").pop()
    return { to: st.proxima.to, label: `Última aula da seção. Ainda falta estudar a aula ${pend}.`, cta: `Concluir e ir para a aula ${pend}` }
  }
  if (st.proxima)
    return { to: st.proxima.to, label: `Última aula da seção. Próximo passo: ${st.proxima.titulo.toLowerCase()}.`, cta: `Concluir e ${st.proxima.titulo.toLowerCase()}` }
  const nextMod = c.modulos!.find((x) => x.n > mod.n && x.aulas.length)
  if (nextMod) return { to: `/curso/${c.n}/modulo/${nextMod.n}`, label: `Fim da seção ${mod.n}. Próxima: seção ${nextMod.n}`, cta: "Concluir e ir para a próxima seção" }
  return { to: "/progresso", label: "Última aula do módulo", cta: "Concluir e ver meu progresso" }
}

export function AulaPage({ transcricao = false }: { transcricao?: boolean }) {
  const params = useParams()
  const navigate = useNavigate()
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
  const estudada = !!p.aulas[key]
  const estrelas = c.modulos!.find((m) => m.n === aula.modulo)?.itens.find((it) => it.id === id)?.estrelas || 0
  const destino = proximoDestino(c, aula)
  const marcar = (v: boolean) =>
    updateProgress((pr) => {
      if (v) pr.aulas[key] = Date.now()
      else delete pr.aulas[key]
    })

  return (
    <DocPage
      id={transcricao ? `c${n}-transc-${id}` : `c${n}-aula-${id}`}
      title={`Aula ${id} — ${aula.titulo}`}
      sub={aula.tema || undefined}
      crumbs={[...cursoCrumbs(n), [`Seção ${aula.modulo}`, `/curso/${n}/modulo/${aula.modulo}`]]}
      toc={!transcricao}
      tabs={
        <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-3">
          {aula.transcricao && (
            <Tabs value={transcricao ? "t" : "r"}>
              <TabsList>
                <TabsTrigger value="r" render={<Link to={base} />} nativeButton={false} className="px-3">
                  Resumo de estudo
                </TabsTrigger>
                <TabsTrigger value="t" render={<Link to={`${base}/transcricao`} />} nativeButton={false} className="px-3">
                  Transcrição original (EN)
                </TabsTrigger>
              </TabsList>
            </Tabs>
          )}
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {aula.duracao && (
              <span className="inline-flex items-center gap-1">
                <ClockIcon className="size-3.5" /> {aula.duracao.replace(/^~/, "")} de vídeo
              </span>
            )}
            {estrelas > 0 && (
              <span className="inline-flex items-center gap-1" title="Relevância para a prova">
                <span className="tracking-tighter text-brand-orange">{"★".repeat(estrelas)}</span> relevância para a prova
              </span>
            )}
            {estudada && (
              <Badge className="bg-success-bg text-success">
                <CheckCircle2Icon /> Estudada
              </Badge>
            )}
          </div>
        </div>
      }
      before={
        transcricao ? (
          <Alert className="mb-6">
            <InfoIcon />
            <AlertDescription>Transcrição bruta da aula, no idioma original. O resumo em português está na outra aba.</AlertDescription>
          </Alert>
        ) : undefined
      }
      after={
        <>
          {!transcricao && (
            <Card className="mt-10 border-primary/30 bg-brand-tint ring-primary/30">
              <CardContent className="flex flex-wrap items-center gap-4">
                <div className="min-w-0 flex-1">
                  <div className="font-semibold">{estudada ? "Aula estudada" : "Terminou de estudar esta aula?"}</div>
                  <div className="text-sm text-muted-foreground">{destino.label}</div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {estudada && (
                    <Button variant="ghost" size="sm" onClick={() => marcar(false)}>
                      Desmarcar
                    </Button>
                  )}
                  <Button
                    size="lg"
                    className="h-11 px-4"
                    onClick={() => {
                      marcar(true)
                      navigate(destino.to)
                    }}
                  >
                    {!estudada && <CheckIcon />} {estudada ? "Continuar" : destino.cta} <ArrowRightIcon />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          <Pager
            prev={prev && { to: `/curso/${n}/aula/${prev.id}`, small: `Aula ${prev.id}`, label: prev.titulo }}
            next={next && { to: `/curso/${n}/aula/${next.id}`, small: `Aula ${next.id}`, label: next.titulo }}
          />
        </>
      }
    />
  )
}
