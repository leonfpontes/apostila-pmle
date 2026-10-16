---
title: "PMLE — Questões da seção 5: Automatizar e orquestrar pipelines de ML"
aliases: ["questões PMLE seção 5"]
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
summary: "47 questões de prática do exame Professional ML Engineer na seção 5 do guia (Automatizar e orquestrar pipelines de ML, 22% da prova), com gabarito revisado e explicação em português."
parte_de: "[[pmle-banco-de-questoes]]"
related: ["[[pmle-guia-do-exame]]"]
---

# PMLE — Questões da seção 5: Automatizar e orquestrar pipelines de ML

Seção 5 do guia oficial · **22% da prova** · 47 questões. Faz parte do [[pmle-banco-de-questoes|banco de questões]]. As questões estão em inglês, como na prova; a resposta fica fechada no bloco verde (no Obsidian, clique para abrir).

| Subseção | Questões |
|---|---|
| 5.1 Pipelines de ML ponta a ponta | 27 |
| 5.2 Retreino automático e CI/CD | 13 |
| 5.3 Metadados, versões e linhagem | 7 |

## 5.1 Pipelines de ML ponta a ponta

#### Q1 · 5.1 · curso 5 · fácil

You are building an ML model to detect anomalies in real-time sensor data. You will use Pub/Sub to handle incoming requests. You want to store the results for analytics and visualization. How should you configure the pipeline?

- **A.** 1 = Dataflow, 2 = AI Platform, 3 = BigQuery
- **B.** 1 = DataProc, 2 = AutoML, 3 = Cloud Bigtable
- **C.** 1 = BigQuery, 2 = AutoML, 3 = Cloud Functions
- **D.** 1 = BigQuery, 2 = AI Platform, 3 = Cloud Storage

> [!success]- Resposta: **A**
> Pub/Sub alimenta um job de streaming no Dataflow, que chama o modelo servido (hoje em Vertex AI) e grava os resultados no BigQuery para analytics e visualização. As alternativas com BigQuery como primeiro passo ou Cloud Storage/Cloud Functions como destino não formam um pipeline de streaming adequado para análise.
> *Conceitos:* Pub/Sub, Dataflow, BigQuery, streaming
> *Nome atual:* AI Platform hoje é Vertex AI.

#### Q29 · 5.1 · curso 5 · média

You have trained a model on a dataset that required computationally expensive preprocessing operations. You need to execute the same preprocessing at prediction time. You deployed the model on AI Platform for high-throughput online prediction. Which architecture should you use?

- **A.** Validate the accuracy of the model that you trained on preprocessed data. Create a new model that uses the raw data and is available in real time. Deploy the new model onto AI Platform for online prediction.
- **B.** Send incoming prediction requests to a Pub/Sub topic. Transform the incoming data using a Dataflow job. Submit a prediction request to AI Platform using the transformed data. Write the predictions to an outbound Pub/Sub queue.
- **C.** Stream incoming prediction request data into Cloud Spanner. Create a view to abstract your preprocessing logic. Query the view every second for new records. Submit a prediction request to AI Platform using the transformed data. Write the predictions to an outbound Pub/Sub queue.
- **D.** Send incoming prediction requests to a Pub/Sub topic. Set up a Cloud Function that is triggered when messages are published to the Pub/Sub topic. Implement your preprocessing logic in the Cloud Function. Submit a prediction request to AI Platform using the transformed data. Write the predictions to an outbound Pub/Sub queue.

> [!success]- Resposta: **B**
> Dataflow em streaming lê o Pub/Sub e aplica o pré-processamento pesado em escala antes de chamar o endpoint, garantindo consistência entre treino e serving com alto throughput. Cloud Functions (D) é tentador, mas não é adequado para pré-processamento computacionalmente caro em alto volume.
> *Conceitos:* Dataflow, Pub/Sub, preprocessing, training-serving skew
> *Nome atual:* AI Platform hoje é Vertex AI.

#### Q35 · 5.1 · curso 6 · fácil

You are developing a Kubeflow pipeline on Google Kubernetes Engine. The first step in the pipeline is to issue a query against BigQuery. You plan to use the results of that query as the input to the next step in your pipeline. You want to achieve this in the easiest way possible. What should you do?

- **A.** Use the BigQuery console to execute your query, and then save the query results into a new BigQuery table.
- **B.** Write a Python script that uses the BigQuery API to execute queries against BigQuery. Execute this script as the first step in your Kubeflow pipeline.
- **C.** Use the Kubeflow Pipelines domain-specific language to create a custom component that uses the Python BigQuery client library to execute queries.
- **D.** Locate the Kubeflow Pipelines repository on GitHub. Find the BigQuery Query Component, copy that component's URL, and use it to load the component into your pipeline. Use the component to execute queries against BigQuery.

> [!success]- Resposta: **D**
> Reutilizar o componente pronto de BigQuery do Kubeflow Pipelines é a forma mais fácil. Escrever um componente ou script customizado (B, C) funciona, mas exige mais código e manutenção.
> *Conceitos:* Kubeflow Pipelines, prebuilt components, BigQuery
> *Nome atual:* Hoje há os Google Cloud Pipeline Components (BigqueryQueryJobOp) no Vertex AI Pipelines.

#### Q73 · 5.1 · curso 6 · difícil

You work for a global footwear retailer and need to predict when an item will be out of stock based on historical inventory data Customer behavior is highly dynamic since footwear demand is influenced by many different factors. You want to serve models that are trained on all available data, but track your performance on specific subsets of data before pushing to production. What is the most streamlined and reliable way to perform this validation?

- **A.** Use then TFX ModelValidator tools to specify performance metrics for production readiness.
- **B.** Use k-fold cross-validation as a validation strategy to ensure that your model is ready for production.
- **C.** Use the last relevant week of data as a validation set to ensure that your model is performing accurately on current data.
- **D.** Use the entire dataset and treat the area under the receiver operating characteristics curve (AUC ROC) as the main metric.

> [!success]- Resposta: **A** · votos no arquivo: A(51%), C(45%)
> Validar a performance em subconjuntos específicos (slices) antes do push é o papel do TFX ModelValidator, hoje o componente Evaluator com TFMA, que bloqueia modelos fora dos limites. Usar a última semana como validação (C) é tentador por causa da dinâmica temporal, mas não avalia slices e conflita com treinar em todos os dados.
> *Conceitos:* TFX, TFMA, model validation
> *Nome atual:* O componente ModelValidator do TFX foi incorporado ao Evaluator (TFMA).

#### Q94 · 5.1 · curso 5 · média

You work on an operations team at an international company that manages a large fleet of on-premises servers located in few data centers around the world. Your team collects monitoring data from the servers, including CPU/memory consumption. When an incident occurs on a server, your team is responsible for fixing it. Incident data has not been properly labeled yet. Your management team wants you to build a predictive maintenance solution that uses monitoring data from the VMs to detect potential failures and then alerts the service desk team. What should you do first?

- **A.** Train a time-series model to predict the machines’ performance values. Configure an alert if a machine’s actual performance values significantly differ from the predicted performance values.
- **B.** Implement a simple heuristic (e.g., based on z-score) to label the machines’ historical performance data. Train a model to predict anomalies based on this labeled dataset.
- **C.** Develop a simple heuristic (e.g., based on z-score) to label the machines’ historical performance data. Test this heuristic in a production environment.
- **D.** Hire a team of qualified analysts to review and label the machines’ historical performance data. Train a model based on this manually labeled dataset.

> [!success]- Resposta: **C**
> Sem rótulos, o primeiro passo é uma heurística simples (z-score) e validar seu valor em produção antes de investir em ML, seguindo a regra 'comece sem ML'. Treinar um modelo sobre rótulos heurísticos (B) é tentador, mas só replicaria a heurística antes de saber se ela é útil.
> *Conceitos:* heurística, predictive maintenance, rules of ML

#### Q95 · 5.1 · curso 6 · fácil

You are developing an ML model that uses sliced frames from video feed and creates bounding boxes around specific objects. You want to automate the following steps in your training pipeline: ingestion and preprocessing of data in Cloud Storage, followed by training and hyperparameter tuning of the object model using Vertex AI jobs, and finally deploying the model to an endpoint. You want to orchestrate the entire pipeline with minimal cluster management. What approach should you use?

- **A.** Use Kubeflow Pipelines on Google Kubernetes Engine.
- **B.** Use Vertex AI Pipelines with TensorFlow Extended (TFX) SDK.
- **C.** Use Vertex AI Pipelines with Kubeflow Pipelines SDK.
- **D.** Use Cloud Composer for the orchestration.

