---
title: Módulo 2, Aula 2.2 — AI on Google Cloud
aliases: [aula 2.2 Google AI ML, IA preditiva x generativa, tres camadas Google Cloud]
tags: [aula, trabalho]
type: aula
area: trabalho
created: 2026-09-01
updated: 2026-09-01
status: concluída
fonte: transcricao
confianca: media
papel: derivada
indexar: true
summary: "Aula-chave: por que Google (3 razões), a distinção formal entre IA preditiva (traditional/discriminative) e generativa, a árvore de decisão entre as duas, e as três camadas da arquitetura do Google Cloud — infraestrutura, desenvolvimento (Agent Platform) e aplicações/soluções."
transcricao: "[[T - 2026-09-01-m02-a02-ai-on-google-cloud]]"
data: 2026-09-01
curso: "[[curso-intro-ai-ml-google-cloud]]"
professor: ""
related: []
---

# Módulo 2, Aula 2.2 — AI on Google Cloud

| | |
|---|---|
| **Tema** | Por que Google · IA preditiva × generativa · as três camadas da arquitetura |
| **Curso** | [[curso-intro-ai-ml-google-cloud\|Introduction to AI and Machine Learning on Google Cloud]] |
| **Data** | 2026-09-01 (data da transcrição) |
| **Duração** | ~5min |
| **Vídeo** | https://youtu.be/ZHUINZJeyYg |
| **Aula nº / módulo** | 2.2 — Módulo 2 na ementa ("Module 1, AI Foundations" na fala do curso) |

> 🎯 **Peso na prova: ALTO.** Esta é a aula conceitual mais importante até
> agora. Ela define formalmente **IA preditiva × IA generativa** (com os
> sinônimos que a prova usa) e apresenta as **três camadas** da arquitetura
> do Google Cloud. Praticamente tudo aqui é material de questão.

## Conteúdo por tópico

### 1. Por que Google — as três razões

| # | Razão | Detalhe |
|---|---|---|
| 1 | **Histórico** | Longa trajetória usando IA nos próprios produtos: **Google Search**, **Google Maps**, **Workspace** |
| 2 | **Liderança em inovação** | Lidera em IA/ML, sobretudo nos avanços recentes de IA generativa — **Gemini**, **Agent Platform**, **Gemini Notebook** |
| 3 | **IA responsável** | *Bold innovation* · *responsible development and deployment* · *collaborative progress* |

📌 **Gemini Notebook** aparece aqui pela primeira vez — é o terceiro produto
da tríade que o curso usa para ilustrar a liderança do Google.

📖 Os **princípios de IA responsável** do Google estão no *reading* do
módulo (aula 2.9). A aula manda explicitamente ler.

### 2. As duas categorias de problema de IA

A aula usa o caso [[R - 2026-09-01-m02-a01-a-use-case|Coffee on Wheels]]
para separar os problemas em dois tipos:

| Tipo de problema | Nome | Exemplos do caso |
|---|---|---|
| **Predição** | **Predictive AI** | previsão de vendas · otimização de rota via previsão de trânsito |
| **Criação** | **Generative AI** | gerar respostas a clientes · automatizar campanhas de marketing |

### 3. ⭐ Definições formais (decore os sinônimos)

**Predictive AI** — também chamada de **traditional AI** ou
**discriminative AI**:
> usa **dados existentes** para **classificar** informação ou **prever
> resultados futuros** com base em **padrões históricos**.

**Generative AI**:
> **expande** essas capacidades para **criar resumos**, **descobrir
> correlações complexas** ou **gerar conteúdo novo** — texto, imagem ou
> vídeo — que **espelha o estilo e os padrões dos dados de treinamento**.
> *"It doesn't just analyze, it creates."*

> 💡 **A frase-resumo que a prova mais provavelmente usa:**
> **"Predictive AI analyzes and predicts. Generative AI creates new content
> and takes action."**
> IA preditiva **analisa e prevê**. IA generativa **cria conteúdo novo e
> toma ações**.

⚠️ **Atenção aos sinônimos.** Se uma questão falar em *traditional AI* ou
*discriminative AI*, está falando de **IA preditiva**. Esse é o tipo de
pegadinha clássica.

📌 Repare que a definição de generativa já inclui **"takes action"** — é a
ponte para os agentes do Módulo 3.

### 4. ⭐ Árvore de decisão: quando usar cada uma

| Necessidade | Escolha |
|---|---|
| **Forecasting e predições** | **Predictive AI** |
| **Geração de conteúdo multimodal** (texto, imagem, vídeo) e **automação** | **Generative AI** |

> ⚠️ **Mas a aula avisa: "there's no clear line between these two."**
> Frequentemente a melhor abordagem é **usar as duas**.

**O padrão de combinação:** usar a **saída de um modelo preditivo como
parte do prompt de um modelo generativo**.

Os dois exemplos que a aula dá (fortes candidatos a questão):

| Passo preditivo | Passo generativo |
|---|---|
| Prever **churn** de clientes | Chatbot que ajuda o time de vendas a **explorar essas previsões** |
| Identificar **segmentos** de clientes | Criar **conteúdo de marketing personalizado** para cada segmento |

