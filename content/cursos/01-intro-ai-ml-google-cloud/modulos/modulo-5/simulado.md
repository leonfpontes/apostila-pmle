---
title: "Google AI/ML — Módulo 5: Simulado"
aliases: ["simulado do Módulo 5 (Google AI/ML)"]
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
summary: Simulado de 30 questões no estilo da prova sobre o Módulo 5 (Workflow de ML e Agent Platform Pipelines) da certificação Google, aulas 5.1 a 5.9, com gabarito comentado.
parte_de: "[[curso-intro-ai-ml-google-cloud]]"
related: ["[[google-ai-ml-modulo-5-glossario]]", "[[google-ai-ml-modulo-5-flashcards]]"]
---

# Google AI/ML — Módulo 5: Simulado

Material de estudo do Módulo 5 (Workflow de ML e Agent Platform Pipelines) do curso [[curso-intro-ai-ml-google-cloud]], cobrindo aulas 5.1 a 5.9. Faz parte de [[curso-intro-ai-ml-google-cloud]]; os outros dois materiais do módulo são [[google-ai-ml-modulo-5-glossario]] e [[google-ai-ml-modulo-5-flashcards]].

**Instruções:** faça as 30 **sem olhar o gabarito**, anote suas respostas, e só
depois confira. Meta: **24/30 (80%)**. Tempo sugerido: **35 minutos**.

⚠️ **Aviso sobre este simulado:** o Módulo 5 é o que mais cobra **cenário de
negócio** (qual métrica, qual deployment, qual framework) e **conta** (recall,
taxas complementares). Os distratores são **listas e números reais do próprio
módulo, no lugar errado**. E, ao contrário do simulado do Módulo 4, desta vez **o
gabarito está espalhado** entre A, B, C e D.

---

## Parte I — O workflow de ML (1–5)

**1.** Qual a ordem dos três estágios do workflow de ML na Agent Platform?
- A) Data preparation → model development → model serving
- B) Data readiness → feature readiness → training → deployment
- C) Model development → data preparation → model serving
- D) Data extraction → model validation → prediction

**2.** Durante o monitoramento, a equipe percebe uma **queda súbita de acurácia**
do modelo em produção. Segundo a aula 5.1, o que fazer?
- A) Trocar o AutoML por custom training
- B) Aumentar o número de epochs
- C) Checar as fontes de dados e ajustar os parâmetros do modelo
- D) Mover o modelo para edge computing

**3.** Sobre o **model management**, é correto afirmar:
- A) É o quarto estágio do workflow de ML
- B) É o segundo passo do estágio de model serving
- C) É feito apenas pelo ML engineer, por código
- D) Existe ao longo de todo o workflow, gerenciando a infraestrutura subjacente

**4.** Segundo o curso, o que acontece com um modelo que **nunca é movido para
produção**?
- A) Continua sendo útil para treinar outros modelos
- B) Não tem uso e continua sendo apenas um modelo teórico
- C) É automaticamente registrado no model registry
- D) Passa a servir previsões em batch

**5.** Um time pode montar o workflow pela UI do AutoML ou por código com Agent
Platform Pipelines. O que muda entre os dois caminhos?
- A) O número de estágios: dois na UI, três no código
- B) A ordem dos estágios
- C) Só a forma de montá-los — os estágios principais continuam os mesmos
- D) Nada: os dois permitem automatizar CI, CT e CD da mesma maneira

---

## Parte II — Data preparation e Feature Store (6–10)

**6.** Uma rede varejista quer prever as **vendas semanais de cada loja nos
próximos seis meses**. Qual objective do AutoML?
- A) Regression
- B) Classification
- C) Clustering
- D) Forecasting

**7.** Qual é a definição de **feature** dada na aula 5.2?
- A) Um fator que contribui para a previsão, como uma variável independente ou uma coluna de tabela
- B) Um recurso da interface da Agent Platform
- C) O valor que o modelo deve prever, também chamado de target column
- D) O conjunto de dados brutos carregados do Cloud Storage

**8.** Dos quatro passos para servir features online no Feature Store, qual é
**opcional**?
- A) Preparar a fonte de dados no BigQuery
- B) Configurar a conexão criando uma feature view
- C) Registrar as fontes de dados criando feature groups e features
- D) Servir os valores mais recentes das features

**9.** Qual **não** é um dos quatro benefícios do Feature Store?
- A) Shareable
- B) Seamless
- C) Reusable
- D) Easy to use

**10.** No Feature Store, **online serving** é sinônimo de:
- A) Batch serving
- B) Serving por edge computing
- C) Serving via model registry
- D) Real-time serving

