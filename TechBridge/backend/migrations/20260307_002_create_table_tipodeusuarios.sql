-- Migration: Criar tabela "tipos_usuarios"
-- Data: 2025-03-07
-- Descrição: Define os tipos de usuários do sistema


-- Mudando o banco atual para o banco TECHBRIDGE
USE TECHBRIDGE;


-- Criando a tabela de tipos de usuários
CREATE TABLE IF NOT EXISTS tipos_usuarios (
    id 				INT 				AUTO_INCREMENT PRIMARY KEY,
    descricao 		VARCHAR(100) 		NOT NULL UNIQUE
);


-- Inserindo os tipos de usuários
INSERT INTO tipos_usuarios (descricao)
VALUES 
	('admin'),
	('gerente_principal'),
	('gerente'),
	('tecnico')
;
