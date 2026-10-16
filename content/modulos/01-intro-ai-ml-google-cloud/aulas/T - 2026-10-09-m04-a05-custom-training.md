---
title: Transcrição — Módulo 4, Aula 4.5 · Custom training
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
summary: "Transcrição bruta (em inglês) da aula 4.5 — custom training como solução code-based: containers pré-construídos e customizados, Workbench e Colab Enterprise, bibliotecas de ML, as quatro camadas do TensorFlow, os três passos do tf.keras e o JAX."
resumo: "[[R - 2026-10-09-m04-a05-custom-training]]"
data: 2026-10-09
curso: "[[curso-intro-ai-ml-google-cloud]]"
professor: ""
related: []
---

# Transcrição — Módulo 4, Aula 4.5 · Custom training

**Curso:** [[curso-intro-ai-ml-google-cloud|Introduction to AI and Machine Learning on Google Cloud]]
**Módulo:** 4 na ementa da plataforma — "Module 3" na fala do instrutor
**Aula:** 4.5 · Custom training (🎬 vídeo, ~5min40)
**Idioma:** inglês (transcrição oficial da plataforma)

Os conceitos e a análise desta aula estão na nota de estudo
[[R - 2026-10-09-m04-a05-custom-training]] — esta nota guarda só o texto bruto.

## Transcrição

```
00:00 In previous lessons, you learned about no-code solutions like Agent Platform AutoML and low-code solutions like pre-trained APIs.
00:08 Now, let's explore a code-based solution: custom training, a do-it-yourself approach to building an ML model.
00:17 While Agent Platform AutoML UI offers significant convenience and pre-trained APIs eliminate the need for training
00:23 data, you might require custom training if your unique needs extend beyond Agent Platform AutoML's automated capabilities.
00:32 This is when complete control and flexibility over the model architecture, frameworks, and training logic become essential.
00:40 Before any coding begins, you must determine what environment you want your ML training code to use.
00:46 There are two options: a pre-built container or a custom container.
00:51 A pre-built container is like a furnished kitchen with cabinets, appliances, and cookware.
00:57 So, if your ML training needs a platform like Python, TensorFlow, and PyTorch and you're not particular about the underlying infrastructure to
01:04 run on, or to use our kitchen analogy, which oven or knife you use, a pre-built container is probably your best choice.
01:14 A custom container, alternatively, is like an empty room.
01:18 You define the exact appliances and tools that you prefer to cook with.
01:23 That means you must determine the details like the environment, machine type, and disks when creating the custom container.
01:31 In terms of the tools to code your ML model, you can use Agent Platform Workbench.
01:36 You can think of Agent Platform Workbench as a Jupyter notebook deployed in a single development environment
01:40 that supports the entire data science workflow, from exploring to training and then deploying a machine learning model.
01:48 You can also use Agent Platform Colab Enterprise, which is integrated into Agent Platform so data scientists could code in a familiar environment.
01:58 After you decide the working environment, the next step is to start writing code.
02:02 These days, you don't have to code from scratch.
02:05 Instead, you can leverage ML libraries.
02:09 An ML library is a collection of pre-written code that can be used to perform machine learning tasks.
02:15 These libraries can save developers time and effort by providing them with the tools they need to build machine learning models without having to write everything from the beginning.
02:24 As a data scientist, you might already be familiar with popular ML libraries like TensorFlow, scikit-learn, and PyTorch.
02:32 They are open source and widely used by a large community of users and developers.
02:38 Let's explore TensorFlow, an end-to-end open platform for machine learning supported by Google.
02:44 Tensorflow contains multiple abstraction layers.
02:47 You use TensorFlow APIs to develop and train ML models.
02:52 The TensorFlow APIs are arranged hierarchically, with the high-level APIs built on the low-level APIs.
02:59 The lowest layer is hardware.
03:01 TensorFlow can run on different hardware platforms including CPU, GPU, and TPU.
03:07 The next layer is the low-level TensorFlow APIs, where you can write your own operations in C++ and call the core, basic, and numeric processing functions written in Python.
03:18 The third layer is the TensorFlow model libraries, which provide the building blocks, such as neural network layers and evaluation metrics to create a custom ML model.
03:29 The high-level TensorFlow APIs like Keras sit on top of this hierarchy.
03:34 They hide the ML building details and automatically deploy the training.
03:38 They can be your most used APIs.
03:41 Note that Agent Platform fully hosts TensorFlow from low-level to high-level APIs.
03:47 Regardless of which abstraction level you are writing your TensorFlow code at, Agent Platform gives you a managed service.
03:55 Now let's look at an example of using tf.keras, a commonly used high-level TensorFlow library, to build a simple regression model.
04:04 Typically, it takes three fundamental steps: In step one, you create a model, where you piece together the layers of a neural network.
04:11 In step two, you compile the model, where you specify hyperparameters such as performance evaluation and model optimization.
04:19 Finally, you train your model to find the best fit.
04:23 Assume you already imported necessary packages like TensorFlow and uploaded the data.
04:28 The first step is to create a model by using tf.keras.
04:33 Sequential.
04:33 To demonstrate, you can define your model as a three-layer neural network.
04:37 You'll explore more details about neural networks, such as activation functions, in the next module.
04:43 The next step is to compile the model by specifying how you want to train it by using the method compile.
04:50 For instance, you can decide how to measure the performance by specifying a loss function.
04:55 You can also optimize the training by pointing to an optimizer.
04:59 The last step is to train the model by using the method fit.
05:03 For instance, you can define the input, the training data, and the output, the predicted results.
05:09 You can also decide how many iterations you want to train the model by specifying the numbers of epochs.
05:15 After you train the model and are satisfied with the performance, you can then deploy the model and make predictions.
05:21 Apart from Tensorflow, Google is consistently introducing new frameworks.
05:26 One of the most promising frameworks is JAX.
05:29 JAX is a high-performance numerical computation library that is highly flexible and easy to use.
05:35 It offers new possibilities for both research and production environments.
```
