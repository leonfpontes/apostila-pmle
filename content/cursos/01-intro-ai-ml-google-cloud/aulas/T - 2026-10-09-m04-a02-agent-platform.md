---
title: Transcrição — Módulo 4, Aula 4.2 · Agent Platform
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
summary: "Transcrição bruta (em inglês) da aula 4.2 — a Agent Platform como plataforma unificada de desenvolvimento de IA: os desafios de produção e usabilidade, os quatro estágios do pipeline de ML e os quatro Ss."
resumo: "[[R - 2026-10-09-m04-a02-agent-platform]]"
data: 2026-10-09
curso: "[[curso-intro-ai-ml-google-cloud]]"
professor: ""
related: []
---

# Transcrição — Módulo 4, Aula 4.2 · Agent Platform

**Curso:** [[curso-intro-ai-ml-google-cloud|Introduction to AI and Machine Learning on Google Cloud]]
**Módulo:** 4 na ementa da plataforma — "Module 3" na fala do instrutor
**Aula:** 4.2 · Agent Platform (🎬 vídeo, ~4min15)
**Idioma:** inglês (transcrição oficial da plataforma)

Os conceitos e a análise desta aula estão na nota de estudo
[[R - 2026-10-09-m04-a02-agent-platform]] — esta nota guarda só o texto bruto.

## Transcrição

```
00:00 Before exploring various options of build an ML model, you first need to familiarize yourself with the playground, Agent Platform, Google's unified AI development platform.
00:11 For years now, Google has invested time and resources into developing data and AI, and applied these technologies to
00:18 many of its products and services, like Gmail, Google Maps, Google Photos, and Google Translate, just to name a few.
00:26 But developing these technologies doesn't come without challenges.
00:31 There are challenges around getting ML models into production.
00:34 For example, scalability, monitoring, and continuous integration, delivery, and training.
00:41 In fact, according to Gartner, only half of enterprise ML projects get past the pilot phase.
00:47 There are also ease-of-use challenges.
00:50 Many tools on the market require advanced coding skills, which can take a data scientist's focus away from model configuration.
00:58 Without a unified workflow, data scientists often have difficulties finding tools.
01:04 Google's solution to many of the production and ease-of-use challenges is Agent Platform, a unified platform that brings all the components of the machine learning ecosystem and workflow together.
01:16 So, what exactly does a unified platform mean?
01:19 There are two primary aspects: Firstly, it means that Agent Platform provides an end-to-end ML pipeline to prepare data, and create, deploy, and manage models over time and at scale.
01:32 For instance, during the data readiness stage, users can upload data from wherever it's stored: Cloud Storage, BigQuery, or a local machine.
01:42 Then, during the feature readiness stage, users can create features, which are the processed data that will be put into the model.
01:49 Then, they can share them with others by using the feature store.
01:52 After that, it's time for training and hyperparameter tuning.
01:56 This means that when the data is ready, users can experiment with different models and adjust hyperparameters.
02:03 And finally, during deployment and model monitoring, users can set up the pipeline to transform the model into production by automatically monitoring and performing continuous improvements.
02:14 You'll learn how to do this later in the course, when you explore MLOps.
02:19 Second, Agent Platform is a unified platform that encompasses both generative AI, enabling creation of multimodal content, and predictive AI, allowing for forecasting and classification.
02:32 You already explored gen AI tools in the previous module, like Agent Studio and ADK.
02:38 Let's focus on the tools for predictive AI.
02:41 Agent Platform allows users to build ML models with either Agent Platform AutoML, a no-code solution, or custom training, a code-based solution.
02:52 Agent Platform AutoML provides a UI that is easy to navigate.
02:57 It lets data scientists focus on what business problems to solve instead of how to code and deploy an ML solution.
03:05 Custom training gives data scientists and ML engineers more control over the development environment and process.
03:11 They can use tools like Agent Platform Workbench and Agent Platform Colab Enterprise to do their ML projects themselves.
03:19 One convenient feature is that data scientists can now write SQL with Agent Platform Workbench to seamlessly connect BigQuery and Agent Platform.
03:28 Being able to perform such a wide range of tasks in one unified platform has many benefits.
03:34 This can be summarized with four Ss: It's seamless.
03:37 Agent Platform provides a smooth user experience from uploading and preparing data all the way to model training and production.
03:45 It's scalable.
03:47 The machine learning operations provided by Agent Platform help to monitor and manage the ML production and therefore scale the storage and computing power automatically.
03:56 It's sustainable.
03:58 All of the artifacts and features created using Agent Platform can be reused and shared.
04:03 And it's speedy.
04:05 Agent Platform produces models that have significantly less lines of code than competitors.
04:11 Let's take a deep dive into ML model building options in the next lesson.
```

## Fontes
- Transcrição oficial da plataforma Google Skills, colada por Leonardo em 2026-10-09
