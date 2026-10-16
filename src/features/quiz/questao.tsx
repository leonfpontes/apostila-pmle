import { CheckCircle2Icon, XCircleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Markdown, MdInline } from "@/components/shared/markdown"
import { cn } from "@/lib/utils"
import { ehAberta, ehMultipla, type EstadoDoQuiz } from "./use-quiz"

// Corpo de uma questão: enunciado, alternativas e correção.

const ESTILO_LETRA = {
  selecionada: ["border-primary bg-secondary", "bg-primary text-primary-foreground"],
  certa: ["border-success bg-success-bg", "bg-success text-white"],
  errada: ["border-destructive bg-destructive/10", "bg-destructive text-white"],
  neutra: ["", ""],
} as const

function Alternativas({ quiz }: { quiz: EstadoDoQuiz }) {
  const { questao, resposta, mostrarCorrecao } = quiz
  const multipla = ehMultipla(questao)
  return (
    <div className="grid gap-2.5" lang={questao.idioma} role={multipla ? "group" : "radiogroup"}>
      {multipla && <p className="text-sm font-semibold">Escolha {questao.gabarito.length} alternativas.</p>}
      {questao.alternativas.map((alt) => {
        const marcada = resposta.sel.includes(alt.l)
        const estado = mostrarCorrecao
          ? questao.gabarito.includes(alt.l)
            ? "certa"
            : marcada
              ? "errada"
              : "neutra"
          : marcada
            ? "selecionada"
            : "neutra"
        const [caixa, letra] = ESTILO_LETRA[estado]
        return (
          <button
            key={alt.l}
            role={multipla ? "checkbox" : "radio"}
            aria-checked={marcada}
            disabled={mostrarCorrecao}
            onClick={() => quiz.escolher(alt.l)}
            className={cn("grid grid-cols-[2rem_1fr] items-start gap-3 rounded-xl border-[1.5px] bg-card p-3 text-left leading-snug transition-colors enabled:hover:border-primary", caixa)}
          >
            <span className={cn("grid size-7 place-items-center rounded-md bg-muted text-sm font-extrabold", letra)}>{alt.l}</span>
            <MdInline>{alt.t}</MdInline>
          </button>
        )
      })}
    </div>
  )
}

function Correcao({ quiz }: { quiz: EstadoDoQuiz }) {
  const { questao, resposta } = quiz
  if (!questao.gabarito.length)
    return (
      <div className="rounded-xl border bg-muted p-4">
        <div className="mb-1.5 font-bold">Sem gabarito</div>
        <Markdown>{questao.explicacao}</Markdown>
      </div>
    )
  return (
    <div className={cn("rounded-xl border p-4", resposta.certa ? "border-success/40 bg-success-bg" : "border-destructive/40 bg-destructive/10")}>
      <div className={cn("mb-1.5 flex items-center gap-2 font-bold", resposta.certa ? "text-success" : "text-destructive")}>
        {resposta.certa ? <CheckCircle2Icon className="size-5" /> : <XCircleIcon className="size-5" />}
        {resposta.certa ? "Correto" : `Resposta correta: ${questao.gabarito.join(", ")}`}
      </div>
      <Markdown>{questao.explicacao}</Markdown>
      {questao.extra}
    </div>
  )
}

function RespostaAberta({ quiz }: { quiz: EstadoDoQuiz }) {
  const { questao, resposta } = quiz
  return (
    <div className="rounded-xl border bg-muted p-4">
      <div className="mb-1.5 font-bold">Resposta comentada</div>
      <Markdown>{questao.explicacao}</Markdown>
      {resposta.certa === null ? (
        <div className="mt-3 flex items-center gap-2">
          <span className="text-sm">Como foi?</span>
          <Button size="sm" variant="destructive" onClick={() => quiz.autoavaliar(false)}>
            Errei
          </Button>
          <Button size="sm" className="bg-success text-white hover:bg-success/85" onClick={() => quiz.autoavaliar(true)}>
            Acertei
          </Button>
        </div>
      ) : (
        <p className="mt-2 text-sm text-muted-foreground">
          Você marcou: <strong>{resposta.certa ? "acertei" : "errei"}</strong>
        </p>
      )}
    </div>
  )
}

export function Questao({ quiz }: { quiz: EstadoDoQuiz }) {
  const { questao, resposta, mostrarCorrecao } = quiz
  const aberta = ehAberta(questao)
  return (
    <>
      {questao.meta && <div className="flex flex-wrap gap-1.5">{questao.meta}</div>}
      <div lang={questao.idioma} className="text-[1.05rem]">
        <Markdown>{questao.enunciado}</Markdown>
      </div>
      {aberta ? <p className="text-sm text-muted-foreground">Questão aberta: responda mentalmente ou no papel e depois confira.</p> : <Alternativas quiz={quiz} />}
      {aberta && resposta.respondida && <RespostaAberta quiz={quiz} />}
      {!aberta && mostrarCorrecao && <Correcao quiz={quiz} />}
    </>
  )
}
