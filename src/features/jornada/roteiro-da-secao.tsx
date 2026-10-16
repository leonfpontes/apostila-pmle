import { Link } from "react-router-dom"
import { ArrowRightIcon, CheckIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BotaoLink } from "@/components/shared/navegacao"
import type { Etapa } from "@/domain/jornada/etapas"
import { ICONE_DA_ETAPA } from "./icones"
import type { JornadaDaSecao } from "@/domain/jornada/jornada"
import { cn } from "@/lib/utils"

function PassoDoRoteiro({ etapa, ordem, atual }: { etapa: Etapa; ordem: number; atual: boolean }) {
  const Icone = ICONE_DA_ETAPA[etapa.id]
  const mostrarBarra = !etapa.concluida && etapa.id !== "revisao" && etapa.percentual > 0
  return (
    <Link
      to={etapa.destino}
      aria-current={atual ? "step" : undefined}
      className={cn("flex h-full gap-3 p-4 transition-colors hover:bg-muted/60", atual && "bg-brand-tint/70 hover:bg-brand-tint")}
    >
      <span
        className={cn(
          "grid size-8 shrink-0 place-items-center rounded-full border-2 text-xs font-bold",
          etapa.concluida ? "border-success bg-success text-white" : atual ? "border-primary text-primary" : "border-border text-muted-foreground"
        )}
      >
        {etapa.concluida ? <CheckIcon className="size-4" strokeWidth={3} /> : ordem}
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-1.5 text-sm font-semibold">
          <Icone className="size-3.5 text-muted-foreground" /> {etapa.titulo}
        </span>
        <span className="mt-0.5 block text-xs text-muted-foreground">{etapa.descricao}</span>
        <span className={cn("mt-1 block text-xs font-medium", etapa.concluida ? "text-success" : atual ? "text-primary" : "text-muted-foreground")}>{etapa.detalhe}</span>
        {mostrarBarra && <Progress value={etapa.percentual} className="mt-2" aria-label={etapa.detalhe} />}
      </span>
    </Link>
  )
}

/** As etapas da seção com status e o botão para a próxima. */
export function RoteiroDaSecao({ jornada }: { jornada: JornadaDaSecao }) {
  const { etapas, proxima, concluida, percentual } = jornada
  return (
    <Card className="mb-6 gap-0 py-0">
      <div className="flex flex-wrap items-center gap-3 border-b px-4 py-3">
        <div>
          <div className="text-sm font-semibold">Roteiro da seção</div>
          <div className="text-xs text-muted-foreground">{concluida ? "Seção concluída. Revise quando quiser." : `Etapa ${etapas.indexOf(proxima!) + 1} de ${etapas.length}`}</div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Progress value={percentual} className="w-28" aria-label="Etapas concluídas" />
          <span className="text-xs text-muted-foreground tabular-nums">{percentual}%</span>
        </div>
      </div>
      <ol className="grid sm:grid-cols-2 lg:grid-cols-4">
        {etapas.map((e, i) => (
          <li key={e.id} className={cn("border-t sm:border-t-0", i % 2 === 1 && "sm:border-l", i >= 2 && "sm:border-t lg:border-t-0", i > 0 && "lg:border-l")}>
            <PassoDoRoteiro etapa={e} ordem={i + 1} atual={proxima?.id === e.id} />
          </li>
        ))}
      </ol>
      {proxima && (
        <div className="flex flex-wrap items-center gap-3 border-t px-4 py-3">
          <span className="text-sm">
            <span className="text-muted-foreground">Próximo passo: </span>
            <strong>{proxima.titulo}</strong>
          </span>
          <BotaoLink para={proxima.destino} className="ml-auto">
            Continuar <ArrowRightIcon />
          </BotaoLink>
        </div>
      )}
    </Card>
  )
}
