---
title: "Google AI/ML — Módulo 2: Glossário"
aliases: ["glossário do Módulo 2 (Google AI/ML)"]
tags: [aula, trabalho]
type: note
area: trabalho
created: 2026-10-08
updated: 2026-10-08
status: evergreen
fonte: mista
confianca: media
papel: derivada
indexar: true
summary: "Glossário consolidado do Módulo 2 (AI Foundations) da certificação Google, aulas 1.1 a 2.7: os termos e serviços do Google Cloud agrupados por tema, com a definição que a prova cobra."
parte_de: "[[google-ai-ml-modulo-2-revisao]]"
related: ["[[google-ai-ml-modulo-2-flashcards]]", "[[google-ai-ml-modulo-2-simulado]]"]
---

# Google AI/ML — Módulo 2: Glossário

Material de estudo do Módulo 2 (AI Foundations) do curso [[curso-intro-ai-ml-google-cloud]], cobrindo aulas 1.1 a 2.7. Faz parte de [[google-ai-ml-modulo-2-revisao]]; os outros dois materiais do módulo são [[google-ai-ml-modulo-2-flashcards]] e [[google-ai-ml-modulo-2-simulado]].

Todos os termos das aulas **1.1 a 2.7**, agrupados por tema. Os ⭐ são os que o
curso tratou com mais ênfase ou repetiu em mais de uma aula.

> 💡 **Os seis termos que o próprio instrutor elegeu** no resumo (aula 2.7):
> Predictive AI · Generative AI · Data to AI · BigQuery · Agent Platform ·
> BigQuery ML. Comece por eles.

---

## 1. Conceitos de IA

| Termo | Definição | Aula |
|---|---|---|
| ⭐ **Artificial intelligence (AI)** | Termo-guarda-chuva para tudo em que computadores **imitam a inteligência humana**. Ex.: robôs, carros autônomos | 2.4 |
| ⭐ **Machine learning (ML)** | **Subconjunto da IA**; o computador **aprende sem ser explicitamente programado** | 2.4 |
| **Programação tradicional** | O oposto do ML: diz-se explicitamente ao computador o que fazer | 2.4 |
| ⭐ **Deep learning / deep neural network** | **Subconjunto do ML** que acrescenta **camadas** entre dados de entrada e resultados de saída | 2.4 |
| **Large language model (LLM)** | **Um tipo de modelo de deep learning**; prevê, interpreta e interage com linguagem | 2.4 |
| **Foundation model** | Modelo grande, pré-treinado em dados amplos, base para muitas tarefas; os LLMs são um exemplo | 1.1, 2.4 |
| ⭐ **Predictive AI** *(= traditional AI = discriminative AI)* | Usa **dados existentes** para **classificar** informação ou **prever resultados futuros** a partir de **padrões históricos**. **Analisa e prevê** | 2.2 |
| ⭐ **Generative AI (GenAI)** | **Cria conteúdo novo** (resumos, correlações complexas, texto, imagem, vídeo) espelhando estilo e padrões dos dados de treino. **Cria e toma ações** | 2.2, 2.4 |
| ⭐ **Agentic AI / AI agent** | Assistente **autônomo** que gera conteúdo **e toma ações**; vai além de responder | 1.1, 2.1 |
| **Multimodalidade** | Capacidade de lidar com mais de um tipo de dado (texto, imagem, áudio, vídeo) na mesma interação | 1.1, 2.1 |
| **Prompt engineering** | Formular instruções que levam o modelo à saída desejada | 1.1 |
| **Responsible AI** | Compromisso do Google: **bold innovation** · **responsible development and deployment** · **collaborative progress** | 2.2 |
| **Powerhouse of innovation** | A tese do curso: a IA deixa de ser *"mere efficiency tool"* | 2.1, 2.7 |

## 2. Tipos de aprendizado e de problema

