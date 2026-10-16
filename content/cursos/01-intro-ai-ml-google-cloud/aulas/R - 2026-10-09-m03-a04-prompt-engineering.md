---
title: Módulo 3, Aula 3.4 — Prompt engineering
aliases: [aula 3.4 Google AI ML, temperature top K top P, prompt template, ground truth, Chirp Lyria, partner models open models]
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
summary: "A aula técnica do módulo: prompt design no Agent Studio (System Instructions + Prompt), prompt templates com variáveis reutilizáveis, as três categorias de modelo (Google, partner, open/open-weight), os parâmetros temperature, top K e top P explicados com o exemplo do jardim, e avaliação com comparação lado a lado e ground truth. Amplia a lista de modelos especialistas com Chirp (voz) e Lyria (música)."
transcricao: "[[T - 2026-10-09-m03-a04-prompt-engineering]]"
data: 2026-10-09
curso: "[[curso-intro-ai-ml-google-cloud]]"
professor: ""
related: ["[[R - 2026-10-09-m03-a03-idea-to-app]]"]
---

# Módulo 3, Aula 3.4 — Prompt engineering

| | |
|---|---|
| **Tema** | A primeira metade do ciclo prompt-to-production: design → avaliação → refino |
| **Curso** | [[curso-intro-ai-ml-google-cloud\|Introduction to AI and Machine Learning on Google Cloud]] |
| **Data** | 2026-10-09 (data da transcrição) |
| **Duração** | ~7min55 |
| **Aula nº / módulo** | 3.4 — Módulo 3 na ementa ("Module 2" na fala do curso) |

> 🎯 **Peso na prova: MUITO ALTO.** É a aula **mais técnica** do módulo. Os
> **parâmetros do modelo** (§5) são o tipo de conteúdo que vira questão
> conceitual direta — sobretudo o par **top K × top P** e o motivo pelo
> qual um levou ao outro. A aula também **amplia a lista de modelos
> especialistas** com dois nomes novos.

## Conteúdo por tópico

### 1. Onde esta aula se encaixa

O ciclo **prompt-to-production** (aula 3.3) tem duas metades. Esta aula
cobre a **primeira**:

```
┌──── AULA 3.4 (esta) ────┐   ┌──── AULA 3.5 ────┐
  design → avaliação →         deployment e
         refino                 tuning do modelo
```

Ponto de partida, retomado da 3.3: um bom prompt considera **content**
(instruções, contexto, exemplos) e **structure** (ordem, labels,
delimitadores).

### 2. ⭐ Prompt design no Agent Studio

O Agent Studio é *"your primary playground for crafting prompts"*.

**A interface, lado esquerdo:**

| Campo | O que vai nele |
|---|---|
| **System Instructions** | o **contexto** |
| **Prompt** | as **tarefas ou perguntas** |

📌 Isso conecta direto com a anatomia da aula 3.3: o **context** vai em
*System Instructions*, a **task** vai em *Prompt*.

**O assistente embutido:** o próprio **Gemini** ajuda a criar o prompt.

**Dados multimídia que podem ser incorporados** — documentos, imagens e
vídeos, vindos de:

| Fonte |
|---|
| **Google Cloud Storage** |
| **Google Drive** |
| **seu computador local** |
| **uma URL** |
| **links de vídeo do YouTube** |

**Como guiar a saída com exemplos:** usando os recursos padrão **Input** e
**Output**, ou customizando para **Question** e **Answer**. Usuários
**enterprise** podem **importar arquivos de exemplo com dados da própria
empresa**.

### 3. ⭐ Prompt template — "uma função em linguagem natural"

**O pedido da Ann:** um jeito de *"codificar"* prompts, com função ou
método com **variáveis**, para automatizar ações repetitivas.

**A resposta:** o recurso **prompt template** do Agent Studio.

- Usa **variáveis substituíveis** (*replaceable variables*).
- Permite **reutilizar um prompt apenas mudando valores**.
- *"Imagine a function in coding, but using natural language!"*
- **A vantagem:** você só precisa dizer à gen AI **o que fazer**, sem se
  preocupar com **como fazer** numa linguagem de programação específica.
- O botão **Add variables** atribui valores, *"just like passing arguments
  to a function"*.

**O exemplo da aula — mesmo template, valores diferentes:**

