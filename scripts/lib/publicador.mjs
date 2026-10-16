// Publica documentos: limpa o Markdown das notas, aplica a nomenclatura,
// grava public/data/docs/<id>.json e alimenta o índice de busca.

import path from 'node:path';
import { arquivos } from '../../shared/contrato.js';
import { CONTENT, exists, read, writeData } from './fs.mjs';
import { converterCallouts, lerFrontmatter, slugify, textoPuro } from './markdown.mjs';
import { removerSecoes, sanitizar } from './privacidade.mjs';
import { termosPorRota } from './termos.mjs';

/** Uma nota de content/: metadados do frontmatter, corpo e título. */
export class Nota {
  constructor(rel) {
    const { meta, corpo } = lerFrontmatter(read(path.join(CONTENT, rel)));
    const h1 = corpo.match(/^#\s+(.*)$/m);
    this.rel = rel;
    this.meta = meta;
    this.corpo = sanitizar(corpo, rel);
    this.titulo = meta.title || (h1 ? h1[1] : rel);
    this.resumo = meta.summary || '';
  }

  static abrir(rel) {
    return exists(path.join(CONTENT, rel)) ? new Nota(rel) : null;
  }
}

export class IndiceDeBusca {
  #entradas = [];

  adicionar({ rota, titulo, secao = '', ancora = '', tipo, texto }) {
    const x = textoPuro(texto).slice(0, 1500);
    if (x) this.#entradas.push({ r: rota, t: titulo, h: secao, a: ancora, k: tipo, x });
  }

  /** Um registro por seção (H2/H3) do documento. */
  adicionarDocumento({ rota, titulo, tipo, md }) {
    for (const parte of md.split(/\n(?=#{2,3}\s)/)) {
      const h = parte.match(/^#{2,3}\s+(.*)/);
      const secao = h ? h[1].replace(/[*_`]/g, '').trim() : '';
      this.adicionar({ rota, titulo, secao, ancora: secao ? slugify(secao) : '', tipo, texto: h ? parte.slice(h[0].length) : parte });
    }
  }

  get entradas() {
    return this.#entradas;
  }
}

export class Publicador {
  #docs = [];

  constructor(links, indice) {
    this.links = links;
    this.indice = indice;
  }

  /** Markdown pronto para o site: sem H1, sem navegação do vault, com callouts e links resolvidos. */
  limpar(corpo) {
    let md = removerSecoes(corpo.replace(/<!--[\s\S]*?-->/g, ''));
    md = md.replace(/^\s*#\s+.*\n+/, '');
    md = md.replace(/\s*\((também no |no |do )?projeto Claude[^)]*\)/g, '');
    md = md.replace(/^\s*Material de estudo do Módulo[^\n]*(\n(?!\n)[^\n]*)*\n+/, '');
    md = this.links.resolver(converterCallouts(md));
    return md.replace(/\n{3,}/g, '\n\n').trim() + '\n';
  }

  /** Grava o documento e o indexa (a menos que indexar=false, como nas transcrições). */
  publicar({ id, titulo, rota, tipo, md, resumo = '', indexar = true }) {
    const termos = (t) => termosPorRota(rota, t);
    const doc = { id, title: termos(titulo).replace(/^Google AI\/ML — /, ''), route: rota, kind: tipo, summary: termos(resumo), md: termos(md) };
    writeData(arquivos.doc(id), doc);
    this.#docs.push({ id, title: doc.title, route: rota, kind: tipo });
    if (indexar) this.indice.adicionarDocumento({ rota, titulo: doc.title, tipo, md: doc.md });
    return doc;
  }

  get docs() {
    return this.#docs;
  }
}
