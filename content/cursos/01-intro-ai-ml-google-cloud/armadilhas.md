---
title: Google AI/ML — Armadilhas acumuladas e cheat-sheet do curso 1
aliases: ["armadilhas do curso Google AI ML", "cheat-sheet Google AI ML", indice-do-curso]
tags: [aula, trabalho]
type: note
area: trabalho
created: 2026-10-14
updated: 2026-10-14
status: evergreen
fonte: mista
confianca: media
papel: canonica
indexar: true
summary: As 57 armadilhas rastreadas ao longo do curso Introduction to AI and ML on Google Cloud (nomes, listas parecidas, conceitos), o cheat-sheet com as três tabelas mais cobráveis, as oito datas decoráveis e os pontos em aberto, encerrados e resolvidos. É a nota de revisão final antes da prova.
parte_de: "[[curso-intro-ai-ml-google-cloud]]"
related: ["[[google-ai-ml-modulo-2-revisao]]", "[[google-ai-ml-modulo-3-revisao]]", "[[google-ai-ml-modulo-4-revisao]]", "[[R - 2026-10-14-m06-a01-course-summary]]"]
---

# Google AI/ML — Armadilhas acumuladas e cheat-sheet do curso 1

O que não existe em nenhum outro lugar do material do curso [[curso-intro-ai-ml-google-cloud]]: as contradições, oscilações e confusões rastreadas aula a aula e, quando o curso as resolveu, como resolveu. Veio do índice do curso mantido no projeto Claude "Certificação Google" (versão de 14/10/2026). A ementa e o progresso ficam no hub do curso; o conteúdo detalhado, nos resumos de aula e nos materiais de módulo.

## ⚠️ As armadilhas acumuladas

**Esta é a seção que não existe em nenhum outro lugar.** São as contradições,
oscilações e confusões que eu rastreei ao longo do curso — e, quando o curso as
resolveu, como ele resolveu.

### Nomes e numeração

**1. Agent Platform = Vertex AI.** Confirmado em áudio na 2.1 e **textualmente na
4.3**: *"embedded in **Vertex AI, now Agent Platform**"*.

**2. A numeração dos módulos.** A contagem do instrutor é **a nossa menos 1**.

**3. ⚠️⚠️ O rótulo do AutoML OSCILA — e o curso nunca fechou:**

| Rótulo | Aulas |
|---|---|
| **no-code** | **1.1 · 4.2 · 4.3 · 4.5 · 5.1** |
| "no-to-low-code" | 4.1 · 4.4 |
| "low- or no-code" | 4.8 · 5.1 · 6.1 |

⭐ **O padrão:** quando o curso **recapitula** um módulo, ele hedge; quando
**contrasta o AutoML com o caminho de código**, diz **no-code**. A **5.1 usa as
duas formas com 3 minutos de distância**. **Resposta de prova: no-code** (5
aulas). Se houver "no-code ou low-code", essa é a mais fiel. **Nunca**
code-based — isso é o custom training.

**4. ⚠️ Três listas de tipos de dado do AutoML:**

| Aula | O que diz |
|---|---|
| **4.1** (tabela comparativa) | **tabular e imagem** |
| **5.2** | *"now **mainly** supports **tabular**"* |
| **5.3** (tela de treinamento) | **tabular, image, text, video** |

**Responda pelo formato da pergunta.** Comparação entre as quatro opções →
**tabular e imagem**. "O que suporta hoje" / "mainly" → **tabular**. Tela de
treinamento → **os quatro**.

**5. ⚠️ O TensorFlow desaparece da lista da 4.8.** As "ferramentas versáteis" para
codar manualmente são **Python, JAX e Workbench**. Mas se a questão pedir
**bibliotecas de ML**, a resposta é a da 4.5: **TensorFlow, scikit-learn,
PyTorch**.

### Listas que se parecem

**6. ⭐ QUATRO escadas no-code/low-code/code-based** (1.1, 3.2, 3.8 e 4.1):

