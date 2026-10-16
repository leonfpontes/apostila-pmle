---
title: Aula 5.3 — Model development
aliases: [model development, matriz de confusao, recall e precision, Type 1 Error, Type 2 Error, feature importance]
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
summary: "Aula 5.3 do curso Introduction to AI and ML on Google Cloud: o segundo estágio do workflow — as três configurações do treinamento, a matriz de confusão com os quatro quadrantes (incluindo Type 1 e Type 2 Error), as fórmulas de recall e precision, o trade-off entre as duas ilustrado pelo filtro de spam do Gmail, e o feature importance. O conteúdo mais cobrável do Módulo 5."
transcricao: "[[T - 2026-10-09-m05-a03-model-development]]"
parte_de: "[[curso-intro-ai-ml-google-cloud]]"
curso: "[[curso-intro-ai-ml-google-cloud]]"
data: 2026-10-09
related: ["[[R - 2026-10-09-m05-a01-ml-workflow]]", "[[R - 2026-10-09-m05-a02-data-preparation]]", "[[R - 2026-10-09-m04-a03-agent-platform-automl]]"]
---

# Aula 5.3 — Model development

| | |
|---|---|
| **Tema** | O segundo estágio: treinar e avaliar o modelo |
| **Curso** | [[curso-intro-ai-ml-google-cloud]] |
| **Data** | 09/10/2026 |
| **Duração** | ~5min30 |
| **Aula nº** | 5.3 (módulo 5 na plataforma, "Module 4" na fala do instrutor) |
| **Transcrição** | [[T - 2026-10-09-m05-a03-model-development]] |

> 🎯 **Peso na prova: ⭐⭐⭐ — o conteúdo mais cobrável do Módulo 5.**
> **Matriz de confusão**, **recall** e **precision** são o material clássico de
> prova de ML, e o curso dá as **fórmulas** e um **exemplo de trade-off**. Se
> você só tiver tempo para uma aula deste módulo, é esta.
>
> ⚠️ **Correção de uma previsão minha:** eu havia anotado no índice que esta aula
> seria "o provável lugar de **accuracy**, precision e recall". **Accuracy não
> aparece.** O curso trata só de **recall**, **precision** e **feature
> importance**.

---

## Conteúdo por tópico

### 1. Os dois passos do estágio

> *"This stage involves **two steps**: **model training**, which is like cooking
> the recipe, and **model evaluation**, which is like testing how good the meal
> is. This process **might be iterative**."*

| # | Passo | No restaurante |
|---|---|---|
| 1 | **Model training** | **cozinhar a receita** |
| 2 | **Model evaluation** | **provar para ver se está bom** |

✅ Confirma o que a 5.1 anunciou (*"training and evaluation form a cycle"*) — e a
analogia da refeição continua pela terceira aula seguida.

⚠️ **Nota de cautela do próprio curso:**

> *"The **user interface may not be exactly the same** as the product is
> **evolving rapidly**. However, **similar features will remain**."*

📌 Isso vale para **toda** a parte de telas do curso. Em prova, o que é cobrável
são os **conceitos e os nomes dos campos**, não a posição deles na tela.

### 2. ⭐⭐ As três configurações do treinamento

> *"To set up an ML model, you need to specify a few things."*

| # | Configuração | O que você define |
|---|---|---|
| **1** | **Training method** | o **dataset** (do estágio de preparação) · o **training objective** · o **método**: **AutoML** (sem código) ou **custom training** (com código) |
| **2** | **Training details** | a **target column** (se for aprendizado supervisionado) · em **training options**, **quais features participam** do treino e **transformar o tipo de dado**, se preciso |
| **3** | **Budget and pricing** | o orçamento — e então **Start training** |

**⭐ A definição de training objective:**

> *"This is the **goal of the model training** and the **task you want to
> solve**."*

📌 É o mesmo conceito que a aula **5.2** chamou de **objective**. Aqui ele ganha o
nome completo: **training objective**.

⚠️ **Mas note a diferença na lista de tipos de dado:**

| Aula | Tipos de dado mencionados |
|---|---|
| **4.1** (tabela comparativa) | AutoML aceita **tabular e imagem** |
| **5.2** | *"now **mainly** supports **tabular**"* |
| **5.3** | *"whether it is **tabular, image, text, or video**"* |

