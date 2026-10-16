---
title: Aula 4.2 — Agent Platform
aliases: [Agent Platform plataforma unificada, quatro Ss Agent Platform, feature store, pipeline de ML end-to-end]
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
summary: "Aula 4.2 do curso Introduction to AI and ML on Google Cloud: a Agent Platform como plataforma unificada — os desafios de produção e usabilidade que ela resolve, os dois sentidos de 'unificada', os quatro estágios do pipeline end-to-end e os quatro Ss (seamless, scalable, sustainable, speedy). Contradiz a 4.1 ao chamar o AutoML de no-code."
transcricao: "[[T - 2026-10-09-m04-a02-agent-platform]]"
parte_de: "[[curso-intro-ai-ml-google-cloud]]"
curso: "[[curso-intro-ai-ml-google-cloud]]"
data: 2026-10-09
related: ["[[R - 2026-10-09-m04-a01-ai-development-options]]", "[[R - 2026-10-08-m02-a05-bigquery-ml]]"]
---

# Aula 4.2 — Agent Platform

| | |
|---|---|
| **Tema** | A Agent Platform como plataforma unificada de desenvolvimento de IA |
| **Curso** | [[curso-intro-ai-ml-google-cloud]] |
| **Data** | 09/10/2026 |
| **Duração** | ~4min15 |
| **Aula nº** | 4.2 (módulo 4 na plataforma, "Module 3" na fala do instrutor) |
| **Transcrição** | [[T - 2026-10-09-m04-a02-agent-platform]] |

> 🎯 **Peso na prova: ⭐⭐⭐.** Duas listas de quatro itens altamente decoráveis —
> os **quatro estágios do pipeline** e os **quatro Ss** —, um **dado numérico**
> (Gartner) e uma **correção da aula anterior**. Aula curta, densa.

---

## Conteúdo por tópico

### 1. ⭐⭐ A contradição com a aula 4.1 — e qual versão usar

A aula 4.1 colocou o AutoML num degrau inédito, **"no-to-low-code"**. A 4.2 é
categórica:

> *"Agent Platform allows users to build ML models with either **Agent Platform
> AutoML, a no-code solution**, or **custom training, a code-based solution**."*

| Aula | Como classifica o AutoML |
|---|---|
| **1.1** | **no-code** |
| **4.1** | "no-to-low-code" |
| **4.2** | **no-code** ✅ |

> ✅ **Resolvido: o AutoML é NO-CODE.** Duas aulas contra uma, e a 4.2 é a mais
> explícita das três ("a no-code solution", sem hífens nem hesitação). O
> "no-to-low-code" da 4.1 foi uma formulação solta.

⚠️ **Mas guarde a nuance:** na tabela comparativa da 4.1, o AutoML **não permite
tunar hiperparâmetros** — o que é coerente com ser no-code. A classificação muda;
a tabela de capacidades não.

**E a dicotomia que a 4.2 estabelece para a IA preditiva é simples:**

| Ferramenta | Nível |
|---|---|
| **Agent Platform AutoML** | **no-code** |
| **Custom training** | **code-based** |

### 2. Os desafios que a Agent Platform resolve

O instrutor abre com o histórico: o Google aplica IA em **Gmail, Google Maps,
Google Photos e Google Translate**. Mas construir isso tem dois tipos de
problema:

| Tipo de desafio | Quais |
|---|---|
| **Produção** (*getting models into production*) | **escalabilidade**, **monitoramento** e **integração, entrega e treinamento contínuos** |
| **Usabilidade** (*ease-of-use*) | ferramentas exigem **habilidades avançadas de código**, tirando o foco do cientista de dados da **configuração do modelo**; e **sem workflow unificado** é difícil **encontrar as ferramentas** |

> 📌 **"Continuous integration, delivery, and training"** — note o terceiro item.
> Não é só CI/CD de software; em ML entra o **treinamento contínuo**. Esse é o
> gancho para o **MLOps** (aula 5.5).

### 3. ⭐⭐ O dado do Gartner

> *"According to **Gartner**, **only half** of enterprise ML projects get past
> the **pilot phase**."*

| Fonte | **Gartner** |
|---|---|
| **Número** | **metade** (50%) |
| **Do quê** | projetos de ML **empresariais** |
| **Que não passam de** | **fase piloto** |

⚠️ É o único dado estatístico citado no módulo até agora. Dados numéricos com
fonte nomeada são candidatos naturais a questão. Decore os três elementos:
**Gartner · metade · fase piloto**.

### 4. ⭐⭐⭐ Os DOIS sentidos de "plataforma unificada"

