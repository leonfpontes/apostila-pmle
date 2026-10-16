---
title: "PMLE — Questões da seção 1: Arquitetar soluções de IA low-code"
aliases: ["questões PMLE seção 1"]
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
summary: "36 questões de prática do exame Professional ML Engineer na seção 1 do guia (Arquitetar soluções de IA low-code, 13% da prova), com gabarito revisado e explicação em português."
parte_de: "[[pmle-banco-de-questoes]]"
related: ["[[pmle-guia-do-exame]]"]
---

# PMLE — Questões da seção 1: Arquitetar soluções de IA low-code

Seção 1 do guia oficial · **13% da prova** · 36 questões. Faz parte do [[pmle-banco-de-questoes|banco de questões]]. As questões estão em inglês, como na prova; a resposta fica fechada no bloco verde (no Obsidian, clique para abrir).

| Subseção | Questões |
|---|---|
| 1.1 Modelos com BigQuery ML | 10 |
| 1.2 ML APIs, foundation models e RAG | 10 |
| 1.3 AutoML | 16 |

## 1.1 Modelos com BigQuery ML

#### Q63 · 1.1 · curso 3 · fácil

You work for a large retailer and have been asked to segment your customers by their purchasing habits. The purchase history of all customers has been uploaded to BigQuery. You suspect that there may be several distinct customer segments, however you are unsure of how many, and you don’t yet understand the commonalities in their behavior. You want to find the most efficient solution. What should you do?

- **A.** Create a k-means clustering model using BigQuery ML. Allow BigQuery to automatically optimize the number of clusters.
- **B.** Create a new dataset in Dataprep that references your BigQuery table. Use Dataprep to identify similarities within each column.
- **C.** Use the Data Labeling Service to label each customer record in BigQuery. Train a model on your labeled data using AutoML Tables. Review the evaluation metrics to understand whether there is an underlying pattern in the data.
- **D.** Get a list of the customer segments from your company’s Marketing team. Use the Data Labeling Service to label each customer record in BigQuery according to the list. Analyze the distribution of labels in your dataset using Data Studio.

> [!success]- Resposta: **A**
> Segmentação sem rótulos é clustering; k-means no BigQuery ML roda onde os dados já estão e pode escolher automaticamente o número de clusters. Rotular com Data Labeling Service e treinar AutoML (C, D) transforma um problema não supervisionado em supervisionado sem rótulos válidos.
> *Conceitos:* BigQuery ML, k-means, clustering
> *Nome atual:* Data Labeling Service foi descontinuado (rotulagem hoje via parceiros/Vertex AI); AutoML Tables hoje é Vertex AI AutoML; Data Studio hoje é Looker Studio.

#### Q71 · 1.1 · curso 3 · média

You need to train a regression model based on a dataset containing 50,000 records that is stored in BigQuery. The data includes a total of 20 categorical and numerical features with a target variable that can include negative values. You need to minimize effort and training time while maximizing model performance. What approach should you take to train this regression model?

- **A.** Create a custom TensorFlow DNN model
- **B.** Use BQML XGBoost regression to train the model.
- **C.** Use AutoML Tables to train the model without early stopping.
- **D.** Use AutoML Tables to train the model with RMSLE as the optimization objective.

> [!success]- Resposta: **B**
> Com 50 mil registros já no BigQuery, XGBoost (boosted tree regressor) no BigQuery ML treina rápido, com pouco esforço e boa performance em dados tabulares. AutoML (C, D) leva no mínimo cerca de uma hora, e RMSLE não serve para target com valores negativos.
> *Conceitos:* BigQuery ML, XGBoost, regressão
> *Nome atual:* AutoML Tables hoje é Vertex AI AutoML tabular.

#### Q87 · 1.1 · curso 3 · fácil

You have been given a dataset with sales predictions based on your company’s marketing activities. The data is structured and stored in BigQuery, and has been carefully managed by a team of data analysts. You need to prepare a report providing insights into the predictive capabilities of the data. You were asked to run several ML models with different levels of sophistication, including simple models and multilayered neural networks. You only have a few hours to gather the results of your experiments. Which Google Cloud tools should you use to complete this task in the most efficient and self-serviced way?

- **A.** Use BigQuery ML to run several regression models, and analyze their performance.
- **B.** Read the data from BigQuery using Dataproc, and run several models using SparkML.
- **C.** Use Vertex AI Workbench user-managed notebooks with scikit-learn code for a variety of ML algorithms and performance metrics.
- **D.** Train a custom TensorFlow model with Vertex AI, reading the data from BigQuery featuring a variety of ML algorithms.

> [!success]- Resposta: **A**
> Os dados estruturados já estão no BigQuery, e o BigQuery ML permite treinar em poucas horas, via SQL, de modelos lineares a DNN, com avaliação integrada e de forma self-service. Notebooks com scikit-learn (C) são tentadores, mas exigem mover dados e escrever mais código.
> *Conceitos:* BigQuery ML, self-service, prototipagem rápida

#### Q97 · 1.1 · curso 3 · média

You are a data scientist at an industrial equipment manufacturing company. You are developing a regression model to estimate the power consumption in the company’s manufacturing plants based on sensor data collected from all of the plants. The sensors collect tens of millions of records every day. You need to schedule daily training runs for your model that use all the data collected up to the current date. You want your model to scale smoothly and require minimal development work. What should you do?

- **A.** Train a regression model using AutoML Tables.
- **B.** Develop a custom TensorFlow regression model, and optimize it using Vertex AI Training.
- **C.** Develop a custom scikit-learn regression model, and optimize it using Vertex AI Training.
- **D.** Develop a regression model using BigQuery ML.

> [!success]- Resposta: **D**
> Dezenas de milhões de registros por dia com retreino diário agendado sobre todo o histórico: o BigQuery ML escala nativamente, tem scheduled queries e exige o mínimo de desenvolvimento. Modelos custom em Vertex AI Training (B, C) exigem mais código, e AutoML (A) é mais caro e lento para retreino diário.
> *Conceitos:* BigQuery ML, retreino agendado, escalabilidade
> *Nome atual:* AutoML Tables hoje é Vertex AI AutoML tabular.