| | **1.1** | **3.2** | **3.8** | **4.1** |
|---|---|---|---|---|
| **no-code** | Gemini Enterprise app · AutoML | console UI | Gemini Enterprise app · CX | Gemini Enterprise app · CX |
| **no-to-low-code** | — | — | — | ⚠️ **AutoML** |
| **low-code** | Pre-trained APIs | Gen AI APIs (+ cUrl) | Agent Studio · Agent Garden | Preconfigured APIs |
| **code/pro-code** | BigQuery ML · custom training | SDKs + notebooks | ADK · build-your-own | BigQuery ML · ADK · custom training |

**7. 📐 Os TRÊS "três camadas" do curso:**

| Qual | As camadas | Aula |
|---|---|---|
| **AI/ML Toolbox** | AI infrastructure → **AI development** ← *foco do curso* → AI applications | 2.2, 2.7 |
| **Dentro da infraestrutura** | networking and security → compute e storage → data and AI products | 2.3 |
| **Stack de gen AI / agentes** | **Model Garden** → **Agent Platform** → **Gemini Enterprise app** | 3.1, 3.8 |

**8. ⭐⭐⭐ As listas de ETAPAS que convivem — são QUATRO:**

| Lista | As etapas | Aula |
|---|---|---|
| **Pipeline da Agent Platform** (4) | data readiness → feature readiness → training e hyperparameter tuning → deployment e model monitoring | **4.2** |
| **As fases do AutoML** (4) | data processing → searching models and tuning → assembling → prediction | **4.3** |
| **O pipeline que o AutoML automatiza** (4) | feature engineering → architecture search → hyperparameter tuning → model ensemble | **4.3** |
| ⭐ **O workflow de ML** (**3**) | **data preparation → model development → model serving** | **5.1** |

⚠️ **A do Módulo 5 é a única de TRÊS** — e é a que organiza as aulas 5.2, 5.3 e
5.4. Se a questão mencionar "o workflow de ML", é essa.

**9. ⭐⭐ DUAS granularidades para os processos do workflow:**

| Estágio (5.1) | Sub-etapas dentro de um pipeline (5.5) |
|---|---|
| **Data preparation** | **data extraction · analysis · preparation** |
| **Model development** | **training · evaluation · validation** |
| **Model serving** | **prediction · monitoring** |

⚠️ A 5.5 **acrescenta "validation"**. Questão sobre **estágios** → 5.1; sobre
**processos dentro do pipeline** → 5.5.

**10. ⭐⭐ Os quatro Ss da Agent Platform ≠ os quatro benefícios do Feature Store:**

| Quatro Ss (4.2) | Quatro benefícios (5.2) |
|---|---|
| Seamless · **Scalable** · **Sustainable** · Speedy | **Shareable** · **Reusable** · **Scalable** · **Easy to use** |

Na 4.2, reúso e compartilhamento estavam **juntos** em "sustainable"; na 5.2 são
**separados**, e entra **"easy to use"**.

**11. ⭐⭐ DUAS analogias de API, com DUAS tríades:**

| | **Tomada elétrica (4.4)** | **Sanduíche na deli (4.6)** |
|---|---|---|
| **As três coisas que você precisa saber** | **qual API · quais parâmetros · em que formato** | **features** (menu) · **input** (pedido) · **output** (sanduíche) |

**12. ⚠️ TRÊS tríades de verbos, fáceis de trocar:**

| Suíte | Verbos | Aula |
|---|---|---|
| **Agent Platform** (agentes) | **discovering · building · deploying** | 4.4 |
| **Machine learning APIs** | **train · monitor · tune** | 4.4 |
| **Feature Store** | **manage · serve · share** | 5.2 |
| **Agent Platform Pipelines** | **automates · monitors · governs** | 5.4 |

### Conceitos

**13. Logistic regression resolve CLASSIFICAÇÃO** (2.4, 2.5). Quem prevê números é
a **linear regression**. ⭐ A 5.2 fecha a trinca: os **objectives** tabulares são
**regression** (números) · **classification** (categorias) · **forecasting**
(séries temporais).

