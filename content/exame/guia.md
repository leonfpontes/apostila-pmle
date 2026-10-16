---
title: "PMLE — Guia do exame cruzado com a trilha"
aliases: ["guia do exame PMLE", "exam guide PMLE", "domínios do exame PMLE"]
tags: [aula, trabalho]
type: note
area: trabalho
created: 2026-10-16
updated: 2026-10-16
status: evergreen
fonte: documento
confianca: alta
papel: canonica
indexar: true
summary: "As 6 seções do exame Professional ML Engineer com pesos (seções 4 e 5 somam 42%), o que cai em cada subseção, quais cursos da trilha cobrem cada uma, quantas questões de prática existem e o que o banco de questões não cobre (IA generativa)."
parte_de: "[[trilha-pmle]]"
related: ["[[pmle-banco-de-questoes]]", "[[trilha-pmle-cronograma]]", "[[google-ai-ml-armadilhas-e-cheatsheet]]"]
---

# PMLE — Guia do exame cruzado com a trilha

Resumo em português do guia oficial do exame **Google Cloud Professional Machine Learning Engineer** (versão em vigor desde 01/10/2024), com cada subseção ligada aos cursos da [[trilha-pmle|trilha]] que a cobrem e à quantidade de questões de prática no [[pmle-banco-de-questoes|banco de questões]].

## O que a prova espera

O guia descreve alguém que constrói, avalia, coloca em produção e otimiza soluções de IA no Google Cloud, lida com dados grandes e código reutilizável, opera soluções de **IA generativa** sobre foundation models e aplica **Responsible AI**. Os temas centrais são arquitetura de modelos, pipelines de dados e de ML, IA generativa e interpretação de métricas, com base em MLOps, desenvolvimento de aplicações, infraestrutura e governança de dados.

## Pesos por seção

| Seção | Peso | Cursos da trilha que cobrem | Questões no banco |
|---|---|---|---|
| 1. Arquitetar soluções de IA low-code | 13% | 1, 2, 3, 4, 12 | 36 |
| 2. Colaborar entre times para gerenciar dados e modelos | 14% | 2, 4, 5, 6, 7, 11, 15 | 42 |
| 3. Escalar protótipos em modelos de ML | 18% | 1, 5, 10, 12, 14 | 81 |
| 4. Servir e escalar modelos | 20% | 5, 6, 7 | 41 |
| 5. Automatizar e orquestrar pipelines de ML | **22%** | 5, 6 | 47 |
| 6. Monitorar soluções de IA | 13% | 5, 6, 11, 13, 14, 15 | 36 |

As seções 4 e 5 somam **42% da prova** e dependem quase inteiras dos cursos **5 (Production ML Systems)** e **6 (MLOps: Getting Started)**. São os dias 3 a 7 do cronograma, os que mais merecem anotação.

## Subseções, o que estudar e onde

### 1. Arquitetar soluções de IA low-code (13%)

| Subseção | O que cai | Cursos | Questões |
|---|---|---|---|
| 1.1 BigQuery ML | Escolher o tipo de modelo pelo problema (linear, classificação binária, regressão, time-series, matrix factorization, boosted trees, autoencoder); feature engineering e seleção no BQML; gerar previsões | 1, 3, 4 | 10 |
| 1.2 ML APIs e foundation models | APIs do Model Garden; APIs de indústria (Document AI, Retail API); **RAG com Vertex AI Agent Builder** | 1, 2, 12 | 10 |
| 1.3 AutoML | Preparar dados (seleção de features, rotulagem, Tabular Workflows); treinar com tabular, texto, fala, imagem e vídeo; forecasting com AutoML; configurar e depurar modelos treinados | 1 | 16 |

### 2. Colaborar entre times para gerenciar dados e modelos (14%)

| Subseção | O que cai | Cursos | Questões |
|---|---|---|---|
| 2.1 Explorar e pré-processar dados | Cloud Storage, BigQuery, Spanner, Cloud SQL, Spark, Hadoop; datasets no Vertex AI; pré-processamento com Dataflow, TFX e BigQuery; **Vertex AI Feature Store**; privacidade (PII, PHI); ingestão de documentos para inferência | 2, 4, 5, 7, 15 | 25 |
| 2.2 Prototipar em notebooks | Escolher o backend (Vertex AI Workbench, **Colab Enterprise**, notebooks no Dataproc); segurança no Workbench; kernels Spark; integração com repositórios de código; TensorFlow, PyTorch, sklearn, Spark, JAX; modelos do Model Garden | 1, 5 | 6 |
| 2.3 Rastrear experimentos | Vertex AI Experiments, Kubeflow Pipelines, Vertex AI TensorBoard; **avaliar soluções de IA generativa** | 6, 11 | 11 |

