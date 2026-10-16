---
title: Aula 4.1 — AI development options
aliases: [AI development options, opcoes de desenvolvimento de IA Google Cloud, predictive AI, comparacao das quatro opcoes]
tags: [aula, trabalho]
type: note
area: trabalho
created: 2026-10-09
updated: 2026-10-09
status: evergreen
fonte: transcricao
confianca: media
papel: derivada
indexar: true
summary: "Aula 4.1 do curso Introduction to AI and ML on Google Cloud: abre o Módulo 4 com a distinção entre IA preditiva e generativa e compara as quatro opções de desenvolvimento — pre-trained APIs, BigQuery ML, Agent Platform AutoML e custom training — por tipo de dado, volume de treino, expertise, hiperparâmetros e tempo. Resolve em definitivo que o BigQuery ML é code-based."
transcricao: "[[T - 2026-10-09-m04-a01-ai-development-options]]"
parte_de: "[[curso-intro-ai-ml-google-cloud]]"
curso: "[[curso-intro-ai-ml-google-cloud]]"
data: 2026-10-09
related: ["[[R - 2026-10-08-m02-a05-bigquery-ml]]", "[[R - 2026-10-09-m03-a02-foundation-models]]", "[[google-ai-ml-modulo-3-revisao]]"]
---

# Aula 4.1 — AI development options

| | |
|---|---|
| **Tema** | As quatro opções de desenvolvimento de IA no Google Cloud |
| **Curso** | [[curso-intro-ai-ml-google-cloud]] |
| **Data** | 09/10/2026 |
| **Duração** | ~4min50 |
| **Aula nº** | 4.1 (módulo 4 na plataforma, "Module 3" na fala do instrutor) |
| **Transcrição** | [[T - 2026-10-09-m04-a01-ai-development-options]] |

> 🎯 **Peso na prova: ⭐⭐⭐ — o mais alto do curso até aqui.**
> A tabela comparativa das quatro opções é **exatamente** o tipo de conteúdo que
> vira questão de cenário ("uma equipe tem X, precisa de Y — qual ferramenta?").
> Decore a tabela da seção 3 e o guia de decisão da seção 4.
> **Bônus:** esta aula fecha a dúvida mais antiga do nosso material.

---

## Conteúdo por tópico

### 1. ⭐ IA preditiva × IA generativa — a virada do curso

O Módulo 3 tratou de **IA generativa**. O Módulo 4 vira para a **IA preditiva**:

> *"But what if you want to create predictive AI for **traditional AI tasks like
> forecasting and classification**?"*

| | **IA generativa** | **IA preditiva** |
|---|---|---|
| **O que faz** | gera conteúdo e toma ação | **prevê** e **classifica** |
| **Tarefas típicas** | texto, imagem, agentes | **forecasting** e **classification** |
| **Módulo** | 3 | **4 e 5** |

⚠️ **Mas atenção à frase que desarma a separação:**

> *"These options apply to **both** gen AI and predictive AI."*

As quatro opções desta aula **não são exclusivas da IA preditiva** — servem para
os dois mundos. Se uma questão sugerir que o AutoML ou as pre-trained APIs só
valem para IA preditiva, está errada.

### 2. ⭐⭐⭐ A escada completa — e a dúvida do BigQuery ML, resolvida

A aula lista **quatro níveis** (não três), com as ferramentas de cada um:

| Nível | Ferramentas |
|---|---|
| **No-code out-of-box** | **Gemini Enterprise app** · **Gemini Enterprise for CX** |
| **No-to-low-code** | **Agent Platform AutoML** (*point-and-click*) |
| **Low-code** | **Preconfigured APIs** (= pre-trained APIs) |
| **Code-based** | **BigQuery ML** · **ADK** → até **custom training** (DIY completo) |

> ✅ **DÚVIDA ENCERRADA — BigQuery ML é CODE-BASED.**
> A frase exata: *"**Code-based approaches, ranging from BigQuery ML and ADK**,
> both introduced earlier, **to completely DIY custom training**."*
> Estava em aberto desde a aula 2.5. Em questão de prova: BigQuery ML =
> **code-based**, porque exige **SQL**.

⚠️ **Dois detalhes novos nessa escada:**

1. **Surge um nível intermediário inédito: "no-to-low-code"**, só para o AutoML.
   Nas escadas anteriores (1.1, 3.2, 3.8) existiam três degraus; aqui são
   **quatro**. Se a questão oferecer "no-code" e "low-code" como alternativas
   para o AutoML, a resposta mais defensável é **low-code** (é o rótulo que o
   curso usa em 1.1 e o próprio "no-to-low" tende para lá).
2. **O ADK aparece ao lado do BigQuery ML** no degrau code-based — confirmando a
   3.8, que o colocava no caminho **pro-code**.

