import { InfoIcon, TargetIcon, TriangleAlertIcon } from "lucide-react"
import type { ReactNode } from "react"
import { arquivos, rotas } from "../../shared/contrato"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Destaque } from "@/components/shared/destaque"
import { Etiqueta } from "@/components/shared/indicadores"
import { Markdown } from "@/components/shared/markdown"
import { CardLink } from "@/components/shared/navegacao"
import { CabecalhoDaPagina, ComDados, NaoEncontrada, Pagina } from "@/components/shared/pagina"
import { Quiz, type QuestaoDoQuiz } from "@/features/quiz/quiz"
import { AbasDaSecao } from "@/features/secao/abas"
import { migalhasDaSecao, useSecaoDaRota } from "@/features/secao/use-secao"
import { META_SIMULADO } from "@/domain/jornada/etapas"
import { progresso, ProgressStore, useProgresso } from "@/domain/progresso"
import { temMaterial, type ModuloComMaterial, type Secao, type Simulado } from "@/domain/tipos"
import { useDados } from "@/lib/dados"
import { useSite, useTituloDaPagina } from "@/lib/site"
import { cn } from "@/lib/utils"

/** Lista de simulados, com melhor e última nota. */
export function TodosOsSimulados() {
  const site = useSite()
  const dados = useProgresso()
  useTituloDaPagina("Simulados")
  const lista = site.modulos.filter(temMaterial).flatMap((m) =>
    m.secoes.flatMap((s) => {
      const material = s.materiais.find((x) => x.tipo === "simulado")
      return material ? [{ m, s, total: material.total || 0, r: dados.sim[ProgressStore.chaves.secao(m.n, s.n)] }] : []
    })
  )
  return (
    <Pagina>
      <CabecalhoDaPagina migalhas={[["Simulados"]]} titulo="Simulados das seções" subtitulo="30 questões por seção, no estilo do quiz da plataforma, com gabarito comentado. Reserve 30 minutos para cada um." />
      <div className="grid gap-4 md:grid-cols-2">
        {lista.map(({ m, s, total, r }) => (
          <CardLink key={`${m.n}-${s.n}`} para={rotas.material(m.n, s.n, "simulado")}>
            <CardHeader>
              <div className="kicker">
                Módulo {m.n} · Seção {s.n}
              </div>
              <CardTitle>{s.titulo}</CardTitle>
              <CardDescription className="flex flex-wrap items-center gap-2">
                {total} questões
                {r ? (
                  <>
                    <Etiqueta tom={r.best >= META_SIMULADO ? "sucesso" : "azul"}>melhor nota {r.best}%</Etiqueta>
                    <span>última {r.last}%</span>
                  </>
                ) : (
                  <span>· ainda não feito</span>
                )}
              </CardDescription>
            </CardHeader>
          </CardLink>
        ))}
      </div>
      <div className="mt-4">
        <CardLink para={rotas.questoes()} className="superficie-destaque">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TargetIcon className="size-4 text-brand-orange" /> Quer o nível da prova real?
            </CardTitle>
            <CardDescription>O banco de questões do exame tem {site.stats.questoes} questões em inglês, organizadas pelas seções do guia oficial.</CardDescription>
          </CardHeader>
        </CardLink>
      </div>
    </Pagina>
  )
}

function Recolhivel({ icone, titulo, children, className }: { icone: ReactNode; titulo: string; children: ReactNode; className?: string }) {
  return (
    <Accordion className={cn("rounded-xl border px-4", className)}>
      <AccordionItem value="conteudo">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            {icone} {titulo}
          </span>
        </AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

/** Depois de fazer o simulado: seguir em frente ou voltar à revisão. */
function DepoisDoSimulado({ modulo, secao, melhor }: { modulo: ModuloComMaterial; secao: Secao; melhor: number }) {
  if (melhor >= META_SIMULADO) {
    const proxima = modulo.secoes.find((s) => s.n > secao.n && s.aulas.length)
    return (
      <Destaque
        className="mt-6"
        compacto
        titulo={`Seção ${secao.n} fechada com ${melhor}%`}
        texto={proxima ? `Siga para a seção ${proxima.n}: ${proxima.titulo}.` : "Feche o módulo com as armadilhas e pratique as questões do exame."}
        acao={{ para: proxima ? rotas.secao(modulo.n, proxima.n) : rotas.armadilhas(modulo.n), rotulo: proxima ? "Próxima seção" : "Revisão final" }}
      />
    )
  }
  const revisao = secao.materiais.find((x) => x.tipo === "revisao" || x.tipo === "glossario")
  return (
    <Destaque
      className="mt-6"
      compacto
      titulo={`Sua melhor nota ainda está abaixo de ${META_SIMULADO}%`}
      texto="Revise a seção, refaça os flashcards que errou e tente o simulado de novo."
      acao={{ para: rotas.material(modulo.n, secao.n, revisao?.tipo ?? "flashcards"), rotulo: "Revisar a seção" }}
    />
  )
}

/** Simulado de uma seção. */
export function SimuladoDaSecao() {
  const { modulo, secao } = useSecaoDaRota()
  const dados = useProgresso()
  const { dados: simulado, erro } = useDados<Simulado>(modulo && secao ? arquivos.simulado(modulo.n, secao.n) : null)
  useTituloDaPagina(secao && `Simulado · Seção ${secao.n}`)
  if (!modulo || !secao) return <NaoEncontrada />
  const anterior = dados.sim[ProgressStore.chaves.secao(modulo.n, secao.n)]

  return (
    <ComDados dados={simulado} erro={erro}>
      {(sim) => {
        const questoes: QuestaoDoQuiz[] = sim.questoes.map((q) => ({
          id: q.n,
          enunciado: q.enunciado,
          alternativas: q.opcoes,
          gabarito: q.resposta ? [q.resposta] : [],
          explicacao: q.explicacao,
          meta: q.parte ? <Etiqueta tom="azul">{q.parte}</Etiqueta> : undefined,
        }))
        return (
          <Pagina largura="leitura">
            <CabecalhoDaPagina migalhas={[...migalhasDaSecao(modulo.n, secao.n), ["Simulado"]]} kicker={`Simulado · Seção ${secao.n}`} titulo={sim.titulo} />
            <AbasDaSecao modulo={modulo} secao={secao} ativa="simulado" />
            {anterior && (
              <p className="mb-3 text-sm text-muted-foreground">
                Sua melhor nota: <strong className="text-foreground">{anterior.best}%</strong> · última: {anterior.last}%
              </p>
            )}
            <Recolhivel className="mb-6 superficie-destaque" icone={<InfoIcon className="size-4 text-primary" />} titulo="Como fazer este simulado">
              <Markdown>{sim.intro}</Markdown>
            </Recolhivel>
            <Quiz key={`${modulo.n}-${secao.n}`} titulo={`Seção ${secao.n}`} questoes={questoes} aoFinalizar={({ nota }) => progresso.registrarSimulado(modulo.n, secao.n, nota)} />
            {anterior && <DepoisDoSimulado modulo={modulo} secao={secao} melhor={anterior.best} />}
            {sim.fechamento && (
              <Recolhivel className="mt-8 border-brand-orange/40 bg-brand-orange/10" icone={<TriangleAlertIcon className="size-4 text-brand-orange" />} titulo="Onde você provavelmente vai errar (abra depois de terminar)">
                <Markdown>{sim.fechamento}</Markdown>
              </Recolhivel>
            )}
          </Pagina>
        )
      }}
    </ComDados>
  )
}
