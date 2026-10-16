---
title: Aula 5.1 — ML workflow
aliases: [ML workflow, tres estagios do workflow de ML, analogia do restaurante ML, data drifting, Agent Platform Pipelines]
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
summary: "Aula 5.1 do curso Introduction to AI and ML on Google Cloud: abre o Módulo 5 com a visão geral do workflow de ML — a analogia do restaurante, os três estágios (data preparation, model development, model serving), dados estruturados × não estruturados, a natureza iterativa do workflow, data drifting e as duas formas de montá-lo (AutoML no-code ou Agent Platform Pipelines por código)."
transcricao: "[[T - 2026-10-09-m05-a01-ml-workflow]]"
parte_de: "[[curso-intro-ai-ml-google-cloud]]"
curso: "[[curso-intro-ai-ml-google-cloud]]"
data: 2026-10-09
related: ["[[google-ai-ml-modulo-4-revisao]]", "[[R - 2026-10-09-m04-a02-agent-platform]]", "[[R - 2026-10-09-m04-a08-summary]]"]
---

# Aula 5.1 — ML workflow

| | |
|---|---|
| **Tema** | Visão geral do workflow de ML e as duas formas de montá-lo |
| **Curso** | [[curso-intro-ai-ml-google-cloud]] |
| **Data** | 09/10/2026 |
| **Duração** | ~4min30 |
| **Aula nº** | 5.1 (módulo 5 na plataforma, "Module 4" na fala do instrutor) |
| **Transcrição** | [[T - 2026-10-09-m05-a01-ml-workflow]] |

> 🎯 **Peso na prova: ⭐⭐⭐.** Os **três estágios** são a espinha dorsal do módulo
> inteiro — as aulas 5.2, 5.3 e 5.4 são **um estágio cada**. Decorar isto aqui
> organiza todo o resto. Além disso: **estruturado × não estruturado** com
> exemplos, **data drifting** (termo novo) e **Agent Platform Pipelines**.

---

## Conteúdo por tópico

### 1. ⭐⭐⭐ Os três estágios do workflow de ML

> *"There are **three main stages** to the ML workflow with Agent Platform."*

| # | Estágio | O que acontece | Aula dedicada |
|---|---|---|---|
| **1** | **Data preparation** | **dois passos: data uploading e feature engineering** | **5.2** |
| **2** | **Model development** | **training e evaluation formam um ciclo** | **5.3** |
| **3** | **Model serving** | o modelo é **implantado e monitorado** | **5.4** |

⚠️ **Note que o estágio 1 tem DOIS passos nomeados** — *data uploading* e
*feature engineering*. Isso é cobrável e é fácil de esquecer.

**A analogia do restaurante** — a quarta analogia do curso (depois da cozinha dos
containers, da tomada elétrica e do sanduíche):

| Estágio | No restaurante |
|---|---|
| **Data preparation** | **preparar os ingredientes crus** |
| **Model development** | **experimentar receitas diferentes** |
| **Model serving** | **fechar o menu e servir a refeição aos clientes** |

> *"Building an ML model is actually **not too different from serving food in a
> restaurant**. You start by **preparing raw ingredients** and finish by
> **serving the dishes on the table**."*

### 2. ⭐⭐ Estágio 1 — Data preparation

**A frase sobre a importância dos dados:**

> *"A model needs a **large amount of data** to learn from. The **quality and
> quantity** of the data decide **how much** and **how well** the machine
> learns."*

⚠️ **Note o paralelismo exato:** **quantidade** → *how much* · **qualidade** →
*how well*. É o tipo de construção que vira questão.

**Duas classificações dos dados, independentes entre si:**

| Eixo | Opções |
|---|---|
| **Quando chega** | **real-time streaming data** ou **batch data** |
| **Como se organiza** | **structured** ou **unstructured** |

| | **Structured data** | **Unstructured data** |
|---|---|---|
| **Definição** | pode ser **facilmente armazenada em tabelas** | **não** pode ser facilmente armazenada em tabelas |
| **Exemplos** | **números e texto** | **imagens e vídeos** |

