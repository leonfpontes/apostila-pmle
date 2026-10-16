#!/usr/bin/env node
// Converte o conteúdo de content/ nos JSON que o site lê em public/data/.
// Uso: npm run data (o dev e o build já chamam este script).
//
// Etapas: registrar links → trilha e exame → banco de questões → módulos com
// material (hub, aulas, seções) → materiais da turma → site.json e índice.
// Cada formato de nota tem o próprio leitor em scripts/lib/parsers/.

import path from 'node:path';
import { arquivos, docIds, hashDe, rotas, TIPOS_MATERIAL } from '../shared/contrato.js';
import { CONTENT, exists, listDir, loadModulosConfig, OUT, readJSON, resetDir, writeData } from './lib/fs.mjs';
import { ResolvedorDeLinks } from './lib/links.mjs';
import { IndiceDeBusca, Nota, Publicador } from './lib/publicador.mjs';
import { lerSecaoDoExame } from './lib/parsers/banco.mjs';
import { lerFlashcards } from './lib/parsers/flashcards.mjs';
import { idDaAula, lerSecoesDoHub, PADRAO_AULA, separarFichaDaAula } from './lib/parsers/modulo.mjs';
import { lerSimulado } from './lib/parsers/simulado.mjs';
import { lerTrilha, trilhaSemRoteiro } from './lib/parsers/trilha.mjs';
import { termosDaTrilha, termosDoModulo } from './lib/termos.mjs';

const ROTULO_MATERIAL = { revisao: 'Revisão', glossario: 'Glossário', flashcards: 'Flashcards', simulado: 'Simulado' };
const SECOES_DO_EXAME = [1, 2, 3, 4, 5, 6];
const NOTAS_FIXAS = {
  'trilha-pmle': { rel: 'trilha/trilha.md', rota: rotas.trilha() },
  'trilha-pmle-cronograma': { rel: 'trilha/cronograma.md', rota: rotas.cronograma() },
  'pmle-guia-do-exame': { rel: 'exame/guia.md', rota: rotas.exame() },
  'pmle-banco-de-questoes': { rel: 'exame/banco.md', rota: rotas.questoes() },
  ...Object.fromEntries(SECOES_DO_EXAME.map((s) => [`pmle-questoes-secao-${s}`, { rel: `exame/secao-${s}.md`, rota: rotas.questoes({ secao: s }) }])),
};

resetDir(OUT);
const modulosCfg = loadModulosConfig();
const links = new ResolvedorDeLinks();
const indice = new IndiceDeBusca();
const publicador = new Publicador(links, indice);
const limpar = (corpo) => publicador.limpar(corpo);

// 1) Links: cada nota do vault aponta para a página que a publica ------------
const nomeNoVault = (padrao) => path.basename(padrao, '.md');
const tituloDe = (rel) => (Nota.abrir(rel)?.titulo || '').replace(/^Google AI\/ML — /, '').replace(/^Curso — /, '');

for (const [nome, { rel, rota }] of Object.entries(NOTAS_FIXAS)) links.registrar(nome, hashDe(rota), tituloDe(rel));
for (const m of modulosCfg) {
  const rel = (...p) => path.relative(CONTENT, path.join(m.dir, ...p));
  const v = m.vault || {};
  if (v.hub) links.registrar(nomeNoVault(v.hub), hashDe(rotas.modulo(m.n)), tituloDe(rel('modulo.md')));
  if (v.armadilhas) links.registrar(nomeNoVault(v.armadilhas), hashDe(rotas.armadilhas(m.n)), tituloDe(rel('armadilhas.md')));
  if (v.secoes)
    for (let s = 1; s <= 9; s++)
      for (const tipo of TIPOS_MATERIAL) {
        const nome = nomeNoVault(v.secoes.replace('{n}', s).replace('{tipo}', tipo));
        links.registrar(nome, hashDe(rotas.material(m.n, s, tipo)), termosDoModulo(tituloDe(rel('secoes', `secao-${s}`, `${tipo}.md`))));
      }
  for (const arq of listDir(path.join(m.dir, 'aulas'))) {
    const a = idDaAula(arq);
    if (!a) continue;
    const transcricao = arq.startsWith('T - ');
    links.registrar(arq.replace(/\.md$/, ''), hashDe(transcricao ? rotas.transcricao(m.n, a.id) : rotas.aula(m.n, a.id)), tituloDe(rel('aulas', arq)));
  }
}

