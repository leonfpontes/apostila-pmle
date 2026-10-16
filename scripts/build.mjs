#!/usr/bin/env node
// Lê os Markdown de content/ e gera os JSON que o site consome em public/data/.
// Uso: npm run build
// Sem dependências: o Markdown é renderizado no navegador; aqui só se limpa a
// sintaxe do Obsidian (frontmatter, [[wikilinks]], callouts) e se extraem os
// dados estruturados (flashcards, simulados, banco de questões, trilha).

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const CONTENT = path.join(ROOT, 'content');
const OUT = path.join(ROOT, 'public', 'data');

const read = (p) => fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
const exists = (p) => fs.existsSync(p);
const writeJSON = (rel, data) => {
  const p = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data));
};

// Seções que não vão para o site público: controle pessoal de progresso da
// turma e notas sobre a organização do vault.
const DROP_HEADINGS = [
  /^Onde cada um está/i,
  /^As datas do Leonardo/i,
  /^Log$/i,
  /^Como o material é registrado$/i,
  /^Dúvidas em aberto$/i,
  /^Fontes$/i, // referências internas do vault
  /^Ações \/ próximos passos$/i, // pendências pessoais de quem fez as notas
];
const DROP_PER_FILE = { 'trilha/trilha.md': [/^Fontes$/i] };

// ---------------------------------------------------------------------------
// Markdown helpers

function frontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { meta: {}, body: md };
  const meta = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([\w-]+):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].replace(/^["']|["']$/g, '').trim();
  }
  return { meta, body: md.slice(m[0].length) };
}

function dropSections(body, extra = []) {
  const rules = [...DROP_HEADINGS, ...extra];
  const lines = body.split('\n');
  const out = [];
  let dropLevel = 0;
  let inFence = false;
  for (const line of lines) {
    if (/^```/.test(line)) inFence = !inFence;
    const h = !inFence && line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      if (dropLevel && level <= dropLevel) dropLevel = 0;
      if (!dropLevel && rules.some((r) => r.test(h[2].trim()))) {
        dropLevel = level;
        continue;
      }
    }
    if (!dropLevel) out.push(line);
  }
  return out.join('\n');
}

const slugify = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[*_`~[\]()]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const LINKS = new Map(); // nome da nota no vault -> rota do site
const TITLES = new Map(); // nome da nota no vault -> título (rótulo de [[link]] sem alias)

function wikilinks(text) {
  return text.replace(/\[\[([^\]]+?)\]\]/g, (_, inner) => {
    const parts = inner.split(/\\?\|/);
    const target = parts[0].split('#')[0].trim();
    const label = (parts[1] ?? TITLES.get(target) ?? parts[0].split('#').pop()).trim();
    const route = LINKS.get(target);
    return route ? `[${label}](${route})` : label;
  });
}

const inlineBold = (s) =>
  s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>');

// Callouts do Obsidian (> [!tipo]- Título) viram <details>/<aside>.
function callouts(text) {
  const lines = text.split('\n');
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^>\s*\[!(\w+)\]([+-]?)\s*(.*)$/);
    if (!m) {
      out.push(lines[i]);
      continue;
    }
    const [, type, fold, title] = m;
    const body = [];
    while (i + 1 < lines.length && /^>/.test(lines[i + 1])) body.push(lines[++i].replace(/^>\s?/, ''));
    const t = inlineBold(title || type);
    if (fold) {
      out.push(`<details class="callout callout-${type}"${fold === '+' ? ' open' : ''}>`, `<summary>${t}</summary>`, '', ...body, '', '</details>', '');
    } else {
      out.push(`<aside class="callout callout-${type}">`, `<p class="callout-title">${t}</p>`, '', ...body, '', '</aside>', '');
    }
  }
  return out.join('\n');
}

