import { ExternalLinkIcon, LockIcon } from "lucide-react"
import { arquivos } from "../../shared/contrato"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Etiqueta } from "@/components/shared/indicadores"
import { LinkTexto } from "@/components/shared/navegacao"
import { CabecalhoDaPagina, ComDados, Pagina } from "@/components/shared/pagina"
import type { MaterialDaTurma, MateriaisDaTurma } from "@/domain/tipos"
import { useDados } from "@/lib/dados"
import { useTituloDaPagina } from "@/lib/site"

function CardDeMaterial({ item }: { item: MaterialDaTurma }) {
  return (
    <Card size="sm" className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Etiqueta>{item.categoria}</Etiqueta>
          {item.privado && (
            <Etiqueta className="text-muted-foreground">
              <LockIcon /> Interno
            </Etiqueta>
          )}
        </div>
        <CardTitle className="mt-1 text-base">{item.titulo}</CardTitle>
        <CardDescription className="leading-relaxed">{item.descricao}</CardDescription>
      </CardHeader>
      {item.capitulos && (
        <CardContent>
          <Accordion>
            <AccordionItem value="capitulos">
              <AccordionTrigger className="py-1 text-sm">{item.capitulos.length} capítulos</AccordionTrigger>
              <AccordionContent>
                <ol className="list-decimal space-y-0.5 pl-5 text-sm text-muted-foreground">
                  {item.capitulos.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      )}
      <CardFooter className="mt-auto flex-wrap gap-x-4 gap-y-1 text-sm">
        {item.url && (
          <a href={item.url} target="_blank" rel="noopener" className="link-texto">
            Abrir <ExternalLinkIcon className="size-3.5" />
          </a>
        )}
        {item.interno && (
          <LinkTexto para={item.interno} seta>
            Ver na apostila
          </LinkTexto>
        )}
        {item.privado && <span className="text-muted-foreground">{item.privado}</span>}
      </CardFooter>
    </Card>
  )
}

export function PaginaDeMateriais() {
  const { dados, erro } = useDados<MateriaisDaTurma>(arquivos.materiais)
  useTituloDaPagina("Materiais da turma")
  return (
    <ComDados dados={dados} erro={erro}>
      {(m) => (
        <Pagina>
          <CabecalhoDaPagina
            migalhas={[["Materiais da turma"]]}
            kicker="Links da planilha da turma"
            titulo="Materiais da turma"
            subtitulo={`Tudo o que a turma usa para a certificação, num só lugar. A regra para marcar o exame: acertar acima de ${m.metaExame}% nos simulados finais.`}
          />
          {m.grupos.map((g) => (
            <section key={g.titulo} className="mb-8">
              <h2 className="titulo-bloco">{g.titulo}</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {g.itens.map((it) => (
                  <CardDeMaterial key={it.titulo} item={it} />
                ))}
              </div>
            </section>
          ))}
          <p className="text-sm text-muted-foreground">Fonte: {m.fonte}. Materiais internos da ATRA não têm link aqui porque este site é público.</p>
        </Pagina>
      )}
    </ComDados>
  )
}
