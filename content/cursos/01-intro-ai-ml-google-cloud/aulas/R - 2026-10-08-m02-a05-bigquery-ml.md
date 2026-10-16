---
title: Módulo 2, Aula 2.5 — BigQuery ML
aliases: [aula 2.5 Google AI ML, BigQuery ML, CREATE MODEL, ML.PREDICT, ML.EVALUATE, one-hot encoding]
tags: [aula, trabalho]
type: aula
area: trabalho
created: 2026-10-08
updated: 2026-10-08
status: concluída
fonte: transcricao
confianca: media
papel: derivada
indexar: true
summary: "A aula prática do módulo: BigQuery como storage + engine SQL ligados pela rede interna do Google, e as cinco fases de um projeto de ML dentro do BigQuery ML — ETL, pré-processamento com one-hot encoding, CREATE MODEL, ML.EVALUATE e ML.PREDICT. Traz os modelos suportados, o suporte a MLOps e a recomendação de começar simples e usar como benchmark."
transcricao: "[[T - 2026-10-08-m02-a05-bigquery-ml]]"
data: 2026-10-08
curso: "[[curso-intro-ai-ml-google-cloud]]"
professor: ""
related: ["[[R - 2026-10-08-m02-a04-ai-models]]"]
---

# Módulo 2, Aula 2.5 — BigQuery ML

| | |
|---|---|
| **Tema** | Construir um modelo de ML com comandos SQL dentro do BigQuery |
| **Curso** | [[curso-intro-ai-ml-google-cloud\|Introduction to AI and Machine Learning on Google Cloud]] |
| **Data** | 2026-10-08 (data da transcrição) |
| **Duração** | ~6min15 |
| **Aula nº / módulo** | 2.5 — Módulo 2 na ementa ("Module 1, AI Foundations" na fala do curso) |

> 🎯 **Peso na prova: ALTO.** É a aula que fecha o Módulo 2 ligando teoria e
> prática, e a única que traz **comandos SQL nomeados**. `CREATE MODEL`,
> `ML.EVALUATE` e `ML.PREDICT` são decoreba certa — inclusive **em que
> ordem** aparecem.
>
> É também a aula que **prepara o lab 2.6**: tudo aqui reaparece na mão.

## Conteúdo por tópico

### 1. ⭐ BigQuery são dois serviços em um

| Serviço | O que é |
|---|---|
| **Storage** | instalação de armazenamento **totalmente gerenciada**, para carregar e guardar datasets |
| **Analytical engine** | engine analítica **rápida, baseada em SQL** |

Os dois são ligados pela **rede interna de alta velocidade do Google**.

> 💡 **A ponte com a aula 2.3.** Lá aprendemos *que* compute e storage são
> **desacoplados**; aqui aprendemos **como** o BigQuery consegue isso: é
> essa *"super-fast network"* que permite **escalar storage e compute
> independentemente**, conforme a demanda. Se uma questão perguntar o que
> viabiliza o desacoplamento no BigQuery, a resposta é a **rede interna de
> alta velocidade**.

**A evolução do produto:** o BigQuery **começou só como data warehouse** e
**evoluiu** para dar suporte ao **ciclo data-to-AI** — hoje dá para fazer
**análise de dados** *e* **construir modelos de ML predefinidos** dentro
dele.

### 2. O problema que o BigQuery ML resolve

Construir e treinar modelos de ML é, tradicionalmente, **muito custoso em
tempo**:

1. importar e **preparar** os dados;
2. **experimentar** diferentes modelos e **ajustar os parâmetros**;
3. **ir e voltar**, retreinando com novos dados e features para melhorar a
   performance;
4. fazer o **deploy** para gerar predições.

É um processo **iterativo**, que consome muito tempo e recursos.

