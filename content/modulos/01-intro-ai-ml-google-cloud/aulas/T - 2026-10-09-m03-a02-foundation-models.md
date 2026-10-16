---
title: Transcrição — Módulo 3, Aula 3.2 · Foundation models
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
summary: "Transcrição bruta (em inglês) da aula 3.2 — o que é um foundation model, a família Gemini (Pro/Flash/Flash-Lite), os modelos especialistas, multimodalidade, pré-treinado × fine-tuned, IA horizontal × vertical e as três abordagens de desenvolvimento."
resumo: "[[R - 2026-10-09-m03-a02-foundation-models]]"
data: 2026-10-09
curso: "[[curso-intro-ai-ml-google-cloud]]"
professor: ""
related: []
---

# Transcrição — Módulo 3, Aula 3.2 · Foundation models

**Curso:** [[curso-intro-ai-ml-google-cloud|Introduction to AI and Machine Learning on Google Cloud]]
**Módulo:** 3 na ementa da plataforma — "Module 2" na fala do instrutor
**Aula:** 3.2 · Foundation models (🎬 vídeo, ~8min25)
**Idioma:** inglês (transcrição oficial da plataforma)

Os conceitos, o conteúdo por tópico e as questões desta aula estão na nota
de estudo [[R - 2026-10-09-m03-a02-foundation-models]] — esta nota guarda
só o texto bruto.

## Transcrição

