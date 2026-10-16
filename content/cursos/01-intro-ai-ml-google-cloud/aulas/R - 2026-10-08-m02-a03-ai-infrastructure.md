---
title: Módulo 2, Aula 2.3 — AI infrastructure
aliases: [aula 2.3 Google AI ML, TPU Google Cloud, workflow data-to-AI, camadas da infraestrutura Google Cloud]
tags: [aula, trabalho]
type: aula
area: trabalho
created: 2026-10-08
updated: 2026-10-08
status: concluída
fonte: transcricao
confianca: media
papel: derivada
indexar: true
summary: "Aula densa em produtos: as três camadas da infraestrutura de IA (rede/segurança → compute/storage → dados e IA), o espectro de compute (Compute Engine/GKE/Cloud Run), CPU × GPU × TPU, a escolha de storage por tipo de dado e o workflow data-to-AI em três etapas com os produtos de cada uma."
transcricao: "[[T - 2026-10-08-m02-a03-ai-infrastructure]]"
data: 2026-10-08
curso: "[[curso-intro-ai-ml-google-cloud]]"
professor: ""
related: ["[[R - 2026-09-01-m02-a02-ai-on-google-cloud]]"]
---

# Módulo 2, Aula 2.3 — AI infrastructure

| | |
|---|---|
| **Tema** | A camada de infraestrutura: rede, compute, chips, storage e o workflow data-to-AI |
| **Curso** | [[curso-intro-ai-ml-google-cloud\|Introduction to AI and Machine Learning on Google Cloud]] |
| **Data** | 2026-10-08 (data da transcrição) |
| **Duração** | ~6min40 |
| **Aula nº / módulo** | 2.3 — Módulo 2 na ementa ("Module 1, AI Foundations" na fala do curso) |

> 🎯 **Peso na prova: ALTO — e de um tipo diferente.** A 2.2 era conceitual;
> esta é **decoreba de produto**. É a aula que define qual serviço do Google
> Cloud resolve qual problema. Questões de "qual produto usar para X" saem
> quase todas daqui.

## Conteúdo por tópico

### 1. Linha do tempo (três datas que podem cair)

| Ano | Marco |
|---|---|
| **1998** | Fundação do Google — "dedicado a dados e IA desde o início" |
| **2008** | Lançamento do **Google Cloud**, com computação e armazenamento em nuvem seguros e flexíveis |
| **2016** | Introdução da **TPU** (Tensor Processing Unit) |

### 2. ⭐ As três camadas da infraestrutura de IA — pendência resolvida

A aula abre retomando a arquitetura de três camadas da
[[R - 2026-09-01-m02-a02-ai-on-google-cloud|aula 2.2]] (infraestrutura →
desenvolvimento → aplicações/soluções) e **entra dentro da primeira**. A
camada de infraestrutura tem, ela mesma, três andares:

```
┌──────────────────────────────────────────────┐
│ 3. DATA AND AI PRODUCTS                      │
│    ingerir · armazenar · processar ·          │
│    entregar business insights,                │
│    data pipelines e modelos de ML             │
├──────────────────────────────────────────────┤
│ 2. COMPUTE  |  STORAGE                        │
│    desacoplados (decoupled) — escalam         │
│    independentemente, conforme a necessidade  │
├──────────────────────────────────────────────┤
│ 1. NETWORKING AND SECURITY                    │
│    a base que sustenta toda a infraestrutura  │
│    e as aplicações do Google                  │
└──────────────────────────────────────────────┘
```

✅ **Isto resolve a divergência que ficou aberta entre as aulas 2.1 e 2.2.**
Eram recortes diferentes da mesma coisa:

| Aula | O que listou | O que era de fato |
|---|---|---|
| 2.1 | "Compute, Storage, Data e AI" | as **famílias de produtos** dos andares 2 e 3 |
| 2.2 | "compute, network e storage" | os andares 1 e 2, sem mencionar o 3 |
| **2.3** | **networking/security → compute/storage → data and AI** | **a enumeração canônica dos três andares** |

📌 Guarde a da 2.3 como a oficial: **networking and security** na base,
**compute e storage** no meio, **data and AI products** no topo.

📌 **O ganho da nuvem:** todas essas tarefas são feitas **sem precisar
gerenciar nem escalar a infraestrutura por baixo**.

### 3. ⭐ Compute: o espectro controle ↔ conveniência