### 3. ⭐⭐⭐ A tabela comparativa das quatro opções

Esta é **a** tabela da aula. Cinco critérios × quatro ferramentas:

| Critério | **Pre-trained APIs** | **BigQuery ML** | **Agent Platform AutoML** | **Custom training** |
|---|---|---|---|---|
| **Tipos de dado** | tabular, imagem, texto, vídeo **+ áudio** | ⚠️ **só tabular e semi-estruturado (JSON)** | tabular **e imagem** | tabular, imagem, texto, vídeo |
| **Volume de dados de treino** | **nenhum** | **grande** | *(não especificado na aula)* | **grande** |
| **Expertise em ML e código** | **baixa** | **exige SQL** | **baixa** | ⚠️ **a mais alta** |
| **Tunar hiperparâmetros** | ❌ **não** | ✅ **sim** | ❌ **não** | ✅ **sim** |
| **Tempo para treinar** | **nenhum** | depende do projeto | depende do projeto | ⚠️ **o mais longo** |

**Os três fatos mais cobráveis dessa tabela:**

1. ⚠️ **Só as pre-trained APIs processam ÁUDIO.** É o único critério em que uma
   ferramenta fica sozinha. Se a questão mencionar áudio, a resposta é
   pre-trained APIs.
2. ⚠️ **O BigQuery ML é o mais restrito em tipo de dado** — tabular e
   semi-estruturado (JSON), nada de imagem, texto livre ou vídeo. O AutoML é o
   segundo mais restrito (tabular e imagem).
3. ⚠️ **Hiperparâmetros dividem a tabela ao meio** e a linha divisória é a mesma
   do code-based: **BigQuery ML e custom training sim; pre-trained APIs e AutoML
   não.** A frase do curso é *"at the moment"* — é um estado atual, não um
   princípio.

> 📌 **Lacuna honesta:** a aula **não diz** o volume de dados que o AutoML exige.
> Pelo contexto — "build custom models with your own training data" — ele exige
> dados próprios, mas em volume menor que BigQuery ML e custom training. Se a
> prova cobrar isso explicitamente, a leitura segura é **intermediário**.

**Fechamento do instrutor sobre a escolha:**

> *"The best option depends on your **business needs** and **ML expertise**.
> **Budget** is also an important consideration."*

Três fatores de decisão: **necessidade de negócio**, **expertise em ML** e
**orçamento**. Preço detalhado só no site do Google Cloud.

### 4. ⭐⭐⭐ O guia de decisão — quatro cenários

O instrutor dá **quatro frases condicionais**. Elas são praticamente questões de
prova prontas:

| Se… | Então |
|---|---|
| **pouca experiência em ML** e **nenhuma intenção de treinar** modelos | **Pre-trained APIs** |
| a equipe **conhece SQL** e os dados **já estão no BigQuery** | **BigQuery ML** |
| quer **modelos customizados** com **dados próprios**, gastando **mínimo de código** | **Agent Platform AutoML** |
| ML engineers e data scientists querem **controle total do workflow** | **Custom training** |

**Os complementos de cada um:**

- **Pre-trained APIs** — resolvem **perceptual tasks** comuns: **vision, video e
  natural language**. *"Ready to use without any model development effort."*
- **BigQuery ML** — permite usar **queries SQL** para construir **modelos
  predefinidos**.
- **AutoML** — *"allows you to focus on **business problems** instead of the
  underlying **model architecture and provisioning**"*. Essa é a proposta de
  valor: você pensa no problema, não na arquitetura.
- **Custom training** — treina e serve modelos **com código**, em
  **Workbench** ou **Colab Enterprise**.

> ⚠️ **Perceptual tasks** é termo novo e cobrável: são as tarefas de
> **percepção** — visão, vídeo e linguagem natural. É o domínio das pre-trained
> APIs.

### 5. Os nomes completos dos notebooks (atenção ao rebranding)

A aula usa os nomes longos, pós-rebranding:

- **Gemini Enterprise Agent Platform Workbench**
- **Gemini Enterprise Agent Platform Colab Enterprise**

São os mesmos **Workbench** e **Colab Enterprise** da aula 3.2 — agora com o
prefixo completo da plataforma. Em questão de prova os nomes curtos são
suficientes; o importante é saber que **custom training roda neles**.

### 6. As três personas que abrem a aula

O instrutor enquadra o problema por **quem** você é — e cada persona mapeia para
um degrau da escada:

| Persona | O que quer | Degrau provável |
|---|---|---|
| **Business user** sem background técnico | **prototipar ideias** de negócio | **no-code** |
| **Data scientist** com dados de treino | modelo customizado **sem tunar parâmetros do zero** | **AutoML** |
| **ML engineer** que gosta de DIY | construir **pipelines de ML** | **custom training** |

### 7. O roteiro do Módulo 4

