---
title: Transcrição — Módulo 4, Aula 4.3 · Agent Platform AutoML
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
summary: "Transcrição bruta (em inglês) da aula 4.3 — o Agent Platform AutoML em profundidade: as quatro fases, neural architecture search, transfer learning e o ensemble dos melhores modelos."
resumo: "[[R - 2026-10-09-m04-a03-agent-platform-automl]]"
data: 2026-10-09
curso: "[[curso-intro-ai-ml-google-cloud]]"
professor: ""
related: []
---

# Transcrição — Módulo 4, Aula 4.3 · Agent Platform AutoML

**Curso:** [[curso-intro-ai-ml-google-cloud|Introduction to AI and Machine Learning on Google Cloud]]
**Módulo:** 4 na ementa da plataforma — "Module 3" na fala do instrutor
**Aula:** 4.3 · Agent Platform AutoML (🎬 vídeo, ~5min05)
**Idioma:** inglês (transcrição oficial da plataforma)

Os conceitos e a análise desta aula estão na nota de estudo
[[R - 2026-10-09-m04-a03-agent-platform-automl]] — esta nota guarda só o texto
bruto.

## Transcrição

```
00:00 In the previous lesson, you learned about Agent Platform, a unified platform that supports both AutoML, a no-code solution, and custom training, a code-based solution.
00:11 In this lesson, you'll explore Agent Platform AutoML in depth, including the technologies used to power automated ML development.
00:19 AutoML, which stands for automated machine learning, aims to automate the process to develop and deploy an ML model.
00:29 If you've worked with ML models before, you know that building them can be extremely time consuming, because you
00:34 need to repeatedly add new data and features, try different models, and tune parameters to achieve the best result.
00:43 When AutoML was first announced in January of 2018, the goal was to save the manual
00:48 work from data scientists and automate machine learning pipelines from pre-processing data to model training and deployment.
00:57 Since 2021, AutoML features have been embedded in Vertex AI, now Agent Platform, and have become part of the platform.
01:04 But how could this be done?
01:06 How can you trust AutoML to generate the best results without bias and fast?
01:12 Let's look deeper to explore how AutoML works and the main technologies behind it.
01:19 Agent Platform AutoML is powered by the latest research from Google.
01:23 It's an ongoing endeavor.
01:24 There are four distinct phases.
01:26 Phase one is data processing.
01:28 After you upload a dataset, Agent Platform AutoML provides functions to automate part of the data preparation process.
01:36 For example, it can covert numbers, datetime, text, categories, arrays of categories, and nested fields
01:43 into a certain format of data so that it can be fed into an ML model.
01:50 Phase two includes searching the best models and tuning the parameters.
01:55 Two critical technologies support this auto search.
01:59 The first one is called neural architecture search, which helps search the best models and tune the parameters automatically.
02:06 And the second one is called transfer learning, which helps speed the search by using the pre-trained models.
02:12 Let's first look at neural architecture search.
02:15 The goal of neural architecture search is to find optimal models among many options.
02:20 Specifically, Agent Platform AutoML tries different architectures and models, and compares the performance of the models to find the best ones.
02:30 For instance, Agent Platform AutoML can search through multiple advanced ML models and automatically tune the parameters to find the best fit for your data.
02:40 Secondly, let's examine transfer learning.
02:44 Machine learning is similar to human learning.
02:47 It learns new things based on existing knowledge.
02:51 Agent Platform AutoML has already trained many different models with large amounts of data.
02:56 These trained models can be used as a foundation model to solve new problems with new data.
03:02 A typical example are large language models, or LLMs, which are general purpose and can be pre-trained and fine-tuned for specific purposes.
03:13 LLMs are trained for general purposes to solve common language problems such as text classification, question answering, document summarization, and text generation across industries.
03:26 The models can then be tailored to solve specific problems in different fields such as retail, finance, and entertainment, using a relatively small size of field datasets.
03:37 Transfer learning is a powerful technique that lets people with smaller datasets or less computational power achieve great results by using pre-trained models trained on similar, larger datasets.
03:50 Because the model learns through transfer learning, it doesn't have to learn from the beginning.
03:54 So it can generally reach higher accuracy with much less data and computation time than models that don't use transfer learning.
04:03 In phase three, the best models are assembled from phase 2 and prepared for prediction in phase 4.
04:09 Note that Agent Platform AutoML does not rely on one single model, but on the top number of models.
04:16 The number of models depends on the training budget, but is typically around ten.
04:20 The assembly can be as simple as averaging the predictions of the top number of models.
04:25 Relying on multiple top models instead of one greatly improves the accuracy of prediction.
04:32 By applying these advanced ML technologies, Agent Platform AutoML automates the pipeline from feature engineering, to architecture search, to hyperparameter tuning, and to model ensemble.
04:44 It might seem that Agent Platform AutoML can do a better job than a human to find the optimal models that fit your data.
04:52 Perhaps, the best feature of Agent Platform AutoML is that it provides a no-code solution.
04:58 You can point and click through a UI to build an ML model with your own data.
05:02 You'll walk through the details from preparing training data, to train your model, and finally get prediction in the next module.
```
