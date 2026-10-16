---
title: "PMLE — Questões da seção 2: Colaborar entre times para gerenciar dados e modelos"
aliases: ["questões PMLE seção 2"]
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
summary: "42 questões de prática do exame Professional ML Engineer na seção 2 do guia (Colaborar entre times para gerenciar dados e modelos, 14% da prova), com gabarito revisado e explicação em português."
parte_de: "[[pmle-banco-de-questoes]]"
related: ["[[pmle-guia-do-exame]]"]
---

# PMLE — Questões da seção 2: Colaborar entre times para gerenciar dados e modelos

Seção 2 do guia oficial · **14% da prova** · 42 questões. Faz parte do [[pmle-banco-de-questoes|banco de questões]]. As questões estão em inglês, como na prova; a resposta fica fechada no bloco verde (no Obsidian, clique para abrir).

| Subseção | Questões |
|---|---|
| 2.1 Explorar e pré-processar dados da organização | 25 |
| 2.2 Prototipar em notebooks Jupyter | 6 |
| 2.3 Rastrear e rodar experimentos | 11 |

## 2.1 Explorar e pré-processar dados da organização

#### Q4 · 2.1 · curso 4 · fácil

You want to rebuild your ML pipeline for structured data on Google Cloud. You are using PySpark to conduct data transformations at scale, but your pipelines are taking over 12 hours to run. To speed up development and pipeline run time, you want to use a serverless tool and SQL syntax. You have already moved your raw data into Cloud Storage. How should you build the pipeline on Google Cloud while meeting the speed and processing requirements?

- **A.** Use Data Fusion's GUI to build the transformation pipelines, and then write the data into BigQuery.
- **B.** Convert your PySpark into SparkSQL queries to transform the data, and then run your pipeline on Dataproc to write the data into BigQuery.
- **C.** Ingest your data into Cloud SQL, convert your PySpark commands into SQL queries to transform the data, and then use federated queries from BigQuery for machine learning.
- **D.** Ingest your data into BigQuery using BigQuery Load, convert your PySpark commands into BigQuery SQL queries to transform the data, and then write the transformations to a new table.

> [!success]- Resposta: **D**
> Carregar os dados no BigQuery e reescrever as transformações em SQL atende aos requisitos de serverless, SQL e velocidade. Dataproc com SparkSQL (B) usa SQL mas não é serverless no sentido pedido, e Cloud SQL (C) não escala para esse volume analítico.
> *Conceitos:* BigQuery, SQL, serverless, ETL

#### Q17 · 2.1 · curso 15 · média

You are building a real-time prediction engine that streams files which may contain Personally Identifiable Information (PII) to Google Cloud. You want to use the Cloud Data Loss Prevention (DLP) API to scan the files. How should you ensure that the PII is not accessible by unauthorized individuals?

- **A.** Stream all files to Google Cloud, and then write the data to BigQuery. Periodically conduct a bulk scan of the table using the DLP API.
- **B.** Stream all files to Google Cloud, and write batches of the data to BigQuery. While the data is being written to BigQuery, conduct a bulk scan of the data using the DLP API.
- **C.** Create two buckets of data: Sensitive and Non-sensitive. Write all data to the Non-sensitive bucket. Periodically conduct a bulk scan of that bucket using the DLP API, and move the sensitive data to the Sensitive bucket.
- **D.** Create three buckets of data: Quarantine, Sensitive, and Non-sensitive. Write all data to the Quarantine bucket. Periodically conduct a bulk scan of that bucket using the DLP API, and move the data to either the Sensitive or Non-Sensitive bucket.

> [!success]- Resposta: **D**
> O padrão de quarentena mantém os dados num bucket isolado até o DLP classificá-los, e só então move para buckets sensível ou não sensível, evitando exposição. Escrever direto no bucket não sensível (C) ou no BigQuery (A, B) deixa o PII acessível antes da varredura.
> *Conceitos:* Cloud DLP, PII, quarantine bucket
> *Nome atual:* Cloud DLP hoje faz parte do Sensitive Data Protection.

#### Q23 · 2.1 · curso 2 · fácil

Your organization's call center has asked you to develop a model that analyzes customer sentiments in each call. The call center receives over one million calls daily, and data is stored in Cloud Storage. The data collected must not leave the region in which the call originated, and no Personally Identifiable Information (PII) can be stored or analyzed. The data science team has a third-party tool for visualization and access which requires a SQL ANSI-2011 compliant interface. You need to select components for data processing and for analytics. How should the data pipeline be designed?

- **A.** 1= Dataflow, 2= BigQuery
- **B.** 1 = Pub/Sub, 2= Datastore
- **C.** 1 = Dataflow, 2 = Cloud SQL
- **D.** 1 = Cloud Function, 2= Cloud SQL

> [!success]- Resposta: **A**
> Dataflow processa o volume de chamadas na região de origem e pode remover PII (com DLP), e o BigQuery oferece interface SQL ANSI 2011 escalável para a ferramenta de visualização. Cloud SQL (C) é tentador pelo SQL, mas não escala bem para analytics desse volume.
> *Conceitos:* Dataflow, BigQuery, data residency, PII

#### Q26 · 2.1 · curso 2 · fácil

You are responsible for building a unified analytics environment across a variety of on-premises data marts. Your company is experiencing data quality and security challenges when integrating data across the servers, caused by the use of a wide range of disconnected tools and temporary solutions. You need a fully managed, cloud-native data integration service that will lower the total cost of work and reduce repetitive work. Some members on your team prefer a codeless interface for building Extract, Transform, Load (ETL) process. Which service should you use?

- **A.** Dataflow
- **B.** Dataprep
- **C.** Apache Flink
- **D.** Cloud Data Fusion

> [!success]- Resposta: **D**
> Cloud Data Fusion é o serviço gerenciado de integração de dados com interface visual sem código para ETL e muitos conectores para fontes on-premises. Dataprep (B) é tentador pela interface visual, mas foca em preparo e limpeza de dados, não em integração de várias fontes.
> *Conceitos:* Cloud Data Fusion, ETL, no-code

#### Q33 · 2.1 · curso 4 · fácil

You have a demand forecasting pipeline in production that uses Dataflow to preprocess raw data prior to model training and prediction. During preprocessing, you employ Z-score normalization on data stored in BigQuery and write it back to BigQuery. New training data is added every week. You want to make the process more efficient by minimizing computation time and manual intervention. What should you do?

- **A.** Normalize the data using Google Kubernetes Engine.
- **B.** Translate the normalization algorithm into SQL for use with BigQuery.
- **C.** Use the normalizer_fn argument in TensorFlow's Feature Column API.
- **D.** Normalize the data with Apache Spark using the Dataproc connector for BigQuery.

> [!success]- Resposta: **B**
> Fazer a normalização Z-score diretamente em SQL no BigQuery elimina o round trip via Dataflow, reduzindo tempo de computação e manutenção. O normalizer_fn (C) é tentador, mas move a lógica para o modelo e não reduz o pipeline de pré-processamento existente.
> *Conceitos:* BigQuery, SQL, normalization

