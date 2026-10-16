---
title: "Google AI/ML — Módulo 4: Glossário"
aliases: ["glossário do Módulo 4 (Google AI/ML)"]
tags: [aula, trabalho]
type: note
area: trabalho
created: 2026-10-09
updated: 2026-10-09
status: evergreen
fonte: mista
confianca: media
papel: derivada
indexar: true
summary: "Glossário consolidado do Módulo 4 (Opções de desenvolvimento) da certificação Google, aulas 4.1 a 4.8: os termos e serviços do Google Cloud agrupados por tema, com a definição que a prova cobra."
parte_de: "[[google-ai-ml-modulo-4-revisao]]"
related: ["[[google-ai-ml-modulo-4-flashcards]]", "[[google-ai-ml-modulo-4-simulado]]"]
---

# Google AI/ML — Módulo 4: Glossário

Material de estudo do Módulo 4 (Opções de desenvolvimento) do curso [[curso-intro-ai-ml-google-cloud]], cobrindo aulas 4.1 a 4.8. Faz parte de [[google-ai-ml-modulo-4-revisao]]; os outros dois materiais do módulo são [[google-ai-ml-modulo-4-flashcards]] e [[google-ai-ml-modulo-4-simulado]].

Todos os termos das aulas **4.1 a 4.8**, em **sete grupos temáticos**. Use como
referência de consulta; para memorizar, vá aos
[[google-ai-ml-modulo-4-flashcards]].

---

## 1. IA preditiva e as quatro opções

| Termo | Definição |
|---|---|
| **Predictive AI** | IA para tarefas tradicionais: **forecasting** e **classification** |
| **Generative AI** | IA que **gera conteúdo** e **toma ação** (Módulo 3) |
| ⚠️ **As opções servem às duas** | *"These options apply to **both** gen AI and predictive AI"* (4.1) |
| **Pre-trained APIs** | APIs **preconfiguradas** sobre modelos já treinados pelo Google; **zero** dados e **zero** tempo de treino. **Low-code** |
| **Preconfigured APIs** | Sinônimo de pre-trained APIs (4.1) |
| **Ready-made solutions** | Como a 4.8 descreve as pre-trained APIs |
| **BigQuery ML** | Modelos predefinidos via **queries SQL**; **code-based**, por exigir SQL |
| **Agent Platform AutoML** | ***Automated machine learning*** — modelos próprios via **point-and-click** |
| **Custom training** | **Codar manualmente** projetos de ML; **controle total** |
| **Perceptual tasks** | Tarefas de **percepção** — **vision, video, natural language**; domínio das pre-trained APIs |
| **As quatro personas** | **business user · data scientist · developer · ML engineer** (4.8; a 4.1 listava três, sem o developer) |
| **Os três fatores de escolha** | **necessidade de negócio · expertise em ML · orçamento** |

---

## 2. A Agent Platform

| Termo | Definição |
|---|---|
| **Agent Platform** | *"Google's unified AI **development** platform"* (4.1, 4.2) ou *"unified **AI** platform"* (4.8) |
| **Playground** | O apelido da 4.2 |
| **Ultimate workspace** | O apelido da 4.8 |
| **Unified platform** | Reúne **todos os componentes do ecossistema e do workflow de ML** |
| **End-to-end ML pipeline** | Preparar dados e **criar, implantar e gerenciar** modelos **ao longo do tempo e em escala** |
| **Data readiness** | Estágio 1: subir dados de **Cloud Storage, BigQuery ou máquina local** |
| **Feature readiness** | Estágio 2: criar **features** e compartilhá-las no **feature store** |
| **Feature** | Os **dados processados** que entram no modelo — **não** o dado bruto |
| **Feature store** | O mecanismo para **compartilhar features** com outras pessoas |
| **Training and hyperparameter tuning** | Estágio 3: experimentar modelos e ajustar hiperparâmetros |
| **Deployment and model monitoring** | Estágio 4: produção com **monitoramento automático** e **melhoria contínua** → **MLOps** (aula 5.5) |
| **Continuous integration, delivery and training** | Os três "contínuos" do desafio de produção — note o **treinamento** |
| **Seamless** | 1º S: experiência fluida **do upload à produção** |
| **Scalable** | 2º S: o **MLOps** escala **armazenamento e computação automaticamente** |
| **Sustainable** | 3º S: **artifacts e features reusados e compartilhados** — ⚠️ **não** é meio ambiente |
| **Speedy** | 4º S: **menos linhas de código** que os concorrentes — ⚠️ **não** é velocidade de inferência |
| **O dado do Gartner** | **Só metade** dos projetos de ML **empresariais** passa da **fase piloto** |

