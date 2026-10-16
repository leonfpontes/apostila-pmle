---
title: Aula 5.4 — Model serving
aliases: [model serving, endpoint, batch prediction, edge computing, model management]
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
summary: "Aula 5.4 do curso Introduction to AI and ML on Google Cloud: o terceiro e último estágio do workflow — as duas opções de deployment (endpoint para real-time × model resource para batch), quando usar edge computing, o conceito de model management que atravessa todo o workflow, e o Agent Platform Pipelines como backbone do monitoramento."
transcricao: "[[T - 2026-10-09-m05-a04-model-serving]]"
parte_de: "[[curso-intro-ai-ml-google-cloud]]"
curso: "[[curso-intro-ai-ml-google-cloud]]"
data: 2026-10-09
related: ["[[R - 2026-10-09-m05-a03-model-development]]", "[[R - 2026-10-09-m05-a01-ml-workflow]]", "[[R - 2026-10-09-m05-a02-data-preparation]]"]
---

# Aula 5.4 — Model serving

| | |
|---|---|
| **Tema** | O terceiro estágio: implantar e monitorar o modelo |
| **Curso** | [[curso-intro-ai-ml-google-cloud]] |
| **Data** | 09/10/2026 |
| **Duração** | ~3min30 |
| **Aula nº** | 5.4 (módulo 5 na plataforma, "Module 4" na fala do instrutor) |
| **Transcrição** | [[T - 2026-10-09-m05-a04-model-serving]] |

> 🎯 **Peso na prova: ⭐⭐⭐.** A distinção **endpoint × batch prediction** é
> cobrável de forma quase binária, e vem com **dois exemplos de cenário** prontos
> para virar questão. Mais **edge computing** (com três motivos), um conceito
> novo (**model management**) e o fechamento da analogia do restaurante.

---

## Conteúdo por tópico

### 1. Os dois passos do estágio

> *"Model serving consists of **two steps**."*

| # | Passo | No restaurante |
|---|---|---|
| 1 | **Model deployment** | **servir a refeição ao cliente faminto** |
| 2 | **Model monitoring** | **conferir com os garçons** se o restaurante está operando com eficiência |

✅ Confirma a 5.1 (*"this is when the model is **deployed and monitored**"*). E
fecha a analogia iniciada na 5.1: *"The restaurant is open and operating
smoothly. **Bon appétit!**"*

### 2. ⭐⭐ Conceito novo: model management

> *"It's important to note that **model management exists throughout this whole
> workflow** to manage the **underlying machine learning infrastructure**. This
> lets data scientists focus on **what to do** and not on **how to do it**."*

| | |
|---|---|
| **Onde existe** | ⚠️ **ao longo de TODO o workflow** — não é um estágio |
| **O que gerencia** | a **infraestrutura de ML subjacente** |
| **O benefício** | o cientista de dados foca no **o quê**, não no **como** |

⚠️ **Esta é a armadilha da aula.** O **model management** **não é** um quarto
estágio nem um passo do estágio 3 — ele **atravessa os três estágios**. Se uma
alternativa listar "model management" entre os estágios do workflow, está errada.

