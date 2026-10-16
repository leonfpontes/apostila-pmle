---
title: Módulo 3, Aula 3.8 — Agent building with Google Cloud
aliases: [aula 3.8 Google AI ML, Model Garden, Agent Garden, ADK, Agent Runtime, arvore de decisao agentes, Gemini Enterprise app]
tags: [aula, trabalho]
type: aula
area: trabalho
created: 2026-10-09
updated: 2026-10-09
status: concluída
fonte: transcricao
confianca: media
papel: derivada
indexar: true
summary: "O guia prático de construção de agentes: o stack de três camadas aplicado a agentes (Model Garden → Agent Platform → Gemini Enterprise app), o Gemini Enterprise app em detalhe com busca multimodal e Agent Designer, os cinco componentes da Agent Platform (Agent Studio, ADK, A2A orchestration, secure workspaces, Agent Runtime) e a árvore de decisão no-code / low-code / pro-code. Resolve Model Garden e Agent Garden."
transcricao: "[[T - 2026-10-09-m03-a08-agent-building-with-google-cloud]]"
data: 2026-10-09
curso: "[[curso-intro-ai-ml-google-cloud]]"
professor: ""
related: ["[[R - 2026-10-09-m03-a07-ai-agents]]", "[[R - 2026-10-09-m03-a01-generative-ai-on-google-cloud]]"]
---

# Módulo 3, Aula 3.8 — Agent building with Google Cloud

| | |
|---|---|
| **Tema** | Guia prático: que produto usar para construir um AI agent |
| **Curso** | [[curso-intro-ai-ml-google-cloud\|Introduction to AI and Machine Learning on Google Cloud]] |
| **Data** | 2026-10-09 (data da transcrição) |
| **Duração** | ~7min30 |
| **Aula nº / módulo** | 3.8 — Módulo 3 na ementa ("Module 2" na fala do curso) |

> 🎯 **Peso na prova: MUITO ALTO.** A **árvore de decisão** (§6) é o formato
> clássico de "qual produto usar para X", e aqui ela vem **explícita, com
> o perfil de usuário de cada caminho**. A aula também **fecha duas
> pendências** que arrastávamos desde a 3.1: **Model Garden** e **Agent
> Garden**.

## Conteúdo por tópico

### 1. ⭐ O stack de três camadas aplicado a agentes

A aula retoma a arquitetura de gen AI da [[R - 2026-10-09-m03-a01-generative-ai-on-google-cloud|aula 3.1]]
e nomeia **o produto de cada camada**, de baixo para cima:

```
┌──────────────────────────────────────────────────────┐
│ 3. APLICAÇÃO / SOLUÇÃO                               │
│    Gemini Enterprise app · Gemini Enterprise for CX  │
│    → usuários de NEGÓCIO e analistas                  │
│    → nenhum ou mínimo código                          │
├──────────────────────────────────────────────────────┤
│ 2. DESENVOLVIMENTO                                   │
│    Agent Platform — low-code OU pro-code              │
│    ferramentas: ADK · Agent Studio · Agents CLI       │
│    + ambiente gerenciado                              │
│    → DESENVOLVEDORES (software e ML engineers)        │
│    → end-to-end, do design ao deployment              │
├──────────────────────────────────────────────────────┤
│ 1. FOUNDATION MODELS                                 │
│    Model Garden                                       │
│    → o "CÉREBRO" do seu agente                        │
└──────────────────────────────────────────────────────┘
```

✅ **Pendência fechada: o Model Garden.** Citado sem definição na aula 3.1,
agora definido: **dá acesso a uma ampla gama de foundation models do Google
e a modelos generativos de terceiros**, servindo como o **"cérebro"** do
agente.

📌 Repare na continuidade com a aula 3.7: o **model é o cérebro** do
agente, e o **Model Garden** é onde esse cérebro é escolhido.

📌 **Gemini Enterprise for CX** aparece aqui com propósito nomeado:
construir **agentes de experiência do cliente** para indústrias
**customer-facing**, como o varejo.

### 2. ⭐ Os dois fatores que guiam a escolha

> *"Product choices and development journeys are influenced by **two key
> factors**: ease of use and flexibility."*

| Fator | Vai de… | …até |
|---|---|---|
| **Ease of use** (facilidade de uso) | soluções **no-code, prontas** (Gemini Enterprise app) | soluções **code-based abrangentes** para construir o seu próprio |
| **Flexibility** (flexibilidade) | **configuração mínima** (Gemini Enterprise app) | **customização total e alta flexibilidade** (build-your-own) |

