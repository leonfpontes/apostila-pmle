---
title: "Google AI/ML — Módulo 5: Flashcards"
aliases: ["flashcards do Módulo 5 (Google AI/ML)"]
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
summary: Deck de flashcards do Módulo 5 (Workflow de ML e Agent Platform Pipelines) da certificação Google, aulas 5.1 a 5.9, em blocos temáticos de 10 a 15 minutos para revisão espaçada.
parte_de: "[[curso-intro-ai-ml-google-cloud]]"
related: ["[[google-ai-ml-modulo-5-glossario]]", "[[google-ai-ml-modulo-5-simulado]]"]
---

# Google AI/ML — Módulo 5: Flashcards

Material de estudo do Módulo 5 (Workflow de ML e Agent Platform Pipelines) do curso [[curso-intro-ai-ml-google-cloud]], cobrindo aulas 5.1 a 5.9. Faz parte de [[curso-intro-ai-ml-google-cloud]]; os outros dois materiais do módulo são [[google-ai-ml-modulo-5-glossario]] e [[google-ai-ml-modulo-5-simulado]].

130 cartões das aulas **5.1 a 5.9**, em **oito blocos temáticos**. Cada bloco é
uma sessão de 10–15 minutos.

**Como usar:** cubra a coluna da direita, responda em voz alta, confira. Marque o
que errou e repita só esses no dia seguinte.

⚠️ **Este é o módulo com mais fórmulas e mais nomes literais do curso** — recall,
precision, as quatro taxas, os quatro `Op`, KFP × TFX e as quatro activation
functions. Os blocos **3, 4 e 8** são os que mais caem; comece por eles se o tempo
for curto.

---

## Bloco 1 — O workflow de ML (16 cartões)

| Pergunta | Resposta |
|---|---|
| ⭐⭐⭐ Os **três estágios** do workflow | **Data preparation → model development → model serving** |
| ⭐⭐ Os **dois passos** de cada estágio | **Upload · feature engineering** → **training · evaluation** → **deployment · monitoring** |
| ⭐ A analogia do restaurante (5.1) | **Ingredientes crus** → **experimentar receitas** → **fechar o menu e servir** |
| O que quantidade e qualidade dos dados decidem? | **Quantidade** → *how much* · **qualidade** → *how well* a máquina aprende |
| Os dois eixos de classificação dos dados | **Streaming × batch** · **structured × unstructured** |
| ⭐ **Structured data**, segundo a 5.1 | **Cabe facilmente em tabelas** — **números e texto** |
| **Unstructured data** | **Imagens e vídeos** |
| ⭐⭐⭐ O workflow é linear? | **Não — é iterativo** |
| Retorno a partir do training | Voltar aos **dados brutos** e **gerar mais features** |
| Retorno a partir do monitoring | **Data drifting** ou **queda de acurácia** → checar **fontes** e ajustar **parâmetros** |
| O que automatiza esses retornos? | O **MLOps** |
| ⭐ A frase sobre não ir para produção | *"Não tem uso e continua sendo **apenas um modelo teórico**"* |
| ⭐⭐ As duas formas de montar o workflow | **UI com AutoML** (no-code) · **código** com **Workbench/Colab Enterprise** e **Agent Platform Pipelines** |
| ⚠️ Os estágios mudam entre as duas? | **Não** — *"the main stages remain the same"* |
| Para quem é o caminho de código? | **ML engineer ou data scientist experiente** |
| Como o instrutor chama o módulo (5.9)? | **AI development workflow** |

## Bloco 2 — Data preparation e Feature Store (18 cartões)

