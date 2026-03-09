-- Migration: Criar tabela "causas"
-- Data: 2025-03-07
-- Descrição: Define as causas de problemas das empresas do sistema


-- Mudando o banco atual para o banco TECHBRIDGE
USE TECHBRIDGE;


-- Criando a tabela de causas
CREATE TABLE causas (
	id				INT				AUTO_INCREMENT PRIMARY KEY,
    descricao		VARCHAR(100)	NOT NULL,
    id_empresa		INT				NOT NULL,
    
    FOREIGN KEY (id_empresa) REFERENCES empresas(id),
    
    UNIQUE (descricao, id_empresa)
); 


-- Inserindo as causas base
INSERT INTO causas (descricao, id_empresa)
VALUES 
('Quebra de peça', 1),
('Falta de óleo', 1)
;