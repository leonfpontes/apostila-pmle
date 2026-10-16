---
title: "Google AI/ML — Módulo 3: Flashcards"
aliases: ["flashcards do Módulo 3 (Google AI/ML)"]
tags: [aula, trabalho]
type: note
area: trabalho
created: 2026-10-09
updated: 2026-10-09
status: evergreen
fonte: mista
confianca: media
papel: derivada
indexar: true
summary: Deck de flashcards do Módulo 3 (Generative AI e foundation models) da certificação Google, aulas 3.1 a 3.9, em blocos temáticos de 10 a 15 minutos para revisão espaçada.
parte_de: "[[google-ai-ml-modulo-3-revisao]]"
related: ["[[google-ai-ml-modulo-3-glossario]]", "[[google-ai-ml-modulo-3-simulado]]"]
---

# Google AI/ML — Módulo 3: Flashcards

Material de estudo do Módulo 3 (Generative AI e foundation models) do curso [[curso-intro-ai-ml-google-cloud]], cobrindo aulas 3.1 a 3.9. Faz parte de [[google-ai-ml-modulo-3-revisao]]; os outros dois materiais do módulo são [[google-ai-ml-modulo-3-glossario]] e [[google-ai-ml-modulo-3-simulado]].

100 cartões das aulas **3.1 a 3.9**, em **seis blocos temáticos**. Cada bloco é
uma sessão de 10–15 minutos.

**Como usar:** cubra a coluna da direita, responda em voz alta, confira. Marque o
que errou e repita só esses no dia seguinte. Os blocos **3, 4 e 5** são os mais
densos — se o tempo for curto, comece por eles.

---

## Bloco 1 — Gen AI, stack e timeline (14 cartões)

| Pergunta | Resposta |
|---|---|
| Defina gen AI | Tipo de IA que **gera conteúdo e toma ações** por você |
| Quais as **seis** modalidades de conteúdo gerado? | **Texto, código, imagem, fala, vídeo e 3D** |
| O que é um **prompt**? | **Uma pergunta ou uma instrução** em linguagem natural |
| Como a gen AI toma ação? | **Através de AI agents** |
| A expressão exata para essa ação | **Autonomous, goal-oriented action** em seu nome |
| Quatro exemplos de criação de conteúdo | Imagens e vídeos · resumir notas de reunião · relatórios de pesquisa · chatbots de Q&A |
| Quatro exemplos de ação autônoma | Automatizar workflows · planejar e reservar viagens · agendar compromissos · auxiliar em diagnósticos clínicos |
| O que aconteceu em **2017**? | Pesquisa do **Transformer** |
| O que é o Transformer? | **Arquitetura de rede neural de deep learning** que **sustenta todas as aplicações modernas de gen AI** |
| O que aconteceu em **2023**? | A era **Gemini**, nativamente multimodal |
| O que o Gemini expande? | O conceito de **AGI** |
| O que aconteceu em **2026**? | **Abordagem centrada em plataforma** para **IA agêntica** |
| As três camadas do **stack de gen AI** | **Foundation models → AI development → AI applications** |
| Sobre o que os foundation models são construídos? | Sobre a **infraestrutura de IA** do Google |

## Bloco 2 — Foundation models (18 cartões)

| Pergunta | Resposta |
|---|---|
| Em que **três sentidos** um foundation model é "grande"? | **Parâmetros** · **dados de treinamento** · **poder computacional** |
| O que é **training**? | Aprender a partir de **conteúdo existente** |
| O que os parâmetros indicam? | Capacidade de **aprender padrões complexos e armazenar informação** |
| De quanto para quanto foram os parâmetros? | De **milhões** para **trilhões** |
| ⭐ **Gemini Pro** | O **mais capaz**; **raciocínio avançado** |
| ⭐ **Gemini Flash** | **Velocidade e baixa latência**; alto volume **tempo real** |
| ⭐ **Gemini Flash-Lite** | O **mais econômico**; alto volume **sem urgência** |
| Os três em uma palavra cada | Pro = **capacidade** · Flash = **velocidade** · Flash-Lite = **custo** |
| **Nano Banana** | **Imagem** |
| **Chirp** | **Voz** |
| **Veo** | **Vídeo** |
| **Lyria** | **Música** |
| **Embeddings models** | **Busca semântica** e **representação de dados** |
| O que um modelo multimodal faz? | **Processa e gera** em várias modalidades: texto, imagens, áudio, vídeo |
| O exemplo multimodal da aula | **Vídeo de receita** a partir da **foto de um cookie** |
| O que a compreensão holística destrava? | **Contextos complexos** → **raciocínio mais humano** → **ações no mundo real** |
| Os **quatro usos** do Gemini em negócios | **Extraction → analysis → seeking → content creation** |
| Exemplo de *information analysis* | **Categorizar despesas de um recibo** |

