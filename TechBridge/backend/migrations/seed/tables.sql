
-- Criando o Banco
DROP DATABASE IF EXISTS TECHBRIDGE;
CREATE DATABASE TECHBRIDGE;

-- Mudando o banco atual para o banco TECHBRIDGE
USE TECHBRIDGE;

-- Criando a tabela de tipos de usuários
CREATE TABLE IF NOT EXISTS tipos_usuarios (
    id 				INT 				AUTO_INCREMENT PRIMARY KEY,
    descricao 		VARCHAR(100) 		NOT NULL UNIQUE
);

-- Criando a tabela de empresas
CREATE TABLE empresas (
    id 				INT 			AUTO_INCREMENT PRIMARY KEY,
    data_criacao 	DATETIME 		DEFAULT CURRENT_TIMESTAMP,		-- Data em que a empresa foi registrada
    data_desativacao DATETIME,                                      -- Data em que a empresa foi desativada
    status 			BOOLEAN 		NOT NULL DEFAULT TRUE,			-- Status do serviço à empresa (Ativo ou não)
    
    -- Atributos da empresa
    cnpj			CHAR(14)		NOT NULL UNIQUE,				-- CNPJ da empresa
 	razao_social	VARCHAR(200)	NOT NULL,						-- Nome oficial da empresa
    nome_fantasia	VARCHAR(200) 	NOT NULL,						-- Nome que a empresa usa popularmente
    logo		 	VARCHAR(255),									-- Logo da empresa
    
    -- Endereço da empresa
    cep 			VARCHAR(8),
    rua 			VARCHAR(150),
    numero 			VARCHAR(10),
    complemento 	VARCHAR(100),
    bairro 			VARCHAR(100),
    cidade 			VARCHAR(100),
    estado 			CHAR(2),

    -- Indices
    INDEX idx_empresas_status (status)
); 

-- Criando a tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id 				    INT 			AUTO_INCREMENT PRIMARY KEY,
	data_criacao 	    DATETIME 		DEFAULT CURRENT_TIMESTAMP,		-- Data em que o usuário foi registrado
    data_desativacao    DATETIME,                                       -- Data em que o usuário foi desativado
    status			    BOOLEAN			DEFAULT TRUE,					-- Status do usuário (Conta ativa ou inativa)

    -- Atributos do usuário
    nome			VARCHAR(255) 	NOT NULL,						-- Nome do usuário
    email			VARCHAR(255) 	NOT NULL UNIQUE,				-- E-mail do usuário
    senha			VARCHAR(255) 	NOT NULL,						-- Senha do usuário
    foto_perfil 	VARCHAR(255),									-- Foto de perfil
    bio				VARCHAR(300), 			            			-- Biografia do usuário
    telefone		VARCHAR(15), 					            	-- Número do telefone do usuário (com DDD)
    
    -- Chaves estrangeiras
    tipo_usuario	INT				NOT NULL,						-- Tipo de usuário
    id_empresa		INT,											-- ID da empresa do usuário
    
    -- Referênciando as chaves estrangeiras
    FOREIGN KEY (tipo_usuario) REFERENCES tipos_usuarios(id),
    FOREIGN KEY (id_empresa) REFERENCES empresas(id),

    -- Indices
    INDEX idx_usuarios_empresa (id_empresa),
    INDEX idx_usuarios_ativo (status)
); 

-- Criando a tabela de setores
CREATE TABLE setores (
	id				INT				AUTO_INCREMENT PRIMARY KEY,
    data_criacao 	TIMESTAMP 		DEFAULT CURRENT_TIMESTAMP,
    status			BOOLEAN			DEFAULT TRUE,
    
    -- Atributos do setor
    nome			VARCHAR(150)	NOT NULL,			-- Nome do setor
    cod_setor       VARCHAR(50)     NOT NULL, 			-- Código de identificação (ID) interna na empresa (Definido pela empresa)
    descricao		TEXT,								-- Descrição do setor (Opcional)

    -- Estilização do setor
    icone			VARCHAR(50)		NOT NULL,
    cor		        VARCHAR(50)		NOT NULL,
    
    -- Chaves estrangeiras
    id_empresa		INT				NOT NULL,			-- ID da empresa à qual o setor pertence
    
    -- Referênciando chaves estrangeiras
    FOREIGN KEY (id_empresa) REFERENCES empresas(id),
    
    -- Impede que uma empresa tenha dois setores com o mesmo código
    UNIQUE (id_empresa, cod_setor),

    -- Indices
    INDEX idx_setores_ativos (status)
);

-- Criando a tabela de maquinas
CREATE TABLE IF NOT EXISTS maquinas (
	id				INT				AUTO_INCREMENT PRIMARY KEY,
    data_criacao 	TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    status 			ENUM('ativa', 'inativa', 'em_manutencao', 'arquivada') 		DEFAULT 'ativa',
    
    -- Atributos da máquina
    cod_maquina		VARCHAR(50)		NOT NULL, 						-- Codigo de identificação (ID) interna no setor
    nome 			VARCHAR(150) 	NOT NULL,						-- Nome da máquina
    descricao		TEXT        	NOT NULL,						-- Descrição da máquina
    foto 			VARCHAR(255),									-- Foto da máquina
    
    -- Chaves estrangeiras
    id_setor		INT				NOT NULL, 						-- ID do setor ao qual a máquina pertence

	-- Referênciando as chaves estrangeiras
    FOREIGN KEY (id_setor) REFERENCES setores(id),

    -- Impede que um setor tenha duas maquinas com o mesmo código
    UNIQUE (id_setor, cod_maquina),

    -- Indices
    INDEX idx_maquinas_status (status)
); 