| Variável 1 (pesquisar) | Variável 2 (gerar) |
|---|---|
| "Los Angeles tenant vacancy rate" | "real estate market analysis" |
| "annual crime rate" | "insurance risk assessment" |

### 4. ⭐ Seleção de modelo — as três categorias

O Agent Studio oferece **Google, partner e open models**:

| Categoria | Definição exata |
|---|---|
| **Google models** | os modelos do próprio Google (Gemini e especialistas) |
| **Partner models** | **modelos proprietários construídos por empresas de IA terceiras**, como a **Anthropic** |
| **Open models** *(também chamados **Open Weight models**)* | aqueles cujos **pesos treinados são publicamente liberados** |

📌 **Decore a definição de open model pelos pesos**, não por "código
aberto": *"the model's trained weights are publicly released"*. E guarde o
sinônimo **Open Weight**.

📌 **A vantagem-chave do Agent Studio**, segundo a aula: o acesso aos
modelos de ponta do Google, como o Gemini.

### 5. ⭐⭐ Os modelos especialistas — lista ampliada

Em **Generate media**, onde se cria multimídia no Agent Studio:

| Modelo | Modalidade |
|---|---|
| **Nano Banana** | **imagem** |
| **Chirp** | **voz** (*voice generation*) |
| **Veo** | **vídeo** |
| **Lyria** | **música** (*music composition*) |

⚠️ **Dois nomes novos em relação à aula 3.2:** **Chirp** e **Lyria**. A
3.2 listava Nano Banana, Veo e **embeddings**; esta troca os embeddings
por Chirp e Lyria, porque o recorte aqui é **geração de mídia**. **As duas
listas são complementares, não concorrentes.**

> 💡 **Mnemônico das quatro mídias:**
> **Nano Banana** = imagem · **Chirp** = voz (*chirp* = pio de pássaro,
> som) · **Veo** = vídeo · **Lyria** = música (*lira*, o instrumento).

### 6. ⭐⭐ Os parâmetros do modelo

**O que eles fazem:** controlam a **aleatoriedade das respostas**,
ajustando **como os tokens de saída são selecionados**. Alguns ficam em
**advanced settings**.

**O exemplo que a aula usa o tempo todo:**

> *"The garden was full of beautiful..."*
>
> O modelo prevê a probabilidade de palavras possíveis: **flowers**,
> **trees**, **herbs**, **bugs**.

**Os dois extremos ruins:**

| Estratégia | Problema |
|---|---|
| sempre escolher a palavra **mais provável** | texto **repetitivo e potencialmente enviesado** |
| **amostragem aleatória** pura | respostas **improváveis**, como "bugs" |

**O objetivo:** ajustar os parâmetros para **equilibrar previsibilidade e
variedade**.

#### Temperature

Número que controla o **grau de aleatoriedade** na saída.

| Ajuste | O que faz | Ideal para |
|---|---|---|
| **Baixa** | **estreita** o leque para palavras de **alta probabilidade**, mais **típicas** | **question answering** e **sumarização** — onde se espera resposta típica, com **menos variabilidade** |
| **Alta** | **expande** o leque para palavras de **menor probabilidade**, mais **incomuns** | conteúdo **"criativo"** ou **inesperado** |

#### Top K

Permite ao modelo **selecionar aleatoriamente uma palavra entre as K mais
prováveis**, onde K é um número.

- **Exemplo:** *top 2* → escolhe aleatoriamente entre as **duas mais
  prováveis** ("flowers" ou "trees").
- **O princípio:** dá às palavras de alta pontuação uma **chance igual**.
- ⚠️ **O problema:** se a distribuição de probabilidade for **muito
  enviesada** — ex.: "flowers" com **80%** e "books" com **10%** — pode
  gerar respostas estranhas: *"The garden is full of beautiful books."*

#### Top P

> *"The challenge of selecting the optimal Top K value led to top P."*

**P = probability.** Permite ao modelo retornar uma palavra do **menor
subconjunto cuja soma de probabilidades excede ou iguala P**.

- **Exemplo:** **P = 75%** → amostra de um conjunto com probabilidade
  **cumulativa acima de 75%** — nesse caso, **"flowers", "trees" e
  "herbs"**.
- **A vantagem:** **ajusta dinamicamente o tamanho do conjunto** de
  palavras conforme a distribuição de probabilidade da próxima palavra.