## Bloco 3 — Tipos de modelo e customização (16 cartões)

| Pergunta | Resposta |
|---|---|
| **Pre-trained** × **fine-tuned** | Gerais/dataset **grande** × específicos/dataset **muito menor** |
| Qual a analogia usada? | **K-12** — base ampla, depois especialização |
| A analogia **estendida** (aula 3.5) | **K-12** = foundation · **faculdade de medicina** = fine-tuning · **checar pesquisas** = grounding |
| O que é **horizontal AI**? | **Foundation models / LLMs**; desafios **comuns entre indústrias** |
| O que é **vertical AI**? | **Fine-tuned para indústrias**; nichos e problemas especializados |
| Exemplo de vertical AI | **Diagnóstico de doenças** |
| As três categorias da horizontal AI | **Content creation** · **information synthesis** · **conversation generation** |
| As **três categorias de modelo** no Agent Studio | **Google**, **partner** e **open** |
| O que são **partner models**? | **Proprietários de empresas terceiras**, como a **Anthropic** |
| ⭐ O que são **open models**? | **Pesos treinados publicamente liberados** (= **Open Weight**) |
| As três abordagens de acesso aos modelos (3.2) | **Console UI** (no-code) · **Gen AI APIs** (low-code) · **SDKs** (code-based) |
| Qual ferramenta acompanha as APIs? | **cUrl** |
| Quais linguagens nos SDKs? | **Python** e **Java** |
| Quais notebooks a 3.2 cita? | **Colab Enterprise** e **Workbench** |
| ⭐ O **prompt design** altera os parâmetros? | **Não** — guia o modelo sobre **como reagir** |
| Os dois benefícios do prompt design | **Experimentação rápida** e **não exigir ML nem código** |

## Bloco 4 — Prompt engineering (20 cartões)

| Pergunta | Resposta |
|---|---|
| ⚠️ **Prompt design** × **prompt engineering** | *Design* = **criar**; *engineering* = processo **ITERATIVO** |
| ⭐ Os **três componentes** de um prompt | **Task**, **context**, **examples** |
| ⭐ Qual é **obrigatório**? | Só a **task** |
| O que é **zero-shot prompting**? | **Só a tarefa**, sem exemplos |
| O que é **few-shot prompting**? | **Com exemplos** |
| Os **dois aspectos** de um prompt eficaz | **Content** e **structure** |
| O que "structure" cobre? | **Ordem**, **labels** e **delimitadores** |
| As cinco dicas de prompt | Direto e específico · estrutura · iterar e refinar · técnicas avançadas · o básico |
| As três técnicas avançadas citadas | **Few-shot**, **chain-of-thought** e **RAG** |
| Onde vai o **contexto** no Agent Studio? | **System Instructions** |
| Onde vão as **tarefas**? | Campo **Prompt** |
| Fontes de multimídia no Agent Studio | **Cloud Storage, Drive, computador local, URL, YouTube** |
| O que é um **prompt template**? | Prompt reutilizável com **variáveis substituíveis** |
| ⭐ **Temperature baixa** | **Estreita** para **típicas**; QA e **sumarização** |
| ⭐ **Temperature alta** | **Expande** para **incomuns**; conteúdo **criativo** |
| ⭐ **Top K** | Sorteia entre as **K mais prováveis**, com **chance igual** |
| ⚠️ Problema do top K | Distribuição **enviesada** gera respostas estranhas |
| ⭐ **Top P** | Sorteia do **menor subconjunto** cuja **probabilidade cumulativa** atinge P |
| Por que o top P existe? | Porque **escolher o K ótimo é difícil** |
| ⭐ O que é **ground truth**? | **Sua resposta preferida**, usada para avaliar as do modelo |

