---
title: Transcrição — Módulo 3, Aula 3.8 · Agent building with Google Cloud
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
summary: "Transcrição bruta (em inglês) da aula 3.8 — o stack de produtos para agentes (Model Garden, Agent Platform, Gemini Enterprise app), os componentes da Agent Platform e a árvore de decisão no-code / low-code / pro-code."
resumo: "[[R - 2026-10-09-m03-a08-agent-building-with-google-cloud]]"
data: 2026-10-09
curso: "[[curso-intro-ai-ml-google-cloud]]"
professor: ""
related: []
---

# Transcrição — Módulo 3, Aula 3.8 · Agent building with Google Cloud

**Curso:** [[curso-intro-ai-ml-google-cloud|Introduction to AI and Machine Learning on Google Cloud]]
**Módulo:** 3 na ementa da plataforma — "Module 2" na fala do instrutor
**Aula:** 3.8 · Agent building with Google Cloud (🎬 vídeo, ~7min30)
**Idioma:** inglês (transcrição oficial da plataforma)

Os conceitos, o conteúdo por tópico e as questões desta aula estão na nota
de estudo [[R - 2026-10-09-m03-a08-agent-building-with-google-cloud]] —
esta nota guarda só o texto bruto.

## Transcrição

```
00:00 Earlier, you learned about the evolution of gen AI applications, from chatbots to AI agents and then to agentic AI.
00:10 You also delved into an AI agent— how it works with three components: model, tool, and orchestration layer.
00:16 Now, it's time for a practical guide: how to create an AI agent on Google Cloud.
00:23 Google's gen AI architecture, as discussed at the beginning of this module, provides a comprehensive suite of AI agent tools and products.
00:31 These offerings span foundation models, development tools, and application products.
00:37 From the bottom up, Model Garden provides access to a wide range of Google's foundation models and third-party generative AI models, serving as the "brain" for your agent.
00:48 Moving up to the development layer, a developer can build an AI agent using Agent Platform with either low-code or pro-code options.
00:56 This platform offers tools such as the ADK, Agent Studio, and Agents CLI in Agent Platform, along with a managed environment to simplify agent development.
01:07 It empowers developers, including software and and ML engineers, to build AI agents end-to-end, from design to deployment.
01:15 The top layer is the application or solution layer, designed for business users or analysts who want to build an AI agent with no code or minimum code.
01:24 Gemini Enterprise app is the hub for hosting and building AI agents to solve customized business problems.
01:32 You can also rely on Gemini Enterprise for CX to build Customer Experience agents for customer-facing industries like retail.
01:41 How exciting!
01:42 You're probably thrilled by the capabilities of AI agents, yet perhaps a bit overwhelmed by the sheer number of tools available.
01:49 The big question is: how do you use them efficiently?
01:52 This is the exact challenge Bea, Ann, and Ian faced when they set out to build an AI agent to automate insurance quotes for their customers.
02:00 Where to start?
02:01 Let's dive deeper into how to use these different tools from an AI agent builder's perspective.
02:07 Product choices and development journeys are influenced by two key factors: ease of use and flexibility.
02:14 Ease of use ranges from no-code, ready-to-go solutions like Gemini Enterprise app, progressing to more comprehensive, code-based solutions for building your own.
02:25 Flexibility varies from minimal configuration, like Gemini Enterprise app, to full customization and high flexibility like build-your-own.
02:35 Let's focus on Gemini Enterprise app and Agent Platform, as these are the tools most people interact with.
02:42 Bea, Ann, and Ian want to prototype their ideas using an AI agent to automate insurance quotes.
02:50 They turn to Gemini Enterprise app, a user-friendly, no-code application designed for business users and analysts.
02:59 Imagine a team of expert AI agents each ready to tackle a specific business challenge, just like hiring a travel agent or general contractor.
03:08 That's Gemini Enterprise app!
03:10 This powerful enterprise platform unites AI, Google-quality search, and your company's proprietary data in one secure space.
03:19 Breaking down data silos, Gemini Enterprise app makes your enterprise knowledge readily accessible and actionable in a secure manner.
03:27 A core capability of Gemini Enterprise app is its intelligent, multimodal search.
03:32 It allows employees to quickly find contextual, cited answers from all organizational data formats —documents, images, videos— within a single interface, streamlining research and boosting productivity.
03:45 Beyond search, Gemini Enterprise app also provides a hub for AI agents that can automate workflows and complete tasks on behalf of users.
03:54 It offers pre-built Google agents and a no-code Agent Designer for creating custom agents tailored to specific business needs.
04:02 These agents can perform actions like updating project tickets, sending emails, or analyzing reports, reducing manual overhead and freeing up your time for more strategic work.
04:13 Among the powerful AI agents in Google Gemini Enterprise app, Gemini Notebook stands out.
04:20 It's your personal AI research assistant— a learning companion and study tutor, designed to quickly help you understand and gain insights from vast amounts of information.
04:31 While Gemini Enterprise app and Gemini Notebook are impressive for building AI agents, they fall short when it comes to tailoring agents for unique business needs.
04:41 Bea, Ann, and Ian require an agent that can seamlessly integrate with their company's legacy applications and internal databases.
04:49 They also need specific response behaviors, such as adhering to industry policies for claim reports, while maintaining a warm and empathetic tone for customer communications.
04:59 Gemini Enterprise app couldn't accommodate these custom requirements, highlighting the need for tools like Agent Platform.
05:07 Let's explore the Agent Platform components that facilitate end-to-end AI agent development, from design to deployment.
05:15 Agent Studio: Use a low-code, visual interface to design agent reasoning loops and test prompts using natural language.
05:24 ADK: Use graph-based logic to define clear, reliable logic for how networks of sub-agents collaborate to solve complex problems.
05:34 Agent-to-Agent orchestration enables agents to seamlessly delegate tasks to one another using both generative and deterministic patterns.
05:44 Also, secure workspaces provide agents with hardened, sandboxed environments to safely manage files and run commands.
05:52 Agent Runtime: Use this set of services to deploy, manage, and scale AI agents in production.
05:59 Agent Runtime provides high-performance, managed infrastructure that supports sub-second cold starts and long-running autonomous workflows while offering integrated observability.
06:12 To summarize, a simplified decision tree can help navigate Google's AI agent ecosystem, including tools and products.
06:20 Please note this is only a brief guide and may change as products evolve.
06:24 Out-of-the-box solutions: Gemini Enterprise app and Gemini Enterprise for CX are ideal for no-code deployment.
06:31 This path is best for business users who need ready-to-use solutions with minimal setup.
06:36 Customizable templates: On Agent Platform, Agent Studio facilitates quick idea-to-prototype transitions, and Agent Garden offers pre-built templates.
06:46 This low-code approach is ideal for data scientists and analysts seeking a foundation for creating more tailored solutions.
06:53 Custom development: The ADK or building your own solution from scratch is the pro-code path.
06:59 This approach offers maximum flexibility and is best for developers who need to build highly tailored agents with complex logic and deep integrations.
07:09 Armed with these amazing tools, you can now create your very own AI agent.
07:14 Explore Gemini Notebook (notebook.google.com), now completely free for the general public, and find your AI research assistant, learning companion, or even tutor.
07:26 Have fun!
```
