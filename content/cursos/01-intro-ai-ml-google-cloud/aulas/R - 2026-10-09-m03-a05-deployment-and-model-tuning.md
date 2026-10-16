---
title: Módulo 3, Aula 3.5 — Deployment and model tuning
aliases: [aula 3.5 Google AI ML, grounding RAG, parameter-efficient tuning, adapter tuning, full fine-tuning, supervised fine-tuning, JSONL tuning dataset, Model Registry]
tags: [aula, trabalho]
type: aula
area: trabalho
created: 2026-10-09
updated: 2026-10-09
status: concluída
fonte: transcricao
confianca: media
papel: derivada
indexar: true
summary: "Fecha o ciclo prompt-to-production. Entrega finalmente o grounding e o RAG — 'grounding é o quê, RAG é o como' — e a distinção fine-tuning (conhecimento interno) × grounding (informação externa), estendendo a analogia K-12. Apresenta as três opções de tuning em ordem de exigência técnica (prompt design → parameter-efficient/adapter tuning → full fine-tuning), o supervised fine-tuning suportado pela Agent Platform, e o formato JSONL do dataset de tuning."
transcricao: "[[T - 2026-10-09-m03-a05-deployment-and-model-tuning]]"
data: 2026-10-09
curso: "[[curso-intro-ai-ml-google-cloud]]"
professor: ""
related: ["[[R - 2026-10-09-m03-a04-prompt-engineering]]", "[[R - 2026-10-09-m03-a02-foundation-models]]"]
---

# Módulo 3, Aula 3.5 — Deployment and model tuning

| | |
|---|---|
| **Tema** | A segunda metade do ciclo: integração, deployment, grounding/RAG e tuning |
| **Curso** | [[curso-intro-ai-ml-google-cloud\|Introduction to AI and Machine Learning on Google Cloud]] |
| **Data** | 2026-10-09 (data da transcrição) |
| **Duração** | ~8min |
| **Aula nº / módulo** | 3.5 — Módulo 3 na ementa ("Module 2" na fala do curso) |

> 🎯 **Peso na prova: MUITO ALTO.** Esta aula entrega **duas distinções
> conceituais** que são quase certamente questão: **grounding × RAG** (§3)
> e **fine-tuning × grounding** (§4). Ela também traz a **escada de
> tuning** (§5) com três níveis e um detalhe técnico que separa os dois
> últimos: **quantos parâmetros são atualizados**.
>
> ✅ Finalmente cumpre a promessa da aula 3.3 sobre o **RAG**.

## Conteúdo por tópico

### 1. Onde esta aula se encaixa

Ann já desenhou, avaliou e gerenciou prompts (aula 3.4). Agora ela se une
ao **Ian**, o **ML engineer** responsável por **construir o pipeline e
monitorar performance** — e entramos na **segunda metade** do ciclo:

```
┌──── AULA 3.4 ────┐   ┌──────── AULA 3.5 (esta) ────────┐
  design →              INTEGRAÇÃO E DEPLOYMENT
  avaliação →           build e test → monitor e optimize
  refino
```

### 2. Do protótipo ao código customizável

**O problema:** Bea e Ann já tinham clicado **Build with Code** → **Deploy
as app** e obtido uma aplicação. **Mas e se quiserem customizá-la ou
integrar features em outras aplicações?**

**A resposta:** o Agent Studio **gera o código automaticamente**.

| Abordagem | Nível | O quê |
|---|---|---|
| **User interface** | **no code** | explorar e testar prompts |
| **SDKs em Python** · **APIs com cUrl** | **low-code** | acessar os modelos de IA |

Basta clicar **"Build with code"** para ver o código que descreve **o
prompt e seus parâmetros**.

⚠️ **Nota de inconsistência.** A aula **3.2** classificava os **SDKs** como
**code-based** e só as APIs como low-code. Aqui os dois aparecem juntos
sob **low-code**. Se a questão vier da 3.2, siga a 3.2; se citar "Build
with code", é esta.

**O ambiente integrado:** **Cloud Run** e **Cloud Shell** *"streamline
production and remove the need to worry about the underlying cloud
architecture"* — simplificam a produção e eliminam a preocupação com a
arquitetura de nuvem subjacente.

### 3. ⭐⭐ Grounding e RAG — a frase da aula

**O problema que eles resolvem:** modelos gen AI são frequentemente
**pré-treinados**, ou seja, suas respostas dependem de dados de
treinamento **potencialmente desatualizados ou imprecisos**.

