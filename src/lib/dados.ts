import { useEffect, useState } from "react"

// Leitura dos JSON de public/data/. Cada arquivo é baixado uma vez por sessão.
// Os caminhos vêm de `arquivos` em shared/contrato.js.

const cache = new Map<string, Promise<unknown>>()

export function carregar<T>(caminho: string): Promise<T> {
  if (!cache.has(caminho)) {
    cache.set(
      caminho,
      fetch(`${import.meta.env.BASE_URL}data/${caminho}`).then((r) => {
        if (!r.ok) throw new Error(`Não consegui carregar ${caminho} (${r.status})`)
        return r.json()
      })
    )
  }
  return cache.get(caminho) as Promise<T>
}

/** Carrega um JSON e devolve { dados, erro, carregando }. Passe null para não carregar nada. */
export function useDados<T>(caminho: string | null) {
  const [estado, setEstado] = useState<{ caminho: string | null; dados?: T; erro?: Error }>({ caminho })
  useEffect(() => {
    if (!caminho) return
    let ativo = true
    carregar<T>(caminho).then(
      (dados) => ativo && setEstado({ caminho, dados }),
      (erro: Error) => ativo && setEstado({ caminho, erro })
    )
    return () => {
      ativo = false
    }
  }, [caminho])
  const atual = estado.caminho === caminho
  return { dados: atual ? estado.dados : undefined, erro: atual ? estado.erro : undefined }
}
