---
title: Aula 4.3 — Agent Platform AutoML
aliases: [Agent Platform AutoML, AutoML quatro fases, neural architecture search, transfer learning]
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
summary: "Aula 4.3 do curso Introduction to AI and ML on Google Cloud: o Agent Platform AutoML em profundidade — o que a sigla significa, as datas de 2018 e 2021, as quatro fases, as duas tecnologias (neural architecture search e transfer learning) e o ensemble dos ~10 melhores modelos. Reconcilia a tensão sobre hiperparâmetros deixada pela tabela da 4.1."
transcricao: "[[T - 2026-10-09-m04-a03-agent-platform-automl]]"
parte_de: "[[curso-intro-ai-ml-google-cloud]]"
curso: "[[curso-intro-ai-ml-google-cloud]]"
data: 2026-10-09
related: ["[[R - 2026-10-09-m04-a02-agent-platform]]", "[[R - 2026-10-09-m04-a01-ai-development-options]]", "[[R - 2026-10-09-m03-a02-foundation-models]]"]
---

# Aula 4.3 — Agent Platform AutoML

| | |
|---|---|
| **Tema** | O Agent Platform AutoML em profundidade: as quatro fases e as duas tecnologias |
| **Curso** | [[curso-intro-ai-ml-google-cloud]] |
| **Data** | 09/10/2026 |
| **Duração** | ~5min05 |
| **Aula nº** | 4.3 (módulo 4 na plataforma, "Module 3" na fala do instrutor) |
| **Transcrição** | [[T - 2026-10-09-m04-a03-agent-platform-automl]] |

> 🎯 **Peso na prova: ⭐⭐⭐.** As **quatro fases**, as **duas tecnologias** e o
> número **~10 modelos** são conteúdo de questão direta. Além disso, a aula
> **resolve a tensão** sobre hiperparâmetros e **acrescenta duas datas** à
> timeline.

---

## Conteúdo por tópico

### 1. ⭐⭐ A tensão sobre hiperparâmetros — reconciliada

A tabela comparativa da aula **4.1** afirma que no AutoML **não se pode tunar
hiperparâmetros**. Mas a 4.3 diz, duas vezes, que ele faz **hyperparameter
tuning**:

> *"Phase two includes searching the best models and **tuning the parameters**."*
> *"…automates the pipeline from feature engineering, to architecture search, to
> **hyperparameter tuning**, and to model ensemble."*

**Não é contradição — é quem tuna.** A palavra que reconcilia aparece na própria
frase da aula:

> *"neural architecture search… helps search the best models and tune the
> parameters **automatically**."*

| | **Você** tuna? | **O AutoML** tuna? |
|---|---|---|
| **Agent Platform AutoML** | ❌ **não** — não há onde | ✅ **sim, automaticamente** |
| **BigQuery ML / custom training** | ✅ **sim** — você experimenta | — |

> ✅ **Como responder na prova:**
> - *"Em quais opções **você pode** experimentar hiperparâmetros?"* → **BigQuery
>   ML e custom training** (tabela da 4.1).
> - *"O AutoML faz hyperparameter tuning?"* → **sim, automaticamente**, via
>   **neural architecture search**.
>
> A tabela da 4.1 mede **controle do usuário**; a 4.3 descreve **o que a máquina
> faz por dentro**.

### 2. ⭐ O que AutoML significa, e o problema que resolve

> **AutoML = *automated machine learning*.**
> *"Aims to **automate the process to develop and deploy** an ML model."*

**Por que automatizar?** Porque construir modelos é *"extremely time consuming"*,
e a aula lista exatamente **o que é repetitivo**:

| O trabalho manual que o AutoML elimina |
|---|
| **adicionar** novos **dados e features** repetidamente |
| **testar** modelos diferentes |
| **tunar** parâmetros |

### 3. ⭐⭐ Duas datas novas para a timeline

| Data | O que aconteceu |
|---|---|
| **Janeiro de 2018** | **AutoML é anunciado**. Objetivo: **poupar o trabalho manual** dos cientistas de dados e automatizar os pipelines de ML, **do pré-processamento dos dados ao treinamento e à implantação** |
| **2021** | As features de AutoML passam a ser **embutidas no Vertex AI** — hoje **Agent Platform** — e tornam-se **parte da plataforma** |

