---
title: Aula 5.5 — MLOps and workflow automation
aliases: [MLOps, Kubeflow Pipelines, TensorFlow Extended, tres fases de automacao de ML, pipeline component]
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
summary: "Aula 5.5 do curso Introduction to AI and ML on Google Cloud: MLOps e automação de workflow — a definição de MLOps e sua relação com DevOps, KFP × TFX e quando usar cada um, os dois ambientes de um pipeline, o que é um pipeline component, as três fases de automação (0, 1 e 2) e o exemplo completo do pipeline de classificação de feijões com os quatro componentes pré-construídos."
transcricao: "[[T - 2026-10-09-m05-a05-mlops-and-workflow-automation]]"
parte_de: "[[curso-intro-ai-ml-google-cloud]]"
curso: "[[curso-intro-ai-ml-google-cloud]]"
data: 2026-10-09
related: ["[[R - 2026-10-09-m05-a04-model-serving]]", "[[R - 2026-10-09-m05-a01-ml-workflow]]", "[[R - 2026-10-08-m02-a05-bigquery-ml]]"]
---

# Aula 5.5 — MLOps and workflow automation

| | |
|---|---|
| **Tema** | MLOps, pipelines e as três fases de automação |
| **Curso** | [[curso-intro-ai-ml-google-cloud]] |
| **Data** | 09/10/2026 |
| **Duração** | ~6min15 |
| **Aula nº** | 5.5 (módulo 5 na plataforma, "Module 4" na fala do instrutor) |
| **Transcrição** | [[T - 2026-10-09-m05-a05-mlops-and-workflow-automation]] |

> 🎯 **Peso na prova: ⭐⭐⭐.** A aula mais densa do módulo — e o próprio curso a
> anuncia como *"an **advanced topic**"*. Quatro listas cobráveis (os **dois
> ambientes**, as **três fases**, os **três "contínuos"** e os **quatro
> componentes pré-construídos**), uma **regra de decisão** (KFP × TFX) e **nomes
> de API** que podem cair literalmente.

---

## Conteúdo por tópico

### 1. ⭐⭐⭐ O que é MLOps

> *"MLOps **combines machine learning development with operations** and applies
> **similar principles from DevOps** (or development operations) to machine
> learning models."*

| | |
|---|---|
| **O que combina** | **desenvolvimento de ML** + **operações** |
| **De onde vêm os princípios** | do **DevOps** (*development operations*) |
| **A que se aplicam** | a **modelos de machine learning** |

**⭐ O que MLOps busca resolver:**

> *"MLOps aims to solve **production challenges** related to machine learning…
> this refers to **building an integrated ML system** and **operating it in
> production**."*

**⭐⭐ E a razão pela qual isso é difícil — a frase mais importante da aula:**

> *"These are considered to be some of the **biggest pain points** by the **ML
> practitioners' community** because **both data and code are constantly
> evolving** in machine learning."*

⚠️ **Decore o motivo: dados E código evoluem constantemente.** É isso que
diferencia o MLOps do DevOps clássico — no software tradicional, só o **código**
muda; em ML, os **dados** também. Se uma questão perguntar *por que* o MLOps é
necessário, a resposta é essa.

**⭐ O que significa "praticar MLOps":**

> *"Practicing MLOps means **automating and monitoring each step** of the ML
> system construction to enable **continuous integration, training, and
> delivery**."*

| Os três "contínuos" | Sigla |
|---|---|
| **Continuous integration** | **CI** |
| **Continuous training** | **CT** |
| **Continuous delivery** | **CD** |

