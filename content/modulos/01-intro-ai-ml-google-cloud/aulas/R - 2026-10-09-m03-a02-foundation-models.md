---
title: Módulo 3, Aula 3.2 — Foundation models
aliases: [aula 3.2 Google AI ML, foundation models, Gemini Pro Flash Flash-Lite, Nano Banana, horizontal AI vertical AI, pre-trained fine-tuned]
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
summary: "A aula mais densa do Módulo 3 até agora: define foundation model pelos três eixos de tamanho, compara a família Gemini (Pro, Flash, Flash-Lite) e os modelos especialistas (Nano Banana, Veo, embeddings), explica multimodalidade e os quatro usos do Gemini, a diferença pré-treinado × fine-tuned com a analogia K-12, IA horizontal × vertical, e as três abordagens de desenvolvimento (console UI, APIs, SDKs)."
transcricao: "[[T - 2026-10-09-m03-a02-foundation-models]]"
data: 2026-10-09
curso: "[[curso-intro-ai-ml-google-cloud]]"
professor: ""
related: ["[[R - 2026-10-09-m03-a01-generative-ai-on-google-cloud]]"]
---

# Módulo 3, Aula 3.2 — Foundation models

| | |
|---|---|
| **Tema** | O que é um foundation model, quais o Google oferece e como customizá-los |
| **Curso** | [[curso-intro-ai-ml-google-cloud\|Introduction to AI and Machine Learning on Google Cloud]] |
| **Data** | 2026-10-09 (data da transcrição) |
| **Duração** | ~8min25 |
| **Aula nº / módulo** | 3.2 — Módulo 3 na ementa ("Module 2" na fala do curso) |

> 🎯 **Peso na prova: MUITO ALTO.** É a aula mais densa do Módulo 3 até
> agora — **seis blocos decoráveis**, incluindo a **tabela de escolha de
> modelo** (Pro × Flash × Flash-Lite), que é formato clássico de questão
> "qual modelo usar quando". Também tem **exercício guiado** no meio
> (§6), sinal de ênfase.

## Conteúdo por tópico

### 1. ⭐ O que é um foundation model

**Como a IA gera conteúdo novo:** aprende de uma **massa enorme de
conteúdo existente** (texto, imagem, vídeo). Esse processo de aprender a
partir de conteúdo existente chama-se **training**, e o resultado é a
criação de um **foundation model**.

> **Definição:** um foundation model é, em geral, um modelo **grande** em
> três sentidos:

| Eixo de "grande" |
|---|
| **1.** número significativo de **parâmetros** |
| **2.** **vastos dados de treinamento** |
| **3.** alta exigência de **poder computacional** |

📌 Decore os **três eixos juntos** — "grande" aqui não é só o número de
parâmetros.

**O que os parâmetros indicam:** a **capacidade do modelo de aprender
padrões complexos e armazenar informação**.

**A escala:** o número de parâmetros saltou de **milhões → trilhões** nos
últimos anos, o que significa que os foundation models estão ficando
progressivamente **mais capazes e "mais inteligentes"**.

### 2. ⭐ A família Gemini — a tabela de escolha

O Google treina foundation models para **propósitos gerais** (Gemini) e
para **tarefas especializadas** (Nano Banana). Esses modelos alimentam os
próprios produtos do Google — **Google Search** e **Workspace** — e
atendem usuários externos.

**Família Gemini** — ideal para **propósitos gerais** e casos de uso com
**dados multimodais**:

| Modelo | Característica | Ideal para | Palavra-chave |
|---|---|---|---|
| **Gemini Pro** | o **mais capaz** | tarefas **complexas** que exigem **raciocínio avançado** | *capacidade* |
| **Gemini Flash** | otimizado para **alta velocidade e baixa latência** | aplicações de **alto volume e tempo real**, como **chatbots** | *velocidade* |
| **Gemini Flash-Lite** | o **mais econômico** (*cost-effective*) | **alto volume** onde o **tempo não é crítico**: **tradução em lote** e **sumarização de conteúdo** | *custo* |

> 💡 **O eixo de decisão em três palavras:** **Pro = capacidade** ·
> **Flash = velocidade** · **Flash-Lite = custo**.
>
> A pegadinha provável é entre **Flash** e **Flash-Lite**: os dois servem
> a **alto volume**, mas o Flash é para quando **tempo importa** (tempo
> real) e o Flash-Lite para quando **não importa** (batch).

