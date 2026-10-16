---
title: "PMLE — Questões da seção 4: Servir e escalar modelos"
aliases: ["questões PMLE seção 4"]
tags: [aula, trabalho]
type: note
area: trabalho
created: 2026-10-16
updated: 2026-10-16
status: evergreen
fonte: documento
confianca: media
papel: derivada
indexar: true
summary: "41 questões de prática do exame Professional ML Engineer na seção 4 do guia (Servir e escalar modelos, 20% da prova), com gabarito revisado e explicação em português."
parte_de: "[[pmle-banco-de-questoes]]"
related: ["[[pmle-guia-do-exame]]"]
---

# PMLE — Questões da seção 4: Servir e escalar modelos

Seção 4 do guia oficial · **20% da prova** · 41 questões. Faz parte do [[pmle-banco-de-questoes|banco de questões]]. As questões estão em inglês, como na prova; a resposta fica fechada no bloco verde (no Obsidian, clique para abrir).

| Subseção | Questões |
|---|---|
| 4.1 Servir modelos | 24 |
| 4.2 Escalar o serving online | 17 |

## 4.1 Servir modelos

#### Q22 · 4.1 · curso 5 · difícil

You trained a text classification model. You have the following SignatureDefs: [a imagem com os SignatureDefs não veio no arquivo; nela, o input tem shape (-1, 2)] You started a TensorFlow-serving component server and tried to send an HTTP request to get a prediction using: headers = {"content-type": "application/json"} json_response = requests.post('http://localhost:8501/v1/models/text_model:predict', data=data, headers=headers) What is the correct way to write the predict request?

- **A.** `data = json.dumps({"signature_name": "seving_default", "instances": [['ab', 'bc', 'cd']]})`
- **B.** `data = json.dumps({"signature_name": "serving_default", "instances": [['a', 'b', 'c', 'd', 'e', 'f']]})`
- **C.** `data = json.dumps({"signature_name": "serving_default", "instances": [['a', 'b', 'c'], ['d', 'e', 'f']]})`
- **D.** `data = json.dumps({"signature_name": "serving_default", "instances": [['a', 'b'], ['c', 'd'], ['e', 'f']]})`

> [!success]- Resposta: **D**
> Pelo SignatureDef da questão, o input espera shape (-1, 2), ou seja, cada instância é uma lista com dois elementos, como em D. As outras opções enviam instâncias com 3 ou 6 elementos ou um nome de assinatura errado ("seving_default" em A).
> *Conceitos:* TensorFlow Serving, SignatureDef, REST predict

#### Q38 · 4.1 · curso 3 · média

You have trained a text classification model in TensorFlow using AI Platform. You want to use the trained model for batch predictions on text data stored in BigQuery while minimizing computational overhead. What should you do?

- **A.** Export the model to BigQuery ML.
- **B.** Deploy and version the model on AI Platform.
- **C.** Use Dataflow with the SavedModel to read the data from BigQuery.
- **D.** Submit a batch prediction job on AI Platform that points to the model location in Cloud Storage.

> [!success]- Resposta: **A**
> Importar o SavedModel no BigQuery ML permite rodar ML.PREDICT direto sobre os dados no BigQuery, sem mover dados nem subir infraestrutura. Batch prediction no AI Platform (D) é tentadora, mas exige exportar os dados e mais overhead.
> *Conceitos:* BigQuery ML, TensorFlow import, batch prediction
> *Nome atual:* AI Platform hoje é Vertex AI.

#### Q41 · 4.1 · curso 5 · fácil

Your team is building an application for a global bank that will be used by millions of customers. You built a forecasting model that predicts customers' account balances 3 days in the future. Your team will use the results in a new feature that will notify users when their account balance is likely to drop below $25. How should you serve your predictions?

- **A.** 1. Create a Pub/Sub topic for each user. 2. Deploy a Cloud Function that sends a notification when your model predicts that a user's account balance will drop below the $25 threshold.
- **B.** 1. Create a Pub/Sub topic for each user. 2. Deploy an application on the App Engine standard environment that sends a notification when your model predicts that a user's account balance will drop below the $25 threshold.
- **C.** 1. Build a notification system on Firebase. 2. Register each user with a user ID on the Firebase Cloud Messaging server, which sends a notification when the average of all account balance predictions drops below the $25 threshold.
- **D.** 1. Build a notification system on Firebase. 2. Register each user with a user ID on the Firebase Cloud Messaging server, which sends a notification when your model predicts that a user's account balance will drop below the $25 threshold.

> [!success]- Resposta: **D**
> Firebase Cloud Messaging é feito para notificações push a milhões de usuários, disparadas pela previsão individual de cada cliente. Criar um tópico Pub/Sub por usuário (A, B) não escala, e C usa a média de todos os usuários, o que não faz sentido.
> *Conceitos:* Firebase Cloud Messaging, notifications, serving

#### Q46 · 4.1 · curso 5 · fácil

As the lead ML Engineer for your company, you are responsible for building ML models to digitize scanned customer forms. You have developed a TensorFlow model that converts the scanned images into text and stores them in Cloud Storage. You need to use your ML model on the aggregated data collected at the end of each day with minimal manual intervention. What should you do?

- **A.** Use the batch prediction functionality of AI Platform.
- **B.** Create a serving pipeline in Compute Engine for prediction.
- **C.** Use Cloud Functions for prediction each time a new data point is ingested.
- **D.** Deploy the model on AI Platform and create a version of it for online inference.

> [!success]- Resposta: **A**
> Dados agregados ao fim do dia pedem batch prediction gerenciada, com mínima intervenção manual. Online prediction (D) ou Cloud Functions por ponto (C) são tentadoras, mas têm custo e complexidade desnecessários para esse padrão.
> *Conceitos:* batch prediction, managed service
> *Nome atual:* AI Platform batch prediction hoje é Vertex AI batch prediction.

#### Q77 · 4.1 · curso 3 · fácil

You need to execute a batch prediction on 100 million records in a BigQuery table with a custom TensorFlow DNN regressor model, and then store the predicted results in a BigQuery table. You want to minimize the effort required to build this inference pipeline. What should you do?

- **A.** Import the TensorFlow model with BigQuery ML, and run the ml.predict function.
- **B.** Use the TensorFlow BigQuery reader to load the data, and use the BigQuery API to write the results to BigQuery.
- **C.** Create a Dataflow pipeline to convert the data in BigQuery to TFRecords. Run a batch inference on Vertex AI Prediction, and write the results to BigQuery.
- **D.** Load the TensorFlow SavedModel in a Dataflow pipeline. Use the BigQuery I/O connector with a custom function to perform the inference within the pipeline, and write the results to BigQuery

> [!success]- Resposta: **A**
> Importar o SavedModel do TensorFlow no BigQuery ML e usar ML.PREDICT faz a inferência direto sobre a tabela e grava o resultado em BigQuery, com mínimo esforço. Pipelines com Dataflow ou Vertex AI batch prediction (C, D) funcionam, mas exigem mais código e movimentação de dados.
> *Conceitos:* BigQuery ML, ML.PREDICT, batch prediction

#### Q83 · 4.1 · curso 5 · média