// 2) Trilha, cronograma e exame ---------------------------------------------
const trilha = Nota.abrir('trilha/trilha.md');
const modulosDaTrilha = trilha ? lerTrilha(trilha.corpo) : [];
if (trilha) publicador.publicar({ id: docIds.trilha, titulo: trilha.titulo, rota: hashDe(rotas.trilha()), tipo: 'Trilha', md: limpar(trilhaSemRoteiro(trilha.corpo)) });
for (const [id, rel, rota, tipo] of [
  [docIds.cronograma, 'trilha/cronograma.md', rotas.cronograma(), 'Trilha'],
  [docIds.exameGuia, 'exame/guia.md', rotas.exame(), 'Exame'],
  [docIds.exameBanco, 'exame/banco.md', rotas.questoesSobre(), 'Exame'],
]) {
  const nota = Nota.abrir(rel);
  if (nota) publicador.publicar({ id, titulo: nota.titulo, rota: hashDe(rota), tipo, md: limpar(nota.corpo), resumo: nota.resumo });
}

// 3) Banco de questões do exame ---------------------------------------------
const banco = { secoes: [], questoes: [] };
for (const s of SECOES_DO_EXAME) {
  const nota = Nota.abrir(`exame/secao-${s}.md`);
  if (!nota) continue;
  const { secao, questoes } = lerSecaoDoExame(nota.corpo, s, links, termosDaTrilha);
  banco.secoes.push(secao);
  banco.questoes.push(...questoes);
  for (const q of questoes)
    indice.adicionar({ rota: hashDe(rotas.questoes({ q: q.id })), titulo: `Questão ${q.id} (guia ${q.sub})`, tipo: 'Questão do exame', texto: `${q.enunciado} ${q.explicacao} ${q.conceitos}` });
}
writeData(arquivos.questoes, banco);

// 4) Módulos da trilha (com e sem material) ---------------------------------
const stats = { aulas: 0, flashcards: 0, simulado: 0, questoes: banco.questoes.length, modulosComMaterial: 0 };

function publicarModuloComMaterial(cfg, base) {
  const rel = (...p) => path.relative(CONTENT, path.join(cfg.dir, ...p));
  const n = cfg.n;
  const modulo = { ...base, material: true, nomeCurto: cfg.nomeCurto || base.titulo };

  const hub = Nota.abrir(rel('modulo.md'));
  const secoes = new Map((hub ? lerSecoesDoHub(hub.corpo, links) : []).map((s) => [s.n, { ...s, nota: termosDoModulo(s.nota) }]));
  const secao = (s) => {
    if (!secoes.has(s)) secoes.set(s, { n: s, titulo: `Seção ${s}`, nota: '', itens: [], aulas: [], materiais: [] });
    return secoes.get(s);
  };
  if (hub) publicador.publicar({ id: docIds.modulo(n), titulo: hub.titulo, rota: hashDe(rotas.modulo(n)), tipo: 'Módulo', md: limpar(hub.corpo), resumo: hub.resumo });

  const armadilhas = Nota.abrir(rel('armadilhas.md'));
  if (armadilhas) publicador.publicar({ id: docIds.armadilhas(n), titulo: armadilhas.titulo, rota: hashDe(rotas.armadilhas(n)), tipo: 'Revisão', md: limpar(armadilhas.corpo), resumo: armadilhas.resumo });
  modulo.armadilhas = !!armadilhas;

  // Aulas
  modulo.aulas = [];
  for (const arq of listDir(path.join(cfg.dir, 'aulas')).filter((a) => PADRAO_AULA.test(a))) {
    const { data, secao: s, id } = idDaAula(arq);
    const nota = Nota.abrir(rel('aulas', arq));
    const titulo = nota.titulo.replace(/^(Módulo \d+,\s*)?Aula\s+[\d.]+\s*[—-]\s*/, '');
    const { ficha, md } = separarFichaDaAula(limpar(nota.corpo));
    const temTranscricao = exists(path.join(cfg.dir, 'aulas', arq.replace(/^R - /, 'T - ')));
    modulo.aulas.push({ id, secao: s, titulo, data, resumo: termosDoModulo(nota.resumo), transcricao: temTranscricao, tema: ficha.tema || '', duracao: ficha.duracao || '' });
    publicador.publicar({ id: docIds.aula(n, id), titulo: `Aula ${id} — ${titulo}`, rota: hashDe(rotas.aula(n, id)), tipo: 'Aula', md, resumo: nota.resumo });
    if (temTranscricao) {
      const t = Nota.abrir(rel('aulas', arq.replace(/^R - /, 'T - ')));
      publicador.publicar({ id: docIds.transcricao(n, id), titulo: `Aula ${id} — ${titulo} · transcrição`, rota: hashDe(rotas.transcricao(n, id)), tipo: 'Transcrição', md: limpar(t.corpo), indexar: false });
    }
    secao(s).aulas.push(id);
  }
  modulo.aulas.sort((a, b) => a.secao - b.secao || +a.id.split('.')[1] - +b.id.split('.')[1]);
  stats.aulas += modulo.aulas.length;

  // Materiais de cada seção
  for (const pasta of listDir(path.join(cfg.dir, 'secoes'))) {
    const s = +pasta.replace('secao-', '');
    for (const tipo of TIPOS_MATERIAL) {
      const nota = Nota.abrir(rel('secoes', pasta, `${tipo}.md`));
      if (!nota) continue;
      const rota = hashDe(rotas.material(n, s, tipo));
      const titulo = termosDoModulo(nota.titulo).replace(/^Google AI\/ML — /, '');
      if (tipo === 'flashcards') {
        const blocos = JSON.parse(termosDoModulo(JSON.stringify(lerFlashcards(nota.corpo, links))));
        const total = blocos.reduce((soma, b) => soma + b.cards.length, 0);
        stats.flashcards += total;
        writeData(arquivos.flashcards(n, s), { titulo, blocos });
        secao(s).materiais.push({ tipo, total });
        for (const b of blocos) indice.adicionar({ rota, titulo, secao: b.titulo, tipo: 'Flashcards', texto: b.cards.map((c) => `${c.q} — ${c.a}`).join(' · ') });
      } else if (tipo === 'simulado') {
        const sim = JSON.parse(termosDoModulo(JSON.stringify(lerSimulado(nota.corpo, links, limpar))));
        const semGabarito = sim.questoes.filter((q) => q.opcoes.length && !q.resposta).map((q) => q.n);
        if (semGabarito.length) console.warn(`  ! seção ${s}: questões sem gabarito: ${semGabarito.join(', ')}`);
        stats.simulado += sim.questoes.length;
        writeData(arquivos.simulado(n, s), { titulo, ...sim });
        secao(s).materiais.push({ tipo, total: sim.questoes.length });
        indice.adicionar({ rota, titulo, tipo: 'Simulado', texto: sim.questoes.map((q) => q.enunciado).join(' · ') });
      } else {
        publicador.publicar({ id: docIds.material(n, s, tipo), titulo: nota.titulo, rota, tipo: ROTULO_MATERIAL[tipo], md: limpar(nota.corpo), resumo: nota.resumo });
        secao(s).materiais.push({ tipo });
      }
    }
    secao(s).materiais.sort((a, b) => TIPOS_MATERIAL.indexOf(a.tipo) - TIPOS_MATERIAL.indexOf(b.tipo));
  }

  modulo.secoes = [...secoes.values()].sort((a, b) => a.n - b.n);
  return modulo;
}

