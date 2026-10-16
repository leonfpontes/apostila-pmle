---
title: "PMLE — Questões da seção 6: Monitorar soluções de IA"
aliases: ["questões PMLE seção 6"]
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
summary: "36 questões de prática do exame Professional ML Engineer na seção 6 do guia (Monitorar soluções de IA, 13% da prova), com gabarito revisado e explicação em português."
parte_de: "[[pmle-banco-de-questoes]]"
related: ["[[pmle-guia-do-exame]]"]
---

# PMLE — Questões da seção 6: Monitorar soluções de IA

Seção 6 do guia oficial · **13% da prova** · 36 questões. Faz parte do [[pmle-banco-de-questoes|banco de questões]]. As questões estão em inglês, como na prova; a resposta fica fechada no bloco verde (no Obsidian, clique para abrir).

| Subseção | Questões |
|---|---|
| 6.1 Riscos de soluções de IA | 19 |
| 6.2 Monitorar, testar e corrigir | 17 |

## 6.1 Riscos de soluções de IA

#### Q27 · 6.1 · curso 14 · fácil

You are an ML engineer at a regulated insurance company. You are asked to develop an insurance approval model that accepts or rejects insurance applications from potential customers. What factors should you consider before building the model?

- **A.** Redaction, reproducibility, and explainability
- **B.** Traceability, reproducibility, and explainability
- **C.** Federated learning, reproducibility, and explainability
- **D.** Differential privacy, federated learning, and explainability

> [!success]- Resposta: **B**
> Em setor regulado, decisões de aprovação precisam ser rastreáveis, reproduzíveis e explicáveis para auditoria. Federated learning e differential privacy (C, D) são técnicas de privacidade e não requisitos centrais aqui; redaction (A) não é o foco.
> *Conceitos:* explainability, traceability, reproducibility, regulated industry

#### Q75 · 6.1 · curso 14 · média

You work at a subscription-based company. You have trained an ensemble of trees and neural networks to predict customer churn, which is the likelihood that customers will not renew their yearly subscription. The average prediction is a 15% churn rate, but for a particular customer the model predicts that they are 70% likely to churn. The customer has a product usage history of 30%, is located in New York City, and became a customer in 1997. You need to explain the difference between the actual prediction, a 70% churn rate, and the average prediction. You want to use Vertex Explainable AI. What should you do?

- **A.** Train local surrogate models to explain individual predictions.
- **B.** Configure sampled Shapley explanations on Vertex Explainable AI.
- **C.** Configure integrated gradients explanations on Vertex Explainable AI.
- **D.** Measure the effect of each feature as the weight of the feature multiplied by the feature value.

> [!success]- Resposta: **B**
> Sampled Shapley atribui a diferença entre a predição e o baseline às features e funciona com modelos não diferenciáveis, como ensemble com árvores. Integrated gradients (C) é tentador, mas exige modelo diferenciável.
> *Conceitos:* Vertex Explainable AI, sampled Shapley, feature attribution

#### Q88 · 6.1 · curso 14 · fácil

You are an ML engineer at a bank. You have developed a binary classification model using AutoML Tables to predict whether a customer will make loan payments on time. The output is used to approve or reject loan requests. One customer’s loan request has been rejected by your model, and the bank’s risks department is asking you to provide the reasons that contributed to the model’s decision. What should you do?

- **A.** Use local feature importance from the predictions.
- **B.** Use the correlation with target values in the data summary page.
- **C.** Use the feature importance percentages in the model evaluation page.
- **D.** Vary features independently to identify the threshold per feature that changes the classification.

> [!success]- Resposta: **A**
> Explicar uma decisão individual pede local feature importance (feature attributions da própria predição). A importância global da página de avaliação (C) é tentadora, mas descreve o modelo como um todo, não esse cliente.
> *Conceitos:* local feature importance, explicabilidade, AutoML
> *Nome atual:* AutoML Tables hoje é Vertex AI AutoML tabular com Vertex Explainable AI.

#### Q89 · 6.1 · curso 14 · fácil

You work for a magazine distributor and need to build a model that predicts which customers will renew their subscriptions for the upcoming year. Using your company’s historical data as your training set, you created a TensorFlow model and deployed it to AI Platform. You need to determine which customer attribute has the most predictive power for each prediction served by the model. What should you do?

- **A.** Use AI Platform notebooks to perform a Lasso regression analysis on your model, which will eliminate features that do not provide a strong signal.
- **B.** Stream prediction results to BigQuery. Use BigQuery’s CORR(X1, X2) function to calculate the Pearson correlation coefficient between each feature and the target variable.
- **C.** Use the AI Explanations feature on AI Platform. Submit each prediction request with the ‘explain’ keyword to retrieve feature attributions using the sampled Shapley method.
- **D.** Use the What-If tool in Google Cloud to determine how your model will perform when individual features are excluded. Rank the feature importance in order of those that caused the most significant performance drop when removed from the model.

> [!success]- Resposta: **C**
> AI Explanations com sampled Shapley devolve atribuições por feature para cada predição servida, exatamente o que foi pedido. O What-If Tool e a correlação (B, D) dão visão global ou exploratória, não a atribuição de cada request.
> *Conceitos:* AI Explanations, sampled Shapley, feature attribution
> *Nome atual:* AI Explanations do AI Platform hoje é Vertex Explainable AI.

#### Q104 · 6.1 · curso 13 · média

You work for a gaming company that has millions of customers around the world. All games offer a chat feature that allows players to communicate with each other in real time. Messages can be typed in more than 20 languages and are translated in real time using the Cloud Translation API. You have been asked to build an ML system to moderate the chat in real time while assuring that the performance is uniform across the various languages and without changing the serving infrastructure. You trained your first model using an in-house word2vec model for embedding the chat messages translated by the Cloud Translation API. However, the model has significant differences in performance across the different languages. How should you improve it?