⚠️ **O do meio é o que diferencia ML de software:** **continuous TRAINING**. No
DevOps clássico existem só CI e CD. E note que o curso já havia usado essa tríade
na aula **4.2**, ao listar os desafios de produção (*"continuous integration,
delivery, and **training**"*) — **lista estável**.

### 2. As duas abordagens para um workflow end-to-end

> *"You have **two approaches** to build an end-to-end workflow."*

| | **Codeless** | **Codificado** |
|---|---|---|
| **Como** | pelo **Google Cloud console**, como o **AutoML** | **codar um pipeline** que automatiza o workflow |
| **Quando** | para construir manualmente | quando você quer **automatizar** para atingir **CI, CT e CD** |

✅ É a mesma dicotomia da aula **5.1** (*"two options to set up the workflow"*),
agora com a **motivação explícita** para o caminho codificado: **os três
contínuos**.

### 3. ⭐⭐⭐ KFP × TFX — a regra de decisão

> *"The **backbone of MLOps** on Agent Platform is a toolkit called **Agent
> Platform Pipelines**. This toolkit supports **both Kubeflow Pipelines, or
> KFP**, and **TensorFlow Extended, or TFX**."*

| Sigla | Nome completo |
|---|---|
| **KFP** | **Kubeflow Pipelines** |
| **TFX** | **TensorFlow Extended** |

**⭐⭐ A regra de decisão, quase literal:**

> *"**If you already use TensorFlow** to build ML models that process
> **terabytes of structured data**, it makes sense to use **TFX** and turn that
> code into an ML pipeline. **Otherwise, KFP** can be a good alternative."*

| Se… | Use |
|---|---|
| você **já usa TensorFlow** **e** processa **terabytes de dados estruturados** | **TFX** |
| **caso contrário** | **KFP** |

⚠️ **A condição do TFX tem DUAS metades**, como a do pre-built container na aula
4.5: **já usar TensorFlow** **E** **terabytes de dados estruturados**. O **KFP é
o padrão** — a alternativa para todo o resto.

📌 **Note também que "backbone" muda de dono entre as aulas:**

| Aula | De que o Agent Platform Pipelines é o backbone |
|---|---|
| **5.4** | *"the backbone of **automating ML workflow**"* |
| **5.5** | *"the backbone of **MLOps**"* |

**São a mesma coisa dita de dois jeitos** — automatizar o workflow **é** praticar
MLOps. Não é contradição.

### 4. ⭐⭐⭐ Os dois ambientes de um pipeline

> *"An ML pipeline contains a **series of processes** and runs in **two different
> environments**."*

| # | Ambiente | O que acontece lá |
|---|---|---|
| **1** | **experimentation, development, and test** | **data preparation** (data extraction, analysis, preparation) → **model development** (training, evaluation, validation). **Resultado: um modelo treinado**, que pode entrar no **model registry** |
| **2** | **staging, pre-production, and production** | **serve the model** — **prediction** e **monitoring** |

⚠️ **Três detalhes cobráveis:**

1. **Cada ambiente tem TRÊS nomes**, não um: *experimentation, development, test*
   e *staging, pre-production, production*. A prova pode citar qualquer um dos
   três.
2. **O que divide os dois ambientes é o modelo treinado** entrar no **model
   registry**. Esse é o ponto de passagem.
3. **As sub-etapas são mais finas que as dos três estágios da 5.1:**

| Estágio da 5.1 | Sub-etapas na 5.5 |
|---|---|
| **Data preparation** | **data extraction · analysis · preparation** |
| **Model development** | **training · evaluation · validation** |
| **Model serving** | **prediction · monitoring** |

⚠️ **A 5.5 acrescenta "validation" ao model development** — a 5.1 e a 5.3 falavam
só de **training e evaluation**. E acrescenta **"extraction"** e **"analysis"** à
data preparation, onde a 5.2 falava de **uploading e feature engineering**.

> ✅ **Como responder:** se a questão falar dos **estágios do workflow**, use a
> lista da **5.1/5.2/5.3/5.4**. Se falar dos **processos dentro de um pipeline**,
> use a lista mais fina da **5.5**.

📌 **O model registry** é o mesmo da aula **3.5** — para onde vai o modelo
resultante de um tuning job. Agora ele reaparece como o ponto de passagem do
pipeline.

### 5. ⭐⭐ O que é um pipeline component

> *"Each of these processes can be a **pipeline component**, which is a
> **self-contained set of code** that performs **one task** of a workflow. You
> can think of a component as a **function**, which is a **building block** of a
> pipeline."*

| | |
|---|---|
| **O que é** | um **conjunto de código autocontido** |
| **Faz** | **uma** tarefa do workflow |
| **A analogia** | uma **função** |
| **O papel** | é um **building block** do pipeline |

✅ **Isso resolve a ambiguidade que eu havia flagado entre a 5.1 e a 5.4.** A 5.1
dizia que os building blocks eram os **SDKs**; a 5.4, os **components**. A 5.5 é
explícita: o **component** é o building block, e é **como uma função**. Os
**SDKs** são a ferramenta com que você os escreve.

**Custom × pre-built:**

> *"You can either **build a custom component** on your own or **leverage the
> pre-built components provided by Google**."*

| Quando codar um **custom component** | *"to accomplish a **specific task** to tailor your ML workflow, such as **determining a special threshold for model deployment**"* |
|---|---|
| **A recomendação do curso** | ⭐ **antes de codar, verifique os pre-built components** — *"you may find a pipeline component to **reuse or customize**"* |

⚠️ **A ordem é cobrável: checar os prontos ANTES de escrever o seu.** E a
documentação sobre os pre-built components está na **reading list**.

> *"All these components are like **pieces** of an ML pipeline. You need to
> **assemble them together** to automate the entire ML workflow."*

### 6. ⭐⭐⭐ As três fases de automação

> *"Organizations often implement ML automation in **three phases**."*

| Fase | Estado | O que você faz | Com o quê |
|---|---|---|---|
| **Fase 0** | **nenhum MLOps configurado** | **treinar, implantar e servir** | o workflow baseado em **GUI** (*graphical user interface*), como o **AutoML** |
| **Fase 1** | começa a automação | **construir componentes** | os **SDKs do Agent Platform Pipelines** |
| **Fase 2** | automação completa | **integrar os componentes separados** num workflow inteiro | → atinge **CI, CT e CD** |

**⭐⭐ A frase mais citável da seção — e a mais provável de virar questão:**

> *"**Phase zero is critical** because it helps you **build an end-to-end
> workflow manually before you automate it**."*

⚠️ **A fase 0 não é "a fase de quem ainda não começou" — ela é CRÍTICA.** O
raciocínio: você não automatiza o que ainda não sabe fazer à mão. Se uma questão
sugerir que se deve pular a fase 0 e ir direto ao pipeline, está errada.

**Exemplos que o curso dá:**

| Fase | Exemplo |
|---|---|
| **1** | *"an example of a component would be the **training pipeline**"*; é nesta fase que você **desenvolve os building blocks para uso futuro** |
| **2** | integrar tudo e atingir os **três contínuos** |

### 7. ⭐⭐ O exemplo completo: o pipeline dos feijões

**O caso:** um pipeline para **treinar, avaliar e implantar** um modelo AutoML que
**classifica feijões em 1 de 7 tipos** com base em suas características.

📌 **"1 de 7 tipos"** é um número específico e, portanto, cobrável. E note que é
um problema de **classificação** com **mais de duas classes** — a matriz de
confusão da aula 5.3 assumia duas, "para simplificar".

**Os dois passos principais:** **construir** o pipeline e depois **rodá-lo**.

#### Construir — três etapas

| # | Etapa | Detalhe |
|---|---|---|
| **1** | **Planejar** como uma **série de componentes** | podem ser uma **combinação de custom e pre-built**. ⭐ *"To promote **reusability**, each component should have a **single responsibility**"* |
| **2** | **Construir os custom components** necessários | o exemplo: **`classification_model_eval_metrics`** |
| **3** | **Montar** o pipeline adicionando os **pre-built components** | os quatro abaixo |

**⭐⭐ O custom component do exemplo:**

> **`classification_model_eval_metrics`** — *"compara as **métricas de avaliação**
> a um **threshold** depois que o modelo é treinado, e **determina se o modelo
> deve ser implantado**."*

| Resultado | Ação |
|---|---|
| o modelo **vai bem** | **implanta** |
| caso contrário | **retreina** |

⚠️ **É este componente que fecha o ciclo iterativo da aula 5.1.** O "retorno" que
o MLOps automatiza é literalmente este `if`: performance abaixo do threshold →
retreinar.

**⭐⭐⭐ Os quatro pre-built components — nomes literais:**

| Componente | O que faz |
|---|---|
| **`TabularDatasetCreateOp`** | **cria um dataset tabular** na Agent Platform, dada uma fonte no **Cloud Storage ou BigQuery** |
| **`AutoMLTabularTrainingJobRunOp`** | **dispara um job de treinamento** do AutoML para um dataset tabular |
| **`EndpointCreateOp`** | **cria um endpoint** na Agent Platform |
| **`ModelDeployOp`** | **implanta um modelo num endpoint** |

⭐ **A ordem é a do pipeline:** **dataset → treino → endpoint → deploy**. E note
que os nomes são autoexplicativos e terminam em **`Op`** (de *operation*) — se
cair um nome, dá para deduzir pela função.

📌 **Conexão com a 5.4:** o **`EndpointCreateOp`** e o **`ModelDeployOp`**
implementam exatamente a **opção 1 de deployment** daquela aula — o endpoint para
previsões em tempo real.

#### Rodar — dois passos

| # | Passo | Como |
|---|---|---|
| 1 | **Compilar** | com **`compiler.Compiler().compile()`** |
| 2 | **Definir e rodar** o **pipeline job** | — |

**⭐ E a boa notícia:**

> *"You **don't have to create a pipeline from the beginning**. Agent Platform
> provides a **few templates**, like the one for the **classification or
> regression of tabular data with AutoML**."*

**O que você ganha no final:**

> *"This pipeline will **check the performance of the model constantly** and
> **decide whether it should be deployed or retrained without your
> intervention**."*

⚠️ **"Without your intervention"** é a definição prática do que a automação
entrega. E o curso acrescenta que o **Google Cloud visualiza o pipeline** com base
no código, para você **checar os componentes e os artifacts correspondentes**.

📌 **Para praticar:** o demo *"Introduction to Agent Platform Pipelines"* está na
**reading list** do curso (aula **5.11**).

### 8. ✅ Encerrando o "data drifting"

A aula **5.1** nomeou **data drifting** como um dos problemas que você encontra
monitorando o modelo. Eu vinha rastreando se alguma aula o definiria:

| Aula | Define? |
|---|---|
| **5.1** | **nomeia** apenas, ao lado da **queda súbita de acurácia** |
| **5.4** (*Model serving* — monitoramento) | ❌ não menciona |
| **5.5** (*MLOps* — a última expositiva) | ❌ não menciona |

> ❌ **Encerrado como menção solta**, mesmo tratamento que dei ao
> **chain-of-thought** no Módulo 3. **Para a prova, basta:** é um **problema
> detectado no monitoramento do modelo em produção**, e a resposta é **checar as
> fontes de dados e ajustar os parâmetros do modelo** (aula 5.1).

---

## Glossário da aula

| Termo | Definição |
|---|---|
| **MLOps** | Combina **desenvolvimento de ML** com **operações**, aplicando princípios do **DevOps** a modelos de ML |
| **DevOps** | ***Development operations*** — a origem dos princípios |
| **Praticar MLOps** | **Automatizar e monitorar cada passo** da construção do sistema de ML |
| **CI · CT · CD** | **Continuous integration · continuous training · continuous delivery** |
| **Agent Platform Pipelines** | O **toolkit**; o **backbone do MLOps** |
| **KFP** | **Kubeflow Pipelines** — a alternativa padrão |
| **TFX** | **TensorFlow Extended** — para quem **já usa TensorFlow** com **terabytes de dados estruturados** |
| **Pipeline component** | **Conjunto de código autocontido** que faz **uma** tarefa; é como uma **função** e é o **building block** do pipeline |
| **Custom component** | Você escreve, para **tarefas específicas** — ex.: um **threshold especial de deployment** |
| **Pre-built component** | Fornecido pelo Google; ⭐ **verifique antes de codar o seu** |
| **Model registry** | Onde o **modelo treinado** entra, ao fim do ambiente de desenvolvimento |
| **Fase 0** | **Nenhum MLOps**; workflow por **GUI** (ex.: AutoML). ⚠️ **Crítica** |
| **Fase 1** | **Construir componentes** com os **SDKs** |
| **Fase 2** | **Integrar os componentes** e atingir **CI, CT, CD** |
| **`classification_model_eval_metrics`** | O **custom component** do exemplo: compara métricas a um **threshold** e decide **implantar ou retreinar** |
| **`TabularDatasetCreateOp`** | Cria um **dataset tabular** (fonte no **Cloud Storage ou BigQuery**) |
| **`AutoMLTabularTrainingJobRunOp`** | Dispara o **job de treinamento** do AutoML |
| **`EndpointCreateOp`** | Cria um **endpoint** |
| **`ModelDeployOp`** | **Implanta** um modelo num endpoint |

---

## Flashcards

| Pergunta | Resposta |
|---|---|
| ⭐⭐ O que é **MLOps**? | Combina **desenvolvimento de ML** com **operações**, aplicando princípios do **DevOps** |
| O que **DevOps** significa? | ***Development operations*** |
| O que o MLOps busca resolver? | **Desafios de produção** — construir um **sistema de ML integrado** e **operá-lo em produção** |
| ⭐⭐ **Por que** isso é difícil? | Porque **tanto os dados quanto o código evoluem constantemente** |
| ⭐ O que significa **praticar MLOps**? | **Automatizar e monitorar cada passo** da construção do sistema de ML |
| ⭐⭐ Os **três contínuos** | **Continuous integration · training · delivery** (CI, CT, CD) |
| Qual deles diferencia ML de software comum? | **Continuous TRAINING** |
| Quais as **duas abordagens** para um workflow end-to-end? | **Codeless** pelo console (AutoML) ou **codar um pipeline** |
| ⭐⭐ Quais dois frameworks o Agent Platform Pipelines suporta? | **KFP** (Kubeflow Pipelines) e **TFX** (TensorFlow Extended) |
| ⭐⭐ Quando usar **TFX**? | Se você **já usa TensorFlow** **e** processa **terabytes de dados estruturados** |
| E caso contrário? | **KFP** — é a alternativa padrão |
| ⭐⭐ Os **dois ambientes** de um pipeline | **experimentation/development/test** e **staging/pre-production/production** |
| O que acontece no primeiro? | **Data preparation** (extraction, analysis, preparation) → **model development** (training, evaluation, validation) |
| O que divide os dois ambientes? | O **modelo treinado** entrar no **model registry** |
| O que acontece no segundo? | **Serve the model** — **prediction** e **monitoring** |
| ⭐⭐ O que é um **pipeline component**? | **Conjunto de código autocontido** que faz **uma** tarefa; é como uma **função** |
| O que é o **building block** de um pipeline? | O **component** (a 5.5 encerra a ambiguidade da 5.1) |
| Quando codar um **custom component**? | Para **tarefas específicas** — ex.: um **threshold especial de deployment** |
| ⭐ O que fazer **antes** de codar um? | **Verificar os pre-built components** do Google Cloud |
| ⭐⭐ As **três fases** de automação | **Fase 0** (nenhum MLOps, GUI) · **Fase 1** (construir componentes com os SDKs) · **Fase 2** (integrar e atingir CI/CT/CD) |
| ⭐⭐ Por que a **fase 0** é crítica? | Porque te faz **construir o workflow end-to-end manualmente antes de automatizá-lo** |
| Qual o exemplo de componente da fase 1? | O **training pipeline** |
| O caso do exemplo | Classificar **feijões em 1 de 7 tipos** |
| Os **dois passos principais** do exemplo | **Construir** o pipeline e depois **rodá-lo** |
| ⭐ Por que cada componente deve ter **uma única responsabilidade**? | Para promover **reusabilidade** |
| O que o **`classification_model_eval_metrics`** faz? | Compara as **métricas a um threshold** e decide **implantar ou retreinar** |
| ⭐⭐ **`TabularDatasetCreateOp`** | Cria um **dataset tabular** (fonte no **Cloud Storage ou BigQuery**) |
| ⭐⭐ **`AutoMLTabularTrainingJobRunOp`** | Dispara o **job de treinamento** do AutoML |
| ⭐⭐ **`EndpointCreateOp`** | Cria um **endpoint** |
| ⭐⭐ **`ModelDeployOp`** | **Implanta** um modelo num endpoint |
| A ordem dos quatro | **dataset → treino → endpoint → deploy** |
| Como se compila o pipeline? | Com **`compiler.Compiler().compile()`** |
| Você precisa criar um pipeline do zero? | **Não** — a Agent Platform oferece **templates** |
| O que o pipeline automatizado entrega? | Checa a performance **constantemente** e decide **implantar ou retreinar sem a sua intervenção** |

---

## Questões estilo prova

**1.** ⭐⭐ Por que o MLOps é necessário, segundo o curso?
- A) Porque modelos de ML são mais lentos que software tradicional
- B) Porque tanto os dados quanto o código evoluem constantemente em machine learning
- C) Porque o DevOps não funciona na nuvem
- D) Porque os cientistas de dados não sabem programar