#### Q47 · 2.1 · curso 1 · fácil

You recently joined an enterprise-scale company that has thousands of datasets. You know that there are accurate descriptions for each table in BigQuery, and you are searching for the proper BigQuery table to use for a model you are building on AI Platform. How should you find the data that you need?

- **A.** Use Data Catalog to search the BigQuery datasets by using keywords in the table description.
- **B.** Tag each of your model and version resources on AI Platform with the name of the BigQuery table that was used for training.
- **C.** Maintain a lookup table in BigQuery that maps the table descriptions to the table ID. Query the lookup table to find the correct table ID for the data that you need.
- **D.** Execute a query in BigQuery to retrieve all the existing table names in your project using the INFORMATION_SCHEMA metadata tables that are native to BigQuery. Use the result o find the table that you need.

> [!success]- Resposta: **A**
> Data Catalog permite buscar ativos do BigQuery por palavras-chave nas descrições, ideal para milhares de datasets. INFORMATION_SCHEMA (D) é tentador, mas é limitado ao escopo consultado e não é uma ferramenta de descoberta.
> *Conceitos:* Data Catalog, data discovery, metadata
> *Nome atual:* Data Catalog hoje é o Dataplex Universal Catalog.

#### Q58 · 2.1 · curso 5 · fácil

You are working on a Neural Network-based project. The dataset provided to you has columns with different ranges. While preparing the data for model training, you discover that gradient optimization is having difficulty moving weights to a good solution. What should you do?

- **A.** Use feature construction to combine the strongest features.
- **B.** Use the representation transformation (normalization) technique.
- **C.** Improve the data cleaning step by removing features with missing values.
- **D.** Change the partitioning step to reduce the dimension of the test set and have a larger training set.

> [!success]- Resposta: **B**
> Features em escalas muito diferentes deixam a superfície de perda mal condicionada e atrapalham o gradient descent; normalizar resolve. Feature construction (A) ou remover features (C) não atacam a diferença de escala.
> *Conceitos:* normalização, gradient descent, feature scaling

#### Q62 · 2.1 · curso 5 · fácil

While conducting an exploratory analysis of a dataset, you discover that categorical feature A has substantial predictive power, but it is sometimes missing. What should you do?

- **A.** Drop feature A if more than 15% of values are missing. Otherwise, use feature A as-is.
- **B.** Compute the mode of feature A and then use it to replace the missing values in feature A.
- **C.** Replace the missing values with the values of the feature with the highest Pearson correlation with feature A.
- **D.** Add an additional class to categorical feature A for missing values. Create a new binary feature that indicates whether feature A is missing.

> [!success]- Resposta: **D**
> Criar uma categoria 'missing' e uma flag binária preserva a informação de ausência, que pode ser preditiva, sem descartar a feature forte. Imputar pela moda (B) é tentador, mas mascara o padrão de ausência e introduz viés.
> *Conceitos:* missing values, feature engineering, categóricas

#### Q84 · 2.1 · curso 5 · fácil

Your company manages an application that aggregates news articles from many different online sources and sends them to users. You need to build a recommendation model that will suggest articles to readers that are similar to the articles they are currently reading. Which approach should you use?

- **A.** Create a collaborative filtering system that recommends articles to a user based on the user’s past behavior.
- **B.** Encode all articles into vectors using word2vec, and build a model that returns articles based on vector similarity.
- **C.** Build a logistic regression model for each user that predicts whether an article should be recommended to a user.
- **D.** Manually label a few hundred articles, and then train an SVM classifier based on the manually classified articles that categorizes additional articles into their respective categories.

> [!success]- Resposta: **B**
> Recomendar artigos parecidos com o que se está lendo é content-based: embeddings (word2vec) mais similaridade vetorial. Collaborative filtering (A) é tentador, mas recomenda pelo comportamento do usuário, não pela similaridade de conteúdo.
> *Conceitos:* embeddings, similaridade vetorial, recomendação content-based

#### Q106 · 2.1 · curso 2 · fácil

You are building a linear regression model on BigQuery ML to predict a customer’s likelihood of purchasing your company’s products. Your model uses a city name variable as a key predictive component. In order to train and serve the model, your data must be organized in columns. You want to prepare your data using the least amount of coding while maintaining the predictable variables. What should you do?

- **A.** Use TensorFlow to create a categorical variable with a vocabulary list. Create the vocabulary file, and upload it as part of your model to BigQuery ML.
- **B.** Create a new view with BigQuery that does not include a column with city information
- **C.** Use Cloud Data Fusion to assign each city to a region labeled as 1, 2, 3, 4, or 5, and then use that number to represent the city in the model.
- **D.** Use Dataprep to transform the state column using a one-hot encoding method, and make each city a column with binary values.

> [!success]- Resposta: **D**
> One-hot encoding transforma a variável categórica cidade em colunas binárias sem perder poder preditivo, e o Dataprep faz isso visualmente com pouco código. Agrupar cidades em regiões numeradas (C) cria uma ordinalidade falsa e perde informação; remover a coluna (B) descarta o preditor.
> *Conceitos:* Dataprep, one-hot encoding, feature engineering

#### Q113 · 2.1 · curso 2 · média

You need to analyze user activity data from your company’s mobile applications. Your team will use BigQuery for data analysis, transformation, and experimentation with ML algorithms. You need to ensure real-time ingestion of the user activity data into BigQuery. What should you do?

- **A.** Configure Pub/Sub to stream the data into BigQuery.
- **B.** Run an Apache Spark streaming job on Dataproc to ingest the data into BigQuery.
- **C.** Run a Dataflow streaming job to ingest the data into BigQuery.
- **D.** Configure Pub/Sub and a Dataflow streaming job to ingest the data into BigQuery,

> [!success]- Resposta: **A**
> Pub/Sub tem BigQuery subscriptions que gravam mensagens direto no BigQuery em tempo real, sem pipeline extra, o que é a solução de menor esforço quando não há transformação. Pub/Sub + Dataflow (D) é tentador por ser o padrão clássico, mas adiciona componentes desnecessários já que as transformações serão feitas no BigQuery.
> *Conceitos:* Pub/Sub, BigQuery subscription, streaming ingestion

#### Q115 · 2.1 · curso 5 · fácil

You are building an ML model to predict trends in the stock market based on a wide range of factors. While exploring the data, you notice that some features have a large range. You want to ensure that the features with the largest magnitude don’t overfit the model. What should you do?

- **A.** Standardize the data by transforming it with a logarithmic function.
- **B.** Apply a principal component analysis (PCA) to minimize the effect of any particular feature.
- **C.** Use a binning strategy to replace the magnitude of each feature with the appropriate bin number.
- **D.** Normalize the data by scaling it to have values between 0 and 1.

> [!success]- Resposta: **D**
> Normalizar as features para [0,1] coloca todas na mesma escala, evitando que features de grande magnitude dominem o treino. A transformação logarítmica (A) é tentadora para distribuições assimétricas, mas não garante escala comum; PCA (B) e binning (C) mudam a representação e podem perder informação.
> *Conceitos:* normalização, feature scaling, pré-processamento

