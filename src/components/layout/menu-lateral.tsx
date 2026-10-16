import { Link, useLocation } from "react-router-dom"
import {
  BookOpenIcon,
  CalendarDaysIcon,
  ChartNoAxesColumnIcon,
  ChevronRightIcon,
  CompassIcon,
  GraduationCapIcon,
  HomeIcon,
  LayersIcon,
  LinkIcon,
  ListChecksIcon,
  RouteIcon,
  TargetIcon,
  TriangleAlertIcon,
  type LucideIcon,
} from "lucide-react"
import { rotas } from "../../../shared/contrato"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { AnelDeProgresso } from "@/components/shared/indicadores"
import { JornadaDaSecao } from "@/domain/jornada/jornada"
import { ProgressStore, useProgresso } from "@/domain/progresso"
import { ROTULO_MATERIAL, temMaterial, type ModuloComMaterial, type Secao } from "@/domain/tipos"
import { useSite } from "@/lib/site"

// Menu lateral. Os itens fixos estão em GRUPOS: para adicionar uma página ao
// menu, acrescente um item aqui (não é preciso mexer no JSX).

type ItemDoMenu = { para: string; rotulo: string; icone: LucideIcon; contador?: "questoes" }
type GrupoDoMenu = { titulo?: string; itens: ItemDoMenu[]; posicao: "topo" | "fim" }

const GRUPOS: GrupoDoMenu[] = [
  {
    posicao: "topo",
    itens: [
      { para: rotas.inicio(), rotulo: "Início", icone: HomeIcon },
      { para: rotas.comece(), rotulo: "Comece aqui", icone: CompassIcon },
      { para: rotas.progresso(), rotulo: "Meu progresso", icone: ChartNoAxesColumnIcon },
      { para: rotas.trilha(), rotulo: "Trilha dos 15 módulos", icone: RouteIcon },
      { para: rotas.cronograma(), rotulo: "Cronograma", icone: CalendarDaysIcon },
    ],
  },
  {
    posicao: "fim",
    titulo: "Praticar",
    itens: [
      { para: rotas.flashcards(), rotulo: "Flashcards", icone: LayersIcon },
      { para: rotas.simulados(), rotulo: "Simulados das seções", icone: ListChecksIcon },
    ],
  },
  {
    posicao: "fim",
    titulo: "Exame PMLE",
    itens: [
      { para: rotas.exame(), rotulo: "Guia do exame", icone: BookOpenIcon },
      { para: rotas.materiais(), rotulo: "Materiais da turma", icone: LinkIcon },
      { para: rotas.questoes(), rotulo: "Banco de questões", icone: TargetIcon, contador: "questoes" },
    ],
  },
]

function useMenu() {
  const { pathname } = useLocation()
  const { setOpenMobile } = useSidebar()
  return { pathname, ativo: (rota: string) => pathname === rota.split("?")[0], fechar: () => setOpenMobile(false) }
}

function Item({ item, contador }: { item: ItemDoMenu; contador?: number }) {
  const { pathname, ativo, fechar } = useMenu()
  const Icone = item.icone
  const marcado = item.contador ? pathname.startsWith(item.para) : ativo(item.para)
  return (
    <SidebarMenuItem>
      <SidebarMenuButton isActive={marcado} render={<Link to={item.para} onClick={fechar} />}>
        <Icone />
        <span>{item.rotulo}</span>
      </SidebarMenuButton>
      {contador !== undefined && <SidebarMenuBadge>{contador}</SidebarMenuBadge>}
    </SidebarMenuItem>
  )
}

