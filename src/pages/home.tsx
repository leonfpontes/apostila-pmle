import { useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRightIcon, BookOpenIcon, CalendarDaysIcon, LayersIcon, ListChecksIcon, PlayIcon, TargetIcon, TriangleAlertIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Footer, Page } from "@/components/page"
import { MATERIAIS, pct, plural } from "@/lib/data"
import { useProgress } from "@/lib/progress"
import { useSite } from "@/lib/site"
import { cn } from "@/lib/utils"

export function Home() {
  const site = useSite()
  const p = useProgress()
  const s = site.stats
  const c1 = site.cursos.find((c) => c.material)!
  const done = Object.keys(p.cursos).length
  const qAns = Object.keys(p.q).length
  const qOk = Object.values(p.q).filter((x) => x.ok).length
  useEffect(() => {
    document.title = "Apostila PMLE · ATRA"
  }, [])

  return (
    <Page>
      <section className="relative mb-8 overflow-hidden rounded-3xl border bg-card p-7 shadow-sm md:p-12">
        <div className="relative z-10 max-w-xl">
          <div className="mb-2 text-xs font-bold tracking-widest text-brand-orange-ink uppercase">Trilha Google Cloud · Professional ML Engineer</div>
          <h1 className="font-heading text-4xl leading-[1.05] font-extrabold tracking-tight text-balance md:text-5xl">
            Bem-vindo à apostila da certificação PMLE
          </h1>
          <p className="mt-4 text-lg text-brand-text md:text-xl">
            Resumos de cada aula, glossários, flashcards, simulados e {s.questoes} questões no estilo da prova, organizados pelos 15 cursos da trilha.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {p.last ? (
              <Button size="lg" className="h-11 px-4 text-base" render={<Link to={p.last.route} />} nativeButton={false}>
                <PlayIcon /> Continuar: {p.last.title.slice(0, 40)}
              </Button>
            ) : (
              <Button size="lg" className="h-11 px-4 text-base" render={<Link to={`/curso/${c1.n}`} />} nativeButton={false}>
                <PlayIcon /> Começar pelo curso {c1.n}
              </Button>
            )}
            <Button size="lg" variant="outline" className="h-11 px-4 text-base" render={<Link to="/questoes" />} nativeButton={false}>
              <TargetIcon /> Praticar questões
            </Button>
          </div>
        </div>
        {/* composição da capa ATRA: círculos desfocados e diamantes */}
        <div aria-hidden className="pointer-events-none absolute top-1/2 -right-24 hidden size-96 -translate-y-1/2 opacity-60 xl:block 2xl:-right-4 2xl:opacity-100">
          <div className="absolute top-10 right-16 size-60 rounded-full bg-brand opacity-15 blur-md" />
          <div className="absolute top-36 right-0 size-52 rounded-full bg-brand-orange opacity-20 blur-md" />
          <div className="absolute top-32 right-28 size-28 rotate-45 rounded-lg bg-brand shadow-2xl shadow-brand/40" />
          <div className="absolute top-20 right-16 size-11 rotate-45 rounded bg-brand-orange" />
        </div>
      </section>

      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {[
          [15, "cursos na trilha"],
          [s.aulas, "aulas resumidas"],
          [s.flashcards, "flashcards"],
          [s.simulado, "questões de simulado"],
          [s.questoes, "questões do exame"],
        ].map(([n, l]) => (
          <div key={l} className="rounded-2xl bg-brand-tint p-4">
            <div className="text-3xl font-extrabold text-primary tabular-nums">{n}</div>
            <div className="text-sm text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sua trilha</CardTitle>
            <CardDescription>
              {done ? `Você marcou ${plural(done, "curso concluído", "cursos concluídos")} de 15.` : "Marque na página da trilha os cursos que já concluiu."}
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
                        className={cn(
                          "grid size-7 place-items-center rounded-full text-xs font-bold",
                          p.cursos[c.n] ? "bg-success text-white" : c.material ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
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
            <Progress value={pct(done, 15)} aria-label="Cursos concluídos" />
          </CardContent>
          <CardFooter>
            <Link to="/trilha" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              Ver a trilha completa <ArrowRightIcon className="size-4" />
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Banco de questões do exame</CardTitle>
            <CardDescription>
              {qAns
                ? `Você respondeu ${qAns} de ${s.questoes} questões e acertou ${pct(qOk, qAns)}%.`
                : `${s.questoes} questões em inglês, como na prova, com gabarito revisado e explicação em português.`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={pct(qAns, s.questoes)} aria-label="Questões respondidas" />
          </CardContent>
          <CardFooter>
            <Link to="/questoes" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              Praticar por seção, curso ou dificuldade <ArrowRightIcon className="size-4" />
            </Link>
          </CardFooter>
        </Card>
      </div>

      <h2 className="mt-10 mb-4 text-xl font-bold">
        Curso {c1.n}: {c1.titulo}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {c1.modulos!
          .filter((m) => m.aulas.length)
          .map((m) => (
            <Link key={m.n} to={`/curso/${c1.n}/modulo/${m.n}`} className="group">
              <Card className="h-full transition-colors group-hover:ring-primary">
                <CardHeader>
                  <div className="text-xs font-bold tracking-widest text-brand-orange-ink uppercase">Módulo {m.n}</div>
                  <CardTitle className="leading-snug">{m.titulo}</CardTitle>
                  <CardDescription>
                    {plural(m.aulas.length, "aula", "aulas")}
                    {m.materiais.length ? " · " + m.materiais.map((x) => MATERIAIS[x.tipo].label.toLowerCase()).join(", ") : ""}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        {c1.armadilhas && (
          <Link to={`/curso/${c1.n}/armadilhas`} className="group">
            <Card className="h-full bg-brand-tint transition-colors group-hover:ring-primary">
              <CardHeader>
                <div className="text-xs font-bold tracking-widest text-brand-orange-ink uppercase">Revisão final</div>
                <CardTitle className="flex items-center gap-2">
                  <TriangleAlertIcon className="size-4 text-brand-orange" /> Armadilhas e cheat-sheet
                </CardTitle>
                <CardDescription>As armadilhas do curso inteiro e as tabelas mais cobradas.</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        )}
      </div>

      <h2 className="mt-10 mb-4 text-xl font-bold">Atalhos de estudo</h2>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          ["/flashcards", LayersIcon, "Flashcards", `${s.flashcards} cartões por bloco`],
          ["/simulados", ListChecksIcon, "Simulados", "30 questões por módulo"],
          ["/exame", BookOpenIcon, "Guia do exame", "Pesos e subseções"],
          ["/cronograma", CalendarDaysIcon, "Cronograma", "Plano dia a dia"],
        ].map(([to, Icon, t, d]) => {
          const I = Icon as typeof LayersIcon
          return (
            <Link key={to as string} to={to as string} className="group">
              <Card size="sm" className="h-full transition-colors group-hover:ring-primary">
                <CardHeader>
                  <I className="mb-1 size-5 text-primary" />
                  <CardTitle>{t as string}</CardTitle>
                  <CardDescription>{d as string}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          )
        })}
      </div>
      <Footer />
    </Page>
  )
}
