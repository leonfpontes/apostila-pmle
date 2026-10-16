---
title: Módulo 5, Aula 5.8 — How a machine learns
aliases: ["aula 5.8 Google AI ML", "How a machine learns"]
tags: [aula, trabalho]
type: aula
area: trabalho
created: 2026-10-14
updated: 2026-10-14
status: concluída
fonte: transcricao
confianca: media
papel: derivada
indexar: true
summary: "Aula \"opcional\" que paga a dívida da 4.5: família das redes neurais, os sete passos do aprendizado, as quatro activation functions (ReLU, sigmoid, tanh, softmax), loss × cost, gradient descent e learning rate, e a tabela parâmetro × hiperparâmetro."
transcricao: ""
data: 2026-10-14
curso: "[[curso-intro-ai-ml-google-cloud]]"
professor: ""
related: ["[[R - 2026-10-09-m04-a05-custom-training]]", "[[R - 2026-10-09-m05-a03-model-development]]"]
---

# Módulo 5, Aula 5.8 — How a machine learns

| | |
|---|---|
| **Tema** | How a machine learns |
| **Curso** | [[curso-intro-ai-ml-google-cloud\|Introduction to AI and Machine Learning on Google Cloud]] |
| **Data** | 2026-10-14 (data da transcrição) |
| **Duração** | ~11min |
| **Aula nº / módulo** | 5.8 — Módulo 5 na ementa (o instrutor chama de **Module 4**) · marcada como opcional |

> ⚠️ **Sem nota `T - `.** A transcrição bruta desta aula ficou só na conversa do projeto Claude "Certificação Google" e não foi trazida para o vault.