### 3. ⭐ Os modelos especialistas (specialty models)

Desenhados para **tarefas específicas**:

| Modelo | Para quê |
|---|---|
| **Nano Banana** | **geração de imagem** |
| **Veo** | **processamento de vídeo** |
| **embeddings models** | **busca semântica** e **representação de dados** |

⚠️ **Mudança em relação à aula 1.1.** Lá o modelo de imagem citado era o
**Imagen**; aqui é o **Nano Banana**. A própria aula avisa: *"this list is
subject to change due to the rapid evolution of foundation models"* e
manda consultar a documentação do Google (QR code ou reading list). Para
a prova deste curso, **vale a lista desta aula**.

📌 **Embeddings** aparece aqui pela primeira vez, com duas funções a
decorar: **busca semântica** e **representação de dados**.

### 4. As oportunidades de negócio

A gen AI, movida pelos foundation models, gera oportunidades de:
**aumentar produtividade** · **economizar custos operacionais** · **criar
novo valor**.

A aula retoma o caso [[R - 2026-09-01-m02-a01-a-use-case|Coffee on
Wheels]] como exemplo: automatizar a campanha de marketing, gerar feedback
de clientes e otimizar as rotas dos trucks.

### 5. ⭐ Multimodalidade

**O ponto de partida:** cada modelo especialista é **fine-tuned** para
performance ótima no seu domínio. **Porém** — e aqui está o argumento
central — o **Gemini tem o potencial de substituir alguns desses
modelos**, por ser de propósito geral e processar dados em **múltiplas
modalidades**.

**O que um modelo multimodal faz:**
- **processa** informação de várias fontes: texto, imagens, vídeo;
- **também gera** conteúdo em múltiplas modalidades.

**O exemplo da aula:** pedir ao Gemini para **gerar um vídeo de
passo-a-passo de uma receita a partir da foto de um cookie**.

**Por que isso é um salto.** A aula usa uma formulação forte, que vale
guardar:

> A capacidade multimodal marca **um salto significativo** na evolução da
> gen AI, mudando fundamentalmente **como a IA percebe e interage com seu
> ambiente**. Diferente dos modelos anteriores, **limitados a uma única
> modalidade**, a IA multimodal processa um conjunto de **"sentidos"** —
> texto, imagens, **áudio** e vídeo.

**O mecanismo e a consequência:**

```
processa e sintetiza informação de múltiplas fontes SIMULTANEAMENTE
                          ↓
             COMPREENSÃO HOLÍSTICA
                          ↓
  entende contextos complexos → raciocínio mais humano
                             → ações sofisticadas no mundo real
```

📌 A expressão **"holistic comprehension"** e a cadeia que ela destrava —
contextos complexos → raciocínio mais humano → ações no mundo real — são
o fecho conceitual da seção. A última parte liga direto com os **agentes**
das aulas 3.7 e 3.8.

### 6. ⭐ Os quatro usos do Gemini em operações de negócio

| # | Uso | O que faz | Exemplo da aula |
|---|---|---|---|
| 1 | **Information extraction** | **ler texto** de imagens e vídeos, extraindo informação crucial para processamento posterior | — |
| 2 | **Information analysis** | **analisar** a informação extraída, com base em prompts específicos | **categorizar despesas de um recibo** |
| 3 | **Information seeking** | **responder perguntas** ou gerar Q&A a partir da informação extraída de texto, imagens e vídeos | — |
| 4 | **Content creation** | **criar histórias ou anúncios** inspirados em imagens e vídeos | — |

📌 Os quatro são uma progressão: **extrair → analisar → consultar →
criar**. Esse encadeamento ajuda a lembrar a ordem.

**O exercício guiado da aula:**

> Você precisa avaliar **risco de seguro residencial** usando **imagens
> imobiliárias, históricos meteorológicos, relatórios de inspeção e vídeos
> de desastres**. Qual modelo do Google é o melhor?
> A) Veo · B) Embeddings · C) Nano Banana · **D) Gemini** ✅
>
> **Resposta: Gemini**, pelas suas poderosas capacidades multimodais.

📌 O enunciado mistura **quatro tipos de dado** de propósito — é o sinal
de que a resposta é o modelo multimodal generalista, não um especialista.

### 7. ⭐ Pré-treinado × fine-tuned

**O problema prático:** foundation models têm capacidades amplas, mas
**carecem de dados de treinamento suficientes** diante de problemas em
**campos especializados**, como **saúde** ou **finanças**.