📌 **Conexão com o Módulo 2:** esta é a mesma distinção da aula **2.3** — e
confirma a resposta daquela questão de quiz que você me mandou: dados **não
estruturados** (imagens, texto, áudio) vão para o **Cloud Storage**.

⚠️ **Cuidado com "texto":** aqui o curso classifica **texto como structured**
(junto com números, porque cabe numa tabela). No quiz do Módulo 2, "text"
aparecia entre os dados **não estruturados**. **A diferença é o que se entende
por texto:** um **campo de texto numa tabela** é estruturado; um **documento de
texto livre** não é. Se cair, veja se a alternativa fala de *campos* ou de
*documentos*.

### 3. ⭐⭐ Estágio 2 — Model development

> *"A model needs a **tremendous amount of iterative training**. This is when
> **training and evaluation form a cycle** — train a model, then **evaluate** the
> model, and then **train the model some more**."*

| | |
|---|---|
| **O que caracteriza o estágio** | **treinamento iterativo** |
| **O ciclo** | **treinar → avaliar → treinar mais** |

⚠️ **São DUAS atividades que formam UM ciclo:** **training** e **evaluation**.
Uma questão pode listar "training" sozinho como o estágio 2 — está incompleto.

### 4. ⭐⭐ Estágio 3 — Model serving

> *"A model needs to **actually be used** in order to predict results. This is
> when the ML model is **deployed and monitored**."*

**E a frase mais citável da aula:**

> *"**If you don't move an ML model into production, it has no use and remains
> only a theoretical model.**"*

| | |
|---|---|
| **As duas atividades** | **deployment** e **monitoring** |
| **Por que importa** | sem produção, o modelo é **apenas teórico** |

