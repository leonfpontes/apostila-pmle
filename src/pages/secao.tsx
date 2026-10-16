import { useEffect } from "react"
import { Link } from "react-router-dom"
import { CheckCircle2Icon, InfoIcon } from "lucide-react"
import { docIds, rotas } from "../../shared/contrato"
import { Card } from "@/components/ui/card"
import { Estrelas, Etiqueta } from "@/components/shared/indicadores"
import { CabecalhoDaPagina, NaoEncontrada, Pagina } from "@/components/shared/pagina"
import { RoteiroDaSecao } from "@/features/jornada/roteiro-da-secao"
import { AbasDaSecao } from "@/features/secao/abas"
import { migalhasDaSecao, migalhasDoModulo, useSecaoDaRota } from "@/features/secao/use-secao"
import { JornadaDaSecao } from "@/domain/jornada/jornada"
import { progresso, ProgressStore, useProgresso } from "@/domain/progresso"
import type { ItemDaEmenta } from "@/domain/tipos"
import { useTituloDaPagina } from "@/lib/site"
import { cn } from "@/lib/utils"
import { PaginaDeDocumento } from "./documento"

/** Visão geral da seção: roteiro de etapas e lista de aulas e atividades. */
export function PaginaDaSecao() {
  const { modulo, secao } = useSecaoDaRota()
  const dados = useProgresso()
  useTituloDaPagina(secao && `Seção ${secao.n}`)
  if (!modulo || !secao) return <NaoEncontrada />

  const aulas = new Map(modulo.aulas.map((a) => [a.id, a]))
  const itens: ItemDaEmenta[] = secao.itens.length ? secao.itens : secao.aulas.map((id) => ({ id, titulo: aulas.get(id)!.titulo, tipo: "🎬", estrelas: 0 }))

  return (
    <Pagina largura="leitura">
      <CabecalhoDaPagina migalhas={[...migalhasDoModulo(modulo.n), [`Seção ${secao.n}`]]} kicker={`Módulo ${modulo.n} · Seção ${secao.n}`} titulo={secao.titulo} />
      <AbasDaSecao modulo={modulo} secao={secao} ativa="aulas" />
      <RoteiroDaSecao jornada={new JornadaDaSecao(modulo, secao, dados)} />
      <h2 className="titulo-bloco">Aulas e atividades da seção</h2>
      <Card className="gap-0 py-0">
        {itens.map((item, k) => {
          const aula = aulas.get(item.id)
          const estudada = aula && dados.aulas[ProgressStore.chaves.aula(modulo.n, aula.id)]
          const linha = cn("grid grid-cols-[3rem_1fr_auto] items-center gap-3 px-4 py-3.5", k > 0 && "border-t")
          const conteudo = (
            <>
              <span className={cn("font-extrabold tabular-nums", aula ? "text-primary" : "text-muted-foreground")}>{item.id}</span>
              <span className="min-w-0">
                <span className={cn("block leading-snug font-semibold", !aula && "font-normal text-muted-foreground")}>{aula?.titulo ?? item.titulo}</span>
                {aula && <span className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">{aula.resumo}</span>}
              </span>
              <span className="flex flex-wrap items-center justify-end gap-1.5">
                <Estrelas quantidade={item.estrelas} />
                {estudada && (
                  <Etiqueta tom="sucesso">
                    <CheckCircle2Icon /> estudada
                  </Etiqueta>
                )}
                <Etiqueta>{item.tipo.replace(" obrigatório", "")}</Etiqueta>
              </span>
            </>
          )
          return aula ? (
            <Link key={item.id} to={rotas.aula(modulo.n, aula.id)} className={cn(linha, "transition-colors hover:bg-muted")}>
              {conteudo}
            </Link>
          ) : (
            <div key={item.id} className={linha}>
              {conteudo}
            </div>
          )
        })}
      </Card>
      <p className="mt-3 text-sm text-muted-foreground">Labs, quizzes e readings ficam na plataforma Google Skills; os itens com link têm resumo de estudo.</p>
      {secao.nota && (
        <p className="mt-2 text-sm text-muted-foreground">
          <InfoIcon className="mr-1 inline size-3.5 align-[-2px]" />
          Numeração: {secao.nota.replace(/\*\*/g, "")}.
        </p>
      )}
    </Pagina>
  )
}

/** Revisão ou glossário da seção (documento Markdown com abas da seção). */
export function PaginaDeMaterialDaSecao({ tipo }: { tipo: "revisao" | "glossario" }) {
  const { modulo, secao } = useSecaoDaRota()
  useEffect(() => {
    if (modulo && secao) progresso.marcarRevisaoVista(modulo.n, secao.n)
  }, [modulo, secao])
  if (!modulo || !secao?.materiais.some((m) => m.tipo === tipo)) return <NaoEncontrada />
  return (
    <PaginaDeDocumento
      id={docIds.material(modulo.n, secao.n, tipo)}
      migalhas={migalhasDaSecao(modulo.n, secao.n)}
      filtro={tipo === "glossario"}
      abas={<AbasDaSecao modulo={modulo} secao={secao} ativa={tipo} />}
    />
  )
}
