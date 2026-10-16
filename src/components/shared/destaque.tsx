import type { ReactNode } from "react"
import { ArrowRightIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { BotaoLink } from "./navegacao"

// Chamada de destaque: rótulo, título, texto e uma ação. É a base do
// "próximo passo", do "o que fazer agora" e de outros avisos com botão.

type Acao = { para: string; rotulo: string } | ReactNode

export function Destaque({
  rotulo,
  titulo,
  texto,
  acao,
  tom = "marca",
  compacto,
  className,
  children,
}: {
  rotulo?: string
  titulo: ReactNode
  texto?: ReactNode
  acao?: Acao
  tom?: "marca" | "sucesso"
  compacto?: boolean
  className?: string
  children?: ReactNode
}) {
  const ehLink = (a: Acao): a is { para: string; rotulo: string } => !!a && typeof a === "object" && "para" in a
  return (
    <Card className={cn(tom === "sucesso" ? "bg-success-bg ring-success/40" : "superficie-destaque", className)}>
      <CardContent className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="min-w-0 flex-1">
          {rotulo && <div className="text-xs font-bold tracking-widest text-primary uppercase">{rotulo}</div>}
          <div className={cn("leading-snug font-bold", compacto ? "text-sm" : "mt-1 text-lg")}>{titulo}</div>
          {texto && <div className="text-sm text-muted-foreground">{texto}</div>}
        </div>
        {children}
        {ehLink(acao) ? (
          <BotaoLink para={acao.para} size={compacto ? "default" : "lg"} className={cn(!compacto && "h-11 px-4 text-base", "w-full lg:w-auto")}>
            {acao.rotulo} <ArrowRightIcon />
          </BotaoLink>
        ) : (
          acao
        )}
      </CardContent>
    </Card>
  )
}
