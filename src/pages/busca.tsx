import { useEffect, useMemo, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { SearchIcon } from "lucide-react"
import { arquivos } from "../../shared/contrato"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Etiqueta } from "@/components/shared/indicadores"
import { CabecalhoDaPagina, Pagina } from "@/components/shared/pagina"
import type { EntradaDeBusca } from "@/domain/tipos"
import { buscar, destinoDoResultado, termosDaBusca, trecho } from "@/lib/busca"
import { useDados } from "@/lib/dados"
import { useTituloDaPagina } from "@/lib/site"
import { plural } from "@/lib/texto"

const MAX_RESULTADOS = 60

function Resultado({ entrada, termos }: { entrada: EntradaDeBusca; termos: string[] }) {
  return (
    <Link to={destinoDoResultado(entrada)} className="rounded-xl border bg-card p-4 transition-colors hover:border-primary">
      <div className="flex flex-wrap items-center gap-2">
        <Etiqueta>{entrada.k}</Etiqueta>
        <span className="font-semibold">{entrada.t}</span>
      </div>
      {entrada.h && <div className="mt-1 text-sm text-primary">{entrada.h.replace(/⭐+/g, "")}</div>}
      <div className="mt-1 text-sm text-muted-foreground">
        {trecho(entrada.x, termos).map((p, i) => (p.marcado ? <mark key={i}>{p.texto}</mark> : <span key={i}>{p.texto}</span>))}
      </div>
    </Link>
  )
}

export function PaginaDeBusca() {
  const [params, setParams] = useSearchParams()
  const [consulta, setConsulta] = useState(params.get("q") || "")
  const { dados: indice } = useDados<EntradaDeBusca[]>(arquivos.busca)
  useTituloDaPagina("Busca")
  useEffect(() => {
    const t = setTimeout(() => setParams(consulta ? { q: consulta } : {}, { replace: true }), 200)
    return () => clearTimeout(t)
  }, [consulta, setParams])
  const termos = termosDaBusca(consulta)
  const resultados = useMemo(() => buscar(indice || [], consulta), [indice, consulta])

  return (
    <Pagina largura="leitura">
      <CabecalhoDaPagina migalhas={[["Busca"]]} titulo="Buscar no material" />
      <InputGroup className="mb-6 h-11">
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput autoFocus placeholder="Ex.: recall, Feature Store, TPU, one-hot…" value={consulta} onChange={(e) => setConsulta(e.target.value)} aria-label="Buscar" />
      </InputGroup>
      {!termos.length ? (
        <p className="text-muted-foreground">Digite pelo menos duas letras.</p>
      ) : !indice ? (
        <p className="text-muted-foreground">Carregando o índice…</p>
      ) : !resultados.length ? (
        <p className="py-10 text-center text-muted-foreground">Nada encontrado. Tente outra palavra.</p>
      ) : (
        <>
          <p className="mb-3 text-sm text-muted-foreground">{plural(resultados.length, "resultado", "resultados")}</p>
          <div className="grid gap-2.5">
            {resultados.slice(0, MAX_RESULTADOS).map((r, i) => (
              <Resultado key={i} entrada={r} termos={termos} />
            ))}
          </div>
        </>
      )}
    </Pagina>
  )
}
