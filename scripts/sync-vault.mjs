#!/usr/bin/env node
// Copia o material de estudo do vault Obsidian para content/.
// Uso: npm run sync   (ou VAULT=/caminho/do/vault npm run sync)
// Não apaga nada em content/: arquivos novos entram, existentes são sobrescritos.

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const CONTENT = path.join(ROOT, 'content');
const VAULT = process.env.VAULT || path.join(os.homedir(), 'Documents', 'Brain');

if (!fs.existsSync(VAULT)) {
  console.error(`Vault não encontrado em ${VAULT}. Defina VAULT=/caminho/do/vault.`);
  process.exit(1);
}

// O repositório é público: seções de controle pessoal (progresso de cada
// colega, datas individuais, log) e o resumo do frontmatter da trilha, que cita
// a turma pelo nome, não saem do vault.
const PRIVATE_HEADINGS = [/^Onde cada um está/i, /^As datas do Leonardo/i, /^Log$/i, /^Como o material é registrado$/i, /^Dúvidas em aberto$/i];
const PRIVATE_PER_FILE = { 'trilha/trilha.md': [/^Fontes$/i] };

function sanitize(md, rel) {
  const rules = [...PRIVATE_HEADINGS, ...(PRIVATE_PER_FILE[rel] || [])];
  if (rel === 'trilha/trilha.md') md = md.replace(/^(summary|pessoas|org):.*\n/gm, '');
  const out = [];
  let drop = 0;
  let fence = false;
  for (const line of md.split('\n')) {
    if (/^```/.test(line)) fence = !fence;
    const h = !fence && line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      if (drop && h[1].length <= drop) drop = 0;
      if (!drop && rules.some((r) => r.test(h[2].trim()))) { drop = h[1].length; continue; }
    }
    if (!drop) out.push(line);
  }
  return out.join('\n');
}

let copied = 0;
function copy(src, dest) {
  const from = path.join(VAULT, src);
  if (!fs.existsSync(from)) {
    console.warn(`  ! não encontrado no vault: ${src}`);
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, sanitize(fs.readFileSync(from, 'utf8'), path.relative(CONTENT, dest)));
  copied++;
}

// Trilha, cronograma e exame
copy('30-projects/trilha-pmle.md', path.join(CONTENT, 'trilha/trilha.md'));
copy('10-notes/trilha-pmle-cronograma.md', path.join(CONTENT, 'trilha/cronograma.md'));
copy('10-notes/pmle-guia-do-exame.md', path.join(CONTENT, 'exame/guia.md'));
copy('10-notes/pmle-banco-de-questoes.md', path.join(CONTENT, 'exame/banco.md'));
for (let s = 1; s <= 6; s++) {
  copy(`10-notes/pmle-questoes-secao-${s}.md`, path.join(CONTENT, `exame/secao-${s}.md`));
}

// Cursos
const cursos = JSON.parse(fs.readFileSync(path.join(CONTENT, 'cursos/cursos.json'), 'utf8'));
for (const [n, curso] of Object.entries(cursos)) {
  if (n.startsWith('_') || !curso.vault) continue;
  const dir = path.join(CONTENT, 'cursos', curso.slug);
  const v = curso.vault;
  if (v.hub) copy(v.hub, path.join(dir, 'curso.md'));
  if (v.armadilhas) copy(v.armadilhas, path.join(dir, 'armadilhas.md'));

  // Aulas: todo arquivo "R - ..." (resumo) e "T - ..." (transcrição) da pasta
  if (v.aulas) {
    const aulasDir = path.join(VAULT, v.aulas);
    for (const f of fs.readdirSync(aulasDir)) {
      if (/^[RT] - .+\.md$/.test(f)) copy(path.join(v.aulas, f), path.join(dir, 'aulas', f));
    }
  }

  // Materiais por módulo: glossário, flashcards, simulado, revisão
  if (v.modulos) {
    for (let m = 1; m <= 9; m++) {
      for (const tipo of ['revisao', 'glossario', 'flashcards', 'simulado']) {
        const src = v.modulos.replace('{n}', m).replace('{tipo}', tipo);
        if (fs.existsSync(path.join(VAULT, src))) copy(src, path.join(dir, 'modulos', `modulo-${m}`, `${tipo}.md`));
      }
    }
  }
}

console.log(`✓ ${copied} arquivos copiados de ${VAULT} para content/`);
console.log('  Agora rode: npm run build');