> 🎯 **O "opcional" engana de novo.** A própria aula diz *"if you are already
> familiar with the ML theories… feel free to skip"* — mas é aqui que o curso
> **paga a dívida da 4.5** (as activation functions tinham ficado para *"the next
> module"*) e entrega o vocabulário que a prova usa sem explicar: **weights,
> bias, activation function, loss × cost, backpropagation, gradient descent,
> learning rate, epoch** e, acima de tudo, **parâmetro × hiperparâmetro**.

---

## 1. ⭐ A família das redes neurais — e a raiz dela

| Rede | Sigla |
|---|---|
| Deep Neural Networks | **DNN** |
| Convolutional Neural Networks | **CNN** |
| Recurrent Neural Networks | **RNN** |
| Large Language Models | **LLM** — *"more recently"* |

> ⭐ ***"All of these models stem from the most basic, Artificial Neural Network,
> or ANN."***

**Sinônimos da ANN:** *neural network* ou ⚠️ ***shallow* neural network** (rede
**rasa**). É o oposto do **deep** da DNN — o que conecta com a hierarquia da 2.4:
o deep learning é o que **acrescenta camadas** entre entrada e saída.

### As três camadas da ANN

| Camada | Papel |
|---|---|
| **Input layer** | recebe os dados (no exemplo, **títulos de artigos**) |
| **Hidden layer** | processa |
| **Output layer** | entrega a previsão (de qual veículo é o artigo: **GadgeHub, Daily Insight, DevStream**) |

- Cada **nó** = um **neurônio**.
- As **linhas** entre neurônios simulam as **sinapses**.
- ⭐⭐ **Os weights ficam nas ligações** e *"retain information that a neural
  network learned through the training process"* — são *"the mysteries that a
  neural network aims to discover"*.

📌 **Exemplo didático:** **2 neurônios de entrada, 1 oculto, 1 de saída**. A aula
fecha dizendo que, **qualquer que seja o número de neurônios**, *"the fundamental
process… remains the same"*.

---

## 2. ⭐⭐⭐ Os SETE passos do aprendizado

| # | Passo | O que acontece |
|---|---|---|
| **1** | **Weighted sum** (camada oculta) | multiplica cada input pelo seu weight e soma — normalmente **+ bias (b)**, ignorado na explicação |
| **2** | **Activation function** (camada oculta) | aplicada à soma ponderada |
| **3** | **Weighted sum** (camada de saída) | idem, agora para a saída |
| **4** | **Activation function** (camada de saída) | ⚠️ **pode ser diferente** da usada na camada oculta. O resultado é o **ŷ (y-hat)** |
| **5** | **Cost function** | mede a diferença entre **ŷ** (previsto) e **y** (real) |
| **6** | **Backpropagation** | ⚠️ *"potential"* sixth step — só se a diferença for **significativa**: volta e **ajusta weights e biases** |
| **7** | **Iteration** | repete 1→6; **uma passada completa = um epoch** |

> ⭐⭐ **Notação:** **ŷ (y-hat) = o previsto** · **y = o real**.

⚠️ **O passo 6 é condicional** (*"potential"*) — mesma lógica da armadilha 39 do
índice (o passo opcional do Feature Store). Se a questão perguntar qual passo
**nem sempre acontece**, é a **backpropagation**.

**Quando parar:** a cost function chegou ao ótimo *"when the value **stops
decreasing**, even after many iterations"*.

---

## 3. ⭐⭐⭐ Activation functions — o PORQUÊ

> ⭐⭐⭐ ***"An activation function is used to prevent linearity or add
> non-linearity."***

**O argumento, em três linhas:**

```
sem activation:  h  = w1·x1 + w2·x2
                 ŷ  = w3·h  = a·x1 + b·x2     ← combinação LINEAR do input
```

> ⭐⭐ Sem activation, **ŷ é sempre linear em x**, *"regardless of the number of
> layers"*. E se é linear, **as camadas ocultas não servem para nada** — bastaria
> **um input e um output**. Como modelos lineares vão mal em problemas complexos,
> a activation **converte a rede linear em não linear**.

⚠️ **A armadilha:** a activation **não** existe para acelerar o treino, nem para
normalizar dados, nem para reduzir erro diretamente. Ela existe para **adicionar
não linearidade**.

---

## 4. ⭐⭐⭐ As QUATRO activation functions

| Função | O que faz | Faixa de saída | Uso |
|---|---|---|---|
| **ReLU** (Rectified Linear Unit) | **negativo → 0**; positivo **mantém** | **[0, +∞)** | camadas ocultas (no exemplo) |
| **Sigmoid** | comprime para **entre 0 e 1** | **(0, 1)** | ⭐ **classificação binária** e **logistic regression** (ex.: **spam ou não**) |
| **Tanh** (hyperbolic tangent) | **desloca a curva da sigmoid** | ⚠️ **(−1, +1)** | — |
| **Softmax** | cada saída em [0, 1] **e o total soma 1** | **distribuição de probabilidade** | ⭐⭐ **classificação multiclasse** (GadgeHub × Daily Insight × DevStream) |

> ⭐⭐⭐ **O par que a prova vai cobrar:**
>
> | | **Sigmoid** | **Softmax** |
> |---|---|---|
> | **Classes** | **duas** (binária) | **várias** (multiclasse) |
> | **Exemplo do curso** | e-mail é **spam?** | de **qual veículo** é o artigo? |
> | **Saída** | **um** valor entre 0 e 1 | **vários** valores que **somam 1** |

⚠️ **Sigmoid × tanh:** as duas têm forma de S; a diferença é a **faixa** — **0 a 1**
× **−1 a +1**.

⭐ **Pode misturar camadas:** *"you can have **ReLU for hidden layers** and
**softmax for the output layer**"*. Activation **não precisa** ser a mesma em
todas as camadas (passo 4).

📌 **Conexão com a armadilha 13 (logistic regression = classificação):** a
**sigmoid** é a função da **logistic regression** — por isso ela **classifica**
(devolve uma probabilidade entre 0 e 1), em vez de prever um número.

---

## 5. ⭐⭐⭐ Loss function × cost function

| | **Loss function** | **Cost function** |
|---|---|---|
| **Calcula o erro de** | **uma única instância** de treino | **o training set inteiro** |

> ⚠️ O curso às vezes usa os dois como sinônimos (*"loss function **or** cost
> function"*, *"cost or loss functions"*). Mas quando **distingue**, a regra é:
> **loss = um exemplo · cost = todos**. Se a questão pedir a diferença, é essa.

### As duas cost functions citadas

| Problema | Cost function | Modelo |
|---|---|---|
| **Regressão** | **MSE** (Mean Squared Error) = **média dos quadrados** das diferenças entre ŷ e y | **linear regression** |
| **Classificação** | **Cross-entropy** — diferença entre as **distribuições de probabilidade** prevista e real | **logistic regression** |

⭐ **Mnemônico:** **regressão → erro ao quadrado (número)** · **classificação →
entropia (probabilidade)**. Fecha com a trinca de objectives da 5.2.

---

## 6. ⭐⭐⭐ Gradient descent — as DUAS perguntas

> ***"Gradient descent refers to the process of walking down the surface formed
> by the cost function and finding the bottom."***

A ideia: transformar a cost function numa **estratégia de busca**. Achar o fundo
se divide em **duas perguntas**:

| # | Pergunta | A resposta |
|---|---|---|
| **1** | **Para que direção ir?** | a **derivada** da cost function |
| **2** | **De que tamanho é o passo?** | o **learning rate** |

### Pergunta 1 — a direção (derivada)

| Derivada | Onde você está | Para onde ir |
|---|---|---|
| **negativa** | **lado esquerdo** da curva | **descer para a direita** |
| **positiva** | **lado direito** da curva | **voltar para a esquerda** |

Calcula a derivada **a cada passo** e repete até chegar ao *"regional bottom"*
(o mínimo **local**).

### Pergunta 2 — o tamanho do passo (learning rate)

| Learning rate | Consequência |
|---|---|
| **pequeno demais** | o treino **demora demais** |
| **grande demais** | **quica de parede em parede** ou até **sai da curva** sem **convergir** |
| **na medida** | ✅ |

⚠️⚠️ ***"Step size or learning rate is a hyperparameter that is set before
training."*** — **não** é aprendido; **você** define.

### Quem faz o quê

> ⭐⭐ **Backpropagation** = **modificar** weights e bias quando o erro é grande ·
> **Gradient descent** = **decidir COMO** ajustá-los **e QUANDO parar**.

---

## 7. ⭐⭐⭐ Parâmetro × hiperparâmetro — a tabela da aula

| | **Parâmetros** | **Hiperparâmetros** |
|---|---|---|
| **Quais são** | **weights e biases** | **número de layers**, **número de neurons**, **activation functions**, **learning rate**, **epochs** |
| **Quem define** | **a máquina**, no treino | **um humano**, **antes** do treino |
| **Seu controle** | **só o valor inicial** | total |
| **O papel** | o que a rede **aprendeu** | ⭐ **como** a máquina aprende |

**Os dois exemplos da aula:** **learning rate = quão rápido** aprende · **epochs =
quantas vezes** o aprendizado itera.

> ⭐⭐ ***"If you use a tool like AutoML, it automatically selects the
> hyperparameters for you."*** — confirma a **armadilha 28** do índice: no
> AutoML, **a ferramenta** tuna os hiperparâmetros, **não** o usuário.

⚠️⚠️ **O choque com a 4.5:** lá, o `compile` do tf.keras definia como
**hiperparâmetros** a **loss function** e o **optimizer**. A lista da 5.8 **não
inclui nenhum dos dois** — mas também não diz que não são. **Para a prova:** se
pedirem a lista **desta aula**, são os **cinco** (layers, neurons, activation,
learning rate, epochs). A loss function, aqui, é tratada como **instrumento de
medida**, não como algo que se tuna. E os **weights nunca** são hiperparâmetros.

---

## Glossário da aula

| Termo | Definição |
|---|---|
| **ANN** (Artificial Neural Network) | A rede neural **mais básica**, raiz de DNN, CNN, RNN e LLM; também chamada **shallow neural network** |
| **Input / hidden / output layer** | As **três camadas** de uma ANN |
| **Neuron (node)** | Cada nó da rede |
| **Weight** | Fica na ligação entre neurônios; **guarda o que a rede aprendeu** — é um **parâmetro** |
| **Bias (b)** | Componente somado à soma ponderada — também **parâmetro** |
| **Weighted sum** | Soma de cada input × seu weight (passos 1 e 3) |
| **Activation function** | **Adiciona não linearidade**; sem ela, ŷ é linear em x |
| **ReLU** | Negativo → 0; positivo mantém |
| **Sigmoid** | Saída entre **0 e 1**; **binária** e **logistic regression** |
| **Tanh** | Sigmoid **deslocada**; saída entre **−1 e +1** |
| **Softmax** | Saídas em [0, 1] que **somam 1**; **multiclasse** |
| **ŷ (y-hat)** | O resultado **previsto** (y = o real) |
| **Loss function** | Erro de **uma instância** |
| **Cost function** | Erro do **training set inteiro** |
| **MSE** | Média dos quadrados das diferenças; **regressão** |
| **Cross-entropy** | Diferença entre distribuições de probabilidade; **classificação** |
| **Backpropagation** | Voltar e **ajustar weights e biases** quando o erro é significativo (passo 6) |
| **Gradient descent** | **Descer** a superfície da cost function até o fundo; decide **como ajustar e quando parar** |
| **Derivative** | Diz a **direção**: negativa → direita, positiva → esquerda |
| **Learning rate (step size)** | **Tamanho do passo**; **hiperparâmetro** |
| **Epoch** | **Uma passada completa** do passo 1 ao 6 |
| **Parameters** | **Weights e biases** — aprendidos pela máquina |
| **Hyperparameters** | Layers, neurons, activation, learning rate, epochs — definidos **por humanos, antes** do treino |

---

## Flashcards

| Pergunta | Resposta |
|---|---|
| ⭐ De que rede derivam DNN, CNN, RNN e LLM? | Da **ANN** (Artificial Neural Network) |
| Outro nome da ANN | **Shallow neural network** (ou só neural network) |
| As três camadas da ANN | **Input · hidden · output** |
| O que as linhas entre neurônios simulam? | As **sinapses** |
| ⭐⭐ Onde ficam os **weights**? | **Nas ligações** entre neurônios — guardam o que a rede aprendeu |
| ⭐⭐⭐ Os sete passos | **Weighted sum → activation → weighted sum → activation → cost function → backpropagation → iteration** |
| ⚠️ Qual passo é *"potential"*? | O **6, backpropagation** — só se o erro for significativo |
| O que é **ŷ**? | O valor **previsto** (y é o real) |
| ⭐⭐⭐ Para que serve a activation function? | **Adicionar não linearidade** |
| ⭐⭐ E sem ela? | ŷ é **linear em x**, e as camadas ocultas **não servem para nada** |
| O que faz a **ReLU**? | **Negativo → 0**, positivo mantém |
| ⭐⭐ Faixa da **sigmoid** | **0 a 1** |
| ⭐⭐ Faixa da **tanh** | **−1 a +1** |
| ⭐⭐⭐ Sigmoid serve para… | **Classificação binária** e **logistic regression** (spam?) |
| ⭐⭐⭐ Softmax serve para… | **Classificação multiclasse** — saídas **somam 1** |
| A activation precisa ser igual em todas as camadas? | **Não** — ex.: **ReLU** nas ocultas, **softmax** na saída |
| ⭐⭐⭐ Loss × cost | **Loss = uma instância** · **cost = training set inteiro** |
| ⭐⭐ Cost function para **regressão** | **MSE** |
| ⭐⭐ Cost function para **classificação** | **Cross-entropy** |
| ⭐⭐ As duas perguntas do gradient descent | **Direção** (derivada) e **tamanho do passo** (learning rate) |
| Derivada **negativa** → ? | Você está à **esquerda**; vá para a **direita** |
| ⭐⭐ Learning rate **pequeno demais** | Treino **demora demais** |
| ⭐⭐ Learning rate **grande demais** | **Quica** de parede em parede ou **não converge** |
| ⭐⭐ O que é um **epoch**? | **Uma passada completa** do passo 1 ao 6 |
| Quando a cost function chegou ao ótimo? | Quando **para de diminuir**, mesmo após muitas iterações |
| ⭐⭐⭐ Quais são os **parâmetros**? | **Weights e biases** |
| ⭐⭐⭐ Quais são os **hiperparâmetros** (lista da aula)? | **Layers · neurons · activation functions · learning rate · epochs** |
| Que controle você tem sobre os parâmetros? | **Só os valores iniciais** |
| ⭐⭐ Backpropagation × gradient descent | Backprop **modifica** weights e bias · gradient descent decide **como** e **quando parar** |
| ⭐ Quem escolhe os hiperparâmetros no AutoML? | **O próprio AutoML**, automaticamente |

---

## Questões estilo prova

**1.** ⭐⭐⭐ Qual é a função principal de uma activation function numa rede neural?
- A) Acelerar o treinamento
- B) Adicionar não linearidade
- C) Medir o erro entre previsto e real
- D) Definir o tamanho do passo do gradient descent

