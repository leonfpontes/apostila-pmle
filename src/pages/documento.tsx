import { useEffect, useState, type ReactNode } from "react"
import { Link, useLocation, useSearchParams } from "react-router-dom"
import { SearchIcon } from "lucide-react"
import { arquivos } from "../../shared/contrato"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Markdown } from "@/components/shared/markdown"
import { CabecalhoDaPagina, ComDados, Pagina, type Migalha } from "@/components/shared/pagina"
import type { Doc } from "@/domain/tipos"
import { useDados } from "@/lib/dados"
import { useTituloDaPagina } from "@/lib/site"
import { normalizar } from "@/lib/texto"
import { cn } from "@/lib/utils"

// Página genérica de documento Markdown (aulas, glossários, revisões, guias).
// Opcionalmente com índice lateral ("Nesta página") e filtro de termos.

/** Rola até o título indicado em ?h= (links da busca e do índice). */
function useRolarParaTitulo(pronto: boolean) {
  const [params] = useSearchParams()
  const h = params.get("h")
  useEffect(() => {
    if (!pronto) return
    if (h) requestAnimationFrame(() => document.getElementById(h)?.scrollIntoView({ block: "start" }))
    else window.scrollTo(0, 0)
  }, [pronto, h])
}

function IndiceLateral({ conteudo }: { conteudo: HTMLElement | null }) {
  const [titulos, setTitulos] = useState<{ id: string; texto: string; nivel: number }[]>([])
  const [ativo, setAtivo] = useState("")
  const { pathname } = useLocation()
  useEffect(() => {
    if (!conteudo) return
    const hs = [...conteudo.querySelectorAll<HTMLElement>("h2, h3")]
    setTitulos(hs.map((h) => ({ id: h.id, texto: (h.textContent || "").replace(/⭐+/g, "").trim(), nivel: +h.tagName[1] })))
    const observador = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setAtivo(e.target.id)), { rootMargin: "-70px 0px -70% 0px" })
    hs.forEach((h) => observador.observe(h))
    return () => observador.disconnect()
  }, [conteudo])
  if (titulos.length < 3) return null
  return (
    <nav className="sticky top-20 hidden max-h-[calc(100vh-6rem)] overflow-y-auto border-l pl-4 text-sm xl:block" aria-label="Nesta página">
      <div className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">Nesta página</div>
      {titulos.map((t) => (
        <Link
          key={t.id}
          to={`${pathname}?h=${t.id}`}
          replace
          className={cn("block py-1 leading-snug text-muted-foreground hover:text-primary", t.nivel === 3 && "pl-3 text-[13px]", ativo === t.id && "font-medium text-primary")}
        >
          {t.texto}
        </Link>
      ))}
    </nav>
  )
}

/** Esconde linhas de tabela, itens e parágrafos que não contêm todos os termos. */
function useFiltroDeTermos(conteudo: HTMLElement | null, consulta: string) {
  useEffect(() => {
    if (!conteudo) return
    const termos = normalizar(consulta).split(/\s+/).filter(Boolean)
    const casa = (el: Element) => termos.every((t) => normalizar(el.textContent || "").includes(t))
    const esconder = (el: HTMLElement) => (el.hidden = termos.length > 0 && !casa(el))
    conteudo.querySelectorAll<HTMLElement>("tbody tr, li, .apostila > p, .apostila > blockquote, .apostila > .callout").forEach(esconder)
    conteudo.querySelectorAll<HTMLElement>(".table-wrap").forEach((tw) => {
      tw.hidden = termos.length > 0 && ![...tw.querySelectorAll<HTMLElement>("tbody tr")].some((tr) => !tr.hidden)
    })
  }, [conteudo, consulta])
}

function FiltroDeTermos({ valor, aoMudar }: { valor: string; aoMudar: (v: string) => void }) {
  return (
    <InputGroup className="mb-6 h-10 max-w-xl">
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="Filtrar termos, linhas de tabela e itens…" value={valor} onChange={(e) => aoMudar(e.target.value)} aria-label="Filtrar" />
    </InputGroup>
  )
}

type PropsDoDocumento = {
  id: string
  migalhas?: Migalha[]
  indice?: boolean
  filtro?: boolean
  titulo?: string
  subtitulo?: ReactNode
  abas?: ReactNode
  antes?: ReactNode
  depois?: ReactNode
}

function Conteudo({ doc, migalhas = [], indice = true, filtro, titulo, subtitulo, abas, antes, depois }: PropsDoDocumento & { doc: Doc }) {
  const [elemento, setElemento] = useState<HTMLDivElement | null>(null)
  const [consulta, setConsulta] = useState("")
  const nome = titulo ?? doc.title
  useTituloDaPagina(nome, { topo: false })
  useRolarParaTitulo(true)
  useFiltroDeTermos(elemento, consulta)
  return (
    <Pagina largura={indice ? "larga" : "pagina"}>
      <CabecalhoDaPagina migalhas={[...migalhas, [nome]]} kicker={doc.kind} titulo={nome} subtitulo={subtitulo} />
      {abas}
      {antes}
      {filtro && <FiltroDeTermos valor={consulta} aoMudar={setConsulta} />}
      <div className={cn("grid grid-cols-[minmax(0,1fr)] gap-10", indice && "xl:grid-cols-[minmax(0,1fr)_220px]")}>
        <div ref={setElemento}>
          <Markdown>{doc.md}</Markdown>
        </div>
        {indice && <IndiceLateral conteudo={elemento} />}
      </div>
      {depois}
    </Pagina>
  )
}

export function PaginaDeDocumento(props: PropsDoDocumento) {
  const { dados, erro } = useDados<Doc>(arquivos.doc(props.id))
  return (
    <ComDados dados={dados} erro={erro}>
      {(doc) => <Conteudo key={props.id} doc={doc} {...props} />}
    </ComDados>
  )
}
