-- Migration: Criar tabela "maquinas"
-- Data: 2025-03-07
-- Descrição: Define as maquinas dos setores das empresas do sistema


-- Mudando o banco atual para o banco TECHBRIDGE
USE TECHBRIDGE;


-- Criando a tabela de maquinas
CREATE TABLE maquinas (
	id				INT				AUTO_INCREMENT PRIMARY KEY,
    
    -- Atributos da máquina
    cod_maquina		VARCHAR(50)		NOT NULL, 						-- Codigo de identificação (ID) interna no setor
    nome 			VARCHAR(100) 	NOT NULL,						-- Nome da máquina
    descricao		VARCHAR(255)	NOT NULL,						-- Descrição da máquina
    foto 			VARCHAR(255),									-- Foto da máquina
    ativo 			BOOLEAN 		DEFAULT TRUE,					-- Status da máquina (Ativa ou Inativa)
    
    -- Chaves estrangeiras
    id_setor		INT				NOT NULL, 						-- ID do setor ao qual a máquina pertence

	-- Referênciando as chaves estrangeiras
    FOREIGN KEY (id_setor) REFERENCES setores(id),

    -- Impede que um setor tenha duas maquinas com o mesmo código
    UNIQUE (id_setor, cod_maquina)
); 



-- Inserindo maquinas de exemplo
INSERT INTO maquinas (cod_maquina, nome, descricao, id_setor)
VALUES 
('MK-1', 'Máquina 1', 'Máquina 1 do setor 1', 1),
('MK-2', 'Máquina 2', 'Máquina 2 do setor 1', 1),
('MK-1', 'Máquina 1', 'Máquina 1 do setor 2', 2)
;