<details><summary>Gabarito</summary>

**B.** *"Both **data and code** are **constantly evolving** in machine
learning."* É isso que diferencia o MLOps do DevOps clássico — no software
tradicional, só o **código** muda.
</details>

**2.** ⭐⭐ O que significam os três "contínuos" do MLOps?
- A) Continuous integration, continuous deployment e continuous monitoring
- B) Continuous integration, continuous training e continuous delivery
- C) Continuous development, continuous testing e continuous delivery
- D) Continuous data, continuous code e continuous evaluation

<details><summary>Gabarito</summary>

**B.** ⚠️ **O do meio é a pegadinha:** em ML é **continuous TRAINING**, não
"deployment" nem "testing". No DevOps clássico existem só CI e CD. E a mesma
tríade já aparecia na aula **4.2**.
</details>

**3.** ⭐⭐⭐ Uma equipe já constrói modelos com TensorFlow e processa terabytes de
dados estruturados. Qual framework de pipeline faz sentido?
- A) KFP (Kubeflow Pipelines)
- B) TFX (TensorFlow Extended)
- C) Os dois são equivalentes nesse caso
- D) Nenhum — devem usar o AutoML

<details><summary>Gabarito</summary>

**B.** A condição do TFX tem **duas metades**, e as duas aparecem no enunciado:
**já usar TensorFlow** **E** **terabytes de dados estruturados**. ⚠️ (A) é a
resposta para *"otherwise"* — o **KFP é o padrão** para todo o resto.
</details>