You need to design an architecture that serves asynchronous predictions to determine whether a particular mission-critical machine part will fail. Your system collects data from multiple sensors from the machine. You want to build a model that will predict a failure in the next N minutes, given the average of each sensor’s data from the past 12 hours. How should you design the architecture?

- **A.** 1. HTTP requests are sent by the sensors to your ML model, which is deployed as a microservice and exposes a REST API for prediction 2. Your application queries a Vertex AI endpoint where you deployed your model. 3. Responses are received by the caller application as soon as the model produces the prediction.
- **B.** 1. Events are sent by the sensors to Pub/Sub, consumed in real time, and processed by a Dataflow stream processing pipeline. 2. The pipeline invokes the model for prediction and sends the predictions to another Pub/Sub topic. 3. Pub/Sub messages containing predictions are then consumed by a downstream system for monitoring.
- **C.** 1. Export your data to Cloud Storage using Dataflow. 2. Submit a Vertex AI batch prediction job that uses your trained model in Cloud Storage to perform scoring on the preprocessed data. 3. Export the batch prediction job outputs from Cloud Storage and import them into Cloud SQL.
- **D.** 1. Export the data to Cloud Storage using the BigQuery command-line tool 2. Submit a Vertex AI batch prediction job that uses your trained model in Cloud Storage to perform scoring on the preprocessed data. 3. Export the batch prediction job outputs from Cloud Storage and import them into BigQuery.

> [!success]- Resposta: **B**
> Predições assíncronas a partir de dados contínuos de sensores pedem Pub/Sub mais Dataflow streaming, que calcula as médias por janela, chama o modelo e publica os resultados em outro tópico. A opção A é síncrona; as opções C e D são batch e não atendem a falhas nos próximos N minutos.
> *Conceitos:* Pub/Sub, Dataflow streaming, predição assíncrona

#### Q105 · 4.1 · curso 3 · média

You work for a gaming company that develops massively multiplayer online (MMO) games. You built a TensorFlow model that predicts whether players will make in-app purchases of more than $10 in the next two weeks. The model’s predictions will be used to adapt each user’s game experience. User data is stored in BigQuery. How should you serve your model while optimizing cost, user experience, and ease of management?

- **A.** Import the model into BigQuery ML. Make predictions using batch reading data from BigQuery, and push the data to Cloud SQL
- **B.** Deploy the model to Vertex AI Prediction. Make predictions using batch reading data from Cloud Bigtable, and push the data to Cloud SQL.
- **C.** Embed the model in the mobile application. Make predictions after every in-app purchase event is published in Pub/Sub, and push the data to Cloud SQL.
- **D.** Embed the model in the streaming Dataflow pipeline. Make predictions after every in-app purchase event is published in Pub/Sub, and push the data to Cloud SQL.

> [!success]- Resposta: **A**
> Como as compras são previstas para as próximas duas semanas, batch prediction é suficiente: importar o modelo TensorFlow no BigQuery ML e prever onde os dados já estão é o mais barato e simples, publicando os resultados no Cloud SQL para o jogo consumir. Embutir no Dataflow streaming (D) é tentador, mas é mais caro e complexo sem necessidade de tempo real.
> *Conceitos:* BigQuery ML, batch prediction, TensorFlow import

#### Q138 · 4.1 · curso 5 · difícil

You work for a company that manages a ticketing platform for a large chain of cinemas. Customers use a mobile app to search for movies they’re interested in and purchase tickets in the app. Ticket purchase requests are sent to Pub/Sub and are processed with a Dataflow streaming pipeline configured to conduct the following steps: 1. Check for availability of the movie tickets at the selected cinema. 2. Assign the ticket price and accept payment. 3. Reserve the tickets at the selected cinema. 4. Send successful purchases to your database. Each step in this process has low latency requirements (less than 50 milliseconds). You have developed a logistic regression model with BigQuery ML that predicts whether offering a promo code for free popcorn increases the chance of a ticket purchase, and this prediction should be added to the ticket purchase process. You want to identify the simplest way to deploy this model to production while adding minimal latency. What should you do?

- **A.** Run batch inference with BigQuery ML every five minutes on each new set of tickets issued.
- **B.** Export your model in TensorFlow format, and add a tfx_bsl.public.beam.RunInference step to the Dataflow pipeline.
- **C.** Export your model in TensorFlow format, deploy it on Vertex AI, and query the prediction endpoint from your streaming pipeline.
- **D.** Convert your model with TensorFlow Lite (TFLite), and add it to the mobile app so that the promo code and the incoming request arrive together in Pub/Sub.

> [!success]- Resposta: **D**
> Converter o modelo para TFLite e rodá-lo no app faz a predição antes da requisição chegar ao Pub/Sub, então não adiciona latência a nenhum passo do pipeline de 50 ms. RunInference no Dataflow (B) é tentador, mas adiciona uma etapa de inferência no caminho crítico; o endpoint do Vertex AI (C) adiciona latência de rede e batch a cada cinco minutos (A) não é em tempo real.
> *Conceitos:* TFLite, on-device inference, baixa latência

#### Q143 · 4.1 · curso 6 · fácil

You have developed an ML model to detect the sentiment of users’ posts on your company's social media page to identify outages or bugs. You are using Dataflow to provide real-time predictions on data ingested from Pub/Sub. You plan to have multiple training iterations for your model and keep the latest two versions live after every run. You want to split the traffic between the versions in an 80:20 ratio, with the newest model getting the majority of the traffic. You want to keep the pipeline as simple as possible, with minimal management required. What should you do?

- **A.** Deploy the models to a Vertex AI endpoint using the traffic-split=0=80, PREVIOUS_MODEL_ID=20 configuration.
- **B.** Wrap the models inside an App Engine application using the --splits PREVIOUS_VERSION=0.2, NEW_VERSION=0.8 configuration
- **C.** Wrap the models inside a Cloud Run container using the REVISION1=20, REVISION2=80 revision configuration.
- **D.** Implement random splitting in Dataflow using beam.Partition() with a partition function calling a Vertex AI endpoint.

> [!success]- Resposta: **A**
> Um Vertex AI endpoint aceita vários modelos com traffic split nativo (o modelo recém-implantado, ID 0, com 80%, e o anterior com 20%), totalmente gerenciado. App Engine ou Cloud Run (B, C) são tentadores por terem splitting de revisões, mas exigem empacotar modelos e servir manualmente; particionar no Dataflow (D) adiciona lógica customizada.
> *Conceitos:* Vertex AI endpoint, traffic split, canary

#### Q175 · 4.1 · curso 5 · média

You have recently trained a scikit-learn model that you plan to deploy on Vertex AI. This model will support both online and batch prediction. You need to preprocess input data for model inference. You want to package the model for deployment while minimizing additional code. What should you do?

