---
title: Transcrição — Módulo 4, Aula 4.1 · AI development options
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
summary: "Transcrição bruta (em inglês) da aula 4.1 — abertura do Módulo 4 e comparação das quatro opções de desenvolvimento de IA no Google Cloud: pre-trained APIs, BigQuery ML, Agent Platform AutoML e custom training."
resumo: "[[R - 2026-10-09-m04-a01-ai-development-options]]"
data: 2026-10-09
curso: "[[curso-intro-ai-ml-google-cloud]]"
professor: ""
related: []
---

# Transcrição — Módulo 4, Aula 4.1 · AI development options

**Curso:** [[curso-intro-ai-ml-google-cloud|Introduction to AI and Machine Learning on Google Cloud]]
**Módulo:** 4 na ementa da plataforma — "Module 3" na fala do instrutor
**Aula:** 4.1 · AI development options (🎬 vídeo, ~4min50)
**Idioma:** inglês (transcrição oficial da plataforma)

Os conceitos e a análise desta aula estão na nota de estudo
[[R - 2026-10-09-m04-a01-ai-development-options]] — esta nota guarda só o texto
bruto.

## Transcrição

```
00:00 In the previous module, you explored cutting-edge technologies about generative AI.
00:04 But what if you want to create predictive AI for traditional AI tasks like forecasting and classification?
00:11 How do you build an ML model, and what options do you have?
00:15 Find the answers in this module.
00:17 You begin by comparing AI development options on Google Cloud from no-code to low-code.
00:23 And finally, a do-it-yourself approach.
00:26 These options apply to both gen AI and predictive AI.
00:30 You are then introduced to Agent Platform, Google's unified AI development platform and your playground to build an ML model from end-to-end.
00:38 After that, you take a deep dive into how each of three options works: Agent Platform AutoML, pre-trained APIs, and custom training.
00:47 Never miss a practice!
00:49 You conclude with hands-on experience using the Natural Language API to identify subjects and analyze sentiment in text.
00:57 Let's start with Google Cloud's AI development options.
01:00 What choices do you have for both generative AI and predictive AI projects?
01:04 And how do you make the right decision?
01:06 Let's find out!
01:08 Imagine transforming your organization's business model and operations with AI.
01:13 Perhaps you're a business user without a technical background, but you're eager to prototype business ideas using AI.
01:20 What are your options?
01:21 Or maybe you're a data scientist with training data looking to build a custom ML model without spending hours tuning parameters from scratch.
01:29 What choices do you have?
01:30 Even if you're an ML engineer who enjoys a do-it-yourself approach to building ML pipelines, what tools can you utilize?
01:39 Google Cloud can help you achieve your goals by meeting you where you are, offering no-code out-of-box
01:44 solutions like Gemini Enterprise app and Gemini Enterprise for CX, introduced in the previous gen AI module.
01:52 No-to-low-code solutions like Agent Platform AutoML, which helps you build your own ML models through point-and-click.
01:58 Low-code solutions like preconfigured APIs, which use pre-trained ML models, eliminating the need to build your own if you lack training data or in-house ML expertise.
02:09 Code-based approaches, ranging from BigQuery ML and ADK, both introduced earlier, to completely DIY custom training.
02:17 Beyond technical expertise, how do you choose the right tool to build an ML model?
02:22 This brief guide comparing four options— pre-trained APIs, BigQuery ML, Agent Platform AutoML, and custom training— may offer some insight.
02:31 BigQuery ML only supports tabular data and semi-structured data like JSON files, Agent Platform AutoML
02:36 supports tabular and image data, whereas the other two support tabular data, images, text, and video.
02:44 Pre-trained APIs also process audio.
02:47 In terms of training data size, pre-trained APIs do not require any training data.
02:52 Whereas BigQuery ML and custom training require a large amount of data.
02:57 Pre-trained APIs and Agent Platform AutoML are user friendly with low requirements for machine learning and
03:02 coding expertise, whereas custom training has the highest requirement, and BigQuery ML requires you to understand SQL.
03:10 At the moment, you can't tune the hyperparameters with pre-trained APIs or Agent Platform AutoML.
03:17 However, you can experiment with hyperparameters by using BigQuery ML and custom training.
03:22 Pre-trained APIs require no time to train a model because they directly use pre-trained models from Google.
03:27 The time to train a model for the other three options depends on the specific project.
03:32 Normally, custom training takes the longest time, because it builds the ML model from the beginning, unlike Agent Platform AutoML and BigQuery ML.
03:41 The best option depends on your business needs and ML expertise.
03:45 Budget is also an important consideration.
03:47 Visit Google Cloud's website for detailed pricing information.
03:51 If you have little ML experience and no intention to train your own ML models, using pre-trained APIs might be the best choice.
03:58 Pre-trained APIs address common perceptual tasks such as vision, video, and natural language.
04:05 They are ready to use without any model development effort.
04:08 If your data engineers, scientists, or analysts are familiar with SQL and already have data in BigQuery, BigQuery ML lets you use SQL queries to build predefined ML models.
04:19 If you wish to build custom models with your own training data while you spend minimal time coding, then Agent Platform AutoML is your choice.
04:26 Agent Platform AutoML allows you to focus on business problems instead of the underlying model architecture and provisioning.
04:33 If your ML engineers and data scientists want full control of the ML workflow, Agent Platform custom training lets you
04:38 train and serve custom models with code on Gemini Enterprise Agent Platform Workbench or Gemini Enterprise Agent Platform Colab Enterprise.
04:48 Before delving into these options, the next lesson will introduce Agent Platform, Google Cloud's AI development platform.
```

## Fontes
- Transcrição oficial da plataforma Google Skills, colada por Leonardo em 2026-10-09
