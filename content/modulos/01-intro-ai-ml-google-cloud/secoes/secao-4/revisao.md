---
title: Google AI/ML — Revisão consolidada do Módulo 4 (Opções de desenvolvimento)
aliases: [revisao modulo 4 Google, glossario modulo 4 Google, simulado modulo 4, flashcards modulo 4 Google]
tags: [aula, trabalho]
type: note
area: trabalho
created: 2026-10-09
updated: 2026-10-09
status: evergreen
fonte: mista
confianca: media
papel: canonica
indexar: true
summary: "Material consolidado do Módulo 4 (opções de desenvolvimento de IA) da certificação Google: a tabela comparativa das quatro opções, as três listas de quatro etapas que o módulo acumula, as quatro camadas do TensorFlow, os cinco métodos da Natural Language API e as variações de rótulo do AutoML. Nota de entrada para revisar o módulo inteiro sem reler as sete aulas."
parte_de: "[[curso-intro-ai-ml-google-cloud]]"
related: ["[[R - 2026-10-09-m04-a08-summary]]", "[[R - 2026-10-09-m04-a01-ai-development-options]]", "[[R - 2026-10-09-m04-a05-custom-training]]", "[[google-ai-ml-modulo-3-revisao]]"]
---

# Google AI/ML — Revisão consolidada do Módulo 4 (Opções de desenvolvimento)

Material de revisão das aulas **4.1 a 4.8** do curso
[[curso-intro-ai-ml-google-cloud]]. Serve para revisar o módulo inteiro sem
reler as sete notas de aula.

> 📚 **Versão expandida (também no projeto Claude "Certificação Google"):**
> [[google-ai-ml-modulo-4-glossario]] (termos em 7 grupos),
> [[google-ai-ml-modulo-4-flashcards]] (110 cartões em 6 blocos) e
> [[google-ai-ml-modulo-4-simulado]] (30 questões com gabarito comentado).

> ⚠️ **O caráter deste módulo:** ele é o mais traiçoeiro do curso até agora, não
> porque o conteúdo seja difícil, mas porque **acumula listas parecidas**. Há
> **três listas de quatro etapas**, **quatro camadas de TensorFlow**, **cinco
> métodos de API para quatro features** e **duas tríades de API diferentes**. A
> seção 2 existe só para isso.

---

## 1. ⭐⭐⭐ A tabela comparativa das quatro opções

**A tabela mais cobrável do curso inteiro.**

| Critério | **Pre-trained APIs** | **BigQuery ML** | **Agent Platform AutoML** | **Custom training** |
|---|---|---|---|---|
| **Tipos de dado** | tabular, imagem, texto, vídeo **+ áudio** | ⚠️ **só tabular e semi-estruturado (JSON)** | tabular **e imagem** | tabular, imagem, texto, vídeo |
| **Volume de dados** | **nenhum** | **grande** (= centenas de milhares) | *(não dito)* | **grande** |
| **Expertise** | **baixa** | **exige SQL** | **baixa** | ⚠️ **a mais alta** |
| **Você tuna hiperparâmetros?** | ❌ | ✅ | ❌ *(a máquina tuna)* | ✅ |
| **Tempo de treino** | **nenhum** | depende | depende | ⚠️ **o mais longo** |
| **Nível** | **low-code** | **code-based** (por causa do SQL) | **no-code** (ver seção 2) | **code-based** |

**O guia de decisão:**

| Se… | Então |
|---|---|
| **pouca experiência em ML** e **nenhuma intenção de treinar** | **Pre-trained APIs** |
| **conhece SQL** e os dados **já estão no BigQuery** | **BigQuery ML** |
| quer **modelos customizados** com **dados próprios** e **mínimo de código** | **AutoML** |
| quer **controle total do workflow** | **Custom training** |

**Os três fatores de escolha:** **necessidade de negócio · expertise em ML ·
orçamento**.

---

## 2. ⚠️ As armadilhas do módulo

### 2.1 ⭐⭐⭐ As TRÊS listas de quatro etapas

| Lista | As quatro etapas | Aula |
|---|---|---|
| **Pipeline da Agent Platform** | data readiness → feature readiness → training e hyperparameter tuning → deployment e model monitoring | **4.2** |
| **As fases do AutoML** | data processing → searching models and tuning → assembling → prediction | **4.3** |
| **O pipeline que o AutoML automatiza** | feature engineering → architecture search → hyperparameter tuning → model ensemble | **4.3** |