#### Q123 · 2.1 · curso 5 · fácil

You are developing an ML model to predict house prices. While preparing the data, you discover that an important predictor variable, distance from the closest school, is often missing and does not have high variance. Every instance (row) in your data is important. How should you handle the missing data?

- **A.** Delete the rows that have missing values.
- **B.** Apply feature crossing with another column that does not have missing values.
- **C.** Predict the missing values using linear regression.
- **D.** Replace the missing values with zeros.

> [!success]- Resposta: **C**
> Como todas as linhas são importantes, não se pode removê-las; imputar os valores com um modelo de regressão linear a partir das outras features preserva os dados com estimativas razoáveis. Substituir por zero (D) é tentador por ser simples, mas zero é uma distância irreal e distorce a feature; feature cross (B) não resolve ausência.
> *Conceitos:* missing values, imputação, regressão linear

#### Q127 · 2.1 · curso 5 · fácil

While performing exploratory data analysis on a dataset, you find that an important categorical feature has 5% null values. You want to minimize the bias that could result from the missing values. How should you handle the missing values?

- **A.** Remove the rows with missing values, and upsample your dataset by 5%.
- **B.** Replace the missing values with the feature’s mean.
- **C.** Replace the missing values with a placeholder category indicating a missing value.
- **D.** Move the rows with missing values to your validation dataset.

> [!success]- Resposta: **C**
> Para uma feature categórica, criar a categoria 'missing' preserva as linhas e permite ao modelo aprender se a ausência é informativa, minimizando viés. Substituir pela média (B) é tentador, mas não faz sentido para variáveis categóricas; remover linhas (A) pode introduzir viés se os dados não faltam ao acaso.
> *Conceitos:* missing values, feature categórica, viés

#### Q131 · 2.1 · curso 5 · média

You work on a data science team at a bank and are creating an ML model to predict loan default risk. You have collected and cleaned hundreds of millions of records worth of training data in a BigQuery table, and you now want to develop and compare multiple models on this data using TensorFlow and Vertex AI. You want to minimize any bottlenecks during the data ingestion state while considering scalability. What should you do?

- **A.** Use the BigQuery client library to load data into a dataframe, and use tf.data.Dataset.from_tensor_slices() to read it.
- **B.** Export data to CSV files in Cloud Storage, and use tf.data.TextLineDataset() to read them.
- **C.** Convert the data into TFRecords, and use tf.data.TFRecordDataset() to read them.
- **D.** Use TensorFlow I/O’s BigQuery Reader to directly read the data.

> [!success]- Resposta: **D**
> O TensorFlow I/O BigQuery Reader lê os dados diretamente do BigQuery em paralelo via Storage Read API, sem etapa de exportação, escalando para centenas de milhões de registros. Converter em TFRecords (C) é tentador por ser o formato ideal do TensorFlow, mas exige um passo extra de exportação/conversão e duplica dados; carregar em dataframe (A) não cabe em memória.
> *Conceitos:* TensorFlow I/O, BigQuery Storage API, tf.data

#### Q132 · 2.1 · curso 5 · média

You work on a data science team at a bank and are creating an ML model to predict loan default risk. You have collected and cleaned hundreds of millions of records worth of training data in a BigQuery table, and you now want to develop and compare multiple models on this data using TensorFlow and Vertex AI. You want to minimize any bottlenecks during the data ingestion state while considering scalability. What should you do?

- **A.** Use the BigQuery client library to load data into a dataframe, and use tf.data.Dataset.from_tensor_slices() to read it.
- **B.** Export data to CSV files in Cloud Storage, and use tf.data.TextLineDataset() to read them.
- **C.** Convert the data into TFRecords, and use tf.data.TFRecordDataset() to read them.
- **D.** Use TensorFlow I/O’s BigQuery Reader to directly read the data.

> [!success]- Resposta: **D**
> Questão duplicada da anterior: o TensorFlow I/O BigQuery Reader lê do BigQuery diretamente e em paralelo, minimizando gargalos de ingestão com boa escalabilidade. TFRecords (C) é tentador, mas exige exportação e conversão adicionais; CSV com TextLineDataset (B) é lento para parsear.
> *Conceitos:* TensorFlow I/O, BigQuery, ingestão de dados

#### Q135 · 2.1 · curso 5 · média

You work for the AI team of an automobile company, and you are developing a visual defect detection model using TensorFlow and Keras. To improve your model performance, you want to incorporate some image augmentation functions such as translation, cropping, and contrast tweaking. You randomly apply these functions to each training batch. You want to optimize your data processing pipeline for run time and compute resources utilization. What should you do?

- **A.** Embed the augmentation functions dynamically in the tf.Data pipeline.
- **B.** Embed the augmentation functions dynamically as part of Keras generators.
- **C.** Use Dataflow to create all possible augmentations, and store them as TFRecords.
- **D.** Use Dataflow to create the augmentations dynamically per training run, and stage them as TFRecords.

> [!success]- Resposta: **A**
> Aplicar as augmentations dentro do pipeline tf.data roda em paralelo com o treino (com map paralelo e prefetch), aproveitando melhor CPU e acelerador sem armazenar dados extras. Keras generators (B) são tentadores, mas rodam em Python single-threaded e são mais lentos; pré-gerar com Dataflow (C, D) consome armazenamento e perde a aleatoriedade por época.
> *Conceitos:* tf.data, data augmentation, input pipeline

#### Q146 · 2.1 · curso 1 · média

You work on the data science team at a manufacturing company. You are reviewing the company’s historical sales data, which has hundreds of millions of records. For your exploratory data analysis, you need to calculate descriptive statistics such as mean, median, and mode; conduct complex statistical tests for hypothesis testing; and plot variations of the features over time. You want to use as much of the sales data as possible in your analyses while minimizing computational resources. What should you do?

- **A.** Visualize the time plots in Google Data Studio. Import the dataset into Vertex Al Workbench user-managed notebooks. Use this data to calculate the descriptive statistics and run the statistical analyses.
- **B.** Spin up a Vertex Al Workbench user-managed notebooks instance and import the dataset. Use this data to create statistical and visual analyses.
- **C.** Use BigQuery to calculate the descriptive statistics. Use Vertex Al Workbench user-managed notebooks to visualize the time plots and run the statistical analyses.
- **D.** Use BigQuery to calculate the descriptive statistics, and use Google Data Studio to visualize the time plots. Use Vertex Al Workbench user-managed notebooks to run the statistical analyses.

> [!success]- Resposta: **C**
> Calcular estatísticas descritivas direto no BigQuery evita mover centenas de milhões de linhas e usa o motor serverless, e o notebook fica só com os testes estatísticos e plots sobre resultados agregados. Importar todo o dataset para o notebook (A, B) desperdiça memória e compute. D é tentadora, mas espalhar a análise por três ferramentas não reduz recursos de forma relevante em relação a C.
> *Conceitos:* BigQuery, EDA, Vertex AI Workbench
> *Nome atual:* Google Data Studio hoje se chama Looker Studio; user-managed notebooks foram substituídos pelas Vertex AI Workbench instances.

