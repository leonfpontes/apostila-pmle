import { Link } from "react-router-dom"
import { CheckIcon, ClockIcon, TargetIcon } from "lucide-react"
import { arquivos, docIds, rotas } from "../../shared/contrato"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Etiqueta } from "@/components/shared/indicadores"
import { Markdown } from "@/components/shared/markdown"
import { CabecalhoDaPagina, ComDados, Pagina } from "@/components/shared/pagina"
import { progresso, useProgresso } from "@/domain/progresso"
import type { Doc, Modulo } from "@/domain/tipos"
import { useDados } from "@/lib/dados"
import { useSite, useTituloDaPagina } from "@/lib/site"
import { percentual } from "@/lib/texto"
import { cn } from "@/lib/utils"

function ModuloNaTrilha({ modulo, concluido }: { modulo: Modulo; concluido: boolean }) {
  const id = `concluido-${modulo.n}`
  return (
    <Card className={cn("grid grid-cols-[2.75rem_1fr] items-center gap-3 px-4 sm:grid-cols-[2.75rem_1fr_auto]", modulo.material && "ring-primary/40")}>
      <div
        className={cn(
          "grid size-10 place-items-center rounded-full text-base font-extrabold",
          concluido ? "bg-success text-white" : modulo.material ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
        )}
      >
        {concluido ? <CheckIcon className="size-5" /> : modulo.n}
      </div>
      <div className="min-w-0">
        <Link to={rotas.modulo(modulo.n)} className="leading-snug font-semibold hover:text-primary hover:underline">
          {modulo.titulo}
        </Link>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          <Etiqueta>
            <ClockIcon /> {modulo.duracao}
          </Etiqueta>
          {modulo.material ? <Etiqueta tom="azul">Material completo</Etiqueta> : <Etiqueta className="text-muted-foreground">Material em breve</Etiqueta>}
          {modulo.questoes > 0 && (
            <Badge render={<Link to={rotas.questoes({ modulo: modulo.n })} />} className="bg-brand-orange/15 text-brand-orange-ink hover:bg-brand-orange/25">
              <TargetIcon /> {modulo.questoes} questões do exame
            </Badge>
          )}
        </div>
      </div>
      <div className="col-start-2 flex items-center gap-2 sm:col-start-3">
        <Checkbox id={id} checked={concluido} onCheckedChange={(v) => progresso.marcarModulo(modulo.n, !!v)} />
        <Label htmlFor={id} className="text-sm text-muted-foreground">
          Concluí
        </Label>
      </div>
    </Card>
  )
}

export function PaginaDaTrilha() {
  const site = useSite()
  const dados = useProgresso()
  const { dados: doc, erro } = useDados<Doc>(arquivos.doc(docIds.trilha))
  useTituloDaPagina("Trilha")
  const concluidos = Object.keys(dados.modulos).length
  return (
    <ComDados dados={doc} erro={erro}>
      {(doc) => (
        <Pagina largura="leitura">
          <CabecalhoDaPagina
            migalhas={[["Trilha"]]}
            kicker={`${site.modulos.length} módulos · ~56 h`}
            titulo={doc.title}
            subtitulo="O caminho até a prova Professional Machine Learning Engineer. Marque o que já concluiu: o progresso fica salvo só neste navegador."
          />
          <div className="mb-6 flex items-center gap-3">
            <Progress value={percentual(concluidos, site.modulos.length)} className="flex-1" aria-label="Módulos concluídos" />
            <span className="text-sm text-muted-foreground tabular-nums">
              {concluidos}/{site.modulos.length}
            </span>
          </div>
          <ol className="grid gap-2.5">
            {site.modulos.map((m) => (
              <li key={m.n}>
                <ModuloNaTrilha modulo={m} concluido={!!dados.modulos[m.n]} />
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Markdown>{doc.md}</Markdown>
          </div>
        </Pagina>
      )}
    </ComDados>
  )
}