| Conceito | Definição da aula |
|---|---|
| **Grounding** | **conecta os modelos a fontes de dados externas confiáveis**, garantindo que as respostas sejam **verificadas contra a informação mais recente** |
| **RAG** *(retrieval-augmented generation)* | **um método para implementar essa ideia** |

> 💡 **A frase que vale decorar literalmente:**
> **"Think of grounding as the WHAT and RAG as the HOW."**
>
> **Grounding é o QUÊ** (o objetivo: ancorar o modelo em dados confiáveis).
> **RAG é o COMO** (a técnica que realiza isso).

**As duas fontes de grounding no Agent Studio:**

| Fonte | Para quê |
|---|---|
| **Google real-time search** | a **informação mais atual** |
| **Seus próprios dados** | instruir a IA com **conhecimento específico do campo** |

📌 A aula recomenda dois cursos para aprofundar, que implementam pipelines
de RAG nas **duas plataformas principais**:
- *Create Embeddings, Vector Search and RAG with **BigQuery***
- *Vector Search and Embeddings with Agent Search on **Agent Platform***

### 4. ⭐⭐ Model tuning — e a distinção que a prova vai cobrar

**O que o tuning resolve:** grounding e RAG fazem **fact checking**; o
**model tuning** melhora **a qualidade da geração de conteúdo em si**.

**Como funciona:** fornece ao modelo um **dataset de treinamento com
exemplos de tarefas downstream específicas**.

> ⭐⭐ **A distinção central, nas palavras da aula:**
>
> | | O que faz |
> |---|---|
> | **Fine-tuning** | **refina o conhecimento e as habilidades INTERNAS** do modelo |
> | **Grounding** | **aumenta seu conhecimento com informação EXTERNA**, em tempo real e confiável |
>
> **Interno × externo.** É esse o eixo.

**A analogia K-12 estendida** — a aula retoma a comparação da aula 3.2 e
**acrescenta um terceiro degrau**:

| Etapa | Equivalente em IA |
|---|---|
| **Educação K-12** | o **foundation model** |
| **Faculdade de medicina** — treinamento profissional especializado que embute expertise de domínio | o **fine-tuning** |
| **Checar continuamente as pesquisas mais recentes, tratamentos medicamentosos e políticas médicas** | o **grounding** |

> 💡 Essa analogia é a melhor ferramenta de memória do módulo: o
> fine-tuning é o **diploma** (muda quem você é); o grounding é **ler o
> jornal todo dia** (mantém você atualizado sem mudar sua formação).

### 5. ⭐⭐ As três opções de tuning — a escada

Ordenadas **do menos ao mais técnico**, e **do menos ao mais custoso em
recursos computacionais**:

```
menos técnico · menos recursos
        │
        ├─ 1. PROMPT DESIGN
        │     exemplos e instruções em linguagem natural
        │     ⚠️ NÃO altera os parâmetros do modelo
        │
        ├─ 2. PARAMETER-EFFICIENT TUNING (= adapter tuning)
        │     atualiza um subconjunto PEQUENO dos parâmetros
        │
        └─ 3. FULL FINE-TUNING
              atualiza TODOS os parâmetros
        │
mais técnico · mais recursos
```

#### 1. Prompt design

- Tuna o modelo com **exemplos e instruções em linguagem natural**.
- ⚠️ **Não altera os parâmetros do modelo.** Em vez disso, **melhora a
  capacidade do modelo de responder apropriadamente, guiando-o sobre como
  reagir**.
- **Dois benefícios nomeados:**
  1. permite **experimentação e customização rápidas**;
  2. **não exige conhecimento especializado de ML nem habilidades de
     código** — acessível a um público mais amplo.

#### 2. Parameter-efficient tuning (*adapter tuning*)

- Permite **adaptação eficiente de modelos grandes** à sua tarefa ou
  domínio específico.
- **Atualiza um subconjunto relativamente pequeno dos parâmetros** durante
  o tuning.

📌 **Guarde o sinônimo:** *parameter-efficient tuning* = **adapter
tuning**.

#### 3. Full fine-tuning

- Ideal para **tarefas altamente complexas**; alcança **resultados de maior
  qualidade**.
- **Exige mais recursos computacionais** — tanto para **tuning** quanto
  para **serving**.
- **Atualiza TODOS os parâmetros** do modelo.

> 💡 **O detalhe que separa 2 de 3 numa questão:** **quantos parâmetros são
> atualizados.** PET = um **subconjunto pequeno**; full fine-tuning =
> **todos**. E o custo do full fine-tuning é em **tuning *e* serving**,
> não só no treino.

### 6. ⭐ Supervised fine-tuning

