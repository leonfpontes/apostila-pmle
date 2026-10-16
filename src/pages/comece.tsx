import { ArrowRightIcon, BookOpenCheckIcon, CloudIcon, KeyboardIcon, LayersIcon, ListChecksIcon, NotebookTextIcon, RouteIcon, SearchIcon, TargetIcon, TriangleAlertIcon, type LucideIcon } from "lucide-react"
import type { ReactNode } from "react"
import { rotas } from "../../shared/contrato"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CartaoInformativo } from "@/components/shared/cartao-informativo"
import { Kbd } from "@/components/shared/kbd"
import { BotaoLink, CardLink, LinkTexto } from "@/components/shared/navegacao"
import { CabecalhoDaPagina, Pagina } from "@/components/shared/pagina"
import { META_FLASHCARDS, META_SIMULADO } from "@/domain/jornada/etapas"
import { temMaterial } from "@/domain/tipos"
import { useSite, useTituloDaPagina } from "@/lib/site"

// Guia da apostila: o caminho de estudo, dicas e atalhos. O texto vive nas
// listas abaixo; para mudar o guia, edite os dados, não o JSX.

type Passo = { icone: LucideIcon; titulo: string; texto: string; link?: { para: string; rotulo: string } }

function usePassos(): Passo[] {
  const site = useSite()
  const primeiro = site.modulos.find(temMaterial)!
  const primeiraSecao = primeiro.secoes.find((s) => s.materiais.length) ?? primeiro.secoes[0]
  return [
    {
      icone: RouteIcon,
      titulo: "Escolha o módulo na trilha",
      texto: `A trilha tem ${site.modulos.length} módulos na ordem da certificação. Os que já têm material aparecem em azul; os outros mostram o roteiro oficial.`,
      link: { para: rotas.trilha(), rotulo: "Ver a trilha" },
    },
    {
      icone: NotebookTextIcon,
      titulo: "Estude as aulas da seção",
      texto: "Cada aula tem um resumo em português com os tópicos que caem na prova, glossário, flashcards e questões no fim. Marque como estudada ao terminar.",
      link: { para: rotas.secao(primeiro.n, primeiraSecao.n), rotulo: "Abrir a primeira seção" },
    },
    { icone: BookOpenCheckIcon, titulo: "Revise a seção", texto: "A revisão junta as armadilhas e o roteiro da seção; o glossário tem filtro para achar um termo rápido." },
    {
      icone: LayersIcon,
      titulo: "Fixe com flashcards",
      texto: `Responda em voz alta, vire o cartão e diga se acertou. A etapa conta como feita quando você domina ${Math.round(META_FLASHCARDS * 100)}% dos cartões.`,
      link: { para: rotas.flashcards(), rotulo: "Ver os baralhos" },
    },
    {
      icone: ListChecksIcon,
      titulo: "Teste no simulado",
      texto: `30 questões no estilo do quiz da plataforma, com gabarito comentado. A meta é ${META_SIMULADO}%; abaixo disso, volte à revisão.`,
      link: { para: rotas.simulados(), rotulo: "Ver os simulados" },
    },
    {
      icone: TargetIcon,
      titulo: "Pratique as questões do exame",
      texto: `Depois de cada módulo, faça as questões do banco ligadas a ele. No fim da trilha, monte provas de 50 questões com os pesos oficiais. A regra da turma: marque o exame só quando estiver acertando acima de ${site.metaExame}%.`,
      link: { para: rotas.questoes(), rotulo: "Abrir o banco" },
    },
  ]
}

