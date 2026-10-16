---
title: Aula 4.6 — Lab introduction (Natural Language API)
aliases: [lab introduction Natural Language API, analogia do sanduiche API, metodos da Natural Language API, cURL]
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
summary: "Aula 4.6 do curso Introduction to AI and ML on Google Cloud: a introdução ao lab da Natural Language API — as quatro features detalhadas, a analogia do sanduíche na delicatessen, os cinco métodos da API, os quatro campos da requisição JSON, a chamada com cURL e os objetivos do lab."
transcricao: "[[T - 2026-10-09-m04-a06-lab-introduction]]"
parte_de: "[[curso-intro-ai-ml-google-cloud]]"
curso: "[[curso-intro-ai-ml-google-cloud]]"
data: 2026-10-09
related: ["[[R - 2026-10-09-m04-a04-pre-trained-apis]]", "[[R - 2026-10-09-m04-a05-custom-training]]"]
---

# Aula 4.6 — Lab introduction (Natural Language API)

| | |
|---|---|
| **Tema** | Introdução ao lab: usar a Natural Language API por código |
| **Curso** | [[curso-intro-ai-ml-google-cloud]] |
| **Data** | 09/10/2026 |
| **Duração** | ~4min35 |
| **Aula nº** | 4.6 (módulo 4 na plataforma, "Module 3" na fala do instrutor) |
| **Transcrição** | [[T - 2026-10-09-m04-a06-lab-introduction]] |

> 🎯 **Peso na prova: ⭐⭐.** Parece "só" uma introdução de lab, mas entrega os
> **cinco métodos** da API com os nomes exatos, os **quatro campos** da
> requisição JSON, a definição de **cURL** e a **segunda analogia de API do
> curso**. Nomes de método e campos de JSON são material de questão direta.

---

## Conteúdo por tópico

### 1. ⭐⭐ As quatro features, agora com detalhe

A aula 4.4 listou **entities, sentiment, syntax e categories**. A 4.6 **explica
cada uma** — e é esse detalhe que vira questão:

| Feature | O que é | Exemplo / detalhe |
|---|---|---|
| **Entities** | os **sujeitos** no texto de entrada | **Google** como **nome de empresa**, **Mountain View** como **localização** |
| **Sentiment** | indica **emoção** | em **dois níveis**: do **documento como um todo** e de **cada sujeito individual** |
| **Syntax** | extrai **informação linguística** | como a **relação entre as palavras** |
| **Categories** | **classifica o texto** em categorias | com base em **tópicos ou palavras-chave**; é como **atribuir uma tag** a um texto |

⚠️ **Dois detalhes que a 4.4 não dava:**

1. **Entities são "sujeitos"** — e o exemplo mostra que vêm **com o tipo**
   (empresa, localização), não só o nome.
2. **O sentiment tem DOIS níveis** — documento inteiro **e** sujeito individual.
   Isso explica por que existem **dois métodos diferentes** (seção 3).

### 2. ⭐⭐ A analogia do sanduíche — e o par com a tomada

> *"Using APIs in your code is similar to **ordering a sandwich at a deli**. You
> order from the **menu** and get your food **without worrying about how it was
> made in the kitchen**."*

📌 **É a SEGUNDA analogia de API do curso.** A 4.4 usou a **tomada elétrica**; a
4.6 usa o **sanduíche**. As duas fazem o mesmo ponto — você usa sem saber da
implementação — mas **cada uma tem sua própria tríade**, e elas **não são a mesma
tríade**:

| | **Tomada elétrica (4.4)** | **Sanduíche na deli (4.6)** |
|---|---|---|
| **O que você precisa saber** | **qual API** · **quais parâmetros** · **em que formato** | **features** · **input** · **output** |
| **O que você ignora** | o que há **atrás da parede** | como foi feito **na cozinha** |
| **A metáfora de cada peça** | o **adaptador** | o **menu**, o **pedido**, o **sanduíche** |

⚠️ **Se a questão perguntar "as três coisas que você precisa saber para usar uma
API", confira qual aula ela está citando.** As duas respostas são válidas, mas
são listas diferentes.

**O mapeamento da tríade do sanduíche:**

| Peça | Metáfora | O que é de verdade |
|---|---|---|
| **Features** | o **menu** | os **tipos de requisição** que você pode fazer à API |
| **Input** | o **pedido** | **como você constrói** as requisições |
| **Output** | o **sanduíche** | a **resposta** — *"with this, you can determine next steps"* |

**E a frase que justifica o lab existir:**

