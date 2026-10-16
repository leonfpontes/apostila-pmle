---
title: Transcrição — Módulo 3, Aula 3.4 · Prompt engineering
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
summary: "Transcrição bruta (em inglês) da aula 3.4 — prompt design no Agent Studio, prompt templates com variáveis, categorias de modelo (Google/partner/open), os parâmetros temperature, top K e top P, e avaliação com ground truth."
resumo: "[[R - 2026-10-09-m03-a04-prompt-engineering]]"
data: 2026-10-09
curso: "[[curso-intro-ai-ml-google-cloud]]"
professor: ""
related: []
---

# Transcrição — Módulo 3, Aula 3.4 · Prompt engineering

**Curso:** [[curso-intro-ai-ml-google-cloud|Introduction to AI and Machine Learning on Google Cloud]]
**Módulo:** 3 na ementa da plataforma — "Module 2" na fala do instrutor
**Aula:** 3.4 · Prompt engineering (🎬 vídeo, ~7min55)
**Idioma:** inglês (transcrição oficial da plataforma)

Os conceitos, o conteúdo por tópico e as questões desta aula estão na nota
de estudo [[R - 2026-10-09-m03-a04-prompt-engineering]] — esta nota guarda
só o texto bruto.

## Transcrição

```
00:00 This lesson covers the first half of the prompt-to-production lifecycle: prompt engineering, from design to evaluation and refinement.
00:10 A "good" prompt, as we learned previously, considers both content (instructions, context, examples) and structure (order, labels, delimiters).
00:21 So how do you engineer a "good" prompt?
00:23 It begins with prompt design, supported by a rich toolkit provided by Agent Studio.
00:30 This is your primary playground for crafting prompts.
00:34 On the left, specify the context in "System Instructions," then pose your tasks or questions in the "Prompt" section.
00:42 Need help?
00:44 Gemini, the built-in AI assistant, can help you create your prompt!
00:48 Powered by multi-modal foundation models like Gemini, you can incorporate multimedia data such as documents, images,
00:55 and videos from diverse sources, including Google Cloud Storage, Google Drive, your local computer, or a URL.
01:04 You can even embed YouTube video links into a prompt.
01:08 Guide the AI's output by adding examples using the default Input and Output features, or customize them to Question and Answer.
01:17 Enterprise users can also import example files of their company's data.
01:22 Ann, a developer, is looking for a way to "code" prompts, perhaps using a function or method with variables to streamline repetitive actions.
01:31 Agent Studio's new prompt template feature is the perfect solution.
01:35 It uses replaceable variables, allowing you to reuse a prompt by simply changing values.
01:42 Imagine a function in coding, but using natural language!
01:46 The beauty is, you only need to tell gen AI what to do, without worrying about how to do it with specific programming languages.
01:54 Consider this example: By clicking Add variables, you can assign values, just like passing arguments to a function.
02:03 For instance, you could ask AI to research "Los Angeles tenant vacancy rate" and generate a report on "real estate market analysis."
02:12 You can also instruct AI to add variables to study "annual crime rate" and conduct an "insurance risk assessment" by using the same prompt template with different values.
02:22 When your draft is complete, navigate to the right side of the user interface to experiment with various model parameters.
02:29 Begin with model selection.
02:31 Agent Studio offers a wide selection of Google, partner, and open models.
02:37 Partner models are proprietary models built by third-party AI companies, like Anthropic.
02:43 Open models (often called Open Weight models) are those where the model's trained weights are publicly released.
02:50 A key advantage of Agent Studio though, is its access to Google's cutting-edge gen AI models like Gemini.
02:58 Choosing the right Google model depends on your task.
03:01 In the previous lesson, you were introduced to Google's different foundation models.
03:05 To refresh your memory, Gemini family, e.g., Gemini Flash and Gemini Pro, ideal for general purposes and multimodal data use cases.
03:15 Specialty models: Designed for specific tasks.
03:18 For instance, here are a few options when you are in Generate media, where you create multimedia with Agent Studio.
03:25 Nano Banana for image creation, Chirp for voice generation, Veo for video processing, and Lyria for music composition.
03:35 After model selection, the next step is parameter specification, like temperature, Top P, and Top K. You might find some of these options in the advanced settings.
03:46 These parameters control the randomness of the model's responses by adjusting how output tokens are selected.
03:53 But how do they actually work?
03:54 Let's look at an example: "The garden was full of beautiful..."
04:00 When prompted with this incomplete sentence, language models predict the probability of potential words like "flowers," "trees," "herbs," and "bugs."
04:10 The selection strategy impacts the outcome.
04:13 Always choosing the most probable word can lead to repetitive and potentially biased text, while random sampling might yield unlikely responses, such as "bugs."
04:23 Adjusting model parameters to control randomness allows you to balance predictability and variety, finding the ideal strategy for a specific task.
04:32 Let's explore these parameters in depth.
04:35 First, temperature.
04:37 This number controls the degree of randomness in generated output.
04:41 A low temperature setting narrows the range of possible output to high-probability, more typical words.
04:48 This is ideal for tasks like question answering and summarization, where a more "typical" answer with less variability is expected.
04:55 A high temperature setting expands the range to include lower-probability, more unusual words, useful for generating "creative" or unexpected content.
05:06 Another parameter is top K. Top K allows the model to randomly select a word from the top K most probable words, where K equals a number.
05:16 For example, top 2 means the model will randomly select either of the two most probable words, such as flowers or trees.
05:23 This approach gives high-scoring words an equal chance.
05:27 However, if the probability distribution is highly skewed, e.g., "flowers" at 80% and "books" at 10%, it can result in strange responses like, "The garden is full of beautiful books."
05:41 The challenge of selecting the optimal Top K value led to top P, where p stands for probability.
05:47 Top P allows the model to return a word from the smallest subset with a sum of likelihoods that exceeds or equals P. For example,
05:55 a P of 75% means sampling from a set of words with a cumulative probability greater than 75%, in this case, "flowers," "trees," and "herbs."
06:07 This dynamically adjusts the size of the word set based on the probability distribution of the next word.
06:13 And that is an overview of the model parameters: model type, temperature, top K, and top P. Note that you are not required to adjust them constantly,
06:23 especially top K and top P. After crafting the prompt and specifying parameters, how can you ensure you've selected the optimal model and parameters for the task?
06:33 This is where evaluation and refinement come in.
06:36 Agent Studio allows you to compare prompts side-by-side to see which produces the best results.
06:42 This helps you understand how different prompts, models, and/or parameter settings influence the output.
06:49 You can even generate your own evaluation metrics by adding ground truth from your field knowledge— your preferred answer to the prompt, against which all other model responses are evaluated.
07:00 Ready to take your prompt to the next level?
07:02 Optimize it in a Colab Enterprise notebook by adding labeled examples to refine the results.
07:07 You can perform these tasks—comparison, optimization, and evaluation— under the Prompt management menu.
07:15 Imagine prompt management as storage to save and share prompts for future use and collaboration, complete with tools like version control and security.
07:26 Beyond general-purpose prompts, you can apply these prompt engineering techniques and tools on Agent Studio to
07:32 specific tasks, such as generating real-time streaming, creating multimedia content, translating content, and converting speech and text.
07:43 Ann has learned so much about what she can do with prompts and is eager
07:46 to leverage these tools to create custom prompts using her own data to solve business problems.
07:52 She's excited to learn how to deploy the prompt to code, which will be revealed in the next lesson!
```