- **A.** 1. Upload your model to the Vertex AI Model Registry by using a prebuilt scikit-ieam prediction container. 2. Deploy your model to Vertex AI Endpoints, and create a Vertex AI batch prediction job that uses the instanceConfig.instanceType setting to transform your input data.
- **B.** 1. Wrap your model in a custom prediction routine (CPR). and build a container image from the CPR local model. 2. Upload your scikit learn model container to Vertex AI Model Registry. 3. Deploy your model to Vertex AI Endpoints, and create a Vertex AI batch prediction job
- **C.** 1. Create a custom container for your scikit learn model. 2. Define a custom serving function for your model. 3. Upload your model and custom container to Vertex AI Model Registry. 4. Deploy your model to Vertex AI Endpoints, and create a Vertex AI batch prediction job.
- **D.** 1. Create a custom container for your scikit learn model. 2. Upload your model and custom container to Vertex AI Model Registry. 3. Deploy your model to Vertex AI Endpoints, and create a Vertex AI batch prediction job that uses the instanceConfig.instanceType setting to transform your input data.

> [!success]- Resposta: **B**
> Custom prediction routines (CPR) permitem adicionar pré-processamento a um modelo scikit-learn com pouco código e geram o container automaticamente, servindo online e batch. Custom container do zero (C, D) exige mais código, e instanceConfig.instanceType (A) só muda o formato da instância, não faz pré-processamento arbitrário.
> *Conceitos:* custom prediction routine, Model Registry, preprocessing

#### Q176 · 4.1 · curso 5 · fácil

You have developed an ML model to detect the sentiment of users’ posts on your company's social media page to identify outages or bugs. You are using Dataflow to provide real-time predictions on data ingested from Pub/Sub. You plan to have multiple training iterations for your model and keep the latest two versions live after every run. You want to split the traffic between the versions in an 80:20 ratio, with the newest model getting the majority of the traffic. You want to keep the pipeline as simple as possible, with minimal management required. What should you do?

- **A.** Deploy the models to a Vertex AI endpoint using the traffic-split=0=80, PREVIOUS_MODEL_ID=20 configuration.
- **B.** Wrap the models inside an App Engine application using the --splits PREVIOUS_VERSION=0.2, NEW_VERSION=0.8 configuration
- **C.** Wrap the models inside a Cloud Run container using the REVISION1=20, REVISION2=80 revision configuration.
- **D.** Implement random splitting in Dataflow using beam.Partition() with a partition function calling a Vertex AI endpoint.

> [!success]- Resposta: **A**
> O endpoint do Vertex AI faz traffic split nativo entre modelos implantados (80 no novo, 20 no anterior), com mínima gestão, e o Dataflow chama um único endpoint. Implementar a divisão no Beam (D) adiciona lógica, e App Engine ou Cloud Run (B, C) exigem empacotar e gerenciar o serving.
> *Conceitos:* traffic split, Vertex AI endpoint, Dataflow

#### Q179 · 4.1 · curso 5 · média

You recently used XGBoost to train a model in Python that will be used for online serving. Your model prediction service will be called by a backend service implemented in Golang running on a Google Kubernetes Engine (GKE) cluster. Your model requires pre and postprocessing steps. You need to implement the processing steps so that they run at serving time. You want to minimize code changes and infrastructure maintenance, and deploy your model into production as quickly as possible. What should you do?

- **A.** Use FastAPI to implement an HTTP server. Create a Docker image that runs your HTTP server, and deploy it on your organization’s GKE cluster.
- **B.** Use FastAPI to implement an HTTP server. Create a Docker image that runs your HTTP server, Upload the image to Vertex AI Model Registry and deploy it to a Vertex AI endpoint.
- **C.** Use the Predictor interface to implement a custom prediction routine. Build the custom container, upload the container to Vertex AI Model Registry and deploy it to a Vertex AI endpoint.
- **D.** Use the XGBoost prebuilt serving container when importing the trained model into Vertex AI. Deploy the model to a Vertex AI endpoint. Work with the backend engineers to implement the pre- and postprocessing steps in the Golang backend service.

> [!success]- Resposta: **C**
> CPR com a interface Predictor encapsula pré e pós-processamento em Python junto ao modelo XGBoost, e o endpoint gerenciado tira a manutenção de infraestrutura. FastAPI (A, B) exige escrever o servidor, e reescrever o processamento em Go (D) causa retrabalho e risco de skew.
> *Conceitos:* custom prediction routine, XGBoost, Vertex AI endpoint

#### Q194 · 4.1 · curso 1 · média

You work for a social media company. You want to create a no-code image classification model for an iOS mobile application to identify fashion accessories. You have a labeled dataset in Cloud Storage. You need to configure a training workflow that minimizes cost and serves predictions with the lowest possible latency. What should you do?

- **A.** Train the model by using AutoML, and register the model in Vertex AI Model Registry. Configure your mobile application to send batch requests during prediction.
- **B.** Train the model by using AutoML Edge, and export it as a Core ML model. Configure your mobile application to use the .mlmodel file directly.
- **C.** Train the model by using AutoML Edge, and export the model as a TFLite model. Configure your mobile application to use the .tflite file directly.
- **D.** Train the model by using AutoML, and expose the model as a Vertex AI endpoint. Configure your mobile application to invoke the endpoint during prediction.

> [!success]- Resposta: **B**
> Para iOS, exportar o modelo AutoML Edge como Core ML roda nativo no dispositivo, com latência mínima e sem custo de endpoint. TFLite (C) também funciona no iOS, mas Core ML é o formato nativo e mais otimizado para a plataforma. Endpoints online ou batch (A, D) adicionam latência de rede e custo.
> *Conceitos:* AutoML Edge, Core ML, on-device

#### Q219 · 4.1 · curso 5 · média

Your company manages an ecommerce website. You developed an ML model that recommends additional products to users in near real time based on items currently in the user’s cart. The workflow will include the following processes: 1. The website will send a Pub/Sub message with the relevant data and then receive a message with the prediction from Pub/Sub 2. Predictions will be stored in BigQuery 3. The model will be stored in a Cloud Storage bucket and will be updated frequently You want to minimize prediction latency and the effort required to update the model. How should you reconfigure the architecture?

- **A.** Write a Cloud Function that loads the model into memory for prediction. Configure the function to be triggered when messages are sent to Pub/Sub.
- **B.** Create a pipeline in Vertex AI Pipelines that performs preprocessing, prediction, and postprocessing. Configure the pipeline to be triggered by a Cloud Function when messages are sent to Pub/Sub.
- **C.** Expose the model as a Vertex AI endpoint. Write a custom DoFn in a Dataflow job that calls the endpoint for prediction.
- **D.** Use the RunInference API with WatchFilePattern in a Dataflow job that wraps around the model and serves predictions.

> [!success]- Resposta: **D**
> Um job de Dataflow streaming lendo do Pub/Sub com RunInference carrega o modelo dentro do worker (baixa latência, sem chamada de rede extra), e WatchFilePattern detecta automaticamente novas versões do modelo no Cloud Storage, atualizando-o sem redeploy; o resultado pode ser gravado no BigQuery e no Pub/Sub. Chamar um endpoint a partir de um DoFn (C) adiciona latência de rede e exige redeploy para atualizar o modelo; Cloud Functions (A) recarregam o modelo e escalam mal.
> *Conceitos:* RunInference, WatchFilePattern, Dataflow, Pub/Sub

#### Q226 · 4.1 · curso 5 · média

You recently trained a XGBoost model that you plan to deploy to production for online inference. Before sending a predict request to your model’s binary, you need to perform a simple data preprocessing step. This step exposes a REST API that accepts requests in your internal VPC Service Controls and returns predictions. You want to configure this preprocessing step while minimizing cost and effort. What should you do?

