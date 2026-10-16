---
title: "Google AI/ML — Módulo 3: Simulado"
aliases: ["simulado do Módulo 3 (Google AI/ML)"]
tags: [aula, trabalho]
type: note
area: trabalho
created: 2026-10-09
updated: 2026-10-09
status: evergreen
fonte: mista
confianca: media
papel: derivada
indexar: true
summary: Simulado de 30 questões no estilo da prova sobre o Módulo 3 (Generative AI e foundation models) da certificação Google, aulas 3.1 a 3.9, com gabarito comentado.
parte_de: "[[google-ai-ml-modulo-3-revisao]]"
related: ["[[google-ai-ml-modulo-3-glossario]]", "[[google-ai-ml-modulo-3-flashcards]]"]
---

# Google AI/ML — Módulo 3: Simulado

Material de estudo do Módulo 3 (Generative AI e foundation models) do curso [[curso-intro-ai-ml-google-cloud]], cobrindo aulas 3.1 a 3.9. Faz parte de [[google-ai-ml-modulo-3-revisao]]; os outros dois materiais do módulo são [[google-ai-ml-modulo-3-glossario]] e [[google-ai-ml-modulo-3-flashcards]].

**Instruções:** 30 questões no estilo da prova. Faça as 30 **sem olhar o
gabarito**, anote suas respostas, e só depois confira. Meta: **24/30 (80%)**.
Tempo sugerido: **35 minutos**.

O gabarito está comentado — explico também **por que cada distrator falha**,
porque na prova real os distratores são plausíveis de propósito.

---

## Parte I — Gen AI, stack e timeline (1–5)

**1.** Qual a definição de gen AI usada no curso?
- A) Um tipo de IA que classifica dados em categorias
- B) Um tipo de IA que gera conteúdo e toma ações por você
- C) Um subconjunto de machine learning que usa dados rotulados
- D) Uma arquitetura de rede neural

**2.** Como a gen AI "toma ações" em seu nome?
- A) Através de pipelines de dados
- B) Através de AI agents
- C) Através de AutoML
- D) Através de BigQuery ML

**3.** O que a pesquisa do Transformer, de 2017, representa?
- A) O primeiro modelo multimodal
- B) A arquitetura de deep learning que sustenta todas as aplicações modernas de gen AI
- C) O lançamento do Gemini
- D) A primeira implementação de RAG

**4.** Quais são as três camadas do stack de gen AI do Google Cloud?
- A) Networking and security → compute e storage → data and AI products
- B) Foundation models → AI development → AI applications
- C) Ingestão → treinamento → serving
- D) Model → tools → orchestration layer

**5.** Em 2026, segundo o curso, o Google avança para:
- A) Modelos nativamente multimodais
- B) Uma abordagem centrada em plataforma para IA agêntica
- C) A primeira versão do Gemini
- D) Modelos abertos com pesos públicos

---

## Parte II — Foundation models (6–12)

**6.** Um foundation model é chamado de "grande" em três sentidos. Quais?
- A) Parâmetros, dados de treinamento e poder computacional
- B) Usuários, receita e latência
- C) Camadas, neurônios e épocas
- D) Texto, imagem e áudio

**7.** Você precisa atender milhões de requisições de chat em tempo real, com
latência mínima. Qual modelo Gemini?
- A) Gemini Pro
- B) Gemini Flash
- C) Gemini Flash-Lite
- D) Veo

**8.** Um processo de alto volume roda em lote à noite e o custo por token é o
fator decisivo. Qual modelo?
- A) Gemini Pro
- B) Gemini Flash
- C) Gemini Flash-Lite
- D) Chirp

**9.** Qual modelo especializado gera **música**?
- A) Veo
- B) Lyria
- C) Chirp
- D) Nano Banana

**10.** Para que servem os **embeddings models**?
- A) Gerar imagens de alta fidelidade
- B) Busca semântica e representação de dados
- C) Transcrever áudio em texto
- D) Fazer fine-tuning de LLMs

**11.** Os quatro usos do Gemini em negócios, na ordem apresentada, são:
- A) Analysis → extraction → creation → seeking
- B) Extraction → analysis → seeking → content creation
- C) Seeking → extraction → analysis → creation
- D) Creation → seeking → analysis → extraction

**12.** O que caracteriza um modelo **multimodal**?
- A) Ele roda em múltiplas regiões do Google Cloud
- B) Ele processa e gera conteúdo em várias modalidades
- C) Ele usa múltiplas GPUs em paralelo
- D) Ele combina vários modelos menores em ensemble

---

## Parte III — Tipos de modelo e customização (13–17)

