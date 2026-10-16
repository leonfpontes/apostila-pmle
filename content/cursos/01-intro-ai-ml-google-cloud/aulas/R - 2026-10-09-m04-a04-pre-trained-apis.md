---
title: Aula 4.4 — Pre-trained APIs
aliases: [pre-trained APIs, analogia das tomadas API, Natural Language API, categorias de API Google Cloud]
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
summary: "Aula 4.4 do curso Introduction to AI and ML on Google Cloud: pre-trained APIs como solução low-code — o número de registros que um modelo custom exige, a analogia das tomadas elétricas, os quatro passos do código com o SDK do Gemini, as categorias de API do Google Cloud e os quatro achados da Natural Language API."
transcricao: "[[T - 2026-10-09-m04-a04-pre-trained-apis]]"
parte_de: "[[curso-intro-ai-ml-google-cloud]]"
curso: "[[curso-intro-ai-ml-google-cloud]]"
data: 2026-10-09
related: ["[[R - 2026-10-09-m04-a03-agent-platform-automl]]", "[[R - 2026-10-09-m04-a01-ai-development-options]]", "[[R - 2026-10-09-m04-a05-custom-training]]"]
---

# Aula 4.4 — Pre-trained APIs

| | |
|---|---|
| **Tema** | Pre-trained APIs: a solução low-code |
| **Curso** | [[curso-intro-ai-ml-google-cloud]] |
| **Data** | 09/10/2026 |
| **Duração** | ~3min50 |
| **Aula nº** | 4.4 (módulo 4 na plataforma, "Module 3" na fala do instrutor) |
| **Transcrição** | [[T - 2026-10-09-m04-a04-pre-trained-apis]] |

> 🎯 **Peso na prova: ⭐⭐.** Um **número novo** (centenas de milhares de
> registros), uma **analogia memorável** (tomadas elétricas), as **categorias de
> API** e os **quatro achados da Natural Language API** — que é exatamente a API
> do lab 4.7.

---

## Conteúdo por tópico

### 1. ⚠️ Correção honesta — o rótulo do AutoML voltou

Na nota da 4.3 eu escrevi que o "no-to-low-code" da 4.1 estava **definitivamente
isolado**. **Estava errado.** A 4.4 abre repetindo:

> *"In the previous lesson, you learned about **no-to-low-code** solution Agent
> Platform AutoML."*

**A contagem real, depois de 4.5:**

| Rótulo | Aulas |
|---|---|
| **no-code** | **1.1 · 4.2 · 4.3 · 4.5** |
| "no-to-low-code" | 4.1 · 4.4 |

> ✅ **Resposta de prova: NO-CODE** — 4 aulas contra 2, e as três formulações mais
> explícitas (*"a no-code solution"*) estão do lado do no-code. Mas o curso é
> **genuinamente inconsistente** nisso: as aulas que **enquadram** o módulo (4.1
> e 4.4) usam "no-to-low-code"; as que **contrastam** o AutoML diretamente com o
> custom training (4.2, 4.3, 4.5) usam "no-code".

**O que a 4.4 confirma sem ambiguidade:** **pre-trained APIs = low-code.** Esse
rótulo é estável em todas as aulas.

### 2. ⭐⭐ O número: centenas de milhares de registros

> *"Good machine learning models require lots of **high-quality** training data.
> You should aim for **hundreds of thousands of records** to train a custom
> model."*

| | |
|---|---|
| **Quanto** | **centenas de milhares de registros** |
| **Para quê** | treinar um **modelo custom** |
| **Qualidade** | tem de ser **high-quality**, não só volume |

⚠️ **É o primeiro número concreto que o curso dá para "grande volume de dados".**
Ele preenche, por trás, a coluna da tabela da 4.1: quando ela diz que BigQuery ML
e custom training exigem "large amount of data", **a ordem de grandeza é
centenas de milhares**.

**E é daí que vem a razão de existir das pre-trained APIs:** *"But what if you
**don't have that kind of data**? …Pre-trained APIs are a great place to start."*

### 3. ⭐⭐ A analogia das tomadas elétricas

> **API = *application programming interface*.** *"APIs define how software
> components **communicate with each other**."*

**A analogia:** *"Imagine APIs as **electrical outlets**."*

