import { Link } from "react-router-dom"
import { ArrowRightIcon, BookOpenCheckIcon, CheckIcon, LayersIcon, ListChecksIcon, NotebookTextIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Etapa, EtapaId, ModuloStatus, ProximoPasso } from "@/lib/journey"
import { cn } from "@/lib/utils"

export const ETAPA_ICON: Record<EtapaId, typeof LayersIcon> = {
  aulas: NotebookTextIcon,
  revisao: BookOpenCheckIcon,
  flashcards: LayersIcon,
  simulado: ListChecksIcon,
}

// Anel de progresso pequeno (usado no menu e nos cards de módulo)
export function ProgressRing({ value, size = 18, className, label }: { value: number; size?: number; className?: string; label?: string }) {
  const r = (size - 3) / 2
  const c = 2 * Math.PI * r
  const done = value >= 100
  return (
    <span className={cn("relative inline-grid shrink-0 place-items-center", className)} role="img" aria-label={label ?? `${value}% concluído`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth="2.5" className="text-border" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * Math.min(value, 100)) / 100}
          className={done ? "stroke-success" : "stroke-primary"}
        />
      </svg>
      {done && <CheckIcon className="absolute size-[55%] text-success" strokeWidth={3} />}
    </span>
  )
}

function etapaPct(e: Etapa) {
  if (e.id === "simulado") return e.feito
  return e.total ? Math.round((e.feito / e.total) * 100) : 0
}

// Roteiro da seção: as quatro etapas com status e o botão do próximo passo
export function ModuleRoadmap({ status, compact }: { status: ModuloStatus; compact?: boolean }) {
  const { etapas, proxima, done } = status
  return (
    <Card className="mb-6 gap-0 py-0">
      <div className="flex flex-wrap items-center gap-3 border-b px-4 py-3">
        <div>
          <div className="text-sm font-semibold">Roteiro da seção</div>
          <div className="text-xs text-muted-foreground">
            {done ? "Seção concluída. Revise quando quiser." : `Etapa ${etapas.findIndex((e) => !e.done) + 1} de ${etapas.length}`}
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Progress value={status.pct} className="w-28" aria-label="Etapas concluídas" />
          <span className="text-xs text-muted-foreground tabular-nums">{status.pct}%</span>
        </div>
      </div>
      <ol className={cn("grid", compact ? "grid-cols-2 md:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-4")}>
        {etapas.map((e, i) => {
          const Icon = ETAPA_ICON[e.id]
          const atual = proxima?.id === e.id
          return (
            <li key={e.id} className={cn("border-t sm:border-t-0", i > 0 && "lg:border-l", i % 2 === 1 && "sm:border-l", i >= 2 && "sm:border-t lg:border-t-0")}>
              <Link
                to={e.to}
                className={cn("flex h-full gap-3 p-4 transition-colors hover:bg-muted/60", atual && "bg-brand-tint/70 hover:bg-brand-tint")}
                aria-current={atual ? "step" : undefined}
              >
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full border-2 text-xs font-bold",
                    e.done ? "border-success bg-success text-white" : atual ? "border-primary text-primary" : "border-border text-muted-foreground"
                  )}
                >
                  {e.done ? <CheckIcon className="size-4" strokeWidth={3} /> : i + 1}
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1.5 text-sm font-semibold">
                    <Icon className="size-3.5 text-muted-foreground" /> {e.titulo}
                  </span>
                  {!compact && <span className="mt-0.5 block text-xs text-muted-foreground">{e.descricao}</span>}
                  <span className={cn("mt-1 block text-xs font-medium", e.done ? "text-success" : atual ? "text-primary" : "text-muted-foreground")}>
                    {e.detalhe}
                  </span>
                  {!e.done && e.id !== "revisao" && etapaPct(e) > 0 && <Progress value={etapaPct(e)} className="mt-2" aria-label={e.detalhe} />}
                </span>
              </Link>
            </li>
          )
        })}
      </ol>
      {proxima && (
        <div className="flex flex-wrap items-center gap-3 border-t px-4 py-3">
          <span className="text-sm">
            <span className="text-muted-foreground">Próximo passo: </span>
            <strong>{proxima.titulo}</strong>
          </span>
          <Button className="ml-auto" render={<Link to={proxima.to} />} nativeButton={false}>
            Continuar <ArrowRightIcon />
          </Button>
        </div>
      )}
    </Card>
  )
}

export function NextStepCard({ passo, className }: { passo: ProximoPasso; className?: string }) {
  return (
    <Card className={cn("border-primary/30 bg-brand-tint ring-primary/30", className)}>
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1">
          <div className="text-xs font-bold tracking-widest text-primary uppercase">Seu próximo passo</div>
          <div className="mt-1 text-lg leading-snug font-bold">{passo.titulo}</div>
          <div className="text-sm text-muted-foreground">{passo.contexto}</div>
        </div>
        <Button size="lg" className="h-11 w-full px-4 text-base sm:w-auto" render={<Link to={passo.to} />} nativeButton={false}>
          {passo.cta} <ArrowRightIcon />
        </Button>
      </CardContent>
    </Card>
  )
}

// Rodapé de fim de atividade: diz o que fazer em seguida
export function WhatsNext({ titulo, texto, to, cta }: { titulo: string; texto: string; to: string; cta: string }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-primary/30 bg-brand-tint p-4">
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold">{titulo}</div>
        <div className="text-sm text-muted-foreground">{texto}</div>
      </div>
      <Button render={<Link to={to} />} nativeButton={false}>
        {cta} <ArrowRightIcon />
      </Button>
    </div>
  )
}