**4.** ⭐⭐⭐ Por que a **fase 0** da automação de ML é descrita como crítica?
- A) Porque é obrigatória para contratar o serviço
- B) Porque ela te faz construir o workflow end-to-end manualmente antes de automatizá-lo
- C) Porque é a fase mais barata
- D) Porque sem ela os SDKs não funcionam

<details><summary>Gabarito</summary>

**B.** *"**Phase zero is critical** because it helps you **build an end-to-end
workflow manually before you automate it**."* ⚠️ A armadilha é supor que a fase 0
é só "a fase de quem não começou" e que se deve pulá-la.
</details>

**5.** ⭐⭐ O que é um **pipeline component**?
- A) Um SDK usado para escrever pipelines
- B) Um conjunto de código autocontido que executa uma tarefa do workflow, como uma função
- C) Um template de pipeline fornecido pelo Google
- D) Um endpoint onde o modelo é implantado

<details><summary>Gabarito</summary>

**B.** *"A **self-contained set of code** that performs **one task**… think of a
component as a **function**."* ⚠️ (A) é a ferramenta **com que** você escreve o
componente — a confusão que esta aula finalmente desfaz.
</details>

**6.** ⭐⭐ No pipeline dos feijões, o que o componente
`classification_model_eval_metrics` faz?
- A) Cria o dataset tabular a partir do BigQuery
- B) Compara as métricas de avaliação a um threshold e decide se o modelo deve ser implantado
- C) Dispara o job de treinamento do AutoML
- D) Cria o endpoint

