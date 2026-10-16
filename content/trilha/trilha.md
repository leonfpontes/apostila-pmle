---
title: Trilha Professional Machine Learning Engineer (Google Cloud)
aliases: ["trilha PMLE", "Professional Machine Learning Engineer", "certificação PMLE", "trilha da certificação Google"]
tags: [projeto, trabalho]
type: project
area: trabalho
created: 2026-10-14
updated: 2026-10-16
status: ativo
fonte: documento
confianca: alta
papel: indice
indexar: true
deadline:
cliente: []
related: ["[[curso-intro-ai-ml-google-cloud]]", "[[trilha-pmle-cronograma]]", "[[pmle-guia-do-exame]]", "[[pmle-banco-de-questoes]]"]
---

# Trilha Professional Machine Learning Engineer (Google Cloud)

## Objetivo
Concluir os 15 módulos da trilha e fazer a prova **Professional Machine Learning Engineer**. Cronograma intensivo de 5 h/dia em [[trilha-pmle-cronograma]] (fim previsto em 26/10/2026, ou 30/10 sem fins de semana).

## Notas do projeto
- [[curso-intro-ai-ml-google-cloud]]: curso 1, concluído em 14/10/2026, com todas as aulas resumidas
- [[google-ai-ml-armadilhas-e-cheatsheet]]: revisão final do curso 1
- [[trilha-pmle-cronograma]]: plano dia a dia
- [[pmle-guia-do-exame]]: guia oficial do exame cruzado com os cursos da trilha (pesos, subseções, lacunas)
- [[pmle-banco-de-questoes]]: 283 questões de prática por seção e por curso, com gabarito revisado e simulador interativo

## Materiais da turma (planilha, aba "mapa geral para certificação")

| Material | Para quê | Link |
|---|---|---|
| Guia oficial do exame | Tópicos avaliados no exame | https://services.google.com/fh/files/misc/new_exam_guide.pdf |
| Inscrição na trilha | Tutorial para se tornar Google Cloud Partner Advantage | apresentação interna ATRA (link na planilha) |
| Acesso à trilha | Learning Path no Google Skills | https://partner.skills.google/paths/84 |
| Sample Questions | Prévia oficial do Google para medir a evolução | formulário do Google (link na planilha) |
| PPT de dicas | Como funciona a prova e dicas de estudo | apresentação interna (link na planilha) |
| Simulados | ExamTopics, Scribd e pasta com 285 questões (a base do [[pmle-banco-de-questoes]]) | examtopics.com · scribd.com · Drive da turma |
| Livro | Conteúdo do exame em 14 capítulos, com questões no fim de cada um | Drive da turma (link na planilha) |
| Simulado final ATRA | Dois simulados finais com questões novas | a ser disponibilizado |

**Regra da turma para marcar o exame:** só depois de acertar **acima de 85%** nos simulados finais.

Roteiro que a turma da Atra está seguindo: **15 módulos, ~56 h estimadas**, na
ordem da planilha de acompanhamento. O curso 1 tem hub próprio em [[curso-intro-ai-ml-google-cloud]].

Cronograma intensivo (5 h/dia, 15/10 a 26/10): [[trilha-pmle-cronograma]].

## Roteiro completo, item a item

Legenda: 🧪 lab · ✅ quiz · 📖 reading. Itens na ordem da planilha.

### 1. Introduction to AI and Machine Learning on Google Cloud · 8 h ✅

Ver [[curso-intro-ai-ml-google-cloud]] (ementa, aulas e material de estudo) e [[google-ai-ml-armadilhas-e-cheatsheet]].

### 2. Prepare Data for ML APIs on Google Cloud · 45 min

Só labs (Qwik Starts) e um challenge lab.

1. [DEPRECATED] Vertex AI: Qwik Start 🧪 — Leonardo ✅ 14/10
2. Alteryx Designer Cloud: Qwik Start 🧪 — Leonardo ✅ 14/10
3. Dataflow: Qwik Start - Templates 🧪 — Leonardo ✅ 14/10
4. Dataflow: Qwik Start - Python 🧪 — Leonardo ✅ 14/10
5. Managed Service for Apache Spark: Qwik Start - Console 🧪 ← **próximo do Leonardo**
6. Managed Service for Apache Spark: Qwik Start - Command Line 🧪
7. Cloud Natural Language API: Qwik Start 🧪
8. Speech-to-Text API: Qwik Start 🧪
9. Video Intelligence: Qwik Start 🧪
10. Prepare Data for ML APIs on Google Cloud: Challenge Lab 🧪
11. Tell us how we did! (pesquisa)

