-- Migration: Criar tabela "setores"
-- Data: 2025-03-07
-- Descrição: Define os setores das empresas do sistema


-- Mudando o banco atual para o banco TECHBRIDGE
USE TECHBRIDGE;


-- Criando a tabela de setores
CREATE TABLE setores (
	id				INT				AUTO_INCREMENT PRIMARY KEY,
    
    -- Atributos do setor
    cod_setor       VARCHAR(50)     NOT NULL, 						-- Código de identificação (ID) interna na empresa (Definido pela empresa)
    nome			VARCHAR(100)	NOT NULL,						-- Nome do setor
    descricao		VARCHAR(255),									-- Descrição do setor (Opcional)
    
    -- Chaves estrangeiras
    id_empresa		INT				NOT NULL,						-- ID da empresa à qual o setor pertence
    
    -- Referênciando chaves estrangeiras
    FOREIGN KEY (id_empresa) REFERENCES empresas(id),
    
    -- Impede que uma empresa tenha dois setores com o mesmo código
    UNIQUE (id_empresa, cod_setor)
); 



-- Inserindo setores de exemplo
INSERT INTO setores (nome, descricao, cod_setor, id_empresa)
VALUES 
('Pintura', '', 'PIN', 1),
('Montagem', 'Setor de montagem', 'MON', 1)
;