> 💡 **A diferença em uma frase:** o **top K** fixa **quantas** palavras
> entram no sorteio; o **top P** fixa **quanta probabilidade acumulada**
> entra — e por isso o tamanho do conjunto **varia** conforme o caso.
>
> ⚠️ **O "porquê" é cobrável:** o top P **existe porque** escolher o valor
> ótimo de K é difícil. Se a questão perguntar qual parâmetro se adapta à
> distribuição, é o **top P**.

**O resumo da aula:** os parâmetros são **model type, temperature, top K e
top P**.

📌 **Uma ressalva que a aula faz questão de dar:** *"you are not required
to adjust them constantly, especially top K and top P."* Não é preciso
mexer neles o tempo todo.

### 7. ⭐ Avaliação e refino

Depois de redigir o prompt e definir parâmetros, como garantir que a
escolha foi a ótima? Três recursos:

| Recurso | O que faz |
|---|---|
| **Comparação lado a lado** (*side-by-side*) | comparar prompts para ver qual produz os melhores resultados; mostra como diferentes **prompts, modelos e/ou parâmetros** influenciam a saída |
| **Ground truth** | gerar **suas próprias métricas de avaliação** adicionando **sua resposta preferida ao prompt**, vinda do seu **conhecimento de campo**, contra a qual **todas as outras respostas do modelo são avaliadas** |
| **Otimização no Colab Enterprise** | refinar os resultados adicionando **exemplos rotulados** (*labeled examples*) num notebook **Colab Enterprise** |

📌 **Ground truth** é um termo técnico que vale decorar com a definição da
aula: *"your preferred answer to the prompt, against which all other model
responses are evaluated."*

### 8. ⭐ Prompt management

As três tarefas acima — **comparação, otimização e avaliação** — ficam sob
o menu **Prompt management**.

> *"Imagine prompt management as **storage to save and share prompts** for
> future use and collaboration, complete with tools like **version
> control** and **security**."*

📌 Os dois recursos nomeados — **controle de versão** e **segurança** — são
o que transforma prompts em ativos de equipe, não rascunhos pessoais.

### 9. Tarefas específicas além do prompt de propósito geral

As mesmas técnicas e ferramentas se aplicam, no Agent Studio, a:

- gerar **streaming em tempo real**
- criar **conteúdo multimídia**
- **traduzir** conteúdo
- **converter fala e texto**

**A seguir:** como fazer o **deploy do prompt para código** (aula 3.5).

## Glossário da aula

- **System Instructions** — o campo do Agent Studio onde vai o
  **contexto**.
- **Prompt (campo)** — onde vão as **tarefas ou perguntas**.
- **Prompt template** — prompt reutilizável com **variáveis
  substituíveis**; *"uma função, mas em linguagem natural"*.
- **Add variables** — o botão que atribui valores, como **passar
  argumentos a uma função**.
- **Input / Output** — os recursos padrão para adicionar exemplos;
  customizáveis para **Question / Answer**.
- **Google models** — os modelos do próprio Google.
- **Partner models** — **modelos proprietários de empresas de IA
  terceiras**, como a **Anthropic**.
- **Open models / Open Weight models** — modelos cujos **pesos treinados
  são publicamente liberados**.
- **Nano Banana** — geração de **imagem**.
- **Chirp** — geração de **voz**.
- **Veo** — processamento de **vídeo**.
- **Lyria** — composição de **música**.
- **Generate media** — a área do Agent Studio onde se cria multimídia.
- **Temperature** — controla o **grau de aleatoriedade**: baixa = palavras
  típicas; alta = palavras incomuns.
- **Top K** — sorteia entre as **K palavras mais prováveis**; dá chance
  **igual** às de alta pontuação.
- **Top P** — sorteia do **menor subconjunto** cuja **probabilidade
  cumulativa** atinge P; **ajusta o tamanho dinamicamente**.
- **Token** — a unidade de saída cuja seleção os parâmetros controlam.
- **Ground truth** — **sua resposta preferida**, vinda do conhecimento de
  campo, usada como referência para avaliar as respostas do modelo.
- **Labeled examples** — exemplos rotulados usados para otimizar o prompt
  no **Colab Enterprise**.
- **Prompt management** — o menu que reúne **comparação, otimização e
  avaliação**; funciona como **storage** de prompts, com **version
  control** e **security**.

## Flashcards