function SecaoNoMenu({ modulo, secao }: { modulo: ModuloComMaterial; secao: Secao }) {
  const { pathname, ativo, fechar } = useMenu()
  const dados = useProgresso()
  const base = rotas.secao(modulo.n, secao.n)
  const aberta = pathname.startsWith(base) || secao.aulas.some((a) => pathname.startsWith(rotas.aula(modulo.n, a)))
  const percentual = new JornadaDaSecao(modulo, secao, dados).percentual
  return (
    <Collapsible key={`${secao.n}-${aberta}`} defaultOpen={aberta} render={<SidebarMenuItem />}>
      <CollapsibleTrigger render={<SidebarMenuButton isActive={ativo(base)} />} className="group/trigger h-auto min-h-8 py-1.5">
        <span className="w-6 shrink-0 text-xs font-semibold text-muted-foreground tabular-nums">S{secao.n}</span>
        <span className="line-clamp-2 leading-snug">{secao.titulo}</span>
        <AnelDeProgresso valor={percentual} tamanho={16} className="ml-auto" />
        <ChevronRightIcon className="transition-transform group-data-[panel-open]/trigger:rotate-90" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton isActive={ativo(base)} render={<Link to={base} onClick={fechar} />}>
              <span>Visão geral</span>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
          {secao.aulas.map((id) => {
            const aula = modulo.aulas.find((a) => a.id === id)!
            const para = rotas.aula(modulo.n, id)
            return (
              <SidebarMenuSubItem key={id}>
                <SidebarMenuSubButton isActive={pathname.startsWith(para)} render={<Link to={para} onClick={fechar} />}>
                  <span className="w-6 shrink-0 text-xs text-muted-foreground tabular-nums">{id}</span>
                  <span>{aula.titulo}</span>
                  {dados.aulas[ProgressStore.chaves.aula(modulo.n, id)] && <span className="ml-auto size-1.5 shrink-0 rounded-full bg-success" title="Estudada" />}
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            )
          })}
          {secao.materiais.map((mt) => {
            const para = rotas.material(modulo.n, secao.n, mt.tipo)
            return (
              <SidebarMenuSubItem key={mt.tipo}>
                <SidebarMenuSubButton isActive={ativo(para)} render={<Link to={para} onClick={fechar} />}>
                  <span className="font-medium text-primary">{ROTULO_MATERIAL[mt.tipo].label}</span>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            )
          })}
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  )
}

function ModuloNoMenu({ modulo }: { modulo: ModuloComMaterial }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Módulo {modulo.n}</SidebarGroupLabel>
      <SidebarMenu>
        <Item item={{ para: rotas.modulo(modulo.n), rotulo: modulo.nomeCurto, icone: GraduationCapIcon }} />
        {modulo.armadilhas && <Item item={{ para: rotas.armadilhas(modulo.n), rotulo: "Armadilhas e cheat-sheet", icone: TriangleAlertIcon }} />}
        {modulo.secoes.map((s) => (
          <SecaoNoMenu key={s.n} modulo={modulo} secao={s} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

function Grupo({ grupo }: { grupo: GrupoDoMenu }) {
  const site = useSite()
  return (
    <SidebarGroup>
      {grupo.titulo && <SidebarGroupLabel>{grupo.titulo}</SidebarGroupLabel>}
      <SidebarMenu>
        {grupo.itens.map((item) => (
          <Item key={item.para} item={item} contador={item.contador ? site.stats.questoes : undefined} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

export function MenuLateral() {
  const site = useSite()
  const { fechar } = useMenu()
  return (
    <Sidebar>
      <SidebarHeader className="px-4 pt-4 pb-2">
        <Link to={rotas.inicio()} onClick={fechar} className="flex items-center gap-3">
          <img src={`${import.meta.env.BASE_URL}assets/atra-logo.png`} alt="ATRA" className="h-6 w-auto" />
          <span className="h-5 w-px bg-sidebar-border" />
          <span className="text-sm font-bold">Apostila PMLE</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {GRUPOS.filter((g) => g.posicao === "topo").map((g, i) => (
          <Grupo key={i} grupo={g} />
        ))}
        {site.modulos.filter(temMaterial).map((m) => (
          <ModuloNoMenu key={m.n} modulo={m} />
        ))}
        {GRUPOS.filter((g) => g.posicao === "fim").map((g, i) => (
          <Grupo key={i} grupo={g} />
        ))}
      </SidebarContent>
      <SidebarFooter className="px-4 pb-4 text-xs text-muted-foreground">Progresso salvo só neste navegador.</SidebarFooter>
    </Sidebar>
  )
}