A pergunta que o instrutor faz — *"what exactly does a unified platform mean?"* —
tem **duas respostas**, e isso é o esqueleto da aula.

> *"A unified platform that brings **all the components of the machine learning
> ecosystem and workflow** together."*

#### Sentido 1 — Um pipeline de ML end-to-end

> *"An end-to-end ML pipeline to **prepare data**, and **create, deploy, and
> manage models** over time and **at scale**."*

**Os quatro estágios, na ordem:**

| # | Estágio | O que acontece |
|---|---|---|
| 1 | **Data readiness** | Subir dados de **onde estiverem**: **Cloud Storage**, **BigQuery** ou **máquina local** |
| 2 | **Feature readiness** | Criar **features** — os **dados processados** que vão entrar no modelo — e **compartilhá-las** via **feature store** |
| 3 | **Training and hyperparameter tuning** | **Experimentar modelos diferentes** e **ajustar hiperparâmetros** |
| 4 | **Deployment and model monitoring** | Montar o pipeline que leva o modelo à **produção**, com **monitoramento automático** e **melhoria contínua** |

⚠️ **Três detalhes cobráveis:**

1. **As três origens de dados no estágio 1** são nomeadas: **Cloud Storage,
   BigQuery e máquina local**.
2. **A definição de feature** aparece aqui: *"the **processed data** that will be
   put into the model"*. Não é o dado bruto — é o dado **processado**.
3. **O feature store** é o mecanismo de **compartilhamento** de features entre
   pessoas. Essa é a função que o curso dá a ele.

O estágio 4 é explicitamente adiado: *"you'll learn how to do this later in the
course, when you explore **MLOps**"* — aula **5.5**.

#### Sentido 2 — Abrange as duas IAs

> *"Agent Platform… **encompasses both generative AI**, enabling creation of
> **multimodal content**, and **predictive AI**, allowing for **forecasting and
> classification**."*

| | **Gen AI na Agent Platform** | **Predictive AI na Agent Platform** |
|---|---|---|
| **O que permite** | criar **conteúdo multimodal** | **forecasting** e **classification** |
| **Ferramentas** | **Agent Studio** e **ADK** (módulo 3) | **AutoML** (no-code) e **custom training** (code-based) |

