---
title: "Google AI/ML — Módulo 2: Flashcards"
aliases: ["flashcards do Módulo 2 (Google AI/ML)"]
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
summary: Deck de flashcards do Módulo 2 (AI Foundations) da certificação Google, aulas 1.1 a 2.7, em blocos temáticos de 10 a 15 minutos para revisão espaçada.
parte_de: "[[google-ai-ml-modulo-2-revisao]]"
related: ["[[google-ai-ml-modulo-2-glossario]]", "[[google-ai-ml-modulo-2-simulado]]"]
---

# Google AI/ML — Módulo 2: Flashcards

Material de estudo do Módulo 2 (AI Foundations) do curso [[curso-intro-ai-ml-google-cloud]], cobrindo aulas 1.1 a 2.7. Faz parte de [[google-ai-ml-modulo-2-revisao]]; os outros dois materiais do módulo são [[google-ai-ml-modulo-2-glossario]] e [[google-ai-ml-modulo-2-simulado]].

95 cartões das aulas **1.1 a 2.7**, em **sete blocos temáticos**. Cada bloco é
uma sessão de revisão de 10–15 minutos.

**Como usar:** cubra a coluna da direita, responda em voz alta, confira. Marque o
que errou e repita só esses no dia seguinte. Os blocos 2, 5 e 7 são os mais
densos — se o tempo for curto, comece por eles.

---

## Bloco 1 — Hierarquias e conceitos de IA (14 cartões)

| Pergunta | Resposta |
|---|---|
| IA e ML são sinônimos? | Não — **ML é um subconjunto da IA** |
| Defina IA | Termo-guarda-chuva para tudo em que computadores **imitam a inteligência humana** |
| Dois exemplos de aplicação de IA citados | Robôs e carros autônomos |
| Defina ML | Subconjunto da IA em que o computador **aprende sem ser explicitamente programado** |
| O que distingue ML da programação tradicional? | Na tradicional, diz-se **explicitamente** ao computador o que fazer |
| O que o deep learning acrescenta? | **Camadas** entre os dados de entrada e os resultados de saída |
| Deep learning é subconjunto de quê? | Do **machine learning** |
| Um LLM é um tipo de quê? | De **modelo de deep learning** |
| Escreva a hierarquia completa | **IA ⊃ ML ⊃ deep learning ⊃ (LLMs → GenAI)** |
| Qual afirmação é falsa: "IA é subconjunto de ML"? | **Falsa** — é o inverso |
| Os dois outros nomes de **predictive AI** | **Traditional AI** e **discriminative AI** |
| Defina IA preditiva | Usa dados existentes para **classificar** ou **prever resultados futuros** com base em **padrões históricos** |
| Defina IA generativa | **Cria conteúdo novo** que espelha o estilo e os padrões dos dados de treinamento |
| ⭐ A frase que separa as duas | "IA preditiva **analisa e prevê**; IA generativa **cria conteúdo novo e toma ações**" |

## Bloco 2 — Supervisionado × não supervisionado (16 cartões)

| Pergunta | Resposta |
|---|---|
| Supervisionado: dados, direção, identifica | **Rotulados** · **task-driven** · identifica **uma meta** |
| Não supervisionado: dados, direção, identifica | **Não rotulados** · **data-driven** · identifica **um padrão** |
| O teste rápido para distinguir os dois | O supervisionado dá um **rótulo/resposta** a cada ponto de dado; o não supervisionado não |
| Quantos tipos de supervisionado e quais? | **2** — classificação e regressão |
| Quantos tipos de não supervisionado e quais? | **3** — clustering, associação e redução de dimensionalidade |
| Classificação prevê o quê? | Variável **categórica** |
| Qual modelo resolve classificação? | **Logistic regression** |
| Regressão prevê o quê? | Variável **numérica** |
| Qual modelo resolve regressão? | **Linear regression** |
| ⚠️ Logistic regression resolve qual problema? | **CLASSIFICAÇÃO** — não regressão, apesar do nome |
| Clustering faz o quê? Com qual modelo? | Agrupa pontos similares em clusters · **k-means** |
| Associação faz o quê? Com qual algoritmo? | Identifica **relações subjacentes** · **Apriori** |
| Redução de dimensionalidade faz o quê? Com qual técnica? | Reduz **dimensões/features** para melhorar a **eficiência** · **PCA** |
| Exemplo de clustering na aula | **Segmentação de clientes** a partir de dados demográficos |
| Exemplo de associação na aula | Correlação entre dois produtos, para **aproximá-los na prateleira** numa promoção |
| Exemplo de redução de dimensionalidade na aula | Combinar **idade, histórico de infrações e tipo de carro** numa regra de cotação de seguro |

