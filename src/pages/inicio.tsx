import { Link } from "react-router-dom"
import { CompassIcon, HistoryIcon, TriangleAlertIcon } from "lucide-react"
import { rotas } from "../../shared/contrato"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Destaque } from "@/components/shared/destaque"
import { AnelDeProgresso } from "@/components/shared/indicadores"
import { BotaoLink, CardLink, LinkTexto } from "@/components/shared/navegacao"
import { Pagina } from "@/components/shared/pagina"
import { ICONE_DA_ETAPA } from "@/features/jornada/icones"
import type { IdDaEtapa } from "@/domain/jornada/etapas"
import { jornadas, proximoPasso } from "@/domain/jornada/jornada"
import { ProgressStore, useProgresso } from "@/domain/progresso"
import type { ModuloComMaterial } from "@/domain/tipos"
import { usePrimeiroModuloComMaterial, useSite, useTituloDaPagina } from "@/lib/site"
import { percentual, plural } from "@/lib/texto"
import { cn } from "@/lib/utils"

const COMO_FUNCIONA: [IdDaEtapa, string, string][] = [
  ["aulas", "Estude as aulas", "Resumo em português de cada aula"],
  ["revisao", "Revise a seção", "Armadilhas e glossário"],
  ["flashcards", "Fixe com flashcards", "Revisão ativa por blocos"],
  ["simulado", "Teste no simulado", "30 questões, meta de 80%"],
]

/** Capa com a composição visual da ATRA (círculos desfocados e diamantes). */
function Capa({ nome, novo, destinoInicial }: { nome?: string; novo: boolean; destinoInicial: string }) {
  const site = useSite()
  return (
    <section className="relative mb-6 overflow-hidden rounded-3xl border bg-card p-7 shadow-sm md:p-10">
      <div className="relative z-10 max-w-xl">
        <div className="mb-2 kicker">Trilha Google Cloud · Professional ML Engineer</div>
        <h1 className="font-heading text-4xl leading-[1.05] font-extrabold tracking-tight text-balance md:text-5xl">{nome ? `Olá, ${nome}. Bora estudar?` : "Apostila da certificação PMLE"}</h1>
        <p className="mt-4 text-lg text-brand-text md:text-xl">
          O material da turma ATRA para a prova Professional Machine Learning Engineer: aulas resumidas, flashcards, simulados e {site.stats.questoes} questões no estilo do exame.
        </p>
        {novo && (
          <div className="mt-6 flex flex-wrap gap-2">
            <BotaoLink para={rotas.comece()} size="lg" className="h-11 px-4 text-base">
              <CompassIcon /> Comece aqui
            </BotaoLink>
            <BotaoLink para={destinoInicial} size="lg" variant="outline" className="h-11 px-4 text-base">
              Ir direto para a primeira aula
            </BotaoLink>
          </div>
        )}
      </div>
      <div aria-hidden className="pointer-events-none absolute top-1/2 -right-24 hidden size-96 -translate-y-1/2 opacity-60 xl:block 2xl:-right-4 2xl:opacity-100">
        <div className="absolute top-10 right-16 size-60 rounded-full bg-brand opacity-15 blur-md" />
        <div className="absolute top-36 right-0 size-52 rounded-full bg-brand-orange opacity-20 blur-md" />
        <div className="absolute top-32 right-28 size-28 rotate-45 rounded-lg bg-brand shadow-2xl shadow-brand/40" />
        <div className="absolute top-20 right-16 size-11 rotate-45 rounded bg-brand-orange" />
      </div>
    </section>
  )
}

function ComoFunciona() {
  return (
    <section className="mb-8">
      <h2 className="titulo-bloco">Como funciona cada seção</h2>
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {COMO_FUNCIONA.map(([id, titulo, texto], i) => {
          const Icone = ICONE_DA_ETAPA[id]
          return (
            <li key={id} className="flex gap-3 rounded-2xl superficie-destaque p-4">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-extrabold text-primary-foreground">{i + 1}</span>
              <span>
                <span className="flex items-center gap-1.5 font-semibold">
                  <Icone className="size-4 text-primary" /> {titulo}
                </span>
                <span className="text-sm text-muted-foreground">{texto}</span>
              </span>
            </li>
          )
        })}
      </ol>
      <LinkTexto para={rotas.comece()} seta className="mt-3 text-sm">
        Ver o guia completo
      </LinkTexto>
    </section>
  )
}

