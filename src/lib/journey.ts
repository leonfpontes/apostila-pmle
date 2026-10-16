// Jornada de estudo: o que o aluno já fez em cada seção e qual é o próximo passo.
// Tudo é calculado a partir dos dados do site + progresso salvo no navegador.

import type { Curso, Modulo, Site } from "./data"
import type { Progresso } from "./progress"

export const META_FLASHCARDS = 0.8 // fração de cartões dominados para considerar a etapa feita
export const META_SIMULADO = 80 // nota mínima (%) no simulado

export type EtapaId = "aulas" | "revisao" | "flashcards" | "simulado"
export type Etapa = {
  id: EtapaId
  titulo: string
  descricao: string
  to: string
  feito: number
  total: number
  done: boolean
  detalhe: string
}

export type ModuloStatus = {
  curso: Curso
  modulo: Modulo
  etapas: Etapa[]
  pct: number
  done: boolean
  proxima?: Etapa
}

export function moduloStatus(c: Curso, m: Modulo, p: Progresso): ModuloStatus {
  const base = `/curso/${c.n}/modulo/${m.n}`
  const etapas: Etapa[] = []

  const estudadas = m.aulas.filter((id) => p.aulas[`c${c.n}-${id}`]).length
  const proximaAula = m.aulas.find((id) => !p.aulas[`c${c.n}-${id}`])
  etapas.push({
    id: "aulas",
    titulo: "Estudar as aulas",
    descricao: "Leia o resumo de cada aula e marque como estudada.",
    to: proximaAula ? `/curso/${c.n}/aula/${proximaAula}` : base,
    feito: estudadas,
    total: m.aulas.length,
    done: m.aulas.length > 0 && estudadas === m.aulas.length,
    detalhe: `${estudadas} de ${m.aulas.length} aulas`,
  })

  const temRevisao = m.materiais.some((x) => x.tipo === "revisao")
  const temGlossario = m.materiais.some((x) => x.tipo === "glossario")
  if (temRevisao || temGlossario) {
    const visto = !!p.vistos?.[`c${c.n}-m${m.n}`]
    etapas.push({
      id: "revisao",
      titulo: temRevisao ? "Revisar a seção" : "Ler o glossário",
      descricao: temRevisao ? "Roteiro de revisão, armadilhas e glossário com os termos da seção." : "Os termos e serviços da seção, com filtro.",
      to: `${base}/${temRevisao ? "revisao" : "glossario"}`,
      feito: visto ? 1 : 0,
      total: 1,
      done: visto,
      detalhe: visto ? "Revisado" : "Ainda não revisado",
    })
  }

  const fc = m.materiais.find((x) => x.tipo === "flashcards")
  if (fc) {
    const total = fc.total || 0
    const pref = `c${c.n}-m${m.n}:`
    const ok = Object.entries(p.fc).filter(([k, v]) => k.startsWith(pref) && v.ok).length
    etapas.push({
      id: "flashcards",
      titulo: "Fixar com flashcards",
      descricao: `Domine pelo menos ${Math.round(META_FLASHCARDS * 100)}% dos cartões.`,
      to: `${base}/flashcards`,
      feito: ok,
      total,
      done: total > 0 && ok / total >= META_FLASHCARDS,
      detalhe: `${ok} de ${total} dominados`,
    })
  }

  const sim = m.materiais.find((x) => x.tipo === "simulado")
  if (sim) {
    const r = p.sim[`c${c.n}-m${m.n}`]
    etapas.push({
      id: "simulado",
      titulo: "Testar no simulado",
      descricao: `Faça as ${sim.total} questões e chegue a ${META_SIMULADO}%.`,
      to: `${base}/simulado`,
      feito: r?.best || 0,
      total: 100,
      done: (r?.best || 0) >= META_SIMULADO,
      detalhe: r ? `Melhor nota ${r.best}%` : "Ainda não feito",
    })
  }

  const doneCount = etapas.filter((e) => e.done).length
  return {
    curso: c,
    modulo: m,
    etapas,
    pct: etapas.length ? Math.round((doneCount / etapas.length) * 100) : 0,
    done: etapas.length > 0 && doneCount === etapas.length,
    proxima: etapas.find((e) => !e.done),
  }
}

export function todosModulos(site: Site, p: Progresso) {
  return site.cursos.filter((c) => c.material).flatMap((c) => c.modulos!.filter((m) => m.aulas.length).map((m) => moduloStatus(c, m, p)))
}

export type ProximoPasso = { titulo: string; contexto: string; to: string; cta: string }

export function proximoPasso(site: Site, p: Progresso): ProximoPasso {
  const mods = todosModulos(site, p)
  const inicio = Object.keys(p.aulas).length + Object.keys(p.fc).length + Object.keys(p.sim).length === 0
  if (inicio) {
    const m = mods[0]
    return {
      titulo: "Comece pela primeira aula",
      contexto: `Módulo ${m.curso.n} · Seção ${m.modulo.n}: ${m.modulo.titulo}`,
      to: m.etapas[0].to,
      cta: "Começar a estudar",
    }
  }
  const atual = mods.find((s) => !s.done)
  if (atual?.proxima) {
    const e = atual.proxima
    let titulo = e.titulo
    if (e.id === "aulas") {
      const id = e.to.split("/").pop()
      const aula = atual.curso.aulas!.find((a) => a.id === id)
      if (aula) titulo = `Aula ${aula.id}: ${aula.titulo}`
    }
    return {
      titulo,
      contexto: `Módulo ${atual.curso.n} · Seção ${atual.modulo.n}: ${atual.modulo.titulo} · ${e.detalhe}`,
      to: e.to,
      cta: e.id === "aulas" ? "Estudar a aula" : e.id === "simulado" ? "Fazer o simulado" : e.id === "flashcards" ? "Treinar flashcards" : "Revisar",
    }
  }
  const c1 = site.cursos.find((c) => c.material)!
  return {
    titulo: "Revisão final e questões do exame",
    contexto: `Você completou todas as seções do módulo ${c1.n}. Feche com as armadilhas e pratique o banco do exame.`,
    to: "/questoes",
    cta: "Praticar questões do exame",
  }
}