#### Q158 · 1.1 · curso 3 · fácil

You are a data scientist at an industrial equipment manufacturing company. You are developing a regression model to estimate the power consumption in the company’s manufacturing plants based on sensor data collected from all of the plants. The sensors collect tens of millions of records every day. You need to schedule daily training runs for your model that use all the data collected up to the current date. You want your model to scale smoothly and require minimal development work. What should you do?

- **A.** Develop a custom TensorFlow regression model, and optimize it using Vertex AI Training.
- **B.** Develop a regression model using BigQuery ML.
- **C.** Develop a custom scikit-learn regression model, and optimize it using Vertex AI Training.
- **D.** Develop a custom PyTorch regression model, and optimize it using Vertex AI Training.

> [!success]- Resposta: **B**
> BigQuery ML treina direto onde os dados estão, escala com grandes volumes e pode ser agendado com scheduled queries com mínimo desenvolvimento. Modelos custom em TF, PyTorch ou scikit-learn no Vertex AI Training (A, C, D) exigem mais código e pipeline de dados.
> *Conceitos:* BigQuery ML, regression, scheduled queries

#### Q167 · 1.1 · curso 3 · média

You are working with a dataset that contains customer transactions. You need to build an ML model to predict customer purchase behavior. You plan to develop the model in BigQuery ML, and export it to Cloud Storage for online prediction. You notice that the input data contains a few categorical features, including product category and payment method. You want to deploy the model as quickly as possible. What should you do?

- **A.** Use the TRANSFORM clause with the ML.ONE_HOT_ENCODER function on the categorical features at model creation and select the categorical and non-categorical features.
- **B.** Use the ML.ONE_HOT_ENCODER function on the categorical features and select the encoded categorical features and non-categorical features as inputs to create your model.
- **C.** Use the CREATE MODEL statement and select the categorical and non-categorical features.
- **D.** Use the ML.MULTI_HOT_ENCODER function on the categorical features, and select the encoded categorical features and non-categorical features as inputs to create your model.

> [!success]- Resposta: **C** ⚠️ o arquivo dizia **B**; revisado para **C**
> O BigQuery ML já faz one-hot encoding automático de colunas STRING no CREATE MODEL, e esse pré-processamento vai junto no modelo exportado, então basta selecionar as features: é o caminho mais rápido. Em B, aplicar ML.ONE_HOT_ENCODER fora do TRANSFORM obriga a replicar o encoding no serving, o que gera risco de skew e mais trabalho; por isso discordo do gabarito. A funciona, mas é passo desnecessário.
> *Conceitos:* BigQuery ML, one-hot encoding, TRANSFORM, model export

#### Q215 · 1.1 · curso 3 · fácil

You work for an online retailer. Your company has a few thousand short lifecycle products. Your company has five years of sales data stored in BigQuery. You have been asked to build a model that will make monthly sales predictions for each product. You want to use a solution that can be implemented quickly with minimal effort. What should you do?

- **A.** Use Prophet on Vertex AI Training to build a custom model.
- **B.** Use Vertex AI Forecast to build a NN-based model.
- **C.** Use BigQuery ML to build a statistical ARIMA_PLUS model.
- **D.** Use TensorFlow on Vertex AI Training to build a custom model.

> [!success]- Resposta: **C**
> O ARIMA_PLUS do BigQuery ML treina, com uma única instrução SQL, milhares de séries temporais (uma por produto) diretamente onde os dados estão, sendo a solução mais rápida e com menor esforço. Vertex AI Forecast (B) também é gerenciado, mas exige exportar/configurar o dataset e tem treino mais demorado e caro; Prophet ou TensorFlow customizados (A, D) exigem código.
> *Conceitos:* BigQuery ML, ARIMA_PLUS, forecasting, séries temporais

#### Q236 · 1.1 · curso 3 · fácil

You work for a large retailer, and you need to build a model to predict customer chum. The company has a dataset of historical customer data, including customer demographics purchase history, and website activity. You need to create the model in BigQuery ML and thoroughly evaluate its performance. What should you do?

- **A.** Create a linear regression model in BigQuery ML, and register the model in Vertex AI Model Registry. Evaluate the model performance in Vertex AI .
- **B.** Create a logistic regression model in BigQuery ML and register the model in Vertex AI Model Registry. Evaluate the model performance in Vertex AI .
- **C.** Create a linear regression model in BigQuery ML. Use the ML.EVALUATE function to evaluate the model performance.
- **D.** Create a logistic regression model in BigQuery ML. Use the ML.CONFUSION_MATRIX function to evaluate the model performance.

> [!success]- Resposta: **B**
> Churn é classificação binária, então se usa logistic regression; registrar o modelo do BigQuery ML no Vertex AI Model Registry dá acesso à avaliação completa no Vertex AI (curvas, matriz de confusão, métricas por threshold). Linear regression (A, C) é para valores contínuos, e ML.CONFUSION_MATRIX (D) sozinho não é uma avaliação completa.
> *Conceitos:* BigQuery ML, logistic regression, Model Registry, avaliação

#### Q252b · 1.1 · curso 3 · média

You work for a company that sells corporate electronic products to thousands of businesses worldwide. Your company stores historical customer data in BigQuery. You need to build a model that predicts customer lifetime value over the next three years. You want to use the simplest approach to build the model and you want to have access to visualization tools. What should you do?

- **A.** Create a Vertex AI Workbench notebook to perform exploratory data analysis. Use IPython magics to create a new BigQuery table with input features. Use the BigQuery console to run the CREATE MODEL statement. Validate the results by using the ML.EVALUATE and ML.PREDICT statements.
- **B.** Run the CREATE MODEL statement from the BigQuery console to create an AutoML model. Validate the results by using the ML.EVALUATE and ML.PREDICT statements.
- **C.** Create a Vertex AI Workbench notebook to perform exploratory data analysis and create input features. Save the features as a CSV file in Cloud Storage. Import the CSV file as a new BigQuery table. Use the BigQuery console to run the CREATE MODEL statement. Validate the results by using the ML.EVALUATE and ML.PREDICT statements.
- **D.** Create a Vertex AI Workbench notebook to perform exploratory data analysis. Use IPython magics to create a new BigQuery table with input features, create the model, and validate the results by using the CREATE MODEL, ML.EVALUATE, and ML.PREDICT statements.