> *"You perform all of this analysis through a **UI**, which is a quick and
> efficient way to **demonstrate and test** these features. **However**, if you
> want to incorporate these features in **production**, you **must embed the APIs
> into code**."*

| | **UI** | **Código** |
|---|---|---|
| **Serve para** | **demonstrar e testar** — rápido e eficiente | **produção** |

⚠️ Essa oposição **UI para testar × código para produção** é um ponto conceitual
cobrável, e é a razão de ser do lab.

### 3. ⭐⭐⭐ Os cinco métodos da API

> *"The Natural Language API provides **several methods** for performing
> **analysis and annotation** on your text. You'll practice with **most of
> them** in the lab."*

| Método | Para que serve | Nível |
|---|---|---|
| `analyzeEntities` | **análise de entidades** | — |
| `analyzeSentiment` | **análise de sentimento** | do **texto inteiro** |
| `analyzeEntitySentiment` | **análise de sentimento** | de **cada entidade/sujeito** |
| `analyzeSyntax` | **análise sintática** | — |
| `classifyText` | **classificação de conteúdo** | — |

⚠️ **Três armadilhas:**

1. **São CINCO métodos para QUATRO features.** O sentimento tem **dois** métodos,
   porque tem **dois níveis**. Se a questão perguntar "quantos métodos", a
   resposta é **cinco**; se perguntar "quantas features", **quatro**.
2. ⚠️ **`analyzeSentiment` × `analyzeEntitySentiment`** é a distinção mais
   provável de cair: **texto inteiro** × **entidade individual**.
3. **`classifyText` é o único que não começa com `analyze`** — porque não analisa,
   **classifica**.

### 4. ⭐⭐ O formato da requisição: REST + JSON

> *"The Natural Language API **is a REST API** and consists of **JSON requests
> and responses**."*

**Os quatro campos de uma requisição simples de análise de entidades:**

| # | Campo | O que recebe | Exemplo |
|---|---|---|---|
| 1 | **type** (do documento) | o tipo do documento | **plain text** |
| 2 | **language** | o idioma | **EN** (de *English*) |
| 3 | **content** | ⚠️ **o texto em si** **ou** a **localização do arquivo no Cloud Storage** | — |
| 4 | **encodingType** | o tipo de codificação | **UTF8** |

⚠️ **O campo `content` aceita duas coisas** — texto literal **ou** caminho no
**Cloud Storage**. Essa alternativa é o detalhe mais cobrável dos quatro campos.

### 5. ⭐ Chamar a API: cURL e os SDKs

**A analogia continua:** *"Just like, after you decide what you want at a deli,
you need to **place the order with the counter person**."*

> **cURL** = ***client URL***. *"A **command-line tool** to **transfer data
> between client and server**."*

📌 **O cURL já havia aparecido na aula 3.2**, como a ferramenta do degrau
**low-code** (Gen AI APIs + cUrl). Aqui ele finalmente ganha a **definição**.

**As alternativas:** *"You can also use other programming languages such as
**Python and Java SDKs**."*

**E a observação geral sobre quem define o quê:**

> *"Typically, the **vendors** of the product and services you are using
> **define the APIs** and **provide the SDKs** in different languages for you to
> choose."*

⚠️ **Vendors definem as APIs e fornecem os SDKs.** É a frase que organiza a
relação API ↔ SDK que vinha ambígua desde a 3.2 e a 4.4: a **API** é o contrato
do fornecedor; o **SDK** é a conveniência que ele oferece por linguagem.

**O exemplo concreto do lab:**

| Passo | O que acontece |
|---|---|
| 1 | chamar a feature `analyzeEntities` |
| 2 | passar o arquivo **`request.json`** que você construiu |
| 3 | salvar a resposta em **`result.json`** |

**E como tratar a resposta:**

> *"You can **review** the result by using a command like **`cat result.json`**
> or **parse it** for further usage."*

Duas opções: **ler** (cat) ou **parsear** para uso posterior.

### 6. Os objetivos do lab

**O que você vai fazer** — *"use the Natural Language API to…"*:

| # | Tarefa |
|---|---|
| 1 | **Extract entities** |
| 2 | **Analyze sentiment** |
| 3 | **Analyze syntax** |

**A prática que você leva** — *"you'll get practice…"*:

| # | Prática |
|---|---|
| 1 | **Criar** uma requisição da Natural Language API e **chamar a API com cURL** |
| 2 | **Extrair entidades** e **rodar análise de sentimento** |
| 3 | **Realizar análise linguística** |
| 4 | **Criar uma requisição em outro idioma** |