| Etapa | Conteúdo |
|---|---|
| 1 | **Comparar** as opções — no-code → low-code → DIY *(esta aula)* |
| 2 | Conhecer a **Agent Platform**, *"Google's unified AI development platform"* |
| 3 | **Deep dive** em três opções: **AutoML**, **pre-trained APIs** e **custom training** |
| 4 | **Lab:** Natural Language API — identificar sujeitos e analisar sentimento |

> 📌 **Observação:** o deep dive cobre **três** opções, não quatro — o
> **BigQuery ML** já teve a sua aula própria (**2.5**). Se a prova perguntar
> "quais opções o Módulo 4 aprofunda", a resposta exclui o BigQuery ML.

A Agent Platform é chamada de *"your **playground** to build an ML model from
**end-to-end**"*.

---

## Glossário da aula

| Termo | Definição |
|---|---|
| **Predictive AI** | IA para tarefas tradicionais: **forecasting** e **classification** |
| **Perceptual tasks** | Tarefas de **percepção** — vision, video, natural language; domínio das pre-trained APIs |
| **Pre-trained APIs** | APIs **preconfiguradas** sobre modelos já treinados pelo Google; **nenhum** dado de treino, **nenhum** tempo de treino |
| **Preconfigured APIs** | Sinônimo de pre-trained APIs usado nesta aula |
| **Agent Platform AutoML** | Construir modelos próprios via **point-and-click**; foco no **problema de negócio**, não na arquitetura |
| **Custom training** | Treinar e servir modelos **com código**, em Workbench ou Colab Enterprise; **controle total** |
| **Hyperparameter tuning** | Experimentar os hiperparâmetros — possível em **BigQuery ML** e **custom training** |
| **Semi-structured data** | Dados como arquivos **JSON**; o BigQuery ML aceita |
| **Agent Platform** | *"Google's unified AI development platform"* — o playground end-to-end |
| **Model architecture and provisioning** | O que o AutoML abstrai de você |

---

## Flashcards

| Pergunta | Resposta |
|---|---|
| ⭐ O **BigQuery ML** é low-code ou code-based? | **Code-based** — porque exige **SQL** |
| Quais ferramentas o curso coloca no degrau **code-based**? | **BigQuery ML**, **ADK** e **custom training** |
| O que é **predictive AI**? | IA para tarefas tradicionais: **forecasting** e **classification** |
| As quatro opções se aplicam só à IA preditiva? | **Não** — aplicam-se a **gen AI e predictive AI** |
| ⭐ Qual opção processa **áudio**? | **Só as pre-trained APIs** |
| ⭐ Quais tipos de dado o **BigQuery ML** aceita? | **Tabular** e **semi-estruturado (JSON)** — e só |
| Quais tipos o **AutoML** aceita? | **Tabular e imagem** |
| Quais tipos as **pre-trained APIs** e o **custom training** aceitam? | Tabular, imagem, texto, vídeo (+ **áudio** nas APIs) |
| Qual opção exige **zero** dados de treino? | **Pre-trained APIs** |
| Quais exigem **grande volume** de dados? | **BigQuery ML** e **custom training** |
| ⭐ Quais permitem **tunar hiperparâmetros**? | **BigQuery ML** e **custom training** |
| Quais **não** permitem? | **Pre-trained APIs** e **Agent Platform AutoML** |
| Qual exige a **maior** expertise em ML e código? | **Custom training** |
| Qual leva o **maior tempo** para treinar? | **Custom training** — constrói o modelo do zero |
| Qual leva **tempo zero**? | **Pre-trained APIs** — usam modelos já treinados do Google |
| Os três fatores de escolha | **Necessidade de negócio**, **expertise em ML** e **orçamento** |
| Cenário: pouca experiência, sem intenção de treinar | **Pre-trained APIs** |
| Cenário: conhece SQL, dados já no BigQuery | **BigQuery ML** |
| Cenário: dados próprios, mínimo de código | **Agent Platform AutoML** |
| Cenário: controle total do workflow | **Custom training** |
| O que são **perceptual tasks**? | **Vision, video e natural language** |
| A proposta de valor do **AutoML** | Focar no **problema de negócio** em vez da **arquitetura do modelo e provisionamento** |
| Onde o **custom training** roda? | **Workbench** ou **Colab Enterprise** |
| Como a aula chama a **Agent Platform**? | *"Unified AI development platform"* e seu **playground** end-to-end |
| Qual é o lab do Módulo 4? | **Natural Language API** — sujeitos e **análise de sentimento** |
| Quais opções o Módulo 4 aprofunda? | **AutoML, pre-trained APIs e custom training** — o BigQuery ML já teve a aula 2.5 |

---

## Questões estilo prova

