// Utilitários de Markdown sem dependências: frontmatter, tabelas, callouts do
// Obsidian e conversão para texto puro (busca).

export function lerFrontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { meta: {}, corpo: md };
  const meta = {};
  for (const linha of m[1].split('\n')) {
    const kv = linha.match(/^([\w-]+):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].replace(/^["']|["']$/g, '').trim();
  }
  return { meta, corpo: md.slice(m[0].length) };
}

export const slugify = (s) =>
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

/** Divide uma linha de tabela Markdown em células, respeitando "\|". */
export function celulas(linha) {
  const out = [];
  let atual = '';
  const s = linha.trim().replace(/^\|/, '').replace(/\|$/, '');
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '\\' && s[i + 1] === '|') {
      atual += '|';
      i++;
    } else if (s[i] === '|') {
      out.push(atual.trim());
      atual = '';
    } else atual += s[i];
  }
  out.push(atual.trim());
  return out;
}

export const ehSeparadorDeTabela = (cels) => cels.every((c) => /^:?-+:?$/.test(c));

const negritoHtml = (s) => s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>');

/** Callouts do Obsidian ("> [!tipo]- Título") viram <details> (recolhível) ou <aside>. */
export function converterCallouts(texto) {
  const linhas = texto.split('\n');
  const out = [];
  for (let i = 0; i < linhas.length; i++) {
    const m = linhas[i].match(/^>\s*\[!(\w+)\]([+-]?)\s*(.*)$/);
    if (!m) {
      out.push(linhas[i]);
      continue;
    }
    const [, tipo, dobra, titulo] = m;
    const corpo = [];
    while (i + 1 < linhas.length && /^>/.test(linhas[i + 1])) corpo.push(linhas[++i].replace(/^>\s?/, ''));
    const t = negritoHtml(titulo || tipo);
    if (dobra) out.push(`<details class="callout callout-${tipo}"${dobra === '+' ? ' open' : ''}>`, `<summary>${t}</summary>`, '', ...corpo, '', '</details>', '');
    else out.push(`<aside class="callout callout-${tipo}">`, `<p class="callout-title">${t}</p>`, '', ...corpo, '', '</aside>', '');
  }
  return out.join('\n');
}

/** Texto puro para o índice de busca. */
export const textoPuro = (md) =>
  md
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`#>|]/g, ' ')
    .replace(/-{3,}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
