---
title: Aula 5.2 — Data preparation
aliases: [data preparation, Agent Platform Feature Store, objectives AutoML, feature engineering]
tags: [aula, trabalho]
type: note
area: trabalho
created: 2026-10-09
updated: 2026-10-09
status: evergreen
fonte: transcricao
confianca: media
papel: derivada
indexar: true
summary: "Aula 5.2 do curso Introduction to AI and ML on Google Cloud: o primeiro estágio do workflow — upload de dados, os três objectives para dados tabulares (regression, classification, forecasting), a definição precisa de feature, e o Agent Platform Feature Store com seus quatro passos de serving online e quatro benefícios. Estreita a leitura da 4.1: o AutoML hoje suporta principalmente dados TABULARES."
transcricao: "[[T - 2026-10-09-m05-a02-data-preparation]]"
parte_de: "[[curso-intro-ai-ml-google-cloud]]"
curso: "[[curso-intro-ai-ml-google-cloud]]"
data: 2026-10-09
related: ["[[R - 2026-10-09-m05-a01-ml-workflow]]", "[[R - 2026-10-09-m04-a02-agent-platform]]", "[[R - 2026-10-09-m04-a01-ai-development-options]]"]
---

# Aula 5.2 — Data preparation

| | |
|---|---|
| **Tema** | O primeiro estágio do workflow: upload de dados e feature engineering |
| **Curso** | [[curso-intro-ai-ml-google-cloud]] |
| **Data** | 09/10/2026 |
| **Duração** | ~3min05 |
| **Aula nº** | 5.2 (módulo 5 na plataforma, "Module 4" na fala do instrutor) |
| **Transcrição** | [[T - 2026-10-09-m05-a02-data-preparation]] |

> 🎯 **Peso na prova: ⭐⭐⭐.** Três listas fechadas e cobráveis — os **três
> objectives**, os **quatro passos** do serving online e os **quatro benefícios**
> do Feature Store — mais a **definição precisa de feature** e um termo novo
> (**objectives**). E uma **correção importante** à tabela da 4.1.

---

## Conteúdo por tópico

### 1. Os dois passos do estágio

> *"During this stage, you must **upload data** and then **prepare it for model
> training with feature engineering**."*

| # | Passo |
|---|---|
| 1 | **Upload data** |
| 2 | **Feature engineering** |

✅ Confirma exatamente o que a aula 5.1 anunciou.

**De onde vêm os dados:**

> *"The data can come from **Cloud Storage**, **BigQuery**, or even your **local
> machine**."*

📌 **São as mesmas três origens da aula 4.2** (estágio *data readiness* do
pipeline da Agent Platform). Lista estável — bom sinal de que é cobrável.

### 2. ⭐⭐⭐ Termo novo: objectives — e a correção à tabela da 4.1

> *"AutoML now **mainly supports tabular data** by solving different types of
> problems, called **objectives**."*

> **Objective** = o **tipo de problema** que o modelo resolve.

**Os três objectives para dados tabulares:**

| Objective | O que resolve |
|---|---|
| **Regression** | prever **números** |
| **Classification** | prever **categorias** |
| **Forecasting** | prever **séries temporais** — *"vital to many industries like **retail**"* |

⚠️ **E aqui está a correção.** A tabela comparativa da aula **4.1** dizia:

> *"Agent Platform AutoML supports **tabular and image** data."*

A 5.2 diz:

> *"AutoML **now mainly supports tabular** data."*

| Aula | O que o AutoML suporta |
|---|---|
| **4.1** | tabular **e imagem** |
| **5.2** | **principalmente tabular** |

> ✅ **Como responder na prova:**
> - Questão de **comparação entre as quatro opções** (o formato da tabela da
>   4.1) → **tabular e imagem**.
> - Questão sobre **o que o AutoML suporta hoje** ou que use a palavra
>   **"mainly"/"principalmente"** → **tabular**.
> - As duas palavras que reconciliam são **"now"** e **"mainly"**: a 5.2 descreve
>   o **estado atual e predominante**, não revoga a capacidade de imagem.
>
> ⚠️ **Note também que os três objectives são apresentados como "para dados
> tabulares"** — ou seja, regression/classification/forecasting são a lista de
> objectives **tabulares**, o que deixa implícito que outros tipos de dado
> teriam outros objectives.