⚠️ **As duas últimas estão na mesma aula.** As **fases** descrevem o **fluxo**; o
**pipeline** descreve as **técnicas**. A fase 2 se desdobra em **duas** etapas do
pipeline, e **prediction não aparece** no pipeline.

### 2.2 ⭐⭐⭐ O rótulo do AutoML — o curso nunca fechou

| Rótulo | Aulas |
|---|---|
| **no-code** | **1.1 · 4.2 · 4.3 · 4.5** |
| "no-to-low-code" | 4.1 · 4.4 |
| "low- or no-code" | 4.8 |

| Situação na prova | Marque |
|---|---|
| "no-code" aparece e "low-code" não | **no-code** |
| as duas aparecem isoladas | **no-code** (maioria) |
| existe "no-code ou low-code" | **essa** |
| **nunca** | **code-based** — isso é o custom training |

### 2.3 Hiperparâmetros: a pergunta é **quem tuna**

A tabela da 4.1 mede **controle do usuário**; a 4.3 descreve **o que a máquina
faz por dentro**. A palavra que reconcilia é **"automatically"**.

- *"Em quais **você pode** experimentar hiperparâmetros?"* → **BigQuery ML e
  custom training**.
- *"O AutoML faz hyperparameter tuning?"* → **sim, automaticamente**.
- *"Em qual passo do tf.keras?"* → no **`compile`**.

### 2.4 As outras seis

| # | Armadilha | Como não cair |
|---|---|---|
| 1 | **Só as pre-trained APIs processam ÁUDIO** | Questão que mencione áudio → pre-trained APIs |
| 2 | **"Sustainable" não é meio ambiente** | É **reúso e compartilhamento**. E "speedy" é **menos linhas de código** |
| 3 | **O AutoML não entrega "o melhor modelo"** | Entrega um **ensemble dos top ~10** |
| 4 | **A fase 1 do AutoML automatiza PARTE do preparo** | *"part of the data preparation process"* |
| 5 | **No TensorFlow, a camada mais baixa é HARDWARE** | E o **Keras é a mais alta**; a camada 3 **não são APIs** |
| 6 | **Duas analogias de API, duas tríades** | Tomada (4.4): **qual API · quais parâmetros · em que formato**. Sanduíche (4.6): **features · input · output** |

### 2.5 As cinco variações que a Summary (4.8) introduz

| # | O que muda |
|---|---|
| 1 | O AutoML vira **"low- or no-code"** (terceiro rótulo) |
| 2 | **Quatro personas** em vez de três — acrescenta o **developer** |
| 3 | *"unified **AI** platform"* (sem "development"); apelido **"ultimate workspace"** em vez de "playground" |
| 4 | O AutoML automatiza até o **serving** (a 4.3 dizia **deployment**) |
| 5 | ⚠️ **O TensorFlow desaparece** da lista de ferramentas de custom training — entram **Python, JAX e Workbench** |

---

## 3. Glossário essencial

### A Agent Platform (4.2)

- **Agent Platform** — *"Google's unified AI development platform"*; o
  **playground** (4.2) ou **ultimate workspace** (4.8).
- **Os dois sentidos de "unificada"** — um **pipeline end-to-end** e abranger
  **gen AI e predictive AI**.
- **Feature** — os **dados processados** que entram no modelo. **Não** é dado
  bruto.
- **Feature store** — para **compartilhar features** com outras pessoas.
- **Os quatro Ss** — **Seamless** (fluidez do upload à produção) · **Scalable**
  (o MLOps escala storage e computação automaticamente) · **Sustainable** (reúso
  e compartilhamento) · **Speedy** (menos linhas de código).
- **O dado do Gartner** — **só metade** dos projetos de ML empresariais passa da
  **fase piloto**.
- **O recurso do Workbench** — **escrever SQL** para conectar **BigQuery ↔ Agent
  Platform**.

### O AutoML (4.3)

- **AutoML** = ***automated machine learning***.
- **Neural architecture search** — **testa arquiteturas e modelos**, **compara
  performance**, **tuna parâmetros automaticamente**.
- **Transfer learning** — usa **modelos pré-treinados** como **foundation
  model**; **acelera a busca**; entrega **maior acurácia com muito menos dados e
  tempo**, porque **não aprende do zero**.
- **Model ensemble** — os **top N modelos**, tipicamente **~10**, conforme o
  **training budget**; pode ser **simples média** das previsões.
- **Os quatro problemas gerais de linguagem** — **text classification · question
  answering · document summarization · text generation**.

### Custom training (4.5)

- **Controle total sobre:** **model architecture · frameworks · training logic**.
- **Pre-built container** = **cozinha mobiliada** · **custom container** = **sala
  vazia**, onde você define **environment, machine type e disks**.