⚠️ **Três observações sobre o escopo:**

1. **O lab faz TRÊS das quatro features** — fica de fora a **classificação de
   conteúdo** (`classifyText`).
2. **O título do lab menciona só duas** ("Entity and Sentiment Analysis"), mas a
   aula lista **três** tarefas, incluindo **sintaxe**.
3. **A quarta prática — "em outro idioma" — refere-se ao campo `language`** da
   requisição JSON, não a outra linguagem de programação. Boa pegadinha de
   tradução.

---

## Glossário da aula

| Termo | Definição |
|---|---|
| **Entities** | Os **sujeitos** no texto, identificados **com o tipo** (empresa, localização) |
| **Sentiment** | A **emoção**, em **dois níveis**: documento inteiro e sujeito individual |
| **Syntax** | **Informação linguística**, como a **relação entre as palavras** |
| **Categories** | Classificação por **tópicos ou palavras-chave** — como **atribuir uma tag** |
| **REST API** | O tipo de API da Natural Language — requisições e respostas em **JSON** |
| **cURL** | ***Client URL*** — **ferramenta de linha de comando** para **transferir dados entre cliente e servidor** |
| **`analyzeEntities`** | Método de **análise de entidades** |
| **`analyzeSentiment`** | Sentimento do **texto inteiro** |
| **`analyzeEntitySentiment`** | Sentimento de **cada entidade/sujeito** |
| **`analyzeSyntax`** | **Análise sintática** |
| **`classifyText`** | **Classificação de conteúdo** |
| **Vendor** | Quem **define as APIs** e **fornece os SDKs** nas diferentes linguagens |

---

## Flashcards

| Pergunta | Resposta |
|---|---|
| O que são **entities**? | Os **sujeitos** no texto de entrada — ex.: **Google** (empresa), **Mountain View** (localização) |
| ⭐ Em quantos níveis o **sentiment** opera? | **Dois** — **documento inteiro** e **sujeito individual** |
| O que a análise de **syntax** extrai? | **Informação linguística**, como a **relação entre as palavras** |
| Com base em quê o texto é **classificado**? | **Tópicos ou palavras-chave** — como **atribuir uma tag** |
| ⭐ Para que serve a **UI** × o **código**? | UI = **demonstrar e testar** · código = **produção** |
| Qual a analogia da aula 4.6? | **Pedir um sanduíche numa delicatessen** |
| ⭐ As três coisas da analogia do sanduíche | **Features** (menu) · **input** (pedido) · **output** (sanduíche) |
| O que são as **features**, de verdade? | Os **tipos de requisição** que você pode fazer |
| O que é o **input**? | **Como você constrói** as requisições |
| O que é o **output**? | A **resposta** |
| ⭐⭐ Quantos **métodos** a API tem? | **Cinco** — para **quatro** features |
| Qual método analisa entidades? | `analyzeEntities` |
| ⭐⭐ `analyzeSentiment` × `analyzeEntitySentiment` | **Texto inteiro** × **entidade/sujeito individual** |
| Qual método analisa sintaxe? | `analyzeSyntax` |
| Qual método classifica conteúdo? | `classifyText` — **o único que não começa com `analyze`** |
| ⭐ Que tipo de API é a Natural Language? | Uma **REST API**, com requisições e respostas em **JSON** |
| ⭐ Os **quatro campos** da requisição | **type** (ex.: plain text) · **language** (ex.: EN) · **content** · **encodingType** (ex.: UTF8) |
| ⚠️ O que o campo **content** aceita? | **O texto em si** **ou** a **localização do arquivo no Cloud Storage** |
| O que **cURL** significa? | ***Client URL*** |
| O que o cURL faz? | **Ferramenta de linha de comando** para **transferir dados entre cliente e servidor** |
| Que alternativas existem ao cURL? | **SDKs de Python e Java** |
| Quem define as APIs e fornece os SDKs? | Os **vendors** do produto ou serviço |
| Como se trata a resposta? | **`cat result.json`** para revisar, ou **parsear** para uso posterior |
| ⭐ Quais **três** tarefas o lab faz? | **Extrair entidades · analisar sentimento · analisar sintaxe** |
| ⚠️ Qual feature o lab **não** cobre? | A **classificação de conteúdo** (`classifyText`) |
| ⚠️ O que significa "criar uma requisição em outro idioma"? | Mudar o campo **`language`** — **não** é outra linguagem de programação |

