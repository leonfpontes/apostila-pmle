---
title: "PMLE — Questões da seção 3: Escalar protótipos em modelos de ML"
aliases: ["questões PMLE seção 3"]
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
summary: "81 questões de prática do exame Professional ML Engineer na seção 3 do guia (Escalar protótipos em modelos de ML, 18% da prova), com gabarito revisado e explicação em português."
parte_de: "[[pmle-banco-de-questoes]]"
related: ["[[pmle-guia-do-exame]]"]
---

# PMLE — Questões da seção 3: Escalar protótipos em modelos de ML

Seção 3 do guia oficial · **18% da prova** · 81 questões. Faz parte do [[pmle-banco-de-questoes|banco de questões]]. As questões estão em inglês, como na prova; a resposta fica fechada no bloco verde (no Obsidian, clique para abrir).

| Subseção | Questões |
|---|---|
| 3.1 Construir modelos (framework, arquitetura, interpretabilidade) | 24 |
| 3.2 Treinar modelos | 36 |
| 3.3 Hardware para treino | 21 |

## 3.1 Construir modelos (framework, arquitetura, interpretabilidade)

#### Q2 · 3.1 · curso 1 · média

Your organization wants to make its internal shuttle service route more efficient. The shuttles currently stop at all pick-up points across the city every 30 minutes between 7 am and 10 am. The development team has already built an application on Google Kubernetes Engine that requires users to confirm their presence and shuttle station one day in advance. What approach should you take?

- **A.** 1. Build a tree-based regression model that predicts how many passengers will be picked up at each shuttle station. 2. Dispatch an appropriately sized shuttle and provide the map with the required stops based on the prediction.
- **B.** 1. Build a tree-based classification model that predicts whether the shuttle should pick up passengers at each shuttle station. 2. Dispatch an available shuttle and provide the map with the required stops based on the prediction.
- **C.** 1. Define the optimal route as the shortest route that passes by all shuttle stations with confirmed attendance at the given time under capacity constraints. 2. Dispatch an appropriately sized shuttle and indicate the required stops on the map.
- **D.** 1. Build a reinforcement learning model with tree-based classification models that predict the presence of passengers at shuttle stops as agents and a reward function around a distance-based metric. 2. Dispatch an appropriately sized shuttle and provide the map with the required stops based on the simulated outcome.

> [!success]- Resposta: **C**
> Como os usuários já confirmam presença e estação com um dia de antecedência, não há nada a prever: basta resolver um problema de otimização de rota (caminho mais curto com restrição de capacidade). Os modelos de regressão, classificação ou RL são tentadores, mas adicionam complexidade e erro desnecessários quando o dado já é conhecido.
> *Conceitos:* problem framing, otimização, quando não usar ML

#### Q10 · 3.1 · curso 5 · média

our team needs to build a model that predicts whether images contain a driver's license, passport, or credit card. The data engineering team already built the pipeline and generated a dataset composed of 10,000 images with driver's licenses, 1,000 images with passports, and 1,000 images with credit cards. You now have to train a model with the following label map: [`˜drivers_license', `˜passport', `˜credit_card']. Which loss function should you use?

- **A.** Categorical hinge
- **B.** Binary cross-entropy
- **C.** Categorical cross-entropy
- **D.** Sparse categorical cross-entropy

> [!success]- Resposta: **C**
> Com três classes mutuamente exclusivas e label map em formato categórico (one-hot), a perda adequada é categorical cross-entropy. Sparse categorical cross-entropy (D) é tentadora, mas é usada quando os rótulos são inteiros; binary cross-entropy serve para problemas binários ou multilabel.
> *Conceitos:* loss function, multiclass, cross-entropy

#### Q16 · 3.1 · curso 5 · fácil

You are an ML engineer at a large grocery retailer with stores in multiple regions. You have been asked to create an inventory prediction model. Your model's features include region, location, historical demand, and seasonal popularity. You want the algorithm to learn from new inventory data on a daily basis. Which algorithms should you use to build the model?

- **A.** Classification
- **B.** Reinforcement Learning
- **C.** Recurrent Neural Networks (RNN)
- **D.** Convolutional Neural Networks (CNN)

> [!success]- Resposta: **C**
> Previsão de inventário a partir de demanda histórica e sazonalidade é um problema de séries temporais, para o qual RNNs são a escolha entre as opções. Classificação (A) não prevê quantidade e CNN (D) é voltada a imagens; RL (B) é tentador pelo aprendizado diário, mas não é o tipo de problema.
> *Conceitos:* time series, RNN, forecasting

#### Q24 · 3.1 · curso 5 · fácil

You are an ML engineer at a global shoe store. You manage the ML models for the company's website. You are asked to build a model that will recommend new products to the user based on their purchase behavior and similarity with other users. What should you do?

- **A.** Build a classification model
- **B.** Build a knowledge-based filtering model
- **C.** Build a collaborative-based filtering model
- **D.** Build a regression model using the features as predictors

> [!success]- Resposta: **C**
> Recomendar com base na similaridade com outros usuários é exatamente collaborative filtering. Knowledge-based filtering (B) usa regras ou atributos explícitos, não o comportamento de usuários semelhantes.
> *Conceitos:* recommendation, collaborative filtering

#### Q42 · 3.1 · curso 4 · média

You are an ML engineer at a global car manufacture. You need to build an ML model to predict car sales in different cities around the world. Which features or feature crosses should you use to train city-specific relationships between car type and number of sales?

- **A.** Thee individual features: binned latitude, binned longitude, and one-hot encoded car type.
- **B.** One feature obtained as an element-wise product between latitude, longitude, and car type.
- **C.** One feature obtained as an element-wise product between binned latitude, binned longitude, and one-hot encoded car type.
- **D.** Two feature crosses as an element-wise product: the first between binned latitude and one-hot encoded car type, and the second between binned longitude and one-hot encoded car type.

> [!success]- Resposta: **C**
> Um único feature cross entre latitude binarizada, longitude binarizada e tipo de carro one-hot permite aprender relações específicas por cidade e tipo. Crosses separados (D) não capturam a combinação de latitude e longitude que define a cidade, e valores contínuos (B) não funcionam em crosses.
> *Conceitos:* feature cross, binning, one-hot encoding

#### Q54 · 3.1 · curso 5 · média

Your team has been tasked with creating an ML solution in Google Cloud to classify support requests for one of your platforms. You analyzed the requirements and decided to use TensorFlow to build the classifier so that you have full control of the model's code, serving, and deployment. You will use Kubeflow pipelines for the ML platform. To save time, you want to build on existing resources and use managed services instead of building a completely new model. How should you build the classifier?

- **A.** Use the Natural Language API to classify support requests.
- **B.** Use AutoML Natural Language to build the support requests classifier.
- **C.** Use an established text classification model on AI Platform to perform transfer learning.
- **D.** Use an established text classification model on AI Platform as-is to classify support requests.

> [!success]- Resposta: **C**
> Requisito de controle total do código em TensorFlow mais reaproveitar recursos existentes aponta para transfer learning sobre um modelo de classificação de texto já estabelecido. Natural Language API e AutoML (A, B) tiram o controle do código; usar o modelo as-is (D) não se adapta às categorias específicas de suporte.
> *Conceitos:* transfer learning, TensorFlow, classificação de texto
> *Nome atual:* AI Platform hoje é Vertex AI (Training, Prediction, Workbench).

#### Q72 · 3.1 · curso 5 · fácil

You are building a linear model with over 100 input features, all with values between –1 and 1. You suspect that many features are non-informative. You want to remove the non-informative features from your model while keeping the informative ones in their original form. Which technique should you use?

- **A.** Use principal component analysis (PCA) to eliminate the least informative features.
- **B.** Use L1 regularization to reduce the coefficients of uninformative features to 0.
- **C.** After building your model, use Shapley values to determine which features are the most informative.
- **D.** Use an iterative dropout technique to identify which features do not degrade the model when removed.

> [!success]- Resposta: **B**
> L1 (Lasso) zera os coeficientes de features não informativas e mantém as demais no formato original, fazendo seleção de features embutida. PCA (A) é tentador, mas cria componentes combinados e perde o formato original das features.
> *Conceitos:* L1 regularization, feature selection, modelo linear

#### Q78 · 3.1 · curso 5 · fácil

You are creating a deep neural network classification model using a dataset with categorical input values. Certain columns have a cardinality greater than 10,000 unique values. How should you encode these categorical values as input into the model?

- **A.** Convert each categorical value into an integer value.
- **B.** Convert the categorical string data to one-hot hash buckets.
- **C.** Map the categorical variables into a vector of boolean values.
- **D.** Convert each categorical value into a run-length encoded string.

> [!success]- Resposta: **B**
> Para cardinalidade acima de 10 mil, hash buckets limitam a dimensionalidade sem manter um vocabulário enorme. Converter para inteiros (A) é tentador, mas impõe uma ordem artificial entre as categorias.
> *Conceitos:* feature hashing, alta cardinalidade, encoding

#### Q79 · 3.1 · curso 5 · fácil

You need to train a natural language model to perform text classification on product descriptions that contain millions of examples and 100,000 unique words. You want to preprocess the words individually so that they can be fed into a recurrent neural network. What should you do?

- **A.** Create a hot-encoding of words, and feed the encodings into your model.
- **B.** Identify word embeddings from a pre-trained model, and use the embeddings in your model.
- **C.** Sort the words by frequency of occurrence, and use the frequencies as the encodings in your model.
- **D.** Assign a numerical value to each word from 1 to 100,000 and feed the values as inputs in your model.

> [!success]- Resposta: **B**
> Word embeddings pré-treinados dão representações densas e semânticas para 100 mil palavras e funcionam bem com RNN. One-hot (A) gera vetores enormes e esparsos, e índices numéricos (D) impõem ordem sem significado.
> *Conceitos:* word embeddings, RNN, NLP

#### Q91 · 3.1 · curso 5 · média

You work on the data science team for a multinational beverage company. You need to develop an ML model to predict the company’s profitability for a new line of naturally flavored bottled waters in different locations. You are provided with historical data that includes product types, product sales volumes, expenses, and profits for all regions. What should you use as the input and output for your model?

- **A.** Use latitude, longitude, and product type as features. Use profit as model output.
- **B.** Use latitude, longitude, and product type as features. Use revenue and expenses as model outputs.
- **C.** Use product type and the feature cross of latitude with longitude, followed by binning, as features. Use profit as model output.
- **D.** Use product type and the feature cross of latitude with longitude, followed by binning, as features. Use revenue and expenses as model outputs.

> [!success]- Resposta: **C**
> Um feature cross de latitude com longitude, com binning, captura efeitos regionais que coordenadas cruas não capturam linearmente, e profit é o alvo direto do negócio. Prever revenue e expenses separadamente (B, D) complica o problema sem necessidade, e lat/long cruas (A) representam mal a localização.
> *Conceitos:* feature cross, binning, geolocalização

#### Q92 · 3.1 · curso 5 · média

You work on the data science team for a multinational beverage company. You need to develop an ML model to predict the company’s profitability for a new line of naturally flavored bottled waters in different locations. You are provided with historical data that includes product types, product sales volumes, expenses, and profits for all regions. What should you use as the input and output for your model?