> [!success]- Resposta: **C**
> Vertex AI Pipelines é serverless (sem cluster para gerenciar), e o Kubeflow Pipelines SDK é o recomendado quando não se usa TFX e há componentes de Vertex AI jobs. TFX SDK (B) é indicado para TensorFlow com dados estruturados ou volumes muito grandes; Kubeflow em GKE e Composer (A, D) exigem gerenciar infraestrutura.
> *Conceitos:* Vertex AI Pipelines, Kubeflow Pipelines SDK, orquestração

#### Q120 · 5.1 · curso 5 · fácil

One of your models is trained using data provided by a third-party data broker. The data broker does not reliably notify you of formatting changes in the data. You want to make your model training pipeline more robust to issues like this. What should you do?

- **A.** Use TensorFlow Data Validation to detect and flag schema anomalies.
- **B.** Use TensorFlow Transform to create a preprocessing component that will normalize data to the expected distribution, and replace values that don’t match the schema with 0.
- **C.** Use tf.math to analyze the data, compute summary statistics, and flag statistical anomalies.
- **D.** Use custom TensorFlow functions at the start of your model training to detect and flag known formatting errors.

> [!success]- Resposta: **A**
> TensorFlow Data Validation infere o schema e detecta anomalias como mudanças de formato, tipos ou valores fora do domínio, tornando o pipeline robusto a mudanças do fornecedor. Substituir valores por 0 com TF Transform (B) é tentador, mas mascara o problema silenciosamente em vez de sinalizá-lo; funções customizadas (C, D) dão mais trabalho e só pegam erros conhecidos.
> *Conceitos:* TFDV, schema, validação de dados

#### Q124 · 5.1 · curso 6 · média

You are an ML engineer responsible for designing and implementing training pipelines for ML models. You need to create an end-to-end training pipeline for a TensorFlow model. The TensorFlow model will be trained on several terabytes of structured data. You need the pipeline to include data quality checks before training and model quality checks after training but prior to deployment. You want to minimize development time and the need for infrastructure maintenance. How should you build and orchestrate your training pipeline?

- **A.** Create the pipeline using Kubeflow Pipelines domain-specific language (DSL) and predefined Google Cloud components. Orchestrate the pipeline using Vertex AI Pipelines.
- **B.** Create the pipeline using TensorFlow Extended (TFX) and standard TFX components. Orchestrate the pipeline using Vertex AI Pipelines.
- **C.** Create the pipeline using Kubeflow Pipelines domain-specific language (DSL) and predefined Google Cloud components. Orchestrate the pipeline using Kubeflow Pipelines deployed on Google Kubernetes Engine.
- **D.** Create the pipeline using TensorFlow Extended (TFX) and standard TFX components. Orchestrate the pipeline using Kubeflow Pipelines deployed on Google Kubernetes Engine.

> [!success]- Resposta: **B**
> TFX tem componentes padrão para validação de dados (ExampleValidator/TFDV) e de modelo (Evaluator/TFMA), feitos para modelos TensorFlow em grande escala, e o Vertex AI Pipelines é serverless, eliminando manutenção. KFP com componentes Google (A) é tentador, mas exigiria construir as checagens de qualidade; GKE (C, D) traz manutenção de infraestrutura.
> *Conceitos:* TFX, Vertex AI Pipelines, validação de modelo

#### Q129 · 5.1 · curso 6 · média

You have been asked to productionize a proof-of-concept ML model built using Keras. The model was trained in a Jupyter notebook on a data scientist’s local machine. The notebook contains a cell that performs data validation and a cell that performs model analysis. You need to orchestrate the steps contained in the notebook and automate the execution of these steps for weekly retraining. You expect much more training data in the future. You want your solution to take advantage of managed services while minimizing cost. What should you do?

- **A.** Move the Jupyter notebook to a Notebooks instance on the largest N2 machine type, and schedule the execution of the steps in the Notebooks instance using Cloud Scheduler.
- **B.** Write the code as a TensorFlow Extended (TFX) pipeline orchestrated with Vertex AI Pipelines. Use standard TFX components for data validation and model analysis, and use Vertex AI Pipelines for model retraining.
- **C.** Rewrite the steps in the Jupyter notebook as an Apache Spark job, and schedule the execution of the job on ephemeral Dataproc clusters using Cloud Scheduler.
- **D.** Extract the steps contained in the Jupyter notebook as Python scripts, wrap each script in an Apache Airflow BashOperator, and run the resulting directed acyclic graph (DAG) in Cloud Composer.

> [!success]- Resposta: **B**
> TFX tem componentes padrão de validação de dados e análise de modelo que substituem as células do notebook, e o Vertex AI Pipelines executa serverless, escalando com mais dados e cobrando só pelo uso. Cloud Composer (D) é tentador para orquestração, mas tem custo fixo de ambiente e exige reescrever tudo em BashOperators; agendar um notebook grande (A) não escala e é caro.
> *Conceitos:* TFX, Vertex AI Pipelines, retreino agendado
> *Nome atual:* "Notebooks instance" corresponde hoje às instâncias do Vertex AI Workbench.

#### Q134 · 5.1 · curso 6 · fácil

You are the Director of Data Science at a large company, and your Data Science team has recently begun using the Kubeflow Pipelines SDK to orchestrate their training pipelines. Your team is struggling to integrate their custom Python code into the Kubeflow Pipelines SDK. How should you instruct them to proceed in order to quickly integrate their code with the Kubeflow Pipelines SDK?

- **A.** Use the func_to_container_op function to create custom components from the Python code.
- **B.** Use the predefined components available in the Kubeflow Pipelines SDK to access Dataproc, and run the custom code there.
- **C.** Package the custom Python code into Docker containers, and use the load_component_from_file function to import the containers into the pipeline.
- **D.** Deploy the custom Python code to Cloud Functions, and use Kubeflow Pipelines to trigger the Cloud Function.

> [!success]- Resposta: **A**
> `func_to_container_op` transforma uma função Python em componente de pipeline de forma rápida, sem construir imagens manualmente. Empacotar em Docker e usar `load_component_from_file` (C) funciona, mas é mais trabalhoso; Dataproc e Cloud Functions adicionam complexidade desnecessária.
> *Conceitos:* Kubeflow Pipelines, lightweight components, Python
> *Nome atual:* `func_to_container_op` é da API KFP v1; no KFP v2 (usado no Vertex AI Pipelines) o equivalente é o decorator `@dsl.component`.

#### Q142 · 5.1 · curso 6 · média

You have built a model that is trained on data stored in Parquet files. You access the data through a Hive table hosted on Google Cloud. You preprocessed these data with PySpark and exported it as a CSV file into Cloud Storage. After preprocessing, you execute additional steps to train and evaluate your model. You want to parametrize this model training in Kubeflow Pipelines. What should you do?

- **A.** Remove the data transformation step from your pipeline.
- **B.** Containerize the PySpark transformation step, and add it to your pipeline.
- **C.** Add a ContainerOp to your pipeline that spins a Dataproc cluster, runs a transformation, and then saves the transformed data in Cloud Storage.
- **D.** Deploy Apache Spark at a separate node pool in a Google Kubernetes Engine cluster. Add a ContainerOp to your pipeline that invokes a corresponding transformation job for this Spark instance.

> [!success]- Resposta: **C**
> Adicionar um passo no pipeline que cria um cluster Dataproc efêmero, executa a transformação PySpark e grava em Cloud Storage parametriza o processo usando serviço gerenciado para Spark. Containerizar o PySpark (B) é tentador, mas rodar Spark dentro de um único container não escala; manter Spark no GKE (D) exige administração.
> *Conceitos:* Kubeflow Pipelines, Dataproc, PySpark
> *Nome atual:* `ContainerOp` é da API KFP v1; hoje usam-se componentes KFP v2 ou os Google Cloud Pipeline Components para Dataproc.

#### Q151 · 5.1 · curso 5 · média

While running a model training pipeline on Vertex Al, you discover that the evaluation step is failing because of an out-of-memory error. You are currently using TensorFlow Model Analysis (TFMA) with a standard Evaluator TensorFlow Extended (TFX) pipeline component for the evaluation step. You want to stabilize the pipeline without downgrading the evaluation quality while minimizing infrastructure overhead. What should you do?

