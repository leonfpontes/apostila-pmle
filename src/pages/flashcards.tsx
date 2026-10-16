import { useCallback, useEffect, useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { CheckIcon, RotateCcwIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MdInline } from "@/components/markdown"
import { WhatsNext } from "@/components/journey"
import { Kbd } from "@/components/kbd"
import { ErrorState, Footer, Loading, NotFound, Page, PageHeader } from "@/components/page"
import { pct, shuffle, tituloLimpo, useJSON, type Deck } from "@/lib/data"
import { getProgress, updateProgress, useProgress } from "@/lib/progress"
import { useCurso, useSite } from "@/lib/site"
import { cursoCrumbs, ModuloTabs } from "./curso"

type Card_ = { q: string; a: string; bloco: number; key: string }

export function AllFlashcards() {
  const site = useSite()
  const p = useProgress()
  useEffect(() => {
    document.title = "Flashcards · Apostila PMLE"
    window.scrollTo(0, 0)
  }, [])
  const decks = site.cursos
    .filter((c) => c.material)
    .flatMap((c) =>
      c.modulos!.flatMap((m) => {
        const f = m.materiais.find((x) => x.tipo === "flashcards")
        if (!f) return []
        const pref = `c${c.n}-m${m.n}:`
        const ok = Object.entries(p.fc).filter(([k, v]) => k.startsWith(pref) && v.ok).length
        return [{ c, m, total: f.total || 0, ok }]
      })
    )
  return (
    <Page>
      <PageHeader
        crumbs={[["Flashcards"]]}
        title="Flashcards"
        sub='Leia a pergunta, responda em voz alta, vire o cartão e diga se acertou. Os que você errar voltam no modo "só os que ainda não acertei".'
      />
      <div className="grid gap-4 md:grid-cols-2">
        {decks.map((d) => (
          <Link key={`${d.c.n}-${d.m.n}`} to={`/curso/${d.c.n}/modulo/${d.m.n}/flashcards`} className="group">
            <Card className="h-full transition-colors group-hover:ring-primary">
              <CardHeader>
                <div className="text-xs font-bold tracking-widest text-brand-orange-ink uppercase">
                  Módulo {d.c.n} · Seção {d.m.n}
                </div>
                <CardTitle>{d.m.titulo}</CardTitle>
                <CardDescription>
                  {d.total} cartões · {d.ok} dominados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={pct(d.ok, d.total)} aria-label="Cartões dominados" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <Footer />
    </Page>
  )
}

export function FlashcardsPage() {
  const params = useParams()
  const n = Number(params.n)
  const m = Number(params.m)
  const c = useCurso(n)
  const { data: deck, error } = useJSON<Deck>(`flashcards/c${n}-m${m}.json`)
  useEffect(() => {
    document.title = `Flashcards · Seção ${m} · Apostila PMLE`
    window.scrollTo(0, 0)
  }, [m])
  if (!c?.modulos?.some((x) => x.n === m)) return <NotFound />
  if (error) return <ErrorState error={error} />
  if (!deck) return <Loading />
  return (
    <Page narrow>
      <PageHeader crumbs={[...cursoCrumbs(n), [`Seção ${m}`, `/curso/${n}/modulo/${m}`], ["Flashcards"]]} kicker={`Flashcards · Seção ${m}`} title={tituloLimpo(deck.titulo)} />
      <ModuloTabs n={n} m={m} active="flashcards" />
      <Trainer deck={deck} prefix={`c${n}-m${m}`} key={`${n}-${m}`} next={c.modulos!.find((x) => x.n === m)!.materiais.some((x) => x.tipo === "simulado") ? `/curso/${n}/modulo/${m}/simulado` : undefined} />
      <Footer />
    </Page>
  )
}

function Trainer({ deck, prefix, next }: { deck: Deck; prefix: string; next?: string }) {
  const progress = useProgress()
  const all = useMemo<Card_[]>(
    () => deck.blocos.flatMap((b, bi) => b.cards.map((card, ci) => ({ ...card, bloco: bi, key: `${prefix}:${bi}:${ci}` }))),
    [deck, prefix]
  )
  const [filtro, setFiltro] = useState("all")
  const [soErrados, setSoErrados] = useState(false)
  const [embaralhar, setEmbaralhar] = useState(true)
  const [fila, setFila] = useState<Card_[]>([])
  const [pos, setPos] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [sessao, setSessao] = useState({ ok: 0, bad: 0 })

  const start = useCallback(
    (f = filtro, wrong = soErrados, sh = embaralhar) => {
      let cards = f === "all" ? all : all.filter((c) => c.bloco === Number(f))
      if (wrong) cards = cards.filter((c) => !getProgress().fc[c.key]?.ok)
      setFila(sh ? shuffle(cards) : cards)
      setPos(0)
      setFlipped(false)
      setSessao({ ok: 0, bad: 0 })
    },
    [all, filtro, soErrados, embaralhar]
  )
  useEffect(() => {
    start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [all])

  const answer = useCallback(
    (ok: boolean) => {
      const c = fila[pos]
      if (!c) return
      updateProgress((p) => {
        p.fc[c.key] = { ok, t: Date.now() }
      })
      setSessao((s) => ({ ...s, [ok ? "ok" : "bad"]: s[ok ? "ok" : "bad"] + 1 }))
      setPos((p) => p + 1)
      setFlipped(false)
    },
    [fila, pos]
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).matches("input, textarea, select, [role=switch]") || pos >= fila.length) return
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault()
        setFlipped((f) => !f)
      } else if (e.key === "1") answer(false)
      else if (e.key === "2") answer(true)
      else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const d = e.key === "ArrowRight" ? 1 : -1
        setPos((p) => Math.min(Math.max(p + d, 0), fila.length))
        setFlipped(false)
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [answer, fila.length, pos])

  const okCount = (cards: Card_[]) => cards.filter((c) => progress.fc[c.key]?.ok).length
  const card = fila[pos]

  return (
    <div>
      <ToggleGroup
        value={[filtro]}
        onValueChange={(v: string[]) => {
          if (!v[0]) return
          setFiltro(v[0])
          start(v[0])
        }}
        variant="outline"
        size="sm"
        spacing={2}
        className="flex-wrap justify-start"
        aria-label="Escolher bloco"
      >
        <ToggleGroupItem value="all" className="data-[pressed]:bg-primary data-[pressed]:text-primary-foreground">
          Todos ({all.length})
        </ToggleGroupItem>
        {deck.blocos.map((b, i) => {
          const cards = all.filter((c) => c.bloco === i)
          return (
            <ToggleGroupItem key={i} value={String(i)} className="data-[pressed]:bg-primary data-[pressed]:text-primary-foreground" title={b.titulo}>
              {b.titulo.replace(/^Bloco (\d+) — /, "$1 · ").replace(/^Cartões extra — /, "Extra · ")}
              <span className="opacity-60 tabular-nums">
                {okCount(cards)}/{cards.length}
              </span>
            </ToggleGroupItem>
          )
        })}
      </ToggleGroup>

      <div className="my-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        <div className="flex items-center gap-2">
          <Switch id="sh" checked={embaralhar} onCheckedChange={(v) => (setEmbaralhar(v), start(filtro, soErrados, v))} />
          <Label htmlFor="sh">Embaralhar</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="wr" checked={soErrados} onCheckedChange={(v) => (setSoErrados(v), start(filtro, v))} />
          <Label htmlFor="wr">Só os que ainda não acertei</Label>
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
              <DialogClose
                render={
                  <Button
                    variant="destructive"
                    onClick={() => {
                      updateProgress((p) => all.forEach((c) => delete p.fc[c.key]))
                      start()
                    }}
                  >
                    Zerar
                  </Button>
                }
              />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {!fila.length ? (
        <Card>
          <CardContent className="py-10 text-center">
            <div className="mb-2 text-5xl">🎉</div>
            <p>{soErrados ? "Nenhum cartão pendente neste filtro: você já acertou todos." : "Nenhum cartão neste filtro."}</p>
          </CardContent>
        </Card>
      ) : !card ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-2 py-10 text-center">
            <div className="text-6xl font-extrabold text-primary tabular-nums">{pct(sessao.ok, sessao.ok + sessao.bad)}%</div>
            <p>
              Você acertou {sessao.ok} de {sessao.ok + sessao.bad} cartões nesta rodada.
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {sessao.bad > 0 && (
                <Button size="lg" onClick={() => (setSoErrados(true), start(filtro, true))}>
                  Repetir só os que errei
                </Button>
              )}
              <Button size="lg" variant="outline" onClick={() => start()}>
                <RotateCcwIcon /> Recomeçar
              </Button>
            </div>
            {next && (
              <div className="w-full text-left">
                <WhatsNext titulo="Próximo passo: testar no simulado" texto="Quando dominar a maior parte dos cartões, confira se o conteúdo ficou com as 30 questões da seção." to={next} cta="Ir para o simulado" />
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              Cartão {pos + 1} de {fila.length}
            </span>
            <span className="truncate pl-4">{deck.blocos[card.bloco].titulo}</span>
          </div>
          <Progress value={pct(pos, fila.length)} className="my-2" aria-label="Andamento" />
          <FlipCard q={card.q} a={card.a} flipped={flipped} onFlip={() => setFlipped((f) => !f)} />
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button size="lg" variant="destructive" className="h-12 text-base" onClick={() => answer(false)}>
              <XIcon /> Errei <Kbd className="ml-1 hidden sm:inline-flex">1</Kbd>
            </Button>
            <Button size="lg" className="h-12 bg-success text-base text-white hover:bg-success/85" onClick={() => answer(true)}>
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

function FlipCard({ q, a, flipped, onFlip }: { q: string; a: string; flipped: boolean; onFlip: () => void }) {
  const face = "flip-face flex flex-col items-center justify-center rounded-2xl border p-8 text-center text-xl leading-snug shadow-sm md:p-12 md:text-2xl"
  return (
    <div className="flip-stage">
      <button
        type="button"
        onClick={onFlip}
        aria-label={flipped ? "Mostrar a pergunta" : "Mostrar a resposta"}
        className="flip-card grid min-h-72 w-full cursor-pointer rounded-2xl"
        data-flipped={flipped}
      >
        {/* as duas faces ocupam a mesma célula; a altura acompanha a maior */}
        <div className={`${face} relative col-start-1 row-start-1 bg-card`} style={{ position: "relative" }}>
          <span className="absolute top-3.5 left-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">Pergunta</span>
          <MdInline>{q}</MdInline>
          <span className="absolute bottom-3 text-xs text-muted-foreground">Toque ou espaço para virar</span>
        </div>
        <div className={`${face} flip-back relative col-start-1 row-start-1 border-primary/30 bg-brand-tint`} style={{ position: "relative" }}>
          <span className="absolute top-3.5 left-4 text-xs font-semibold tracking-widest text-primary uppercase">Resposta</span>
          <MdInline className="[&_strong]:text-primary">{a}</MdInline>
        </div>
      </button>
    </div>
  )
}