- **A.** Use latitude, longitude, and product type as features. Use profit as model output.
- **B.** Use latitude, longitude, and product type as features. Use revenue and expenses as model outputs.
- **C.** Use product type and the feature cross of latitude with longitude, followed by binning, as features. Use profit as model output.
- **D.** Use product type and the feature cross of latitude with longitude, followed by binning, as features. Use revenue and expenses as model outputs.

> [!success]- Resposta: **C**
> Questão duplicada da anterior: o feature cross de latitude com longitude, com binning, representa a localização como regiões, e profit é o alvo direto. Usar lat/long como valores numéricos crus (A) é tentador, mas o modelo não aprende bem os efeitos regionais.
> *Conceitos:* feature cross, binning, geolocalização

#### Q100 · 3.1 · curso 1 · fácil

You are an ML engineer at a manufacturing company. You need to build a model that identifies defects in products based on images of the product taken at the end of the assembly line. You want your model to preprocess the images with lower computation to quickly extract features of defects in products. Which approach should you use to build the model?

- **A.** Reinforcement learning
- **B.** Recommender system
- **C.** Recurrent Neural Networks (RNN)
- **D.** Convolutional Neural Networks (CNN)

> [!success]- Resposta: **D** · o arquivo não trazia gabarito
> CNNs são a arquitetura padrão para visão computacional: as convoluções extraem features locais (como defeitos) com compartilhamento de pesos, o que reduz o custo computacional. RNNs (C) são para sequências, e reinforcement learning e recommender systems não se aplicam a classificação de imagens.
> *Conceitos:* CNN, visão computacional, detecção de defeitos

#### Q117 · 3.1 · curso 5 · fácil

You are an ML engineer at an ecommerce company and have been tasked with building a model that predicts how much inventory the logistics team should order each month. Which approach should you take?

- **A.** Use a clustering algorithm to group popular items together. Give the list to the logistics team so they can increase inventory of the popular items.
- **B.** Use a regression model to predict how much additional inventory should be purchased each month. Give the results to the logistics team at the beginning of the month so they can increase inventory by the amount predicted by the model.
- **C.** Use a time series forecasting model to predict each item's monthly sales. Give the results to the logistics team so they can base inventory on the amount predicted by the model.
- **D.** Use a classification model to classify inventory levels as UNDER_STOCKED, OVER_STOCKED, and CORRECTLY_STOCKEGive the report to the logistics team each month so they can fine-tune inventory levels.

> [!success]- Resposta: **C**
> Demanda de estoque varia no tempo com sazonalidade e tendências, então um modelo de time series forecasting por item é o enquadramento correto. Regressão (B) é tentadora, mas prever 'estoque adicional' ignora a estrutura temporal e não se baseia nas vendas por item; clustering e classificação não produzem quantidades.
> *Conceitos:* time series forecasting, demand forecasting, enquadramento do problema

#### Q119 · 3.1 · curso 1 · fácil

You work for a company that provides an anti-spam service that flags and hides spam posts on social media platforms. Your company currently uses a list of 200,000 keywords to identify suspected spam posts. If a post contains more than a few of these keywords, the post is identified as spam. You want to start using machine learning to flag spam posts for human review. What is the main advantage of implementing machine learning for this business case?

- **A.** Posts can be compared to the keyword list much more quickly.
- **B.** New problematic phrases can be identified in spam posts.
- **C.** A much longer keyword list can be used to flag spam posts.
- **D.** Spam posts can be flagged using far fewer keywords.

> [!success]- Resposta: **B**
> A vantagem de ML sobre a lista fixa de palavras-chave é generalizar e identificar novos padrões e frases problemáticas que não estão na lista. As demais opções descrevem ganhos que continuam presos ao paradigma de palavras-chave.
> *Conceitos:* ML vs regras, generalização, spam

#### Q121 · 3.1 · curso 1 · média

You work for a company that is developing a new video streaming platform. You have been asked to create a recommendation system that will suggest the next video for a user to watch. After a review by an AI Ethics team, you are approved to start development. Each video asset in your company’s catalog has useful metadata (e.g., content type, release date, country), but you do not have any historical user event data. How should you build the recommendation system for the first version of the product?

- **A.** Launch the product without machine learning. Present videos to users alphabetically, and start collecting user event data so you can develop a recommender model in the future.
- **B.** Launch the product without machine learning. Use simple heuristics based on content metadata to recommend similar videos to users, and start collecting user event data so you can develop a recommender model in the future.
- **C.** Launch the product with machine learning. Use a publicly available dataset such as MovieLens to train a model using the Recommendations AI, and then apply this trained model to your data.
- **D.** Launch the product with machine learning. Generate embeddings for each video by training an autoencoder on the content metadata using TensorFlow. Cluster content based on the similarity of these embeddings, and then recommend videos from the same cluster.

> [!success]- Resposta: **B**
> Sem dados de eventos de usuário, a recomendação é lançar com heurísticas simples baseadas nos metadados e coletar dados para treinar um modelo depois (regra 1 do Rules of ML). Usar MovieLens (C) é tentador, mas o modelo treinado em outro catálogo não transfere; o autoencoder (D) é complexo sem sinal de preferência dos usuários.
> *Conceitos:* cold start, heurísticas, Rules of ML
> *Nome atual:* Recommendations AI hoje é o Vertex AI Search for commerce.

#### Q128 · 3.1 · curso 1 · média

You are an ML engineer on an agricultural research team working on a crop disease detection tool to detect leaf rust spots in images of crops to determine the presence of a disease. These spots, which can vary in shape and size, are correlated to the severity of the disease. You want to develop a solution that predicts the presence and severity of the disease with high accuracy. What should you do?

- **A.** Create an object detection model that can localize the rust spots.
- **B.** Develop an image segmentation ML model to locate the boundaries of the rust spots.
- **C.** Develop a template matching algorithm using traditional computer vision libraries.
- **D.** Develop an image classification ML model to predict the presence of the disease.

> [!success]- Resposta: **B**
> Como forma e tamanho das manchas se correlacionam com a severidade, a segmentação de imagem, que delimita os contornos pixel a pixel, dá a informação necessária para prever presença e severidade. Object detection (A) é tentador, mas bounding boxes não capturam a forma e a área exata; classificação (D) só indica presença.
> *Conceitos:* image segmentation, visão computacional, object detection

#### Q139 · 3.1 · curso 1 · difícil

You work on a team in a data center that is responsible for server maintenance. Your management team wants you to build a predictive maintenance solution that uses monitoring data to detect potential server failures. Incident data has not been labeled yet. What should you do first?

- **A.** Train a time-series model to predict the machines’ performance values. Configure an alert if a machine’s actual performance values significantly differ from the predicted performance values.
- **B.** Develop a simple heuristic (e.g., based on z-score) to label the machines’ historical performance data. Use this heuristic to monitor server performance in real time.
- **C.** Develop a simple heuristic (e.g., based on z-score) to label the machines’ historical performance data. Train a model to predict anomalies based on this labeled dataset.
- **D.** Hire a team of qualified analysts to review and label the machines’ historical performance data. Train a model based on this manually labeled dataset.

> [!success]- Resposta: **C** · votos no arquivo: A(50%) C(36%)
> Sem rótulos, o primeiro passo prático é criar rótulos com uma heurística simples (z-score) sobre os dados históricos e então treinar um modelo de detecção de anomalias com eles. A opção A (prever o desempenho por série temporal e alertar em desvios) é tentadora e tem a maioria dos votos, mas não aproveita os dados de incidentes e funciona mais como monitoramento do que como previsão de falhas; contratar analistas (D) é caro e lento.
> *Conceitos:* predictive maintenance, heurística de rotulagem, anomaly detection

#### Q150 · 3.1 · curso 11 · fácil

You are working on a binary classification ML algorithm that detects whether an image of a classified scanned document contains a company’s logo. In the dataset, 96% of examples don’t have the logo, so the dataset is very skewed. Which metric would give you the most confidence in your model?

- **A.** Precision
- **B.** Recall
- **C.** RMSE
- **D.** F1 score

> [!success]- Resposta: **D**
> Com 96% de negativos, accuracy engana e olhar só precision ou só recall dá uma visão parcial; o F1 score equilibra os dois e é a métrica mais confiável aqui. RMSE (C) é métrica de regressão.
> *Conceitos:* F1 score, imbalanced data, precision, recall

#### Q154 · 3.1 · curso 11 · fácil

You are developing a classification model to support predictions for your company’s various products. The dataset you were given for model development has class imbalance You need to minimize false positives and false negatives What evaluation metric should you use to properly train the model?

- **A.** F1 score
- **B.** Recall
- **C.** Accuracy
- **D.** Precision

> [!success]- Resposta: **A**
> Minimizar falsos positivos e falsos negativos ao mesmo tempo pede o F1 score, a média harmônica de precision e recall. Accuracy (C) engana com classes desbalanceadas, e precision ou recall sozinhos otimizam só um dos tipos de erro.
> *Conceitos:* F1 score, class imbalance, evaluation metrics

#### Q195 · 3.1 · curso 14 · fácil

You work for a retail company. You have been asked to develop a model to predict whether a customer will purchase a product on a given day. Your team has processed the company’s sales data, and created a table with the following rows: • Customer_id • Product_id • Date • Days_since_last_purchase (measured in days) • Average_purchase_frequency (measured in 1/days) • Purchase (binary class, if customer purchased product on the Date) You need to interpret your model’s results for each individual prediction. What should you do?

- **A.** Create a BigQuery table. Use BigQuery ML to build a boosted tree classifier. Inspect the partition rules of the trees to understand how each prediction flows through the trees.
- **B.** Create a Vertex AI tabular dataset. Train an AutoML model to predict customer purchases. Deploy the model to a Vertex AI endpoint and enable feature attributions. Use the “explain” method to get feature attribution values for each individual prediction.
- **C.** Create a BigQuery table. Use BigQuery ML to build a logistic regression classification model. Use the values of the coefficients of the model to interpret the feature importance, with higher values corresponding to more importance
- **D.** Create a Vertex AI tabular dataset. Train an AutoML model to predict customer purchases. Deploy the model to a Vertex AI endpoint. At each prediction, enable L1 regularization to detect non-informative features.

> [!success]- Resposta: **B**
> AutoML tabular implantado em endpoint com feature attributions habilitadas permite chamar o método explain e obter a contribuição de cada feature por predição individual, com mínimo esforço. Inspecionar regras de partição das árvores (A) é inviável em ensembles, e coeficientes de regressão logística (C) dão importância global, não por predição, e dependem da escala das features.
> *Conceitos:* Vertex Explainable AI, feature attributions, AutoML, explain

#### Q197 · 3.1 · curso 14 · média

You work as an analyst at a large banking firm. You are developing a robust scalable ML pipeline to tram several regression and classification models. Your primary focus for the pipeline is model interpretability. You want to productionize the pipeline as quickly as possible. What should you do?

- **A.** Use Tabular Workflow for Wide & Deep through Vertex AI Pipelines to jointly train wide linear models and deep neural networks
- **B.** Use Google Kubernetes Engine to build a custom training pipeline for XGBoost-based models
- **C.** Use Tabular Workflow for TabNet through Vertex AI Pipelines to train attention-based models
- **D.** Use Cloud Composer to build the training pipelines for custom deep learning-based models

> [!success]- Resposta: **C**
> O Tabular Workflow for TabNet é um pipeline gerenciado no Vertex AI Pipelines cujo modelo baseado em atenção é intrinsecamente interpretável (feature masks), atendendo regressão e classificação com rápida produtização. Wide & Deep (A) é menos interpretável, e GKE ou Composer com modelos customizados (B, D) exigem muito mais esforço de construção.
> *Conceitos:* Tabular Workflows, TabNet, interpretabilidade, Vertex AI Pipelines