| Pergunta | Resposta |
|---|---|
| Que metade do ciclo prompt-to-production esta aula cobre? | A **primeira**: design → avaliação → refino |
| Onde vai o **contexto** no Agent Studio? | No campo **System Instructions** |
| Onde vão as **tarefas ou perguntas**? | No campo **Prompt** |
| De que fontes se pode trazer multimídia? | **Cloud Storage, Google Drive, computador local, URL** e **links do YouTube** |
| Quais os recursos padrão para adicionar exemplos? | **Input** e **Output** — customizáveis para **Question / Answer** |
| O que é um **prompt template**? | Prompt reutilizável com **variáveis substituíveis** — *"uma função em linguagem natural"* |
| Quais as **três categorias de modelo** no Agent Studio? | **Google**, **partner** e **open** models |
| O que são **partner models**? | **Modelos proprietários de empresas de IA terceiras**, como a **Anthropic** |
| O que são **open models**? | Modelos cujos **pesos treinados são publicamente liberados**; também **Open Weight models** |
| ⭐ Os quatro especialistas de mídia | **Nano Banana** (imagem) · **Chirp** (voz) · **Veo** (vídeo) · **Lyria** (música) |
| O que os parâmetros controlam? | A **aleatoriedade** das respostas, ajustando **como os tokens de saída são selecionados** |
| Qual o exemplo que a aula usa? | *"The garden was full of beautiful…"* → flowers, trees, herbs, bugs |
| Problema de sempre escolher a palavra mais provável | Texto **repetitivo e potencialmente enviesado** |
| Problema da amostragem aleatória pura | Respostas **improváveis**, como "bugs" |
| ⭐ **Temperature baixa** — o que faz e para quê? | **Estreita** para palavras **típicas**; ideal para **question answering** e **sumarização** |
| ⭐ **Temperature alta** — o que faz e para quê? | **Expande** para palavras **incomuns**; útil para conteúdo **criativo** |
| ⭐ O que é **top K**? | Sorteia entre as **K palavras mais prováveis**, dando chance **igual** às de alta pontuação |
| ⚠️ Qual o problema do top K? | Com distribuição **muito enviesada** (80% × 10%), pode gerar respostas estranhas |
| ⭐ O que é **top P**? | Sorteia do **menor subconjunto** cuja **probabilidade cumulativa** excede ou iguala P |
| Por que o top P existe? | Porque **escolher o valor ótimo de K é difícil** |
| A diferença em uma frase | **Top K fixa quantas** palavras entram; **top P fixa quanta probabilidade** — o tamanho **varia** |
| Quais são os quatro parâmetros listados? | **Model type**, **temperature**, **top K** e **top P** |
| A ressalva da aula sobre os parâmetros | **Não é preciso ajustá-los constantemente**, sobretudo top K e top P |
| O que é **ground truth**? | **Sua resposta preferida** ao prompt, vinda do conhecimento de campo, usada para avaliar as respostas do modelo |
| Onde se otimiza o prompt com exemplos rotulados? | Num notebook **Colab Enterprise** |
| Que três tarefas ficam em **Prompt management**? | **Comparação, otimização e avaliação** |
| Que dois recursos o Prompt management oferece? | **Controle de versão** e **segurança** |
| Quatro tarefas específicas citadas | **Streaming em tempo real**, **conteúdo multimídia**, **tradução** e **conversão fala↔texto** |

## Questões estilo prova

**1.** Uma equipe precisa gerar resumos executivos consistentes, com pouca
variação entre execuções. Como ajustar a **temperature**?

- A) Alta, para enriquecer o texto
- B) Baixa, para favorecer palavras típicas e de alta probabilidade
- C) Não afeta sumarização
- D) Usar top K em vez de temperature

<details><summary>Gabarito</summary>

**B — temperature baixa.** A aula cita explicitamente **sumarização** e
**question answering** como os casos em que se espera *"a more typical
answer with less variability"*. Temperature alta (A) serve a conteúdo
**criativo**.
</details>

**2.** Qual é a diferença central entre **top K** e **top P**?

<details><summary>Gabarito</summary>

O **top K** fixa **quantas** palavras entram no sorteio (as K mais
prováveis), dando chance igual a elas. O **top P** fixa **quanta
probabilidade cumulativa** entra, sorteando do **menor subconjunto** que
atinge P — e por isso o **tamanho do conjunto varia dinamicamente**
conforme a distribuição.
</details>

**3.** Por que o **top P** foi criado?