---

## 3. O AutoML por dentro

| Termo | Definição |
|---|---|
| **AutoML** | ***Automated machine learning*** — automatiza **desenvolver e implantar** um modelo |
| **Data processing** | Fase 1: converte **numbers, datetime, text, categories, arrays of categories e nested fields**; automatiza **parte** do preparo |
| **Searching models and tuning parameters** | Fase 2: a busca automática |
| **Assembling** | Fase 3: o **ensemble** dos melhores modelos |
| **Prediction** | Fase 4 |
| **Neural architecture search** | **Testa arquiteturas e modelos**, **compara performance** e **tuna parâmetros automaticamente** |
| **Transfer learning** | Usar **modelos pré-treinados** como base; **acelera a busca** e exige **menos dados e computação** |
| **Foundation model** | O papel que um modelo já treinado assume ao resolver **novos problemas com novos dados** |
| **Model ensemble** | Combinar os **top N modelos** (~10) em vez de um só |
| **Training budget** | O que determina **quantos** modelos entram no ensemble |
| **Feature engineering** | 1ª etapa do **pipeline automatizado** |
| **Os quatro problemas gerais de linguagem** | **text classification · question answering · document summarization · text generation** |
| **As três áreas de fine-tuning citadas** | **retail · finance · entertainment** |
| **Serving** | A etapa final que a 4.8 diz que o AutoML automatiza (a 4.3 dizia **deployment**) |

---

## 4. Custom training por dentro

| Termo | Definição |
|---|---|
| **Pre-built container** | A **cozinha mobiliada**: ambiente pronto com **Python, TensorFlow, PyTorch**; para quem **não é exigente** com a infraestrutura |
| **Custom container** | A **sala vazia**: você determina **environment, machine type e disks** |
| **Agent Platform Workbench** | Um **Jupyter notebook** num único ambiente; suporta **explorar → treinar → implantar**; **aceita SQL** e conecta **BigQuery ↔ Agent Platform** |
| **Agent Platform Colab Enterprise** | Notebook **integrado** à Agent Platform, ambiente **familiar** |
| **ML library** | **Coleção de código pré-escrito** para tarefas de ML |
| **As três bibliotecas populares** | **TensorFlow · scikit-learn · PyTorch** — todas **open source** |
| **TensorFlow** | **Plataforma aberta end-to-end** de ML **apoiada pelo Google**; APIs em **hierarquia** |
| **Hardware** | Camada 1 do TensorFlow: **CPU · GPU · TPU** |
| **Low-level TensorFlow APIs** | Camada 2: operações em **C++**; funções **core, basic e numeric** em **Python** |
| **TensorFlow model libraries** | Camada 3: os **building blocks** — **camadas de rede neural** e **métricas de avaliação** |
| **High-level APIs / Keras** | Camada 4: **escondem os detalhes** e **implantam o treinamento automaticamente** |
| **tf.keras** | Biblioteca **high-level** do exemplo de regressão |
| **`tf.keras.Sequential`** | Passo 1: **juntar as camadas** da rede neural |
| **`compile`** | Passo 2: ⭐ onde entram os **hiperparâmetros** |
| **Loss function** | Como se **mede a performance** — no `compile` |
| **Optimizer** | Como se **otimiza o treinamento** — no `compile` |
| **`fit`** | Passo 3: define **input**, **output** e **epochs** |
| **Epochs** | **Número de iterações** de treinamento |
| **JAX** | **Biblioteca de computação numérica de alta performance**, **flexível e fácil**; **pesquisa e produção** |
| **Manually code** | O verbo da 4.8 para o que distingue o custom training |
| **As "ferramentas versáteis" da 4.8** | **Python · JAX · Agent Platform Workbench** — ⚠️ **sem TensorFlow** |

