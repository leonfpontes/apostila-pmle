// Jornada do aluno: o status de cada seção e o próximo passo recomendado.

import { rotas } from "../../../shared/contrato"
import { ProgressStore, type DadosDeProgresso } from "../progresso"
import { temMaterial, type ModuloComMaterial, type Secao, type Site } from "../tipos"
import { EtapaAulas, EtapaFlashcards, EtapaRevisao, EtapaSimulado, type ContextoDaSecao, type Etapa } from "./etapas"

type FabricaDeEtapa = (ctx: ContextoDaSecao) => Etapa | null

/** Ordem das etapas de uma seção. Uma etapa nova entra aqui (aberto para extensão). */
export const FABRICAS_DE_ETAPAS: FabricaDeEtapa[] = [
  (ctx) => new EtapaAulas(ctx),
  (ctx) => (EtapaRevisao.aplicavel(ctx) ? new EtapaRevisao(ctx) : null),
  (ctx) => (EtapaFlashcards.aplicavel(ctx) ? new EtapaFlashcards(ctx) : null),
  (ctx) => (EtapaSimulado.aplicavel(ctx) ? new EtapaSimulado(ctx) : null),
]

export class JornadaDaSecao {
  readonly etapas: Etapa[]
  readonly modulo: ModuloComMaterial
  readonly secao: Secao

  constructor(modulo: ModuloComMaterial, secao: Secao, progresso: DadosDeProgresso) {
    this.modulo = modulo
    this.secao = secao
    const ctx = { modulo, secao, progresso }
    this.etapas = FABRICAS_DE_ETAPAS.map((criar) => criar(ctx)).filter((e): e is Etapa => e !== null)
  }

  get proxima(): Etapa | undefined {
    return this.etapas.find((e) => !e.concluida)
  }

  get concluida() {
    return this.etapas.length > 0 && this.etapas.every((e) => e.concluida)
  }

  get percentual() {
    return this.etapas.length ? Math.round((this.etapas.filter((e) => e.concluida).length / this.etapas.length) * 100) : 0
  }

  etapa<T extends Etapa>(id: Etapa["id"]) {
    return this.etapas.find((e) => e.id === id) as T | undefined
  }

  /** Rótulo da ação do botão para a próxima etapa. */
  static chamada(e: Etapa) {
    return { aulas: "Estudar a aula", revisao: "Revisar", flashcards: "Treinar flashcards", simulado: "Fazer o simulado" }[e.id]
  }
}

/** Jornadas de todas as seções com aulas, na ordem da trilha. */
export function jornadas(site: Site, progresso: DadosDeProgresso): JornadaDaSecao[] {
  return site.modulos.filter(temMaterial).flatMap((m) => m.secoes.filter((s) => s.aulas.length).map((s) => new JornadaDaSecao(m, s, progresso)))
}

export type ProximoPasso = { titulo: string; contexto: string; destino: string; chamada: string }

export function proximoPasso(site: Site, progresso: DadosDeProgresso): ProximoPasso {
  const todas = jornadas(site, progresso)
  const atual = todas.find((j) => !j.concluida)
  if (!atual?.proxima) {
    const m = site.modulos.find(temMaterial)!
    return {
      titulo: "Revisão final e questões do exame",
      contexto: `Você completou todas as seções do módulo ${m.n}. Feche com as armadilhas e pratique o banco do exame.`,
      destino: rotas.questoes(),
      chamada: "Praticar questões do exame",
    }
  }
  const e = atual.proxima
  const aula = e instanceof EtapaAulas && e.proximaAula ? atual.modulo.aulas.find((a) => a.id === e.proximaAula) : undefined
  return {
    titulo: aula ? `Aula ${aula.id}: ${aula.titulo}` : e.titulo,
    contexto: `Módulo ${atual.modulo.n} · Seção ${atual.secao.n}: ${atual.secao.titulo} · ${e.detalhe}`,
    destino: e.destino,
    chamada: JornadaDaSecao.chamada(e),
  }
}

/** Para onde ir depois de concluir uma aula (próxima aula da seção, próxima etapa ou próxima seção). */
export function depoisDaAula(modulo: ModuloComMaterial, aulaId: string, progresso: DadosDeProgresso) {
  const aula = modulo.aulas.find((a) => a.id === aulaId)!
  const secao = modulo.secoes.find((s) => s.n === aula.secao)!
  const seguinte = secao.aulas[secao.aulas.indexOf(aulaId) + 1]
  if (seguinte) {
    const a = modulo.aulas.find((x) => x.id === seguinte)!
    return { destino: rotas.aula(modulo.n, a.id), texto: `Próxima aula: ${a.id} ${a.titulo}`, chamada: "Concluir e ir para a próxima aula" }
  }
  const comEstaAula = { ...progresso, aulas: { ...progresso.aulas, [ProgressStore.chaves.aula(modulo.n, aulaId)]: Date.now() } }
  const j = new JornadaDaSecao(modulo, secao, comEstaAula)
  if (j.proxima instanceof EtapaAulas && j.proxima.proximaAula) {
    const pendente = j.proxima.proximaAula
    return { destino: j.proxima.destino, texto: `Última aula da seção. Ainda falta estudar a aula ${pendente}.`, chamada: `Concluir e ir para a aula ${pendente}` }
  }
  if (j.proxima) {
    const passo = j.proxima.titulo.toLowerCase()
    return { destino: j.proxima.destino, texto: `Última aula da seção. Próximo passo: ${passo}.`, chamada: `Concluir e ${passo}` }
  }
  const proximaSecao = modulo.secoes.find((s) => s.n > secao.n && s.aulas.length)
  if (proximaSecao) return { destino: rotas.secao(modulo.n, proximaSecao.n), texto: `Fim da seção ${secao.n}. Próxima: seção ${proximaSecao.n}.`, chamada: "Concluir e ir para a próxima seção" }
  return { destino: rotas.progresso(), texto: "Última aula do módulo.", chamada: "Concluir e ver meu progresso" }
}
