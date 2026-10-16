import { useEffect } from "react"
import { Link } from "react-router-dom"
import {
  ArrowRightIcon,
  BookOpenCheckIcon,
  CloudIcon,
  KeyboardIcon,
  LayersIcon,
  ListChecksIcon,
  NotebookTextIcon,
  RouteIcon,
  SearchIcon,
  TargetIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Kbd } from "@/components/kbd"
import { Footer, Page, PageHeader } from "@/components/page"
import { META_FLASHCARDS, META_SIMULADO } from "@/lib/journey"
import { useSite } from "@/lib/site"

const PASSOS = [
  {
    icon: RouteIcon,
    titulo: "Escolha o curso na trilha",
    texto: "A trilha tem 15 cursos na ordem da certificação. Os que já têm material aparecem em azul; os outros mostram o roteiro oficial.",
    to: "/trilha",
    cta: "Ver a trilha",
  },
  {
    icon: NotebookTextIcon,
    titulo: "Estude as aulas do módulo",
    texto: "Cada aula tem um resumo em português com os tópicos que caem na prova, glossário, flashcards e questões no fim. Marque como estudada ao terminar.",
    to: "/curso/1/modulo/2",
    cta: "Abrir o primeiro módulo",
  },
  {
    icon: BookOpenCheckIcon,
    titulo: "Revise o módulo",
    texto: "A revisão junta as armadilhas e o roteiro do módulo; o glossário tem filtro para achar um termo rápido.",
  },
  {
    icon: LayersIcon,
    titulo: "Fixe com flashcards",
    texto: `Responda em voz alta, vire o cartão e diga se acertou. A etapa conta como feita quando você domina ${Math.round(META_FLASHCARDS * 100)}% dos cartões.`,
    to: "/flashcards",
    cta: "Ver os baralhos",
  },
  {
    icon: ListChecksIcon,
    titulo: "Teste no simulado",
    texto: `30 questões no estilo do quiz da plataforma, com gabarito comentado. A meta é ${META_SIMULADO}%; abaixo disso, volte à revisão.`,
    to: "/simulados",
    cta: "Ver os simulados",
  },
  {
    icon: TargetIcon,
    titulo: "Pratique as questões do exame",
    texto: "Depois de cada curso, faça as questões do banco ligadas a ele. No fim da trilha, monte provas de 50 questões com os pesos oficiais.",
    to: "/questoes",
    cta: "Abrir o banco",
  },
]

export function ComecePage() {
  const site = useSite()
  useEffect(() => {
    document.title = "Comece aqui · Apostila PMLE"
    window.scrollTo(0, 0)
  }, [])
  return (
    <Page narrow>
      <PageHeader
        crumbs={[["Comece aqui"]]}
        kicker="Guia da apostila"
        title="Como estudar com esta apostila"
        sub="Um roteiro único para todos da turma: o mesmo caminho, no seu ritmo, com o progresso salvo no seu navegador."
      />

      <h2 className="mb-4 text-xl font-bold">O caminho de cada módulo</h2>
      <ol className="relative mb-10 grid gap-3 before:absolute before:top-5 before:bottom-5 before:left-5 before:w-px before:bg-border">
        {PASSOS.map((p, i) => (
          <li key={i} className="relative grid grid-cols-[2.5rem_1fr] gap-4">
            <span className="z-10 grid size-10 place-items-center rounded-full bg-primary text-sm font-extrabold text-primary-foreground ring-4 ring-background">{i + 1}</span>
            <Card size="sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <p.icon className="size-4 text-primary" /> {p.titulo}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">{p.texto}</CardDescription>
              </CardHeader>
              {p.to && (
                <CardContent>
                  <Link to={p.to} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                    {p.cta} <ArrowRightIcon className="size-3.5" />
                  </Link>
                </CardContent>
              )}
            </Card>
          </li>
        ))}
      </ol>

      <h2 className="mb-4 text-xl font-bold">Bom saber</h2>
      <div className="mb-10 grid gap-3 sm:grid-cols-2">
        <Card size="sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CloudIcon className="size-4 text-primary" /> Seu progresso fica no navegador
            </CardTitle>
            <CardDescription>
              Não há login. Para continuar em outro computador ou no celular, exporte o progresso em{" "}
              <Link to="/progresso" className="text-primary underline">
                Meu progresso
              </Link>{" "}
              e importe lá.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TriangleAlertIcon className="size-4 text-brand-orange" /> Vertex AI agora é Agent Platform
            </CardTitle>
            <CardDescription>
              A ementa nova do curso chama de <strong>Agent Platform</strong> o que a documentação e as questões antigas chamam de <strong>Vertex AI</strong>. Saiba os dois nomes.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <span className="text-sm tracking-tighter text-brand-orange">★★★</span> Relevância para a prova
            </CardTitle>
            <CardDescription>As estrelas ao lado das aulas indicam quanto o tema costuma cair. Com pouco tempo, comece pelas de três estrelas.</CardDescription>
          </CardHeader>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <SearchIcon className="size-4 text-primary" /> Busca em tudo
            </CardTitle>
            <CardDescription>
              <Kbd>Ctrl</Kbd> <Kbd>K</Kbd> (ou <Kbd>/</Kbd>) abre a busca em aulas, glossários, flashcards e nas {site.stats.questoes} questões.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
        <KeyboardIcon className="size-5" /> Atalhos
      </h2>
      <Card size="sm" className="mb-10">
        <CardContent className="grid gap-2 text-sm sm:grid-cols-2">
          <span>
            <Kbd>Ctrl</Kbd> <Kbd>K</Kbd> buscar
          </span>
          <span>
            <Kbd>Ctrl</Kbd> <Kbd>B</Kbd> mostrar/ocultar o menu
          </span>
          <span>
            Flashcards: <Kbd>espaço</Kbd> vira o cartão
          </span>
          <span>
            Flashcards: <Kbd>1</Kbd> errei · <Kbd>2</Kbd> acertei
          </span>
        </CardContent>
      </Card>

      <Button size="lg" className="h-11 px-5 text-base" render={<Link to="/" />} nativeButton={false}>
        Ir para o meu próximo passo <ArrowRightIcon />
      </Button>
      <Footer />
    </Page>
  )
}
