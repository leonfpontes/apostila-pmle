---
title: Módulo 1, Aula 1.1 — Course introduction
aliases: [aula 1.1 Google AI ML, course introduction Google Cloud AI]
tags: [aula, trabalho]
type: aula
area: trabalho
created: 2026-09-01
updated: 2026-09-07
status: concluída
fonte: transcricao
confianca: media
papel: derivada
indexar: true
summary: "Vídeo de abertura do curso: apresenta o percurso dos 5 módulos, os foundation models do Google (Gemini, Veo, Imagen), agentes e a escada de desenvolvimento no-code → low-code → code-based."
transcricao: "[[T - 2026-09-01-m01-a01-course-introduction]]"
data: 2026-09-01
curso: "[[curso-intro-ai-ml-google-cloud]]"
professor: ""
related: ["[[R - 2026-09-01-m02-a01-a-use-case]]"]
---

# Módulo 1, Aula 1.1 — Course introduction

| | |
|---|---|
| **Tema** | Abertura do curso: o que será estudado e por quê |
| **Curso** | [[curso-intro-ai-ml-google-cloud\|Introduction to AI and Machine Learning on Google Cloud]] |
| **Data** | 2026-09-01 (data da transcrição) |
| **Formato** | Diálogo entre duas apresentadoras, cenário de cozinha |
| **Duração** | ~3min35 |
| **Aula nº / módulo** | 1.1 — Módulo 1 (Course introduction) |

> 🎯 **Peso na prova: baixo.** É um vídeo de motivação, sem conteúdo
> técnico profundo. Mas ele planta **duas estruturas que a prova cobra
> muito**: (1) a escada no-code → low-code → code-based e (2) o workflow
> de desenvolvimento de IA em três etapas. Vale decorar as duas já.

## A metáfora da aula

A abertura compara a IA a uma **cozinha cheia de ferramentas**: é fácil se
sentir sobrecarregado diante de tanta opção, mas cada ferramenta tem seu
uso. O curso promete tirar o aluno do *"hã?"* para o *"eu consigo
construir isso"* — entendendo **o porquê antes do como**.

## Conteúdo por tópico

### 1. O percurso do curso (5 blocos de conteúdo)

1. **AI foundations** — o que é IA no Google Cloud, a infraestrutura por
   trás e a primeira prática com **BigQuery ML**.
2. **Generative AI on Google Cloud** — IA que *cria conteúdo novo*:
   foundation models, prompt engineering, multimodalidade.
3. **AI agents** — assistentes autônomos que não só geram conteúdo, mas
   **tomam ações**.
4. **AI development options** — as opções de construção, da mais simples
   à mais técnica.
5. **AI development workflow** — o ciclo completo de um projeto de ML.

### 2. Os foundation models citados

| Modelo | Modalidade |
|---|---|
| **Gemini** | multimodal (texto, imagem, áudio, vídeo, código) |
| **Veo** | geração de **vídeo** |
| **Imagen** | geração de **imagem** |

📌 Mnemônico: **V**eo = **V**ídeo · **Imagen** = **Imagem** · Gemini = o
generalista multimodal.

### 3. Agentes: mais que um "sidekick"

A aula corrige explicitamente uma noção errada. Um agente **não é** só um
assistente que responde. É um **assistente autônomo que gera conteúdo *e*
executa ações** em seu nome. Essa distinção — *gerar* vs. *agir* — é a
definição que a prova usa.

O diálogo também separa **generative AI** de **agentic AI** como duas
ondas distintas: a primeira cria conteúdo, a segunda age.

### 4. ⭐ A escada de desenvolvimento (no-code → low-code → code-based)

Este é **o quadro mais cobrável** que a aula apresenta:

| Nível | Ferramentas citadas | Para quem |
|---|---|---|
| **No-code** | **Gemini Enterprise app** e **Agent Platform AutoML** *(ex-Vertex AI AutoML)* | quem não programa |
| **Low-code** | **Pre-trained APIs** | quem programa pouco, usa modelos prontos do Google |
| **Code-based** | **BigQuery ML** e **custom training** com **Gemini Enterprise Agent Platform** *(ex-Vertex AI)* | quem quer controle total |