> ✅ **A 5.3 é a lista mais ampla das três** — e é a que faz mais sentido no
> contexto: ela descreve **a tela de configuração**, onde você escolhe o
> objective **conforme o tipo de dado**. A leitura que reconcilia as três: a
> plataforma **oferece** os quatro tipos; o AutoML **hoje suporta
> principalmente** tabular; a tabela da 4.1 registra **tabular e imagem**.
> **Em prova, responda pelo formato da pergunta** — e, se for sobre a tela de
> treinamento, a lista é **tabular, image, text, video**.

**⭐ Aprendizado supervisionado e a target column:**

> *"If you are training the model to solve a **supervised learning** problem such
> as **regression and classification**, you must choose the **target column**
> from your dataset."*

| | |
|---|---|
| **Quando escolher target column** | em problemas de **aprendizado supervisionado** |
| **Exemplos de supervisionado** | **regression** e **classification** |
| **O que é a target column** | a coluna do seu dataset que o modelo deve **prever** |

📌 **Conexão com o Módulo 2:** é o **label** do BigQuery ML — a coluna cujo valor
previsto volta com o prefixo **`predicted`**.

**⭐⭐ E a frase que reconcilia o ensemble da 4.3:**

> *"AutoML will train the model for you and choose the **best performed models
> among thousands of others**."*

| Aula | O que diz |
|---|---|
| **4.3** | o ensemble usa os **top N modelos**, tipicamente **~10** |
| **5.3** | ele escolhe os melhores **entre milhares** |

> ✅ **Não há contradição:** o AutoML **busca entre milhares** e **monta o
> ensemble com os ~10 melhores**. Os dois números se complementam —
> **milhares testados, ~10 usados**.

E a aula faz um quiz rápido com o aluno: *"Do you recall the powerful
technologies behind AutoML?"* → **neural architecture search** e **transfer
learning** (aula 4.3).

### 3. ⭐⭐⭐ A matriz de confusão

> *"A confusion matrix is a specific **performance measurement** for machine
> learning **classification** problems. It's a **table with combinations of
> predicted and actual values**."*

⚠️ **Três pontos da definição que são cobráveis:**

1. É para **problemas de classificação** — não de regressão.
2. É uma **tabela** que cruza **valores previstos** com **valores reais**.
3. O exemplo assume **apenas duas classes**, para simplificar.

**Os quatro quadrantes** — com o exemplo do gato que o curso usa:

| Quadrante | A interpretação literal do curso | O exemplo do gato |
|---|---|---|
| **True positive** (TP) | *"O modelo previu **positivo**, e isso é **verdade**"* | previu **que é gato**, e **é** |
| **True negative** (TN) | *"O modelo previu **negativo**, e isso é **verdade**"* | previu **que não é gato**, e **não é** |
| **False positive** (FP) ⚠️ **= Type 1 Error** | *"O modelo previu **positivo**, e isso é **falso**"* | previu **que é gato**, mas **não é** |
| **False negative** (FN) ⚠️ **= Type 2 Error** | *"O modelo previu **negativo**, e isso é **falso**"* | previu **que não é gato**, mas **é** |

> ⭐⭐⭐ **A forma de nunca errar:** a **primeira palavra** diz se o modelo
> **acertou** (*true*/*false*); a **segunda** diz **o que ele previu**
> (*positive*/*negative*). *False negative* = **previu negativo e errou**.

> ⚠️ **Type 1 = False Positive · Type 2 = False Negative.**
> **Mnemônico:** o **1** parece um **"+"** cortado → **Type 1 é o positivo
> falso**. Ou, pela ordem alfabética: **F**alse **P**ositive vem antes de
> **F**alse **N**egative, e 1 vem antes de 2.

> *"A confusion matrix is the **foundation for many other metrics** used to
> evaluate the performance of an ML model."*

### 4. ⭐⭐⭐ Recall e precision — as fórmulas

**Recall:**

> *"Recall refers to **all the positive cases** and looks at **how many were
> predicted correctly**."*

```
recall = TP / (TP + FN)
```

**Precision:**

> *"Precision refers to **all the cases predicted as positive** and **how many
> are actually positive**."*

```
precision = TP / (TP + FP)
```

**A tabela de comparação:**

| | **Recall** | **Precision** |
|---|---|---|
| **Parte de** | **todos os casos positivos REAIS** | **todos os casos PREVISTOS como positivos** |
| **E pergunta** | quantos foram **previstos corretamente** | quantos são **realmente positivos** |
| **Fórmula** | **TP / (TP + FN)** | **TP / (TP + FP)** |
| **O denominador acrescenta** | **falsos negativos** | **falsos positivos** |

