---
title: Google AI/ML — Revisão consolidada do Módulo 2 (AI Foundations)
aliases: [revisao modulo 2 Google, glossario Google AI ML, simulado modulo 2, flashcards Google Cloud AI]
tags: [aula, trabalho]
type: note
area: trabalho
created: 2026-10-08
updated: 2026-10-09
status: evergreen
fonte: mista
confianca: media
papel: canonica
indexar: true
summary: "Material consolidado do Módulo 2 (AI Foundations) da certificação Google: glossário completo das aulas 1.1 a 2.7, as armadilhas e pegadinhas identificadas, e o roteiro de revisão para o quiz 2.8. Nota de entrada para revisar o módulo inteiro sem reler as seis aulas."
parte_de: "[[curso-intro-ai-ml-google-cloud]]"
related: ["[[R - 2026-10-08-m02-a07-summary]]", "[[R - 2026-10-08-m02-a05-bigquery-ml]]", "[[R - 2026-10-08-m02-a04-ai-models]]"]
---

# Google AI/ML — Revisão consolidada do Módulo 2 (AI Foundations)

Material de revisão das aulas **1.1 a 2.7** do curso
[[curso-intro-ai-ml-google-cloud]]. Serve para revisar o módulo inteiro sem
reler as seis notas de aula.

> 📚 **Versão expandida (também no projeto Claude "Certificação Google"):**
> [[google-ai-ml-modulo-2-glossario]] (termos em 9 grupos),
> [[google-ai-ml-modulo-2-flashcards]] (95 cartões em 7 blocos) e
> [[google-ai-ml-modulo-2-simulado]] (30 questões com gabarito comentado).

> 💡 **Os seis termos que o próprio instrutor elegeu** (aula 2.7):
> Predictive AI · Generative AI · Data to AI · BigQuery · Agent Platform ·
> BigQuery ML. **Dois dos seis são o BigQuery.**

## ⚠️ As cinco armadilhas do módulo

1. **Logistic regression resolve CLASSIFICAÇÃO**, não regressão. Quem prevê
   números é a **linear regression**. O curso repete esse exercício em duas
   aulas seguidas (2.4 e 2.5) — sinal claro de que cai.
2. **Bigtable ≠ BigQuery.** Bigtable e Firestore são **NoSQL**; BigQuery,
   AlloyDB, Cloud SQL e Spanner são **SQL**. E **NoSQL ≠ não estruturado**:
   dado não estruturado vai para o **Cloud Storage**.
3. **"O BigQuery só serve para dado estruturado" é FALSO.** Ele é
   construído para estruturado, **otimizado** para semi-estruturado (JSON) e
   **consulta** não estruturado via **external table**.
4. **Agent Platform = Vertex AI.** Rebranding confirmado em áudio na aula
   2.1. Material de terceiros ainda diz "Vertex AI".
5. **O curso foca na SEGUNDA camada** (AI development), não na
   infraestrutura nem nas soluções prontas (aula 2.7).

## 📐 As três hierarquias de "três camadas" (não confundir)

O curso usa a expressão em três sentidos diferentes:

| # | Qual | As camadas | Aula |
|---|---|---|---|
| 1 | **AI/ML Toolbox** (arquitetura de produtos) | AI infrastructure → **AI development** ← *foco do curso* → AI applications and solutions | 2.2, 2.7 |
| 2 | **Dentro da infraestrutura** | networking and security → compute e storage → data and AI products | 2.3 |
| 3 | **Hierarquia de conceitos** | IA ⊃ ML ⊃ deep learning ⊃ (LLMs → GenAI) | 2.4 |

## Glossário essencial

### Conceitos
- **IA** — computadores **imitando a inteligência humana** (robôs, carros
  autônomos).
- **ML** — subconjunto da IA; aprende **sem ser explicitamente programado**.
- **Deep learning** — subconjunto do ML; acrescenta **camadas** entre
  entrada e saída.
- **LLM** — **um tipo de modelo de deep learning**.
- **Predictive AI** *(= traditional = discriminative)* — **analisa e
  prevê** a partir de padrões históricos.
- **Generative AI** — **cria conteúdo novo e toma ações**.
- **AI agent** — assistente **autônomo** que gera conteúdo **e age**.

