// Banco de questões do exame: uma nota por seção do guia oficial.
// Cada questão: "#### Q63 · 1.1 · curso 3 · fácil", alternativas "- **A.** …"
// e um callout "> [!success]- Resposta: **A**" com a explicação.

function lerAlternativas(texto) {
  const i = texto.search(/^- \*\*[A-F]\.\*\*/m);
  const opcoes = [];
  if (i < 0) return { enunciado: texto.trim(), opcoes };
  for (const linha of texto.slice(i).split('\n')) {
    const m = linha.match(/^- \*\*([A-F])\.\*\*\s*(.*)$/);
    if (m) opcoes.push({ l: m[1], t: m[2].trim() });
    else if (opcoes.length && linha.trim()) opcoes[opcoes.length - 1].t += ' ' + linha.trim();
  }
  return { enunciado: texto.slice(0, i).trim(), opcoes };
}

function lerResposta(callout) {
  const linhas = callout
    .split('\n')
    .filter((l) => /^>/.test(l))
    .map((l) => l.replace(/^>\s?/, ''));
  const cabecalho = (linhas.shift() || '').replace(/^\[![\w]+\][+-]?\s*/, '');
  const m = cabecalho.match(/Resposta:\s*\*\*([A-F](?:\s*,\s*[A-F])*)\*\*\s*(.*)$/);
  const r = { resposta: m ? m[1].split(/\s*,\s*/) : [], nota: m ? m[2].replace(/^[·\s]+/, '').trim() : '', conceitos: '', nomeAtual: '', explicacao: '' };
  const explicacao = [];
  for (const l of linhas) {
    const c = l.match(/^\*Conceitos:\*\s*(.*)$/);
    const n = l.match(/^\*Nome atual:\*\s*(.*)$/);
    if (c) r.conceitos = c[1].trim();
    else if (n) r.nomeAtual = n[1].trim();
    else explicacao.push(l);
  }
  r.explicacao = explicacao.join('\n').trim();
  return r;
}

/** @returns {{ secao: object, questoes: object[] }} */
export function lerSecaoDoExame(corpo, n, links, termos) {
  const titulo = corpo.match(/^# .*?:\s*(.*)$/m);
  const peso = (corpo.match(/\*\*(\d+)% da prova\*\*/) || [])[1];
  const subsecoes = [];
  const questoes = [];
  for (const trecho of corpo.split(/\n(?=## |#### )/)) {
    const h2 = trecho.match(/^## (\d+\.\d+)\s+(.*)/);
    if (h2) {
      subsecoes.push({ id: h2[1], titulo: h2[2].trim() });
      continue;
    }
    const h4 = trecho.match(/^#### (Q[\w]+) · ([\d.]+) · curso (\d+) · (\S+)/);
    if (!h4) continue;
    const resto = trecho.slice(h4[0].length).trim();
    const c = resto.search(/^> \[!/m);
    const { enunciado, opcoes } = lerAlternativas(c >= 0 ? resto.slice(0, c) : resto);
    const r = lerResposta(c >= 0 ? resto.slice(c) : '');
    questoes.push({
      id: h4[1],
      secao: n,
      sub: h4[2],
      modulo: +h4[3],
      dif: h4[4],
      enunciado,
      opcoes,
      resposta: r.resposta,
      nota: termos(r.nota),
      explicacao: termos(links.resolver(r.explicacao)),
      conceitos: r.conceitos,
      nomeAtual: r.nomeAtual,
    });
  }
  return { secao: { n, titulo: titulo ? titulo[1].trim() : `Seção ${n}`, peso: peso ? +peso : null, subsecoes }, questoes };
}
