// Nomenclatura da turma aplicada ao texto das notas.
// As notas do vault chamam os itens da trilha de "cursos" e as partes do
// módulo 1 de "Módulo 2…6". No site, os itens da trilha são MÓDULOS e as
// partes do módulo 1 são SEÇÕES.

const maiusculaComo = (original, palavra) => (original[0] === original[0].toUpperCase() ? palavra[0].toUpperCase() + palavra.slice(1) : palavra);

/** Textos da trilha e do exame: "curso(s)" → "módulo(s)". */
export function termosDaTrilha(texto) {
  return String(texto || '')
    .replace(/\b([Cc])ursos\b/g, (m) => maiusculaComo(m, 'módulos'))
    .replace(/\b([Cc])urso\b/g, (m) => maiusculaComo(m, 'módulo'));
}

/** Textos de dentro de um módulo: "Módulo N" → "Seção N", "curso N" → "módulo N", com concordância. */
export function termosDoModulo(texto) {
  return (
    String(texto || '')
      .replace(/\b([Mm])ódulos (\**)(\d)/g, (m, c, b, n) => `${c === 'M' ? 'S' : 's'}eções ${b}${n}`)
      .replace(/\b([Mm])ódulo (\**)(\d)/g, (m, c, b, n) => `${c === 'M' ? 'S' : 's'}eção ${b}${n}`)
      .replace(/\b([Cc])ursos (\**)(\d)/g, (m, c, b, n) => `${c === 'C' ? 'M' : 'm'}ódulos ${b}${n}`)
      .replace(/\b([Cc])urso (\**)(\d)/g, (m, c, b, n) => `${c === 'C' ? 'M' : 'm'}ódulo ${b}${n}`)
      // concordância de gênero: "do Seção" → "da Seção", "nos Seções" → "nas Seções" …
      .replace(/\b([DdNn])o(s?) (\**)([Ss])eç/g, (m, a, pl, b, S) => `${a}a${pl} ${b}${S}eç`)
      .replace(/\b([Pp])elo(s?) (\**)([Ss])eç/g, (m, a, pl, b, S) => `${a}ela${pl} ${b}${S}eç`)
      .replace(/\bao(s?) (\**)([Ss])eç/g, (m, pl, b, S) => `à${pl} ${b}${S}eç`)
      .replace(/\b([Ee])ste (\**)([Ss])eç/g, (m, e, b, S) => `${e}sta ${b}${S}eç`)
      .replace(/\b([Oo]) (\**)([Ss])eção/g, (m, o, b, S) => `${o === 'O' ? 'A' : 'a'} ${b}${S}eção`)
  );
}

/** Escolhe a regra pela rota do documento: páginas de módulo usam termosDoModulo. */
export const termosPorRota = (rota, texto) => (String(rota).startsWith('#/modulo/') ? termosDoModulo(texto) : termosDaTrilha(texto));
