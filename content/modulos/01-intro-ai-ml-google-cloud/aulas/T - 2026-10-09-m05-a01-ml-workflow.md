---
title: Transcrição — Módulo 5, Aula 5.1 · ML workflow
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
summary: "Transcrição bruta (em inglês) da aula 5.1 — abertura do Módulo 5 e visão geral do workflow de ML: a analogia do restaurante, os três estágios, dados estruturados e não estruturados, a natureza iterativa do workflow e as duas formas de montá-lo."
resumo: "[[R - 2026-10-09-m05-a01-ml-workflow]]"
data: 2026-10-09
curso: "[[curso-intro-ai-ml-google-cloud]]"
professor: ""
related: []
---

# Transcrição — Módulo 5, Aula 5.1 · ML workflow

**Curso:** [[curso-intro-ai-ml-google-cloud|Introduction to AI and Machine Learning on Google Cloud]]
**Módulo:** 5 na ementa da plataforma — "Module 4" na fala do instrutor
**Aula:** 5.1 · ML workflow (🎬 vídeo, ~4min30)
**Idioma:** inglês (transcrição oficial da plataforma)

Os conceitos e a análise desta aula estão na nota de estudo
[[R - 2026-10-09-m05-a01-ml-workflow]] — esta nota guarda só o texto bruto.

## Transcrição

```
00:00 In the previous module, you learned about different options to develop an AI project on Google Cloud, from a ready-to-use
00:06 approach like pre-trained APIs to low or no-code solutions like Agent Platform AutoML, and to DIY solutions, such as custom training.
00:19 Then, how do you build an ML model step-by-step?
00:22 You'll find out in this module.
00:25 You begin with an overview of the ML workflow, then dive into each of the three workflow stages from data preparation to model development and finally model serving.
00:36 Next, you investigate machine learning operations, or MLOps, which takes ML models from development to production in the back end.
00:45 You'll be shown an example of how to build a pipeline to automate the production using Agent Platform Pipelines.
00:52 A hands-on lab will then help you walk through the three stages to build an ML model with Agent Platform AutoML.
00:59 Gaining a solid grasp of ML terminology requires a clear understanding of how a neural network learns.
01:06 This module offers an optional lesson that delves into the neural network's learning process, along with the key terminologies.
01:14 If you're already familiar with the ML theories, feel free to skip this lesson.
01:18 Let's get started with the ML workflow.
01:22 Building an ML model is actually not too different from serving food in a restaurant.
01:27 You start by preparing raw ingredients and finish by serving the dishes on the table.
01:33 There are three main stages to the ML workflow with Agent Platform.
01:37 The first stage is data preparation, which includes two steps: data uploading and feature engineering.
01:44 A model needs a large amount of data to learn from.
01:47 The quality and quantity of the data decide how much and how well the machine learns.
01:53 The data used in machine learning can be real-time streaming data or batch data.
01:58 The data can also be structured or unstructured.
02:02 Structured data is data that can be easily stored in tables, such as numbers and text.
02:07 Unstructured data is data that cannot be easily stored in tables, such as images and videos.
02:14 The second stage of the ML workflow is model development.
02:17 A model needs a tremendous amount of iterative training.
02:20 This is when training and evaluation form a cycle to train a model, then evaluate the model, and then train the model some more.
02:29 The third and final stage is model serving.
02:32 A model needs to actually be used in order to predict results.
02:36 This is when the machine learning model is deployed and monitored.
02:40 If you don't move an ML model into production, it has no use and remains only a theoretical model.
02:46 Compare this process to serving food in a restaurant.
02:50 Data preparation is when you prepare the raw ingredients, model development is when you experiment with
02:55 different recipes, and model serving is when you finalize the menu to serve the meal to customers.
03:02 Now, it's important to note that an ML workflow isn't linear, it's iterative.
03:06 For example, during model training, you might need to return to the raw data and generate more useful features to feed the model.
03:14 When monitoring the model during model serving, you might find data drifting or the accuracy of your prediction might suddenly drop.
03:22 You might need to check the data sources and adjust the model parameters.
03:26 Fortunately, these steps can be automated with MLOps.
03:30 You'll learn more about this later in this module.
03:33 Although the main stages remain the same, you have two options to set up the workflow with Agent Platform: The
03:39 first choice is to use Agent Platform AutoML, a no-code solution that lets you build an ML model through UI.
03:48 It's user friendly and doesn't require a lot of ML expertise.
03:52 Also, no coding skills are needed.
03:54 Alternatively, you can code the workflow with Agent Platform Workbench or Agent Platform Colab Enterprise using Agent Platform Pipelines.
04:04 Agent Platform Pipelines is essentially a tool kit that includes pre-built SDKs and software development kits, which are the building blocks of a pipeline.
04:14 Coding the pipeline is a good option if you're an experienced ML engineer or data scientist and want to automate the workflow programmatically.
04:23 Let's focus on Agent Platform AutoML first and then explore the code-based approach later in this module.
```
