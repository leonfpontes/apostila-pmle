import { useParams } from "react-router-dom"
import { ArrowRightIcon, InfoIcon, TargetIcon, TriangleAlertIcon } from "lucide-react"
import { arquivos, docIds, rotas } from "../../shared/contrato"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AnelDeProgresso } from "@/components/shared/indicadores"
import { Markdown } from "@/components/shared/markdown"
import { BotaoLink, CardLink, Paginacao } from "@/components/shared/navegacao"
import { CabecalhoDaPagina, ComDados, NaoEncontrada, Pagina } from "@/components/shared/pagina"
import { Link } from "react-router-dom"
import { JornadaDaSecao } from "@/domain/jornada/jornada"
import { useProgresso } from "@/domain/progresso"
import { ROTULO_MATERIAL, temMaterial, type Doc, type Modulo, type ModuloComMaterial } from "@/domain/tipos"
import { useDados } from "@/lib/dados"
import { useModulo, useSite, useTituloDaPagina } from "@/lib/site"
import { plural } from "@/lib/texto"

// Página de um módulo da trilha: com material (seções e armadilhas) ou só o
// roteiro oficial, para os módulos que ainda não foram estudados.

function CardDaSecao({ modulo, secao }: { modulo: ModuloComMaterial; secao: ModuloComMaterial["secoes"][number] }) {
  const dados = useProgresso()
  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-3">
        <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-lg font-extrabold text-primary-foreground">{secao.n}</div>
        <div className="min-w-0 flex-1">
          <CardTitle className="text-base leading-snug">
            <Link to={rotas.secao(modulo.n, secao.n)} className="hover:text-primary hover:underline">
              {secao.titulo}
            </Link>
          </CardTitle>
          <CardDescription>
            {plural(secao.aulas.length, "aula resumida", "aulas resumidas")} · {plural(secao.itens.length, "item", "itens")} na plataforma
          </CardDescription>
        </div>
        <AnelDeProgresso valor={new JornadaDaSecao(modulo, secao, dados).percentual} tamanho={28} />
      </CardHeader>
      {secao.materiais.length > 0 && (
        <CardContent className="flex flex-wrap gap-1.5">
          {secao.materiais.map((mt) => (
            <Badge key={mt.tipo} variant="outline" render={<Link to={rotas.material(modulo.n, secao.n, mt.tipo)} />} className="h-6 hover:border-primary hover:text-primary">
              {ROTULO_MATERIAL[mt.tipo].label}
              {mt.total ? ` (${mt.total})` : ""}
            </Badge>
          ))}
        </CardContent>
      )}
      <CardFooter className="mt-auto">
        <BotaoLink para={rotas.secao(modulo.n, secao.n)} variant="outline">
          Abrir seção <ArrowRightIcon />
        </BotaoLink>
      </CardFooter>
    </Card>
  )
}

function ModuloComMaterialPage({ modulo }: { modulo: ModuloComMaterial }) {
  const { dados, erro } = useDados<Doc>(arquivos.doc(docIds.modulo(modulo.n)))
  useTituloDaPagina(`Módulo ${modulo.n}`)
  return (
    <ComDados dados={dados} erro={erro}>
      {(doc) => (
        <Pagina>
          <CabecalhoDaPagina migalhas={[["Trilha", rotas.trilha()], [`Módulo ${modulo.n}`]]} kicker={`Módulo ${modulo.n} de 15 · ${modulo.duracao}`} titulo={modulo.titulo} subtitulo={doc.summary} />
          <div className="grid gap-4 md:grid-cols-2">
            {modulo.secoes.map((s) => (
              <CardDaSecao key={s.n} modulo={modulo} secao={s} />
            ))}
          </div>
          {modulo.armadilhas && (
            <div className="mt-4">
              <CardLink para={rotas.armadilhas(modulo.n)} className="superficie-destaque">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TriangleAlertIcon className="size-4 text-brand-orange" /> Armadilhas e cheat-sheet do módulo
                  </CardTitle>
                  <CardDescription>Revisão final antes da prova: as armadilhas acumuladas, as três tabelas mais cobráveis e as datas decoráveis.</CardDescription>
                </CardHeader>
              </CardLink>
            </div>
          )}
          <h2 className="mt-10 titulo-bloco">Sobre o módulo</h2>
          <Markdown>{doc.md}</Markdown>
        </Pagina>
      )}
    </ComDados>
  )
}

function ModuloSemMaterialPage({ modulo }: { modulo: Modulo }) {
  const site = useSite()
  const { dados } = useDados<{ md: string }>(arquivos.roteiro(modulo.n))
  useTituloDaPagina(`Módulo ${modulo.n}`)
  const vizinho = (n: number, rotulo: string) => {
    const m = site.modulos.find((x) => x.n === n)
    return m && { para: rotas.modulo(m.n), rotulo, titulo: m.titulo }
  }
  return (
    <Pagina largura="leitura">
      <CabecalhoDaPagina migalhas={[["Trilha", rotas.trilha()], [`Módulo ${modulo.n}`]]} kicker={`Módulo ${modulo.n} de 15 · ${modulo.duracao}`} titulo={modulo.titulo} />
      <Alert className="mb-6">
        <InfoIcon />
        <AlertTitle>Material em breve</AlertTitle>
        <AlertDescription>Os resumos, flashcards e simulados deste módulo entram aqui conforme as aulas forem transcritas. Abaixo está o roteiro oficial, item a item.</AlertDescription>
      </Alert>
      {modulo.questoes > 0 && (
        <div className="mb-6">
          <CardLink para={rotas.questoes({ modulo: modulo.n })}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TargetIcon className="size-4 text-brand-orange" /> {modulo.questoes} questões do exame ligadas a este módulo
              </CardTitle>
              <CardDescription>Pratique logo depois de terminar o módulo, enquanto o assunto está fresco.</CardDescription>
            </CardHeader>
          </CardLink>
        </div>
      )}
      <h2 className="titulo-bloco">Roteiro</h2>
      {dados && <Markdown>{dados.md}</Markdown>}
      <Paginacao anterior={vizinho(modulo.n - 1, "Módulo anterior")} proximo={vizinho(modulo.n + 1, "Próximo módulo")} />
    </Pagina>
  )
}

export function PaginaDoModulo() {
  const modulo = useModulo(Number(useParams().n))
  if (!modulo) return <NaoEncontrada />
  return temMaterial(modulo) ? <ModuloComMaterialPage modulo={modulo} /> : <ModuloSemMaterialPage modulo={modulo} />
}