| Termo | Definição | Aula |
|---|---|---|
| ⭐ **Supervised learning** | Dados **rotulados** · **task-driven** · identifica **uma meta** | 2.4 |
| ⭐ **Unsupervised learning** | Dados **não rotulados** · **data-driven** · identifica **um padrão** | 2.4 |
| **Label (rótulo)** | A resposta associada a cada ponto de dado | 2.4, 2.5 |
| ⭐ **Classification** | Supervisionado; prevê variável **categórica**. Modelo: **logistic regression** | 2.4 |
| ⭐ **Regression** | Supervisionado; prevê variável **numérica**. Modelo: **linear regression** | 2.4 |
| ⭐ **Clustering** | Não supervisionado; agrupa pontos similares. Modelo: **k-means** | 2.4 |
| **Association** | Não supervisionado; acha **relações subjacentes**. Algoritmo: **Apriori** | 2.4 |
| **Dimensionality reduction** | Não supervisionado; reduz **dimensões/features** para melhorar a **eficiência**. Técnica: **PCA** | 2.4 |
| ⭐ **Logistic regression** | Modelo para **CLASSIFICAÇÃO** — apesar do nome | 2.4, 2.5 |
| ⭐ **Linear regression** | Modelo para **REGRESSÃO** | 2.4, 2.5 |
| **k-means clustering** | Algoritmo de agrupamento | 2.4, 2.5 |
| **Apriori** | Algoritmo de regras de associação | 2.4 |
| **Principal component analysis (PCA)** | Técnica de redução de dimensionalidade | 2.4 |
| **Time series forecasting** | Modelo de previsão de séries temporais, suportado pelo BigQuery ML | 2.5 |
| **DNN (Deep Neural Network)** | Modelo complexo; **mais tempo e recursos** para treinar e implantar | 2.5 |
| **Feature** | Característica/variável de entrada do modelo | 2.4, 2.5 |
| **Benchmark** | O papel dos modelos simples: base de comparação para os complexos | 2.5 |

## 3. Arquitetura e camadas

| Termo | Definição | Aula |
|---|---|---|
| ⭐ **AI/ML Toolbox on Google Cloud** | O nome próprio da estrutura de três camadas | 2.7 |
| ⭐ **AI infrastructure** | 1ª camada: a base. Internamente: **networking/security → compute e storage → data and AI products** | 2.2, 2.3 |
| ⭐ **AI development** | 2ª camada: a da **Agent Platform**. **É o foco deste curso** | 2.2, 2.7 |
| **AI applications and solutions** | 3ª camada: opções **out-of-the-box** para usuários de negócio e analistas prototiparem rápido | 2.2 |
| **Networking and security** | Andar base da infraestrutura; sustenta toda a infraestrutura e as aplicações do Google | 2.3 |
| ⭐ **Decoupling (desacoplamento)** | Separar compute de storage para escalarem **independentemente**; a grande diferença entre nuvem e desktop | 2.3, 2.5 |
| ⭐ **Data-to-AI workflow** | **Ingest and process → store and analyze → activate with AI** | 2.3, 2.7 |
| **Multimodal input → prediction and generation → visual output** | O padrão de 3 etapas de uma aplicação de IA | 2.1 |

## 4. Compute e hardware

| Termo | Definição | Aula |
|---|---|---|
| ⭐ **Compute Engine** | Máquinas virtuais; **alto controle**, "como gerenciar um servidor físico" | 2.3 |
| ⭐ **Google Kubernetes Engine (GKE)** | Plataforma de **contêineres** com orquestração | 2.3 |
| ⭐ **Cloud Run** | **Serverless**; o Google gerencia a infraestrutura | 2.3 |
| **CPU** | *Central Processing Unit* — chip de **propósito geral** | 2.3 |
| **GPU** | *Graphics Processing Unit* — propósito geral, mais recente; insuficiente para a escala da IA | 2.3 |
| ⭐ **TPU** | *Tensor Processing Unit*, **2016**; chip **customizado e application-specific** do Google para workloads de IA | 2.3 |
| ⭐ **Domain-specific hardware** | Hardware desenhado para um domínio (ex.: **multiplicação de matrizes**); oposto de *general-purpose* | 2.3 |
| **Cloud TPU** | A TPU como serviço; **mais rápida e mais eficiente em energia** que GPU e CPU para AI/ML | 2.3 |

## 5. Storage e bancos de dados

| Termo | Definição | Aula |
|---|---|---|
| ⭐ **Cloud Storage** | Para dados **não estruturados**: documentos, imagens, áudio, vídeo | 2.3 |
| ⭐ **Dados estruturados** | Organizados em **tabelas, linhas e colunas** → BigQuery, AlloyDB e outros | 2.3 |
| **Dados semi-estruturados** | Ex.: **JSON**; o BigQuery é **altamente otimizado** para eles | 2.3 |
| ⭐ **BigQuery** | Data warehouse *flagship*, serverless. **Dois serviços em um**: storage gerenciado + engine SQL, ligados pela **rede interna de alta velocidade** | 2.3, 2.5 |
| ⭐ **External table** | Tabela no BigQuery que dá **referência estruturada** a dados **não estruturados** no Cloud Storage, permitindo consultá-los | 2.3 |
| **AlloyDB for PostgreSQL** | Banco **SQL** gerenciado, compatível com PostgreSQL | 2.3 |
| **Cloud SQL** | Banco relacional (**SQL**) gerenciado | 2.3 |
| **Spanner** | Banco **SQL** distribuído e globalmente consistente | 2.3 |
| ⚠️ **Bigtable** | Banco **NoSQL** de larga escala. **Não confundir com BigQuery** | 2.3 |
| **Firestore** | Banco **NoSQL** de documentos | 2.3 |