function cleanMd(body, file = '') {
  let md = body.replace(/<!--[\s\S]*?-->/g, '');
  md = dropSections(md, DROP_PER_FILE[file] || []);
  md = md.replace(/^\s*#\s+.*\n+/, ''); // o H1 vira o título da página
  md = md.replace(/\s*\(também no projeto Claude[^)]*\)/g, '').replace(/\s*\((no |do )?projeto Claude[^)]*\)/g, '');
  // parágrafo de navegação do vault ("Material de estudo do Módulo N … Faz parte de …"): o site já tem abas
  md = md.replace(/^\s*Material de estudo do Módulo[^\n]*(\n(?!\n)[^\n]*)*\n+/, '');
  md = callouts(md);
  md = wikilinks(md);
  return md.replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

const plain = (md) =>
  md
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`#>|]/g, ' ')
    .replace(/-{3,}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

// ---------------------------------------------------------------------------
// Documentos e índice de busca

const DOCS = []; // {id, title, route, md}
const SEARCH = [];

// Nomenclatura da turma: os 15 itens da trilha são MÓDULOS; as partes do
// módulo 1 (que as notas chamam de "Módulo 2…6") são SEÇÕES.
const cap = (orig, word) => (orig[0] === orig[0].toUpperCase() ? word[0].toUpperCase() + word.slice(1) : word);
function termosTrilha(t) {
  return String(t || '')
    .replace(/\b([Cc])ursos\b/g, (m) => cap(m, 'módulos'))
    .replace(/\b([Cc])urso\b/g, (m) => cap(m, 'módulo'));
}
function termosSecao(t) {
  return String(t || '')
    .replace(/\b([Mm])ódulos (\**)(\d)/g, (m, c, b, n) => `${c === 'M' ? 'S' : 's'}eções ${b}${n}`)
    .replace(/\b([Mm])ódulo (\**)(\d)/g, (m, c, b, n) => `${c === 'M' ? 'S' : 's'}eção ${b}${n}`)
    .replace(/\b([Cc])ursos (\**)(\d)/g, (m, c, b, n) => `${c === 'C' ? 'M' : 'm'}ódulos ${b}${n}`)
    .replace(/\b([Cc])urso (\**)(\d)/g, (m, c, b, n) => `${c === 'C' ? 'M' : 'm'}ódulo ${b}${n}`)
    // concordância: "do Seção" → "da Seção", "nos Seções" → "nas Seções" …
    .replace(/\b([DdNn])o(s?) (\**)([Ss])eç/g, (m, a, pl, b, S) => `${a}a${pl} ${b}${S}eç`)
    .replace(/\b([Pp])elo(s?) (\**)([Ss])eç/g, (m, a, pl, b, S) => `${a}ela${pl} ${b}${S}eç`)
    .replace(/\bao(s?) (\**)([Ss])eç/g, (m, pl, b, S) => `à${pl} ${b}${S}eç`)
    .replace(/\b([Ee])ste (\**)([Ss])eç/g, (m, e, b, S) => `${e}sta ${b}${S}eç`)
    .replace(/\b([Oo]) (\**)([Ss])eção/g, (m, o, b, S) => `${o === "O" ? "A" : "a"} ${b}${S}eção`);
}
const termos = (route, t) => (String(route).startsWith('#/curso/') ? termosSecao(t) : termosTrilha(t));

function addDoc({ id, title, route, md, kind, summary }) {
  md = termos(route, md);
  title = termos(route, title).replace(/^Google AI\/ML — /, '');
  summary = termos(route, summary);
  DOCS.push({ id, title, route, kind });
  writeJSON(`docs/${id}.json`, { id, title, route, kind, summary: summary || '', md });
  // um registro de busca por seção (H2/H3)
  const parts = md.split(/\n(?=#{2,3}\s)/);
  for (const part of parts) {
    const h = part.match(/^#{2,3}\s+(.*)/);
    const heading = h ? h[1].replace(/[*_`]/g, '').trim() : '';
    const text = plain(h ? part.slice(h[0].length) : part);
    if (!text) continue;
    SEARCH.push({ r: route, t: title, h: heading, a: heading ? slugify(heading) : '', k: kind, x: text.slice(0, 1500) });
  }
}

