---
title: Transcrição — Módulo 5, Aula 5.2 · Data preparation
aliases: []
tags: [aula, trabalho]
type: transcricao
area: trabalho
created: 2026-10-09
updated: 2026-10-09
status: seedling
fonte: transcricao
confianca: baixa
papel: fonte
indexar: false
summary: "Transcrição bruta (em inglês) da aula 5.2 — o primeiro estágio do workflow de ML: upload de dados, os três objectives para dados tabulares, feature engineering e o Agent Platform Feature Store com seus quatro passos e quatro benefícios."
resumo: "[[R - 2026-10-09-m05-a02-data-preparation]]"
data: 2026-10-09
curso: "[[curso-intro-ai-ml-google-cloud]]"
professor: ""
related: []
---

# Transcrição — Módulo 5, Aula 5.2 · Data preparation

**Curso:** [[curso-intro-ai-ml-google-cloud|Introduction to AI and Machine Learning on Google Cloud]]
**Módulo:** 5 na ementa da plataforma — "Module 4" na fala do instrutor
**Aula:** 5.2 · Data preparation (🎬 vídeo, ~3min05)
**Idioma:** inglês (transcrição oficial da plataforma)

Os conceitos e a análise desta aula estão na nota de estudo
[[R - 2026-10-09-m05-a02-data-preparation]] — esta nota guarda só o texto bruto.

## Transcrição

```
00:00 Let's start with the first stage of ML workflow, data preparation.
00:05 During this stage, you must upload data and then prepare it for model training with feature engineering.
00:12 The data can come from Cloud Storage, BigQuery, or even your local machine.
00:17 AutoML now mainly supports tabular data by solving different types of problems, called objectives.
00:24 For tabular data, you can train the model to solve regression, classification, or forecasting problems.
00:31 Forecasting is vital to many industries like retail.
00:36 After the data is uploaded to Agent Platform AutoML, the next step is preparing it for model training with feature engineering.
00:45 Imagine you're preparing a meal.
00:47 Your data is like your ingredients, such as carrots, onions, and tomatoes.
00:52 Before you start cooking, you'll need to peel the carrots, chop the onions, and rinse the tomatoes.
00:57 This is what feature engineering is like: the data must be processed before the model starts training.
01:04 A feature refers to a factor that contributes to the prediction.
01:08 It's like an independent variable in statistics or a column in a table.
01:13 Preparing features can be both challenging and tedious.
01:17 To help, Agent Platform provides a service called Agent Platform Feature Store, which is a centralized repository to manage, serve, and share features.
01:27 It aggregates the features from different sources in BigQuery and makes them available for both real-time (often called online) and batch (often called offline) serving.
01:37 Agent Platform automates the feature aggregation to scale the process with low latency.
01:43 Additionally, Agent Platform Feature Store is ready for generative AI.
01:48 It can manage and serve embeddings, which are the data sources in gen AI.
01:52 It also supports retrieving similar items in real time, ensuring low latency.
01:58 The workflow of serving real-time (online) features with Agent Platform Feature Store can be summarized as follows:
02:05 1. Prepare the data source in BigQuery.
02:09 2. Optional: Register the data sources by creating feature groups and features.
02:15 3. Configure the connection by creating a feature view to define which features to copy from your data source into the online store for real-time serving.
02:26 4. Serve the latest feature values online from a feature view.
02:31 So what are the benefits of Agent Platform Feature Store?
02:35 First, features are shareable for training and serving.
02:38 They are managed and served from a central repository, maintaining consistency across your organization.
02:44 Second, features are reusable.
02:47 This helps to save time and reduces duplicated efforts.
02:51 Third, features are scalable.
02:53 They automatically scale to provide low-latency serving, so you can focus on developing the logic to create them without worrying about deployment.
03:01 And fourth, features are easy to use.
03:04 Agent Platform Feature Store is built on an easy-to-navigate user interface.
```

## Fontes
- Transcrição oficial da plataforma Google Skills, colada por Leonardo em 2026-10-09
