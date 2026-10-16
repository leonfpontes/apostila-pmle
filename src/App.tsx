import { useEffect, useState } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { ErrorState, Loading, NotFound } from "@/components/page"
import { loadJSON, type Site } from "@/lib/data"
import { updateProgress } from "@/lib/progress"
import { SiteContext } from "@/lib/site"
import { Home } from "@/pages/home"
import { Trilha } from "@/pages/trilha"
import { AulaPage, CursoPage, ModuloDocPage, ModuloPage, cursoCrumbs } from "@/pages/curso"
import { DocPage } from "@/pages/doc-page"
import { AllFlashcards, FlashcardsPage } from "@/pages/flashcards"
import { AllSimulados, SimuladoPage } from "@/pages/simulados"
import { BancoPage } from "@/pages/banco"
import { BuscaPage } from "@/pages/busca"
import { ComecePage } from "@/pages/comece"
import { ProgressoPage } from "@/pages/progresso"
import { MateriaisPage } from "@/pages/materiais"
import { useParams } from "react-router-dom"

function Armadilhas() {
  const n = Number(useParams().n)
  return <DocPage id={`c${n}-armadilhas`} crumbs={cursoCrumbs(n)} filter />
}

// Guarda a última página de estudo para o botão "Continuar" da página inicial
function RememberLast() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    if (pathname === "/" || pathname === "/busca") return
    const t = setTimeout(() => {
      const title = document.title.replace(/ · Apostila PMLE$/, "")
      updateProgress((p) => {
        p.last = { route: pathname + search, title }
      })
    }, 600)
    return () => clearTimeout(t)
  }, [pathname, search])
  return null
}

export default function App() {
  const [site, setSite] = useState<Site | null>(null)
  const [error, setError] = useState<Error | null>(null)
  useEffect(() => {
    loadJSON<Site>("site.json").then(setSite, setError)
  }, [])

  if (error) return <ErrorState error={error} />
  if (!site) return <Loading />

  return (
    <SiteContext.Provider value={site}>
      <SidebarProvider style={{ "--sidebar-width": "18rem" } as React.CSSProperties}>
        <AppSidebar />
        <SidebarInset className="min-w-0">
          <SiteHeader />
          <RememberLast />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trilha" element={<Trilha />} />
            <Route path="/comece" element={<ComecePage />} />
            <Route path="/progresso" element={<ProgressoPage />} />
            <Route path="/materiais" element={<MateriaisPage />} />
            <Route path="/cronograma" element={<DocPage id="cronograma" crumbs={[["Trilha", "/trilha"]]} />} />
            <Route path="/exame" element={<DocPage id="exame-guia" crumbs={[["Exame PMLE"]]} />} />
            <Route path="/questoes" element={<BancoPage />} />
            <Route path="/questoes/sobre" element={<DocPage id="exame-banco" crumbs={[["Banco de questões", "/questoes"]]} narrow toc={false} />} />
            <Route path="/flashcards" element={<AllFlashcards />} />
            <Route path="/simulados" element={<AllSimulados />} />
            <Route path="/busca" element={<BuscaPage />} />
            <Route path="/curso/:n" element={<CursoPage />} />
            <Route path="/curso/:n/armadilhas" element={<Armadilhas />} />
            <Route path="/curso/:n/modulo/:m" element={<ModuloPage />} />
            <Route path="/curso/:n/modulo/:m/revisao" element={<ModuloDocPage tipo="revisao" />} />
            <Route path="/curso/:n/modulo/:m/glossario" element={<ModuloDocPage tipo="glossario" />} />
            <Route path="/curso/:n/modulo/:m/flashcards" element={<FlashcardsPage />} />
            <Route path="/curso/:n/modulo/:m/simulado" element={<SimuladoPage />} />
            <Route path="/curso/:n/aula/:id" element={<AulaPage />} />
            <Route path="/curso/:n/aula/:id/transcricao" element={<AulaPage transcricao />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SidebarInset>
      </SidebarProvider>
    </SiteContext.Provider>
  )
}