- **A.** Include the flag -runner=DataflowRunner in beam_pipeline_args to run the evaluation step on Dataflow.
- **B.** Move the evaluation step out of your pipeline and run it on custom Compute Engine VMs with sufficient memory.
- **C.** Migrate your pipeline to Kubeflow hosted on Google Kubernetes Engine, and specify the appropriate node parameters for the evaluation step.
- **D.** Add tfma.MetricsSpec () to limit the number of metrics in the evaluation step.

> [!success]- Resposta: **A**
> O Evaluator do TFX roda sobre Apache Beam; passar --runner=DataflowRunner em beam_pipeline_args distribui a avaliação em workers gerenciados e resolve o OOM sem infraestrutura extra. Limitar métricas (D) reduz a qualidade da avaliação, e VMs ou GKE próprios (B, C) aumentam o overhead.
> *Conceitos:* TFX Evaluator, TFMA, Dataflow, Apache Beam

#### Q177 · 5.1 · curso 6 · fácil

You have created a Vertex AI pipeline that includes two steps. The first step preprocesses 10 TB data completes in about 1 hour, and saves the result in a Cloud Storage bucket. The second step uses the processed data to train a model. You need to update the model’s code to allow you to test different algorithms. You want to reduce pipeline execution time and cost while also minimizing pipeline changes. What should you do?

- **A.** Add a pipeline parameter and an additional pipeline step. Depending on the parameter value, the pipeline step conducts or skips data preprocessing, and starts model training.
- **B.** Create another pipeline without the preprocessing step, and hardcode the preprocessed Cloud Storage file location for model training.
- **C.** Configure a machine with more CPU and RAM from the compute-optimized machine family for the data preprocessing step.
- **D.** Enable caching for the pipeline job, and disable caching for the model training step.

> [!success]- Resposta: **D**
> Com execution caching do Vertex AI Pipelines, o passo de pré-processamento (entradas inalteradas) é reaproveitado e só o treino roda de novo, sem mudar a estrutura do pipeline. Parâmetros e passos extras (A) ou um novo pipeline com caminho fixo (B) aumentam as mudanças e a manutenção.
> *Conceitos:* pipeline caching, Vertex AI Pipelines, cost

#### Q186 · 5.1 · curso 6 · média

You have been tasked with deploying prototype code to production. The feature engineering code is in PySpark and runs on Dataproc Serverless. The model training is executed by using a Vertex AI custom training job. The two steps are not connected, and the model training must currently be run manually after the feature engineering step finishes. You need to create a scalable and maintainable production process that runs end-to-end and tracks the connections between steps. What should you do?

- **A.** Create a Vertex AI Workbench notebook. Use the notebook to submit the Dataproc Serverless feature engineering job. Use the same notebook to submit the custom model training job. Run the notebook cells sequentially to tie the steps together end-to-end.
- **B.** Create a Vertex AI Workbench notebook. Initiate an Apache Spark context in the notebook and run the PySpark feature engineering code. Use the same notebook to run the custom model training job in TensorFlow. Run the notebook cells sequentially to tie the steps together end-to-end.
- **C.** Use the Kubeflow pipelines SDK to write code that specifies two components: - The first is a Dataproc Serverless component that launches the feature engineering job - The second is a custom component wrapped in the create_custom_training_job_from_component utility that launches the custom model training job Create a Vertex AI Pipelines job to link and run both components
- **D.** Use the Kubeflow pipelines SDK to write code that specifies two components - The first component initiates an Apache Spark context that runs the PySpark feature engineering code - The second component runs the TensorFlow custom model training code Create a Vertex AI Pipelines job to link and run both components.

> [!success]- Resposta: **C**
> Um Vertex AI Pipeline com o componente Dataproc Serverless (Google Cloud Pipeline Components) e um componente de custom training conecta os passos, escala e registra a lineage. Notebooks (A, B) não são processo de produção, e rodar Spark dentro de um componente (D) perde o serverless e a escalabilidade.
> *Conceitos:* Vertex AI Pipelines, Dataproc Serverless, Google Cloud Pipeline Components

#### Q201 · 5.1 · curso 6 · difícil

You developed a Vertex AI pipeline that trains a classification model on data stored in a large BigQuery table. The pipeline has four steps, where each step is created by a Python function that uses the KubeFlow v2 API. The components have the following names: You launch your Vertex AI pipeline as the following: You perform many model iterations by adjusting the code and parameters of the training step. You observe high costs associated with the development, particularly the data export and preprocessing steps. You need to reduce model development costs. What should you do?

- **A.** Change the components’ YAML filenames to export.yaml, preprocess,yaml, f "train- {dt}.yaml", f"calibrate-{dt).vaml".
- **B.** Add the {"kubeflow.v1.caching": True} parameter to the set of params provided to your PipelineJob.
- **C.** Move the first step of your pipeline to a separate step, and provide a cached path to Cloud Storage as an input to the main pipeline.
- **D.** Change the name of the pipeline to f"my-awesome-pipeline-{dt}".

> [!success]- Resposta: **A** · o arquivo não trazia gabarito
> O enunciado original omite o código, mas as opções indicam que os nomes dos arquivos YAML dos componentes incluem o timestamp {dt}, o que muda a definição dos componentes a cada execução e impede o execution caching do Vertex AI Pipelines. Fixar os nomes de export e preprocess permite reaproveitar do cache esses passos caros, mantendo train/calibrate variáveis. O parâmetro kubeflow.v1.caching (B) não existe, e separar manualmente o primeiro passo (C) é mais trabalhoso do que usar o caching nativo.
> *Conceitos:* execution caching, Vertex AI Pipelines, KFP v2, custo

#### Q208 · 5.1 · curso 6 · média

You recently developed a wide and deep model in TensorFlow. You generated training datasets using a SQL script that preprocessed raw data in BigQuery by performing instance-level transformations of the data. You need to create a training pipeline to retrain the model on a weekly basis. The trained model will be used to generate daily recommendations. You want to minimize model development and training time. How should you develop the training pipeline?

- **A.** Use the Kubeflow Pipelines SDK to implement the pipeline. Use the BigQueryJobOp component to run the preprocessing script and the CustomTrainingJobOp component to launch a Vertex AI training job.
- **B.** Use the Kubeflow Pipelines SDK to implement the pipeline. Use the DataflowPythonJobOp component to preprocess the data and the CustomTrainingJobOp component to launch a Vertex AI training job.
- **C.** Use the TensorFlow Extended SDK to implement the pipeline Use the ExampleGen component with the BigQuery executor to ingest the data the Transform component to preprocess the data, and the Trainer component to launch a Vertex AI training job.
- **D.** Use the TensorFlow Extended SDK to implement the pipeline Implement the preprocessing steps as part of the input_fn of the model. Use the ExampleGen component with the BigQuery executor to ingest the data and the Trainer component to launch a Vertex AI training job.

> [!success]- Resposta: **A**
> Como o pré-processamento já existe em SQL no BigQuery, usar BigQueryJobOp para rodá-lo e CustomTrainingJobOp para treinar no Vertex AI reaproveita o que existe com mínimo de desenvolvimento. Reescrever o pré-processamento em Dataflow (B) ou em TFX Transform/input_fn (C, D) aumenta o tempo de desenvolvimento sem necessidade, já que as transformações são instance-level.
> *Conceitos:* Vertex AI Pipelines, BigQueryJobOp, CustomTrainingJobOp, Google Cloud Pipeline Components

#### Q210 · 5.1 · curso 5 · fácil

You have trained a model by using data that was preprocessed in a batch Dataflow pipeline. Your use case requires real-time inference. You want to ensure that the data preprocessing logic is applied consistently between training and serving. What should you do?

- **A.** Perform data validation to ensure that the input data to the pipeline is the same format as the input data to the endpoint.
- **B.** Refactor the transformation code in the batch data pipeline so that it can be used outside of the pipeline. Use the same code in the endpoint.
- **C.** Refactor the transformation code in the batch data pipeline so that it can be used outside of the pipeline. Share this code with the end users of the endpoint.
- **D.** Batch the real-time requests by using a time window and then use the Dataflow pipeline to preprocess the batched requests. Send the preprocessed requests to the endpoint.

> [!success]- Resposta: **B**
> Refatorar a lógica de transformação para um módulo reutilizável e usar o mesmo código no endpoint (por exemplo, em uma custom prediction routine) garante a mesma transformação em treino e serving, evitando training-serving skew. Compartilhar o código com os usuários finais (C) transfere a responsabilidade e gera inconsistência, e agrupar requisições em janelas no Dataflow (D) quebra a exigência de inferência em tempo real.
> *Conceitos:* training-serving skew, pré-processamento, custom prediction routine