| No mundo das tomadas | No mundo das APIs |
|---|---|
| Os EUA usam **tipo A e B**; a Europa usa **tipo F** | cada API tem seu próprio formato |
| O viajante só precisa saber **qual adaptador usar** | você só precisa saber **qual API usar** |
| Não precisa saber **o que há atrás da parede** nem **como a rede elétrica foi construída** | não precisa saber da **implementação** — as **minúcias de treinamento e implantação do modelo** |

**A frase completa do princípio:**

> *"As a user, you only need to know **which API to use** and **what parameters
> to pass**, and **in what format**, without worrying about the implementation…
> much like **calling a predefined function**."*

⚠️ **Três coisas que você precisa saber** (e nada além): **qual API** · **quais
parâmetros** · **em que formato**. É isso que faz dela low-code.

**E a consequência:**

> *"You **don't need to train your own large language models**. Instead, you can
> access and utilize the **pre-trained** AI models **directly through API calls**,
> in the same way as a **function call**."*

### 4. ⭐ Os quatro passos do código (SDK do Gemini)

O exemplo usa o **Google AI for Python SDK** — *software development kit* — para
falar com a **Gemini API**.

| # | Passo | Código | O que faz |
|---|---|---|---|
| 1 | **Autenticar** | `genai.configure(api_key="YOUR_API_KEY")` | passa a **API key única** como parâmetro, **concedendo permissão** de usar a API |
| 2 | **Especificar o modelo** | `model = genai.GenerativeModel('gemini-2.5-flash')` | escolhe qual Gemini processa a requisição — no exemplo, **Gemini 2.5 Flash** |
| 3 | **Chamar a API** | `response = model.generate_content("What are the three largest countries by area?")` | faz a chamada **aos servidores do Google**, enviando os **dados do prompt** |
| 4 | **Receber a resposta** | `print(response.text)` | recebe de volta o **texto gerado** |

**O que cada peça é, no vocabulário da aula:**

- **API key** → é **única** e serve para **autenticar a sessão**.
- **A string passada a `generate_content()`** → é *"the **main input** — the
  **question or instruction** — that you want the AI to respond to"*. Ou seja: é
  o **prompt** (vocabulário da aula 3.1).
- **SDK** → *software development kit*. ⚠️ Note a tensão de rótulo: a aula **3.2**
  colocava **SDKs no degrau code-based**, e aqui o SDK aparece ilustrando o
  degrau **low-code**. **A reconciliação:** o que é low-code é a **API** — você
  chama uma função pronta; o SDK é apenas o **cliente** que embala a chamada. O
  code-based da 3.2 era *"construir modelos com SDKs"*, não *"chamar uma API
  pronta por um SDK"*.

### 5. ⭐⭐ As categorias de API do Google Cloud

> *"This list is **constantly evolving** with technological advancements."*

| Categoria | O que inclui | Para quê |
|---|---|---|
| **Generative AI APIs** | **foundation model APIs**, como as **Gemini APIs multimodais** | **criar conteúdo diretamente** |
| *(no mesmo bloco)* | a suíte da **Agent Platform** | **descobrir, construir e implantar** AI agents |
| **Machine learning APIs** | como a **Agent Platform API** | **treinar, monitorar e tunar** um modelo com **mínima expertise e esforço de ML** |
| **Other APIs** | **speech · image · document · conversation** | tarefas específicas |

**E a observação de futuro:**

> *"**Many of these can be replaced by the Gemini APIs**, which are considered
> **multitask and multimodal**."*

⚠️ **"Multitask and multimodal"** é o par de adjetivos que o curso usa para
justificar por que as Gemini APIs absorvem as APIs específicas. Guarde os dois
juntos.

⚠️ **Note os três verbos de cada suíte** — são listas diferentes e cobráveis:

| Suíte | Verbos |
|---|---|
| **Agent Platform** (agentes) | **discovering, building, deploying** |
| **Machine learning APIs** | **train, monitor, tune** |

### 6. ⭐⭐ A Natural Language API — e o gancho para o lab

> *"Discover the **Natural Language API**, a powerful tool that allows you to
> **analyze text directly in your browser**."*

**Os quatro achados:**

