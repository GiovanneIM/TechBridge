-- Migration: Criar tabela "usuarios"
-- Data: 2025-03-07
-- Descrição: Define os tipos de usuários do sistema


-- Mudando o banco atual para o banco TECHBRIDGE
USE TECHBRIDGE;


-- Criando a tabela de tipos de usuários
CREATE TABLE usuarios (
    id 			INT 			AUTO_INCREMENT PRIMARY KEY,
    nome		VARCHAR(100) 	NOT NULL,
    email		VARCHAR(255) 	NOT NULL UNIQUE,
    senha		VARCHAR(255) 	NOT NULL,
    foto_perfil VARCHAR(255)	DEFAULT 'https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg',
    tipo		VARCHAR(50)		NOT NULL,
    id_empresa	INT,
    
    FOREIGN KEY (id_empresa) REFERENCES empresas(id)
); 


-- Inserindo os usuarios base
INSERT INTO usuarios (nome, email, senha, tipo, id_empresa)
VALUES 
('Admin TechBridge', 'admin@tb.com', '$2a$10$BLAcJu1irAzg06WbtoLoPe0RA.hkfZ0oJ25KYARPkHWRweJuWBALy', 'admin_techbridge', null),
('Admin Cliente', 'admcliente@email.com', '$2a$10$BLAcJu1irAzg06WbtoLoPe0RA.hkfZ0oJ25KYARPkHWRweJuWBALy', 'admin_client', 1),
('Tecnico Cliente', 'tecnico@email.com', '$2a$10$BLAcJu1irAzg06WbtoLoPe0RA.hkfZ0oJ25KYARPkHWRweJuWBALy', 'tecnico', 1)
;
