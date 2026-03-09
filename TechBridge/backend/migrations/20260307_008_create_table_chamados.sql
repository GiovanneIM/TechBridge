-- Migration: Criar tabela "chamados"
-- Data: 2025-03-07
-- Descrição: Define os chamados do sistema


-- Mudando o banco atual para o banco TECHBRIDGE
USE TECHBRIDGE;


-- Criando a tabela de chamados
CREATE TABLE chamados (
	-- Definidos no momento da criação
	id						INT				AUTO_INCREMENT PRIMARY KEY,
    estado					ENUM('aberto', 'andamento', 'concluido', 'cancelado')		NOT NULL DEFAULT 'aberto',	-- 
    
    id_maquina				INT			 	NOT NULL ,					-- ID da máquina para qual o chamado foi feito
    datahora_abertura		TIMESTAMP 		DEFAULT CURRENT_TIMESTAMP,	-- Data e hora em que o chamado é registrado
    
    -- Definidos no momento em que o chamado é aceito pelo técnico
    id_tecnico				INT,						-- ID do técnico que está atendeu o chamado
    datahora_atendimento	TIMESTAMP		NULL,		-- Data e hora em que o técnico inicia o atendimento
    
    -- Definidos no momento em que o chamado é concluído pelo técnico
    id_causa				INT,						-- ID da causa do problema
    descricao_problema 		TEXT,						-- Campo para que o técnico relate o problema
	solucao_aplicada 		TEXT,						-- Campo para que o técnico relate a solução
    comentario_tecnico 		TEXT,						-- Campo para comentário adicional do técnico
    operador				VARCHAR(100),				-- Identificar o operador (Opcional)
    datahora_conclusao		TIMESTAMP		NULL,		-- Data e hora do fechamento do chamado
    
    FOREIGN KEY (id_maquina) REFERENCES maquinas(id),
    FOREIGN KEY (id_tecnico) REFERENCES usuarios(id),
    FOREIGN KEY (id_causa) REFERENCES causas(id)
); 

