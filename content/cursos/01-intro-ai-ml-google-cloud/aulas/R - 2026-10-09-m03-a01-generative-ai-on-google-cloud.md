---
title: Módulo 3, Aula 3.1 — Generative AI on Google Cloud
aliases: [aula 3.1 Google AI ML, stack de gen AI, timeline Transformer Gemini]
tags: [aula, trabalho]
type: aula
area: trabalho
created: 2026-10-09
updated: 2026-10-09
status: concluída
fonte: transcricao
confianca: media
papel: derivada
indexar: true
summary: "Abre o módulo de IA generativa. Define gen AI como geração de conteúdo multimodal (texto, código, imagem, fala, vídeo e 3D) mais ação autônoma via agentes; traz a timeline Transformer 2017 → Gemini 2023 → agentic AI 2026; e apresenta o stack de três camadas da gen AI (foundation models → AI development → AI applications). Resolve a distinção entre Gemini Enterprise app e Gemini Enterprise Agent Platform."
transcricao: "[[T - 2026-10-09-m03-a01-generative-ai-on-google-cloud]]"
data: 2026-10-09
curso: "[[curso-intro-ai-ml-google-cloud]]"
professor: ""
related: ["[[R - 2026-10-08-m02-a07-summary]]", "[[google-ai-ml-modulo-2-revisao]]"]
---

# Módulo 3, Aula 3.1 — Generative AI on Google Cloud

| | |
|---|---|
| **Tema** | Abertura do módulo de IA generativa: o que é, a trajetória do Google e o stack |
| **Curso** | [[curso-intro-ai-ml-google-cloud\|Introduction to AI and Machine Learning on Google Cloud]] |
| **Data** | 2026-10-09 (data da transcrição) |
| **Duração** | ~4min30 |
| **Aula nº / módulo** | 3.1 — Módulo 3 na ementa ("Module 2" na fala do curso) |

> 🎯 **Peso na prova: ALTO.** Apesar de ser aula de abertura, traz **três
> blocos decoráveis**: a lista completa de modalidades da gen AI, a
> **timeline com três anos**, e o **stack de três camadas da gen AI** com
> os produtos de cada uma. Também **resolve uma pendência** que estava
> aberta desde a aula 1.1.

## Conteúdo por tópico

### 1. Os três cenários de abertura

A aula começa com três profissionais, para mostrar a amplitude:

| Profissional | A tarefa |
|---|---|
| **Retail merchandiser** | gerar rapidamente **milhares de descrições de produto personalizadas**, que conversem com as preferências individuais de cada cliente |
| **Automotive engineer** | **iterar rapidamente em designs de veículos novos**, explorando incontáveis combinações para otimizar **peso ou eficiência de combustível** |
| **Financial analyst** | criar **relatórios de investimento** sob medida para o portfólio e o **apetite de risco** de cada cliente |

📌 Repare no padrão: os três casos são de **escala + personalização**. É o
argumento central da gen AI no mundo corporativo.

### 2. ⭐ A definição de gen AI (e a lista completa de modalidades)

> **Gen AI é um tipo de IA que gera conteúdo e toma ações por você.**

**As modalidades do conteúdo gerado** — a aula dá a lista completa, e ela é
**maior do que a do Módulo 2**:

| Modalidade |
|---|
| **texto** (*text*) |
| **código** (*code*) |
| **imagem** (*images*) |
| **fala** (*speech*) |
| **vídeo** (*video*) |
| **3D** |

⚠️ **Atenção:** as aulas anteriores falavam só em texto, imagem e vídeo.
Esta acrescenta **código, fala e 3D**. Se uma questão listar modalidades,
é esta a lista de seis.

**Prompt** = *"a question or an instruction"* — uma pergunta **ou** uma
instrução.

### 3. ⭐ As duas capacidades: criar conteúdo × tomar ação

A aula separa explicitamente o que a gen AI faz, e essa separação é a
espinha do módulo inteiro:

| Capacidade | Como | Exemplos da aula |
|---|---|---|
| **Criação de conteúdo** | diretamente, a partir de um **prompt** | produzir imagens e vídeos · **resumir notas de reunião** · criar **relatórios de pesquisa** · desenvolver **chatbots de Q&A** |
| **Ação autônoma** | **através de AI agents** | **automatizar workflows** · **planejar e reservar viagens** · **agendar compromissos** · **auxiliar em diagnósticos clínicos** |

📌 **A expressão exata para a segunda capacidade:** *"autonomous,
goal-oriented action on your behalf"* — ação **autônoma e orientada a
objetivos**, **em seu nome**. Guarde "goal-oriented": é o adjetivo que
distingue um agente de um gerador de conteúdo.

