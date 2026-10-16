---
title: "Google AI/ML — Módulo 4: Flashcards"
aliases: ["flashcards do Módulo 4 (Google AI/ML)"]
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
summary: Deck de flashcards do Módulo 4 (Opções de desenvolvimento) da certificação Google, aulas 4.1 a 4.8, em blocos temáticos de 10 a 15 minutos para revisão espaçada.
parte_de: "[[google-ai-ml-modulo-4-revisao]]"
related: ["[[google-ai-ml-modulo-4-glossario]]", "[[google-ai-ml-modulo-4-simulado]]"]
---

# Google AI/ML — Módulo 4: Flashcards

Material de estudo do Módulo 4 (Opções de desenvolvimento) do curso [[curso-intro-ai-ml-google-cloud]], cobrindo aulas 4.1 a 4.8. Faz parte de [[google-ai-ml-modulo-4-revisao]]; os outros dois materiais do módulo são [[google-ai-ml-modulo-4-glossario]] e [[google-ai-ml-modulo-4-simulado]].

110 cartões das aulas **4.1 a 4.8**, em **seis blocos temáticos**. Cada bloco é
uma sessão de 10–15 minutos.

**Como usar:** cubra a coluna da direita, responda em voz alta, confira. Marque o
que errou e repita só esses no dia seguinte.

⚠️ **Este é o módulo mais denso em listas numeradas do curso** — há **três listas
de quatro etapas**, **quatro camadas de TensorFlow**, **cinco métodos de API** e
**duas tríades de API diferentes**. O bloco 1 e o bloco 6 são os que separam
quem decorou de quem entendeu; comece por eles se o tempo for curto.

---

## Bloco 1 — A tabela comparativa e o guia de decisão (20 cartões)

| Pergunta | Resposta |
|---|---|
| ⭐⭐ Quais as **quatro opções** de desenvolvimento? | **Pre-trained APIs · BigQuery ML · Agent Platform AutoML · Custom training** |
| ⭐ Qual opção processa **áudio**? | **Só as pre-trained APIs** |
| ⭐ Tipos de dado do **BigQuery ML** | **Tabular** e **semi-estruturado (JSON)** — e só |
| Tipos de dado do **AutoML** | **Tabular e imagem** |
| Tipos das **pre-trained APIs** e do **custom training** | Tabular, imagem, texto, vídeo (+ **áudio** nas APIs) |
| Qual exige **zero** dados de treino? | **Pre-trained APIs** |
| Quais exigem **grande volume**? | **BigQuery ML** e **custom training** |
| ⭐ Quanto é "grande volume"? | **Centenas de milhares de registros**, de **alta qualidade** |
| ⭐⭐ Em quais **você** pode tunar hiperparâmetros? | **BigQuery ML** e **custom training** |
| ⭐⭐ E o AutoML tuna? | **Sim — automaticamente**, via neural architecture search. Você é que não tuna |
| Qual exige a **maior** expertise? | **Custom training** |
| Qual leva o **maior tempo** de treino, e por quê? | **Custom training** — constrói o modelo **do zero** |
| Qual leva **tempo zero**? | **Pre-trained APIs** |
| Os **três fatores de escolha** | **necessidade de negócio · expertise em ML · orçamento** |
| Cenário: pouca experiência, sem intenção de treinar | **Pre-trained APIs** |
| Cenário: conhece SQL, dados já no BigQuery | **BigQuery ML** |
| Cenário: dados próprios, mínimo de código | **Agent Platform AutoML** |
| Cenário: controle total do workflow | **Custom training** |
| ⭐ Qual o nível do **BigQuery ML**, e por quê? | **Code-based** — porque exige **SQL** |
| ⚠️ As opções servem só à IA preditiva? | **Não** — a **gen AI e à predictive AI** |

## Bloco 2 — A Agent Platform e os quatro Ss (18 cartões)