| Pergunta | Resposta |
|---|---|
| De onde os dados podem vir? | **Cloud Storage · BigQuery · máquina local** |
| ⭐ O que é um **objective**? | O **tipo de problema** que o modelo resolve |
| ⭐⭐ Os **três objectives** tabulares | **Regression · classification · forecasting** |
| O que cada um prevê? | **Números** · **categorias** · **séries temporais** |
| Indústria citada para forecasting | **Retail** |
| ⭐⭐ **Feature**, segundo a 5.2 | Um **fator que contribui para a previsão** |
| As duas analogias de feature | **Variável independente** · **coluna de tabela** |
| E a definição da 4.2? | Os **dados processados** que entram no modelo — **complementar** |
| A analogia do feature engineering | **Descascar, picar e lavar** os ingredientes antes de cozinhar |
| ⭐⭐ O que é o **Feature Store**? | **Repositório centralizado** para **gerenciar, servir e compartilhar** features |
| ⭐ **Online** = ? · **offline** = ? | **Online = real-time** · **offline = batch** |
| O que o Feature Store faz por gen AI? | **Gerencia e serve embeddings** e **recupera itens similares** em tempo real |
| ⭐⭐ Os **quatro passos** do serving online | **1** fonte no BigQuery · **2** registrar (**opcional**) · **3** feature view · **4** servir |
| ⚠️ Qual passo é opcional? | O **2** — registrar as fontes (**feature groups** e **features**) |
| O que a **feature view** define? | **Quais features copiar** para o **online store** |
| ⚠️ O passo 1 é em qual serviço? | **BigQuery** — não Cloud Storage |
| ⭐⭐ Os **quatro benefícios** | **Shareable · reusable · scalable · easy to use** |
| ⚠️ São os quatro Ss da 4.2? | **Não** — lá *sustainable* juntava reúso e compartilhamento; aqui são separados, e entra **easy to use** |

## Bloco 3 — Model development e matriz de confusão (18 cartões)

| Pergunta | Resposta |
|---|---|
| ⭐ As **três configurações** de treinamento | **Training method · training details · budget and pricing** |
| O que se escolhe em **training method**? | **Dataset**, **training objective** e o **método** (AutoML ou custom) |
| Quando se escolhe a **target column**? | Em problemas **supervisionados** — regression e classification |
| ⭐ Entre quantos modelos o AutoML escolhe? | **Milhares** testados, **~10** usados no ensemble |
| As tecnologias por trás do AutoML | **Neural architecture search** e **transfer learning** |
| ⭐⭐ O que é a **matriz de confusão**? | **Tabela** de **previsto × real**, para **classificação** |
| Como ler o nome de um quadrante? | **1ª palavra** = acertou? · **2ª** = o que previu |
| ⭐⭐⭐ **False positive** é qual erro? | **Type 1** |
| ⭐⭐⭐ **False negative** é qual erro? | **Type 2** |
| ⭐⭐⭐ Fórmula do **recall** | **TP / (TP + FN)** |
| ⭐⭐⭐ Fórmula da **precision** | **TP / (TP + FP)** |
| O mnemônico | **Re**call = **Re**alidade · **P**recision = **P**revisão |
| ⭐⭐ Gmail quer pegar o **máximo de spam** | **Recall** |
| ⭐⭐ Gmail quer **não bloquear e-mail bom** | **Precision** |
| A pergunta que decide entre as duas | **Qual erro dói mais** — FN → recall · FP → precision |
| ⭐ O que é **feature importance**? | **Gráfico de barras** de quanto **cada feature contribui** |
| Para que serve? | Decidir **quais features incluir** |
| ⚠️ O curso fala de **accuracy**? | **Nunca** |

## Bloco 4 — As quatro taxas e o confidence threshold (14 cartões)

| Pergunta | Resposta |
|---|---|
| ⭐⭐ O **mínimo de data points** do AutoML | **1.000** |
| Data points do dataset do lab | **2.050** |
| ⭐⭐⭐ Fórmula do **TPR** | **TP / (TP + FN)** — **igual ao recall** |
| Fórmula do **TNR** | **TN / (FP + TN)** |
| Fórmula do **FPR** | **FP / (FP + TN)** |
| Fórmula do **FNR** | **FN / (TP + FN)** |
| ⭐⭐ Quais taxas somam 100%? | **TPR + FNR** · **TNR + FPR** |
| ⚠️ A classe **positiva** no lab de empréstimo | **"Vai pagar"** — o bom tomador |
| E o falso positivo, ali? | **Bom tomador** rotulado como **defaulter** → o banco **rejeita bons clientes** |
| ⭐⭐ O que o **confidence threshold** determina? | **Como o modelo conta os casos positivos** |
| ⭐⭐⭐ Threshold **mais alto** | **Precision ⬆️ · recall ⬇️** |
| ⭐⭐⭐ Threshold **mais baixo** | **Precision ⬇️ · recall ⬆️** |
| ⭐⭐ Threshold **= 0** | **Recall 100% · precision 50%** — recebe só metade de volta |
| ⭐⭐ Threshold **= 1** | **Precision 100% · recall 1%** — rejeitou **99%** dos solicitantes |