> *"Agent Platform **currently supports supervised fine-tuning** to
> customize foundational models."*

| Aspecto | Detalhe |
|---|---|
| **O que faz** | melhora a performance **ensinando uma nova habilidade** |
| **Com o quê** | dados com **centenas de exemplos rotulados**, que ensinam o modelo a **imitar um comportamento ou tarefa desejada** |
| **O papel de cada exemplo** | **demonstra a saída desejada** |
| **O resultado** | **um NOVO modelo**, que **combina os parâmetros recém-aprendidos com o modelo original** |
| **Quando é boa opção** | tarefas **bem definidas** com **dados rotulados disponíveis** |
| **Tarefas que melhora** | **classificação, sumarização, extração e chat** |

📌 **Relação com a escada da §5 — e isso é sutil:** o *supervised
fine-tuning* é a **abordagem**; ele **pode ser implementado** com
**parameter-efficient tuning** *ou* com **full fine-tuning**, dependendo da
**complexidade da tarefa** e dos **recursos computacionais disponíveis**.
Não são alternativas concorrentes — são **níveis diferentes de
abstração**.

### 7. ⭐ Como rodar um tuning job no Agent Studio

**O passo a passo:**

1. Menu do Agent Studio → **Tuning** → **"Create a tuned model"**
2. Especificar os **detalhes do modelo** e o **dataset de tuning**
3. Iniciar o job e **monitorar o status no Google Cloud console**
4. Ao concluir, o modelo tunado aparece no **Model Registry** na Gemini
   Enterprise Agent Platform
5. De lá, **implantá-lo num endpoint para serving** ou **testá-lo mais no
   Agent Studio**

⚠️ A aula avisa: *"the UI may change as the product progresses"*.

**⭐ O formato do dataset de tuning:**

Estruturado como **dados de treinamento supervisionado**, num arquivo
**JSONL**. Cada *record* (linha) contém **um par de dados de texto**:

| Campo | O que é |
|---|---|
| **input text** | o **prompt** |
| **output text** | a **resposta esperada** do modelo |

**O exemplo da aula** (análise de sentimento):

| Input (prompt) | Output (rótulo esperado) |
|---|---|
| *"This commercial building is architecturally interesting and has a great interior layout."* | **positive** |
| *"The room was terrible. It needs major rework."* | **negative** |

📌 **JSONL** é cobrável como formato — não JSON, não CSV.

### 8. O que o lab 3.6 vai cobrir

| # | Objetivo |
|---|---|
| 1 | **Criar uma aplicação diretamente de um prompt** |
| 2 | **Projetar prompts eficazes** aplicando boas práticas |
| 3 | **Fazer engenharia e gerenciar prompts** com features como **prompt evaluation** |
| 4 | **Usar prompts multimodais e gerar mídia** |

Ao fim, *"well-equipped to use Gemini multimodal with Agent Studio"*.

## Glossário da aula

- **Ian** — o **ML engineer** da Cymbal; responsável por **construir o
  pipeline e monitorar performance**.
- **Build with code** — o botão que revela o **código do prompt e seus
  parâmetros**.
- **Cloud Run** e **Cloud Shell** — o **ambiente de desenvolvimento
  integrado** que simplifica a produção e **elimina a preocupação com a
  arquitetura de nuvem subjacente**.
- **Grounding** — **conectar o modelo a fontes externas confiáveis** para
  verificar as respostas contra a informação mais recente. **É o QUÊ.**
- **RAG** (*retrieval-augmented generation*) — **o método que implementa o
  grounding**. **É o COMO.**
- **Google real-time search** — uma das duas fontes de grounding: a
  informação mais atual.
- **Model tuning** — melhorar a **qualidade da geração** fornecendo ao
  modelo um **dataset de exemplos de tarefas downstream**.
- **Fine-tuning** — **refina o conhecimento e as habilidades internas** do
  modelo.
- **Prompt design** — tuning com **exemplos e instruções em linguagem
  natural**; ⚠️ **não altera os parâmetros**.
- **Parameter-efficient tuning** (= **adapter tuning**) — atualiza um
  **subconjunto pequeno** dos parâmetros.
- **Full fine-tuning** — atualiza **todos** os parâmetros; mais recursos em
  **tuning e serving**.
- **Supervised fine-tuning** — ensina **uma nova habilidade** com
  **centenas de exemplos rotulados**; o resultado é um **novo modelo** que
  **combina os parâmetros novos com o original**.
- **Downstream task** — a tarefa específica para a qual o modelo é
  adaptado.