---

## Questões estilo prova

**1.** ⭐⭐ Qual a diferença entre `analyzeSentiment` e `analyzeEntitySentiment`?
- A) O primeiro é síncrono, o segundo assíncrono
- B) O primeiro analisa o sentimento do texto inteiro; o segundo, de cada entidade individual
- C) O primeiro é gratuito, o segundo é pago
- D) O primeiro usa JSON, o segundo usa cURL

<details><summary>Gabarito</summary>

**B.** ⭐ É a distinção mais provável de cair, e ela existe porque o **sentiment
opera em dois níveis** — documento e sujeito. Por isso há **cinco métodos** para
**quatro features**.
</details>

**2.** ⭐ Quais são os quatro campos de uma requisição JSON simples da Natural
Language API?
- A) method, endpoint, body e headers
- B) type do documento, language, content e encodingType
- C) features, input, output e response
- D) entities, sentiment, syntax e categories

<details><summary>Gabarito</summary>

**B.** ⚠️ (C) é a **tríade da analogia do sanduíche** (com um item inventado) e
(D) são as **features** da API — distratores feitos de conteúdo real da mesma
aula.
</details>

**3.** ⚠️ O campo **content** de uma requisição aceita:
- A) Apenas o texto literal
- B) Apenas um caminho no Cloud Storage
- C) O texto em si ou a localização do arquivo no Cloud Storage
- D) Apenas uma URL pública

<details><summary>Gabarito</summary>

**C.** A alternativa é explícita na aula e é o detalhe mais cobrável dos quatro
campos.
</details>

**4.** ⭐ O que significa **cURL**, e o que ele faz?
- A) Cloud URL — um serviço de hospedagem de arquivos
- B) Client URL — uma ferramenta de linha de comando para transferir dados entre cliente e servidor
- C) Call URL — uma biblioteca Python para chamar APIs
- D) Custom URL — um gerador de endpoints

<details><summary>Gabarito</summary>

**B.** *"cURL stands for **client URL** and is a **command-line tool** to
**transfer data between client and server**."* O cURL já aparecia na aula **3.2**
como ferramenta do degrau low-code; aqui ele ganha a definição.
</details>

**5.** Segundo a aula, quando você precisa **embutir as APIs em código** em vez
de usar a UI?
- A) Quando quer demonstrar e testar as features
- B) Quando quer incorporar as features em produção
- C) Quando o texto está no Cloud Storage
- D) Quando o texto não está em inglês

<details><summary>Gabarito</summary>

**B.** A oposição é explícita: **UI** = *"quick and efficient way to **demonstrate
and test**"* · **código** = **produção**. ⚠️ (A) é exatamente o oposto.
</details>

**6.** ⭐ Na analogia do sanduíche, o que corresponde ao **menu**?
- A) O input — como você constrói a requisição
- B) As features — os tipos de requisição que você pode fazer
- C) O output — a resposta
- D) O cURL — a forma de fazer o pedido

<details><summary>Gabarito</summary>

**B.** **Menu = features.** O **pedido** é o **input** e o **sanduíche** é o
**output**. ⚠️ (D) é tentador porque o cURL é comparado a *"fazer o pedido com o
atendente"* — mas isso é a **chamada**, não o menu.
</details>

**7.** ⚠️ Qual das quatro features da Natural Language API **não** é praticada no
lab?
- A) Extração de entidades
- B) Análise de sentimento
- C) Análise de sintaxe
- D) Classificação de conteúdo em categorias

<details><summary>Gabarito</summary>

**D.** O lab faz **três**: extrair entidades, analisar sentimento e analisar
sintaxe. O `classifyText` fica de fora — *"you'll practice with **most of
them**"*, não todos.
</details>

---

## Dúvidas em aberto / revisar

- 📌 **Duas analogias de API, duas tríades diferentes.** 4.4 (tomada): **qual
  API · quais parâmetros · em que formato**. 4.6 (sanduíche): **features ·
  input · output**. Confira qual aula a questão cita.
- 📌 **O título do lab 4.7 subestima o escopo:** fala de "Entity and Sentiment
  Analysis", mas a aula lista **três** tarefas, incluindo **sintaxe**.
- ⚠️ **"Criar uma requisição em outro idioma"** = mudar o campo `language`, não
  trocar de linguagem de programação.
- 📌 **Falta para fechar o Módulo 4:** o **lab 4.7**, o **summary 4.8**, o **quiz
  4.9** e o **reading 4.10**.

---