#### Q148 · 2.1 · curso 15 · média

You are training an ML model using data stored in BigQuery that contains several values that are considered Personally Identifiable Information (PII). You need to reduce the sensitivity of the dataset before training your model. Every column is critical to your model. How should you proceed?

- **A.** Using Dataflow, ingest the columns with sensitive data from BigQuery, and then randomize the values in each sensitive column.
- **B.** Use the Cloud Data Loss Prevention (DLP) API to scan for sensitive data, and use Dataflow with the DLP API to encrypt sensitive values with Format Preserving Encryption.
- **C.** Use the Cloud Data Loss Prevention (DLP) API to scan for sensitive data, and use Dataflow to replace all sensitive data by using the encryption algorithm AES-256 with a salt.
- **D.** Before training, use BigQuery to select only the columns that do not contain sensitive data. Create an authorized view of the data so that sensitive values cannot be accessed by unauthorized individuals.

> [!success]- Resposta: **B**
> Cloud DLP identifica os dados sensíveis e a Format Preserving Encryption pseudonimiza preservando formato e consistência, então as colunas continuam úteis ao modelo. Randomizar (A) destrói o sinal, e remover colunas (D) contraria o requisito de que todas são críticas. AES-256 com salt (C) gera valores sem formato e não consistentes para o treino.
> *Conceitos:* Cloud DLP, Format Preserving Encryption, PII, Dataflow
> *Nome atual:* Cloud DLP hoje faz parte do Sensitive Data Protection.

#### Q152 · 2.1 · curso 5 · fácil

You are developing an ML model using a dataset with categorical input variables. You have randomly split half of the data into training and test sets. After applying one-hot encoding on the categorical variables in the training set, you discover that one categorical variable is missing from the test set. What should you do?

- **A.** Use sparse representation in the test set.
- **B.** Randomly redistribute the data, with 70% for the training set and 30% for the test set
- **C.** Apply one-hot encoding on the categorical variables in the test data
- **D.** Collect more data representing all categories

> [!success]- Resposta: **C**
> O mesmo one-hot encoding (com o vocabulário aprendido no treino) precisa ser aplicado ao test set para que as features tenham o mesmo formato. Re-split (B) ou coletar mais dados (D) não resolvem o problema real, que é a transformação inconsistente entre treino e teste.
> *Conceitos:* one-hot encoding, train/test consistency, preprocessing

#### Q205 · 2.1 · curso 15 · fácil

You are analyzing customer data for a healthcare organization that is stored in Cloud Storage. The data contains personally identifiable information (PII). You need to perform data exploration and preprocessing while ensuring the security and privacy of sensitive fields. What should you do?

- **A.** Use the Cloud Data Loss Prevention (DLP) API to de-identify the PII before performing data exploration and preprocessing.
- **B.** Use customer-managed encryption keys (CMEK) to encrypt the PII data at rest, and decrypt the PII data during data exploration and preprocessing.
- **C.** Use a VM inside a VPC Service Controls security perimeter to perform data exploration and preprocessing.
- **D.** Use Google-managed encryption keys to encrypt the PII data at rest, and decrypt the PII data during data exploration and preprocessing.

> [!success]- Resposta: **A**
> A Cloud DLP API (Sensitive Data Protection) de-identifica a PII (mascaramento, tokenização) antes da exploração, de modo que os analistas nunca veem os dados sensíveis. CMEK ou chaves gerenciadas pelo Google (B, D) protegem os dados em repouso, mas os dados ficam expostos depois de descriptografados; VPC Service Controls (C) evita exfiltração mas não protege os campos sensíveis.
> *Conceitos:* Cloud DLP, de-identificação, PII, Sensitive Data Protection
> *Nome atual:* Cloud DLP agora faz parte do Sensitive Data Protection.

#### Q231 · 2.1 · curso 5 · fácil

You are using Keras and TensorFlow to develop a fraud detection model. Records of customer transactions are stored in a large table in BigQuery. You need to preprocess these records in a cost-effective and efficient way before you use them to train the model. The trained model will be used to perform batch inference in BigQuery. How should you implement the preprocessing workflow?

- **A.** Implement a preprocessing pipeline by using Apache Spark, and run the pipeline on Dataproc. Save the preprocessed data as CSV files in a Cloud Storage bucket.
- **B.** Load the data into a pandas DataFrame. Implement the preprocessing steps using pandas transformations, and train the model directly on the DataFrame.
- **C.** Perform preprocessing in BigQuery by using SQL. Use the BigQueryClient in TensorFlow to read the data directly from BigQuery.
- **D.** Implement a preprocessing pipeline by using Apache Beam, and run the pipeline on Dataflow. Save the preprocessed data as CSV files in a Cloud Storage bucket.

> [!success]- Resposta: **C**
> Pré-processar com SQL no próprio BigQuery é eficiente e barato, e ler diretamente com o BigQuery reader do TensorFlow evita exportar arquivos; como a inferência em lote também será no BigQuery, a lógica fica consistente. Dataflow ou Dataproc gerando CSVs (A, D) adicionam custo e etapas, e pandas (B) não escala para uma tabela grande.
> *Conceitos:* BigQuery, pré-processamento SQL, TensorFlow I/O, custo

#### Q232 · 2.1 · curso 5 · fácil

You need to use TensorFlow to train an image classification model. Your dataset is located in a Cloud Storage directory and contains millions of labeled images. Before training the model, you need to prepare the data. You want the data preprocessing and model training workflow to be as efficient, scalable, and low maintenance as possible. What should you do?

- **A.** 1. Create a Dataflow job that creates sharded TFRecord files in a Cloud Storage directory. 2. Reference tf.data.TFRecordDataset in the training script. 3. Train the model by using Vertex AI Training with a V100 GPU.
- **B.** 1. Create a Dataflow job that moves the images into multiple Cloud Storage directories, where each directory is named according to the corresponding label 2. Reference tfds.folder_dataset:ImageFolder in the training script. 3. Train the model by using Vertex AI Training with a V100 GPU.
- **C.** 1. Create a Jupyter notebook that uses an nt-standard-64 V100 GPU Vertex AI Workbench instance. 2. Write a Python script that creates sharded TFRecord files in a directory inside the instance. 3. Reference tf.data.TFRecordDataset in the training script. 4. Train the model by using the Workbench instance.
- **D.** 1. Create a Jupyter notebook that uses an n1-standard-64, V100 GPU Vertex AI Workbench instance. 2. Write a Python script that copies the images into multiple Cloud Storage directories, where each. directory is named according to the corresponding label. 3. Reference tfds.foladr_dataset.ImageFolder in the training script. 4. Train the model by using the Workbench instance.

> [!success]- Resposta: **A**
> Um job de Dataflow que gera TFRecords fragmentados no Cloud Storage escala para milhões de imagens, e o tf.data.TFRecordDataset lê esses shards com alto throughput no Vertex AI Training gerenciado. Organizar pastas por label e usar ImageFolder (B) lê milhões de arquivos pequenos, com baixa eficiência de I/O; fazer tudo em uma instância do Workbench (C, D) não escala e exige mais manutenção.
> *Conceitos:* TFRecord, Dataflow, tf.data, Vertex AI Training