**Com o BigQuery ML:** você gerencia **dados tabulares** e executa modelos
de ML **num só lugar**, em poucos passos. E — ponto cobrável — o
**BigQuery ML ajusta os parâmetros por você** (*"tunes the parameters for
you"*) e ajuda a gerenciar o workflow de ML.

### 3. ⭐ As cinco fases e os comandos SQL

```
Fase 1          Fase 2            Fase 3           Fase 4          Fase 5
ETL p/ dentro → selecionar e   → CREATE MODEL → ML.EVALUATE → ML.PREDICT
do BigQuery     pré-processar     (criar e        (avaliar)      (prever)
                features          treinar)
```

#### Fase 1 — ETL para dentro do BigQuery
**Extract, transform, load** os dados para o BigQuery, se ainda não
estiverem lá.
- 📌 Se você já usa outros produtos Google (a aula cita o **YouTube**),
  procure **conectores prontos** antes de construir seu próprio pipeline.
- Dá para **enriquecer** o data warehouse existente com outras fontes
  usando **SQL joins**.

#### Fase 2 — selecionar e pré-processar features
Usa-se **SQL para criar o dataset de treino** com que o modelo vai
aprender.
- 📌 **O BigQuery ML faz parte do pré-processamento por você**, como o
  **one-hot encoding** das variáveis categóricas.
- **One-hot encoding** = converte dados **categóricos em numéricos**, que é
  o formato **exigido por um modelo de treino**.

#### Fase 3 — `CREATE MODEL`
Cria o modelo **dentro do BigQuery**. No exemplo da aula: prever o
comportamento de compra do cliente — se ele vai comprar aquele produto no
futuro.

Três coisas a definir:

| O quê | No exemplo |
|---|---|
| **Nome do modelo** | `ecommerce.classification` |
| **Model type** | **logistic regression** — porque prever "vai comprar ou não" é um **problema de classificação** |
| **Label column** | obrigatória, porque é um problema **supervisionado** |

> ⚠️ **A aula repete a pegadinha da 2.4 de propósito.** Ela pergunta qual
> modelo usar para prever se o cliente vai comprar, e responde:
> **logistic regression, porque é classificação**. Se o Google repete isso
> em duas aulas seguidas, é porque cai.

**Por que a label column?** A aula retoma a distinção da aula 2.4:
supervisionado lida com **dados rotulados** e prevê **uma meta**; não
supervisionado lida com **dados não rotulados** e identifica um **padrão
oculto**. Como este é um **problema supervisionado de classificação**,
**precisa de coluna rotulada**.

#### Fase 4 — `ML.EVALUATE`
Depois de treinado, avalia a performance do modelo no **evaluation
dataset**. É aqui que se especificam as **métricas de avaliação**:
**accuracy, precision e recall**. (O curso aprofunda essas métricas mais
adiante.)

#### Fase 5 — `ML.PREDICT`
Quando a performance estiver satisfatória, invoca-se `ML.PREDICT` sobre o
modelo treinado. Ele retorna **as predições e a confiança do modelo nessas
predições**.

> 📌 **Detalhe muito específico, logo muito cobrável:** no resultado, o
> campo do label vem com **`predicted` acrescentado ao nome do campo**.
> É a predição do modelo para aquele label.

### 4. ⭐ Modelos suportados pelo BigQuery ML

| Categoria | Modelos citados |
|---|---|
| **Classificação** | **logistic regression** |
| **Regressão** | **linear regression** |
| **Outros** | **k-means clustering** · **time series forecasting** |
| **Mais complexos** | **DNN — Deep Neural Networks** |

### 5. O BigQuery ML suporta MLOps

**MLOps (Machine Learning Operations)** — *"turns your ML experiment to
production"* e ajuda a **deploy, monitor e manage** os modelos de ML.

📌 Os **três verbos** do MLOps são a definição que a prova usa:
**implantar, monitorar e gerenciar**. O curso aprofunda MLOps depois (é a
aula 5.5, *MLOps and workflow automation*).

### 6. ⭐ A recomendação de método: comece simples, use como benchmark

> *"You're recommended to start with simple options, such as logistic
> regression and linear regression, and use the results as a benchmark to
> compare against more complex models, such as DNN."*

| Comece com | Compare contra |
|---|---|
| **logistic regression** e **linear regression** — simples | **DNN (Deep Neural Networks)** — mais complexos |

**Por quê:** DNNs levam **mais tempo e mais recursos computacionais** para
**treinar e fazer deploy**. Os modelos simples servem de **benchmark**.

📌 Esse é o tipo de recomendação de **boa prática** que vira questão do
tipo "qual a abordagem recomendada". A resposta nunca é "comece pelo modelo
mais sofisticado".

### 7. O lab 2.6 que vem a seguir

- **Dados:** e-commerce real da **Google Merchandise Store**.
- **Objetivo:** prever se um **visitante fará compras futuras**.
- **O que se pratica:** criar datasets, treinar e avaliar modelos, usá-los
  para predições.
- **Apoio:** **Gemini Code Assist** como *"tutor 24/7"*, ajudando a
  **explicar, criar e depurar código** — *"don't worry if SQL isn't your
  strong suit"*.

✅ **Resolve uma ponta solta da aula 2.3.** Lá o "AI code assistant" do lab
era citado sem nome; aqui ele é identificado: **Gemini Code Assist**. E os
três verbos batem exatamente — **explain, generate/create, debug**.

## Glossário da aula

- **BigQuery (dois serviços em um)** — storage totalmente gerenciado +
  engine analítica baseada em SQL, ligados pela **rede interna de alta
  velocidade** do Google.
- **Rede interna de alta velocidade** — o que permite ao BigQuery escalar
  **storage e compute independentemente**.
- **Data-to-AI lifecycle** — o ciclo que o BigQuery passou a suportar ao
  evoluir de data warehouse puro.
- **BigQuery ML** — construir e executar modelos de ML **com comandos SQL**
  dentro do BigQuery, sobre **dados tabulares**; **ajusta os parâmetros por
  você**.
- **ETL** — *extract, transform, load*; a fase 1.
- **SQL join** — como enriquecer o data warehouse com outras fontes.
- **Feature** — variável de entrada; selecionada e pré-processada na fase
  2.
- **One-hot encoding** — converte dados **categóricos em numéricos**,
  formato exigido pelo modelo de treino; o BigQuery ML faz automaticamente.
- **`CREATE MODEL`** — comando da fase 3: cria e treina o modelo; recebe
  **nome**, **model type** e **label column**.
- **Label column** — a coluna com a resposta; obrigatória em problemas
  **supervisionados**.
- **`ML.EVALUATE`** — comando da fase 4: avalia o modelo no **evaluation
  dataset**.
- **Accuracy, precision, recall** — as métricas de avaliação citadas.
- **`ML.PREDICT`** — comando da fase 5: retorna **predições e a confiança**
  do modelo; o campo do label volta com **`predicted`** no nome.
- **Time series forecasting** — modelo de previsão de séries temporais
  suportado pelo BigQuery ML.
- **DNN (Deep Neural Network)** — modelo complexo; mais tempo e recursos
  para treinar e implantar.
- **Benchmark** — o papel dos modelos simples: base de comparação para os
  complexos.
- **MLOps (Machine Learning Operations)** — leva o experimento de ML à
  produção; ajuda a **implantar, monitorar e gerenciar** modelos.
- **Google Merchandise Store** — fonte dos dados reais do lab 2.6.
- **Gemini Code Assist** — assistente de código que **explica, cria e
  depura** código; o "tutor 24/7" do lab.

## Flashcards

| Pergunta | Resposta |
|---|---|
| Quais são os dois serviços do BigQuery? | Storage totalmente gerenciado + engine analítica baseada em SQL |
| O que conecta os dois serviços? | A **rede interna de alta velocidade** do Google |
| O que essa rede viabiliza? | Escalar **storage e compute independentemente**, conforme a demanda |
| O BigQuery sempre foi mais que data warehouse? | Não — **começou só como data warehouse** e evoluiu para suportar o ciclo **data-to-AI** |
| Que tipo de dado o BigQuery ML gerencia? | **Dados tabulares** |
| O que o BigQuery ML faz pelo usuário? | **Ajusta os parâmetros** e ajuda a gerenciar o workflow de ML |
| As cinco fases de um projeto no BigQuery ML | 1) ETL · 2) selecionar e pré-processar features · 3) `CREATE MODEL` · 4) `ML.EVALUATE` · 5) `ML.PREDICT` |
| O que é one-hot encoding? | Converte dados **categóricos em numéricos**, formato exigido pelo modelo de treino |
| Quem faz o one-hot encoding? | O próprio **BigQuery ML**, automaticamente |
| O que o `CREATE MODEL` precisa receber? | **Nome** do modelo, **model type** e **label column** |
| Por que a label column é necessária no exemplo? | Porque é um problema **supervisionado** de classificação |
| Qual comando avalia o modelo? | `ML.EVALUATE`, sobre o **evaluation dataset** |
| Quais métricas de avaliação a aula cita? | **Accuracy, precision e recall** |
| Qual comando gera predições? | `ML.PREDICT` |
| O que o `ML.PREDICT` retorna? | As **predições** e a **confiança** do modelo nelas |
| Como o campo do label aparece no resultado? | Com **`predicted` acrescentado ao nome do campo** |
| Modelos suportados pelo BigQuery ML | Logistic regression, linear regression, k-means clustering, time series forecasting e DNN |
| O que é MLOps? | Leva o experimento de ML à produção; ajuda a **implantar, monitorar e gerenciar** modelos |
| Qual a abordagem recomendada de modelagem? | Começar com modelos **simples** (logistic/linear regression) e usá-los como **benchmark** contra modelos complexos como **DNN** |
| Por que não começar pelo DNN? | Leva **mais tempo e mais recursos computacionais** para treinar e implantar |
| Que dados o lab 2.6 usa? | E-commerce real da **Google Merchandise Store** |
| O que o lab 2.6 prevê? | Se um **visitante fará compras futuras** |
| Qual assistente apoia o lab? | **Gemini Code Assist** — explica, cria e depura código |

