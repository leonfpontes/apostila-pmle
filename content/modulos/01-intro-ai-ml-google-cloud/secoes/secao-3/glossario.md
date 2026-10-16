---
title: "Google AI/ML — Módulo 3: Glossário"
aliases: ["glossário do Módulo 3 (Google AI/ML)"]
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
summary: "Glossário consolidado do Módulo 3 (Generative AI e foundation models) da certificação Google, aulas 3.1 a 3.9: os termos e serviços do Google Cloud agrupados por tema, com a definição que a prova cobra."
parte_de: "[[google-ai-ml-modulo-3-revisao]]"
related: ["[[google-ai-ml-modulo-3-flashcards]]", "[[google-ai-ml-modulo-3-simulado]]"]
---

# Google AI/ML — Módulo 3: Glossário

Material de estudo do Módulo 3 (Generative AI e foundation models) do curso [[curso-intro-ai-ml-google-cloud]], cobrindo aulas 3.1 a 3.9. Faz parte de [[google-ai-ml-modulo-3-revisao]]; os outros dois materiais do módulo são [[google-ai-ml-modulo-3-flashcards]] e [[google-ai-ml-modulo-3-simulado]].

Todos os termos das aulas **3.1 a 3.9**, agrupados por tema. Os ⭐ são os que o
curso tratou com mais ênfase ou repetiu em mais de uma aula.

> 💡 **Os quatro pilares do módulo:** foundation models · prompt engineering ·
> tuning e grounding · agentes. Se o tempo for curto, os blocos 2, 4 e 6 são os
> que mais rendem.

---

## 1. Gen AI — conceitos de base

| Termo | Definição | Aula |
|---|---|---|
| ⭐ **Generative AI** | Tipo de IA que **gera conteúdo e toma ações** por você | 3.1, 3.9 |
| ⭐ **As seis modalidades** | **Texto, código, imagem, fala, vídeo e 3D** | 3.1 |
| **Prompt** | **Requisição em linguagem natural**: pergunta, tarefa ou instrução | 3.1, 3.3 |
| ⭐ **Autonomous, goal-oriented action** | A ação **autônoma e orientada a objetivos** que a gen AI toma **através de agentes** | 3.1 |
| **Transformer (2017)** | **Arquitetura de rede neural de deep learning** que **sustenta todas as aplicações modernas de gen AI** | 3.1 |
| **Gemini (2023)** | Modelo **nativamente multimodal**; **expande o conceito de AGI** | 3.1 |
| **AGI** | *Artificial general intelligence*; citada uma vez, com cuidado | 3.1 |
| **Agentic AI (2026)** | A fase atual, com **abordagem centrada em plataforma** | 3.1 |

## 2. Foundation models

| Termo | Definição | Aula |
|---|---|---|
| ⭐ **Foundation model** | Modelo **grande** em **três sentidos**: **parâmetros**, **dados de treinamento** e **exigência computacional**. *"The backbone of AI"* | 3.2, 3.9 |
| **Training** | Aprender a partir de **conteúdo existente**; resulta num foundation model | 3.2 |
| **Parâmetros** | Indicam a capacidade de **aprender padrões complexos e armazenar informação**; foram de **milhões a trilhões** | 3.2 |
| ⭐ **Gemini Pro** | O **mais capaz**; tarefas complexas com **raciocínio avançado** | 3.2 |
| ⭐ **Gemini Flash** | **Alta velocidade e baixa latência**; alto volume em **tempo real** (chatbots) | 3.2 |
| ⭐ **Gemini Flash-Lite** | O **mais econômico**; alto volume **sem urgência** (lote, sumarização) | 3.2 |
| **Nano Banana** | Especialista em **geração de imagem** | 3.2, 3.4 |
| **Chirp** | Especialista em **geração de voz** | 3.4 |
| **Veo** | Especialista em **processamento de vídeo** | 3.2, 3.4 |
| **Lyria** | Especialista em **composição de música** | 3.4 |
| **Embeddings models** | **Busca semântica** e **representação de dados** | 3.2 |
| ⭐ **Multimodal** | **Processa e gera** em várias modalidades: texto, imagens, **áudio**, vídeo | 3.2 |
| **Holistic comprehension** | Sintetizar múltiplas fontes **simultaneamente**; destrava **contextos complexos → raciocínio mais humano → ações no mundo real** | 3.2 |
| ⭐ **Pre-trained** | Treinado para propósitos **gerais** com dataset **grande** | 3.2 |
| ⭐ **Fine-tuned** | Treinado para objetivos **específicos** com dataset **muito menor** | 3.2 |
| ⭐ **Horizontal AI** | **Foundation models / LLMs**; capacidades amplas, desafios **comuns entre indústrias** | 3.2 |
| ⭐ **Vertical AI** | Modelos **fine-tuned para indústrias específicas**; nichos e problemas especializados | 3.2 |
| **Partner models** | **Modelos proprietários de empresas terceiras**, como a **Anthropic** | 3.4 |
| ⭐ **Open / Open Weight models** | Aqueles cujos **pesos treinados são publicamente liberados** | 3.4 |

