import type { ComponentProps, ReactNode } from "react"
import { Link } from "react-router-dom"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Peças de navegação reutilizáveis: botão que é link, link de texto, card
// clicável e paginação anterior/próximo.

type PropsDoBotao = Omit<ComponentProps<typeof Button>, "render" | "nativeButton"> & { para: string }

/** Botão do shadcn que navega para uma rota interna. */
export function BotaoLink({ para, children, ...props }: PropsDoBotao) {
  return (
    <Button render={<Link to={para} />} nativeButton={false} {...props}>
      {children}
    </Button>
  )
}

/** Link de texto na cor da marca, com seta opcional. */
export function LinkTexto({ para, children, seta, className }: { para: string; children: ReactNode; seta?: boolean; className?: string }) {
  return (
    <Link to={para} className={cn("link-texto", className)}>
      {children}
      {seta && <ArrowRightIcon className="size-3.5" />}
    </Link>
  )
}

/** Card inteiro clicável. Repassa as props do Card (size, className…). */
export function CardLink({ para, children, className, ...props }: { para: string } & ComponentProps<typeof Card>) {
  return (
    <Link to={para} className="block h-full rounded-xl focus-visible:outline-none">
      <Card className={cn("h-full card-interativo", className)} {...props}>
        {children}
      </Card>
    </Link>
  )
}

type Vizinho = { para: string; rotulo: string; titulo: string }

/** "← anterior | próximo →" no fim de aulas e módulos. */
export function Paginacao({ anterior, proximo }: { anterior?: Vizinho; proximo?: Vizinho }) {
  const item = (v: Vizinho, lado: "anterior" | "proximo") => (
    <Link to={v.para} className={cn("rounded-xl border bg-card p-3.5 transition-colors hover:border-primary", lado === "proximo" && "col-start-2 text-right")}>
      <span className={cn("flex items-center gap-1 text-xs text-muted-foreground", lado === "proximo" && "justify-end")}>
        {lado === "anterior" && <ArrowLeftIcon className="size-3" />}
        {v.rotulo}
        {lado === "proximo" && <ArrowRightIcon className="size-3" />}
      </span>
      <span className="line-clamp-2 font-medium">{v.titulo}</span>
    </Link>
  )
  return (
    <nav className="mt-12 grid grid-cols-2 gap-3" aria-label="Navegação entre páginas">
      {anterior ? item(anterior, "anterior") : <span />}
      {proximo && item(proximo, "proximo")}
    </nav>
  )
}