- **A.** Add a regularization term such as the Min-Diff algorithm to the loss function.
- **B.** Train a classifier using the chat messages in their original language.
- **C.** Replace the in-house word2vec with GPT-3 or T5.
- **D.** Remove moderation for languages for which the false positive rate is too high.

> [!success]- Resposta: **B**
> A diferença de desempenho entre idiomas vem do ruído introduzido pela tradução automática antes do embedding; treinar o classificador nos textos no idioma original remove essa fonte de viés. Min-Diff (A) é tentador por ser técnica de fairness, mas não ataca a causa raiz, e trocar por GPT-3/T5 (C) mudaria a infraestrutura de serving.
> *Conceitos:* fairness, Cloud Translation API, viés entre idiomas

#### Q107 · 6.1 · curso 15 · fácil

You are an ML engineer at a bank that has a mobile application. Management has asked you to build an ML-based biometric authentication for the app that verifies a customer’s identity based on their fingerprint. Fingerprints are considered highly sensitive personal information and cannot be downloaded and stored into the bank databases. Which learning strategy should you recommend to train and deploy this ML mode?

- **A.** Data Loss Prevention API
- **B.** Federated learning
- **C.** MD5 to encrypt data
- **D.** Differential privacy

> [!success]- Resposta: **B**
> Federated learning treina o modelo nos dispositivos dos usuários e envia apenas atualizações de pesos, então as impressões digitais nunca saem do celular. Differential privacy (D) é tentadora, mas pressupõe que os dados sejam coletados centralmente, o que é proibido aqui; DLP e MD5 não são estratégias de aprendizado.
> *Conceitos:* federated learning, privacidade, dados biométricos

#### Q112 · 6.1 · curso 13 · média

You are an ML engineer in the contact center of a large enterprise. You need to build a sentiment analysis tool that predicts customer sentiment from recorded phone conversations. You need to identify the best approach to building a model while ensuring that the gender, age, and cultural differences of the customers who called the contact center do not impact any stage of the model development pipeline and results. What should you do?

- **A.** Convert the speech to text and extract sentiments based on the sentences.
- **B.** Convert the speech to text and build a model based on the words.
- **C.** Extract sentiment directly from the voice recordings.
- **D.** Convert the speech to text and extract sentiment using syntactical analysis.

> [!success]- Resposta: **A** · votos no arquivo: A(54%), B(32%)
> Converter a fala em texto remove características de voz (tom, sotaque) ligadas a gênero, idade e cultura, e analisar sentimento por sentença captura o contexto melhor do que palavras isoladas. A opção B é tentadora, mas modelos baseados em palavras isoladas perdem contexto e podem carregar vieses de vocabulário; extrair direto do áudio (C) introduz viés de voz.
> *Conceitos:* fairness, Speech-to-Text, sentiment analysis

#### Q140 · 6.1 · curso 15 · média

You work for a retailer that sells clothes to customers around the world. You have been tasked with ensuring that ML models are built in a secure manner. Specifically, you need to protect sensitive customer data that might be used in the models. You have identified four fields containing sensitive data that are being used by your data science team: AGE, IS_EXISTING_CUSTOMER, LATITUDE_LONGITUDE, and SHIRT_SIZE. What should you do with the data before it is made available to the data science team for training purposes?

- **A.** Tokenize all of the fields using hashed dummy values to replace the real values.
- **B.** Use principal component analysis (PCA) to reduce the four sensitive fields to one PCA vector.
- **C.** Coarsen the data by putting AGE into quantiles and rounding LATITUDE_LONGTTUDE into single precision. The other two fields are already as coarse as possible.
- **D.** Remove all sensitive data fields, and ask the data science team to build their models using non-sensitive data.

> [!success]- Resposta: **A**
> Tokenizar os campos com valores substitutos (hashing) remove os valores sensíveis reais e mantém a utilidade dos campos como features categóricas para o modelo. Coarsening (C) é tentador por ser técnica válida de desidentificação, mas não protege todos os campos e a granularidade proposta ainda pode reidentificar; remover tudo (D) perde sinal preditivo.
> *Conceitos:* desidentificação, tokenização, Cloud DLP

#### Q149 · 6.1 · curso 13 · fácil

You recently deployed an ML model. Three months after deployment, you notice that your model is underperforming on certain subgroups, thus potentially leading to biased results. You suspect that the inequitable performance is due to class imbalances in the training data, but you cannot collect more data. What should you do? (Choose two.)

- **A.** Remove training examples of high-performing subgroups, and retrain the model.
- **B.** Add an additional objective to penalize the model more for errors made on the minority class, and retrain the model
- **C.** Remove the features that have the highest correlations with the majority class.
- **D.** Upsample or reweight your existing training data, and retrain the model
- **E.** Redeploy the model, and provide a label explaining the model's behavior to users.

> [!success]- Resposta: **B,D**
> Sem coletar mais dados, as saídas clássicas para desbalanceamento são reponderar a loss para punir mais erros na classe minoritária (B) e fazer upsampling/reweighting dos exemplos existentes (D). Remover exemplos de bom desempenho (A) joga fora informação, e remover features correlacionadas (C) não corrige o desbalanceamento.
> *Conceitos:* fairness, class imbalance, reweighting, upsampling

#### Q159 · 6.1 · curso 13 · difícil

Your organization manages an online message board. A few months ago, you discovered an increase in toxic language and bullying on the message board. You deployed an automated text classifier that flags certain comments as toxic or harmful. Now some users are reporting that benign comments referencing their religion are being misclassified as abusive. Upon further inspection, you find that your classifier's false positive rate is higher for comments that reference certain underrepresented religious groups. Your team has a limited budget and is already overextended. What should you do?

- **A.** Add synthetic training data where those phrases are used in non-toxic ways.
- **B.** Remove the model and replace it with human moderation.
- **C.** Replace your model with a different text classifier.
- **D.** Raise the threshold for comments to be considered toxic or harmful.

