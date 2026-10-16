import { Link } from "react-router-dom"
import { rotas } from "../../../shared/contrato"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ROTULO_MATERIAL, type ModuloComMaterial, type Secao, type TipoMaterial } from "@/domain/tipos"

/** Abas da seção: Aulas + uma aba por material disponível. */
export function AbasDaSecao({ modulo, secao, ativa }: { modulo: ModuloComMaterial; secao: Secao; ativa: "aulas" | TipoMaterial }) {
  const abas: [string, string, string][] = [
    ["aulas", "Aulas", rotas.secao(modulo.n, secao.n)],
    ...secao.materiais.map((m): [string, string, string] => [m.tipo, ROTULO_MATERIAL[m.tipo].label, rotas.material(modulo.n, secao.n, m.tipo)]),
  ]
  return (
    <Tabs value={ativa} className="mb-6">
      <TabsList variant="line" className="w-full justify-start overflow-x-auto border-b" aria-label="Abas da seção">
        {abas.map(([valor, rotulo, para]) => (
          <TabsTrigger key={valor} value={valor} render={<Link to={para} />} nativeButton={false} className="flex-none px-3">
            {rotulo}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