> [!success]- Resposta: **B**
> Rodar CREATE MODEL com AutoML direto no console do BigQuery e validar com ML.EVALUATE/ML.PREDICT é o caminho mais simples, sem mover dados nem criar notebooks; o console mostra gráficos de avaliação do modelo. As alternativas com Workbench adicionam etapas (EDA, tabelas intermediárias, CSV) que contrariam o requisito de simplicidade.
> *Conceitos:* BigQuery ML, AutoML, ML.EVALUATE, CLV

#### Q276 · 1.1 · curso 3 · fácil

You work at a gaming startup that has several terabytes of structured data in Cloud Storage. This data includes gameplay time data, user metadata, and game metadata. You want to build a model that recommends new games to users that requires the least amount of coding. What should you do?

- **A.** Load the data in BigQuery. Use BigQuery ML to train an Autoencoder model.
- **B.** Load the data in BigQuery. Use BigQuery ML to train a matrix factorization model.
- **C.** Read data to a Vertex AI Workbench notebook. Use TensorFlow to train a two-tower model.
- **D.** Read data to a Vertex AI Workbench notebook. Use TensorFlow to train a matrix factorization model.

> [!success]- Resposta: **B**
> Matrix factorization do BigQuery ML é o modelo de recomendação nativo, treinado com SQL, exigindo o mínimo de código. Two-tower ou matrix factorization em TensorFlow (C/D) exigem muito mais código, e autoencoder (A) não é o modelo padrão de recomendação.
> *Conceitos:* BigQuery ML, matrix factorization, recommendation

## 1.2 ML APIs, foundation models e RAG

#### Q11 · 1.2 · curso 1 · média

You are designing an ML recommendation model for shoppers on your company's ecommerce website. You will use Recommendations AI to build, test, and deploy your system. How should you develop recommendations that increase revenue while following best practices?

- **A.** Use the "Other Products You May Like" recommendation type to increase the click-through rate.
- **B.** Use the "Frequently Bought Together" recommendation type to increase the shopping cart size for each order.
- **C.** Import your user events and then your product catalog to make sure you have the highest quality event stream.
- **D.** Because it will take time to collect and record product data, use placeholder values for the product catalog to test the viability of the model.

> [!success]- Resposta: **B**
> O tipo "Frequently Bought Together" é recomendado para aumentar o tamanho do carrinho e, portanto, a receita. "Others You May Like" (A) otimiza engajamento/CTR, não receita por pedido; importar eventos antes do catálogo (C) ou usar catálogo falso (D) contraria as boas práticas.
> *Conceitos:* Recommendations AI, recommendation types, retail
> *Nome atual:* Recommendations AI hoje faz parte do Vertex AI Search for commerce.

#### Q12 · 1.2 · curso 2 · fácil

You are designing an architecture with a serverless ML system to enrich customer support tickets with informative metadata before they are routed to a support agent. You need a set of models to predict ticket priority, predict ticket resolution time, and perform sentiment analysis to help agents make strategic decisions when they process support requests. Tickets are not expected to have any domain-specific terms or jargon. The proposed architecture has the following flow: Which endpoints should the Enrichment Cloud Functions call?

- **A.** 1 = AI Platform, 2 = AI Platform, 3 = AutoML Vision
- **B.** 1 = AI Platform, 2 = AI Platform, 3 = AutoML Natural Language
- **C.** 1 = AI Platform, 2 = AI Platform, 3 = Cloud Natural Language API
- **D.** 1 = Cloud Natural Language API, 2 = AI Platform, 3 = Cloud Vision API

> [!success]- Resposta: **C**
> Prioridade e tempo de resolução são previsões específicas do negócio e exigem modelos customizados, enquanto sentimento sem jargão de domínio é atendido pela Cloud Natural Language API pré-treinada. AutoML Natural Language (B) seria esforço desnecessário, e as opções com Vision não fazem sentido para texto.
> *Conceitos:* Natural Language API, sentiment analysis, custom models
> *Nome atual:* AI Platform hoje é Vertex AI.

#### Q161 · 1.2 · curso 1 · média

You work for a company that is developing a new video streaming platform. You have been asked to create a recommendation system that will suggest the next video for a user to watch. After a review by an AI Ethics team, you are approved to start development. Each video asset in your company’s catalog has useful metadata (e.g., content type, release date, country), but you do not have any historical user event data. How should you build the recommendation system for the first version of the product?

- **A.** Launch the product without machine learning. Present videos to users alphabetically, and start collecting user event data so you can develop a recommender model in the future.
- **B.** Launch the product without machine learning. Use simple heuristics based on content metadata to recommend similar videos to users, and start collecting user event data so you can develop a recommender model in the future.
- **C.** Launch the product with machine learning. Use a publicly available dataset such as MovieLens to train a model using the Recommendations AI, and then apply this trained model to your data.
- **D.** Launch the product with machine learning. Generate embeddings for each video by training an autoencoder on the content metadata using TensorFlow. Cluster content based on the similarity of these embeddings, and then recommend videos from the same cluster.

> [!success]- Resposta: **B**
> Sem dados de eventos de usuário, a abordagem recomendada (Rules of ML) é lançar com heurísticas baseadas em metadata e coletar dados para um modelo futuro. Treinar com MovieLens (C) não transfere para outro catálogo, e embeddings via autoencoder (D) são complexidade sem dado que valide o resultado.
> *Conceitos:* cold start, recommendation, heuristics
> *Nome atual:* Recommendations AI hoje é Vertex AI Search for commerce.

#### Q193 · 1.2 · curso 2 · média

Your company stores a large number of audio files of phone calls made to your customer call center in an on-premises database. Each audio file is in wav format and is approximately 5 minutes long. You need to analyze these audio files for customer sentiment. You plan to use the Speech-to-Text API You want to use the most efficient approach. What should you do?