### 4. ⭐ A timeline dos marcos do Google (três anos)

| Ano | Marco | O que a aula diz |
|---|---|---|
| **2017** | **Transformer** | *"a deep learning neural network architecture that underpins all modern generative AI applications"* — a arquitetura de rede neural de deep learning que **sustenta todas as aplicações modernas de IA generativa** |
| **2023** | **era Gemini**, **nativamente multimodal** | um modelo de IA multimodal que **expande o conceito de AGI (artificial general intelligence)** através de suas capacidades de **processamento multimodal** |
| **2026** | **abordagem centrada em plataforma para IA agêntica** | *"platform-centric approach for agentic AI"* |

📌 **Três datas para somar às do Módulo 2** (1998 fundação · 2008 Google
Cloud · 2016 TPU). O conjunto completo vira seis anos decoráveis:

```
1998 ─── 2008 ─── 2016 ─── 2017 ─── 2023 ─── 2026
Google   Google    TPU    Transformer Gemini  IA agêntica
nasce    Cloud                              (plataforma)
```

📌 **AGI** aparece aqui pela **primeira vez** no curso, e de forma
cuidadosa: o Gemini *"expande o conceito"* de AGI — não se afirma que é
AGI.

### 5. ✅ Pendência resolvida: Gemini Enterprise app × Agent Platform

Desde a aula 1.1 estava aberto onde o **Gemini Enterprise app** se
encaixava. A aula responde com clareza, e a diferença é de **público**:

| Produto | Para quem | O que permite |
|---|---|---|
| **Gemini Enterprise app** | **indivíduos** | construir **agentes de IA sem código** (*no code*) |
| **Gemini Enterprise Agent Platform** | **empresas** (*enterprises*) | **implantar e escalar** sistemas de IA agêntica |

> 💡 **O eixo da distinção é escala, não função.** O *app* é para uma
> pessoa montar um agente; a *Agent Platform* é para uma empresa colocar
> sistemas agênticos em produção e escalá-los. Se a questão falar em
> "indivíduo" e "sem código" → **app**. Se falar em "empresa", "deploy" ou
> "escalar" → **Agent Platform**.

### 6. ⭐ O stack de três camadas da gen AI

⚠️ **Cuidado: este é o TERCEIRO "três camadas" do curso.** Não é o AI/ML
Toolbox (aula 2.2/2.7) nem os andares da infraestrutura (aula 2.3). É um
stack específico de **gen AI**:

```
┌────────────────────────────────────────────────────────┐
│ 3. AI APPLICATIONS                                     │
│    Gemini Enterprise app · Gemini Notebook             │
│    → usuários de negócio constroem agentes e            │
│      aplicações SEM CÓDIGO                              │
├────────────────────────────────────────────────────────┤
│ 2. AI DEVELOPMENT                                      │
│    Agent Studio · Agent Garden ·                        │
│    Gemini Enterprise Agent Platform Model Garden        │
│    → prototipar aplicações · implantar agentes ·        │
│      fazer fine-tune de modelos                         │
├────────────────────────────────────────────────────────┤
│ 1. FOUNDATION MODELS                                   │
│    construídos sobre a infraestrutura de IA do Google   │
│    → a INTELIGÊNCIA por trás de toda aplicação de       │
│      gen AI; entendem linguagem, imagens e vídeo        │
└────────────────────────────────────────────────────────┘
```

| Camada | Definição exata | Produtos citados |
|---|---|---|
| **Foundation models** | *"the intelligence behind all gen AI applications"*; construídos sobre a **infraestrutura robusta de IA** do Google; entendem **linguagem, imagens e vídeo** | família **Gemini** |
| **AI development** | prototipar aplicações, **implantar agentes de IA** e **fazer fine-tune de modelos** | **Agent Studio** · **Agent Garden** · **Gemini Enterprise Agent Platform Model Garden** |
| **AI applications** | ajudam **usuários de negócio** a construir agentes e aplicações **sem código** | **Gemini Enterprise app** · **Gemini Notebook** |

📌 **Três produtos novos aparecem aqui:** **Agent Garden**, **Gemini
Enterprise Agent Platform Model Garden** e **Gemini Notebook**.

📌 **A relação entre os dois stacks.** Este stack de gen AI **se apoia** no
AI/ML Toolbox: os *foundation models* são descritos como *"built on
Google's robust AI infrastructure"* — ou seja, a primeira camada deste
stack **fica em cima** da primeira camada daquele. Não são listas
concorrentes; são zooms diferentes.

### 7. O que o módulo vai cobrir