## Bloco 3 — Arquitetura e camadas (13 cartões)

| Pergunta | Resposta |
|---|---|
| Qual o nome próprio da estrutura de três camadas? | **AI/ML Toolbox on Google Cloud** |
| Quais são as três camadas da arquitetura? | **AI infrastructure** → **AI development** → **AI applications and solutions** |
| ⭐ Em qual camada o curso foca? | Na **segunda — AI development** |
| Qual produto ocupa a camada de desenvolvimento? | **Agent Platform** (ex-Vertex AI) |
| Como a aula define a Agent Platform? | Plataforma **end-to-end** de desenvolvimento de IA, **do design ao deployment** |
| O que move a Agent Platform? | **Foundation models** como o Gemini + **pipelines de deployment** simplificados |
| Para quem é a camada de aplicações e soluções? | **Usuários de negócio e analistas**, com opções **out-of-the-box** para prototipar rápido |
| Quais os três andares *dentro* da infraestrutura? | **Networking and security** → **compute e storage** → **data and AI products** |
| Qual é o andar **base** da infraestrutura? | **Networking and security** |
| O que significa compute e storage "desacoplados"? | Escalam **independentemente** |
| Qual a principal diferença entre nuvem e desktop? | Na nuvem, **compute e storage escalam separadamente** |
| As três etapas do workflow **data-to-AI** | **Ingest and process → store and analyze → activate with AI** |
| As três etapas do padrão de aplicação de IA (caso 2.1) | **Multimodal input → prediction and generation → visual output** |

## Bloco 4 — Compute, hardware e datas (12 cartões)

| Pergunta | Resposta |
|---|---|
| Em que ano o Google foi fundado? | **1998** |
| Em que ano o Google Cloud foi lançado? | **2008** |
| Em que ano a TPU foi introduzida? | **2016** |
| Qual serviço de compute dá **mais controle**? | **Compute Engine** — "como gerenciar um servidor físico" |
| Qual é para **contêineres** com orquestração? | **Google Kubernetes Engine (GKE)** |
| Qual é **serverless**? | **Cloud Run** — o Google gerencia a infraestrutura |
| Ordene os três por controle decrescente | **Compute Engine → GKE → Cloud Run** |
| O que é uma TPU? | Chip **customizado e application-specific** do Google para acelerar workloads de IA |
| TPU é hardware de que tipo? | **Domain-specific**, em oposição ao *general-purpose* de CPU e GPU |
| Qual operação de ML a aula cita como exemplo do ganho da TPU? | **Multiplicação de matrizes** |
| As duas vantagens da Cloud TPU sobre GPU e CPU | **Mais rápida** e **mais eficiente em energia** |
| O que compõe a camada de infraestrutura (aula 2.2)? | **Compute, network e storage** |

## Bloco 5 — Storage e bancos de dados (13 cartões)

| Pergunta | Resposta |
|---|---|
| ⭐ Onde guardar dados **não estruturados**? | **Cloud Storage** |
| Exemplos de dados não estruturados | Documentos, imagens, arquivos de áudio |
| Onde guardar dados **estruturados**? | **BigQuery**, **AlloyDB for PostgreSQL** e outros |
| O que define dado estruturado? | Organizado em **tabelas, linhas e colunas** |
| O BigQuery lida com semi-estruturados? | Sim — **altamente otimizado** para **JSON** |
| ⭐ Como o BigQuery consulta dados **não estruturados**? | Criando uma **external table**, com referência estruturada ao dado no Cloud Storage |
| "O BigQuery só serve para dados estruturados" — V ou F? | **Falso** |
| ⚠️ Bigtable é SQL ou NoSQL? | **NoSQL** |
| Quais bancos **SQL** a aula cita? | **BigQuery, AlloyDB, Cloud SQL, Spanner** |
| Quais bancos **NoSQL** a aula cita? | **Bigtable e Firestore** |
| Qual produto faz **visualização**? | **Looker** |
| Produtos de **ingestão e processamento** | **Pub/Sub, Dataflow, Managed Service for Apache Spark, Cloud Data Fusion** |
| Qual produto é para ingestão **em tempo real**? | **Pub/Sub** |