> ⭐⭐⭐ **Como não trocar as duas.** As duas têm **TP no numerador**; a diferença
> está no **denominador**:
> - **Recall** olha para a **realidade**: de tudo que **era** positivo, quanto eu
>   **pequei**? → o que escapa são os **falsos negativos** (FN).
> - **Precision** olha para as **minhas previsões**: de tudo que eu **disse que
>   era** positivo, quanto **era mesmo**? → o que me suja são os **falsos
>   positivos** (FP).
>
> **Mnemônico:** **Re**call = **Re**alidade (o denominador parte do que é real) ·
> **P**recision = **P**revisão (o denominador parte do que eu previ).

### 5. ⭐⭐⭐ O trade-off — e o exemplo do Gmail

> *"Precision and recall are often a **trade-off**. Depending on your use case,
> you might need to **optimize for one or the other**."*

**O exemplo:** o Gmail classificando e-mails em **spam** e **não-spam**.

| Se o objetivo é… | Priorize | Por quê |
|---|---|---|
| **pegar o máximo possível** de spam potencial | **RECALL** | recall mede **quanto do spam real eu peguei** — perder spam é um **falso negativo** |
| **pegar só o que é definitivamente spam**, sem bloquear outros e-mails | **PRECISION** | precision mede **quanto do que eu bloqueei era spam mesmo** — bloquear um e-mail legítimo é um **falso positivo** |

> ⭐ **A frase que resume:** priorizar **recall** = aceitar **bloquear e-mail bom**
> para não deixar passar spam. Priorizar **precision** = aceitar **deixar passar
> spam** para não bloquear e-mail bom.

⚠️ **Este é o formato de questão mais provável da aula:** um cenário de negócio
onde você tem de escolher qual métrica otimizar. **A pergunta a se fazer é qual
erro dói mais** — deixar passar (FN → otimize recall) ou acusar errado (FP →
otimize precision).

> *"Agent Platform **visualizes the precision-recall curve**, so it can be
> adjusted based on the problem that needs to be solved."*

📌 E o curso avisa duas vezes que você vai **praticar ajustar precision e recall
no lab do AutoML**.

### 6. ⭐⭐ Feature importance

> *"In addition to the confusion matrix and the metrics… the **other useful
> measurement** is **feature importance**."*

| | |
|---|---|
| **Como é exibido** | através de um **gráfico de barras** |
| **O que ilustra** | **como cada feature contribui para uma previsão** |
| **Como ler** | **quanto mais longa a barra** — ou **maior o valor numérico** — **mais importante** a feature |
| **Para que serve** | **decidir quais features incluir** no modelo |

📌 **Conexão com a 5.2:** a definição de feature daquela aula era *"um **fator que
contribui para a previsão**"*. O **feature importance** é literalmente **a medida
desse fator**. As duas aulas se encaixam.

📌 E o curso diz que você também vai **ver o gráfico de feature importance no
lab**.

---

## Glossário da aula

| Termo | Definição |
|---|---|
| **Model training** | Passo 1 do estágio 2 — "cozinhar a receita" |
| **Model evaluation** | Passo 2 do estágio 2 — "provar o prato" |
| **Training objective** | O **objetivo do treinamento** e a **tarefa que você quer resolver** |
| **Target column** | A coluna do dataset que o modelo deve **prever** — escolhida em problemas **supervisionados** |
| **Supervised learning** | Aprendizado com rótulos; exemplos: **regression** e **classification** |
| **Confusion matrix** | **Tabela** que cruza **valores previstos e reais**; medida de performance para **classificação** |
| **True positive (TP)** | Previu **positivo** e **acertou** |
| **True negative (TN)** | Previu **negativo** e **acertou** |
| **False positive (FP)** | Previu **positivo** e **errou** — ⚠️ **Type 1 Error** |
| **False negative (FN)** | Previu **negativo** e **errou** — ⚠️ **Type 2 Error** |
| **Recall** | **TP / (TP + FN)** — de todos os positivos **reais**, quantos foram previstos corretamente |
| **Precision** | **TP / (TP + FP)** — de todos os **previstos como positivos**, quantos são realmente positivos |
| **Precision-recall curve** | A curva que a Agent Platform **visualiza** para você **ajustar** o trade-off |
| **Feature importance** | **Gráfico de barras** que mostra **quanto cada feature contribui** para a previsão |

---

## Flashcards

