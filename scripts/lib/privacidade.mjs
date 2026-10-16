// O site e o repositório são públicos. Estas regras tiram do conteúdo as seções
// de controle pessoal (progresso de cada colega, datas individuais, log,
// pendências de quem escreveu as notas) e a organização interna do vault.
// São aplicadas na sincronização (o texto nem chega ao repositório) e de novo
// no build, para o caso de alguém editar content/ à mão.

export const SECOES_PRIVADAS = [
  /^Onde cada um está/i,
  /^As datas do Leonardo/i,
  /^Log$/i,
  /^Como o material é registrado$/i,
  /^Dúvidas em aberto$/i,
  /^Fontes$/i,
  /^Ações \/ próximos passos$/i,
];

/** Campos do frontmatter que citam pessoas da turma. */
export const CAMPOS_PRIVADOS = /^(summary|pessoas|org):.*\n/gm;

/** Remove do Markdown as seções cujo título casa com alguma regra (e tudo abaixo delas até o próximo título do mesmo nível). */
export function removerSecoes(md, regras = SECOES_PRIVADAS) {
  const out = [];
  let nivelRemovido = 0;
  let emBlocoDeCodigo = false;
  for (const linha of md.split('\n')) {
    if (/^```/.test(linha)) emBlocoDeCodigo = !emBlocoDeCodigo;
    const titulo = !emBlocoDeCodigo && linha.match(/^(#{1,6})\s+(.*)$/);
    if (titulo) {
      const nivel = titulo[1].length;
      if (nivelRemovido && nivel <= nivelRemovido) nivelRemovido = 0;
      if (!nivelRemovido && regras.some((r) => r.test(titulo[2].trim()))) {
        nivelRemovido = nivel;
        continue;
      }
    }
    if (!nivelRemovido) out.push(linha);
  }
  return out.join('\n');
}

/** Regras completas para um arquivo de content/ (a trilha também perde o frontmatter que cita a turma). */
export function sanitizar(md, rel) {
  const ehTrilha = rel === 'trilha/trilha.md';
  return removerSecoes(ehTrilha ? md.replace(CAMPOS_PRIVADOS, '') : md);
}
