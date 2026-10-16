import { useMemo, useRef, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { PlayIcon } from "lucide-react"
import { arquivos, rotas } from "../../shared/contrato"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Destaque } from "@/components/shared/destaque"
import { Etiqueta } from "@/components/shared/indicadores"
import { MdInline } from "@/components/shared/markdown"
import { LinkTexto } from "@/components/shared/navegacao"
import { CabecalhoDaPagina, ComDados, NaoEncontrada, Pagina } from "@/components/shared/pagina"
import { Quiz, type QuestaoDoQuiz } from "@/features/quiz/quiz"
import { desempenhoPorSecao, filtrar, FILTROS_PADRAO, montarRodada, prontidao, type FiltrosDoBanco } from "@/domain/exame"
import { progresso, useProgresso, type DadosDeProgresso } from "@/domain/progresso"
import type { BancoDeQuestoes, QuestaoDoExame } from "@/domain/tipos"
import { useDados } from "@/lib/dados"
import { useSite, useTituloDaPagina } from "@/lib/site"
import { percentual } from "@/lib/texto"

const registrar = (q: QuestaoDoQuiz, certa: boolean, sel: string[]) => progresso.registrarQuestao(String(q.id), certa, sel)

function paraQuiz(q: QuestaoDoExame, dados: DadosDeProgresso): QuestaoDoQuiz {
  const anterior = dados.q[q.id]
  return {
    id: q.id,
    rotulo: `${q.id} · ${q.sub}`,
    idioma: "en",
    enunciado: q.enunciado,
    alternativas: q.opcoes,
    gabarito: q.resposta,
    explicacao: q.explicacao,
    meta: (
      <>
        <Etiqueta tom="azul">{q.id}</Etiqueta>
        <Etiqueta>Guia do exame {q.sub}</Etiqueta>
        <Etiqueta>
          <Link to={rotas.modulo(q.modulo)}>Módulo {q.modulo}</Link>
        </Etiqueta>
        <Etiqueta tom={q.dif === "difícil" ? "erro" : q.dif === "fácil" ? "sucesso" : "laranja"}>{q.dif}</Etiqueta>
        {anterior && <Etiqueta tom={anterior.ok ? "sucesso" : "erro"}>já {anterior.ok ? "acertou" : "errou"}</Etiqueta>}
      </>
    ),
    extra: (
      <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
        {q.nota && (
          <p>
            📌 <MdInline>{q.nota}</MdInline>
          </p>
        )}
        {q.conceitos && (
          <p>
            <strong className="text-foreground">Conceitos:</strong> {q.conceitos}
          </p>
        )}
        {q.nomeAtual && (
          <p>
            <strong className="text-foreground">Nome atual:</strong> {q.nomeAtual}
          </p>
        )}
      </div>
    ),
  }
}

// --- filtros na URL (?secao=2&modulo=5…), para links e para voltar à página ---

function lerFiltros(p: URLSearchParams): FiltrosDoBanco {
  const num = (k: string) => (p.get(k) ? Number(p.get(k)) : undefined)
  return {
    secao: num("secao") ?? FILTROS_PADRAO.secao,
    modulo: num("modulo") ?? FILTROS_PADRAO.modulo,
    dificuldade: (p.get("dif") as FiltrosDoBanco["dificuldade"]) || FILTROS_PADRAO.dificuldade,
    situacao: (p.get("situacao") as FiltrosDoBanco["situacao"]) || FILTROS_PADRAO.situacao,
    quantidade: p.get("n") === "todas" ? "todas" : (num("n") ?? FILTROS_PADRAO.quantidade),
  }
}

function escreverFiltros(f: FiltrosDoBanco) {
  return new URLSearchParams(
    Object.entries({ secao: f.secao, modulo: f.modulo, dif: f.dificuldade, situacao: f.situacao, n: f.quantidade })
      .filter(([k, v]) => !["todas", "todos"].includes(String(v)) && !(k === "n" && v === FILTROS_PADRAO.quantidade))
      .map(([k, v]) => [k, String(v)])
  )
}

