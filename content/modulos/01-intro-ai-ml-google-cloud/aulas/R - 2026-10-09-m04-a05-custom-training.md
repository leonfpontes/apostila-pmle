---
title: Aula 4.5 — Custom training
aliases: [custom training, pre-built container, custom container, camadas do TensorFlow, tf.keras, JAX]
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
summary: "Aula 4.5 do curso Introduction to AI and ML on Google Cloud: custom training como solução code-based — quando usar, containers pré-construídos × customizados (analogia da cozinha), Workbench e Colab Enterprise, bibliotecas de ML, as quatro camadas de abstração do TensorFlow, os três passos do tf.keras e o JAX."
transcricao: "[[T - 2026-10-09-m04-a05-custom-training]]"
parte_de: "[[curso-intro-ai-ml-google-cloud]]"
curso: "[[curso-intro-ai-ml-google-cloud]]"
data: 2026-10-09
related: ["[[R - 2026-10-09-m04-a04-pre-trained-apis]]", "[[R - 2026-10-09-m04-a03-agent-platform-automl]]", "[[R - 2026-10-09-m04-a02-agent-platform]]"]
---

# Aula 4.5 — Custom training

| | |
|---|---|
| **Tema** | Custom training: a solução code-based, do-it-yourself |
| **Curso** | [[curso-intro-ai-ml-google-cloud]] |
| **Data** | 09/10/2026 |
| **Duração** | ~5min40 |
| **Aula nº** | 4.5 (módulo 4 na plataforma, "Module 3" na fala do instrutor) |
| **Transcrição** | [[T - 2026-10-09-m04-a05-custom-training]] |

> 🎯 **Peso na prova: ⭐⭐⭐.** Três estruturas decoráveis: a **dupla de
> containers** (com analogia), as **quatro camadas do TensorFlow** e os **três
> passos do tf.keras**. É a aula mais técnica do módulo.

---

## Conteúdo por tópico

### 1. ⭐ A escada, fechada em três degraus

A aula abre resumindo as três anteriores — e **volta a chamar o AutoML de
no-code**:

> *"You learned about **no-code** solutions like Agent Platform AutoML and
> **low-code** solutions like pre-trained APIs. Now, let's explore a
> **code-based** solution: **custom training**, a **do-it-yourself** approach."*

| Degrau | Ferramenta | Aula |
|---|---|---|
| **no-code** | **Agent Platform AutoML** | 4.3 |
| **low-code** | **Pre-trained APIs** | 4.4 |
| **code-based** | **Custom training** | 4.5 |

✅ Com isso a contagem do rótulo do AutoML fica **4 no-code** (1.1, 4.2, 4.3,
**4.5**) contra **2 "no-to-low-code"** (4.1, 4.4). **Resposta de prova:
no-code.**

### 2. ⭐⭐ Quando usar custom training

A aula reconhece as vantagens das outras duas antes de justificar a terceira:

> *"While Agent Platform AutoML UI offers significant **convenience** and
> pre-trained APIs **eliminate the need for training data**, you might require
> custom training if your **unique needs extend beyond AutoML's automated
> capabilities**."*

**E o gatilho, em uma frase:**

> *"This is when **complete control and flexibility** over the **model
> architecture**, **frameworks**, and **training logic** become essential."*

| Sobre o que você ganha controle total |
|---|
| **Model architecture** |
| **Frameworks** |
| **Training logic** |

⚠️ **São exatamente três itens.** Se a questão perguntar "sobre o que o custom
training dá controle", a resposta é essa trinca — não "sobre os dados" nem "sobre
o custo".

### 3. ⭐⭐⭐ A primeira decisão: pre-built × custom container

> *"**Before any coding begins**, you must determine **what environment** you
> want your ML training code to use. There are **two options**."*

📌 **Note a ordem:** a escolha do container vem **antes de escrever qualquer
código**.

**A analogia da cozinha:**

| | **Pre-built container** | **Custom container** |
|---|---|---|
| **Analogia** | **cozinha mobiliada** — armários, eletrodomésticos e panelas | **sala vazia** — você define os aparelhos e ferramentas |
| **Quando escolher** | seu treinamento precisa de uma plataforma como **Python, TensorFlow ou PyTorch** **e** você **não é exigente** quanto à infraestrutura (qual forno, qual faca) | você quer definir **exatamente** com o que vai "cozinhar" |
| **O que você precisa determinar** | — | **environment**, **machine type** e **disks** |