```
00:00 Previously, you explored the fascinating world of gen AI architecture on Google Cloud.
00:05 Now, let's dive into the foundational layer: foundation models, the true backbone of all gen AI applications.
00:14 Interested in how AI creates content?
00:17 Want to learn about Google's foundation models, their differences, the significance of multimodal AI, and how to customize these models for your specific needs?
00:26 Let's explore these topics in this lesson.
00:29 How does AI generate new content?
00:33 It learns from a massive amount of existing content such as text, image, and video.
00:39 The process of learning from existing content is called training, which results in the creation of a foundation model.
00:46 A foundation model is usually a large model in the sense of a significant number of parameters, vast training data, and high computational power requirements.
00:56 The number of parameters generally indicates a model's capacity to learn complex patterns and store information.
01:02 To give you a perspective, the number of parameters has dramatically increased from millions… to trillions in recent years.
01:10 This substantial increase signifies that foundation models are becoming progressively more capable and "smarter."
01:18 As a pioneering AI company, Google trains foundation models for both general purposes, such as Gemini, and specialized tasks, such as Nano Banana on Gemini Enterprise Agent Platform.
01:31 These models empower Google's own products like Google Search and Workspace, and provide services for external users.
01:39 Gemini family: Ideal for general purposes and multimodal data use cases.
01:44 Popular options include: Gemini Pro: The most capable model, ideal for complex tasks requiring advanced reasoning.
01:50 Gemini Flash: Optimized for high speed and low latency, perfect for high-volume, real-time applications like chatbots.
02:00 Gemini Flash-Lite: The most cost-effective model, suited for high-volume tasks where time isn't critical, such as batch translation and content summarization.
02:09 Specialty models: Designed for specific tasks.
02:12 For instance: Nano Banana for image generation.
02:15 Veo for video processing.
02:17 And embeddings models for semantic search and data representation.
02:21 This list is subject to change due to the rapid evolution of foundation models.
02:25 Always refer to Google documentation for the latest updates.
02:29 You can find this via the QR code or reading list.
02:32 Powered by the foundation models, gen AI is driving new opportunities to enhance productivity, save operational costs, and create new value.
02:43 You might have seen these opportunities from the use case about Coffee on Wheels in the previous module,
02:48 where you used gen AI capabilities to automate the marketing campaign, generate customer feedback, and optimize truck routes.
02:56 Take a moment to pause and reflect: What could be the use cases for using gen AI to solve your business problems?
03:03 Each model is fine-tuned for optimal performance within its specific domain.
03:08 However, Gemini has the potential to replace some of these models due to its general purpose and the ability to process data across multiple modalities—a feature known as multimodal.
03:19 A multimodal model, such as Gemini, can process information from various sources, including text, images, and video.
03:26 It can also generate content in multiple modalities.
03:30 For example, you can prompt Gemini to generate a video walkthrough of a recipe based on a cookie photo.
03:38 Multimodal capability marks a significant leap in generative AI's evolution, fundamentally changing how AI perceives and engages with its environment.
03:48 Unlike earlier models limited to a singular modality multimodal AI now processes an array of "senses," enabling it to understand and interact using modalities like text, images, audio, and video.
04:01 These models seamlessly process and synthesize information from multiple sources simultaneously.
04:09 This holistic comprehension enables generative AI to grasp complex contexts, leading to more human-like reasoning, and the ability to drive sophisticated, real-world actions.
04:21 How can Gemini enhance your business operations?
04:25 Here are some notable examples: Information extraction: Gemini can read text from images and videos, extracting crucial information for further processing.
04:35 Information analysis: It can analyze information extracted from images and videos based on specific prompts.
04:42 For instance, it can categorize expenses from a receipt.
04:46 Information seeking: Gemini can answer questions or generate Q&A based on information extracted from text, images, and videos.
04:55 Content creation: It can create stories or advertisements drawing inspiration from images and videos.
05:01 The possibilities are extensive, limited only by your imagination, regarding how gen AI can address your business challenges.
05:11 Let's apply this to a challenge: Assume you need AI to assess home insurance risk effectively by using real estate images, weather histories, property inspection reports, and disaster videos.
05:23 Which Google AI model is best to process these multimodal data?
05:27 A, Veo B. Embeddings C. Nano Banana or D. Gemini?
05:35 Yes, Gemini is the winner due to its powerful multimodal capabilities.
05:40 Let's now consider some practical challenges.
05:43 While foundation models generally possess broad capabilities, they often lack sufficient training data when confronting problems in specialized fields like healthcare or finance.
05:54 To address specific challenges —such as generating financial models or providing healthcare consulting— a foundation model can be further trained with new, field-specific datasets.
06:07 This process yields a new model precisely tailored to your requirements.
06:12 This leads to the concept of pre-trained and fine-tuned models: A foundation model is pre-trained for
06:17 general purposes using a large dataset, and then fine-tuned for specific objectives with a much smaller dataset.
06:25 Consider K-12 education: After 12 years of foundational learning in reading, writing, and arithmetic, individuals become literate and can solve basic problems.
06:35 However, to become a professional, such as a medical doctor, automotive engineer, or financial advisor, additional specialized training and education are necessary.
06:46 A similar idea applies to pre-trained versus fine-tuned models.
06:50 Foundation models, like large language models (LLM), fall under the category of horizontal AI given their broad capabilities.
06:58 They address common challenges across industries, including content creation (text, image, audio, video, and code), information syntheses (document abstraction and summarization), and conversation generation (questions and answers).
07:16 Conversely, models fine-tuned for specific industries like retail, finance, and healthcare are considered vertical AI solutions.
07:23 These often target industry niches and solve specialized problems, such as disease diagnosis.
07:30 In light of these advancements of foundation models like Gemini, how can developers engage with them on Google Cloud and create applications that leverage multimodal capabilities?
07:41 There are three main approaches, each accomplishing the same goal with varying degrees of flexibility: Google Cloud console UI (user interface): A no-code solution perfect for exploring and testing prompts.
07:54 Gen AI model application programming interfaces (or APIs): A low-code solution like Gemini APIs, used in conjunction with command-line tools like cUrl.
08:05 Predefined software development kits: A code-based solution available in languages like Python and Java used
08:12 with notebooks such as Gemini Enterprise Agent Platform Colab Enterprise and Gemini Enterprise Agent Platform Workbench.
08:22 Let's explore how to use gen AI models with Google in the next few lessons.
```