- **A.** 1. Upload the audio files to Cloud Storage 2. Call the speech:longrunningrecognize API endpoint to generate transcriptions 3. Call the predict method of an AutoML sentiment analysis model to analyze the transcriptions.
- **B.** 1. Upload the audio files to Cloud Storage. 2. Call the speech:longrunningrecognize API endpoint to generate transcriptions 3. Create a Cloud Function that calls the Natural Language API by using the analyzeSentiment method
- **C.** 1. Iterate over your local files in Python 2. Use the Speech-to-Text Python library to create a speech.RecognitionAudio object, and set the content to the audio file data 3. Call the speech:recognize API endpoint to generate transcriptions 4. Call the predict method of an AutoML sentiment analysis model to analyze the transcriptions.
- **D.** 1. Iterate over your local files in Python 2. Use the Speech-to-Text Python Library to create a speech.RecognitionAudio object and set the content to the audio file data 3. Call the speech:longrunningrecognize API endpoint to generate transcriptions. 4. Call the Natural Language API by using the analyzeSentiment method

> [!success]- Resposta: **B**
> Áudios de 5 minutos passam do limite de cerca de 1 minuto do recognize síncrono, então o caminho é subir para o Cloud Storage e usar longrunningrecognize; a Natural Language API analyzeSentiment é pré-treinada e não exige treinar modelo. AutoML (A, C) é desnecessário, e enviar o conteúdo local inline (D) é menos eficiente e tem limite de tamanho.
> *Conceitos:* Speech-to-Text, Natural Language API, sentiment analysis
> *Nome atual:* AutoML Natural Language foi incorporado ao Vertex AI (e hoje sentiment custom tende a usar Gemini).

#### Q196 · 1.2 · curso 2 · média

You work for a company that captures live video footage of checkout areas in their retail stores. You need to use the live video footage to build a model to detect the number of customers waiting for service in near real time. You want to implement a solution quickly and with minimal effort. How should you build the model?

- **A.** Use the Vertex AI Vision Occupancy Analytics model.
- **B.** Use the Vertex AI Vision Person/vehicle detector model.
- **C.** Train an AutoML object detection model on an annotated dataset by using Vertex AutoML.
- **D.** Train a Seq2Seq+ object detection model on an annotated dataset by using Vertex AutoML.

> [!success]- Resposta: **A**
> O modelo Occupancy Analytics do Vertex AI Vision é pré-treinado para contar pessoas/veículos em zonas e filas de vídeo ao vivo, entregando a contagem quase em tempo real sem treino. O Person/vehicle detector (B) apenas detecta objetos e exigiria lógica extra de contagem por zona; treinar AutoML (C, D) é mais lento e trabalhoso.
> *Conceitos:* Vertex AI Vision, Occupancy Analytics, vídeo em streaming

#### Q200 · 1.2 · curso 2 · média

You work for a hotel and have a dataset that contains customers’ written comments scanned from paper-based customer feedback forms, which are stored as PDF files. Every form has the same layout. You need to quickly predict an overall satisfaction score from the customer comments on each form. How should you accomplish this task?

- **A.** Use the Vision API to parse the text from each PDF file. Use the Natural Language API analyzeSentiment feature to infer overall satisfaction scores.
- **B.** Use the Vision API to parse the text from each PDF file. Use the Natural Language API analyzeEntitySentiment feature to infer overall satisfaction scores.
- **C.** Uptrain a Document AI custom extractor to parse the text in the comments section of each PDF file. Use the Natural Language API analyzeSentiment feature to infer overall satisfaction scores.
- **D.** Uptrain a Document AI custom extractor to parse the text in the comments section of each PDF file. Use the Natural Language API analyzeEntitySentiment feature to infer overall satisfaction scores.

> [!success]- Resposta: **C**
> Como todos os formulários têm o mesmo layout, um Document AI custom extractor isola o texto da seção de comentários com precisão, e analyzeSentiment da Natural Language API devolve o sentimento geral do documento, que mapeia para a satisfação geral. Vision API OCR (A) extrai o texto da página inteira, misturando campos irrelevantes; analyzeEntitySentiment (B, D) dá sentimento por entidade, não um score global.
> *Conceitos:* Document AI, custom extractor, Natural Language API, analyzeSentiment

#### Q239 · 1.2 · curso 2 · fácil

You work for a pet food company that manages an online forum. Customers upload photos of their pets on the forum to share with others. About 20 photos are uploaded daily. You want to automatically and in near real time detect whether each uploaded photo has an animal. You want to prioritize time and minimize cost of your application development and deployment. What should you do?

- **A.** Send user-submitted images to the Cloud Vision API. Use object localization to identify all objects in the image and compare the results against a list of animals.
- **B.** Download an object detection model from TensorFlow Hub. Deploy the model to a Vertex AI endpoint. Send new user-submitted images to the model endpoint to classify whether each photo has an animal.
- **C.** Manually label previously submitted images with bounding boxes around any animals. Build an AutoML object detection model by using Vertex AI. Deploy the model to a Vertex AI endpoint Send new user-submitted images to your model endpoint to detect whether each photo has an animal.
- **D.** Manually label previously submitted images as having animals or not. Create an image dataset on Vertex AI. Train a classification model by using Vertex AutoML to distinguish the two classes. Deploy the model to a Vertex AI endpoint. Send new user-submitted images to your model endpoint to classify whether each photo has an animal.

> [!success]- Resposta: **A**
> Com apenas cerca de 20 fotos por dia, a Cloud Vision API (object localization ou labels) detecta animais sem treino, sem infraestrutura e com custo por uso mínimo. Deployar um modelo do TensorFlow Hub (B) gera custo fixo de endpoint, e treinar AutoML com rotulagem manual (C, D) consome muito tempo.
> *Conceitos:* Cloud Vision API, object localization, APIs pré-treinadas

#### Q258 · 1.2 · curso 2 · média

You work for an international manufacturing organization that ships scientific products all over the world. Instruction manuals for these products need to be translated to 15 different languages. Your organization’s leadership team wants to start using machine learning to reduce the cost of manual human translations and increase translation speed. You need to implement a scalable solution that maximizes accuracy and minimizes operational overhead. You also want to include a process to evaluate and fix incorrect translations. What should you do?