**14. Bigtable ≠ BigQuery** (2.3). Bigtable e Firestore são **NoSQL**. E **NoSQL ≠
não estruturado**.

**15. O curso foca na SEGUNDA camada** do AI/ML Toolbox — **AI development**.

**16. A lista de modalidades da gen AI tem SEIS itens** (3.1): texto, **código**,
imagem, **fala**, vídeo e **3D**.

**17. ⭐ Só a TASK é obrigatória num prompt** (3.3). E **prompt design** (criar) ≠
**prompt engineering** (**iterativo**).

**18. ⭐ Top K × Top P** (3.4). **Top K = quantas** palavras · **top P = quanta
probabilidade acumulada**.

**19. Open model = PESOS públicos** (3.4), não código aberto.

**20. ⭐⭐ Grounding é o QUÊ; RAG é o COMO** (3.5).

**21. ⭐⭐ Fine-tuning = INTERNO; grounding = EXTERNO** (3.5).

**22. Prompt design NÃO altera os parâmetros** (3.5).

**23. ⭐⭐ Os três componentes de um agente** (3.7): **model** (cérebro) · **tools**
(**mãos, pés e sentidos** — agem **e** percebem) · **orchestration layer**
(sistema nervoso). ⚠️ A 3.9 abrevia tools como "hands and feet".

**24. AI agent é uma APLICAÇÃO** (3.7). **AI agent** (um) ≠ **agentic AI**
(múltiplos).

**25. ⭐⭐ Model Garden ≠ Agent Garden** (3.8): **modelos** × **templates de
agente**. ⚠️ A 3.9 acrescenta *"and fine-tuning"* ao Model Garden.

**26. Os dois gatilhos para sair do no-code** (3.8): **integrações profundas** e
**comportamento customizado**.

**27. ⭐⭐⭐ Só as PRE-TRAINED APIs processam ÁUDIO** (4.1).

**28. ⭐⭐⭐ Hiperparâmetros: a pergunta é QUEM TUNA:**

| | **Você** tuna? | **A ferramenta** tuna? |
|---|---|---|
| **Pre-trained APIs** | ❌ | — |
| **AutoML** | ❌ | ✅ **sim, automaticamente** |
| **BigQuery ML** | ✅ | — |
| **Custom training** | ✅ | — |

E *"em qual passo do tf.keras?"* → no **`compile`**.

**29. ⭐ As opções de desenvolvimento servem às DUAS IAs** (4.1, 4.2).

**30. ⭐⭐ O AutoML não entrega "o melhor modelo"** (4.3) — entrega um **ensemble
dos top ~10**, conforme o **training budget**. ⭐ E a **5.3** completa: ele
**busca entre milhares**. **Milhares testados, ~10 usados.**

**31. A fase 1 do AutoML automatiza PARTE do preparo de dados** (4.3), não tudo.

**32. ⭐⭐⭐ No TensorFlow, a camada mais baixa é HARDWARE** (4.5), não código. O
**Keras é a mais alta**. A camada 3 **não são APIs** — são **model libraries**.

**33. ⭐ UI para testar × código para produção** (4.6).

**34. ⭐⭐ "Grande volume de dados" = CENTENAS DE MILHARES de registros** (4.4) — e
de **alta qualidade**.

**35. ⭐⭐⭐ A Natural Language API tem CINCO métodos para QUATRO features** (4.6).
O **sentiment tem dois** porque opera em **dois níveis**: `analyzeSentiment`
(texto inteiro) × `analyzeEntitySentiment` (cada entidade). E `classifyText` é o
único que **não** começa com `analyze`.

**36. ⚠️ "Criar uma requisição em outro idioma"** (4.6) refere-se ao campo
**`language`** do JSON, **não** a outra linguagem de programação.

**37. ⭐⭐ Online = real-time · offline = batch** (5.2, 5.4). Pares de sinônimos,
em **dois** contextos: Feature Store e deployment.

