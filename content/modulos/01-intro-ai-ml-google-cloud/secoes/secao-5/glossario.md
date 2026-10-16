---
title: "Google AI/ML — Módulo 5: Glossário"
aliases: ["glossário do Módulo 5 (Google AI/ML)"]
tags: [aula, trabalho]
type: note
area: trabalho
created: 2026-10-14
updated: 2026-10-14
status: evergreen
fonte: mista
confianca: media
papel: derivada
indexar: true
summary: "Glossário consolidado do Módulo 5 (Workflow de ML e Agent Platform Pipelines) da certificação Google, aulas 5.1 a 5.9: os termos e serviços do Google Cloud agrupados por tema, com a definição que a prova cobra."
parte_de: "[[curso-intro-ai-ml-google-cloud]]"
related: ["[[google-ai-ml-modulo-5-flashcards]]", "[[google-ai-ml-modulo-5-simulado]]"]
---

# Google AI/ML — Módulo 5: Glossário

Material de estudo do Módulo 5 (Workflow de ML e Agent Platform Pipelines) do curso [[curso-intro-ai-ml-google-cloud]], cobrindo aulas 5.1 a 5.9. Faz parte de [[curso-intro-ai-ml-google-cloud]]; os outros dois materiais do módulo são [[google-ai-ml-modulo-5-flashcards]] e [[google-ai-ml-modulo-5-simulado]].

Todos os termos das aulas **5.1 a 5.9**, em **oito grupos temáticos**. Use como
referência de consulta; para memorizar, vá aos
[[google-ai-ml-modulo-5-flashcards]].

---

## 1. O workflow de ML

| Termo | Definição |
|---|---|
| **AI development workflow** | O nome que o instrutor dá ao módulo (5.9) |
| **ML workflow** | Os **três estágios**: **data preparation → model development → model serving** (5.1) |
| **Data preparation** | Estágio 1 — **data uploading** e **feature engineering** |
| **Model development** | Estágio 2 — **training** e **evaluation**, formando um **ciclo** |
| **Model serving** | Estágio 3 — **deployment** e **monitoring** |
| **Phases** | Como a 5.6 chama os três estágios — ⚠️ não confundir com as **fases 0, 1 e 2** do MLOps |
| **Iterativo** | ⭐⭐ O workflow **não é linear**: do training se volta aos **dados brutos**; do monitoring, às **fontes** e aos **parâmetros** |
| **Theoretical model** | O que um modelo continua sendo se **não for para produção** — *"it has no use"* |
| **Data drifting** | Problema detectado no **monitoramento**; ❌ **nomeado e nunca definido** (5.1) |
| **A analogia do restaurante** | **Ingredientes crus** → **experimentar receitas** → **servir**. Na 5.9: juntar e picar · experimentar e provar · servir e **ajustar o menu** |
| **Structured data** | **Facilmente armazenável em tabelas** — **números e texto** (5.1) |
| **Unstructured data** | **Imagens e vídeos** |
| **Real-time streaming data** | Dados que chegam **continuamente** |
| **Batch data** | Dados que chegam **em lotes** |
| **As duas formas de montar o workflow** | **UI** (AutoML, no-code) ou **código** (Workbench/Colab Enterprise com Agent Platform Pipelines). ⚠️ *"The main stages remain the same"* |

---

## 2. Data preparation e o Feature Store (5.2)

| Termo | Definição |
|---|---|
| **Origens dos dados** | **Cloud Storage · BigQuery · máquina local** |
| **Objective** | O **tipo de problema** que o modelo resolve |
| **Os três objectives tabulares** | **Regression** (números) · **classification** (categorias) · **forecasting** (séries temporais; *retail*) |
| **Feature** | Um **fator que contribui para a previsão**; como **variável independente** ou **coluna de tabela** (5.2). Na 4.2: os **dados processados** que entram no modelo |
| **Feature engineering** | **Processar os dados antes** do treino — descascar, picar, lavar |
| **Agent Platform Feature Store** | **Repositório centralizado** para **gerenciar, servir e compartilhar** features |
| **Online serving** | **Real-time** |
| **Offline serving** | **Batch** |
| **Feature group** | Criado ao **registrar** a fonte — passo 2, ⚠️ **opcional** |
| **Feature view** | Define **quais features copiar** da fonte para o **online store** (passo 3) |
| **Online store** | Onde as features ficam para serving em **tempo real** |
| **Embeddings** | *"The **data sources in gen AI**"*; o Feature Store os **gerencia e serve** e **recupera itens similares em tempo real** |
| **Os quatro passos do serving online** | **1** fonte no **BigQuery** · **2** *(opcional)* registrar · **3** feature view · **4** servir os valores mais recentes |
| **Os quatro benefícios** | **Shareable · reusable · scalable · easy to use** — ⚠️ não são os quatro Ss da 4.2 |

