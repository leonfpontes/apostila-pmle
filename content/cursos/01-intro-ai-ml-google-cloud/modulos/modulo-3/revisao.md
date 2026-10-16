---
title: Google AI/ML — Revisão consolidada do Módulo 3 (Generative AI)
aliases: [revisao modulo 3 Google, glossario modulo 3 Google, simulado modulo 3, flashcards modulo 3 Google]
tags: [aula, trabalho]
type: note
area: trabalho
created: 2026-10-09
updated: 2026-10-09
status: evergreen
fonte: mista
confianca: media
papel: canonica
indexar: true
summary: "Material consolidado do Módulo 3 (Generative AI) da certificação Google: glossário das aulas 3.1 a 3.9, as armadilhas do módulo, as hierarquias de três camadas que o curso acumula, a escada de tuning e a árvore de decisão de agentes. Nota de entrada para revisar o módulo inteiro sem reler as nove aulas."
parte_de: "[[curso-intro-ai-ml-google-cloud]]"
related: ["[[R - 2026-10-09-m03-a09-summary]]", "[[R - 2026-10-09-m03-a07-ai-agents]]", "[[R - 2026-10-09-m03-a04-prompt-engineering]]", "[[google-ai-ml-modulo-2-revisao]]"]
---

# Google AI/ML — Revisão consolidada do Módulo 3 (Generative AI)

Material de revisão das aulas **3.1 a 3.9** do curso
[[curso-intro-ai-ml-google-cloud]]. Serve para revisar o módulo inteiro sem
reler as nove notas de aula.

> 📚 **Versão expandida (também no projeto Claude "Certificação Google"):**
> [[google-ai-ml-modulo-3-glossario]] (termos em 8 grupos),
> [[google-ai-ml-modulo-3-flashcards]] (100 cartões em 6 blocos) e
> [[google-ai-ml-modulo-3-simulado]] (30 questões com gabarito comentado).

---

## 1. As armadilhas do módulo

Estas são as sete confusões que o módulo arma — e que a prova tende a cobrar.

| # | Armadilha | Como não cair |
|---|---|---|
| 1 | **Três hierarquias de três camadas** convivem no curso | Leia **qual** stack a pergunta pede: gen AI, infraestrutura ou agente (tabela abaixo) |
| 2 | **Prompt design** × **prompt engineering** | *Design* = criar o prompt · *engineering* = o processo **ITERATIVO** de refinar |
| 3 | **Prompt design** mexe nos parâmetros? | **Não.** Ele guia *como o modelo reage*. Por isso é a opção menos intensiva da escada de tuning |
| 4 | **Grounding** × **ground truth** | *Grounding* conecta a fontes externas · *ground truth* é **sua resposta preferida**, usada para avaliar |
| 5 | **Fine-tuning** × **grounding** | Fine-tuning = conhecimento **INTERNO** · grounding = informação **EXTERNA** |
| 6 | **Model Garden** × **Agent Garden** | **Modelos** (e fine-tuning deles) × **templates de agente** low-code |
| 7 | **Open models** | "Open" = **pesos liberados** (*Open Weight*), **não** código de treinamento aberto |

> ⚠️ **Armadilha nº 1 é a mais cobrável.** As três hierarquias:

| Hierarquia | Camadas | Aula |
|---|---|---|
| **Stack de gen AI** | foundation models → AI development → AI applications | 3.1 |
| **Stack de infraestrutura** | networking and security → compute e storage → data and AI products | 2.3 |
| **Componentes de um agente** | model → tools → orchestration layer | 3.7 |

---

## 2. Glossário essencial

### Gen AI e timeline

