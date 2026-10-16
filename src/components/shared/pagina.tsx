import { Fragment, useEffect, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { rotas } from "../../../shared/contrato"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

// Estrutura comum a todas as páginas: contêiner, cabeçalho, estados de
// carregamento/erro e rodapé. Toda página nova deve usar estes blocos.

export type Migalha = [rotulo: string, destino?: string]
type Largura = "leitura" | "pagina" | "larga"

const LARGURA: Record<Largura, string> = {
  leitura: "max-w-(--largura-leitura)",
  pagina: "max-w-(--largura-pagina)",
  larga: "max-w-(--largura-larga)",
}

export function Pagina({ children, largura = "pagina", className }: { children: ReactNode; largura?: Largura; className?: string }) {
  return (
    <div className={cn("mx-auto w-full px-4 pt-6 pb-20 md:px-8 md:pt-8", LARGURA[largura], className)}>
      {children}
      <Rodape />
    </div>
  )
}

export function Migalhas({ itens }: { itens: Migalha[] }) {
  const todas: Migalha[] = [["Início", rotas.inicio()], ...itens]
  return (
    <Breadcrumb className="mb-3">
      <BreadcrumbList>
        {todas.map(([rotulo, destino], i) => (
          <Fragment key={i}>
            {i > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {destino && i < todas.length - 1 ? (
                <BreadcrumbLink render={<Link to={destino} />}>{rotulo}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="line-clamp-1">{rotulo}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export function CabecalhoDaPagina({
  migalhas,
  kicker,
  titulo,
  subtitulo,
  children,
}: {
  migalhas?: Migalha[]
  kicker?: ReactNode
  titulo: ReactNode
  subtitulo?: ReactNode
  children?: ReactNode
}) {
  return (
    <header className="mb-6">
      {migalhas && <Migalhas itens={migalhas} />}
      {kicker && <div className="mb-1.5 kicker">{kicker}</div>}
      <h1 className="font-heading text-3xl leading-tight font-extrabold tracking-tight text-balance md:text-4xl">{titulo}</h1>
      {subtitulo && <p className="mt-2 max-w-3xl text-lg text-brand-text">{subtitulo}</p>}
      {children}
    </header>
  )
}

export function Carregando() {
  return (
    <div className="mx-auto w-full max-w-(--largura-leitura) px-4 pt-8 md:px-8" aria-busy="true">
      <Skeleton className="mb-3 h-4 w-48" />
      <Skeleton className="mb-6 h-10 w-3/4" />
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    </div>
  )
}

export function Erro({ erro }: { erro: Error }) {
  return (
    <div className="mx-auto w-full max-w-(--largura-leitura) px-4 pt-8 md:px-8">
      <Alert variant="destructive">
        <AlertTitle>Algo deu errado</AlertTitle>
        <AlertDescription>{erro.message}</AlertDescription>
      </Alert>
    </div>
  )
}

export function NaoEncontrada() {
  useEffect(() => {
    document.title = "Página não encontrada · Apostila PMLE"
  }, [])
  return (
    <Pagina largura="leitura">
      <CabecalhoDaPagina titulo="Página não encontrada" subtitulo="O endereço não corresponde a nenhuma página da apostila." />
      <Link className="link-texto" to={rotas.inicio()}>
        Voltar ao início
      </Link>
    </Pagina>
  )
}

/**
 * Envolve uma página que depende de um JSON: mostra carregando, erro ou o conteúdo.
 * Evita repetir o mesmo `if (erro) … if (!dados) …` em cada página.
 */
export function ComDados<T>({ dados, erro, children }: { dados: T | undefined; erro: Error | undefined; children: (dados: T) => ReactNode }) {
  if (erro) return <Erro erro={erro} />
  if (dados === undefined) return <Carregando />
  return <>{children(dados)}</>
}

function Rodape() {
  return (
    <footer className="mt-16 flex flex-wrap items-center gap-3 border-t pt-5 text-xs text-muted-foreground">
      <img src={`${import.meta.env.BASE_URL}assets/atra-logo.png`} alt="ATRA" className="h-4 w-auto" />
      <span>Apostila de estudos da trilha Professional Machine Learning Engineer · material não oficial, feito para estudo.</span>
    </footer>
  )
}
