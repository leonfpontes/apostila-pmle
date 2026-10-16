import { useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRightIcon, ExternalLinkIcon, LockIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ErrorState, Footer, Loading, Page, PageHeader } from "@/components/page"
import { useJSON } from "@/lib/data"

type Item = { titulo: string; categoria: string; descricao: string; url?: string; interno?: string; privado?: string; capitulos?: string[] }
type Materiais = { metaExame: number; fonte: string; grupos: { titulo: string; itens: Item[] }[] }

export function MateriaisPage() {
  const { data, error } = useJSON<Materiais>("materiais.json")
  useEffect(() => {
    document.title = "Materiais da turma · Apostila PMLE"
    window.scrollTo(0, 0)
  }, [])
  if (error) return <ErrorState error={error} />
  if (!data) return <Loading />
  return (
    <Page>
      <PageHeader
        crumbs={[["Materiais da turma"]]}
        kicker="Links da planilha da turma"
        title="Materiais da turma"
        sub={`Tudo o que a turma usa para a certificação, num só lugar. A regra para marcar o exame: acertar acima de ${data.metaExame}% nos simulados finais.`}
      />
      {data.grupos.map((g) => (
        <section key={g.titulo} className="mb-8">
          <h2 className="mb-3 text-xl font-bold">{g.titulo}</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {g.itens.map((it) => (
              <Card key={it.titulo} size="sm" className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{it.categoria}</Badge>
                    {it.privado && (
                      <Badge variant="outline" className="text-muted-foreground">
                        <LockIcon /> Interno
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="mt-1 text-base">{it.titulo}</CardTitle>
                  <CardDescription className="leading-relaxed">{it.descricao}</CardDescription>
                </CardHeader>
                {it.capitulos && (
                  <CardContent>
                    <Accordion>
                      <AccordionItem value="cap">
                        <AccordionTrigger className="py-1 text-sm">{it.capitulos.length} capítulos</AccordionTrigger>
                        <AccordionContent>
                          <ol className="list-decimal space-y-0.5 pl-5 text-sm text-muted-foreground">
                            {it.capitulos.map((c) => (
                              <li key={c}>{c}</li>
                            ))}
                          </ol>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                )}
                <CardFooter className="mt-auto flex-wrap gap-x-4 gap-y-1 text-sm">
                  {it.url && (
                    <a href={it.url} target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
                      Abrir <ExternalLinkIcon className="size-3.5" />
                    </a>
                  )}
                  {it.interno && (
                    <Link to={it.interno} className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
                      Ver na apostila <ArrowRightIcon className="size-3.5" />
                    </Link>
                  )}
                  {it.privado && <span className="text-muted-foreground">{it.privado}</span>}
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      ))}
      <p className="text-sm text-muted-foreground">Fonte: {data.fonte}. Materiais internos da ATRA não têm link aqui porque este site é público.</p>
      <Footer />
    </Page>
  )
}