---

## Parte III — Model development e métricas (11–16)

**11.** Um **falso positivo** também é chamado de:
- A) Type 1 Error
- B) Type 2 Error
- C) True negative rate
- D) Recall error

**12.** Um classificador teve **TP = 80**, **FN = 20** e **FP = 40**. Qual é o
**recall**?
- A) 67%
- B) 80%
- C) 50%
- D) 33%

**13.** Um modelo faz triagem de uma doença grave em exames. Deixar passar um
paciente doente é muito pior do que pedir um exame extra a um paciente saudável.
Qual métrica priorizar?
- A) Precision
- B) Feature importance
- C) Recall
- D) Accuracy

**14.** Um modelo tem **true negative rate de 90%**. Qual é o seu **false positive
rate**?
- A) 90%
- B) 0%
- C) Não é possível saber sem o TPR
- D) 10%

**15.** O que acontece ao **aumentar** o confidence threshold?
- A) A precision aumenta e o recall diminui
- B) A precision diminui e o recall aumenta
- C) Os dois aumentam
- D) O número de data points necessário diminui

**16.** Qual é o número mínimo de data points que o Agent Platform AutoML exige
num dataset?
- A) 100
- B) 2.050
- C) 1.000
- D) Centenas de milhares

---

## Parte IV — Model serving (17–20)

**17.** Um e-commerce quer mostrar **recomendações instantâneas** com base no que
o usuário está navegando agora. Como implantar o modelo?
- A) Pedir um batch prediction job direto do model resource
- B) Implantar o modelo num endpoint, para previsões real-time
- C) Exportar o modelo para edge computing
- D) Rodar o pipeline com a fase 0 do MLOps

**18.** Sobre o **batch prediction**, é correto afirmar:
- A) Exige que o modelo seja implantado num endpoint antes
- B) É também chamado de online prediction
- C) Só funciona com modelos de custom training
- D) Não exige implantar o modelo num endpoint

**19.** Qual **não** é um dos três motivos citados para usar **edge computing**?
- A) Reduzir o custo de armazenamento na nuvem
- B) Mitigar a latência
- C) Garantir a privacidade
- D) Habilitar funcionalidade offline

**20.** Quais são os três verbos que descrevem o **Agent Platform Pipelines**?
- A) Manage, serve, share
- B) Train, monitor, tune
- C) Automates, monitors, governs
- D) Discovering, building, deploying

---

## Parte V — MLOps e pipelines (21–25)

**21.** Segundo a aula 5.5, por que os desafios de produção são considerados os
maiores pontos de dor da comunidade de ML?
- A) Porque modelos de ML exigem GPUs caras
- B) Porque tanto os dados quanto o código evoluem constantemente
- C) Porque o DevOps não tem ferramentas para Python
- D) Porque o AutoML não permite deployment

**22.** Uma equipe constrói seus modelos em **PyTorch** e processa **terabytes de
dados estruturados**. Qual framework de pipeline o curso recomenda?
- A) Kubeflow Pipelines (KFP)
- B) TensorFlow Extended (TFX)
- C) Os dois são obrigatórios em conjunto
- D) Nenhum — o Agent Platform Pipelines não suporta PyTorch

**23.** Por que a **fase 0** do MLOps é considerada crítica?
- A) Porque é a fase em que se atinge CI, CT e CD
- B) Porque é nela que se constroem os componentes com SDKs
- C) Porque dispensa o model registry
- D) Porque ajuda a construir o workflow de ponta a ponta manualmente antes de automatizá-lo

**24.** No pipeline de exemplo dos feijões, qual pre-built component **cria um
endpoint**?
- A) `TabularDatasetCreateOp`
- B) `ModelDeployOp`
- C) `EndpointCreateOp`
- D) `AutoMLTabularTrainingJobRunOp`

**25.** Qual é o **building block** de um pipeline no Agent Platform Pipelines?
- A) O pipeline component, que funciona como uma função
- B) O SDK
- C) O endpoint
- D) O feature group

---

## Parte VI — Como uma máquina aprende (26–30)

**26.** Qual é a função principal de uma **activation function**?
- A) Medir a diferença entre o valor previsto e o real
- B) Adicionar não linearidade à rede
- C) Definir o tamanho do passo do gradient descent
- D) Contar quantas vezes o treino se repete

**27.** A camada de saída de uma rede precisa classificar artigos em **um de três
veículos**. Qual activation function usar?
- A) ReLU
- B) Sigmoid
- C) Tanh
- D) Softmax