<details><summary>Gabarito</summary>

**B.** É o **custom component** do exemplo — e é ele que fecha o ciclo iterativo:
vai bem → **implanta**; não vai → **retreina**. ⚠️ (A) é o
`TabularDatasetCreateOp`, (C) é o `AutoMLTabularTrainingJobRunOp` e (D) é o
`EndpointCreateOp` — os **pre-built components** da mesma aula.
</details>

**7.** ⭐ Qual a ordem dos quatro componentes pré-construídos no exemplo?
- A) EndpointCreateOp → ModelDeployOp → TabularDatasetCreateOp → AutoMLTabularTrainingJobRunOp
- B) TabularDatasetCreateOp → AutoMLTabularTrainingJobRunOp → EndpointCreateOp → ModelDeployOp
- C) AutoMLTabularTrainingJobRunOp → TabularDatasetCreateOp → ModelDeployOp → EndpointCreateOp
- D) ModelDeployOp → EndpointCreateOp → AutoMLTabularTrainingJobRunOp → TabularDatasetCreateOp

<details><summary>Gabarito</summary>

**B.** A ordem é a lógica do pipeline: **dataset → treino → endpoint → deploy**.
Você não pode implantar antes de criar o endpoint, nem treinar antes de ter o
dataset.
</details>

**8.** ⭐ Antes de escrever um custom component, o que o curso recomenda?
- A) Compilar o pipeline para testar
- B) Verificar os pre-built components oferecidos pelo Google Cloud
- C) Treinar o modelo no AutoML primeiro
- D) Criar um endpoint