Google oferece uma gama de serviços, "de infraestrutura flexível a
plataformas serverless totalmente gerenciadas, equilibrando **controle e
conveniência**":

| Serviço | Posição no espectro | A analogia da aula |
|---|---|---|
| **Compute Engine** | **mais controle** | "como gerenciar um servidor físico" |
| **Google Kubernetes Engine (GKE)** | meio | controle sobre **apps containerizados**, com os benefícios da orquestração |
| **Cloud Run** | **mais conveniência** | **serverless** — o Google gerencia a infraestrutura |

📌 Mnemônico: **Engine → Kubernetes → Run** = controle decrescente,
conveniência crescente. Se a questão enfatizar "sem gerenciar servidores"
ou "serverless", a resposta é **Cloud Run**. Se enfatizar "contêineres", é
**GKE**. Se enfatizar "controle total da máquina", é **Compute Engine**.

### 4. ⭐ Os chips: CPU × GPU × TPU

**O problema:** chips tradicionais — **CPU** (Central Processing Unit) e
mesmo as mais recentes **GPU** (Graphics Processing Unit) — *"may no longer
scale"* para acompanhar a demanda acelerada de IA.

**A resposta do Google (2016):** a **TPU — Tensor Processing Unit**.

| | CPU / GPU | TPU |
|---|---|---|
| **Natureza** | hardware de **propósito geral** (*general-purpose*) | hardware **específico de domínio** (*domain-specific*), chip **application-specific** |
| **Como ganha eficiência** | — | adapta a **arquitetura** às necessidades de computação de um domínio |
| **O exemplo da aula** | — | **multiplicação de matrizes** em machine learning |

**Cloud TPUs** são **mais rápidas e mais eficientes em energia** que GPUs e
CPUs para AI/ML, estão **integradas em todos os produtos do Google** e
entregam tecnologia de supercomputação aos clientes do Google Cloud.

📌 **Os termos que a prova usa:** *customized*, *application-specific*,
*domain-specific hardware*, *matrix multiplication*. E o par de vantagens:
**mais rápida + mais eficiente em energia**.

### 5. ⭐ Storage: desacoplado, e escolhido pelo tipo de dado

**O princípio:** compute e storage são **desacoplados** para escalarem
separadamente. A aula destaca: *"that is one major difference between Cloud
and desktop computing"* — é **a** diferença entre nuvem e computação de
desktop.

**A árvore de decisão por tipo de dado:**

| Tipo de dado | Exemplos | Solução |
|---|---|---|
| **Não estruturado** | documentos, imagens, arquivos de áudio | **Cloud Storage** |
| **Estruturado** (tabelas, linhas, colunas) | — | **BigQuery**, **AlloyDB for PostgreSQL** e outros |

**BigQuery — o data warehouse *flagship*, "particularmente versátil":**

| Tipo de dado | Como o BigQuery lida |
|---|---|
| **Estruturado** | é o que ele foi **construído** para fazer |
| **Semi-estruturado** (ex.: **JSON**) | **altamente otimizado** |
| **Não estruturado** (log files, imagens no Cloud Storage) | **consegue consultar**, criando uma **external table** que dá uma *referência estruturada* ao dado |

📌 **Candidato forte a questão:** "o BigQuery só serve para dados
estruturados" é **falso**. Ele é construído para estruturados, otimizado
para semi-estruturados e **consulta** não estruturados via **external
table**. Guarde esse termo.

### 6. ⭐ O workflow data-to-AI (3 etapas) e os produtos de cada uma

```
INGEST & PROCESS  →  STORE & ANALYZE  →  ACTIVATE WITH AI
```

| Etapa | O que faz | Produtos |
|---|---|---|
| **1. Ingest and process** | ingerir e processar de **fontes diversas**, em **tempo real e em lote** (*real-time and batch*) | **Pub/Sub** · **Dataflow** · **Managed Service for Apache Spark** · **Cloud Data Fusion** |
| **2. Store and analyze** — *store* | armazenar | **Cloud Storage** |
| **2. Store and analyze** — *analyze* | bancos **SQL** | **BigQuery** · **AlloyDB** · **Cloud SQL** · **Spanner** |
| | bancos **NoSQL** | **Bigtable** · **Firestore** |
| | **visualização** | **Looker** |
| **3. Activate with AI** | treinar modelos **preditivos** para forecasting, ou usar **gen AI** para criação de conteúdo e ação | **Agent Platform** e seus produtos (abaixo) |

