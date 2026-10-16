import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { DownloadIcon, RotateCcwIcon, UploadIcon } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ETAPA_ICON, NextStepCard, ProgressRing } from "@/components/journey"
import { Footer, Page, PageHeader } from "@/components/page"
import { pct } from "@/lib/data"
import { proximoPasso, todosModulos } from "@/lib/journey"
import { exportProgress, importProgress, resetProgress, updateProgress, useProgress } from "@/lib/progress"
import { useSite } from "@/lib/site"
import { cn } from "@/lib/utils"

export function ProgressoPage() {
  const site = useSite()
  const p = useProgress()
  const mods = todosModulos(site, p)
  const passo = proximoPasso(site, p)
  const fileRef = useRef<HTMLInputElement>(null)
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  useEffect(() => {
    document.title = "Meu progresso · Apostila PMLE"
    window.scrollTo(0, 0)
  }, [])

  const aulasTot = mods.reduce((s, m) => s + m.modulo.aulas.length, 0)
  const aulasOk = Object.keys(p.aulas).length
  const fcTot = site.stats.flashcards
  const fcOk = Object.values(p.fc).filter((x) => x.ok).length
  const qAns = Object.keys(p.q).length
  const qOk = Object.values(p.q).filter((x) => x.ok).length
  const modsOk = mods.filter((m) => m.done).length

  return (
    <Page>
      <PageHeader crumbs={[["Meu progresso"]]} kicker="Acompanhamento pessoal" title={p.nome ? `Progresso de ${p.nome}` : "Meu progresso"} sub="Tudo o que você já estudou, o que falta em cada seção e o próximo passo recomendado." />

      <NextStepCard passo={passo} className="mb-6" />

      <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          ["Seções concluídas", modsOk, mods.length],
          ["Aulas estudadas", aulasOk, aulasTot],
          ["Flashcards dominados", fcOk, fcTot],
          ["Questões do exame", qAns, site.stats.questoes],
        ].map(([l, v, t]) => (
          <Card key={l as string} size="sm">
            <CardContent>
              <div className="text-xs text-muted-foreground">{l}</div>
              <div className="mt-1 text-2xl font-extrabold tabular-nums">
                {v}
                <span className="text-sm font-medium text-muted-foreground"> / {t}</span>
              </div>
              <Progress value={pct(v as number, t as number)} className="mt-2" aria-label={l as string} />
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="mb-3 text-xl font-bold">Seções</h2>
      <Card className="mb-8 gap-0 overflow-x-auto py-0">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b bg-muted/60 text-left text-xs text-muted-foreground">
              <th className="px-4 py-2.5 font-medium">Seção</th>
              <th className="px-3 py-2.5 font-medium">Aulas</th>
              <th className="px-3 py-2.5 font-medium">Revisão</th>
              <th className="px-3 py-2.5 font-medium">Flashcards</th>
              <th className="px-3 py-2.5 font-medium">Simulado</th>
              <th className="px-4 py-2.5 text-right font-medium">Próximo</th>
            </tr>
          </thead>
          <tbody>
            {mods.map((s) => {
              const cell = (id: string) => {
                const e = s.etapas.find((x) => x.id === id)
                if (!e) return <span className="text-muted-foreground">—</span>
                const Icon = ETAPA_ICON[e.id]
                return (
                  <Link to={e.to} className={cn("inline-flex items-center gap-1.5 hover:underline", e.done ? "text-success" : "text-foreground")}>
                    <Icon className="size-3.5 opacity-70" /> {e.detalhe}
                  </Link>
                )
              }
              return (
                <tr key={`${s.curso.n}-${s.modulo.n}`} className="border-b last:border-0">
                  <td className="px-4 py-3">
                    <Link to={`/curso/${s.curso.n}/modulo/${s.modulo.n}`} className="flex items-center gap-2.5 font-medium hover:text-primary">
                      <ProgressRing value={s.pct} size={22} />
                      <span>
                        <span className="text-xs text-muted-foreground">S{s.modulo.n} · </span>
                        {s.modulo.titulo}
                      </span>
                    </Link>
                  </td>
                  <td className="px-3 py-3">{cell("aulas")}</td>
                  <td className="px-3 py-3">{cell("revisao")}</td>
                  <td className="px-3 py-3">{cell("flashcards")}</td>
                  <td className="px-3 py-3">{cell("simulado")}</td>
                  <td className="px-4 py-3 text-right">
                    {s.proxima ? (
                      <Button size="sm" variant="outline" render={<Link to={s.proxima.to} />} nativeButton={false}>
                        {s.proxima.titulo}
                      </Button>
                    ) : (
                      <span className="text-xs font-semibold text-success">Concluído</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Card>

      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Banco de questões do exame</CardTitle>
            <CardDescription>{qAns ? `${qAns} respondidas · ${pct(qOk, qAns)}% de acerto` : "Nenhuma questão respondida ainda."}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" render={<Link to="/questoes" />} nativeButton={false}>
              Abrir o banco
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Trilha</CardTitle>
            <CardDescription>{Object.keys(p.cursos).length} de 15 módulos marcados como concluídos.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" render={<Link to="/trilha" />} nativeButton={false}>
              Atualizar na trilha
            </Button>
          </CardContent>
        </Card>
      </div>

      <h2 className="mb-3 text-xl font-bold">Seus dados</h2>
      <Card>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="nome">Como quer ser chamado (opcional)</Label>
            <Input
              id="nome"
              className="h-10"
              placeholder="Seu nome"
              defaultValue={p.nome || ""}
              maxLength={40}
              onBlur={(e) => updateProgress((pr) => void (pr.nome = e.target.value.trim() || undefined))}
            />
            <p className="text-xs text-muted-foreground">Aparece só para você, neste navegador.</p>
          </div>
          <div className="grid content-start gap-2">
            <span className="text-sm font-medium">Levar o progresso para outro dispositivo</span>
            <p className="text-xs text-muted-foreground">Não há login: o progresso vive neste navegador. Exporte um arquivo e importe no outro computador ou celular.</p>
            <div className="mt-1 flex flex-wrap gap-2">
              <Button variant="outline" onClick={exportProgress}>
                <DownloadIcon /> Exportar
              </Button>
              <Button variant="outline" onClick={() => fileRef.current?.click()}>
                <UploadIcon /> Importar
              </Button>
              <input
                ref={fileRef}
                type="file"
                accept="application/json,.json"
                className="hidden"
                onChange={async (e) => {
                  const f = e.target.files?.[0]
                  e.target.value = ""
                  if (!f) return
                  try {
                    await importProgress(f)
                    setMsg({ ok: true, text: "Progresso importado." })
                  } catch (err) {
                    setMsg({ ok: false, text: (err as Error).message })
                  }
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
                    <DialogClose render={<Button variant="destructive" onClick={resetProgress}>Apagar</Button>} />
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            {msg && (
              <Alert variant={msg.ok ? "default" : "destructive"} className="mt-2">
                <AlertDescription>{msg.text}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>
      <Footer />
    </Page>
  )
}