**1.** Uma seguradora precisa transcrever e analisar gravações de chamadas de
atendimento. Qual opção de desenvolvimento é a adequada?
- A) BigQuery ML
- B) Agent Platform AutoML
- C) Pre-trained APIs
- D) Custom training

<details><summary>Gabarito</summary>

**C.** ⭐ **Áudio** é o diferencial exclusivo das **pre-trained APIs** — é o único
critério da tabela em que uma ferramenta aparece sozinha. (A) BigQuery ML só
aceita tabular e JSON. (B) AutoML aceita tabular e imagem. (D) Custom training
aceita tabular, imagem, texto e vídeo — **não áudio**.
</details>

**2.** ⭐ No curso, o **BigQuery ML** pertence a qual nível de abordagem?
- A) No-code
- B) No-to-low-code
- C) Low-code
- D) Code-based

<details><summary>Gabarito</summary>

**D.** A frase é explícita: *"code-based approaches, ranging from BigQuery ML and
ADK… to completely DIY custom training."* O motivo é o **SQL**. (B) é o rótulo
reservado ao **AutoML** nesta aula; (C) low-code são as **preconfigured APIs**.
</details>

**3.** Uma equipe de analistas já tem três anos de dados de vendas em tabelas do
BigQuery e domina SQL, mas ninguém sabe Python. Qual opção?
- A) Pre-trained APIs
- B) BigQuery ML
- C) Agent Platform AutoML
- D) Custom training

<details><summary>Gabarito</summary>

**B.** Os **dois gatilhos** do BigQuery ML aparecem juntos: **familiaridade com
SQL** e **dados já no BigQuery**. (A) não serve porque eles **querem** treinar um
modelo com os dados deles. (D) exige a maior expertise em código.
</details>

**4.** ⭐ Em quais opções é possível **experimentar hiperparâmetros**?
- A) Pre-trained APIs e AutoML
- B) BigQuery ML e custom training
- C) Apenas custom training
- D) Em todas as quatro

<details><summary>Gabarito</summary>

**B.** A linha divisória é a mesma do code-based: **BigQuery ML e custom
training** permitem; **pre-trained APIs e AutoML**, não. ⚠️ (A) é a inversão
exata — o distrator clássico. (C) é tentador mas esquece o BigQuery ML.
</details>

**5.** Qual é a proposta de valor do **Agent Platform AutoML**, nas palavras do
curso?
- A) Eliminar a necessidade de dados de treino
- B) Permitir controle total sobre o workflow de ML
- C) Deixar você focar nos problemas de negócio em vez da arquitetura do modelo e do provisionamento
- D) Processar dados de áudio e vídeo

<details><summary>Gabarito</summary>

**C.** A frase é quase literal. ⚠️ (A) descreve as **pre-trained APIs** — o
AutoML **precisa** dos seus dados de treino. (B) descreve o **custom training**.
(D) o AutoML aceita só tabular e imagem.
</details>

**6.** As quatro opções de desenvolvimento desta aula se aplicam a:
- A) Apenas IA preditiva
- B) Apenas IA generativa
- C) Tanto IA generativa quanto IA preditiva
- D) Apenas projetos com dados tabulares

<details><summary>Gabarito</summary>

**C.** *"These options apply to both gen AI and predictive AI."* ⚠️ (A) é o
distrator natural, porque o módulo **abre** falando de IA preditiva — mas o
instrutor desarma a separação explicitamente.
</details>

**7.** Por que o **custom training** normalmente leva o maior tempo de treino?
- A) Porque roda em hardware mais lento
- B) Porque constrói o modelo de ML desde o início, ao contrário do AutoML e do BigQuery ML
- C) Porque exige validação manual de cada época
- D) Porque usa mais dados que as outras opções

<details><summary>Gabarito</summary>

**B.** *"because it builds the ML model from the beginning, unlike Agent Platform
AutoML and BigQuery ML."* ⚠️ (D) é parcialmente verdade (exige volume grande),
mas o motivo que o curso dá é **construir do zero**.
</details>

---

## Dúvidas em aberto / revisar

- ⚠️ **Qual o volume de dados do AutoML?** A aula compara os outros três
  explicitamente (nenhum / grande / grande) e **omite** o AutoML. Leitura
  segura: **intermediário**. Vale ver se a aula **4.3** (Agent Platform AutoML)
  quantifica.
- ⚠️ **AutoML é no-code ou low-code?** Esta aula inventa o rótulo
  **"no-to-low-code"**, que não existe nas escadas de 1.1, 3.2 e 3.8. Em 1.1 ele
  aparecia como **no-code**. Se cair numa questão binária, **low-code** é a
  aposta mais consistente com o "no-to-**low**".
- ⚠️ **ADK** continua sem a sigla expandida — agora já em quatro aulas (3.8, 3.9,
  4.1).
- 📌 **Material consolidado do módulo anterior:** [[google-ai-ml-modulo-3-revisao]]

---
