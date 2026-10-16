// Etapas da jornada de uma seção. Cada etapa sabe dizer quanto já foi feito,
// quando conta como concluída e para onde levar o aluno.
//
// Para criar uma etapa nova: estenda Etapa, implemente os membros abstratos e
// registre a fábrica em FABRICAS_DE_ETAPAS (jornada.ts). Nada mais muda.

import { rotas } from "../../../shared/contrato"
import type { DadosDeProgresso } from "../progresso"
import { ProgressStore } from "../progresso"
import type { ModuloComMaterial, Secao } from "../tipos"

export const META_FLASHCARDS = 0.8 // fração de cartões dominados
export const META_SIMULADO = 80 // nota mínima (%) no simulado

export type IdDaEtapa = "aulas" | "revisao" | "flashcards" | "simulado"

/** O que toda etapa precisa saber: o módulo, a seção e o progresso atual. */
export type ContextoDaSecao = { modulo: ModuloComMaterial; secao: Secao; progresso: DadosDeProgresso }

export abstract class Etapa {
  abstract readonly id: IdDaEtapa
  abstract readonly titulo: string
  abstract readonly descricao: string
  protected readonly ctx: ContextoDaSecao

  constructor(ctx: ContextoDaSecao) {
    this.ctx = ctx
  }

  /** Quanto já foi feito, na unidade de `total`. */
  abstract get feito(): number
  abstract get total(): number
  /** Rota para onde o botão "continuar" leva nesta etapa. */
  abstract get destino(): string
  /** Frase curta de status ("3 de 6 aulas"). */
  abstract get detalhe(): string

  get concluida(): boolean {
    return this.total > 0 && this.feito >= this.total
  }

  get percentual(): number {
    return this.total ? Math.min(100, Math.round((this.feito / this.total) * 100)) : 0
  }

  protected get n() {
    return this.ctx.modulo.n
  }

  protected get s() {
    return this.ctx.secao.n
  }

  protected material(tipo: string) {
    return this.ctx.secao.materiais.find((m) => m.tipo === tipo)
  }
}

export class EtapaAulas extends Etapa {
  readonly id = "aulas"
  readonly titulo = "Estudar as aulas"
  readonly descricao = "Leia o resumo de cada aula e marque como estudada."

  get feito() {
    return this.ctx.secao.aulas.filter((id) => this.ctx.progresso.aulas[ProgressStore.chaves.aula(this.n, id)]).length
  }

  get total() {
    return this.ctx.secao.aulas.length
  }

  /** A primeira aula ainda não estudada (ou nenhuma). */
  get proximaAula() {
    return this.ctx.secao.aulas.find((id) => !this.ctx.progresso.aulas[ProgressStore.chaves.aula(this.n, id)])
  }

  get destino() {
    return this.proximaAula ? rotas.aula(this.n, this.proximaAula) : rotas.secao(this.n, this.s)
  }

  get detalhe() {
    return `${this.feito} de ${this.total} aulas`
  }
}

export class EtapaRevisao extends Etapa {
  readonly id = "revisao"
  readonly titulo: string
  readonly descricao: string
  private readonly tipo: "revisao" | "glossario"

  constructor(ctx: ContextoDaSecao) {
    super(ctx)
    this.tipo = this.material("revisao") ? "revisao" : "glossario"
    this.titulo = this.tipo === "revisao" ? "Revisar a seção" : "Ler o glossário"
    this.descricao = this.tipo === "revisao" ? "Roteiro de revisão, armadilhas e glossário com os termos da seção." : "Os termos e serviços da seção, com filtro."
  }

  static aplicavel(ctx: ContextoDaSecao) {
    return ctx.secao.materiais.some((m) => m.tipo === "revisao" || m.tipo === "glossario")
  }

  get feito() {
    return this.ctx.progresso.vistos[ProgressStore.chaves.secao(this.n, this.s)] ? 1 : 0
  }

  get total() {
    return 1
  }

  get destino() {
    return rotas.material(this.n, this.s, this.tipo)
  }

  get detalhe() {
    return this.concluida ? "Revisado" : "Ainda não revisado"
  }
}

export class EtapaFlashcards extends Etapa {
  readonly id = "flashcards"
  readonly titulo = "Fixar com flashcards"
  readonly descricao = `Domine pelo menos ${Math.round(META_FLASHCARDS * 100)}% dos cartões.`

  static aplicavel(ctx: ContextoDaSecao) {
    return ctx.secao.materiais.some((m) => m.tipo === "flashcards")
  }

  get feito() {
    return ProgressStore.cartoesDominados(this.ctx.progresso, this.n, this.s)
  }

  get total() {
    return this.material("flashcards")?.total || 0
  }

  override get concluida() {
    return this.total > 0 && this.feito / this.total >= META_FLASHCARDS
  }

  get destino() {
    return rotas.material(this.n, this.s, "flashcards")
  }

  get detalhe() {
    return `${this.feito} de ${this.total} dominados`
  }
}

export class EtapaSimulado extends Etapa {
  readonly id = "simulado"
  readonly titulo = "Testar no simulado"
  readonly descricao: string

  constructor(ctx: ContextoDaSecao) {
    super(ctx)
    this.descricao = `Faça as ${this.material("simulado")?.total ?? ""} questões e chegue a ${META_SIMULADO}%.`
  }

  static aplicavel(ctx: ContextoDaSecao) {
    return ctx.secao.materiais.some((m) => m.tipo === "simulado")
  }

  private get resultado() {
    return this.ctx.progresso.sim[ProgressStore.chaves.secao(this.n, this.s)]
  }

  /** Melhor nota, em %. */
  get feito() {
    return this.resultado?.best || 0
  }

  get total() {
    return 100
  }

  override get concluida() {
    return this.feito >= META_SIMULADO
  }

  get destino() {
    return rotas.material(this.n, this.s, "simulado")
  }

  get detalhe() {
    return this.resultado ? `Melhor nota ${this.resultado.best}%` : "Ainda não feito"
  }
}