#### Q211 · 5.1 · curso 5 · média

You need to develop a custom TensorFlow model that will be used for online predictions. The training data is stored in BigQuery You need to apply instance-level data transformations to the data for model training and serving. You want to use the same preprocessing routine during model training and serving. How should you configure the preprocessing routine?

- **A.** Create a BigQuery script to preprocess the data, and write the result to another BigQuery table.
- **B.** Create a pipeline in Vertex AI Pipelines to read the data from BigQuery and preprocess it using a custom preprocessing component.
- **C.** Create a preprocessing function that reads and transforms the data from BigQuery. Create a Vertex AI custom prediction routine that calls the preprocessing function at serving time.
- **D.** Create an Apache Beam pipeline to read the data from BigQuery and preprocess it by using TensorFlow Transform and Dataflow.

> [!success]- Resposta: **D**
> TensorFlow Transform executado com Apache Beam no Dataflow gera um transform graph que é exportado junto com o SavedModel, aplicando exatamente o mesmo pré-processamento no treino e no serving online. Um script no BigQuery (A) ou componente de pipeline (B) só cobre o treino, e uma custom prediction routine (C) duplica a lógica no serving com risco de skew.
> *Conceitos:* TensorFlow Transform, Dataflow, training-serving skew, Apache Beam

#### Q213 · 5.1 · curso 6 · média

You are building a TensorFlow text-to-image generative model by using a dataset that contains billions of images with their respective captions. You want to create a low maintenance, automated workflow that reads the data from a Cloud Storage bucket collects statistics, splits the dataset into training/validation/test datasets performs data transformations trains the model using the training/validation datasets, and validates the model by using the test dataset. What should you do?

- **A.** Use the Apache Airflow SDK to create multiple operators that use Dataflow and Vertex AI services. Deploy the workflow on Cloud Composer.
- **B.** Use the MLFlow SDK and deploy it on a Google Kubernetes Engine cluster. Create multiple components that use Dataflow and Vertex AI services.
- **C.** Use the Kubeflow Pipelines (KFP) SDK to create multiple components that use Dataflow and Vertex AI services. Deploy the workflow on Vertex AI Pipelines.
- **D.** Use the TensorFlow Extended (TFX) SDK to create multiple components that use Dataflow and Vertex AI services. Deploy the workflow on Vertex AI Pipelines.

> [!success]- Resposta: **D** ⚠️ o arquivo dizia **C**; revisado para **D**
> O fluxo pedido (ler dados, coletar estatísticas, dividir em train/val/test, transformar, treinar e validar) corresponde exatamente aos componentes padrão do TFX (ExampleGen, StatisticsGen, Transform, Trainer, Evaluator), e o Google recomenda TFX para modelos TensorFlow com grandes volumes de dados, executando no Vertex AI Pipelines com Dataflow. KFP (C, o gabarito) também funcionaria, mas exigiria implementar manualmente esses componentes, aumentando a manutenção; Composer e MLflow (A, B) não são a opção gerenciada recomendada.
> *Conceitos:* TFX, Vertex AI Pipelines, Dataflow, TensorFlow

#### Q214 · 5.1 · curso 6 · fácil

You are developing an ML pipeline using Vertex AI Pipelines. You want your pipeline to upload a new version of the XGBoost model to Vertex AI Model Registry and deploy it to Vertex AI Endpoints for online inference. You want to use the simplest approach. What should you do?

- **A.** Use the Vertex AI REST API within a custom component based on a vertex-ai/prediction/xgboost-cpu image
- **B.** Use the Vertex AI ModelEvaluationOp component to evaluate the model
- **C.** Use the Vertex AI SDK for Python within a custom component based on a python:3.10 image
- **D.** Chain the Vertex AI ModelUploadOp and ModelDeployOp components together

> [!success]- Resposta: **D**
> Os Google Cloud Pipeline Components ModelUploadOp e ModelDeployOp encadeados fazem upload da nova versão ao Model Registry e o deploy no endpoint sem código customizado. Escrever um componente próprio com REST API ou SDK (A, C) funciona, mas é mais trabalhoso, e ModelEvaluationOp (B) só avalia o modelo.
> *Conceitos:* ModelUploadOp, ModelDeployOp, Model Registry, Vertex AI Pipelines

#### Q216 · 5.1 · curso 6 · fácil

You are creating a model training pipeline to predict sentiment scores from text-based product reviews. You want to have control over how the model parameters are tuned, and you will deploy the model to an endpoint after it has been trained. You will use Vertex AI Pipelines to run the pipeline. You need to decide which Google Cloud pipeline components to use. What components should you choose?

- **A.** TabularDatasetCreateOp, CustomTrainingJobOp, and EndpointCreateOp
- **B.** TextDatasetCreateOp, AutoMLTextTrainingOp, and EndpointCreateOp
- **C.** TabularDatasetCreateOp. AutoMLTextTrainingOp, and ModelDeployOp
- **D.** TextDatasetCreateOp, CustomTrainingJobOp, and ModelDeployOp

> [!success]- Resposta: **D**
> Dados de reviews são texto (TextDatasetCreateOp), o controle sobre o tuning dos parâmetros exige treino customizado (CustomTrainingJobOp), e ModelDeployOp implanta o modelo no endpoint. AutoML (B, C) não dá controle sobre os hiperparâmetros, e EndpointCreateOp (A, B) apenas cria o endpoint sem implantar o modelo.
> *Conceitos:* Google Cloud Pipeline Components, CustomTrainingJobOp, ModelDeployOp

#### Q233 · 5.1 · curso 6 · média

You are building a custom image classification model and plan to use Vertex AI Pipelines to implement the end-to-end training. Your dataset consists of images that need to be preprocessed before they can be used to train the model. The preprocessing steps include resizing the images, converting them to grayscale, and extracting features. You have already implemented some Python functions for the preprocessing tasks. Which components should you use in your pipeline?

- **A.** DataprocSparkBatchOp and CustomTrainingJobOp
- **B.** DataflowPythonJobOp, WaitGcpResourcesOp, and CustomTrainingJobOp
- **C.** dsl.ParallelFor, dsl.component, and CustomTrainingJobOp
- **D.** ImageDatasetImportDataOp, dsl.component, and AutoMLImageTrainingJobRunOp

> [!success]- Resposta: **B**
> DataflowPythonJobOp executa as funções Python de pré-processamento como um job Apache Beam escalável no Dataflow, WaitGcpResourcesOp aguarda o término do job, e CustomTrainingJobOp treina o modelo customizado. Usar componentes leves com dsl.ParallelFor (C) não escala bem para grandes volumes de imagens, Spark no Dataproc (A) exigiria reescrever o código e AutoML (D) contradiz o modelo customizado.
> *Conceitos:* DataflowPythonJobOp, WaitGcpResourcesOp, CustomTrainingJobOp, Vertex AI Pipelines

#### Q252 · 5.1 · curso 6 · média

You are developing a training pipeline for a new XGBoost classification model based on tabular data. The data is stored in a BigQuery table. You need to complete the following steps: 1. Randomly split the data into training and evaluation datasets in a 65/35 ratio 2. Conduct feature engineering 3. Obtain metrics for the evaluation dataset 4. Compare models trained in different pipeline executions How should you execute these steps?

- **A.** 1. Using Vertex AI Pipelines, add a component to divide the data into training and evaluation sets, and add another component for feature engineering. 2. Enable autologging of metrics in the training component. 3. Compare pipeline runs in Vertex AI Experiments.
- **B.** 1. Using Vertex AI Pipelines, add a component to divide the data into training and evaluation sets, and add another component for feature engineering. 2. Enable autologging of metrics in the training component. 3. Compare models using the artifacts’ lineage in Vertex ML Metadata.
- **C.** 1. In BigQuery ML, use the CREATE MODEL statement with BOOSTED_TREE_CLASSIFIER as the model type and use BigQuery to handle the data splits. 2. Use a SQL view to apply feature engineering and train the model using the data in that view. 3. Compare the evaluation metrics of the models by using a SQL query with the ML.TRAINING_INFO statement.
- **D.** 1. In BigQuery ML, use the CREATE MODEL statement with BOOSTED_TREE_CLASSIFIER as the model type and use BigQuery to handle the data splits. 2. Use ML TRANSFORM to specify the feature engineering transformations and tram the model using the data in the table. 3. Compare the evaluation metrics of the models by using a SQL query with the ML.TRAINING_INFO statement.

