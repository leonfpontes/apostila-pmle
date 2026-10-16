---
title: Transcrição — Módulo 5, Aula 5.5 · MLOps and workflow automation
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
summary: "Transcrição bruta (em inglês) da aula 5.5 — MLOps e automação de workflow: a definição de MLOps, KFP × TFX, os dois ambientes de um pipeline, os pipeline components, as três fases de automação e o exemplo completo do pipeline de classificação de feijões."
resumo: "[[R - 2026-10-09-m05-a05-mlops-and-workflow-automation]]"
data: 2026-10-09
curso: "[[curso-intro-ai-ml-google-cloud]]"
professor: ""
related: []
---

# Transcrição — Módulo 5, Aula 5.5 · MLOps and workflow automation

**Curso:** [[curso-intro-ai-ml-google-cloud|Introduction to AI and Machine Learning on Google Cloud]]
**Módulo:** 5 na ementa da plataforma — "Module 4" na fala do instrutor
**Aula:** 5.5 · MLOps and workflow automation (🎬 vídeo, ~6min15)
**Idioma:** inglês (transcrição oficial da plataforma)

Os conceitos e a análise desta aula estão na nota de estudo
[[R - 2026-10-09-m05-a05-mlops-and-workflow-automation]] — esta nota guarda só o
texto bruto.

## Transcrição

```
00:00 In this lesson, you explore an advanced topic: MLOps and workflow automation.
00:06 You learned from the previous lessons to build an ML model through three main stages: data preparation, model development, and model serving.
00:15 You have two approaches to build an end-to-end workflow.
00:18 One is codeless through Google Cloud console, like Agent Platform AutoML.
00:23 But what if you want to automate this workflow to achieve continuous integration, training, and delivery?
00:29 Here comes the other option: to code a pipeline that automates the ML workflow.
00:35 Machine learning operations, or MLOps, play a big role.
00:38 MLOps combines machine learning development with operations and applies similar principles from DevOps (or development operations) to machine learning models.
00:48 MLOps aims to solve production challenges related to machine learning.
00:52 In this case, this refers to building an integrated machine learning system and operating it in production.
00:58 These are considered to be some of the biggest pain points by the ML practitioners' community because both data and code are constantly evolving in machine learning.
01:06 Practicing MLOps means automating and monitoring each step of the ML system construction to enable continuous integration, training, and delivery.
01:16 The backbone of MLOps on Agent Platform is a toolkit called Agent Platform Pipelines.
01:22 This toolkit supports both Kubeflow Pipelines, or KFP, and TensorFlow Extended, or TFX.
01:30 If you already use TensorFlow to build ML models that process terabytes of structured data, it makes sense to use TFX and turn that code into an ML pipeline.
01:39 Otherwise, KFP can be a good alternative.
01:43 An ML pipeline contains a series of processes and runs in two different environments.
01:49 First is the experimentation, development, and test environment.
01:53 And second is the staging, pre-production, and production environment.
01:57 In the development environment, you start from data preparation which includes data extraction, analysis, and preparation to model development like training, evaluation, and validation.
02:07 The result is a trained model that can be entered in the model registry.
02:11 Once the model is trained, the pipeline moves to the staging and production environment, where you serve the model, which includes prediction and monitoring.
02:20 Each of these processes can be a pipeline component, which is a self-contained set of code that performs one task of a workflow.
02:26 You can think of a component as a function, which is a building block of a pipeline.
02:32 You can either build a custom component on your own or leverage the pre-built components provided by Google.
02:37 If you want to accomplish a specific task to tailor your ML workflow, such as determining a special threshold for model deployment, you may need to code a custom component.
02:46 Before doing so, check the pre-built components offered by Google Cloud.
02:50 You may find a pipeline component to reuse or customize to suit your needs.
02:54 Learn more about using Google Cloud pipeline components in your pipeline in the reading list.
02:59 All these components are like pieces of an ML pipeline.
03:02 You need to assemble them together to automate the entire ML workflow.
03:06 Organizations often implement ML automation in three phases.
03:10 Phase zero is the starting point, where you have not configured any MLOps.
03:14 You typically use the graphical user interface, or GUI, based workflow such as Agent Platform AutoML for training, deployment, and serving.
03:24 Phase zero is critical because it helps you build an end-to-end workflow manually before you automate it.
03:30 In phase one, you start automating your ML workflow by building components using the Agent Platform Pipelines SDKs.
03:38 An example of a component would be the training pipeline.
03:41 It is in this phase that you develop the building blocks for future use.
03:45 In phase two, you integrate the separate components to form an entire workflow and to achieve CI, CT, and CD.
03:53 Let's look at an example.
03:54 Assume you want to build a pipeline to train, evaluate, and deploy an Agent Platform AutoML model that classifies beans into 1 of 7 types based on their characteristics.
04:05 You have two main steps: build a pipeline and then run it.
04:10 To build a pipeline, you first plan it as a series of components, which can be a combination of custom and pre-built.
04:16 To promote reusability, each component should have a single responsibility.
04:20 Second, you build any custom components that are needed.
04:24 For example, you create a component called classification_model_eval_metrics.
04:28 You use this component to compare the evaluation metrics to a threshold after the model is trained, and determine whether the model should be deployed.
04:36 If the model performs well, you deploy it.
04:39 Otherwise, you retrain the model.
04:41 Third, you assemble the pipeline by adding pre-built components, for example: TabularDatasetCreateOp creates a tabular dataset in Agent Platform given a dataset source either in Cloud Storage or BigQuery.
04:55 AutoMLTabularTrainingJobRunOp kicks off an Agent Platform AutoML training job for a tabular dataset.
05:03 EndpointCreateOp creates an endpoint in Agent Platform.
05:07 And ModelDeployOp deploys a given model to an endpoint in Agent Platform.
05:12 You also include a custom component from the previous step, classification_model_eval_metrics, to compare the performance of the trained model to a threshold.
05:20 After the pipeline is built, you must compile and run it.
05:23 First, you compile it using the compiler.Compiler().
05:26 compile() or compile() commands.
05:29 And then, you define and run the pipeline job.
05:33 The good news is you don't have to create a pipeline from the beginning.
05:36 Agent Platform provides a few templates, like the one for the classification or regression of tabular data with Agent Platform AutoML, to help you start your journey.
05:47 Now you have an automated pipeline to train, evaluate, and deploy an ML model.
05:51 This pipeline will check the performance of the model constantly and decide whether it should be deployed or retained without your intervention.
05:59 The nice thing is that Google Cloud also visualizes the pipeline based on the coding, with which you can easily check the components and the corresponding artifacts.
06:07 This example demonstrated the overall process to build a pipeline.
06:12 To know more about pipeline details, please practice with the coding example in the demo: Introduction to Agent Platform Pipelines, which is available in the reading list for this course.
```

## Fontes
- Transcrição oficial da plataforma Google Skills, colada por Leonardo em 2026-10-09