function CampoDeSelecao({ rotulo, valor, aoMudar, opcoes }: { rotulo: string; valor: string; aoMudar: (v: string) => void; opcoes: { value: string; label: string }[] }) {
  return (
    <div className="grid gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">{rotulo}</span>
      <Select items={opcoes} value={valor} onValueChange={(v) => aoMudar(String(v ?? ""))}>
        <SelectTrigger className="h-10 w-full" aria-label={rotulo}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {opcoes.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function Prontidao({ banco }: { banco: BancoDeQuestoes }) {
  const site = useSite()
  const dados = useProgresso()
  const { respondidas, taxa, pronto } = prontidao(banco, dados, site.metaExame)
  return (
    <Destaque
      className="mb-5"
      tom={pronto ? "sucesso" : "marca"}
      rotulo="Prontidão para o exame"
      titulo={!respondidas ? "Comece a responder para medir sua prontidão" : pronto ? "Você está no ponto de marcar a prova" : `Ainda não: ${taxa}% de acerto em ${respondidas} questões`}
      texto={
        <>
          Regra da turma: marque o exame só quando estiver acertando acima de {site.metaExame}%. Aqui contamos depois de pelo menos 100 questões respondidas.{" "}
          <LinkTexto para={rotas.materiais()}>Ver materiais da turma</LinkTexto>
        </>
      }
    >
      <div className="w-full lg:w-48">
        <div className="mb-1 flex justify-between text-xs text-muted-foreground">
          <span>{respondidas} respondidas</span>
          <span className="tabular-nums">{taxa}%</span>
        </div>
        <Progress value={taxa} aria-label="Taxa de acerto" />
        <div className="mt-1 text-right text-xs text-muted-foreground">meta {site.metaExame}%</div>
      </div>
    </Destaque>
  )
}

function DesempenhoPorSecao({ banco, escolher }: { banco: BancoDeQuestoes; escolher: (secao: number) => void }) {
  const dados = useProgresso()
  return (
    <Card className="mb-5">
      <CardHeader>
        <CardTitle>Seu desempenho por seção do exame</CardTitle>
        <CardDescription>Respondidas e taxa de acerto, com o peso de cada seção na prova.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        {desempenhoPorSecao(banco, dados).map((s) => (
          <div key={s.n} className="grid grid-cols-[1fr_5rem_3.5rem] items-center gap-3 text-sm sm:grid-cols-[1fr_9rem_4rem]">
            <button className="text-left hover:text-primary" onClick={() => escolher(s.n)}>
              <strong>{s.n}.</strong> {s.titulo} <span className="text-xs text-muted-foreground">({s.peso}%)</span>
            </button>
            <Progress value={percentual(s.respondidas, s.total)} aria-label={`${s.respondidas} de ${s.total} respondidas`} />
            <span className="text-right tabular-nums">{s.respondidas ? `${percentual(s.acertos, s.respondidas)}% ✓` : `0/${s.total}`}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function Banco({ banco }: { banco: BancoDeQuestoes }) {
  const site = useSite()
  const dados = useProgresso()
  const [params, setParams] = useSearchParams()
  const filtros = lerFiltros(params)
  const [rodada, setRodada] = useState<{ id: number; questoes: QuestaoDoQuiz[] } | null>(null)
  const ancora = useRef<HTMLDivElement>(null)
  const chaveDosFiltros = params.toString()
  const candidatas = useMemo(() => filtrar(banco, lerFiltros(new URLSearchParams(chaveDosFiltros)), dados), [banco, chaveDosFiltros, dados])

  const mudar = (parcial: Partial<FiltrosDoBanco>) => setParams(escreverFiltros({ ...filtros, ...parcial }), { replace: true })
  const comecar = () => {
    setRodada({ id: Date.now(), questoes: montarRodada(banco, candidatas, filtros).map((q) => paraQuiz(q, dados)) })
    setTimeout(() => ancora.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50)
  }
  const numOuTodos = (v: string, todos: string) => (v === todos ? todos : Number(v))

  return (
    <Pagina largura="leitura">
      <CabecalhoDaPagina migalhas={[["Banco de questões"]]} kicker="Exame Professional ML Engineer" titulo={`Banco de ${banco.questoes.length} questões`} subtitulo="Em inglês, como na prova, com gabarito revisado e explicação em português. Monte uma rodada com os filtros abaixo.">
        <p className="mt-2 text-sm">
          <LinkTexto para={rotas.questoesSobre()}>Como o banco foi montado</LinkTexto> · <LinkTexto para={rotas.exame()}>Guia do exame</LinkTexto>
        </p>
      </CabecalhoDaPagina>

      <Prontidao banco={banco} />
      <DesempenhoPorSecao banco={banco} escolher={(secao) => mudar({ secao })} />

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Montar rodada</CardTitle>
          <CardDescription>Com "Todas as seções do exame" e 50 questões, a rodada respeita o peso de cada seção na prova.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <CampoDeSelecao
            rotulo="Seção do exame"
            valor={String(filtros.secao)}
            aoMudar={(v) => mudar({ secao: numOuTodos(v, "todas") as FiltrosDoBanco["secao"] })}
            opcoes={[{ value: "todas", label: "Todas as seções do exame" }, ...banco.secoes.map((s) => ({ value: String(s.n), label: `${s.n}. ${s.titulo}` }))]}
          />
          <CampoDeSelecao
            rotulo="Módulo da trilha"
            valor={String(filtros.modulo)}
            aoMudar={(v) => mudar({ modulo: numOuTodos(v, "todos") as FiltrosDoBanco["modulo"] })}
            opcoes={[
              { value: "todos", label: "Todos os módulos" },
              ...[...new Set(banco.questoes.map((q) => q.modulo))].sort((a, b) => a - b).map((n) => ({ value: String(n), label: `${n}. ${site.modulos.find((m) => m.n === n)?.titulo}` })),
            ]}
          />
          <CampoDeSelecao
            rotulo="Dificuldade"
            valor={filtros.dificuldade}
            aoMudar={(v) => mudar({ dificuldade: v as FiltrosDoBanco["dificuldade"] })}
            opcoes={[
              { value: "todas", label: "Qualquer dificuldade" },
              { value: "fácil", label: "Fácil" },
              { value: "média", label: "Média" },
              { value: "difícil", label: "Difícil" },
            ]}
          />
          <CampoDeSelecao
            rotulo="Situação"
            valor={filtros.situacao}
            aoMudar={(v) => mudar({ situacao: v as FiltrosDoBanco["situacao"] })}
            opcoes={[
              { value: "todas", label: "Todas as questões" },
              { value: "novas", label: "Só as que nunca respondi" },
              { value: "erradas", label: "Só as que errei" },
            ]}
          />
          <CampoDeSelecao
            rotulo="Quantidade"
            valor={String(filtros.quantidade)}
            aoMudar={(v) => mudar({ quantidade: numOuTodos(v, "todas") as FiltrosDoBanco["quantidade"] })}
            opcoes={[
              { value: "10", label: "10 questões" },
              { value: "20", label: "20 questões" },
              { value: "50", label: "50 questões (tamanho da prova)" },
              { value: "todas", label: "Todas as filtradas" },
            ]}
          />
          <div className="flex items-end justify-between gap-3">
            <span className="pb-2 text-sm text-muted-foreground">{candidatas.length} no filtro</span>
            <Button size="lg" className="h-10 px-5" disabled={!candidatas.length} onClick={comecar}>
              <PlayIcon /> Começar
            </Button>
          </div>
        </CardContent>
      </Card>

      <div ref={ancora} className="ancora">
        {rodada && <Quiz key={rodada.id} questoes={rodada.questoes} aoResponder={registrar} titulo={`${rodada.questoes.length} questões do exame`} />}
      </div>
    </Pagina>
  )
}

/** Uma questão só (link vindo da busca: ?q=Q63). */
function QuestaoAvulsa({ banco, id }: { banco: BancoDeQuestoes; id: string }) {
  const dados = useProgresso()
  const q = banco.questoes.find((x) => x.id === id)
  if (!q) return <NaoEncontrada />
  return (
    <Pagina largura="leitura">
      <CabecalhoDaPagina migalhas={[["Banco de questões", rotas.questoes()], [q.id]]} titulo={`Questão ${q.id}`} subtitulo={`Guia do exame ${q.sub}: ${banco.secoes.find((s) => s.n === q.secao)?.titulo}`} />
      <Quiz key={q.id} questoes={[paraQuiz(q, dados)]} aoResponder={registrar} />
    </Pagina>
  )
}

export function PaginaDoBanco() {
  const { dados, erro } = useDados<BancoDeQuestoes>(arquivos.questoes)
  const [params] = useSearchParams()
  useTituloDaPagina("Banco de questões", { topo: false })
  return <ComDados dados={dados} erro={erro}>{(banco) => (params.get("q") ? <QuestaoAvulsa banco={banco} id={params.get("q")!} /> : <Banco banco={banco} />)}</ComDados>
}
