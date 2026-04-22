-- Migration: Criar tabela "empresas"
-- Data: 2025-03-07
-- Descrição: Define as empresas cliente do sistema


-- Mudando o banco atual para o banco TECHBRIDGE
USE TECHBRIDGE;


-- Criando a tabela de empresas
CREATE TABLE empresas (
    id 				INT 			AUTO_INCREMENT PRIMARY KEY,
    
    -- Atributos da empresa
    cnpj			CHAR(14)		NOT NULL UNIQUE,				-- CNPJ da empresa
 	razao_social	VARCHAR(200)	NOT NULL,						-- Nome oficial da empresa
    nome_fantasia	VARCHAR(150) 	NOT NULL,						-- Nome que a empresa usa popularmente
    data_criacao 	TIMESTAMP 		DEFAULT CURRENT_TIMESTAMP,		-- Data em que a empresa foi registrada
    ativo 			BOOLEAN 		NOT NULL DEFAULT TRUE,			-- Status do serviço à empresa (Ativo ou não)
    
    -- Endereço da empresa
    cep 			VARCHAR(9)		NOT NULL,
    rua 			VARCHAR(150) 	NOT NULL,
    numero 			VARCHAR(10) 	NOT NULL,
    complemento 	VARCHAR(100),
    bairro 			VARCHAR(100) 	NOT NULL,
    cidade 			VARCHAR(100) 	NOT NULL,
    estado 			CHAR(2) 		NOT NULL
); 



-- Inserindo empresa cliente de exemplo
INSERT INTO empresas (cnpj, razao_social, nome_fantasia)
VALUES 
	('12345678000190', 'Empresa Cliente 01', 'EC 01')
;