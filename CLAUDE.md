# CLAUDE.md

@AGENTS.md

## Notas específicas para o Claude Code

- **Responda em português do Brasil.** O dono do projeto e a turma são brasileiros; interface, documentação e mensagens de commit no corpo também em português.
- **Comece pela documentação.** Para qualquer mudança além de um ajuste pontual, leia `doc/arquitetura.md` e o documento da área (conteúdo, design system, desenvolvimento).
- **Conteúdo novo de aula** quase sempre é: atualizar o vault, `npm run sync`, `npm run dev`, conferir a página e commitar `content/` + `public/data/`. Veja `doc/conteudo.md`.
- **Verificação visual.** Use o navegador do app (preview do Vite, configuração `apostila` em `.claude/launch.json`) para conferir as telas mudadas, no claro, no escuro e em 375 px.
- **Limpe o progresso de teste.** Depois de testar no navegador, apague a chave `pmle:v2` do localStorage.
- **Commits.** Pequenos e descritivos, em português. Não faça push nem crie PR sem pedido explícito.
- **Publicação.** O deploy é automático na Vercel a cada push na `main` (veja `doc/deploy.md`); confirme o CI verde depois do push.
