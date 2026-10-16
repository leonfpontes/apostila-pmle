// Contrato único entre o build (scripts/) e o site (src/).
// Rotas da aplicação, nomes dos arquivos de dados e ids dos documentos ficam
// definidos só aqui. Os dois lados importam este arquivo; nunca escreva essas
// strings à mão em outro lugar.
//
// Vocabulário: a trilha tem MÓDULOS (os 15 itens do Learning Path). Um módulo
// com material tem SEÇÕES, e cada seção tem AULAS e MATERIAIS.

/** Rotas da aplicação (sem o "#": o site usa HashRouter). */
export const rotas = {
  inicio: () => "/",
  comece: () => "/comece",
  progresso: () => "/progresso",
  trilha: () => "/trilha",
  cronograma: () => "/cronograma",
  materiais: () => "/materiais",
  exame: () => "/exame",
  flashcards: () => "/flashcards",
  simulados: () => "/simulados",
  busca: (q = "") => (q ? `/busca?q=${encodeURIComponent(q)}` : "/busca"),
  questoes: (filtros = {}) => {
    const qs = new URLSearchParams(Object.entries(filtros).filter(([, v]) => v !== undefined && v !== "")).toString()
    return qs ? `/questoes?${qs}` : "/questoes"
  },
  questoesSobre: () => "/questoes/sobre",
  modulo: (n) => `/modulo/${n}`,
  armadilhas: (n) => `/modulo/${n}/armadilhas`,
  secao: (n, s) => `/modulo/${n}/secao/${s}`,
  material: (n, s, tipo) => `/modulo/${n}/secao/${s}/${tipo}`,
  aula: (n, id) => `/modulo/${n}/aula/${id}`,
  transcricao: (n, id) => `/modulo/${n}/aula/${id}/transcricao`,
}

/** Mesma rota, no formato de link usado dentro do Markdown ("#/…"). */
export const hashDe = (rota) => `#${rota}`

/** Ids dos documentos Markdown gerados (public/data/docs/<id>.json). */
export const docIds = {
  trilha: "trilha",
  cronograma: "cronograma",
  exameGuia: "exame-guia",
  exameBanco: "exame-banco",
  modulo: (n) => `m${n}-modulo`,
  armadilhas: (n) => `m${n}-armadilhas`,
  aula: (n, id) => `m${n}-aula-${id}`,
  transcricao: (n, id) => `m${n}-transcricao-${id}`,
  material: (n, s, tipo) => `m${n}-s${s}-${tipo}`,
}

/** Caminhos dos arquivos de dados, relativos a public/data/. */
export const arquivos = {
  site: "site.json",
  busca: "search.json",
  questoes: "questoes.json",
  materiais: "materiais.json",
  doc: (id) => `docs/${id}.json`,
  roteiro: (n) => `roteiros/${n}.json`,
  flashcards: (n, s) => `flashcards/m${n}-s${s}.json`,
  simulado: (n, s) => `simulados/m${n}-s${s}.json`,
}

/** Tipos de material de uma seção, na ordem em que aparecem nas abas. */
export const TIPOS_MATERIAL = ["revisao", "glossario", "flashcards", "simulado"]
