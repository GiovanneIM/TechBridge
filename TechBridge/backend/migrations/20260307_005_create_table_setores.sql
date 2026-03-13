-- Migration: Criar tabela "setores"
-- Data: 2025-03-07
-- Descrição: Define os setores das empresas do sistema


-- Mudando o banco atual para o banco TECHBRIDGE
USE TECHBRIDGE;


-- Criando a tabela de setores
CREATE TABLE setores (
	id				INT				AUTO_INCREMENT PRIMARY KEY,
    cod_setor       VARCHAR(50)     NOT NULL, -- Código de identificação interna na empresa
    nome			VARCHAR(100)	NOT NULL,
    descricao		VARCHAR(255),
    id_empresa		INT				NOT NULL,
    
    FOREIGN KEY (id_empresa) REFERENCES empresas(id),
    
    -- Impede que uma empresa tenha dois setores com o mesmo código
    UNIQUE (id_empresa, cod_setor)
); 



-- Inserindo setores de exemplo
INSERT INTO setores (nome, descricao, id_empresa)
VALUES 
('Pintura', '', 1),
('Montagem', 'Setor de montagem', 1)
;