⚠️ **Duas observações:**

1. **A data de 2018 vem com mês** — *"January of 2018"*. É a única data do curso
   com precisão mensal. Se cair, é por isso.
2. **A frase de 2021 é a confirmação textual mais clara do rebranding:**
   *"embedded in **Vertex AI, now Agent Platform**"*. Guarda essa citação — ela
   fecha a armadilha nº 1 do nosso índice.

### 4. ⭐⭐⭐ As quatro fases do AutoML

> *"Agent Platform AutoML is **powered by the latest research from Google**. It's
> an **ongoing endeavor**. There are **four distinct phases**."*

| # | Fase | O que acontece |
|---|---|---|
| **1** | **Data processing** | Depois do upload do dataset, automatiza **parte** do preparo: converte **numbers, datetime, text, categories, arrays of categories e nested fields** num formato que possa **entrar no modelo** |
| **2** | **Searching the best models and tuning the parameters** | A busca automática, sustentada por **duas tecnologias críticas**: **neural architecture search** e **transfer learning** |
| **3** | **Assembling** | Os **melhores modelos da fase 2** são **montados** (ensemble) |
| **4** | **Prediction** | O ensemble fica **preparado para prever** |

⚠️ **Três detalhes cobráveis:**

1. **A fase 1 automatiza *parte* do preparo**, não tudo — *"automate **part of**
   the data preparation process"*. Se uma alternativa disser que o AutoML
   automatiza **todo** o preparo de dados, está errada.
2. **A lista de seis tipos convertidos** na fase 1: **numbers · datetime · text ·
   categories · arrays of categories · nested fields**.
3. **A fase 3 não é "escolher o melhor modelo"** — é **montar vários**. Ver a
   seção 7.

### 5. ⭐⭐ Tecnologia 1 — Neural architecture search

> *"The goal of neural architecture search is to **find optimal models among many
> options**."*

| | |
|---|---|
| **O que faz** | **testa arquiteturas e modelos diferentes** e **compara a performance** para achar os melhores |
| **E também** | **tuna os parâmetros automaticamente** |
| **Resultado** | encontra o **melhor ajuste para os seus dados** |

É esta tecnologia que responde à pergunta retórica da aula: *"How can you trust
AutoML to generate the best results **without bias** and **fast**?"* — a busca
é sistemática, não enviesada pela intuição de quem configurou.

### 6. ⭐⭐ Tecnologia 2 — Transfer learning

> *"Helps **speed the search** by using the **pre-trained models**."*

**A analogia:** *"Machine learning is similar to **human learning**. It learns new
things **based on existing knowledge**."*

**Como funciona no AutoML:**

1. O AutoML **já treinou muitos modelos** com **grandes volumes de dados**.
2. Esses modelos treinados servem de **foundation model** para **novos problemas
   com novos dados**.

**O exemplo típico são os LLMs:**

| Etapa | O que acontece |
|---|---|
| **Pre-training** | Treinados para **propósitos gerais**, resolvendo problemas comuns de linguagem **entre indústrias**: **text classification · question answering · document summarization · text generation** |
| **Fine-tuning** | Adaptados a problemas específicos de áreas como **retail, finance e entertainment**, usando **datasets de campo relativamente pequenos** |

> 📌 **Conexão com o Módulo 3:** esta é a mesma lógica da analogia **K-12** da
> aula 3.5 — base geral, depois especialização. E a frase *"can be used as a
> **foundation model**"* liga transfer learning ao vocabulário da 3.2.

**⭐ O benefício, em uma frase:**

> *"Transfer learning… lets people with **smaller datasets** or **less
> computational power** achieve great results by using **pre-trained models
> trained on similar, larger datasets**."*

**E o mecanismo do benefício:**

> *"Because the model learns through transfer learning, **it doesn't have to
> learn from the beginning**. So it can generally reach **higher accuracy** with
> **much less data and computation time**."*

| Transfer learning entrega | |
|---|---|
| **Acurácia** | **maior** |
| **Dados necessários** | **muito menos** |
| **Tempo de computação** | **muito menos** |
| **Por quê** | **não precisa aprender do zero** |

### 7. ⭐⭐⭐ O ensemble — e o número 10