#### Q253 · 2.1 · curso 7 · fácil

You work for a delivery company. You need to design a system that stores and manages features such as parcels delivered and truck locations over time. The system must retrieve the features with low latency and feed those features into a model for online prediction. The data science team will retrieve historical data at a specific point in time for model training. You want to store the features with minimal effort. What should you do?

- **A.** Store features in Bigtable as key/value data.
- **B.** Store features in Vertex AI Feature Store.
- **C.** Store features as a Vertex AI dataset, and use those features to train the models hosted in Vertex AI endpoints.
- **D.** Store features in BigQuery timestamp partitioned tables, and use the BigQuery Storage Read API to serve the features.

> [!success]- Resposta: **B**
> Vertex AI Feature Store oferece serving online de baixa latência e recuperação point-in-time de dados históricos para treino, com mínimo esforço. Bigtable ou BigQuery exigiriam implementar manualmente a lógica de point-in-time e de serving.
> *Conceitos:* Vertex AI Feature Store, point-in-time, online serving

#### Q263 · 2.1 · curso 5 · difícil

You are developing a custom TensorFlow classification model based on tabular data. Your raw data is stored in BigQuery. contains hundreds of millions of rows, and includes both categorical and numerical features. You need to use a MaxMin scaler on some numerical features, and apply a one-hot encoding to some categorical features such as SKU names. Your model will be trained over multiple epochs. You want to minimize the effort and cost of your solution. What should you do?

- **A.** 1. Write a SQL query to create a separate lookup table to scale the numerical features. 2. Deploy a TensorFlow-based model from Hugging Face to BigQuery to encode the text features. 3. Feed the resulting BigQuery view into Vertex AI Training.
- **B.** 1. Use BigQuery to scale the numerical features. 2. Feed the features into Vertex AI Training. 3. Allow TensorFlow to perform the one-hot text encoding.
- **C.** 1. Use TFX components with Dataflow to encode the text features and scale the numerical features. 2. Export results to Cloud Storage as TFRecords. 3. Feed the data into Vertex AI Training.
- **D.** 1. Write a SQL query to create a separate lookup table to scale the numerical features. 2. Perform the one-hot text encoding in BigQuery. 3. Feed the resulting BigQuery view into Vertex AI Training.

> [!success]- Resposta: **C** · votos no arquivo: C (50%) B (50%)
> Com centenas de milhões de linhas e treino em várias épocas, aplicar MinMax e one-hot uma única vez com TFX (TensorFlow Transform) no Dataflow e gravar TFRecords evita recomputar as transformações a cada época e garante consistência treino/serving. A opção B é tentadora pela simplicidade, mas deixa o one-hot de um vocabulário grande (SKUs) para o TensorFlow a cada época, aumentando custo e tempo.
> *Conceitos:* TensorFlow Transform, Dataflow, TFRecord, feature engineering

## 2.2 Prototipar em notebooks Jupyter

#### Q93 · 2.2 · curso 1 · média

You have been asked to build a model using a dataset that is stored in a medium-sized (~10 GB) BigQuery table. You need to quickly determine whether this data is suitable for model development. You want to create a one-time report that includes both informative visualizations of data distributions and more sophisticated statistical analyses to share with other ML engineers on your team. You require maximum flexibility to create your report. What should you do?

- **A.** Use Vertex AI Workbench user-managed notebooks to generate the report.
- **B.** Use the Google Data Studio to create the report.
- **C.** Use the output from TensorFlow Data Validation on Dataflow to generate the report.
- **D.** Use Dataprep to create the report.

> [!success]- Resposta: **A** · votos no arquivo: A(53%)
> Maximum flexibility para combinar visualizações e análises estatísticas sofisticadas aponta para notebooks no Vertex AI Workbench, conectados ao BigQuery. Data Studio (B) é tentador para relatórios compartilháveis, mas é limitado para análises estatísticas avançadas; TFDV e Dataprep (C, D) têm escopo fixo.
> *Conceitos:* Vertex AI Workbench, EDA, notebooks
> *Nome atual:* Google Data Studio hoje é Looker Studio; user-managed notebooks foram substituídos por Workbench instances.

#### Q181 · 2.2 · curso 15 · média

You work for a bank with strict data governance requirements. You recently implemented a custom model to detect fraudulent transactions. You want your training code to download internal data by using an API endpoint hosted in your project’s network. You need the data to be accessed in the most secure way, while mitigating the risk of data exfiltration. What should you do?

- **A.** Enable VPC Service Controls for peerings, and add Vertex AI to a service perimeter.
- **B.** Create a Cloud Run endpoint as a proxy to the data. Use Identity and Access Management (IAM) authentication to secure access to the endpoint from the training job.
- **C.** Configure VPC Peering with Vertex AI, and specify the network of the training job.
- **D.** Download the data to a Cloud Storage bucket before calling the training job.

> [!success]- Resposta: **A** · votos no arquivo: A (60%) B(40%)
> VPC Service Controls cria um perímetro que impede a exfiltração de dados, e com peering o job do Vertex AI acessa o endpoint interno da rede do projeto. É o mecanismo recomendado pelo Google para esse risco. O proxy Cloud Run com IAM (B) controla quem acessa, mas não impede que os dados saiam do perímetro, por isso a escolha é A.
> *Conceitos:* VPC Service Controls, data exfiltration, VPC peering

#### Q202 · 2.2 · curso 2 · média

You work for a startup that has multiple data science workloads. Your compute infrastructure is currently on-premises, and the data science workloads are native to PySpark. Your team plans to migrate their data science workloads to Google Cloud. You need to build a proof of concept to migrate one data science job to Google Cloud. You want to propose a migration process that requires minimal cost and effort. What should you do first?

- **A.** Create a n2-standard-4 VM instance and install Java, Scala, and Apache Spark dependencies on it.
- **B.** Create a Google Kubernetes Engine cluster with a basic node pool configuration, install Java, Scala, and Apache Spark dependencies on it.
- **C.** Create a Standard (1 master, 3 workers) Dataproc cluster, and run a Vertex AI Workbench notebook instance on it.
- **D.** Create a Vertex AI Workbench notebook with instance type n2-standard-4.

> [!success]- Resposta: **C** · votos no arquivo: C (53%) D (47%)
> Para um job nativo em PySpark, o Dataproc é o serviço gerenciado de Spark que permite migrar o código praticamente sem mudanças, e o Workbench conectado ao cluster dá o ambiente interativo para a prova de conceito. A opção D (só um notebook n2-standard-4) é tentadora pelo custo, mas não fornece um ambiente Spark distribuído representativo da migração (embora hoje Dataproc Serverless a partir do Workbench também seja uma alternativa); instalar Spark manualmente em VM ou GKE (A, B) exige mais esforço.
> *Conceitos:* Dataproc, PySpark, Vertex AI Workbench, migração

