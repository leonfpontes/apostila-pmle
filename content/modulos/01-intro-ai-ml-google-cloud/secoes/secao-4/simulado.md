---
title: "Google AI/ML — Módulo 4: Simulado"
aliases: ["simulado do Módulo 4 (Google AI/ML)"]
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
summary: Simulado de 30 questões no estilo da prova sobre o Módulo 4 (Opções de desenvolvimento) da certificação Google, aulas 4.1 a 4.8, com gabarito comentado.
parte_de: "[[google-ai-ml-modulo-4-revisao]]"
related: ["[[google-ai-ml-modulo-4-glossario]]", "[[google-ai-ml-modulo-4-flashcards]]"]
---

# Google AI/ML — Módulo 4: Simulado

Material de estudo do Módulo 4 (Opções de desenvolvimento) do curso [[curso-intro-ai-ml-google-cloud]], cobrindo aulas 4.1 a 4.8. Faz parte de [[google-ai-ml-modulo-4-revisao]]; os outros dois materiais do módulo são [[google-ai-ml-modulo-4-glossario]] e [[google-ai-ml-modulo-4-flashcards]].

**Instruções:** faça as 30 **sem olhar o gabarito**, anote suas respostas, e só
depois confira. Meta: **24/30 (80%)**. Tempo sugerido: **35 minutos**.

⚠️ **Aviso sobre este simulado:** o Módulo 4 é o mais traiçoeiro do curso até
aqui, porque ele tem **várias listas de quatro itens que se parecem** e **um
rótulo que muda três vezes**. Montei os distratores com **listas reais do próprio
curso, no lugar errado** — é exatamente assim que a prova faz.

---

## Parte I — A tabela comparativa (1–7)

**1.** Uma seguradora precisa transcrever e analisar gravações de chamadas de
atendimento. Qual opção?
- A) BigQuery ML
- B) Agent Platform AutoML
- C) Pre-trained APIs
- D) Custom training

**2.** No curso, o **BigQuery ML** pertence a qual nível de abordagem?
- A) No-code
- B) No-to-low-code
- C) Low-code
- D) Code-based

**3.** Analistas têm três anos de dados de vendas em tabelas do BigQuery e
dominam SQL, mas ninguém sabe Python. Qual opção?
- A) Pre-trained APIs
- B) BigQuery ML
- C) Agent Platform AutoML
- D) Custom training

**4.** Em quais opções **o usuário** pode experimentar hiperparâmetros?
- A) Pre-trained APIs e AutoML
- B) BigQuery ML e custom training
- C) Apenas custom training
- D) Em todas as quatro

**5.** Segundo a aula 4.4, quantos registros você deveria almejar para treinar um
modelo custom?
- A) Algumas centenas
- B) Alguns milhares
- C) Centenas de milhares
- D) Milhões

**6.** As quatro opções de desenvolvimento se aplicam a:
- A) Apenas IA preditiva
- B) Apenas IA generativa
- C) Tanto IA generativa quanto IA preditiva
- D) Apenas projetos com dados tabulares

**7.** Por que o **custom training** normalmente leva o maior tempo de treino?
- A) Porque roda em hardware mais lento
- B) Porque constrói o modelo de ML desde o início, ao contrário do AutoML e do BigQuery ML
- C) Porque exige validação manual de cada época
- D) Porque usa mais dados que as outras opções

---

## Parte II — A Agent Platform (8–12)

**8.** Qual a ordem correta dos quatro estágios do pipeline da Agent Platform?
- A) Feature readiness → data readiness → training → deployment
- B) Data readiness → feature readiness → training e hyperparameter tuning → deployment e model monitoring
- C) Data processing → searching models → assembling → prediction
- D) Feature engineering → architecture search → hyperparameter tuning → model ensemble

**9.** O que é uma **feature**, na definição do curso?
- A) Um recurso da interface do Agent Platform
- B) Os dados brutos carregados do Cloud Storage
- C) Os dados processados que serão colocados no modelo
- D) Um hiperparâmetro ajustável