- **A.** Store a pickled model in Cloud Storage. Build a Flask-based app, package the app in a custom container image, and deploy the model to Vertex AI Endpoints.
- **B.** Build a Flask-based app, package the app and a pickled model in a custom container image, and deploy the model to Vertex AI Endpoints.
- **C.** Build a custom predictor class based on XGBoost Predictor from the Vertex AI SDK, package it and a pickled model in a custom container image based on a Vertex built-in image, and deploy the model to Vertex AI Endpoints.
- **D.** Build a custom predictor class based on XGBoost Predictor from the Vertex AI SDK, and package the handler in a custom container image based on a Vertex built-in container image. Store a pickled model in Cloud Storage, and deploy the model to Vertex AI Endpoints.

> [!success]- Resposta: **D**
> Uma custom prediction routine (CPR) baseada no XGBoost Predictor do Vertex AI SDK permite incluir o pré-processamento no handler, usando uma imagem pré-construída, com o modelo armazenado no Cloud Storage e carregado como artefato, o que facilita trocar o modelo sem rebuild. Empacotar o modelo dentro da imagem (C) obriga a reconstruir o container a cada versão, e apps Flask próprios (A, B) exigem mais esforço.
> *Conceitos:* custom prediction routine, XGBoost, Vertex AI Endpoints, pré-processamento

#### Q234 · 4.1 · curso 6 · média

You work for a retail company that is using a regression model built with BigQuery ML to predict product sales. This model is being used to serve online predictions. Recently you developed a new version of the model that uses a different architecture (custom model). Initial analysis revealed that both models are performing as expected. You want to deploy the new version of the model to production and monitor the performance over the next two months. You need to minimize the impact to the existing and future model users. How should you deploy the model?

- **A.** Import the new model to the same Vertex AI Model Registry as a different version of the existing model. Deploy the new model to the same Vertex AI endpoint as the existing model, and use traffic splitting to route 95% of production traffic to the BigQuery ML model and 5% of production traffic to the new model.
- **B.** Import the new model to the same Vertex AI Model Registry as the existing model. Deploy the models to one Vertex AI endpoint. Route 95% of production traffic to the BigQuery ML model and 5% of production traffic to the new model.
- **C.** Import the new model to the same Vertex AI Model Registry as the existing model. Deploy each model to a separate Vertex AI endpoint.
- **D.** Deploy the new model to a separate Vertex AI endpoint. Create a Cloud Run service that routes the prediction requests to the corresponding endpoints based on the input feature values.

> [!success]- Resposta: **A**
> Importar o novo modelo como nova versão do mesmo modelo no Model Registry e implantá-lo no mesmo endpoint com traffic splitting 95/5 faz um canary sem mudar a interface para os usuários atuais e futuros. A opção B é parecida, mas não registra como versão do mesmo modelo, perdendo o versionamento; endpoints separados (C, D) exigiriam que os clientes mudassem a forma de chamar.
> *Conceitos:* Model Registry, versionamento, traffic splitting, canary

#### Q240 · 4.1 · curso 5 · fácil

You work at a mobile gaming startup that creates online multiplayer games. Recently, your company observed an increase in players cheating in the games, leading to a loss of revenue and a poor user experience You built a binary classification model to determine whether a player cheated after a completed game session, and then send a message to other downstream systems to ban the player that cheated. Your model has performed well during testing, and you now need to deploy the model to production. You want your serving solution to provide immediate classifications after a completed game session to avoid further loss of revenue. What should you do?

- **A.** Import the model into Vertex AI Model Registry. Use the Vertex Batch Prediction service to run batch inference jobs.
- **B.** Save the model files in a Cloud Storage bucket. Create a Cloud Function to read the model files and make online inference requests on the Cloud Function.
- **C.** Save the model files in a VM. Load the model files each time there is a prediction request, and run an inference job on the VM
- **D.** Import the model into Vertex AI Model Registry. Create a Vertex AI endpoint that hosts the model, and make online inference requests.

> [!success]- Resposta: **D**
> Classificações imediatas após cada sessão exigem online prediction, e um Vertex AI endpoint gerenciado com o modelo do Model Registry é a solução de serving recomendada, escalável e de baixa latência. Batch prediction (A) não é imediata, e Cloud Functions ou VM carregando o modelo a cada requisição (B, C) aumentam latência e esforço operacional.
> *Conceitos:* online prediction, Vertex AI Endpoints, Model Registry

#### Q244 · 4.1 · curso 5 · média

Your work for a textile manufacturing company. Your company has hundreds of machines, and each machine has many sensors. Your team used the sensory data to build hundreds of ML models that detect machine anomalies. Models are retrained daily, and you need to deploy these models in a cost-effective way. The models must operate 24/7 without downtime and make sub millisecond predictions. What should you do?

- **A.** Deploy a Dataflow batch pipeline and a Vertex AI Prediction endpoint.
- **B.** Deploy a Dataflow batch pipeline with the Runlnference API, and use model refresh.
- **C.** Deploy a Dataflow streaming pipeline and a Vertex AI Prediction endpoint with autoscaling.
- **D.** Deploy a Dataflow streaming pipeline with the Runlnference API, and use automatic model refresh.

> [!success]- Resposta: **D**
> Um pipeline Dataflow streaming com RunInference executa a inferência dentro dos workers, evitando chamadas de rede a um endpoint (necessário para latência sub-milissegundo), e o automatic model refresh troca os modelos retreinados diariamente sem downtime. Endpoints Vertex AI para centenas de modelos seriam caros e adicionariam latência de rede; pipelines batch não atendem operação 24/7 em tempo real.
> *Conceitos:* Dataflow, RunInference, model refresh, streaming

#### Q246 · 4.1 · curso 3 · média

You recently used BigQuery ML to train an AutoML regression model. You shared results with your team and received positive feedback. You need to deploy your model for online prediction as quickly as possible. What should you do?

- **A.** Retrain the model by using BigQuery ML, and specify Vertex AI as the model registry. Deploy the model from Vertex AI Model Registry to a Vertex AI endpoint,
- **B.** Retrain the model by using Vertex Al Deploy the model from Vertex AI Model. Registry to a Vertex AI endpoint.
- **C.** Alter the model by using BigQuery ML, and specify Vertex AI as the model registry. Deploy the model from Vertex AI Model Registry to a Vertex AI endpoint.
- **D.** Export the model from BigQuery ML to Cloud Storage. Import the model into Vertex AI Model Registry. Deploy the model to a Vertex AI endpoint.

> [!success]- Resposta: **C** · votos no arquivo: C(50%) D(44%)
> Um modelo BigQuery ML já treinado pode ser registrado no Vertex AI Model Registry com ALTER MODEL ... SET OPTIONS (vertex_ai_model_id=...), sem retreinar nem exportar, e depois implantado em um endpoint — o caminho mais rápido. Exportar para Cloud Storage e importar (D) funciona, mas adiciona etapas manuais; retreinar (A/B) desperdiça tempo.
> *Conceitos:* BigQuery ML, Vertex AI Model Registry, ALTER MODEL, online prediction

#### Q247 · 4.1 · curso 3 · média

