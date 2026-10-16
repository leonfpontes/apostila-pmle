import type { ReactNode } from "react"
import { CheckIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

// Indicadores visuais reutilizáveis: anel de progresso, número em destaque,
// estrelas de relevância e etiquetas coloridas.

export function AnelDeProgresso({ valor, tamanho = 18, className, rotulo }: { valor: number; tamanho?: number; className?: string; rotulo?: string }) {
  const r = (tamanho - 3) / 2
  const c = 2 * Math.PI * r
  const completo = valor >= 100
  return (
    <span className={cn("relative inline-grid shrink-0 place-items-center", className)} role="img" aria-label={rotulo ?? `${valor}% concluído`}>
      <svg width={tamanho} height={tamanho} viewBox={`0 0 ${tamanho} ${tamanho}`} className="-rotate-90">
        <circle cx={tamanho / 2} cy={tamanho / 2} r={r} fill="none" stroke="currentColor" strokeWidth="2.5" className="text-border" />
        <circle
          cx={tamanho / 2}
          cy={tamanho / 2}
          r={r}
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * Math.min(valor, 100)) / 100}
          className={completo ? "stroke-success" : "stroke-primary"}
        />
      </svg>
      {completo && <CheckIcon className="absolute size-[55%] text-success" strokeWidth={3} />}
    </span>
  )
}

/** Número grande com legenda; com `total`, mostra "x / total" e uma barra. */
export function Numero({ valor, legenda, total, destaque }: { valor: number; legenda: string; total?: number; destaque?: boolean }) {
  if (destaque)
    return (
      <div className="rounded-2xl superficie-destaque p-4">
        <div className="text-3xl font-extrabold text-primary tabular-nums">{valor}</div>
        <div className="text-sm text-muted-foreground">{legenda}</div>
      </div>
    )
  return (
    <Card size="sm">
      <CardContent>
        <div className="text-xs text-muted-foreground">{legenda}</div>
        <div className="mt-1 text-2xl font-extrabold tabular-nums">
          {valor}
          {total !== undefined && <span className="text-sm font-medium text-muted-foreground"> / {total}</span>}
        </div>
        {total !== undefined && <Progress value={total ? (valor / total) * 100 : 0} className="mt-2" aria-label={legenda} />}
      </CardContent>
    </Card>
  )
}

export function Estrelas({ quantidade, comLegenda }: { quantidade: number; comLegenda?: boolean }) {
  if (!quantidade) return null
  return (
    <span className="inline-flex items-center gap-1" title="Relevância para a prova">
      <span className="text-xs tracking-tighter text-brand-orange">{"★".repeat(quantidade)}</span>
      {comLegenda && "relevância para a prova"}
    </span>
  )
}

const TONS = {
  neutro: "",
  azul: "border-transparent bg-secondary text-secondary-foreground",
  sucesso: "border-transparent bg-success-bg text-success",
  erro: "border-transparent bg-destructive/10 text-destructive",
  laranja: "border-transparent bg-brand-orange/15 text-brand-orange-ink",
} as const
export type Tom = keyof typeof TONS

/** Badge com as cores semânticas da apostila. */
export function Etiqueta({ children, tom = "neutro", className }: { children: ReactNode; tom?: Tom; className?: string }) {
  return (
    <Badge variant="outline" className={cn(TONS[tom], className)}>
      {children}
    </Badge>
  )
}
