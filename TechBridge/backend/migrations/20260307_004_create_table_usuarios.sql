-- Migration: Criar tabela "usuarios"
-- Data: 2025-03-07
-- Descrição: Define os tipos de usuários do sistema


-- Mudando o banco atual para o banco TECHBRIDGE
USE TECHBRIDGE;


-- Criando a tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id 				    INT 			AUTO_INCREMENT PRIMARY KEY,
	data_criacao 	    DATETIME 		DEFAULT CURRENT_TIMESTAMP,		-- Data em que o usuário foi registrado
    data_desativacao    DATETIME,                                       -- Data em que o usuário foi desativado
    status			    BOOLEAN			DEFAULT TRUE,					-- Status do usuário (Conta ativa ou inativa)

    -- Atributos do usuário
    nome			VARCHAR(255) 	NOT NULL,						-- Nome do usuário
    email			VARCHAR(255) 	NOT NULL UNIQUE,				-- E-mail do usuário
    senha			VARCHAR(255) 	NOT NULL,						-- Senha do usuário
    foto_perfil 	VARCHAR(255),									-- Foto de perfil
    bio				VARCHAR(300), 			            			-- Biografia do usuário
    telefone		VARCHAR(15), 					            	-- Número do telefone do usuário (com DDD)
    
    -- Chaves estrangeiras
    tipo_usuario	INT				NOT NULL,						-- Tipo de usuário
    id_empresa		INT,											-- ID da empresa do usuário
    
    -- Referênciando as chaves estrangeiras
    FOREIGN KEY (tipo_usuario) REFERENCES tipos_usuarios(id),
    FOREIGN KEY (id_empresa) REFERENCES empresas(id),

    -- Indices
    INDEX idx_usuarios_empresa (id_empresa),
    INDEX idx_usuarios_ativo (status)
); 


-- Inserindo os usuários de exemplo
INSERT INTO usuarios 
(nome, email, senha, tipo_usuario, id_empresa, telefone, bio, departamento, nacionalidade)
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