## Bloco 5 — Model serving (14 cartões)

| Pergunta | Resposta |
|---|---|
| Os dois passos do serving | **Deployment** e **monitoring** |
| ⚠️ O que é o **model management**? | Atravessa **todo o workflow**, gerenciando a **infraestrutura** — **não é estágio** |
| O benefício do model management | Focar no **o quê**, não no **como** |
| ⭐⭐ Opção 1 de deployment | **Endpoint**, para previsões **real-time (online)** |
| Exemplo da opção 1 | **Recomendações instantâneas** por hábitos de navegação |
| ⭐⭐ Opção 2 | **Prediction job direto do model resource**, para **batch** |
| Exemplo da opção 2 | **Campanhas de marketing a cada duas semanas** |
| ⭐⭐⭐ Real-time exige endpoint? | **Sim — obrigatório** |
| ⭐⭐⭐ Batch exige endpoint? | **Não** |
| Como se implanta? | Pela **UI** ou **por código, chamando APIs** |
| ⭐ Os **três motivos** para edge computing | **Latência · privacidade · funcionalidade offline** |
| O exemplo de edge | **IoT**, **detecção de objetos** por câmera numa **planta industrial** |
| ⭐⭐ Os três verbos do Agent Platform Pipelines | **Automates · monitors · governs** — de forma **serverless** |
| O que dispara o alerta no monitoramento? | Um **threshold predefinido** |

## Bloco 6 — MLOps e pipelines (20 cartões)

| Pergunta | Resposta |
|---|---|
| ⭐⭐ O que é **MLOps**? | **ML development + operations**, com princípios do **DevOps** |
| ⭐⭐ Por que é difícil? | **Dados e código evoluem constantemente** |
| O que é **praticar MLOps**? | **Automatizar e monitorar cada passo** do sistema de ML |
| ⭐⭐ Os três contínuos | **CI · CT · CD** — integration, **training**, delivery |
| Qual diferencia ML de software comum? | **Continuous training** |
| ⭐⭐ Os dois frameworks suportados | **KFP** (Kubeflow Pipelines) e **TFX** (TensorFlow Extended) |
| ⭐⭐ Quando usar **TFX**? | **Já usa TensorFlow** **e** processa **terabytes de dados estruturados** |
| E caso contrário? | **KFP** |
| ⭐⭐ O **building block** de um pipeline | O **component** — *"como uma função"* |
| E o SDK? | A **ferramenta** com que se escreve |
| ⭐ Antes de codar um custom component… | **Verifique os pre-built** |
| Por que **uma responsabilidade** por componente? | Para promover **reusabilidade** |
| ⭐⭐ Os dois ambientes | **Experimentation/development/test** · **staging/pre-production/production** |
| O que separa os dois? | O modelo treinado entrar no **model registry** |
| ⭐⭐ As três fases | **0** nenhum MLOps (GUI) · **1** construir componentes · **2** integrar → CI/CT/CD |
| ⭐⭐⭐ Por que a fase 0 é crítica? | Faz você **construir o workflow à mão antes de automatizá-lo** |
| O que faz o `classification_model_eval_metrics`? | Compara métricas a um **threshold** e decide **implantar ou retreinar** |
| ⭐⭐ Os quatro pre-built `Op`, em ordem | **`TabularDatasetCreateOp` → `AutoMLTabularTrainingJobRunOp` → `EndpointCreateOp` → `ModelDeployOp`** |
| O caso do pipeline de exemplo | Classificar **feijões em 1 de 7 tipos** |
| Como se compila o pipeline? | **`compiler.Compiler().compile()`** — e há **templates** prontos |

## Bloco 7 — Como uma máquina aprende (18 cartões)

