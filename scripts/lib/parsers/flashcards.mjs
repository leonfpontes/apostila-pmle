// Flashcards: cada "## Bloco …" tem uma tabela | Pergunta | Resposta |.

import { celulas, ehSeparadorDeTabela } from '../markdown.mjs';

/** @returns {{ titulo: string, cards: { q: string, a: string }[] }[]} */
export function lerFlashcards(corpo, links) {
  const blocos = [];
  for (const secao of corpo.split(/\n(?=## )/)) {
    const h = secao.match(/^## (.*)/);
    if (!h) continue;
    const cards = [];
    let dentroDaTabela = false;
    for (const linha of secao.split('\n')) {
      if (!/^\|/.test(linha)) {
        dentroDaTabela = false;
        continue;
      }
      const cels = celulas(linha);
      if (!dentroDaTabela) {
        dentroDaTabela = true; // a primeira linha é o cabeçalho
        continue;
      }
      if (ehSeparadorDeTabela(cels)) continue;
      if (cels.length >= 2 && cels[0]) cards.push({ q: links.resolver(cels[0]), a: links.resolver(cels[1]) });
    }
    if (cards.length) blocos.push({ titulo: h[1].replace(/\s*\(\d+ cartões\)\s*$/, '').trim(), cards });
  }
  return blocos;
}