## Questões estilo prova

**1.** Coloque em ordem os comandos de um projeto de ML no BigQuery ML.

<details><summary>Gabarito</summary>

**`CREATE MODEL` → `ML.EVALUATE` → `ML.PREDICT`.** Primeiro cria e treina,
depois avalia no evaluation dataset, e só então prevê. As duas fases
anteriores (ETL e pré-processamento de features) são SQL comum, não
comandos `ML.*`.
</details>

**2.** Você quer prever, no BigQuery ML, se um visitante vai fazer uma
compra. Qual `model_type` e por quê?

- A) `linear_reg`, porque prevê um valor
- B) `logistic_reg`, porque é um problema de classificação
- C) `kmeans`, porque agrupa visitantes
- D) `dnn_classifier`, porque é o modelo mais preciso

<details><summary>Gabarito</summary>

**B — logistic regression.** "Vai comprar ou não" é **categórico**, logo
**classificação**, e classificação usa **logistic regression**. A aula
resolve esse mesmo exercício em voz alta. (D) contraria a recomendação
explícita de **começar simples e usar como benchmark**.
</details>

**3.** O que é one-hot encoding e quem o executa no BigQuery ML?

<details><summary>Gabarito</summary>

Converte **dados categóricos em numéricos**, formato **exigido pelo modelo
de treino**. No BigQuery ML, **a própria ferramenta faz** esse
pré-processamento automaticamente (fase 2).
</details>