const modulos = modulosDaTrilha.map((t) => {
  writeData(arquivos.roteiro(t.n), { md: termosDaTrilha(limpar(t.roteiro)) });
  const base = { n: t.n, titulo: t.titulo, duracao: t.duracao, nomeCurto: t.titulo, material: false, questoes: banco.questoes.filter((q) => q.modulo === t.n).length };
  const cfg = modulosCfg.find((c) => c.n === t.n);
  if (!cfg) return base;
  stats.modulosComMaterial++;
  return publicarModuloComMaterial(cfg, base);
});

// 5) Materiais da turma e meta de acerto ------------------------------------
const caminhoMateriais = path.join(CONTENT, 'trilha', 'materiais.json');
const { _leia, ...materiais } = exists(caminhoMateriais) ? readJSON(caminhoMateriais) : { grupos: [] };
writeData(arquivos.materiais, materiais);
for (const g of materiais.grupos)
  for (const it of g.itens) indice.adicionar({ rota: hashDe(rotas.materiais()), titulo: 'Materiais da turma', secao: it.titulo, tipo: 'Material', texto: `${it.categoria}. ${it.descricao} ${(it.capitulos || []).join(', ')}` });

// 6) Site e índice de busca -------------------------------------------------
writeData(arquivos.site, { geradoEm: new Date().toISOString(), metaExame: materiais.metaExame || 85, stats, modulos, secoesExame: banco.secoes, docs: publicador.docs });
writeData(arquivos.busca, indice.entradas);

console.log(`✓ dados gerados em ${path.relative(process.cwd(), OUT) || OUT}`);
console.log(
  `  ${modulos.length} módulos (${stats.modulosComMaterial} com material) · ${stats.aulas} aulas · ${stats.flashcards} flashcards · ${stats.simulado} questões de simulado · ${stats.questoes} questões do exame · ${publicador.docs.length} páginas · ${indice.entradas.length} trechos na busca`
);
