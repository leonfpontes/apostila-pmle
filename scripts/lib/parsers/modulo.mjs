// Estrutura de um módulo com material: as seções (tabelas "### Módulo N — Título"
// do hub, que chamam as seções de "Módulo") e a ficha de cada aula.

import { celulas } from '../markdown.mjs';

/** Arquivos de aula: "R - AAAA-MM-DD-mSS-aAA-tema.md" (resumo) e "T - …" (transcrição). */
export const PADRAO_AULA = /^R - (\d{4}-\d{2}-\d{2})-m(\d+)-a(\d+)-(.+)\.md$/;

export function idDaAula(arquivo) {
  const m = arquivo.replace(/^T - /, 'R - ').match(PADRAO_AULA);
  return m ? { data: m[1], secao: +m[2], id: `${+m[2]}.${+m[3]}` } : null;
}

/** Seções do módulo a partir das tabelas do hub. */
export function lerSecoesDoHub(corpo, links) {
  const secoes = [];
  for (const trecho of corpo.split(/\n(?=### )/)) {
    const h = trecho.match(/^### Módulo (\d+)\s*[—-]\s*(.*)$/m);
    if (!h) continue;
    const itens = [];
    for (const linha of trecho.split('\n')) {
      if (!/^\|\s*\d+\.\d+\s*\|/.test(linha)) continue;
      const [id, rotulo, tipo = ''] = celulas(linha);
      itens.push({
        id,
        titulo: rotulo.replace(/\[\[[^\]|]*\\?\|([^\]]+)\]\]/g, '$1').replace(/\[\[([^\]]+)\]\]/g, '$1').replace(/\s*⭐+\s*/g, ' ').trim(),
        tipo,
        estrelas: (rotulo.match(/⭐/g) || []).length,
      });
    }
    const nota = (trecho.match(/^\*\((.*)\)\*$/m) || [])[1];
    secoes.push({ n: +h[1], titulo: h[2].trim(), nota: nota ? links.resolver(nota) : '', itens, aulas: [], materiais: [] });
  }
  return secoes;
}

/** A ficha no topo da aula (| | | Tema / Duração …) vira metadado e sai do texto. */
export function separarFichaDaAula(md) {
  const m = md.match(/^\|\s*\|\s*\|\n\|[-|\s]+\|\n((?:\|.*\|\n?)+)/);
  if (!m) return { ficha: {}, md };
  const ficha = {};
  for (const linha of m[1].trim().split('\n')) {
    const [k, v = ''] = celulas(linha);
    const chave = k.replace(/\*/g, '').trim().toLowerCase();
    if (chave === 'tema') ficha.tema = v.replace(/\*\*/g, '');
    if (chave === 'duração') ficha.duracao = v.replace(/\*\*/g, '');
  }
  return { ficha, md: md.slice(m[0].length).replace(/^\s+/, '') };
}
