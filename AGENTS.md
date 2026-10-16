# AGENTS.md

Instruções para agentes de IA que trabalham neste repositório (Claude Code, Codex, Cursor, Copilot…). Para Claude Code, veja também [CLAUDE.md](CLAUDE.md).

## O projeto

Apostila interativa da trilha **Professional Machine Learning Engineer** (Google Cloud) da turma da ATRA. Site estático em **React 19 + Vite + Tailwind v4 + shadcn/ui (Base UI)**, sem login, público. O conteúdo vem de notas Markdown (`content/`), convertidas em JSON por `scripts/build.mjs`.

Documentação completa em [`doc/`](doc/README.md). Leia antes de mudar algo grande:
[arquitetura](doc/arquitetura.md) · [conteúdo](doc/conteudo.md) · [design system](doc/design-system.md) · [desenvolvimento](doc/desenvolvimento.md) · [deploy](doc/deploy.md).

## Comandos

```bash
npm install
npm run sync     # vault Obsidian → content/ (precisa do vault local; VAULT=/caminho)
npm run dev      # gera public/data e sobe http://localhost:5173
npm run build    # dados + tsc + vite build → dist/  (rode antes de concluir qualquer mudança)
npm run lint     # oxlint
```

## Regras que não podem ser quebradas

1. **Privacidade.** Repositório e site são públicos. Nunca publique nomes de colegas da turma, progresso individual, links internos da ATRA (Drive, apresentações) ou dados pessoais. Seções privadas são removidas por `scripts/lib/privacidade.mjs`; acrescente lá qualquer seção nova desse tipo. Antes de um commit: `grep -rE "<nomes>" content public src` não deve achar nada.
2. **Contrato único.** Rotas, ids de documentos e nomes de arquivos de dados só vêm de `shared/contrato.js`. Não escreva `"/modulo/..."` ou `"docs/..."` à mão.
3. **Progresso só pelo `ProgressStore`** (`src/domain/progresso.ts`). Nada de `localStorage` direto para progresso.
4. **Vocabulário.** Trilha → módulos → seções → aulas e materiais. "Seção do exame" é outra coisa (as 6 do guia oficial). Não use "curso" na interface.
5. **Dados gerados.** `public/data/` é gerado por `npm run data`. Não edite à mão; edite `content/` ou o build.
6. **shadcn.** Não edite `src/components/ui/` para mudar visual; componha em `src/components/shared/`. Novos componentes: `npx shadcn@latest add <nome>`.

## Onde colocar cada coisa

| Mudança | Lugar |
|---|---|
| Regra de negócio (jornada, metas, exame) | `src/domain/` |
| Estado de uma tela complexa | hook em `src/features/<área>/use-*.ts` |
| Peça visual usada em mais de um lugar | `src/components/shared/` |
| Página | `src/pages/` + rota em `src/app/rotas.tsx` + gerador em `shared/contrato.js` |
| Cor, largura, espaçamento recorrente | token ou `@utility` em `src/index.css` |
| Formato novo de nota | `scripts/lib/parsers/` |
| Texto do conteúdo | `content/` (ou no vault + `npm run sync`) |

## Estilo de código

- Português nos nomes de domínio e componentes; termos técnicos consagrados em inglês.
- SOLID: uma responsabilidade por arquivo; extensão por novas classes/itens de lista (ex.: `FABRICAS_DE_ETAPAS`, `GRUPOS` do menu), não por `if` espalhado.
- Herança só onde há hierarquia real (`Etapa`); na interface, composição.
- Reaproveite componentes e utilitários CSS existentes antes de criar novos; nada de hex ou larguras soltas.
- Comentários explicam o porquê, não o quê.
- Interface em português do Brasil, frases curtas, voz da turma.

## Antes de concluir

- `npm run build` e `npm run lint` sem erros.
- Testar no navegador: tema claro e escuro, largura de 375 px sem rolagem horizontal, a jornada afetada (ex.: aula → concluir → próximo passo).
- Se mudou formato de dados, rotas ou componentes compartilhados, atualize `doc/`.
