---
title: Transcrição — Módulo 3, Aula 3.5 · Deployment and model tuning
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
summary: "Transcrição bruta (em inglês) da aula 3.5 — a segunda metade do ciclo prompt-to-production: geração de código, grounding e RAG, as três opções de tuning e o supervised fine-tuning com dataset JSONL."
resumo: "[[R - 2026-10-09-m03-a05-deployment-and-model-tuning]]"
data: 2026-10-09
curso: "[[curso-intro-ai-ml-google-cloud]]"
professor: ""
related: []
---

# Transcrição — Módulo 3, Aula 3.5 · Deployment and model tuning

**Curso:** [[curso-intro-ai-ml-google-cloud|Introduction to AI and Machine Learning on Google Cloud]]
**Módulo:** 3 na ementa da plataforma — "Module 2" na fala do instrutor
**Aula:** 3.5 · Deployment and model tuning (🎬 vídeo, ~8min)
**Idioma:** inglês (transcrição oficial da plataforma)

Os conceitos, o conteúdo por tópico e as questões desta aula estão na nota
de estudo [[R - 2026-10-09-m03-a05-deployment-and-model-tuning]] — esta
nota guarda só o texto bruto.

## Transcrição

```
00:00 In the previous lesson, Ann experimented with the Agent Studio toolkit to design, evaluate, and manage prompts.
00:07 Now she's ready to deploy the prompt to an application.
00:10 She teams up with Ian, the ML engineer who is responsible for building a pipeline and monitoring performance.
00:17 This brings us to the second half of the Prompt to production lifecycle integration and deployment, covering stages from build and test to monitor and optimize.
00:27 Recall that early in their journey, Bea and Ann quickly tested their ideas by simply clicking Build with Code and then Deploy as app to build their own application.
00:38 However, what if they wanted to customize the application or integrated features into other applications?
00:44 Agent Studio provides this flexibility by automatically generating the code for you.
00:50 Besides the user interface, which requires no code to explore and test prompts, Agent Studio offers other low-code approaches to access AI models.
01:00 These are software development kits or SDKs in Python and APIs with cUrl.
01:08 Simply click "Build with code" to find the code describing the prompt and its parameters.
01:13 Automated code generation simplifies application development.
01:17 Additionally, the integrated development environment with Cloud Run and Cloud Shell streamlines production and removes the need to worry about the underlying cloud architecture that supports application deployment.
01:30 After building your application, continuous monitoring and optimization are key to maintaining high performance.
01:36 But how do you ensure your gen AI models deliver accurate, up to date results?
01:41 One way is through grounding and retrieval-augmented generation, or RAG.
01:47 Gen AI models are often pre-trained, meaning their responses rely on potentially outdated or inaccurate training data.
01:56 Grounding connects these models to trusted external data sources, ensuring their answers are verified against the latest information.
02:04 RAG is a method for implementing this idea.
02:07 Think of grounding as the what and RAG as the how.
02:12 When constructing your prompt with Agent Studio, you can choose to ground the results either through Google
02:18 real-time search for the most current information, or your own data to instruct the AI with field-specific knowledge.
02:26 To further your knowledge of these advanced technologies, we recommend our courses: Create Embeddings, Vector Search
02:32 and RAG with BigQuery, and Vector Search and Embeddings with Agent Search on Gemini Enterprise Agent platform.
02:41 These courses introduce how to implement RAG pipelines with Google's two widely used platforms, BigQuery and Agent Platform, respectively.
02:50 You can scan the QR code on the screen or find the link in your reading list.
02:56 Other than fact checking using grounding and RAG, what if you want to improve the quality of content generation itself?
03:03 That's where model tuning comes in.
03:05 It's another way to enhance gen AI accuracy, providing the model with a training dataset of specific downstream task examples.
03:13 While fine-tuning refines the model's internal knowledge and abilities, grounding augments its knowledge with external, real-time and reliable information.
03:23 Remember the earlier analogy about foundation models versus fine-tuned models?
03:27 If K-12 education represents the foundation model, then fine-tuning is specialized professional training, like medical school, that embeds domain-specific expertise.
03:38 Grounding, then, is the ongoing practice of checking the latest research, drug treatments, and medical policies to stay current.
03:46 Now let's look at how to tune and customize a gen AI model with Agent Studio.
03:52 You have different options, ranging from less technical methods like prompt design, which require fewer computational resources, to more technical methods that require more computational resources, like full fine-tuning.
04:05 You are already familiar with prompt design, which lets you tune a generative AI model with examples and instructions in natural language.
04:13 Remember that prompt design does not alter the parameters of the AI model.
04:17 Instead, it improves the model's ability to respond appropriately by guiding it on how to react.
04:24 One benefit of prompt design is that it enables rapid experimentation and customization of generative AI results.
04:31 Another benefit is that it doesn't require specialized machine learning knowledge or coding skills, making it accessible to a wider range of users.
04:39 However, for more complex tasks that require tailored results, consider customizing an AI model with either parameter-efficient tuning or full fine-tuning.
04:49 Parameter-efficient tuning, also called adapter tuning, enables efficient adaptation of large models to your specific task or domain.
04:57 This method also updates a relatively small subset of the model's parameters during the tuning process.
05:03 Full fine-tuning is ideal for highly complex tasks as it can achieve higher quality results.
05:09 However, this method requires more computational resources for both tuning and serving, as it updates all the model's parameters.
05:19 Given these techniques and even some variations between them, Agent Platform currently supports supervised fine-tuning to customize foundational models.
05:29 Supervised fine-tuning improves model performance by teaching it a new skill.
05:33 It uses data containing hundreds of labeled examples to teach the model to mimic a desired behavior or task.
05:40 Each labeled example demonstrates the desired model output.
05:45 The output of the tuning job is a new model that combines newly learned parameters with the original model.
05:51 Supervised fine-tuning is a good option for well-defined tasks with available labeled data.
05:56 For example, it can improve model performance for classification, summarization, extraction, and chat tasks.
06:04 Supervised fine-tuning trains a model with labeled data.
06:08 It can be implemented with different techniques like parameter-efficient tuning or full fine-tuning depending on task complexity and available computational resources.
06:17 Now let's move to Agent Studio and see how to start a tuning job.
06:21 From the Agent Studio menu, select Tuning, then "Create a tuned model."
06:27 Specify the model details and the tuning dataset.
06:31 Note that the UI may change as the product progresses.
06:35 The tuning dataset should be structured as supervised training data in a JSONL file.
06:41 Each record or row contains a pair of text data, the input text, which is the prompt, and the output text, which is the expected response from the model.
06:50 For example, if the prompts are: "This commercial building is architecturally interesting and has a great interior layout.",
06:57 and "The room was terrible. It needs major rework," the expected sentiment labels would be positive and negative respectively.
07:04 This structure allows the model to learn and adapt to your desired behavior.
07:09 You can then start the tuning job and monitor the status in the Google Cloud console.
07:14 When the tuning job completes, you'll see the tuned model in the Model Registry on Gemini Enterprise Agent
07:19 Platform, and you can deploy it to an endpoint for serving or further test it in Agent Studio.
07:27 That was a lot of information.
07:28 Ann and Ian can't wait to explore and start experimenting with Agent Studio themselves.
07:35 It's time for you to have some hands on practice.
07:38 This lab will give you the opportunity to: Create an application directly from a prompt.
07:44 Design effective prompts by applying best practices.
07:47 Engineer and manage prompts by using features like prompt evaluation.
07:52 And use multimodal prompts and generate media.
07:56 By the end of the lab, you'll be well-equipped to use Gemini multimodal with Agent Studio.
```
