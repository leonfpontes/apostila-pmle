import { Link, useLocation } from "react-router-dom"
import {
  BookOpenIcon,
  CalendarDaysIcon,
  ChartNoAxesColumnIcon,
  CompassIcon,
  LinkIcon,
  ChevronRightIcon,
  GraduationCapIcon,
  HomeIcon,
  LayersIcon,
  ListChecksIcon,
  RouteIcon,
  TargetIcon,
  TriangleAlertIcon,
} from "lucide-react"
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { MATERIAIS } from "@/lib/data"
import { useProgress } from "@/lib/progress"
import { moduloStatus } from "@/lib/journey"
import { ProgressRing } from "@/components/journey"
import { useSite } from "@/lib/site"

export function AppSidebar() {
  const site = useSite()
  const { pathname } = useLocation()
  const progress = useProgress()
  const { setOpenMobile } = useSidebar()
  const close = () => setOpenMobile(false)
  const is = (p: string) => pathname === p

  const nav = (to: string, label: string, Icon: typeof HomeIcon) => (
    <SidebarMenuItem key={to}>
      <SidebarMenuButton isActive={is(to)} render={<Link to={to} onClick={close} />}>
        <Icon />
        <span>{label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )

  return (
    <Sidebar>
      <SidebarHeader className="px-4 pt-4 pb-2">
        <Link to="/" onClick={close} className="flex items-center gap-3">
          <img src={`${import.meta.env.BASE_URL}assets/atra-logo.png`} alt="ATRA" className="h-6 w-auto" />
          <span className="h-5 w-px bg-sidebar-border" />
          <span className="text-sm font-bold">Apostila PMLE</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {nav("/", "Início", HomeIcon)}
            {nav("/comece", "Comece aqui", CompassIcon)}
            {nav("/progresso", "Meu progresso", ChartNoAxesColumnIcon)}
            {nav("/trilha", "Trilha dos 15 módulos", RouteIcon)}
            {nav("/cronograma", "Cronograma", CalendarDaysIcon)}
          </SidebarMenu>
        </SidebarGroup>

        {site.cursos
          .filter((c) => c.material)
          .map((c) => (
            <SidebarGroup key={c.n}>
              <SidebarGroupLabel>Módulo {c.n}</SidebarGroupLabel>
              <SidebarMenu>
                {nav(`/curso/${c.n}`, c.nomeCurto, GraduationCapIcon)}
                {c.armadilhas && nav(`/curso/${c.n}/armadilhas`, "Armadilhas e cheat-sheet", TriangleAlertIcon)}
                {c.modulos!.map((m) => {
                  const base = `/curso/${c.n}/modulo/${m.n}`
                  const inside = pathname.startsWith(base) || m.aulas.some((a) => pathname.startsWith(`/curso/${c.n}/aula/${a}`))
                  return (
                    <Collapsible key={`${m.n}-${inside}`} defaultOpen={inside} render={<SidebarMenuItem />}>
                      <CollapsibleTrigger
                        render={<SidebarMenuButton isActive={is(base)} />}
                        className="group/trigger h-auto min-h-8 py-1.5"
                      >
                        <span className="w-6 shrink-0 text-xs font-semibold text-muted-foreground tabular-nums">S{m.n}</span>
                        <span className="line-clamp-2 leading-snug">{m.titulo}</span>
                        <ProgressRing value={moduloStatus(c, m, progress).pct} size={16} className="ml-auto" />
                        <ChevronRightIcon className="transition-transform group-data-[panel-open]/trigger:rotate-90" />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton isActive={is(base)} render={<Link to={base} onClick={close} />}>
                              <span>Visão geral</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          {m.aulas.map((id) => {
                            const aula = c.aulas!.find((a) => a.id === id)!
                            const to = `/curso/${c.n}/aula/${id}`
                            const done = !!progress.aulas[`c${c.n}-${id}`]
                            return (
                              <SidebarMenuSubItem key={id}>
                                <SidebarMenuSubButton isActive={pathname.startsWith(to)} render={<Link to={to} onClick={close} />}>
                                  <span className="w-6 shrink-0 text-xs text-muted-foreground tabular-nums">{id}</span>
                                  <span>{aula.titulo}</span>
                                  {done && <span className="ml-auto size-1.5 shrink-0 rounded-full bg-success" title="Estudada" />}
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )
                          })}
                          {m.materiais.map((mt) => (
                            <SidebarMenuSubItem key={mt.tipo}>
                              <SidebarMenuSubButton isActive={is(`${base}/${mt.tipo}`)} render={<Link to={`${base}/${mt.tipo}`} onClick={close} />}>
                                <span className="font-medium text-primary">{MATERIAIS[mt.tipo].label}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  )
                })}
              </SidebarMenu>
            </SidebarGroup>
          ))}

        <SidebarGroup>
          <SidebarGroupLabel>Praticar</SidebarGroupLabel>
          <SidebarMenu>
            {nav("/flashcards", "Flashcards", LayersIcon)}
            {nav("/simulados", "Simulados das seções", ListChecksIcon)}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Exame PMLE</SidebarGroupLabel>
          <SidebarMenu>
            {nav("/exame", "Guia do exame", BookOpenIcon)}
            {nav("/materiais", "Materiais da turma", LinkIcon)}
            <SidebarMenuItem>
              <SidebarMenuButton isActive={pathname.startsWith("/questoes")} render={<Link to="/questoes" onClick={close} />}>
                <TargetIcon />
                <span>Banco de questões</span>
              </SidebarMenuButton>
              <SidebarMenuBadge>{site.stats.questoes}</SidebarMenuBadge>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-4 pb-4 text-xs text-muted-foreground">Progresso salvo só neste navegador.</SidebarFooter>
    </Sidebar>
  )
}