A fase 3 é onde está o fato mais específico da aula:

> *"Agent Platform AutoML **does not rely on one single model**, but on the **top
> number of models**."*

| Pergunta | Resposta |
|---|---|
| **Quantos modelos?** | Depende do **training budget**, mas **tipicamente cerca de dez** |
| **Como são combinados?** | A montagem pode ser **tão simples quanto fazer a média das previsões** dos melhores modelos |
| **Por que vários?** | *"Relying on multiple top models instead of one **greatly improves the accuracy** of prediction"* |

⚠️ **Três armadilhas aqui:**

1. **O AutoML não entrega "o melhor modelo"** — entrega um **conjunto**. Se uma
   alternativa disser "seleciona o único melhor modelo", está errada.
2. **O número depende do orçamento de treinamento**, e **~10** é o valor típico,
   não fixo.
3. **A combinação pode ser simples média** — a aula enfatiza que não precisa ser
   sofisticada para melhorar muito a acurácia.

### 8. ⭐⭐ O pipeline que o AutoML automatiza — quatro etapas

A frase-resumo da aula lista o que é automatizado, e **não é a mesma lista das
quatro fases**:

> *"Automates the pipeline from **feature engineering**, to **architecture
> search**, to **hyperparameter tuning**, and to **model ensemble**."*

| As **quatro fases** (seções 4) | O **pipeline automatizado** (esta frase) |
|---|---|
| 1. Data processing | 1. **Feature engineering** |
| 2. Searching models and tuning | 2. **Architecture search** |
| 3. Assembling | 3. **Hyperparameter tuning** |
| 4. Prediction | 4. **Model ensemble** |

⚠️ **São duas listas de quatro itens diferentes, na mesma aula.** As fases
descrevem **o fluxo**; o pipeline descreve **as técnicas**. A fase 2 se desdobra
em **duas** etapas do pipeline (architecture search e hyperparameter tuning), e a
fase 4 (prediction) **não aparece** no pipeline. Leia com atenção qual lista a
questão pede.

### 9. O fechamento — e o melhor recurso

> *"It might seem that Agent Platform AutoML can do a **better job than a human**
> to find the optimal models that fit your data."*

> *"Perhaps, **the best feature** of Agent Platform AutoML is that it provides a
> **no-code solution**. You can **point and click** through a UI to build an ML
> model with your own data."*

✅ **Terceira confirmação de que o AutoML é no-code** (1.1, 4.2 e agora 4.3) — o
"no-to-low-code" da 4.1 está definitivamente isolado.

O detalhamento prático — preparar dados de treino, treinar, obter previsão —
é adiado para *"the next module"*.

> 📌 **Lacuna que continua aberta:** a aula **não diz o volume de dados** que o
> AutoML exige. Pelo contrário, ao falar de transfer learning ela sugere que
> **datasets menores bastam**. A célula vazia da tabela da 4.1 pode ser lida
> como **"menos que BigQuery ML e custom training, por causa do transfer
> learning"**.

---

## Glossário da aula

| Termo | Definição |
|---|---|
| **AutoML** | ***Automated machine learning*** — automatiza **desenvolver e implantar** um modelo de ML |
| **Neural architecture search** | Tecnologia que **busca os melhores modelos** entre muitas opções e **tuna os parâmetros automaticamente**, comparando a performance |
| **Transfer learning** | Usar **modelos pré-treinados** como base para novos problemas; **acelera a busca** e exige **menos dados e computação** |
| **Foundation model** | O papel que um modelo já treinado assume ao resolver **novos problemas com novos dados** |
| **Model ensemble** | Combinar os **melhores modelos** (tipicamente ~10) em vez de usar um só |
| **Training budget** | O que determina **quantos** modelos entram no ensemble |
| **Feature engineering** | Primeira etapa do pipeline automatizado |
| **Data processing** | Fase 1: converter tipos de dado num formato que o modelo aceite |
| **Nested fields** | Um dos seis tipos que a fase 1 converte |

---

## Flashcards