You recently used BigQuery ML to train an AutoML regression model. You shared results with your team and received positive feedback. You need to deploy your model for online prediction as quickly as possible. What should you do?

- **A.** Retrain the model by using BigQuery ML, and specify Vertex AI as the model registry. Deploy the model from Vertex AI Model Registry to a Vertex AI endpoint,
- **B.** Retrain the model by using Vertex Al Deploy the model from Vertex AI Model. Registry to a Vertex AI endpoint.
- **C.** Alter the model by using BigQuery ML, and specify Vertex AI as the model registry. Deploy the model from Vertex AI Model Registry to a Vertex AI endpoint.
- **D.** Export the model from BigQuery ML to Cloud Storage. Import the model into Vertex AI Model Registry. Deploy the model to a Vertex AI endpoint.

> [!success]- Resposta: **C** ⚠️ o arquivo dizia **D**; revisado para **C**
> Mesma questão da 246: ALTER MODEL ... SET OPTIONS (vertex_ai_model_id=...) registra o modelo BigQuery ML existente no Vertex AI Model Registry sem retreino, permitindo deploy imediato em endpoint. O gabarito D (export para Cloud Storage e import) também funciona, mas tem mais passos manuais, então não é o 'mais rápido possível'; a comunidade está dividida (C ~50%, D ~44%).
> *Conceitos:* BigQuery ML, Vertex AI Model Registry, ALTER MODEL, online prediction

#### Q248 · 4.1 · curso 5 · média

You trained a model packaged it with a custom Docker container for serving, and deployed it to Vertex AI Model Registry. When you submit a batch prediction job, it fails with this error: "Error model server never became ready. Please validate that your model file or container configuration are valid. " There are no additional errors in the logs. What should you do?

- **A.** Add a logging configuration to your application to emit logs to Cloud Logging
- **B.** Change the HTTP port in your model’s configuration to the default value of 8080
- **C.** Change the healthRoute value in your model’s configuration to /healthcheck
- **D.** Pull the Docker image locally, and use the docker run command to launch it locally. Use the docker logs command to explore the error logs

> [!success]- Resposta: **D**
> Sem logs adicionais, a forma mais direta de diagnosticar por que o servidor do container não fica pronto é rodar a imagem localmente com docker run e inspecionar docker logs. Mudar porta ou healthRoute (B/C) é tentativa às cegas, pois não há evidência de que a configuração esteja errada.
> *Conceitos:* custom container, batch prediction, troubleshooting, Docker

#### Q257 · 4.1 · curso 5 · fácil

You recently trained an XGBoost model on tabular data. You plan to expose the model for internal use as an HTTP microservice. After deployment, you expect a small number of incoming requests. You want to productionize the model with the least amount of effort and latency. What should you do?

- **A.** Deploy the model to BigQuery ML by using CREATE MODEL with the BOOSTED_TREE_REGRESSOR statement, and invoke the BigQuery API from the microservice.
- **B.** Build a Flask-based app. Package the app in a custom container on Vertex AI, and deploy it to Vertex AI Endpoints.
- **C.** Build a Flask-based app. Package the app in a Docker image, and deploy it to Google Kubernetes Engine in Autopilot mode.
- **D.** Use a prebuilt XGBoost Vertex container to create a model, and deploy it to Vertex AI Endpoints.

> [!success]- Resposta: **D**
> O prebuilt container de XGBoost do Vertex AI permite fazer upload e deploy no Vertex AI Endpoints sem escrever servidor HTTP, com baixa latência. Flask em custom container ou GKE exigem mais esforço; BigQuery ML adicionaria latência de query e retreino.
> *Conceitos:* prebuilt container, XGBoost, Vertex AI Endpoints

#### Q259 · 4.1 · curso 6 · difícil

You have developed an application that uses a chain of multiple scikit-learn models to predict the optimal price for your company’s products. The workflow logic is shown in the diagram. Members of your team use the individual models in other solution workflows. You want to deploy this workflow while ensuring version control for each individual model and the overall workflow. Your application needs to be able to scale down to zero. You want to minimize the compute resource utilization and the manual effort required to manage this solution. What should you do?

- **A.** Expose each individual model as an endpoint in Vertex AI Endpoints. Create a custom container endpoint to orchestrate the workflow.
- **B.** Create a custom container endpoint for the workflow that loads each model’s individual files Track the versions of each individual model in BigQuery.
- **C.** Expose each individual model as an endpoint in Vertex AI Endpoints. Use Cloud Run to orchestrate the workflow.
- **D.** Load each model’s individual files into Cloud Run. Use Cloud Run to orchestrate the workflow. Track the versions of each individual model in BigQuery.

> [!success]- Resposta: **C**
> Expor cada modelo como endpoint do Vertex AI garante versionamento via Model Registry e reuso pelos outros times, e o Cloud Run orquestra o fluxo escalando a zero com pouco gerenciamento. Rastrear versões no BigQuery (B/D) é manual, e um endpoint de container customizado para orquestrar (A) não escala a zero.
> *Conceitos:* Cloud Run, Vertex AI Endpoints, Model Registry, orquestração

#### Q266 · 4.1 · curso 5 · fácil

You work for an organization that operates a streaming music service. You have a custom production model that is serving a “next song” recommendation based on a user's recent listening history. Your model is deployed on a Vertex AI endpoint. You recently retrained the same model by using fresh data. The model received positive test results offline. You now want to test the new model in production while minimizing complexity. What should you do?

- **A.** Create a new Vertex AI endpoint for the new model and deploy the new model to that new endpoint. Build a service to randomly send 5% of production traffic to the new endpoint. Monitor end-user metrics such as listening time. If end-user metrics improve between models over time, gradually increase the percentage of production traffic sent to the new endpoint.
- **B.** Capture incoming prediction requests in BigQuery. Create an experiment in Vertex AI Experiments. Run batch predictions for both models using the captured data. Use the user’s selected song to compare the models performance side by side. If the new model’s performance metrics are better than the previous model, deploy the new model to production.
- **C.** Deploy the new model to the existing Vertex AI endpoint. Use traffic splitting to send 5% of production traffic to the new model. Monitor end-user metrics, such as listening time. If end-user metrics improve between models over time, gradually increase the percentage of production traffic sent to the new model.
- **D.** Configure a model monitoring job for the existing Vertex AI endpoint. Configure the monitoring job to detect prediction drift and set a threshold for alerts. Update the model on the endpoint from the previous model to the new model. If you receive an alert of prediction drift, revert to the previous model.

> [!success]- Resposta: **C**
> Implantar o novo modelo no mesmo endpoint com traffic splitting de 5% é um canary/A/B test nativo do Vertex AI, de baixa complexidade. Criar outro endpoint e um serviço para dividir tráfego (A) faz manualmente o que o endpoint já oferece.
> *Conceitos:* traffic splitting, A/B testing, Vertex AI endpoint

## 4.2 Escalar o serving online

#### Q32 · 4.2 · curso 5 · difícil

You developed an ML model with AI Platform, and you want to move it to production. You serve a few thousand queries per second and are experiencing latency issues. Incoming requests are served by a load balancer that distributes them across multiple Kubeflow CPU-only pods running on Google Kubernetes Engine (GKE). Your goal is to improve the serving latency without changing the underlying infrastructure. What should you do?