Isso confirma e detalha a frase da 4.1 (*"these options apply to both gen AI and
predictive AI"*) — e mostra **quais** ferramentas pertencem a cada lado.

### 5. AutoML × custom training, segundo a 4.2

| | **Agent Platform AutoML** | **Custom training** |
|---|---|---|
| **Nível** | **no-code** | **code-based** |
| **Oferece** | **UI fácil de navegar** | **mais controle** sobre o **ambiente e o processo** de desenvolvimento |
| **Permite focar em** | **quais problemas de negócio resolver**, não em **como codificar e implantar** | fazer o projeto de ML **por conta própria** |
| **Ferramentas** | a própria UI | **Agent Platform Workbench** e **Agent Platform Colab Enterprise** |

> 📌 **A frase do AutoML muda de forma entre as aulas.** Na 4.1: focar nos
> problemas de negócio *"instead of the underlying **model architecture and
> provisioning**"*. Na 4.2: *"instead of **how to code and deploy** an ML
> solution"*. **O mesmo conceito, duas redações** — ambas válidas.

### 6. ⭐ O Workbench escreve SQL e conecta ao BigQuery

> *"One convenient feature is that data scientists can now **write SQL with
> Agent Platform Workbench** to **seamlessly connect BigQuery and Agent
> Platform**."*

Esta é a ponte entre os dois mundos que o curso vinha tratando em separado: o
**BigQuery ML** (SQL, code-based, aula 2.5) e o **custom training** (código, aula
4.1). O **Workbench** aceita SQL e liga as duas pontas.

### 7. ⭐⭐⭐ Os quatro Ss

A lista mais decorável da aula. **Seamless · Scalable · Sustainable · Speedy.**

| S | O que significa | A frase do curso |
|---|---|---|
| **Seamless** | **experiência fluida** de ponta a ponta | *"from uploading and preparing data all the way to model training and production"* |
| **Scalable** | o **MLOps** monitora e gerencia a produção e portanto **escala armazenamento e poder computacional automaticamente** | *"scale the storage and computing power automatically"* |
| **Sustainable** | **artifacts e features** podem ser **reusados e compartilhados** | *"can be reused and shared"* |
| **Speedy** | modelos com **significativamente menos linhas de código** que os concorrentes | *"significantly less lines of code than competitors"* |

⚠️ **As três confusões possíveis entre os Ss:**

- **Scalable** é sobre **escalar storage e computação automaticamente**, via
  MLOps — **não** sobre escalar o time ou o número de modelos.
- **Sustainable** **não** é sobre meio ambiente nem custo: é sobre **reúso e
  compartilhamento** de artifacts e features. (E é o S que se liga ao **feature
  store** do estágio 2.)
- **Speedy** é sobre **menos linhas de código**, não sobre velocidade de inferência
  nem tempo de treino.

---

## Glossário da aula

| Termo | Definição |
|---|---|
| **Agent Platform** | *"Google's **unified AI development platform**"* — o **playground** para construir um modelo de ML end-to-end |
| **Unified platform** | Plataforma que reúne **todos os componentes do ecossistema e do workflow de ML** |
| **End-to-end ML pipeline** | Preparar dados e **criar, implantar e gerenciar** modelos **ao longo do tempo e em escala** |
| **Data readiness** | Estágio 1: subir dados de **Cloud Storage, BigQuery ou máquina local** |
| **Feature readiness** | Estágio 2: criar **features** e compartilhá-las no **feature store** |
| **Feature** | Os **dados processados** que entram no modelo |
| **Feature store** | O mecanismo para **compartilhar features** com outras pessoas |
| **Training and hyperparameter tuning** | Estágio 3: experimentar modelos e ajustar hiperparâmetros |
| **Deployment and model monitoring** | Estágio 4: levar à produção com **monitoramento automático** e **melhoria contínua** |
| **Continuous integration, delivery and training** | Os três "contínuos" do desafio de produção — note o **treinamento** |
| **Os quatro Ss** | **Seamless · Scalable · Sustainable · Speedy** |
| **Agent Platform Workbench** | Notebook para custom training; **aceita SQL** e conecta **BigQuery ↔ Agent Platform** |
| **Agent Platform Colab Enterprise** | O outro notebook para custom training |

---

## Flashcards

| Pergunta | Resposta |
|---|---|
| ⭐ O **AutoML** é no-code ou low-code? | **No-code** — a 4.2 é explícita; o "no-to-low-code" da 4.1 foi formulação solta |
| Como a aula define a **Agent Platform**? | *"Google's **unified AI development platform**"*; o **playground** end-to-end |
| Em quais produtos o Google já aplica IA? | **Gmail, Google Maps, Google Photos, Google Translate** |
| Os desafios de **produção** | **escalabilidade**, **monitoramento** e **integração, entrega e treinamento contínuos** |
| Os desafios de **usabilidade** | exigem **código avançado** (tira o foco da configuração do modelo) e, **sem workflow unificado**, é difícil **achar as ferramentas** |
| ⭐ O dado do **Gartner** | **Só metade** dos projetos de ML **empresariais** passa da **fase piloto** |
| Os **dois sentidos** de "plataforma unificada" | 1) um **pipeline de ML end-to-end** · 2) abrange **gen AI e predictive AI** |
| ⭐ Os **quatro estágios** do pipeline | **data readiness → feature readiness → training and hyperparameter tuning → deployment and model monitoring** |
| De onde se sobem dados no estágio 1? | **Cloud Storage**, **BigQuery** ou **máquina local** |
| ⭐ O que é uma **feature**? | Os **dados processados** que vão entrar no modelo |
| Para que serve o **feature store**? | **Compartilhar features** com outras pessoas |
| O que acontece no estágio 3? | **Experimentar modelos diferentes** e **ajustar hiperparâmetros** |
| Para onde o estágio 4 aponta? | Para o **MLOps**, na aula 5.5 |
| Ferramentas de **gen AI** na Agent Platform | **Agent Studio** e **ADK** |
| Ferramentas de **predictive AI** | **AutoML** (no-code) e **custom training** (code-based) |
| O que o **custom training** oferece a mais? | **Mais controle** sobre o **ambiente e o processo** de desenvolvimento |
| Em que ferramentas o custom training roda? | **Agent Platform Workbench** e **Agent Platform Colab Enterprise** |
| ⭐ Qual o recurso conveniente do **Workbench**? | **Escrever SQL** para conectar **BigQuery e Agent Platform** |
| ⭐⭐ Os **quatro Ss** | **Seamless · Scalable · Sustainable · Speedy** |
| **Seamless** significa | Experiência fluida **do upload dos dados até a produção** |
| **Scalable** significa | O **MLOps** escala **armazenamento e poder computacional automaticamente** |
| **Sustainable** significa | **Artifacts e features** podem ser **reusados e compartilhados** |
| **Speedy** significa | Modelos com **significativamente menos linhas de código** que os concorrentes |

---

## Questões estilo prova

**1.** ⭐ Segundo a aula 4.2, o **Agent Platform AutoML** é:
- A) Uma solução no-code
- B) Uma solução low-code
- C) Uma solução code-based
- D) Uma API pré-treinada