📌 **A formulação "what to do, not how to do it"** é a mesma ideia do AutoML
(*"focus on **what business problems to solve** instead of **how to code and
deploy**"*, aula 4.2) e dos quatro Ss. O curso repete essa estrutura — vale notar
o padrão.

### 3. ⭐⭐⭐ As duas opções de deployment

> *"You have **two primary options**."*

| | **Opção 1 — Endpoint** | **Opção 2 — Model resource** |
|---|---|---|
| **Para que tipo de previsão** | **real-time**, também chamada **online** | **batch** |
| **Como funciona** | **implantar o modelo num endpoint** | **pedir o prediction job direto do model resource** |
| **Quando é melhor** | quando se precisa de **resultados imediatos com baixa latência** | quando **nenhuma resposta imediata** é necessária |
| **O exemplo do curso** | **recomendações instantâneas** com base nos **hábitos de navegação** do usuário, enquanto ele está online | **campanhas de marketing a cada duas semanas**, com base no **comportamento de compra recente** e no **que está popular no mercado** |
| ⚠️ **Precisa de endpoint?** | ✅ **SIM — obrigatório** | ❌ **NÃO** |

> ⭐⭐⭐ **As duas frases decisivas, quase literais:**
> - *"A model **must be deployed to an endpoint** before it can be used to serve
>   **real-time** predictions."*
> - *"**Batch prediction does not require deploying the model to an endpoint**."*
>
> **Essa é a questão mais provável da aula.** O endpoint é o que separa as duas
> opções.

📌 **Decore o par de sinônimos, de novo:** **real-time = online**. É o mesmo par
que a aula **5.2** usou para o Feature Store (**online = real-time · offline =
batch**). **Lista estável no curso** — e agora em dois contextos diferentes.

**Como implantar:**

> *"You can deploy a model either **using the UI** on Agent Platform, or **using
> code by calling APIs**."*

📌 E o curso avisa: *"you'll practice **building an endpoint** later in the lab."*

### 4. ⭐⭐ Edge computing — o deployment fora da nuvem

> *"Beyond making predictions in the cloud, deploying the model **off cloud with
> edge computing** is also possible."*

**Os três motivos para adotar:**

| # | Motivo |
|---|---|
| 1 | **mitigar latência** |
| 2 | **garantir privacidade** |
| 3 | **habilitar funcionalidade offline** |

> *"This approach is generally adopted when the model needs to be deployed in a
> **specific environment** to **mitigate latency**, **ensure privacy**, or
> **enable offline functionality**."*

**O exemplo do curso:**

> *"Consider an **IoT application** like **object detection** that utilizes a
> **camera feed** in a **manufacturing plant**. In such a use case, the **added
> latency of relying on the cloud can be impractical**."*

| | |
|---|---|
| **O cenário** | **IoT** · **detecção de objetos** · **feed de câmera** · **planta industrial** |
| **O problema** | a **latência adicional** de depender da nuvem é **impraticável** |

⚠️ **Três motivos, não dois.** A **privacidade** é o que mais escapa da memória,
porque o exemplo dado ilustra só a **latência**. Guarde os três.

### 5. ⭐⭐⭐ Agent Platform Pipelines — o backbone do monitoramento

> *"The **backbone of automating ML workflow** on Agent Platform is a toolkit
> called **Agent Platform Pipelines**. It **automates, monitors, and governs**
> machine learning systems by **orchestrating the workflow in a serverless
> manner**."*

| | |
|---|---|
| **O que é** | um **toolkit** |
| **O papel** | o **backbone da automação** do workflow de ML |
| **Os três verbos** | **automates · monitors · governs** |
| **Como** | **orquestrando o workflow de forma serverless** |

⚠️ **Os três verbos são lista fechada e cobrável:** **automatiza, monitora e
governa**. E **"serverless"** é a palavra que descreve o **como**.

**A analogia da sala de controle:**

> *"Imagine you're in a **production control room**, and Agent Platform Pipelines
> is **displaying the production data on screen**. If something goes wrong, it
> **automatically triggers and displays a warning** based on a **predefined
> threshold**."*

| | |
|---|---|
| **A analogia** | uma **sala de controle de produção** |
| **O que faz** | exibe os **dados de produção na tela** |
| **Quando algo dá errado** | **dispara e exibe um aviso automaticamente** |
| **Com base em quê** | um **threshold predefinido** |

⭐ **"Predefined threshold"** é o detalhe técnico: o alerta não é mágico — você
**define o limiar** antes.

**E como você define seu próprio pipeline:**

> *"With **Agent Platform Workbench** and **Agent Platform Colab Enterprise**,
> which are **notebook tools**, you can **define your own pipeline using SDKs**.
> You can do this with **pre-built pipeline components**, which means that you
> primarily need to specify **how the pipeline is put together** using
> **components as building blocks**."*

⚠️ **Note a mudança sutil em relação à aula 5.1:**

| Aula | Quais são os "building blocks" de um pipeline |
|---|---|
| **5.1** | *"pre-built **SDKs**… which are the **building blocks** of a pipeline"* |
| **5.4** | *"pre-built **pipeline components**… using **components as building blocks**"* |

> ✅ **A leitura que reconcilia:** os **SDKs** são a **ferramenta** com que você
> escreve o pipeline; os **components** são as **peças** que você encaixa. A 5.4
> é mais precisa, e a frase *"you primarily need to specify **how the pipeline is
> put together**"* explica o papel do desenvolvedor: **montar**, não construir as
> peças.
>
> **Em prova:** se a pergunta for "o que você encaixa para montar um pipeline?" →
> **pre-built components**. Se for "com o que você define o pipeline?" → **SDKs**,
> em **Workbench** ou **Colab Enterprise**.

📌 O curso adia o aprofundamento: *"you'll explore more details about Agent
Platform Pipelines in the **next lesson**"* — aula **5.5**.

### 6. ⚠️ "Data drifting" continua sem definição

A aula 5.1 nomeou **data drifting** como um dos problemas que você encontra
**monitorando** o modelo. Esta é a aula **sobre monitoramento** — e ela **não
define o termo**, nem o menciona.

| Aula | O que diz sobre data drifting |
|---|---|
| **5.1** | nomeia como problema do monitoramento, ao lado da **queda súbita de acurácia** |
| **5.4** | ⚠️ **não menciona** |

> 📌 **Resta a aula 5.5 (MLOps).** Se não vier lá, encerro como **menção solta** —
> mesmo tratamento que dei ao **chain-of-thought** no Módulo 3. Para a prova,
> basta saber que é **um problema detectado no monitoramento do modelo em
> produção**, e que a resposta é **checar as fontes de dados e ajustar os
> parâmetros** (5.1).

---

## Glossário da aula

| Termo | Definição |
|---|---|
| **Model deployment** | Passo 1 do estágio 3 — o modelo é **implementado e pronto para servir** |
| **Model monitoring** | Passo 2 — acompanhar a **performance** depois de implantado |
| **Model management** | ⚠️ Existe **ao longo de TODO o workflow**; gerencia a **infraestrutura de ML subjacente** |
| **Endpoint** | O destino do deployment para **previsões em tempo real**; **obrigatório** para real-time |
| **Real-time prediction** | Também chamada **online prediction** |
| **Batch prediction** | Pedida **direto do model resource**; ⚠️ **não exige endpoint** |
| **Model resource** | De onde se pede o **prediction job** no modo batch |
| **Edge computing** | Deployment **fora da nuvem**, num **ambiente específico** |
| **Agent Platform Pipelines** | **Toolkit**; o **backbone da automação**; **automatiza, monitora e governa** de forma **serverless** |
| **Predefined threshold** | O **limiar** com base no qual o alerta de produção é disparado |
| **Pre-built pipeline components** | As **peças** que você encaixa para montar um pipeline |

---

## Flashcards

| Pergunta | Resposta |
|---|---|
| Quais os **dois passos** do model serving? | **Model deployment** e **model monitoring** |
| E na analogia do restaurante? | **Servir a refeição** e **conferir com os garçons** |
| ⚠️ Onde existe o **model management**? | **Ao longo de TODO o workflow** — não é um estágio |
| O que ele gerencia? | A **infraestrutura de ML subjacente** |
| Qual o benefício? | O cientista de dados foca no **o quê**, não no **como** |
| ⭐⭐ Qual a **opção 1** de deployment? | Implantar num **endpoint**, para previsões **real-time (online)** |
| Quando ela é melhor? | Quando se precisa de **resultados imediatos com baixa latência** |
| O exemplo da opção 1 | **Recomendações instantâneas** com base nos **hábitos de navegação** |
| ⭐⭐ Qual a **opção 2**? | Pedir o **prediction job direto do model resource**, para **batch** |
| Quando ela é melhor? | Quando **nenhuma resposta imediata** é necessária |
| O exemplo da opção 2 | **Campanhas de marketing a cada duas semanas** |
| ⭐⭐⭐ **Real-time** exige endpoint? | **SIM — obrigatório** |
| ⭐⭐⭐ **Batch** exige endpoint? | **NÃO** |
| **Real-time** também se chama? | **Online prediction** |
| Como se implanta um modelo? | Pela **UI** ou **por código, chamando APIs** |
| O que é **edge computing**? | Deployment **fora da nuvem**, num **ambiente específico** |
| ⭐ Os **três motivos** para edge | **Mitigar latência** · **garantir privacidade** · **habilitar funcionalidade offline** |
| O exemplo de edge | **IoT**: **detecção de objetos** por **feed de câmera** numa **planta industrial** |
| Por que a nuvem não serve ali? | A **latência adicional** é **impraticável** |
| ⭐⭐ O que é o **Agent Platform Pipelines**? | Um **toolkit**; o **backbone da automação** do workflow de ML |
| ⭐⭐ Os **três verbos** | **Automates · monitors · governs** |
| De que forma ele orquestra? | De forma **serverless** |
| A analogia | Uma **sala de controle de produção** |
| Com base em quê o aviso dispara? | Um **threshold predefinido** |
| Onde você define seu pipeline? | Em **Workbench** ou **Colab Enterprise**, **usando SDKs** |
| O que você encaixa para montar? | **Pre-built pipeline components** |
| Qual o seu papel ao montar? | Especificar **como o pipeline é montado** — as peças já existem |

---

## Questões estilo prova

**1.** ⭐⭐⭐ Um e-commerce quer mostrar recomendações de produto no momento em que
o usuário navega pelo site. Qual opção de deployment?
- A) Batch prediction, pedida direto do model resource
- B) Deployment num endpoint, para previsões em tempo real
- C) Edge computing numa planta industrial
- D) Nenhuma — isso não é um caso de ML

