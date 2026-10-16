import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { CheckCircle2Icon, ChevronLeftIcon, ChevronRightIcon, EyeIcon, FlagIcon, RotateCcwIcon, XCircleIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Markdown, MdInline } from "@/components/markdown"
import type { Opcao } from "@/lib/data"
import { pct, plural } from "@/lib/data"
import { cn } from "@/lib/utils"

export type QuizQuestion = {
  id: string | number
  label?: string
  stem: string
  opts: Opcao[]
  answer: string[] // vazio = questão aberta (autoavaliação) ou sem gabarito
  expl: string
  meta?: ReactNode
  extra?: ReactNode
  lang?: string
}

type Mode = "estudo" | "prova"
type St = { sel: string[]; done: boolean; ok: boolean | null }

export function Quiz({
  questions,
  onAnswer,
  onFinish,
  title,
}: {
  questions: QuizQuestion[]
  onAnswer?: (q: QuizQuestion, ok: boolean, sel: string[]) => void
  onFinish?: (r: { ok: number; total: number; score: number }) => void
  title?: string
}) {
  const [qs, setQs] = useState(questions)
  const [state, setState] = useState<St[]>(() => questions.map(() => ({ sel: [], done: false, ok: null })))
  const [i, setI] = useState(0)
  const [mode, setMode] = useState<Mode>("estudo")
  const [finished, setFinished] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const top = useRef<HTMLDivElement>(null)

  const q = qs[i]
  const s = state[i]
  const open = !q.opts.length
  const multi = q.answer.length > 1
  const showFb = mode === "estudo" && s.done
  const answered = state.filter((x) => x.done || x.sel.length).length
  const pending = state.filter((x, k) => qs[k].opts.length && !x.sel.length).length

  const patch = (k: number, p: Partial<St>) => setState((prev) => prev.map((x, j) => (j === k ? { ...x, ...p } : x)))
  const correct = (sel: string[]) => q.answer.length === sel.length && q.answer.every((l) => sel.includes(l))
  const scrollTop = () => top.current?.scrollIntoView({ block: "start", behavior: "smooth" })

  function grade(sel: string[]) {
    const ok = q.answer.length ? correct(sel) : null
    patch(i, { sel, done: true, ok })
    if (ok != null) onAnswer?.(q, ok, sel)
  }

  function pick(l: string) {
    if (showFb) return
    if (multi) {
      const sel = (s.sel.includes(l) ? s.sel.filter((x) => x !== l) : [...s.sel, l].slice(-q.answer.length)).sort()
      if (mode === "prova" && sel.length === q.answer.length) grade(sel)
      else patch(i, { sel, done: false })
    } else grade([l])
  }

  function go(k: number) {
    setI(k)
    scrollTop()
  }

  function finish() {
    setConfirmOpen(false)
    setFinished(true)
    scrollTop()
  }

  function restart(list: QuizQuestion[]) {
    setQs(list)
    setState(list.map(() => ({ sel: [], done: false, ok: null })))
    setI(0)
    setFinished(false)
    scrollTop()
  }

  const result = useMemo(() => {
    const graded = qs.map((q, k) => ({ q, s: state[k], k })).filter(({ q }) => q.answer.length || !q.opts.length)
    const total = graded.filter(({ q, s }) => q.opts.length || s.ok != null).length
    const ok = graded.filter(({ s }) => s.ok).length
    const wrong = graded.filter(({ q, s }) => s.ok === false || (q.opts.length && !s.sel.length))
    return { ok, total, score: pct(ok, total), wrong }
  }, [qs, state])

  useEffect(() => {
    if (finished) onFinish?.(result)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished])

  if (finished) {
    const tone = result.score >= 80 ? "text-success" : result.score < 60 ? "text-destructive" : "text-primary"
    return (
      <div ref={top} className="scroll-mt-20">
        <Card>
          <CardContent className="flex flex-col items-center gap-2 py-8 text-center">
            <div className={cn("text-6xl font-extrabold tabular-nums", tone)}>{result.score}%</div>
            <p>
              {result.ok} de {result.total} certas{title ? ` · ${title}` : ""}
            </p>
            <p className="max-w-md text-sm text-muted-foreground">
              {result.score >= 80
                ? "Ótimo: acima da linha de 80% usada como referência nos simulados."
                : "Abaixo de 80%: vale revisar o glossário e as armadilhas antes de tentar de novo."}
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              <Button
                size="lg"
                onClick={() => {
                  setMode("estudo")
                  setState((prev) => prev.map((x) => (x.sel.length ? { ...x, done: true } : x)))
                  setFinished(false)
                  setI(0)
                }}
              >
                <EyeIcon /> Revisar questão por questão
              </Button>
              {result.wrong.length > 0 && (
                <Button size="lg" variant="outline" onClick={() => restart(result.wrong.map((w) => w.q))}>
                  Refazer só as erradas
                </Button>
              )}
              <Button size="lg" variant="outline" onClick={() => restart(qs)}>
                <RotateCcwIcon /> Recomeçar
              </Button>
            </div>
          </CardContent>
        </Card>
        {result.wrong.length > 0 && (
          <>
            <h2 className="mt-8 mb-3 text-lg font-bold">Para revisar ({result.wrong.length})</h2>
            <div className="grid gap-2">
              {result.wrong.map(({ q, k }) => (
                <button
                  key={k}
                  className="rounded-xl border bg-card p-3 text-left transition-colors hover:border-primary"
                  onClick={() => {
                    setMode("estudo")
                    setState((prev) => prev.map((x) => (x.sel.length ? { ...x, done: true } : x)))
                    setFinished(false)
                    setI(k)
                  }}
                >
                  <div className="font-semibold">
                    Questão {k + 1}
                    {q.label ? ` · ${q.label}` : ""}
                  </div>
                  <div className="line-clamp-2 text-sm text-muted-foreground">{q.stem.replace(/[*_`#>]/g, "")}</div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <div ref={top} className="scroll-mt-20">
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <strong>
          Questão {i + 1} de {qs.length}
        </strong>
        <ToggleGroup
          className="ml-auto"
          variant="outline"
          size="sm"
          value={[mode]}
          onValueChange={(v: string[]) => v[0] && setMode(v[0] as Mode)}
          aria-label="Modo"
        >
          <Tooltip>
            <TooltipTrigger render={<ToggleGroupItem value="estudo">Modo estudo</ToggleGroupItem>} />
            <TooltipContent>Mostra a resposta logo após cada questão</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger render={<ToggleGroupItem value="prova">Modo prova</ToggleGroupItem>} />
            <TooltipContent>Só mostra o resultado no fim</TooltipContent>
          </Tooltip>
        </ToggleGroup>
      </div>
      <Progress value={pct(answered, qs.length)} aria-label="Questões respondidas" />
      <div className="my-4 flex flex-wrap gap-1.5" aria-label="Ir para a questão">
        {qs.map((_, k) => {
          const st = state[k]
          const cls =
            mode === "estudo" && st.done && st.ok != null
              ? st.ok
                ? "border-transparent bg-success-bg text-success"
                : "border-transparent bg-destructive/10 text-destructive"
              : st.done || st.sel.length
                ? "border-transparent bg-secondary text-secondary-foreground"
                : ""
          return (
            <button
              key={k}
              onClick={() => go(k)}
              aria-label={`Questão ${k + 1}`}
              aria-current={k === i}
              className={cn(
                "size-8 rounded-md border text-xs font-bold tabular-nums transition-colors hover:border-primary",
                cls,
                k === i && "ring-2 ring-ring ring-offset-1 ring-offset-background"
              )}
            >
              {k + 1}
            </button>
          )
        })}
      </div>

      <Card>
        <CardContent className="space-y-4 py-2 md:px-6">
          {q.meta && <div className="flex flex-wrap gap-1.5">{q.meta}</div>}
          <div lang={q.lang} className="text-[1.05rem]">
            <Markdown>{q.stem}</Markdown>
          </div>
          {open ? (
            <p className="text-sm text-muted-foreground">Questão aberta: responda mentalmente ou no papel e depois confira.</p>
          ) : (
            <div className="grid gap-2.5" lang={q.lang} role={multi ? "group" : "radiogroup"}>
              {multi && <p className="text-sm font-semibold">Escolha {q.answer.length} alternativas.</p>}
              {q.opts.map((o) => {
                const selected = s.sel.includes(o.l)
                const right = showFb && q.answer.includes(o.l)
                const wrong = showFb && selected && !q.answer.includes(o.l)
                return (
                  <button
                    key={o.l}
                    role={multi ? "checkbox" : "radio"}
                    aria-checked={selected}
                    disabled={showFb}
                    onClick={() => pick(o.l)}
                    className={cn(
                      "grid grid-cols-[2rem_1fr] items-start gap-3 rounded-xl border-[1.5px] bg-card p-3 text-left leading-snug transition-colors enabled:hover:border-primary",
                      selected && !showFb && "border-primary bg-secondary",
                      right && "border-success bg-success-bg",
                      wrong && "border-destructive bg-destructive/10"
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-7 place-items-center rounded-md bg-muted text-sm font-extrabold",
                        selected && !showFb && "bg-primary text-primary-foreground",
                        right && "bg-success text-white",
                        wrong && "bg-destructive text-white"
                      )}
                    >
                      {o.l}
                    </span>
                    <MdInline>{o.t}</MdInline>
                  </button>
                )
              })}
            </div>
          )}

          {open && s.done && (
            <div className="rounded-xl border bg-muted p-4">
              <div className="mb-1.5 font-bold">Resposta comentada</div>
              <Markdown>{q.expl}</Markdown>
              {s.ok == null ? (
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-sm">Como foi?</span>
                  <Button size="sm" variant="destructive" onClick={() => patch(i, { ok: false })}>
                    Errei
                  </Button>
                  <Button size="sm" className="bg-success text-white hover:bg-success/85" onClick={() => patch(i, { ok: true })}>
                    Acertei
                  </Button>
                </div>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">
                  Você marcou: <strong>{s.ok ? "acertei" : "errei"}</strong>
                </p>
              )}
            </div>
          )}

          {!open && showFb && (
            <div
              className={cn(
                "rounded-xl border p-4",
                !q.answer.length ? "bg-muted" : s.ok ? "border-success/40 bg-success-bg" : "border-destructive/40 bg-destructive/10"
              )}
            >
              <div className={cn("mb-1.5 flex items-center gap-2 font-bold", s.ok ? "text-success" : q.answer.length ? "text-destructive" : "")}>
                {!q.answer.length ? (
                  "Sem gabarito"
                ) : s.ok ? (
                  <>
                    <CheckCircle2Icon className="size-5" /> Correto
                  </>
                ) : (
                  <>
                    <XCircleIcon className="size-5" /> Resposta correta: {q.answer.join(", ")}
                  </>
                )}
              </div>
              <Markdown>{q.expl}</Markdown>
              {q.extra}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Button variant="outline" size="lg" disabled={i === 0} onClick={() => go(i - 1)}>
              <ChevronLeftIcon /> Anterior
            </Button>
            {open && !s.done && (
              <Button size="lg" onClick={() => patch(i, { done: true })}>
                Mostrar resposta
              </Button>
            )}
            {!open && multi && mode === "estudo" && !s.done && (
              <Button size="lg" disabled={s.sel.length !== q.answer.length} onClick={() => grade(s.sel)}>
                Confirmar
              </Button>
            )}
            <div className="flex-1" />
            {i < qs.length - 1 && (
              <Button variant="outline" size="lg" onClick={() => go(i + 1)}>
                Próxima <ChevronRightIcon />
              </Button>
            )}
            <Button size="lg" variant={i === qs.length - 1 ? "default" : "secondary"} onClick={() => (pending ? setConfirmOpen(true) : finish())}>
              <FlagIcon /> Finalizar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Finalizar agora?</DialogTitle>
            <DialogDescription>
              Ainda há {plural(pending, "questão sem resposta", "questões sem resposta")}. Elas contam como erradas.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Continuar respondendo</Button>} />
            <Button onClick={finish}>Finalizar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export function QBadge({ children, tone = "outline" }: { children: ReactNode; tone?: "outline" | "blue" | "ok" | "bad" | "orange" }) {
  const cls = {
    outline: "",
    blue: "border-transparent bg-secondary text-secondary-foreground",
    ok: "border-transparent bg-success-bg text-success",
    bad: "border-transparent bg-destructive/10 text-destructive",
    orange: "border-transparent bg-brand-orange/15 text-brand-orange-ink",
  }[tone]
  return (
    <Badge variant="outline" className={cls}>
      {children}
    </Badge>
  )
}