⚠️ **Três detalhes cobráveis:**

1. **A condição do pre-built tem duas metades:** a plataforma **é** uma das
   comuns **E** você **não se importa** com a infraestrutura. Se você se importa,
   vai para custom.
2. **Os três detalhes do custom container** — **environment, machine type,
   disks** — são uma lista fechada e cobrável.
3. **"Qual forno ou qual faca"** é a parte da analogia que representa a
   **infraestrutura subjacente**.

### 4. As ferramentas para escrever o código

| Ferramenta | O que é |
|---|---|
| **Agent Platform Workbench** | *"um **Jupyter notebook** implantado num **único ambiente de desenvolvimento**"* que suporta **todo o workflow de data science: explorar → treinar → implantar** |
| **Agent Platform Colab Enterprise** | **integrado** à Agent Platform, para o cientista de dados codar num **ambiente familiar** |

⚠️ **A definição do Workbench como "Jupyter notebook" aparece aqui pela primeira
vez.** E o **workflow de três etapas** que ele suporta — **exploring → training →
deploying** — é uma lista nova, diferente das outras do módulo.

📌 Lembre da aula **4.2**: o Workbench também **aceita SQL** para conectar
BigQuery ↔ Agent Platform.

### 5. ⭐ Bibliotecas de ML

> *"These days, you **don't have to code from scratch**. Instead, you can
> leverage **ML libraries**."*

**A definição:**

> *"An ML library is a **collection of pre-written code** that can be used to
> perform machine learning tasks."*

| | |
|---|---|
| **O que são** | **coleção de código pré-escrito** para tarefas de ML |
| **O que economizam** | **tempo e esforço** dos desenvolvedores |
| **Por quê** | dão as ferramentas para construir modelos **sem escrever tudo do zero** |
| **As três populares** | **TensorFlow · scikit-learn · PyTorch** |
| **O que elas têm em comum** | são **open source** e usadas por **uma grande comunidade** |

⚠️ **As três bibliotecas aparecem em duas listas ligeiramente diferentes na mesma
aula:**
- como **plataformas** que um pre-built container atende: **Python, TensorFlow,
  PyTorch**
- como **bibliotecas populares de ML**: **TensorFlow, scikit-learn, PyTorch**

**O scikit-learn só aparece na segunda; o Python só na primeira.** Se a questão
pedir "bibliotecas de ML populares", a resposta é **TensorFlow, scikit-learn e
PyTorch**.

### 6. ⭐⭐⭐ As quatro camadas de abstração do TensorFlow

> **TensorFlow** = *"an **end-to-end open platform** for machine learning
> **supported by Google**."*

> *"The TensorFlow APIs are arranged **hierarchically**, with the **high-level
> APIs built on the low-level APIs**."*

**De baixo para cima:**

| # | Camada | O que tem |
|---|---|---|
| **1** (a mais baixa) | **Hardware** | **CPU, GPU e TPU** |
| **2** | **Low-level TensorFlow APIs** | escrever **suas próprias operações em C++** e chamar as funções **core, basic e numeric processing escritas em Python** |
| **3** | **TensorFlow model libraries** | os **building blocks**: **camadas de rede neural** e **métricas de avaliação** |
| **4** (a mais alta) | **High-level TensorFlow APIs, como o Keras** | **escondem os detalhes** da construção do modelo e **implantam o treinamento automaticamente**; *"can be your **most used** APIs"* |

⚠️ **Quatro armadilhas aqui:**

1. **A camada mais baixa é HARDWARE**, não código. Se uma alternativa começar a
   hierarquia pelas low-level APIs, está incompleta.
2. **As low-level APIs envolvem duas linguagens:** você escreve operações em
   **C++** e chama funções escritas em **Python**.
3. **A camada 3 não são APIs** — são **model libraries**, os blocos de
   construção (camadas de rede neural, métricas).
4. **Keras é a camada 4** — a **mais alta**, não a mais baixa. E a aula diz que
   provavelmente serão as suas APIs **mais usadas**.

