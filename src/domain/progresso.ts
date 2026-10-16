import { useSyncExternalStore } from "react"

// Progresso de estudo. O site não tem login: tudo fica no localStorage do
// navegador, e o aluno leva o progresso para outro dispositivo exportando um
// arquivo. Toda leitura e escrita passa por esta classe.

export type Resultado = { ok: boolean; t: number; sel?: string[] }

export type DadosDeProgresso = {
  /** flashcards: chave de ProgressStore.chaves.cartao */
  fc: Record<string, Resultado>
  /** simulados: chave de ProgressStore.chaves.secao */
  sim: Record<string, { best: number; last: number; t: number }>
  /** banco do exame: id da questão ("Q63") */
  q: Record<string, Resultado>
  /** módulos da trilha marcados como concluídos: número do módulo */
  modulos: Record<string, number>
  /** aulas marcadas como estudadas: chave de ProgressStore.chaves.aula */
  aulas: Record<string, number>
  /** revisão ou glossário da seção já abertos: chave de ProgressStore.chaves.secao */
  vistos: Record<string, number>
  nome?: string
  ultima?: { rota: string; titulo: string }
}

const vazio = (): DadosDeProgresso => ({ fc: {}, sim: {}, q: {}, modulos: {}, aulas: {}, vistos: {} })

type Armazenamento = Pick<Storage, "getItem" | "setItem">

export class ProgressStore {
  static readonly CHAVE = "pmle:v2"

  /** Formato das chaves de cada registro (um só lugar para não divergir). */
  static readonly chaves = {
    secao: (modulo: number, secao: number) => `m${modulo}-s${secao}`,
    cartao: (modulo: number, secao: number, bloco: number, indice: number) => `m${modulo}-s${secao}:${bloco}:${indice}`,
    prefixoDeCartoes: (modulo: number, secao: number) => `m${modulo}-s${secao}:`,
    aula: (modulo: number, aula: string) => `m${modulo}-${aula}`,
  }

  readonly #armazenamento: Armazenamento | null
  #dados: DadosDeProgresso
  #ouvintes = new Set<() => void>()

  constructor(armazenamento: Armazenamento | null) {
    this.#armazenamento = armazenamento
    this.#dados = this.#ler()
  }

  get dados(): DadosDeProgresso {
    return this.#dados
  }

  assinar = (ouvinte: () => void) => {
    this.#ouvintes.add(ouvinte)
    return () => this.#ouvintes.delete(ouvinte)
  }

  // --- registros --------------------------------------------------------

  marcarAula(modulo: number, aula: string, estudada: boolean) {
    this.#alterar((d) => alternar(d.aulas, ProgressStore.chaves.aula(modulo, aula), estudada))
  }

  marcarModulo(modulo: number, concluido: boolean) {
    this.#alterar((d) => alternar(d.modulos, String(modulo), concluido))
  }

  marcarRevisaoVista(modulo: number, secao: number) {
    const chave = ProgressStore.chaves.secao(modulo, secao)
    if (!this.#dados.vistos[chave]) this.#alterar((d) => void (d.vistos[chave] = Date.now()))
  }

  registrarCartao(chave: string, ok: boolean) {
    this.#alterar((d) => void (d.fc[chave] = { ok, t: Date.now() }))
  }

  limparCartoes(chaves: string[]) {
    this.#alterar((d) => chaves.forEach((c) => delete d.fc[c]))
  }

  registrarSimulado(modulo: number, secao: number, nota: number) {
    const chave = ProgressStore.chaves.secao(modulo, secao)
    this.#alterar((d) => {
      d.sim[chave] = { best: Math.max(nota, d.sim[chave]?.best || 0), last: nota, t: Date.now() }
    })
  }

  registrarQuestao(id: string, ok: boolean, sel: string[]) {
    this.#alterar((d) => void (d.q[id] = { ok, sel, t: Date.now() }))
  }

  definirNome(nome: string) {
    this.#alterar((d) => void (d.nome = nome.trim() || undefined))
  }

  lembrarUltimaPagina(rota: string, titulo: string) {
    this.#alterar((d) => void (d.ultima = { rota, titulo }))
  }

  // --- consultas --------------------------------------------------------

  /** Cartões de uma seção marcados como "acertei" (função pura sobre os dados). */
  static cartoesDominados(d: DadosDeProgresso, modulo: number, secao: number) {
    const prefixo = ProgressStore.chaves.prefixoDeCartoes(modulo, secao)
    return Object.entries(d.fc).filter(([k, v]) => k.startsWith(prefixo) && v.ok).length
  }

  /** true quando o aluno já registrou qualquer atividade. */
  static comecou(d: DadosDeProgresso) {
    return Object.keys(d.aulas).length + Object.keys(d.fc).length + Object.keys(d.sim).length + Object.keys(d.q).length > 0
  }

  /** Acertos no banco do exame. */
  static desempenhoNoExame(d: DadosDeProgresso, ids?: Set<string>) {
    const respostas = Object.entries(d.q).filter(([id]) => !ids || ids.has(id))
    return { respondidas: respostas.length, acertos: respostas.filter(([, r]) => r.ok).length }
  }

  // --- exportar / importar / apagar ---------------------------------------

  exportar() {
    const arquivo = { app: "apostila-pmle", versao: 2, exportadoEm: new Date().toISOString(), progresso: this.#dados }
    const url = URL.createObjectURL(new Blob([JSON.stringify(arquivo, null, 2)], { type: "application/json" }))
    const a = Object.assign(document.createElement("a"), { href: url, download: `progresso-apostila-pmle-${new Date().toISOString().slice(0, 10)}.json` })
    a.click()
    URL.revokeObjectURL(url)
  }

  async importar(arquivo: File) {
    const conteudo = JSON.parse(await arquivo.text())
    if (conteudo?.app !== "apostila-pmle" || typeof conteudo.progresso !== "object") throw new Error("Este arquivo não é um progresso exportado da apostila.")
    this.#alterar((d) => Object.assign(d, vazio(), conteudo.progresso))
  }

  apagar() {
    this.#alterar((d) => {
      const nome = d.nome
      Object.keys(d).forEach((k) => delete (d as Record<string, unknown>)[k])
      Object.assign(d, vazio(), { nome })
    })
  }

  // --- interno ----------------------------------------------------------

  #ler(): DadosDeProgresso {
    try {
      const bruto = this.#armazenamento?.getItem(ProgressStore.CHAVE)
      return { ...vazio(), ...(bruto ? JSON.parse(bruto) : {}) }
    } catch {
      return vazio()
    }
  }

  /** Copia, altera, persiste e avisa os componentes (dados imutáveis para o React). */
  #alterar(fn: (d: DadosDeProgresso) => void) {
    const proximo = structuredClone(this.#dados)
    fn(proximo)
    this.#dados = proximo
    try {
      this.#armazenamento?.setItem(ProgressStore.CHAVE, JSON.stringify(proximo))
    } catch {
      /* modo privado ou cota cheia: segue só em memória */
    }
    this.#ouvintes.forEach((o) => o())
  }
}

function alternar(registro: Record<string, number>, chave: string, ligado: boolean) {
  if (ligado) registro[chave] = Date.now()
  else delete registro[chave]
}

function armazenamentoDoNavegador(): Armazenamento | null {
  try {
    return window.localStorage
  } catch {
    return null
  }
}

/** Instância única usada pelo site. */
export const progresso = new ProgressStore(armazenamentoDoNavegador())

/** Dados de progresso reativos: o componente re-renderiza quando algo muda. */
export function useProgresso() {
  return useSyncExternalStore(progresso.assinar, () => progresso.dados)
}