> [!success]- Resposta: **D**
> Com orçamento limitado e equipe sobrecarregada, ajustar o threshold é a ação mais barata e imediata para reduzir os falsos positivos. Dados sintéticos (A) atacam melhor a causa do viés e são a alternativa mais tentadora, mas exigem geração de dados e retreino, que a equipe não tem como bancar agora. Moderação humana ou trocar de modelo (B, C) são caros.
> *Conceitos:* fairness, false positive rate, threshold

#### Q160 · 6.1 · curso 14 · fácil

You work for a magazine distributor and need to build a model that predicts which customers will renew their subscriptions for the upcoming year. Using your company’s historical data as your training set, you created a TensorFlow model and deployed it to Vertex AI. You need to determine which customer attribute has the most predictive power for each prediction served by the model. What should you do?

- **A.** Stream prediction results to BigQuery. Use BigQuery’s CORR(X1, X2) function to calculate the Pearson correlation coefficient between each feature and the target variable.
- **B.** Use Vertex Explainable AI. Submit each prediction request with the explain' keyword to retrieve feature attributions using the sampled Shapley method.
- **C.** Use Vertex AI Workbench user-managed notebooks to perform a Lasso regression analysis on your model, which will eliminate features that do not provide a strong signal.
- **D.** Use the What-If tool in Google Cloud to determine how your model will perform when individual features are excluded. Rank the feature importance in order of those that caused the most significant performance drop when removed from the model.

> [!success]- Resposta: **B**
> Vertex Explainable AI devolve feature attributions por predição (sampled Shapley) com o método explain, exatamente o que se pede: importância por predição. Correlação de Pearson (A) e Lasso (C) são globais, e o What-If Tool (D) não gera atribuições por requisição em produção.
> *Conceitos:* Vertex Explainable AI, sampled Shapley, feature attributions

#### Q178 · 6.1 · curso 14 · média

You work for a bank. You have created a custom model to predict whether a loan application should be flagged for human review. The input features are stored in a BigQuery table. The model is performing well, and you plan to deploy it to production. Due to compliance requirements the model must provide explanations for each prediction. You want to add this functionality to your model code with minimal effort and provide explanations that are as accurate as possible. What should you do?

- **A.** Create an AutoML tabular model by using the BigQuery data with integrated Vertex Explainable AI.
- **B.** Create a BigQuery ML deep neural network model and use the ML.EXPLAIN_PREDICT method with the num_integral_steps parameter.
- **C.** Upload the custom model to Vertex AI Model Registry and configure feature-based attribution by using sampled Shapley with input baselines.
- **D.** Update the custom serving container to include sampled Shapley-based explanations in the prediction outputs.

> [!success]- Resposta: **C**
> Subir o modelo custom no Model Registry com explanation config (sampled Shapley e input baselines) ativa o Vertex Explainable AI sem alterar o código do modelo. Trocar por AutoML ou BigQuery ML (A, B) descarta o modelo validado, e implementar Shapley no container (D) dá muito trabalho.
> *Conceitos:* Vertex Explainable AI, sampled Shapley, Model Registry

#### Q191 · 6.1 · curso 14 · fácil

You work for a retail company. You have created a Vertex AI forecast model that produces monthly item sales predictions. You want to quickly create a report that will help to explain how the model calculates the predictions. You have one month of recent actual sales data that was not included in the training dataset. How should you generate data for your report?

- **A.** Create a batch prediction job by using the actual sales data. Compare the predictions to the actuals in the report.
- **B.** Create a batch prediction job by using the actual sales data, and configure the job settings to generate feature attributions. Compare the results in the report.
- **C.** Generate counterfactual examples by using the actual sales data. Create a batch prediction job using the actual sales data and the counterfactual examples. Compare the results in the report.
- **D.** Train another model by using the same training dataset as the original, and exclude some columns. Using the actual sales data create one batch prediction job by using the new model and another one with the original model. Compare the two sets of predictions in the report.

> [!success]- Resposta: **B**
> Uma batch prediction com feature attributions mostra quanto cada feature contribuiu para cada previsão, o que explica como o modelo calcula as previsões. Comparar só previsões com valores reais (A) mede acurácia, não explicação. Counterfactuals ou treinar um modelo ablado (C, D) dão mais trabalho.
> *Conceitos:* Vertex Explainable AI, batch prediction, feature attributions, forecasting

#### Q206 · 6.1 · curso 14 · média

You are building a predictive maintenance model to preemptively detect part defects in bridges. You plan to use high definition images of the bridges as model inputs. You need to explain the output of the model to the relevant stakeholders so they can take appropriate action. How should you build the model?

- **A.** Use scikit-learn to build a tree-based model, and use SHAP values to explain the model output.
- **B.** Use scikit-learn to build a tree-based model, and use partial dependence plots (PDP) to explain the model output.
- **C.** Use TensorFlow to create a deep learning-based model, and use Integrated Gradients to explain the model output.
- **D.** Use TensorFlow to create a deep learning-based model, and use the sampled Shapley method to explain the model output.

> [!success]- Resposta: **C**
> Para imagens de alta resolução, um modelo de deep learning em TensorFlow é o adequado, e Integrated Gradients é o método de feature attribution diferenciável recomendado pelo Vertex Explainable AI para imagens, gerando mapas de saliência por pixel. Sampled Shapley (D) é indicado para modelos não diferenciáveis e é muito caro com milhões de pixels; modelos de árvore no scikit-learn (A, B) não são adequados para imagens brutas.
> *Conceitos:* Integrated Gradients, Explainable AI, imagens, deep learning

#### Q225 · 6.1 · curso 13 · média

