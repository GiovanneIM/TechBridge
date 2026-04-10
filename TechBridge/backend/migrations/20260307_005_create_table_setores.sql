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
    icone			VARCHAR(25)		NOT NULL,
    cor 			VARCHAR(255)	NOT NULL,
    
    -- Chaves estrangeiras
    id_empresa		INT				NOT NULL,						-- ID da empresa à qual o setor pertence
    
    -- Referênciando chaves estrangeiras
    FOREIGN KEY (id_empresa) REFERENCES empresas(id),
    
    -- Impede que uma empresa tenha dois setores com o mesmo código
    UNIQUE (id_empresa, cod_setor)
); 



-- Inserindo setores de exemplo
INSERT INTO setores (nome, descricao, cod_setor, id_empresa, icone, cor)
VALUES 
('Pintura', 'Acabamento', 'PIN', 1, 'PaintRoller', 'bg-linear-to-r from-blue-500 to-indigo-500'),
('Montagem', 'Setor de montagem', 'MON', 1, 'Wrench','bg-linear-to-r from-purple-500 to-purple-600'),
('RH', 'Gestão de pessoas', 'RH', 1, 'BriefcaseBusiness', 'bg-linear-to-r from-teal-500 to-teal-600'),
('GA', 'Logística', 'GA', 1, 'Network', 'bg-linear-to-r from-pink-500 to-pink-600')
;