---

## 5. APIs

| Termo | Definição |
|---|---|
| **API** | ***Application programming interface*** — define **como componentes de software se comunicam** |
| **SDK** | ***Software development kit*** — o **cliente** que embala as chamadas de API |
| **Vendor** | Quem **define as APIs** e **fornece os SDKs** nas diferentes linguagens |
| **API key** | Chave **única** que **autentica a sessão** e **concede permissão** |
| **cURL** | ***Client URL*** — **ferramenta de linha de comando** para **transferir dados entre cliente e servidor** |
| **REST API** | O tipo da Natural Language API — requisições e respostas em **JSON** |
| **Generative AI APIs** | **Foundation model APIs**, como as **Gemini APIs multimodais**, para **criar conteúdo diretamente** |
| **Machine learning APIs** | Como a **Agent Platform API** — **treinar, monitorar e tunar** com mínima expertise |
| **Other APIs** | **speech · image · document · conversation** |
| **Multitask and multimodal** | O par de adjetivos que explica por que as **Gemini APIs** absorvem as APIs específicas |
| **A tríade da tomada (4.4)** | **qual API · quais parâmetros · em que formato** |
| **A tríade do sanduíche (4.6)** | **features** (menu) · **input** (pedido) · **output** (sanduíche) |
| **Google AI for Python SDK** | O SDK do exemplo de código da 4.4 |

---

## 6. A Natural Language API

| Termo | Definição |
|---|---|
| **Natural Language API** | Analisa texto **no navegador** ou por **código**; *"transforming **raw text** into **meaningful data**"* |
| **Entities** | Os **sujeitos** no texto, **com o tipo** — Google = empresa, Mountain View = localização |
| **Sentiment** | A **emoção**, em **dois níveis**: **documento inteiro** e **sujeito individual** |
| **Syntax** | **Informação linguística**, como a **relação entre as palavras** |
| **Categories** | Classificação por **tópicos ou palavras-chave** — como **atribuir uma tag** |
| **`analyzeEntities`** | Análise de **entidades** |
| **`analyzeSentiment`** | Sentimento do **texto inteiro** |
| **`analyzeEntitySentiment`** | Sentimento de **cada entidade** |
| **`analyzeSyntax`** | **Análise sintática** |
| **`classifyText`** | **Classificação de conteúdo** — ⚠️ o único que **não** começa com `analyze` |
| **Os quatro campos do JSON** | **type** (plain text) · **language** (EN) · **content** · **encodingType** (UTF8) |
| ⚠️ **`content`** | Aceita **o texto em si** **ou** a **localização do arquivo no Cloud Storage** |

---

## 7. Datas e números do módulo

| Item | Valor |
|---|---|
| **Janeiro de 2018** | **AutoML é anunciado** — a única data do curso com **precisão mensal** |
| **2021** | AutoML **embutido no Vertex AI** (*"now Agent Platform"* — a citação que confirma o rebranding) |
| **Centenas de milhares de registros** | O que um **modelo custom** exige — e de **alta qualidade** (4.4) |
| **~10 modelos** | O tamanho típico do **ensemble** do AutoML, conforme o **training budget** |
| **Metade** | A fração dos projetos de ML empresariais que **não** passa da fase piloto (Gartner) |
| **Três camadas** | O número de camadas da rede neural do exemplo de tf.keras |
| **Quatro camadas** | A hierarquia de abstração do **TensorFlow** |
| **Cinco métodos / quatro features** | A **Natural Language API** |
| **Três de quatro features** | O que o **lab 4.7** cobre (fica de fora o `classifyText`) |

