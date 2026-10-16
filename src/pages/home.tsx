import { useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRightIcon, CompassIcon, HistoryIcon, TriangleAlertIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ETAPA_ICON, NextStepCard, ProgressRing } from "@/components/journey"
import { Footer, Page } from "@/components/page"
import { pct, plural } from "@/lib/data"
import { proximoPasso, todosModulos } from "@/lib/journey"
import { useProgress } from "@/lib/progress"
import { useSite } from "@/lib/site"
import { cn } from "@/lib/utils"

const COMO = [
  ["aulas", "Estude as aulas", "Resumo em português de cada aula"],
  ["revisao", "Revise a seção", "Armadilhas e glossário"],
  ["flashcards", "Fixe com flashcards", "Revisão ativa por blocos"],
  ["simulado", "Teste no simulado", "30 questões, meta de 80%"],
] as const

export function Home() {
  const site = useSite()
  const p = useProgress()
  const s = site.stats
  const c1 = site.cursos.find((c) => c.material)!
  const mods = todosModulos(site, p)
  const passo = proximoPasso(site, p)
  const novo = Object.keys(p.aulas).length + Object.keys(p.fc).length + Object.keys(p.sim).length + Object.keys(p.q).length === 0
  const done = Object.keys(p.cursos).length
  const qAns = Object.keys(p.q).length
  const qOk = Object.values(p.q).filter((x) => x.ok).length
  useEffect(() => {
    document.title = "Apostila PMLE · ATRA"
  }, [])

  return (
    <Page>
      <section className="relative mb-6 overflow-hidden rounded-3xl border bg-card p-7 shadow-sm md:p-10">
        <div className="relative z-10 max-w-xl">
          <div className="mb-2 text-xs font-bold tracking-widest text-brand-orange-ink uppercase">Trilha Google Cloud · Professional ML Engineer</div>
          <h1 className="font-heading text-4xl leading-[1.05] font-extrabold tracking-tight text-balance md:text-5xl">
            {p.nome ? `Olá, ${p.nome}. Bora estudar?` : "Apostila da certificação PMLE"}
          </h1>
          <p className="mt-4 text-lg text-brand-text md:text-xl">
            O material da turma ATRA para a prova Professional Machine Learning Engineer: aulas resumidas, flashcards, simulados e {s.questoes} questões no estilo do exame.
          </p>
          {novo && (
            <div className="mt-6 flex flex-wrap gap-2">
              <Button size="lg" className="h-11 px-4 text-base" render={<Link to="/comece" />} nativeButton={false}>
                <CompassIcon /> Comece aqui
              </Button>
              <Button size="lg" variant="outline" className="h-11 px-4 text-base" render={<Link to={passo.to} />} nativeButton={false}>
                Ir direto para a primeira aula
              </Button>
            </div>
          )}
        </div>
        <div aria-hidden className="pointer-events-none absolute top-1/2 -right-24 hidden size-96 -translate-y-1/2 opacity-60 xl:block 2xl:-right-4 2xl:opacity-100">
          <div className="absolute top-10 right-16 size-60 rounded-full bg-brand opacity-15 blur-md" />
          <div className="absolute top-36 right-0 size-52 rounded-full bg-brand-orange opacity-20 blur-md" />
          <div className="absolute top-32 right-28 size-28 rotate-45 rounded-lg bg-brand shadow-2xl shadow-brand/40" />
          <div className="absolute top-20 right-16 size-11 rotate-45 rounded bg-brand-orange" />
        </div>
      </section>

      {!novo && <NextStepCard passo={passo} className="mb-4" />}
      {!novo && p.last && p.last.route !== passo.to && (
        <Link to={p.last.route} className="mb-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <HistoryIcon className="size-4" /> Voltar para onde parou: <span className="font-medium text-foreground">{p.last.title}</span>
        </Link>
      )}

      {novo && (
        <section className="mb-8">
          <h2 className="mb-3 text-xl font-bold">Como funciona cada seção</h2>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {COMO.map(([id, t, d], i) => {
              const Icon = ETAPA_ICON[id]
              return (
                <li key={id} className="flex gap-3 rounded-2xl bg-brand-tint p-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-extrabold text-primary-foreground">{i + 1}</span>
                  <span>
                    <span className="flex items-center gap-1.5 font-semibold">
                      <Icon className="size-4 text-primary" /> {t}
                    </span>
                    <span className="text-sm text-muted-foreground">{d}</span>
                  </span>
                </li>
              )
            })}
          </ol>
          <Link to="/comece" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            Ver o guia completo <ArrowRightIcon className="size-3.5" />
          </Link>
        </section>
      )}

      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <h2 className="text-xl font-bold">
          Módulo {c1.n}: {c1.titulo}
        </h2>
        <Link to="/progresso" className="text-sm font-medium text-primary hover:underline">
          Ver meu progresso
        </Link>
      </div>
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {mods.map((st) => (
          <Link key={st.modulo.n} to={`/curso/${c1.n}/modulo/${st.modulo.n}`} className="group">
            <Card size="sm" className={cn("h-full transition-colors group-hover:ring-primary", passo.to.startsWith(`/curso/${c1.n}/modulo/${st.modulo.n}`) && "ring-primary/50")}>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold tracking-widest text-brand-orange-ink uppercase">Seção {st.modulo.n}</div>
                    <CardTitle className="mt-0.5 leading-snug">{st.modulo.titulo}</CardTitle>
                  </div>
                  <ProgressRing value={st.pct} size={28} />
                </div>
                <CardDescription>
                  {st.done ? "Concluído" : st.proxima ? `Próximo: ${st.proxima.titulo.toLowerCase()}` : ""} · {plural(st.modulo.aulas.length, "aula", "aulas")}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
        {c1.armadilhas && (
          <Link to={`/curso/${c1.n}/armadilhas`} className="group">
            <Card size="sm" className="h-full bg-brand-tint transition-colors group-hover:ring-primary">
              <CardHeader>
                <div className="text-xs font-bold tracking-widest text-brand-orange-ink uppercase">Revisão final</div>
                <CardTitle className="flex items-center gap-2">
                  <TriangleAlertIcon className="size-4 text-brand-orange" /> Armadilhas e cheat-sheet
                </CardTitle>
                <CardDescription>Para a véspera da prova: as armadilhas do módulo e as tabelas mais cobradas.</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>A trilha completa</CardTitle>
            <CardDescription>
              15 módulos até a prova. {done ? `Você marcou ${plural(done, "módulo concluído", "módulos concluídos")}.` : "Os módulos em azul já têm material."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-1.5">
              {site.cursos.map((c) => (
                <Tooltip key={c.n}>
                  <TooltipTrigger
                    render={
                      <Link
                        to={`/curso/${c.n}`}
                        aria-label={`Módulo ${c.n}: ${c.titulo}`}
                        className={cn(
                          "grid size-7 place-items-center rounded-full text-xs font-bold",
                          p.cursos[c.n] ? "bg-success text-white" : c.material ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        )}
                      />
                    }
                  >
                    {c.n}
                  </TooltipTrigger>
                  <TooltipContent>{c.titulo}</TooltipContent>
                </Tooltip>
              ))}
            </div>
            <Progress value={pct(done, 15)} aria-label="Módulos concluídos" />
          </CardContent>
          <CardFooter>
            <Link to="/trilha" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              Ver a trilha <ArrowRightIcon className="size-4" />
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Banco de questões do exame</CardTitle>
            <CardDescription>
              {qAns ? `Você respondeu ${qAns} de ${s.questoes} e acertou ${pct(qOk, qAns)}%.` : `${s.questoes} questões em inglês, como na prova, com explicação em português.`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={pct(qAns, s.questoes)} aria-label="Questões respondidas" />
          </CardContent>
          <CardFooter>
            <Link to="/questoes" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              Praticar por seção, módulo ou dificuldade <ArrowRightIcon className="size-4" />
            </Link>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </Page>
  )
}
