// Resolve os [[wikilinks]] do Obsidian para rotas do site.
// Cada nota do vault é registrada com a rota da página que a publica; links
// para notas que não estão no site viram texto simples.

export class ResolvedorDeLinks {
  #rotas = new Map(); // nome da nota no vault → "#/rota"
  #titulos = new Map(); // nome da nota no vault → título (rótulo de [[link]] sem alias)

  registrar(nomeDaNota, rota, titulo) {
    this.#rotas.set(nomeDaNota, rota);
    if (titulo) this.#titulos.set(nomeDaNota, titulo);
  }

  /** Troca [[nota|rótulo]] e [[nota#título]] por links Markdown. */
  resolver(texto) {
    return String(texto).replace(/\[\[([^\]]+?)\]\]/g, (_, conteudo) => {
      const partes = conteudo.split(/\\?\|/);
      const alvo = partes[0].split('#')[0].trim();
      const rotulo = (partes[1] ?? this.#titulos.get(alvo) ?? partes[0].split('#').pop()).trim();
      const rota = this.#rotas.get(alvo);
      return rota ? `[${rotulo}](${rota})` : rotulo;
    });
  }
}