<details><summary>Gabarito</summary>

**B.** *"Immediate results with **low latency**… such as making **instant
recommendations** based on a user's **browsing habits**."* É literalmente o
exemplo do curso. ⚠️ (A) falharia: batch é para quando **nenhuma resposta
imediata** é necessária.
</details>

**2.** ⭐⭐⭐ Qual das duas opções de deployment **não** exige implantar o modelo
num endpoint?
- A) Real-time prediction
- B) Online prediction
- C) Batch prediction
- D) As duas exigem endpoint

<details><summary>Gabarito</summary>

**C.** *"**Batch prediction does not require deploying the model to an
endpoint**."* ⚠️ Note que (A) e (B) são **a mesma coisa** — **real-time = online**
— e as duas **exigem** endpoint.
</details>

**3.** ⭐⭐ Uma equipe envia campanhas de marketing a cada duas semanas com base no
comportamento de compra recente. Qual opção?
- A) Endpoint para real-time predictions
- B) Batch prediction
- C) Edge computing
- D) Online prediction

<details><summary>Gabarito</summary>

**B.** É o exemplo literal do curso para **batch**: *"sending out marketing
campaigns **every other week**"*. A periodicidade de duas semanas é o sinal de
que **nenhuma resposta imediata** é necessária. ⚠️ (A) e (D) são a mesma opção,
com nomes diferentes.
</details>