| Pergunta | Resposta |
|---|---|
| Como o curso define a **Agent Platform**? | *"Google's unified AI **development** platform"* (4.1, 4.2) ou *"unified **AI** platform"* (4.8) |
| Os dois apelidos | **Playground** (4.2) e **ultimate workspace** (4.8) |
| ⭐ Os **dois sentidos** de "unificada" | 1) um **pipeline de ML end-to-end** · 2) abrange **gen AI e predictive AI** |
| ⭐⭐ Os **quatro estágios** do pipeline | **data readiness → feature readiness → training e hyperparameter tuning → deployment e model monitoring** |
| De onde se sobem dados no estágio 1? | **Cloud Storage**, **BigQuery** ou **máquina local** |
| ⭐ O que é uma **feature**? | Os **dados processados** que vão entrar no modelo |
| ⚠️ Feature é dado bruto? | **Não** — dado bruto é o estágio 1; feature é o estágio 2, já **processado** |
| Para que serve o **feature store**? | **Compartilhar features** com outras pessoas |
| Para onde o estágio 4 aponta? | Para o **MLOps**, aula **5.5** |
| Ferramentas de **gen AI** na Agent Platform | **Agent Studio** e **ADK** |
| Ferramentas de **predictive AI** | **AutoML** e **custom training** |
| ⭐⭐ Os **quatro Ss** | **Seamless · Scalable · Sustainable · Speedy** |
| **Seamless** significa | Experiência fluida **do upload dos dados até a produção** |
| **Scalable** significa | O **MLOps** escala **armazenamento e computação automaticamente** |
| ⚠️ **Sustainable** significa | **Artifacts e features reusados e compartilhados** — **não** é meio ambiente nem custo |
| ⚠️ **Speedy** significa | **Menos linhas de código** que os concorrentes — **não** é velocidade de inferência |
| Os desafios de **produção** | **escalabilidade · monitoramento · integração, entrega e treinamento contínuos** |
| ⭐ O dado do **Gartner** | **Só metade** dos projetos de ML **empresariais** passa da **fase piloto** |

## Bloco 3 — O AutoML por dentro (20 cartões)

| Pergunta | Resposta |
|---|---|
| O que **AutoML** significa? | ***Automated machine learning*** |
| Qual o objetivo? | Automatizar **desenvolver e implantar** um modelo de ML |
| O que é repetitivo em construir modelos? | Adicionar **dados e features**, testar **modelos**, **tunar parâmetros** |
| ⭐ Quando o AutoML foi anunciado? | **Janeiro de 2018** — a única data do curso com mês |
| Qual era o objetivo em 2018? | Poupar o **trabalho manual** e automatizar **do pré-processamento ao treinamento e implantação** |
| ⭐ O que aconteceu em **2021**? | AutoML **embutido no Vertex AI** — *"now Agent Platform"* |
| ⭐⭐ As **quatro fases** do AutoML | **data processing → searching models and tuning → assembling → prediction** |
| Os seis tipos que a fase 1 converte | **numbers · datetime · text · categories · arrays of categories · nested fields** |
| ⚠️ A fase 1 automatiza **todo** o preparo? | **Não** — *"**part of** the data preparation process"* |
| As **duas tecnologias** da fase 2 | **Neural architecture search** e **transfer learning** |
| ⭐ O que faz o **neural architecture search**? | **Testa arquiteturas e modelos**, **compara performance**, **tuna parâmetros automaticamente** |
| ⭐ O que faz o **transfer learning**? | **Acelera a busca** usando **modelos pré-treinados** |
| A analogia do transfer learning | ML é como o **aprendizado humano**: aprende o novo **a partir do conhecimento existente** |
| O exemplo típico | Os **LLMs** — pré-treinados para fins gerais, fine-tuned para fins específicos |
| Os quatro problemas gerais de linguagem | **text classification · question answering · document summarization · text generation** |
| Para que áreas os LLMs são adaptados? | **Retail · finance · entertainment**, com **datasets pequenos** |
| ⭐ Os três ganhos do transfer learning | **Maior acurácia** · **muito menos dados** · **muito menos tempo** |
| Por quê? | Porque o modelo **não precisa aprender do zero** |
| ⭐⭐ O AutoML usa **um** modelo? | **Não** — os **top N**, tipicamente **~10**, conforme o **training budget** |
| Como são combinados, e por quê? | Pode ser **simples média** das previsões; **melhora muito a acurácia** |

