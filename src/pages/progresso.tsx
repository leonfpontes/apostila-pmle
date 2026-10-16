import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { DownloadIcon, RotateCcwIcon, UploadIcon } from "lucide-react"
import { rotas } from "../../shared/contrato"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Destaque } from "@/components/shared/destaque"
import { AnelDeProgresso, Numero } from "@/components/shared/indicadores"
import { BotaoLink } from "@/components/shared/navegacao"
import { CabecalhoDaPagina, Pagina } from "@/components/shared/pagina"
import { ICONE_DA_ETAPA } from "@/features/jornada/icones"
import type { IdDaEtapa } from "@/domain/jornada/etapas"
import { jornadas, proximoPasso, type JornadaDaSecao } from "@/domain/jornada/jornada"
import { progresso, ProgressStore, useProgresso } from "@/domain/progresso"
import { useSite, useTituloDaPagina } from "@/lib/site"
import { percentual } from "@/lib/texto"
import { cn } from "@/lib/utils"

const COLUNAS: [IdDaEtapa, string][] = [
  ["aulas", "Aulas"],
  ["revisao", "Revisão"],
  ["flashcards", "Flashcards"],
  ["simulado", "Simulado"],
]

function CelulaDaEtapa({ jornada, id }: { jornada: JornadaDaSecao; id: IdDaEtapa }) {
  const etapa = jornada.etapa(id)
  if (!etapa) return <span className="text-muted-foreground">—</span>
  const Icone = ICONE_DA_ETAPA[id]
  return (
    <Link to={etapa.destino} className={cn("inline-flex items-center gap-1.5 hover:underline", etapa.concluida ? "text-success" : "text-foreground")}>
      <Icone className="size-3.5 opacity-70" /> {etapa.detalhe}
    </Link>
  )
}