You work for a telecommunications company. You’re building a model to predict which customers may fail to pay their next phone bill. The purpose of this model is to proactively offer at-risk customers assistance such as service discounts and bill deadline extensions. The data is stored in BigQuery and the predictive features that are available for model training include: - Customer_id - Age - Salary (measured in local currency) - Sex - Average bill value (measured in local currency) - Number of phone calls in the last month (integer) - Average duration of phone calls (measured in minutes) You need to investigate and mitigate potential bias against disadvantaged groups, while preserving model accuracy. What should you do?

- **A.** Determine whether there is a meaningful correlation between the sensitive features and the other features. Train a BigQuery ML boosted trees classification model and exclude the sensitive features and any meaningfully correlated features.
- **B.** Train a BigQuery ML boosted trees classification model with all features. Use the ML.GLOBAL_EXPLAIN method to calculate the global attribution values for each feature of the model. If the feature importance value for any of the sensitive features exceeds a threshold, discard the model and tram without this feature.
- **C.** Train a BigQuery ML boosted trees classification model with all features. Use the ML.EXPLAIN_PREDICT method to calculate the attribution values for each feature for each customer in a test set. If for any individual customer, the importance value for any feature exceeds a predefined threshold, discard the model and train the model again without this feature.
- **D.** Define a fairness metric that is represented by accuracy across the sensitive features. Train a BigQuery ML boosted trees classification model with all features. Use the trained model to make predictions on a test set. Join the data back with the sensitive features, and calculate a fairness metric to investigate whether it meets your requirements.

> [!success]- Resposta: **D**
> Definir uma métrica de fairness (por exemplo, acurácia por grupo sensível), avaliar o modelo no test set e juntar os resultados com os atributos sensíveis permite investigar o viés de forma direta, sem sacrificar acurácia de antemão. Remover features sensíveis e correlacionadas (A) é tentador, mas reduz acurácia e não garante fairness (proxies permanecem); usar attributions (B, C) mede importância, não viés contra grupos.
> *Conceitos:* fairness, viés, métricas por grupo, BigQuery ML

#### Q229 · 6.1 · curso 14 · difícil

You work for a manufacturing company. You need to train a custom image classification model to detect product defects at the end of an assembly line. Although your model is performing well, some images in your holdout set are consistently mislabeled with high confidence. You want to use Vertex AI to understand your model’s results. What should you do?

- **A.** Configure feature-based explanations by using Integrated Gradients. Set visualization type to PIXELS, and set clip_percent_upperbound to 95.
- **B.** Create an index by using Vertex AI Matching Engine. Query the index with your mislabeled images.
- **C.** Configure feature-based explanations by using XRAI. Set visualization type to OUTLINES, and set polarity to positive.
- **D.** Configure example-based explanations. Specify the embedding output layer to be used for the latent space representation.

> [!success]- Resposta: **D** ⚠️ o arquivo dizia **A**; revisado para **D**
> Imagens classificadas erradas com alta confiança sugerem problemas nos dados de treino (rótulos errados ou exemplos semelhantes mal rotulados), e example-based explanations do Vertex AI recuperam os exemplos de treino mais próximos no espaço latente, que é exatamente o caso de uso documentado pelo Google para encontrar dados mal rotulados. O gabarito A (Integrated Gradients com PIXELS) mostra quais pixels influenciaram a predição, mas não explica por que o modelo está confiante no rótulo errado; o Matching Engine (B) é só um índice de vetores, sem a integração de explicação.
> *Conceitos:* example-based explanations, Explainable AI, dados mal rotulados, espaço latente
> *Nome atual:* Vertex AI Matching Engine agora se chama Vertex AI Vector Search.

#### Q235 · 6.1 · curso 14 · média

You are using Vertex AI and TensorFlow to develop a custom image classification model. You need the model’s decisions and the rationale to be understandable to your company’s stakeholders. You also want to explore the results to identify any issues or potential biases. What should you do?

- **A.** 1. Use TensorFlow to generate and visualize features and statistics. 2. Analyze the results together with the standard model evaluation metrics.
- **B.** 1. Use TensorFlow Profiler to visualize the model execution. 2. Analyze the relationship between incorrect predictions and execution bottlenecks.
- **C.** 1. Use Vertex Explainable AI to generate example-based explanations. 2. Visualize the results of sample inputs from the entire dataset together with the standard model evaluation metrics.
- **D.** 1. Use Vertex Explainable AI to generate feature attributions. Aggregate feature attributions over the entire dataset. 2. Analyze the aggregation result together with the standard model evaluation metrics.

> [!success]- Resposta: **D**
> Gerar feature attributions com o Vertex Explainable AI e agregá-las em todo o dataset mostra em que o modelo se baseia de forma global, permitindo comunicar a lógica aos stakeholders e identificar vieses, junto com as métricas de avaliação. Example-based explanations (C) mostram exemplos semelhantes, mas não explicam o raciocínio do modelo; o TensorFlow Profiler (B) trata de performance, não de interpretabilidade.
> *Conceitos:* feature attributions, Explainable AI, viés, stakeholders

#### Q264 · 6.1 · curso 14 · difícil

You work for a retail company. You have been tasked with building a model to determine the probability of churn for each customer. You need the predictions to be interpretable so the results can be used to develop marketing campaigns that target at-risk customers. What should you do?

- **A.** Build a random forest regression model in a Vertex AI Workbench notebook instance. Configure the model to generate feature importances after the model is trained.
- **B.** Build an AutoML tabular regression model. Configure the model to generate explanations when it makes predictions.
- **C.** Build a custom TensorFlow neural network by using Vertex AI custom training. Configure the model to generate explanations when it makes predictions.
- **D.** Build a random forest classification model in a Vertex AI Workbench notebook instance. Configure the model to generate feature importances after the model is trained.

> [!success]- Resposta: **B**
> AutoML tabular com explanations por previsão dá atribuições locais para cada cliente, permitindo entender por que cada um está em risco e montar campanhas direcionadas, com pouco esforço. Random forest com feature importance (D) é tentador por ser classificação, mas só oferece importância global, não explicação individual.
> *Conceitos:* Explainable AI, AutoML, feature attribution, churn