| Pergunta | Resposta |
|---|---|
| ⭐ De que rede derivam DNN, CNN, RNN e LLM? | Da **ANN** — também chamada **shallow neural network** |
| As três camadas da ANN | **Input · hidden · output** |
| ⭐⭐ Onde ficam os weights, e o que guardam? | **Nas ligações** entre neurônios; **o que a rede aprendeu** |
| ⭐⭐⭐ Os sete passos | **Weighted sum → activation → weighted sum → activation → cost function → backpropagation → iteration** |
| ⚠️ Qual passo é *"potential"*? | **Backpropagation** — só se o erro for significativo |
| ⭐⭐⭐ Para que serve a activation function? | **Adicionar não linearidade** |
| E sem ela? | ŷ é **linear em x** — as camadas ocultas **não servem para nada** |
| ⭐⭐ Faixa da **sigmoid** e da **tanh** | **0 a 1** · **−1 a +1** |
| ⭐⭐⭐ Sigmoid × softmax | **Binária** (e logistic regression) × **multiclasse** (saídas somam 1) |
| O que faz a **ReLU**? | **Negativo → 0**, positivo mantém |
| A activation precisa ser igual em todas as camadas? | **Não** — ex.: **ReLU** nas ocultas, **softmax** na saída |
| ⭐⭐⭐ Loss × cost | **Uma instância** × **training set inteiro** |
| ⭐⭐ Cost function para regressão · classificação | **MSE** · **cross-entropy** |
| ⭐⭐ As duas perguntas do gradient descent | **Direção** (derivada) · **tamanho do passo** (learning rate) |
| ⭐⭐ Learning rate pequeno · grande | **Lento demais** · **quica e não converge** |
| ⭐⭐ O que é um **epoch**? | **Uma passada completa** do passo 1 ao 6 |
| ⭐⭐⭐ Parâmetros × hiperparâmetros | **Weights e biases** × **layers, neurons, activation, learning rate, epochs** |
| Backpropagation × gradient descent | Backprop **ajusta** · gradient descent decide **como** e **quando parar** |

## Bloco 8 — As variações e armadilhas do módulo (12 cartões)

> ⚠️ **Este é o bloco decisivo.** Todos estes cartões existem porque o módulo
> **diz a mesma coisa de maneiras diferentes** em aulas diferentes.

| Pergunta | Resposta |
|---|---|
| ⭐⭐⭐ Tipos de dado do AutoML: as **três** respostas | **Tabular e imagem** (4.1, comparação) · **principalmente tabular** (5.2, "now/mainly") · **tabular, image, text, video** (5.3, tela de treino) |
| ⭐⭐ Estágios × sub-etapas | Estágios (5.1): 3 com 2 passos cada · sub-etapas (5.5): **extraction, analysis, preparation · training, evaluation, validation · prediction, monitoring** |
| ⚠️ O que a 5.5 acrescenta ao model development? | **Validation** |
| ⚠️ "Phases" na 5.6 × fases do MLOps | Os **três estágios** do workflow × as **fases 0, 1, 2** de automação |
| ⚠️ Os **dois thresholds** do módulo | **Confidence threshold** (5.6, contar positivos) × **threshold de deployment** do `classification_model_eval_metrics` (5.5) |
| ⚠️ E o terceiro threshold? | O **predefined threshold** que dispara o **alerta** no monitoramento (5.4) |
| ⭐⭐ As **quatro tríades de verbos** | **Feature Store**: manage · serve · share · **Pipelines**: automates · monitors · governs · **Agent Platform** (4.4): discovering · building · deploying · **ML APIs** (4.4): train · monitor · tune |
| ⚠️ Building block: SDK ou component? | **Component.** A 5.1 e a 5.9 falam em SDKs; a 5.5 resolveu |
| ⚠️ As duas imagens do monitoring | **Conferir com os garçons** (5.4) · **ajustar o menu** pelas avaliações (5.9) |
| ⚠️ Loss function é hiperparâmetro? | Na **4.5** ela aparece no `compile` com os hiperparâmetros; na lista da **5.8**, não. **Weights nunca** |
| ⚠️ "Texto" é estruturado? | **Campo de texto** numa tabela, sim (5.1); **documento livre**, não (quiz do Módulo 2) |
| ⚠️ Data drifting foi definido? | **Nunca** — problema do **monitoramento**; resposta: **checar fontes e ajustar parâmetros** |

