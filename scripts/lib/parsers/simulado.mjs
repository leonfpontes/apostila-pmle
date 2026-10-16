// Simulado de uma seção. Aceita os dois formatos usados nas notas:
// - questões "**N.** enunciado" com alternativas "- A) …" ou "A) … · B) …";
// - gabarito em tabela "| N | **B** |" e/ou comentários "**N · B** — …" / "**N. B — …**".
// Questão sem alternativas vira questão aberta (o aluno se autoavalia).

import { converterCallouts } from '../markdown.mjs';
import { removerSecoes } from '../privacidade.mjs';

function separarAlternativas(bloco) {
  const texto = bloco.trim();
  if (/^- [A-E]\)/m.test(texto)) {
    const i = texto.search(/^- A\)/m);
    const opcoes = [];
    for (const linha of texto.slice(i).split('\n')) {
      const m = linha.match(/^- ([A-E])\)\s*(.*)$/);
      if (m) opcoes.push({ l: m[1], t: m[2].trim() });
      else if (opcoes.length && linha.trim()) opcoes[opcoes.length - 1].t += ' ' + linha.trim();
    }
    return { enunciado: texto.slice(0, i).trim(), opcoes };
  }
  const m = texto.match(/(^|\n)A\)\s/);
  if (!m) return { enunciado: texto, opcoes: [] };
  const i = m.index + m[1].length;
  const opcoes = texto
    .slice(i)
    .replace(/\s*\n\s*/g, ' ')
    .split(/\s*·\s*(?=[B-E]\)\s)/)
    .map((o) => o.match(/^([A-E])\)\s*([\s\S]*)$/))
    .filter(Boolean)
    .map((o) => ({ l: o[1], t: o[2].trim() }));
  return { enunciado: texto.slice(0, i).trim(), opcoes };
}

function lerGabarito(parte, links) {
  const respostas = {};
  for (const m of parte.matchAll(/\|\s*(\d+)\s*\|\s*\*\*([A-E])\*\*\s*(?=\|)/g)) respostas[+m[1]] = m[2];

  const fim = parte.search(/^## (Onde você|Como interpretar|Fontes)/m);
  const comentarios = fim > 0 ? parte.slice(0, fim) : parte;
  const explicacoes = {};
  for (const bloco of comentarios.split(/\n(?=\*\*\d+\s*[.·])/)) {
    const m = bloco.match(/^\*\*(\d+)\s*[.·]\s*/);
    if (!m) continue;
    const n = +m[1];
    const letra = bloco.slice(m[0].length).match(/^([A-E])(?=[\s.*—–:-])/);
    if (letra && !respostas[n]) respostas[n] = letra[1];
    explicacoes[n] = links.resolver(converterCallouts('**' + bloco.slice(m[0].length).replace(/\n#{1,3} [\s\S]*$/, '').trim()));
  }
  const fechamento = fim > 0 ? links.resolver(converterCallouts(removerSecoes(parte.slice(fim)))).trim() : '';
  return { respostas, explicacoes, fechamento };
}

/** @param limpar função que prepara Markdown livre (introdução) para o site */
export function lerSimulado(corpo, links, limpar) {
  const g = corpo.search(/^#{1,2} Gabarito/m);
  const parteQuestoes = g > 0 ? corpo.slice(0, g) : corpo;
  const primeira = parteQuestoes.search(/^(## |\*\*1\.\*\*)/m);
  const intro = primeira > 0 ? parteQuestoes.slice(0, primeira) : '';

  const questoes = [];
  let parte = '';
  for (const trecho of parteQuestoes.slice(Math.max(primeira, 0)).split(/\n(?=## |\*\*\d+\.\*\*)/)) {
    const h = trecho.match(/^## (.*)/);
    if (h) {
      parte = /^Questões$/i.test(h[1].trim()) ? '' : h[1].trim();
      continue;
    }
    const q = trecho.match(/^\*\*(\d+)\.\*\*\s*([\s\S]*)$/);
    if (!q) continue;
    const { enunciado, opcoes } = separarAlternativas(q[2].replace(/\n-{3,}\s*(\n[\s\S]*)?$/, ''));
    questoes.push({ n: +q[1], parte, enunciado: links.resolver(enunciado), opcoes: opcoes.map((o) => ({ ...o, t: links.resolver(o.t) })), resposta: null, explicacao: '' });
  }

  const { respostas, explicacoes, fechamento } = lerGabarito(g > 0 ? corpo.slice(g) : '', links);
  for (const q of questoes) {
    q.resposta = q.opcoes.length ? respostas[q.n] || null : null;
    q.explicacao = explicacoes[q.n] || '';
  }
  return { intro: limpar(intro), questoes, fechamento };
}