📌 **Conexão com o Módulo 2:** **regression** prevê números e
**classification** prevê categorias — exatamente a distinção da armadilha nº 3 do
nosso índice (*logistic regression resolve classificação; linear regression
prevê números*). **Forecasting** é a terceira peça, nova aqui.

### 3. ⭐⭐ A analogia da refeição — e a definição precisa de feature

**A analogia continua a da 5.1, agora com mais detalhe:**

> *"Imagine you're preparing a meal. Your data is like your **ingredients**, such
> as **carrots, onions, and tomatoes**. Before you start cooking, you'll need to
> **peel the carrots, chop the onions, and rinse the tomatoes**. This is what
> **feature engineering** is like: **the data must be processed before the model
> starts training**."*

| | |
|---|---|
| **Os dados** | os **ingredientes** (cenouras, cebolas, tomates) |
| **Feature engineering** | **descascar, picar, lavar** |
| **A lição** | os dados **devem ser processados antes** de o modelo começar a treinar |

**⭐⭐ E a definição de feature, agora precisa:**

> *"A feature refers to a **factor that contributes to the prediction**. It's like
> an **independent variable** in statistics or a **column in a table**."*

| Definição | Fonte |
|---|---|
| *"the **processed data** that will be put into the model"* | aula **4.2** |
| *"a **factor that contributes to the prediction**"*; como uma **variável independente** ou uma **coluna de tabela** | aula **5.2** |

⚠️ **As duas definições são complementares, não contraditórias:** a 4.2 diz **de
onde vem** (dado processado), a 5.2 diz **o que é funcionalmente** (fator que
contribui para a previsão). As duas analogias — **variável independente** e
**coluna de tabela** — são as mais cobráveis.

> *"Preparing features can be both **challenging and tedious**."* — é essa a
> justificativa para o Feature Store existir.

### 4. ⭐⭐⭐ O Agent Platform Feature Store

> *"A **centralized repository** to **manage, serve, and share** features."*

⚠️ **Os três verbos — manage, serve, share — são uma lista fechada.** A aula 4.2
mencionava o feature store só como mecanismo de **compartilhamento**; aqui ele
ganha os três.

**O que ele faz:**

| Função | Detalhe |
|---|---|
| **Agrega features** | de **diferentes fontes no BigQuery** |
| **Disponibiliza para dois tipos de serving** | **real-time** (chamado **online**) e **batch** (chamado **offline**) |
| **Automatiza a agregação** | para **escalar o processo com baixa latência** |

⭐ **Decore o par de sinônimos:** **real-time = online** · **batch = offline**. É
exatamente o tipo de equivalência que a prova testa.

**E o bloco de gen AI:**

> *"Agent Platform Feature Store is **ready for generative AI**. It can **manage
> and serve embeddings**, which are **the data sources in gen AI**. It also
> supports **retrieving similar items in real time**, ensuring low latency."*

| | |
|---|---|
| **O que gerencia** | **embeddings** |
| **O que são embeddings, aqui** | *"**the data sources in gen AI**"* |
| **O que mais suporta** | **recuperar itens similares em tempo real**, com baixa latência |

📌 **Conexão com o Módulo 3:** na aula 3.2, os **embeddings models** serviam para
**busca semântica e representação de dados**. Aqui o Feature Store **os
armazena e serve** — e *"retrieving similar items"* é exatamente a **busca
semântica** aplicada. É a peça que liga o Feature Store ao **RAG**.

### 5. ⭐⭐⭐ Os quatro passos do serving online

> *"The workflow of serving **real-time (online) features** with Agent Platform
> Feature Store can be summarized as follows."*

| # | Passo | O que se cria | Obrigatório? |
|---|---|---|---|
| **1** | **Prepare the data source in BigQuery** | — | ✅ sim |
| **2** | **Register the data sources** | **feature groups** e **features** | ⚠️ **OPCIONAL** |
| **3** | **Configure the connection** | uma **feature view**, que define **quais features copiar** da fonte para o **online store** | ✅ sim |
| **4** | **Serve the latest feature values online** | — (a partir de uma feature view) | ✅ sim |

