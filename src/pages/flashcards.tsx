import { arquivos, rotas } from "../../shared/contrato"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CardLink } from "@/components/shared/navegacao"
import { CabecalhoDaPagina, ComDados, NaoEncontrada, Pagina } from "@/components/shared/pagina"
import { Treino } from "@/features/flashcards/treino"
import { AbasDaSecao } from "@/features/secao/abas"
import { migalhasDaSecao, useSecaoDaRota } from "@/features/secao/use-secao"
import { ProgressStore, useProgresso } from "@/domain/progresso"
import { temMaterial, type Baralho } from "@/domain/tipos"
import { useDados } from "@/lib/dados"
import { useSite, useTituloDaPagina } from "@/lib/site"
import { percentual } from "@/lib/texto"

/** Todos os baralhos, com quantos cartões já foram dominados. */
export function TodosOsFlashcards() {
  const site = useSite()
  const dados = useProgresso()
  useTituloDaPagina("Flashcards")
  const baralhos = site.modulos.filter(temMaterial).flatMap((m) =>
    m.secoes.flatMap((s) => {
      const material = s.materiais.find((x) => x.tipo === "flashcards")
      return material ? [{ m, s, total: material.total || 0, dominados: ProgressStore.cartoesDominados(dados, m.n, s.n) }] : []
    })
  )
  return (
    <Pagina>
      <CabecalhoDaPagina
        migalhas={[["Flashcards"]]}
        titulo="Flashcards"
        subtitulo='Leia a pergunta, responda em voz alta, vire o cartão e diga se acertou. Os que você errar voltam no modo "só os que ainda não acertei".'
      />
      <div className="grid gap-4 md:grid-cols-2">
        {baralhos.map(({ m, s, total, dominados }) => (
          <CardLink key={`${m.n}-${s.n}`} para={rotas.material(m.n, s.n, "flashcards")}>
            <CardHeader>
              <div className="kicker">
                Módulo {m.n} · Seção {s.n}
              </div>
              <CardTitle>{s.titulo}</CardTitle>
              <CardDescription>
                {total} cartões · {dominados} dominados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={percentual(dominados, total)} aria-label="Cartões dominados" />
            </CardContent>
          </CardLink>
        ))}
      </div>
    </Pagina>
  )
}

/** Treino de flashcards de uma seção. */
export function FlashcardsDaSecao() {
  const { modulo, secao } = useSecaoDaRota()
  const { dados, erro } = useDados<Baralho>(modulo && secao ? arquivos.flashcards(modulo.n, secao.n) : null)
  useTituloDaPagina(secao && `Flashcards · Seção ${secao.n}`)
  if (!modulo || !secao) return <NaoEncontrada />
  const temSimulado = secao.materiais.some((x) => x.tipo === "simulado")
  return (
    <ComDados dados={dados} erro={erro}>
      {(baralho) => (
        <Pagina largura="leitura">
          <CabecalhoDaPagina migalhas={[...migalhasDaSecao(modulo.n, secao.n), ["Flashcards"]]} kicker={`Flashcards · Seção ${secao.n}`} titulo={baralho.titulo} />
          <AbasDaSecao modulo={modulo} secao={secao} ativa="flashcards" />
          <Treino key={`${modulo.n}-${secao.n}`} baralho={baralho} modulo={modulo.n} secao={secao.n} proximo={temSimulado ? rotas.material(modulo.n, secao.n, "simulado") : undefined} />
        </Pagina>
      )}
    </ComDados>
  )
}