#### Q220 · 2.2 · curso 6 · média

You are collaborating on a model prototype with your team. You need to create a Vertex AI Workbench environment for the members of your team and also limit access to other employees in your project. What should you do?

- **A.** 1. Create a new service account and grant it the Notebook Viewer role 2. Grant the Service Account User role to each team member on the service account 3. Grant the Vertex AI User role to each team member 4. Provision a Vertex AI Workbench user-managed notebook instance that uses the new service account
- **B.** 1. Grant the Vertex AI User role to the default Compute Engine service account 2. Grant the Service Account User role to each team member on the default Compute Engine service account 3. Provision a Vertex AI Workbench user-managed notebook instance that uses the default Compute Engine service account.
- **C.** 1. Create a new service account and grant it the Vertex AI User role 2. Grant the Service Account User role to each team member on the service account 3. Grant the Notebook Viewer role to each team member. 4. Provision a Vertex AI Workbench user-managed notebook instance that uses the new service account
- **D.** 1. Grant the Vertex AI User role to the primary team member 2. Grant the Notebook Viewer role to the other team members 3. Provision a Vertex AI Workbench user-managed notebook instance that uses the primary user’s account

> [!success]- Resposta: **C**
> Criar uma service account dedicada com Vertex AI User, conceder Service Account User aos membros da equipe nessa conta e Notebook Viewer a eles restringe o acesso ao notebook apenas à equipe, seguindo least privilege. Usar a service account padrão do Compute Engine (B) amplia o acesso a outros funcionários, e A inverte os papéis (a service account não precisa de Notebook Viewer).
> *Conceitos:* IAM, service account, Vertex AI Workbench, least privilege
> *Nome atual:* Notebooks user-managed estão descontinuados; o equivalente atual são as instâncias do Vertex AI Workbench.

#### Q254 · 2.2 · curso 6 · fácil

You are working on a prototype of a text classification model in a managed Vertex AI Workbench notebook. You want to quickly experiment with tokenizing text by using a Natural Language Toolkit (NLTK) library. How should you add the library to your Jupyter kernel?

- **A.** Install the NLTK library from a terminal by using the pip install nltk command.
- **B.** Write a custom Dataflow job that uses NLTK to tokenize your text and saves the output to Cloud Storage.
- **C.** Create a new Vertex AI Workbench notebook with a custom image that includes the NLTK library.
- **D.** Install the NLTK library from a Jupyter cell by using the !pip install nltk --user command.

> [!success]- Resposta: **D**
> Instalar com !pip install nltk --user em uma célula instala o pacote no ambiente do kernel em uso, que é o jeito rápido de experimentar. Instalar pelo terminal (A) pode instalar em outro ambiente Python que não o do kernel; imagem customizada (C) é exagero para um teste rápido.
> *Conceitos:* Vertex AI Workbench, pip, Jupyter kernel

#### Q261 · 2.2 · curso 6 · média

You are developing a recommendation engine for an online clothing store. The historical customer transaction data is stored in BigQuery and Cloud Storage. You need to perform exploratory data analysis (EDA), preprocessing and model training. You plan to rerun these EDA, preprocessing, and training steps as you experiment with different types of algorithms. You want to minimize the cost and development effort of running these steps as you experiment. How should you configure the environment?

- **A.** Create a Vertex AI Workbench user-managed notebook using the default VM instance, and use the %%bigquerv magic commands in Jupyter to query the tables.
- **B.** Create a Vertex AI Workbench managed notebook to browse and query the tables directly from the JupyterLab interface.
- **C.** Create a Vertex AI Workbench user-managed notebook on a Dataproc Hub, and use the %%bigquery magic commands in Jupyter to query the tables.
- **D.** Create a Vertex AI Workbench managed notebook on a Dataproc cluster, and use the spark-bigquery-connector to access the tables.

> [!success]- Resposta: **B**
> Um managed notebook do Workbench tem integração nativa com BigQuery e Cloud Storage para navegar e consultar tabelas na interface do JupyterLab, minimizando esforço de configuração e gerenciamento. Clusters Dataproc (C/D) adicionam custo e complexidade desnecessários para esse volume de experimentação.
> *Conceitos:* Vertex AI Workbench, managed notebook, BigQuery, EDA
> *Nome atual:* Managed notebooks e user-managed notebooks do Workbench foram descontinuados; hoje usa-se Vertex AI Workbench instances (ou Colab Enterprise).

## 2.3 Rastrear e rodar experimentos

#### Q34 · 2.3 · curso 6 · média

You need to design a customized deep neural network in Keras that will predict customer purchases based on their purchase history. You want to explore model performance using multiple model architectures, store training data, and be able to compare the evaluation metrics in the same dashboard. What should you do?

- **A.** Create multiple models using AutoML Tables.
- **B.** Automate multiple training runs using Cloud Composer.
- **C.** Run multiple training jobs on AI Platform with similar job names.
- **D.** Create an experiment in Kubeflow Pipelines to organize multiple runs.

> [!success]- Resposta: **D**
> Experiments no Kubeflow Pipelines (hoje Vertex AI Experiments) organizam várias execuções e permitem comparar métricas no mesmo dashboard. Jobs com nomes parecidos (C) não oferecem comparação estruturada, e AutoML Tables (A) não permite arquiteturas Keras customizadas.
> *Conceitos:* experiments, Kubeflow Pipelines, metric comparison
> *Nome atual:* Experiments do Kubeflow Pipelines e AI Platform hoje são Vertex AI Experiments.

#### Q59 · 2.3 · curso 6 · média

Your data science team needs to rapidly experiment with various features, model architectures, and hyperparameters. They need to track the accuracy metrics for various experiments and use an API to query the metrics over time. What should they use to track and report their experiments while minimizing manual effort?

- **A.** Use Kubeflow Pipelines to execute the experiments. Export the metrics file, and query the results using the Kubeflow Pipelines API.
- **B.** Use AI Platform Training to execute the experiments. Write the accuracy metrics to BigQuery, and query the results using the BigQuery API.
- **C.** Use AI Platform Training to execute the experiments. Write the accuracy metrics to Cloud Monitoring, and query the results using the Monitoring API.
- **D.** Use AI Platform Notebooks to execute the experiments. Collect the results in a shared Google Sheets file, and query the results using the Google Sheets API.

> [!success]- Resposta: **A**
> Kubeflow Pipelines registra métricas de cada execução automaticamente e permite consultá-las via API, com pouco esforço manual. Gravar métricas em BigQuery ou Cloud Monitoring (B, C) exige código extra. Hoje a escolha natural seria Vertex AI Experiments integrado a Vertex AI Pipelines.
> *Conceitos:* Kubeflow Pipelines, experiment tracking, métricas
> *Nome atual:* AI Platform hoje é Vertex AI (Training, Prediction, Workbench). Hoje o rastreamento seria feito com Vertex AI Experiments.

#### Q147 · 2.3 · curso 6 · média

Your data science team needs to rapidly experiment with various features, model architectures, and hyperparameters. They need to track the accuracy metrics for various experiments and use an API to query the metrics over time. What should they use to track and report their experiments while minimizing manual effort?