#### Q269 · 6.1 · curso 13 · média

You are developing a model to help your company create more targeted online advertising campaigns. You need to create a dataset that you will use to train the model. You want to avoid creating or reinforcing unfair bias in the model. What should you do? (Choose two.)

- **A.** Include a comprehensive set of demographic features
- **B.** Include only the demographic groups that most frequently interact with advertisements
- **C.** Collect a random sample of production traffic to build the training dataset
- **D.** Collect a stratified sample of production traffic to build the training dataset
- **E.** Conduct fairness tests across sensitive categories and demographics on the trained model

> [!success]- Resposta: **D,E** ⚠️ o arquivo dizia **D**; revisado para **D,E**
> A questão pede duas respostas e o gabarito traz só D: amostragem estratificada garante representação dos grupos no dataset, e testes de fairness por categorias sensíveis (E) verificam se o modelo treinado não reforça viés. Amostra aleatória (C) pode sub-representar grupos minoritários, e restringir aos grupos que mais interagem (B) reforça o viés.
> *Conceitos:* fairness, stratified sampling, bias, Responsible AI

## 6.2 Monitorar, testar e corrigir

#### Q6 · 6.2 · curso 11 · fácil

You work for an online retail company that is creating a visual search engine. You have set up an end-to-end ML pipeline on Google Cloud to classify whether an image contains your company's product. Expecting the release of new products in the near future, you configured a retraining functionality in the pipeline so that new data can be fed into your ML models. You also want to use AI Platform's continuous evaluation service to ensure that the models have high accuracy on your test dataset. What should you do?

- **A.** Keep the original test dataset unchanged even if newer products are incorporated into retraining.
- **B.** Extend your test dataset with images of the newer products when they are introduced to retraining.
- **C.** Replace your test dataset with images of the newer products when they are introduced to retraining.
- **D.** Update your test dataset with images of the newer products when your evaluation metrics drop below a pre-decided threshold.

> [!success]- Resposta: **B**
> O conjunto de teste deve ser estendido com imagens dos novos produtos para que a avaliação represente a distribuição atual, sem perder a cobertura dos produtos antigos. Substituir (C) perderia os produtos antigos, e manter inalterado (A) não mede o desempenho nos produtos novos.
> *Conceitos:* continuous evaluation, test set, retraining
> *Nome atual:* O continuous evaluation do AI Platform foi aposentado; hoje usa-se Vertex AI Model Evaluation e Model Monitoring.

#### Q14 · 6.2 · curso 5 · fácil

You built and manage a production system that is responsible for predicting sales numbers. Model accuracy is crucial, because the production model is required to keep up with market changes. Since being deployed to production, the model hasn't changed; however the accuracy of the model has steadily deteriorated. What issue is most likely causing the steady decline in model accuracy?

- **A.** Poor data quality
- **B.** Lack of model retraining
- **C.** Too few layers in the model for capturing information
- **D.** Incorrect data split ratio during model training, evaluation, validation, and test

> [!success]- Resposta: **B**
> Um modelo que nunca é retreinado sofre com drift à medida que o mercado muda, o que explica a queda gradual. Má qualidade de dados (A) é tentadora, mas causaria problemas desde o início, não uma deterioração contínua.
> *Conceitos:* model drift, retraining, monitoring

#### Q21 · 6.2 · curso 11 · média

You have deployed multiple versions of an image classification model on AI Platform. You want to monitor the performance of the model versions over time. How should you perform this comparison?

- **A.** Compare the loss performance for each model on a held-out dataset.
- **B.** Compare the loss performance for each model on the validation data.
- **C.** Compare the receiver operating characteristic (ROC) curve for each model using the What-If Tool.
- **D.** Compare the mean average precision across the models using the Continuous Evaluation feature.

> [!success]- Resposta: **D**
> O Continuous Evaluation compara versões ao longo do tempo com dados de produção rotulados, usando métricas como mean average precision. Comparar loss em held-out ou validação (A, B) é uma avaliação pontual, e o What-If Tool (C) não monitora ao longo do tempo.
> *Conceitos:* continuous evaluation, mAP, model versions
> *Nome atual:* O continuous evaluation do AI Platform foi aposentado; hoje usa-se Vertex AI Model Evaluation e Model Monitoring.

#### Q30 · 6.2 · curso 5 · fácil

Your team trained and tested a DNN regression model with good results. Six months after deployment, the model is performing poorly due to a change in the distribution of the input data. How should you address the input differences in production?

- **A.** Create alerts to monitor for skew, and retrain the model.
- **B.** Perform feature selection on the model, and retrain the model with fewer features.
- **C.** Retrain the model, and select an L2 regularization parameter with a hyperparameter tuning service.
- **D.** Perform feature selection on the model, and retrain the model on a monthly basis with fewer features.

> [!success]- Resposta: **A**
> Mudança na distribuição de entrada deve ser detectada com alertas de skew/drift e tratada com retreino nos dados recentes. Seleção de features ou regularização (B, C, D) não resolvem a mudança de distribuição.
> *Conceitos:* data drift, skew monitoring, retraining

#### Q55 · 6.2 · curso 5 · média

You recently joined a machine learning team that will soon release a new project. As a lead on the project, you are asked to determine the production readiness of the ML components. The team has already tested features and data, model development, and infrastructure. Which additional readiness check should you recommend to the team?

- **A.** Ensure that training is reproducible.
- **B.** Ensure that all hyperparameters are tuned.
- **C.** Ensure that model performance is monitored.
- **D.** Ensure that feature expectations are captured in the schema.

> [!success]- Resposta: **C**
> O ML Test Score do Google tem quatro grupos: features e dados, desenvolvimento do modelo, infraestrutura e monitoramento; o que falta é monitorar o modelo em produção. Reprodutibilidade e schema (A, D) parecem boas checagens, mas pertencem às categorias já testadas.
> *Conceitos:* production readiness, ML Test Score, monitoring

