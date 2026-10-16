import { useEffect } from "react"
import { Link } from "react-router-dom"
import { CheckIcon, ClockIcon, TargetIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Markdown } from "@/components/markdown"
import { Footer, Loading, Page, PageHeader } from "@/components/page"
import { pct, useJSON, type Doc } from "@/lib/data"
import { updateProgress, useProgress } from "@/lib/progress"
import { useSite } from "@/lib/site"
import { cn } from "@/lib/utils"

export function Trilha() {
  const site = useSite()
  const p = useProgress()
  const { data: doc } = useJSON<Doc>("docs/trilha.json")
  const done = Object.keys(p.cursos).length
  useEffect(() => {
    document.title = "Trilha · Apostila PMLE"
    window.scrollTo(0, 0)
  }, [])
  if (!doc) return <Loading />

  return (
    <Page narrow>
      <PageHeader
        crumbs={[["Trilha"]]}
        kicker="15 cursos · ~56 h"
        title={doc.title}
        sub="O caminho até a prova Professional Machine Learning Engineer. Marque o que já concluiu: o progresso fica salvo só neste navegador."
      />
      <div className="mb-6 flex items-center gap-3">
        <Progress value={pct(done, 15)} className="flex-1" aria-label="Cursos concluídos" />
        <span className="text-sm text-muted-foreground tabular-nums">{done}/15</span>
      </div>
      <ol className="grid gap-2.5">
        {site.cursos.map((c) => {
          const ok = !!p.cursos[c.n]
          return (
            <li key={c.n}>
              <Card className={cn("grid grid-cols-[2.75rem_1fr] items-center gap-3 px-4 sm:grid-cols-[2.75rem_1fr_auto]", c.material && "ring-primary/40")}>
                <div
                  className={cn(
                    "grid size-10 place-items-center rounded-full text-base font-extrabold",
                    ok ? "bg-success text-white" : c.material ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
                  )}
                >
                  {ok ? <CheckIcon className="size-5" /> : c.n}
                </div>
                <div className="min-w-0">
                  <Link to={`/curso/${c.n}`} className="font-semibold leading-snug hover:text-primary hover:underline">
                    {c.titulo}
                  </Link>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    <Badge variant="outline">
                      <ClockIcon /> {c.duracao}
                    </Badge>
                    {c.material ? (
                      <Badge className="bg-secondary text-secondary-foreground">Material completo</Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground">
                        Material em breve
                      </Badge>
                    )}
                    {c.questoes > 0 && (
                      <Badge
                        render={<Link to={`/questoes?curso=${c.n}`} />}
                        className="bg-brand-orange/15 text-brand-orange-ink hover:bg-brand-orange/25"
                      >
                        <TargetIcon /> {c.questoes} questões do exame
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="col-start-2 flex items-center gap-2 sm:col-start-3">
                  <Checkbox
                    id={`done-${c.n}`}
                    checked={ok}
                    onCheckedChange={(v) =>
                      updateProgress((pr) => {
                        if (v) pr.cursos[c.n] = Date.now()
                        else delete pr.cursos[c.n]
                      })
                    }
                  />
                  <Label htmlFor={`done-${c.n}`} className="text-sm text-muted-foreground">
                    Concluí
                  </Label>
                </div>
              </Card>
            </li>
          )
        })}
      </ol>
      <div className="mt-10">
        <Markdown>{doc.md}</Markdown>
      </div>
      <Footer />
    </Page>
  )
}