| Pergunta | Resposta |
|---|---|
| Quais os **dois passos** do estágio 2? | **Model training** e **model evaluation** |
| E na analogia da refeição? | **Cozinhar a receita** e **provar para ver se está bom** |
| ⭐ As **três configurações** do treinamento | **Training method** · **training details** · **budget and pricing** |
| O que é o **training objective**? | O **objetivo do treinamento** e a **tarefa que você quer resolver** |
| Quais tipos de dado a tela de treinamento oferece? | **Tabular, image, text ou video** |
| Quando você escolhe a **target column**? | Em problemas de **aprendizado supervisionado** — **regression** e **classification** |
| O que mais se define em **training options**? | **Quais features participam** do treino e **transformar o tipo de dado** |
| ⭐ Entre quantos modelos o AutoML escolhe? | Entre **milhares** — e monta o ensemble com os **~10 melhores** (aula 4.3) |
| Quais as tecnologias por trás do AutoML? | **Neural architecture search** e **transfer learning** |
| ⭐⭐ O que é uma **matriz de confusão**? | **Tabela** com combinações de **valores previstos e reais**; para problemas de **classificação** |
| ⭐⭐ **True positive** | Previu **positivo** e **acertou** — previu gato, **é** gato |
| ⭐⭐ **True negative** | Previu **negativo** e **acertou** — previu que não é gato, **não é** |
| ⭐⭐⭐ **False positive** é qual tipo de erro? | **Type 1 Error** — previu gato, **não é** |
| ⭐⭐⭐ **False negative** é qual tipo de erro? | **Type 2 Error** — previu que não é gato, mas **é** |
| Como ler os nomes dos quadrantes? | A **1ª palavra** diz se **acertou**; a **2ª** diz **o que previu** |
| ⭐⭐⭐ A fórmula do **recall** | **TP / (TP + FN)** |
| ⭐⭐⭐ A fórmula da **precision** | **TP / (TP + FP)** |
| ⭐⭐ **Recall** parte de quê? | De **todos os casos positivos REAIS** |
| ⭐⭐ **Precision** parte de quê? | De **todos os casos PREVISTOS como positivos** |
| O mnemônico | **Re**call = **Re**alidade · **P**recision = **P**revisão |
| Precision e recall são independentes? | **Não** — são frequentemente um **trade-off** |
| ⭐⭐ Gmail quer pegar **o máximo de spam**. Priorize? | **Recall** |
| ⭐⭐ Gmail quer **não bloquear e-mail bom**. Priorize? | **Precision** |
| A pergunta que decide | **Qual erro dói mais** — deixar passar (**FN** → recall) ou acusar errado (**FP** → precision) |
| O que a Agent Platform visualiza? | A **precision-recall curve**, para você **ajustar** |
| ⭐ O que é **feature importance**? | **Gráfico de barras** que mostra **quanto cada feature contribui** para a previsão |
| Como se lê o gráfico? | **Barra mais longa** ou **valor numérico maior** = feature **mais importante** |
| Para que serve? | Para **decidir quais features incluir** no modelo |
| ⚠️ A aula fala de **accuracy**? | **Não** — só de **recall**, **precision** e **feature importance** |

---

## Questões estilo prova

**1.** ⭐⭐⭐ Um modelo classifica imagens de gatos. Ele previu que uma imagem
**não é** um gato, mas ela **é**. Como se chama esse resultado?
- A) True negative
- B) False positive, ou Type 1 Error
- C) False negative, ou Type 2 Error
- D) True positive

<details><summary>Gabarito</summary>

**C.** Leia pelos nomes: a **segunda palavra** diz **o que o modelo previu**
(negativo), a **primeira** diz se ele **acertou** (falso). Logo: **false
negative** = **Type 2 Error**. ⚠️ (B) é a inversão exata — e é o erro mais comum
nesta questão.
</details>

**2.** ⭐⭐⭐ Qual é a fórmula do **recall**?
- A) TP / (TP + FP)
- B) TP / (TP + FN)
- C) (TP + TN) / total
- D) TP / (FP + FN)

<details><summary>Gabarito</summary>

**B.** **Recall = TP / (TP + FN).** ⚠️ (A) é a **precision** — as duas têm **TP no
numerador**, e a diferença está no **denominador**. (C) seria a **accuracy**, que
**esta aula não menciona**.
</details>

**3.** ⭐⭐⭐ Um hospital usa um modelo para triar exames que possam indicar uma
doença grave. Deixar de sinalizar um caso real é muito pior que sinalizar um caso
saudável para revisão. Qual métrica priorizar?
- A) Precision, para não sinalizar casos saudáveis
- B) Recall, para capturar o máximo de casos reais possível
- C) Nenhuma — otimizar as duas igualmente
- D) Feature importance

<details><summary>Gabarito</summary>

