---
title: Transcrição — Módulo 2, Aula 2.5 · BigQuery ML
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
summary: "Transcrição bruta (em inglês) da aula 2.5 — BigQuery como storage + engine SQL, e as cinco fases de um projeto de ML no BigQuery ML com os comandos CREATE MODEL, ML.EVALUATE e ML.PREDICT."
resumo: "[[R - 2026-10-08-m02-a05-bigquery-ml]]"
data: 2026-10-08
curso: "[[curso-intro-ai-ml-google-cloud]]"
professor: ""
related: []
---

# Transcrição — Módulo 2, Aula 2.5 · BigQuery ML

**Curso:** [[curso-intro-ai-ml-google-cloud|Introduction to AI and Machine Learning on Google Cloud]]
**Módulo:** 2 na ementa da plataforma — "Module 1, AI Foundations" na fala do instrutor
**Aula:** 2.5 · BigQuery ML (🎬 vídeo, ~6min15)
**Idioma:** inglês (transcrição oficial da plataforma)

Os conceitos, o conteúdo por tópico e as questões desta aula estão na nota
de estudo [[R - 2026-10-08-m02-a05-bigquery-ml]] — esta nota guarda só o
texto bruto.

## Transcrição

```
00:00 SPEAKER: With the different types of ML models in your mind, let's apply concept to practice.
00:05 In this lesson, you explore BigQuery ML and walk through the steps to build an ML model with SQL commands.
00:13 You learned about BigQuery, the primary data analytics tool on Google Cloud, from the previous lesson.
00:19 BigQuery provides two services in one.
00:22 It's a fully managed storage facility to load and store data sets and a fast, SQL-based analytical Engine.
00:30 The two services are connected by Google's high-speed, internal network.
00:34 It's this super-fast network that allows BigQuery to scale both storage and compute independently, based on demand.
00:43 Although BigQuery started out solely as a data warehouse, over time, it has evolved to provide features that
00:49 support the data-to-AI lifecycle, meaning you can perform both data analytics and build predefined ML models within BigQuery.
00:58 In this lesson, you explore BigQuery's capabilities to build ML models and walk through the steps and key SQL commands to do so.
01:06 If you've worked with ML models before, you know that building and training them can be very time-intensive.
01:12 You must first import and prepare the data.
01:15 Then, experiment with different ML models and tune the parameters.
01:19 To improve model performance, you also need to go back and forth to train the model with new data and features.
01:26 And finally, you need to deploy the model to make predictions.
01:29 This is an iterative process that requires a lot of time and resources.
01:34 Now, with BigQuery ML, you can manage tabular data and execute ML models in one place with just a few steps.
01:42 BigQuery ML tunes the parameters for you and helps you manage the ML workflow.
01:48 Let's walk through the phases of a machine learning project and the key SQL commands.
01:53 In phase 1, you extract, transform, and load data into BigQuery if it isn't there already.
02:00 If you're already using other Google products, like YouTube, for example, look out for easy connectors to get that data into BigQuery before you build your own pipeline.
02:10 You can enrich your existing data warehouse with other data sources by using SQL joins.
02:15 In phase 2, you select and preprocess features.
02:19 You can use SQL to create the training data set for the model to learn from.
02:24 BigQuery ML does some of the preprocessing for you, like one-hot encoding of your categorical variables.
02:31 One-hot encoding converts your categorical data into numeric data that is required by a training model.
02:37 In phase 3, you create the model inside BigQuery.
02:41 This is done by using the CREATE MODEL command.
02:44 In this example, you want to create an ML model to predict customer purchasing behavior, specifically if they will buy this product in the future.
02:53 You give the model a name, ecommerce.classification.
02:57 You then specify the model type.
02:59 Remember the previous lesson about ML model types?
03:03 If you want to predict whether a customer will buy or not, which ML model should you use?
03:10 That's right.
03:11 A logistic regression model is the answer because you are solving a classification problem.
03:18 Apart from the logistic regression model to solve the classification problem, BigQuery ML also supports other popular ML models.
03:26 They include regression models, such as linear regression, and other models, such as k-means clustering and time series forecasting models.
03:35 In addition to providing different types of machine learning models, BigQuery ML supports MLOps, Machine Learning Operations.
03:43 MLOps turns your ML experiment to production and helps deploy, monitor, and manage the ML models.
03:50 You'll learn more about MLOps later in this course.
03:54 You're recommended to start with simple options, such as logistic regression and linear regression, and use the results as a benchmark to
04:01 compare against more complex models, such as DNN, Deep Neural Networks, which take more time, and computing resources to train and deploy.
04:10 After specifying the model type, you also need to define the label column.
04:15 Why?
04:16 Remember the two major categories of ML models, supervised and unsupervised?
04:22 The former deals with labeled data and predicts a goal, whereas, the latter handles unlabeled data and identifies a hidden pattern.
04:29 Is this a supervised or unsupervised model?
04:33 Of course, it's a supervised classification problem.
04:37 Thus, a labeled column.
04:39 From there, you can run the query.
04:41 In phase 4, after your model is trained, you can execute an ML.EVALUATE query to evaluate the performance of the trained model on your evaluation data set.
04:54 It's here that you specify which evaluation metrics the model will assess, such as accuracy, precision, and recall.
05:03 You'll explore these metrics later in this course.
05:06 Finally, in phase 5, when you're happy with your model performance, you can then use it to make predictions.
05:13 To do so, invoke the ML.PREDICT command on your newly trained model to return with predictions and the model's confidence in those predictions.
05:24 With the results, your label field will have "predicted" added to the field name.
05:30 This is your model's prediction for that label.
05:33 Ready for hands-on practice?
05:35 Let's apply these steps and build your first ML model in BigQuery.
05:40 In the upcoming lab, you'll use real e-commerce data from the Google Merchandise Store to predict whether a visitor will make future purchases.
05:51 You'll gain valuable experience creating data sets, training and evaluating ML models, and using them for predictions.
06:00 Don't worry if SQL isn't your strong suit.
06:03 Gemini Code Assist will be your 24/7 tutor, helping you explain, create, and debug code throughout the lab.
06:12 Let's get started.
```

## Fontes
- Transcrição oficial da plataforma Google Skills, colada por Leonardo em 2026-10-08