**⭐ E a frase que fecha a seção:**

> *"Agent Platform **fully hosts TensorFlow from low-level to high-level APIs**.
> Regardless of **which abstraction level** you are writing your TensorFlow code
> at, Agent Platform gives you a **managed service**."*

Ou seja: **qualquer** nível de abstração é serviço gerenciado. Não há um nível que
"caia fora" da plataforma.

### 7. ⭐⭐⭐ Os três passos do tf.keras

O exemplo constrói um **modelo de regressão simples** com **tf.keras**, descrita
como *"a commonly used **high-level** TensorFlow library"* (camada 4).

> *"Typically, it takes **three fundamental steps**."*

| # | Passo | Método | O que você define |
|---|---|---|---|
| **1** | **Create** | `tf.keras.Sequential` | **junta as camadas** de uma rede neural — no exemplo, **três camadas** |
| **2** | **Compile** | `compile` | os **hiperparâmetros**: como **medir a performance** (**loss function**) e como **otimizar o treinamento** (**optimizer**) |
| **3** | **Train / fit** | `fit` | o **input** (dados de treino), o **output** (resultados previstos) e o número de **epochs** (iterações) |

**Depois dos três passos:** *"after you train the model and are **satisfied with
the performance**, you can then **deploy** the model and **make predictions**."*

⚠️ **Três precisões importantes:**

1. **"Compile" é onde entram os hiperparâmetros** — *"you specify
   **hyperparameters** such as performance evaluation and model optimization"*.
   Se a questão perguntar em qual passo se definem hiperparâmetros, é o **2**.
2. **Loss function mede; optimizer otimiza.** Não confunda os papéis.
3. **Epochs = número de iterações** de treinamento, definido no passo **3**
   (`fit`), não no `compile`.

**Pressupostos do exemplo:** já se importou o TensorFlow e **já se subiu os
dados**. E as **activation functions** das redes neurais ficam para *"the next
module"* (módulo 5).

### 8. JAX

> *"Apart from TensorFlow, Google is **consistently introducing new frameworks**.
> One of the **most promising** frameworks is **JAX**."*

| | |
|---|---|
| **O que é** | **biblioteca de computação numérica de alta performance** |
| **Qualidades** | **altamente flexível** e **fácil de usar** |
| **Para que ambientes** | **pesquisa e produção** — os dois |

⚠️ **JAX é "high-performance numerical computation", não um framework de deep
learning** na descrição do curso. E a aula destaca que serve tanto para
**research** quanto para **production** — um detalhe que uma alternativa pode
restringir só a pesquisa.

---

## Glossário da aula

| Termo | Definição |
|---|---|
| **Custom training** | Solução **code-based**, **do-it-yourself**, para construir um modelo de ML |
| **Pre-built container** | A **cozinha mobiliada**: ambiente pronto com Python, TensorFlow, PyTorch; para quem **não é exigente** com a infraestrutura |
| **Custom container** | A **sala vazia**: você define **environment, machine type e disks** |
| **Agent Platform Workbench** | Um **Jupyter notebook** num único ambiente; suporta **explorar → treinar → implantar** |
| **Agent Platform Colab Enterprise** | Notebook **integrado** à Agent Platform, ambiente **familiar** |
| **ML library** | **Coleção de código pré-escrito** para tarefas de ML |
| **TensorFlow** | **Plataforma aberta end-to-end** de ML **apoiada pelo Google**; APIs em **hierarquia** |
| **Keras** | API **high-level** do TensorFlow; **esconde os detalhes** e **implanta o treinamento automaticamente** |
| **tf.keras** | Biblioteca **high-level** usada no exemplo de regressão |
| **Loss function** | Como se **mede a performance** — definida no `compile` |
| **Optimizer** | Como se **otimiza o treinamento** — definido no `compile` |
| **Epochs** | **Número de iterações** de treinamento — definido no `fit` |
| **JAX** | Biblioteca de **computação numérica de alta performance**, flexível e fácil; **pesquisa e produção** |

---

## Flashcards