function TabelaDeSecoes({ lista }: { lista: JornadaDaSecao[] }) {
  return (
    <Card className="mb-8 gap-0 overflow-x-auto py-0">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b bg-muted/60 text-left text-xs text-muted-foreground">
            <th className="px-4 py-2.5 font-medium">Seção</th>
            {COLUNAS.map(([id, rotulo]) => (
              <th key={id} className="px-3 py-2.5 font-medium">
                {rotulo}
              </th>
            ))}
            <th className="px-4 py-2.5 text-right font-medium">Próximo</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((j) => (
            <tr key={`${j.modulo.n}-${j.secao.n}`} className="border-b last:border-0">
              <td className="px-4 py-3">
                <Link to={rotas.secao(j.modulo.n, j.secao.n)} className="flex items-center gap-2.5 font-medium hover:text-primary">
                  <AnelDeProgresso valor={j.percentual} tamanho={22} />
                  <span>
                    <span className="text-xs text-muted-foreground">S{j.secao.n} · </span>
                    {j.secao.titulo}
                  </span>
                </Link>
              </td>
              {COLUNAS.map(([id]) => (
                <td key={id} className="px-3 py-3">
                  <CelulaDaEtapa jornada={j} id={id} />
                </td>
              ))}
              <td className="px-4 py-3 text-right">
                {j.proxima ? (
                  <BotaoLink para={j.proxima.destino} size="sm" variant="outline">
                    {j.proxima.titulo}
                  </BotaoLink>
                ) : (
                  <span className="text-xs font-semibold text-success">Concluída</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}

function DadosDoAluno() {
  const dados = useProgresso()
  const arquivo = useRef<HTMLInputElement>(null)
  const [aviso, setAviso] = useState<{ ok: boolean; texto: string } | null>(null)

  async function importar(f: File | undefined) {
    if (!f) return
    try {
      await progresso.importar(f)
      setAviso({ ok: true, texto: "Progresso importado." })
    } catch (erro) {
      setAviso({ ok: false, texto: (erro as Error).message })
    }
  }

  return (
    <Card>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="nome">Como quer ser chamado (opcional)</Label>
          <Input id="nome" className="h-10" placeholder="Seu nome" defaultValue={dados.nome || ""} maxLength={40} onBlur={(e) => progresso.definirNome(e.target.value)} />
          <p className="text-xs text-muted-foreground">Aparece só para você, neste navegador.</p>
        </div>
        <div className="grid content-start gap-2">
          <span className="text-sm font-medium">Levar o progresso para outro dispositivo</span>
          <p className="text-xs text-muted-foreground">Não há login: o progresso vive neste navegador. Exporte um arquivo e importe no outro computador ou celular.</p>
          <div className="mt-1 flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => progresso.exportar()}>
              <DownloadIcon /> Exportar
            </Button>
            <Button variant="outline" onClick={() => arquivo.current?.click()}>
              <UploadIcon /> Importar
            </Button>
            <input
              ref={arquivo}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={(e) => {
                importar(e.target.files?.[0])
                e.target.value = ""
              }}
            />
            <Dialog>
              <DialogTrigger render={<Button variant="ghost" className="text-destructive" />}>
                <RotateCcwIcon /> Apagar progresso
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Apagar todo o progresso?</DialogTitle>
                  <DialogDescription>Aulas, flashcards, simulados e questões voltam a zero neste navegador. Exporte antes se quiser guardar.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose render={<Button variant="outline">Cancelar</Button>} />
                  <DialogClose render={<Button variant="destructive" onClick={() => progresso.apagar()}>Apagar</Button>} />
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          {aviso && (
            <Alert variant={aviso.ok ? "default" : "destructive"} className="mt-2">
              <AlertDescription>{aviso.texto}</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function PaginaDeProgresso() {
  const site = useSite()
  const dados = useProgresso()
  useTituloDaPagina("Meu progresso")
  const lista = jornadas(site, dados)
  const passo = proximoPasso(site, dados)
  const exame = ProgressStore.desempenhoNoExame(dados)
  const aulasTotal = lista.reduce((s, j) => s + j.secao.aulas.length, 0)

  return (
    <Pagina>
      <CabecalhoDaPagina migalhas={[["Meu progresso"]]} kicker="Acompanhamento pessoal" titulo={dados.nome ? `Progresso de ${dados.nome}` : "Meu progresso"} subtitulo="Tudo o que você já estudou, o que falta em cada seção e o próximo passo recomendado." />
      <Destaque className="mb-6" rotulo="Seu próximo passo" titulo={passo.titulo} texto={passo.contexto} acao={{ para: passo.destino, rotulo: passo.chamada }} />

      <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Numero legenda="Seções concluídas" valor={lista.filter((j) => j.concluida).length} total={lista.length} />
        <Numero legenda="Aulas estudadas" valor={Object.keys(dados.aulas).length} total={aulasTotal} />
        <Numero legenda="Flashcards dominados" valor={Object.values(dados.fc).filter((x) => x.ok).length} total={site.stats.flashcards} />
        <Numero legenda="Questões do exame" valor={exame.respondidas} total={site.stats.questoes} />
      </div>

      <h2 className="titulo-bloco">Seções</h2>
      <TabelaDeSecoes lista={lista} />

      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Banco de questões do exame</CardTitle>
            <CardDescription>{exame.respondidas ? `${exame.respondidas} respondidas · ${percentual(exame.acertos, exame.respondidas)}% de acerto` : "Nenhuma questão respondida ainda."}</CardDescription>
          </CardHeader>
          <CardContent>
            <BotaoLink para={rotas.questoes()} variant="outline">
              Abrir o banco
            </BotaoLink>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Trilha</CardTitle>
            <CardDescription>
              {Object.keys(dados.modulos).length} de {site.modulos.length} módulos marcados como concluídos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BotaoLink para={rotas.trilha()} variant="outline">
              Atualizar na trilha
            </BotaoLink>
          </CardContent>
        </Card>
      </div>

      <h2 className="titulo-bloco">Seus dados</h2>
      <DadosDoAluno />
    </Pagina>
  )
}