<details><summary>Gabarito</summary>

**A.** *"Agent Platform AutoML, a **no-code** solution."* ⚠️ (B) é o distrator
que vem da 4.1, que usou "no-to-low-code" — mas 1.1 e 4.2 dizem **no-code**, e a
4.2 é a mais explícita. (C) descreve o **custom training**.
</details>

**2.** ⭐ Qual é a ordem correta dos quatro estágios do pipeline de ML na Agent
Platform?
- A) Feature readiness → data readiness → training → deployment
- B) Data readiness → feature readiness → training e hyperparameter tuning → deployment e model monitoring
- C) Data readiness → training → feature readiness → monitoring
- D) Training → data readiness → deployment → feature readiness

<details><summary>Gabarito</summary>

**B.** Os dados vêm **antes** das features, porque features são **dados
processados**. ⚠️ (A) inverte os dois primeiros — o erro mais provável se você
decorar a lista sem entender a dependência.
</details>

**3.** O que é uma **feature**, na definição desta aula?
- A) Um recurso da interface do Agent Platform
- B) Os dados brutos carregados do Cloud Storage
- C) Os dados processados que serão colocados no modelo
- D) Um hiperparâmetro ajustável

<details><summary>Gabarito</summary>

**C.** *"features, which are the **processed data** that will be put into the
model."* ⚠️ (B) é o distrator preciso: dado **bruto** é o estágio 1 (data
readiness); feature é o estágio 2, já **processado**.
</details>

**4.** ⭐ Qual dos quatro Ss descreve o **reúso e o compartilhamento** de
artifacts e features?
- A) Seamless
- B) Scalable
- C) Sustainable
- D) Speedy

<details><summary>Gabarito</summary>

**C.** ⚠️ **Sustainable não é sobre meio ambiente nem custo** — é sobre
**reutilizar e compartilhar**. É o S que se liga ao **feature store**. (A) é a
fluidez do upload à produção, (B) é escalar storage e computação, (D) é menos
linhas de código.
</details>

**5.** Segundo o dado citado na aula, quantos projetos de ML empresariais passam
da fase piloto?
- A) Um quarto, segundo o Gartner
- B) Metade, segundo o Gartner
- C) Metade, segundo a McKinsey
- D) Três quartos, segundo o Gartner

<details><summary>Gabarito</summary>

**B.** **Gartner · metade · fase piloto.** Três elementos, todos cobráveis — e a
prova pode trocar só a fonte ou só a fração.
</details>

**6.** O que o **Agent Platform Workbench** permite fazer, como recurso de
conveniência?
- A) Treinar modelos sem escrever código
- B) Escrever SQL para conectar BigQuery e Agent Platform
- C) Implantar agentes com templates prontos
- D) Monitorar automaticamente modelos em produção

<details><summary>Gabarito</summary>

**B.** *"data scientists can now **write SQL** with Agent Platform Workbench to
seamlessly connect **BigQuery and Agent Platform**."* (A) é o AutoML, (C) é o
**Agent Garden**, (D) é o estágio 4 do pipeline.
</details>

**7.** Quais são os **dois sentidos** em que a Agent Platform é "unificada"?
- A) Unifica gen AI e predictive AI, e unifica os times de dados e de ML
- B) Oferece um pipeline de ML end-to-end, e abrange tanto gen AI quanto predictive AI
- C) Unifica BigQuery e Cloud Storage, e unifica treino e serving
- D) Unifica no-code e code-based, e unifica os quatro Ss

<details><summary>Gabarito</summary>

**B.** O instrutor enumera explicitamente: *"there are **two primary aspects**"*
— o **pipeline end-to-end** e as **duas IAs**. (A) e (C) misturam elementos
verdadeiros da aula em pares que o curso não faz.
</details>

---

## Dúvidas em aberto / revisar

- ✅ **RESOLVIDO: AutoML é no-code.** A 4.2 encerra o "no-to-low-code" da 4.1.
- ⚠️ **O volume de dados do AutoML** continua sem número. Pode vir na **4.3**.
- ⚠️ **ADK** citado de novo (*"gen AI tools… like Agent Studio and ADK"*) e
  **ainda sem a sigla expandida** — já são cinco aulas.
- 📌 **O estágio 4 do pipeline é adiado para a aula 5.5 (MLOps).** Quando chegar
  lá, voltar a esta nota.
- 📌 **Nomes dos notebooks:** a 4.1 usou "Gemini Enterprise Agent Platform
  Workbench"; a 4.2 usa só "Agent Platform Workbench". Os nomes curtos bastam.

---
