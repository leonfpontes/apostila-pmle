# Apostila PMLE

Apostila interativa da trilha **Professional Machine Learning Engineer** (Google Cloud) da turma da ATRA: resumos de aulas, glossários, flashcards, simulados por seção e um banco de 283 questões no estilo do exame. Sem login: o progresso fica no navegador de cada aluno.

Feito com React + Vite + Tailwind + shadcn/ui, nas cores da ATRA. O conteúdo é Markdown em `content/`, separado do código.

## Começar

```bash
npm install
npm run dev      # http://localhost:5173
```

Para incluir aulas novas a partir do vault Obsidian: `npm run sync && npm run dev` (detalhes em [doc/conteudo.md](doc/conteudo.md)).

## Documentação

- [doc/README.md](doc/README.md): índice e vocabulário (trilha, módulo, seção, aula)
- [doc/arquitetura.md](doc/arquitetura.md): camadas, fluxo de dados e decisões de design
- [doc/conteudo.md](doc/conteudo.md): como incluir aulas e módulos
- [doc/design-system.md](doc/design-system.md): cores ATRA, tokens, utilitários e componentes
- [doc/desenvolvimento.md](doc/desenvolvimento.md): scripts, convenções e receitas
- [doc/deploy.md](doc/deploy.md): CI e Vercel
- [AGENTS.md](AGENTS.md) e [CLAUDE.md](CLAUDE.md): instruções para agentes de IA