#### Q237 · 3.1 · curso 5 · fácil

You are developing a model to identify traffic signs in images extracted from videos taken from the dashboard of a vehicle. You have a dataset of 100,000 images that were cropped to show one out of ten different traffic signs. The images have been labeled accordingly for model training, and are stored in a Cloud Storage bucket. You need to be able to tune the model during each training run. How should you train the model?

- **A.** Train a model for object detection by using Vertex AI AutoML.
- **B.** Train a model for image classification by using Vertex AI AutoML.
- **C.** Develop the model training code for object detection, and train a model by using Vertex AI custom training.
- **D.** Develop the model training code for image classification, and train a model by using Vertex AI custom training.

> [!success]- Resposta: **D**
> As imagens já estão recortadas com um único sinal cada, então o problema é image classification, não object detection; e como é preciso ajustar o modelo em cada treino, o custom training do Vertex AI dá esse controle. AutoML (A, B) não permite controlar o tuning do modelo, e object detection (A, C) exigiria bounding boxes que não existem.
> *Conceitos:* image classification, custom training, Vertex AI, hyperparameter tuning

#### Q250 · 3.1 · curso 5 · média

You work at an ecommerce startup. You need to create a customer churn prediction model. Your company’s recent sales records are stored in a BigQuery table. You want to understand how your initial model is making predictions. You also want to iterate on the model as quickly as possible while minimizing cost. How should you build your first model?

- **A.** Export the data to a Cloud Storage bucket. Load the data into a pandas DataFrame on Vertex AI Workbench and train a logistic regression model with scikit-learn.
- **B.** Create a tf.data.Dataset by using the TensorFlow BigQueryClient. Implement a deep neural network in TensorFlow.
- **C.** Prepare the data in BigQuery and associate the data with a Vertex AI dataset. Create an AutoMLTabularTrainingJob to tram a classification model.
- **D.** Export the data to a Cloud Storage bucket. Create a tf.data.Dataset to read the data from Cloud Storage. Implement a deep neural network in TensorFlow.

> [!success]- Resposta: **A** · o arquivo não trazia gabarito
> Uma regressão logística em scikit-learn é intrinsecamente interpretável (coeficientes), treina em segundos e quase sem custo, ideal para um primeiro modelo iterado rapidamente. AutoML (C) também dá feature importance, mas cada treino leva horas e custa node-hours, contrariando 'iterar rápido com baixo custo'; DNNs (B/D) são pouco interpretáveis.
> *Conceitos:* baseline, logistic regression, interpretabilidade, custo

#### Q251 · 3.1 · curso 5 · média

You work at an ecommerce startup. You need to create a customer churn prediction model. Your company’s recent sales records are stored in a BigQuery table. You want to understand how your initial model is making predictions. You also want to iterate on the model as quickly as possible while minimizing cost. How should you build your first model?

- **A.** Export the data to a Cloud Storage bucket. Load the data into a pandas DataFrame on Vertex AI Workbench and train a logistic regression model with scikit-learn.
- **B.** Create a tf.data.Dataset by using the TensorFlow BigQueryClient. Implement a deep neural network in TensorFlow.
- **C.** Prepare the data in BigQuery and associate the data with a Vertex AI dataset. Create an AutoMLTabularTrainingJob to tram a classification model.
- **D.** Export the data to a Cloud Storage bucket. Create a tf.data.Dataset to read the data from Cloud Storage. Implement a deep neural network in TensorFlow.

> [!success]- Resposta: **A** ⚠️ o arquivo dizia **C**; revisado para **A**
> Para um primeiro modelo interpretável, iterado rapidamente e barato, a regressão logística em scikit-learn é a melhor escolha: coeficientes explicam as previsões e o treino é quase instantâneo. O gabarito C (AutoML) é tentador por ser gerenciado e oferecer feature importance, mas cada treino AutoML leva horas e custa node-hours, o oposto de iterar rápido minimizando custo.
> *Conceitos:* baseline, logistic regression, interpretabilidade, AutoML

## 3.2 Treinar modelos

#### Q3 · 3.2 · curso 5 · fácil

You were asked to investigate failures of a production line component based on sensor readings. After receiving the dataset, you discover that less than 1% of the readings are positive examples representing failure incidents. You have tried to train several classification models, but none of them converge. How should you resolve the class imbalance problem?

- **A.** Use the class distribution to generate 10% positive examples.
- **B.** Use a convolutional neural network with max pooling and softmax activation.
- **C.** Downsample the data with upweighting to create a sample with 10% positive examples.
- **D.** Remove negative examples until the numbers of positive and negative examples are equal.

> [!success]- Resposta: **C**
> Downsampling da classe majoritária com upweighting dos exemplos mantidos equilibra o treino e preserva a calibração das probabilidades, prática recomendada pelo Google. Remover negativos até 50/50 (D) descarta dados demais e distorce a distribuição; gerar exemplos a partir da distribuição (A) não resolve o problema.
> *Conceitos:* class imbalance, downsampling, upweighting

#### Q5 · 3.2 · curso 1 · fácil

You manage a team of data scientists who use a cloud-based backend system to submit training jobs. This system has become very difficult to administer, and you want to use a managed service instead. The data scientists you work with use many different frameworks, including Keras, PyTorch, theano, Scikit-learn, and custom libraries. What should you do?

- **A.** Use the AI Platform custom containers feature to receive training jobs using any framework.
- **B.** Configure Kubeflow to run on Google Kubernetes Engine and receive training jobs through TF Job.
- **C.** Create a library of VM images on Compute Engine, and publish these images on a centralized repository.
- **D.** Set up Slurm workload manager to receive jobs that can be scheduled to run on your cloud infrastructure.

> [!success]- Resposta: **A**
> Custom containers no serviço gerenciado de treino permitem rodar qualquer framework ou biblioteca sem administrar infraestrutura. Kubeflow em GKE (B) é tentador, mas exige gerenciar cluster e o TFJob é específico de TensorFlow.
> *Conceitos:* custom training, custom containers, managed service
> *Nome atual:* AI Platform Training hoje é Vertex AI custom training (custom containers).

#### Q13 · 3.2 · curso 5 · fácil

You have trained a deep neural network model on Google Cloud. The model has low loss on the training data, but is performing worse on the validation data. You want the model to be resilient to overfitting. Which strategy should you use when retraining the model?

- **A.** Apply a dropout parameter of 0.2, and decrease the learning rate by a factor of 10.
- **B.** Apply a L2 regularization parameter of 0.4, and decrease the learning rate by a factor of 10.
- **C.** Run a hyperparameter tuning job on AI Platform to optimize for the L2 regularization and dropout parameters.
- **D.** Run a hyperparameter tuning job on AI Platform to optimize for the learning rate, and increase the number of neurons by a factor of 2.

> [!success]- Resposta: **C**
> Rodar hyperparameter tuning para buscar os melhores valores de L2 e dropout ataca o overfitting de forma sistemática. Fixar valores arbitrários (A, B) pode não ser o ideal, e aumentar neurônios (D) tende a piorar o overfitting.
> *Conceitos:* overfitting, regularization, hyperparameter tuning
> *Nome atual:* Hyperparameter tuning do AI Platform hoje é Vertex AI Vizier/hyperparameter tuning.

#### Q15 · 3.2 · curso 5 · fácil

You have been asked to develop an input pipeline for an ML training model that processes images from disparate sources at a low latency. You discover that your input data does not fit in memory. How should you create a dataset following Google-recommended best practices?

- **A.** Create a tf.data.Dataset.prefetch transformation.
- **B.** Convert the images to tf.Tensor objects, and then run Dataset.from_tensor_slices().
- **C.** Convert the images to tf.Tensor objects, and then run tf.data.Dataset.from_tensors().
- **D.** Convert the images into TFRecords, store the images in Cloud Storage, and then use the tf.data API to read the images for training.

> [!success]- Resposta: **D**
> Converter as imagens em TFRecords no Cloud Storage e ler com tf.data é a prática recomendada para dados que não cabem em memória. from_tensors/from_tensor_slices (B, C) exigem carregar tudo em memória, e prefetch (A) só otimiza um pipeline já existente.
> *Conceitos:* TFRecord, tf.data, Cloud Storage

#### Q25 · 3.2 · curso 11 · fácil

You work for a social media company. You need to detect whether posted images contain cars. Each training example is a member of exactly one class. You have trained an object detection neural network and deployed the model version to AI Platform Prediction for evaluation. Before deployment, you created an evaluation job and attached it to the AI Platform Prediction model version. You notice that the precision is lower than your business requirements allow. How should you adjust the model's final layer softmax threshold to increase precision?

- **A.** Increase the recall.
- **B.** Decrease the recall.
- **C.** Increase the number of false positives.
- **D.** Decrease the number of false negatives.

> [!success]- Resposta: **B**
> Aumentar o threshold reduz falsos positivos e aumenta a precisão, o que tem como efeito diminuir o recall. Aumentar o recall (A) ou reduzir falsos negativos (D) vai na direção oposta.
> *Conceitos:* precision, recall, threshold
> *Nome atual:* AI Platform Prediction hoje é Vertex AI Prediction.

#### Q31 · 3.2 · curso 5 · fácil

You need to train a computer vision model that predicts the type of government ID present in a given image using a GPU-powered virtual machine on Compute Engine. You use the following parameters: ✑ Optimizer: SGD ✑ Image shape = 224224—ֳ ✑ Batch size = 64 ✑ Epochs = 10 ✑ Verbose =2 During training you encounter the following error: ResourceExhaustedError: Out Of Memory (OOM) when allocating tensor. What should you do?

- **A.** Change the optimizer.
- **B.** Reduce the batch size.
- **C.** Change the learning rate.
- **D.** Reduce the image shape.

> [!success]- Resposta: **B**
> Erro OOM na GPU é resolvido primeiro reduzindo o batch size, que diminui a memória alocada por passo sem alterar o modelo. Reduzir o tamanho da imagem (D) também reduz memória, mas degrada a informação de entrada e exige mudar a arquitetura.
> *Conceitos:* OOM, batch size, GPU memory

#### Q36 · 3.2 · curso 5 · fácil

You are building a model to predict daily temperatures. You split the data randomly and then transformed the training and test datasets. Temperature data for model training is uploaded hourly. During testing, your model performed with 97% accuracy; however, after deploying to production, the model's accuracy dropped to 66%. How can you make your production model more accurate?

- **A.** Normalize the data for the training, and test datasets as two separate steps.
- **B.** Split the training and test data based on time rather than a random split to avoid leakage.
- **C.** Add more data to your test set to ensure that you have a fair distribution and sample for testing.
- **D.** Apply data transformations before splitting, and cross-validate to make sure that the transformations are applied to both the training and test sets.

> [!success]- Resposta: **B**
> Com dados temporais, o split aleatório vaza informação do futuro para o treino, inflando a acurácia de teste; o split por tempo corrige isso. Aplicar transformações antes do split (D) introduz ainda mais leakage.
> *Conceitos:* data leakage, time-based split, time series

#### Q37 · 3.2 · curso 5 · fácil

You are developing models to classify customer support emails. You created models with TensorFlow Estimators using small datasets on your on-premises system, but you now need to train the models using large datasets to ensure high performance. You will port your models to Google Cloud and want to minimize code refactoring and infrastructure overhead for easier migration from on-prem to cloud. What should you do?