📌 **"Serving" é a palavra que a 4.8 já havia introduzido** (*"from data
preparation to model training and **serving**"*). Aqui ela ganha o estágio
próprio. Guarde que **serving = deployment + monitoring**.

### 5. ⭐⭐⭐ O workflow NÃO é linear — é iterativo

> *"It's important to note that an ML workflow **isn't linear, it's
> iterative**."*

**Os dois exemplos que o curso dá:**

| Momento | O que pode acontecer | O que você faz |
|---|---|---|
| **Durante o training** (estágio 2) | você percebe que precisa de features melhores | **volta aos dados brutos** e **gera mais features úteis** |
| **Durante o monitoring** (estágio 3) | você encontra **data drifting** ou a **acurácia cai de repente** | **checa as fontes de dados** e **ajusta os parâmetros do modelo** |

⚠️ **Note a direção dos retornos:** do estágio **2 para o 1**, e do estágio **3
para o 1 e para o 2**. Não é um ciclo fechado em si mesmo — é um grafo que volta
atrás.

> *"Fortunately, **these steps can be automated with MLOps**."*

📌 **Este é o gancho para a aula 5.5.** E note o que o MLOps automatiza, segundo
esta frase: **os retornos**, não o caminho principal.

### 6. ⭐ Termo novo: data drifting

> **Data drifting** — citado como um dos dois problemas que você pode encontrar
> **monitorando** o modelo em produção, ao lado da **queda súbita de acurácia**.

⚠️ **A aula não define o termo** — só o nomeia. Pela construção da frase, é a
situação em que **os dados que chegam ao modelo em produção deixam de parecer com
os dados de treinamento**. Vale ver se a aula **5.4** (*Model serving*) ou a
**5.5** (*MLOps*) o define formalmente.

**A resposta aos dois problemas é a mesma dupla:** **checar as fontes de dados**
e **ajustar os parâmetros do modelo**.

### 7. ⭐⭐ As duas formas de montar o workflow

> *"Although the **main stages remain the same**, you have **two options** to set
> up the workflow with Agent Platform."*

| | **Agent Platform AutoML** | **Código** |
|---|---|---|
| **Nível** | **no-code** | code-based |
| **Como** | construir o modelo **pela UI** | **Workbench** ou **Colab Enterprise**, usando **Agent Platform Pipelines** |
| **Vantagens** | **user friendly**; **não exige muita expertise em ML**; **nenhuma habilidade de código** | **automatizar o workflow programaticamente** |
| **Para quem** | — | **ML engineer ou data scientist experiente** |

⚠️ **Os estágios não mudam** — só a forma de montá-los. Se uma alternativa disser
que o caminho code-based tem estágios diferentes, está errada.

### 8. ⭐⭐ Agent Platform Pipelines

> *"Agent Platform Pipelines is essentially a **tool kit** that includes
> **pre-built SDKs and software development kits**, which are the **building
> blocks of a pipeline**."*

| | |
|---|---|
| **O que é** | um **tool kit** (kit de ferramentas) |
| **O que contém** | **SDKs pré-construídos** |
| **Para que servem** | são os **building blocks de um pipeline** |

⚠️ **Nota sobre a frase:** *"pre-built SDKs **and software development kits**"* é
**redundante** — SDK **é** software development kit. Quase certamente é um
artefato da transcrição (provavelmente o slide dizia "pre-built SDKs (software
development kits)"). **Não decore como se fossem duas coisas diferentes.**

### 9. O roteiro do Módulo 5

| Etapa | Conteúdo | Aula |
|---|---|---|
| 1 | **Visão geral** do workflow de ML | **5.1** *(esta aula)* |
| 2 | **Data preparation** | **5.2** |
| 3 | **Model development** | **5.3** |
| 4 | **Model serving** | **5.4** |
| 5 | **MLOps** — *"takes ML models from development to production **in the back end**"* | **5.5** |
| 6 | Exemplo de **pipeline** com **Agent Platform Pipelines** | 5.5 |
| 7 | **Lab**: percorrer os três estágios com **AutoML** | **5.6 / 5.7** |
| 8 | **Opcional**: como uma **rede neural aprende** e as terminologias-chave | **5.8** |

> *"If you're **already familiar with the ML theories**, feel free to **skip**
> this lesson."*

📌 **A aula 5.8 é explicitamente opcional** — mas é onde ficaram as **activation
functions** prometidas na aula 4.5, e o curso diz que entender como uma rede
neural aprende é necessário para *"gaining a solid grasp of ML terminology"*.
**Recomendo não pular.**

### 10. ⚠️ Nota sobre o rótulo do AutoML (de novo)

Esta aula usa **as duas formas, em 3 minutos de distância**:

| Momento | Como chama o AutoML |
|---|---|
| **00:06** (recapitulando o Módulo 4) | *"**low or no-code** solutions like Agent Platform AutoML"* |
| **03:39** (apresentando as duas opções) | *"Agent Platform AutoML, a **no-code** solution"* |

> ✅ **Isso fecha o padrão que eu vinha rastreando:** quando o curso
> **recapitula**, ele hedge ("low or no-code"); quando **contrasta o AutoML com o
> caminho de código**, ele diz **no-code**. A **resposta de prova continua
> no-code** — agora com **cinco** aulas usando esse rótulo (1.1, 4.2, 4.3, 4.5,
> **5.1**).

---

## Glossário da aula

| Termo | Definição |
|---|---|
| **ML workflow** | Os **três estágios** de construir um modelo: **data preparation → model development → model serving** |
| **Data preparation** | Estágio 1 — **data uploading** e **feature engineering** |
| **Model development** | Estágio 2 — **training e evaluation** formando um **ciclo** |
| **Model serving** | Estágio 3 — o modelo é **implantado e monitorado** |
| **Structured data** | Dados que podem ser **facilmente armazenados em tabelas** — **números e texto** |
| **Unstructured data** | Dados que **não** podem — **imagens e vídeos** |
| **Real-time streaming data** | Dados que chegam **continuamente** |
| **Batch data** | Dados que chegam **em lotes** |
| **Data drifting** | Problema detectado no **monitoramento**; a aula **nomeia mas não define** |
| **Theoretical model** | O que um modelo continua sendo se **não for para produção** |
| **Agent Platform Pipelines** | Um **tool kit** com **SDKs pré-construídos**, os **building blocks de um pipeline** |
| **MLOps** | Leva os modelos **do desenvolvimento à produção**, ***in the back end*** |

---

## Flashcards

| Pergunta | Resposta |
|---|---|
| ⭐⭐ Quais os **três estágios** do workflow de ML? | **Data preparation → model development → model serving** |
| ⭐ Quais os **dois passos** do estágio 1? | **Data uploading** e **feature engineering** |
| O que caracteriza o estágio 2? | **Training e evaluation** formando um **ciclo**: treinar → avaliar → treinar mais |
| O que acontece no estágio 3? | O modelo é **implantado (deployed)** e **monitorado** |
| ⭐ A analogia do restaurante | **Ingredientes crus** → **experimentar receitas** → **fechar o menu e servir** |
| ⭐ O que a **quantidade** e a **qualidade** dos dados decidem? | **Quantidade** → *how much* · **qualidade** → *how well* a máquina aprende |
| Os dois eixos de classificação dos dados | **streaming × batch** · **structured × unstructured** |
| ⭐ O que é **structured data**? | Dados **facilmente armazenáveis em tabelas** — **números e texto** |
| ⭐ O que é **unstructured data**? | Dados que **não** cabem facilmente em tabelas — **imagens e vídeos** |
| ⭐⭐ O workflow de ML é linear? | **Não — é ITERATIVO** |
| Exemplo de retorno do estágio 2 | Voltar aos **dados brutos** para **gerar mais features úteis** |
| Exemplo de retorno do estágio 3 | Encontrar **data drifting** ou **queda súbita de acurácia** → checar **fontes de dados** e ajustar **parâmetros** |
| O que automatiza esses retornos? | O **MLOps** (aula 5.5) |
| ⭐ O que é **data drifting**? | Problema detectado no **monitoramento** — ⚠️ a aula **nomeia mas não define** |
| ⭐ A frase sobre não ir para produção | *"Se você não move o modelo para produção, ele **não tem uso** e continua sendo **apenas um modelo teórico**"* |
| ⭐ As **duas formas** de montar o workflow | **AutoML** (no-code, pela UI) ou **código** com **Workbench/Colab Enterprise** usando **Agent Platform Pipelines** |
| ⚠️ Os estágios mudam entre as duas formas? | **Não** — *"the main stages remain the same"* |
| As três vantagens do AutoML citadas | **User friendly** · **não exige muita expertise em ML** · **nenhuma habilidade de código** |
| Para quem é o caminho de código? | **ML engineer ou data scientist experiente** que quer **automatizar programaticamente** |
| ⭐ O que é o **Agent Platform Pipelines**? | Um **tool kit** com **SDKs pré-construídos**, que são os **building blocks de um pipeline** |
| O que o **MLOps** faz? | Leva os modelos **do desenvolvimento à produção**, ***in the back end*** |
| Qual aula do módulo é **opcional**? | A **5.8** — como uma **rede neural aprende** |

---

## Questões estilo prova

**1.** ⭐⭐ Quais são os três estágios do workflow de ML na Agent Platform?
- A) Data readiness → feature readiness → training
- B) Data preparation → model development → model serving
- C) Data processing → searching models → assembling
- D) Training → evaluation → deployment