> 💡 **É um trade-off invertido:** quanto **mais fácil**, **menos
> flexível** — e vice-versa. Toda a árvore de decisão (§6) é uma leitura
> desse eixo.

### 3. ⭐ O Gemini Enterprise app em detalhe

**O que é:** aplicação **no-code**, **amigável**, para **usuários de
negócio e analistas**.

**A metáfora da aula:** *"imagine um time de agentes de IA especialistas,
cada um pronto para enfrentar um desafio de negócio específico — como
**contratar um agente de viagens ou um empreiteiro geral**."*

**A proposta de valor, em uma frase:**

> Une **IA**, **busca de qualidade Google** e os **dados proprietários da
> sua empresa** num **único espaço seguro**.

**Quebra silos de dados**, tornando o conhecimento da empresa
**prontamente acessível e acionável, de forma segura**.

**Duas capacidades centrais:**

| Capacidade | Detalhe |
|---|---|
| **Busca inteligente e multimodal** | encontra **respostas contextuais e citadas** (*contextual, cited answers*) em **todos os formatos de dados** da organização — documentos, imagens, vídeos — numa **única interface** |
| **Hub de AI agents** | agentes que **automatizam workflows e completam tarefas em nome dos usuários** |

**O que o hub oferece:**
- **agentes Google pré-construídos** (*pre-built Google agents*)
- um **Agent Designer no-code** para criar agentes customizados

**Ações típicas desses agentes:** **atualizar tickets de projeto**,
**enviar e-mails**, **analisar relatórios** — reduzindo trabalho manual.

📌 Duas palavras-chave da busca: **contextual** e **citada**. "Citada"
significa que a resposta aponta a fonte — é o que a distingue de uma
resposta genérica de LLM.

### 4. ⭐ Gemini Notebook

Entre os agentes do Gemini Enterprise app, a aula destaca o **Gemini
Notebook**:

> **Seu assistente pessoal de pesquisa de IA** — um **companheiro de
> aprendizado** e **tutor de estudos**, desenhado para ajudar a **entender
> e obter insights rapidamente de grandes volumes de informação**.

📌 **Disponível em `notebook.google.com`, agora completamente grátis para o
público geral.** A aula fecha recomendando explorá-lo.

✅ Confirma de vez o que a aula 3.3 já dizia: o **Gemini Notebook é um
agente dentro do Gemini Enterprise app**, não produto solto.

### 5. ⭐ Por que o no-code não basta — e os cinco componentes da Agent Platform

**A limitação:** Bea, Ann e Ian precisavam de um agente que:

| Requisito |
|---|
| **integrasse com as aplicações legadas e bancos de dados internos** da empresa |
| tivesse **comportamentos de resposta específicos** — **aderir a políticas da indústria** para relatórios de sinistro, **mantendo tom caloroso e empático** com clientes |

> *"Gemini Enterprise app couldn't accommodate these custom requirements,
> highlighting the need for tools like Agent Platform."*

📌 **Os dois gatilhos para subir de camada:** **integrações profundas** e
**comportamento customizado**. Se uma questão descrever um desses, a
resposta não é o app no-code.

**Os cinco componentes da Agent Platform:**

| Componente | O que faz |
|---|---|
| **Agent Studio** | interface **visual low-code** para **projetar os loops de raciocínio do agente** (*agent reasoning loops*) e **testar prompts em linguagem natural** |
| **ADK** | usa **lógica baseada em grafo** (*graph-based logic*) para definir lógica **clara e confiável** de como **redes de sub-agentes colaboram** para resolver problemas complexos |
| **Agent-to-Agent orchestration** | permite agentes **delegarem tarefas uns aos outros**, usando padrões **generativos e determinísticos** |
| **Secure workspaces** | fornecem aos agentes **ambientes endurecidos e em sandbox** (*hardened, sandboxed*) para **gerenciar arquivos e rodar comandos com segurança** |
| **Agent Runtime** | serviços para **implantar, gerenciar e escalar** agentes em produção. Infraestrutura **gerenciada e de alta performance**, com **cold starts sub-segundo**, **workflows autônomos de longa duração** e **observabilidade integrada** |

⚠️ **A aula não expande a sigla ADK.** (Na documentação do Google é *Agent
Development Kit* — mas isso **não** é dito no vídeo, então não conte com
isso numa questão de sigla.)