**13.** Qual a diferença entre **horizontal AI** e **vertical AI**?
- A) Horizontal roda em CPU, vertical em TPU
- B) Horizontal são foundation models para desafios comuns entre indústrias; vertical são modelos fine-tuned para indústrias específicas
- C) Horizontal é no-code, vertical é code-based
- D) Horizontal usa grounding, vertical usa fine-tuning

**14.** O que são **open models** no Agent Studio?
- A) Modelos gratuitos para uso comercial
- B) Modelos cujos pesos treinados foram publicamente liberados
- C) Modelos cujo código-fonte de treinamento é aberto
- D) Modelos de parceiros como a Anthropic

**15.** No Model Garden, modelos da **Anthropic** pertencem a qual categoria?
- A) Google models
- B) Partner models
- C) Open models
- D) Tuned models

**16.** Uma analista de negócios, sem experiência em ML, precisa testar um
foundation model hoje. Qual abordagem de acesso?
- A) SDKs em Python
- B) Gen AI APIs com cUrl
- C) A UI do console
- D) Treinar um modelo customizado

**17.** ⚠️ O que o **prompt design** faz com os parâmetros do modelo?
- A) Atualiza um subconjunto pequeno deles
- B) Atualiza todos eles
- C) Não altera nenhum parâmetro — apenas guia a reação do modelo
- D) Congela os parâmetros e adiciona uma camada nova

---

## Parte IV — Prompt engineering (18–24)

**18.** ⚠️ Qual a diferença entre **prompt design** e **prompt engineering**?
- A) São sinônimos
- B) Design é criar o prompt; engineering é o processo iterativo de refiná-lo
- C) Design é no-code; engineering é code-based
- D) Design usa exemplos; engineering não

**19.** Quais são os três componentes de um prompt, e qual é obrigatório?
- A) Task, context, examples — só a task é obrigatória
- B) Task, context, examples — todos obrigatórios
- C) Input, output, format — só o input é obrigatório
- D) System, user, assistant — só o system é obrigatório

**20.** Um prompt que fornece **apenas a tarefa**, sem exemplos, é chamado de:
- A) Few-shot prompting
- B) Zero-shot prompting
- C) Chain-of-thought prompting
- D) One-shot prompting

**21.** Você está construindo um sumarizador de documentos jurídicos e precisa de
respostas consistentes e previsíveis. Como ajustar a **temperature**?
- A) Alta, para expandir a distribuição
- B) Baixa, para estreitar a distribuição em direção às respostas típicas
- C) Não mexer — temperature só afeta imagens
- D) Zerar o top K em vez da temperature

**22.** ⚠️ Qual a diferença entre **top K** e **top P**?
- A) Top K escolhe entre as K mais prováveis com chance igual; top P escolhe do menor subconjunto cuja probabilidade cumulativa atinge P
- B) Top K controla criatividade; top P controla comprimento
- C) São o mesmo parâmetro com nomes diferentes
- D) Top K é para texto; top P é para imagem

**23.** Por que o **top P** foi introduzido se já existe o top K?
- A) Porque o top K é mais lento
- B) Porque escolher o valor ótimo de K é difícil, e o top P se adapta à distribuição
- C) Porque o top K não funciona com modelos multimodais
- D) Porque o top P substitui a temperature

**24.** O que é **ground truth** no contexto de avaliação de prompts?
- A) Os dados de treinamento originais do modelo
- B) A resposta preferida por você, usada como referência para avaliar as respostas do modelo
- C) A fonte externa consultada no grounding
- D) O dataset JSONL do tuning

---

## Parte V — Grounding, RAG e tuning (25–27)

**25.** ⭐ Qual a relação entre **grounding** e **RAG**?
- A) São sinônimos
- B) Grounding é o "o quê" — conectar o modelo a fontes externas confiáveis; RAG é o "como" — um método para implementá-lo
- C) RAG é o objetivo; grounding é uma das técnicas
- D) Grounding é para texto; RAG é para multimodal

**26.** ⭐ Qual a diferença essencial entre **fine-tuning** e **grounding**?
- A) Fine-tuning é mais caro
- B) Fine-tuning altera o conhecimento interno do modelo; grounding conecta o modelo a informação externa
- C) Fine-tuning é no-code; grounding é code-based
- D) Fine-tuning usa JSONL; grounding usa CSV

**27.** Ordene as três opções de tuning, da menos à mais intensiva em recursos:
- A) Full fine-tuning → parameter-efficient tuning → prompt design
- B) Prompt design → parameter-efficient tuning → full fine-tuning
- C) Prompt design → full fine-tuning → parameter-efficient tuning
- D) Parameter-efficient tuning → prompt design → full fine-tuning

