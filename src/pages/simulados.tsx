import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { InfoIcon, TargetIcon, TriangleAlertIcon } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Markdown } from "@/components/markdown"
import { ErrorState, Footer, Loading, NotFound, Page, PageHeader } from "@/components/page"
import { Quiz, QBadge } from "@/components/quiz"
import { WhatsNext } from "@/components/journey"
import { META_SIMULADO } from "@/lib/journey"
import { tituloLimpo, useJSON, type Simulado } from "@/lib/data"
import { updateProgress, useProgress } from "@/lib/progress"
import { useCurso, useSite } from "@/lib/site"
import { cursoCrumbs, ModuloTabs } from "./curso"

export function AllSimulados() {
  const site = useSite()
  const p = useProgress()
  useEffect(() => {
    document.title = "Simulados · Apostila PMLE"
    window.scrollTo(0, 0)
  }, [])
  const items = site.cursos
    .filter((c) => c.material)
    .flatMap((c) =>
      c.modulos!.flatMap((m) => {
        const f = m.materiais.find((x) => x.tipo === "simulado")
        return f ? [{ c, m, total: f.total || 0, r: p.sim[`c${c.n}-m${m.n}`] }] : []
      })
    )
  return (
    <Page>
      <PageHeader
        crumbs={[["Simulados"]]}
        title="Simulados das seções"
        sub="30 questões por seção, no estilo do quiz da plataforma, com gabarito comentado. Reserve 30 minutos para cada um."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((d) => (
          <Link key={`${d.c.n}-${d.m.n}`} to={`/curso/${d.c.n}/modulo/${d.m.n}/simulado`} className="group">
            <Card className="h-full transition-colors group-hover:ring-primary">
              <CardHeader>
                <div className="text-xs font-bold tracking-widest text-brand-orange-ink uppercase">
                  Módulo {d.c.n} · Seção {d.m.n}
                </div>
                <CardTitle>{d.m.titulo}</CardTitle>
                <CardDescription className="flex flex-wrap items-center gap-2">
                  {d.total} questões
                  {d.r ? (
                    <>
                      <Badge className={d.r.best >= 80 ? "bg-success-bg text-success" : "bg-secondary text-secondary-foreground"}>melhor nota {d.r.best}%</Badge>
                      <span>última {d.r.last}%</span>
                    </>
                  ) : (
                    <span>· ainda não feito</span>
                  )}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
      <Link to="/questoes" className="group mt-4 block">
        <Card className="bg-brand-tint transition-colors group-hover:ring-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TargetIcon className="size-4 text-brand-orange" /> Quer o nível da prova real?
            </CardTitle>
            <CardDescription>O banco de questões do exame tem {site.stats.questoes} questões em inglês, organizadas pelas seções do guia oficial.</CardDescription>
          </CardHeader>
        </Card>
      </Link>
      <Footer />
    </Page>
  )
}

export function SimuladoPage() {
  const params = useParams()
  const n = Number(params.n)
  const m = Number(params.m)
  const c = useCurso(n)
  const p = useProgress()
  const key = `c${n}-m${m}`
  const { data: sim, error } = useJSON<Simulado>(`simulados/${key}.json`)
  useEffect(() => {
    document.title = `Simulado · Seção ${m} · Apostila PMLE`
    window.scrollTo(0, 0)
  }, [m])
  if (!c?.modulos?.some((x) => x.n === m)) return <NotFound />
  if (error) return <ErrorState error={error} />
  if (!sim) return <Loading />
  const prev = p.sim[key]
  return (
    <Page narrow>
      <PageHeader crumbs={[...cursoCrumbs(n), [`Seção ${m}`, `/curso/${n}/modulo/${m}`], ["Simulado"]]} kicker={`Simulado · Seção ${m}`} title={tituloLimpo(sim.titulo)} />
      <ModuloTabs n={n} m={m} active="simulado" />
      {prev && (
        <p className="mb-3 text-sm text-muted-foreground">
          Sua melhor nota: <strong className="text-foreground">{prev.best}%</strong> · última: {prev.last}%
        </p>
      )}
      <Accordion className="mb-6 rounded-xl border bg-brand-tint px-4">
        <AccordionItem value="como">
          <AccordionTrigger>
            <span className="flex items-center gap-2">
              <InfoIcon className="size-4 text-primary" /> Como fazer este simulado
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <Markdown>{sim.intro}</Markdown>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Quiz
        key={key}
        title={`Seção ${m}`}
        questions={sim.questoes.map((q) => ({
          id: q.n,
          stem: q.enunciado,
          opts: q.opcoes,
          answer: q.resposta ? [q.resposta] : [],
          expl: q.explicacao,
          meta: q.parte ? <QBadge tone="blue">{q.parte}</QBadge> : undefined,
        }))}
        onFinish={({ score }) =>
          updateProgress((pr) => {
            const old = pr.sim[key]
            pr.sim[key] = { best: Math.max(score, old?.best || 0), last: score, t: Date.now() }
          })
        }
      />
      {prev && (() => {
        const mod = c.modulos!.find((x) => x.n === m)!
        const nextMod = c.modulos!.find((x) => x.n > m && x.aulas.length)
        const revisao = mod.materiais.find((x) => x.tipo === "revisao" || x.tipo === "glossario")
        return prev.best >= META_SIMULADO ? (
          <WhatsNext
            titulo={`Seção ${m} fechada com ${prev.best}%`}
            texto={nextMod ? `Siga para a seção ${nextMod.n}: ${nextMod.titulo}.` : "Feche o módulo com as armadilhas e pratique as questões do exame."}
            to={nextMod ? `/curso/${n}/modulo/${nextMod.n}` : `/curso/${n}/armadilhas`}
            cta={nextMod ? "Próxima seção" : "Revisão final"}
          />
        ) : (
          <WhatsNext
            titulo={`Sua melhor nota ainda está abaixo de ${META_SIMULADO}%`}
            texto="Revise a seção, refaça os flashcards que errou e tente o simulado de novo."
            to={revisao ? `/curso/${n}/modulo/${m}/${revisao.tipo}` : `/curso/${n}/modulo/${m}/flashcards`}
            cta="Revisar a seção"
          />
        )
      })()}
      {sim.fechamento && (
        <Accordion className="mt-8 rounded-xl border border-brand-orange/40 bg-brand-orange/10 px-4">
          <AccordionItem value="erros">
            <AccordionTrigger>
              <span className="flex items-center gap-2">
                <TriangleAlertIcon className="size-4 text-brand-orange" /> Onde você provavelmente vai errar (abra depois de terminar)
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <Markdown>{sim.fechamento}</Markdown>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      <Footer />
    </Page>
  )
}