**A solução:** o foundation model pode ser **treinado adicionalmente com
novos datasets específicos do campo**, gerando um **modelo novo**,
precisamente adaptado.

| | **Pre-trained** | **Fine-tuned** |
|---|---|---|
| **Para quê** | propósitos **gerais** | objetivos **específicos** |
| **Tamanho do dataset** | **grande** | **muito menor** |

**A analogia K-12 da aula:** depois de 12 anos de aprendizado fundamental
em **leitura, escrita e aritmética**, a pessoa fica alfabetizada e resolve
problemas básicos. Mas para virar **profissional** — médico, engenheiro
automotivo, consultor financeiro — é preciso **treinamento e educação
especializados adicionais**.

### 8. ⭐ IA horizontal × IA vertical

| | **Horizontal AI** | **Vertical AI** |
|---|---|---|
| **O que é** | **foundation models**, como os **LLMs** | modelos **fine-tuned para indústrias específicas** |
| **Por quê** | **capacidades amplas** | miram **nichos de indústria** |
| **Resolve** | desafios **comuns entre indústrias** | problemas **especializados** |
| **Exemplos de indústria** | — | **varejo, finanças, saúde** |
| **Exemplo de problema** | — | **diagnóstico de doenças** |

**As três categorias de desafio que a IA horizontal resolve:**

1. **Content creation** — texto, imagem, áudio, vídeo e **código**
2. **Information synthesis** — **abstração e sumarização de documentos**
3. **Conversation generation** — **perguntas e respostas**

📌 Mnemônico: **horizontal = largo, atravessa indústrias** ·
**vertical = fundo, mergulha numa indústria**.

### 9. ⭐ As três abordagens para desenvolvedores

Três formas de trabalhar com os foundation models no Google Cloud, *"each
accomplishing the same goal with varying degrees of flexibility"*:

| Abordagem | Nível | Detalhe |
|---|---|---|
| **Google Cloud console UI** | **no-code** | perfeito para **explorar e testar prompts** |
| **Gen AI model APIs** | **low-code** | ex.: **Gemini APIs**, usadas com ferramentas de linha de comando como **cUrl** |
| **Predefined SDKs** | **code-based** | em **Python** e **Java**, usados com notebooks como **Gemini Enterprise Agent Platform Colab Enterprise** e **Gemini Enterprise Agent Platform Workbench** |

> ⚠️ **Não confunda com a escada da aula 1.1.** Aquela era sobre **escolher
> uma ferramenta de desenvolvimento de IA** (Gemini Enterprise app /
> AutoML → pre-trained APIs → BigQuery ML / custom training). **Esta** é
> sobre **como acessar os foundation models**. Mesmos três rótulos
> (no-code / low-code / code-based), produtos diferentes.

✅ **Resolve parcialmente o mistério do "Notebook".** Aparecem dois
notebooks nomeados: **Colab Enterprise** e **Workbench**, ambos sob
"Gemini Enterprise Agent Platform". São os antigos **Vertex AI Colab
Enterprise** e **Vertex AI Workbench**.

## Glossário da aula

- **Training** — o processo de **aprender a partir de conteúdo existente**;
  resulta num foundation model.
- **Foundation model** — modelo **grande** em **parâmetros**, **dados de
  treinamento** e **exigência computacional**.
- **Parâmetros** — indicam a capacidade do modelo de **aprender padrões
  complexos e armazenar informação**; foram de **milhões a trilhões**.
- **Gemini Pro** — o **mais capaz**; tarefas complexas com **raciocínio
  avançado**.
- **Gemini Flash** — **alta velocidade e baixa latência**; alto volume em
  **tempo real** (chatbots).
- **Gemini Flash-Lite** — o **mais econômico**; alto volume **sem urgência**
  (tradução em lote, sumarização).
- **Nano Banana** — modelo especialista de **geração de imagem**.
- **Veo** — modelo especialista de **processamento de vídeo**.
- **Embeddings models** — **busca semântica** e **representação de dados**.
- **Multimodal** — processa **e gera** conteúdo em várias modalidades:
  texto, imagens, **áudio** e vídeo.
- **Holistic comprehension** — a compreensão que vem de **sintetizar
  múltiplas fontes simultaneamente**; destrava contextos complexos,
  raciocínio mais humano e ações no mundo real.
- **Information extraction / analysis / seeking / content creation** — os
  **quatro usos** do Gemini em operações de negócio.