function loadNote(rel) {
  const p = path.join(CONTENT, rel);
  if (!exists(p)) return null;
  const { meta, body } = frontmatter(read(p));
  const h1 = body.match(/^#\s+(.*)$/m);
  return { meta, body, title: meta.title || (h1 ? h1[1] : rel), rel };
}

// A ficha no topo de cada aula (| | | Tema / Curso / Data / Duração …) vira
// metadado; o site mostra tema e duração no cabeçalho em vez da tabela.
function extractAulaMeta(md) {
  const m = md.match(/^\|\s*\|\s*\|\n\|[-|\s]+\|\n((?:\|.*\|\n?)+)/);
  if (!m) return { meta: {}, md };
  const meta = {};
  for (const line of m[1].trim().split('\n')) {
    const [k, v] = splitRow(line);
    const key = k.replace(/\*/g, '').trim().toLowerCase();
    if (key === 'tema') meta.tema = v.replace(/\*\*/g, '');
    if (key === 'duração') meta.duracao = v.replace(/\*\*/g, '');
  }
  return { meta, md: md.slice(m[0].length).replace(/^\s+/, '') };
}

// ---------------------------------------------------------------------------
// Flashcards: tabelas | Pergunta | Resposta | sob cada H2

function splitRow(line) {
  const cells = [];
  let cur = '';
  const s = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '\\' && s[i + 1] === '|') { cur += '|'; i++; continue; }
    if (s[i] === '|') { cells.push(cur.trim()); cur = ''; continue; }
    cur += s[i];
  }
  cells.push(cur.trim());
  return cells;
}

function parseFlashcards(body) {
  const blocos = [];
  const sections = body.split(/\n(?=## )/);
  for (const sec of sections) {
    const h = sec.match(/^## (.*)/);
    if (!h || /^Fontes/i.test(h[1])) continue;
    const cards = [];
    let inTable = false;
    for (const line of sec.split('\n')) {
      if (/^\|/.test(line)) {
        const cells = splitRow(line);
        if (!inTable) { inTable = true; continue; } // cabeçalho
        if (cells.every((c) => /^:?-+:?$/.test(c))) continue; // separador
        if (cells.length >= 2 && cells[0]) cards.push({ q: wikilinks(cells[0]), a: wikilinks(cells[1]) });
      } else inTable = false;
    }
    if (cards.length) {
      blocos.push({ titulo: h[1].replace(/\s*\(\d+ cartões\)\s*$/, '').trim(), cards });
    }
  }
  return blocos;
}

// ---------------------------------------------------------------------------
// Simulados dos módulos (dois formatos de questão e de gabarito)

function parseOptions(block) {
  const text = block.trim();
  // formato lista: "- A) texto"
  if (/^- [A-E]\)/m.test(text)) {
    const idx = text.search(/^- A\)/m);
    const stem = text.slice(0, idx).trim();
    const opts = [];
    for (const line of text.slice(idx).split('\n')) {
      const m = line.match(/^- ([A-E])\)\s*(.*)$/);
      if (m) opts.push({ l: m[1], t: m[2].trim() });
      else if (opts.length && line.trim()) opts[opts.length - 1].t += ' ' + line.trim();
    }
    return { stem, opts };
  }
  // formato em linha: "A) x · B) y · C) z"
  const m = text.match(/(^|\n)A\)\s/);
  if (m) {
    const idx = m.index + m[1].length;
    const stem = text.slice(0, idx).trim();
    const flat = text.slice(idx).replace(/\s*\n\s*/g, ' ');
    const opts = flat
      .split(/\s*·\s*(?=[B-E]\)\s)/)
      .map((o) => o.match(/^([A-E])\)\s*([\s\S]*)$/))
      .filter(Boolean)
      .map((o) => ({ l: o[1], t: o[2].trim() }));
    return { stem, opts };
  }
  return { stem: text, opts: [] };
}