**10.** Qual dos quatro Ss descreve o **reúso e o compartilhamento** de artifacts
e features?
- A) Seamless
- B) Scalable
- C) Sustainable
- D) Speedy

**11.** Segundo o dado citado na aula 4.2, quantos projetos de ML empresariais
passam da fase piloto?
- A) Um quarto, segundo o Gartner
- B) Metade, segundo o Gartner
- C) Metade, segundo a McKinsey
- D) Três quartos, segundo o Gartner

**12.** Quais são os **dois sentidos** em que a Agent Platform é "unificada"?
- A) Unifica gen AI e predictive AI, e unifica os times de dados e de ML
- B) Oferece um pipeline de ML end-to-end, e abrange tanto gen AI quanto predictive AI
- C) Unifica BigQuery e Cloud Storage, e unifica treino e serving
- D) Unifica no-code e code-based, e unifica os quatro Ss

---

## Parte III — O AutoML (13–18)

**13.** Quais são as duas tecnologias que sustentam a busca automática do AutoML?
- A) Neural architecture search e hyperparameter tuning
- B) Neural architecture search e transfer learning
- C) Transfer learning e model ensemble
- D) Feature engineering e grounding

**14.** Em quantos modelos o AutoML baseia suas previsões?
- A) Em um único modelo, o de melhor performance
- B) Nos top modelos, tipicamente cerca de dez, conforme o training budget
- C) Em exatamente três modelos
- D) Em todos os modelos testados durante a busca

**15.** O que é **transfer learning**?
- A) Mover um modelo treinado de uma região do Google Cloud para outra
- B) Usar modelos pré-treinados em datasets grandes e similares como base para novos problemas
- C) Transferir features entre projetos via feature store
- D) Converter tipos de dado para o formato que o modelo aceita

**16.** ⚠️ Qual destas listas são as **quatro fases** do AutoML?
- A) Feature engineering → architecture search → hyperparameter tuning → model ensemble
- B) Data processing → searching models and tuning parameters → assembling → prediction
- C) Data readiness → feature readiness → training → deployment
- D) Pre-processing → training → deployment → monitoring

**17.** Quando o AutoML foi anunciado?
- A) Em 2016
- B) Em janeiro de 2018
- C) Em 2021
- D) Em 2023

**18.** O que a **fase 1** do AutoML faz com os dados?
- A) Automatiza todo o processo de preparação de dados
- B) Automatiza parte da preparação, convertendo tipos como datetime, categorias e nested fields
- C) Divide os dados em treino, validação e teste
- D) Cria e compartilha features no feature store

---

## Parte IV — Custom training (19–24)

**19.** Qual a primeira decisão a tomar em custom training, antes de escrever
qualquer código?
- A) Qual biblioteca de ML usar
- B) Qual ambiente usar: um pre-built container ou um custom container
- C) Quantos epochs treinar
- D) Qual loss function aplicar

**20.** Quando um **pre-built container** é a melhor escolha?
- A) Quando você precisa definir o tipo de máquina e os discos
- B) Quando seu treinamento usa Python, TensorFlow ou PyTorch e você não é exigente quanto à infraestrutura
- C) Quando você precisa de controle total sobre o ambiente
- D) Quando você não tem dados de treinamento

**21.** ⚠️ O que você deve determinar ao criar um **custom container**?
- A) O loss function, o optimizer e os epochs
- B) O environment, o machine type e os disks
- C) A arquitetura do modelo, o framework e a lógica de treinamento
- D) A API, os parâmetros e o formato

**22.** Qual a ordem das camadas de abstração do TensorFlow, da mais baixa para a
mais alta?
- A) Low-level APIs → hardware → model libraries → Keras
- B) Hardware → low-level APIs → model libraries → high-level APIs como o Keras
- C) Keras → model libraries → low-level APIs → hardware
- D) Hardware → model libraries → low-level APIs → Keras

**23.** Em qual dos três passos do tf.keras você especifica os hiperparâmetros?
- A) No `create` — ao montar as camadas
- B) No `compile` — junto da avaliação de performance e da otimização
- C) No `fit` — junto dos epochs
- D) Depois do treino, ao implantar

