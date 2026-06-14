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


-- Inserindo empresas de exemplo
INSERT INTO empresas 
    (cnpj, razao_social, nome_fantasia,cep, rua, numero, complemento, bairro, cidade, estado)
VALUES
    ('00000000000000', 'TechBridge - Softwares e Hardwares para Andons', 'TechBridge', '09050000', 'Rua das Indústrias', '1500', 'Bloco A', 'Centro', 'Santo André', 'SP'),
    ('12345678000102', 'Metalúrgica São Paulo Industrial LTDA', 'MSP Industrial', '09530000', 'Avenida Industrial', '850', NULL, 'Campestre', 'São Caetano do Sul', 'SP'),
    ('12345678000103', 'Logística Express Brasil LTDA', 'ExpressLog', '07180000', 'Rodovia Presidente Dutra', '1200', 'Galpão 5', 'Cumbica', 'Guarulhos', 'SP'),
    ('12345678000104', 'Rede de Farmácias Vida Plena LTDA', 'Vida Plena', '30130000', 'Rua da Bahia', '450', 'Loja 03', 'Centro', 'Belo Horizonte', 'MG'),
    ('12345678000105', 'Construtora Horizonte Engenharia LTDA', 'Horizonte Engenharia', '80010000', 'Rua Marechal Deodoro', '980', '8º Andar', 'Centro', 'Curitiba', 'PR'),
    ('12345678000106', 'Alimentos Sabor da Terra LTDA', 'Sabor da Terra', '14020000', 'Avenida Presidente Vargas', '2500', NULL, 'Jardim América', 'Ribeirão Preto', 'SP'),
    ('12345678000107', 'Auto Peças Rodovia LTDA', 'Rodovia Auto Peças', '13050000', 'Avenida John Boyd Dunlop', '3100', NULL, 'Jardim Ipaussurama', 'Campinas', 'SP'),
    ('12345678000108', 'Grupo Educacional Alfa LTDA', 'Colégio Alfa', '70040900', 'Setor Bancário Norte', '100', 'Bloco B', 'Asa Norte', 'Brasília', 'DF'),
    ('12345678000109', 'Clínica Médica Bem Estar LTDA', 'Bem Estar Saúde', '90620000', 'Rua Anita Garibaldi', '745', 'Sala 402', 'Mont Serrat', 'Porto Alegre', 'RS'),
    ('12345678000110', 'Comercial Oliveira Distribuição LTDA', 'Oliveira Distribuição', '69050000', 'Avenida Djalma Batista', '1200', NULL, 'Chapada', 'Manaus', 'AM'),
    ('12345678000111', 'Indústria Têxtil Primavera LTDA', 'Primavera Têxtil', '89010000', 'Rua XV de Novembro', '210', NULL, 'Centro', 'Blumenau', 'SC'),
    ('12345678000112', 'Transportadora Vale Verde LTDA', 'Vale Verde Transportes', '29100000', 'Rodovia do Sol', '5400', 'Km 12', 'Praia de Itaparica', 'Vila Velha', 'ES'),
    ('12345678000113', 'Mercado Central Paulista LTDA', 'Mercado Central', '15010000', 'Rua Bernardino de Campos', '620', NULL, 'Centro', 'São José do Rio Preto', 'SP'),
    ('12345678000114', 'Solar Energia Renovável LTDA', 'Solar Energia', '59020000', 'Avenida Senador Salgado Filho', '1800', 'Sala 901', 'Lagoa Nova', 'Natal', 'RN'),
    ('12345678000115', 'Segurança Total Serviços LTDA', 'Segurança Total', '40015000', 'Avenida Sete de Setembro', '1350', NULL, 'Dois de Julho', 'Salvador', 'BA')
;
UPDATE empresas SET status = 0, data_desativacao = now() WHERE id = 3;
UPDATE empresas SET status = 0, data_desativacao = now() WHERE id = 7;
UPDATE empresas SET status = 0, data_desativacao = now() WHERE id = 10;

-- Inserindo os usuários de exemplo
INSERT INTO usuarios 
    (nome, email, senha, tipo_usuario, id_empresa, telefone, bio, cod_usuario)
VALUES 
    (
    'Kim Minji', 
    'admin@tb.com', 
    '$2a$10$BLAcJu1irAzg06WbtoLoPe0RA.hkfZ0oJ25KYARPkHWRweJuWBALy', 
    1, 
    1, 
    '(11) 95989-9539', 
    'Administradora de sistemas com foco em organização, segurança e eficiência operacional. Atua garantindo o bom funcionamento das plataformas e suporte estratégico para a equipe.',
    'ADM1'
    ),
    (
    'Poliwag Gomez', 
    'gerentePrincipal@email.com', 
    '$2a$10$BLAcJu1irAzg06WbtoLoPe0RA.hkfZ0oJ25KYARPkHWRweJuWBALy', 
    2, 
    2, 
    '(11) 98921-8798', 
    'Gerente de produção experiente, especializado em otimização de processos e liderança de equipes. Trabalha para aumentar a produtividade e garantir a qualidade nas entregas.',
    '2'
    ),
    (
    'The Rock', 
    'gerente@email.com', 
    '$2a$10$BLAcJu1irAzg06WbtoLoPe0RA.hkfZ0oJ25KYARPkHWRweJuWBALy', 
    3, 
    2, 
    '(11) 97548-1367', 
    'Técnico de campo dedicado, com habilidade em manutenção e resolução de problemas. Comprometido em oferecer suporte ágil e eficaz diretamente no ambiente operacional.',
    'GER1'
    ),
    (
    'Izuku Midoriya', 
    'tecnico@email.com', 
    '$2a$10$BLAcJu1irAzg06WbtoLoPe0RA.hkfZ0oJ25KYARPkHWRweJuWBALy', 
    4, 
    2, 
    '(11) 97548-1367', 
    'Técnico de campo dedicado, com habilidade em manutenção e resolução de problemas. Comprometido em oferecer suporte ágil e eficaz diretamente no ambiente operacional.',
    'TEC1'
    )
;

-- Inserindo setores de exemplo
INSERT INTO setores
    (nome, descricao, cod_setor, id_empresa, icone, cor_fundo, cor_texto)
VALUES 
    (
        'Pintura', 'Responsável pelo acabamento superficial e aplicação de revestimentos nas peças e produtos',
        'PIN', 2, 'PaintRoller', 'FF5733', 'FDFEFE'),
    (
        'Montagem', 'Realiza a montagem de componentes e integração final dos produtos conforme especificações técnicas',
        'MON', 2, 'Wrench', '3498DB', 'EBF5FB'),
    (
        'Recursos Humanos', 'Gerencia os processos relacionados a pessoas, incluindo recrutamento, desenvolvimento e clima organizacional',
        'RH', 2, 'BriefcaseBusiness', '2ECC71', '145A32'),
    (
        'GA', 'Responsável pela gestão de armazenagem, movimentação de materiais e fluxo logístico interno',
        'GA', 2, 'Network', '9B59B6', 'F5EEF8'
    )
;

-- Inserindo maquinas de exemplo
INSERT INTO maquinas (cod_maquina, nome, descricao, id_setor)
VALUES 
    ('MK1', 'Máquina 1', 'Máquina 1 do setor 1', 1),
    ('MK2', 'Máquina 2', 'Máquina 2 do setor 1', 1),
    ('MK1', 'Máquina 1', 'Máquina 1 do setor 2', 2)
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
    id_tecnico = 4,
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