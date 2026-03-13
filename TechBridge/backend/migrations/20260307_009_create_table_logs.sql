-- Migration: Criar tabela "logs"
-- Data: 2026-03-08
-- Descrição: Tabela para registrar logs de acesso às rotas da API


-- Mudando o banco atual para o banco TECHBRIDGE
USE TECHBRIDGE;


CREATE TABLE IF NOT EXISTS logs (
    id 					INT 				PRIMARY KEY AUTO_INCREMENT,
    id_usuario 			INT,														-- ID do usuário que fez a requisição
    rota 				VARCHAR(255) 		NOT NULL,								-- Rota pela qual a requisição foi feita
    metodo 				VARCHAR(10) 		NOT NULL,								-- Método da requisição (GET, POST, PATCH ou PUT)
    ip_address 			VARCHAR(45),												-- IP de onde a requisição veio
    user_agent 			TEXT,														--
    status_code 		INT,														-- Status da requisiçao (200, 201, 400, 404, 500 ...)
    tempo_resposta_ms	INT,														-- Tempo entre o recebimento da requisição e a resposta
    data_hora 			DATETIME 			DEFAULT CURRENT_TIMESTAMP,				-- Data e hora da requisição
    dados_requisicao 	JSON,														-- Dados recebidos pela requisição
    dados_resposta 		JSON,														-- Dados enviados como resposta
    
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE SET NULL
);


-- Índices para melhorar performance das consultas
CREATE INDEX idx_logs_id_usuario ON logs(id_usuario);
CREATE INDEX idx_logs_data_hora ON logs(data_hora);
CREATE INDEX idx_logs_rota ON logs(rota);
CREATE INDEX idx_logs_metodo ON logs(metodo);
CREATE INDEX idx_logs_status_code ON logs(status_code);
 