### Aprendizado
| | **Supervised** | **Unsupervised** |
|---|---|---|
| Dados | **rotulados** | **não rotulados** |
| Direção | **task-driven** | **data-driven** |
| Identifica | **uma meta** | **um padrão** |

| Tipo | Prevê / faz | Modelo |
|---|---|---|
| **Classification** (sup.) | variável **categórica** | **logistic regression** |
| **Regression** (sup.) | variável **numérica** | **linear regression** |
| **Clustering** (não sup.) | agrupa pontos similares | **k-means** |
| **Association** (não sup.) | relações subjacentes | **Apriori** |
| **Dimensionality reduction** (não sup.) | reduz features | **PCA** |

### Compute e hardware
- **Compute Engine** → **GKE** → **Cloud Run**: controle decrescente,
  conveniência crescente.
- **TPU** (2016) — chip **domain-specific**, *application-specific*; ganho
  em **multiplicação de matrizes**; **mais rápida e mais eficiente em
  energia** que CPU e GPU.

### Storage
- **Não estruturado** (documentos, imagens, áudio) → **Cloud Storage**.
- **Estruturado** (tabelas, linhas, colunas) → **BigQuery**, **AlloyDB**.
- **SQL**: BigQuery, AlloyDB, Cloud SQL, Spanner.
- **NoSQL**: Bigtable, Firestore.
- **External table** — referência estruturada a dado não estruturado no
  Cloud Storage.

### Workflow data-to-AI
```
Ingest and process  →  Store and analyze  →  Activate with AI
Pub/Sub, Dataflow,     Cloud Storage;         Agent Platform
Managed Spark,         SQL: BigQuery,         (modelos preditivos
Cloud Data Fusion      AlloyDB, Cloud SQL,     ou gen AI)
                       Spanner
                       NoSQL: Bigtable,
                       Firestore
                       Viz: Looker
```

### BigQuery ML
```
ETL  →  features  →  CREATE MODEL  →  ML.EVALUATE  →  ML.PREDICT
```
- **BigQuery** = **storage gerenciado + engine SQL**, ligados pela **rede
  interna de alta velocidade** (é ela que permite escalar os dois
  independentemente).
- **One-hot encoding** — converte **categórico em numérico**; o BigQuery ML
  faz automaticamente.
- **`CREATE MODEL`** recebe **nome**, **model type** e **label column**.
- **`ML.PREDICT`** retorna predições **e a confiança**; o campo do label
  volta com **`predicted`** no nome.
- **Métricas:** accuracy, precision, recall.
- **MLOps** — leva o experimento à produção: **implantar, monitorar,
  gerenciar**.
- **Regra de método:** comece **simples** (logistic/linear) e use como
  **benchmark** contra complexos (**DNN**).

### Datas
| Ano | Marco |
|---|---|
| **1998** | Fundação do Google |
| **2008** | Lançamento do Google Cloud |
| **2016** | Introdução da TPU |

## Roteiro de revisão para o quiz 2.8

1. Ler as cinco armadilhas acima (5 min).
2. Rodar os blocos 2, 5 e 7 dos flashcards — os mais densos (30 min).
3. Fazer o simulado de 30 questões (30 min).
4. Revisar só o que errou.

## Aulas de origem
- [[R - 2026-09-01-m01-a01-course-introduction|1.1 — Course introduction]]
- [[R - 2026-09-01-m02-a01-a-use-case|2.1 — A use case]]
- [[R - 2026-09-01-m02-a02-ai-on-google-cloud|2.2 — AI on Google Cloud]]
- [[R - 2026-10-08-m02-a03-ai-infrastructure|2.3 — AI infrastructure]]
- [[R - 2026-10-08-m02-a04-ai-models|2.4 — AI models]]
- [[R - 2026-10-08-m02-a05-bigquery-ml|2.5 — BigQuery ML]]
- [[R - 2026-10-08-m02-a07-summary|2.7 — Summary]]

## Fontes
- Notas de aula do Módulo 2, derivadas das transcrições oficiais da
  plataforma Google Skills coladas por Leonardo em 2026-09-01 e 2026-10-08.
- Questão 1 do simulado: print do quiz oficial enviado por Leonardo em
  2026-10-08.