- **A.** Use AI Platform for distributed training.
- **B.** Create a cluster on Dataproc for training.
- **C.** Create a Managed Instance Group with autoscaling.
- **D.** Use Kubeflow Pipelines to train on a Google Kubernetes Engine cluster.

> [!success]- Resposta: **A**
> O serviço gerenciado de treino aceita TensorFlow Estimators com treino distribuído quase sem refatorar o código e sem gerenciar infraestrutura. Kubeflow em GKE ou Dataproc (B, D) trazem overhead de cluster.
> *Conceitos:* distributed training, TensorFlow, managed training
> *Nome atual:* AI Platform Training hoje é Vertex AI custom training.

#### Q40 · 3.2 · curso 5 · média

You have a functioning end-to-end ML pipeline that involves tuning the hyperparameters of your ML model using AI Platform, and then using the best-tuned parameters for training. Hypertuning is taking longer than expected and is delaying the downstream processes. You want to speed up the tuning job without significantly compromising its effectiveness. Which actions should you take? (Choose two.)

- **A.** Decrease the number of parallel trials.
- **B.** Decrease the range of floating-point values.
- **C.** Set the early stopping parameter to TRUE.
- **D.** Change the search algorithm from Bayesian search to random search.
- **E.** Decrease the maximum number of trials during subsequent training phases.

> [!success]- Resposta: **C,E**
> Early stopping encerra trials pouco promissores e reduzir o número máximo de trials diminui o tempo total, mantendo boa eficácia. Diminuir trials paralelos (A) deixa mais lento, e trocar Bayesian por random search (D) tende a reduzir a eficácia.
> *Conceitos:* hyperparameter tuning, early stopping, trials
> *Nome atual:* Hyperparameter tuning do AI Platform hoje é Vertex AI hyperparameter tuning (Vizier).

#### Q45 · 3.2 · curso 5 · fácil

You are training a TensorFlow model on a structured dataset with 100 billion records stored in several CSV files. You need to improve the input/output execution performance. What should you do?

- **A.** Load the data into BigQuery, and read the data from BigQuery.
- **B.** Load the data into Cloud Bigtable, and read the data from Bigtable.
- **C.** Convert the CSV files into shards of TFRecords, and store the data in Cloud Storage.
- **D.** Convert the CSV files into shards of TFRecords, and store the data in the Hadoop Distributed File System (HDFS).

> [!success]- Resposta: **C**
> Shards de TFRecord no Cloud Storage dão leitura paralela e eficiente para o TensorFlow. HDFS (D) exige gerenciar cluster, e BigQuery/Bigtable (A, B) não são otimizados para alimentar o treino nesse volume.
> *Conceitos:* TFRecord, Cloud Storage, I/O performance

#### Q48 · 3.2 · curso 11 · difícil

You started working on a classification problem with time series data and achieved an area under the receiver operating characteristic curve (AUC ROC) value of 99% for training data after just a few experiments. You haven't explored using any sophisticated algorithms or spent any time on hyperparameter tuning. What should your next step be to identify and fix the problem?

- **A.** Address the model overfitting by using a less complex algorithm.
- **B.** Address data leakage by applying nested cross-validation during model training.
- **C.** Address data leakage by removing features highly correlated with the target value.
- **D.** Address the model overfitting by tuning the hyperparameters to reduce the AUC ROC value.

> [!success]- Resposta: **B**
> AUC de 99% sem esforço em séries temporais sugere data leakage, e nested cross-validation (respeitando a ordem temporal) ajuda a detectá-lo. Remover features muito correlacionadas com o alvo (C) é tentador, mas pode eliminar features legítimas sem diagnosticar a causa.
> *Conceitos:* data leakage, nested cross-validation, time series

#### Q53 · 3.2 · curso 5 · média

Your team is working on an NLP research project to predict political affiliation of authors based on articles they have written. You have a large training dataset that is structured like this: You followed the standard 80%-10%-10% data distribution across the training, testing, and evaluation subsets. How should you distribute the training examples across the train-test-eval subsets while maintaining the 80-10-10 proportion?

- **A.** Distribute texts randomly across the train-test-eval subsets: Train set: [TextA1, TextB2, ...] Test set: [TextA2, TextC1, TextD2, ...] Eval set: [TextB1, TextC2, TextD1, ...]
- **B.** Distribute authors randomly across the train-test-eval subsets: (*) Train set: [TextA1, TextA2, TextD1, TextD2, ...] Test set: [TextB1, TextB2, ...] Eval set: [TexC1,TextC2 ...]
- **C.** Distribute sentences randomly across the train-test-eval subsets: Train set: [SentenceA11, SentenceA21, SentenceB11, SentenceB21, SentenceC11, SentenceD21 ...] Test set: [SentenceA12, SentenceA22, SentenceB12, SentenceC22, SentenceC12, SentenceD22 ...] Eval set: [SentenceA13, SentenceA23, SentenceB13, SentenceC23, SentenceC13, SentenceD31 ...]
- **D.** Distribute paragraphs of texts (i.e., chunks of consecutive sentences) across the train-test-eval subsets: Train set: [SentenceA11, SentenceA12, SentenceD11, SentenceD12 ...] Test set: [SentenceA13, SentenceB13, SentenceB21, SentenceD23, SentenceC12, SentenceD13 ...] Eval set: [SentenceA11, SentenceA22, SentenceB13, SentenceD22, SentenceC23, SentenceD11 ...]

> [!success]- Resposta: **B**
> Para prever afiliação política do autor, os textos de um mesmo autor precisam ficar no mesmo subconjunto; caso contrário o modelo aprende o estilo do autor e há data leakage. Dividir aleatoriamente por texto (A), sentença ou parágrafo parece natural, mas espalha o mesmo autor entre treino e teste e infla as métricas.
> *Conceitos:* data leakage, train-test split, group split

#### Q57 · 3.2 · curso 11 · fácil

Your company manages a video sharing website where users can watch and upload videos. You need to create an ML model to predict which newly uploaded videos will be the most popular so that those videos can be prioritized on your company's website. Which result should you use to determine whether the model is successful?

- **A.** The model predicts videos as popular if the user who uploads them has over 10,000 likes.
- **B.** The model predicts 97.5% of the most popular clickbait videos measured by number of clicks.
- **C.** The model predicts 95% of the most popular videos measured by watch time within 30 days of being uploaded.
- **D.** The Pearson correlation coefficient between the log-transformed number of views after 7 days and 30 days after publication is equal to 0.

> [!success]- Resposta: **C**
> A métrica de sucesso deve refletir o objetivo de negócio: popularidade real medida por watch time em uma janela definida após o upload. Cliques em clickbait (B) medem engajamento superficial, e a regra de likes do uploader (A) é heurística, não avaliação do modelo.
> *Conceitos:* métrica de sucesso, objetivo de negócio, avaliação

#### Q60 · 3.2 · curso 5 · fácil

You work for a bank and are building a random forest model for fraud detection. You have a dataset that includes transactions, of which 1% are identified as fraudulent. Which data transformation strategy would likely improve the performance of your classifier?

- **A.** Write your data in TFRecords.
- **B.** Z-normalize all the numeric features.
- **C.** Oversample the fraudulent transaction 10 times.
- **D.** Use one-hot encoding on all categorical features.

> [!success]- Resposta: **C**
> Com 1% de fraudes, oversampling da classe minoritária equilibra o sinal e melhora o classificador. Z-normalization (B) é tentadora, mas random forest é invariante à escala das features; TFRecords (A) só muda o formato.
> *Conceitos:* desbalanceamento, oversampling, random forest

#### Q64 · 3.2 · curso 5 · média

You recently designed and built a custom neural network that uses critical dependencies specific to your organization’s framework. You need to train the model using a managed training service on Google Cloud. However, the ML framework and related dependencies are not supported by AI Platform Training. Also, both your model and your data are too large to fit in memory on a single machine. Your ML framework of choice uses the scheduler, workers, and servers distribution structure. What should you do?

- **A.** Use a built-in model available on AI Platform Training.
- **B.** Build your custom container to run jobs on AI Platform Training.
- **C.** Build your custom containers to run distributed training jobs on AI Platform Training.
- **D.** Reconfigure your code to a ML framework with dependencies that are supported by AI Platform Training.

> [!success]- Resposta: **C**
> Framework não suportado exige custom containers, e modelo e dados que não cabem em uma máquina exigem distributed training com a estrutura scheduler/workers/servers. Um único custom container (B) resolve as dependências, mas não a escala.
> *Conceitos:* custom containers, distributed training, Vertex AI Training
> *Nome atual:* AI Platform Training hoje é Vertex AI custom training.

#### Q65 · 3.2 · curso 5 · média

While monitoring your model training’s GPU utilization, you discover that you have a native synchronous implementation. The training data is split into multiple files. You want to reduce the execution time of your input pipeline. What should you do?

- **A.** Increase the CPU load
- **B.** Add caching to the pipeline
- **C.** Increase the network bandwidth
- **D.** Add parallel interleave to the pipeline

> [!success]- Resposta: **D**
> Com dados divididos em vários arquivos, parallel interleave lê e intercala arquivos em paralelo, eliminando o gargalo de I/O sequencial do input pipeline. Caching (B) ajuda nas épocas seguintes, mas não acelera a leitura inicial distribuída entre arquivos.
> *Conceitos:* tf.data, parallel interleave, input pipeline

#### Q66 · 3.2 · curso 5 · fácil

Your data science team is training a PyTorch model for image classification based on a pre-trained RestNet model. You need to perform hyperparameter tuning to optimize for several parameters. What should you do?

- **A.** Convert the model to a Keras model, and run a Keras Tuner job.
- **B.** Run a hyperparameter tuning job on AI Platform using custom containers.
- **C.** Create a Kuberflow Pipelines instance, and run a hyperparameter tuning job on Katib.
- **D.** Convert the model to a TensorFlow model, and run a hyperparameter tuning job on AI Platform.

> [!success]- Resposta: **B**
> O serviço gerenciado de hyperparameter tuning aceita custom containers, então o modelo PyTorch roda sem conversão. Converter para Keras/TensorFlow (A, D) é retrabalho, e Katib (C) exige gerenciar Kubeflow.
> *Conceitos:* hyperparameter tuning, custom containers, PyTorch
> *Nome atual:* Hyperparameter tuning do AI Platform hoje é Vertex AI hyperparameter tuning (Vizier).

#### Q69 · 3.2 · curso 11 · média

You need to build an ML model for a social media application to predict whether a user’s submitted profile photo meets the requirements. The application will inform the user if the picture meets the requirements. How should you build a model to ensure that the application does not falsely accept a non-compliant picture?

- **A.** Use AutoML to optimize the model’s recall in order to minimize false negatives.
- **B.** Use AutoML to optimize the model’s F1 score in order to balance the accuracy of false positives and false negatives.
- **C.** Use Vertex AI Workbench user-managed notebooks to build a custom model that has three times as many examples of pictures that meet the profile photo requirements.
- **D.** Use Vertex AI Workbench user-managed notebooks to build a custom model that has three times as many examples of pictures that do not meet the profile photo requirements.