---

## Parte VI — Agentes e produtos (28–30)

**28.** ⭐ Quais são os três componentes de um AI agent, e qual é o "sistema
nervoso"?
- A) Model, tools e orchestration layer — a orchestration layer
- B) Model, tools e orchestration layer — o model
- C) Prompt, context e examples — o context
- D) Agent Studio, ADK e Agent Runtime — o ADK

**29.** ⚠️ Qual a diferença entre **Model Garden** e **Agent Garden**?
- A) Model Garden tem modelos Google; Agent Garden tem modelos de parceiros
- B) Model Garden é para acessar e fazer fine-tune de foundation models; Agent Garden oferece templates pré-construídos de agentes
- C) Model Garden é no-code; Agent Garden é pro-code
- D) Model Garden é para treinar; Agent Garden é para implantar

**30.** Uma equipe usou um agente out-of-the-box por três meses, mas agora precisa
que ele consulte o ERP interno da empresa. O que esse gatilho indica?
- A) Que devem trocar de foundation model
- B) Que precisam sair do no-code, porque a necessidade é de integração profunda
- C) Que devem aumentar a temperature
- D) Que precisam de full fine-tuning

---
---

# Gabarito comentado

| # | Resposta |
|---|---|
| 1 | **B** |
| 2 | **B** |
| 3 | **B** |
| 4 | **B** |
| 5 | **B** |
| 6 | **A** |
| 7 | **B** |
| 8 | **C** |
| 9 | **B** |
| 10 | **B** |
| 11 | **B** |
| 12 | **B** |
| 13 | **B** |
| 14 | **B** |
| 15 | **B** |
| 16 | **C** |
| 17 | **C** |
| 18 | **B** |
| 19 | **A** |
| 20 | **B** |
| 21 | **B** |
| 22 | **A** |
| 23 | **B** |
| 24 | **B** |
| 25 | **B** |
| 26 | **B** |
| 27 | **B** |
| 28 | **A** |
| 29 | **B** |
| 30 | **B** |

## Comentários

**1 · B** — A definição tem **duas metades**, e a prova pode testar só a segunda:
gera conteúdo **e toma ações**. (A) é classificação, tarefa de ML supervisionado
clássico. (C) descreve ML supervisionado. (D) descreve o Transformer, não a gen AI.

**2 · B** — **AI agents** são o mecanismo da ação. A frase exata do curso é
*autonomous, goal-oriented action* em seu nome.

**3 · B** — O Transformer é uma **arquitetura de rede neural de deep learning**, e
o curso afirma que ela sustenta **todas** as aplicações modernas de gen AI. (A)
confunde com o Gemini (2023), (C) é a data errada.

**4 · B** — ⚠️ **Armadilha clássica do módulo.** (A) é o stack de
**infraestrutura** da aula 2.3, (D) são os componentes de um **agente** (3.7).
Três hierarquias de três camadas convivem no curso — leia **qual** stack a
pergunta pede.

**5 · B** — A palavra-chave é **plataforma**: 2026 é a era da abordagem
*platform-centric* para IA agêntica. (A) é 2023, (C) é 2023.

**6 · A** — Os três eixos de "grande". Os **parâmetros** saltaram de milhões para
trilhões e indicam a capacidade de aprender padrões complexos.

**7 · B** — **Flash = velocidade e baixa latência**, para alto volume em tempo
real. (A) Pro é o mais capaz, mas não o mais rápido; a palavra "latência mínima"
decide. (C) Flash-Lite é o mais econômico, não o mais rápido.

**8 · C** — **Flash-Lite = custo**. "Alto volume" aparece tanto no Flash quanto no
Flash-Lite; o diferencial aqui é **"custo decisivo"** e a **ausência de urgência**.
Memorize: Pro = capacidade · Flash = velocidade · Flash-Lite = custo.

**9 · B** — **Lyria = música.** Os quatro especializados: Nano Banana (imagem),
Chirp (voz), Veo (vídeo), Lyria (música).

**10 · B** — **Busca semântica e representação de dados.** Embeddings não geram
conteúdo; eles representam significado como vetores.

**11 · B** — **Extraction → analysis → seeking → content creation.** A ordem é
cobrável. Exemplo de *analysis*: categorizar despesas de um recibo.

**12 · B** — **Processa e gera** em várias modalidades. (B) é a definição; (A) e
(C) são infraestrutura, não modalidade. O exemplo da aula: um **vídeo de receita**
a partir da **foto de um cookie**.

**13 · B** — Horizontal = **comum entre indústrias**; vertical = **fine-tuned para
nichos**, como diagnóstico de doenças. Guarde a palavra-chave: horizontal
*atravessa* indústrias.

