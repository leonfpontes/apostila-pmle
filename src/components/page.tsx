import { Fragment, type ReactNode } from "react"
import { Link } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

export type Crumb = [label: string, to?: string]

export function Crumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [["Início", "/"], ...items]
  return (
    <Breadcrumb className="mb-3">
      <BreadcrumbList>
        {all.map(([label, to], i) => (
          <Fragment key={i}>
            {i > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {to && i < all.length - 1 ? (
                <BreadcrumbLink render={<Link to={to} />}>{label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="line-clamp-1">{label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export function PageHeader({
  crumbs,
  kicker,
  title,
  sub,
  children,
}: {
  crumbs?: Crumb[]
  kicker?: ReactNode
  title: ReactNode
  sub?: ReactNode
  children?: ReactNode
}) {
  return (
    <header className="mb-6">
      {crumbs && <Crumbs items={crumbs} />}
      {kicker && <div className="mb-1.5 text-xs font-bold tracking-widest text-brand-orange-ink uppercase">{kicker}</div>}
      <h1 className="font-heading text-3xl leading-tight font-extrabold tracking-tight text-balance md:text-4xl">{title}</h1>
      {sub && <p className="mt-2 max-w-3xl text-lg text-brand-text">{sub}</p>}
      {children}
    </header>
  )
}

export function Page({ children, narrow, className }: { children: ReactNode; narrow?: boolean; className?: string }) {
  return <div className={cn("mx-auto w-full px-4 pt-6 pb-20 md:px-8 md:pt-8", narrow ? "max-w-3xl" : "max-w-5xl", className)}>{children}</div>
}

export function Loading() {
  return (
    <Page narrow>
      <Skeleton className="mb-3 h-4 w-48" />
      <Skeleton className="mb-6 h-10 w-3/4" />
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    </Page>
  )
}

export function ErrorState({ error }: { error: Error }) {
  return (
    <Page narrow>
      <Alert variant="destructive">
        <AlertTitle>Algo deu errado</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    </Page>
  )
}

export function NotFound() {
  return (
    <Page narrow>
      <PageHeader title="Página não encontrada" sub="O endereço não corresponde a nenhuma página da apostila." />
      <Link className="text-primary underline" to="/">
        Voltar ao início
      </Link>
    </Page>
  )
}

export function Footer() {
  return (
    <footer className="mt-16 flex flex-wrap items-center gap-3 border-t pt-5 text-xs text-muted-foreground">
      <img src={`${import.meta.env.BASE_URL}assets/atra-logo.png`} alt="ATRA" className="h-4 w-auto" />
      <span>Apostila de estudos da trilha Professional Machine Learning Engineer · material não oficial, feito para estudo.</span>
    </footer>
  )
}