- **A.** Create a workflow using Cloud Function triggers. Configure a Cloud Function that is triggered when documents are uploaded to an input Cloud Storage bucket. Configure another Cloud Function that translates the documents using the Cloud Translation API, and saves the translations to an output Cloud Storage bucket. Use human reviewers to evaluate the incorrect translations.
- **B.** Create a Vertex AI pipeline that processes the documents launches, an AutoML Translation training job, evaluates the translations and deploys the model to a Vertex AI endpoint with autoscaling and model monitoring. When there is a predetermined skew between training and live data, re-trigger the pipeline with the latest data.
- **C.** Use AutoML Translation to train a model. Configure a Translation Hub project, and use the trained model to translate the documents. Use human reviewers to evaluate the incorrect translations.
- **D.** Use Vertex AI custom training jobs to fine-tune a state-of-the-art open source pretrained model with your data. Deploy the model to a Vertex AI endpoint with autoscaling and model monitoring. When there is a predetermined skew between the training and live data, configure a trigger to run another training job with the latest data.

> [!success]- Resposta: **C**
> AutoML Translation treinado com dados do domínio maximiza a qualidade, e o Translation Hub gerencia a tradução de documentos em vários idiomas com fluxo de pós-edição por revisores humanos, minimizando overhead. Cloud Functions com a Translation API genérica (A) é menos precisa e exige montar o fluxo; B e D são complexos demais.
> *Conceitos:* AutoML Translation, Translation Hub, human-in-the-loop

#### Q282 · 1.2 · curso 2 · média

ou work at an organization that maintains a cloud-based communication platform that integrates conventional chat, voice, and video conferencing into one platform. The audio recordings are stored in Cloud Storage. All recordings have an 8 kHz sample rate and are more than one minute long. You need to implement a new feature in the platform that will automatically transcribe voice call recordings into a text for future applications, such as call summarization and sentiment analysis. How should you implement the voice call transcription feature following Google-recommended best practices?

- **A.** Use the original audio sampling rate, and transcribe the audio by using the Speech-to-Text API with synchronous recognition.
- **B.** Use the original audio sampling rate, and transcribe the audio by using the Speech-to-Text API with asynchronous recognition.
- **C.** Upsample the audio recordings to 16 kHz, and transcribe the audio by using the Speech-to-Text API with synchronous recognition.
- **D.** Upsample the audio recordings to 16 kHz, and transcribe the audio by using the Speech-to-Text API with asynchronous recognition.

> [!success]- Resposta: **B** · votos no arquivo: B (56%) D (44%)
> A boa prática do Speech-to-Text é usar a taxa de amostragem nativa (sem resampling, que não melhora a qualidade e pode piorar) e, para áudios com mais de um minuto, usar reconhecimento assíncrono (LongRunningRecognize). Upsample para 16 kHz (D) é tentador porque 16 kHz é o recomendado na captura, mas reamostrar áudio já gravado em 8 kHz não acrescenta informação.
> *Conceitos:* Speech-to-Text, asynchronous recognition, sample rate

#### Q283 · 1.2 · curso 2 · fácil

You work for a multinational organization that has recently begun operations in Spain. Teams within your organization will need to work with various Spanish documents, such as business, legal, and financial documents. You want to use machine learning to help your organization get accurate translations quickly and with the least effort. Your organization does not require domain-specific terms or jargon. What should you do?

- **A.** Create a Vertex AI Workbench notebook instance. In the notebook, extract sentences from the documents, and train a custom AutoML text model.
- **B.** Use Google Translate to translate 1,000 phrases from Spanish to English. Using these translated pairs, train a custom AutoML Translation model.
- **C.** Use the Document Translation feature of the Cloud Translation API to translate the documents.
- **D.** Create a Vertex AI Workbench notebook instance. In the notebook, convert the Spanish documents into plain text, and create a custom TensorFlow seq2seq translation model.

> [!success]- Resposta: **C**
> A Document Translation da Cloud Translation API traduz documentos inteiros mantendo formatação, sem treino, com o mínimo de esforço, o que basta já que não há jargão de domínio. AutoML Translation (B) só se justifica com terminologia específica, e modelos próprios (A/D) são esforço excessivo.
> *Conceitos:* Cloud Translation API, Document Translation, pre-trained API

## 1.3 AutoML

#### Q7 · 1.3 · curso 1 · fácil

You need to build classification workflows over several structured datasets currently stored in BigQuery. Because you will be performing the classification several times, you want to complete the following steps without writing code: exploratory data analysis, feature selection, model building, training, and hyperparameter tuning and serving. What should you do?

- **A.** Configure AutoML Tables to perform the classification task.
- **B.** Run a BigQuery ML task to perform logistic regression for the classification.
- **C.** Use AI Platform Notebooks to run the classification model with pandas library.
- **D.** Use AI Platform to run the classification model job configured for hyperparameter tuning.

> [!success]- Resposta: **A**
> AutoML Tables cobre EDA, seleção de features, treino, tuning e serving sem escrever código. BigQuery ML (B) exige escrever SQL e não faz feature selection e tuning de forma totalmente automática; notebooks e AI Platform exigem código.
> *Conceitos:* AutoML, tabular, no-code
> *Nome atual:* AutoML Tables hoje é Vertex AI AutoML para dados tabulares.

#### Q18 · 1.3 · curso 1 · média

You work for a large hotel chain and have been asked to assist the marketing team in gathering predictions for a targeted marketing strategy. You need to make predictions about user lifetime value (LTV) over the next 20 days so that marketing can be adjusted accordingly. The customer dataset is in BigQuery, and you are preparing the tabular data for training with AutoML Tables. This data has a time signal that is spread across multiple columns. How should you ensure that AutoML fits the best model to your data?