-- Criando a tabela de causas
CREATE TABLE IF NOT EXISTS causas (
	id				INT				AUTO_INCREMENT PRIMARY KEY,
    
    -- Atributos da causa
    descricao		VARCHAR(100)	NOT NULL,			-- Descrição do problema
    
    -- Chaves estrangeiras
    id_empresa		INT				NOT NULL,			-- ID da empresa à qual a causa pertence
    
    -- Referênciando as chaves estrangeiras
    FOREIGN KEY (id_empresa) REFERENCES empresas(id),
    
    -- Impede que uma empresa tenha duas causas com a mesma descrição
    UNIQUE (descricao, id_empresa)
); 

-- Criando a tabela de chamados
CREATE TABLE chamados (
    -- Criados automaticamente no momento da criação
	id						INT				AUTO_INCREMENT PRIMARY KEY, 			-- ID do chamado, identificador geral
    estado					ENUM('aberto', 'andamento', 'concluido') 
                            NOT NULL DEFAULT 'aberto',                  			-- Status para controle da situação do chamado
    datahora_abertura		TIMESTAMP 		DEFAULT CURRENT_TIMESTAMP,				-- Data e hora em que o chamado é registrado

    -- Recebidos no momento da criação
    id_empresa              INT             NOT NULL,       -- ID da empresa 
    id_setor				INT			 	NOT NULL,		-- ID do setor
    id_maquina				INT			 	NOT NULL,		-- ID da máquina para qual o chamado foi feito
    cod_chamado             INT             NOT NULL,       -- Código do chamado em relação à màquina para identificação do chamado internamente
    
    -- Recebidos no momento em que o chamado é aceito pelo técnico
    id_tecnico				INT,					    	-- ID do técnico que está atendeu o chamado
    datahora_atendimento	TIMESTAMP		NULL,	    	-- Data e hora em que o técnico inicia o atendimento
    
    -- Recebidos no momento em que o chamado é concluído pelo técnico
    id_causa				INT,					    	-- ID da causa do problema
    descricao_problema 		TEXT,					    	-- Campo para que o técnico relate o problema
	solucao_aplicada 		TEXT,					    	-- Campo para que o técnico relate a solução
    comentario_tecnico 		TEXT,					    	-- Campo para comentário adicional do técnico
    operador				VARCHAR(100),				    -- Identificar o operador (Opcional)
    datahora_conclusao		TIMESTAMP		NULL,		    -- Data e hora do fechamento do chamado
    
    -- Chaves estrangeiras
    FOREIGN KEY (id_empresa) REFERENCES empresas(id),
    FOREIGN KEY (id_setor) REFERENCES setores(id),
    FOREIGN KEY (id_maquina) REFERENCES maquinas(id),
    FOREIGN KEY (id_tecnico) REFERENCES usuarios(id),
    FOREIGN KEY (id_causa) REFERENCES causas(id),

    -- Impede que seja criado um chamado com o mesmo código para a máquina
    UNIQUE (cod_chamado, id_maquina),

    -- Índices para melhorar performance das consultas
    INDEX idx_chamados_empresa (id_empresa),
    INDEX idx_chamados_setor (id_setor),
    INDEX idx_chamados_maquina (id_maquina),
    INDEX idx_chamados_tecnico (id_tecnico),
    INDEX idx_chamados_estado (estado)
);

-- Criando a tabela de logs
CREATE TABLE IF NOT EXISTS logs (
	-- Atributos dos logs
    id 					INT 				PRIMARY KEY AUTO_INCREMENT,
    id_usuario 			INT,														-- ID do usuário que fez a requisição
    rota 				VARCHAR(255) 		NOT NULL,								-- Rota pela qual a requisição foi feita
    metodo 				VARCHAR(10) 		NOT NULL,								-- Método da requisição (GET, POST, PATCH ou PUT)
    ip_address 			VARCHAR(45),												-- IP de onde a requisição veio
    user_agent 			TEXT,														-- User Agent (Identifica quem fez a requisição)
    status_code 		INT,														-- Status da requisiçao (200, 201, 400, 404, 500 ...)
    tempo_resposta_ms	INT,														-- Tempo entre o recebimento da requisição e a resposta
    data_hora 			DATETIME 			DEFAULT CURRENT_TIMESTAMP,				-- Data e hora da requisição
    dados_requisicao 	JSON,														-- Dados recebidos pela requisição
    dados_resposta 		JSON,														-- Dados enviados como resposta
    
    -- Referênciando chaves estrangeiras
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE SET NULL,
    
    
    -- Índices para melhorar performance das consultas
	INDEX idx_logs_id_usuario (id_usuario),
	INDEX idx_logs_data_hora (data_hora),
	INDEX idx_logs_rota (rota),
	INDEX idx_logs_metodo (metodo),
	INDEX idx_logs_status_code (status_code)
);