- **A.** Significantly increase the max_batch_size TensorFlow Serving parameter.
- **B.** Switch to the tensorflow-model-server-universal version of TensorFlow Serving.
- **C.** Significantly increase the max_enqueued_batches TensorFlow Serving parameter.
- **D.** Recompile TensorFlow Serving using the source to support CPU-specific optimizations. Instruct GKE to choose an appropriate baseline minimum CPU platform for serving nodes.

> [!success]- Resposta: **D** · votos no arquivo: D (43%), A(39%)
> Recompilar o TensorFlow Serving com otimizações de CPU (AVX etc.) e fixar uma plataforma mínima de CPU no GKE reduz a latência sem mudar a infraestrutura. Aumentar muito max_batch_size (A) é tentador, mas melhora throughput à custa de latência, pois as requisições esperam o lote encher.
> *Conceitos:* TensorFlow Serving, latency, CPU optimization, GKE
> *Nome atual:* AI Platform hoje é Vertex AI.

#### Q49 · 4.2 · curso 5 · difícil

You work for an online travel agency that also sells advertising placements on its website to other companies. You have been asked to predict the most relevant web banner that a user should see next. Security is important to your company. The model latency requirements are 300ms@p99, the inventory is thousands of web banners, and your exploratory analysis has shown that navigation context is a good predictor. You want to Implement the simplest solution. How should you configure the prediction pipeline?

- **A.** Embed the client on the website, and then deploy the model on AI Platform Prediction.
- **B.** Embed the client on the website, deploy the gateway on App Engine, and then deploy the model on AI Platform Prediction.
- **C.** Embed the client on the website, deploy the gateway on App Engine, deploy the database on Cloud Bigtable for writing and for reading the user's navigation context, and then deploy the model on AI Platform Prediction.
- **D.** Embed the client on the website, deploy the gateway on App Engine, deploy the database on Memorystore for writing and for reading the user's navigation context, and then deploy the model on Google Kubernetes Engine.

> [!success]- Resposta: **C** · votos no arquivo: B(50%), C(50%)
> Como o contexto de navegação é o principal preditor, é preciso um banco de baixa latência para gravar e ler esse contexto por usuário, e o Bigtable atende isso dentro do p99 de 300 ms; o gateway no App Engine protege o endpoint. A opção B é tentadora por ser mais simples, mas não tem onde armazenar o contexto de navegação; a D com GKE e Memorystore é complexa demais.
> *Conceitos:* online serving, Bigtable, latency, App Engine
> *Nome atual:* AI Platform hoje é Vertex AI.

#### Q74 · 4.2 · curso 5 · fácil

You have deployed a model on Vertex AI for real-time inference. During an online prediction request, you get an “Out of Memory” error. What should you do?

- **A.** Use batch prediction mode instead of online mode.
- **B.** Send the request again with a smaller batch of instances.
- **C.** Use base64 to encode your data before using it for prediction.
- **D.** Apply for a quota increase for the number of prediction requests.

> [!success]- Resposta: **B**
> Out of Memory em uma requisição online normalmente indica payload grande demais; reenviar com menos instâncias por request resolve. Batch prediction (A) muda o padrão de uso sem necessidade, e quota (D) gera erro 429, não OOM.
> *Conceitos:* online prediction, Out of Memory, Vertex AI Prediction

#### Q80 · 4.2 · curso 5 · difícil

You work for an online travel agency that also sells advertising placements on its website to other companies. You have been asked to predict the most relevant web banner that a user should see next. Security is important to your company. The model latency requirements are 300ms@p99, the inventory is thousands of web banners, and your exploratory analysis has shown that navigation context is a good predictor. You want to Implement the simplest solution. How should you configure the prediction pipeline?

- **A.** Embed the client on the website, and then deploy the model on AI Platform Prediction.
- **B.** Embed the client on the website, deploy the gateway on App Engine, deploy the database on Firestore for writing and for reading the user’s navigation context, and then deploy the model on AI Platform Prediction.
- **C.** Embed the client on the website, deploy the gateway on App Engine, deploy the database on Cloud Bigtable for writing and for reading the user’s navigation context, and then deploy the model on AI Platform Prediction.
- **D.** Embed the client on the website, deploy the gateway on App Engine, deploy the database on Memorystore for writing and for reading the user’s navigation context, and then deploy the model on Google Kubernetes Engine.

> [!success]- Resposta: **B** · votos no arquivo: B(58%), C(42%)
> É preciso guardar e ler o contexto de navegação do usuário, e um gateway no App Engine protege o endpoint do modelo (segurança). Firestore é a opção gerenciada mais simples para essa leitura e escrita dentro de 300 ms. Bigtable (C) é tentador pela baixa latência, mas é dimensionado para volumes muito maiores e é mais complexo do que o 'simplest solution' pede.
> *Conceitos:* serving architecture, Firestore, latência
> *Nome atual:* AI Platform Prediction hoje é Vertex AI Prediction (endpoints).

#### Q110 · 4.2 · curso 1 · fácil

You work for a toy manufacturer that has been experiencing a large increase in demand. You need to build an ML model to reduce the amount of time spent by quality control inspectors checking for product defects. Faster defect detection is a priority. The factory does not have reliable Wi-Fi. Your company wants to implement the new ML model as soon as possible. Which model should you use?

- **A.** AutoML Vision Edge mobile-high-accuracy-1 model
- **B.** AutoML Vision Edge mobile-low-latency-1 model
- **C.** AutoML Vision model
- **D.** AutoML Vision Edge mobile-versatile-1 model

> [!success]- Resposta: **B**
> Sem Wi-Fi confiável o modelo precisa rodar no dispositivo (Edge), e como a prioridade é detecção rápida, o modelo mobile-low-latency-1 é o indicado. O mobile-high-accuracy-1 (A) é tentador, mas troca latência por acurácia; o AutoML Vision em nuvem (C) depende de conectividade.
> *Conceitos:* AutoML Edge, baixa latência, edge deployment
> *Nome atual:* AutoML Vision faz parte hoje do Vertex AI AutoML (image), com exportação de modelos Edge.

#### Q130 · 4.2 · curso 5 · média

You are working on a system log anomaly detection model for a cybersecurity organization. You have developed the model using TensorFlow, and you plan to use it for real-time prediction. You need to create a Dataflow pipeline to ingest data via Pub/Sub and write the results to BigQuery. You want to minimize the serving latency as much as possible. What should you do?

- **A.** Containerize the model prediction logic in Cloud Run, which is invoked by Dataflow.
- **B.** Load the model directly into the Dataflow job as a dependency, and use it for prediction.
- **C.** Deploy the model to a Vertex AI endpoint, and invoke this endpoint in the Dataflow job.
- **D.** Deploy the model in a TFServing container on Google Kubernetes Engine, and invoke it in the Dataflow job.

> [!success]- Resposta: **B** ⚠️ o arquivo dizia **C**; revisado para **B**
> Carregar o modelo diretamente no job Dataflow (por exemplo, via RunInference) elimina a chamada de rede a um serviço externo, o que dá a menor latência possível de serving. O gabarito C (endpoint do Vertex AI) é tentador por ser gerenciado, mas cada predição adiciona um round-trip HTTP; Cloud Run e GKE têm o mesmo problema. Esta é a resposta do conjunto de questões de exemplo do Google.
> *Conceitos:* Dataflow, RunInference, latência