<details><summary>Gabarito</summary>

**B.** *"Prevent linearity or add non-linearity."* ⚠️ (C) é a **cost/loss
function** e (D) é o **learning rate**.
</details>

**2.** ⭐⭐⭐ Um modelo precisa classificar artigos em **um de três veículos**. Qual
activation function usar na camada de saída?
- A) ReLU
- B) Sigmoid
- C) Softmax
- D) Tanh

<details><summary>Gabarito</summary>

**C.** **Multiclasse → softmax**, cujas saídas **somam 1**. ⚠️ (B) é o distrator
forte: a sigmoid serve para **duas** classes (spam ou não).
</details>

**3.** ⭐⭐ Qual activation function gera valores entre **−1 e +1**?
- A) Sigmoid
- B) Tanh
- C) ReLU
- D) Softmax

<details><summary>Gabarito</summary>

**B.** A tanh **desloca a curva da sigmoid**. ⚠️ (A) gera entre **0 e 1**.
</details>

**4.** ⭐⭐⭐ Qual a diferença entre **loss function** e **cost function**?
- A) Loss é para regressão; cost é para classificação
- B) Loss mede o erro de uma instância; cost, do training set inteiro
- C) Loss é um hiperparâmetro; cost é um parâmetro
- D) Não há diferença