**O critério de decisão final:** priorizar **resultados de negócio** e
**necessidades do usuário** — não a tecnologia.

### 5. ⭐ As três camadas da arquitetura do Google Cloud

```
┌─────────────────────────────────────────────────┐
│ 3. APPLICATIONS AND SOLUTIONS                   │
│    opções prontas (out-of-the-box) para          │
│    usuários de negócio e analistas prototiparem  │
├─────────────────────────────────────────────────┤
│ 2. AI DEVELOPMENT                               │
│    Agent Platform (ex-Vertex AI): plataforma     │
│    end-to-end, do design ao deployment           │
│    · movida por foundation models (Gemini)       │
│    · pipelines de deployment simplificados       │
│    · integra com dados (BigQuery)                │
│    → "playground" de devs, engenheiros e         │
│      cientistas de dados                         │
├─────────────────────────────────────────────────┤
│ 1. AI INFRASTRUCTURE                            │
│    compute · network · storage avançados         │
│    → o "chão sólido" de tudo                     │
└─────────────────────────────────────────────────┘
```

📌 **Detalhe que a prova cobra:** a camada de infraestrutura é
**compute + network + storage**. Note que aqui a aula diz **network**,
enquanto a 2.1 falava em **Compute, Storage, Data e AI** (que são famílias
de *produtos*, não a mesma lista). Não confunda as duas enumerações.

📌 **Agent Platform** é descrita como **end-to-end AI development
platform** — *"from design to deployment"*. Guarde essa expressão.

### 6. ⭐ O roteiro do curso na numeração do instrutor

A aula fecha mapeando o curso — e isso **confirma o descompasso de
numeração**:

| Fala do instrutor | Nossa numeração | Conteúdo |
|---|---|---|
| "this module" | **Módulo 2** | AI infrastructure + ferramentas de dados — a fundação |
| "Module 2" | **Módulo 3** | Construir **gen AI**: foundation models e ferramentas nos níveis de desenvolvimento e aplicação |
| "Module 3" | **Módulo 4** | Opções para **treinar um modelo de ML** |
| "Module 4" | **Módulo 5** | Construir um modelo de ML **ponta a ponta**: preparação de dados → treinamento → deployment |

✅ **Descompasso confirmado:** a numeração do instrutor é sempre **a nossa
menos 1**, porque a plataforma conta "Course introduction" como módulo 1.

## Glossário da aula

- **Predictive AI** *(= traditional AI = discriminative AI)* — usa dados
  existentes para classificar informação ou prever resultados futuros a
  partir de padrões históricos. **Analisa e prevê.**
- **Generative AI** — cria resumos, descobre correlações complexas e gera
  conteúdo novo (texto, imagem, vídeo) espelhando o estilo e os padrões
  dos dados de treinamento. **Cria conteúdo novo e toma ações.**
- **Discriminative AI** — sinônimo de IA preditiva; o termo vem de modelos
  que *discriminam* entre classes.
- **Gemini** — foundation model do Google que move a Agent Platform.
- **Gemini Notebook** — ambiente de notebook do Google citado como exemplo
  da liderança do Google em IA.
- **Agent Platform** *(ex-Vertex AI)* — plataforma **end-to-end** de
  desenvolvimento de IA, **do design ao deployment**; integra com BigQuery.
- **BigQuery** — produto de dados que a Agent Platform integra, garantindo
  o caminho suave *from data to AI*.
- **Responsible AI** — compromisso do Google com inovação ousada,
  desenvolvimento e implantação responsáveis e progresso colaborativo.
- **Churn** — evasão de clientes; exemplo clássico de problema preditivo.
- **Camada de infraestrutura** — compute, network e storage.
- **Camada de desenvolvimento** — Agent Platform + foundation models +
  pipelines.
- **Camada de aplicações e soluções** — opções prontas para usuários de
  negócio e analistas prototiparem rápido.

## Flashcards

| Pergunta | Resposta |
|---|---|
| Quais são as três razões "por que Google"? | 1) Histórico de IA nos próprios produtos (Search, Maps, Workspace) · 2) Liderança em inovação de IA/ML (Gemini, Agent Platform, Gemini Notebook) · 3) Compromisso com IA responsável |
| Quais são os três pilares da IA responsável citados? | Bold innovation · responsible development and deployment · collaborative progress |
| Quais são os dois outros nomes de **predictive AI**? | Traditional AI e discriminative AI |
| Defina IA preditiva em uma frase | Usa dados existentes para classificar informação ou prever resultados futuros com base em padrões históricos |
| Defina IA generativa em uma frase | Cria resumos, descobre correlações complexas e gera conteúdo novo que espelha o estilo e os padrões dos dados de treinamento |
| A frase-resumo que separa as duas | "IA preditiva **analisa e prevê**; IA generativa **cria conteúdo novo e toma ações**" |
| Quando usar IA preditiva? | Forecasting e predições |
| Quando usar IA generativa? | Geração de conteúdo multimodal (texto, imagem, vídeo) e automação |
| Como as duas se combinam? | A **saída** do modelo preditivo entra como **parte do prompt** do modelo generativo |
| Exemplo de combinação (churn) | Preditiva prevê churn → generativa alimenta um chatbot para o time de vendas explorar as previsões |
| Exemplo de combinação (segmentos) | Preditiva identifica segmentos → generativa cria conteúdo de marketing personalizado por segmento |
| Qual o critério para escolher entre as duas? | Priorizar **resultados de negócio** e **necessidades do usuário** |
| Quais são as três camadas da arquitetura do Google Cloud? | 1) AI infrastructure · 2) AI development · 3) Applications and solutions |
| O que compõe a camada de **infraestrutura**? | Compute, network e storage avançados |
| Qual produto ocupa a camada de **desenvolvimento**? | Agent Platform (ex-Vertex AI), plataforma end-to-end do design ao deployment |
| O que move a Agent Platform? | Foundation models como o Gemini + pipelines de deployment simplificados |
| Para quem é a camada de **aplicações e soluções**? | Usuários de negócio e analistas, com opções prontas (out-of-the-box) para prototipar rápido |