| Pergunta | Resposta |
|---|---|
| O que **AutoML** significa? | ***Automated machine learning*** |
| Qual o objetivo do AutoML? | Automatizar **desenvolver e implantar** um modelo de ML |
| O que é repetitivo em construir modelos? | Adicionar **dados e features**, testar **modelos**, **tunar parâmetros** |
| ⭐ Quando o AutoML foi anunciado? | **Janeiro de 2018** |
| Qual era o objetivo em 2018? | Poupar o **trabalho manual** e automatizar o pipeline **do pré-processamento ao treinamento e implantação** |
| ⭐ O que aconteceu em **2021**? | As features de AutoML passam a ser **embutidas no Vertex AI (hoje Agent Platform)** |
| ⭐⭐ As **quatro fases** do AutoML | **data processing → searching models and tuning → assembling → prediction** |
| O que a **fase 1** faz? | Automatiza **parte** do preparo: converte **numbers, datetime, text, categories, arrays of categories e nested fields** |
| ⚠️ A fase 1 automatiza **todo** o preparo? | **Não** — *"part of the data preparation process"* |
| As **duas tecnologias** da fase 2 | **Neural architecture search** e **transfer learning** |
| ⭐ O que faz o **neural architecture search**? | **Testa arquiteturas e modelos**, **compara a performance** e **tuna parâmetros automaticamente** |
| ⭐ O que faz o **transfer learning**? | **Acelera a busca** usando **modelos pré-treinados** |
| A analogia do transfer learning | ML é como o **aprendizado humano**: aprende o novo **a partir do conhecimento existente** |
| Qual o exemplo típico de transfer learning? | Os **LLMs** — pré-treinados para fins gerais, fine-tuned para fins específicos |
| Os quatro problemas gerais de linguagem | **text classification · question answering · document summarization · text generation** |
| Para que áreas os LLMs são adaptados? | **Retail, finance e entertainment**, com **datasets de campo pequenos** |
| ⭐ Os três ganhos do transfer learning | **Maior acurácia** · **muito menos dados** · **muito menos tempo de computação** |
| Por que esses ganhos? | Porque o modelo **não precisa aprender do zero** |
| ⭐⭐ O AutoML usa **um** modelo? | **Não** — usa os **top N modelos** |
| ⭐⭐ Quantos modelos, tipicamente? | **Cerca de dez** — depende do **training budget** |
| Como os modelos são combinados? | Pode ser tão simples quanto **a média das previsões** |
| Por que usar vários? | **Melhora muito a acurácia** da previsão |
| ⭐⭐ As quatro etapas do **pipeline automatizado** | **feature engineering → architecture search → hyperparameter tuning → model ensemble** |
| ⚠️ O AutoML faz hyperparameter tuning? | **Sim, automaticamente.** Mas **você** não tuna — é isso que a tabela da 4.1 mede |
| Qual é "o melhor recurso" do AutoML? | Ser uma solução **no-code**: **point and click** numa UI |

---

## Questões estilo prova

**1.** ⭐ Quais são as duas tecnologias que sustentam a busca automática do Agent
Platform AutoML?
- A) Neural architecture search e hyperparameter tuning
- B) Neural architecture search e transfer learning
- C) Transfer learning e model ensemble
- D) Feature engineering e grounding

<details><summary>Gabarito</summary>

**B.** ⚠️ (A) é o distrator forte: o **hyperparameter tuning** é **parte do que o
neural architecture search faz**, não uma tecnologia irmã. (C) o ensemble é a
**fase 3**, não parte da busca.
</details>

**2.** ⭐⭐ Em quantos modelos o Agent Platform AutoML baseia suas previsões?
- A) Em um único modelo, o de melhor performance
- B) Nos top modelos, tipicamente cerca de dez, conforme o training budget
- C) Em exatamente três modelos
- D) Em todos os modelos testados durante a busca

<details><summary>Gabarito</summary>

**B.** *"Does not rely on one single model, but on the top number of models…
typically around ten."* ⚠️ (A) é a suposição natural e está **errada** — é o
ponto que a aula faz questão de desfazer. (D) exagera: só os **melhores** entram.
</details>

**3.** O que é **transfer learning**?
- A) Mover um modelo treinado de uma região do Google Cloud para outra
- B) Usar modelos pré-treinados em datasets grandes e similares como base para novos problemas
- C) Transferir features entre projetos via feature store
- D) Converter tipos de dado para o formato que o modelo aceita

<details><summary>Gabarito</summary>

