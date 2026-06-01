-- USUARIOS
SELECT 
    COUNT(*) AS total,
    COUNT(CASE WHEN status = true THEN 1 END) AS ativos,
    COUNT(CASE WHEN tipo_usuario = 2 OR tipo_usuario = 3 THEN 1 END) AS gerentes,
    COUNT(CASE WHEN tipo_usuario = 4 THEN 1 END) AS tecnicos
FROM usuarios
WHERE id_empresa = 2;

-- GERENTE DA EMPRESA
SELECT *
FROM usuarios
WHERE id_empresa = 2 AND tipo_usuario = 2;

-- SETORES
SELECT 
    COUNT(*) AS total,
    COUNT(CASE WHEN status = TRUE THEN 1 END) AS ativos,
    COUNT(CASE WHEN status = FALSE THEN 1 END) AS inativos
FROM setores
WHERE id_empresa = 2;

-- MAQUINAS
SELECT 
    COUNT(*) AS total,
    COUNT(CASE WHEN m.status = 'ativa' THEN 1 END) AS ativas,
    COUNT(CASE WHEN m.status = 'inativa' THEN 1 END) AS inativas
FROM maquinas m
INNER JOIN setores s ON s.id = m.id_setor
WHERE id_empresa = 2;

-- CHAMADOS
SELECT 
    COUNT(*) AS total,
    COUNT(CASE WHEN estado = 'aberto' THEN 1 END) AS aguardando,
    COUNT(CASE WHEN estado = 'andamento' THEN 1 END) AS andamento,
    COUNT(CASE WHEN estado = 'concluido' THEN 1 END) AS concluidos
FROM chamados
WHERE id_empresa = 2;

-- ULTIMOS CHAMADOS
SELECT * FROM chamados c
INNER JOIN maquinas m on c.id_maquina = m.id
INNER JOIN setores s on c.id_setor = s.id
WHERE id_empresa = 2
ORDER BY datahora_abertura
LIMIT 5;

