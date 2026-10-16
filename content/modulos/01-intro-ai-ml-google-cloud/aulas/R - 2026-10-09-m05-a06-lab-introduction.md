---
title: Aula 5.6 — Lab introduction (risco de crédito)
aliases: [confidence threshold, true positive rate, false positive rate, as quatro taxas da matriz de confusao, lab de risco de credito]
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
summary: "Aula 5.6 do curso Introduction to AI and ML on Google Cloud: introdução ao lab opcional de risco de crédito — o mínimo de 1.000 data points do AutoML, as QUATRO taxas da matriz de confusão com suas fórmulas (a 5.3 só dera recall e precision), e o confidence threshold com os dois extremos numéricos do exemplo do empréstimo."
transcricao: "[[T - 2026-10-09-m05-a06-lab-introduction]]"
parte_de: "[[curso-intro-ai-ml-google-cloud]]"
curso: "[[curso-intro-ai-ml-google-cloud]]"
data: 2026-10-09
related: ["[[R - 2026-10-09-m05-a03-model-development]]", "[[R - 2026-10-09-m05-a01-ml-workflow]]", "[[R - 2026-10-09-m05-a05-mlops-and-workflow-automation]]"]
---

# Aula 5.6 — Lab introduction (risco de crédito)

| | |
|---|---|
| **Tema** | Introdução ao lab opcional: as quatro taxas e o confidence threshold |
| **Curso** | [[curso-intro-ai-ml-google-cloud]] |
| **Data** | 09/10/2026 |
| **Duração** | ~3min50 |
| **Aula nº** | 5.6 (módulo 5 na plataforma, "Module 4" na fala do instrutor) |
| **Status** | ⚠️ **Opcional** — *"not completing this lab won't affect your course completion status"* |
| **Transcrição** | [[T - 2026-10-09-m05-a06-lab-introduction]] |

> 🎯 **Peso na prova: ⭐⭐⭐ — e não se engane pelo "opcional".**
> O **lab** é opcional; **esta aula de introdução não é dispensável**. Ela traz
> **as quatro taxas com fórmulas** (a 5.3 só havia dado recall e precision), um
> **número novo e muito cobrável** (1.000 data points) e o **confidence
> threshold** com dois extremos numéricos. É o complemento necessário da 5.3.

---

## Conteúdo por tópico

### 1. ⭐⭐ O lab e o número novo: 1.000 data points

| | |
|---|---|
| **Ferramenta** | **Agent Platform AutoML** — *"a **no-code** tool"* |
| **O objetivo do modelo** | **prever risco de crédito** (*loan risk*) |
| **O dataset** | empréstimos de uma **instituição financeira**, com **2.050 data points** |
| ⭐ **O mínimo exigido pelo AutoML** | **pelo menos 1.000 data points** num dataset |
| **O propósito pedagógico** | praticar os **três estágios** do workflow |

> ⭐⭐ ***"Agent Platform AutoML requires at least 1,000 data points in a
> dataset."***

⚠️ **Este é o número que finalmente responde à pergunta que estava aberta desde a
aula 4.1.** A tabela comparativa daquela aula deixou a célula "volume de dados"
**vazia** para o AutoML, e eu vinha registrando isso como pendência desde então.

| Opção | Volume de dados |
|---|---|
| **Pre-trained APIs** | **nenhum** |
| **Agent Platform AutoML** | ✅ **no mínimo 1.000 data points** |
| **BigQuery ML** | **grande** — centenas de milhares (4.4) |
| **Custom training** | **grande** — centenas de milhares (4.4) |

> ✅ **PENDÊNCIA ENCERRADA.** E a ordem de grandeza confirma a leitura que eu
> havia proposto: o AutoML exige **muito menos** que BigQuery ML e custom
> training — **mil** contra **centenas de milhares**. Era o que o **transfer
> learning** (aula 4.3) permitia supor.

⚠️ **Note também o contraste numérico:** o dataset do lab tem **2.050** pontos —
pouco mais que o **dobro** do mínimo. Se a prova citar números, **1.000 é o
mínimo** e **2.050 é o do lab**.