- **A.** Manually combine all columns that contain a time signal into an array. AIlow AutoML to interpret this array appropriately. Choose an automatic data split across the training, validation, and testing sets.
- **B.** Submit the data for training without performing any manual transformations. AIlow AutoML to handle the appropriate transformations. Choose an automatic data split across the training, validation, and testing sets.
- **C.** Submit the data for training without performing any manual transformations, and indicate an appropriate column as the Time column. AIlow AutoML to split your data based on the time signal provided, and reserve the more recent data for the validation and testing sets.
- **D.** Submit the data for training without performing any manual transformations. Use the columns that have a time signal to manually split your data. Ensure that the data in your validation set is from 30 days after the data in your training set and that the data in your testing sets from 30 days after your validation set.

> [!success]- Resposta: **C** ⚠️ o arquivo dizia **D**; revisado para **C**
> O gabarito D está errado: o AutoML Tables permite indicar uma coluna como Time column, e então faz o split cronológico automaticamente, reservando dados mais recentes para validação e teste. A opção D faz manualmente o que o AutoML já resolve e com intervalos de 30 dias arbitrários; a opção B ignora a ordem temporal e causaria leakage.
> *Conceitos:* AutoML, time column, data split, leakage
> *Nome atual:* AutoML Tables hoje é Vertex AI AutoML para dados tabulares.

#### Q44 · 1.3 · curso 2 · média

You work for a large technology company that wants to modernize their contact center. You have been asked to develop a solution to classify incoming calls by product so that requests can be more quickly routed to the correct support team. You have already transcribed the calls using the Speech-to-Text API. You want to minimize data preprocessing and development time. How should you build the model?

- **A.** Use the AI Platform Training built-in algorithms to create a custom model.
- **B.** Use AutoMlL Natural Language to extract custom entities for classification.
- **C.** Use the Cloud Natural Language API to extract custom entities for classification.
- **D.** Build a custom model to identify the product keywords from the transcribed calls, and then run the keywords through a classification algorithm.

> [!success]- Resposta: **B**
> AutoML Natural Language treina um extrator de entidades customizadas (produtos) com pouco preparo de dados e desenvolvimento. A Cloud Natural Language API (C) é tentadora, mas não extrai entidades customizadas do domínio da empresa.
> *Conceitos:* AutoML, entity extraction, Natural Language
> *Nome atual:* AutoML Natural Language virou Vertex AI AutoML text, hoje descontinuado em favor de tuning de Gemini.

#### Q56 · 1.3 · curso 5 · média

You work for a credit card company and have been asked to create a custom fraud detection model based on historical data using AutoML Tables. You need to prioritize detection of fraudulent transactions while minimizing false positives. Which optimization objective should you use when training the model?

- **A.** An optimization objective that minimizes Log loss
- **B.** An optimization objective that maximizes the Precision at a Recall value of 0.50
- **C.** An optimization objective that maximizes the area under the precision-recall curve (AUC PR) value
- **D.** An optimization objective that maximizes the area under the receiver operating characteristic curve (AUC ROC) value

> [!success]- Resposta: **C**
> Em fraude o dataset é muito desbalanceado e o foco é a classe positiva rara; AUC PR otimiza o trade-off entre precision e recall nessa classe. AUC ROC (D) é tentadora, mas fica otimista em dados desbalanceados por causa dos muitos verdadeiros negativos.
> *Conceitos:* AutoML Tables, AUC PR, desbalanceamento
> *Nome atual:* AutoML Tables hoje é Vertex AI AutoML tabular.

#### Q67 · 1.3 · curso 1 · fácil

You have a large corpus of written support cases that can be classified into 3 separate categories: Technical Support, Billing Support, or Other Issues. You need to quickly build, test, and deploy a service that will automatically classify future written requests into one of the categories. How should you configure the pipeline?

- **A.** Use the Cloud Natural Language API to obtain metadata to classify the incoming cases.
- **B.** Use AutoML Natural Language to build and test a classifier. Deploy the model as a REST API.
- **C.** Use BigQuery ML to build and test a logistic regression model to classify incoming requests. Use BigQuery ML to perform inference.
- **D.** Create a TensorFlow model using Google’s BERT pre-trained model. Build and test a classifier, and deploy the model using Vertex AI.

> [!success]- Resposta: **B**
> Categorias customizadas e necessidade de rapidez apontam para AutoML de texto, que treina, avalia e implanta como endpoint REST sem código de modelagem. A Natural Language API (A) só tem categorias predefinidas; BERT custom (D) é mais trabalhoso.
> *Conceitos:* AutoML, classificação de texto, low-code
> *Nome atual:* AutoML Natural Language virou Vertex AI AutoML text, hoje substituído por tuning de Gemini para classificação de texto.

#### Q68 · 1.3 · curso 1 · fácil

You need to quickly build and train a model to predict the sentiment of customer reviews with custom categories without writing code. You do not have enough data to train a model from scratch. The resulting model should have high predictive performance. Which service should you use?

- **A.** AutoML Natural Language
- **B.** Cloud Natural Language API
- **C.** AI Hub pre-made Jupyter Notebooks
- **D.** AI Platform Training built-in algorithms

> [!success]- Resposta: **A**
> AutoML Natural Language treina sentimento com categorias customizadas sem código e usa transfer learning, funcionando com poucos dados. A Natural Language API (B) não aceita categorias customizadas de sentimento.
> *Conceitos:* AutoML, sentiment analysis, no-code
> *Nome atual:* AutoML Natural Language virou Vertex AI AutoML text, hoje substituído por tuning de Gemini.

#### Q111 · 1.3 · curso 1 · fácil

You need to build classification workflows over several structured datasets currently stored in BigQuery. Because you will be performing the classification several times, you want to complete the following steps without writing code: exploratory data analysis, feature selection, model building, training, and hyperparameter tuning and serving. What should you do?

- **A.** Train a TensorFlow model on Vertex AI.
- **B.** Train a classification Vertex AutoML model.
- **C.** Run a logistic regression job on BigQuery ML.
- **D.** Use scikit-learn in Notebooks with pandas library.

> [!success]- Resposta: **B**
> Vertex AutoML tabular cobre EDA, seleção de features, treino, hyperparameter tuning e serving sem escrever código, lendo direto do BigQuery. BigQuery ML (C) é tentador, mas exige escrever SQL e não automatiza todo o fluxo; as opções com TensorFlow e scikit-learn exigem código.
> *Conceitos:* AutoML, tabular, no-code

