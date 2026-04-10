import { create, read, update, deleteRecord, comparePassword, hashPassword, getConnection } from '../config/database.js';

// Model para operações com usuários
class UserModel {

    // Atualizar informações do usuário (Nome e email)
    static async atualizarInformacoes(id, dadosUsuario) {
        try {
            return await update('usuarios', dadosUsuario, `id = ${id}`);
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            throw error;
        }
    }

    // Atualizar senha do usuário
    static async atualizarSenha(id, senhaAtual, senhaNova) {
        try {
            // Buscando pelo usuário
            const usuario = await this.buscarPorId(id);
            if (!usuario) { throw new Error('Usuário não encontrado'); }

            // Verificando senha atual
            const senhaValida = await comparePassword(senhaAtual, usuario.senha);
            if (!senhaValida) { throw new Error('Senha incorreta'); }

            // Criptografando a senha nova
            const senhaNovaHash = await hashPassword(senhaNova);

            // Atualizando a senha
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
                { foto_perfil: fotoNova },
                `id = ${id}`
            );
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            throw error;
        }
    }





    // Buscar um usuário por ID
    static async buscarPorId(id) {
        try {
            const rows = await read('usuarios', { where: { id } });
            return rows[0] || null;
        } catch (error) {
            console.error('Erro ao buscar usuário por ID:', error);
            throw error;
        }
    }

    // Verificar se um e-mail está em uso por outro usuário
    static async emailEmUso(email, idUsuario) {
        try {
            const rows = await read('usuarios', { where: { email, id: `!= ${idUsuario}` } });

            return rows.length > 0;
        } catch (error) {
            console.error('Erro ao buscar usuário por E-mail:', error);
            throw error;
        }
    }



    // Listar todos os usuários (com paginação)
    static async listarTecnicos(id_empresa) {
        try {
            const tecnicos = await read("usuarios", {where: {id_empresa, tipo_usuario: 3}})

            return tecnicos
        } catch (error) {
            console.error('Erro ao listar usuários:', error);
            throw error;
        }
    }



    // Buscar usuário por email
    static async buscarPorEmail(email) {
        try {
            const rows = await read('usuarios', { where: { email } });
            return rows[0] || null;
        } catch (error) {
            console.error('Erro ao buscar usuário por email:', error);
            throw error;
        }
    }

    // Criar novo usuário
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



    // Excluir usuário
    static async excluir(id) {
        try {
            return await deleteRecord('usuarios', `id = ${id}`);
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            throw error;
        }
    }

    // Verificar credenciais de login
    static async verificarCredenciais(email, senha) {
        try {
            const usuario = await this.buscarPorEmail(email);

            if (!usuario) {
                return null;
            }

            const senhaValida = await comparePassword(senha, usuario.senha);

            if (!senhaValida) {
                return null;
            }

            // Retornar usuário sem a senha
            const { senha: _, ...usuarioSemSenha } = usuario;
            return usuarioSemSenha;
        } catch (error) {
            console.error('Erro ao verificar credenciais:', error);
            throw error;
        }
    }
}

export default UserModel;
