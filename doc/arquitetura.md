# Arquitetura

## Visão geral

```
vault Obsidian ──sync──▶ content/ (Markdown) ──build──▶ public/data/*.json ──▶ site React (src/)
                         └ dados, versionados          └ gerado              └ dist/ publicado
```

1. **`npm run sync`** copia as notas do vault para `content/`, já sem as seções privadas.
2. **`npm run data`** lê `content/` e grava os JSON em `public/data/` (roda sozinho antes do `dev` e do `build`).
3. **O site** baixa esses JSON sob demanda e renderiza tudo no navegador. Não há servidor nem banco de dados.

## Pastas

```
shared/contrato.js      rotas, ids de documentos e nomes de arquivos: o único acordo entre build e site
scripts/
  build.mjs             orquestra a geração dos dados (só coordena; não tem regra de parsing)
  sync-vault.mjs        copia do vault para content/
  lib/fs.mjs            caminhos e leitura/escrita de arquivos
  lib/privacidade.mjs   o que nunca sai do vault (progresso da turma, log, pendências pessoais)
  lib/markdown.mjs      frontmatter, tabelas, callouts do Obsidian, texto puro
  lib/termos.mjs        nomenclatura: cursos → módulos, "Módulo N" → seção N
  lib/links.mjs         ResolvedorDeLinks: [[wikilinks]] → rotas do site
  lib/publicador.mjs    Nota, Publicador (grava documentos) e IndiceDeBusca
  lib/parsers/*.mjs     um leitor por formato: trilha, módulo, flashcards, simulado, banco
src/
  main.tsx              providers (tema, tooltip, roteador)
  app/                  App (layout + carga do site.json), tabela de rotas
  domain/               regras de negócio, sem React de tela
    tipos.ts            tipos dos dados e vocabulário
    progresso.ts        ProgressStore: todo acesso ao localStorage
    jornada/etapas.ts   classe abstrata Etapa e as etapas concretas
    jornada/jornada.ts  JornadaDaSecao, próximo passo, para onde ir depois da aula
    exame.ts            filtros, sorteio de rodadas e prontidão do banco do exame
  features/             blocos de tela com estado próprio
    quiz/               useQuiz (lógica) + Quiz, Questao, ResultadoDoQuiz (telas)
    flashcards/         useTreino (lógica) + Treino, CartaoGiratorio (telas)
    jornada/            RoteiroDaSecao, ícones das etapas
    secao/              useSecaoDaRota, migalhas, AbasDaSecao
  components/
    ui/                 componentes do shadcn/ui (não editar à mão; ver design-system.md)
    shared/             peças reutilizáveis da apostila (Pagina, Destaque, CardLink…)
    layout/             MenuLateral, Cabecalho, BuscaRapida
  pages/                uma página por rota, montada com as peças acima
  lib/                  utilitários sem regra de negócio (dados, texto, busca, tema, site)
  hooks/                hooks genéricos (atalho de busca, tema, mobile)
```

## Fluxo de uma página

`rotas.tsx` escolhe a página → a página lê parâmetros (`useSecaoDaRota`) → baixa o JSON (`useDados` + `ComDados` cuida de carregando/erro) → calcula o estado com o domínio (`JornadaDaSecao`, `prontidao`…) → monta a tela com `components/shared` e `features`.

O progresso é reativo: `useProgresso()` assina o `ProgressStore`; qualquer escrita (`progresso.marcarAula(...)`) atualiza todas as telas que dependem dele.

## Decisões de design

**Contrato único (`shared/contrato.js`).** Rotas como `/modulo/1/secao/2/flashcards`, ids como `m1-aula-5.3` e arquivos como `flashcards/m1-s2.json` são gerados por funções desse arquivo, importado pelo build (Node) e pelo site (TypeScript, via `contrato.d.ts`). Mudar uma URL é mudar uma linha.

**SOLID, na prática deste projeto:**

- *Responsabilidade única.* Cada leitor de nota está no próprio arquivo; `build.mjs` só coordena. No site, a lógica do quiz e dos flashcards está em hooks (`useQuiz`, `useTreino`) e as telas só desenham.
- *Aberto/fechado.* A jornada de uma seção é uma lista de fábricas (`FABRICAS_DE_ETAPAS`). Uma etapa nova é uma classe nova registrada na lista; nada mais muda. O menu lateral funciona igual: itens fixos são dados em `GRUPOS`.
- *Substituição (Liskov).* Toda etapa estende `Etapa` e pode ser usada onde uma `Etapa` é esperada (roteiro, painel de progresso, próximo passo). As subclasses só especializam `concluida`, `destino` e `detalhe`.
- *Segregação de interfaces.* Componentes recebem só o que usam (`Destaque` recebe título, texto e ação, não a jornada inteira).
- *Inversão de dependência.* `ProgressStore` recebe o armazenamento no construtor (o navegador passa `localStorage`; um teste pode passar um objeto em memória). Os leitores do build recebem o `ResolvedorDeLinks` em vez de criá-lo.

**Herança e composição.** Há herança onde o domínio é uma hierarquia de verdade (`Etapa` → `EtapaAulas`, `EtapaRevisao`, `EtapaFlashcards`, `EtapaSimulado`). Na interface, o reaproveitamento é por composição, como manda o React: `Pagina` + `CabecalhoDaPagina` em toda página, `Destaque` como base do "próximo passo" e dos avisos, `CardLink` para todo card clicável, `PaginaDeDocumento` para todo Markdown.

**Privacidade em duas camadas.** O repositório e o site são públicos. `privacidade.mjs` é aplicado na sincronização (o texto não chega ao Git) e de novo no build. Links internos da ATRA (Drive, apresentações) nunca vão para `materiais.json`.

**Sem login.** O progresso fica no `localStorage` (chave `pmle:v2`). "Meu progresso" exporta e importa um arquivo para levar o progresso entre dispositivos.

**HashRouter.** As rotas ficam depois de `#/`, então o site roda em qualquer hospedagem estática e em subpasta, sem configurar rewrites.
