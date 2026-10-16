---
title: Transcrição — Módulo 2, Aula 2.3 · AI infrastructure
aliases: []
tags: [aula, trabalho]
type: transcricao
area: trabalho
created: 2026-10-08
updated: 2026-10-08
status: seedling
fonte: transcricao
confianca: baixa
papel: fonte
indexar: false
summary: "Transcrição bruta (em inglês) da aula 2.3 — as três camadas da infraestrutura de IA, serviços de compute, chips (CPU/GPU/TPU), storage e o workflow data-to-AI."
resumo: "[[R - 2026-10-08-m02-a03-ai-infrastructure]]"
data: 2026-10-08
curso: "[[curso-intro-ai-ml-google-cloud]]"
professor: ""
related: []
---

# Transcrição — Módulo 2, Aula 2.3 · AI infrastructure

**Curso:** [[curso-intro-ai-ml-google-cloud|Introduction to AI and Machine Learning on Google Cloud]]
**Módulo:** 2 na ementa da plataforma — "Module 1, AI Foundations" na fala do instrutor
**Aula:** 2.3 · AI infrastructure (🎬 vídeo, ~6min40)
**Idioma:** inglês (transcrição oficial da plataforma)

Os conceitos, o conteúdo por tópico e as questões desta aula estão na nota
de estudo [[R - 2026-10-08-m02-a03-ai-infrastructure]] — esta nota guarda
só o texto bruto.

## Transcrição

```
00:00 SPEAKER: Building on the previous lesson where you explored Google's three-layered AI architecture, including AI infrastructure,
00:06 AI development, and AI applications and solutions, you'll now delve into the foundational layer, AI infrastructure.
00:15 Since its inception in 1998, Google has been dedicated to data and AI.
00:21 A decade later, in 2008, Google Cloud was introduced to offer secure and flexible cloud computing and storage solutions.
00:30 You can think of the AI infrastructure in terms of three layers.
00:35 At the base layer is networking and security, which lays the foundation to support all of Google's infrastructure and applications.
00:43 On the next layer, sit compute and storage.
00:46 Google Cloud separates, or decouples, as it's technically called, compute and storage, so they can scale independently based on need.
00:55 The top layer includes data and AI products, which enable you to perform tasks to ingest, store, process, and deliver business insights, data pipelines and ML models.
01:09 Thanks to Google Cloud technology, these tasks can be accomplished without needing to manage and scale the underlying infrastructure.
01:17 However, understanding some essentials about Google Cloud compute and storage can help you grasp the higher level data and AI products.
01:25 Let's begin with compute.
01:27 Organizations with growing data needs often require lots of compute power to run data and AI jobs.
01:34 And as organizations design for the future, the need for compute power only grows.
01:40 Google offers a range of computing services, from flexible infrastructure to fully managed serverless platforms, balancing control and convenience.
01:49 For example, Compute Engine-- high control, like managing a physical server; Google Kubernetes Engine, GKE-- control over containerized apps with orchestration benefits; Cloud Run-- serverless convenience.
02:05 Google manages infrastructure.
02:07 You might be familiar with the container platform GKE and serverless options like Cloud Run.
02:12 For more details, check out Google Documentation in the reading list.
02:17 Where does the processing power come from?
02:20 It's from the hardware, computer chips.
02:23 However, traditional computer chips like Central Processing Units, or CPUs, and even the more recent Graphics
02:28 Processing Units, or GPUs, may no longer scale to adequately reach the rapid demand for AI.
02:36 To help overcome this challenge, in 2016, Google introduced the Tensor Processing Unit, or TPU.
02:44 TPUs are Google's customized application-specific chips to accelerate AI workloads.
02:51 TPUs act as domain-specific hardware, as opposed to general-purpose hardware like CPUs and GPUs.
02:58 This allows for higher efficiency by tailoring the architecture to meet the computation needs in a domain, such as the matrix multiplication in machine learning.
03:09 Cloud TPUs, faster and more energy efficient than GPUs and CPUs for AI ML, are integrated across Google products, offering state-of-the-art supercomputing technology to Google Cloud customers.
03:23 Let's now examine storage.
03:25 For proper scaling capabilities, compute and storage are decoupled.
03:30 That is one major difference between Cloud and desktop computing.
03:33 With cloud computing, compute and storage can scale separately.
03:38 Most applications need a database and storage solution of some kind.
03:43 Your best option depends on your data type and business needs.
03:48 For unstructured data like documents, images, and audio files, cloud storage is your ideal choice.
03:56 Alternatively, if your data is structured, organized in tables, rows, and columns, you have options like BigQuery, AlloyDB for PostgreSQL, and others.
04:09 Note that BigQuery, Google's flagship data warehouse, is particularly versatile.
04:15 It's built for structured data and also highly optimized for semi-structured data like JSON.
04:22 It can even query unstructured data, such as log files or images stored in cloud storage, by creating an external table that provides a structured reference to that data.
04:35 This leads to the top layer of the Google Cloud infrastructure, data and AI products.
04:41 As you explored earlier, Google Cloud offers a comprehensive suite of data and AI tools.
04:46 How do you piece them together?
04:49 To build a data to AI project, you orchestrate these products through a data-to-AI workflow: ingest and process, store and analyze, and activate with AI.
05:00 First, ingest and process data from diverse sources, both real-time and batch, using tools like Pub/Sub, Dataflow, Managed Service for Apache Spark, and Cloud Data Fusion.
05:13 Next, store your data in solutions like Cloud Storage.
05:17 Then, analyze it with various tools.
05:20 Use BigQuery, AlloyDB, Cloud SQL, and Spanner for SQL databases.
05:26 Use Bigtable and Firestore for NoSQL databases.
05:30 Use Looker for visualization.
05:32 Finally, activate your insights with AI.
05:35 Train predictive models for forecasting, or leverage gen AI for content creation and action.
05:42 Agent Platform is the central AI development platform, offering products like Agent Studio on Gemini Enterprise Agent Platform,
05:51 Agent Platform AutoML, and Gemini Enterprise Agent Platform Notebooks for AI projects ranging from out-of-the-box solutions to custom builds.
06:00 These tools are seamlessly integrated on Google Cloud, enabling data scientists and AI developers to efficiently transition from data to AI.
06:10 For example, BigQuery offers embedded SQL commands to train an ML model, a feature you'll explore later.
06:17 Additionally, within Agent Platform Notebooks, you can easily pull data directly from BigQuery using SQL for advanced model training.
06:26 Don't let the variety of options overwhelm you.
06:29 You'll focus on BigQuery, the primary data warehouse, and Agent Platform, the AI development platform, later in this course.
06:36 But before that, let's get you ready with another fundamental topic, AI models, in the next lesson.
```