#### Q145 · 4.2 · curso 5 · média

You have trained a DNN regressor with TensorFlow to predict housing prices using a set of predictive features. Your default precision is tf.float64, and you use a standard TensorFlow estimator: Your model performs well, but just before deploying it to production, you discover that your current serving latency is 10ms @ 90 percentile and you currently serve on CPUs. Your production requirements expect a model latency of 8ms @ 90 percentile. You're willing to accept a small decrease in performance in order to reach the latency requirement. Therefore your plan is to improve latency while evaluating how much the model's prediction decreases. What should you first try to quickly lower the serving latency?

- **A.** Switch from CPU to GPU serving.
- **B.** Apply quantization to your SavedModel by reducing the floating point precision to tf.float16.
- **C.** Increase the dropout rate to 0.8 and retrain your model.
- **D.** Increase the dropout rate to 0.8 in _PREDICT mode by adjusting the TensorFlow Serving parameters.

> [!success]- Resposta: **B**
> Quantização para float16 (o modelo está em float64) reduz o custo computacional e a latência de inferência rapidamente, com pequena perda de qualidade, exatamente o trade-off aceito. Trocar para GPU (A) é tentador, mas é mais caro e nem sempre reduz latência para modelos pequenos com requisições individuais; dropout não afeta a inferência (C, D).
> *Conceitos:* quantização, latência, float16

#### Q163 · 4.2 · curso 7 · média

You are an ML engineer at a retail company. You have built a model that predicts a coupon to offer an ecommerce customer at checkout based on the items in their cart. When a customer goes to checkout, your serving pipeline, which is hosted on Google Cloud, joins the customer's existing cart with a row in a BigQuery table that contains the customers' historic purchase behavior and uses that as the model's input. The web team is reporting that your model is returning predictions too slowly to load the coupon offer with the rest of the web page. How should you speed up your model's predictions?

- **A.** Attach an NVIDIA P100 GPU to your deployed model’s instance.
- **B.** Use a low latency database for the customers’ historic purchase behavior.
- **C.** Deploy your model to more instances behind a load balancer to distribute traffic.
- **D.** Create a materialized view in BigQuery with the necessary data for predictions.

> [!success]- Resposta: **B** · votos no arquivo: D (58%) B(42%)
> O gargalo é a consulta ao BigQuery no caminho de serving: o BigQuery é um data warehouse analítico, sem latência de milissegundos. Mover o histórico para um banco de baixa latência (Bigtable, Memorystore ou Feature Store online serving) é a prática recomendada. A materialized view (D) reduz o custo da query, mas continua sujeita à latência do BigQuery, por isso a escolha é B.
> *Conceitos:* online serving, low latency, Bigtable, Feature Store

#### Q164 · 4.2 · curso 5 · média

You work for a small company that has deployed an ML model with autoscaling on Vertex AI to serve online predictions in a production environment. The current model receives about 20 prediction requests per hour with an average response time of one second. You have retrained the same model on a new batch of data, and now you are canary testing it, sending ~10% of production traffic to the new model. During this canary test, you notice that prediction requests for your new model are taking between 30 and 180 seconds to complete. What should you do?

- **A.** Submit a request to raise your project quota to ensure that multiple prediction services can run concurrently.
- **B.** Turn off auto-scaling for the online prediction service of your new model. Use manual scaling with one node always available.
- **C.** Remove your new model from the production environment. Compare the new model and existing model codes to identify the cause of the performance bottleneck.
- **D.** Remove your new model from the production environment. For a short trial period, send all incoming prediction requests to BigQuery. Request batch predictions from your new model, and then use the Data Labeling Service to validate your model’s performance before promoting it to production.

> [!success]- Resposta: **B**
> Com tráfego baixíssimo, o autoscaling deixa o modelo novo sem nós aquecidos e cada requisição sofre cold start; manter um nó sempre disponível elimina a latência de 30 a 180 s. Comparar o código (C) é tentador, mas o modelo é o mesmo retreinado, então o problema é de infraestrutura e não de código.
> *Conceitos:* autoscaling, cold start, canary
> *Nome atual:* A questão vem da era AI Platform Prediction (que escalava a zero); o Data Labeling Service foi descontinuado em favor de soluções de rotulagem de parceiros e do Vertex AI.

#### Q170 · 4.2 · curso 5 · fácil

You need to deploy a scikit-leam classification model to production. The model must be able to serve requests 24/7, and you expect millions of requests per second to the production application from 8 am to 7 pm. You need to minimize the cost of deployment. What should you do?

- **A.** Deploy an online Vertex AI prediction endpoint. Set the max replica count to 1
- **B.** Deploy an online Vertex AI prediction endpoint. Set the max replica count to 100
- **C.** Deploy an online Vertex AI prediction endpoint with one GPU per replica. Set the max replica count to 1
- **D.** Deploy an online Vertex AI prediction endpoint with one GPU per replica. Set the max replica count to 100

> [!success]- Resposta: **B**
> scikit-learn não se beneficia de GPU no serving, então GPUs (C, D) só aumentam custo; e com milhões de requisições por segundo em horário de pico é preciso autoscaling até muitas réplicas (max 100), que voltam ao mínimo fora do pico. Max replicas = 1 (A) não aguenta a carga.
> *Conceitos:* autoscaling, replica count, scikit-learn, cost

#### Q171 · 4.2 · curso 5 · fácil

You need to deploy a scikit-leam classification model to production. The model must be able to serve requests 24/7, and you expect millions of requests per second to the production application from 8 am to 7 pm. You need to minimize the cost of deployment. What should you do?

- **A.** Deploy an online Vertex AI prediction endpoint. Set the max replica count to 1
- **B.** Deploy an online Vertex AI prediction endpoint. Set the max replica count to 100
- **C.** Deploy an online Vertex AI prediction endpoint with one GPU per replica. Set the max replica count to 1
- **D.** Deploy an online Vertex AI prediction endpoint with one GPU per replica. Set the max replica count to 100

> [!success]- Resposta: **B** ⚠️ o arquivo dizia **D**; revisado para **B**
> Questão duplicada da anterior. Os prebuilt containers de scikit-learn não usam GPU, então GPU por réplica (D) só aumenta custo sem ganho; a resposta correta é autoscaling com max 100 réplicas em CPU (B). O gabarito D contraria o requisito de minimizar custo.
> *Conceitos:* autoscaling, scikit-learn, GPU, cost

#### Q187 · 4.2 · curso 5 · média

You recently deployed a scikit-learn model to a Vertex AI endpoint. You are now testing the model on live production traffic. While monitoring the endpoint, you discover twice as many requests per hour than expected throughout the day. You want the endpoint to efficiently scale when the demand increases in the future to prevent users from experiencing high latency. What should you do?

- **A.** Deploy two models to the same endpoint, and distribute requests among them evenly
- **B.** Configure an appropriate minReplicaCount value based on expected baseline traffic
- **C.** Set the target utilization percentage in the autoscailngMetricSpecs configuration to a higher value
- **D.** Change the model’s machine type to one that utilizes GPUs