<details><summary>Gabarito</summary>

**B.** *"**Before doing so, check the pre-built components** offered by Google
Cloud. You may find a pipeline component to **reuse or customize**."* A ordem —
**checar antes de escrever** — é cobrável.
</details>

**9.** ⭐⭐ Quais são os dois ambientes em que um pipeline de ML roda?
- A) Desenvolvimento e produção
- B) Experimentation/development/test e staging/pre-production/production
- C) Online e offline
- D) Cloud e edge

<details><summary>Gabarito</summary>

**B.** ⚠️ (A) é a versão simplificada — o curso dá **três nomes para cada**
ambiente, e a prova pode citar qualquer um deles. (C) é o par do **Feature
Store** (5.2) e (D) é a distinção de **deployment** (5.4).
</details>

---

## Dúvidas em aberto / revisar

- ❌ **"Data drifting": ENCERRADO sem definição.** Nomeado na 5.1, não definido na
  5.4 (monitoramento) nem na 5.5 (MLOps) — as duas aulas onde cabia. Mesmo
  tratamento do **chain-of-thought**. Para a prova: **problema detectado no
  monitoramento em produção**; resposta = **checar fontes e ajustar parâmetros**.
- ✅ **RESOLVIDO: o building block de um pipeline é o component**, não o SDK. A
  5.5 é explícita (*"a component… is a **building block** of a pipeline"*).