> [!success]- Resposta: **A** · votos no arquivo: A(44%), B(32%)
> Tratando a foto não conforme como classe positiva, aceitar uma foto ruim é um false negative; otimizar recall minimiza esse erro, com AutoML como caminho de menor esforço. F1 (B) é tentador, mas equilibra os dois erros quando o requisito pede priorizar um deles; rebalancear dados manualmente (C, D) dá mais trabalho.
> *Conceitos:* recall, false negatives, AutoML

#### Q76 · 3.2 · curso 5 · média

You are working on a classification problem with time series data. After conducting just a few experiments using random cross-validation, you achieved an Area Under the Receiver Operating Characteristic Curve (AUC ROC) value of 99% on the training data. You haven’t explored using any sophisticated algorithms or spent any time on hyperparameter tuning. What should your next step be to identify and fix the problem?

- **A.** Address the model overfitting by using a less complex algorithm and use k-fold cross-validation.
- **B.** Address data leakage by applying nested cross-validation during model training.
- **C.** Address data leakage by removing features highly correlated with the target value.
- **D.** Address the model overfitting by tuning the hyperparameters to reduce the AUC ROC value.

> [!success]- Resposta: **B**
> AUC de 99% logo no começo com time series e cross-validation aleatória indica data leakage temporal; nested (time-series) cross-validation respeita a ordem do tempo. Remover features muito correlacionadas (C) é tentador, mas não resolve o vazamento causado pelo split aleatório.
> *Conceitos:* data leakage, nested cross-validation, time series

#### Q82 · 3.2 · curso 5 · média

You are profiling the performance of your TensorFlow model training time and notice a performance issue caused by inefficiencies in the input data pipeline for a single 5 terabyte CSV file dataset on Cloud Storage. You need to optimize the input pipeline performance. Which action should you try first to increase the efficiency of your pipeline?

- **A.** Preprocess the input CSV file into a TFRecord file.
- **B.** Randomly select a 10 gigabyte subset of the data to train your model.
- **C.** Split into multiple CSV files and use a parallel interleave transformation.
- **D.** Set the reshuffle_each_iteration parameter to true in the tf.data.Dataset.shuffle method.

> [!success]- Resposta: **C**
> Um único CSV de 5 TB impede a leitura paralela; dividir em vários arquivos e usar parallel interleave é o primeiro passo recomendado no guia de performance do tf.data. Converter para TFRecord (A) é tentador e também ajuda, mas um único arquivo continua sendo um gargalo sequencial.
> *Conceitos:* tf.data, parallel interleave, input pipeline

#### Q90 · 3.2 · curso 11 · média

You are working on a binary classification ML algorithm that detects whether an image of a classified scanned document contains a company’s logo. In the dataset, 96% of examples don’t have the logo, so the dataset is very skewed. Which metrics would give you the most confidence in your model?

- **A.** F-score where recall is weighed more than precision
- **B.** RMSE
- **C.** F1 score
- **D.** F-score where precision is weighed more than recall

> [!success]- Resposta: **A** · votos no arquivo: A(61%)
> Com 96% de negativos, accuracy e F1 simples não refletem bem o objetivo de encontrar os poucos logos; um F-beta que pesa mais o recall reduz os logos não detectados. Precision com peso maior (D) é a alternativa tentadora, mas o risco principal na classe rara é deixar positivos passarem; RMSE (B) é métrica de regressão.
> *Conceitos:* F-beta, recall, desbalanceamento

#### Q108 · 3.2 · curso 5 · média

You are experimenting with a built-in distributed XGBoost model in Vertex AI Workbench user-managed notebooks. You use BigQuery to split your data into training and validation sets using the following queries: CREATE OR REPLACE TABLE ‘myproject.mydataset.training‘ AS (SELECT * FROM ‘myproject.mydataset.mytable‘ WHERE RAND() <= 0.8); CREATE OR REPLACE TABLE ‘myproject.mydataset.validation‘ AS (SELECT * FROM ‘myproject.mydataset.mytable‘ WHERE RAND() <= 0.2); After training the model, you achieve an area under the receiver operating characteristic curve (AUC ROC) value of 0.8, but after deploying the model to production, you notice that your model performance has dropped to an AUC ROC value of 0.65. What problem is most likely occurring?

- **A.** There is training-serving skew in your production environment.
- **B.** There is not a sufficient amount of training data.
- **C.** The tables that you created to hold your training and validation records share some records, and you may not be using all the data in your initial table.
- **D.** The RAND() function generated a number that is less than 0.2 in both instances, so every record in the validation table will also be in the training table.

> [!success]- Resposta: **C**
> Cada `RAND()` é avaliado independentemente por linha em cada query, então os conjuntos de treino e validação se sobrepõem (vazamento) e parte dos dados não é usada, inflando a AUC de validação. A opção D é tentadora, mas descreve o mecanismo errado: nem todo registro da validação estará no treino. Training-serving skew (A) não explica a queda dado o split defeituoso.
> *Conceitos:* data leakage, train/validation split, BigQuery RAND

#### Q109 · 3.2 · curso 5 · fácil

During batch training of a neural network, you notice that there is an oscillation in the loss. How should you adjust your model to ensure that it converges?

- **A.** Decrease the size of the training batch.
- **B.** Decrease the learning rate hyperparameter.
- **C.** Increase the learning rate hyperparameter.
- **D.** Increase the size of the training batch.

> [!success]- Resposta: **B**
> Oscilação da loss indica que os passos de gradiente são grandes demais e ultrapassam o mínimo; reduzir a learning rate estabiliza a convergência. Aumentar a learning rate (C) pioraria, e mudar o batch size afeta o ruído do gradiente, mas não é a correção direta.
> *Conceitos:* learning rate, convergência, gradient descent

#### Q114 · 3.2 · curso 5 · média

You work for a gaming company that manages a popular online multiplayer game where teams with 6 players play against each other in 5-minute battles. There are many new players every day. You need to build a model that automatically assigns available players to teams in real time. User research indicates that the game is more enjoyable when battles have players with similar skill levels. Which business metrics should you track to measure your model’s performance?

- **A.** Average time players wait before being assigned to a team
- **B.** Precision and recall of assigning players to teams based on their predicted versus actual ability
- **C.** User engagement as measured by the number of battles played daily per user
- **D.** Rate of return as measured by additional revenue generated minus the cost of developing a new model

> [!success]- Resposta: **C**
> A pesquisa indica que partidas equilibradas tornam o jogo mais divertido, então a métrica de negócio que reflete isso é o engajamento (batalhas jogadas por usuário por dia). Precision/recall (B) é tentador, mas é métrica técnica do modelo, não de negócio; tempo de espera (A) não mede a qualidade do matchmaking.
> *Conceitos:* business metrics, engajamento, matchmaking

#### Q122 · 3.2 · curso 5 · média

You recently built the first version of an image segmentation model for a self-driving car. After deploying the model, you observe a decrease in the area under the curve (AUC) metric. When analyzing the video recordings, you also discover that the model fails in highly congested traffic but works as expected when there is less traffic. What is the most likely reason for this result?

- **A.** The model is overfitting in areas with less traffic and underfitting in areas with more traffic.
- **B.** AUC is not the correct metric to evaluate this classification model.
- **C.** Too much data representing congested areas was used for model training.
- **D.** Gradients become small and vanish while backpropagating from the output to input nodes.

> [!success]- Resposta: **A**
> O modelo funciona em tráfego leve e falha em tráfego congestionado, indicando que aprendeu bem (ou demais) os cenários abundantes e não generaliza para os congestionados, provavelmente sub-representados. A opção C contradiz o sintoma; AUC (B) é uma métrica válida, e vanishing gradients (D) afetaria o modelo como um todo.
> *Conceitos:* overfitting, underfitting, representatividade dos dados

#### Q125 · 3.2 · curso 1 · fácil

You manage a team of data scientists who use a cloud-based backend system to submit training jobs. This system has become very difficult to administer, and you want to use a managed service instead. The data scientists you work with use many different frameworks, including Keras, PyTorch, theano, scikit-learn, and custom libraries. What should you do?

- **A.** Use the Vertex AI Training to submit training jobs using any framework.
- **B.** Configure Kubeflow to run on Google Kubernetes Engine and submit training jobs through TFJob.
- **C.** Create a library of VM images on Compute Engine, and publish these images on a centralized repository.
- **D.** Set up Slurm workload manager to receive jobs that can be scheduled to run on your cloud infrastructure.

> [!success]- Resposta: **A**
> Vertex AI Training é um serviço gerenciado que aceita qualquer framework via pre-built ou custom containers. Kubeflow com TFJob (B) é tentador, mas exige administrar GKE e TFJob atende só TensorFlow; imagens de VM e Slurm continuam exigindo administração.
> *Conceitos:* Vertex AI Training, custom containers, serviço gerenciado

#### Q133 · 3.2 · curso 5 · média

You have recently created a proof-of-concept (POC) deep learning model. You are satisfied with the overall architecture, but you need to determine the value for a couple of hyperparameters. You want to perform hyperparameter tuning on Vertex AI to determine both the appropriate embedding dimension for a categorical feature used by your model and the optimal learning rate. You configure the following settings: • For the embedding dimension, you set the type to INTEGER with a minValue of 16 and maxValue of 64. • For the learning rate, you set the type to DOUBLE with a minValue of 10e-05 and maxValue of 10e-02. You are using the default Bayesian optimization tuning algorithm, and you want to maximize model accuracy. Training time is not a concern. How should you set the hyperparameter scaling for each hyperparameter and the maxParallelTrials?

- **A.** Use UNIT_LINEAR_SCALE for the embedding dimension, UNIT_LOG_SCALE for the learning rate, and a large number of parallel trials.
- **B.** Use UNIT_LINEAR_SCALE for the embedding dimension, UNIT_LOG_SCALE for the learning rate, and a small number of parallel trials.
- **C.** Use UNIT_LOG_SCALE for the embedding dimension, UNIT_LINEAR_SCALE for the learning rate, and a large number of parallel trials.
- **D.** Use UNIT_LOG_SCALE for the embedding dimension, UNIT_LINEAR_SCALE for the learning rate, and a small number of parallel trials.

> [!success]- Resposta: **B**
> A learning rate varia por várias ordens de grandeza, por isso usa UNIT_LOG_SCALE; o embedding dimension tem faixa estreita e usa UNIT_LINEAR_SCALE. Com Bayesian optimization, poucos trials paralelos permitem que cada trial aprenda com os anteriores, e como tempo não importa isso maximiza a acurácia. A opção A é tentadora por acelerar, mas muitos trials paralelos reduzem a eficácia da otimização bayesiana.
> *Conceitos:* hyperparameter tuning, Bayesian optimization, log scale

#### Q141 · 3.2 · curso 11 · média

You work for a magazine publisher and have been tasked with predicting whether customers will cancel their annual subscription. In your exploratory data analysis, you find that 90% of individuals renew their subscription every year, and only 10% of individuals cancel their subscription. After training a NN Classifier, your model predicts those who cancel their subscription with 99% accuracy and predicts those who renew their subscription with 82% accuracy. How should you interpret these results?

- **A.** This is not a good result because the model should have a higher accuracy for those who renew their subscription than for those who cancel their subscription.
- **B.** This is not a good result because the model is performing worse than predicting that people will always renew their subscription.
- **C.** This is a good result because predicting those who cancel their subscription is more difficult, since there is less data for this group.
- **D.** This is a good result because the accuracy across both groups is greater than 80%.

