---
title: "Google AI/ML — Módulo 2: Simulado"
aliases: ["simulado do Módulo 2 (Google AI/ML)"]
tags: [aula, trabalho]
type: note
area: trabalho
created: 2026-10-08
updated: 2026-10-08
status: evergreen
fonte: mista
confianca: media
papel: derivada
indexar: true
summary: Simulado de 30 questões no estilo da prova sobre o Módulo 2 (AI Foundations) da certificação Google, aulas 1.1 a 2.7, com gabarito comentado.
parte_de: "[[google-ai-ml-modulo-2-revisao]]"
related: ["[[google-ai-ml-modulo-2-glossario]]", "[[google-ai-ml-modulo-2-flashcards]]"]
---

# Google AI/ML — Módulo 2: Simulado

Material de estudo do Módulo 2 (AI Foundations) do curso [[curso-intro-ai-ml-google-cloud]], cobrindo aulas 1.1 a 2.7. Faz parte de [[google-ai-ml-modulo-2-revisao]]; os outros dois materiais do módulo são [[google-ai-ml-modulo-2-glossario]] e [[google-ai-ml-modulo-2-flashcards]].

**30 questões** no estilo do quiz 2.8, cobrindo as aulas 1.1 a 2.7. O gabarito
comentado está no fim — resista a olhar antes.

**Como fazer:** reserve 30 minutos, anote suas respostas numa folha, depois
confira. Abaixo de 24 acertos (80%), vale revisar o `glossario.md` antes de
tentar o quiz oficial.

> 💡 A **questão 1** é a que apareceu no quiz real do Leonardo — e é um bom
> termômetro do estilo: cenário curto, quatro produtos, um certo.

---

## Questões

**1.** Se você tem dados não estruturados, como imagens, texto e/ou áudio, qual
opção de armazenamento no Google Cloud você escolheria?
A) Spanner · B) Cloud SQL · C) Bigtable · D) Cloud Storage

**2.** Um enunciado se refere a "discriminative AI". A que ele está se
referindo?
A) IA generativa · B) IA agêntica · C) IA preditiva · D) IA multimodal

**3.** Qual é a hierarquia correta?
A) ML ⊃ IA ⊃ deep learning · B) IA ⊃ ML ⊃ deep learning · C) deep learning ⊃ IA
⊃ ML · D) IA ⊃ deep learning ⊃ ML

**4.** Um time precisa prever se um e-mail é spam ou não. Qual modelo?
A) Linear regression · B) Logistic regression · C) k-means clustering ·
D) Principal component analysis

**5.** Qual é o andar **base** da infraestrutura de IA do Google Cloud?
A) Compute e storage · B) Data and AI products · C) Networking and security ·
D) Agent Platform

**6.** Uma equipe quer rodar uma aplicação containerizada com benefícios de
orquestração, mantendo controle sobre os contêineres. Qual serviço?
A) Compute Engine · B) GKE · C) Cloud Run · D) Cloud Storage

**7.** Por que as TPUs são mais eficientes que CPUs e GPUs para ML?
A) Têm mais núcleos de propósito geral · B) São hardware *domain-specific*, com
arquitetura adaptada a operações como multiplicação de matrizes · C) Rodam
exclusivamente em Cloud Run · D) Dispensam storage

**8.** Quais destes são bancos **NoSQL**?
A) BigQuery e Spanner · B) Cloud SQL e AlloyDB · C) Bigtable e Firestore ·
D) Pub/Sub e Dataflow

**9.** Em qual camada do AI/ML Toolbox este curso se concentra?
A) AI infrastructure · B) AI development · C) AI applications and solutions ·
D) Nas três igualmente

**10.** Uma analista precisa consultar, com SQL, imagens e logs guardados no
Cloud Storage. É possível com o BigQuery?
A) Não — só aceita dados estruturados · B) Não — seria preciso migrar para
tabelas · C) Sim — criando uma external table · D) Sim — mas só para JSON

**11.** Coloque em ordem as três etapas do workflow data-to-AI.

**12.** Uma varejista quer prever quais clientes vão cancelar e, em seguida,
gerar um e-mail personalizado de retenção para cada um. Qual abordagem a aula
recomenda?
A) Só IA preditiva · B) Só IA generativa · C) Usar as duas: a saída da preditiva
alimenta o prompt da generativa · D) Nenhuma — é regra de negócio

**13.** Uma seguradora quer simplificar a cotação combinando idade, histórico de
infrações e tipo de carro em menos variáveis. Que tipo de problema é?
A) Clustering · B) Association · C) Dimensionality reduction · D) Regression