**28.** Qual destes é um **parâmetro**, e não um hiperparâmetro?
- A) Weights
- B) Learning rate
- C) Número de epochs
- D) Número de camadas

**29.** O learning rate foi definido **alto demais**. O que tende a acontecer?
- A) O treino fica lento demais
- B) A backpropagation deixa de acontecer
- C) O modelo quica de um lado para outro e pode não convergir
- D) A cost function vira cross-entropy

**30.** Qual é a diferença entre **loss function** e **cost function**?
- A) Loss é para regressão; cost é para classificação
- B) Loss mede o erro de uma instância; cost, do training set inteiro
- C) Loss é um parâmetro; cost é um hiperparâmetro
- D) Loss é calculada antes da activation; cost, depois

---
---

# Gabarito comentado

| # | Resposta | | # | Resposta | | # | Resposta |
|---|---|---|---|---|---|---|---|
| 1 | **A** | | 11 | **A** | | 21 | **B** |
| 2 | **C** | | 12 | **B** | | 22 | **A** |
| 3 | **D** | | 13 | **C** | | 23 | **D** |
| 4 | **B** | | 14 | **D** | | 24 | **C** |
| 5 | **C** | | 15 | **A** | | 25 | **A** |
| 6 | **D** | | 16 | **C** | | 26 | **B** |
| 7 | **A** | | 17 | **B** | | 27 | **D** |
| 8 | **C** | | 18 | **D** | | 28 | **A** |
| 9 | **B** | | 19 | **A** | | 29 | **C** |
| 10 | **D** | | 20 | **C** | | 30 | **B** |

## Comentários

**1 · A** — Os três estágios da **5.1**. ⚠️ (B) é o **pipeline da Agent Platform**
(4.2), uma lista de **quatro**. (D) mistura as **sub-etapas** da 5.5.

**2 · C** — O workflow é **iterativo**: do monitoring se volta às **fontes de
dados** e aos **parâmetros**. É a mesma resposta para **data drifting**, o termo
que o curso nomeia e nunca define. (B) é um ajuste de **hiperparâmetro** sem base
na aula.

**3 · D** — ⚠️ *"Model management **exists throughout this whole workflow**."*
(A) e (B) são as armadilhas: ele **não é** estágio nem passo. O benefício: o
cientista de dados foca no **o quê**, não no **como**.

**4 · B** — *"If you don't move an ML model into production, it has no use and
remains only a **theoretical model**."* É a frase mais citável da 5.1.

**5 · C** — *"Although the **main stages remain the same**, you have two
options."* ⚠️ (D) é falsa: **automatizar para CI, CT e CD** é justamente o que o
caminho de **código** oferece a mais (5.5, 5.9).

**6 · D** — **Série temporal** → **forecasting**, e o curso cita **retail**
nominalmente. ⚠️ (A) é tentadora porque vendas são **números**, mas o que define o
forecasting é a **dimensão do tempo**. (C) **clustering** nunca é citado como
objective.

**7 · A** — A definição funcional da **5.2**. ⚠️ (C) é a **target column** (5.3)
— o que se prevê, não o que contribui para prever. (D) é o dado **bruto**; a 4.2
dizia que a feature é o dado **processado**.

**8 · C** — *"2. **Optional:** Register the data sources."* (A), (B) e (D) são os
passos **1, 3 e 4**, todos obrigatórios.

**9 · B** — **Seamless** é o primeiro dos **quatro Ss da Agent Platform** (4.2).
Os benefícios do Feature Store são **shareable · reusable · scalable · easy to
use**. Distrator de **lista parecida no lugar errado**.

**10 · D** — **Online = real-time · offline = batch**. É o mesmo par que a 5.4
usa para deployment — **dois contextos, mesma regra**.

**11 · A** — **FP = Type 1 · FN = Type 2.** Mnemônico: o **1** parece um **"+"**
cortado.

**12 · B** — **Recall = TP / (TP + FN) = 80 / 100 = 80%.** ⚠️ (A) é a
**precision**: TP / (TP + FP) = 80 / 120 ≈ 67%. A questão dá o FP **justamente
para você usar o denominador errado**.

**13 · C** — Deixar passar um doente é um **falso negativo**, e quem penaliza FN é
o **recall**. É o raciocínio do **Gmail** com sinal trocado de gravidade. ⚠️ (D)
**accuracy nunca aparece no curso** — distrator clássico.

**14 · D** — **TNR + FPR = 100%**, porque têm o mesmo denominador (FP + TN). ⚠️ (C)
é a armadilha de quem não lembra os **pares complementares**: o par do TNR é o
**FPR**, não o TPR.

