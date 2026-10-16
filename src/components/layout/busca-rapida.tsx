import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FileTextIcon } from "lucide-react"
import { arquivos, rotas } from "../../../shared/contrato"
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import type { EntradaDeBusca } from "@/domain/tipos"
import { buscar, destinoDoResultado, termosDaBusca } from "@/lib/busca"
import { carregar } from "@/lib/dados"
import { useSite } from "@/lib/site"

// Busca rápida (Ctrl K ou /). O índice só é baixado na primeira abertura.

export function BuscaRapida({ aberta, aoMudar }: { aberta: boolean; aoMudar: (aberta: boolean) => void }) {
  const site = useSite()
  const navegar = useNavigate()
  const [indice, setIndice] = useState<EntradaDeBusca[] | null>(null)
  const [consulta, setConsulta] = useState("")

  useEffect(() => {
    if (aberta && !indice) carregar<EntradaDeBusca[]>(arquivos.busca).then(setIndice)
  }, [aberta, indice])

  const resultados = useMemo(() => buscar(indice || [], consulta).slice(0, 30), [indice, consulta])
  const curta = termosDaBusca(consulta).length === 0
  const ir = (para: string) => {
    aoMudar(false)
    navegar(para)
  }
  const atalhos: [string, string][] = [
    [rotas.trilha(), "Trilha dos 15 módulos"],
    [rotas.questoes(), `Banco de ${site.stats.questoes} questões`],
    [rotas.flashcards(), "Flashcards"],
    [rotas.simulados(), "Simulados das seções"],
    [rotas.materiais(), "Materiais da turma"],
  ]

  return (
    <CommandDialog open={aberta} onOpenChange={aoMudar} title="Buscar" description="Busque em aulas, glossários, flashcards e questões">
      <Command shouldFilter={false}>
        <CommandInput placeholder="Ex.: recall, Feature Store, TPU, one-hot…" value={consulta} onValueChange={setConsulta} />
        <CommandList className="max-h-[60vh]">
          <CommandEmpty>{curta ? "Digite pelo menos duas letras." : "Nada encontrado."}</CommandEmpty>
          {curta ? (
            <CommandGroup heading="Atalhos">
              {atalhos.map(([para, rotulo]) => (
                <CommandItem key={para} value={rotulo} onSelect={() => ir(para)}>
                  <FileTextIcon />
                  {rotulo}
                </CommandItem>
              ))}
            </CommandGroup>
          ) : (
            <CommandGroup heading={`${resultados.length} resultados`}>
              {resultados.map((r, i) => (
                <CommandItem key={i} value={`${i}-${r.t}-${r.h}`} onSelect={() => ir(destinoDoResultado(r))} className="flex-col items-start gap-0.5">
                  <span className="text-xs text-muted-foreground">{r.k}</span>
                  <span className="font-medium">{r.t}</span>
                  {r.h && <span className="text-xs text-primary">{r.h.replace(/⭐+/g, "")}</span>}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
        <div className="border-t px-3 py-2 text-xs text-muted-foreground">
          <button className="underline" onClick={() => ir(rotas.busca(consulta))}>
            Ver todos os resultados com trechos
          </button>
        </div>
      </Command>
    </CommandDialog>
  )
}