**38. ⚠️ Duas definições de feature, complementares:**

| Definição | Aula |
|---|---|
| os **dados processados** que entram no modelo | **4.2** |
| um **fator que contribui para a previsão**; como **variável independente** ou **coluna de tabela** | **5.2** |

**39. ⚠️ O passo 2 do serving online do Feature Store é OPCIONAL** (5.2) —
registrar as fontes criando **feature groups**.

**40. ⚠️ "Texto" é structured ou unstructured?** A **5.1** o lista como
**structured** (cabe numa tabela); o **quiz do Módulo 2** o listava entre os **não
estruturados**. **Reconciliação:** **campo de texto numa tabela** = estruturado;
**documento de texto livre** = não. Veja se a alternativa fala de *campos* ou de
*documentos*.

**41. ⭐⭐ O workflow de ML não é linear — é ITERATIVO** (5.1). Do **training** você
volta aos **dados brutos**; do **monitoring**, às **fontes** e aos
**parâmetros**. É isso que o **MLOps automatiza** — os **retornos**, não o caminho
principal.

**42. ⚠️ O model management atravessa TODO o workflow** (5.4) — **não é** um
estágio nem um passo. Gerencia a **infraestrutura subjacente**, para o cientista
de dados focar no **o quê** e não no **como**.

**43. ⭐⭐⭐ Endpoint: obrigatório para real-time, dispensável para batch** (5.4).
*"A model **must be deployed to an endpoint** before it can serve **real-time**
predictions"* × *"**batch prediction does not require** deploying the model to an
endpoint"*.

**44. ⭐ Edge computing tem TRÊS motivos** (5.4): **mitigar latência**, **garantir
privacidade** e **habilitar funcionalidade offline**. A **privacidade** é a que
mais escapa, porque o exemplo da planta industrial ilustra só a latência.

**45. ⭐⭐⭐ Type 1 = False Positive · Type 2 = False Negative** (5.3).
**Mnemônico:** o **1** parece um **"+"** cortado.

**46. ⭐⭐⭐ Recall × precision** (5.3): as duas têm **TP no numerador**; muda o
denominador. **Re**call = **Re**alidade (**TP/(TP+FN)**) · **P**recision =
**P**revisão (**TP/(TP+FP)**).

**47. ⚠️ ACCURACY nunca é mencionada no curso.** A 5.3 cobre só **recall**,
**precision** e **feature importance**. Se aparecer accuracy numa alternativa,
provavelmente é distrator.

**48. ⭐⭐ Continuous TRAINING** (4.2, 5.5). Os três contínuos do MLOps são **CI,
CT, CD** — e o **CT** é o que diferencia ML de software comum.

**49. ⭐⭐⭐ A fase 0 do MLOps é CRÍTICA** (5.5), não "a fase de quem não começou":
*"it helps you **build an end-to-end workflow manually before you automate
it**"*.

**50. ⭐⭐ KFP × TFX** (5.5): use **TFX** se **já usa TensorFlow** **E** processa
**terabytes de dados estruturados**; **caso contrário, KFP**. A condição tem
**duas metades**.

**51. ✅ O building block de um pipeline é o COMPONENT**, não o SDK. A 5.1 dizia
SDKs, a 5.4 dizia components, e a **5.5 resolveu**: o component é *"um conjunto de
código autocontido… como uma **função**"*; o **SDK** é a ferramenta com que você
o escreve. ⚠️ A **5.9** volta a falar em *"pre-built SDKs"*, mas sem chamá-los de
building blocks — a resposta continua **component**.

**52. ⭐⭐⭐ Parâmetro × hiperparâmetro** (5.8). **Parâmetros = weights e biases**
(a máquina aprende) · **hiperparâmetros = layers, neurons, activation functions,
learning rate, epochs** (um humano define **antes**). ⚠️ A **4.5** punha **loss
function e optimizer** no `compile` como hiperparâmetros; a lista da 5.8 não os
inclui. **Weights nunca** são hiperparâmetros.