**15 · A** — Threshold alto = só diz "positivo" com muita certeza → **erra menos
quando diz** (precision ⬆️), mas **deixa passar mais** (recall ⬇️). (B) é o que
acontece ao **baixar**.

**16 · C** — *"AutoML requires **at least 1,000** data points."* ⚠️ (B) é o
tamanho do **dataset do lab**; (D) é a ordem de grandeza de **BigQuery ML e custom
training** (4.4).

**17 · B** — Resultado **imediato**, **baixa latência**, usuário **online** → o
exemplo literal da **opção 1**. E *"a model **must be deployed to an endpoint**
before it can serve real-time predictions"*. (A) é o caminho das **campanhas a
cada duas semanas**.

**18 · D** — *"Batch prediction **does not require** deploying the model to an
endpoint."* ⚠️ (A) é a inversão exata; (B) troca o sinônimo — **online** é o
**real-time**.

**19 · A** — Os três motivos são **latência, privacidade e funcionalidade
offline**. Custo de armazenamento nunca é citado. A **privacidade** é o que mais se
esquece, porque o exemplo da fábrica só ilustra a latência.

**20 · C** — ⚠️ As outras três são **tríades reais do curso no lugar errado**: (A)
é o **Feature Store** (5.2), (B) as **machine learning APIs** (4.4) e (D) a
**Agent Platform** para agentes (4.4).

**21 · B** — *"**Both data and code are constantly evolving** in machine
learning."* É o que separa MLOps do DevOps clássico — e por isso existe o
**continuous training**.

**22 · A** — ⚠️ **A condição do TFX tem duas metades:** **já usar TensorFlow** **e**
processar **terabytes de dados estruturados**. Aqui só a segunda vale — a equipe
usa **PyTorch**. Logo, *"otherwise, **KFP**"*. (B) é o distrator de quem lembrou só
dos terabytes.

**23 · D** — *"Phase zero is critical because it helps you **build an end-to-end
workflow manually before you automate it**."* (A) é a **fase 2**; (B) é a
**fase 1**.

**24 · C** — A ordem dos quatro é **dataset → treino → endpoint → deploy**:
`TabularDatasetCreateOp` → `AutoMLTabularTrainingJobRunOp` → **`EndpointCreateOp`**
→ `ModelDeployOp`. ⚠️ (B) **implanta** no endpoint, mas não o **cria**.

**25 · A** — *"You can think of a component as a **function**, which is a
**building block** of a pipeline."* ⚠️ (B) é a formulação da **5.1**, ecoada na
**5.9** — mas o SDK é a **ferramenta**, não a peça.

**26 · B** — *"Prevent linearity or add non-linearity."* (A) é a **cost/loss
function**, (C) o **learning rate** e (D) os **epochs**.

**27 · D** — **Multiclasse → softmax**, cujas saídas **somam 1**. ⚠️ (B) é o
distrator forte: **sigmoid** é para **duas** classes (spam ou não).

**28 · A** — **Weights e biases** são aprendidos **pela máquina**; você controla só
o valor inicial. Os outros três são **hiperparâmetros**, decididos **por humanos
antes** do treino.

**29 · C** — *"Bounce from wall to wall or even bounce out of the curve entirely
without converging."* ⚠️ (A) é o sintoma do learning rate **baixo demais**.

**30 · B** — **Loss = uma instância · cost = training set inteiro.** ⚠️ (A) confunde
com a escolha **MSE (regressão) × cross-entropy (classificação)**, que vale para
**as duas**.

---

## Como interpretar seu resultado

| Acertos | Leitura |
|---|---|
| **27–30** | Módulo dominado. Siga para o 6. |
| **24–26** | Aprovado. Revise só as partes onde errou. |
| **18–23** | Releia as aulas **5.3, 5.6 e 5.8** — concentram as contas e as definições — e refaça os **blocos 3, 4 e 7** dos flashcards. |
| **< 18** | Refaça o deck de flashcards inteiro antes de repetir o simulado. |

**Se você errou 12, 14 ou 22**, o problema não é conteúdo — é **leitura apressada
de condição**: o denominador errado, o par complementar errado, a metade que
faltava da regra do TFX. Refaça devagar.

**Se você errou 9, 20 ou 25**, vá ao **bloco 8** dos flashcards: são as **listas
parecidas** do curso trocando de lugar.


## Fontes
- Notas de aula do Módulo 5 (resumos `R - ` em `50-aulas/intro-ai-ml-google-cloud/`), consolidadas no projeto Claude "Certificação Google" em 2026-10-14