📌 **Nota terminológica:** esta aula chama os três estágios de *"three **phases**
of the machine learning workflow"*, onde a **5.1** dizia *"three main
**stages**"*. **Mesma coisa, palavra diferente** — e cuidado para não confundir
com as **três fases de automação do MLOps** (5.5), que são **fase 0, 1 e 2**.

### 2. ⭐⭐⭐ As QUATRO taxas da matriz de confusão

A aula **5.3** deu os **quatro quadrantes** (TP, TN, FP, FN) e **duas métricas**
(recall e precision). Esta aula dá as **quatro taxas**, cada uma com fórmula:

| Taxa | Fórmula | O que mede |
|---|---|---|
| **True positive rate** (TPR) | **TP / (TP + FN)** | dos positivos **reais**, quantos foram pegos |
| **True negative rate** (TNR) | **TN / (FP + TN)** | dos negativos **reais**, quantos foram pegos |
| **False positive rate** (FPR) | **FP / (FP + TN)** | dos negativos **reais**, quantos foram acusados errado |
| **False negative rate** (FNR) | **FN / (TP + FN)** | dos positivos **reais**, quantos escaparam |

> ⭐⭐⭐ **A descoberta que organiza tudo: TPR É O RECALL.**
>
> ```
> recall = TP / (TP + FN)        (aula 5.3)
> TPR    = TP / (TP + FN)        (aula 5.6)
> ```
>
> **São a mesma fórmula.** Se uma questão falar de *"true positive rate"* e outra
> de *"recall"*, estão pedindo a mesma coisa.

> ⭐⭐ **E as taxas andam em PARES COMPLEMENTARES:**
>
> | Par | Soma | Por quê |
> |---|---|---|
> | **TPR + FNR** | **100%** | mesmo denominador: **TP + FN** (todos os positivos reais) |
> | **TNR + FPR** | **100%** | mesmo denominador: **FP + TN** (todos os negativos reais) |
>
> **Confira nos números do exemplo:** TPR **100%** + FNR **0%** = 100% ✅ ·
> TNR **87%** + FPR **13%** = 100% ✅
>
> ⚠️ **Isso é ouro em prova:** se a questão der uma taxa e pedir a
> complementar, é só subtrair de 100%. E se der quatro números que **não** fecham
> nesses pares, algo está errado na alternativa.

### 3. ⭐⭐⭐ O exemplo numérico — e a inversão de papéis

Os números que o lab produz:

| Taxa | Valor | O que significa, nas palavras do curso |
|---|---|---|
| **TPR** | **100%** | *"o modelo identifica perfeitamente **todos que vão pagar** o empréstimo. **Nunca perde um bom tomador**"* |
| **TNR** | **87%** | *"identifica corretamente **87% das pessoas que não vão pagar** — os **defaulters**"* |
| **FPR** | **13%** | *"identifica equivocadamente **13% dos bons tomadores** — os que de fato pagam — **como defaulters**"* |
| **FNR** | **0%** | *"**nunca** identifica incorretamente um tomador que vai pagar como **potencial defaulter**"* |

> ⚠️⚠️⚠️ **A ARMADILHA MAIS IMPORTANTE DESTA AULA — a inversão de papéis.**
>
> Neste exemplo, a **classe positiva é "vai pagar"** (o bom tomador), **não** "vai
> dar default". Isso **inverte a intuição** de quem está acostumado a pensar que
> "positivo = o problema que eu quero detectar".
>
> | | Neste exemplo |
> |---|---|
> | **Positivo** | **vai pagar** (bom tomador) |
> | **Negativo** | **não vai pagar** (defaulter) |
> | **Falso positivo** | um **bom tomador** rotulado como **defaulter** → *"o banco rejeita clientes potencialmente bons"* |
> | **Falso negativo** | um **defaulter** rotulado como **bom tomador** → o banco empresta e não recebe |
>
> ⚠️ **Compare com o exemplo do Gmail (aula 5.3):** lá a classe positiva era
> **spam** — o problema a detectar. Aqui é o **contrário**.
>
> ✅ **A lição de prova:** **sempre identifique qual é a classe positiva antes de
> raciocinar sobre FP e FN.** A pergunta não é "o que é ruim?", é "o que o
> modelo está prevendo como positivo?".