> [!success]- Resposta: **A**
> Vertex AI Pipelines com componentes de split e feature engineering, autologging de métricas e comparação de runs no Vertex AI Experiments cobre todos os passos, incluindo comparar execuções diferentes do pipeline. As opções em BigQuery ML usam ML.TRAINING_INFO, que retorna informações de iterações de treino, não métricas de avaliação para comparar modelos; B usa lineage, que não é feito para comparar métricas.
> *Conceitos:* Vertex AI Pipelines, Vertex AI Experiments, autologging, XGBoost

#### Q255 · 5.1 · curso 6 · média

You have recently used TensorFlow to train a classification model on tabular data. You have created a Dataflow pipeline that can transform several terabytes of data into training or prediction datasets consisting of TFRecords. You now need to productionize the model, and you want the predictions to be automatically uploaded to a BigQuery table on a weekly schedule. What should you do?

- **A.** Import the model into Vertex AI and deploy it to a Vertex AI endpoint. On Vertex AI Pipelines, create a pipeline that uses the DataflowPythonJobOp and the ModelBacthPredictOp components.
- **B.** Import the model into Vertex AI and deploy it to a Vertex AI endpoint. Create a Dataflow pipeline that reuses the data processing logic sends requests to the endpoint, and then uploads predictions to a BigQuery table.
- **C.** Import the model into Vertex AI. On Vertex AI Pipelines, create a pipeline that uses the DataflowPvthonJobOp and the ModelBatchPredictOp components.
- **D.** Import the model into BigQuery. Implement the data processing logic in a SQL query. On Vertex AI Pipelines create a pipeline that uses the BigquervQueryJobOp and the BigqueryPredictModelJobOp components.

> [!success]- Resposta: **C** · votos no arquivo: C(50%) B(50%)
> Para previsões semanais em lote basta importar o modelo e criar um pipeline com DataflowPythonJobOp (reaproveitando o pré-processamento) e ModelBatchPredictOp, que grava direto no BigQuery e pode ser agendado. Implantar em endpoint (A/B) mantém nós online ligados sem necessidade e B ainda exige código para enviar requisições; D reescreveria a lógica em SQL.
> *Conceitos:* Vertex AI Pipelines, batch prediction, Dataflow, BigQuery

#### Q271 · 5.1 · curso 6 · fácil

You recently created a new Google Cloud project. After testing that you can submit a Vertex AI Pipeline job from the Cloud Shell, you want to use a Vertex AI Workbench user-managed notebook instance to run your code from that instance. You created the instance and ran the code but this time the job fails with an insufficient permissions error. What should you do?

- **A.** Ensure that the Workbench instance that you created is in the same region of the Vertex AI Pipelines resources you will use.
- **B.** Ensure that the Vertex AI Workbench instance is on the same subnetwork of the Vertex AI Pipeline resources that you will use.
- **C.** Ensure that the Vertex AI Workbench instance is assigned the Identity and Access Management (IAM) Vertex AI User role.
- **D.** Ensure that the Vertex AI Workbench instance is assigned the Identity and Access Management (IAM) Notebooks Runner role.

> [!success]- Resposta: **C**
> O notebook roda com a service account da instância, que precisa do papel Vertex AI User para submeter jobs de pipeline; no Cloud Shell eram usadas as credenciais do usuário, por isso funcionou. Região ou sub-rede (A/B) gerariam outros erros, não de permissão, e Notebooks Runner não concede acesso ao Vertex AI Pipelines.
> *Conceitos:* IAM, service account, Vertex AI Pipelines, Workbench

#### Q279 · 5.1 · curso 6 · média

You are creating an ML pipeline for data processing, model training, and model deployment that uses different Google Cloud services. You have developed code for each individual task, and you expect a high frequency of new files. You now need to create an orchestration layer on top of these tasks. You only want this orchestration pipeline to run if new files are present in your dataset in a Cloud Storage bucket. You also want to minimize the compute node costs. What should you do?

- **A.** Create a pipeline in Vertex AI Pipelines. Configure the first step to compare the contents of the bucket to the last time the pipeline was run. Use the scheduler API to run the pipeline periodically.
- **B.** Create a Cloud Function that uses a Cloud Storage trigger and deploys a Cloud Composer directed acyclic graph (DAG).
- **C.** Create a pipeline in Vertex AI Pipelines. Create a Cloud Function that uses a Cloud Storage trigger and deploys the pipeline.
- **D.** Deploy a Cloud Composer directed acyclic graph (DAG) with a GCSObjectUpdateSensor class that detects when a new file is added to the Cloud Storage bucket.

> [!success]- Resposta: **C**
> Um Cloud Function acionado por evento do Cloud Storage dispara o Vertex AI pipeline só quando chega arquivo novo, e o Vertex AI Pipelines é serverless, sem nós ociosos. Cloud Composer (B/D) mantém um ambiente sempre ligado, gerando custo de compute; agendamento periódico (A) roda mesmo sem arquivos novos.
> *Conceitos:* Vertex AI Pipelines, Cloud Functions, event-driven, Cloud Storage trigger

#### Q280 · 5.1 · curso 6 · fácil

You are using Kubeflow Pipelines to develop an end-to-end PyTorch-based MLOps pipeline. The pipeline reads data from BigQuery, processes the data, conducts feature engineering, model training, model evaluation, and deploys the model as a binary file to Cloud Storage. You are writing code for several different versions of the feature engineering and model training steps, and running each new version in Vertex AI Pipelines. Each pipeline run is taking over an hour to complete. You want to speed up the pipeline execution to reduce your development time, and you want to avoid additional costs. What should you do?

- **A.** Comment out the part of the pipeline that you are not currently updating.
- **B.** Enable caching in all the steps of the Kubeflow pipeline.
- **C.** Delegate feature engineering to BigQuery and remove it from the pipeline.
- **D.** Add a GPU to the model training step.

> [!success]- Resposta: **B**
> Com caching habilitado, os passos cujas entradas e código não mudaram reutilizam saídas de execuções anteriores, acelerando o desenvolvimento sem custo extra. Comentar partes do pipeline (A) é frágil e quebra dependências; GPU (D) adiciona custo.
> *Conceitos:* Kubeflow Pipelines, caching, Vertex AI Pipelines

## 5.2 Retreino automático e CI/CD

#### Q8 · 5.2 · curso 6 · média

You work for a public transportation company and need to build a model to estimate delay times for multiple transportation routes. Predictions are served directly to users in an app in real time. Because different seasons and population increases impact the data relevance, you will retrain the model every month. You want to follow Google-recommended best practices. How should you configure the end-to-end architecture of the predictive model?

- **A.** Configure Kubeflow Pipelines to schedule your multi-step workflow from training to deploying your model.
- **B.** Use a model trained and deployed on BigQuery ML, and trigger retraining with the scheduled query feature in BigQuery.
- **C.** Write a Cloud Functions script that launches a training and deploying job on AI Platform that is triggered by Cloud Scheduler.
- **D.** Use Cloud Composer to programmatically schedule a Dataflow job that executes the workflow from training to deploying your model.

> [!success]- Resposta: **A**
> Kubeflow Pipelines (hoje Vertex AI Pipelines) orquestra o fluxo de várias etapas do treino ao deploy com agendamento, a prática recomendada para retreino periódico. Cloud Functions com Scheduler (C) funciona mas é uma solução ad hoc sem rastreabilidade, e Dataflow (D) não é ferramenta de orquestração de treino.
> *Conceitos:* Kubeflow Pipelines, retraining, orquestração
> *Nome atual:* Kubeflow Pipelines gerenciado hoje é Vertex AI Pipelines.

#### Q9 · 5.2 · curso 6 · fácil

You are developing ML models with AI Platform for image segmentation on CT scans. You frequently update your model architectures based on the newest available research papers, and have to rerun training on the same dataset to benchmark their performance. You want to minimize computation costs and manual intervention while having version control for your code. What should you do?

- **A.** Use Cloud Functions to identify changes to your code in Cloud Storage and trigger a retraining job.
- **B.** Use the gcloud command-line tool to submit training jobs on AI Platform when you update your code.
- **C.** Use Cloud Build linked with Cloud Source Repositories to trigger retraining when new code is pushed to the repository.
- **D.** Create an automated workflow in Cloud Composer that runs daily and looks for changes in code in Cloud Storage using a sensor.