- **Gen AI** — IA que **gera conteúdo e toma ações** por você. As duas metades contam.
- **Seis modalidades** — texto, código, imagem, fala, vídeo e 3D.
- **Prompt** — uma pergunta ou uma instrução em linguagem natural.
- **Ação autônoma** — *autonomous, goal-oriented action*, executada por **AI agents**.
- **2017** — pesquisa do **Transformer**, arquitetura de deep learning que sustenta **todas** as aplicações modernas de gen AI.
- **2023** — era **Gemini**, nativamente multimodal; expande o conceito de **AGI**.
- **2026** — abordagem **centrada em plataforma** para **IA agêntica**.

### Foundation models

- **"Grande" em três sentidos** — parâmetros, dados de treinamento, poder computacional. Parâmetros saltaram de **milhões para trilhões**.
- **Gemini Pro** — o mais capaz; raciocínio avançado. → **capacidade**
- **Gemini Flash** — velocidade e baixa latência; alto volume em tempo real. → **velocidade**
- **Gemini Flash-Lite** — o mais econômico; alto volume sem urgência. → **custo**
- **Nano Banana** (imagem) · **Chirp** (voz) · **Veo** (vídeo) · **Lyria** (música)
- **Embeddings models** — busca semântica e representação de dados.
- **Multimodal** — processa **e** gera em várias modalidades. Exemplo da aula: vídeo de receita a partir da foto de um cookie.
- **Quatro usos em negócios** — **extraction → analysis → seeking → content creation**.

### Tipos de modelo

- **Pre-trained** × **fine-tuned** — geral/dataset grande × específico/dataset muito menor. Analogia **K-12**.
- **Horizontal AI** — foundation models/LLMs; desafios **comuns entre indústrias**.
- **Vertical AI** — fine-tuned para indústrias; nichos (ex.: diagnóstico de doenças).
- **Três categorias no Model Garden** — **Google**, **partner** (ex.: Anthropic) e **open** (pesos liberados).
- **Três abordagens de acesso** — console UI (no-code) · Gen AI APIs + cUrl (low-code) · SDKs Python/Java (code-based).

### Prompt engineering

- **Três componentes** — **task, context, examples**. Só a **task** é obrigatória.
- **Zero-shot** = só a tarefa · **few-shot** = com exemplos.
- **Dois aspectos de um prompt eficaz** — **content** e **structure** (ordem, labels, delimitadores).
- **Três técnicas avançadas** — few-shot, **chain-of-thought** e **RAG**.
- **No Agent Studio** — contexto vai em **System Instructions**, tarefas vão no campo **Prompt**.
- **Prompt template** — prompt reutilizável com variáveis substituíveis.
- **Temperature** — **baixa** estreita para o típico (QA, sumarização) · **alta** expande para o incomum (criativo).
- **Top K** — sorteia entre as **K mais prováveis, com chance igual**. Problema: distribuição enviesada → resposta estranha.
- **Top P** — sorteia do **menor subconjunto cuja probabilidade cumulativa** atinge P. Existe porque escolher o K ótimo é difícil.
- **Ground truth** — **sua resposta preferida**, referência de avaliação.

### Grounding, RAG e tuning

> 💡 **A frase para decorar:** *grounding é o **quê**, RAG é o **como**.*

- **Grounding** — conectar o modelo a **fontes externas confiáveis**. Duas fontes: **Google real-time search** e **seus próprios dados**.
- **RAG** — **um método** para implementar o grounding.
- **Por quê** — modelos pré-treinados dependem de dados potencialmente **desatualizados**.
- **Analogia estendida (3.5)** — K-12 = foundation · faculdade de medicina = fine-tuning · checar as pesquisas = grounding.
- **Escada de tuning**, do menos ao mais intensivo: **prompt design → parameter-efficient tuning → full fine-tuning**.
- **Parameter-efficient tuning** (= **adapter tuning**) — atualiza um **subconjunto pequeno**.
- **Full fine-tuning** — atualiza **todos**; mais caro em **tuning e serving**.
- **Supervised fine-tuning** — o que a Agent Platform suporta hoje; **centenas de exemplos rotulados**; dataset **JSONL** (input text + output text); saída é um **novo modelo** no **Model Registry**.