- **A.** Use Vertex Al Pipelines to execute the experiments. Query the results stored in MetadataStore using the Vertex Al API.
- **B.** Use Vertex Al Training to execute the experiments. Write the accuracy metrics to BigQuery, and query the results using the BigQuery API.
- **C.** Use Vertex Al Training to execute the experiments. Write the accuracy metrics to Cloud Monitoring, and query the results using the Monitoring API.
- **D.** Use Vertex Al Workbench user-managed notebooks to execute the experiments. Collect the results in a shared Google Sheets file, and query the results using the Google Sheets API.

> [!success]- Resposta: **A**
> Execuções em Vertex AI Pipelines registram parâmetros e métricas automaticamente no Vertex ML Metadata (MetadataStore), consultável via Vertex AI API, sem esforço manual. Gravar métricas em BigQuery ou Cloud Monitoring (B, C) exige código próprio. Hoje a resposta ideal seria Vertex AI Experiments, que usa esse mesmo metadata store.
> *Conceitos:* Vertex AI Pipelines, Vertex ML Metadata, experiment tracking

#### Q172 · 2.3 · curso 6 · média

You created an ML pipeline with multiple input parameters. You want to investigate the tradeoffs between different parameter combinations. The parameter options are • Input dataset • Max tree depth of the boosted tree regressor • Optimizer learning rate You need to compare the pipeline performance of the different parameter combinations measured in F1 score, time to train, and model complexity. You want your approach to be reproducible, and track all pipeline runs on the same platform. What should you do?

- **A.** 1. Use BigQueryML to create a boosted tree regressor, and use the hyperparameter tuning capability. 2. Configure the hyperparameter syntax to select different input datasets: max tree depths, and optimizer learning rates. Choose the grid search option.
- **B.** 1. Create a Vertex AI pipeline with a custom model training job as part of the pipeline. Configure the pipeline’s parameters to include those you are investigating. 2. In the custom training step, use the Bayesian optimization method with F1 score as the target to maximize.
- **C.** 1. Create a Vertex AI Workbench notebook for each of the different input datasets. 2. In each notebook, run different local training jobs with different combinations of the max tree depth and optimizer learning rate parameters. 3. After each notebook finishes, append the results to a BigQuery table.
- **D.** 1. Create an experiment in Vertex AI Experiments. 2. Create a Vertex AI pipeline with a custom model training job as part of the pipeline. Configure the pipeline’s parameters to include those you are investigating. 3. Submit multiple runs to the same experiment, using different values for the parameters.

> [!success]- Resposta: **D**
> Vertex AI Experiments com várias execuções do mesmo Vertex AI pipeline parametrizado dá reprodutibilidade e compara métricas (F1, tempo, complexidade) em uma única plataforma. Otimização Bayesiana (B) busca o melhor valor em vez de comparar tradeoffs, e notebooks separados (C) não são reprodutíveis nem rastreados.
> *Conceitos:* Vertex AI Experiments, Vertex AI Pipelines, reproducibility

#### Q230 · 2.3 · curso 6 · média

ou are training models in Vertex AI by using data that spans across multiple Google Cloud projects. You need to find, track, and compare the performance of the different versions of your models. Which Google Cloud services should you include in your ML workflow?

- **A.** Dataplex, Vertex AI Feature Store, and Vertex AI TensorBoard
- **B.** Vertex AI Pipelines, Vertex AI Feature Store, and Vertex AI Experiments
- **C.** Dataplex, Vertex AI Experiments, and Vertex AI ML Metadata
- **D.** Vertex AI Pipelines, Vertex AI Experiments, and Vertex AI Metadata

> [!success]- Resposta: **D** · votos no arquivo: D (50%), B (25%), C(25%)
> Vertex AI Pipelines executa e registra os treinos, Vertex AI Experiments permite comparar desempenho entre runs e versões de modelo, e Vertex ML Metadata rastreia linhagem e artefatos, cobrindo encontrar, rastrear e comparar. Dataplex (C) é tentador por causa dos dados em vários projetos, mas é um serviço de governança/descoberta de dados, não de comparação de modelos; Feature Store (B) não ajuda a comparar versões de modelos.
> *Conceitos:* Vertex AI Experiments, Vertex ML Metadata, Vertex AI Pipelines, rastreamento

#### Q241 · 2.3 · curso 6 · fácil

You have created a Vertex AI pipeline that automates custom model training. You want to add a pipeline component that enables your team to most easily collaborate when running different executions and comparing metrics both visually and programmatically. What should you do?

- **A.** Add a component to the Vertex AI pipeline that logs metrics to a BigQuery table. Query the table to compare different executions of the pipeline. Connect BigQuery to Looker Studio to visualize metrics.
- **B.** Add a component to the Vertex AI pipeline that logs metrics to a BigQuery table. Load the table into a pandas DataFrame to compare different executions of the pipeline. Use Matplotlib to visualize metrics.
- **C.** Add a component to the Vertex AI pipeline that logs metrics to Vertex ML Metadata. Use Vertex AI Experiments to compare different executions of the pipeline. Use Vertex AI TensorBoard to visualize metrics.
- **D.** Add a component to the Vertex AI pipeline that logs metrics to Vertex ML Metadata. Load the Vertex ML Metadata into a pandas DataFrame to compare different executions of the pipeline. Use Matplotlib to visualize metrics.

> [!success]- Resposta: **C**
> Registrar métricas no Vertex ML Metadata e usar o Vertex AI Experiments permite comparar execuções do pipeline tanto na console (visualmente) quanto via SDK (programaticamente), com o Vertex AI TensorBoard para visualizações compartilhadas pela equipe. Soluções com BigQuery, Looker Studio ou pandas/Matplotlib (A, B, D) exigem construir e manter a infraestrutura de comparação manualmente.
> *Conceitos:* Vertex AI Experiments, Vertex ML Metadata, Vertex AI TensorBoard, colaboração

#### Q242 · 2.3 · curso 6 · fácil

Your team is training a large number of ML models that use different algorithms, parameters, and datasets. Some models are trained in Vertex AI Pipelines, and some are trained on Vertex AI Workbench notebook instances. Your team wants to compare the performance of the models across both services. You want to minimize the effort required to store the parameters and metrics. What should you do?

- **A.** Implement an additional step for all the models running in pipelines and notebooks to export parameters and metrics to BigQuery.
- **B.** Create a Vertex AI experiment. Submit all the pipelines as experiment runs. For models trained on notebooks log parameters and metrics by using the Vertex AI SDK.
- **C.** Implement all models in Vertex AI Pipelines Create a Vertex AI experiment, and associate all pipeline runs with that experiment.
- **D.** Store all model parameters and metrics as model metadata by using the Vertex AI Metadata API.