| # | O que identifica |
|---|---|
| 1 | **Entities** (entidades) |
| 2 | **Sentiment** (sentimento) |
| 3 | **Syntax** (sintaxe) |
| 4 | **Categories** (categorias) |

> *"…transforming **raw text** into **meaningful data**."*

📌 **Esta é a API do lab 4.7** — *"Entity and Sentiment Analysis with the Natural
Language API"*. Note que o **lab cobre dois** dos quatro achados (entities e
sentiment); a **API faz quatro**.

---

## Glossário da aula

| Termo | Definição |
|---|---|
| **API** | ***Application programming interface*** — define **como componentes de software se comunicam** |
| **Pre-trained API** | API sobre modelos já treinados pelo Google; dispensa dados e treinamento próprios |
| **SDK** | ***Software development kit*** — o cliente que embala as chamadas de API (ex.: Google AI for Python SDK) |
| **API key** | Chave **única** que **autentica a sessão** e **concede permissão** de uso |
| **Generative AI APIs** | **Foundation model APIs**, como as **Gemini APIs multimodais**, para **criar conteúdo** |
| **Machine learning APIs** | Como a **Agent Platform API** — **treinar, monitorar e tunar** com mínima expertise |
| **Multitask and multimodal** | O par de adjetivos que caracteriza as Gemini APIs e explica por que absorvem as APIs específicas |
| **Natural Language API** | Analisa texto **no navegador**; identifica **entities, sentiment, syntax e categories** |

---

## Flashcards

| Pergunta | Resposta |
|---|---|
| O que **API** significa? | ***Application programming interface*** |
| O que uma API define? | **Como componentes de software se comunicam** entre si |
| ⭐ Quantos registros um **modelo custom** exige? | **Centenas de milhares** — e de **alta qualidade** |
| Qual a analogia da aula para APIs? | **Tomadas elétricas** — EUA tipo **A e B**, Europa tipo **F** |
| ⭐ As **três coisas** que você precisa saber para usar uma API | **Qual API** · **quais parâmetros** · **em que formato** |
| Do que você **não** precisa saber? | Da **implementação** — as minúcias de **treinamento e implantação** do modelo |
| A que a chamada de API se compara? | A **chamar uma função pré-definida** |
| O que **SDK** significa? | ***Software development kit*** |
| Qual SDK o exemplo usa? | **Google AI for Python SDK**, para falar com a **Gemini API** |
| ⭐ Os **quatro passos** do código | **autenticar → especificar o modelo → chamar a API → receber a resposta** |
| Qual função autentica? | `genai.configure(api_key=...)` |
| Qual função especifica o modelo? | `genai.GenerativeModel('gemini-2.5-flash')` |
| Qual função envia o prompt? | `model.generate_content(...)` |
| Como se lê a resposta? | `print(response.text)` |
| Para que serve a **API key**? | **Autenticar a sessão** e **conceder permissão** — é **única** |
| O que as **Generative AI APIs** incluem? | **Foundation model APIs**, como as **Gemini APIs multimodais**, para **criar conteúdo** |
| Os três verbos da suíte de **agentes** | **discovering, building, deploying** |
| Os três verbos das **Machine learning APIs** | **train, monitor, tune** |
| Quais são as **outras APIs**? | **Speech · image · document · conversation** |
| ⭐ Por que as Gemini APIs podem substituir muitas delas? | Porque são **multitask e multimodal** |
| ⭐ O que a **Natural Language API** identifica? | **Entities · sentiment · syntax · categories** |
| Onde ela pode ser usada? | **Diretamente no navegador** |
| Qual o rótulo das **pre-trained APIs**? | **Low-code** — estável em todas as aulas |

---

## Questões estilo prova

**1.** ⭐ Segundo a aula, quantos registros você deveria almejar para treinar um
modelo custom?
- A) Algumas centenas
- B) Alguns milhares
- C) Centenas de milhares
- D) Milhões

<details><summary>Gabarito</summary>

**C.** *"You should aim for **hundreds of thousands of records** to train a custom
model."* E eles precisam ser de **alta qualidade** — o volume sozinho não basta.
É o número que dá escala concreta ao "large amount of data" da tabela da 4.1.
</details>

