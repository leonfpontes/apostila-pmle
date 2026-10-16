# Desenvolvimento

## Scripts

| Comando | O que faz |
|---|---|
| `npm install` | instala as dependências |
| `npm run sync` | copia o conteúdo do vault (`~/Documents/Brain` ou `VAULT=…`) para `content/` |
| `npm run data` | gera `public/data/*.json` a partir de `content/` |
| `npm run dev` | gera os dados e sobe o Vite em http://localhost:5173 |
| `npm run build` | gera os dados, checa os tipos e cria o site em `dist/` |
| `npm run preview` | serve o `dist/` localmente |
| `npm run lint` | oxlint |

Antes de um commit: `npm run build && npm run lint`.

## Convenções de código

- **Língua.** Nomes de domínio, componentes e funções em português, com o vocabulário de [README.md](README.md#vocabulário). Termos técnicos consagrados ficam em inglês (`hook`, `props`, `render`). Componentes do shadcn mantêm os nomes originais.
- **Nada de strings de rota.** Rotas, ids e arquivos vêm de `shared/contrato.js` (`rotas.secao(n, s)`, `docIds.aula(n, id)`, `arquivos.flashcards(n, s)`).
- **Nada de localStorage direto.** Leia com `useProgresso()` e escreva com os métodos de `progresso` (`marcarAula`, `registrarCartao`…). Chaves vêm de `ProgressStore.chaves`.
- **Lógica fora da tela.** Regra de negócio vai para `src/domain/`; estado de interface complexo vai para um hook em `features/<area>/use-*.ts`; o componente só desenha.
- **Reaproveitar antes de criar.** Procure em `components/shared/` e nos utilitários CSS (`kicker`, `titulo-bloco`, `card-interativo`…). Um padrão visual repetido duas vezes vira componente ou utilitário.
- **Cores e medidas por token.** Nada de hex ou `max-w-[…]` solto; use os tokens de `index.css`.
- **Funções pequenas, nomes que dizem o que fazem**, comentário só para explicar o porquê.
- **Constantes nomeadas** em vez de números mágicos (`META_SIMULADO`, `MINIMO_PARA_PRONTIDAO`).

## Receitas

### Página nova

1. Gerador da rota em `shared/contrato.js` (e o tipo em `contrato.d.ts`).
2. Componente em `src/pages/`, começando com `<Pagina>` + `<CabecalhoDaPagina>` e `useTituloDaPagina`.
3. Linha em `src/app/rotas.tsx`.
4. Se for para o menu, um item em `GRUPOS` (`components/layout/menu-lateral.tsx`).

### Etapa nova na jornada da seção

1. Em `domain/jornada/etapas.ts`, crie `class EtapaX extends Etapa` com `id`, `titulo`, `descricao`, `feito`, `total`, `destino` e `detalhe` (e `concluida`, se a regra for diferente de `feito >= total`).
2. Registre a fábrica em `FABRICAS_DE_ETAPAS` (`jornada.ts`), na posição da ordem desejada.
3. Acrescente o ícone em `features/jornada/icones.ts`.

Roteiro da seção, painel de progresso, menu e "próximo passo" passam a considerar a etapa sem outras mudanças.

### Material novo por seção (ex.: mapa mental)

1. Inclua o tipo em `TIPOS_MATERIAL` (`shared/contrato.js` e `.d.ts`) e o rótulo em `ROTULO_MATERIAL` (`domain/tipos.ts`).
2. Se precisar de estrutura própria, crie o leitor em `scripts/lib/parsers/` e trate o tipo no `build.mjs`; se for Markdown livre, ele já é publicado como documento.
3. Crie a página e a rota (receita acima).

### Formato novo de nota

Crie um leitor em `scripts/lib/parsers/<formato>.mjs` que recebe o corpo da nota e devolve dados; chame-o do `build.mjs`. Leitores não gravam arquivos nem conhecem rotas: recebem o `ResolvedorDeLinks` quando precisam resolver links.

## Testes manuais antes de publicar

- Fluxo de um aluno novo: Início → Comece aqui → primeira aula → concluir → flashcards → simulado.
- Banco de questões: filtro, rodada de 10, modo prova, resultado.
- Busca: Ctrl K e a página de busca.
- Meu progresso: exportar e importar.
- Tema escuro e largura de celular sem rolagem horizontal.