> [!success]- Resposta: **C**
> Em dados desbalanceados, a classe minoritária (cancelamentos) é a de interesse e a mais difícil de prever; acertar 99% dela mantendo 82% na majoritária é um bom resultado. A opção B é tentadora porque a acurácia global (~84%) fica abaixo do baseline de 'sempre renova' (90%), mas esse baseline não detecta nenhum cancelamento e é inútil para o negócio.
> *Conceitos:* dados desbalanceados, acurácia, baseline

#### Q144 · 3.2 · curso 1 · fácil

You are developing an image recognition model using PyTorch based on ResNet50 architecture. Your code is working fine on your local laptop on a small subsample. Your full dataset has 200k labeled images. You want to quickly scale your training workload while minimizing cost. You plan to use 4 V100 GPUs. What should you do?

- **A.** Create a Google Kubernetes Engine cluster with a node pool that has 4 V100 GPUs. Prepare and submit a TFJob operator to this node pool.
- **B.** Create a Vertex AI Workbench user-managed notebooks instance with 4 V100 GPUs, and use it to train your model.
- **C.** Package your code with Setuptools, and use a pre-built container. Train your model with Vertex AI using a custom tier that contains the required GPUs.
- **D.** Configure a Compute Engine VM with all the dependencies that launches the training. Train your model with Vertex AI using a custom tier that contains the required GPUs.

> [!success]- Resposta: **C**
> Empacotar o código e usar um pre-built container PyTorch no Vertex AI custom training com 4 V100 escala rápido e só cobra durante o treino. O notebook com 4 GPUs (B) é tentador, mas fica caro se ficar ligado e não é forma de produção; TFJob (A) é para TensorFlow e GKE exige gestão.
> *Conceitos:* Vertex AI custom training, pre-built containers, PyTorch
> *Nome atual:* Vertex AI Workbench user-managed notebooks foi descontinuado; o equivalente atual são as instâncias do Vertex AI Workbench.

#### Q153 · 3.2 · curso 5 · fácil

You work for a bank and are building a random forest model for fraud detection. You have a dataset that includes transactions, of which 1% are identified as fraudulent. Which data transformation strategy would likely improve the performance of your classifier?

- **A.** Modify the target variable using the Box-Cox transformation.
- **B.** Z-normalize all the numeric features.
- **C.** Oversample the fraudulent transaction 10 times.
- **D.** Log transform all numeric features.

> [!success]- Resposta: **C**
> Com 1% de fraudes, oversampling da classe minoritária dá ao random forest mais exemplos positivos e melhora o recall. Normalizar ou aplicar log nas features (B, D) quase não afeta modelos baseados em árvore, e Box-Cox no alvo (A) não faz sentido em classificação.
> *Conceitos:* oversampling, class imbalance, random forest

#### Q157 · 3.2 · curso 5 · fácil

You recently developed a deep learning model. To test your new model, you trained it for a few epochs on a large dataset. You observe that the training and validation losses barely changed during the training run. You want to quickly debug your model. What should you do first?

- **A.** Verify that your model can obtain a low loss on a small subset of the dataset
- **B.** Add handcrafted features to inject your domain knowledge into the model
- **C.** Use the Vertex AI hyperparameter tuning service to identify a better learning rate
- **D.** Use hardware accelerators and train your model for more epochs

> [!success]- Resposta: **A**
> O primeiro passo de debug é verificar se o modelo consegue fazer overfitting em um subconjunto pequeno; se nem isso acontece, há bug na arquitetura, nos dados ou na loss. Tuning de learning rate (C) é tentador, mas é caro e prematuro antes de descartar bugs.
> *Conceitos:* debugging, overfit small batch, training loss

#### Q169 · 3.2 · curso 1 · média

You are developing a model to detect fraudulent credit card transactions. You need to prioritize detection, because missing even one fraudulent transaction could severely impact the credit card holder. You used AutoML to tram a model on users' profile information and credit card transaction data After training the initial model, you notice that the model is failing to detect many fraudulent transactions. How should you adjust the training parameters in AutoML to improve model performance? (Choose two.)

- **A.** Increase the score threshold
- **B.** Decrease the score threshold.
- **C.** Add more positive examples to the training set
- **D.** Add more negative examples to the training set
- **E.** Reduce the maximum number of node hours for training

> [!success]- Resposta: **B,C** · votos no arquivo: C (50%) B (50%)
> A questão pede duas opções: reduzir o score threshold aumenta o recall (pega mais fraudes à custa de mais falsos positivos), e adicionar mais exemplos positivos (fraudes) ajuda o modelo a aprender a classe minoritária. Os votos divididos entre B e C refletem que cada um escolheu só uma, mas a resposta correta são as duas. Aumentar o threshold (A) ou adicionar negativos (D) pioraria o recall.
> *Conceitos:* recall, score threshold, AutoML, class imbalance

#### Q182 · 3.2 · curso 5 · média

You are profiling the performance of your TensorFlow model training time and notice a performance issue caused by inefficiencies in the input data pipeline for a single 5 terabyte CSV file dataset on Cloud Storage. You need to optimize the input pipeline performance. Which action should you try first to increase the efficiency of your pipeline?

- **A.** Preprocess the input CSV file into a TFRecord file.
- **B.** Randomly select a 10 gigabyte subset of the data to train your model.
- **C.** Split into multiple CSV files and use a parallel interleave transformation.
- **D.** Set the reshuffle_each_iteration parameter to true in the tf.data.Dataset.shuffle method

> [!success]- Resposta: **C**
> Um único CSV de 5 TB impede leitura paralela; dividir em vários arquivos e usar interleave paralelo no tf.data é a otimização recomendada a tentar primeiro. Converter para TFRecord (A) também ajuda, mas um único TFRecord continuaria sem paralelismo de I/O. Usar só uma amostra (B) sacrifica dados.
> *Conceitos:* tf.data, interleave, input pipeline

#### Q249 · 3.2 · curso 5 · fácil

You are developing an ML model to identify your company’s products in images. You have access to over one million images in a Cloud Storage bucket. You plan to experiment with different TensorFlow models by using Vertex AI Training. You need to read images at scale during training while minimizing data I/O bottlenecks. What should you do?

- **A.** Load the images directly into the Vertex AI compute nodes by using Cloud Storage FUSE. Read the images by using the tf.data.Dataset.from_tensor_slices function
- **B.** Create a Vertex AI managed dataset from your image data. Access the AIP_TRAINING_DATA_URI environment variable to read the images by using the tf.data.Dataset.list_files function.
- **C.** Convert the images to TFRecords and store them in a Cloud Storage bucket. Read the TFRecords by using the tf.data.TFRecordDataset function.
- **D.** Store the URLs of the images in a CSV file. Read the file by using the tf.data.experimental.CsvDataset function.

> [!success]- Resposta: **C**
> Converter as imagens em TFRecords e lê-las com tf.data.TFRecordDataset permite leitura sequencial de arquivos grandes, com prefetch e paralelismo, eliminando o gargalo de abrir milhões de arquivos pequenos. Cloud Storage FUSE com from_tensor_slices (A) ainda lê arquivo a arquivo e não escala bem.
> *Conceitos:* TFRecord, tf.data, I/O, Cloud Storage

#### Q278 · 3.2 · curso 5 · média

You need to train an XGBoost model on a small dataset. Your training code requires custom dependencies. You want to minimize the startup time of your training job. How should you set up your Vertex AI custom training job?

- **A.** Store the data in a Cloud Storage bucket, and create a custom container with your training application. In your training application, read the data from Cloud Storage and train the model.
- **B.** Use the XGBoost prebuilt custom container. Create a Python source distribution that includes the data and installs the dependencies at runtime. In your training application, load the data into a pandas DataFrame and train the model.
- **C.** Create a custom container that includes the data. In your training application, load the data into a pandas DataFrame and train the model.
- **D.** Store the data in a Cloud Storage bucket, and use the XGBoost prebuilt custom container to run your training application. Create a Python source distribution that installs the dependencies at runtime. In your training application, read the data from Cloud Storage and train the model.

> [!success]- Resposta: **A**
> Um custom container com as dependências já instaladas elimina a instalação em runtime, que é o que mais atrasa o startup; os dados no Cloud Storage mantêm a imagem enxuta. Prebuilt container com source distribution (B/D) instala dependências a cada execução, e embutir dados no container (C) é má prática.
> *Conceitos:* custom container, custom training, startup time

#### Q285 · 3.2 · curso 5 · fácil

You have recently developed a custom model for image classification by using a neural network. You need to automatically identify the values for learning rate, number of layers, and kernel size. To do this, you plan to run multiple jobs in parallel to identify the parameters that optimize performance. You want to minimize custom code development and infrastructure management. What should you do?

- **A.** Train an AutoML image classification model.
- **B.** Create a custom training job that uses the Vertex AI Vizier SDK for parameter optimization.
- **C.** Create a Vertex AI hyperparameter tuning job.
- **D.** Create a Vertex AI pipeline that runs different model training jobs in parallel.

> [!success]- Resposta: **C**
> Um Vertex AI hyperparameter tuning job executa trials em paralelo e otimiza learning rate, número de camadas e kernel size com o Vizier por trás, sem gerenciar infraestrutura. Usar o Vizier SDK diretamente (B) ou pipelines paralelos (D) exige mais código; AutoML (A) não ajusta o modelo customizado.
> *Conceitos:* hyperparameter tuning, Vertex AI Vizier, custom training

## 3.3 Hardware para treino

#### Q20 · 3.3 · curso 5 · média

You are training an LSTM-based model on AI Platform to summarize text using the following job submission script: gcloud ai-platform jobs submit training $JOB_NAME \ --package-path $TRAINER_PACKAGE_PATH \ --module-name $MAIN_TRAINER_MODULE \ --job-dir $JOB_DIR \ --region $REGION \ --scale-tier basic \ -- \ --epochs 20 \ --batch_size=32 \ --learning_rate=0.001 \ You want to ensure that training time is minimized without significantly compromising the accuracy of your model. What should you do?

- **A.** Modify the 'epochs' parameter.
- **B.** Modify the 'scale-tier' parameter.
- **C.** Modify the 'batch size' parameter.
- **D.** Modify the 'learning rate' parameter.

> [!success]- Resposta: **B**
> O scale tier basic usa uma única máquina; mudar para um tier com mais recursos ou GPU reduz o tempo de treino sem afetar a precisão. Alterar epochs, batch size ou learning rate (A, C, D) muda a dinâmica do treino e pode comprometer a acurácia.
> *Conceitos:* scale tier, training hardware, GPU
> *Nome atual:* AI Platform Training hoje é Vertex AI custom training, onde scale tiers foram substituídos por machine types e aceleradores.

#### Q28 · 3.3 · curso 5 · média

You are training a Resnet model on AI Platform using TPUs to visually categorize types of defects in automobile engines. You capture the training profile using the Cloud TPU profiler plugin and observe that it is highly input-bound. You want to reduce the bottleneck and speed up your model training process. Which modifications should you make to the tf.data dataset? (Choose two.)

- **A.** Use the interleave option for reading data.
- **B.** Reduce the value of the repeat parameter.
- **C.** Increase the buffer size for the shuttle option.
- **D.** Set the prefetch option equal to the training batch size.
- **E.** Decrease the batch size argument in your transformation.