**14.** Coloque em ordem os comandos de um projeto de ML no BigQuery ML.

**15.** O que é one-hot encoding, e quem o executa no BigQuery ML?

**16.** Uma analista de marketing sem experiência em programação precisa
construir um modelo de classificação a partir da base de clientes da empresa.
Qual opção é a mais adequada?
A) Custom training · B) Agent Platform AutoML · C) Pre-trained APIs ·
D) BigQuery ML

**17.** Associe ao tipo de aprendizado: *(i)* task-driven · *(ii)* identifica um
padrão · *(iii)* dados rotulados · *(iv)* data-driven · *(v)* identifica uma
meta · *(vi)* dados não rotulados.

**18.** Uma equipe cogita partir direto para uma Deep Neural Network num projeto
de previsão de churn. O que a aula recomenda?
A) Sim — DNNs são sempre mais precisas · B) Começar com logistic ou linear
regression e usar como benchmark · C) Começar com k-means · D) Usar uma
pre-trained API

**19.** O que permite ao BigQuery escalar storage e compute de forma
independente?
A) O uso de TPUs · B) A rede interna de alta velocidade que conecta os dois
serviços · C) O comando `CREATE MODEL` · D) O one-hot encoding automático

**20.** No caso Coffee on Wheels, qual produto é responsável pela **aquisição de
dados** multimodais?
A) BigQuery · B) Looker · C) Gemini Multimodal · D) Agent Platform

**21.** Qual foundation model do Google gera **vídeo**?
A) Gemini · B) Imagen · C) Veo · D) Gemma

**22.** Qual afirmação descreve corretamente a Agent Platform?
A) Um data warehouse serverless · B) Uma plataforma end-to-end de
desenvolvimento de IA, do design ao deployment · C) Um conjunto de APIs
pré-treinadas · D) Uma ferramenta de BI

**23.** Após rodar `ML.PREDICT`, como se identifica a saída do modelo no
resultado?

**24.** Um varejista tem o histórico de compras e quer descobrir grupos de
comportamento semelhante, **sem** categorias pré-definidas. Qual a combinação?
A) Supervisionado · classificação · logistic regression · B) Supervisionado ·
regressão · linear regression · C) Não supervisionado · clustering · k-means ·
D) Não supervisionado · associação · Apriori

**25.** O que é MLOps, segundo o curso?

**26.** Em que ano a TPU foi introduzida?
A) 1998 · B) 2008 · C) 2016 · D) 2023

**27.** Qual é a diferença central entre IA generativa e IA agêntica?
A) A generativa roda na nuvem · B) A generativa é multimodal, a agêntica só texto
· C) A generativa cria conteúdo; a agêntica cria conteúdo **e executa ações** ·
D) A generativa exige código

**28.** Qual opção de desenvolvimento o curso classifica como **low-code**?
A) Agent Platform AutoML · B) Pre-trained APIs · C) Custom training ·
D) Gemini Enterprise app

**29.** Uma equipe de dados quer analisar o sentimento de milhares de avaliações
em texto livre, sem treinar nenhum modelo próprio. Qual opção é a mais direta?
A) Agent Platform AutoML · B) BigQuery ML · C) Pre-trained API (Natural
Language) · D) Custom training

**30.** Dois analistas usam **o mesmo conjunto de dados** de clientes. Um quer
prever o gasto futuro; o outro quer descobrir segmentos. São do mesmo tipo de
aprendizado? Justifique.

---

## Gabarito comentado

**1. D — Cloud Storage.** Dado não estruturado (imagens, texto, áudio) vai para
armazenamento de **objetos**. As outras três são bancos de dados, que pressupõem
estrutura. ⚠️ **Bigtable é o distrator**: é NoSQL, mas NoSQL ≠ não estruturado —
ele guarda linhas com chave e colunas, dado estruturado em escala.

**2. C — IA preditiva.** Os três nomes são equivalentes: *predictive AI*,
*traditional AI* e *discriminative AI*.

**3. B — IA ⊃ ML ⊃ deep learning.** A IA é o termo-guarda-chuva; os LLMs (e a
GenAI) ficam dentro de deep learning.

**4. B — logistic regression.** "Spam ou não" é **categórico**, logo
**classificação**. (A) é a pegadinha: "regression" aparece nos dois nomes, mas a
**linear** prevê **números**.

**5. C — networking and security.** Compute e storage ficam no meio; data and AI
products no topo. A Agent Platform não é andar da infraestrutura — é a camada de
desenvolvimento da arquitetura maior.

**6. B — GKE.** Descrito como "controle sobre apps containerizados com os
benefícios da orquestração". (A) é controle de máquina, (C) é serverless.