## Bloco 4 — Custom training, containers e TensorFlow (24 cartões)

| Pergunta | Resposta |
|---|---|
| Qual o rótulo do **custom training**? | **Code-based**, abordagem **do-it-yourself** |
| ⭐ Sobre o que ele dá **controle total**? | **Model architecture · frameworks · training logic** |
| Quando você precisa dele? | Quando as necessidades **vão além das capacidades automatizadas do AutoML** |
| ⭐ Qual a **primeira** decisão, antes do código? | **Qual ambiente**: **pre-built** ou **custom container** |
| A analogia do **pre-built** | Uma **cozinha mobiliada** — armários, eletrodomésticos, panelas |
| A analogia do **custom** | Uma **sala vazia** — você define os aparelhos |
| ⭐ Quando escolher **pre-built**? | Se precisa de **Python, TensorFlow ou PyTorch** **E** **não é exigente** com a infraestrutura |
| ⭐ O que define um **custom container**? | **Environment · machine type · disks** |
| O que é o **Workbench**? | Um **Jupyter notebook** num **único ambiente de desenvolvimento** |
| Que workflow ele suporta? | **Explorar → treinar → implantar** |
| ⭐ Qual o recurso conveniente do Workbench? | **Escrever SQL** para conectar **BigQuery ↔ Agent Platform** |
| O que é o **Colab Enterprise**? | Notebook **integrado** à Agent Platform, ambiente **familiar** |
| ⭐ O que é uma **ML library**? | **Coleção de código pré-escrito** para tarefas de ML |
| As três bibliotecas populares | **TensorFlow · scikit-learn · PyTorch** |
| O que elas têm em comum? | São **open source**, com **grande comunidade** |
| O que é o **TensorFlow**? | **Plataforma aberta end-to-end** de ML **apoiada pelo Google** |
| Como suas APIs se arranjam? | **Hierarquicamente** — high-level **construídas sobre** low-level |
| ⭐⭐ As **quatro camadas**, de baixo para cima | **hardware → low-level APIs → model libraries → high-level APIs (Keras)** |
| ⚠️ Qual é a camada **mais baixa**? | **Hardware** — **CPU, GPU e TPU**. Não é código |
| O que se faz nas **low-level APIs**? | Operações em **C++**; funções **core, basic e numeric** em **Python** |
| ⚠️ A camada 3 são APIs? | **Não** — são **model libraries**: **camadas de rede neural** e **métricas de avaliação** |
| O que o **Keras** faz, e em que camada está? | **Esconde os detalhes** e **implanta o treinamento automaticamente**; camada **4**, a mais alta |
| ⭐ Até onde a Agent Platform hospeda o TensorFlow? | **De low-level a high-level** — **serviço gerenciado em qualquer nível** |
| O que é o **JAX**? | **Biblioteca de computação numérica de alta performance**, **flexível e fácil**; **pesquisa e produção** |

## Bloco 5 — tf.keras, APIs e a Natural Language API (26 cartões)

