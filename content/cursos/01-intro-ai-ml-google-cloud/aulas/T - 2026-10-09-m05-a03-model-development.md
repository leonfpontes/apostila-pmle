---
title: Transcrição — Módulo 5, Aula 5.3 · Model development
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
summary: "Transcrição bruta (em inglês) da aula 5.3 — o segundo estágio do workflow: as três configurações do treinamento, a matriz de confusão com Type 1 e Type 2 Error, as fórmulas de recall e precision, o trade-off ilustrado pelo Gmail e o feature importance."
resumo: "[[R - 2026-10-09-m05-a03-model-development]]"
data: 2026-10-09
curso: "[[curso-intro-ai-ml-google-cloud]]"
professor: ""
related: []
---

# Transcrição — Módulo 5, Aula 5.3 · Model development

**Curso:** [[curso-intro-ai-ml-google-cloud|Introduction to AI and Machine Learning on Google Cloud]]
**Módulo:** 5 na ementa da plataforma — "Module 4" na fala do instrutor
**Aula:** 5.3 · Model development (🎬 vídeo, ~5min30)
**Idioma:** inglês (transcrição oficial da plataforma)

Os conceitos e a análise desta aula estão na nota de estudo
[[R - 2026-10-09-m05-a03-model-development]] — esta nota guarda só o texto bruto.

## Transcrição

```
00:00 Let's advance to the second stage, model development, where you train the model and evaluate the result.
00:07 Now that our data is ready— which, if you return to the cooking analogy, is the ingredients— it's time to train the model.
00:15 This is like experimenting with recipes.
00:17 This stage involves two steps: model training, which is like cooking the recipe, and model evaluation, which is like testing how good the meal is.
00:27 This process might be iterative.
00:30 To set up an ML model, you need to specify a few things.
00:34 Please note that the user interface may not be exactly the same as the product is evolving rapidly.
00:40 However, similar features will remain.
00:43 First of all is the training method, where you tell Agent Platform the dataset you just uploaded from the preparation stage.
00:50 Depending on the data type, whether it is tabular, image, text, or video, you specify the training objective.
00:58 This is the goal of the model training and the task you want to solve.
01:02 Then you choose the training method: Agent Platform AutoML, without code, or custom training, using code.
01:10 The next step is to determine the training details.
01:13 For example, if you are training the model to solve a supervised learning problem such as regression and classification, you must choose the target column from your dataset.
01:24 In training options, you can choose certain features to participate in the training and transform the data type if needed.
01:31 Finally, you specify the budget and pricing, and then click Start training.
01:36 AutoML will train the model for you and choose the best performed models among thousands of others.
01:42 Do you recall the powerful technologies behind Agent Platform AutoML?
01:47 Right, the credit there goes to neural architecture search and transfer learning.
01:52 While you are experimenting with a recipe, you need to keep tasting it to ensure that it meets expectations.
01:59 This is the evaluation portion of the model development stage.
02:03 Agent Platform provides extensive evaluation metrics to help determine a model's performance.
02:09 Let's focus on the metrics of recall and precision when evaluating the performance of classification models.
02:16 To do this, you'll use a confusion matrix.
02:19 A confusion matrix is a specific performance measurement for machine learning classification problems.
02:26 It's a table with combinations of predicted and actual values.
02:30 To keep things simple, we assume the output includes only two classes.
02:36 Let's explore an example.
02:38 The first is true positive, which can be interpreted as, "The model predicted positive, and that's true."
02:45 The model predicted that this is an image of a cat, and it actually is.
02:50 The opposite of that is true negative, which can be interpreted as "The model predicted negative, and that's true."
02:58 The model predicted that the image is not a cat, and it actually isn't.
03:02 Then there is false positive, otherwise known as a Type 1 Error, which can be interpreted as, "The model predicted positive, and that's false."
03:12 The model predicted that the image is a cat but it actually isn't.
03:17 Finally, there is false negative, otherwise known as a Type 2 Error, which can be interpreted as, "The model predicted negative, and that's false."
03:27 The model predicted that the image is not a cat, but it actually is.
03:32 A confusion matrix is the foundation for many other metrics used to evaluate the performance of a machine learning model.
03:39 Let's look at the two popular metrics, recall and precision, that you will encounter in the lab.
03:45 Recall refers to all the positive cases and looks at how many were predicted correctly.
03:51 This means that recall is equal to the true positives, divided by the sum of the true positives and false negatives.
03:59 Precision refers to all the cases predicted as positive and how many are actually positive.
04:05 This means that precision is equal to the true positives, divided by the sum of the true positives and false positives.
04:12 Precision and recall are often a trade-off.
04:15 Depending on your use case, you might need to optimize for one or the other.
04:20 Consider a classification model where Gmail separates emails into two categories: spam and not-spam.
04:28 If the goal is to catch as many potential spam emails as possible, Gmail might want to prioritize recall.
04:35 In contrast, if the goal is to only catch the messages that are definitely spam without blocking other emails, Gmail might want to prioritize precision.
04:45 Agent Platform visualizes the precision-recall curve, so it can be adjusted based on the problem that needs to be solved.
04:52 You'll get the opportunity to practice adjusting precision and recall in the Agent Platform AutoML lab.
05:00 In addition to the confusion matrix and the metrics generated to measure recall and precision, the other useful measurement is feature importance.
05:09 In Agent Platform, feature importance is displayed through a bar chart to illustrate how each feature contributes to a prediction.
05:16 The longer the bar, or the larger the numerical value associated with a feature, the more important it is.
05:23 This information helps decide which features are included in a machine learning model to predict the goal.
05:28 You will observe the feature importance chart in the lab as well.
```

## Fontes
- Transcrição oficial da plataforma Google Skills, colada por Leonardo em 2026-10-09
