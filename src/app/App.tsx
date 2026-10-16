import { useEffect, useState, type CSSProperties } from "react"
import { useLocation, useRoutes } from "react-router-dom"
import { arquivos } from "../../shared/contrato"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Cabecalho } from "@/components/layout/cabecalho"
import { MenuLateral } from "@/components/layout/menu-lateral"
import { Carregando, Erro } from "@/components/shared/pagina"
import { progresso } from "@/domain/progresso"
import type { Site } from "@/domain/tipos"
import { carregar } from "@/lib/dados"
import { SiteContext } from "@/lib/site"
import { ROTAS } from "./rotas"

const PAGINAS_SEM_HISTORICO = ["/", "/busca"]

/** Guarda a última página de estudo para o "Voltar para onde parou" da página inicial. */
function LembrarUltimaPagina() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    if (PAGINAS_SEM_HISTORICO.includes(pathname)) return
    const t = setTimeout(() => progresso.lembrarUltimaPagina(pathname + search, document.title.replace(/ · Apostila PMLE$/, "")), 600)
    return () => clearTimeout(t)
  }, [pathname, search])
  return null
}

function Layout() {
  const pagina = useRoutes(ROTAS)
  return (
    <SidebarProvider style={{ "--sidebar-width": "var(--largura-menu)" } as CSSProperties}>
      <MenuLateral />
      <SidebarInset className="min-w-0">
        <Cabecalho />
        <LembrarUltimaPagina />
        {pagina}
      </SidebarInset>
    </SidebarProvider>
  )
}

export default function App() {
  const [site, setSite] = useState<Site | null>(null)
  const [erro, setErro] = useState<Error | null>(null)
  useEffect(() => {
    carregar<Site>(arquivos.site).then(setSite, setErro)
  }, [])
  if (erro) return <Erro erro={erro} />
  if (!site) return <Carregando />
  return (
    <SiteContext.Provider value={site}>
      <Layout />
    </SiteContext.Provider>
  )
}