- 📌 **Duas granularidades para os processos do workflow:** os **três estágios**
  (5.1–5.4) e as **sub-etapas** da 5.5 (extraction/analysis/preparation ·
  training/evaluation/**validation** · prediction/monitoring). Responda pela
  pergunta: **estágios** → 5.1; **processos dentro do pipeline** → 5.5.
- 📌 **"Backbone" muda de dono:** a 5.4 diz backbone **da automação do workflow**;
  a 5.5, backbone **do MLOps**. São a mesma coisa.
- 📌 **A transcrição diz "deployed or retained"** onde o sentido é claramente
  **retrained** — artefato de transcrição.
- 📌 **O demo "Introduction to Agent Platform Pipelines"** está na **reading
  list** (aula 5.11).

---

## Ações / próximos passos

| Ação | Status |
|---|---|
| Decorar os **três contínuos** (CI, **CT**, CD) | ⬜ |
| Decorar a regra **KFP × TFX** e as duas metades da condição | ⬜ |
| Decorar as **três fases** e **por que a fase 0 é crítica** | ⬜ |
| Decorar os **quatro componentes `*Op`** e a ordem deles | ⬜ |
| Guardar o **motivo** do MLOps: **dados E código** evoluem | ⬜ |
| Falta para fechar o Módulo 5: lab 5.6/5.7, a opcional **5.8** e o summary **5.9** | ⬜ |

---

## Fontes

- [[T - 2026-10-09-m05-a05-mlops-and-workflow-automation]] — transcrição oficial
  da plataforma Google Skills, colada por Leonardo em 09/10/2026.
