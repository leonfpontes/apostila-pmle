// Trilha: os 15 módulos ("### N. Título · duração") da seção "Roteiro completo".

export function lerTrilha(corpo) {
  const inicio = corpo.search(/^## Roteiro completo/m);
  const parte = inicio >= 0 ? corpo.slice(inicio) : corpo;
  const fim = parte.slice(3).search(/^## /m);
  const roteiro = fim >= 0 ? parte.slice(0, fim + 3) : parte;
  const modulos = [];
  for (const trecho of roteiro.split(/\n(?=### )/)) {
    const m = trecho.match(/^### (\d+)\.\s+(.*?)\s+·\s+([^\n✅]*?)\s*(✅)?\s*$/m);
    if (m) modulos.push({ n: +m[1], titulo: m[2].trim(), duracao: m[3].trim(), roteiro: trecho.slice(m[0].length).trim() });
  }
  return modulos;
}

/** O corpo da trilha sem o roteiro (o roteiro de cada módulo vira um arquivo próprio). */
export const trilhaSemRoteiro = (corpo) => corpo.replace(/## Roteiro completo[\s\S]*?(?=\n## |$)/, '');