#### Q156 · 1.3 · curso 1 · fácil

You need to build classification workflows over several structured datasets currently stored in BigQuery. Because you will be performing the classification several times, you want to complete the following steps without writing code: exploratory data analysis, feature selection, model building, training, and hyperparameter tuning and serving. What should you do?

- **A.** Train a TensorFlow model on Vertex AI.
- **B.** Train a classification Vertex AutoML model.
- **C.** Run a logistic regression job on BigQuery ML.
- **D.** Use scikit-learn in Vertex AI Workbench user-managed notebooks with pandas library.

> [!success]- Resposta: **B**
> AutoML tabular faz EDA, feature selection, treino, tuning e serving sem código, direto a partir do BigQuery. BigQuery ML (C) exige SQL e escolhas manuais, e TensorFlow ou scikit-learn (A, D) exigem código.
> *Conceitos:* AutoML, tabular classification, no-code
> *Nome atual:* Vertex AI Workbench user-managed notebooks foi descontinuado; o equivalente atual são as Vertex AI Workbench instances.

#### Q165 · 1.3 · curso 1 · fácil

You want to train an AutoML model to predict house prices by using a small public dataset stored in BigQuery. You need to prepare the data and want to use the simplest, most efficient approach. What should you do?

- **A.** Write a query that preprocesses the data by using BigQuery and creates a new table. Create a Vertex AI managed dataset with the new table as the data source.
- **B.** Use Dataflow to preprocess the data. Write the output in TFRecord format to a Cloud Storage bucket.
- **C.** Write a query that preprocesses the data by using BigQuery. Export the query results as CSV files, and use those files to create a Vertex AI managed dataset.
- **D.** Use a Vertex AI Workbench notebook instance to preprocess the data by using the pandas library. Export the data as CSV files, and use those files to create a Vertex AI managed dataset.

> [!success]- Resposta: **A**
> Pré-processar com SQL no BigQuery e criar o Vertex AI managed dataset direto da tabela é o caminho mais simples, sem exportar arquivos. Exportar CSV (C, D) ou usar Dataflow com TFRecord (B) adiciona passos desnecessários, e AutoML tabular nem consome TFRecord.
> *Conceitos:* AutoML, BigQuery, managed dataset

#### Q168 · 1.3 · curso 1 · fácil

You need to develop an image classification model by using a large dataset that contains labeled images in a Cloud Storage bucket. What should you do?

- **A.** Use Vertex AI Pipelines with the Kubeflow Pipelines SDK to create a pipeline that reads the images from Cloud Storage and trains the model.
- **B.** Use Vertex AI Pipelines with TensorFlow Extended (TFX) to create a pipeline that reads the images from Cloud Storage and trains the model.
- **C.** Import the labeled images as a managed dataset in Vertex AI and use AutoML to train the model.
- **D.** Convert the image dataset to a tabular format using Dataflow Load the data into BigQuery and use BigQuery ML to train the model.

> [!success]- Resposta: **C**
> Para classificação de imagens com dataset rotulado no Cloud Storage, importar como managed dataset e usar AutoML é a solução gerenciada e de menor esforço. Pipelines com KFP ou TFX (A, B) exigem código custom, e converter imagens em tabela para o BigQuery ML (D) não faz sentido.
> *Conceitos:* AutoML Image, managed dataset, Cloud Storage

#### Q184 · 1.3 · curso 1 · difícil

You work for a retail company. You have a managed tabular dataset in Vertex AI that contains sales data from three different stores. The dataset includes several features, such as store name and sale timestamp. You want to use the data to train a model that makes sales predictions for a new store that will open soon. You need to split the data between the training, validation, and test sets. What approach should you use to split the data?

- **A.** Use Vertex AI manual split, using the store name feature to assign one store for each set
- **B.** Use Vertex AI default data split
- **C.** Use Vertex AI chronological split, and specify the sales timestamp feature as the time variable
- **D.** Use Vertex AI random split, assigning 70% of the rows to the training set, 10% to the validation set, and 20% to the test set

> [!success]- Resposta: **C**
> Para previsão de vendas, o split cronológico pelo timestamp evita leakage temporal e reflete o uso real do modelo. O split manual por loja (A) é tentador por simular uma loja nova, mas com só três lojas deixaria uma única loja para treino, com dados insuficientes. Splits aleatórios (B, D) vazam informação do futuro.
> *Conceitos:* data split, chronological split, Vertex AI datasets

#### Q204 · 1.3 · curso 1 · fácil

You work for an auto insurance company. You are preparing a proof-of-concept ML application that uses images of damaged vehicles to infer damaged parts. Your team has assembled a set of annotated images from damage claim documents in the company’s database. The annotations associated with each image consist of a bounding box for each identified damaged part and the part name. You have been given a sufficient budget to train models on Google Cloud. You need to quickly create an initial model. What should you do?

- **A.** Download a pre-trained object detection model from TensorFlow Hub. Fine-tune the model in Vertex AI Workbench by using the annotated image data.
- **B.** Train an object detection model in AutoML by using the annotated image data.
- **C.** Create a pipeline in Vertex AI Pipelines and configure the AutoMLTrainingJobRunOp component to train a custom object detection model by using the annotated image data.
- **D.** Train an object detection model in Vertex AI custom training by using the annotated image data.

> [!success]- Resposta: **B**
> AutoML Object Detection no Vertex AI treina um modelo inicial a partir das imagens anotadas com bounding boxes sem escrever código, o caminho mais rápido para uma PoC. Fine-tuning de modelo do TensorFlow Hub (A) ou custom training (D) exigem código, e montar um pipeline com AutoMLTrainingJobRunOp (C) adiciona complexidade desnecessária para um primeiro modelo.
> *Conceitos:* AutoML, object detection, Vertex AI, PoC

#### Q207 · 1.3 · curso 1 · difícil

You work for a hospital that wants to optimize how it schedules operations. You need to create a model that uses the relationship between the number of surgeries scheduled and beds used. You want to predict how many beds will be needed for patients each day in advance based on the scheduled surgeries. You have one year of data for the hospital organized in 365 rows. The data includes the following variables for each day: • Number of scheduled surgeries • Number of beds occupied • Date You want to maximize the speed of model development and testing. What should you do?

