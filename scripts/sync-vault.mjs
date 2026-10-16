#!/usr/bin/env node
// Copia o material de estudo do vault Obsidian para content/, já sem as seções
// privadas (veja scripts/lib/privacidade.mjs).
// Uso: npm run sync   (ou VAULT=/caminho/do/vault npm run sync)
// Não apaga nada em content/: arquivos novos entram, existentes são sobrescritos.

import path from 'node:path';
import { TIPOS_MATERIAL } from '../shared/contrato.js';
import { CONTENT, exists, listDir, loadModulosConfig, read, VAULT, write } from './lib/fs.mjs';
import { sanitizar } from './lib/privacidade.mjs';

if (!exists(VAULT)) {
  console.error(`Vault não encontrado em ${VAULT}. Defina VAULT=/caminho/do/vault.`);
  process.exit(1);
}

let copiados = 0;
function copiar(origem, destino) {
  const de = path.join(VAULT, origem);
  if (!exists(de)) return console.warn(`  ! não encontrado no vault: ${origem}`);
  write(destino, sanitizar(read(de), path.relative(CONTENT, destino)));
  copiados++;
}

// Trilha, cronograma e exame
copiar('30-projects/trilha-pmle.md', path.join(CONTENT, 'trilha', 'trilha.md'));
copiar('10-notes/trilha-pmle-cronograma.md', path.join(CONTENT, 'trilha', 'cronograma.md'));
copiar('10-notes/pmle-guia-do-exame.md', path.join(CONTENT, 'exame', 'guia.md'));
copiar('10-notes/pmle-banco-de-questoes.md', path.join(CONTENT, 'exame', 'banco.md'));
for (let s = 1; s <= 6; s++) copiar(`10-notes/pmle-questoes-secao-${s}.md`, path.join(CONTENT, 'exame', `secao-${s}.md`));

// Módulos com material (content/modulos/modulos.json)
for (const m of loadModulosConfig()) {
  const v = m.vault || {};
  if (v.hub) copiar(v.hub, path.join(m.dir, 'modulo.md'));
  if (v.armadilhas) copiar(v.armadilhas, path.join(m.dir, 'armadilhas.md'));
  if (v.aulas) for (const arq of listDir(path.join(VAULT, v.aulas))) if (/^[RT] - .+\.md$/.test(arq)) copiar(path.join(v.aulas, arq), path.join(m.dir, 'aulas', arq));
  if (v.secoes)
    for (let s = 1; s <= 9; s++)
      for (const tipo of TIPOS_MATERIAL) {
        const origem = v.secoes.replace('{n}', s).replace('{tipo}', tipo);
        if (exists(path.join(VAULT, origem))) copiar(origem, path.join(m.dir, 'secoes', `secao-${s}`, `${tipo}.md`));
      }
}

console.log(`✓ ${copiados} arquivos copiados de ${VAULT} para content/`);
console.log('  Agora rode: npm run data (ou npm run dev)');