⚠️ **Três detalhes cobráveis:**

1. **O passo 2 é explicitamente OPCIONAL** — a transcrição diz *"2. **Optional:**
   Register the data sources"*. Se uma questão perguntar qual passo é opcional, é
   o **registro das fontes**.
2. **O passo 1 é no BigQuery**, não no Cloud Storage. O Feature Store agrega
   **do BigQuery**.
3. **Três objetos nomeados:** **feature groups**, **features** (passo 2) e
   **feature view** (passo 3). A **feature view** é o que **define quais features
   copiar** para o **online store**.

### 6. ⭐⭐ Os quatro benefícios do Feature Store

Todos têm a forma ***"features are…"***:

| # | Benefício | Por quê |
|---|---|---|
| **1** | **Shareable** | geridas e servidas de um **repositório central**, mantendo **consistência em toda a organização** |
| **2** | **Reusable** | **poupa tempo** e **reduz esforço duplicado** |
| **3** | **Scalable** | **escalam automaticamente** para **serving de baixa latência** — você foca na **lógica** de criá-las, sem se preocupar com **deployment** |
| **4** | **Easy to use** | construído sobre uma **UI fácil de navegar** |

⚠️ **Note a ressonância com os quatro Ss da aula 4.2** — e a diferença:

| Quatro Ss da **Agent Platform** (4.2) | Quatro benefícios das **features** (5.2) |
|---|---|
| Seamless | — |
| **Scalable** | **Scalable** |
| **Sustainable** (= reúso e compartilhamento) | **Shareable** + **Reusable** (separados) |
| Speedy | — |
| — | **Easy to use** |

**São duas listas de quatro, parecidas mas diferentes.** Na 4.2 o reúso e o
compartilhamento estavam **juntos** em "sustainable"; aqui são **dois benefícios
separados**. E "easy to use" não tem equivalente nos Ss.

⚠️ **Se a questão falar dos "quatro Ss", é a 4.2. Se falar dos "benefícios do
Feature Store", é a 5.2.**

---

## Glossário da aula

| Termo | Definição |
|---|---|
| **Objective** | O **tipo de problema** que o modelo resolve |
| **Os três objectives tabulares** | **regression** · **classification** · **forecasting** |
| **Forecasting** | Previsão de séries temporais — *"vital to many industries like **retail**"* |
| **Feature** | Um **fator que contribui para a previsão**; como uma **variável independente** ou uma **coluna de tabela** |
| **Feature engineering** | **Processar os dados antes** de o modelo começar a treinar |
| **Agent Platform Feature Store** | **Repositório centralizado** para **gerenciar, servir e compartilhar** features |
| **Online serving** | **Real-time** serving |
| **Offline serving** | **Batch** serving |
| **Feature group** | Objeto criado ao **registrar** uma fonte de dados (passo **opcional**) |
| **Feature view** | Define **quais features copiar** da fonte para o **online store** |
| **Online store** | Onde as features ficam para **serving em tempo real** |
| **Embeddings** | *"**The data sources in gen AI**"* — o Feature Store **gerencia e serve** |

---

## Flashcards

