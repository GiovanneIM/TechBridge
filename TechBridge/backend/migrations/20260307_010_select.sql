-- Migration: Selecionar tabelas
-- Data: 2026-03-08
-- Descrição: Seleciona as tabelas para visualisação


-- Mudando o banco atual para o banco TECHBRIDGE
USE TECHBRIDGE;


-- Selecionando as tabelas do banco
-- SELECT * FROM tipos_usuarios;
SELECT * FROM empresas;
SELECT * FROM usuarios;
SELECT * FROM setores;
SELECT * FROM maquinas;
SELECT * FROM causas;
SELECT * FROM chamados;
SELECT * FROM logs;

-- Chamados por estado
SELECT estado, count(*) AS total
FROM chamados
GROuP BY estado;

-- Chamados por setor
SELECT s.nome, COUNT(c.id) AS total
FROM setores s
LEFT JOIN chamados c ON s.id = c.id_setor
GROUP BY s.nome;

-- Tempo médio de espera
SELECT AVG(
    TIMESTAMPDIFF(SECOND, datahora_abertura, datahora_atendimento)
) AS tempo_medio_espera
FROM chamados
WHERE datahora_atendimento IS NOT NULL;

-- Tempo médio de atendimento
SELECT AVG(
    TIMESTAMPDIFF(SECOND, datahora_atendimento, datahora_conclusao)
) AS tempo_medio_atendimento
FROM chamados
WHERE datahora_conclusao IS NOT NULL;

-- Chamados por dia
SELECT data,
       SUM(abertos) as abertos,
       SUM(atendidos) as atendidos,
       SUM(concluidos) as concluidos
FROM (
    SELECT DATE(datahora_abertura) as data, COUNT(*) as abertos, 0 as atendidos, 0 as concluidos
    FROM chamados
    GROUP BY DATE(datahora_abertura)

    UNION ALL

    SELECT DATE(datahora_atendimento), 0, COUNT(*), 0
    FROM chamados
    WHERE datahora_atendimento IS NOT NULL
    GROUP BY DATE(datahora_atendimento)

    UNION ALL

    SELECT DATE(datahora_conclusao), 0, 0, COUNT(*)
    FROM chamados
    WHERE datahora_conclusao IS NOT NULL
    GROUP BY DATE(datahora_conclusao)
) as dados
GROUP BY data
ORDER BY data;

SELECT *
FROM chamados c
INNER JOIN setores s on s.id = c.id_setor
INNER JOIN maquinas m on m.id = c.id_maquina
INNER JOIN usuarios u on u.id = c.id_tecnico;

SELECT 
	c.estado, 
	TIMESTAMPDIFF(MINUTE, datahora_abertura, NOW()) as temp_espera,
    s.nome as nome_setor,
    m.nome as nome_maquina,
    u.nome as nome_tecnico
FROM chamados c
INNER JOIN setores s on s.id = c.id_setor
INNER JOIN maquinas m on m.id = c.id_maquina
LEFT JOIN usuarios u on u.id = c.id_tecnico;
    
    
delete from chamados;