---

## 3. Model development (5.3)

| Termo | Definição |
|---|---|
| **Model training** | Passo 1 do estágio 2 — **cozinhar a receita** |
| **Model evaluation** | Passo 2 — **provar o prato** |
| **As três configurações** | **Training method** · **training details** · **budget and pricing** |
| **Training method** | **Dataset**, **training objective** e o **método** (AutoML ou custom training) |
| **Training objective** | O **objetivo do treino** e a **tarefa a resolver** |
| **Training details** | **Target column** e, em training options, **quais features** e **transformação do tipo de dado** |
| **Target column** | A coluna a **prever**, em problemas **supervisionados** (regression e classification) |
| **Supervised learning** | Com rótulos; exemplos: **regression** e **classification** |
| **"Among thousands"** | O AutoML **testa milhares** de modelos e usa os **~10 melhores** no ensemble (4.3) |
| **Tipos de dado na tela de treino** | **Tabular, image, text, video** |
| **Feature importance** | **Gráfico de barras** de **quanto cada feature contribui**; barra maior = mais importante |
| **Precision-recall curve** | A curva que a Agent Platform **visualiza** para ajuste |

---

## 4. Métricas de classificação (5.3 e 5.6)

| Termo | Definição |
|---|---|
| **Confusion matrix** | **Tabela** que cruza **previsto × real**, para **classificação** |
| **True positive (TP)** | Previu **positivo** e **acertou** |
| **True negative (TN)** | Previu **negativo** e **acertou** |
| **False positive (FP)** | Previu **positivo** e **errou** — ⚠️ **Type 1 Error** |
| **False negative (FN)** | Previu **negativo** e **errou** — ⚠️ **Type 2 Error** |
| **Recall** | **TP / (TP + FN)** — parte dos positivos **reais** |
| **Precision** | **TP / (TP + FP)** — parte dos **previstos** como positivos |
| **True positive rate (TPR)** | **TP / (TP + FN)** — ⭐ **a mesma fórmula do recall** |
| **True negative rate (TNR)** | **TN / (FP + TN)** |
| **False positive rate (FPR)** | **FP / (FP + TN)** — **complementar** do TNR |
| **False negative rate (FNR)** | **FN / (TP + FN)** — **complementar** do TPR |
| **Confidence threshold** | Determina **como o modelo conta os casos positivos**. Mais alto → precision ⬆️ recall ⬇️ |
| **Threshold = 0** | **Recall 100%**, **precision 50%** (no exemplo do lab) |
| **Threshold = 1** | **Precision 100%**, **recall 1%** |
| **Classe positiva** | ⚠️ Muda de exemplo: **spam** no Gmail (5.3) · **"vai pagar"** no empréstimo (5.6) |
| **Defaulter** | Quem **não vai pagar** — a classe **negativa** no lab |
| **Accuracy** | ⚠️ **Nunca mencionada** no curso |

---

## 5. Model serving (5.4)

| Termo | Definição |
|---|---|
| **Model deployment** | Passo 1 — **servir a refeição** |
| **Model monitoring** | Passo 2 — **conferir com os garçons** (5.4) ou **ajustar o menu** (5.9) |
| **Model management** | ⚠️ Atravessa **todo o workflow**; gerencia a **infraestrutura subjacente** — não é estágio |
| **Endpoint** | Destino do deployment para previsões **real-time**; ⚠️ **obrigatório** para elas |
| **Real-time prediction** | = **online prediction**; resultados imediatos, baixa latência |
| **Batch prediction** | Pedida **direto do model resource**; ⚠️ **não exige endpoint** |
| **Edge computing** | Deployment **fora da nuvem**: **latência · privacidade · funcionalidade offline** |
| **Predefined threshold** | O limiar que **dispara o alerta** no monitoramento |

---

## 6. MLOps e Agent Platform Pipelines (5.4, 5.5)