<details><summary>Gabarito</summary>

**B.** ⚠️ **Esta é a questão em que o Módulo 4 te sabota.** (A) são os três
primeiros estágios do **pipeline da Agent Platform** (aula 4.2), (C) são as
**fases do AutoML** (4.3) e (D) são atividades **dentro** dos estágios 2 e 3, não
os estágios. O Módulo 5 tem a sua **própria** lista — e é de **três**, não de
quatro.
</details>

**2.** ⭐ Quais são os dois passos do estágio de **data preparation**?
- A) Data uploading e feature engineering
- B) Data uploading e data cleaning
- C) Feature engineering e feature store
- D) Training e evaluation

<details><summary>Gabarito</summary>

**A.** O curso nomeia exatamente dois: **data uploading** e **feature
engineering**. ⚠️ (D) é o ciclo do estágio **2**.
</details>

**3.** ⭐ Segundo a aula, o que a **quantidade** e a **qualidade** dos dados
decidem?
- A) O custo e o tempo de treinamento
- B) Quanto e quão bem a máquina aprende
- C) O tipo de modelo e o número de epochs
- D) Se o modelo pode ir para produção

<details><summary>Gabarito</summary>

**B.** O paralelismo é exato: *"the **quality and quantity** of the data decide
**how much** and **how well** the machine learns."*
</details>