## Bloco 6 — Produtos de IA e o caso Coffee on Wheels (14 cartões)

| Pergunta | Resposta |
|---|---|
| Qual foundation model do Google gera **vídeo**? | **Veo** |
| Qual gera **imagem**? | **Imagen** |
| Qual é o multimodal generalista? | **Gemini** |
| O que diferencia um **agente** de um assistente comum? | O agente **toma ações** de forma autônoma |
| Quais opções são **no-code**? | **Gemini Enterprise app** e **Agent Platform AutoML** |
| Qual opção é **low-code**? | **Pre-trained APIs** |
| Quais são **code-based**? | **BigQuery ML** e **custom training** |
| Qual o nome antigo de "Agent Platform"? | **Vertex AI** |
| Os três produtos da Agent Platform (aula 2.3) | **Agent Studio**, **Agent Platform AutoML**, **Gemini Enterprise Agent Platform Notebooks** |
| As três razões "por que Google" | 1) Histórico de IA nos produtos (Search, Maps, Workspace) · 2) Liderança em inovação · 3) **IA responsável** |
| Os três pilares da IA responsável | **Bold innovation** · **responsible development and deployment** · **collaborative progress** |
| Os três desafios da Coffee on Wheels | 1) Localização, seleção e **otimização de rotas** · 2) **Previsão de vendas** e monitoramento em tempo real · 3) **Automação de campanhas** |
| Quem é o parceiro que construiu a solução? | **Data Beans**, empresa *digital-native* |
| Mapa produto → função no caso | **Gemini Multimodal** = aquisição de dados · **BigQuery** = análise · **Agent Platform** = desenvolvimento de ML · **AI agents** = executar decisões · **Looker** = visualizar |

## Bloco 7 — BigQuery ML (13 cartões)

| Pergunta | Resposta |
|---|---|
| Quais são os **dois serviços** do BigQuery? | **Storage gerenciado** + **engine analítica baseada em SQL** |
| O que conecta os dois serviços? | A **rede interna de alta velocidade** do Google |
| O que essa rede viabiliza? | Escalar **storage e compute independentemente** |
| O BigQuery sempre foi mais que data warehouse? | Não — **começou só como data warehouse** e evoluiu para o ciclo **data-to-AI** |
| Que tipo de dado o BigQuery ML gerencia? | **Dados tabulares** |
| O que o BigQuery ML faz pelo usuário? | **Ajusta os parâmetros** e ajuda a gerenciar o workflow |
| ⭐ As cinco fases de um projeto no BigQuery ML | 1) ETL · 2) selecionar e pré-processar features · 3) `CREATE MODEL` · 4) `ML.EVALUATE` · 5) `ML.PREDICT` |
| O que é **one-hot encoding**? | Converte dados **categóricos em numéricos**, formato exigido pelo modelo de treino |
| Quem faz o one-hot encoding? | O próprio **BigQuery ML**, automaticamente |
| O que o `CREATE MODEL` recebe? | **Nome**, **model type** e **label column** |
| ⭐ Como o campo do label aparece no resultado do `ML.PREDICT`? | Com **`predicted` acrescentado ao nome do campo** |
| Quais métricas de avaliação a aula cita? | **Accuracy, precision e recall** |
| ⭐ Qual a abordagem recomendada de modelagem? | Começar **simples** (logistic/linear regression) e usar como **benchmark** contra complexos como **DNN** |

---

## Cartões extra — MLOps e fechamento (do Módulo 2)

| Pergunta | Resposta |
|---|---|
| O que é **MLOps**? | *Machine Learning Operations* — leva o experimento à produção; ajuda a **implantar, monitorar e gerenciar** modelos |
| O BigQuery ML suporta MLOps? | **Sim** |
| Modelos suportados pelo BigQuery ML | Logistic regression, linear regression, k-means clustering, time series forecasting e **DNN** |
| Por que não começar pelo DNN? | Leva **mais tempo e mais recursos** para treinar e implantar |
| Que dados o lab 2.6 usa? | E-commerce real da **Google Merchandise Store** |
| O que o lab 2.6 prevê? | Se um **visitante fará compras futuras** |
| Qual assistente apoia o lab? | **Gemini Code Assist** — **explica, cria e depura** código |
| Qual aula é o "destaque do módulo"? | **BigQuery ML** |
| Os seis termos-chave do instrutor | **Predictive AI · Generative AI · Data to AI · BigQuery · Agent Platform · BigQuery ML** |