function SecoesDoModulo({ modulo, destinoAtual }: { modulo: ModuloComMaterial; destinoAtual: string }) {
  const dados = useProgresso()
  const site = useSite()
  return (
    <>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <h2 className="text-xl font-bold">
          Módulo {modulo.n}: {modulo.titulo}
        </h2>
        <LinkTexto para={rotas.progresso()} className="text-sm">
          Ver meu progresso
        </LinkTexto>
      </div>
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {jornadas(site, dados)
          .filter((j) => j.modulo.n === modulo.n)
          .map((j) => (
            <CardLink key={j.secao.n} size="sm" para={rotas.secao(modulo.n, j.secao.n)} className={cn(destinoAtual.startsWith(rotas.secao(modulo.n, j.secao.n)) && "ring-primary/50")}>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="kicker">Seção {j.secao.n}</div>
                    <CardTitle className="mt-0.5 leading-snug">{j.secao.titulo}</CardTitle>
                  </div>
                  <AnelDeProgresso valor={j.percentual} tamanho={28} />
                </div>
                <CardDescription>
                  {j.concluida ? "Concluída" : j.proxima ? `Próximo: ${j.proxima.titulo.toLowerCase()}` : ""} · {plural(j.secao.aulas.length, "aula", "aulas")}
                </CardDescription>
              </CardHeader>
            </CardLink>
          ))}
        {modulo.armadilhas && (
          <CardLink size="sm" para={rotas.armadilhas(modulo.n)} className="superficie-destaque">
            <CardHeader>
              <div className="kicker">Revisão final</div>
              <CardTitle className="flex items-center gap-2">
                <TriangleAlertIcon className="size-4 text-brand-orange" /> Armadilhas e cheat-sheet
              </CardTitle>
              <CardDescription>Para a véspera da prova: as armadilhas do módulo e as tabelas mais cobradas.</CardDescription>
            </CardHeader>
          </CardLink>
        )}
      </div>
    </>
  )
}

function ResumoDaTrilha() {
  const site = useSite()
  const dados = useProgresso()
  const concluidos = Object.keys(dados.modulos).length
  return (
    <Card>
      <CardHeader>
        <CardTitle>A trilha completa</CardTitle>
        <CardDescription>
          {site.modulos.length} módulos até a prova. {concluidos ? `Você marcou ${plural(concluidos, "módulo concluído", "módulos concluídos")}.` : "Os módulos em azul já têm material."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {site.modulos.map((m) => (
            <Tooltip key={m.n}>
              <TooltipTrigger
                render={
                  <Link
                    to={rotas.modulo(m.n)}
                    aria-label={`Módulo ${m.n}: ${m.titulo}`}
                    className={cn(
                      "grid size-7 place-items-center rounded-full text-xs font-bold",
                      dados.modulos[m.n] ? "bg-success text-white" : m.material ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}
                  />
                }
              >
                {m.n}
              </TooltipTrigger>
              <TooltipContent>{m.titulo}</TooltipContent>
            </Tooltip>
          ))}
        </div>
        <Progress value={percentual(concluidos, site.modulos.length)} aria-label="Módulos concluídos" />
      </CardContent>
      <CardFooter>
        <LinkTexto para={rotas.trilha()} seta className="text-sm">
          Ver a trilha
        </LinkTexto>
      </CardFooter>
    </Card>
  )
}

function ResumoDoBanco() {
  const site = useSite()
  const dados = useProgresso()
  const { respondidas, acertos } = ProgressStore.desempenhoNoExame(dados)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Banco de questões do exame</CardTitle>
        <CardDescription>
          {respondidas
            ? `Você respondeu ${respondidas} de ${site.stats.questoes} e acertou ${percentual(acertos, respondidas)}%.`
            : `${site.stats.questoes} questões em inglês, como na prova, com explicação em português.`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={percentual(respondidas, site.stats.questoes)} aria-label="Questões respondidas" />
      </CardContent>
      <CardFooter>
        <LinkTexto para={rotas.questoes()} seta className="text-sm">
          Praticar por seção, módulo ou dificuldade
        </LinkTexto>
      </CardFooter>
    </Card>
  )
}

export function PaginaInicial() {
  const site = useSite()
  const dados = useProgresso()
  const modulo = usePrimeiroModuloComMaterial() as ModuloComMaterial
  const passo = proximoPasso(site, dados)
  const novo = !ProgressStore.comecou(dados)
  useTituloDaPagina(undefined)

  return (
    <Pagina>
      <Capa nome={dados.nome} novo={novo} destinoInicial={passo.destino} />
      {novo ? (
        <ComoFunciona />
      ) : (
        <>
          <Destaque className="mb-4" rotulo="Seu próximo passo" titulo={passo.titulo} texto={passo.contexto} acao={{ para: passo.destino, rotulo: passo.chamada }} />
          {dados.ultima && dados.ultima.rota !== passo.destino && (
            <Link to={dados.ultima.rota} className="mb-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
              <HistoryIcon className="size-4" /> Voltar para onde parou: <span className="font-medium text-foreground">{dados.ultima.titulo}</span>
            </Link>
          )}
        </>
      )}
      <SecoesDoModulo modulo={modulo} destinoAtual={passo.destino} />
      <div className="grid gap-4 md:grid-cols-2">
        <ResumoDaTrilha />
        <ResumoDoBanco />
      </div>
    </Pagina>
  )
}