⚠️ **E note a consequência de negócio que o curso aponta** para o FPR de 13%:
*"this can lead to the bank **rejecting potentially good customers**, which is
**not ideal**"*. É o custo do falso positivo **traduzido em negócio** — e é assim
que a prova vai formular o cenário.

### 4. ⭐⭐⭐ O confidence threshold

> *"The **confidence threshold** determines **how a machine learning model counts
> the positive cases**."*

**A regra, em duas linhas:**

| Threshold | Precision | Recall |
|---|---|---|
| **mais alto** ⬆️ | **aumenta** ⬆️ | **diminui** ⬇️ |
| **mais baixo** ⬇️ | **diminui** ⬇️ | **aumenta** ⬆️ |

> ⭐⭐ **O raciocínio por trás:** o threshold é **quão confiante o modelo precisa
> estar** para chamar algo de positivo.
> - **Threshold alto** = o modelo só diz "positivo" quando tem muita certeza →
>   **erra menos** quando diz (precision alta), mas **deixa muita coisa passar**
>   (recall baixo).
> - **Threshold baixo** = o modelo diz "positivo" por qualquer indício → **pega
>   quase tudo** (recall alto), mas **acusa muito errado** (precision baixa).

**⭐⭐⭐ Os dois extremos, com os números do exemplo:**

| | **Threshold = 0** | **Threshold = 1** |
|---|---|---|
| **Recall** | **100%** (o mais alto) | **1%** (o mais baixo) |
| **Precision** | **50%** (a mais baixa) | **100%** (a mais alta) |
| **O que o modelo faz** | prevê que **100% dos solicitantes** vão pagar | só aprova **1% dos solicitantes** |
| **A realidade** | só **50%** realmente pagaram | dos aprovados, **100%** pagaram |
| **A consequência de negócio** | ⚠️ *"você só recebe **metade** do investimento em empréstimos de volta"* | ⚠️ *"você **rejeitou 99%** dos solicitantes — **uma perda de negócio considerável**"* |

> ✅ **A lição final:** *"These are both **extreme examples**, but it's important
> that you **always try to set an appropriate threshold** for your model."*

⚠️ **Os dois extremos são questões de prova prontas**, e o formato mais provável é
dar um dos extremos e pedir a consequência — ou dar a consequência e pedir qual
extremo a causou. **Decore os quatro números: 0 → 100%/50% · 1 → 1%/100%.**

📌 **Conexão com a 5.3:** a **precision-recall curve** que a Agent Platform
visualiza é exatamente o gráfico que você percorre ao mover esse threshold. A 5.3
disse que ela existe; a 5.6 explica **o que você faz com ela**.

---

## Glossário da aula

| Termo | Definição |
|---|---|
| **True positive rate (TPR)** | **TP / (TP + FN)** — ⭐ **é a mesma fórmula do recall** |
| **True negative rate (TNR)** | **TN / (FP + TN)** |
| **False positive rate (FPR)** | **FP / (FP + TN)** |
| **False negative rate (FNR)** | **FN / (TP + FN)** |
| **Confidence threshold** | Determina **como o modelo conta os casos positivos** |
| **Defaulter** | Quem **não vai pagar** o empréstimo — a **classe negativa** neste exemplo |
| **Good borrower** | Quem **vai pagar** — a **classe positiva** neste exemplo |
| **Precision-recall curve** | O gráfico que você percorre ao **mover o threshold** |

---

## Flashcards