**14 · B** — **Pesos publicamente liberados** — por isso o termo técnico é **Open
Weight**. ⚠️ (C) é o distrator forte: "open" aqui **não** significa código de
treinamento aberto, significa **pesos** disponíveis. (D) descreve partner models.

**15 · B** — **Partner models** são proprietários de terceiros; a Anthropic é o
exemplo citado na aula.

**16 · C** — A **UI do console** é o caminho **no-code**. (B) low-code exige saber
usar APIs e cUrl; (A) code-based exige Python/Java. "Sem experiência em ML" +
"hoje" ⇒ no-code.

**17 · C** — ⚠️ **Prompt design não toca os parâmetros.** Ele **guia o modelo
sobre como reagir**. (A) é parameter-efficient tuning, (B) é full fine-tuning —
estes **são** as opções que mexem em parâmetros. É exatamente por isso que o
prompt design é a opção **menos** intensiva da escada de tuning.

**18 · B** — A palavra que decide é **ITERATIVO**. *Design* = criar o prompt;
*engineering* = o processo contínuo de avaliar e refinar.

**19 · A** — **Task, context, examples**, e **só a task é obrigatória**. É daí que
sai o zero-shot: tarefa sem exemplos. (D) é a estrutura de mensagens de uma API
de chat, não os componentes de prompt deste curso.

**20 · B** — **Zero-shot** = sem exemplos; **few-shot** = com exemplos.

**21 · B** — **Temperature baixa** estreita a distribuição em direção às respostas
**típicas**, o que é o que você quer em QA e **sumarização**. Alta é para conteúdo
**criativo**.

**22 · A** — Esta é a questão mais errada do bloco. **Top K** = as K mais
prováveis, sorteadas **com chance igual** — e é justamente por isso que uma
distribuição **enviesada** pode gerar resposta estranha. **Top P** = o **menor
subconjunto** cuja probabilidade **cumulativa** atinge P.

**23 · B** — Porque **escolher o K ótimo é difícil**; o top P se adapta à forma da
distribuição em vez de fixar uma contagem.

**24 · B** — **Ground truth = sua resposta preferida.** ⚠️ (C) é o distrator
armado: *ground truth* e *grounding* são conceitos **diferentes** apesar da raiz
comum. Grounding conecta a fontes externas; ground truth é referência de avaliação.

**25 · B** — A frase para decorar: **"grounding é o quê, RAG é o como."** Grounding
é o objetivo — conectar a fontes externas confiáveis; RAG é **um método** de
implementá-lo.

**26 · B** — **Fine-tuning = conhecimento INTERNO · grounding = informação
EXTERNA.** A analogia estendida do curso: K-12 é o foundation, faculdade de
medicina é o fine-tuning, e checar as pesquisas mais recentes é o grounding.

**27 · B** — **Prompt design → parameter-efficient tuning → full fine-tuning.** O
PET (também chamado **adapter tuning**) atualiza um **subconjunto pequeno** de
parâmetros; o full fine-tuning atualiza **todos** e custa mais tanto em tuning
quanto em **serving**.

**28 · A** — **Model** = cérebro · **tools** = mãos, pés **e sentidos** ·
**orchestration layer** = sistema nervoso, que **gerencia a sequência**. ⚠️ (B)
inverte: quem coordena é a orchestration layer, não o model — o model compreende
comunicação e lógica. (D) lista componentes da **Agent Platform**, não do agente.

**29 · B** — **Model Garden = modelos** (acessar **e fazer fine-tune**); **Agent
Garden = templates de agente**, o caminho **low-code**. ⚠️ (A) é o distrator
plausível: as três categorias Google/partner/open vivem **todas** dentro do Model
Garden.

**30 · B** — Os **dois gatilhos** para sair do no-code são **integrações
profundas** e **comportamento customizado**. Consultar o ERP interno é integração
profunda ⇒ subir para templates low-code ou desenvolvimento custom.

---

## Como interpretar seu resultado

| Acertos | Leitura |
|---|---|
| **27–30** | Módulo dominado. Siga para o 4. |
| **24–26** | Aprovado. Revise só os blocos onde errou. |
| **18–23** | Releia as aulas 3.4, 3.5 e 3.7 — são as que concentram os erros. |
| **< 18** | Refaça o deck de flashcards antes de repetir o simulado. |

As questões marcadas ⚠️ (4, 14, 17, 18, 22, 24, 28, 29) são as que reproduzem
**armadilhas registradas no índice do curso**. Se errou qualquer uma delas, vá ao
[[google-ai-ml-armadilhas-e-cheatsheet]] e releia a armadilha correspondente.