### 3. Create ML Models with BigQuery ML · 30 min

1. Getting Started with BigQuery ML 🧪
2. Predict Visitor Purchases with a Classification Model in BigQuery ML 🧪
3. Predict Taxi Fare with a BigQuery ML Forecasting Model 🧪
4. Bracketology with Google Machine Learning 🧪
5. Create ML Models with BigQuery ML: Challenge Lab 🧪

### 4. Engineer Data for Predictive Modeling with BigQuery ML · 30 min

1. Creating a Data Transformation Pipeline with Cloud Dataprep 🧪
2. ETL Processing on Google Cloud Using Dataflow and BigQuery (Python) 🧪
3. Predict Visitor Purchases with a Classification Model in BigQuery ML 🧪 *(repete o lab do curso 3)*
4. Engineer Data for Predictive Modeling with BigQuery ML: Challenge Lab 🧪

### 5. Production Machine Learning Systems · 16 h

O maior curso da trilha. Abre com o item *Advanced Machine Learning on Google Cloud*.

**Architecting production ML systems** — Welcome · Architecting ML systems ·
Data extraction, analysis, and preparation · Model training, evaluation, and
validation · Trained model, prediction service, and performance monitoring ·
Training design decisions · Serving design decisions · Designing from scratch ·
Using Vertex AI · Lab introduction: Structured data prediction · Quiz ✅ ·
Readings 📖

**Designing adaptable ML systems** — Introduction · Adapting to data · Changing
distributions · Lab: Adapting to data 🧪 · Right and wrong decisions · System
failure · Concept drift · Actions to mitigate concept drift · TensorFlow data
validation · Components of TensorFlow data validation · Lab: Introduction to
TensorFlow Data Validation 🧪 (+ intro) · Lab: Advanced Visualizations with
TensorFlow Data Validation 🧪 (+ intro; versão antiga marcada DEPRECATED) ·
Mitigating training-serving skew through design · Agent Platform: Training and
Serving a Custom Model 🧪 · Diagnosing a production model · Quiz ✅ · Readings 📖

**Designing high-performance ML systems** — Introduction · Training ·
Predictions · Why distributed training is needed · Distributed training
architectures · TensorFlow distributed training strategies · Mirrored strategy ·
Multi-worker mirrored strategy · TPU strategy · Parameter server strategy ·
Lab: Distributed Training with Keras 🧪 (+ intro) · Training on large datasets
with tf.data API · Lab Introduction: TPU-speed Data Pipelines · Inference ·
Quiz ✅ · Readings 📖

**Hybrid ML systems** — Introduction · Machine Learning on Hybrid Cloud ·
Kubeflow · Lab: Running Pipelines on Agent Platform 2.5 🧪 (intro: Kubeflow
Pipelines with AI Platform) · TensorFlow Lite · Optimizing TensorFlow for mobile ·
Summary · Quiz ✅ · Readings 📖

**Fechamento** — Course summary · Production ML systems readings 📖 · All quiz
questions and answers · Course resources · Course Survey

### 6. Machine Learning Operations (MLOps): Getting Started · 4 h 30 min

Course introduction · Introduction to MLOps: why and when to employ MLOps ·
ML practitioners' pain points · The concept of DevOps in ML · ML lifecycle ·
Automating the ML process · Quiz ✅ · Reading list 📖 · What is Vertex AI and why
does a unified platform matter? · Introduction to MLOps on Vertex AI · How does
Vertex AI help with the MLOps workflow, parts 1 e 2 · Reading list 📖 · Quiz ✅ ·
Building End to End MLOps Pipelines using Agent Platform 🧪 · Summary · All
readings 📖 · Course resources · Course Survey

### 7. MLOps with Agent Platform: Manage Features · 5 h