**4.** ⭐ O que é **unstructured data**, e qual o exemplo da aula?
- A) Dados sem rótulos — datasets não supervisionados
- B) Dados que não podem ser facilmente armazenados em tabelas — imagens e vídeos
- C) Dados em JSON e XML
- D) Dados que chegam em streaming em vez de batch

<details><summary>Gabarito</summary>

**B.** ⚠️ (D) é o distrator preciso: **streaming × batch** é um eixo
**independente** de **structured × unstructured**. (C) descreve dados
**semi-estruturados** — o que o **BigQuery ML** aceita (aula 4.1).
</details>

**5.** ⭐⭐ Por que o curso diz que o workflow de ML não é linear?
- A) Porque os estágios podem ser executados em qualquer ordem
- B) Porque é iterativo: do training você pode voltar aos dados brutos, e do monitoring você pode voltar às fontes de dados e aos parâmetros
- C) Porque o AutoML executa tudo em paralelo
- D) Porque o MLOps elimina os estágios intermediários

<details><summary>Gabarito</summary>

**B.** *"An ML workflow **isn't linear, it's iterative**."* ⚠️ (A) exagera: a
**ordem principal** é fixa; o que existe são **retornos**. (D) inverte o papel do
MLOps — ele **automatiza** os retornos, não elimina estágios.
</details>

**6.** ⭐ Qual a frase do curso sobre não levar um modelo à produção?
- A) Ele perde acurácia ao longo do tempo
- B) Ele não tem uso e continua sendo apenas um modelo teórico
- C) Ele precisa ser retreinado a cada trimestre
- D) Ele não pode ser avaliado corretamente

<details><summary>Gabarito</summary>

**B.** *"If you don't move an ML model into production, it has **no use** and
remains only a **theoretical model**."* É a frase mais citável da aula.
</details>

**7.** ⭐⭐ O que é o **Agent Platform Pipelines**?
- A) Um serviço gerenciado que executa os três estágios automaticamente
- B) Um tool kit com SDKs pré-construídos, que são os building blocks de um pipeline
- C) Um notebook Jupyter integrado à Agent Platform
- D) Uma UI no-code para construir modelos

<details><summary>Gabarito</summary>

**B.** ⚠️ (C) é o **Workbench** (aula 4.5) e (D) é o **AutoML** — distratores
feitos de conteúdo real do módulo anterior.
</details>

**8.** ⚠️ As duas formas de montar o workflow na Agent Platform diferem em quê?
- A) Nos estágios do workflow
- B) Apenas na forma de montá-lo — os estágios principais permanecem os mesmos
- C) No número de modelos treinados
- D) No tipo de dados aceitos

<details><summary>Gabarito</summary>

**B.** *"Although the **main stages remain the same**, you have two options to
**set up** the workflow."* (A) é exatamente o que o curso nega.
</details>

---

## Dúvidas em aberto / revisar

- ⚠️ **"Data drifting" é nomeado mas não definido.** Ver se a **5.4** (*Model
  serving*) ou a **5.5** (*MLOps*) o define.
- ⚠️ **"Texto" aparece como structured nesta aula** (junto com números), mas como
  **não estruturado** no quiz do Módulo 2. A leitura que reconcilia: **campo de
  texto numa tabela** = estruturado; **documento de texto livre** = não
  estruturado.
- 📌 **A frase "pre-built SDKs and software development kits" é redundante** —
  quase certamente artefato da transcrição. Não são duas coisas.
- ✅ **O rótulo do AutoML:** com a 5.1, são **cinco** aulas dizendo **no-code**
  (1.1, 4.2, 4.3, 4.5, 5.1). E esta aula usa **as duas formas em 3 minutos** —
  "low or no-code" ao recapitular, "no-code" ao contrastar com o código. Padrão
  confirmado.
- 📌 **A aula 5.8 é opcional** — mas é onde ficaram as **activation functions** da
  aula 4.5. **Não pular.**

---