⚠️ **Atenção ao rebranding.** O vídeo usa a nomenclatura nova: *Agent
Platform* e *Gemini Enterprise Agent Platform* são o que a documentação e
os simulados de terceiros ainda chamam de **Vertex AI**. Saiba os dois
nomes.

⚠️ **Ponto de atenção:** BigQuery ML aparece aqui como opção
**code-based** (porque exige SQL), mas é frequentemente descrito como
"low-code" em outros materiais, já que substitui Python por SQL. Na prova
deste curso, siga a classificação do curso: **code-based**.

### 5. ⭐ O workflow de desenvolvimento de IA (3 etapas)

```
Data preparation  →  Model development  →  Model serving
 (preparação        (desenvolvimento       (colocar o modelo
  dos dados)         do modelo)             em produção)
```

Esse é o esqueleto do Módulo 5 inteiro. Decore a ordem.

### 6. Generative AI × Predictive AI

A aula fecha prometendo entendimento prático **das duas**:

- **Predictive AI** — prevê um valor ou uma classe a partir de dados
  históricos (é o que o BigQuery ML e o AutoML fazem no curso).
- **Generative AI** — cria conteúdo novo (texto, imagem, vídeo, código).

## Glossário da aula

- **Generative AI (gen AI)** — IA que aprende a criar conteúdo
  inteiramente novo, em vez de apenas classificar ou prever.
- **Agentic AI / AI agent** — assistente autônomo que gera conteúdo **e
  toma ações** por você; vai além de responder perguntas.
- **Foundation model** — modelo grande, pré-treinado em dados amplos,
  usado como base para muitas tarefas diferentes (ex.: Gemini).
- **Gemini** — foundation model multimodal do Google.
- **Veo** — modelo do Google para geração de vídeo.
- **Imagen** — modelo do Google para geração de imagem.
- **Multimodalidade** — capacidade de um modelo lidar com mais de um tipo
  de dado (texto, imagem, áudio, vídeo) na mesma interação.
- **Prompt engineering** — a prática de formular instruções que levam o
  modelo à saída desejada.
- **BigQuery ML** — permite treinar e usar modelos de ML com comandos SQL
  dentro do próprio data warehouse, sem mover os dados.
- **Pre-trained APIs** — APIs do Google com modelos já treinados
  (ex.: Natural Language, Vision, Speech); opção **low-code**.
- **AutoML / Agent Platform AutoML** — treina um modelo customizado sem
  escrever código, a partir dos seus próprios dados; opção **no-code**.
- **Gemini Enterprise app** — opção **no-code** para construir soluções
  com Gemini.
- **Gemini Enterprise Agent Platform** *(ex-Vertex AI)* — a plataforma
  unificada de ML/IA do Google Cloud; base do **custom training**.
- **Custom training** — você escreve o próprio código de treinamento e
  controla o modelo de ponta a ponta; opção **code-based**.
- **Data preparation** — 1ª etapa do workflow: coletar, limpar e preparar
  os dados.
- **Model development** — 2ª etapa: treinar e avaliar o modelo.
- **Model serving** — 3ª etapa: implantar o modelo e servir predições.

## Flashcards

| Pergunta | Resposta |
|---|---|
| Qual foundation model do Google gera **vídeo**? | Veo |
| Qual foundation model do Google gera **imagem**? | Imagen |
| Qual é o modelo multimodal generalista do Google? | Gemini |
| O que diferencia um **agente** de um assistente comum? | O agente **toma ações** de forma autônoma, não só gera conteúdo |
| Quais são as três etapas do AI development workflow? | Data preparation → Model development → Model serving |
| Quais opções o curso classifica como **no-code**? | Gemini Enterprise app e Agent Platform AutoML |
| Qual opção o curso classifica como **low-code**? | Pre-trained APIs |
| Quais opções o curso classifica como **code-based**? | BigQuery ML e custom training com Gemini Enterprise Agent Platform |
| O que é BigQuery ML? | Treinar e usar modelos de ML com SQL dentro do data warehouse |
| Qual o nome antigo de "Agent Platform"? | Vertex AI |
| Generative AI vs. Predictive AI? | Generative **cria** conteúdo novo; Predictive **prevê** valores/classes a partir de dados históricos |