### Agentes

- **AI agent** — uma **APLICAÇÃO** que combina **modelos para raciocínio**, **ferramentas** e **coordenação sofisticada**.
- **Funcionalmente** — conecta-se a recursos externos · toma ação · observa feedback para **melhorar com o tempo**.
- **Agentic AI** — sistema mais autônomo, para tarefas **multi-etapa com múltiplos agentes**.
- **Evolução** — **chatbots → AI agents → agentic AI proativa**.
- **Três componentes** — **model** (cérebro) · **tools** (**mãos, pés e sentidos**) · **orchestration layer** (sistema nervoso, gerencia a sequência).
- **Model Garden** — acessar **e fazer fine-tune** de foundation models; o "cérebro".
- **Agent Garden** — **templates pré-construídos**; caminho **low-code**.
- **Agent Platform** — Agent Studio · ADK · A2A orchestration · secure workspaces · **Agent Runtime** (implantar, gerenciar e escalar; cold starts sub-segundo).

---

## 3. A árvore de decisão de agentes

| Caminho | Perfil | Quando |
|---|---|---|
| **Out-of-the-box** (no-code) | Pessoa de negócio | O caso de uso cabe no pronto |
| **Customizable templates** (low-code) | Cientista de dados | Precisa ajustar o comportamento |
| **Custom development** (pro-code) | Desenvolvedor | Precisa controle total |

> ⚠️ **Os dois gatilhos para sair do no-code:** **integrações profundas** e
> **comportamento customizado**.

---

## 4. Nuances que a aula 3.9 introduziu

A aula de Summary não é só recapitulação — ela muda três formulações:

1. **Model Garden ganhou um segundo verbo.** A 3.8 dizia apenas *accessing*; a
   3.9 diz *"accessing **and fine-tuning** foundation models"*. Use a versão com
   os dois verbos.
2. **Gemini Notebook aparece ao lado do app**, não dentro dele: *"both Gemini
   Enterprise app and Gemini Notebook for end-users to develop no-code agents"*.
   Como responder cada formulação da pergunta:
   - *"Onde fica o Gemini Notebook?"* → é um componente **dentro** do Gemini
     Enterprise app (3.3 e 3.8).
   - *"Para que serve?"* → ferramenta **no-code para end-users** desenvolverem
     agentes (3.9).
3. **A 3.9 abrevia tools como "hands and feet"**, omitindo os sentidos. A
   definição canônica é a da **3.7**: **mãos, pés e sentidos** — as ferramentas
   tanto **agem** quanto **percebem**.

---

## 5. Roteiro de revisão

| Ordem | O que fazer | Tempo |
|---|---|---|
| 1 | Ler a tabela de armadilhas (seção 1) e as três hierarquias | 10 min |
| 2 | Rodar os blocos **3, 4 e 5** dos flashcards (os mais densos) | 40 min |
| 3 | Ler a seção 4 (nuances da 3.9) | 5 min |
| 4 | Fazer o simulado de 30 questões sem consultar | 35 min |
| 5 | Conferir o gabarito comentado; nas questões ⚠️ erradas, voltar à armadilha correspondente | 20 min |

**Meta no simulado: 24/30 (80%).** Abaixo de 18, refazer os flashcards antes de
repetir.

---

## 6. Dúvidas em aberto

- **Chain-of-thought** — nomeado na 3.3 como técnica avançada, **nunca
  desenvolvido** em 3.4, 3.5, 3.7 ou 3.8. Encerrado como menção solta ao fim do
  módulo expositivo.
- **ADK** — a sigla nunca é expandida no curso.
- **BigQuery ML code-based × low-code** — esperado na aula 4.1.

---

## Fontes

- Notas de aula 3.1 a 3.9 do curso [[curso-intro-ai-ml-google-cloud]]
- Material consolidado do módulo anterior: [[google-ai-ml-modulo-2-revisao]]