#### Q85 · 6.2 · curso 11 · difícil

You work for a large social network service provider whose users post articles and discuss news. Millions of comments are posted online each day, and more than 200 human moderators constantly review comments and flag those that are inappropriate. Your team is building an ML model to help human moderators check content on the platform. The model scores each comment and flags suspicious comments to be reviewed by a human. Which metric(s) should you use to monitor the model’s performance?

- **A.** Number of messages flagged by the model per minute
- **B.** Number of messages flagged by the model per minute confirmed as being inappropriate by humans.
- **C.** Precision and recall estimates based on a random sample of 0.1% of raw messages each minute sent to a human for review
- **D.** Precision and recall estimates based on a sample of messages flagged by the model as potentially inappropriate each minute

> [!success]- Resposta: **C** · votos no arquivo: D(51%)
> Uma amostra aleatória de mensagens brutas revisada por humanos permite estimar precision e recall, porque inclui também o que o modelo deixou de sinalizar. A opção D, a mais votada, é tentadora pelo volume menor, mas só mede precision: sem ver os não sinalizados não há como estimar false negatives nem recall.
> *Conceitos:* precision, recall, monitoramento com humanos

#### Q102 · 6.2 · curso 6 · média

You have successfully deployed to production a large and complex TensorFlow model trained on tabular data. You want to predict the lifetime value (LTV) field for each subscription stored in the BigQuery table named subscription. subscriptionPurchase in the project named my-fortune500-company-project. You have organized all your training code, from preprocessing data from the BigQuery table up to deploying the validated model to the Vertex AI endpoint, into a TensorFlow Extended (TFX) pipeline. You want to prevent prediction drift, i.e., a situation when a feature data distribution in production changes significantly over time. What should you do?

- **A.** Implement continuous retraining of the model daily using Vertex AI Pipelines.
- **B.** Add a model monitoring job where 10% of incoming predictions are sampled 24 hours.
- **C.** Add a model monitoring job where 90% of incoming predictions are sampled 24 hours.
- **D.** Add a model monitoring job where 10% of incoming predictions are sampled every hour.

> [!success]- Resposta: **B**
> Vertex AI Model Monitoring detecta drift das features comparando a distribuição em produção; amostrar 10% a cada 24 horas é suficiente para drift, que ocorre gradualmente, e mantém o custo baixo. Amostrar 90% (C) ou a cada hora (D) aumenta o custo sem benefício, e retreino diário cego (A) não detecta o problema.
> *Conceitos:* Model Monitoring, prediction drift, sampling rate

#### Q136 · 6.2 · curso 6 · média

You work for an online publisher that delivers news articles to over 50 million readers. You have built an AI model that recommends content for the company’s weekly newsletter. A recommendation is considered successful if the article is opened within two days of the newsletter’s published date and the user remains on the page for at least one minute. All the information needed to compute the success metric is available in BigQuery and is updated hourly. The model is trained on eight weeks of data, on average its performance degrades below the acceptable baseline after five weeks, and training time is 12 hours. You want to ensure that the model’s performance is above the acceptable baseline while minimizing cost. How should you monitor the model to determine when retraining is necessary?

- **A.** Use Vertex AI Model Monitoring to detect skew of the input features with a sample rate of 100% and a monitoring frequency of two days.
- **B.** Schedule a cron job in Cloud Tasks to retrain the model every week before the newsletter is created.
- **C.** Schedule a weekly query in BigQuery to compute the success metric.
- **D.** Schedule a daily Dataflow job in Cloud Composer to compute the success metric.

> [!success]- Resposta: **C**
> Como a métrica de sucesso real já está disponível no BigQuery, uma scheduled query semanal mede diretamente o desempenho do modelo de forma barata, indicando quando retreinar antes de cair abaixo do baseline. Model Monitoring de skew (A) é tentador, mas detecta mudança nas entradas, não queda da métrica, e 100% de amostragem é caro; retreinar toda semana às cegas (B) desperdiça custo.
> *Conceitos:* BigQuery scheduled query, monitoramento de desempenho, retreino

#### Q137 · 6.2 · curso 6 · média

You deployed an ML model into production a year ago. Every month, you collect all raw requests that were sent to your model prediction service during the previous month. You send a subset of these requests to a human labeling service to evaluate your model’s performance. After a year, you notice that your model's performance sometimes degrades significantly after a month, while other times it takes several months to notice any decrease in performance. The labeling service is costly, but you also need to avoid large performance degradations. You want to determine how often you should retrain your model to maintain a high level of performance while minimizing cost. What should you do?

- **A.** Train an anomaly detection model on the training dataset, and run all incoming requests through this model. If an anomaly is detected, send the most recent serving data to the labeling service.
- **B.** Identify temporal patterns in your model’s performance over the previous year. Based on these patterns, create a schedule for sending serving data to the labeling service for the next year.
- **C.** Compare the cost of the labeling service with the lost revenue due to model performance degradation over the past year. If the lost revenue is greater than the cost of the labeling service, increase the frequency of model retraining; otherwise, decrease the model retraining frequency.
- **D.** Run training-serving skew detection batch jobs every few days to compare the aggregate statistics of the features in the training dataset with recent serving data. If skew is detected, send the most recent serving data to the labeling service.

> [!success]- Resposta: **D**
> Detecção de skew/drift a cada poucos dias compara as estatísticas das features de serving com as de treino de forma barata e só aciona a rotulagem (cara) quando há mudança, equilibrando custo e desempenho. Um calendário fixo baseado em padrões passados (B) é tentador, mas a degradação é irregular e não seria capturada; um modelo de anomalia em todas as requisições (A) é mais complexo.
> *Conceitos:* skew detection, rotulagem humana, retreino

#### Q173 · 6.2 · curso 6 · média

