import { EyeIcon, RotateCcwIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { META_SIMULADO } from "@/domain/jornada/etapas"
import { semMarkdown } from "@/lib/texto"
import { cn } from "@/lib/utils"
import type { EstadoDoQuiz } from "./use-quiz"

// Tela final do quiz: nota, ações e lista do que revisar.

export function ResultadoDoQuiz({ quiz, titulo }: { quiz: EstadoDoQuiz; titulo?: string }) {
  const { resultado } = quiz
  const cor = resultado.nota >= META_SIMULADO ? "text-success" : resultado.nota < 60 ? "text-destructive" : "text-primary"
  return (
    <>
      <Card>
        <CardContent className="flex flex-col items-center gap-2 py-8 text-center">
          <div className={cn("text-6xl font-extrabold tabular-nums", cor)}>{resultado.nota}%</div>
          <p>
            {resultado.acertos} de {resultado.total} certas{titulo ? ` · ${titulo}` : ""}
          </p>
          <p className="max-w-md text-sm text-muted-foreground">
            {resultado.nota >= META_SIMULADO
              ? `Ótimo: acima da linha de ${META_SIMULADO}% usada como referência nos simulados.`
              : `Abaixo de ${META_SIMULADO}%: vale revisar o glossário e as armadilhas antes de tentar de novo.`}
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <Button size="lg" onClick={() => quiz.revisar()}>
              <EyeIcon /> Revisar questão por questão
            </Button>
            {resultado.erradas.length > 0 && (
              <Button size="lg" variant="outline" onClick={() => quiz.recomecar(resultado.erradas.map((e) => e.questao))}>
                Refazer só as erradas
              </Button>
            )}
            <Button size="lg" variant="outline" onClick={() => quiz.recomecar()}>
              <RotateCcwIcon /> Recomeçar
            </Button>
          </div>
        </CardContent>
      </Card>
      {resultado.erradas.length > 0 && (
        <>
          <h2 className="mt-8 titulo-bloco">Para revisar ({resultado.erradas.length})</h2>
          <div className="grid gap-2">
            {resultado.erradas.map(({ questao, indice }) => (
              <button key={indice} className="rounded-xl border bg-card p-3 text-left transition-colors hover:border-primary" onClick={() => quiz.revisar(indice)}>
                <div className="font-semibold">
                  Questão {indice + 1}
                  {questao.rotulo ? ` · ${questao.rotulo}` : ""}
                </div>
                <div className="line-clamp-2 text-sm text-muted-foreground">{semMarkdown(questao.enunciado)}</div>
              </button>
            ))}
          </div>
        </>
      )}
    </>
  )
}