| Pergunta | Resposta |
|---|---|
| ⭐⭐ Qual o **mínimo de data points** que o AutoML exige? | **1.000** |
| Quantos pontos tem o dataset do lab? | **2.050** |
| O lab é obrigatório? | **Não** — *"não afeta o status de conclusão do curso"* |
| O que o modelo do lab prevê? | **Risco de crédito** (*loan risk*) |
| ⭐⭐⭐ A fórmula do **true positive rate** | **TP / (TP + FN)** |
| ⭐⭐⭐ E o que isso tem de notável? | **É a mesma fórmula do recall** — TPR = recall |
| A fórmula do **true negative rate** | **TN / (FP + TN)** |
| A fórmula do **false positive rate** | **FP / (FP + TN)** |
| A fórmula do **false negative rate** | **FN / (TP + FN)** |
| ⭐⭐ Quais taxas somam 100%? | **TPR + FNR** (mesmo denominador) e **TNR + FPR** (mesmo denominador) |
| ⚠️ No exemplo do empréstimo, qual é a classe **positiva**? | **"Vai pagar"** — o **bom tomador**, não o defaulter |
| ⚠️ E no exemplo do Gmail (5.3)? | **Spam** — ou seja, **o contrário**. Sempre identifique a classe positiva primeiro |
| O que significa **FPR de 13%** no exemplo? | O modelo acusa **13% dos bons tomadores** como **defaulters** → o banco **rejeita bons clientes** |
| O que significa **FNR de 0%**? | O modelo **nunca** rotula quem vai pagar como potencial defaulter |
| ⭐⭐ O que o **confidence threshold** determina? | **Como o modelo conta os casos positivos** |
| ⭐⭐⭐ Threshold **mais alto** faz o quê? | **Aumenta a precision** e **diminui o recall** |
| ⭐⭐⭐ Threshold **mais baixo**? | **Diminui a precision** e **aumenta o recall** |
| ⭐⭐ Threshold **= 0** produz quais números? | **Recall 100%**, **precision 50%** |
| E o que isso significa no negócio? | O modelo aprova **todos**; só **metade** paga → *"você recebe só metade do investimento de volta"* |
| ⭐⭐ Threshold **= 1** produz quais números? | **Precision 100%**, **recall 1%** |
| E no negócio? | Dos aprovados, **todos** pagam — mas você **rejeitou 99%** → **perda de negócio considerável** |
| Qual a lição final? | **Sempre definir um threshold apropriado** — os dois extremos são ruins |

---

## Questões estilo prova

**1.** ⭐⭐ Qual o número mínimo de data points que o Agent Platform AutoML exige
num dataset?
- A) 100
- B) 1.000
- C) 2.050
- D) 100.000

<details><summary>Gabarito</summary>

**B.** *"Agent Platform AutoML requires **at least 1,000 data points** in a
dataset."* ⚠️ (C) é o **tamanho do dataset do lab**, não o mínimo — distrator
tirado da mesma aula. (D) é a ordem de grandeza de **BigQuery ML e custom
training** (centenas de milhares, aula 4.4).
</details>

**2.** ⭐⭐⭐ Qual é a fórmula do **true positive rate**?
- A) TP / (TP + FP)
- B) TP / (TP + FN)
- C) TN / (FP + TN)
- D) FP / (FP + TN)

<details><summary>Gabarito</summary>

**B.** E note: **é a mesma fórmula do recall** (aula 5.3). ⚠️ (A) é a
**precision**, (C) é o **true negative rate** e (D) é o **false positive rate** —
todos da mesma família.
</details>

**3.** ⭐⭐⭐ Um modelo de risco de crédito tem **true negative rate de 87%**. Qual
é o **false positive rate**?
- A) 13%
- B) 87%
- C) 0%
- D) Não é possível saber

<details><summary>Gabarito</summary>

**A.** **TNR + FPR = 100%**, porque as duas têm o **mesmo denominador** (FP + TN,
todos os negativos reais). Logo, 100% − 87% = **13%** — exatamente o número do
exemplo. O mesmo vale para **TPR + FNR**.
</details>

**4.** ⚠️⚠️ No exemplo do lab de risco de crédito, o que é um **falso positivo**?
- A) Um defaulter classificado como bom tomador
- B) Um bom tomador classificado como defaulter
- C) Um empréstimo aprovado que foi pago
- D) Um empréstimo rejeitado corretamente

<details><summary>Gabarito</summary>

**B.** ⚠️ **Esta é a questão mais capciosa da aula.** Aqui a **classe positiva é
"vai pagar"** — o **bom tomador**. Então o **falso positivo** é um bom tomador
**rotulado errado como defaulter**, e a consequência é *"o banco rejeitar clientes
potencialmente bons"*. **(A) seria o falso negativo.**

