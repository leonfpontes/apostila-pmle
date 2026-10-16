import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LinkTexto } from "./navegacao"

/** Card pequeno com ícone, título, texto e um link opcional. Base das dicas e passos do guia. */
export function CartaoInformativo({
  icone: Icone,
  titulo,
  children,
  link,
  marcador,
}: {
  icone?: LucideIcon
  titulo: ReactNode
  children: ReactNode
  link?: { para: string; rotulo: string }
  /** substitui o ícone (ex.: estrelas) */
  marcador?: ReactNode
}) {
  return (
    <Card size="sm" className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          {marcador ?? (Icone && <Icone className="size-4 text-primary" />)} {titulo}
        </CardTitle>
        <CardDescription className="leading-relaxed">{children}</CardDescription>
      </CardHeader>
      {link && (
        <CardContent>
          <LinkTexto para={link.para} seta>
            {link.rotulo}
          </LinkTexto>
        </CardContent>
      )}
    </Card>
  )
}
