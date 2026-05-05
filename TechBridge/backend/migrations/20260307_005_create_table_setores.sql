-- Migration: Criar tabela "setores"
-- Data: 2025-03-07
-- Descrição: Define os setores das empresas do sistema


-- Mudando o banco atual para o banco TECHBRIDGE
USE TECHBRIDGE;


-- Criando a tabela de setores
CREATE TABLE setores (
	id				INT				AUTO_INCREMENT PRIMARY KEY,
    data_criacao 	TIMESTAMP 		DEFAULT CURRENT_TIMESTAMP,
    status			BOOLEAN			DEFAULT TRUE,
    
    -- Atributos do setor
    cod_setor       VARCHAR(50)     NOT NULL, 			-- Código de identificação (ID) interna na empresa (Definido pela empresa)
    nome			VARCHAR(150)	NOT NULL,			-- Nome do setor
    descricao		TEXT,								-- Descrição do setor (Opcional)

    -- Estilização do setor
    icone			VARCHAR(50)		NOT NULL,
    
    -- Chaves estrangeiras
    id_empresa		INT				NOT NULL,			-- ID da empresa à qual o setor pertence
    
    -- Referênciando chaves estrangeiras
    FOREIGN KEY (id_empresa) REFERENCES empresas(id),
    
    -- Impede que uma empresa tenha dois setores com o mesmo código
    UNIQUE (id_empresa, cod_setor),

    -- Indices
    INDEX idx_setores_ativos (status)
); 



-- Inserindo setores de exemplo
INSERT INTO setores (nome, descricao, cod_setor, id_empresa, icone)
VALUES 
('Pintura', 'Acabamento', 'PIN', 1, 'PaintRoller'),
('Montagem', 'Setor de montagem', 'MON', 1, 'Wrench'),
('RH', 'Gestão de pessoas', 'RH', 1, 'BriefcaseBusiness'),
('GA', 'Logística', 'GA', 1, 'Network')
;