- **A.** Create a BigQuery table. Use BigQuery ML to build a regression model, with number of beds as the target variable, and number of scheduled surgeries and date features (such as day of week) as the predictors.
- **B.** Create a BigQuery table. Use BigQuery ML to build an ARIMA model, with number of beds as the target variable, and date as the time variable.
- **C.** Create a Vertex AI tabular dataset. Train an AutoML regression model, with number of beds as the target variable, and number of scheduled minor surgeries and date features (such as day of the week) as the predictors.
- **D.** Create a Vertex AI tabular dataset. Train a Vertex AI AutoML Forecasting model, with number of beds as the target variable, number of scheduled surgeries as a covariate and date as the time variable.

> [!success]- Resposta: **D** · votos no arquivo: D(58%) A(17%) B(17%) C (8%)
> O problema é de série temporal em que o número de cirurgias agendadas é conhecido antecipadamente, então o AutoML Forecasting com esse valor como covariate conhecida no futuro e a data como time column modela diretamente a demanda diária de leitos com pouco esforço. A regressão em BigQuery ML (A) é uma alternativa forte e mais rápida de treinar, por isso parte da comunidade a escolhe; ARIMA (B) ignora a variável de cirurgias e C usa apenas cirurgias 'menores', descartando informação.
> *Conceitos:* AutoML Forecasting, covariates, séries temporais, BigQuery ML

#### Q221 · 1.3 · curso 1 · média

You work at a leading healthcare firm developing state-of-the-art algorithms for various use cases. You have unstructured textual data with custom labels. You need to extract and classify various medical phrases with these labels. What should you do?

- **A.** Use the Healthcare Natural Language API to extract medical entities
- **B.** Use a BERT-based model to fine-tune a medical entity extraction model
- **C.** Use AutoML Entity Extraction to train a medical entity extraction model
- **D.** Use TensorFlow to build a custom medical entity extraction model

> [!success]- Resposta: **C**
> Como os rótulos são customizados, AutoML Entity Extraction treina um extrator com as labels próprias sem precisar de código. A Healthcare Natural Language API (A) é tentadora, mas só extrai entidades médicas com sua taxonomia fixa, sem suportar labels customizadas; BERT ou TensorFlow customizados (B, D) exigem muito mais esforço.
> *Conceitos:* AutoML, entity extraction, labels customizadas, Healthcare Natural Language API
> *Nome atual:* AutoML Entity Extraction (AutoML Natural Language) virou Vertex AI AutoML text entity extraction, hoje descontinuado em favor de tuning de modelos Gemini.

#### Q265 · 1.3 · curso 1 · fácil

You work for a company that is developing an application to help users with meal planning. You want to use machine learning to scan a corpus of recipes and extract each ingredient (e.g., carrot, rice, pasta) and each kitchen cookware (e.g., bowl, pot, spoon) mentioned. Each recipe is saved in an unstructured text file. What should you do?

- **A.** Create a text dataset on Vertex AI for entity extraction Create two entities called “ingredient” and “cookware”, and label at least 200 examples of each entity. Train an AutoML entity extraction model to extract occurrences of these entity types. Evaluate performance on a holdout dataset.
- **B.** Create a multi-label text classification dataset on Vertex AI. Create a test dataset, and label each recipe that corresponds to its ingredients and cookware. Train a multi-class classification model. Evaluate the model’s performance on a holdout dataset.
- **C.** Use the Entity Analysis method of the Natural Language API to extract the ingredients and cookware from each recipe. Evaluate the model's performance on a prelabeled dataset.
- **D.** Create a text dataset on Vertex AI for entity extraction. Create as many entities as there are different ingredients and cookware. Train an AutoML entity extraction model to extract those entities. Evaluate the model’s performance on a holdout dataset.

> [!success]- Resposta: **A**
> Entity extraction com AutoML e duas entidades ('ingredient' e 'cookware') com exemplos rotulados é o que o problema pede: extrair menções em texto não estruturado. A Entity Analysis da Natural Language API (C) não reconhece essas categorias customizadas; criar uma entidade por ingrediente (D) é inviável.
> *Conceitos:* AutoML, entity extraction, NLP

#### Q272 · 1.3 · curso 1 · média

You work for a semiconductor manufacturing company. You need to create a real-time application that automates the quality control process. High-definition images of each semiconductor are taken at the end of the assembly line in real time. The photos are uploaded to a Cloud Storage bucket along with tabular data that includes each semiconductor’s batch number, serial number, dimensions, and weight. You need to configure model training and serving while maximizing model accuracy. What should you do?

- **A.** Use Vertex AI Data Labeling Service to label the images, and tram an AutoML image classification model. Deploy the model, and configure Pub/Sub to publish a message when an image is categorized into the failing class.
- **B.** Use Vertex AI Data Labeling Service to label the images, and train an AutoML image classification model. Schedule a daily batch prediction job that publishes a Pub/Sub message when the job completes.
- **C.** Convert the images into an embedding representation. Import this data into BigQuery, and train a BigQuery ML K-means clustering model with two clusters. Deploy the model and configure Pub/Sub to publish a message when a semiconductor’s data is categorized into the failing cluster.
- **D.** Import the tabular data into BigQuery, use Vertex AI Data Labeling Service to label the data and train an AutoML tabular classification model. Deploy the model, and configure Pub/Sub to publish a message when a semiconductor’s data is categorized into the failing class.

> [!success]- Resposta: **A**
> Rotular as imagens e treinar um modelo AutoML de classificação de imagens maximiza a acurácia para inspeção visual, e o deploy online com Pub/Sub atende o requisito de tempo real. Batch diário (B) não é real-time, K-means não supervisionado (C) perde acurácia, e os dados tabulares (D) não capturam defeitos visuais.
> *Conceitos:* AutoML, image classification, Pub/Sub, data labeling
> *Nome atual:* Vertex AI Data Labeling Service foi descontinuado; a rotulagem hoje é feita por ferramentas próprias/parceiros e o AutoML de imagem é usado via Vertex AI.