You received a training-serving skew alert from a Vertex AI Model Monitoring job running in production. You retrained the model with more recent training data, and deployed it back to the Vertex AI endpoint, but you are still receiving the same alert. What should you do?

- **A.** Update the model monitoring job to use a lower sampling rate.
- **B.** Update the model monitoring job to use the more recent training data that was used to retrain the model.
- **C.** Temporarily disable the alert. Enable the alert again after a sufficient amount of new production traffic has passed through the Vertex AI endpoint.
- **D.** Temporarily disable the alert until the model can be retrained again on newer training data. Retrain the model again after a sufficient amount of new production traffic has passed through the Vertex AI endpoint.

> [!success]- Resposta: **B**
> Skew compara o tráfego de serving com o baseline de treino; se o modelo foi retreinado com dados novos, o monitoring job precisa apontar para esse novo training dataset, senão continua comparando com o baseline antigo. Desabilitar o alerta (C, D) mascara o problema.
> *Conceitos:* training-serving skew, Model Monitoring, baseline

#### Q174 · 6.2 · curso 6 · difícil

You developed a custom model by using Vertex AI to forecast the sales of your company’s products based on historical transactional data. You anticipate changes in the feature distributions and the correlations between the features in the near future. You also expect to receive a large volume of prediction requests. You plan to use Vertex AI Model Monitoring for drift detection and you want to minimize the cost. What should you do?

- **A.** Use the features for monitoring. Set a monitoring-frequency value that is higher than the default.
- **B.** Use the features for monitoring. Set a prediction-sampling-rate value that is closer to 1 than 0.
- **C.** Use the features and the feature attributions for monitoring. Set a monitoring-frequency value that is lower than the default.
- **D.** Use the features and the feature attributions for monitoring. Set a prediction-sampling-rate value that is closer to 0 than 1.

> [!success]- Resposta: **D**
> Como se espera mudança nas correlações entre features, monitorar feature attributions (attribution drift) captura isso, o que a distribuição de cada feature isolada não pega. Com alto volume, um prediction-sampling-rate perto de 0 corta custo. Aumentar o sampling rate (B) eleva o custo, e monitorar só as features (A) perde as mudanças de correlação.
> *Conceitos:* Model Monitoring, feature attribution drift, sampling rate

#### Q188 · 6.2 · curso 6 · média

You work at a bank. You have a custom tabular ML model that was provided by the bank’s vendor. The training data is not available due to its sensitivity. The model is packaged as a Vertex AI Model serving container, which accepts a string as input for each prediction instance. In each string, the feature values are separated by commas. You want to deploy this model to production for online predictions and monitor the feature distribution over time with minimal effort. What should you do?

- **A.** 1. Upload the model to Vertex AI Model Registry, and deploy the model to a Vertex AI endpoint 2. Create a Vertex AI Model Monitoring job with feature drift detection as the monitoring objective, and provide an instance schema
- **B.** 1. Upload the model to Vertex AI Model Registry, and deploy the model to a Vertex AI endpoint 2. Create a Vertex AI Model Monitoring job with feature skew detection as the monitoring objective, and provide an instance schema
- **C.** 1. Refactor the serving container to accept key-value pairs as input format 2. Upload the model to Vertex AI Model Registry, and deploy the model to a Vertex AI endpoint 3. Create a Vertex AI Model Monitoring job with feature drift detection as the monitoring objective.
- **D.** 1. Refactor the serving container to accept key-value pairs as input format 2. Upload the model to Vertex AI Model Registry, and deploy the model to a Vertex AI endpoint 3. Create a Vertex AI Model Monitoring job with feature skew detection as the monitoring objective

> [!success]- Resposta: **A**
> Sem training data, não dá para medir skew (B, D), só feature drift; e fornecer um instance schema permite ao Model Monitoring interpretar a entrada em string CSV sem refatorar o container. Refatorar o container do fornecedor (C) dá mais esforço.
> *Conceitos:* feature drift, Model Monitoring, instance schema

#### Q190 · 6.2 · curso 6 · fácil

You recently deployed a model to a Vertex AI endpoint. Your data drifts frequently, so you have enabled request-response logging and created a Vertex AI Model Monitoring job. You have observed that your model is receiving higher traffic than expected. You need to reduce the model monitoring cost while continuing to quickly detect drift. What should you do?

- **A.** Replace the monitoring job with a DataFlow pipeline that uses TensorFlow Data Validation (TFDV)
- **B.** Replace the monitoring job with a custom SQL script to calculate statistics on the features and predictions in BigQuery
- **C.** Decrease the sample_rate parameter in the RandomSampleConfig of the monitoring job
- **D.** Increase the monitor_interval parameter in the ScheduleConfig of the monitoring job

> [!success]- Resposta: **C**
> Reduzir o sample_rate diminui o volume de requisições analisadas e o custo, mantendo a frequência de detecção. Aumentar o monitor_interval (D) também barateia, mas atrasa a detecção de drift, e substituir por soluções custom (A, B) dá mais trabalho.
> *Conceitos:* Model Monitoring, sampling rate, cost

#### Q222 · 6.2 · curso 6 · difícil

You developed a custom model by using Vertex AI to predict your application's user churn rate. You are using Vertex AI Model Monitoring for skew detection. The training data stored in BigQuery contains two sets of features - demographic and behavioral. You later discover that two separate models trained on each set perform better than the original model. You need to configure a new model monitoring pipeline that splits traffic among the two models. You want to use the same prediction-sampling-rate and monitoring-frequency for each model. You also want to minimize management effort. What should you do?