**24.** O que é o **JAX**?
- A) Um framework de deep learning que substitui o TensorFlow
- B) Uma biblioteca de computação numérica de alta performance, flexível e fácil, para pesquisa e produção
- C) Um notebook integrado à Agent Platform
- D) Uma API de linguagem natural

---

## Parte V — APIs e a Natural Language API (25–30)

**25.** Qual a diferença entre `analyzeSentiment` e `analyzeEntitySentiment`?
- A) O primeiro é síncrono, o segundo assíncrono
- B) O primeiro analisa o sentimento do texto inteiro; o segundo, de cada entidade individual
- C) O primeiro é gratuito, o segundo é pago
- D) O primeiro usa JSON, o segundo usa cURL

**26.** Quais são os quatro campos de uma requisição JSON simples da Natural
Language API?
- A) method, endpoint, body e headers
- B) type do documento, language, content e encodingType
- C) features, input, output e response
- D) entities, sentiment, syntax e categories

**27.** O que significa **cURL**, e o que ele faz?
- A) Cloud URL — um serviço de hospedagem de arquivos
- B) Client URL — uma ferramenta de linha de comando para transferir dados entre cliente e servidor
- C) Call URL — uma biblioteca Python para chamar APIs
- D) Custom URL — um gerador de endpoints

**28.** Por que o curso diz que muitas APIs específicas podem ser substituídas
pelas Gemini APIs?
- A) Porque são mais baratas
- B) Porque são multitask e multimodal
- C) Porque rodam em TPU
- D) Porque dispensam API key

**29.** ⚠️ Quais ferramentas a aula 4.8 cita para codar manualmente projetos de
ML?
- A) TensorFlow, scikit-learn e PyTorch
- B) Python, JAX e Agent Platform Workbench
- C) Python, TensorFlow e Colab Enterprise
- D) Keras, JAX e BigQuery ML

**30.** ⚠️ Como o curso classifica o **Agent Platform AutoML**?
- A) Sempre e consistentemente como no-code
- B) Como code-based, por exigir configuração
- C) Majoritariamente como no-code, mas com variações ("no-to-low-code" na 4.1 e 4.4, "low- or no-code" na 4.8)
- D) Como low-code em todas as aulas

---
---

# Gabarito comentado

| # | Resposta | | # | Resposta | | # | Resposta |
|---|---|---|---|---|---|---|---|
| 1 | **C** | | 11 | **B** | | 21 | **B** |
| 2 | **D** | | 12 | **B** | | 22 | **B** |
| 3 | **B** | | 13 | **B** | | 23 | **B** |
| 4 | **B** | | 14 | **B** | | 24 | **B** |
| 5 | **C** | | 15 | **B** | | 25 | **B** |
| 6 | **C** | | 16 | **B** | | 26 | **B** |
| 7 | **B** | | 17 | **B** | | 27 | **B** |
| 8 | **B** | | 18 | **B** | | 28 | **B** |
| 9 | **C** | | 19 | **B** | | 29 | **B** |
| 10 | **C** | | 20 | **B** | | 30 | **C** |

> 😅 **Sim, o gabarito ficou quase todo em B.** Isso é artefato de como eu montei
> as alternativas (a correta em segundo lugar, para você ler os distratores
> antes), **não** um padrão da prova real. Na prova, não conte com posição —
> conte com conteúdo.

## Comentários

**1 · C** — ⭐ **Áudio é o diferencial exclusivo das pre-trained APIs** — único
critério da tabela em que uma ferramenta aparece sozinha. (A) BigQuery ML só
aceita tabular e JSON; (B) AutoML só tabular e imagem; (D) custom training aceita
tabular, imagem, texto e vídeo — **não áudio**.

**2 · D** — *"Code-based approaches, ranging from **BigQuery ML** and ADK… to
completely DIY custom training."* O motivo é o **SQL**. (B) "no-to-low-code" é o
rótulo que a 4.1 reserva ao **AutoML**; (C) low-code são as **preconfigured
APIs**.