**4.** ⭐⭐ Quais são os três motivos para adotar **edge computing**?
- A) Reduzir custo, aumentar acurácia e simplificar o deployment
- B) Mitigar latência, garantir privacidade e habilitar funcionalidade offline
- C) Escalar automaticamente, reusar features e compartilhar artifacts
- D) Automatizar, monitorar e governar

<details><summary>Gabarito</summary>

**B.** ⚠️ Os distratores são **listas reais do curso em outro lugar**: (C) são
benefícios do **Feature Store** (5.2) e (D) são os **três verbos do Agent
Platform Pipelines** (esta mesma aula!). A **privacidade** é o motivo que mais
escapa, porque o exemplo da planta industrial ilustra só a **latência**.
</details>

**5.** ⚠️ O **model management** acontece em qual estágio do workflow?
- A) No estágio 1, data preparation
- B) No estágio 3, model serving
- C) Em nenhum — ele existe ao longo de todo o workflow
- D) Entre os estágios 2 e 3

<details><summary>Gabarito</summary>

**C.** *"Model management exists **throughout this whole workflow**."* ⚠️ (B) é o
distrator natural, porque o conceito é **apresentado** na aula do estágio 3 — mas
a frase do curso é explícita. Ele gerencia a **infraestrutura subjacente**, para
o cientista de dados focar no **o quê** e não no **como**.
</details>