<details><summary>Gabarito</summary>

**B.** ⚠️ (A) confunde com a escolha **MSE × cross-entropy**. (D) é tentadora porque
o curso às vezes usa os termos juntos, mas, quando distingue, é por **uma × todas**
as instâncias.
</details>

**5.** ⭐⭐ Para um problema de **regressão**, qual cost function o curso cita?
- A) Cross-entropy
- B) Softmax
- C) Mean Squared Error
- D) ReLU

<details><summary>Gabarito</summary>

**C.** **MSE**, em **linear regression**. ⚠️ (A) é para **classificação**; (B) e (D)
são **activation functions**, não cost functions.
</details>

**6.** ⭐⭐⭐ Qual destes é um **parâmetro**, e não um hiperparâmetro?
- A) Learning rate
- B) Número de epochs
- C) Weights
- D) Número de camadas

<details><summary>Gabarito</summary>

**C.** **Weights e biases** são aprendidos **pela máquina**. Os outros três são
decididos **por humanos antes** do treino.
</details>

**7.** ⭐⭐ O learning rate está **alto demais**. O que tende a acontecer?
- A) O treino demora demais
- B) O modelo quica de um lado ao outro e pode não convergir
- C) A cost function zera
- D) A backpropagation deixa de acontecer

<details><summary>Gabarito</summary>