📌 **Três detalhes técnicos do Agent Runtime que podem virar questão:**
**cold starts sub-segundo**, **workflows autônomos de longa duração** e
**observabilidade integrada**.

📌 **Agent-to-Agent orchestration** é a peça que torna a **agentic AI** da
aula 3.7 concreta: é assim que múltiplos agentes se coordenam.

### 6. ⭐⭐ A árvore de decisão — o quadro mais cobrável

> ⚠️ A aula avisa: *"this is only a brief guide and **may change as
> products evolve**."*

| Caminho | Nível | Produtos | Para quem |
|---|---|---|---|
| **Out-of-the-box solutions** | **no-code** | **Gemini Enterprise app** · **Gemini Enterprise for CX** | **usuários de negócio** que precisam de soluções **prontas** com **configuração mínima** |
| **Customizable templates** | **low-code** | na Agent Platform: **Agent Studio** (ideia → protótipo rápido) e **Agent Garden** (**templates pré-construídos**) | **cientistas de dados e analistas** buscando uma **base** para soluções mais customizadas |
| **Custom development** | **pro-code** | **ADK** ou **construir do zero** | **desenvolvedores** que precisam de agentes **altamente customizados**, com **lógica complexa e integrações profundas** |

✅ **Pendência fechada: o Agent Garden.** Citado sem definição na aula 3.1,
agora definido: **oferece templates pré-construídos** na Agent Platform, no
caminho **low-code**.

> 💡 **O perfil de usuário é o atalho para acertar a questão:**
> **usuário de negócio** → no-code · **cientista de dados/analista** →
> low-code · **desenvolvedor** → pro-code.

📌 **Cuidado para não confundir os dois "Gardens":**

| | **Model Garden** | **Agent Garden** |
|---|---|---|
| **Camada** | foundation models (base) | desenvolvimento (Agent Platform) |
| **Oferece** | **modelos** do Google e de terceiros | **templates pré-construídos** de agentes |
| **Papel** | o **"cérebro"** do agente | o **ponto de partida** low-code |

## Glossário da aula

- **Model Garden** — dá acesso a **foundation models do Google e modelos
  generativos de terceiros**; é o **"cérebro"** do agente. Camada base.
- **Agent Platform** — a camada de **desenvolvimento**; opções **low-code
  ou pro-code**; permite construir agentes **end-to-end, do design ao
  deployment**.
- **Agents CLI** — uma das ferramentas da Agent Platform, ao lado de ADK e
  Agent Studio.
- **Gemini Enterprise app** — o **hub** para **hospedar e construir**
  agentes; **no-code**, para **usuários de negócio e analistas**.
- **Gemini Enterprise for CX** — suíte para **agentes de experiência do
  cliente** em indústrias **customer-facing**.
- **Ease of use** e **flexibility** — os **dois fatores** que guiam a
  escolha de produto; são **inversamente relacionados**.
- **Busca multimodal** — encontra **respostas contextuais e citadas** em
  documentos, imagens e vídeos, numa **única interface**.
- **Agent Designer** — o criador **no-code** de agentes customizados dentro
  do Gemini Enterprise app.
- **Pre-built Google agents** — agentes prontos oferecidos pelo app.
- **Gemini Notebook** — **assistente pessoal de pesquisa**, **companheiro
  de aprendizado e tutor**; em `notebook.google.com`, **grátis**.
- **Agent Studio** — interface **visual low-code** para **projetar loops de
  raciocínio** e **testar prompts**.
- **ADK** — usa **lógica baseada em grafo** para definir como **redes de
  sub-agentes colaboram**. ⚠️ A sigla não é expandida na aula.
- **Agent-to-Agent orchestration** — agentes **delegam tarefas uns aos
  outros**, com padrões **generativos e determinísticos**.
- **Secure workspaces** — ambientes **endurecidos e em sandbox** para
  agentes **gerenciarem arquivos e rodarem comandos**.
- **Agent Runtime** — **implantar, gerenciar e escalar** agentes em
  produção; **cold starts sub-segundo**, **workflows de longa duração**,
  **observabilidade integrada**.
- **Agent Garden** — **templates pré-construídos** de agentes, na Agent
  Platform; caminho **low-code**.
- **Cold start** — o tempo até um serviço ocioso responder; aqui,
  **sub-segundo**.
- **Observabilidade** — capacidade de monitorar o comportamento do sistema
  em produção.