📌 A divisão **SQL × NoSQL** é o par mais fácil de errar: **Bigtable e
Firestore são NoSQL**; BigQuery, AlloyDB, Cloud SQL e Spanner são SQL.
Cuidado com **Bigtable** × **BigQuery** — nomes parecidos, famílias
diferentes.

### 7. Agent Platform e seus produtos — pendências resolvidas

**Agent Platform** é apresentada como **a plataforma central de
desenvolvimento de IA**. Dentro dela:

| Produto | Para que |
|---|---|
| **Agent Studio** on Gemini Enterprise Agent Platform | construir agentes |
| **Agent Platform AutoML** | modelos customizados sem código |
| **Gemini Enterprise Agent Platform Notebooks** | ambiente de notebook para projetos de IA |

Cobrindo projetos *"ranging from out-of-the-box solutions to custom
builds"* — de soluções prontas a builds customizados.

✅ **Resolve o "Gemini Notebook" que apareceu solto na aula 2.2** — o nome
completo é **Gemini Enterprise Agent Platform Notebooks**, e é um produto
*dentro* da Agent Platform, não um produto paralelo.

✅ **Resolve em parte a dúvida "Gemini Enterprise app × Gemini Enterprise
Agent Platform"** — a Agent Platform é a plataforma; Agent Studio, AutoML e
Notebooks são produtos dela. Falta só confirmar onde o *Gemini Enterprise
app* da aula 1.1 se encaixa; esperar o Módulo 4.

**As duas integrações que a aula destaca:**

1. O **BigQuery** oferece **comandos SQL embutidos para treinar um modelo
   de ML** — é o **BigQuery ML**, tema da aula 2.5.
2. Dentro do **Agent Platform Notebooks**, dá para **puxar dados direto do
   BigQuery via SQL** para treino avançado de modelo.

### 8. O recado final

*"Don't let the variety of options overwhelm you."* O curso vai focar em
**dois** produtos: **BigQuery** (o data warehouse principal) e **Agent
Platform** (a plataforma de desenvolvimento de IA). Próxima aula: **AI
models**.

## Glossário da aula

- **Networking and security** — andar base da infraestrutura; sustenta toda
  a infraestrutura e as aplicações do Google.
- **Decoupling (desacoplamento)** — separar compute de storage para que
  escalem **independentemente**; a grande diferença entre nuvem e desktop.
- **Compute Engine** — máquinas virtuais; **alto controle**, como gerenciar
  um servidor físico.
- **Google Kubernetes Engine (GKE)** — plataforma de **contêineres** com
  orquestração.
- **Cloud Run** — **serverless**; o Google gerencia a infraestrutura.
- **CPU** (*Central Processing Unit*) — chip de **propósito geral**.
- **GPU** (*Graphics Processing Unit*) — chip de propósito geral, mais
  recente que a CPU; ainda insuficiente para a escala da IA.
- **TPU** (*Tensor Processing Unit*) — 2016; chip **customizado e
  application-specific** do Google para acelerar workloads de IA.
- **Domain-specific hardware** — hardware desenhado para as necessidades de
  computação de um domínio (ex.: multiplicação de matrizes em ML); o
  oposto de *general-purpose*.
- **Cloud TPU** — a TPU como serviço; **mais rápida e mais eficiente em
  energia** que GPU e CPU para AI/ML.
- **Dados não estruturados** — documentos, imagens, áudio → **Cloud
  Storage**.
- **Dados estruturados** — organizados em tabelas, linhas e colunas →
  **BigQuery**, **AlloyDB for PostgreSQL** e outros.
- **Dados semi-estruturados** — ex.: **JSON**; o BigQuery é **altamente
  otimizado** para eles.
- **External table** — tabela no BigQuery que dá uma **referência
  estruturada** a dados não estruturados guardados no Cloud Storage,
  permitindo consultá-los.
- **BigQuery** — data warehouse *flagship*, serverless; estruturado +
  semi-estruturado + consulta de não estruturado.
- **AlloyDB for PostgreSQL** — banco SQL gerenciado compatível com
  PostgreSQL.
- **Cloud SQL** — banco relacional gerenciado.
- **Spanner** — banco SQL distribuído e globalmente consistente.
- **Bigtable** — banco **NoSQL** de larga escala. ⚠️ Não confundir com
  BigQuery.
