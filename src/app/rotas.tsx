import type { RouteObject } from "react-router-dom"
import { docIds, rotas } from "../../shared/contrato"
import { NaoEncontrada } from "@/components/shared/pagina"
import { PaginaDeArmadilhas } from "@/pages/armadilhas"
import { PaginaDaAula } from "@/pages/aula"
import { RotaAntiga } from "./rota-antiga"
import { PaginaDoBanco } from "@/pages/banco"
import { PaginaDeBusca } from "@/pages/busca"
import { PaginaComeceAqui } from "@/pages/comece"
import { PaginaDeDocumento } from "@/pages/documento"
import { FlashcardsDaSecao, TodosOsFlashcards } from "@/pages/flashcards"
import { PaginaInicial } from "@/pages/inicio"
import { PaginaDeMateriais } from "@/pages/materiais"
import { PaginaDoModulo } from "@/pages/modulo"
import { PaginaDeProgresso } from "@/pages/progresso"
import { PaginaDaSecao, PaginaDeMaterialDaSecao } from "@/pages/secao"
import { SimuladoDaSecao, TodosOsSimulados } from "@/pages/simulados"
import { PaginaDaTrilha } from "@/pages/trilha"

// Tabela de rotas. Os caminhos seguem `rotas` de shared/contrato.js; ao criar
// uma rota nova, acrescente o gerador lá e a página aqui.

export const ROTAS: RouteObject[] = [
  { path: rotas.inicio(), element: <PaginaInicial /> },
  { path: rotas.comece(), element: <PaginaComeceAqui /> },
  { path: rotas.progresso(), element: <PaginaDeProgresso /> },
  { path: rotas.trilha(), element: <PaginaDaTrilha /> },
  { path: rotas.cronograma(), element: <PaginaDeDocumento id={docIds.cronograma} migalhas={[["Trilha", rotas.trilha()]]} /> },
  { path: rotas.materiais(), element: <PaginaDeMateriais /> },
  { path: rotas.exame(), element: <PaginaDeDocumento id={docIds.exameGuia} migalhas={[["Exame PMLE"]]} /> },
  { path: rotas.questoes(), element: <PaginaDoBanco /> },
  { path: rotas.questoesSobre(), element: <PaginaDeDocumento id={docIds.exameBanco} migalhas={[["Banco de questões", rotas.questoes()]]} indice={false} /> },
  { path: rotas.flashcards(), element: <TodosOsFlashcards /> },
  { path: rotas.simulados(), element: <TodosOsSimulados /> },
  { path: rotas.busca(), element: <PaginaDeBusca /> },
  { path: rotas.modulo(":n"), element: <PaginaDoModulo /> },
  { path: rotas.armadilhas(":n"), element: <PaginaDeArmadilhas /> },
  { path: rotas.secao(":n", ":s"), element: <PaginaDaSecao /> },
  { path: rotas.material(":n", ":s", "revisao"), element: <PaginaDeMaterialDaSecao tipo="revisao" /> },
  { path: rotas.material(":n", ":s", "glossario"), element: <PaginaDeMaterialDaSecao tipo="glossario" /> },
  { path: rotas.material(":n", ":s", "flashcards"), element: <FlashcardsDaSecao /> },
  { path: rotas.material(":n", ":s", "simulado"), element: <SimuladoDaSecao /> },
  { path: rotas.aula(":n", ":id"), element: <PaginaDaAula /> },
  { path: rotas.transcricao(":n", ":id"), element: <PaginaDaAula transcricao /> },
  { path: "/curso/*", element: <RotaAntiga /> },
  { path: "*", element: <NaoEncontrada /> },
]
