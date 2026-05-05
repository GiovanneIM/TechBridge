import { create, read, update, deleteRecord, comparePassword, hashPassword, getConnection } from '../config/database.js';

// Model para operações com usuários
class UserModel {
    // CRIAR USUÁRIO
    static async criar(dadosUsuario) {
        try {
            // Hash da senha antes de salvar
            const senhaHash = await hashPassword(dadosUsuario.senha);
            const dadosComHash = {
                ...dadosUsuario,
                senha: senhaHash
            };

            return await create('usuarios', dadosComHash);
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw error;
        }
    }

    // VERIFICAR CREDENCIAIS DE LOGIN
    static async verificarCredenciais(email, senha) {
        try {
            // BUSCAR O USUÁRIO
            const usuario = await this.buscarPorEmail(email);

            // USUÁRIO NÃO ENCONTRADO
            if (!usuario) return null;

            // COMPARAR A SENHA
            const senhaValida = await comparePassword(senha, usuario.senha);

            // SENHA ERRADA
            if (!senhaValida) return null;

            // REMOVER A SENHA DO USUÁRIO
            const { senha: _, ...usuarioSemSenha } = usuario;

            // RETORNAR O USUÁRIO SEM SENHA
            return usuarioSemSenha;
        } catch (error) {
            console.error('Erro ao verificar credenciais:', error);
            throw error;
        }
    }

    // BUSCAR O USUÁRIO POR E-MAIL
    static async buscarPorEmail(email) {
        try {
            // FAZER A CONSULTA
            const rows = await read('usuarios u', {
                columns: [
                    "u.*",
                    "tu.descricao as cargo",
                    "e.nome_fantasia as empresa"
                ],
                where: { 'u.email': email },
                join: [
                    { type: 'INNER', table: 'tipos_usuarios tu', on: 'tu.id = u.tipo_usuario' },
                    { type: 'LEFT', table: 'empresas e', on: 'e.id = u.id_empresa' }
                ]
            });

            // RETORNAR O PRIMEIRO DADO ENCONTRADO
            return rows[0] || null;
        } catch (error) {
            console.error('Erro ao buscar usuário por email:', error);
            throw error;
        }
    }

    // BUSCAR USUÁRIO POR ID
    static async buscarPorId(id) {
        try {
            // FAZER A CONSULTA
            const rows = await read('usuarios u', {
                columns: [
                    "u.*",
                    "tu.descricao as cargo",
                    "e.nome_fantasia as empresa"
                ],
                where: { 'u.id': id },
                join: [
                    { type: 'INNER', table: 'tipos_usuarios tu', on: 'tu.id = u.tipo_usuario' },
                    { type: 'LEFT', table: 'empresas e', on: 'e.id = u.id_empresa' }
                ]
            });

            // RETORNAR O PRIMEIRO DADO ENCONTRADO
            return rows[0] || null;
        } catch (error) {
            console.error('Erro ao buscar usuário por ID:', error);
            throw error;
        }
    }

    // LISTAR USUÁRIOS DE UMA EMPRESA
    static async listarUsuarios(id_empresa) {
        try {
            // FAZER A CONSULTA
            const usuarios = await read("usuarios", {
                where: { id_empresa }
            })

            // RETORNANDO OS USUARIOS
            return usuarios
        } catch (error) {
            console.error('Erro ao listar usuários:', error);
            throw error;
        }
    }

    // ATUALIZAR INFORMAÇÕES DO USUÁRIO (Exceto senha e foto)
    static async atualizarInformacoes(id, dadosUsuario) {
        try {
            return await update(
                'usuarios',
                dadosUsuario,
                'id = ?',
                [id]
            );
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            throw error;
        }
    }

    // VERIFICAR SE O E-MAIL ESTÁ EM USO POR OUTRO USUÁRIO
    static async emailEmUso(email, idUsuario) {
        try {
            const rows = await read('usuarios', { where: { email, id: `!= ${idUsuario}` } });

            return rows.length > 0;
        } catch (error) {
            console.error('Erro ao buscar usuário por E-mail:', error);
            throw error;
        }
    }

    // ATUALIZAR A SENHA
    static async atualizarSenha(id, senhaAtual, senhaNova) {
        try {
            // BUSCAR PELO USUÁRIO
            const usuario = await this.buscarPorId(id);
            if (!usuario) { throw new Error('Usuário não encontrado'); }

            // VERIFICAR A SENHA ATUAL
            const senhaCorreta = await comparePassword(senhaAtual, usuario.senha);
            if (!senhaCorreta) { throw new Error('Senha incorreta'); }

            // GERAR HASH DA SENHA NOVA
            const senhaNovaHash = await hashPassword(senhaNova);

            // ATUALIZAR A SENHA
            return await update('usuarios', { senha: senhaNovaHash }, `id = ${id}`);
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            throw error;
        }
    }

    // Atualizar foto de perfil do usuário
    static async atualizarFoto(id, fotoNova) {
        try {
            return await update(
                'usuarios',
                { foto_perfil: `http://localhost:3000/uploads/imagens/usuarios/${id}/` + fotoNova },
                {id}
            );
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            throw error;
        }
    }

    

    // Excluir usuário
    static async excluir(id) {
        try {
            return await deleteRecord('usuarios', `id = ${id}`);
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            throw error;
        }
    }
}

export default UserModel;



