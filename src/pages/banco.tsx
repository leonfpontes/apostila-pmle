import { useEffect, useMemo, useRef, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { PlayIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MdInline } from "@/components/markdown"
import { ErrorState, Footer, Loading, NotFound, Page, PageHeader } from "@/components/page"
import { Quiz, QBadge, type QuizQuestion } from "@/components/quiz"
import { pct, shuffle, useJSON, type Banco, type QuestaoPMLE } from "@/lib/data"
import { updateProgress, useProgress } from "@/lib/progress"
import { useSite } from "@/lib/site"

const record = (q: QuizQuestion, ok: boolean, sel: string[]) =>
  updateProgress((p) => {
    p.q[String(q.id)] = { ok, sel, t: Date.now() }
  })

function useToQuiz() {
  const p = useProgress()
  return (q: QuestaoPMLE): QuizQuestion => ({
    id: q.id,
    label: `${q.id} · ${q.sub}`,
    lang: "en",
    stem: q.enunciado,
    opts: q.opcoes,
    answer: q.resposta,
    expl: q.explicacao,
    meta: (
      <>
        <QBadge tone="blue">{q.id}</QBadge>
        <QBadge>Seção {q.sub}</QBadge>
        <QBadge>
          <Link to={`/curso/${q.curso}`}>Curso {q.curso}</Link>
        </QBadge>
        <QBadge tone={q.dif === "difícil" ? "bad" : q.dif === "fácil" ? "ok" : "orange"}>{q.dif}</QBadge>
        {p.q[q.id] && <QBadge tone={p.q[q.id].ok ? "ok" : "bad"}>já {p.q[q.id].ok ? "acertou" : "errou"}</QBadge>}
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
  })
}

function Field({ label, value, onChange, items }: { label: string; value: string; onChange: (v: string) => void; items: { value: string; label: string }[] }) {
  return (
    <div className="grid gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <Select items={items} value={value} onValueChange={(v) => onChange(String(v ?? ""))}>
        <SelectTrigger className="h-10 w-full" aria-label={label}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {items.map((it) => (
            <SelectItem key={it.value} value={it.value}>
              {it.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export function BancoPage() {
  const site = useSite()
  const { data: bank, error } = useJSON<Banco>("questoes.json")
  const [params, setParams] = useSearchParams()
  const p = useProgress()
  const toQuiz = useToQuiz()
  const [rodada, setRodada] = useState<{ id: number; qs: QuizQuestion[] } | null>(null)
  const quizRef = useRef<HTMLDivElement>(null)

  const f = {
    secao: params.get("secao") || "all",
    curso: params.get("curso") || "all",
    dif: params.get("dif") || "all",
    status: params.get("status") || "all",
    n: params.get("n") || "20",
  }
  const set = (k: keyof typeof f, v: string) => {
    const next = new URLSearchParams(params)
    if (v === "all" || (k === "n" && v === "20")) next.delete(k)
    else next.set(k, v)
    setParams(next, { replace: true })
  }

  useEffect(() => {
    document.title = "Banco de questões · Apostila PMLE"
  }, [])

  const filtered = useMemo(
    () =>
      (bank?.questoes || []).filter(
        (q) =>
          (f.secao === "all" || q.secao === +f.secao) &&
          (f.curso === "all" || q.curso === +f.curso) &&
          (f.dif === "all" || q.dif === f.dif) &&
          (f.status === "all" || (f.status === "novas" ? !p.q[q.id] : !!p.q[q.id] && !p.q[q.id].ok))
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bank, f.secao, f.curso, f.dif, f.status]
  )

  if (error) return <ErrorState error={error} />
  if (!bank) return <Loading />

  // uma questão isolada (vinda da busca)
  const one = params.get("q")
  if (one) {
    const q = bank.questoes.find((x) => x.id === one)
    if (!q) return <NotFound />
    return (
      <Page narrow>
        <PageHeader crumbs={[["Banco de questões", "/questoes"], [q.id]]} title={`Questão ${q.id}`} sub={`Seção ${q.sub}: ${bank.secoes.find((s) => s.n === q.secao)?.titulo}`} />
        <Quiz key={q.id} questions={[toQuiz(q)]} onAnswer={record} />
        <Footer />
      </Page>
    )
  }

  function iniciar() {
    let pick: QuestaoPMLE[]
    const n = f.n === "all" ? filtered.length : +f.n
    if (f.secao === "all" && n < filtered.length) {
      // distribui pela proporção de peso de cada seção na prova
      pick = []
      const tot = bank!.secoes.reduce((s, x) => s + (x.peso || 0), 0)
      for (const s of bank!.secoes) pick.push(...shuffle(filtered.filter((q) => q.secao === s.n)).slice(0, Math.round((n * (s.peso || 0)) / tot)))
      const rest = shuffle(filtered.filter((q) => !pick.includes(q)))
      while (pick.length < n && rest.length) pick.push(rest.pop()!)
      pick = shuffle(pick.slice(0, n))
    } else pick = shuffle(filtered).slice(0, n)
    setRodada({ id: Date.now(), qs: pick.map(toQuiz) })
    setTimeout(() => quizRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50)
  }

  const cursosComQ = [...new Set(bank.questoes.map((q) => q.curso))].sort((a, b) => a - b)
  const secStats = bank.secoes.map((s) => {
    const qs = bank.questoes.filter((q) => q.secao === s.n)
    const ans = qs.filter((q) => p.q[q.id])
    return { ...s, total: qs.length, ans: ans.length, ok: ans.filter((q) => p.q[q.id].ok).length }
  })

  return (
    <Page narrow>
      <PageHeader
        crumbs={[["Banco de questões"]]}
        kicker="Exame Professional ML Engineer"
        title={`Banco de ${bank.questoes.length} questões`}
        sub="Em inglês, como na prova, com gabarito revisado e explicação em português. Monte uma rodada com os filtros abaixo."
      >
        <p className="mt-2 text-sm">
          <Link to="/questoes/sobre" className="text-primary underline">
            Como o banco foi montado
          </Link>{" "}
          ·{" "}
          <Link to="/exame" className="text-primary underline">
            Guia do exame
          </Link>
        </p>
      </PageHeader>

      <Card className="mb-5">
        <CardHeader>
          <CardTitle>Seu desempenho por seção</CardTitle>
          <CardDescription>Respondidas e taxa de acerto, pelo peso de cada seção na prova.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          {secStats.map((s) => (
            <div key={s.n} className="grid grid-cols-[1fr_5rem_3.5rem] items-center gap-3 text-sm sm:grid-cols-[1fr_9rem_4rem]">
              <button className="text-left hover:text-primary" onClick={() => set("secao", String(s.n))}>
                <strong>{s.n}.</strong> {s.titulo} <span className="text-xs text-muted-foreground">({s.peso}%)</span>
              </button>
              <Progress value={pct(s.ans, s.total)} aria-label={`${s.ans} de ${s.total} respondidas`} />
              <span className="text-right tabular-nums">{s.ans ? `${pct(s.ok, s.ans)}% ✓` : `0/${s.total}`}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Montar rodada</CardTitle>
          <CardDescription>Com "Todas as seções" e 50 questões, a rodada respeita o peso de cada seção na prova.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <Field
            label="Seção"
            value={f.secao}
            onChange={(v) => set("secao", v)}
            items={[{ value: "all", label: "Todas as seções" }, ...bank.secoes.map((s) => ({ value: String(s.n), label: `${s.n}. ${s.titulo}` }))]}
          />
          <Field
            label="Curso da trilha"
            value={f.curso}
            onChange={(v) => set("curso", v)}
            items={[{ value: "all", label: "Todos os cursos" }, ...cursosComQ.map((n) => ({ value: String(n), label: `${n}. ${site.cursos.find((c) => c.n === n)?.titulo}` }))]}
          />
          <Field
            label="Dificuldade"
            value={f.dif}
            onChange={(v) => set("dif", v)}
            items={[
              { value: "all", label: "Qualquer dificuldade" },
              { value: "fácil", label: "Fácil" },
              { value: "média", label: "Média" },
              { value: "difícil", label: "Difícil" },
            ]}
          />
          <Field
            label="Situação"
            value={f.status}
            onChange={(v) => set("status", v)}
            items={[
              { value: "all", label: "Todas as questões" },
              { value: "novas", label: "Só as que nunca respondi" },
              { value: "erradas", label: "Só as que errei" },
            ]}
          />
          <Field
            label="Quantidade"
            value={f.n}
            onChange={(v) => set("n", v)}
            items={[
              { value: "10", label: "10 questões" },
              { value: "20", label: "20 questões" },
              { value: "50", label: "50 questões (tamanho da prova)" },
              { value: "all", label: "Todas as filtradas" },
            ]}
          />
          <div className="flex items-end justify-between gap-3">
            <span className="pb-2 text-sm text-muted-foreground">{filtered.length} no filtro</span>
            <Button size="lg" className="h-10 px-5" disabled={!filtered.length} onClick={iniciar}>
              <PlayIcon /> Começar
            </Button>
          </div>
        </CardContent>
      </Card>

      <div ref={quizRef} className="scroll-mt-20">
        {rodada && <Quiz key={rodada.id} questions={rodada.qs} onAnswer={record} title={`${rodada.qs.length} questões do exame`} />}
      </div>
      <Footer />
    </Page>
  )
}
