-- Mudando o banco atual para o banco TECHBRIDGE
USE TECHBRIDGE;

-- Inserindo os tipos de usuários
INSERT INTO tipos_usuarios (descricao)
VALUES 
	('admin'),
	('gerente_principal'),
	('gerente'),
	('tecnico')
;


-- Inserindo empresa cliente de exemplo
INSERT INTO empresas (cnpj, razao_social, nome_fantasia)
VALUES 
    ('00000000000000', 'TechBridge - Softwares e Hardwares para Andons', 'TechBridge'),
	('12345678000190', 'Empresa Cliente 01', 'EC 01'),
    ('00000000000011', 'Empresa Cliente 02', 'EC 02')
;
UPDATE empresas SET status = 0 WHERE id = 3;


-- Inserindo os usuários de exemplo
INSERT INTO usuarios 
(nome, email, senha, tipo_usuario, id_empresa, telefone, bio)
VALUES 
    (
    'Kim Minji', 
    'admin@tb.com', 
    '$2a$10$BLAcJu1irAzg06WbtoLoPe0RA.hkfZ0oJ25KYARPkHWRweJuWBALy', 
    1, 
    1, 
    '(11) 95989-9539', 
    'Administradora de sistemas com foco em organização, segurança e eficiência operacional. Atua garantindo o bom funcionamento das plataformas e suporte estratégico para a equipe.'
    ),
    (
    'Poliwag Gomez', 
    'gerentePrincipal@email.com', 
    '$2a$10$BLAcJu1irAzg06WbtoLoPe0RA.hkfZ0oJ25KYARPkHWRweJuWBALy', 
    2, 
    2, 
    '(11) 98921-8798', 
    'Gerente de produção experiente, especializado em otimização de processos e liderança de equipes. Trabalha para aumentar a produtividade e garantir a qualidade nas entregas.'
    ),
    (
    'The Rock', 
    'gerente@email.com', 
    '$2a$10$BLAcJu1irAzg06WbtoLoPe0RA.hkfZ0oJ25KYARPkHWRweJuWBALy', 
    3, 
    2, 
    '(11) 97548-1367', 
    'Técnico de campo dedicado, com habilidade em manutenção e resolução de problemas. Comprometido em oferecer suporte ágil e eficaz diretamente no ambiente operacional.'
    ),
    (
    'Izuku Midoriya', 
    'tecnico@email.com', 
    '$2a$10$BLAcJu1irAzg06WbtoLoPe0RA.hkfZ0oJ25KYARPkHWRweJuWBALy', 
    4, 
    2, 
    '(11) 97548-1367', 
    'Técnico de campo dedicado, com habilidade em manutenção e resolução de problemas. Comprometido em oferecer suporte ágil e eficaz diretamente no ambiente operacional.'
    )
;

-- Inserindo setores de exemplo
INSERT INTO setores 
    (nome, descricao, cod_setor, id_empresa, icone, cor)
VALUES 
    ('Pintura', 'Acabamento', 'PIN', 2, 'PaintRoller', 'Vermelho'),
    ('Montagem', 'Setor de montagem', 'MON', 2, 'Wrench', 'Verde'),
    ('Recursos Humanos', 'Gestão de pessoas', 'RH', 2, 'BriefcaseBusiness', 'Amarelo'),
    ('GA', 'Logística', 'GA', 2, 'Network', 'Azul')
;

-- Inserindo maquinas de exemplo
INSERT INTO maquinas (cod_maquina, nome, descricao, id_setor)
VALUES 
    ('MK-1', 'Máquina 1', 'Máquina 1 do setor 1', 1),
    ('MK-2', 'Máquina 2', 'Máquina 2 do setor 1', 1),
    ('MK-1', 'Máquina 1', 'Máquina 1 do setor 2', 2)
;

-- Inserindo as causas de exemplo
INSERT INTO causas (descricao, id_empresa)
VALUES 
    ('Quebra de peça', 2),
    ('Falta de óleo', 2)
;

-- Inserindo chamados
INSERT INTO chamados (datahora_abertura, id_empresa, id_setor, id_maquina, cod_chamado)
VALUES 
    (DATE_SUB(NOW(), INTERVAL 1 DAY), 2, 1, 1, 1),
    (DATE_SUB(NOW(), INTERVAL 1 DAY), 2, 1, 1, 2),
    (DATE_SUB(NOW(), INTERVAL 1 DAY), 2, 1, 2, 1)
;

INSERT INTO chamados (id_empresa, id_setor, id_maquina, cod_chamado)
VALUES 
    (2, 1, 1, 3),
    (2, 1, 1, 4),
    (2, 1, 2, 2)
;

INSERT INTO chamados (datahora_abertura, id_empresa, id_setor, id_maquina, cod_chamado)
VALUES (DATE_SUB(NOW(), INTERVAL 10 DAY), 2, 1, 1, 7);

INSERT INTO chamados (datahora_abertura, id_empresa, id_setor, id_maquina, cod_chamado)
VALUES (DATE_SUB(NOW(), INTERVAL 10 DAY), 2, 1, 1, 6);

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