> [!success]- Resposta: **C**
> Cloud Build com gatilho no repositório dá versionamento e dispara o retreino automaticamente só quando há push, minimizando custo e intervenção manual. Composer rodando diariamente (D) gasta recursos sem necessidade, e gcloud manual (B) não automatiza.
> *Conceitos:* Cloud Build, CI/CD, retraining
> *Nome atual:* AI Platform hoje é Vertex AI; Cloud Source Repositories está fechado para novos clientes, use GitHub/GitLab conectado ao Cloud Build.

#### Q19 · 5.2 · curso 6 · fácil

You have written unit tests for a Kubeflow Pipeline that require custom libraries. You want to automate the execution of unit tests with each new push to your development branch in Cloud Source Repositories. What should you do?

- **A.** Write a script that sequentially performs the push to your development branch and executes the unit tests on Cloud Run.
- **B.** Using Cloud Build, set an automated trigger to execute the unit tests when changes are pushed to your development branch.
- **C.** Set up a Cloud Logging sink to a Pub/Sub topic that captures interactions with Cloud Source Repositories. Configure a Pub/Sub trigger for Cloud Run, and execute the unit tests on Cloud Run.
- **D.** Set up a Cloud Logging sink to a Pub/Sub topic that captures interactions with Cloud Source Repositories. Execute the unit tests using a Cloud Function that is triggered when messages are sent to the Pub/Sub topic.

> [!success]- Resposta: **B**
> Um gatilho do Cloud Build no push ao branch de desenvolvimento executa os testes automaticamente, solução gerenciada e com menos esforço. Sinks de Logging com Pub/Sub e Cloud Run/Functions (C, D) funcionam, mas são complexos e desnecessários.
> *Conceitos:* Cloud Build, unit tests, CI/CD
> *Nome atual:* Cloud Source Repositories está fechado para novos clientes; use GitHub/GitLab com Cloud Build.

#### Q39 · 5.2 · curso 6 · fácil

You work with a data engineering team that has developed a pipeline to clean your dataset and save it in a Cloud Storage bucket. You have created an ML model and want to use the data to refresh your model as soon as new data is available. As part of your CI/CD workflow, you want to automatically run a Kubeflow Pipelines training job on Google Kubernetes Engine (GKE). How should you architect this workflow?

- **A.** Configure your pipeline with Dataflow, which saves the files in Cloud Storage. After the file is saved, start the training job on a GKE cluster.
- **B.** Use App Engine to create a lightweight python client that continuously polls Cloud Storage for new files. As soon as a file arrives, initiate the training job.
- **C.** Configure a Cloud Storage trigger to send a message to a Pub/Sub topic when a new file is available in a storage bucket. Use a Pub/Sub-triggered Cloud Function to start the training job on a GKE cluster.
- **D.** Use Cloud Scheduler to schedule jobs at a regular interval. For the first step of the job, check the timestamp of objects in your Cloud Storage bucket. If there are no new files since the last run, abort the job.

> [!success]- Resposta: **C**
> Notificação do Cloud Storage via Pub/Sub acionando uma Cloud Function para iniciar o pipeline é event-driven e dispara assim que chegam dados novos. Polling (B) ou agendamento (D) desperdiçam recursos e atrasam o retreino.
> *Conceitos:* event-driven, Pub/Sub, Cloud Functions, retraining
> *Nome atual:* Hoje o pipeline rodaria tipicamente no Vertex AI Pipelines em vez de Kubeflow em GKE.

#### Q81 · 5.2 · curso 6 · fácil

Your data science team has requested a system that supports scheduled model retraining, Docker containers, and a service that supports autoscaling and monitoring for online prediction requests. Which platform components should you choose for this system?

- **A.** Vertex AI Pipelines and App Engine
- **B.** Vertex AI Pipelines, Vertex AI Prediction, and Vertex AI Model Monitoring
- **C.** Cloud Composer, BigQuery ML, and Vertex AI Prediction
- **D.** Cloud Composer, Vertex AI Training with custom containers, and App Engine

> [!success]- Resposta: **B**
> Vertex AI Pipelines cobre o retreino agendado com containers, Vertex AI Prediction dá autoscaling no online serving e Model Monitoring cobre o monitoramento. App Engine e BigQuery ML (A, C, D) não atendem bem a todos os requisitos juntos.
> *Conceitos:* Vertex AI Pipelines, Vertex AI Prediction, Model Monitoring

#### Q166 · 5.2 · curso 6 · difícil

You developed a Vertex AI ML pipeline that consists of preprocessing and training steps and each set of steps runs on a separate custom Docker image. Your organization uses GitHub and GitHub Actions as CI/CD to run unit and integration tests. You need to automate the model retraining workflow so that it can be initiated both manually and when a new version of the code is merged in the main branch. You want to minimize the steps required to build the workflow while also allowing for maximum flexibility. How should you configure the CI/CD workflow?

- **A.** Trigger a Cloud Build workflow to run tests, build custom Docker images, push the images to Artifact Registry, and launch the pipeline in Vertex AI Pipelines.
- **B.** Trigger GitHub Actions to run the tests, launch a job on Cloud Run to build custom Docker images, push the images to Artifact Registry, and launch the pipeline in Vertex AI Pipelines.
- **C.** Trigger GitHub Actions to run the tests, build custom Docker images, push the images to Artifact Registry, and launch the pipeline in Vertex AI Pipelines.
- **D.** Trigger GitHub Actions to run the tests, launch a Cloud Build workflow to build custom Docker images, push the images to Artifact Registry, and launch the pipeline in Vertex AI Pipelines.

> [!success]- Resposta: **D**
> Manter os testes no GitHub Actions, que a organização já usa (e que suporta workflow_dispatch manual e gatilho de merge), e delegar o build das imagens ao Cloud Build, que é gerenciado e integrado ao Artifact Registry, dá flexibilidade com poucos passos. C é tentadora, mas fazer o build no runner do GitHub tira a integração nativa com o Google Cloud, e Cloud Run (B) não é ferramenta de build.
> *Conceitos:* CI/CD, GitHub Actions, Cloud Build, Artifact Registry

#### Q180 · 5.2 · curso 6 · média

You recently deployed a pipeline in Vertex AI Pipelines that trains and pushes a model to a Vertex AI endpoint to serve real-time traffic. You need to continue experimenting and iterating on your pipeline to improve model performance. You plan to use Cloud Build for CI/CD You want to quickly and easily deploy new pipelines into production, and you want to minimize the chance that the new pipeline implementations will break in production. What should you do?

- **A.** Set up a CI/CD pipeline that builds and tests your source code. If the tests are successful, use the Google. Cloud console to upload the built container to Artifact Registry and upload the compiled pipeline to Vertex AI Pipelines.
- **B.** Set up a CI/CD pipeline that builds your source code and then deploys built artifacts into a pre-production environment. Run unit tests in the pre-production environment. If the tests are successful deploy the pipeline to production.
- **C.** Set up a CI/CD pipeline that builds and tests your source code and then deploys built artifacts into a pre-production environment. After a successful pipeline run in the pre-production environment, deploy the pipeline to production.
- **D.** Set up a CI/CD pipeline that builds and tests your source code and then deploys built artifacts into a pre-production environment. After a successful pipeline run in the pre-production environment, rebuild the source code and deploy the artifacts to production.

> [!success]- Resposta: **C**
> O CI/CD deve buildar e testar, implantar em pré-produção e promover os mesmos artefatos para produção após uma execução bem-sucedida do pipeline. Rebuildar para produção (D) pode gerar artefatos diferentes dos testados, e o upload manual pelo console (A) não é automação.
> *Conceitos:* CI/CD, Cloud Build, pre-production

#### Q185 · 5.2 · curso 6 · difícil

You have developed a BigQuery ML model that predicts customer chum, and deployed the model to Vertex AI Endpoints. You want to automate the retraining of your model by using minimal additional code when model feature values change. You also want to minimize the number of times that your model is retrained to reduce training costs. What should you do?