- **Pre-trained** — treinado para **propósitos gerais** com um dataset
  **grande**.
- **Fine-tuned** — treinado para **objetivos específicos** com um dataset
  **muito menor**.
- **Horizontal AI** — foundation models/LLMs; **capacidades amplas**,
  desafios **comuns entre indústrias**.
- **Vertical AI** — modelos fine-tuned para **indústrias específicas**;
  **nichos** e problemas **especializados**.
- **Google Cloud console UI** — abordagem **no-code**; explorar e testar
  prompts.
- **Gemini APIs** — abordagem **low-code**; usadas com **cUrl**.
- **SDKs predefinidos** — abordagem **code-based**; **Python** e **Java**.
- **Colab Enterprise** e **Workbench** — os notebooks da Gemini Enterprise
  Agent Platform.

## Flashcards

| Pergunta | Resposta |
|---|---|
| O que é **training**? | Aprender a partir de **conteúdo existente**; resulta num foundation model |
| Em que **três sentidos** um foundation model é "grande"? | **Parâmetros** · **dados de treinamento** · **poder computacional** exigido |
| O que o número de parâmetros indica? | A capacidade de **aprender padrões complexos e armazenar informação** |
| De quanto para quanto foram os parâmetros? | De **milhões** para **trilhões** |
| ⭐ **Gemini Pro** — para quê? | O **mais capaz**; tarefas complexas com **raciocínio avançado** |
| ⭐ **Gemini Flash** — para quê? | **Alta velocidade e baixa latência**; alto volume em **tempo real**, como chatbots |
| ⭐ **Gemini Flash-Lite** — para quê? | O **mais econômico**; alto volume onde **tempo não é crítico** (tradução em lote, sumarização) |
| O eixo de decisão dos três em uma palavra cada | Pro = **capacidade** · Flash = **velocidade** · Flash-Lite = **custo** |
| **Nano Banana** faz o quê? | **Geração de imagem** |
| **Veo** faz o quê? | **Processamento de vídeo** |
| **Embeddings models** fazem o quê? | **Busca semântica** e **representação de dados** |
| Quais produtos do Google esses modelos alimentam? | **Google Search** e **Workspace** |
| O que um modelo multimodal faz? | **Processa e gera** conteúdo em várias modalidades: texto, imagens, áudio e vídeo |
| O exemplo multimodal da aula | Gerar um **vídeo de receita** a partir da **foto de um cookie** |
| O que a compreensão holística destrava? | Entender **contextos complexos** → **raciocínio mais humano** → **ações sofisticadas no mundo real** |
| Os **quatro usos** do Gemini em negócios | **Information extraction → analysis → seeking → content creation** |
| Exemplo de *information analysis* | **Categorizar despesas de um recibo** |
| **Pre-trained** × **fine-tuned** | Pré-treinado: propósitos **gerais**, dataset **grande**. Fine-tuned: objetivos **específicos**, dataset **muito menor** |
| Qual a analogia usada? | **K-12**: 12 anos de base → alfabetizado; virar médico ou engenheiro exige **treinamento especializado adicional** |
| O que é **horizontal AI**? | **Foundation models / LLMs** — capacidades amplas, desafios **comuns entre indústrias** |
| O que é **vertical AI**? | Modelos **fine-tuned para indústrias específicas** — nichos e problemas especializados |
| Exemplo de problema de vertical AI | **Diagnóstico de doenças** |
| As três categorias que a horizontal AI resolve | **Content creation** · **information synthesis** · **conversation generation** |
| As três abordagens de desenvolvimento | **Console UI** (no-code) · **Gen AI APIs** (low-code) · **SDKs** (code-based) |
| Qual ferramenta acompanha as APIs? | **cUrl** |
| Quais linguagens nos SDKs? | **Python** e **Java** |
| Quais notebooks a aula cita? | **Colab Enterprise** e **Workbench** |

## Questões estilo prova

**1.** Uma empresa precisa traduzir 2 milhões de descrições de produto
durante a madrugada. O custo é a principal restrição e não há urgência de
tempo. Qual modelo Gemini?

- A) Gemini Pro
- B) Gemini Flash
- C) Gemini Flash-Lite
- D) Nano Banana

<details><summary>Gabarito</summary>

**C — Gemini Flash-Lite.** É o **mais econômico**, indicado para **alto
volume onde o tempo não é crítico** — e **tradução em lote** é literalmente
um dos dois exemplos da aula. (B) seria a escolha se fosse **tempo real**.
(A) é para raciocínio complexo, caro demais aqui. (D) é de imagem.
</details>