## 3. Os quatro usos do Gemini em negócios (aula 3.2)

| Uso | O que faz |
|---|---|
| **Information extraction** | **ler texto** de imagens e vídeos |
| **Information analysis** | **analisar** o extraído (ex.: **categorizar despesas de um recibo**) |
| **Information seeking** | **responder perguntas** / gerar Q&A |
| **Content creation** | **criar histórias ou anúncios** a partir de imagens e vídeos |

## 4. Prompt engineering

| Termo | Definição | Aula |
|---|---|---|
| ⭐ **Prompt design** | O processo de **criar** prompts | 3.3 |
| ⭐ **Prompt engineering** | O processo **ITERATIVO** de **projetar, refinar e otimizar** | 3.3 |
| ⭐ **Task** | A **instrução central**; o **ÚNICO componente obrigatório** | 3.3 |
| **Context** | **Informação de fundo** / **system instructions**; opcional | 3.3 |
| **Examples** | **Demonstrações**, passo a passo ou formatos de saída; opcional | 3.3 |
| ⭐ **Zero-shot prompting** | **Só a tarefa**, sem exemplos | 3.3 |
| ⭐ **Few-shot prompting** | **Com exemplos** | 3.3 |
| **Content** | Garantir que o prompt tem **toda a informação relevante** | 3.3 |
| **Structure** | **Ordem**, **labels** e **delimitadores** | 3.3 |
| **Chain-of-thought prompting** | Técnica avançada **apenas nomeada**; nunca detalhada no curso | 3.3 |
| **System Instructions** | O campo do Agent Studio onde vai o **contexto** | 3.4 |
| **Prompt template** | Prompt reutilizável com **variáveis substituíveis** — *"uma função em linguagem natural"* | 3.4 |
| **Add variables** | Botão que atribui valores, como **passar argumentos a uma função** | 3.4 |
| ⭐ **Temperature** | **Baixa** = palavras **típicas** (QA, sumarização) · **alta** = **incomuns** (criativo) | 3.4 |
| ⭐ **Top K** | Sorteia entre as **K mais prováveis**, com **chance igual** | 3.4 |
| ⭐ **Top P** | Sorteia do **menor subconjunto** cuja **probabilidade cumulativa** atinge P; **tamanho dinâmico** | 3.4 |
| **Token** | Unidade de saída cuja seleção os parâmetros controlam | 3.4 |
| ⭐ **Ground truth** | **Sua resposta preferida** ao prompt, referência para avaliar as do modelo | 3.4 |
| **Prompt management** | Menu com **comparação, otimização e avaliação**; **version control** e **security** | 3.4 |
| **Prompt gallery** | Galeria filtrável por **modalidade**, **tarefa** e **features** | 3.3 |
| **"Help me write"** | Prompting **assistido por IA** no Agent Studio | 3.3 |

## 5. Tuning, grounding e deployment

| Termo | Definição | Aula |
|---|---|---|
| ⭐⭐ **Grounding** | **Conectar o modelo a fontes externas confiáveis**. **É o QUÊ** | 3.5 |
| ⭐⭐ **RAG** | *Retrieval-augmented generation*; **um método para implementar o grounding**. **É o COMO** | 3.5 |
| **Model tuning** | Melhorar a **qualidade da geração** com um **dataset de tarefas downstream** | 3.5 |
| ⭐⭐ **Fine-tuning × grounding** | Fine-tuning refina o conhecimento **INTERNO**; grounding aumenta com informação **EXTERNA** | 3.5 |
| ⭐ **Parameter-efficient tuning** (= **adapter tuning**) | Atualiza um **subconjunto pequeno** dos parâmetros | 3.5 |
| ⭐ **Full fine-tuning** | Atualiza **todos** os parâmetros; mais recursos em **tuning e serving** | 3.5 |
| ⭐ **Supervised fine-tuning** | Ensina **nova habilidade** com **centenas de exemplos rotulados**; gera um **novo modelo** | 3.5 |
| **Downstream task** | A tarefa específica para a qual o modelo é adaptado | 3.5 |
| ⭐ **JSONL** | Formato do dataset de tuning: **input text** + **output text** por linha | 3.5 |
| **Model Registry** | Onde o modelo tunado aparece ao fim do job | 3.5 |
| **Endpoint / serving** | Onde o modelo é implantado para servir predições | 3.5 |
| **Cloud Run / Cloud Shell** | O ambiente integrado que **elimina a preocupação com a arquitetura de nuvem** | 3.5, 3.9 |
| **Build with code** | Botão que revela o **código do prompt e seus parâmetros** | 3.5 |