## Flashcards

| Pergunta | Resposta |
|---|---|
| ✅ O que é o **Model Garden**? | Dá acesso a **foundation models do Google e de terceiros**; é o **"cérebro"** do agente |
| ✅ O que é o **Agent Garden**? | **Templates pré-construídos** de agentes, na Agent Platform; caminho **low-code** |
| ⚠️ Model Garden × Agent Garden | **Modelos** (camada base) × **templates de agente** (camada de desenvolvimento) |
| Que produto ocupa a camada de **desenvolvimento**? | **Agent Platform** — low-code ou pro-code |
| Três ferramentas da Agent Platform citadas no início | **ADK**, **Agent Studio** e **Agents CLI** |
| Que produtos ocupam a camada de **aplicação**? | **Gemini Enterprise app** e **Gemini Enterprise for CX** |
| Para que serve o **Gemini Enterprise for CX**? | **Agentes de experiência do cliente** em indústrias customer-facing, como varejo |
| ⭐ Os **dois fatores** que guiam a escolha de produto | **Ease of use** e **flexibility** — inversamente relacionados |
| O que o **Gemini Enterprise app** une? | **IA**, **busca de qualidade Google** e os **dados proprietários da empresa**, num **espaço seguro** |
| As duas palavras-chave da busca do app | Respostas **contextuais** e **citadas** |
| O que é o **Agent Designer**? | O criador **no-code** de agentes customizados dentro do Gemini Enterprise app |
| Três ações típicas dos agentes do app | **Atualizar tickets**, **enviar e-mails**, **analisar relatórios** |
| O que é o **Gemini Notebook**? | **Assistente pessoal de pesquisa**, **companheiro de aprendizado e tutor**; em notebook.google.com, **grátis** |
| ⭐ Os dois gatilhos para sair do no-code | **Integrações profundas** (sistemas legados, bancos internos) e **comportamento customizado** (políticas, tom) |
| O que o **Agent Studio** faz? | Interface **visual low-code** para **projetar loops de raciocínio** e **testar prompts** |
| O que o **ADK** faz? | Usa **lógica baseada em grafo** para definir como **redes de sub-agentes colaboram** |
| O que é **Agent-to-Agent orchestration**? | Agentes **delegam tarefas uns aos outros**, com padrões **generativos e determinísticos** |
| O que são **secure workspaces**? | Ambientes **endurecidos e em sandbox** para **gerenciar arquivos e rodar comandos** |
| O que o **Agent Runtime** faz? | **Implantar, gerenciar e escalar** agentes em produção |
| Três características do Agent Runtime | **Cold starts sub-segundo**, **workflows autônomos de longa duração**, **observabilidade integrada** |
| ⭐ Os três caminhos da árvore de decisão | **Out-of-the-box** (no-code) · **customizable templates** (low-code) · **custom development** (pro-code) |
| Quem usa o caminho **no-code**? | **Usuários de negócio** que precisam de soluções prontas |
| Quem usa o caminho **low-code**? | **Cientistas de dados e analistas** |
| Quem usa o caminho **pro-code**? | **Desenvolvedores** com necessidade de **lógica complexa e integrações profundas** |

## Questões estilo prova

**1.** Uma empresa precisa de um agente que **se integre a bancos de dados
internos legados** e siga **políticas específicas do setor** nas respostas.
Qual caminho?

- A) Gemini Enterprise app (no-code)
- B) Gemini Enterprise for CX
- C) Agent Platform — ADK ou build-your-own (pro-code)
- D) Model Garden

<details><summary>Gabarito</summary>

**C.** São exatamente os **dois gatilhos** que a aula usa para justificar a
subida de camada: **integrações profundas** com sistemas legados e
**comportamento de resposta customizado**. O Gemini Enterprise app *"não
conseguiu acomodar esses requisitos customizados"*. (D) é a camada de
modelos, não de construção.
</details>

**2.** Qual a diferença entre **Model Garden** e **Agent Garden**?

<details><summary>Gabarito</summary>

**Model Garden** fica na **camada base** e dá acesso a **foundation models
do Google e de terceiros** — é o **"cérebro"** do agente. **Agent Garden**
fica na **Agent Platform** (camada de desenvolvimento) e oferece
**templates pré-construídos de agentes**, no caminho **low-code**. Nomes
parecidos, camadas e conteúdos diferentes.
</details>