- **Firestore** — banco **NoSQL** de documentos.
- **Pub/Sub** — mensageria para ingestão **em tempo real**.
- **Dataflow** — processamento de dados em batch e streaming.
- **Managed Service for Apache Spark** — Spark gerenciado.
- **Cloud Data Fusion** — integração de dados (ETL/ELT) visual.
- **Looker** — **visualização** e BI.
- **Agent Platform** *(ex-Vertex AI)* — a plataforma **central** de
  desenvolvimento de IA.
- **Agent Studio** — produto da Agent Platform para construir agentes.
- **Agent Platform AutoML** — treinar modelos customizados sem código.
- **Gemini Enterprise Agent Platform Notebooks** — ambiente de notebook da
  Agent Platform; puxa dados do BigQuery via SQL.

## Flashcards

| Pergunta | Resposta |
|---|---|
| Em que ano o Google Cloud foi lançado? | 2008 (o Google foi fundado em 1998) |
| Em que ano a TPU foi introduzida? | 2016 |
| Quais são os três andares da infraestrutura de IA? | 1) Networking and security · 2) Compute e storage · 3) Data and AI products |
| O que significa compute e storage serem "desacoplados"? | Escalam **independentemente**; é a grande diferença entre nuvem e computação de desktop |
| Qual serviço de compute dá **mais controle**? | Compute Engine — "como gerenciar um servidor físico" |
| Qual serviço de compute é para **contêineres** com orquestração? | Google Kubernetes Engine (GKE) |
| Qual serviço de compute é **serverless**? | Cloud Run — o Google gerencia a infraestrutura |
| O que é uma TPU? | Chip customizado e *application-specific* do Google para acelerar workloads de IA |
| TPU é hardware de que tipo? | **Domain-specific**, em oposição ao *general-purpose* de CPU e GPU |
| Qual operação de ML a aula cita como exemplo do ganho da TPU? | Multiplicação de matrizes |
| Quais as duas vantagens da Cloud TPU sobre GPU e CPU? | Mais rápida e mais eficiente em energia |
| Onde guardar dados **não estruturados**? | Cloud Storage |
| Onde guardar dados **estruturados**? | BigQuery, AlloyDB for PostgreSQL e outros |
| O BigQuery lida com dados semi-estruturados? | Sim — é **altamente otimizado** para JSON |
| Como o BigQuery consulta dados **não estruturados**? | Criando uma **external table**, que dá uma referência estruturada ao dado no Cloud Storage |
| Quais são as três etapas do workflow **data-to-AI**? | Ingest and process → Store and analyze → Activate with AI |
| Produtos de **ingestão e processamento** | Pub/Sub, Dataflow, Managed Service for Apache Spark, Cloud Data Fusion |
| Bancos **SQL** citados | BigQuery, AlloyDB, Cloud SQL, Spanner |
| Bancos **NoSQL** citados | Bigtable e Firestore |
| Produto de **visualização** | Looker |
| Os três produtos da Agent Platform citados | Agent Studio, Agent Platform AutoML e Gemini Enterprise Agent Platform Notebooks |
| Qual recurso do BigQuery treina modelos com SQL? | BigQuery ML — comandos SQL embutidos |
| Quais dois produtos o curso vai aprofundar? | BigQuery (data warehouse) e Agent Platform (plataforma de desenvolvimento de IA) |

## Questões estilo prova

**1.** Uma equipe precisa rodar uma aplicação containerizada e quer os
benefícios de orquestração, mantendo controle sobre os contêineres. Qual
serviço de compute do Google Cloud atende?

- A) Compute Engine
- B) Google Kubernetes Engine (GKE)
- C) Cloud Run
- D) Cloud Storage

<details><summary>Gabarito</summary>

**B — GKE.** A aula o descreve exatamente como "controle sobre apps
containerizados com os benefícios da orquestração". (A) é controle de
máquina, como um servidor físico. (C) é serverless, sem gerenciamento de
contêiner pelo usuário. (D) não é compute.
</details>

**2.** Por que as TPUs são mais eficientes que CPUs e GPUs para cargas de
machine learning?

- A) Porque têm mais núcleos de propósito geral
- B) Porque são hardware *domain-specific*, com arquitetura adaptada a operações como multiplicação de matrizes
- C) Porque rodam exclusivamente em Cloud Run
- D) Porque dispensam storage

<details><summary>Gabarito</summary>

**B.** A aula contrasta **domain-specific hardware** (TPU) com
**general-purpose hardware** (CPU e GPU), e cita a **multiplicação de
matrizes** como a necessidade de computação do domínio. (A) inverte o
conceito — o ganho vem justamente de *não* ser de propósito geral.
</details>