*"Everything from chatbots to the latest AI agents and agentic AI"* — a
arquitetura completa de desenvolvimento de gen AI do Google: **foundation
models → ferramentas de desenvolvimento → aplicações**.

## Glossário da aula

- **Generative AI (gen AI)** — tipo de IA que **gera conteúdo e toma ações**
  por você.
- **Conteúdo multimodal** — **texto, código, imagem, fala, vídeo e 3D**.
- **Prompt** — **uma pergunta ou uma instrução** dada ao modelo.
- **Autonomous, goal-oriented action** — ação **autônoma e orientada a
  objetivos** que a gen AI toma em seu nome **através de agentes**.
- **Transformer (2017)** — **arquitetura de rede neural de deep learning**
  que **sustenta todas as aplicações modernas de IA generativa**.
- **Gemini (2023)** — modelo de IA **nativamente multimodal**; expande o
  conceito de **AGI** por suas capacidades de processamento multimodal.
- **AGI (artificial general intelligence)** — inteligência artificial
  geral; citada como conceito que o Gemini *expande*.
- **Agentic AI (2026)** — a fase atual, com **abordagem centrada em
  plataforma**.
- **Foundation models** — a **inteligência** por trás de toda aplicação de
  gen AI; entendem **linguagem, imagens e vídeo**; construídos sobre a
  infraestrutura de IA do Google.
- **Gemini Enterprise app** — para **indivíduos** construírem agentes de IA
  **sem código**.
- **Gemini Enterprise Agent Platform** — para **empresas** **implantarem e
  escalarem** sistemas de IA agêntica.
- **Agent Studio** — ferramenta da camada de desenvolvimento.
- **Agent Garden** — ferramenta da camada de desenvolvimento *(novo nesta
  aula)*.
- **Gemini Enterprise Agent Platform Model Garden** — ferramenta da camada
  de desenvolvimento *(novo nesta aula)*.
- **Gemini Notebook** — produto da camada de aplicações, para construir
  sem código *(novo nesta aula)*.
- **Fine-tune** — ajustar um modelo existente; uma das três funções da
  camada de desenvolvimento.

## Flashcards

| Pergunta | Resposta |
|---|---|
| Defina gen AI | Tipo de IA que **gera conteúdo e toma ações** por você |
| Quais as **seis** modalidades de conteúdo gerado? | **Texto, código, imagem, fala, vídeo e 3D** |
| O que é um **prompt**? | **Uma pergunta ou uma instrução** |
| Quatro exemplos de criação de conteúdo | Produzir imagens e vídeos · resumir notas de reunião · criar relatórios de pesquisa · desenvolver chatbots de Q&A |
| Como a gen AI toma ação? | **Através de AI agents** |
| A expressão exata para essa ação | **Autonomous, goal-oriented action** em seu nome |
| Quatro exemplos de ação autônoma | Automatizar workflows · planejar e reservar viagens · agendar compromissos · auxiliar em diagnósticos clínicos |
| O que aconteceu em **2017**? | Pesquisa do **Transformer** |
| O que é o Transformer? | **Arquitetura de rede neural de deep learning** que **sustenta todas as aplicações modernas de gen AI** |
| O que aconteceu em **2023**? | A era **Gemini**, nativamente multimodal |
| O que o Gemini expande? | O conceito de **AGI**, por suas capacidades de processamento multimodal |
| O que aconteceu em **2026**? | Transição para uma **abordagem centrada em plataforma** para **IA agêntica** |
| ⭐ **Gemini Enterprise app** — para quem e para quê? | Para **indivíduos** construírem agentes de IA **sem código** |
| ⭐ **Gemini Enterprise Agent Platform** — para quem e para quê? | Para **empresas** **implantarem e escalarem** sistemas de IA agêntica |
| Quais as três camadas do **stack de gen AI**? | **Foundation models → AI development → AI applications** |
| O que são os foundation models nesse stack? | A **inteligência** por trás de toda aplicação de gen AI; entendem **linguagem, imagens e vídeo** |
| Sobre o que os foundation models são construídos? | Sobre a **infraestrutura de IA** do Google |
| Ferramentas da camada de **AI development** | **Agent Studio**, **Agent Garden** e **Gemini Enterprise Agent Platform Model Garden** |
| As três funções da camada de AI development | **Prototipar aplicações**, **implantar agentes** e **fazer fine-tune de modelos** |
| Produtos da camada de **AI applications** | **Gemini Enterprise app** e **Gemini Notebook** |
| Os três cenários de abertura da aula | Merchandiser de varejo (descrições de produto) · engenheiro automotivo (designs de veículo) · analista financeiro (relatórios de investimento) |