> [!success]- Resposta: **A,D**
> Leitura paralela com interleave e prefetch sobrepõem I/O e computação, reduzindo o gargalo de entrada na TPU. Reduzir repeat ou batch size (B, E) não acelera a ingestão e pode até piorar a utilização.
> *Conceitos:* tf.data, TPU, input pipeline, prefetch
> *Nome atual:* AI Platform hoje é Vertex AI.

#### Q50 · 3.3 · curso 5 · média

Your team is building a convolutional neural network (CNN)-based architecture from scratch. The preliminary experiments running on your on-premises CPU-only infrastructure were encouraging, but have slow convergence. You have been asked to speed up model training to reduce time-to-market. You want to experiment with virtual machines (VMs) on Google Cloud to leverage more powerful hardware. Your code does not include any manual device placement and has not been wrapped in Estimator model-level abstraction. Which environment should you train your model on?

- **A.** AVM on Compute Engine and 1 TPU with all dependencies installed manually.
- **B.** AVM on Compute Engine and 8 GPUs with all dependencies installed manually.
- **C.** A Deep Learning VM with an n1-standard-2 machine and 1 GPU with all libraries pre-installed.
- **D.** A Deep Learning VM with more powerful CPU e2-highcpu-16 machines with all libraries pre-installed.

> [!success]- Resposta: **C**
> Sem device placement manual e sem Estimator, o código não aproveita várias GPUs nem TPU sem adaptação (tf.distribute/TPUStrategy); uma única GPU já acelera a CNN de forma transparente. A Deep Learning VM já traz drivers e frameworks instalados, reduzindo esforço. A opção B (8 GPUs) é tentadora, mas sem estratégia de distribuição só uma GPU seria usada e a instalação manual custa tempo.
> *Conceitos:* Deep Learning VM, GPU, device placement

#### Q52 · 3.3 · curso 5 · fácil

You are training a deep learning model for semantic image segmentation with reduced training time. While using a Deep Learning VM Image, you receive the following error: The resource 'projects/deeplearning-platforn/zones/europe-west4-c/acceleratorTypes/nvidia-tesla-k80' was not found. What should you do?

- **A.** Ensure that you have GPU quota in the selected region.
- **B.** Ensure that the required GPU is available in the selected region.
- **C.** Ensure that you have preemptible GPU quota in the selected region.
- **D.** Ensure that the selected GPU has enough GPU memory for the workload.

> [!success]- Resposta: **B**
> O erro 'resource not found' para o acceleratorType indica que a GPU K80 não é oferecida naquela zona/região. Falta de quota (A) gera um erro diferente, de quota excedida, e não de recurso inexistente.
> *Conceitos:* GPU, disponibilidade por região, Deep Learning VM

#### Q61 · 3.3 · curso 5 · média

You are using transfer learning to train an image classifier based on a pre-trained EfficientNet model. Your training dataset has 20,000 images. You plan to retrain the model once per day. You need to minimize the cost of infrastructure. What platform components and configuration environment should you use?

- **A.** A Deep Learning VM with 4 V100 GPUs and local storage.
- **B.** A Deep Learning VM with 4 V100 GPUs and Cloud Storage.
- **C.** A Google Kubernetes Engine cluster with a V100 GPU Node Pool and an NFS Server
- **D.** An AI Platform Training job using a custom scale tier with 4 V100 GPUs and Cloud Storage

> [!success]- Resposta: **D**
> Um job de training gerenciado com 4 V100 e Cloud Storage cobra só pelo tempo de execução diária, minimizando custo. Uma Deep Learning VM (A, B) ou um cluster GKE (C) fica ligado ou exige gerenciamento contínuo, o que custa mais para um retreino diário curto.
> *Conceitos:* custom training, GPU, custo
> *Nome atual:* AI Platform Training hoje é Vertex AI custom training.

#### Q70 · 3.3 · curso 5 · média

You lead a data science team at a large international corporation. Most of the models your team trains are large-scale models using high-level TensorFlow APIs on AI Platform with GPUs. Your team usually takes a few weeks or months to iterate on a new version of a model. You were recently asked to review your team’s spending. How should you reduce your Google Cloud compute costs without impacting the model’s performance?

- **A.** Use AI Platform to run distributed training jobs with checkpoints.
- **B.** Use AI Platform to run distributed training jobs without checkpoints.
- **C.** Migrate to training with Kuberflow on Google Kubernetes Engine, and use preemptible VMs with checkpoints.
- **D.** Migrate to training with Kuberflow on Google Kubernetes Engine, and use preemptible VMs without checkpoints.

> [!success]- Resposta: **C**
> Preemptible (Spot) VMs custam muito menos, e checkpoints permitem retomar o treino após uma preempção sem perder progresso nem qualidade. Usar preemptible sem checkpoints (D) perderia trabalho; distributed training (A) não reduz custo por si só. Hoje o Vertex AI custom training também aceita Spot VMs, sem migrar para GKE.
> *Conceitos:* preemptible VMs, checkpoints, custo
> *Nome atual:* AI Platform hoje é Vertex AI; preemptible VMs hoje são Spot VMs.

#### Q96 · 3.3 · curso 5 · difícil

You are training an object detection machine learning model on a dataset that consists of three million X-ray images, each roughly 2 GB in size. You are using Vertex AI Training to run a custom training application on a Compute Engine instance with 32-cores, 128 GB of RAM, and 1 NVIDIA P100 GPU. You notice that model training is taking a very long time. You want to decrease training time without sacrificing model performance. What should you do?

- **A.** Increase the instance memory to 512 GB and increase the batch size.
- **B.** Replace the NVIDIA P100 GPU with a v3-32 TPU in the training job.
- **C.** Enable early stopping in your Vertex AI Training job.
- **D.** Use the tf.distribute.Strategy API and run a distributed training job.

> [!success]- Resposta: **B** · votos no arquivo: B(43%), D(33%), C(22%)
> Trocar uma P100 por um TPU v3-32 aumenta muito o throughput de treino de visão computacional sem alterar o modelo, reduzindo o tempo sem perda de qualidade. tf.distribute (D) é uma forte concorrente, mas o enunciado não oferece mais aceleradores ou workers; com uma única GPU, a estratégia sozinha não acelera. Early stopping (C) pode sacrificar a performance.
> *Conceitos:* TPU, aceleração de treino, distributed training

#### Q98 · 3.3 · curso 5 · média

You built a custom ML model using scikit-learn. Training time is taking longer than expected. You decide to migrate your model to Vertex AI Training, and you want to improve the model’s training time. What should you try out first?

- **A.** Migrate your model to TensorFlow, and train it using Vertex AI Training.
- **B.** Train your model in a distributed mode using multiple Compute Engine VMs.
- **C.** Train your model with DLVM images on Vertex AI, and ensure that your code utilizes NumPy and SciPy internal methods whenever possible.
- **D.** Train your model using Vertex AI Training with GPUs.

> [!success]- Resposta: **C**
> scikit-learn não aproveita GPU nem treino distribuído nativamente, então o primeiro passo barato é usar imagens otimizadas (DLVM/pre-built containers) e garantir que o código use as rotinas vetorizadas de NumPy/SciPy. A opção de GPUs (D) é tentadora, mas scikit-learn roda em CPU e não ganharia nada; migrar para TensorFlow (A) é esforço excessivo.
> *Conceitos:* scikit-learn, Vertex AI Training, DLVM, CPU

#### Q101 · 3.3 · curso 5 · média

You are developing an ML model intended to classify whether X-ray images indicate bone fracture risk. You have trained a ResNet architecture on Vertex AI using a TPU as an accelerator, however you are unsatisfied with the training time and memory usage. You want to quickly iterate your training code but make minimal changes to the code. You also want to minimize impact on the model’s accuracy. What should you do?

- **A.** Reduce the number of layers in the model architecture.
- **B.** Reduce the global batch size from 1024 to 256.
- **C.** Reduce the dimensions of the images used in the model.
- **D.** Configure your model to use bfloat16 instead of float32.

> [!success]- Resposta: **D**
> Usar bfloat16 (mixed precision) em TPU reduz memória e acelera o treino com mudança mínima de código e impacto desprezível na acurácia, pois as TPUs são otimizadas para esse formato. Reduzir camadas (A) ou dimensão das imagens (C) também acelera, mas prejudica a acurácia; reduzir o batch (B) piora a utilização da TPU.
> *Conceitos:* TPU, bfloat16, mixed precision

#### Q103 · 3.3 · curso 5 · média

You recently developed a deep learning model using Keras, and now you are experimenting with different training strategies. First, you trained the model using a single GPU, but the training process was too slow. Next, you distributed the training across 4 GPUs using tf.distribute.MirroredStrategy (with no other changes), but you did not observe a decrease in training time. What should you do?

- **A.** Distribute the dataset with tf.distribute.Strategy.experimental_distribute_dataset
- **B.** Create a custom training loop.
- **C.** Use a TPU with tf.distribute.TPUStrategy.
- **D.** Increase the batch size.

> [!success]- Resposta: **D**
> Com MirroredStrategy, o batch global é dividido entre as réplicas; sem aumentar o batch size, cada GPU processa um lote pequeno e o overhead de sincronização anula o ganho. O correto é escalar o batch size proporcionalmente ao número de GPUs. Distribuir o dataset manualmente (A) é tentador, mas o Keras `fit` já faz isso automaticamente.
> *Conceitos:* MirroredStrategy, batch size, treino distribuído

#### Q116 · 3.3 · curso 5 · difícil

You work for a biotech startup that is experimenting with deep learning ML models based on properties of biological organisms. Your team frequently works on early-stage experiments with new architectures of ML models, and writes custom TensorFlow ops in C++. You train your models on large datasets and large batch sizes. Your typical batch size has 1024 examples, and each example is about 1 MB in size. The average size of a network with all weights and embeddings is 20 GB. What hardware should you choose for your models?

- **A.** A cluster with 2 n1-highcpu-64 machines, each with 8 NVIDIA Tesla V100 GPUs (128 GB GPU memory in total), and a n1-highcpu-64 machine with 64 vCPUs and 58 GB RAM
- **B.** A cluster with 2 a2-megagpu-16g machines, each with 16 NVIDIA Tesla A100 GPUs (640 GB GPU memory in total), 96 vCPUs, and 1.4 TB RAM
- **C.** A cluster with an n1-highcpu-64 machine with a v2-8 TPU and 64 GB RAM
- **D.** A cluster with 4 n1-highcpu-96 machines, each with 96 vCPUs and 86 GB RAM

> [!success]- Resposta: **D**
> Custom TensorFlow ops escritas em C++ rodam em CPU sem trabalho adicional, enquanto GPUs exigiriam kernels CUDA e TPUs não suportam custom ops; por isso o cluster só de CPUs é o adequado. As opções com GPUs A100/V100 (A, B) são tentadoras pelo tamanho do modelo e do batch, mas não executariam as ops customizadas.
> *Conceitos:* custom ops, CPU, escolha de hardware

#### Q118 · 3.3 · curso 5 · fácil

You are building a TensorFlow model for a financial institution that predicts the impact of consumer spending on inflation globally. Due to the size and nature of the data, your model is long-running across all types of hardware, and you have built frequent checkpointing into the training process. Your organization has asked you to minimize cost. What hardware should you choose?

- **A.** A Vertex AI Workbench user-managed notebooks instance running on an n1-standard-16 with 4 NVIDIA P100 GPUs
- **B.** A Vertex AI Workbench user-managed notebooks instance running on an n1-standard-16 with an NVIDIA P100 GPU
- **C.** A Vertex AI Workbench user-managed notebooks instance running on an n1-standard-16 with a non-preemptible v3-8 TPU
- **D.** A Vertex AI Workbench user-managed notebooks instance running on an n1-standard-16 with a preemptible v3-8 TPU

