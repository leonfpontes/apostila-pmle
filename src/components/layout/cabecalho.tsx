import { useCallback, useState } from "react"
import { Link } from "react-router-dom"
import { MoonIcon, SearchIcon, SunIcon } from "lucide-react"
import { rotas } from "../../../shared/contrato"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Kbd } from "@/components/shared/kbd"
import { useTema } from "@/hooks/use-tema"
import { useAtalhoDeBusca } from "@/hooks/use-atalho-de-busca"
import { BuscaRapida } from "./busca-rapida"

/** Barra fixa no topo: menu, busca e tema claro/escuro. */
export function Cabecalho() {
  const { tema, alternar } = useTema()
  const [buscaAberta, setBuscaAberta] = useState(false)
  useAtalhoDeBusca(useCallback(() => setBuscaAberta(true), []))

  return (
    <header className="sticky top-0 z-20 flex h-(--altura-topo) shrink-0 items-center gap-2 border-b bg-background/85 px-3 backdrop-blur md:px-4">
      <SidebarTrigger aria-label="Abrir ou fechar o menu" />
      <Link to={rotas.inicio()} className="shrink-0 md:hidden" aria-label="Início">
        <img src={`${import.meta.env.BASE_URL}assets/atra-mark.png`} alt="" className="h-6 w-auto" />
      </Link>
      <Separator orientation="vertical" className="mr-1 hidden h-5! md:block" />
      <Button variant="outline" className="h-9 flex-1 justify-start gap-2 text-muted-foreground md:max-w-md" onClick={() => setBuscaAberta(true)}>
        <SearchIcon />
        <span className="truncate">Buscar em todo o material…</span>
        <Kbd className="ml-auto hidden sm:inline-flex">Ctrl K</Kbd>
      </Button>
      <Button variant="ghost" size="icon" className="ml-auto" aria-label="Alternar tema claro/escuro" onClick={alternar}>
        {tema === "dark" ? <MoonIcon /> : <SunIcon />}
      </Button>
      <BuscaRapida aberta={buscaAberta} aoMudar={setBuscaAberta} />
    </header>
  )
}
