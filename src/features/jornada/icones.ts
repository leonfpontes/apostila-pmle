import { BookOpenCheckIcon, LayersIcon, ListChecksIcon, NotebookTextIcon, type LucideIcon } from "lucide-react"
import type { IdDaEtapa } from "@/domain/jornada/etapas"

/** Ícone de cada etapa da jornada (roteiro, painel de progresso, página inicial). */
export const ICONE_DA_ETAPA: Record<IdDaEtapa, LucideIcon> = {
  aulas: NotebookTextIcon,
  revisao: BookOpenCheckIcon,
  flashcards: LayersIcon,
  simulado: ListChecksIcon,
}