| Pergunta | Resposta |
|---|---|
| Qual o rótulo do **custom training**? | **Code-based**, abordagem **do-it-yourself** |
| ⭐ Sobre o que o custom training dá **controle total**? | **Model architecture · frameworks · training logic** |
| Quando você precisa dele? | Quando suas necessidades **vão além das capacidades automatizadas do AutoML** |
| ⭐ Qual a **primeira** decisão, antes de qualquer código? | **Qual ambiente** o código de treinamento vai usar: **pre-built** ou **custom container** |
| A analogia do **pre-built container** | Uma **cozinha mobiliada** — armários, eletrodomésticos, panelas |
| A analogia do **custom container** | Uma **sala vazia** — você define os aparelhos |
| Quando escolher **pre-built**? | Se precisa de **Python, TensorFlow ou PyTorch** **e** **não é exigente** com a infraestrutura |
| ⭐ O que você define num **custom container**? | **Environment · machine type · disks** |
| O que é o **Workbench**? | Um **Jupyter notebook** num **único ambiente de desenvolvimento** |
| Que workflow o Workbench suporta? | **Explorar → treinar → implantar** |
| O que é o **Colab Enterprise**? | Notebook **integrado** à Agent Platform, ambiente **familiar** |
| ⭐ O que é uma **ML library**? | **Coleção de código pré-escrito** para tarefas de ML |
| As três bibliotecas populares | **TensorFlow · scikit-learn · PyTorch** |
| O que elas têm em comum? | São **open source**, com **grande comunidade** |
| O que é o **TensorFlow**? | **Plataforma aberta end-to-end** de ML **apoiada pelo Google** |
| Como as APIs do TensorFlow estão arranjadas? | **Hierarquicamente** — as high-level são **construídas sobre** as low-level |
| ⭐⭐ As **quatro camadas**, de baixo para cima | **hardware → low-level APIs → model libraries → high-level APIs (Keras)** |
| O que tem na camada **hardware**? | **CPU, GPU e TPU** |
| O que se faz nas **low-level APIs**? | Escrever operações em **C++** e chamar funções **core, basic e numeric** escritas em **Python** |
| O que as **model libraries** oferecem? | Os **building blocks**: **camadas de rede neural** e **métricas de avaliação** |
| O que o **Keras** faz? | **Esconde os detalhes** da construção e **implanta o treinamento automaticamente** |
| ⭐ Até onde a Agent Platform hospeda o TensorFlow? | **De ponta a ponta** — low-level a high-level; **serviço gerenciado em qualquer nível** |
| ⭐⭐ Os **três passos** do tf.keras | **create → compile → train (fit)** |
| O que se faz no **create**? | **Juntar as camadas** da rede neural — `tf.keras.Sequential` |
| ⭐ Onde se definem os **hiperparâmetros**? | No **compile** — performance evaluation e model optimization |
| O que a **loss function** faz? | **Mede a performance** |
| O que o **optimizer** faz? | **Otimiza o treinamento** |
| Onde se define o número de **epochs**? | No **fit** (passo 3) |
| O que vem depois dos três passos? | **Implantar** o modelo e **fazer previsões** |
| O que é o **JAX**? | Biblioteca de **computação numérica de alta performance**, **flexível e fácil de usar** |
| Para quais ambientes o JAX serve? | **Pesquisa e produção** |

---

## Questões estilo prova

**1.** ⭐ Qual é a primeira decisão a tomar em custom training, antes de escrever
qualquer código?
- A) Qual biblioteca de ML usar
- B) Qual ambiente usar: um pre-built container ou um custom container
- C) Quantos epochs treinar
- D) Qual loss function aplicar

<details><summary>Gabarito</summary>

**B.** *"**Before any coding begins**, you must determine what **environment**
you want your ML training code to use."* (A) vem depois de escolher o ambiente;
(C) e (D) são decisões **dentro** do código.
</details>

**2.** ⭐⭐ Quando um **pre-built container** é a melhor escolha?
- A) Quando você precisa definir o tipo de máquina e os discos
- B) Quando seu treinamento usa Python, TensorFlow ou PyTorch e você não é exigente quanto à infraestrutura
- C) Quando você precisa de controle total sobre o ambiente
- D) Quando você não tem dados de treinamento

<details><summary>Gabarito</summary>