## Questões estilo prova

**1.** Um enunciado se refere a "discriminative AI". A que ele está se
referindo?

- A) IA generativa
- B) IA agêntica
- C) IA preditiva
- D) IA multimodal

<details><summary>Gabarito</summary>

**C — IA preditiva.** A aula lista os três nomes como equivalentes:
*predictive AI*, *traditional AI* e *discriminative AI*. É a pegadinha
mais provável desta aula.
</details>

**2.** Uma varejista quer prever quais clientes vão cancelar a assinatura
e, em seguida, gerar um e-mail personalizado de retenção para cada um. Qual
abordagem a aula recomenda?

- A) Só IA preditiva, porque o problema é de previsão
- B) Só IA generativa, porque o entregável final é texto
- C) Usar as duas: a saída da preditiva alimenta o prompt da generativa
- D) Nenhuma — é um problema de regras de negócio

<details><summary>Gabarito</summary>

**C.** A aula é explícita: *"there's no clear line between these two"* e o
padrão recomendado é usar a **saída do modelo preditivo como parte do
prompt do modelo generativo**. O exemplo de churn na aula é praticamente
este enunciado.
</details>

**3.** Quais tecnologias compõem a camada de **infraestrutura de IA** do
Google Cloud?

- A) Gemini, Agent Platform e Gemini Notebook
- B) Compute, network e storage
- C) BigQuery, Looker e Dataflow
- D) AutoML, pre-trained APIs e custom training

<details><summary>Gabarito</summary>

**B — compute, network e storage.** (A) são produtos de IA, não
infraestrutura. (C) são produtos de dados. (D) são opções de
desenvolvimento (Módulo 4).
</details>

**4.** Uma analista de negócios sem perfil técnico quer prototipar
rapidamente uma ideia com IA. Qual camada da arquitetura do Google Cloud
atende esse perfil?

- A) AI infrastructure
- B) AI development
- C) Applications and solutions
- D) Data and analytics

<details><summary>Gabarito</summary>

**C — Applications and solutions.** A aula diz literalmente que essa
camada oferece opções *out-of-the-box* para **usuários de negócio e
analistas** prototiparem rápido. A camada de desenvolvimento (B) é
descrita como o "playground" de devs, engenheiros e cientistas de dados.
</details>

**5.** Qual afirmação descreve corretamente a Agent Platform, segundo a
aula?

- A) Um data warehouse serverless para análise de dados
- B) Uma plataforma end-to-end de desenvolvimento de IA, do design ao deployment
- C) Um conjunto de APIs com modelos pré-treinados
- D) Uma ferramenta de BI e visualização

<details><summary>Gabarito</summary>

**B.** A aula define a Agent Platform como *"an end-to-end AI development
platform"* que guia *"from design to deployment"*. (A) é o BigQuery, (D) é
o Looker, (C) são as pre-trained APIs.
</details>

**6.** Segundo a aula, qual deve ser o critério principal ao escolher entre
IA preditiva e generativa?

<details><summary>Gabarito</summary>

**Priorizar os resultados de negócio e as necessidades do usuário** — não
a preferência tecnológica. A aula fecha a seção exatamente com esse
princípio.
</details>

## Dúvidas em aberto / revisar
- ✅ **Numeração dos módulos: resolvida.** A aula confirma que a contagem
  do instrutor é sempre **a nossa menos 1** ("Module 2" dele = nosso
  Módulo 3, e assim por diante).
- ⚠️ **Duas enumerações diferentes de infraestrutura.** A aula 2.1 fala em
  *Compute, Storage, Data e AI* (famílias de produtos); a 2.2 fala em
  *compute, network e storage* (a camada de infraestrutura). São coisas
  distintas — conferir qual delas a aula 2.3 formaliza.
- **Gemini Notebook** — produto novo na lista. Ver se reaparece no Módulo
  4 ou se é só citação de vitrine.
- 📖 Ler o *reading* sobre os **princípios de IA responsável** do Google
  (aula 2.9) — a aula manda explicitamente.