- **JSONL** — o formato do **dataset de tuning**; cada linha tem **input
  text** (prompt) e **output text** (resposta esperada).
- **Model Registry** — onde o modelo tunado aparece, na Gemini Enterprise
  Agent Platform.
- **Endpoint** — onde o modelo é implantado para **serving**.
- **Serving** — servir predições do modelo em produção.

## Flashcards

| Pergunta | Resposta |
|---|---|
| Que metade do ciclo esta aula cobre? | A **segunda**: integração e deployment — de **build e test** a **monitor e optimize** |
| Quem é **Ian** e o que ele faz? | O **ML engineer**; constrói o **pipeline** e **monitora performance** |
| O que o botão **"Build with code"** mostra? | O **código que descreve o prompt e seus parâmetros** |
| Que ambiente integrado simplifica a produção? | **Cloud Run** e **Cloud Shell** |
| ⭐⭐ **Grounding** × **RAG** em uma frase | **Grounding é o QUÊ; RAG é o COMO** |
| Defina **grounding** | **Conectar o modelo a fontes externas confiáveis**, verificando as respostas contra a informação mais recente |
| Defina **RAG** | **Um método para implementar o grounding** |
| Por que grounding/RAG são necessários? | Porque modelos **pré-treinados** dependem de dados **potencialmente desatualizados ou imprecisos** |
| As duas fontes de grounding no Agent Studio | **Google real-time search** e **seus próprios dados** |
| ⭐⭐ **Fine-tuning** × **grounding** | Fine-tuning refina o conhecimento **INTERNO**; grounding aumenta com informação **EXTERNA** |
| A analogia K-12 estendida | **K-12** = foundation model · **faculdade de medicina** = fine-tuning · **checar pesquisas e políticas** = grounding |
| As três opções de tuning, do menos ao mais técnico | **Prompt design** → **parameter-efficient tuning** → **full fine-tuning** |
| ⚠️ O **prompt design** altera os parâmetros? | **Não.** Ele **guia o modelo sobre como reagir** |
| Os dois benefícios do prompt design | **Experimentação rápida** e **não exigir conhecimento de ML nem código** |
| Qual o outro nome do **parameter-efficient tuning**? | **Adapter tuning** |
| Quantos parâmetros o **PET** atualiza? | Um **subconjunto relativamente pequeno** |
| Quantos parâmetros o **full fine-tuning** atualiza? | **Todos** |
| Onde o full fine-tuning custa mais recursos? | Em **tuning e serving** |
| O que a Agent Platform **atualmente suporta**? | **Supervised fine-tuning** |
| O que o supervised fine-tuning faz? | Melhora a performance **ensinando uma nova habilidade** |
| Quantos exemplos ele usa? | **Centenas de exemplos rotulados** |
| Qual a saída de um tuning job? | Um **novo modelo** que **combina os parâmetros recém-aprendidos com o modelo original** |
| Para que tarefas o supervised fine-tuning é bom? | **Classificação, sumarização, extração e chat** |
| Com que técnicas ele pode ser implementado? | **Parameter-efficient tuning** ou **full fine-tuning** |
| Qual o formato do dataset de tuning? | **JSONL** |
| O que cada linha do JSONL contém? | **Input text** (o prompt) e **output text** (a resposta esperada) |
| Onde o modelo tunado aparece ao fim? | No **Model Registry** da Gemini Enterprise Agent Platform |
| O que fazer com ele depois? | **Implantar num endpoint** para serving ou **testar no Agent Studio** |

## Questões estilo prova

**1.** Qual afirmação descreve corretamente a relação entre **grounding** e
**RAG**?

- A) São sinônimos
- B) RAG é o objetivo; grounding é a técnica que o implementa
- C) Grounding é o objetivo; RAG é um método para implementá-lo
- D) Grounding substitui o fine-tuning

<details><summary>Gabarito</summary>

**C.** A aula é literal: *"Think of grounding as the what and RAG as the
how."* **Grounding é o QUÊ**, **RAG é o COMO**. (B) inverte exatamente os
papéis — é o distrator mais provável.
</details>

**2.** Um hospital quer que seu assistente de IA (a) domine o vocabulário
clínico da instituição e (b) cite sempre as diretrizes mais recentes do
Ministério da Saúde. Que combinação resolve?

- A) Só fine-tuning
- B) Só grounding
- C) Fine-tuning para (a) e grounding para (b)
- D) Grounding para (a) e fine-tuning para (b)

<details><summary>Gabarito</summary>

