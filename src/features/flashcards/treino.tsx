import { useEffect } from "react"
import { CheckIcon, RotateCcwIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Destaque } from "@/components/shared/destaque"
import { Kbd } from "@/components/shared/kbd"
import { useProgresso } from "@/domain/progresso"
import type { Baralho } from "@/domain/tipos"
import { percentual } from "@/lib/texto"
import { CartaoGiratorio } from "./cartao-giratorio"
import { useTreino, type EstadoDoTreino, type Filtro } from "./use-treino"

const ITEM_ATIVO = "data-[pressed]:bg-primary data-[pressed]:text-primary-foreground"

function FiltroDeBlocos({ treino, baralho }: { treino: EstadoDoTreino; baralho: Baralho }) {
  const dados = useProgresso()
  const dominados = (bloco: number) => treino.todos.filter((c) => c.bloco === bloco && dados.fc[c.chave]?.ok).length
  return (
    <ToggleGroup
      value={[String(treino.filtro)]}
      onValueChange={(v: string[]) => v[0] && treino.filtrar((v[0] === "todos" ? "todos" : Number(v[0])) as Filtro)}
      variant="outline"
      size="sm"
      spacing={2}
      className="flex-wrap justify-start"
      aria-label="Escolher bloco"
    >
      <ToggleGroupItem value="todos" className={ITEM_ATIVO}>
        Todos ({treino.todos.length})
      </ToggleGroupItem>
      {baralho.blocos.map((b, i) => (
        <ToggleGroupItem key={i} value={String(i)} className={ITEM_ATIVO} title={b.titulo}>
          {b.titulo.replace(/^Bloco (\d+) — /, "$1 · ").replace(/^Cartões extra — /, "Extra · ")}
          <span className="opacity-60 tabular-nums">
            {dominados(i)}/{b.cards.length}
          </span>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

function Opcoes({ treino }: { treino: EstadoDoTreino }) {
  return (
    <div className="my-4 flex flex-wrap items-center gap-x-5 gap-y-2">
      <div className="flex items-center gap-2">
        <Switch id="aleatorio" checked={treino.aleatorio} onCheckedChange={treino.alternarAleatorio} />
        <Label htmlFor="aleatorio">Embaralhar</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="pendentes" checked={treino.soPendentes} onCheckedChange={treino.alternarPendentes} />
        <Label htmlFor="pendentes">Só os que ainda não acertei</Label>
      </div>
      <Dialog>
        <DialogTrigger render={<Button variant="ghost" size="sm" className="ml-auto text-muted-foreground" />}>
          <RotateCcwIcon /> Zerar progresso
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Zerar o progresso desta seção?</DialogTitle>
            <DialogDescription>Todos os cartões voltam a contar como não dominados.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancelar</Button>} />
            <DialogClose render={<Button variant="destructive" onClick={treino.zerar}>Zerar</Button>} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function FimDaRodada({ treino, proximo }: { treino: EstadoDoTreino; proximo?: string }) {
  const { certos, errados } = treino.placar
  return (
    <>
      <Card>
        <CardContent className="flex flex-col items-center gap-2 py-10 text-center">
          <div className="text-6xl font-extrabold text-primary tabular-nums">{percentual(certos, certos + errados)}%</div>
          <p>
            Você acertou {certos} de {certos + errados} cartões nesta rodada.
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {errados > 0 && (
              <Button size="lg" onClick={() => treino.alternarPendentes(true)}>
                Repetir só os que errei
              </Button>
            )}
            <Button size="lg" variant="outline" onClick={treino.recomecar}>
              <RotateCcwIcon /> Recomeçar
            </Button>
          </div>
        </CardContent>
      </Card>
      {proximo && (
        <Destaque
          className="mt-6"
          compacto
          titulo="Próximo passo: testar no simulado"
          texto="Quando dominar a maior parte dos cartões, confira se o conteúdo ficou com as questões da seção."
          acao={{ para: proximo, rotulo: "Ir para o simulado" }}
        />
      )}
    </>
  )
}

function useAtalhosDeTeclado(treino: EstadoDoTreino) {
  const { cartao, virar, responder, andar } = treino
  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).matches("input, textarea, select, [role=switch]") || !cartao) return
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault()
        virar()
      } else if (e.key === "1") responder(false)
      else if (e.key === "2") responder(true)
      else if (e.key === "ArrowRight") andar(1)
      else if (e.key === "ArrowLeft") andar(-1)
    }
    document.addEventListener("keydown", aoTeclar)
    return () => document.removeEventListener("keydown", aoTeclar)
  }, [cartao, virar, responder, andar])
}

/** Treino completo de um baralho: filtros, cartão, respostas e fim de rodada. */
export function Treino({ baralho, modulo, secao, proximo }: { baralho: Baralho; modulo: number; secao: number; proximo?: string }) {
  const treino = useTreino(baralho, modulo, secao)
  useAtalhosDeTeclado(treino)
  const { fila, posicao, cartao } = treino

  return (
    <div>
      <FiltroDeBlocos treino={treino} baralho={baralho} />
      <Opcoes treino={treino} />
      {!fila.length ? (
        <Card>
          <CardContent className="py-10 text-center">
            <div className="mb-2 text-5xl">🎉</div>
            <p>{treino.soPendentes ? "Nenhum cartão pendente neste filtro: você já acertou todos." : "Nenhum cartão neste filtro."}</p>
          </CardContent>
        </Card>
      ) : !cartao ? (
        <FimDaRodada treino={treino} proximo={proximo} />
      ) : (
        <>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              Cartão {posicao + 1} de {fila.length}
            </span>
            <span className="truncate pl-4">{baralho.blocos[cartao.bloco].titulo}</span>
          </div>
          <Progress value={percentual(posicao, fila.length)} className="my-2" aria-label="Andamento" />
          <CartaoGiratorio pergunta={cartao.q} resposta={cartao.a} virado={treino.virado} aoVirar={treino.virar} />
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button size="lg" variant="destructive" className="h-12 text-base" onClick={() => treino.responder(false)}>
              <XIcon /> Errei <Kbd className="ml-1 hidden sm:inline-flex">1</Kbd>
            </Button>
            <Button size="lg" className="h-12 bg-success text-base text-white hover:bg-success/85" onClick={() => treino.responder(true)}>
              <CheckIcon /> Acertei <Kbd className="ml-1 hidden sm:inline-flex">2</Kbd>
            </Button>
          </div>
          <p className="mt-4 hidden text-sm text-muted-foreground sm:block">
            Atalhos: <Kbd>espaço</Kbd> vira · <Kbd>1</Kbd> errei · <Kbd>2</Kbd> acertei · <Kbd>←</Kbd> <Kbd>→</Kbd> navegar
          </p>
        </>
      )}
    </div>
  )
}
