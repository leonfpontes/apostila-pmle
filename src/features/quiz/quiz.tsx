import { useEffect, useRef, useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon, FlagIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { percentual, plural } from "@/lib/texto"
import { cn } from "@/lib/utils"
import { Questao } from "./questao"
import { ResultadoDoQuiz } from "./resultado"
import { ehAberta, ehMultipla, useQuiz, type EstadoDoQuiz, type Modo, type QuestaoDoQuiz, type ResultadoDoQuiz as Resultado } from "./use-quiz"

export type { QuestaoDoQuiz }

function SeletorDeModo({ quiz }: { quiz: EstadoDoQuiz }) {
  const opcoes: [Modo, string, string][] = [
    ["estudo", "Modo estudo", "Mostra a resposta logo após cada questão"],
    ["prova", "Modo prova", "Só mostra o resultado no fim"],
  ]
  return (
    <ToggleGroup className="ml-auto" variant="outline" size="sm" value={[quiz.modo]} onValueChange={(v: string[]) => v[0] && quiz.setModo(v[0] as Modo)} aria-label="Modo">
      {opcoes.map(([valor, rotulo, dica]) => (
        <Tooltip key={valor}>
          <TooltipTrigger render={<ToggleGroupItem value={valor}>{rotulo}</ToggleGroupItem>} />
          <TooltipContent>{dica}</TooltipContent>
        </Tooltip>
      ))}
    </ToggleGroup>
  )
}

function MapaDeQuestoes({ quiz, ir }: { quiz: EstadoDoQuiz; ir: (k: number) => void }) {
  return (
    <div className="my-4 flex flex-wrap gap-1.5" aria-label="Ir para a questão">
      {quiz.questoes.map((_, k) => {
        const r = quiz.respostas[k]
        const tom =
          quiz.modo === "estudo" && r.respondida && r.certa !== null
            ? r.certa
              ? "border-transparent bg-success-bg text-success"
              : "border-transparent bg-destructive/10 text-destructive"
            : r.respondida || r.sel.length
              ? "border-transparent bg-secondary text-secondary-foreground"
              : ""
        return (
          <button
            key={k}
            onClick={() => ir(k)}
            aria-label={`Questão ${k + 1}`}
            aria-current={k === quiz.indice}
            className={cn("size-8 rounded-md border text-xs font-bold tabular-nums transition-colors hover:border-primary", tom, k === quiz.indice && "ring-2 ring-ring ring-offset-1 ring-offset-background")}
          >
            {k + 1}
          </button>
        )
      })}
    </div>
  )
}

/** Quiz completo: navegação, questão, correção e resultado. */
export function Quiz({
  questoes,
  aoResponder,
  aoFinalizar,
  titulo,
}: {
  questoes: QuestaoDoQuiz[]
  aoResponder?: (q: QuestaoDoQuiz, certa: boolean, sel: string[]) => void
  aoFinalizar?: (r: Resultado) => void
  titulo?: string
}) {
  const quiz = useQuiz(questoes, aoResponder)
  const [confirmar, setConfirmar] = useState(false)
  const topo = useRef<HTMLDivElement>(null)
  const rolarAoTopo = () => topo.current?.scrollIntoView({ block: "start", behavior: "smooth" })
  const ir = (k: number) => {
    quiz.irPara(k)
    rolarAoTopo()
  }
  const finalizar = () => {
    setConfirmar(false)
    quiz.finalizar()
    rolarAoTopo()
  }

  useEffect(() => {
    if (quiz.finalizado) aoFinalizar?.(quiz.resultado)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz.finalizado])

  if (quiz.finalizado)
    return (
      <div ref={topo} className="ancora">
        <ResultadoDoQuiz quiz={quiz} titulo={titulo} />
      </div>
    )

  const { questao, resposta, indice } = quiz
  const ultima = indice === quiz.questoes.length - 1
  return (
    <div ref={topo} className="ancora">
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <strong>
          Questão {indice + 1} de {quiz.questoes.length}
        </strong>
        <SeletorDeModo quiz={quiz} />
      </div>
      <Progress value={percentual(quiz.respondidas, quiz.questoes.length)} aria-label="Questões respondidas" />
      <MapaDeQuestoes quiz={quiz} ir={ir} />

      <Card>
        <CardContent className="space-y-4 py-2 md:px-6">
          <Questao quiz={quiz} />
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Button variant="outline" size="lg" disabled={indice === 0} onClick={() => ir(indice - 1)}>
              <ChevronLeftIcon /> Anterior
            </Button>
            {ehAberta(questao) && !resposta.respondida && (
              <Button size="lg" onClick={quiz.revelarAberta}>
                Mostrar resposta
              </Button>
            )}
            {ehMultipla(questao) && quiz.modo === "estudo" && !resposta.respondida && (
              <Button size="lg" disabled={resposta.sel.length !== questao.gabarito.length} onClick={quiz.confirmarMultipla}>
                Confirmar
              </Button>
            )}
            <div className="flex-1" />
            {!ultima && (
              <Button variant="outline" size="lg" onClick={() => ir(indice + 1)}>
                Próxima <ChevronRightIcon />
              </Button>
            )}
            <Button size="lg" variant={ultima ? "default" : "secondary"} onClick={() => (quiz.pendentes ? setConfirmar(true) : finalizar())}>
              <FlagIcon /> Finalizar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={confirmar} onOpenChange={setConfirmar}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Finalizar agora?</DialogTitle>
            <DialogDescription>Ainda há {plural(quiz.pendentes, "questão sem resposta", "questões sem resposta")}. Elas contam como erradas.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Continuar respondendo</Button>} />
            <Button onClick={finalizar}>Finalizar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