## 6. Ingestão, processamento e visualização

| Termo | Definição | Aula |
|---|---|---|
| **Pub/Sub** | Mensageria para ingestão **em tempo real** | 2.3 |
| **Dataflow** | Processamento de dados em **batch e streaming** | 2.3 |
| **Managed Service for Apache Spark** | Spark gerenciado | 2.3 |
| **Cloud Data Fusion** | Integração de dados (ETL/ELT) visual | 2.3 |
| ⭐ **Looker** | **Visualização** e BI | 2.1, 2.3 |
| **ETL** | *Extract, transform, load*; a fase 1 de um projeto no BigQuery ML | 2.5 |
| **SQL join** | Como enriquecer o data warehouse com outras fontes | 2.5 |

## 7. Plataforma de desenvolvimento de IA

| Termo | Definição | Aula |
|---|---|---|
| ⭐ **Agent Platform** *(ex-Vertex AI)* | Plataforma **end-to-end** de desenvolvimento de IA, **do design ao deployment**; integra com BigQuery | 2.1, 2.2, 2.3 |
| **Agent Studio** | Produto da Agent Platform para construir agentes | 2.3 |
| **Agent Platform AutoML** | Treinar modelos customizados **sem código** (no-code) | 1.1, 2.3 |
| **Gemini Enterprise Agent Platform Notebooks** | Ambiente de notebook da Agent Platform; puxa dados do BigQuery via SQL | 2.2, 2.3 |
| **Gemini Enterprise app** | Opção **no-code** para construir com Gemini ⚠️ *onde exatamente se encaixa ainda não ficou claro* | 1.1 |
| **Pre-trained APIs** | APIs com modelos já treinados pelo Google (Natural Language, Vision, Speech); opção **low-code** | 1.1 |
| **Custom training** | Você escreve o próprio código de treinamento; opção **code-based** | 1.1 |
| **Gemini** | Foundation model **multimodal** do Google; move a Agent Platform | 1.1, 2.2 |
| **Veo** | Modelo do Google para geração de **vídeo** | 1.1 |
| **Imagen** | Modelo do Google para geração de **imagem** | 1.1 |
| **Gemini Code Assist** | Assistente que **explica, cria e depura** código; o "tutor 24/7" do lab | 2.5, 2.7 |

## 8. BigQuery ML

| Termo | Definição | Aula |
|---|---|---|
| ⭐ **BigQuery ML** | Construir e executar modelos de ML **com comandos SQL** sobre **dados tabulares**; **ajusta os parâmetros por você** | 2.5 |
| ⭐ **One-hot encoding** | Converte dados **categóricos em numéricos**, formato **exigido pelo modelo de treino**; o BigQuery ML faz automaticamente | 2.5 |
| ⭐ **`CREATE MODEL`** | Fase 3: cria e treina. Recebe **nome**, **model type** e **label column** | 2.5 |
| **Label column** | A coluna com a resposta; obrigatória em problemas **supervisionados** | 2.5 |
| ⭐ **`ML.EVALUATE`** | Fase 4: avalia o modelo no **evaluation dataset** | 2.5 |
| ⭐ **`ML.PREDICT`** | Fase 5: retorna **predições e a confiança**; o campo do label volta com **`predicted`** no nome | 2.5 |
| **Accuracy, precision, recall** | As métricas de avaliação citadas (aprofundadas depois no curso) | 2.5 |
| ⭐ **MLOps** | *Machine Learning Operations*: leva o experimento à produção; ajuda a **implantar, monitorar e gerenciar** modelos | 2.5 |

## 9. Caso e contexto

| Termo | Definição | Aula |
|---|---|---|
| **Coffee on Wheels** | Empresa do estudo de caso: café em food trucks em Londres, NY, San Francisco e Tóquio | 2.1 |
| **Data Beans** | Empresa *digital-native* parceira que construiu a solução | 2.1 |
| **Digital-native company** | Empresa nascida digital, sem legado de TI a migrar | 2.1 |
| **Churn** | Evasão de clientes; exemplo clássico de problema preditivo | 2.2 |
| **Customer segmentation** | Caso de uso típico de **clustering** | 2.4 |
| **Google Merchandise Store** | Fonte dos dados reais do lab 2.6 | 2.5 |

---

## Datas que podem cair

| Ano | Marco |
|---|---|
| **1998** | Fundação do Google |
| **2008** | Lançamento do **Google Cloud** |
| **2016** | Introdução da **TPU** |


## Fontes
- Notas de aula do Módulo 2 (resumos `R - ` em `50-aulas/intro-ai-ml-google-cloud/`), consolidadas no projeto Claude "Certificação Google" em 2026-10-08