> [!success]- Resposta: **B**
> Definir minReplicaCount pelo tráfego base garante capacidade aquecida e deixa o autoscaling cuidar dos picos sem latência de cold start. Aumentar o target de utilização (C) faz escalar mais tarde, o que piora a latência, e GPU para scikit-learn (D) não ajuda.
> *Conceitos:* autoscaling, minReplicaCount, Vertex AI endpoint

#### Q218 · 4.2 · curso 5 · média

You have built a custom model that performs several memory-intensive preprocessing tasks before it makes a prediction. You deployed the model to a Vertex AI endpoint, and validated that results were received in a reasonable amount of time. After routing user traffic to the endpoint, you discover that the endpoint does not autoscale as expected when receiving multiple requests. What should you do?

- **A.** Use a machine type with more memory
- **B.** Decrease the number of workers per machine
- **C.** Increase the CPU utilization target in the autoscaling configurations.
- **D.** Decrease the CPU utilization target in the autoscaling configurations

> [!success]- Resposta: **D**
> O autoscaling do Vertex AI Endpoints se baseia na utilização de CPU/GPU; como o gargalo é memória, a CPU não atinge o alvo e novas réplicas não são criadas, então reduzir o CPU utilization target faz o escalonamento ocorrer antes. Uma máquina com mais memória (A) é tentadora, mas não resolve o fato de o autoscaling não ser acionado; aumentar o target (C) piora o problema.
> *Conceitos:* autoscaling, Vertex AI Endpoints, CPU utilization target

#### Q238 · 4.2 · curso 5 · média

You have deployed a scikit-team model to a Vertex AI endpoint using a custom model server. You enabled autoscaling: however, the deployed model fails to scale beyond one replica, which led to dropped requests. You notice that CPU utilization remains low even during periods of high load. What should you do?

- **A.** Attach a GPU to the prediction nodes
- **B.** Increase the number of workers in your model server
- **C.** Schedule scaling of the nodes to match expected demand
- **D.** Increase the minReplicaCount in your DeployedModel configuration

> [!success]- Resposta: **B**
> Se a CPU fica baixa mesmo sob alta carga, o model server customizado está limitado pelo número de workers e não consegue usar a CPU disponível; aumentar os workers eleva o uso de CPU, permitindo atender mais requisições e acionar o autoscaling. Aumentar minReplicaCount (D) é tentador, mas só mascara o problema com custo fixo maior, e GPU (A) não ajuda um modelo scikit-learn.
> *Conceitos:* autoscaling, model server, workers, Vertex AI Endpoints

#### Q256 · 4.2 · curso 5 · fácil

You work for an online grocery store. You recently developed a custom ML model that recommends a recipe when a user arrives at the website. You chose the machine type on the Vertex AI endpoint to optimize costs by using the queries per second (QPS) that the model can serve, and you deployed it on a single machine with 8 vCPUs and no accelerators. A holiday season is approaching and you anticipate four times more traffic during this time than the typical daily traffic. You need to ensure that the model can scale efficiently to the increased demand. What should you do?

- **A.** 1. Maintain the same machine type on the endpoint. 2. Set up a monitoring job and an alert for CPU usage. 3. If you receive an alert, add a compute node to the endpoint.
- **B.** 1. Change the machine type on the endpoint to have 32 vCPUs. 2. Set up a monitoring job and an alert for CPU usage. 3. If you receive an alert, scale the vCPUs further as needed.
- **C.** 1. Maintain the same machine type on the endpoint Configure the endpoint to enable autoscaling based on vCPU usage. 2. Set up a monitoring job and an alert for CPU usage. 3. If you receive an alert, investigate the cause.
- **D.** 1. Change the machine type on the endpoint to have a GPU. Configure the endpoint to enable autoscaling based on the GPU usage. 2. Set up a monitoring job and an alert for GPU usage. 3. If you receive an alert, investigate the cause.

> [!success]- Resposta: **C**
> Autoscaling no endpoint com o mesmo machine type (já dimensionado por QPS) adiciona réplicas conforme o uso de vCPU, escalando de forma eficiente para o pico e voltando depois. Trocar para 32 vCPUs ou GPU aumenta custo permanentemente, e escalar manualmente após alertas é reativo.
> *Conceitos:* autoscaling, Vertex AI endpoint, QPS

#### Q262 · 4.2 · curso 7 · média

You recently deployed a model to a Vertex AI endpoint and set up online serving in Vertex AI Feature Store. You have configured a daily batch ingestion job to update your featurestore. During the batch ingestion jobs, you discover that CPU utilization is high in your featurestore’s online serving nodes and that feature retrieval latency is high. You need to improve online serving performance during the daily batch ingestion. What should you do?

- **A.** Schedule an increase in the number of online serving nodes in your featurestore prior to the batch ingestion jobs
- **B.** Enable autoscaling of the online serving nodes in your featurestore
- **C.** Enable autoscaling for the prediction nodes of your DeployedModel in the Vertex AI endpoint
- **D.** Increase the worker_count in the ImportFeatureValues request of your batch ingestion job

> [!success]- Resposta: **B**
> Habilitar autoscaling dos nós de online serving do featurestore faz o Vertex AI adicionar nós quando a CPU sobe durante a ingestão batch, mantendo a latência baixa sem intervenção manual. Agendar aumento de nós (A) funciona, mas é manual e frágil; aumentar worker_count (D) piora a carga nos nós.
> *Conceitos:* Vertex AI Feature Store, online serving nodes, autoscaling, batch ingestion
> *Nome atual:* Vertex AI Feature Store (Legacy), com featurestores e nós de online serving, foi substituído pelo novo Vertex AI Feature Store baseado em BigQuery com online stores.

#### Q277 · 4.2 · curso 5 · média

You work for a large bank that serves customers through an application hosted in Google Cloud that is running in the US and Singapore. You have developed a PyTorch model to classify transactions as potentially fraudulent or not. The model is a three-layer perceptron that uses both numerical and categorical features as input, and hashing happens within the model. You deployed the model to the us-central1 region on nl-highcpu-16 machines, and predictions are served in real time. The model's current median response latency is 40 ms. You want to reduce latency, especially in Singapore, where some customers are experiencing the longest delays. What should you do?

- **A.** Attach an NVIDIA T4 GPU to the machines being used for online inference.
- **B.** Change the machines being used for online inference to nl-highcpu-32.
- **C.** Deploy the model to Vertex AI private endpoints in the us-central1 and asia-southeast1 regions, and allow the application to choose the appropriate endpoint.
- **D.** Create another Vertex AI endpoint in the asia-southeast1 region, and allow the application to choose the appropriate endpoint.

> [!success]- Resposta: **C**
> Implantar em private endpoints em us-central1 e asia-southeast1 reduz a latência de rede para Singapura e elimina overhead do endpoint público, e a aplicação escolhe o endpoint mais próximo. D é tentadora por também aproximar o modelo, mas com endpoint público não aproveita o caminho de menor latência dos private endpoints; GPU ou mais CPU (A/B) não resolvem a distância geográfica de um MLP pequeno.
> *Conceitos:* private endpoint, latência, multi-region