| Termo | Definição |
|---|---|
| **MLOps** | Combina **ML development** com **operações**, aplicando princípios do **DevOps** |
| **Por que é difícil** | ⭐ **Dados e código evoluem constantemente** |
| **Praticar MLOps** | **Automatizar e monitorar cada passo** da construção do sistema |
| **CI · CT · CD** | **Continuous integration · training · delivery** — o **CT** é o que distingue ML |
| **Agent Platform Pipelines** | **Toolkit** que **automatiza, monitora e governa**, de forma **serverless**; o **backbone** do MLOps |
| **KFP** | **Kubeflow Pipelines** — a alternativa **padrão** |
| **TFX** | **TensorFlow Extended** — se **já usa TensorFlow** **e** processa **terabytes de dados estruturados** |
| **Pipeline component** | **Código autocontido** que faz **uma** tarefa; **como uma função**; ⭐ **o building block** |
| **SDK** | A **ferramenta** com que se escreve o pipeline — ⚠️ não é o building block |
| **Custom component** | Escrito por você para tarefas específicas — ⭐ **verifique os pre-built antes** |
| **Ambiente 1** | **Experimentation, development, and test** — data prep e model development |
| **Ambiente 2** | **Staging, pre-production, and production** — prediction e monitoring |
| **Model registry** | Onde o **modelo treinado** entra; separa os dois ambientes |
| **Fase 0** | **Nenhum MLOps**, workflow por **GUI**. ⚠️ **Crítica** |
| **Fase 1** | **Construir componentes** com os SDKs |
| **Fase 2** | **Integrar** os componentes → **CI, CT, CD** |
| **`classification_model_eval_metrics`** | Custom component: compara métricas a um **threshold** e decide **implantar ou retreinar** |
| **`TabularDatasetCreateOp`** | Cria **dataset tabular** (Cloud Storage ou BigQuery) |
| **`AutoMLTabularTrainingJobRunOp`** | Dispara o **treino** do AutoML |
| **`EndpointCreateOp`** | Cria um **endpoint** |
| **`ModelDeployOp`** | **Implanta** o modelo no endpoint |
| **`compiler.Compiler().compile()`** | **Compila** o pipeline antes de rodar |

---

## 7. Como uma máquina aprende (5.8)

| Termo | Definição |
|---|---|
| **ANN** | **Artificial Neural Network**, a mais básica — raiz de **DNN, CNN, RNN, LLM**; também **shallow neural network** |
| **Input / hidden / output layer** | As **três camadas** da ANN |
| **Weight** | Fica na ligação entre neurônios; **guarda o que a rede aprendeu** |
| **Bias** | Somado à soma ponderada; também **parâmetro** |
| **Weighted sum** | Inputs × weights, somados |
| **ŷ (y-hat)** | O valor **previsto** (y = o real) |
| **Activation function** | ⭐⭐⭐ **Adiciona não linearidade** |
| **ReLU** | Negativo → 0; positivo mantém |
| **Sigmoid** | **0 a 1**; **classificação binária** e **logistic regression** |
| **Tanh** | Sigmoid deslocada; **−1 a +1** |
| **Softmax** | Saídas que **somam 1**; **multiclasse** |
| **Loss function** | Erro de **uma instância** |
| **Cost function** | Erro do **training set inteiro** |
| **MSE** | **Mean Squared Error** — **regressão** |
| **Cross-entropy** | Diferença entre distribuições de probabilidade — **classificação** |
| **Backpropagation** | Passo 6, ⚠️ *"potential"*: **ajustar weights e biases** se o erro for grande |
| **Gradient descent** | Descer a superfície da cost function; decide **como ajustar** e **quando parar** |
| **Derivative** | A **direção**: negativa → direita · positiva → esquerda |
| **Learning rate** | O **tamanho do passo** — **hiperparâmetro** |
| **Epoch** | **Uma passada completa** do passo 1 ao 6 |
| **Parameters** | **Weights e biases** — aprendidos pela máquina |
| **Hyperparameters** | **Layers · neurons · activation functions · learning rate · epochs** — definidos por humanos **antes** do treino |

---

## 8. Números e nomes literais do módulo

| Item | Valor |
|---|---|
| **3** | Estágios do workflow de ML |
| **6** | Passos dos três estágios (dois por estágio) |
| **3** | Objectives tabulares |
| **4** | Passos do serving online do Feature Store (o **2º opcional**) |
| **4** | Benefícios do Feature Store |
| **3** | Configurações de treinamento |
| **Milhares / ~10** | Modelos testados / usados no ensemble do AutoML |
| **4** | Quadrantes da matriz de confusão · e **4** taxas (5.6) |
| ⭐ **1.000** | **Mínimo de data points** do AutoML (5.6) |
| **2.050** | Data points do dataset do lab de empréstimos |
| **0 → 100% / 50%** | Threshold zero: recall / precision |
| **1 → 1% / 100%** | Threshold um: recall / precision |
| **2** | Opções de deployment (endpoint · batch) |
| **3** | Motivos para edge computing |
| **3** | Verbos do Agent Platform Pipelines (**automates · monitors · governs**) |
| **2** | Ambientes de um pipeline |
| **3** | Fases de automação (**0, 1, 2**) |
| **1 de 7** | Tipos de feijão do pipeline de exemplo |
| **4** | Pre-built components do exemplo (`...Op`) |
| **7** | Passos do aprendizado de uma rede neural (5.8) |
| **4** | Activation functions (ReLU, sigmoid, tanh, softmax) |
| **5** | Hiperparâmetros listados na 5.8 |