- **A.** 1 Enable request-response logging on Vertex AI Endpoints 2. Schedule a TensorFlow Data Validation job to monitor prediction drift 3. Execute model retraining if there is significant distance between the distributions
- **B.** 1. Enable request-response logging on Vertex AI Endpoints 2. Schedule a TensorFlow Data Validation job to monitor training/serving skew 3. Execute model retraining if there is significant distance between the distributions
- **C.** 1. Create a Vertex AI Model Monitoring job configured to monitor prediction drift 2. Configure alert monitoring to publish a message to a Pub/Sub queue when a monitoring alert is detected 3. Use a Cloud Function to monitor the Pub/Sub queue, and trigger retraining in BigQuery
- **D.** 1. Create a Vertex AI Model Monitoring job configured to monitor training/serving skew 2. Configure alert monitoring to publish a message to a Pub/Sub queue when a monitoring alert is detected 3. Use a Cloud Function to monitor the Pub/Sub queue, and trigger retraining in BigQuery

> [!success]- Resposta: **D**
> Como o modelo do BigQuery ML tem os dados de treino acessíveis, o Model Monitoring de training-serving skew compara direto com esse baseline e dispara retreino via Pub/Sub e Cloud Function só quando há desvio significativo, com código mínimo. Jobs de TFDV agendados (A, B) exigem código custom, e drift (C) compara janelas de serving entre si, o que pode disparar mais retreinos.
> *Conceitos:* Model Monitoring, training-serving skew, Pub/Sub, Cloud Functions
> *Nome atual:* Cloud Functions hoje se chama Cloud Run functions.

#### Q192 · 5.2 · curso 6 · média

Your team has a model deployed to a Vertex AI endpoint. You have created a Vertex AI pipeline that automates the model training process and is triggered by a Cloud Function. You need to prioritize keeping the model up-to-date, but also minimize retraining costs. How should you configure retraining?

- **A.** Configure Pub/Sub to call the Cloud Function when a sufficient amount of new data becomes available
- **B.** Configure a Cloud Scheduler job that calls the Cloud Function at a predetermined frequency that fits your team’s budget
- **C.** Enable model monitoring on the Vertex AI endpoint. Configure Pub/Sub to call the Cloud Function when anomalies are detected
- **D.** Enable model monitoring on the Vertex AI endpoint. Configure Pub/Sub to call the Cloud Function when feature drift is detected

> [!success]- Resposta: **D**
> Disparar o retreino só quando o Model Monitoring detecta feature drift mantém o modelo atualizado e evita retreinos desnecessários. Agendamento fixo (B) pode retreinar sem necessidade ou tarde demais, e apenas ter dados novos (A) não indica que o modelo degradou.
> *Conceitos:* Model Monitoring, feature drift, retraining, Pub/Sub
> *Nome atual:* Cloud Functions hoje se chama Cloud Run functions.

#### Q217 · 5.2 · curso 6 · fácil

Your team frequently creates new ML models and runs experiments. Your team pushes code to a single repository hosted on Cloud Source Repositories. You want to create a continuous integration pipeline that automatically retrains the models whenever there is any modification of the code. What should be your first step to set up the CI pipeline?

- **A.** Configure a Cloud Build trigger with the event set as "Pull Request"
- **B.** Configure a Cloud Build trigger with the event set as "Push to a branch"
- **C.** Configure a Cloud Function that builds the repository each time there is a code change
- **D.** Configure a Cloud Function that builds the repository each time a new branch is created

> [!success]- Resposta: **B**
> Um Cloud Build trigger com evento 'Push to a branch' dispara a cada modificação de código enviada ao repositório, base de um pipeline de CI que retreina os modelos. O trigger de Pull Request (A) não cobre todos os pushes (e não é suportado no Cloud Source Repositories), e Cloud Functions (C, D) seriam uma solução improvisada em vez do serviço de CI gerenciado.
> *Conceitos:* Cloud Build, CI/CD, trigger, retreino
> *Nome atual:* Cloud Source Repositories está descontinuado para novos clientes; use GitHub/GitLab conectados ao Cloud Build ou Secure Source Manager.

#### Q223 · 5.2 · curso 6 · média

You work for a pharmaceutical company based in Canada. Your team developed a BigQuery ML model to predict the number of flu infections for the next month in Canada. Weather data is published weekly, and flu infection statistics are published monthly. You need to configure a model retraining policy that minimizes cost. What should you do?

- **A.** Download the weather and flu data each week. Configure Cloud Scheduler to execute a Vertex AI pipeline to retrain the model weekly.
- **B.** Download the weather and flu data each month. Configure Cloud Scheduler to execute a Vertex AI pipeline to retrain the model monthly.
- **C.** Download the weather and flu data each week. Configure Cloud Scheduler to execute a Vertex AI pipeline to retrain the model every month.
- **D.** Download the weather data each week, and download the flu data each month. Deploy the model to a Vertex AI endpoint with feature drift monitoring, and retrain the model if a monitoring alert is detected.

> [!success]- Resposta: **D**
> Retreinar apenas quando o monitoramento de feature drift indicar mudança evita retreinos desnecessários, e baixar cada fonte na cadência em que é publicada (clima semanal, gripe mensal) evita downloads inúteis, minimizando custo. Retreinar em agenda fixa (A, B, C) gasta recursos mesmo sem mudança nos dados, e baixar dados de gripe semanalmente (A, C) não traz dados novos.
> *Conceitos:* retreino, feature drift, Model Monitoring, custo

#### Q245 · 5.2 · curso 6 · média

ou are developing an ML model that predicts the cost of used automobiles based on data such as location, condition, model type, color, and engine/battery efficiency. The data is updated every night. Car dealerships will use the model to determine appropriate car prices. You created a Vertex AI pipeline that reads the data splits the data into training/evaluation/test sets performs feature engineering trains the model by using the training dataset and validates the model by using the evaluation dataset. You need to configure a retraining workflow that minimizes cost. What should you do?

- **A.** Compare the training and evaluation losses of the current run. If the losses are similar, deploy the model to a Vertex AI endpoint. Configure a cron job to redeploy the pipeline every night.
- **B.** Compare the training and evaluation losses of the current run. If the losses are similar, deploy the model to a Vertex AI endpoint with training/serving skew threshold model monitoring. When the model monitoring threshold is triggered redeploy the pipeline.
- **C.** Compare the results to the evaluation results from a previous run. If the performance improved deploy the model to a Vertex AI endpoint. Configure a cron job to redeploy the pipeline every night.
- **D.** Compare the results to the evaluation results from a previous run. If the performance improved deploy the model to a Vertex AI endpoint with training/serving skew threshold model monitoring. When the model monitoring threshold is triggered redeploy the pipeline.

> [!success]- Resposta: **D**
> Comparar com a avaliação do run anterior garante que só um modelo melhor seja implantado, e disparar o retreino apenas quando o monitoramento de skew ultrapassa o limite evita custo de rodar o pipeline toda noite. Comparar losses de treino/avaliação do mesmo run só detecta overfitting, e o cron noturno gera custo desnecessário.
> *Conceitos:* retreino, Model Monitoring, training-serving skew, custo

#### Q267 · 5.2 · curso 3 · fácil

You created a model that uses BigQuery ML to perform linear regression. You need to retrain the model on the cumulative data collected every week. You want to minimize the development effort and the scheduling cost. What should you do?

- **A.** Use BigQuery’s scheduling service to run the model retraining query periodically.
- **B.** Create a pipeline in Vertex AI Pipelines that executes the retraining query, and use the Cloud Scheduler API to run the query weekly.
- **C.** Use Cloud Scheduler to trigger a Cloud Function every week that runs the query for retraining the model.
- **D.** Use the BigQuery API Connector and Cloud Scheduler to trigger Workflows every week that retrains the model.

> [!success]- Resposta: **A**
> Scheduled queries do BigQuery executam o CREATE OR REPLACE MODEL periodicamente sem código adicional e sem custo extra de agendamento. Pipelines, Cloud Functions ou Workflows com Cloud Scheduler adicionam componentes e esforço desnecessários.
> *Conceitos:* BigQuery ML, scheduled queries, retreino

## 5.3 Metadados, versões e linhagem

#### Q51 · 5.3 · curso 6 · fácil

You work on a growing team of more than 50 data scientists who all use AI Platform. You are designing a strategy to organize your jobs, models, and versions in a clean and scalable way. Which strategy should you choose?

- **A.** Set up restrictive IAM permissions on the AI Platform notebooks so that only a single user or group can access a given instance.
- **B.** Separate each data scientist's work into a different project to ensure that the jobs, models, and versions created by each data scientist are accessible only to that user.
- **C.** Use labels to organize resources into descriptive categories. Apply a label to each created resource so that users can filter the results by label when viewing or monitoring the resources.
- **D.** Set up a BigQuery sink for Cloud Logging logs that is appropriately filtered to capture information about AI Platform resource usage. In BigQuery, create a SQL view that maps users to the resources they are using

