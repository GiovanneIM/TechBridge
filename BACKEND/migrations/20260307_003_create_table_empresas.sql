-- Migration: Criar tabela "empresas"
-- Data: 2025-03-07
-- Descrição: Define as empresas cliente do sistema


-- Mudando o banco atual para o banco TECHBRIDGE
USE TECHBRIDGE;


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
    logo            VARCHAR(255)    NOT NULL,                       -- Logo da empresa

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



-- Inserindo empresa cliente de exemplo
INSERT INTO empresas (cnpj, razao_social, nome_fantasia)
VALUES 
    ('00000000000000', 'TechBridge - Softwares e Hardwares para Andons', 'TechBridge'),
	('12345678000190', 'Empresa Cliente 01', 'EC 01')
;

INSERT INTO empresas (cnpj, razao_social, nome_fantasia)
VALUES 
    ('00000000000011', 'TechBridge - Softwares e Hardwares para Andons', 'TechBridge')
;

UPDATE empresas SET status = 0 WHERE id = 4;


INSERT INTO empresas (cnpj, razao_social, nome_fantasia)
VALUES 
    ('50000000000000', 'TechBridge - Softwares e Hardwares para Andons', 'TechBridge'),
	('62345678000190', 'Empresa Cliente 01', 'EC 01')
;
INSERT INTO empresas (cnpj, razao_social, nome_fantasia)
VALUES 
    ('60000000000000', 'TechBridge - Softwares e Hardwares para Andons', 'TechBridge'),
	('72345678000190', 'Empresa Cliente 01', 'EC 01')
;
INSERT INTO empresas (cnpj, razao_social, nome_fantasia)
VALUES 
    ('70000000000000', 'TechBridge - Softwares e Hardwares para Andons', 'TechBridge'),
	('82345678000190', 'Empresa Cliente 01', 'EC 01')
;
INSERT INTO empresas (cnpj, razao_social, nome_fantasia)
VALUES 
    ('80000000000000', 'TechBridge - Softwares e Hardwares para Andons', 'TechBridge'),
	('92345678000190', 'Empresa Cliente 01', 'EC 01')
;