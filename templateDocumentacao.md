# TEMPLATE DE DOCUMENTAÇÃO – PROJETO DE SOFTWARE (TCC)

## 1. Identificação do Projeto

**Nome do Sistema:**

**Grupo:**

**Integrantes:**

**Professor Orientador:**

**Data:**

---

## 2. Visão Geral do Produto

### 2.1 Problema

Descreva qual problema real o sistema pretende resolver.

*(Não é a ideia do sistema. É a dor do usuário.)*

Exemplo correto:

> Atualmente o controle de ferramentas do setor de manutenção é feito em papel, causando perda de itens e falta de rastreabilidade.
> 

---

### 2.2 Objetivo do Sistema

Explique o que o sistema fará para resolver o problema.

> O sistema permitirá registrar retirada e devolução de ferramentas, identificando o responsável e mantendo histórico.
> 

---

### 2.3 Público-Alvo (Usuários)

Liste quem utilizará o sistema:

| Tipo de Usuário | Descrição |
| --- | --- |
| Técnico | Realiza operações do dia a dia |
| Gestor | Acompanha relatórios |
| Administrador | Gerencia cadastros |

---

### 2.4 Benefícios Esperados

- Redução de erros
- Rastreabilidade
- Automação de processos
- Melhoria na tomada de decisão

---

## 3. Escopo do Sistema

### 3.1 O que o sistema FARÁ (dentro do projeto)

Lista clara do que está incluído.

Ex:

- Cadastro de usuários
- Registro de leituras IoT
- Dashboard de monitoramento
- Alertas

### 3.2 O que o sistema NÃO FARÁ (fora do projeto)

Isto evita TCC impossível.

Ex:

- Integração com ERP real
- Controle financeiro completo
- Aplicativo para iOS

---

## 4. Personas (Usuários fictícios)

Crie ao menos **2 personas**.

**Persona 1 – Técnico de Manutenção**

- Idade:
- Conhecimento em tecnologia:
- Objetivo:
- Dificuldade atual:

**Persona 2 – Gestor**

- Idade:
- Objetivo:
- O que ele precisa ver no sistema:

---

## 5. Requisitos Funcionais (RF)

(Use código RF01, RF02…)

| Código | Descrição |
| --- | --- |
| RF01 | O sistema deve permitir cadastro de usuários |
| RF02 | O sistema deve registrar leituras de sensores |
| RF03 | O sistema deve exibir dashboard de monitoramento |
| RF04 | O sistema deve gerar alertas |

*(mínimo 15 — máximo 30)*

---

## 6. Regras de Negócio (RN)

São **condições obrigatórias do funcionamento**.

| Código | Regra |
| --- | --- |
| RN01 | Um item não pode ser retirado se já estiver emprestado |
| RN02 | Apenas administradores podem excluir usuários |
| RN03 | Leituras inválidas devem ser descartadas |

*(geralmente 5 a 12)*

---

## 7. Requisitos Não Funcionais (RNF)

Como o sistema deve se comportar.

| Código | Descrição |
| --- | --- |
| RNF01 | O sistema deve exigir login |
| RNF02 | Os dados devem ser armazenados em banco de dados |
| RNF03 | O sistema deve registrar logs |
| RNF04 | O tempo de resposta deve ser inferior a 3 segundos |

---

## 8. Casos de Uso (principais)

Liste os principais:

- Realizar login
- Cadastrar usuário
- Registrar leitura IoT
- Visualizar dashboard
- Atender alerta

*(5 a 8 apenas — não mais que isso!)*

---

## 9. Modelagem do Sistema

### 9.1 Diagrama de Casos de Uso

(Inserir imagem)

### 9.2 Diagrama de Classes

(Inserir imagem)

### 9.3 Modelo de Dados (DER)

(Inserir imagem do banco)

---

## 10. Arquitetura do Sistema

Descreva como o sistema funciona:

> O dispositivo IoT envia dados para a API Web.
> 
> 
> A API armazena no banco de dados.
> 
> O sistema Web exibe dashboards.
> 
> O aplicativo mobile consulta a API.
> 

(Colocar um diagrama simples)

---

## 11. Plano de Testes

| Caso | Ação | Resultado Esperado |
| --- | --- | --- |
| CT01 | Realizar login válido | Acesso permitido |
| CT02 | Login inválido | Mensagem de erro |
| CT03 | Registrar leitura | Dados armazenados |
| CT04 | Gerar alerta | Alerta exibido |

*(mínimo 10 casos de teste)*

---

## 12. Tecnologias Utilizadas

- Linguagem Web:
- Banco de Dados:
- Framework:
- Mobile:
- IoT:
- Protocolo de comunicação:

---

## 13. Cronograma (Simples)

(Exigir isso é MUITO importante)