**B.** *"Bounce from wall to wall or even bounce out of the curve entirely without
converging."* ⚠️ (A) é o sintoma do learning rate **baixo demais**.
</details>

**8.** ⭐⭐ No gradient descent, o que responde à pergunta **"para que direção
ir?"**
- A) O learning rate
- B) A derivada da cost function
- C) O número de epochs
- D) A activation function

<details><summary>Gabarito</summary>

**B.** Negativa → direita; positiva → esquerda. ⚠️ (A) responde a **outra**
pergunta: o **tamanho do passo**.
</details>

**9.** ⭐⭐ O que é um **epoch**?
- A) Um neurônio da camada oculta
- B) Uma passada completa do processo de treino, do passo 1 ao 6
- C) O valor mínimo da cost function
- D) O ajuste de um único weight

<details><summary>Gabarito</summary>

**B.** E é um **hiperparâmetro** — conecta com a 4.5, onde os epochs se definem no
**`fit`**.
</details>

**10.** ⚠️ Qual passo do aprendizado de uma rede neural a aula descreve como
**potencial**, ou seja, que nem sempre acontece?
- A) Weighted sum
- B) Activation function
- C) Backpropagation
- D) Iteration

<details><summary>Gabarito</summary>

**C.** Só se a diferença entre ŷ e y for **significativa** a rede volta para
ajustar weights e biases.
</details>

---