Course introduction · Recap: how Vertex AI helps with the MLOps workflow ·
Introduction to Vertex AI Feature Store (+ demo) · Main capabilities of Vertex AI
Feature Store · Data model in Vertex AI Feature Store · Lab: Feature Store:
Streaming Ingestion SDK 🧪 (+ intro) · Summary · Course Survey

### 8. Introduction to Generative AI · 45 min

Where Generative AI fits in the AI and ML landscape · Supervised and
unsupervised ML models · Quiz 1 ✅ · Generative AI as a subset of deep learning ·
Is it generative AI or not? · Defining generative AI: a formal approach · Quiz 2 ✅ ·
Transformers, hallucinations, and prompts · An overview of generative AI model
types · Quiz 3 ✅ · Generative AI for code generation · Leveraging Google Cloud
for enhanced generative AI · Quiz 4 ✅ · Reading 📖 · Course Survey

### 9. Introduction to Large Language Models · 1 h

Introduction to Large Language Models (vídeo) · Reading 📖 · Quiz ✅ · Course Survey

### 10. Machine Learning Operations (MLOps) for Generative AI · 30 min

Course introduction · The evolution of MLOps · MLOps framework for generative AI ·
Navigating generative AI: embracing nuances and adapting MLOps · Summary ·
Course Survey

### 11. Machine Learning Operations (MLOps) with Agent Platform: Model Evaluation · 2 h 30 min

Welcome · Introduction to model evaluation · Model evaluation within MLOps ·
Model evaluation challenges and solutions offered by Agent Platform · Quiz ✅ ·
Reading list 📖 · Challenges of evaluating generative AI tasks · The art and
science of evaluating LLMs · Beyond accuracy: evaluation metrics for generative
AI · Best practices for LLM evaluation · Solving evaluation challenges ·
Computation-based metrics · Model-based evaluation · Quiz ✅ · Reading list 📖 ·
Course summary · Course Survey

### 12. Create Generative AI Apps on Google Cloud · 4 h

**Generative AI applications** — Getting started · Introduction to generative AI
applications · Foundation models · Challenges of gen AI for applications ·
Summary · Quiz ✅

**Prompts** — Getting started · Introduction to prompts · Prompt structure ·
Prompt engineering · Summary · Quiz ✅ · Get Started with Agent Studio 🧪 *(o
mesmo lab do curso 1)*

**RAG** — Getting started · Improving foundation model accuracy · Retrieval
Augmented Generation (RAG) · Retrieving relevant data · RAG architecture using
Agent Platform · Summary · Quiz ✅ · Build an LLM and RAG-based Chat Application
with AlloyDB and Agent Platform 🧪

**Fechamento** — Course resources · Course Survey

### 13. Responsible AI for Developers: Fairness & Bias · 4 h

Course introduction · AI & responsibility · Google's AI Principles · Responsible
AI practices · Case study: Google Flights · Quiz ✅ · Overview of fairness and
bias · Identify bias: TFDV, What-if Tool, TFMA · Mitigate bias: data
intervention, threshold calibration, model remediation · Quiz ✅ · Course
summary · Reading 📖 · Course resources · Course Survey

### 14. Responsible AI for Developers: Interpretability & Transparency · 3 h

Course introduction · Overview of interpretability and transparency · Overview of
interpretability techniques · Feature-based explanations: model agnostic e model
specific · Concept-based and example-based explanations · Tools for
interpretability · Data and model transparency · Lab: Explaining an Image
Classification Model with Agent Platform Explainable AI 🧪 (intro: Vertex
Explainable AI) · Quiz ✅ · Course summary · Reading 📖 · Course resources · Course
Survey

### 15. Responsible AI for Developers: Privacy & Safety · 5 h

**Privacy** — Course introduction · Overview of AI privacy · Privacy in training
data: de-identification e randomization techniques · Privacy in ML training:
DP-SGD e federated learning · System security on Google Cloud · System security
on gen AI · Lab: Differential Privacy in Machine Learning with TensorFlow
Privacy 🧪 · Module 1 quiz ✅

**Safety** — Overview of AI safety · Safety evaluation · Harms prevention · Model
training for safety: instruction fine-tuning e RLHF · Safety in Google Cloud
GenAI · Lab: Safeguarding with Agent Platform Gemini API 🧪 · Module 2 quiz ✅

**Fechamento** — Course summary · Reading 📖 · Course resources · Course Survey