## Bloco 5 — Grounding, RAG e tuning (16 cartões)

| Pergunta | Resposta |
|---|---|
| ⭐⭐ **Grounding** × **RAG** em uma frase | **Grounding é o QUÊ; RAG é o COMO** |
| Defina **grounding** | **Conectar o modelo a fontes externas confiáveis**, verificando contra a informação mais recente |
| Defina **RAG** | **Um método para implementar o grounding** |
| Por que grounding/RAG são necessários? | Modelos **pré-treinados** dependem de dados **potencialmente desatualizados** |
| As duas fontes de grounding | **Google real-time search** e **seus próprios dados** |
| ⭐⭐ **Fine-tuning** × **grounding** | Fine-tuning = conhecimento **INTERNO** · grounding = informação **EXTERNA** |
| As três opções de tuning, do menos ao mais técnico | **Prompt design** → **parameter-efficient tuning** → **full fine-tuning** |
| Outro nome do **parameter-efficient tuning** | **Adapter tuning** |
| Quantos parâmetros o **PET** atualiza? | Um **subconjunto pequeno** |
| Quantos o **full fine-tuning** atualiza? | **Todos** |
| Onde o full fine-tuning custa mais? | Em **tuning e serving** |
| O que a Agent Platform suporta hoje? | **Supervised fine-tuning** |
| Quantos exemplos ele usa? | **Centenas de exemplos rotulados** |
| Qual a saída do tuning job? | Um **novo modelo** que **combina os parâmetros novos com o original** |
| Formato do dataset de tuning | **JSONL** — **input text** + **output text** por linha |
| Onde o modelo tunado aparece? | No **Model Registry** |

## Bloco 6 — Agentes e produtos (16 cartões)

| Pergunta | Resposta |
|---|---|
| ⭐⭐ A definição de **AI agent** | Uma **APLICAÇÃO** que combina **modelos para raciocínio**, **ferramentas** e **coordenação sofisticada** |
| A definição funcional (3 verbos) | **Conecta-se** a recursos externos · **toma ação** · **observa feedback** para **melhorar com o tempo** |
| O que é **agentic AI**? | Sistema **mais autônomo**, para **tarefas multi-etapa com múltiplos agentes** |
| A evolução em três estágios | **Chatbots → AI agents → Agentic AI proativa** |
| ⭐⭐ Os três componentes de um agente | **Model** (cérebro) · **tools** (mãos, pés e sentidos) · **orchestration layer** (sistema nervoso) |
| A dupla natureza das **tools** | **Agem** (enviar e-mail) **e percebem** (buscar o clima) |
| Quem **gerencia a sequência**? | A **orchestration layer** |
| Quem **compreende comunicação e lógica**? | O **model** |
| ⭐ O que é o **Model Garden**? | **Acessar e fazer fine-tune** de foundation models; o **"cérebro"** do agente |
| ⭐ O que é o **Agent Garden**? | **Templates pré-construídos** de agentes; caminho **low-code** |
| ⚠️ Model Garden × Agent Garden | **Modelos** (base) × **templates de agente** (desenvolvimento) |
| Os cinco componentes da Agent Platform | **Agent Studio** · **ADK** · **A2A orchestration** · **secure workspaces** · **Agent Runtime** |
| O que o **Agent Runtime** faz? | **Implantar, gerenciar e escalar**; cold starts sub-segundo, observabilidade |
| ⭐ Os três caminhos da árvore de decisão | **Out-of-the-box** (no-code) · **customizable templates** (low-code) · **custom development** (pro-code) |
| Quem usa cada caminho? | **Negócio** → no-code · **cientista de dados** → low-code · **dev** → pro-code |
| ⭐ Os dois gatilhos para sair do no-code | **Integrações profundas** e **comportamento customizado** |


## Fontes
- Notas de aula do Módulo 3 (resumos `R - ` em `50-aulas/intro-ai-ml-google-cloud/`), consolidadas no projeto Claude "Certificação Google" em 2026-10-09