**4.** Uma equipe quer começar um projeto de previsão de churn e cogita
partir direto para uma Deep Neural Network. O que a aula recomenda?

- A) Sim — DNNs são sempre mais precisas
- B) Começar com logistic ou linear regression e usar o resultado como benchmark
- C) Começar com k-means clustering
- D) Pular o treino e usar uma pre-trained API

<details><summary>Gabarito</summary>

**B.** A recomendação é explícita: **começar simples** e usar os resultados
como **benchmark** para comparar com modelos complexos como o **DNN**, que
exigem **mais tempo e recursos** para treinar e implantar.
</details>

**5.** O que permite ao BigQuery escalar storage e compute de forma
independente?

- A) O uso de TPUs
- B) A rede interna de alta velocidade do Google que conecta os dois serviços
- C) O comando `CREATE MODEL`
- D) O one-hot encoding automático

<details><summary>Gabarito</summary>

**B.** O BigQuery é **storage + engine SQL** ligados pela **rede interna de
alta velocidade**, e é ela que viabiliza o escalonamento independente —
o "decoupling" que a aula 2.3 apresentou em termos gerais.
</details>

**6.** Após rodar `ML.PREDICT`, como se identifica a saída do modelo no
resultado?

<details><summary>Gabarito</summary>

O campo do **label** aparece com **`predicted` acrescentado ao nome do
campo**. Além das predições, o comando retorna também a **confiança** do
modelo nelas.
</details>

**7.** O que é MLOps, segundo a aula, e o BigQuery ML o suporta?

<details><summary>Gabarito</summary>

**MLOps (Machine Learning Operations)** leva o **experimento de ML à
produção** e ajuda a **implantar, monitorar e gerenciar** os modelos.
**Sim**, o BigQuery ML suporta MLOps — o tema é aprofundado na aula 5.5.
</details>

## Dúvidas em aberto / revisar
- ⚠️ **BigQuery ML: code-based ou low-code? Ainda sem veredito.** Esta aula
  reforça os dois lados: exige **SQL** (argumento para *code-based*, como
  classificou a aula 1.1), mas **ajusta os parâmetros sozinho**, faz o
  **pré-processamento automático** e promete *"just a few steps"*
  (argumentos para *low-code*). A definição oficial continua esperada na
  aula **4.1**.
- ✅ **Resolvido:** o "AI code assistant" do lab, citado sem nome na aula
  2.3, é o **Gemini Code Assist**.
- 📌 **Accuracy, precision e recall** só são *citadas* aqui; o curso promete
  aprofundar depois. Provável que apareçam no Módulo 5 (*Model
  development*, aula 5.3). Vale revisitar.
- 📌 **MLOps** aparece aqui pela primeira vez, com definição de três verbos.
  Aprofundamento na aula 5.5.

## Ações / próximos passos
| Ação | Prazo |
|---|---|
| Decorar a sequência `CREATE MODEL` → `ML.EVALUATE` → `ML.PREDICT` | — |
| Fixar o detalhe do prefixo `predicted` no campo de saída | — |
| Fazer o **lab 2.6** (Predict Visitor Purchases with BigQuery ML) — obrigatório | — |
| Assistir 2.7 "Summary" para fechar o Módulo 2 | — |
| Depois do 2.7: montar glossário, flashcards e simulado consolidados do módulo | — |

## Fontes
- Transcrição da aula — [[T - 2026-10-08-m02-a05-bigquery-ml]]