### 3. Escalar protótipos em modelos de ML (18%)

| Subseção | O que cai | Cursos | Questões |
|---|---|---|---|
| 3.1 Construir modelos | Escolher framework e arquitetura; técnicas de modelagem conforme exigência de interpretabilidade | 5, 14 | 24 |
| 3.2 Treinar modelos | Organizar e ingerir dados (CSV, JSON, imagens, Hadoop, bancos); Vertex AI custom training, Kubeflow no GKE, AutoML, tabular workflows; treino distribuído; hyperparameter tuning; troubleshooting de falhas; **fine-tuning de foundation models** | 1, 5, 10, 12 | 36 |
| 3.3 Hardware de treino | CPU, GPU, TPU, edge; treino distribuído com TPUs e GPUs (**Reduction Server**, Horovod) | 5 | 21 |

### 4. Servir e escalar modelos (20%)

| Subseção | O que cai | Cursos | Questões |
|---|---|---|---|
| 4.1 Servir modelos | Inferência batch e online (Vertex AI, Dataflow, BigQuery ML, Dataproc); servir PyTorch e XGBoost; **Model Registry**; **A/B testing** entre versões | 5, 6 | 24 |
| 4.2 Escalar o serving online | Feature Store no serving; endpoints públicos e **privados**; hardware de serving; autoscaling (Vertex AI Prediction, containers); otimizar latência, memória e throughput | 5, 7 | 17 |

### 5. Automatizar e orquestrar pipelines de ML (22%)

| Subseção | O que cai | Cursos | Questões |
|---|---|---|---|
| 5.1 Pipelines ponta a ponta | Validar dados e modelos; pré-processamento igual no treino e no serving; pipelines de terceiros (MLflow); componentes, parâmetros, triggers e compute (Cloud Build, Cloud Run); Kubeflow Pipelines, **Vertex AI Pipelines**, Cloud Composer; híbrido e multicloud; TFX e Kubeflow DSL | 5, 6 | 27 |
| 5.2 Retreino automático | Política de retreino; CI/CD com Cloud Build e Jenkins | 6 | 13 |
| 5.3 Metadados | Comparar artefatos e versões (Vertex AI Experiments, **Vertex ML Metadata**); versionamento de modelo e dataset; linhagem | 6 | 7 |

### 6. Monitorar soluções de IA (13%)

| Subseção | O que cai | Cursos | Questões |
|---|---|---|---|
| 6.1 Riscos | Segurança contra exploração de dados e modelos; práticas de Responsible AI do Google (monitorar bias); prontidão (fairness, bias); **explainability no Vertex AI** | 13, 14, 15 | 19 |
| 6.2 Monitorar e testar | Métricas de avaliação contínua (**Vertex AI Model Monitoring**, Explainable AI); **training-serving skew**; feature attribution drift; comparar com baselines, modelos simples e ao longo do tempo; erros comuns de treino e serving | 5, 6, 11 | 17 |

## Onde o banco de questões não chega

O arquivo de questões foi escrito em boa parte antes da versão atual do guia: 69 questões usam nomes antigos como AI Platform, e quase nenhuma fala de IA generativa. Ele **não cobre** (ou cobre com uma questão só):

- RAG com Vertex AI Agent Builder, Model Garden, Gemini e fine-tuning de foundation models (1.2, 2.2, 3.2);
- avaliação de soluções de IA generativa (2.3);
- Colab Enterprise e notebooks no Dataproc (2.2);
- endpoints privados, A/B testing e Reduction Server aparecem só uma ou duas vezes.

Esses temas estão no guia e vão cair. Eles vêm dos cursos **8 a 12** da trilha (22 e 23/10 no cronograma), então ali o estudo é pelo conteúdo do curso, sem questão pronta para treinar. Vale pedir um simulado próprio desses cursos quando chegar neles.

## Como usar com o cronograma

1. Ao fechar cada curso, faça as questões dele (tabela "Quando praticar" no [[pmle-banco-de-questoes|banco de questões]]).
2. Nas seções 4 e 5, que valem 42%, faça também uma segunda rodada só com as questões erradas.
3. No dia 12 (revisão geral), faça um simulado misto de 50 questões no simulador interativo, filtrando por seção para equilibrar com os pesos acima.

## Fontes

- Guia oficial *Professional Machine Learning Engineer Certification Exam Guide* (Google Cloud, versão em vigor desde 01/10/2024), PDF enviado por Leonardo em 16/10/2026.
- Contagem de questões: [[pmle-banco-de-questoes|banco de questões]], a partir do arquivo de questões enviado na mesma data.
- Ligação com os cursos: [[trilha-pmle|trilha]] e [[trilha-pmle-cronograma]].