- **Workbench** — um **Jupyter notebook** num único ambiente;
  **explorar → treinar → implantar**.
- **ML library** — **coleção de código pré-escrito**. As três: **TensorFlow ·
  scikit-learn · PyTorch**, todas **open source**.
- **As quatro camadas do TensorFlow** — **hardware (CPU/GPU/TPU) → low-level APIs
  (C++ e Python) → model libraries (camadas e métricas) → high-level APIs
  (Keras)**.
- **Os três passos do tf.keras** — **create** (`tf.keras.Sequential`, junta as
  camadas) → **compile** (⭐ os **hiperparâmetros**: **loss function** mede,
  **optimizer** otimiza) → **fit** (**input**, **output**, **epochs**).
- **JAX** — **computação numérica de alta performance**, **flexível e fácil**;
  **pesquisa e produção**.

### APIs (4.4 e 4.6)

- **API** = ***application programming interface*** · **SDK** = ***software
  development kit***. Os **vendors** definem as APIs e fornecem os SDKs.
- **cURL** = ***client URL***, **linha de comando** para **transferir dados entre
  cliente e servidor**.
- **As categorias** — **Generative AI APIs** (Gemini, multimodais, criar
  conteúdo) · **Machine learning APIs** (Agent Platform API: **treinar,
  monitorar, tunar**) · **outras** (**speech, image, document, conversation**).
- **Multitask and multimodal** — por que as Gemini APIs absorvem as específicas.
- **Perceptual tasks** — **vision, video, natural language**.

### A Natural Language API (4.4 e 4.6)

- **As quatro features** — **entities** (os **sujeitos**, com o tipo) ·
  **sentiment** (em **dois níveis**) · **syntax** (**relação entre palavras**) ·
  **categories** (**tópicos ou palavras-chave**, como uma **tag**).
- **Os cinco métodos** — `analyzeEntities` · `analyzeSentiment` (texto inteiro) ·
  `analyzeEntitySentiment` (cada entidade) · `analyzeSyntax` · `classifyText`.
- **É uma REST API** com **JSON**. Os **quatro campos**: **type · language ·
  content · encodingType**. ⚠️ **`content`** aceita **o texto** **ou** a
  **localização no Cloud Storage**.
- **UI** serve para **demonstrar e testar**; **código**, para **produção**.
- **O lab 4.7 faz três das quatro features** — fica de fora o `classifyText`.

---

## 4. Datas e números

| Item | Valor |
|---|---|
| **Janeiro de 2018** | AutoML anunciado — **a única data do curso com mês** |
| **2021** | AutoML embutido no **Vertex AI** (*"now Agent Platform"*) |
| **Centenas de milhares** | registros que um **modelo custom** exige, de **alta qualidade** |
| **~10** | modelos no **ensemble** do AutoML |
| **Metade** | projetos de ML empresariais que **não** passam da fase piloto (Gartner) |

---

## 5. Roteiro de revisão

| Ordem | O que fazer | Tempo |
|---|---|---|
| 1 | Decorar a **tabela comparativa** (seção 1) e o guia de decisão | 15 min |
| 2 | Ler a **seção 2 inteira** — as armadilhas são o que decide a nota | 15 min |
| 3 | Rodar os blocos **1 e 6** dos flashcards (os que separam decorar de entender) | 30 min |
| 4 | Rodar os blocos **2 a 5** | 45 min |
| 5 | Fazer o simulado de 30 questões sem consultar | 35 min |
| 6 | Conferir o gabarito; nas questões ⚠️ erradas, voltar à armadilha correspondente | 20 min |

**Meta no simulado: 24/30 (80%).** Se errar as questões 8, 16 ou 21, o problema
não é conteúdo — é confusão entre listas parecidas. Vá ao **bloco 6**.

---

## 6. Dúvidas em aberto

- ⚠️ **O rótulo do AutoML não fechou** e não vai fechar — três formulações em oito
  aulas, incluindo a hesitação da própria recapitulação.
- ⚠️ **O volume de dados do AutoML** nunca foi quantificado. O **transfer
  learning** aponta para **datasets menores**.
- ⚠️ **ADK** — a sigla nunca é expandida em todo o curso.
- 📌 **"Serving"** entra no vocabulário na 4.8 e reaparece na aula **5.4**.
- 📌 **Activation functions** foram adiadas para o módulo 5 (aula **5.8**).
- 📌 **O estágio 4 do pipeline da 4.2** foi adiado para a aula **5.5** (MLOps).

---