**7. B.** O contraste é **domain-specific** (TPU) × **general-purpose** (CPU e
GPU), com **multiplicação de matrizes** como exemplo. (A) inverte o conceito.

**8. C — Bigtable e Firestore.** (A) e (B) são SQL; (D) são ferramentas de
ingestão. Cuidado com **Bigtable** (NoSQL) × **BigQuery** (SQL).

**9. B — AI development**, a segunda camada. A aula 2.7 é explícita: *"this
course focuses on the second layer."*

**10. C — external table.** O BigQuery *"can even query unstructured data (…) by
creating an external table."* (A) é a pegadinha mais comum do módulo.

**11. Ingest and process → store and analyze → activate with AI.**

**12. C.** *"There's no clear line between these two"* — o padrão recomendado é
usar a **saída do modelo preditivo como parte do prompt do generativo**. É o
exemplo de churn da própria aula 2.2.

**13. C — dimensionality reduction.** Reduzir dimensões/features para melhorar a
**eficiência** do modelo, via **PCA**. É o exemplo literal da aula.

**14. `CREATE MODEL` → `ML.EVALUATE` → `ML.PREDICT`.** As duas fases anteriores
(ETL e pré-processamento) são SQL comum, não comandos `ML.*`.

**15.** Converte dados **categóricos em numéricos**, formato **exigido pelo
modelo de treino**. No BigQuery ML, **a própria ferramenta faz** isso
automaticamente (fase 2).

**16. B — Agent Platform AutoML.** É a opção **no-code** que treina um modelo com
os **dados próprios** da empresa. (A) e (D) exigem código; (C) usaria um modelo
pronto do Google, que não conhece a base dela.

**17. Supervisionado:** (i), (iii), (v). **Não supervisionado:** (ii), (iv),
(vi).

**18. B.** Recomendação explícita: **começar simples** e usar o resultado como
**benchmark**; DNNs exigem mais tempo e recursos.

**19. B — a rede interna de alta velocidade.** O BigQuery é **storage + engine
SQL** ligados por ela, e é ela que viabiliza o escalonamento independente.

**20. C — Gemini Multimodal.** O mapa da aula 2.1: Gemini Multimodal = aquisição
de dados · BigQuery = análise · Agent Platform = desenvolvimento de ML · AI
agents/Looker = executar e visualizar.

**21. C — Veo.** Mnemônico: **V**eo = **v**ídeo · **Imagen** = **imagem**.

**22. B.** *"An end-to-end AI development platform"* que guia *"from design to
deployment."* (A) é o BigQuery, (D) é o Looker, (C) são as pre-trained APIs.

**23.** O campo do **label** aparece com **`predicted` acrescentado ao nome do
campo**. O comando retorna também a **confiança** do modelo.

**24. C.** Não há rótulo de grupo → **não supervisionado**; descobrir grupos →
**clustering**; modelo **k-means**. (D) erraria o tipo: associação busca relação
**entre itens**.

**25.** *Machine Learning Operations* — leva o **experimento de ML à produção** e
ajuda a **implantar, monitorar e gerenciar** os modelos. O BigQuery ML o suporta.

**26. C — 2016.** (1998 = fundação do Google; 2008 = lançamento do Google Cloud.)

**27. C.** A aula define o agente como "um assistente totalmente autônomo que
gera conteúdo **e toma ações** por você".

**28. B — Pre-trained APIs.** (A) e (D) são **no-code**; (C) é **code-based**.

**29. C — Pre-trained API.** Análise de sentimento é tarefa genérica já resolvida
pelo Google; basta chamar a API. É o lab 4.7 do curso.

**30. Não.** Prever o gasto futuro é **supervisionado** (há rótulo: o valor já
gasto) e de **regressão** (→ *linear regression*). Descobrir segmentos é **não
supervisionado** (nenhum cliente vem rotulado com seu segmento) e de
**clustering** (→ *k-means*). O que define o tipo **não é o dado, é a pergunta**
— se existe rótulo para o que se quer prever.

---

## Onde você provavelmente vai errar

Pelo desenho das questões, os quatro tropeços mais prováveis:

1. **Logistic regression** (questões 4, 16) — o nome engana.
2. **Bigtable × BigQuery** (questões 1, 8) — nomes parecidos, famílias
   diferentes.
3. **BigQuery com dado não estruturado** (questões 1, 10) — ele *armazena* não,
   mas *consulta* sim, via external table.
4. **A escada no-code / low-code / code-based** (questões 16, 28, 29) — três
   níveis, e o Gemini Enterprise app e o AutoML dividem o mesmo degrau.