> [!success]- Resposta: **C**
> Labels são a forma recomendada e escalável de organizar jobs, models e versions, permitindo filtrar recursos por equipe, projeto ou dono. Separar cada cientista em um projeto (B) fragmenta a colaboração e não escala; IAM restritivo (A) trata de acesso, não de organização.
> *Conceitos:* labels, organização de recursos, Vertex AI
> *Nome atual:* AI Platform hoje é Vertex AI (Training, Prediction, Workbench).

#### Q86 · 5.3 · curso 6 · fácil

You are a lead ML engineer at a retail company. You want to track and manage ML metadata in a centralized way so that your team can have reproducible experiments by generating artifacts. Which management solution should you recommend to your team?

- **A.** Store your tf.logging data in BigQuery.
- **B.** Manage all relational entities in the Hive Metastore.
- **C.** Store all ML metadata in Google Cloud’s operations suite.
- **D.** Manage your ML workflows with Vertex ML Metadata.

> [!success]- Resposta: **D** ⚠️ o arquivo dizia **B**; revisado para **D**
> Vertex ML Metadata é o serviço gerenciado para rastrear artefatos, execuções e linhagem, garantindo reprodutibilidade. O gabarito B (Hive Metastore) está errado: ele guarda metadados de tabelas Hive, não metadados de ML; operations suite e BigQuery (A, C) também não são feitos para isso.
> *Conceitos:* Vertex ML Metadata, linhagem, reprodutibilidade

#### Q99 · 5.3 · curso 6 · difícil

You are an ML engineer at a travel company. You have been researching customers’ travel behavior for many years, and you have deployed models that predict customers’ vacation patterns. You have observed that customers’ vacation destinations vary based on seasonality and holidays; however, these seasonal variations are similar across years. You want to quickly and easily store and compare the model versions and performance statistics across years. What should you do?

- **A.** Store the performance statistics in Cloud SQL. Query that database to compare the performance statistics across the model versions.
- **B.** Create versions of your models for each season per year in Vertex AI. Compare the performance statistics across the models in the Evaluate tab of the Vertex AI UI.
- **C.** Store the performance statistics of each pipeline run in Kubeflow under an experiment for each season per year. Compare the results across the experiments in the Kubeflow UI.
- **D.** Store the performance statistics of each version of your models using seasons and years as events in Vertex ML Metadata. Compare the results across the slices.

> [!success]- Resposta: **D** · votos no arquivo: D(56%), B(44%)
> Vertex ML Metadata permite registrar estatísticas de desempenho de cada versão com atributos (temporada, ano) e compará-las de forma estruturada, preservando linhagem. A opção B (versões no Vertex AI e aba Evaluate) é tentadora, mas criar uma versão por temporada/ano e comparar manualmente na UI é menos flexível para comparações entre anos; a comunidade fica dividida entre as duas.
> *Conceitos:* Vertex ML Metadata, versionamento, comparação de modelos

#### Q199 · 5.3 · curso 6 · média

You are developing a process for training and running your custom model in production. You need to be able to show lineage for your model and predictions. What should you do?

- **A.** 1. Create a Vertex AI managed dataset. 2. Use a Vertex AI training pipeline to train your model. 3. Generate batch predictions in Vertex AI.
- **B.** 1. Use a Vertex AI Pipelines custom training job component to tram your model. 2. Generate predictions by using a Vertex AI Pipelines model batch predict component.
- **C.** 1. Upload your dataset to BigQuery. 2. Use a Vertex AI custom training job to train your model. 3. Generate predictions by using Vertex Al SDK custom prediction routines.
- **D.** 1. Use Vertex AI Experiments to train your model. 2. Register your model in Vertex AI Model Registry. 3. Generate batch predictions in Vertex AI.

> [!success]- Resposta: **B** · votos no arquivo: B (54%) A (23%)
> Executar o treino e a batch prediction como componentes do Vertex AI Pipelines registra automaticamente artefatos e execuções no Vertex ML Metadata, gerando linhagem de dataset, modelo e predições. A opção A (managed dataset + training pipeline) é tentadora, mas fora de um pipeline a linhagem das predições não fica conectada de ponta a ponta; Experiments (D) rastreia métricas, não a linhagem completa.
> *Conceitos:* lineage, Vertex AI Pipelines, Vertex ML Metadata, batch prediction

#### Q224 · 5.3 · curso 6 · fácil

You are building a MLOps platform to automate your company’s ML experiments and model retraining. You need to organize the artifacts for dozens of pipelines. How should you store the pipelines’ artifacts?

- **A.** Store parameters in Cloud SQL, and store the models’ source code and binaries in GitHub.
- **B.** Store parameters in Cloud SQL, store the models’ source code in GitHub, and store the models’ binaries in Cloud Storage.
- **C.** Store parameters in Vertex ML Metadata, store the models’ source code in GitHub, and store the models’ binaries in Cloud Storage.
- **D.** Store parameters in Vertex ML Metadata and store the models’ source code and binaries in GitHub.

> [!success]- Resposta: **C**
> Parâmetros e metadados das execuções vão para o Vertex ML Metadata (com linhagem), código-fonte fica no controle de versão (GitHub) e binários dos modelos no Cloud Storage, que é o armazenamento adequado a artefatos grandes. Guardar binários no GitHub (A, D) é inadequado, e Cloud SQL (A, B) exige construir e manter um esquema próprio de metadados.
> *Conceitos:* Vertex ML Metadata, artefatos, Cloud Storage, MLOps

#### Q228 · 5.3 · curso 6 · fácil

You are investigating the root cause of a misclassification error made by one of your models. You used Vertex AI Pipelines to train and deploy the model. The pipeline reads data from BigQuery. creates a copy of the data in Cloud Storage in TFRecord format, trains the model in Vertex AI Training on that copy, and deploys the model to a Vertex AI endpoint. You have identified the specific version of that model that misclassified, and you need to recover the data this model was trained on. How should you find that copy of the data?

- **A.** Use Vertex AI Feature Store. Modify the pipeline to use the feature store, and ensure that all training data is stored in it. Search the feature store for the data used for the training.
- **B.** Use the lineage feature of Vertex AI Metadata to find the model artifact. Determine the version of the model and identify the step that creates the data copy and search in the metadata for its location.
- **C.** Use the logging features in the Vertex AI endpoint to determine the timestamp of the model’s deployment. Find the pipeline run at that timestamp. Identify the step that creates the data copy, and search in the logs for its location.
- **D.** Find the job ID in Vertex AI Training corresponding to the training for the model. Search in the logs of that job for the data used for the training.

> [!success]- Resposta: **B**
> O Vertex ML Metadata registra a linhagem dos artefatos de cada execução do Vertex AI Pipelines, permitindo partir da versão do modelo e chegar ao artefato de dados TFRecord gerado pelo passo de cópia e à sua localização no Cloud Storage. Procurar em logs por timestamps (C, D) é frágil e manual, e Feature Store (A) exigiria mudar o pipeline e não recupera a cópia histórica.
> *Conceitos:* lineage, Vertex ML Metadata, Vertex AI Pipelines, artefatos

#### Q284 · 5.3 · curso 6 · média

You have a custom job that runs on Vertex AI on a weekly basis. The job is implemented using a proprietary ML workflow that produces the datasets, models, and custom artifacts, and sends them to a Cloud Storage bucket. Many different versions of the datasets and models were created. Due to compliance requirements, your company needs to track which model was used for making a particular prediction, and needs access to the artifacts for each model. How should you configure your workflows to meet these requirements?

- **A.** Use the Vertex AI Metadata API inside the custom job to create context, execution, and artifacts for each model, and use events to link them together.
- **B.** Create a Vertex AI experiment, and enable autologging inside the custom job.
- **C.** Configure a TensorFlow Extended (TFX) ML Metadata database, and use the ML Metadata API.
- **D.** Register each model in Vertex AI Model Registry, and use model labels to store the related dataset and model information.

> [!success]- Resposta: **A**
> Usar a Vertex ML Metadata API dentro do custom job para criar contexts, executions e artifacts ligados por events registra a linhagem completa de dataset, modelo e artefatos customizados, permitindo saber qual modelo gerou cada previsão. Labels no Model Registry (D) não rastreiam linhagem, e um ML Metadata TFX próprio (C) exige gerenciar infraestrutura.
> *Conceitos:* Vertex ML Metadata, lineage, compliance
