-- Migration: Criar tabela "empresas"
-- Data: 2025-03-07
-- Descrição: Define as empresas cliente do sistema


-- Mudando o banco atual para o banco TECHBRIDGE
USE TECHBRIDGE;


-- Criando a tabela de empresas
CREATE TABLE empresas (
    id 				INT 			AUTO_INCREMENT PRIMARY KEY,
    cnpj			CHAR(14)		NOT NULL UNIQUE,
 	razao_social	VARCHAR(200)	NOT NULL,
    nome_fantasia	VARCHAR(150) 	NOT NULL,
    data_criacao 	TIMESTAMP 		DEFAULT CURRENT_TIMESTAMP,
    ativo 			BOOLEAN 		NOT NULL DEFAULT TRUE
); 


-- Inserindo as empresas clientes base
INSERT INTO empresas (cnpj, razao_social, nome_fantasia)
VALUES 
('12345678000190', 'Empresa Cliente 01', 'EC 01');