function useDicas(): { icone?: LucideIcon; marcador?: ReactNode; titulo: string; texto: ReactNode }[] {
  const site = useSite()
  return [
    {
      icone: CloudIcon,
      titulo: "Seu progresso fica no navegador",
      texto: (
        <>
          Não há login. Para continuar em outro computador ou no celular, exporte o progresso em <LinkTexto para={rotas.progresso()}>Meu progresso</LinkTexto> e importe lá.
        </>
      ),
    },
    {
      icone: RouteIcon,
      titulo: "Módulos e seções",
      texto: (
        <>
          A trilha tem {site.modulos.length} <strong>módulos</strong> (os itens do Learning Path). Dentro de um módulo, as partes do conteúdo são <strong>seções</strong>. Nas notas das aulas, "Module N" na fala do
          instrutor fica sempre uma seção atrás da nossa numeração.
        </>
      ),
    },
    {
      marcador: <TriangleAlertIcon className="size-4 text-brand-orange" />,
      titulo: "Vertex AI agora é Agent Platform",
      texto: (
        <>
          A ementa nova chama de <strong>Agent Platform</strong> o que a documentação e as questões antigas chamam de <strong>Vertex AI</strong>. Saiba os dois nomes.
        </>
      ),
    },
    {
      marcador: <span className="text-sm tracking-tighter text-brand-orange">★★★</span>,
      titulo: "Relevância para a prova",
      texto: "As estrelas ao lado das aulas indicam quanto o tema costuma cair. Com pouco tempo, comece pelas de três estrelas.",
    },
    {
      icone: SearchIcon,
      titulo: "Busca em tudo",
      texto: (
        <>
          <Kbd>Ctrl</Kbd> <Kbd>K</Kbd> (ou <Kbd>/</Kbd>) abre a busca em aulas, glossários, flashcards e nas {site.stats.questoes} questões.
        </>
      ),
    },
  ]
}

const ATALHOS: ReactNode[] = [
  <>
    <Kbd>Ctrl</Kbd> <Kbd>K</Kbd> buscar
  </>,
  <>
    <Kbd>Ctrl</Kbd> <Kbd>B</Kbd> mostrar/ocultar o menu
  </>,
  <>
    Flashcards: <Kbd>espaço</Kbd> vira o cartão
  </>,
  <>
    Flashcards: <Kbd>1</Kbd> errei · <Kbd>2</Kbd> acertei
  </>,
]

export function PaginaComeceAqui() {
  const passos = usePassos()
  const dicas = useDicas()
  useTituloDaPagina("Comece aqui")
  return (
    <Pagina largura="leitura">
      <CabecalhoDaPagina
        migalhas={[["Comece aqui"]]}
        kicker="Guia da apostila"
        titulo="Como estudar com esta apostila"
        subtitulo="Um roteiro único para todos da turma: o mesmo caminho, no seu ritmo, com o progresso salvo no seu navegador."
      />

      <h2 className="mb-4 titulo-bloco">O caminho de cada seção</h2>
      <ol className="relative mb-10 grid gap-3 before:absolute before:top-5 before:bottom-5 before:left-5 before:w-px before:bg-border">
        {passos.map((p, i) => (
          <li key={p.titulo} className="relative grid grid-cols-[2.5rem_1fr] gap-4">
            <span className="z-10 grid size-10 place-items-center rounded-full bg-primary text-sm font-extrabold text-primary-foreground ring-4 ring-background">{i + 1}</span>
            <CartaoInformativo icone={p.icone} titulo={p.titulo} link={p.link}>
              {p.texto}
            </CartaoInformativo>
          </li>
        ))}
      </ol>

      <div className="mb-10">
        <CardLink para={rotas.materiais()} className="superficie-destaque">
          <CardHeader>
            <CardTitle className="text-base">Materiais da turma</CardTitle>
            <CardDescription>Guia oficial do exame, link da trilha no Google Skills, Sample Questions, simulados externos e o livro de preparação.</CardDescription>
          </CardHeader>
        </CardLink>
      </div>

      <h2 className="mb-4 titulo-bloco">Bom saber</h2>
      <div className="mb-10 grid gap-3 sm:grid-cols-2">
        {dicas.map((d) => (
          <CartaoInformativo key={d.titulo} icone={d.icone} marcador={d.marcador} titulo={d.titulo}>
            {d.texto}
          </CartaoInformativo>
        ))}
      </div>

      <h2 className="mb-4 flex items-center gap-2 titulo-bloco">
        <KeyboardIcon className="size-5" /> Atalhos
      </h2>
      <Card size="sm" className="mb-10">
        <CardContent className="grid gap-2 text-sm sm:grid-cols-2">
          {ATALHOS.map((a, i) => (
            <span key={i}>{a}</span>
          ))}
        </CardContent>
      </Card>

      <BotaoLink para={rotas.inicio()} size="lg" className="h-11 px-5 text-base">
        Ir para o meu próximo passo <ArrowRightIcon />
      </BotaoLink>
    </Pagina>
  )
}