- **A.** Keep the training dataset as is. Deploy the models to two separate endpoints, and submit two Vertex AI Model Monitoring jobs with appropriately selected feature-thresholds parameters.
- **B.** Keep the training dataset as is. Deploy both models to the same endpoint and submit a Vertex AI Model Monitoring job with a monitoring-config-from-file parameter that accounts for the model IDs and feature selections.
- **C.** Separate the training dataset into two tables based on demographic and behavioral features. Deploy the models to two separate endpoints, and submit two Vertex AI Model Monitoring jobs.
- **D.** Separate the training dataset into two tables based on demographic and behavioral features. Deploy both models to the same endpoint, and submit a Vertex AI Model Monitoring job with a monitoring-config-from-file parameter that accounts for the model IDs and training datasets.

> [!success]- Resposta: **B** · votos no arquivo: B(67%)
> Ao implantar os dois modelos no mesmo endpoint, um único job de Model Monitoring cobre ambos com a mesma sampling rate e frequência, e o monitoring-config-from-file permite definir por model ID quais features monitorar, reaproveitando o mesmo dataset de treino. Separar o dataset em duas tabelas (C, D) é trabalho desnecessário, e dois endpoints com dois jobs (A, C) aumentam o esforço de gestão.
> *Conceitos:* Model Monitoring, skew, traffic split, monitoring-config-from-file

#### Q227 · 6.2 · curso 14 · média

You work at a bank. You need to develop a credit risk model to support loan application decisions. You decide to implement the model by using a neural network in TensorFlow. Due to regulatory requirements, you need to be able to explain the model’s predictions based on its features. When the model is deployed, you also want to monitor the model’s performance over time. You decided to use Vertex AI for both model development and deployment. What should you do?

- **A.** Use Vertex Explainable AI with the sampled Shapley method, and enable Vertex AI Model Monitoring to check for feature distribution drift.
- **B.** Use Vertex Explainable AI with the sampled Shapley method, and enable Vertex AI Model Monitoring to check for feature distribution skew.
- **C.** Use Vertex Explainable AI with the XRAI method, and enable Vertex AI Model Monitoring to check for feature distribution drift.
- **D.** Use Vertex Explainable AI with the XRAI method, and enable Vertex AI Model Monitoring to check for feature distribution skew.

> [!success]- Resposta: **A**
> Para uma rede neural com dados tabulares, sampled Shapley (ou Integrated Gradients) é o método adequado do Vertex Explainable AI, enquanto XRAI (C, D) é específico para imagens. Para monitorar o desempenho ao longo do tempo em produção, o recomendado é monitorar prediction drift entre janelas de produção; skew (B) compara com os dados de treino e capta apenas a diferença treino-serving.
> *Conceitos:* sampled Shapley, Explainable AI, Model Monitoring, drift

#### Q274 · 6.2 · curso 6 · fácil

You are training and deploying updated versions of a regression model with tabular data by using Vertex AI Pipelines, Vertex AI Training, Vertex AI Experiments, and Vertex AI Endpoints. The model is deployed in a Vertex AI endpoint, and your users call the model by using the Vertex AI endpoint. You want to receive an email when the feature data distribution changes significantly, so you can retrigger the training pipeline and deploy an updated version of your model. What should you do?

- **A.** Use Vertex Al Model Monitoring. Enable prediction drift monitoring on the endpoint, and specify a notification email.
- **B.** In Cloud Logging, create a logs-based alert using the logs in the Vertex Al endpoint. Configure Cloud Logging to send an email when the alert is triggered.
- **C.** In Cloud Monitoring create a logs-based metric and a threshold alert for the metric. Configure Cloud Monitoring to send an email when the alert is triggered.
- **D.** Export the container logs of the endpoint to BigQuery. Create a Cloud Function to run a SQL query over the exported logs and send an email. Use Cloud Scheduler to trigger the Cloud Function.

> [!success]- Resposta: **A**
> Vertex AI Model Monitoring com drift detection compara a distribuição das features recebidas ao longo do tempo e envia alerta por e-mail nativamente. Alertas baseados em logs (B/C/D) exigem implementar a detecção de mudança de distribuição manualmente.
> *Conceitos:* Model Monitoring, drift, alertas

#### Q275 · 6.2 · curso 14 · média

You have trained an XGBoost model that you plan to deploy on Vertex AI for online prediction. You are now uploading your model to Vertex AI Model Registry, and you need to configure the explanation method that will serve online prediction requests to be returned with minimal latency. You also want to be alerted when feature attributions of the model meaningfully change over time. What should you do?

- **A.** 1. Specify sampled Shapley as the explanation method with a path count of 5. 2. Deploy the model to Vertex AI Endpoints. 3. Create a Model Monitoring job that uses prediction drift as the monitoring objective.
- **B.** 1. Specify Integrated Gradients as the explanation method with a path count of 5. 2. Deploy the model to Vertex AI Endpoints. 3. Create a Model Monitoring job that uses prediction drift as the monitoring objective.
- **C.** 1. Specify sampled Shapley as the explanation method with a path count of 50. 2. Deploy the model to Vertex AI Endpoints. 3. Create a Model Monitoring job that uses training-serving skew as the monitoring objective.
- **D.** 1. Specify Integrated Gradients as the explanation method with a path count of 50. 2. Deploy the model to Vertex AI Endpoints. 3. Create a Model Monitoring job that uses training-serving skew as the monitoring objective.

> [!success]- Resposta: **A**
> Para modelos de árvore como XGBoost (não diferenciáveis) o método é sampled Shapley, e um path count baixo (5) reduz a latência das explicações online. Prediction drift monitoring acompanha atribuições de features ao longo do tempo sem precisar do dataset de treino; Integrated Gradients (B/D) só serve para modelos diferenciáveis.
> *Conceitos:* sampled Shapley, Explainable AI, feature attribution drift, Model Monitoring

## Fontes

- Arquivo de questões *Google Cloud Professional Machine Learning Engineer Exam Questions* enviado por Leonardo em 16/10/2026 (gabarito original, às vezes com votos da comunidade).
- Revisão do gabarito, classificação por seção e explicações: Claude, 16/10/2026. Confiança média: dumps têm erros e a revisão também pode errar.