**B.** O erro que dói é o **falso negativo** (deixar passar um caso real), e é
exatamente o FN que o **recall** penaliza no denominador. É o mesmo raciocínio do
exemplo do Gmail: *"catch as many potential spam emails as possible"* →
**recall**.
</details>

**4.** ⭐⭐ Segundo a aula, o Gmail priorizaria **precision** em qual situação?
- A) Para capturar o máximo de spam potencial
- B) Para pegar só as mensagens que são definitivamente spam, sem bloquear outros e-mails
- C) Para reduzir o tempo de treinamento
- D) Para aumentar a quantidade de features

<details><summary>Gabarito</summary>

**B.** Quase literal. ⚠️ (A) é o caso de **recall** — e os dois cenários aparecem
na mesma frase do curso, em contraste direto. Leia qual dos dois a questão
descreve.
</details>

**5.** ⭐⭐ O que é uma **matriz de confusão**?
- A) Um gráfico de barras que mostra a contribuição de cada feature
- B) Uma tabela com combinações de valores previstos e reais, usada em problemas de classificação
- C) A curva que relaciona precision e recall
- D) Uma métrica única que resume a performance do modelo

<details><summary>Gabarito</summary>

**B.** ⚠️ (A) é o **feature importance**, (C) é a **precision-recall curve** —
ambos da **mesma aula**. E note que a matriz é para **classificação**, não para
regressão.
</details>

**6.** ⭐ Como se lê o gráfico de **feature importance**?
- A) Quanto mais curta a barra, mais importante a feature
- B) Quanto mais longa a barra, ou maior o valor numérico, mais importante a feature
- C) As barras indicam a ordem de processamento das features
- D) As barras mostram quantos valores nulos cada feature tem

<details><summary>Gabarito</summary>

**B.** *"The **longer the bar**, or the **larger the numerical value**… the
**more important** it is."* E serve para **decidir quais features incluir** no
modelo.
</details>

**7.** ⭐ Quando você precisa escolher a **target column**?
- A) Sempre, em qualquer problema de ML
- B) Em problemas de aprendizado supervisionado, como regression e classification
- C) Apenas em problemas de forecasting
- D) Apenas quando usa custom training

<details><summary>Gabarito</summary>

**B.** *"If you are training the model to solve a **supervised learning** problem
such as **regression and classification**, you must choose the **target
column**."* É o **label** do BigQuery ML, por outro nome.
</details>

**8.** ⭐ Entre quantos modelos o AutoML escolhe os melhores?
- A) Entre cerca de dez
- B) Entre milhares
- C) Entre exatamente cem
- D) Ele treina apenas um modelo

<details><summary>Gabarito</summary>

**B.** *"Choose the best performed models among **thousands** of others."* ⚠️ (A)
é o **tamanho do ensemble** (aula 4.3) — **não** o tamanho da busca. Os dois
números se complementam: **milhares testados, ~10 usados**.
</details>

---

## Dúvidas em aberto / revisar

- ⚠️ **Accuracy nunca é mencionada.** Eu havia previsto que esta aula a traria —
  errado. O curso cobre **recall**, **precision** e **feature importance**. Se
  aparecer accuracy na prova, provavelmente é distrator.
- ⚠️ **Terceira lista de tipos de dado do AutoML.** 4.1: **tabular e imagem** ·
  5.2: **principalmente tabular** · 5.3: **tabular, image, text, video**.
  Responda **pelo formato da pergunta**; para a **tela de treinamento**, é a
  lista de **quatro**.
- ✅ **Reconciliado: milhares × ~10.** O AutoML **busca entre milhares** e
  **monta o ensemble com os ~10 melhores**.
- 📌 **"Data drifting"** ainda sem definição — restam a **5.4** e a **5.5**.
- 📌 **O curso avisa que a UI pode estar diferente** — decore conceitos e nomes de
  campo, não a tela.

---

## Ações / próximos passos

| Ação | Status |
|---|---|
| Decorar os **quatro quadrantes** e **Type 1 = FP · Type 2 = FN** | ⬜ |
| Decorar as **duas fórmulas** e o mnemônico Realidade/Previsão | ⬜ |
| Treinar o raciocínio do **trade-off** com cenários (qual erro dói mais) | ⬜ |
| Guardar **feature importance** = gráfico de barras, barra maior = mais importante | ⬜ |
| Corrigir no índice a previsão sobre **accuracy** | ✅ |

---

## Fontes

- [[T - 2026-10-09-m05-a03-model-development]] — transcrição oficial da plataforma
  Google Skills, colada por Leonardo em 09/10/2026.