**3 · B** — Os **dois gatilhos** do BigQuery ML aparecem juntos: **SQL** e **dados
já no BigQuery**. (A) falha porque eles **querem** treinar um modelo com os dados
deles; (D) exige a maior expertise em código.

**4 · B** — ⚠️ Note que a questão diz **"o usuário"**. A linha divisória é a mesma
do code-based: **BigQuery ML e custom training**. (A) é a inversão exata. **Mas
cuidado:** o AutoML **tuna automaticamente**, via neural architecture search — se
a questão não disser "o usuário", leia com cuidado (ver questão comentada na 4.3).

**5 · C** — *"Hundreds of thousands of records."* E de **alta qualidade** — o
volume sozinho não basta. É o número que dá escala concreta ao *"large amount of
data"* da tabela.

**6 · C** — *"These options apply to both gen AI and predictive AI."* ⚠️ (A) é o
distrator natural, porque o módulo **abre** falando de IA preditiva — mas o
instrutor desarma a separação explicitamente.

**7 · B** — *"Because it **builds the ML model from the beginning**, unlike Agent
Platform AutoML and BigQuery ML."* (D) é parcialmente verdade, mas o motivo que o
curso dá é **construir do zero**.

**8 · B** — ⚠️ **Esta é a armadilha central do módulo.** (C) são as **fases do
AutoML** e (D) é o **pipeline que o AutoML automatiza** — as três listas são
reais e coexistem. Para o **pipeline da Agent Platform**, a ordem é **data
readiness → feature readiness → training e hyperparameter tuning → deployment e
model monitoring**. Os dados vêm **antes** das features, porque features **são**
dados processados.

**9 · C** — *"Features, which are the **processed data** that will be put into the
model."* ⚠️ (B) é o distrator preciso: dado **bruto** é o estágio 1 (data
readiness); feature é o estágio 2, já **processado**.

**10 · C** — ⚠️ **Sustainable não é meio ambiente nem custo** — é **reutilizar e
compartilhar**. É o S que se liga ao **feature store**. (A) é a fluidez do upload
à produção, (B) é escalar storage e computação, (D) é menos linhas de código.

**11 · B** — **Gartner · metade · fase piloto.** Três elementos, todos cobráveis —
a prova pode trocar só a fonte ou só a fração.

**12 · B** — *"There are **two primary aspects**"* — o **pipeline end-to-end** e
as **duas IAs**. (A) e (C) misturam elementos verdadeiros em pares que o curso não
faz.

**13 · B** — ⚠️ (A) é o distrator forte: o **hyperparameter tuning** é **parte do
que o neural architecture search faz**, não uma tecnologia irmã. (C) o ensemble é
a **fase 3**, não parte da busca.

**14 · B** — *"Does not rely on **one single model**, but on the top number of
models… **typically around ten**."* ⚠️ (A) é a suposição natural e está **errada**
— é justamente o ponto que a aula desfaz. (D) exagera: só os **melhores** entram.

**15 · B** — ⚠️ (C) descreve o **feature store** (4.2) e (D) descreve a **fase 1
do AutoML** (4.3) — distratores feitos de conteúdo verdadeiro, no lugar errado.

**16 · B** — ⚠️ **A questão mais capciosa do módulo**, porque **as outras três
também são listas reais**: (A) é o **pipeline que o AutoML automatiza** (mesma
aula!), (C) é o **pipeline da Agent Platform** (4.2) e (D) é o **objetivo
declarado do AutoML em 2018**. As **fases** são: data processing → searching
models and tuning → assembling → prediction.

**17 · B** — **Janeiro de 2018** — a única data do curso com **precisão mensal**.
(A) 2016 é o **TPU**; (C) 2021 é quando o AutoML foi **embutido no Vertex AI**;
(D) 2023 é o **Gemini**.

**18 · B** — ⚠️ (A) é o distrator por exagero — a aula diz **"part of"**. (D) é a
fase 2 do pipeline da **Agent Platform**, não do AutoML.