**53. ⭐⭐⭐ Sigmoid = binária · softmax = multiclasse** (5.8). Sigmoid dá **0 a 1**
(e é a da **logistic regression**); **tanh dá −1 a +1**; softmax dá saídas que
**somam 1**. A activation existe para **adicionar não linearidade**.

**54. ⭐⭐ Loss = UMA instância · cost = training set INTEIRO** (5.8). Regressão →
**MSE**; classificação → **cross-entropy**.

**55. ⭐⭐ As duas perguntas do gradient descent** (5.8): **direção → derivada** ·
**tamanho do passo → learning rate**. Learning rate **pequeno** = lento;
**grande** = não converge. **Backpropagation** ajusta os weights;
**gradient descent** decide **como** e **quando parar**.

**56. ⚠️ "Backbone" tem dois donos.** Os **foundation models** são o backbone da
**gen AI** (3.9, 6.1); o **Agent Platform Pipelines** é o backbone da **automação
do workflow / do MLOps** (5.4, 5.5).

**57. ⚠️ O BigQuery ML some das recapitulações do Módulo 4** (4.8 e 6.1), que
nomeiam só **três** opções. **Na prova são QUATRO** — a tabela da 4.1.

---

## 🎯 Cheat-sheet — as três tabelas mais cobráveis do curso

O resto do conteúdo está nos glossários de módulo e nas notas de aula. Estas três
valem a pena ter aqui.

### 1. As quatro opções de desenvolvimento (aula 4.1)

| Critério | **Pre-trained APIs** | **BigQuery ML** | **AutoML** | **Custom training** |
|---|---|---|---|---|
| **Tipos de dado** | tabular, imagem, texto, vídeo **+ áudio** | ⚠️ **só tabular e JSON** | tabular **e imagem** | tabular, imagem, texto, vídeo |
| **Volume de dados** | **nenhum** | **grande** (centenas de milhares) | *(não dito)* | **grande** |
| **Expertise** | **baixa** | **exige SQL** | **baixa** | ⚠️ **a mais alta** |
| **Você tuna hiperparâmetros?** | ❌ | ✅ | ❌ *(a máquina tuna)* | ✅ |
| **Tempo de treino** | **nenhum** | depende | depende | ⚠️ **o mais longo** |
| **Nível** | **low-code** | **code-based** | **no-code** | **code-based** |

**O guia de decisão:** pouca experiência e sem intenção de treinar →
**pre-trained APIs** · conhece SQL e dados no BigQuery → **BigQuery ML** ·
modelos próprios com mínimo de código → **AutoML** · controle total →
**custom training**.

**Os três fatores de escolha:** **necessidade de negócio · expertise em ML ·
orçamento**.

### 2. O workflow de ML (aulas 5.1 a 5.4)

| # | Estágio | Os dois passos | No restaurante | Aula |
|---|---|---|---|---|
| **1** | **Data preparation** | **data uploading** · **feature engineering** | preparar os **ingredientes crus** | **5.2** |
| **2** | **Model development** | **training** · **evaluation** | **experimentar receitas** | **5.3** |
| **3** | **Model serving** | **deployment** · **monitoring** | **fechar o menu e servir** | **5.4** |

**A frase mais citável:** *"Se você não move um modelo para produção, ele **não
tem uso** e continua sendo **apenas um modelo teórico**."*

**O workflow é ITERATIVO** — e o **MLOps automatiza os retornos**.

### 3. Matriz de confusão, recall e precision (aula 5.3)

| Quadrante | Interpretação | O gato |
|---|---|---|
| **True positive** | previu **positivo**, **acertou** | previu gato, **é** |
| **True negative** | previu **negativo**, **acertou** | previu não-gato, **não é** |
| **False positive** ⚠️ **Type 1** | previu **positivo**, **errou** | previu gato, **não é** |
| **False negative** ⚠️ **Type 2** | previu **negativo**, **errou** | previu não-gato, **mas é** |

```
recall    = TP / (TP + FN)      ← parte dos positivos REAIS
precision = TP / (TP + FP)      ← parte dos PREVISTOS como positivos
```