**2.** ⭐ Na analogia das tomadas elétricas, o que corresponde a "não se
preocupar com o que há atrás da parede"?
- A) Não precisar pagar pelo uso da API
- B) Não precisar conhecer a implementação — as minúcias de treinamento e implantação do modelo
- C) Não precisar autenticar a sessão
- D) Não precisar escolher o modelo

<details><summary>Gabarito</summary>

**B.** ⚠️ (C) e (D) são justamente coisas que **você precisa** fazer (passos 1 e 2
do código). O que a analogia dispensa é o **como o modelo foi construído**.
</details>

**3.** Quais são as três coisas que um usuário de API precisa saber?
- A) A linguagem, o framework e o container
- B) Qual API usar, quais parâmetros passar e em que formato
- C) O modelo, os hiperparâmetros e os epochs
- D) A região, o tipo de máquina e o disco

<details><summary>Gabarito</summary>

**B.** Quase literal. ⚠️ (D) são as decisões de um **custom container** (aula
4.5) e (C) são decisões de **custom training** — distratores feitos de conteúdo
real do módulo, no lugar errado.
</details>

**4.** ⭐ Qual a sequência correta dos quatro passos para chamar a Gemini API?
- A) Especificar o modelo → autenticar → chamar → receber
- B) Autenticar com a API key → especificar o modelo → chamar com o prompt → imprimir a resposta
- C) Chamar → autenticar → especificar o modelo → receber
- D) Importar o SDK → treinar o modelo → chamar → receber

<details><summary>Gabarito</summary>

**B.** A autenticação vem **primeiro** — sem permissão, nada roda. ⚠️ (D) tem a
pegadinha conceitual: você **não treina** nada; é esse o ponto da aula.
</details>

**5.** ⭐ Por que o curso diz que muitas APIs específicas podem ser substituídas
pelas Gemini APIs?
- A) Porque são mais baratas
- B) Porque são multitask e multimodal
- C) Porque rodam em TPU
- D) Porque dispensam API key

<details><summary>Gabarito</summary>

**B.** **Multitask e multimodal** — o par de adjetivos é a justificativa textual.
</details>

**6.** ⭐ O que a **Natural Language API** identifica em um texto?
- A) Entidades, sentimento, sintaxe e categorias
- B) Entidades e sentimento apenas
- C) Sentimento, idioma e tom
- D) Sujeitos, verbos e objetos

<details><summary>Gabarito</summary>

**A.** São **quatro**. ⚠️ (B) é o distrator preciso: é o escopo do **lab 4.7**
("Entity and Sentiment Analysis"), não da **API**, que faz quatro coisas.
</details>

**7.** Qual categoria de API serve para **treinar, monitorar e tunar** um modelo
de ML com mínima expertise?
- A) Generative AI APIs
- B) Machine learning APIs, como a Agent Platform API
- C) Conversation APIs
- D) Document APIs

<details><summary>Gabarito</summary>

**B.** ⚠️ (A) é o distrator: as Generative AI APIs servem para **criar conteúdo
diretamente**, não para treinar modelos.
</details>

---

## Dúvidas em aberto / revisar

- ⚠️ **O rótulo do AutoML oscila de verdade.** 4 aulas dizem **no-code** (1.1,
  4.2, 4.3, 4.5); 2 dizem "no-to-low-code" (4.1, 4.4). Resposta de prova:
  **no-code**.
- 📌 **SDK em dois degraus.** A 3.2 põe SDKs no **code-based**; a 4.4 usa um SDK
  para ilustrar o **low-code**. A reconciliação: low-code é **chamar uma API
  pronta**; code-based é **construir o modelo** com SDKs.
- 📌 **A Natural Language API faz quatro coisas; o lab 4.7 cobre duas.**

---

## Ações / próximos passos

| Ação | Status |
|---|---|
| Decorar **centenas de milhares de registros** | ⬜ |
| Decorar os **quatro passos** do código e a função de cada um | ⬜ |
| Decorar os **quatro achados** da Natural Language API | ⬜ |
| Corrigir no índice a contagem do rótulo do AutoML | ✅ |

---

## Fontes

- [[T - 2026-10-09-m04-a04-pre-trained-apis]] — transcrição oficial da plataforma
  Google Skills, colada por Leonardo em 09/10/2026.