**A lição:** no Gmail (5.3), positivo = **spam**; aqui, positivo = **vai pagar**.
**Sempre identifique a classe positiva antes de raciocinar sobre FP e FN.**
</details>

**5.** ⭐⭐⭐ O que acontece quando você **aumenta** o confidence threshold?
- A) A precision aumenta e o recall diminui
- B) A precision diminui e o recall aumenta
- C) Os dois aumentam
- D) Os dois diminuem

<details><summary>Gabarito</summary>

**A.** **Threshold alto = o modelo só diz "positivo" com muita certeza** → erra
menos quando diz (**precision ⬆️**), mas deixa muita coisa passar (**recall
⬇️**). ⚠️ (B) é a inversão exata — e é o que acontece ao **baixar** o threshold.
</details>

**6.** ⭐⭐⭐ Movendo o confidence threshold para **zero**, o que você obtém no
exemplo do empréstimo?
- A) Precision 100% e recall 1%
- B) Recall 100% e precision 50%
- C) Precision e recall ambos em 100%
- D) Recall 87% e precision 13%

<details><summary>Gabarito</summary>

**B.** **Threshold 0 → recall máximo (100%), precision mínima (50%).** O modelo
aprova **todos** os solicitantes, mas só **metade** paga — *"você só recebe
metade do investimento de volta"*. ⚠️ (A) é o **outro extreme** (threshold = 1) e
(D) mistura as taxas do exemplo da matriz.
</details>

**7.** ⭐⭐ Um banco define o threshold em **1** e passa a aprovar só 1% dos
solicitantes. Qual o problema?
- A) Nenhum — precision de 100% é o ideal
- B) Ele rejeitou 99% dos solicitantes, o que representa uma perda de negócio considerável
- C) A precision cai para 50%
- D) O modelo passa a ter false negative rate de 0%

<details><summary>Gabarito</summary>

**B.** *"You **rejected 99%** of loan applicants… that's a **pretty big business
loss**."* ⚠️ (A) é a armadilha conceitual: **precision perfeita não é o objetivo**
— o curso fecha dizendo que **os dois extremos são ruins** e que se deve buscar
um **threshold apropriado**.
</details>

**8.** ⭐ O que o **confidence threshold** determina?
- A) Quantos modelos entram no ensemble
- B) Como o modelo conta os casos positivos
- C) Quantos epochs o treinamento terá
- D) Se o modelo vai para produção

<details><summary>Gabarito</summary>

**B.** *"The confidence threshold determines **how a machine learning model counts
the positive cases**."* ⚠️ (A) é o **training budget** (4.3), (C) é definido no
**`fit`** (4.5) e (D) é o papel do **`classification_model_eval_metrics`** (5.5)
— que, aliás, compara métricas a um **threshold** também, mas de **deployment**,
não de confiança.
</details>

---

## Dúvidas em aberto / revisar

- ✅ **PENDÊNCIA ENCERRADA: o volume de dados do AutoML.** **No mínimo 1.000 data
  points.** Estava aberta desde a aula **4.1**, que deixou a célula vazia na
  tabela comparativa. Confirma a leitura de que o AutoML exige **muito menos** que
  BigQuery ML e custom training (centenas de milhares).
- ✅ **TPR = recall.** As duas fórmulas são idênticas.
- ⚠️ **Dois usos de "threshold" no módulo**, em contextos diferentes:
  **confidence threshold** (5.6, para contar positivos) × o **threshold de
  deployment** do `classification_model_eval_metrics` (5.5, para decidir se
  implanta). **Não confunda.**
- ⚠️ **Dois usos de "fases"**: os **três estágios** do workflow (que esta aula
  chama de *phases*) × as **três fases de automação do MLOps** (**0, 1 e 2**, aula
  5.5).
- 📌 **A classe positiva muda de exemplo para exemplo.** Gmail (5.3): positivo =
  **spam**. Empréstimo (5.6): positivo = **vai pagar**. **Sempre identifique
  primeiro.**

---
