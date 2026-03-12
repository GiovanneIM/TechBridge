-- Migration: Criar tabela "chamados"
-- Data: 2025-03-07
-- Descrição: Define os chamados do sistema


-- Mudando o banco atual para o banco TECHBRIDGE
USE TECHBRIDGE;


-- Criando a tabela de chamados
CREATE TABLE chamados (
    -- Criados automaticamente no momento da criação
	id						INT				AUTO_INCREMENT PRIMARY KEY, -- ID do chamado, identificador geral
    estado					ENUM('aberto', 'andamento', 'concluido', 'cancelado') 
                            NOT NULL DEFAULT 'aberto',                  -- Status para controle da situação do chamado
    datahora_abertura		TIMESTAMP 		DEFAULT CURRENT_TIMESTAMP,	-- Data e hora em que o chamado é registrado

    -- Recebidos no momento da criação
    id_empresa              INT             NOT NULL,       -- ID da empresa 
    id_maquina				INT			 	NOT NULL ,		-- ID da máquina para qual o chamado foi feito
    cod_chamado             INT             NOT NULL,       -- Código do chamado em relação à màquina para identificação do chamado internamente
    
    -- Recebidos no momento em que o chamado é aceito pelo técnico
    id_tecnico				INT,					    	-- ID do técnico que está atendeu o chamado
    datahora_atendimento	TIMESTAMP		NULL,	    	-- Data e hora em que o técnico inicia o atendimento
    
    -- Recebidos no momento em que o chamado é concluído pelo técnico
    id_causa				INT,					    	-- ID da causa do problema
    descricao_problema 		TEXT,					    	-- Campo para que o técnico relate o problema
	solucao_aplicada 		TEXT,					    	-- Campo para que o técnico relate a solução
    comentario_tecnico 		TEXT,					    	-- Campo para comentário adicional do técnico
    operador				VARCHAR(100),				    -- Identificar o operador (Opcional)
    datahora_conclusao		TIMESTAMP		NULL,		    -- Data e hora do fechamento do chamado
    
    -- Chaves estrangeiras
    FOREIGN KEY (id_empresa) REFERENCES empresas(id),
    FOREIGN KEY (id_maquina) REFERENCES maquinas(id),
    FOREIGN KEY (id_tecnico) REFERENCES usuarios(id),
    FOREIGN KEY (id_causa) REFERENCES causas(id),

    -- Impede que seja criado um chamado com o mesmo código para a máquina
    UNIQUE (cod_chamado, id_maquina)

    -- Índices para melhorar consultas
    INDEX idx_chamados_empresa (id_empresa),
    INDEX idx_chamados_maquina (id_maquina),
    INDEX idx_chamados_tecnico (id_tecnico),
    INDEX idx_chamados_estado (estado)
);


INSERT INTO maquinas (codigo, descricao, id_setor)
VALUES 
('MK-1', 'Máquina 1 do setor 1', 1),
('MK-2', 'Máquina 2 do setor 1', 1),
('MK-1', 'Máquina 1 do setor 2', 2)
;