## 6. Agentes

| Termo | Definição | Aula |
|---|---|---|
| ⭐⭐ **AI agent** | Uma **APLICAÇÃO** que combina **modelos para raciocínio**, **ferramentas** e **coordenação sofisticada** para alcançar um objetivo | 3.7 |
| ⭐⭐ **Agentic AI** | Sistema **mais autônomo**, de **raciocínio complexo e coordenação**, para **tarefas multi-etapa com múltiplos agentes** | 3.7 |
| **Goal-oriented** | Orientado a objetivos; 1ª das quatro características do agente | 3.7 |
| ⭐⭐ **Model (componente)** | **O cérebro**; **raciocina, planeja, descobre os passos**; **compreende comunicação e lógica** | 3.7 |
| ⭐⭐ **Tools (componente)** | **Mãos, pés E SENTIDOS**; **agem** (enviar e-mail) **e percebem** (buscar o clima); geralmente **APIs** | 3.7 |
| ⭐⭐ **Orchestration layer** | **O sistema nervoso**; processo **central e cíclico**: decisão → ação → **feedback** | 3.7 |
| **GET, POST, PATCH, DELETE** | Os comandos de API citados como forma típica das tools | 3.7 |
| **White paper "Agents"** | A referência do Google indicada | 3.7 |

## 7. Produtos e a árvore de decisão

| Termo | Definição | Aula |
|---|---|---|
| ⭐ **Model Garden** | Acesso **e fine-tuning** de **foundation models do Google e de terceiros**; o **"cérebro"** do agente | 3.8, 3.9 |
| ⭐ **Agent Garden** | **Templates pré-construídos** de agentes; caminho **low-code** | 3.8 |
| ⭐ **Agent Platform** | Camada de **desenvolvimento**; **low-code ou pro-code**; **end-to-end** | 3.1, 3.8 |
| ⭐ **Agent Studio** | Ferramenta **low-code** para **projetar loops de raciocínio** e **testar prompts**; *"gateway to generative AI"* | 3.3, 3.8 |
| **ADK** | **Lógica baseada em grafo** para **redes de sub-agentes**. ⚠️ Sigla **nunca expandida** no curso | 3.8 |
| **Agents CLI** | Terceira ferramenta da Agent Platform | 3.8 |
| **Agent-to-Agent orchestration** | Agentes **delegam tarefas** entre si; padrões **generativos e determinísticos** | 3.8 |
| **Secure workspaces** | Ambientes **endurecidos e em sandbox** para gerenciar arquivos e rodar comandos | 3.8 |
| **Agent Runtime** | **Implantar, gerenciar e escalar**; **cold starts sub-segundo**, **workflows de longa duração**, **observabilidade integrada** | 3.8 |
| ⭐ **Gemini Enterprise app** | Hub **no-code** para **descobrir, criar, customizar e orquestrar** agentes | 3.1, 3.3, 3.8 |
| **Gemini Enterprise for CX** | Suíte para **agentes de experiência do cliente** em indústrias customer-facing | 3.3, 3.8 |
| **Agent Designer** | Criador **no-code** de agentes dentro do Gemini Enterprise app | 3.8 |
| **Gemini Notebook** | **Assistente pessoal de pesquisa**, **tutor**; em `notebook.google.com`, **grátis** | 3.3, 3.8, 3.9 |
| ⭐ **Ease of use / flexibility** | Os **dois fatores** de escolha; **inversamente relacionados** | 3.8 |

## 8. Personas e caso

| Termo | Definição |
|---|---|
| **Cymbal Insurance** | Seguradora nacional do estudo de caso, forte nos estados do oeste |
| **Bea** | *Business Analyst*, **sem formação técnica**; quer prototipar rápido |
| **Ann** | *AI Developer*; quer plataforma amigável para **prompt engineering** |
| **Ian** | *ML Engineer*; quer **pipelines** e **fine-tuning** robustos e escaláveis |

---

## Os três marcos de data do módulo

| Ano | Marco |
|---|---|
| **2017** | **Transformer** — a arquitetura que sustenta toda a gen AI moderna |
| **2023** | A era **Gemini**, nativamente multimodal |
| **2026** | Abordagem **centrada em plataforma** para **IA agêntica** |