## Questões estilo prova

**1.** Uma profissional quer montar sozinha um agente de IA, sem escrever
código. Qual produto do Google atende?

- A) Gemini Enterprise Agent Platform
- B) Gemini Enterprise app
- C) Agent Garden
- D) BigQuery ML

<details><summary>Gabarito</summary>

**B — Gemini Enterprise app.** A aula é explícita: permite a **indivíduos**
construírem agentes de IA **sem código**. (A) é a opção para **empresas**
implantarem e **escalarem** sistemas agênticos. (C) é ferramenta da camada
de desenvolvimento. (D) é do mundo preditivo, não da gen AI.
</details>

**2.** Qual arquitetura, segundo a aula, sustenta todas as aplicações
modernas de IA generativa — e de que ano é?

- A) LSTM, 2014
- B) Transformer, 2017
- C) Gemini, 2023
- D) TPU, 2016

<details><summary>Gabarito</summary>

**B — Transformer, 2017.** A aula o define como *"a deep learning neural
network architecture that underpins all modern generative AI
applications"*. (C) é um **modelo**, não uma arquitetura, e é de 2023. (D)
é um **chip**, de 2016.
</details>

**3.** Quais destas **não** é uma modalidade de conteúdo que a aula atribui
à gen AI?

- A) Código
- B) Fala
- C) 3D
- D) Todas são

<details><summary>Gabarito</summary>

**D — todas são.** A lista completa tem **seis**: texto, **código**,
imagem, **fala**, vídeo e **3D**. Quem só lembra de "texto, imagem e
vídeo" está com a lista do Módulo 2.
</details>

**4.** Quais são as três camadas do stack de gen AI do Google, de baixo
para cima?

<details><summary>Gabarito</summary>

**Foundation models → AI development → AI applications.** Cuidado para não
confundir com o **AI/ML Toolbox** (AI infrastructure → AI development → AI
applications and solutions) nem com os andares **dentro** da infraestrutura
(networking/security → compute e storage → data and AI products).
</details>

**5.** Um hospital quer um sistema que, além de gerar textos, **agende
consultas e auxilie em diagnósticos** de forma autônoma. Que capacidade da
gen AI está em jogo, e através do quê?

<details><summary>Gabarito</summary>

A capacidade de **ação autônoma e orientada a objetivos** (*autonomous,
goal-oriented action*), que a gen AI exerce **através de AI agents**.
Agendar compromissos e auxiliar em diagnósticos clínicos são dois dos
quatro exemplos que a própria aula dá.
</details>

**6.** Em que camada do stack de gen AI estão o **Agent Studio** e o
**Agent Garden**, e o que ela permite fazer?

<details><summary>Gabarito</summary>

Na camada de **AI development**. Ela permite **prototipar aplicações**,
**implantar agentes de IA** e **fazer fine-tune de modelos**.
</details>

## Dúvidas em aberto / revisar
- ✅ **Resolvido:** a distinção **Gemini Enterprise app** (indivíduos,
  no-code) × **Gemini Enterprise Agent Platform** (empresas, deploy e
  escala), aberta desde a aula 1.1.
- ⚠️ **"Gemini Notebook" × "Gemini Enterprise Agent Platform Notebooks".**
  A aula 2.3 usou o nome longo e o colocou na Agent Platform; esta usa o
  curto e o coloca na camada de **aplicações**, ao lado do Gemini
  Enterprise app. Pode ser o mesmo produto com dois nomes, ou dois
  produtos. Conferir no Módulo 4.
- ⚠️ **Três "três camadas" diferentes no curso.** Ver o quadro comparativo
  em [[google-ai-ml-modulo-2-revisao]] — esta aula acrescenta a terceira.
- 📌 **Agent Garden** e **Model Garden** aparecem pela primeira vez, sem
  definição. Esperar as aulas 3.3 a 3.8.
- 📌 **AGI** é citada uma única vez, com cuidado ("expande o conceito").
  Não parece conteúdo de prova, mas vale saber a sigla.

## Ações / próximos passos
| Ação | Prazo |
|---|---|
| Decorar as **seis modalidades** (texto, código, imagem, fala, vídeo, 3D) | — |
| Decorar a timeline 2017 / 2023 / 2026 junto com 1998 / 2008 / 2016 | — |
| Fixar app = indivíduos/no-code · Agent Platform = empresas/escala | — |
| Não confundir os três stacks de "três camadas" | — |
| Assistir 3.2 "Foundation models" | — |

## Fontes
- Transcrição da aula — [[T - 2026-10-09-m03-a01-generative-ai-on-google-cloud]]
