# Apostila PMLE

Apostila interativa em **React + shadcn/ui** (Vite, Tailwind v4, Base UI). Site estático de estudo para a trilha **Professional Machine Learning Engineer** do Google Cloud, com a identidade visual da ATRA. Sem login, sem backend: o progresso (flashcards, simulados, questões, cursos concluídos) fica no `localStorage` de cada navegador.

O que tem:

- **Trilha**: os 15 cursos, com duração, roteiro item a item e as questões do exame ligadas a cada um.
- **Curso 1** (Introduction to AI and ML on Google Cloud): resumo de cada aula, transcrição original, glossário, revisão, flashcards e simulado por módulo, além das armadilhas e do cheat-sheet.
- **Exame**: guia do exame cruzado com a trilha e banco de 283 questões com filtros por seção, curso, dificuldade e situação, em modo estudo ou modo prova.
- **Busca** em todo o material.

## Estrutura

```
content/            ← dados (Markdown), separados do código
  cursos/cursos.json   cursos que já têm material e de onde vêm no vault
  cursos/01-…/         hub, armadilhas, aulas/ (R - resumo, T - transcrição), modulos/modulo-N/
  trilha/              trilha.md e cronograma.md
  exame/               guia.md, banco.md, secao-1..6.md
scripts/
  sync-vault.mjs       copia o material do vault Obsidian para content/
  build.mjs            converte content/ em public/data/*.json (roda antes do dev e do build)
src/                ← aplicação React
  components/ui/       componentes shadcn/ui (sidebar, card, tabs, select, dialog, command…)
  components/          menu lateral, cabeçalho com busca (Ctrl K), Markdown, quiz
  pages/               início, trilha, curso, módulo, aula, flashcards, simulados, banco, busca
  lib/                 tipos dos dados, progresso local, tema
public/             ← logo da ATRA e data/ gerado
dist/               ← site publicável (saída do npm run build)
```

Cores no tema do shadcn (`src/index.css`): azul ATRA `#0D99FF`, azul de texto `#009EDB`, laranja `#F29113` e card `#E8F6FF`, com um azul mais escuro (`#0071CE`) para botões e links manterem contraste. Logo tirada de atra.com.br.

## Uso

```bash
npm run sync    # copia do vault (padrão ~/Documents/Brain; ou VAULT=/caminho npm run sync)
npm install
npm run dev     # gera os dados e abre em http://localhost:5173
npm run build   # gera os dados e o site final em dist/
```

## Como incorporar material novo

**Nova aula do curso 1.** Salve no vault os arquivos `R - AAAA-MM-DD-mMM-aAA-tema.md` (resumo) e `T - …` (transcrição) na pasta de aulas do curso, acrescente a linha na tabela do módulo no hub, e rode `npm run sync && npm run build`. O build descobre módulo e número da aula pelo nome do arquivo.

**Material de um novo curso da trilha.** Acrescente uma entrada em `content/cursos/cursos.json` com a chave do número do curso:

```json
"2": {
  "slug": "02-prepare-data-ml-apis",
  "nomeCurto": "Prepare Data for ML APIs",
  "vault": {
    "hub": "10-notes/<hub-do-curso>.md",
    "aulas": "50-aulas/<pasta-das-aulas>",
    "modulos": "10-notes/<prefixo>-modulo-{n}-{tipo}.md",
    "armadilhas": "10-notes/<armadilhas>.md"
  }
}
```

Todos os campos de `vault` são opcionais. Depois, `npm run sync && npm run build`. As páginas do curso, os módulos, o menu lateral e a trilha se montam sozinhos a partir dos dados. Também dá para editar direto os arquivos em `content/` sem usar o vault.

Formatos que o build entende:

- **Flashcards**: uma tabela `| Pergunta | Resposta |` sob cada `## Bloco …`.
- **Simulado**: questões `**N.** enunciado` com alternativas `- A) …` (ou `A) … · B) …` na mesma linha), seguidas de `# Gabarito comentado` com tabela `| N | **B** |` e/ou comentários `**N · B** — …` ou `**N. B — …**`. Questão sem alternativas vira questão aberta (o aluno se autoavalia).
- **Banco do exame**: `#### Q63 · 1.1 · curso 3 · fácil`, alternativas `- **A.** …` e um callout `> [!success]- Resposta: **A**` com a explicação.
- **Módulos do hub**: tabelas sob `### Módulo N — Título`.

Seções de controle pessoal (progresso da turma por pessoa, datas individuais, log) são removidas no build; veja `DROP_HEADINGS` em `scripts/build.mjs`.

## Publicar

`npm run build` gera a pasta `dist/`, que é o site inteiro. Qualquer hospedagem estática serve: as rotas usam `#/` e os caminhos são relativos, então funciona também em subpasta.

- **Vercel**: importe o repositório; o `vercel.json` já define build e pasta `dist`.
- **Netlify**: o `netlify.toml` já define build e pasta de publicação.
- **GitHub Pages**: publique a pasta `dist/` (por exemplo com `actions/upload-pages-artifact`).
- **Cloud Storage / Firebase Hosting**: suba o conteúdo de `dist/`.
