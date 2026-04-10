-- Migration: Criar tabela "chamados"
-- Data: 2025-03-07
-- Descrição: Define os chamados do sistema


-- Mudando o banco atual para o banco TECHBRIDGE
USE TECHBRIDGE;

DROP TABLE if exists chamados;
-- Criando a tabela de chamados
CREATE TABLE chamados (
    -- Criados automaticamente no momento da criação
	id						INT				AUTO_INCREMENT PRIMARY KEY, 			-- ID do chamado, identificador geral
    estado					ENUM('aberto', 'andamento', 'concluido') 
                            NOT NULL DEFAULT 'aberto',                  			-- Status para controle da situação do chamado
    datahora_abertura		TIMESTAMP 		DEFAULT CURRENT_TIMESTAMP,				-- Data e hora em que o chamado é registrado

    -- Recebidos no momento da criação
    id_empresa              INT             NOT NULL,       -- ID da empresa 
    id_setor				INT			 	NOT NULL,		-- ID do setor
    id_maquina				INT			 	NOT NULL,		-- ID da máquina para qual o chamado foi feito
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
    FOREIGN KEY (id_setor) REFERENCES setores(id),
    FOREIGN KEY (id_maquina) REFERENCES maquinas(id),
    FOREIGN KEY (id_tecnico) REFERENCES usuarios(id),
    FOREIGN KEY (id_causa) REFERENCES causas(id),

    -- Impede que seja criado um chamado com o mesmo código para a máquina
    UNIQUE (cod_chamado, id_maquina),

    -- Índices para melhorar performance das consultas
    INDEX idx_chamados_empresa (id_empresa),
    INDEX idx_chamados_setor (id_setor),
    INDEX idx_chamados_maquina (id_maquina),
    INDEX idx_chamados_tecnico (id_tecnico),
    INDEX idx_chamados_estado (estado)
);



-- Criando chamados
INSERT INTO chamados (datahora_abertura, id_empresa, id_setor, id_maquina, cod_chamado)
VALUES 
(DATE_SUB(NOW(), INTERVAL 1 DAY), 1, 1, 1, 1),
(DATE_SUB(NOW(), INTERVAL 1 DAY), 1, 1, 1, 2),
(DATE_SUB(NOW(), INTERVAL 1 DAY), 1, 1, 2, 1);

INSERT INTO chamados (id_empresa, id_setor, id_maquina, cod_chamado)
VALUES 
(1, 1, 1, 3),
(1, 1, 1, 4),
(1, 1, 2, 2);

INSERT INTO chamados (datahora_abertura, id_empresa, id_setor, id_maquina, cod_chamado)
VALUES 
(DATE_SUB(NOW(), INTERVAL 10 DAY), 1, 1, 1, 7);

INSERT INTO chamados (datahora_abertura, id_empresa, id_setor, id_maquina, cod_chamado)
VALUES 
(DATE_SUB(NOW(), INTERVAL 10 DAY), 1, 1, 1, 6);

-- Atendendo chamados
UPDATE chamados    
SET 
    estado = 'andamento',
    id_tecnico = 3,
    datahora_atendimento = DATE_ADD(NOW(), INTERVAL 1 DAY_HOUR)
WHERE id % 4 > 1 OR id % 4 = 0 ;

-- Concluindo chamados
UPDATE chamados    
SET 
    estado = 'concluido',
    id_causa = 1,
    datahora_conclusao = DATE_ADD(NOW(), INTERVAL 2 DAY_HOUR ),
    operador = "25170154"
WHERE id % 4 > 2 OR id % 4 = 0 ;