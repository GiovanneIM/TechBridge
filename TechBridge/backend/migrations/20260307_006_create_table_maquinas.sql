-- Migration: Criar tabela "maquinas"
-- Data: 2025-03-07
-- Descrição: Define as maquinas dos setores das empresas do sistema


-- Mudando o banco atual para o banco TECHBRIDGE
USE TECHBRIDGE;


-- Criando a tabela de maquinas
CREATE TABLE maquinas (
	id				INT				AUTO_INCREMENT PRIMARY KEY,
    codigo			VARCHAR(50)		NOT NULL,
    descricao		VARCHAR(255)	NOT NULL,
    id_setor		INT				NOT NULL,
    
    FOREIGN KEY (id_setor) REFERENCES setores(id),
    
    UNIQUE (codigo, id_setor)
); 


-- Inserindo as maquinas base
INSERT INTO maquinas (codigo, descricao, id_setor)
VALUES 
('MK-1', 'Máquina 1 do setor 1', 1),
('MK-2', 'Máquina 2 do setor 1', 1),
('MK-1', 'Máquina 1 do setor 2', 2)
;