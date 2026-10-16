# Documentação da Apostila PMLE

Apostila interativa da trilha **Professional Machine Learning Engineer** (Google Cloud) para a turma da ATRA. Site estático em React + shadcn/ui, sem login, com o progresso salvo no navegador de cada aluno.

| Documento | Para quem | O que tem |
|---|---|---|
| [arquitetura.md](arquitetura.md) | quem vai mexer no código | camadas, fluxo de dados, contrato build ↔ site, decisões de design (SOLID) |
| [conteudo.md](conteudo.md) | quem vai incluir aulas e módulos | sincronizar o vault, formatos de nota, como entra um módulo novo |
| [design-system.md](design-system.md) | quem vai criar ou mudar telas | cores ATRA, tokens CSS, utilitários, componentes compartilhados |
| [desenvolvimento.md](desenvolvimento.md) | quem vai programar | scripts, convenções de código, receitas (página, etapa, material novo) |
| [deploy.md](deploy.md) | quem publica | CI no GitHub Actions, Vercel, outras hospedagens |

Instruções para agentes de IA (Claude Code, Codex, Cursor…) estão em [`AGENTS.md`](../AGENTS.md) e [`CLAUDE.md`](../CLAUDE.md), na raiz.

## Vocabulário

O código, os dados e a interface usam as mesmas palavras:

| Termo | Significado | Exemplo |
|---|---|---|
| **Trilha** | o Learning Path da certificação | 15 módulos, ~56 h |
| **Módulo** | um item da trilha | Módulo 1: Introduction to AI and ML on Google Cloud |
| **Seção** | uma parte de um módulo com material | Seção 3: Generative AI e foundation models |
| **Aula** | um vídeo da seção, com resumo e transcrição | Aula 5.3: Model development |
| **Material** | revisão, glossário, flashcards ou simulado de uma seção | Seção 2: Flashcards |
| **Etapa** | um passo da jornada de uma seção | estudar aulas → revisar → flashcards → simulado |
| **Seção do exame** | uma das 6 seções do guia oficial da prova | 3. Escalar protótipos em modelos de ML (18%) |

As notas do vault antigo chamam os módulos de "cursos" e as seções de "Módulo N". O build converte para o vocabulário acima (veja `scripts/lib/termos.mjs`).