function parseSimulado(body) {
  const gabIdx = body.search(/^#{1,2} Gabarito/m);
  const qPart = gabIdx > 0 ? body.slice(0, gabIdx) : body;
  const aPart = gabIdx > 0 ? body.slice(gabIdx) : '';

  // introdução: do início até a primeira questão/parte
  const firstQ = qPart.search(/^(## |\*\*1\.\*\*)/m);
  const intro = firstQ > 0 ? qPart.slice(0, firstQ) : '';

  const questoes = [];
  let parte = '';
  const chunks = qPart.slice(firstQ > 0 ? firstQ : 0).split(/\n(?=## |\*\*\d+\.\*\*)/);
  for (const ch of chunks) {
    const h = ch.match(/^## (.*)/);
    if (h) {
      parte = /^Questões$/i.test(h[1].trim()) ? '' : h[1].trim();
      continue;
    }
    const q = ch.match(/^\*\*(\d+)\.\*\*\s*([\s\S]*)$/);
    if (!q) continue;
    const content = q[2].replace(/\n---\s*$/, '').replace(/\n-{3,}\n[\s\S]*$/, '').trim();
    const { stem, opts } = parseOptions(content);
    questoes.push({ n: +q[1], parte, enunciado: wikilinks(stem), opcoes: opts.map((o) => ({ l: o.l, t: wikilinks(o.t) })), resposta: null, explicacao: '' });
  }

  // gabarito em tabela: | 1 | **B** | (pode ter várias colunas)
  const answers = {};
  for (const m of aPart.matchAll(/\|\s*(\d+)\s*\|\s*\*\*([A-E])\*\*\s*(?=\|)/g)) answers[+m[1]] = m[2];

  // comentários: blocos que começam com **N. X** ou **N · X**
  const explicacoes = {};
  const endIdx = aPart.search(/^## (Onde você|Como interpretar|Fontes)/m);
  const comentarios = endIdx > 0 ? aPart.slice(0, endIdx) : aPart;
  const blocks = comentarios.split(/\n(?=\*\*\d+\s*[.·])/);
  for (const b of blocks) {
    const m = b.match(/^\*\*(\d+)\s*[.·]\s*/);
    if (!m) continue;
    const n = +m[1];
    const letter = b.slice(m[0].length).match(/^([A-E])(?=[\s.*—–:-])/);
    if (letter && !answers[n]) answers[n] = letter[1];
    explicacoes[n] = wikilinks(callouts('**' + b.slice(m[0].length).replace(/\n#{1,3} [\s\S]*$/, '').trim()));
  }

  for (const q of questoes) {
    q.resposta = q.opcoes.length ? answers[q.n] || null : null;
    q.explicacao = explicacoes[q.n] || '';
  }

  const fechamento = endIdx > 0 ? dropSections(aPart.slice(endIdx), [/^Fontes$/i]) : '';
  return { intro: cleanMd(intro), questoes, fechamento: wikilinks(callouts(fechamento)).trim() };
}

// ---------------------------------------------------------------------------
// Banco de questões do exame PMLE

function parseSecao(body, secaoN) {
  const h1 = body.match(/^# .*?:\s*(.*)$/m);
  const peso = (body.match(/\*\*(\d+)% da prova\*\*/) || [])[1];
  const subsecoes = [];
  const questoes = [];
  let sub = null;
  const chunks = body.split(/\n(?=## |#### )/);
  for (const ch of chunks) {
    const h2 = ch.match(/^## (\d+\.\d+)\s+(.*)/);
    if (h2) {
      sub = h2[1];
      subsecoes.push({ id: h2[1], titulo: h2[2].trim() });
      continue;
    }
    const h4 = ch.match(/^#### (Q[\w]+) · ([\d.]+) · curso (\d+) · (\S+)/);
    if (!h4) continue;
    const rest = ch.slice(h4[0].length).trim();
    const cIdx = rest.search(/^> \[!/m);
    const qText = cIdx >= 0 ? rest.slice(0, cIdx) : rest;
    const cText = cIdx >= 0 ? rest.slice(cIdx) : '';

    const optIdx = qText.search(/^- \*\*[A-F]\.\*\*/m);
    const enunciado = (optIdx >= 0 ? qText.slice(0, optIdx) : qText).trim();
    const opcoes = [];
    if (optIdx >= 0) {
      for (const line of qText.slice(optIdx).split('\n')) {
        const m = line.match(/^- \*\*([A-F])\.\*\*\s*(.*)$/);
        if (m) opcoes.push({ l: m[1], t: m[2].trim() });
        else if (opcoes.length && line.trim()) opcoes[opcoes.length - 1].t += ' ' + line.trim();
      }
    }

    const cLines = cText.split('\n').filter((l) => /^>/.test(l)).map((l) => l.replace(/^>\s?/, ''));
    const head = (cLines.shift() || '').replace(/^\[![\w]+\][+-]?\s*/, '');
    const am = head.match(/Resposta:\s*\*\*([A-F](?:\s*,\s*[A-F])*)\*\*\s*(.*)$/);
    const resposta = am ? am[1].split(/\s*,\s*/) : [];
    const nota = am ? am[2].replace(/^[·\s]+/, '').trim() : '';
    let conceitos = '';
    let nomeAtual = '';
    const expl = [];
    for (const l of cLines) {
      const c = l.match(/^\*Conceitos:\*\s*(.*)$/);
      const n = l.match(/^\*Nome atual:\*\s*(.*)$/);
      if (c) conceitos = c[1].trim();
      else if (n) nomeAtual = n[1].trim();
      else expl.push(l);
    }
    questoes.push({
      id: h4[1],
      secao: secaoN,
      sub: h4[2],
      curso: +h4[3],
      dif: h4[4],
      enunciado,
      opcoes,
      resposta,
      nota: termosTrilha(nota),
      explicacao: termosTrilha(wikilinks(expl.join('\n').trim())),
      conceitos,
      nomeAtual,
    });
  }
  return { secao: { n: secaoN, titulo: h1 ? h1[1].trim() : `Seção ${secaoN}`, peso: peso ? +peso : null, subsecoes }, questoes };
}

// ---------------------------------------------------------------------------
// Trilha: os 15 cursos com título, duração e roteiro

function parseTrilha(body) {
  const start = body.search(/^## Roteiro completo/m);
  const part = start >= 0 ? body.slice(start) : body;
  const end = part.slice(3).search(/^## /m);
  const roteiro = end >= 0 ? part.slice(0, end + 3) : part;
  const cursos = [];
  for (const ch of roteiro.split(/\n(?=### )/)) {
    const m = ch.match(/^### (\d+)\.\s+(.*?)\s+·\s+([^\n✅]*?)\s*(✅)?\s*$/m);
    if (!m) continue;
    cursos.push({ n: +m[1], titulo: m[2].trim(), duracao: m[3].trim(), roteiro: termosTrilha(cleanMd('# x\n' + ch.slice(m[0].length).trim())) });
  }
  return cursos;
}

// ---------------------------------------------------------------------------
// Build

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const cursosCfg = JSON.parse(read(path.join(CONTENT, 'cursos/cursos.json')));
const TIPOS = { revisao: 'Revisão', glossario: 'Glossário', flashcards: 'Flashcards', simulado: 'Simulado' };
const AULA_RE = /^R - (\d{4}-\d{2}-\d{2})-m(\d+)-a(\d+)-(.+)\.md$/;

// 1) Mapa de links (precisa existir antes de limpar qualquer Markdown)
const noteTitle = (rel) => {
  const p = path.join(CONTENT, rel);
  return exists(p) ? frontmatter(read(p)).meta.title || null : null;
};
const VAULT_TO_CONTENT = new Map([
  ['trilha-pmle', 'trilha/trilha.md'],
  ['trilha-pmle-cronograma', 'trilha/cronograma.md'],
  ['pmle-guia-do-exame', 'exame/guia.md'],
  ['pmle-banco-de-questoes', 'exame/banco.md'],
  ...[1, 2, 3, 4, 5, 6].map((n) => [`pmle-questoes-secao-${n}`, `exame/secao-${n}.md`]),
]);
LINKS.set('trilha-pmle', '#/trilha');
LINKS.set('trilha-pmle-cronograma', '#/cronograma');
LINKS.set('pmle-guia-do-exame', '#/exame');
LINKS.set('pmle-banco-de-questoes', '#/questoes');
for (let s = 1; s <= 6; s++) LINKS.set(`pmle-questoes-secao-${s}`, `#/questoes?secao=${s}`);

for (const [n, c] of Object.entries(cursosCfg)) {
  if (n.startsWith('_')) continue;
  const base = `#/curso/${n}`;
  const v = c.vault || {};
  const cdir = path.join('cursos', c.slug);
  if (v.hub) { LINKS.set(path.basename(v.hub, '.md'), base); VAULT_TO_CONTENT.set(path.basename(v.hub, '.md'), path.join(cdir, 'curso.md')); }
  if (v.armadilhas) { LINKS.set(path.basename(v.armadilhas, '.md'), `${base}/armadilhas`); VAULT_TO_CONTENT.set(path.basename(v.armadilhas, '.md'), path.join(cdir, 'armadilhas.md')); }
  if (v.modulos) {
    for (let m = 1; m <= 9; m++) {
      for (const tipo of Object.keys(TIPOS)) {
        const name = path.basename(v.modulos.replace('{n}', m).replace('{tipo}', tipo), '.md');
        LINKS.set(name, `${base}/modulo/${m}/${tipo}`);
        VAULT_TO_CONTENT.set(name, path.join(cdir, 'modulos', `modulo-${m}`, `${tipo}.md`));
      }
    }
  }
  const aulasDir = path.join(CONTENT, 'cursos', c.slug, 'aulas');
  if (exists(aulasDir)) {
    for (const f of fs.readdirSync(aulasDir)) {
      const m = f.replace(/^T - /, 'R - ').match(AULA_RE);
      if (!m) continue;
      const id = `${+m[2]}.${+m[3]}`;
      LINKS.set(f.replace(/\.md$/, ''), `${base}/aula/${id}${f.startsWith('T - ') ? '/transcricao' : ''}`);
      VAULT_TO_CONTENT.set(f.replace(/\.md$/, ''), path.join('cursos', c.slug, 'aulas', f));
    }
  }
}
for (const [name, rel] of VAULT_TO_CONTENT) {
  const t = noteTitle(rel);
  if (t) TITLES.set(name, t.replace(/^Google AI\/ML — /, '').replace(/^Curso — /, ''));
}

// 2) Trilha, cronograma, exame
const trilhaNote = loadNote('trilha/trilha.md');
const trilhaCursos = trilhaNote ? parseTrilha(trilhaNote.body) : [];
if (trilhaNote) {
  addDoc({ id: 'trilha', title: trilhaNote.title, route: '#/trilha', kind: 'Trilha', md: cleanMd(trilhaNote.body.replace(/## Roteiro completo[\s\S]*?(?=\n## |$)/, ''), 'trilha/trilha.md') });
}
const crono = loadNote('trilha/cronograma.md');
if (crono) addDoc({ id: 'cronograma', title: crono.title, route: '#/cronograma', kind: 'Trilha', md: cleanMd(crono.body), summary: crono.meta.summary });
const guia = loadNote('exame/guia.md');
if (guia) addDoc({ id: 'exame-guia', title: guia.title, route: '#/exame', kind: 'Exame', md: cleanMd(guia.body), summary: guia.meta.summary });
const banco = loadNote('exame/banco.md');
if (banco) addDoc({ id: 'exame-banco', title: banco.title, route: '#/questoes/sobre', kind: 'Exame', md: cleanMd(banco.body), summary: banco.meta.summary });

const bank = { secoes: [], questoes: [] };
for (let s = 1; s <= 6; s++) {
  const note = loadNote(`exame/secao-${s}.md`);
  if (!note) continue;
  const { secao, questoes } = parseSecao(note.body, s);
  bank.secoes.push(secao);
  bank.questoes.push(...questoes);
  for (const q of questoes) {
    SEARCH.push({ r: `#/questoes?q=${q.id}`, t: `Questão ${q.id} (seção ${q.sub})`, h: '', a: '', k: 'Questão PMLE', x: plain(q.enunciado + ' ' + q.explicacao + ' ' + q.conceitos).slice(0, 1200) });
  }
}
writeJSON('questoes.json', bank);

// 3) Cursos
const cursos = [];
const stats = { aulas: 0, flashcards: 0, simulado: 0, questoes: bank.questoes.length, cursosComMaterial: 0 };

for (const t of trilhaCursos) {
  const cfg = cursosCfg[t.n];
  const curso = { n: t.n, titulo: t.titulo, duracao: t.duracao, nomeCurto: cfg?.nomeCurto || t.titulo, material: false, questoes: bank.questoes.filter((q) => q.curso === t.n).length };
  writeJSON(`roteiros/${t.n}.json`, { md: t.roteiro });

  if (cfg) {
    const dir = path.join(CONTENT, 'cursos', cfg.slug);
    const base = `#/curso/${t.n}`;
    curso.material = true;
    stats.cursosComMaterial++;

    const hub = loadNote(path.join('cursos', cfg.slug, 'curso.md'));
    const modulos = new Map();
    if (hub) {
      addDoc({ id: `c${t.n}-curso`, title: hub.title, route: base, kind: 'Curso', md: cleanMd(hub.body), summary: hub.meta.summary });
      // títulos e itens dos módulos a partir das tabelas "### Módulo N — Título"
      for (const sec of hub.body.split(/\n(?=### )/)) {
        const h = sec.match(/^### Módulo (\d+)\s*[—-]\s*(.*)$/m);
        if (!h) continue;
        const itens = [];
        for (const line of sec.split('\n')) {
          if (!/^\|\s*\d+\.\d+\s*\|/.test(line)) continue;
          const cells = splitRow(line);
          const label = cells[1].replace(/\[\[[^\]|]*\\?\|([^\]]+)\]\]/g, '$1').replace(/\[\[([^\]]+)\]\]/g, '$1').replace(/\s*⭐+\s*/g, ' ').trim();
          itens.push({ id: cells[0], titulo: label, tipo: cells[2] || '', estrelas: (cells[1].match(/⭐/g) || []).length });
        }
        const nota = (sec.match(/^\*\((.*)\)\*$/m) || [])[1];
        modulos.set(+h[1], { n: +h[1], titulo: h[2].trim(), nota: nota ? termosSecao(wikilinks(nota)) : '', itens, aulas: [], materiais: [] });
      }
    }

    const arm = loadNote(path.join('cursos', cfg.slug, 'armadilhas.md'));
    if (arm) addDoc({ id: `c${t.n}-armadilhas`, title: arm.title, route: `${base}/armadilhas`, kind: 'Revisão', md: cleanMd(arm.body), summary: arm.meta.summary });
    curso.armadilhas = !!arm;

    // Aulas
    const aulasDir = path.join(dir, 'aulas');
    const files = exists(aulasDir) ? fs.readdirSync(aulasDir).filter((f) => AULA_RE.test(f)).sort() : [];
    const aulas = [];
    for (const f of files) {
      const [, data, mm, aa] = f.match(AULA_RE);
      const id = `${+mm}.${+aa}`;
      const note = loadNote(path.join('cursos', cfg.slug, 'aulas', f));
      const tFile = path.join(aulasDir, f.replace(/^R - /, 'T - '));
      const titulo = note.title.replace(/^(Módulo \d+,\s*)?Aula\s+[\d.]+\s*[—-]\s*/, '');
      const docTitle = `Aula ${id} — ${titulo}`;
      const aula = { id, modulo: +mm, titulo, data, resumo: termosSecao(note.meta.summary || ''), transcricao: exists(tFile) };
      aulas.push(aula);
      const { meta: aulaMeta, md: aulaMd } = extractAulaMeta(cleanMd(note.body));
      aula.tema = aulaMeta.tema || '';
      aula.duracao = aulaMeta.duracao || '';
      addDoc({ id: `c${t.n}-aula-${id}`, title: docTitle, route: `${base}/aula/${id}`, kind: 'Aula', md: aulaMd, summary: note.meta.summary });
      if (aula.transcricao) {
        const tn = loadNote(path.relative(CONTENT, tFile));
        writeJSON(`docs/c${t.n}-transc-${id}.json`, { id: `c${t.n}-transc-${id}`, title: `${docTitle} · transcrição`, route: `${base}/aula/${id}/transcricao`, kind: 'Transcrição', md: cleanMd(tn.body) });
      }
      if (!modulos.has(+mm)) modulos.set(+mm, { n: +mm, titulo: `Módulo ${+mm}`, nota: '', itens: [], aulas: [], materiais: [] });
      modulos.get(+mm).aulas.push(id);
    }
    aulas.sort((a, b) => a.modulo - b.modulo || +a.id.split('.')[1] - +b.id.split('.')[1]);
    stats.aulas += aulas.length;

    // Materiais por módulo
    const modDir = path.join(dir, 'modulos');
    if (exists(modDir)) {
      for (const md of fs.readdirSync(modDir)) {
        const mn = +md.replace('modulo-', '');
        if (!modulos.has(mn)) modulos.set(mn, { n: mn, titulo: `Módulo ${mn}`, nota: '', itens: [], aulas: [], materiais: [] });
        const mod = modulos.get(mn);
        for (const tipo of Object.keys(TIPOS)) {
          const note = loadNote(path.join('cursos', cfg.slug, 'modulos', md, `${tipo}.md`));
          if (!note) continue;
          const route = `${base}/modulo/${mn}/${tipo}`;
          if (tipo === 'flashcards') {
            const blocos = parseFlashcards(note.body);
            const total = blocos.reduce((s, b) => s + b.cards.length, 0);
            stats.flashcards += total;
            writeJSON(`flashcards/c${t.n}-m${mn}.json`, JSON.parse(termosSecao(JSON.stringify({ titulo: note.title, blocos }))));
            mod.materiais.push({ tipo, total });
            for (const b of blocos) SEARCH.push({ r: route, t: note.title, h: b.titulo, a: '', k: 'Flashcards', x: plain(b.cards.map((c) => c.q + ' — ' + c.a).join(' · ')).slice(0, 1500) });
          } else if (tipo === 'simulado') {
            const sim = parseSimulado(note.body);
            stats.simulado += sim.questoes.length;
            const semGabarito = sim.questoes.filter((q) => q.opcoes.length && !q.resposta).map((q) => q.n);
            if (semGabarito.length) console.warn(`  ! módulo ${mn}: questões sem gabarito detectado: ${semGabarito.join(', ')}`);
            writeJSON(`simulados/c${t.n}-m${mn}.json`, JSON.parse(termosSecao(JSON.stringify({ titulo: note.title, ...sim }))));
            mod.materiais.push({ tipo, total: sim.questoes.length });
            SEARCH.push({ r: route, t: note.title, h: '', a: '', k: 'Simulado', x: plain(sim.questoes.map((q) => q.enunciado).join(' · ')).slice(0, 1500) });
          } else {
            addDoc({ id: `c${t.n}-m${mn}-${tipo}`, title: note.title, route, kind: TIPOS[tipo], md: cleanMd(note.body), summary: note.meta.summary });
            mod.materiais.push({ tipo });
          }
        }
        const order = Object.keys(TIPOS);
        mod.materiais.sort((a, b) => order.indexOf(a.tipo) - order.indexOf(b.tipo));
      }
    }

    curso.modulos = [...modulos.values()].sort((a, b) => a.n - b.n);
    curso.aulas = aulas;
  }
  cursos.push(curso);
}

// Materiais da turma (links da planilha) e meta de acerto antes do exame
const materiaisPath = path.join(CONTENT, 'trilha/materiais.json');
const materiais = exists(materiaisPath) ? JSON.parse(read(materiaisPath)) : { grupos: [] };
delete materiais._leia;
writeJSON('materiais.json', materiais);
for (const g of materiais.grupos)
  for (const it of g.itens) SEARCH.push({ r: '#/materiais', t: 'Materiais da turma', h: it.titulo, a: '', k: 'Material', x: `${it.categoria}. ${it.descricao} ${(it.capitulos || []).join(', ')}` });

writeJSON('site.json', { geradoEm: new Date().toISOString(), metaExame: materiais.metaExame || 85, stats, cursos, secoes: bank.secoes, docs: DOCS.map(({ id, title, route, kind }) => ({ id, title, route, kind })) });
writeJSON('search.json', SEARCH);

console.log(`✓ build concluído em public/data/`);
console.log(`  ${cursos.length} cursos na trilha (${stats.cursosComMaterial} com material) · ${stats.aulas} aulas · ${stats.flashcards} flashcards · ${stats.simulado} questões de simulado · ${stats.questoes} questões PMLE · ${DOCS.length} páginas · ${SEARCH.length} trechos indexados`);