**O trade-off, pelo exemplo do Gmail:** pegar o **máximo de spam** → **recall** ·
**não bloquear e-mail bom** → **precision**. **A pergunta que decide: qual erro
dói mais** — deixar passar (**FN → recall**) ou acusar errado (**FP →
precision**).

### 📅 As oito datas decoráveis

```
1998 ── 2008 ── 2016 ── 2017 ───── jan/2018 ── 2021 ── 2023 ── 2026
Google  Google   TPU  Transformer   AutoML    AutoML  Gemini  IA agêntica
nasce   Cloud                      anunciado  no Vertex AI   (plataforma)
```

⚠️ **Janeiro de 2018** é a única data do curso com **precisão mensal**.

## Pontos a resolver

### Em aberto

- ⚠️ **O rótulo do AutoML não fechou** — e o padrão está claro: **hedge ao
  recapitular, "no-code" ao contrastar com código**. Resposta de prova:
  **no-code**.
- ⚠️ **A sigla ADK não é expandida** em nenhuma aula do curso.
- **Data-limite da prova** — ainda não sei.
- 📖 Ler o *reading* 2.9: **IA responsável** + docs de **GKE e Cloud Run**.

### Encerrados sem entrega

- ❌ **Chain-of-thought.** Nomeado na 3.3 entre as técnicas avançadas, nunca
  desenvolvido em 3.4, 3.5, 3.7, 3.8 nem 3.9. **Menção solta.**
- ❌ **Data drifting.** Nomeado na 5.1, não definido na **5.4** (a aula de
  monitoramento) nem na **5.5** (MLOps) — as duas em que cabia. Para a prova:
  **problema detectado no monitoramento em produção**; a resposta é **checar as
  fontes e ajustar os parâmetros**.
- ❌ **Accuracy.** Nunca mencionada. A 5.3 cobre só **recall**, **precision** e
  **feature importance**.

### Resolvidos ao longo do curso

- ✅ **2.3** — as duas enumerações de infraestrutura.
- ✅ **2.5** — o "AI code assistant" do lab é o **Gemini Code Assist**.
- ✅ **3.1** — Gemini Enterprise app (indivíduos) × Agent Platform (empresas).
- ✅ **3.3** — o **Gemini Notebook** é componente do **Gemini Enterprise app**.
  ⚠️ A 3.9 o lista **ao lado** do app: "onde fica" → **dentro**; "para que serve"
  → **ferramenta no-code para end-users**.
- ✅ **3.5** — **RAG**: grounding (o quê) × RAG (o como).
- ✅ **3.8** — **Model Garden** (modelos) e **Agent Garden** (templates).
- ✅ **4.1** — **BigQuery ML é CODE-BASED**, pelo **SQL**. Aberta desde a 2.5.
- ✅ **4.3** — **hiperparâmetros no AutoML**: ele tuna **automaticamente**; o
  **usuário** não.
- ✅ **4.6** — a relação **API ↔ SDK**: os **vendors** definem as APIs e fornecem
  os SDKs.
- ✅ **5.2** — o que são **objectives** e a **definição funcional de feature**.
- ✅ **5.3** — **milhares testados, ~10 usados** no ensemble do AutoML.
- ✅ **5.5** — o **building block** de um pipeline é o **component**, não o SDK.
- ✅ **5.6** — o **volume mínimo do AutoML**: **1.000 data points**.
- ✅ **5.8** — as **activation functions** adiadas pela 4.5: ReLU, sigmoid, tanh e
  softmax.

## Fontes

- Gravação de tela da página do curso em
  `partner.skills.google/paths/84/course_templates/593` (01/09/2026).
- Transcrições das aulas coladas por Leonardo.
- Vídeos: aula 2.1 <https://youtu.be/rdLdN9zyXZs> · aula 2.2
  <https://youtu.be/ZHUINZJeyYg>
- Questão 1 do simulado do Módulo 2: print do quiz real (08/10/2026).