**3.** Uma analista precisa consultar, com SQL, imagens e arquivos de log
que estão guardados no Cloud Storage. É possível fazer isso com o BigQuery?

- A) Não — o BigQuery só aceita dados estruturados
- B) Não — seria preciso migrar tudo para tabelas primeiro
- C) Sim — criando uma external table, que dá uma referência estruturada ao dado
- D) Sim — mas só para arquivos JSON

<details><summary>Gabarito</summary>

**C — external table.** A aula diz que o BigQuery *"can even query
unstructured data, such as log files or images stored in cloud storage, by
creating an external table"*. (A) é a pegadinha mais provável da aula.
(D) confunde com a otimização para semi-estruturados.
</details>

**4.** Classifique: quais dos produtos abaixo são bancos **NoSQL**, segundo
a aula?

- A) BigQuery e Spanner
- B) Cloud SQL e AlloyDB
- C) Bigtable e Firestore
- D) Pub/Sub e Dataflow

<details><summary>Gabarito</summary>

**C — Bigtable e Firestore.** (A) e (B) são SQL. (D) são ferramentas de
ingestão e processamento, não bancos. Atenção ao par
**Bigtable** (NoSQL) × **BigQuery** (SQL): nomes parecidos, famílias
diferentes.
</details>

**5.** Ordene as três etapas do workflow data-to-AI e diga em qual delas
entra o Pub/Sub.

<details><summary>Gabarito</summary>

**Ingest and process → Store and analyze → Activate with AI.** O
**Pub/Sub** está na **primeira** etapa, de ingestão (em tempo real), junto
de Dataflow, Managed Service for Apache Spark e Cloud Data Fusion.
</details>

**6.** Qual é o andar **base** da infraestrutura de IA do Google Cloud?

- A) Compute e storage
- B) Data and AI products
- C) Networking and security
- D) Agent Platform

<details><summary>Gabarito</summary>

**C — networking and security.** É a fundação que sustenta toda a
infraestrutura e as aplicações do Google. Compute e storage (A) ficam no
andar do meio; data and AI products (B) no topo; a Agent Platform (D) não é
um andar da infraestrutura, e sim a camada de desenvolvimento da
arquitetura maior (aula 2.2).
</details>

**7.** Segundo a aula, qual é a principal diferença entre computação em
nuvem e computação de desktop?

<details><summary>Gabarito</summary>

Na nuvem, **compute e storage são desacoplados** e por isso **escalam
separadamente**. A aula aponta isso como *"one major difference between
Cloud and desktop computing"*.
</details>

## Dúvidas em aberto / revisar
- ✅ **Divergência das enumerações de infraestrutura: resolvida.** A
  enumeração canônica é **networking/security → compute/storage → data and
  AI products**; a lista da aula 2.1 eram famílias de produto e a da 2.2
  omitia o andar de dados/IA.
- ✅ **"Gemini Notebook" (aula 2.2): resolvido.** Nome completo **Gemini
  Enterprise Agent Platform Notebooks**, produto *dentro* da Agent
  Platform.
- ⚠️ **Ainda aberto: onde entra o "Gemini Enterprise app"** citado na aula
  1.1 como opção no-code. A Agent Platform tem Agent Studio, AutoML e
  Notebooks — o *app* não aparece nesta lista. Esperar o Módulo 4.
- ⚠️ **Nomenclatura inflacionada.** A aula usa "Agent Platform", "Gemini
  Enterprise Agent Platform" e "Agent Platform AutoML" de forma
  aparentemente intercambiável. Conferir no Módulo 4 se há hierarquia real
  ou se é só o rebranding em transição.
- 📖 A aula manda consultar a **Google Documentation na reading list** para
  detalhes de GKE e Cloud Run (aula 2.9).

## Ações / próximos passos
| Ação | Prazo |
|---|---|
| Decorar o espectro Compute Engine → GKE → Cloud Run (controle → conveniência) | — |
| Decorar a divisão SQL × NoSQL (cuidado: Bigtable ≠ BigQuery) | — |
| Decorar os 4 produtos de ingestão e as 3 etapas do workflow data-to-AI | — |
| Assistir 2.4 "AI models" | — |
| Ler a reading list (GKE, Cloud Run, IA responsável) — aula 2.9 | — |

## Fontes
- Transcrição da aula — [[T - 2026-10-08-m02-a03-ai-infrastructure]]