> [!success]- Resposta: **D**
> Como o treino tem checkpoints frequentes, ele tolera interrupções, e uma TPU preemptible custa bem menos que a não-preemptible. A TPU não-preemptible (C) é tentadora pela estabilidade, mas custa mais; GPUs P100 seriam mais lentas e o custo total maior para um treino longo.
> *Conceitos:* TPU, preemptible, checkpointing
> *Nome atual:* Vertex AI Workbench user-managed notebooks foi descontinuado; o equivalente atual são as instâncias do Vertex AI Workbench.

#### Q126 · 3.3 · curso 5 · média

You are training an object detection model using a Cloud TPU v2. Training time is taking longer than expected. Based on this simplified trace obtained with a Cloud TPU profile, what action should you take to decrease training time in a cost-efficient way?

- **A.** Move from Cloud TPU v2 to Cloud TPU v3 and increase batch size.
- **B.** Move from Cloud TPU v2 to 8 NVIDIA V100 GPUs and increase batch size.
- **C.** Rewrite your input function to resize and reshape the input images.
- **D.** Rewrite your input function using parallel reads, parallel processing, and prefetch.

> [!success]- Resposta: **D**
> O trace do profiler mostra a TPU ociosa esperando dados, ou seja, o gargalo está no input pipeline; leitura paralela, processamento paralelo e prefetch com tf.data resolvem isso sem custo extra. Migrar para TPU v3 ou GPUs (A, B) é tentador, mas custa mais e não resolve um gargalo de entrada.
> *Conceitos:* Cloud TPU profiler, tf.data, prefetch

#### Q155 · 3.3 · curso 5 · fácil

You are training an object detection machine learning model on a dataset that consists of three million X-ray images, each roughly 2 GB in size. You are using Vertex AI Training to run a custom training application on a Compute Engine instance with 32-cores, 128 GB of RAM, and 1 NVIDIA P100 GPU. You notice that model training is taking a very long time. You want to decrease training time without sacrificing model performance. What should you do?

- **A.** Increase the instance memory to 512 GB, and increase the batch size.
- **B.** Replace the NVIDIA P100 GPU with a K80 GPU in the training job.
- **C.** Enable early stopping in your Vertex AI Training job.
- **D.** Use the tf.distribute.Strategy API and run a distributed training job.

> [!success]- Resposta: **D**
> Com milhões de imagens enormes, o gargalo é ter um único GPU; treino distribuído com tf.distribute.Strategy em várias GPUs/workers reduz o tempo sem perder qualidade. Early stopping (C) pode prejudicar o modelo, e trocar por K80 (B) é um downgrade.
> *Conceitos:* tf.distribute.Strategy, distributed training, GPU

#### Q162 · 3.3 · curso 5 · fácil

You built a custom ML model using scikit-learn. Training time is taking longer than expected. You decide to migrate your model to Vertex AI Training, and you want to improve the model’s training time. What should you try out first?

- **A.** Train your model in a distributed mode using multiple Compute Engine VMs.
- **B.** Train your model using Vertex AI Training with CPUs.
- **C.** Migrate your model to TensorFlow, and train it using Vertex AI Training.
- **D.** Train your model using Vertex AI Training with GPUs.

> [!success]- Resposta: **B**
> scikit-learn não usa GPUs e não tem treino distribuído nativo, então o primeiro passo é rodar no Vertex AI Training com CPUs (máquinas maiores). GPUs (D) não ajudam nesse framework, e migrar para TensorFlow (C) dá muito trabalho.
> *Conceitos:* scikit-learn, Vertex AI Training, CPU

#### Q183 · 3.3 · curso 5 · fácil

You are training an ML model on a large dataset. You are using a TPU to accelerate the training process. You notice that the training process is taking longer than expected. You discover that the TPU is not reaching its full capacity. What should you do?

- **A.** Increase the learning rate
- **B.** Increase the number of epochs
- **C.** Decrease the learning rate
- **D.** Increase the batch size

> [!success]- Resposta: **D**
> TPUs precisam de batches grandes para ocupar suas unidades de matriz; aumentar o batch size eleva a utilização. Mudar learning rate ou epochs (A, B, C) não altera a ocupação do hardware.
> *Conceitos:* TPU, batch size, utilization

#### Q198 · 3.3 · curso 5 · média

You developed a Transformer model in TensorFlow to translate text. Your training data includes millions of documents in a Cloud Storage bucket. You plan to use distributed training to reduce training time. You need to configure the training job while minimizing the effort required to modify code and to manage the cluster’s configuration. What should you do?

- **A.** Create a Vertex AI custom training job with GPU accelerators for the second worker pool. Use tf.distribute.MultiWorkerMirroredStrategy for distribution.
- **B.** Create a Vertex AI custom distributed training job with Reduction Server. Use N1 high-memory machine type instances for the first and second pools, and use N1 high-CPU machine type instances for the third worker pool.
- **C.** Create a training job that uses Cloud TPU VMs. Use tf.distribute.TPUStrategy for distribution.
- **D.** Create a Vertex AI custom training job with a single worker pool of A2 GPU machine type instances. Use tf.distribute.MirroredStrategv for distribution.

> [!success]- Resposta: **A**
> Um custom training job do Vertex AI com GPUs no worker pool de workers e tf.distribute.MultiWorkerMirroredStrategy distribui o Transformer em várias máquinas com mudança mínima de código e o cluster é gerenciado pelo Vertex AI. Reduction Server (B) acrescenta configuração de pools extras, TPU VMs (C) exigem gerenciar a infraestrutura de TPU, e MirroredStrategy em um único pool (D) fica limitado a uma máquina.
> *Conceitos:* MultiWorkerMirroredStrategy, custom training, treino distribuído, GPU

#### Q203 · 3.3 · curso 5 · fácil

A TensorFlow machine learning model on Compute Engine virtual machines (n2- standard-32) takes two days to complete training. The model has custom TensorFlow operations that must run partially on a CPU. You want to reduce the training time in a cost-effective manner. What should you do?

- **A.** Change the VM type to n2-highmem-32.
- **B.** Change the VM type to e2-standard-32.
- **C.** Train the model using a VM with a GPU hardware accelerator.
- **D.** Train the model using a VM with a TPU hardware accelerator.

> [!success]- Resposta: **C**
> GPUs aceleram o treino e suportam modelos com custom TensorFlow operations que precisam rodar parcialmente em CPU, reduzindo o tempo de forma custo-efetiva. TPUs (D) são tentadoras pela performance, mas não suportam bem custom ops que exigem CPU; trocar o tipo de VM de CPU (A, B) não reduz significativamente dois dias de treino.
> *Conceitos:* GPU, custom ops, TPU, tempo de treino

#### Q209 · 3.3 · curso 5 · média

You are training a custom language model for your company using a large dataset. You plan to use the Reduction Server strategy on Vertex AI. You need to configure the worker pools of the distributed training job. What should you do?

- **A.** Configure the machines of the first two worker pools to have GPUs, and to use a container image where your training code runs. Configure the third worker pool to have GPUs, and use the reductionserver container image.
- **B.** Configure the machines of the first two worker pools to have GPUs and to use a container image where your training code runs. Configure the third worker pool to use the reductionserver container image without accelerators, and choose a machine type that prioritizes bandwidth.
- **C.** Configure the machines of the first two worker pools to have TPUs and to use a container image where your training code runs. Configure the third worker pool without accelerators, and use the reductionserver container image without accelerators, and choose a machine type that prioritizes bandwidth.
- **D.** Configure the machines of the first two pools to have TPUs, and to use a container image where your training code runs. Configure the third pool to have TPUs, and use the reductionserver container image.

> [!success]- Resposta: **B** ⚠️ o arquivo dizia **D**; revisado para **B**
> O Reduction Server do Vertex AI funciona com workers em GPU (all-reduce via NCCL), e os reducers do terceiro worker pool usam o container reductionserver sem aceleradores, em máquinas com alta largura de banda de rede. O gabarito D está errado porque Reduction Server não é suportado com TPUs, e colocar GPUs nos reducers (A) desperdiça custo, já que eles apenas agregam gradientes.
> *Conceitos:* Reduction Server, treino distribuído, GPU, worker pools

#### Q212 · 3.3 · curso 5 · difícil

You are pre-training a large language model on Google Cloud. This model includes custom TensorFlow operations in the training loop. Model training will use a large batch size, and you expect training to take several weeks. You need to configure a training architecture that minimizes both training time and compute costs. What should you do?

- **A.** Implement 8 workers of a2-megagpu-16g machines by using tf.distribute.MultiWorkerMirroredStrategy.
- **B.** Implement a TPU Pod slice with -accelerator-type=v4-l28 by using tf.distribute.TPUStrategy.
- **C.** Implement 16 workers of c2d-highcpu-32 machines by using tf.distribute.MirroredStrategy.
- **D.** Implement 16 workers of a2-highgpu-8g machines by using tf.distribute.MultiWorkerMirroredStrategy.

> [!success]- Resposta: **A** ⚠️ o arquivo dizia **B**; revisado para **A**
> Custom TensorFlow operations no loop de treino tornam as TPUs inadequadas (o guia do Google indica GPUs para modelos com custom ops), por isso o gabarito B é questionável. Entre as GPUs, 8 nós a2-megagpu-16g (16 A100 cada) com MultiWorkerMirroredStrategy oferecem as mesmas 128 GPUs da opção D com menos nós e menos comunicação entre máquinas, reduzindo tempo e custo; máquinas apenas com CPU (C) seriam lentas demais para pré-treinar um LLM.
> *Conceitos:* GPU, TPU, custom ops, MultiWorkerMirroredStrategy

#### Q273 · 3.3 · curso 5 · média

You work for a rapidly growing social media company. Your team builds TensorFlow recommender models in an on-premises CPU cluster. The data contains billions of historical user events and 100,000 categorical features. You notice that as the data increases, the model training time increases. You plan to move the models to Google Cloud. You want to use the most scalable approach that also minimizes training time. What should you do?

- **A.** Deploy the training jobs by using TPU VMs with TPUv3 Pod slices, and use the TPUEmbeading API
- **B.** Deploy the training jobs in an autoscaling Google Kubernetes Engine cluster with CPUs
- **C.** Deploy a matrix factorization model training job by using BigQuery ML
- **D.** Deploy the training jobs by using Compute Engine instances with A100 GPUs, and use the tf.nn.embedding_lookup API

> [!success]- Resposta: **A**
> Modelos de recomendação com 100 mil features categóricas são dominados por embeddings grandes, e TPU Pods com a TPUEmbedding API distribuem as tabelas de embedding de forma muito eficiente, minimizando tempo de treino em escala. GPUs com tf.nn.embedding_lookup (D) escalam pior para embeddings gigantes, e CPUs no GKE repetem o problema atual.
> *Conceitos:* TPU, TPUEmbedding, recommender, treino distribuído

## Fontes

- Arquivo de questões *Google Cloud Professional Machine Learning Engineer Exam Questions* enviado por Leonardo em 16/10/2026 (gabarito original, às vezes com votos da comunidade).
- Revisão do gabarito, classificação por seção e explicações: Claude, 16/10/2026. Confiança média: dumps têm erros e a revisão também pode errar.
