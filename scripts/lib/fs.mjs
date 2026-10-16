// Caminhos do projeto e operações de arquivo usadas pelos scripts.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

export const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', '..');
export const CONTENT = path.join(ROOT, 'content');
export const OUT = path.join(ROOT, 'public', 'data');
export const VAULT = process.env.VAULT || path.join(os.homedir(), 'Documents', 'Brain');

export const exists = (p) => fs.existsSync(p);
export const read = (p) => fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
export const readJSON = (p) => JSON.parse(read(p));
export const listDir = (p) => (exists(p) ? fs.readdirSync(p).sort() : []);

export function write(p, text) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, text);
}

/** Grava um JSON em public/data/<rel>. */
export const writeData = (rel, data) => write(path.join(OUT, rel), JSON.stringify(data));

export function resetDir(p) {
  fs.rmSync(p, { recursive: true, force: true });
  fs.mkdirSync(p, { recursive: true });
}

/** Configuração dos módulos com material (content/modulos/modulos.json), sem chaves de comentário. */
export function loadModulosConfig() {
  const cfg = readJSON(path.join(CONTENT, 'modulos', 'modulos.json'));
  return Object.entries(cfg)
    .filter(([k]) => !k.startsWith('_'))
    .map(([n, c]) => ({ n: Number(n), ...c, dir: path.join(CONTENT, 'modulos', c.pasta) }));
}