| Pergunta | Resposta |
|---|---|
| Quais os **dois passos** do estágio de data preparation? | **Upload data** e **feature engineering** |
| De onde os dados podem vir? | **Cloud Storage**, **BigQuery** ou **máquina local** |
| ⭐ O que é um **objective**? | O **tipo de problema** que o modelo resolve |
| ⭐⭐ Os **três objectives** para dados tabulares | **Regression · classification · forecasting** |
| Qual objective prevê **números**? | **Regression** |
| Qual prevê **categorias**? | **Classification** |
| Qual indústria é citada para **forecasting**? | **Retail** |
| ⚠️ O que o **AutoML** suporta, segundo a 5.2? | **Principalmente dados tabulares** |
| ⚠️ E segundo a 4.1? | **Tabular e imagem** — as palavras que reconciliam são **"now"** e **"mainly"** |
| A analogia da refeição | Dados = **ingredientes** · feature engineering = **descascar, picar, lavar** |
| A lição da analogia | Os dados **devem ser processados antes** de o treinamento começar |
| ⭐⭐ O que é uma **feature** (5.2)? | Um **fator que contribui para a previsão** |
| As duas analogias de feature | Uma **variável independente** (estatística) ou uma **coluna de tabela** |
| E a definição da 4.2? | Os **dados processados** que entram no modelo — **complementar**, não contraditória |
| Por que o Feature Store existe? | Porque preparar features é **challenging and tedious** |
| ⭐⭐ O que é o **Agent Platform Feature Store**? | **Repositório centralizado** para **gerenciar, servir e compartilhar** features |
| De onde ele agrega features? | De **diferentes fontes no BigQuery** |
| ⭐ **Online** = ? · **Offline** = ? | **Online = real-time** · **offline = batch** |
| O que o Feature Store faz por gen AI? | **Gerencia e serve embeddings** e **recupera itens similares em tempo real** |
| O que são **embeddings**, segundo esta aula? | *"**The data sources in gen AI**"* |
| ⭐⭐ Os **quatro passos** do serving online | **1** preparar a fonte no BigQuery · **2** *(opcional)* registrar criando **feature groups e features** · **3** criar a **feature view** · **4** servir os valores mais recentes |
| ⚠️ Qual passo é **opcional**? | O **2** — registrar as fontes de dados |
| O que a **feature view** define? | **Quais features copiar** da fonte para o **online store** |
| ⭐⭐ Os **quatro benefícios** do Feature Store | **Shareable · reusable · scalable · easy to use** |
| Por que **shareable**? | Repositório **central** → **consistência em toda a organização** |
| Por que **reusable**? | **Poupa tempo** e **reduz esforço duplicado** |
| Por que **scalable**? | **Escalam automaticamente** com **baixa latência** — você foca na **lógica**, não no **deployment** |
| Por que **easy to use**? | **UI fácil de navegar** |
| ⚠️ Os quatro benefícios são os quatro Ss? | **Não.** Na 4.2, reúso e compartilhamento estavam **juntos** em "sustainable"; aqui são **separados**, e entra **"easy to use"** |

---

## Questões estilo prova

**1.** ⭐⭐ Quais são os três **objectives** que o AutoML resolve para dados
tabulares?
- A) Regression, classification e clustering
- B) Regression, classification e forecasting
- C) Classification, forecasting e recommendation
- D) Regression, forecasting e anomaly detection

<details><summary>Gabarito</summary>

**B.** ⚠️ Os distratores são todos tipos de problema **reais** de ML — mas o curso
nomeia exatamente **três**: **regression, classification, forecasting**. O
**clustering** nunca é citado nesta lista.
</details>

**2.** ⭐⭐ O que é uma **feature**, na definição da aula 5.2?
- A) Os dados brutos carregados do Cloud Storage
- B) Um fator que contribui para a previsão — como uma variável independente ou uma coluna de tabela
- C) Um hiperparâmetro ajustável no compile
- D) Um recurso da interface do Agent Platform

<details><summary>Gabarito</summary>

**B.** As duas analogias são as mais cobráveis: **variável independente** e
**coluna de tabela**. ⚠️ (A) é o contrário — dado bruto é o que **entra** no
feature engineering, não o que **sai**.
</details>

**3.** ⭐⭐⭐ No workflow de serving online do Feature Store, qual passo é
**opcional**?
- A) Preparar a fonte de dados no BigQuery
- B) Registrar as fontes de dados criando feature groups e features
- C) Configurar a conexão criando uma feature view
- D) Servir os valores mais recentes a partir da feature view

<details><summary>Gabarito</summary>

**B.** A transcrição é explícita: *"2. **Optional:** Register the data sources."*
Os outros três são obrigatórios.
</details>

**4.** ⭐ No Agent Platform Feature Store, **online** e **offline** serving
correspondem a quê?
- A) Online = batch · offline = real-time
- B) Online = real-time · offline = batch
- C) Online = na nuvem · offline = na máquina local
- D) Online = com internet · offline = sem internet

<details><summary>Gabarito</summary>

