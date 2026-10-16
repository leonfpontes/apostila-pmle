# Conteúdo: como incluir aulas e módulos

O conteúdo vive em Markdown em `content/`, separado do código. O caminho normal é escrever no vault Obsidian e sincronizar; também dá para editar `content/` à mão.

## Rotina para uma aula nova

1. No vault, salve as duas notas da aula na pasta de aulas do módulo:
   - `R - AAAA-MM-DD-mSS-aAA-tema.md`: resumo de estudo em português;
   - `T - AAAA-MM-DD-mSS-aAA-tema.md`: transcrição original (opcional).
   `mSS` é o número da seção e `aAA` o da aula (ex.: `m05-a03` = aula 5.3).
2. No hub do módulo, acrescente a linha da aula na tabela da seção (`### Módulo N — Título`, no padrão antigo das notas).
3. Rode:
   ```bash
   npm run sync   # copia do vault (VAULT=/outro/caminho npm run sync, se o vault estiver em outro lugar)
   npm run dev    # gera os dados e abre o site
   ```
4. Confira a aula no site e faça o commit de `content/` e `public/data/`.

O build descobre seção e número da aula pelo nome do arquivo. Menu, página da seção, jornada e busca se atualizam sozinhos.

## Um módulo novo da trilha

Acrescente uma entrada em `content/modulos/modulos.json` (a chave é o número do módulo na trilha):

```json
"2": {
  "pasta": "02-prepare-data-ml-apis",
  "nomeCurto": "Prepare Data for ML APIs",
  "vault": {
    "hub": "10-notes/<hub-do-modulo>.md",
    "aulas": "50-aulas/<pasta-das-aulas>",
    "secoes": "10-notes/<prefixo>-modulo-{n}-{tipo}.md",
    "armadilhas": "10-notes/<armadilhas>.md"
  }
}
```

Todos os campos de `vault` são opcionais. `{n}` é o número da seção e `{tipo}` é `revisao`, `glossario`, `flashcards` ou `simulado`. Depois, `npm run sync && npm run dev`. O título, a duração e o roteiro do módulo continuam vindo de `content/trilha/trilha.md`.

## Estrutura de `content/`

```
content/
  trilha/trilha.md        os 15 módulos ("### N. Título · duração") e o roteiro de cada um
  trilha/cronograma.md    plano dia a dia
  trilha/materiais.json   links da planilha da turma (só links públicos) e a meta de acerto
  exame/guia.md           guia do exame cruzado com a trilha
  exame/banco.md          como o banco de questões foi montado
  exame/secao-1..6.md     questões do exame, uma nota por seção do guia oficial
  modulos/modulos.json    módulos que já têm material e de onde vêm no vault
  modulos/01-…/
    modulo.md             hub do módulo (tabelas das seções)
    armadilhas.md         revisão final do módulo
    aulas/R - ….md        resumos
    aulas/T - ….md        transcrições
    secoes/secao-N/       revisao.md, glossario.md, flashcards.md, simulado.md
```

## Formatos que o build entende

| Material | Formato |
|---|---|
| Trilha | `### N. Título · duração` dentro de `## Roteiro completo` |
| Seções do módulo | tabelas sob `### Módulo N — Título`, linhas `\| 2.3 \| [[R - …\|Título]] ⭐⭐ \| 🎬 \| …` (as ⭐ viram relevância) |
| Ficha da aula | tabela inicial `\| \| \|` com `**Tema**` e `**Duração**` (vira o subtítulo e a duração da página) |
| Flashcards | uma tabela `\| Pergunta \| Resposta \|` sob cada `## Bloco …` |
| Simulado | questões `**N.** enunciado` com `- A) …` ou `A) … · B) …`; depois `# Gabarito comentado` com tabela `\| N \| **B** \|` e/ou comentários `**N · B** — …`. Sem alternativas = questão aberta |
| Banco do exame | `#### Q63 · 1.1 · curso 3 · fácil`, alternativas `- **A.** …`, callout `> [!success]- Resposta: **A**`, linhas `*Conceitos:*` e `*Nome atual:*` |
| Revisão, glossário, guias | Markdown livre; tabelas, callouts do Obsidian (`> [!tipo]- Título`) e `[[wikilinks]]` são convertidos |

O build avisa no terminal quando uma questão de simulado ficou sem gabarito.

## Privacidade

O site e o repositório são públicos. Nunca entram:

- as seções `Onde cada um está`, `As datas do Leonardo`, `Log`, `Como o material é registrado`, `Dúvidas em aberto`, `Fontes` e `Ações / próximos passos`;
- o `summary`, `pessoas` e `org` do frontmatter da trilha;
- links de arquivos internos da ATRA em `materiais.json` (descreva o material e use `privado` em vez de `url`).

Para proteger uma seção nova, acrescente o título em `SECOES_PRIVADAS` (`scripts/lib/privacidade.mjs`).