> [!success]- Resposta: **B**
> Um Vertex AI experiment aceita pipeline runs como experiment runs e, nos notebooks, o SDK (aiplatform.start_run, log_params, log_metrics) registra parâmetros e métricas no mesmo experimento, permitindo comparar tudo em um só lugar com esforço mínimo. Migrar todos os modelos para Pipelines (C) é trabalhoso, e exportar para BigQuery ou usar a Metadata API diretamente (A, D) exige implementação própria.
> *Conceitos:* Vertex AI Experiments, Vertex AI SDK, Vertex AI Pipelines, métricas

#### Q243 · 2.3 · curso 6 · fácil

You work on a team that builds state-of-the-art deep learning models by using the TensorFlow framework. Your team runs multiple ML experiments each week, which makes it difficult to track the experiment runs. You want a simple approach to effectively track, visualize, and debug ML experiment runs on Google Cloud while minimizing any overhead code. How should you proceed?

- **A.** Set up Vertex AI Experiments to track metrics and parameters. Configure Vertex AI TensorBoard for visualization.
- **B.** Set up a Cloud Function to write and save metrics files to a Cloud Storage bucket. Configure a Google Cloud VM to host TensorBoard locally for visualization.
- **C.** Set up a Vertex AI Workbench notebook instance. Use the instance to save metrics data in a Cloud Storage bucket and to host TensorBoard locally for visualization.
- **D.** Set up a Cloud Function to write and save metrics files to a BigQuery table. Configure a Google Cloud VM to host TensorBoard locally for visualization.

> [!success]- Resposta: **A**
> Vertex AI Experiments registra parâmetros e métricas de cada run com pouco código, e o Vertex AI TensorBoard gerenciado oferece visualização e debug sem infraestrutura própria. As alternativas com Cloud Function e VM hospedando TensorBoard exigem código e operação manual, contrariando o requisito de mínimo overhead.
> *Conceitos:* Vertex AI Experiments, Vertex AI TensorBoard, experiment tracking

#### Q260 · 2.3 · curso 6 · difícil

You are developing a model to predict whether a failure will occur in a critical machine part. You have a dataset consisting of a multivariate time series and labels indicating whether the machine part failed. You recently started experimenting with a few different preprocessing and modeling approaches in a Vertex AI Workbench notebook. You want to log data and track artifacts from each run. How should you set up your experiments?

- **A.** 1. Use the Vertex AI SDK to create an experiment and set up Vertex ML Metadata. 2. Use the log_time_series_metrics function to track the preprocessed data, and use the log_merrics function to log loss values.
- **B.** 1. Use the Vertex AI SDK to create an experiment and set up Vertex ML Metadata. 2. Use the log_time_series_metrics function to track the preprocessed data, and use the log_metrics function to log loss values.
- **C.** 1. Create a Vertex AI TensorBoard instance and use the Vertex AI SDK to create an experiment and associate the TensorBoard instance. 2. Use the assign_input_artifact method to track the preprocessed data and use the log_time_series_metrics function to log loss values.
- **D.** 1. Create a Vertex AI TensorBoard instance, and use the Vertex AI SDK to create an experiment and associate the TensorBoard instance. 2. Use the log_time_series_metrics function to track the preprocessed data, and use the log_metrics function to log loss values.

> [!success]- Resposta: **C** ⚠️ o arquivo dizia **B**; revisado para **C**
> log_time_series_metrics exige uma instância do Vertex AI TensorBoard associada ao experimento e serve para métricas ao longo de steps, como a curva de loss; os dados pré-processados devem ser rastreados como artefato com assign_input_artifact. O gabarito B usa log_time_series_metrics para 'rastrear dados', o que não faz sentido, e não cria TensorBoard, sem o qual a função falha.
> *Conceitos:* Vertex AI Experiments, Vertex AI TensorBoard, log_time_series_metrics, artifacts

#### Q268 · 2.3 · curso 6 · média

You want to migrate a scikit-learn classifier model to TensorFlow. You plan to train the TensorFlow classifier model using the same training set that was used to train the scikit-learn model, and then compare the performances using a common test set. You want to use the Vertex AI Python SDK to manually log the evaluation metrics of each model and compare them based on their F1 scores and confusion matrices. How should you log the metrics?

- **A.** Use the aiplatform.log_classification_metrics function to log the F1 score, and use the aiplatform.log_metrics function to log the confusion matrix.
- **B.** Use the aiplatform.log_classification_metrics function to log the F1 score and the confusion matrix.
- **C.** Use the aiplatform.log_metrics function to log the F1 score and the confusion matrix.
- **D.** Use the aiplatform.log_metrics function to log the F1 score: and use the aiplatform.log_classification_metrics function to log the confusion matrix.

> [!success]- Resposta: **D** · votos no arquivo: B (55%) D (45%)
> aiplatform.log_classification_metrics registra artefatos de classificação como confusion matrix e curva ROC, mas não aceita F1 score; métricas escalares como F1 vão em aiplatform.log_metrics. O gabarito B é tentador pelo nome da função, mas ela não tem parâmetro para F1.
> *Conceitos:* Vertex AI Experiments, log_metrics, log_classification_metrics, confusion matrix

#### Q270 · 2.3 · curso 6 · média

You are developing an ML model in a Vertex AI Workbench notebook. You want to track artifacts and compare models during experimentation using different approaches. You need to rapidly and easily transition successful experiments to production as you iterate on your model implementation. What should you do?

- **A.** 1. Initialize the Vertex SDK with the name of your experiment. Log parameters and metrics for each experiment, and attach dataset and model artifacts as inputs and outputs to each execution. 2. After a successful experiment create a Vertex AI pipeline.
- **B.** 1. Initialize the Vertex SDK with the name of your experiment. Log parameters and metrics for each experiment, save your dataset to a Cloud Storage bucket, and upload the models to Vertex AI Model Registry. 2. After a successful experiment, create a Vertex AI pipeline.
- **C.** 1. Create a Vertex AI pipeline with parameters you want to track as arguments to your PipelineJob. Use the Metrics, Model, and Dataset artifact types from the Kubeflow Pipelines DSL as the inputs and outputs of the components in your pipeline. 2. Associate the pipeline with your experiment when you submit the job.
- **D.** 1. Create a Vertex AI pipeline. Use the Dataset and Model artifact types from the Kubeflow Pipelines DSL as the inputs and outputs of the components in your pipeline. 2. In your training component, use the Vertex AI SDK to create an experiment run. Configure the log_params and log_metrics functions to track parameters and metrics of your experiment.

> [!success]- Resposta: **A**
> Inicializar o SDK com o experimento, registrar parâmetros e métricas e associar dataset e modelo como artefatos de entrada/saída de cada execução dá rastreabilidade de linhagem, e depois o experimento bem-sucedido vira um Vertex AI pipeline. Criar pipelines já na fase exploratória (C/D) desacelera a iteração.
> *Conceitos:* Vertex AI Experiments, ML Metadata, artifacts, Vertex AI Pipelines

## Fontes

- Arquivo de questões *Google Cloud Professional Machine Learning Engineer Exam Questions* enviado por Leonardo em 16/10/2026 (gabarito original, às vezes com votos da comunidade).
- Revisão do gabarito, classificação por seção e explicações: Claude, 16/10/2026. Confiança média: dumps têm erros e a revisão também pode errar.