| Pergunta | Resposta |
|---|---|
| ⭐⭐ Os **três passos** do tf.keras | **create → compile → train (fit)** |
| O que se faz no **create**? | **Juntar as camadas** da rede neural — `tf.keras.Sequential` |
| ⭐⭐ Onde se definem os **hiperparâmetros**? | No **`compile`** |
| O que a **loss function** faz? | **Mede a performance** |
| O que o **optimizer** faz? | **Otimiza o treinamento** |
| O que se define no **`fit`**? | **Input**, **output** e **epochs** |
| O que são **epochs**? | O **número de iterações** de treinamento |
| O que vem depois dos três passos? | **Implantar** o modelo e **fazer previsões** |
| O que **API** significa? | ***Application programming interface*** |
| O que uma API define? | **Como componentes de software se comunicam** |
| ⭐ A tríade da **tomada elétrica** (4.4) | **qual API · quais parâmetros · em que formato** |
| ⭐ A tríade do **sanduíche** (4.6) | **features** (menu) · **input** (pedido) · **output** (sanduíche) |
| O que **SDK** significa? | ***Software development kit*** — o **cliente** que embala a chamada |
| Quem define as APIs e fornece os SDKs? | Os **vendors** do produto ou serviço |
| ⭐ Os **quatro passos** do código com o SDK do Gemini | **autenticar → especificar o modelo → chamar → receber** |
| Para que serve a **API key**? | **Autenticar a sessão** e **conceder permissão**; é **única** |
| O que **cURL** significa, e o que faz? | ***Client URL*** — **linha de comando** para **transferir dados entre cliente e servidor** |
| ⭐ Por que as Gemini APIs substituem muitas APIs específicas? | Porque são **multitask e multimodal** |
| Os três verbos da suíte de **agentes** | **discovering · building · deploying** |
| Os três verbos das **ML APIs** | **train · monitor · tune** |
| Quais as **outras APIs**? | **speech · image · document · conversation** |
| ⭐ As **quatro features** da Natural Language API | **entities · sentiment · syntax · categories** |
| ⭐⭐ Quantos **métodos** ela tem, e por quê? | **Cinco** — o **sentiment** tem dois, porque opera em **dois níveis** |
| ⭐⭐ `analyzeSentiment` × `analyzeEntitySentiment` | **Texto inteiro** × **cada entidade/sujeito** |
| ⭐ Os **quatro campos** da requisição JSON | **type · language · content · encodingType** |
| ⚠️ O que o campo **content** aceita? | **O texto em si** **ou** a **localização do arquivo no Cloud Storage** |

## Bloco 6 — As variações e armadilhas do módulo (12 cartões)

> ⚠️ **Este é o bloco decisivo.** Todos estes cartões existem porque o módulo
> **diz a mesma coisa de maneiras diferentes** em aulas diferentes.

| Pergunta | Resposta |
|---|---|
| ⭐⭐⭐ O **AutoML** é no-code ou low-code? | **No-code** é a resposta de prova — mas o curso usa **três rótulos**: no-code (1.1, 4.2, 4.3, 4.5) · "no-to-low-code" (4.1, 4.4) · "low- or no-code" (4.8) |
| O que **nunca** é certo sobre o AutoML? | Chamá-lo de **code-based** — isso é o **custom training** |
| ⭐⭐⭐ Quais as **três listas de quatro etapas** do módulo? | **Pipeline da Agent Platform** (4.2) · **fases do AutoML** (4.3) · **pipeline que o AutoML automatiza** (4.3) |
| Qual é o **pipeline da Agent Platform**? | data readiness → feature readiness → training e hyperparameter tuning → deployment e model monitoring |
| Quais são as **fases do AutoML**? | data processing → searching models and tuning → assembling → prediction |
| Qual é o **pipeline que o AutoML automatiza**? | feature engineering → architecture search → hyperparameter tuning → model ensemble |
| ⚠️ Qual a diferença entre as duas listas da 4.3? | As **fases** descrevem o **fluxo**; o **pipeline** descreve as **técnicas** |
| ⭐ Quantas **personas** o módulo lista? | **Três** na 4.1 · **quatro** na 4.8 (acrescenta o **developer**) |
| ⚠️ O que o AutoML automatiza até onde? | **Deployment** na 4.3 · **serving** na 4.8 — *serving* reaparece na aula **5.4** |
| ⭐⭐ Quais "ferramentas versáteis" a 4.8 cita para custom training? | **Python · JAX · Workbench** — ⚠️ **sem TensorFlow** |
| E se a questão pedir **bibliotecas de ML**? | A resposta é a da 4.5: **TensorFlow · scikit-learn · PyTorch** |
| ⭐ UI × código, para que serve cada um? | UI = **demonstrar e testar** · código = **produção** |


## Fontes
- Notas de aula do Módulo 4 (resumos `R - ` em `50-aulas/intro-ai-ml-google-cloud/`), consolidadas no projeto Claude "Certificação Google" em 2026-10-09
