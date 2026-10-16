---
title: Transcrição — Módulo 5, Aula 5.6 · Lab introduction (optional)
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
summary: "Transcrição bruta (em inglês) da aula 5.6 — introdução ao lab opcional de risco de crédito: o mínimo de 1.000 data points do AutoML, as quatro taxas da matriz de confusão com suas fórmulas, e o confidence threshold com os dois extremos."
resumo: "[[R - 2026-10-09-m05-a06-lab-introduction]]"
data: 2026-10-09
curso: "[[curso-intro-ai-ml-google-cloud]]"
professor: ""
related: []
---

# Transcrição — Módulo 5, Aula 5.6 · Lab introduction (optional)

**Curso:** [[curso-intro-ai-ml-google-cloud|Introduction to AI and Machine Learning on Google Cloud]]
**Módulo:** 5 na ementa da plataforma — "Module 4" na fala do instrutor
**Aula:** 5.6 · Lab introduction (🎬 vídeo, ~3min50) — **opcional**
**Idioma:** inglês (transcrição oficial da plataforma)

Os conceitos e a análise desta aula estão na nota de estudo
[[R - 2026-10-09-m05-a06-lab-introduction]] — esta nota guarda só o texto bruto.

## Transcrição

```
00:00 Apply your new skills in an optional hands-on lab designed for practical experience.
00:05 While encouraged, not completing this lab won't affect your course completion status.
00:11 In this lab, you use Agent Platform AutoML, a no-code tool, to build a machine learning model to predict loan risk.
00:19 The dataset used in the lab relates to loans from a financial institution and has 2,050 data points.
00:25 Agent Platform AutoML requires at least 1,000 data points in a dataset.
00:31 The goal is to practice working through the three phases of the machine learning workflow: data preparation, model development, and model serving.
00:40 Before you start the lab, let's explain the details about model evaluation so that you can interpret the training results.
00:48 Let's start with the confusion matrix.
00:50 You'll get a similar result like this in the lab.
00:53 Pause for a second and try to interpret this matrix yourself.
00:56 What does it tell you?
01:00 100% true positive rate.
01:03 This means the model perfectly identifies everyone who will repay their loan.
01:07 It never misses a good borrower.
01:10 That's fantastic.
01:11 Note that the true positive rate equals true positives divided by the sum of true positives and false negatives.
01:18 If the terms sound unfamiliar, please refer to the previous example where you learned about the confusion matrix.
01:25 87% true negative rate.
01:27 The model also correctly identifies 87% of people who won't repay - defaulters.
01:34 Note that the true negative rate equals true negatives, divided by the sum of false positives and true negatives.
01:41 13% false positive rate.
01:44 This means the model mistakenly identifies 13% of good borrowers, those who actually repay, as defaulters.
01:52 This can lead to the bank rejecting potentially good customers, which is not ideal.
01:57 Note that the false positive rate equals false positives divided by the sum of false positives and true negatives.
02:05 Finally, 0% false negative rate.
02:08 This means the model never incorrectly identifies a borrower who will repay their loan as a potential defaulter.
02:16 Note that the false negative rate equals false negatives, divided by the sum of true positives and false negatives.
02:24 Let's look at the precision-recall curve you will encounter in the upcoming Agent Platform AutoML lab.
02:31 The confidence threshold determines how a machine learning model counts the positive cases.
02:36 A higher threshold increases the precision but decreases recall.
02:40 A lower threshold decreases the precision, but increases recall.
02:45 Moving the confidence threshold to zero produces the highest recall of 100% and the lowest precision of 50%.
02:53 So, what does that mean?
02:55 That means the model predicts that 100% of loan applicants will be able to repay a loan they take out.
03:01 However, actually only 50% of people were able to repay the loan.
03:06 Using this threshold to identify the default cases in this example can be risky, because it means that you can only get half of the loan investment back.
03:14 Now let's view the other extreme by moving the threshold to one.
03:18 This will produce the highest precision of 100%, with the lowest recall of 1%.
03:23 What does this mean?
03:25 It means that of all the people who were predicted to repay the loan, 100% of them actually did.
03:31 However, you rejected 99% of loan applicants by only offering loans to 1% of them.
03:37 That's a pretty big business loss for your company.
03:40 These are both extreme examples, but it's important that you always try to set an appropriate threshold for your model.
03:46 Now that we've made a review, let's start the lab.
```