**6.** ⭐⭐ Quais são os três verbos que descrevem o que o **Agent Platform
Pipelines** faz?
- A) Treina, avalia e implanta
- B) Automatiza, monitora e governa
- C) Gerencia, serve e compartilha
- D) Descobre, constrói e implanta

<details><summary>Gabarito</summary>

**B.** *"It **automates, monitors, and governs** machine learning systems by
orchestrating the workflow in a **serverless** manner."* ⚠️ **Todos os
distratores são tríades reais do curso:** (A) são atividades dos estágios 2 e 3,
(C) são os três verbos do **Feature Store** (5.2) e (D) são os verbos da suíte de
**agentes** (4.4).
</details>

**7.** ⭐ Na analogia da sala de controle, com base em quê o aviso é disparado?
- A) Numa avaliação manual do cientista de dados
- B) Num threshold predefinido
- C) Na queda da acurácia abaixo de 50%
- D) Num alerta enviado pelo endpoint

<details><summary>Gabarito</summary>

**B.** *"It **automatically triggers and displays a warning** based on a
**predefined threshold**."* O alerta é automático, mas o **limiar você define
antes**.
</details>

**8.** ⭐ Onde você define seu próprio pipeline, e com o quê?
- A) Na UI do AutoML, por point-and-click
- B) Em Workbench ou Colab Enterprise, usando SDKs e componentes pré-construídos
- C) No Model Garden, escolhendo um template
- D) No Feature Store, criando uma feature view

<details><summary>Gabarito</summary>

**B.** ⚠️ (C) confunde com o **Agent Garden** (templates de **agente**, aula 3.8)
e (D) é o passo 3 do serving online do **Feature Store** (5.2). Seu papel é
especificar **como o pipeline é montado** — as peças já existem.
</details>

---

## Dúvidas em aberto / revisar

- ⚠️ **"Data drifting" continua sem definição** — e esta era a aula sobre
  **monitoramento**. Resta a **5.5 (MLOps)**. Se não vier, encerro como **menção
  solta**, como fiz com o chain-of-thought.
- 📌 **Duas descrições dos "building blocks" de um pipeline:** a 5.1 diz **SDKs**,
  a 5.4 diz **components**. Reconciliação: os **SDKs** são a ferramenta com que
  você escreve; os **components** são as peças que você encaixa.
- ✅ **O par real-time = online** aparece agora em **dois** contextos (Feature
  Store na 5.2, deployment na 5.4). Lista estável.
- 📌 **O workflow de ML está completo** — os três estágios foram cobertos por 5.2,
  5.3 e 5.4. O que vem é **MLOps** (5.5) e o **lab**.

---

## Ações / próximos passos

| Ação | Status |
|---|---|
| Decorar **endpoint = real-time (obrigatório)** × **batch = model resource (não exige endpoint)** | ⬜ |
| Decorar os **três motivos** do edge computing — sem esquecer a **privacidade** | ⬜ |
| Guardar que **model management atravessa todo o workflow** | ⬜ |
| Decorar os **três verbos** do Agent Platform Pipelines | ⬜ |
| Labs e quizzes pendentes: 2.6, 2.8, 3.6, 3.10, 4.7, 4.9 | ⬜ |

---

## Fontes

- [[T - 2026-10-09-m05-a04-model-serving]] — transcrição oficial da plataforma
  Google Skills, colada por Leonardo em 09/10/2026.