**19 · B** — *"**Before any coding begins**, you must determine what
**environment** you want your ML training code to use."* (A) vem depois; (C) e (D)
são decisões **dentro** do código.

**20 · B** — A condição tem **duas metades**: a plataforma **é** uma das comuns
**E** você **não se importa** com a infraestrutura. ⚠️ (A) e (C) descrevem o
**custom container** — a sala vazia. (D) descreve **pre-trained APIs**.

**21 · B** — ⚠️ Lista fechada e literal: **environment, machine type, disks**. Os
três distratores são **todos listas reais do módulo**: (A) são decisões do
`compile`/`fit`, (C) é **sobre o que o custom training dá controle** (mesma aula!)
e (D) são as três coisas que um usuário de **API** precisa saber (4.4).

**22 · B** — A camada **mais baixa é hardware** (CPU, GPU, TPU), não código. ⚠️
(C) é a ordem invertida — fácil de marcar por distração. (D) troca as camadas 2 e
3: as **low-level APIs** vêm **antes** das model libraries.

**23 · B** — *"In step two, you **compile** the model, where you specify
**hyperparameters** such as performance evaluation and model optimization."* ⚠️
(C) é o distrator forte: os **epochs** se definem no `fit`, mas o curso trata os
**hiperparâmetros** no `compile`.

**24 · B** — ⚠️ (A) erra duas vezes: o curso chama o JAX de **biblioteca de
computação numérica** (não framework de deep learning) e **não** diz que
substitui o TensorFlow — diz *"apart from TensorFlow"* e *"um dos mais
promissores"*. E note que serve para **os dois** ambientes: pesquisa **e**
produção.

**25 · B** — ⭐ A distinção mais provável de cair, e ela existe porque o
**sentiment opera em dois níveis** — documento e sujeito. É por isso que há
**cinco métodos** para **quatro features**.

**26 · B** — ⚠️ (C) é a **tríade da analogia do sanduíche** (com um item
inventado) e (D) são as **features** da API — distratores feitos de conteúdo real
da mesma aula.

**27 · B** — *"cURL stands for **client URL** and is a **command-line tool** to
**transfer data between client and server**."* O cURL já aparecia na aula **3.2**
como ferramenta do degrau low-code; na 4.6 ele ganha a definição.

**28 · B** — **Multitask e multimodal** — o par de adjetivos é a justificativa
textual.

**29 · B** — ⚠️ (A) é a lista de **bibliotecas populares de ML** da aula **4.5** —
correta **para outra pergunta**. A **4.8 omite o TensorFlow** e **promove o JAX**:
*"versatile tools such as **Python, JAX, and Agent Platform Workbench**"*. Leia se
a questão pede "ferramentas versáteis para codar manualmente" (4.8) ou
"bibliotecas de ML" (4.5).

**30 · C** — ⚠️ Esta questão não tem equivalente numa prova real, mas é a mais
importante do simulado. **O curso usa três rótulos:**

| Rótulo | Aulas |
|---|---|
| **no-code** | **1.1 · 4.2 · 4.3 · 4.5** |
| "no-to-low-code" | 4.1 · 4.4 |
| "low- or no-code" | 4.8 |

**Na prova, marque no-code** — é a maioria e são as formulações mais explícitas.
Se houver uma alternativa "no-code ou low-code", ela é a mais fiel. **Nunca**
marque **code-based**: isso é o custom training.

---

## Como interpretar seu resultado

| Acertos | Leitura |
|---|---|
| **27–30** | Módulo dominado. Siga para o 5. |
| **24–26** | Aprovado. Revise só os blocos onde errou. |
| **18–23** | Releia as aulas **4.3 e 4.5** — são as que concentram os erros — e refaça o **bloco 6** dos flashcards. |
| **< 18** | Refaça o deck de flashcards inteiro antes de repetir o simulado. |

**Se você errou 8, 16 ou 21**, o problema não é conteúdo — é que **o módulo tem
listas parecidas demais**. Vá ao **bloco 6** dos flashcards, que existe só para
isso.