**2.** Um banco vai lançar um chatbot de atendimento com milhares de
conversas simultâneas, onde a resposta precisa ser instantânea. Qual
modelo?

- A) Gemini Pro
- B) Gemini Flash
- C) Gemini Flash-Lite
- D) Embeddings

<details><summary>Gabarito</summary>

**B — Gemini Flash.** **Alta velocidade e baixa latência**, para aplicações
de **alto volume em tempo real** — e **chatbot** é o exemplo que a aula dá.
A pegadinha é (C): também é alto volume, mas **sem urgência**.
</details>

**3.** Em que três sentidos um foundation model é considerado "grande"?

<details><summary>Gabarito</summary>

**Número de parâmetros**, **volume de dados de treinamento** e
**exigência de poder computacional**. Responder só "muitos parâmetros"
cobre um terço da definição.
</details>

**4.** Uma seguradora quer avaliar risco usando fotos de imóveis,
históricos de clima, relatórios de inspeção e vídeos de desastres. Qual
modelo?

- A) Veo
- B) Embeddings
- C) Nano Banana
- D) Gemini

<details><summary>Gabarito</summary>

**D — Gemini**, pelas capacidades **multimodais**. É o exercício da própria
aula. A pista no enunciado é a **mistura de tipos de dado**: quando há
texto, imagem e vídeo juntos, a resposta é o generalista multimodal, não um
especialista.
</details>

**5.** Classifique como **horizontal** ou **vertical AI**:
*(i)* um LLM que resume documentos de qualquer setor ·
*(ii)* um modelo fine-tuned para diagnóstico de doenças ·
*(iii)* um foundation model que gera texto, imagem e código ·
*(iv)* um modelo treinado para análise de risco de crédito bancário.

<details><summary>Gabarito</summary>

**Horizontal:** (i) e (iii) — foundation models com capacidades amplas,
atendendo desafios comuns entre indústrias.
**Vertical:** (ii) e (iv) — fine-tuned para nichos de indústria (saúde e
finanças), resolvendo problemas especializados.
</details>

**6.** Qual a diferença entre um modelo **pré-treinado** e um **fine-tuned**
quanto ao tamanho do dataset?

<details><summary>Gabarito</summary>

O **pré-treinado** usa um dataset **grande**, para **propósitos gerais**. O
**fine-tuned** usa um dataset **muito menor**, para **objetivos
específicos**. É a analogia **K-12**: a base ampla vem primeiro; a
especialização é curta e focada.
</details>

**7.** Uma desenvolvedora quer testar e explorar prompts rapidamente, sem
escrever código. Qual abordagem?

- A) Gemini APIs com cUrl
- B) SDKs em Python
- C) Google Cloud console UI
- D) Colab Enterprise

<details><summary>Gabarito</summary>

**C — Google Cloud console UI**, a abordagem **no-code**, descrita como
*"perfect for exploring and testing prompts"*. (A) é **low-code**; (B) e
(D) são **code-based**.
</details>

**8.** O que os modelos de **embeddings** fazem?

<details><summary>Gabarito</summary>

**Busca semântica** e **representação de dados**. São modelos
especialistas, ao lado do Nano Banana (imagem) e do Veo (vídeo).
</details>

## Dúvidas em aberto / revisar
- ⚠️ **Nano Banana substituiu o Imagen** como modelo de imagem citado. A
  aula 1.1 dizia **Imagen**; esta diz **Nano Banana**. A própria aula avisa
  que a lista muda rápido. **Para a prova deste curso, vale a lista desta
  aula.**
- ✅ **Resolvido em parte:** os notebooks da Agent Platform são o **Colab
  Enterprise** e o **Workbench** (antigos Vertex AI Colab Enterprise e
  Vertex AI Workbench). Continua em aberto se o "Gemini Notebook" da aula
  3.1 é um terceiro produto ou apelido de um destes.
- ⚠️ **Duas escadas no-code/low-code/code-based.** A da aula 1.1 é sobre
  **escolher a ferramenta de desenvolvimento de IA**; a desta aula é sobre
  **como acessar os foundation models**. Mesmos rótulos, produtos
  diferentes — risco real de confusão numa questão.
- 📖 A aula manda consultar a **documentação do Google** (QR code ou
  reading list, aula 3.11) para a lista atualizada de modelos.