- A) Para reduzir o custo computacional
- B) Porque escolher o valor ótimo de K é difícil
- C) Para substituir a temperature
- D) Para permitir modelos multimodais

<details><summary>Gabarito</summary>

**B.** A aula é literal: *"the challenge of selecting the optimal Top K
value led to top P"*. O problema concreto é que, com distribuição muito
enviesada, um K fixo deixa entrar palavras de probabilidade baixíssima.
</details>

**4.** O que caracteriza um **open model**, segundo a aula?

- A) O código-fonte é aberto
- B) Pode ser usado gratuitamente
- C) Os **pesos treinados** são publicamente liberados
- D) Foi treinado com dados públicos

<details><summary>Gabarito</summary>

**C — os pesos treinados são publicamente liberados.** Daí o sinônimo
**Open Weight models**. (A) e (D) são confusões comuns: "aberto" aqui se
refere aos **pesos**, não ao código nem aos dados de treino.
</details>

**5.** Associe cada modelo à sua modalidade: **Nano Banana**, **Chirp**,
**Veo**, **Lyria**.

<details><summary>Gabarito</summary>

**Nano Banana** = **imagem** · **Chirp** = **voz** · **Veo** = **vídeo** ·
**Lyria** = **música**. Todos aparecem na área **Generate media** do Agent
Studio.
</details>

**6.** O que é **ground truth** no contexto de avaliação de prompts?

<details><summary>Gabarito</summary>

**Sua resposta preferida ao prompt**, vinda do seu **conhecimento de
campo**, **contra a qual todas as outras respostas do modelo são
avaliadas**. Serve para **gerar suas próprias métricas de avaliação**.
</details>

**7.** Uma desenvolvedora precisa rodar o mesmo prompt para dezenas de
cidades diferentes, trocando só o nome da cidade e o tipo de relatório.
Qual recurso do Agent Studio resolve?

- A) Prompt gallery
- B) "Help me write"
- C) Prompt template com variáveis
- D) Ground truth

<details><summary>Gabarito</summary>

**C — prompt template.** Usa **variáveis substituíveis**, permitindo
reutilizar o prompt **mudando apenas os valores** — *"imagine a function in
coding, but using natural language"*. O botão **Add variables** funciona
como **passar argumentos a uma função**.
</details>

**8.** Um modelo com **top K = 2** completou "The garden is full of
beautiful **books**", quando "flowers" tinha 80% de probabilidade. O que
explica isso?

<details><summary>Gabarito</summary>

A **distribuição de probabilidade muito enviesada**. Como o top K dá
**chance igual** às K palavras mais prováveis, uma palavra com
probabilidade muito menor (10%) pode ser sorteada com a mesma frequência
que a de 80% — e o resultado fica estranho. É exatamente o problema que
levou à criação do **top P**.
</details>

## Dúvidas em aberto / revisar
- ⚠️ **Duas listas de modelos especialistas.** A aula 3.2 listava **Nano
  Banana, Veo e embeddings**; esta lista **Nano Banana, Chirp, Veo e
  Lyria**. Não é contradição: o recorte desta é **Generate media** (criação
  de mídia), e os **embeddings** não geram mídia. **Para a prova, saber as
  cinco:** imagem, voz, vídeo, música e embeddings.
- ✅ **Confirmado:** o **Colab Enterprise** reaparece como o notebook onde
  se otimiza o prompt com exemplos rotulados — consistente com a aula 3.2.
- ⚠️ **Agent Garden** e **Model Garden** continuam sem definição desde a
  3.1. Restam as aulas 3.5, 3.7 e 3.8.
- 📌 **Chain-of-thought** e **RAG**, prometidos na aula 3.3, **não
  apareceram aqui**. Talvez em 3.5 ou nas aulas de agentes (3.7, 3.8).

## Ações / próximos passos
| Ação | Prazo |
|---|---|
| Decorar temperature baixa (típico/QA/sumarização) × alta (criativo) | — |
| Fixar top K (quantas palavras) × top P (quanta probabilidade) e o porquê | — |
| Decorar os quatro especialistas de mídia: Nano Banana, Chirp, Veo, Lyria | — |
| Fixar open model = **pesos** públicos (Open Weight) | — |
| Assistir 3.5 "Deployment and model tuning" | — |

## Fontes
- Transcrição da aula — [[T - 2026-10-09-m03-a04-prompt-engineering]]