**C.** O **fine-tuning refina o conhecimento interno** — o vocabulário e o
comportamento da instituição. O **grounding aumenta com informação
externa, em tempo real e confiável** — as diretrizes atualizadas. É a
analogia da faculdade de medicina (diploma) × checar as pesquisas mais
recentes (atualização contínua).
</details>

**3.** Qual é a diferença técnica entre **parameter-efficient tuning** e
**full fine-tuning**?

<details><summary>Gabarito</summary>

O **parameter-efficient tuning** (= **adapter tuning**) atualiza **um
subconjunto relativamente pequeno** dos parâmetros do modelo. O **full
fine-tuning** atualiza **todos** os parâmetros — e por isso exige **mais
recursos computacionais**, tanto no **tuning** quanto no **serving**.
</details>

**4.** O **prompt design** altera os parâmetros do modelo?

- A) Sim, um subconjunto pequeno
- B) Sim, todos
- C) Não — ele guia o modelo sobre como reagir
- D) Só se usar few-shot

<details><summary>Gabarito</summary>

**C — não.** A aula destaca isso: *"prompt design does not alter the
parameters of the AI model. Instead, it improves the model's ability to
respond appropriately by guiding it on how to react."* É justamente por
isso que ele é a opção **menos técnica e menos custosa**.
</details>

**5.** Em que formato deve estar o dataset de tuning, e o que contém cada
linha?

<details><summary>Gabarito</summary>

Num arquivo **JSONL**, estruturado como **dados de treinamento
supervisionado**. Cada linha contém um **par de textos**: o **input text**
(o prompt) e o **output text** (a resposta esperada do modelo).
</details>

**6.** Uma equipe tem milhares de tickets de suporte já classificados por
categoria e quer que o modelo passe a classificar novos tickets do mesmo
jeito. Qual abordagem a Agent Platform oferece?

- A) Grounding com Google search
- B) Supervised fine-tuning
- C) Prompt design apenas
- D) RAG com dados próprios

<details><summary>Gabarito</summary>

**B — supervised fine-tuning.** É exatamente o caso: **tarefa bem
definida** (classificação) com **dados rotulados disponíveis**. A aula
cita **classificação** entre as tarefas que ele melhora, e diz que a Agent
Platform **atualmente suporta** essa abordagem.
</details>

**7.** O supervised fine-tuning e o parameter-efficient tuning são
alternativas concorrentes?

<details><summary>Gabarito</summary>

**Não.** O **supervised fine-tuning é a abordagem**; ele **pode ser
implementado** com **parameter-efficient tuning** *ou* com **full
fine-tuning**, conforme a **complexidade da tarefa** e os **recursos
disponíveis**. São **níveis de abstração diferentes**.
</details>

**8.** Onde o modelo tunado aparece quando o job termina?

<details><summary>Gabarito</summary>

No **Model Registry** da Gemini Enterprise Agent Platform. De lá se pode
**implantá-lo num endpoint para serving** ou **testá-lo no Agent Studio**.
</details>

## Dúvidas em aberto / revisar
- ✅ **Pendência fechada: RAG.** Prometido na aula 3.3, entregue aqui, com
  a distinção grounding (o quê) × RAG (o como).
- ⚠️ **Chain-of-thought continua sem aparecer.** Foi nomeado na 3.3 entre
  as técnicas avançadas e não voltou nem na 3.4 nem na 3.5. Restam 3.7 e
  3.8.
- ⚠️ **Inconsistência leve sobre os SDKs.** A aula 3.2 os classifica como
  **code-based**; esta os põe junto das APIs sob **low-code**. Se a questão
  vier do quadro das três abordagens, use a 3.2.
- ⚠️ **Agent Garden** e **Model Garden** continuam sem definição desde a
  3.1. Restam 3.7 e 3.8.
- 📌 Dois cursos recomendados para RAG: *Create Embeddings, Vector Search
  and RAG with BigQuery* e *Vector Search and Embeddings with Agent Search
  on Agent Platform*. Links no reading list (aula 3.11).

## Ações / próximos passos
| Ação | Prazo |
|---|---|
| Decorar **"grounding é o quê, RAG é o como"** | — |
| Fixar fine-tuning = **interno** · grounding = **externo** | — |
| Decorar a escada: prompt design (não altera parâmetros) → PET/adapter (subconjunto) → full fine-tuning (todos) | — |
| Fixar **JSONL** com input text + output text | — |
| Fazer o **lab 3.6** (obrigatório) | — |
| Assistir 3.7 "AI agents" | — |

## Fontes
- Transcrição da aula — [[T - 2026-10-09-m03-a05-deployment-and-model-tuning]]