**B.** A condição tem **duas metades**: a plataforma é uma das comuns **e** você
não se importa com a infraestrutura. ⚠️ (A) e (C) descrevem o **custom
container** — a sala vazia. (D) descreve **pre-trained APIs**.
</details>

**3.** ⭐ O que você deve determinar ao criar um **custom container**?
- A) O loss function, o optimizer e os epochs
- B) O environment, o machine type e os disks
- C) A arquitetura do modelo, o framework e a lógica de treinamento
- D) A API, os parâmetros e o formato

<details><summary>Gabarito</summary>

**B.** Lista fechada e literal. ⚠️ Os três distratores são **todos listas reais
do módulo**: (A) são decisões do `compile`/`fit`, (C) é **sobre o que o custom
training dá controle** (mesma aula!) e (D) são as três coisas que um usuário de
**API** precisa saber (aula 4.4).
</details>

**4.** ⭐⭐ Qual a ordem correta das camadas de abstração do TensorFlow, da mais
baixa para a mais alta?
- A) Low-level APIs → hardware → model libraries → Keras
- B) Hardware → low-level APIs → model libraries → high-level APIs como o Keras
- C) Keras → model libraries → low-level APIs → hardware
- D) Hardware → model libraries → low-level APIs → Keras

<details><summary>Gabarito</summary>

**B.** A camada **mais baixa é hardware** (CPU, GPU, TPU). ⚠️ (C) é a ordem
invertida — distrator fácil de marcar por distração. (D) troca as camadas 2 e 3:
as **low-level APIs** vêm **antes** das model libraries.
</details>

**5.** ⭐ Em qual dos três passos do tf.keras você especifica os hiperparâmetros?
- A) No `create` — ao montar as camadas
- B) No `compile` — junto da avaliação de performance e da otimização
- C) No `fit` — junto dos epochs
- D) Depois do treino, ao implantar

<details><summary>Gabarito</summary>

**B.** *"In step two, you **compile** the model, where you specify
**hyperparameters** such as performance evaluation and model optimization."*
⚠️ (C) é o distrator forte: os **epochs** se definem no `fit`, mas o curso trata
os hiperparâmetros no **compile**.
</details>

**6.** O que é uma **ML library**, na definição da aula?
- A) Um repositório de modelos pré-treinados
- B) Uma coleção de código pré-escrito que executa tarefas de machine learning
- C) Um container com Python e TensorFlow instalados
- D) Um conjunto de métricas de avaliação

<details><summary>Gabarito</summary>

**B.** ⚠️ (A) descreve o **Model Garden** (aula 3.8), (C) descreve um
**pre-built container** (mesma aula) e (D) é parte da **camada 3** do TensorFlow.
</details>

**7.** O que é o **JAX**?
- A) Um framework de deep learning que substitui o TensorFlow
- B) Uma biblioteca de computação numérica de alta performance, flexível e fácil de usar, para pesquisa e produção
- C) Um notebook integrado à Agent Platform
- D) Uma API de linguagem natural

<details><summary>Gabarito</summary>

**B.** ⚠️ (A) erra duas vezes: o curso o chama de **biblioteca de computação
numérica**, e não diz que **substitui** o TensorFlow — diz que é *"apart from
TensorFlow"* e *"um dos mais promissores"*. E note que serve para **os dois**
ambientes, pesquisa **e** produção.
</details>

---

## Dúvidas em aberto / revisar

- ✅ **O rótulo do AutoML:** com a 4.5, fica **4 no-code** (1.1, 4.2, 4.3, 4.5)
  contra **2 "no-to-low-code"** (4.1, 4.4). Resposta de prova: **no-code**.
- 📌 **Activation functions** das redes neurais foram adiadas para o **módulo 5**
  (provavelmente a aula **5.8**, "How a machine learns").
- 📌 **Duas listas parecidas na mesma aula:** *plataformas* que o pre-built
  atende (**Python, TensorFlow, PyTorch**) × *bibliotecas populares de ML*
  (**TensorFlow, scikit-learn, PyTorch**). O **scikit-learn** só está na segunda.
- ⚠️ **ADK** não aparece nesta aula; segue sem a sigla expandida.

---
