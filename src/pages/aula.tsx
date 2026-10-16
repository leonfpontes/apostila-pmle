import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowRightIcon, CheckCircle2Icon, CheckIcon, ClockIcon, InfoIcon } from "lucide-react"
import { docIds, rotas } from "../../shared/contrato"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Destaque } from "@/components/shared/destaque"
import { Estrelas, Etiqueta } from "@/components/shared/indicadores"
import { Paginacao } from "@/components/shared/navegacao"
import { NaoEncontrada } from "@/components/shared/pagina"
import { migalhasDaSecao } from "@/features/secao/use-secao"
import { depoisDaAula } from "@/domain/jornada/jornada"
import { progresso, ProgressStore, useProgresso } from "@/domain/progresso"
import { temMaterial, type Aula, type ModuloComMaterial } from "@/domain/tipos"
import { useModulo } from "@/lib/site"
import { PaginaDeDocumento } from "./documento"

function Cabecalho({ modulo, aula, transcricao }: { modulo: ModuloComMaterial; aula: Aula; transcricao: boolean }) {
  const dados = useProgresso()
  const estrelas = modulo.secoes.find((s) => s.n === aula.secao)?.itens.find((i) => i.id === aula.id)?.estrelas || 0
  const abas: [string, string, string][] = [
    ["resumo", "Resumo de estudo", rotas.aula(modulo.n, aula.id)],
    ["transcricao", "Transcrição original (EN)", rotas.transcricao(modulo.n, aula.id)],
  ]
  return (
    <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-3">
      {aula.transcricao && (
        <Tabs value={transcricao ? "transcricao" : "resumo"}>
          <TabsList>
            {abas.map(([valor, rotulo, para]) => (
              <TabsTrigger key={valor} value={valor} render={<Link to={para} />} nativeButton={false} className="px-3">
                {rotulo}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {aula.duracao && (
          <span className="inline-flex items-center gap-1">
            <ClockIcon className="size-3.5" /> {aula.duracao.replace(/^~/, "")} de vídeo
          </span>
        )}
        <Estrelas quantidade={estrelas} comLegenda />
        {dados.aulas[ProgressStore.chaves.aula(modulo.n, aula.id)] && (
          <Etiqueta tom="sucesso">
            <CheckCircle2Icon /> Estudada
          </Etiqueta>
        )}
      </div>
    </div>
  )
}

/** Fim da aula: marcar como estudada e seguir para o próximo passo da jornada. */
function Concluir({ modulo, aula }: { modulo: ModuloComMaterial; aula: Aula }) {
  const dados = useProgresso()
  const navegar = useNavigate()
  const estudada = !!dados.aulas[ProgressStore.chaves.aula(modulo.n, aula.id)]
  const proximo = depoisDaAula(modulo, aula.id, dados)
  return (
    <Destaque
      className="mt-10"
      compacto
      titulo={estudada ? "Aula estudada" : "Terminou de estudar esta aula?"}
      texto={proximo.texto}
      acao={
        <div className="flex flex-wrap items-center gap-2">
          {estudada && (
            <Button variant="ghost" size="sm" onClick={() => progresso.marcarAula(modulo.n, aula.id, false)}>
              Desmarcar
            </Button>
          )}
          <Button
            size="lg"
            className="h-11 px-4"
            onClick={() => {
              progresso.marcarAula(modulo.n, aula.id, true)
              navegar(proximo.destino)
            }}
          >
            {!estudada && <CheckIcon />} {estudada ? "Continuar" : proximo.chamada} <ArrowRightIcon />
          </Button>
        </div>
      }
    />
  )
}

export function PaginaDaAula({ transcricao = false }: { transcricao?: boolean }) {
  const params = useParams()
  const modulo = useModulo(Number(params.n))
  if (!temMaterial(modulo)) return <NaoEncontrada />
  const i = modulo.aulas.findIndex((a) => a.id === params.id)
  if (i < 0) return <NaoEncontrada />
  const aula = modulo.aulas[i]
  const vizinha = (a: Aula | undefined) => a && { para: rotas.aula(modulo.n, a.id), rotulo: `Aula ${a.id}`, titulo: a.titulo }

  return (
    <PaginaDeDocumento
      id={transcricao ? docIds.transcricao(modulo.n, aula.id) : docIds.aula(modulo.n, aula.id)}
      titulo={`Aula ${aula.id} — ${aula.titulo}`}
      subtitulo={aula.tema || undefined}
      migalhas={migalhasDaSecao(modulo.n, aula.secao)}
      indice={!transcricao}
      abas={<Cabecalho modulo={modulo} aula={aula} transcricao={transcricao} />}
      antes={
        transcricao && (
          <Alert className="mb-6">
            <InfoIcon />
            <AlertDescription>Transcrição bruta da aula, no idioma original. O resumo em português está na outra aba.</AlertDescription>
          </Alert>
        )
      }
      depois={
        <>
          {!transcricao && <Concluir modulo={modulo} aula={aula} />}
          <Paginacao anterior={vizinha(modulo.aulas[i - 1])} proximo={vizinha(modulo.aulas[i + 1])} />
        </>
      }
    />
  )
}