## Questões estilo prova

**1.** Uma analista de marketing sem experiência em programação precisa
construir um modelo de classificação a partir da base de clientes da
empresa. Qual opção do Google Cloud é a mais adequada?

- A) Custom training no Gemini Enterprise Agent Platform
- B) Agent Platform AutoML
- C) Pre-trained APIs
- D) BigQuery ML

<details><summary>Gabarito</summary>

**B — Agent Platform AutoML.** É a opção **no-code** que treina um modelo
customizado com os **dados próprios** da empresa. (A) e (D) exigem código
(Python e SQL). (C) usaria um modelo pronto do Google, que não conhece a
base de clientes dela — pre-trained APIs servem para tarefas genéricas
(visão, linguagem, fala), não para dados proprietários.
</details>

**2.** Qual é a diferença central entre IA generativa e IA agêntica,
segundo a aula?

- A) A generativa roda na nuvem; a agêntica, localmente
- B) A generativa é multimodal; a agêntica só trabalha com texto
- C) A generativa cria conteúdo; a agêntica cria conteúdo **e executa ações**
- D) A generativa exige código; a agêntica é no-code

<details><summary>Gabarito</summary>

**C.** A aula define o agente como "um assistente totalmente autônomo que
gera conteúdo **e toma ações** por você". As demais alternativas inventam
distinções que a aula não faz.
</details>

**3.** Coloque na ordem correta as etapas do AI development workflow.

<details><summary>Gabarito</summary>

**Data preparation → Model development → Model serving.** Primeiro os
dados são coletados e preparados, depois o modelo é treinado e avaliado, e
por fim é implantado para servir predições.
</details>

**4.** Uma equipe de dados quer analisar o sentimento de milhares de
avaliações de clientes em texto livre, sem treinar nenhum modelo próprio.
Qual opção é a mais direta?

- A) Agent Platform AutoML
- B) BigQuery ML
- C) Pre-trained API (Natural Language)
- D) Custom training

<details><summary>Gabarito</summary>

**C — Pre-trained API.** Análise de sentimento é uma tarefa genérica que o
Google já resolveu com um modelo pronto; basta chamar a API (opção
**low-code**). Treinar um modelo próprio (A, B, D) seria trabalho
desnecessário. É exatamente o lab 4.7 do curso.
</details>

**5.** Um engenheiro de dados quer treinar um modelo de previsão sem tirar
os dados do data warehouse e domina SQL, mas não Python. Qual ferramenta
atende melhor?

- A) Imagen
- B) BigQuery ML
- C) Veo
- D) Gemini Enterprise app

<details><summary>Gabarito</summary>

**B — BigQuery ML.** Treina modelos com comandos SQL dentro do próprio
BigQuery, sem mover os dados. (A) e (C) são modelos generativos de
imagem e vídeo. (D) é uma solução no-code, não voltada a treinar um modelo
preditivo sobre o data warehouse.
</details>

## Dúvidas em aberto / revisar
- ⚠️ A classificação de **BigQuery ML** como *code-based* nesta aula
  conflita com materiais que o chamam de *low-code*. Conferir como o
  Módulo 4 ("AI development options") formaliza a escada — é lá que a
  definição oficial do curso aparece.
- Confirmar se **Gemini Enterprise app** e **Gemini Enterprise Agent
  Platform** são produtos distintos ou camadas do mesmo produto. O Módulo
  4 deve esclarecer.