**B.** **Online = real-time · offline = batch.** ⚠️ (A) é a inversão exata — o
distrator óbvio. (C) e (D) são leituras literais de "online/offline" que o curso
não usa.
</details>

**5.** ⭐⭐ Quais são os quatro benefícios do Agent Platform Feature Store?
- A) Seamless, scalable, sustainable e speedy
- B) Shareable, reusable, scalable e easy to use
- C) Managed, served, shared e aggregated
- D) Online, offline, real-time e batch

<details><summary>Gabarito</summary>

**B.** ⚠️ **(A) é a armadilha**: são os **quatro Ss da Agent Platform** (aula
4.2), não os benefícios do Feature Store. (C) são os **três verbos** da definição
do Feature Store (manage, serve, share), com um item inventado.
</details>

**6.** ⚠️ Segundo a aula 5.2, que tipo de dado o AutoML suporta?
- A) Principalmente dados tabulares
- B) Tabular e imagem
- C) Tabular, imagem, texto e vídeo
- D) Apenas dados não estruturados

<details><summary>Gabarito</summary>

**A.** *"AutoML **now mainly supports tabular** data."* ⚠️ (B) é o que a **tabela
da 4.1** diz — e é a resposta certa **para uma questão de comparação entre as
quatro opções**. As palavras que reconciliam são **"now"** e **"mainly"**: a 5.2
descreve o estado **atual e predominante**.
</details>

**7.** ⭐ O que o Feature Store gerencia e serve para dar suporte a gen AI?
- A) Prompts e templates
- B) Embeddings, descritos como "as fontes de dados em gen AI"
- C) Foundation models
- D) Agentes pré-construídos

<details><summary>Gabarito</summary>

**B.** *"It can manage and serve **embeddings**, which are **the data sources in
gen AI**."* E também **recupera itens similares em tempo real** — a busca
semântica da aula 3.2 aplicada. ⚠️ (C) é o **Model Garden**, (D) é o **Agent
Garden**.
</details>

**8.** Por que o curso diz que as features são **scalable**?
- A) Porque podem ser compartilhadas entre equipes
- B) Porque escalam automaticamente para serving de baixa latência, deixando você focar na lógica em vez do deployment
- C) Porque reduzem o esforço duplicado
- D) Porque a UI é fácil de navegar

<details><summary>Gabarito</summary>

**B.** ⚠️ (A) é **shareable**, (C) é **reusable** e (D) é **easy to use** — os
outros três benefícios da **mesma lista**. Ler qual dos quatro a questão descreve
é o teste.
</details>

---

## Dúvidas em aberto / revisar

- ⚠️ **AutoML: tabular e imagem (4.1) × principalmente tabular (5.2).** Não é
  contradição — é **"now"** e **"mainly"**. Responda pela pergunta: comparação
  entre opções → **tabular e imagem**; o que suporta hoje → **tabular**.
- ⚠️ **Os três objectives são apresentados como "para dados tabulares"**, o que
  deixa implícito que outros tipos de dado teriam outros objectives. O curso não
  os lista.
- 📌 **Duas definições de feature**, complementares: a **4.2** diz de onde vem
  (dado processado); a **5.2**, o que é (fator que contribui para a previsão).
- 📌 **Duas listas de quatro**, parecidas: os **quatro Ss** (4.2) e os **quatro
  benefícios do Feature Store** (5.2). Não as misture.
- 📌 **"Data drifting"** continua sem definição — ver a **5.4** ou a **5.5**.

---

## Ações / próximos passos

| Ação | Status |
|---|---|
| Decorar os **três objectives** tabulares | ⬜ |
| Decorar os **quatro passos** do serving online e **qual é opcional** | ⬜ |
| Decorar os **quatro benefícios** e não confundir com os quatro Ss | ⬜ |
| Guardar **online = real-time · offline = batch** | ⬜ |
| Guardar a definição de **feature** da 5.2 (fator / variável independente / coluna) | ⬜ |

---

## Fontes

- [[T - 2026-10-09-m05-a02-data-preparation]] — transcrição oficial da plataforma
  Google Skills, colada por Leonardo em 09/10/2026.