**3.** Uma analista de dados quer partir de algo pronto, mas ajustar à
realidade dela, sem escrever muito código. Qual caminho e produtos?

- A) Out-of-the-box: Gemini Enterprise app
- B) Customizable templates: Agent Studio e Agent Garden
- C) Custom development: ADK
- D) Model Garden

<details><summary>Gabarito</summary>

**B — customizable templates, o caminho low-code.** A aula diz que é
*"ideal para cientistas de dados e analistas buscando uma base para criar
soluções mais customizadas"*, com **Agent Studio** (ideia → protótipo) e
**Agent Garden** (templates prontos). O **perfil do usuário** no enunciado
é o atalho para a resposta.
</details>

**4.** Quais são os **dois fatores** que, segundo a aula, influenciam a
escolha de produto e a jornada de desenvolvimento?

<details><summary>Gabarito</summary>

**Ease of use** (facilidade de uso) e **flexibility** (flexibilidade). São
**inversamente relacionados**: o Gemini Enterprise app é o mais fácil e o
menos flexível; build-your-own é o oposto.
</details>

**5.** Qual componente da Agent Platform é responsável por **implantar,
gerenciar e escalar** agentes em produção?

- A) Agent Studio
- B) ADK
- C) Agent Runtime
- D) Secure workspaces

<details><summary>Gabarito</summary>

**C — Agent Runtime.** Oferece infraestrutura **gerenciada e de alta
performance**, com **cold starts sub-segundo**, **workflows autônomos de
longa duração** e **observabilidade integrada**. (A) é design e teste; (B)
é a lógica de colaboração entre sub-agentes; (D) é o ambiente sandbox.
</details>

**6.** O que caracteriza a busca do Gemini Enterprise app?

<details><summary>Gabarito</summary>

É **inteligente e multimodal**: encontra **respostas contextuais e
citadas** em **todos os formatos de dados organizacionais** — documentos,
imagens, vídeos — dentro de uma **única interface**. O diferencial é a
resposta ser **citada**, ou seja, apontar a fonte.
</details>

**7.** O que é o **Gemini Notebook**, e onde acessá-lo?

<details><summary>Gabarito</summary>

É um **assistente pessoal de pesquisa de IA** — **companheiro de
aprendizado e tutor de estudos** — que ajuda a entender e extrair insights
de **grandes volumes de informação**. Está em **notebook.google.com**,
**gratuito para o público geral**. É um dos agentes do **Gemini Enterprise
app**.
</details>

**8.** Qual componente permite que agentes **deleguem tarefas uns aos
outros**?

<details><summary>Gabarito</summary>

**Agent-to-Agent orchestration**, usando padrões **generativos e
determinísticos**. É a peça que torna concreta a **agentic AI** descrita na
aula 3.7 — múltiplos agentes coordenados.
</details>

## Dúvidas em aberto / revisar
- ✅ **Pendência fechada: Model Garden** — acesso a foundation models do
  Google e de terceiros; o "cérebro" do agente.
- ✅ **Pendência fechada: Agent Garden** — templates pré-construídos, no
  caminho low-code da Agent Platform.
- ❌ **Chain-of-thought: nunca foi entregue.** Foi nomeado na aula 3.3
  entre as técnicas avançadas de prompting, e **não apareceu em nenhuma
  aula seguinte** (3.4, 3.5, 3.7, 3.8). Esta era a última aula expositiva
  do módulo. **Conclusão: foi menção solta** — saber que existe e que serve
  a cenários complexos basta.
- ⚠️ **A sigla ADK não é expandida na aula.** Não conte com ela numa
  questão de sigla.
- ⚠️ A própria aula avisa que a árvore de decisão **pode mudar conforme os
  produtos evoluem**.

## Ações / próximos passos
| Ação | Prazo |
|---|---|
| Decorar a árvore: no-code (usuário de negócio) → low-code (cientista de dados) → pro-code (dev) | — |
| Não confundir **Model Garden** (modelos) × **Agent Garden** (templates) | — |
| Fixar os dois gatilhos para sair do no-code: integrações profundas e comportamento customizado | — |
| Assistir 3.9 "Summary" para fechar o Módulo 3 | — |
| Depois do 3.9: montar glossário, flashcards e simulado consolidados do módulo | — |
| Testar o Gemini Notebook em notebook.google.com (grátis) | — |

## Fontes
- Transcrição da aula — [[T - 2026-10-09-m03-a08-agent-building-with-google-cloud]]
