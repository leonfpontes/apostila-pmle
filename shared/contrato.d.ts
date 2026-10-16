// Tipos de shared/contrato.js para o lado TypeScript (src/).

export type TipoMaterial = "revisao" | "glossario" | "flashcards" | "simulado"
type N = number | string

export declare const rotas: {
  inicio(): string
  comece(): string
  progresso(): string
  trilha(): string
  cronograma(): string
  materiais(): string
  exame(): string
  flashcards(): string
  simulados(): string
  busca(q?: string): string
  questoes(filtros?: Record<string, string | number | undefined>): string
  questoesSobre(): string
  modulo(n: N): string
  armadilhas(n: N): string
  secao(n: N, s: N): string
  material(n: N, s: N, tipo: TipoMaterial): string
  aula(n: N, id: string): string
  transcricao(n: N, id: string): string
}

export declare function hashDe(rota: string): string

export declare const docIds: {
  trilha: string
  cronograma: string
  exameGuia: string
  exameBanco: string
  modulo(n: N): string
  armadilhas(n: N): string
  aula(n: N, id: string): string
  transcricao(n: N, id: string): string
  material(n: N, s: N, tipo: TipoMaterial): string
}

export declare const arquivos: {
  site: string
  busca: string
  questoes: string
  materiais: string
  doc(id: string): string
  roteiro(n: N): string
  flashcards(n: N, s: N): string
  simulado(n: N, s: N): string
}

export declare const TIPOS_MATERIAL: readonly TipoMaterial[]