**B.** ⚠️ (C) descreve o **feature store** (aula 4.2) e (D) descreve a **fase 1**
do AutoML — ambos distratores feitos de conteúdo verdadeiro do curso, no lugar
errado.
</details>

**4.** ⭐ Por que o transfer learning permite atingir maior acurácia com menos
dados?
- A) Porque usa hardware TPU
- B) Porque o modelo não precisa aprender desde o início
- C) Porque descarta os dados de menor qualidade
- D) Porque faz a média das previsões de vários modelos

<details><summary>Gabarito</summary>

**B.** *"Because the model learns through transfer learning, it doesn't have to
learn from the beginning."* ⚠️ (D) é o **model ensemble**, outro mecanismo da
mesma aula.
</details>

**5.** ⚠️ Uma analista diz: "o AutoML não faz tuning de hiperparâmetros, porque
na tabela comparativa aparece ❌". Qual a leitura correta?
- A) Ela está certa: o AutoML não faz nenhum tuning
- B) Ela confundiu: o AutoML tuna hiperparâmetros automaticamente, mas o usuário não pode tuná-los manualmente
- C) Ela está certa, e a aula 4.3 contradiz a 4.1
- D) O AutoML permite tuning manual via UI

<details><summary>Gabarito</summary>

**B.** A tabela da 4.1 mede **controle do usuário**; a 4.3 descreve **o que a
máquina faz por dentro**. A palavra que reconcilia é **"automatically"**:
*"neural architecture search… helps search the best models and tune the
parameters **automatically**."*
</details>

**6.** Qual destas listas são as **quatro fases** do AutoML?
- A) Feature engineering → architecture search → hyperparameter tuning → model ensemble
- B) Data processing → searching models and tuning parameters → assembling → prediction
- C) Data readiness → feature readiness → training → deployment
- D) Pre-processing → training → deployment → monitoring

<details><summary>Gabarito</summary>

**B.** ⚠️ Esta é a questão mais capciosa da aula, porque **as três outras
alternativas também são listas reais do curso**: (A) é o **pipeline que o AutoML
automatiza** (mesma aula!), (C) é o **pipeline da Agent Platform** (aula 4.2) e
(D) é o objetivo declarado do AutoML em 2018.
</details>

**7.** O que a **fase 1** do AutoML faz com os dados?
- A) Automatiza todo o processo de preparação de dados
- B) Automatiza parte da preparação, convertendo tipos como datetime, categorias e nested fields num formato que o modelo aceita
- C) Divide os dados em treino, validação e teste
- D) Cria e compartilha features no feature store

<details><summary>Gabarito</summary>

**B.** ⚠️ (A) é o distrator por exagero — a aula diz **"part of"**. (D) é a fase
2 do pipeline da **Agent Platform** (aula 4.2), não do AutoML.
</details>

---

## Dúvidas em aberto / revisar

- ✅ **RESOLVIDO: hiperparâmetros no AutoML.** Ele tuna **automaticamente**; o
  **usuário** não tuna. A tabela da 4.1 mede controle do usuário.
- ✅ **Terceira confirmação: AutoML é no-code** (1.1, 4.2, 4.3).
- ⚠️ **O volume de dados do AutoML continua sem número.** Mas a aula dá a
  direção: o **transfer learning** permite **datasets menores**. Leitura segura:
  **menos que BigQuery ML e custom training**.
- ⚠️ **ADK** — não citado nesta aula; segue sem a sigla expandida.
- 📌 **O detalhamento prático do AutoML** (preparar dados → treinar → prever) foi
  adiado para *"the next module"*.

---

## Ações / próximos passos

| Ação | Status |
|---|---|
| Decorar as **quatro fases** e **não confundir** com o pipeline automatizado | ⬜ |
| Decorar as **duas tecnologias** e o que cada uma faz | ⬜ |
| Decorar o número **~10 modelos** e o **training budget** | ⬜ |
| Acrescentar **jan/2018** e **2021** à timeline de datas | ✅ |
| Labs e quizzes pendentes: 2.6, 2.8, 3.6, 3.10 | ⬜ |

---

## Fontes

- [[T - 2026-10-09-m04-a03-agent-platform-automl]] — transcrição oficial da
  plataforma Google Skills, colada por Leonardo em 09/10/2026.
