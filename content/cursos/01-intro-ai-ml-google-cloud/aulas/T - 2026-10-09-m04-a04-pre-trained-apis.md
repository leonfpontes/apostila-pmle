---
title: Transcrição — Módulo 4, Aula 4.4 · Pre-trained APIs
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
summary: "Transcrição bruta (em inglês) da aula 4.4 — pre-trained APIs como solução low-code: a analogia das tomadas elétricas, o exemplo de código com o SDK do Gemini e as categorias de API do Google Cloud."
resumo: "[[R - 2026-10-09-m04-a04-pre-trained-apis]]"
data: 2026-10-09
curso: "[[curso-intro-ai-ml-google-cloud]]"
professor: ""
related: []
---

# Transcrição — Módulo 4, Aula 4.4 · Pre-trained APIs

**Curso:** [[curso-intro-ai-ml-google-cloud|Introduction to AI and Machine Learning on Google Cloud]]
**Módulo:** 4 na ementa da plataforma — "Module 3" na fala do instrutor
**Aula:** 4.4 · Pre-trained APIs (🎬 vídeo, ~3min50)
**Idioma:** inglês (transcrição oficial da plataforma)

Os conceitos e a análise desta aula estão na nota de estudo
[[R - 2026-10-09-m04-a04-pre-trained-apis]] — esta nota guarda só o texto bruto.

## Transcrição

```
00:00 In the previous lesson, you learned about no-to-low-code solution Agent Platform AutoML.
00:07 Let's proceed to a low-code solution by using pre-trained APIs.
00:13 Good machine learning models require lots of high-quality training data.
00:17 You should aim for hundreds of thousands of records to train a custom model.
00:21 But what if you don't have that kind of data?
00:24 How can you use AI to serve your purposes?
00:27 Pre-trained APIs are a great place to start.
00:31 API stands for application programming interface.
00:34 APIs define how software components communicate with each other.
00:39 Imagine APIs as electrical outlets.
00:43 Different regions have different standards.
00:45 For example, the US uses type A and B, whereas Europe uses type F. As a traveler, you only need
00:51 to know which adapter to use without worrying about what's behind the wall or how the electrical network is built.
00:58 The same principle applies to APIs.
01:01 As a user, you only need to know which API to use and what parameters to pass, and in what
01:06 format, without worrying about the implementation— specifically, the intricacies of model training and deployment— much like calling a predefined function.
01:16 Look at a simple example.
01:18 The code uses the Google AI for Python SDK, or software development kit, to communicate with the Gemini API, following these steps: Authenticate your
01:29 session by passing the unique API key as a parameter to the genai.configure() function, granting you permission to use the API, using the statement genai.configure(api_key="YOUR_API_KEY").
01:47 2. Specify the Gemini models you want to process your request, like Gemini 2.5 Flash, using the statement model = genai.
02:04 GenerativeModel('gemini-2.5-flash').
02:04 3. Make an API call to Google's servers, sending the prompt data.
02:09 This string of text, passed to the model.generate_content() function, serves as the main input—the question or instruction—that you want the AI to respond to.
02:19 Follow the statement: response = model.generate_content ("What are the three largest countries by area?").
02:27 4. Receive the model's generated text back as a response by using the statement print(response.text).
02:35 It's remarkable, isn't it?
02:37 You don't need to train your own large language models.
02:40 Instead, you can access and utilize the pre-trained AI models directly through API calls in the same way as a function call.
02:48 So, what are the API services provided by Google Cloud?
02:52 Let's explore a short list.
02:54 Generative AI APIs include foundation model APIs, such as the multimodal Gemini APIs, which can be leveraged to directly create content.
03:03 Additionally, Agent Platform provides a comprehensive suite of features for discovering, building, and deploying AI agents.
03:10 Machine learning APIs, like the Agent Platform API, can be used to train, monitor, and tune an ML model with minimal ML expertise and effort.
03:19 Other APIs include speech, image, document, and conversation APIs.
03:24 This list is constantly evolving with technological advancements.
03:28 Many of these can be replaced by the Gemini APIs, which are considered multitask and multimodal.
03:34 Ever wondered what magic lies behind understanding human language?
03:38 Discover the Natural Language API, a powerful tool that allows you to analyze text directly in your browser.
03:45 Uncover hidden insights by identifying entities, sentiment, syntax, and categories, transforming raw text into meaningful data.
```

## Fontes
- Transcrição oficial da plataforma Google Skills, colada por Leonardo em 2026-10-09
