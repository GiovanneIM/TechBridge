import jwt from 'jsonwebtoken';
import UsuarioModel from '../models/UserModel.js';
import { JWT_CONFIG } from '../config/jwt.js';

const tiposDeUsuario = {
    '1': 'Admin TechBridge',
    '2': 'Admin Cliente',
    '3': 'Técnico',
}


// CONTROLLER PARA OPERAÇÕES DE AUTENTICAÇÃO

class AuthController {

    // POST /auth/login - Rota para fazer login
    static async login(req, res) {
        try {
            // Obtendo o email e a senha do corpo da requisição
            const { email, senha } = req.body;

            // Verificando se o email foi enviado
            if (!email || email.trim() === '') {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Email obrigatório',
                    mensagem: 'O email é obrigatório'
                });
            }

            // Verificando se a senha foi enviada
            if (!senha || senha.trim() === '') {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Senha obrigatória',
                    mensagem: 'A senha é obrigatória'
                });
            }

            // Validação básica de formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Email inválido',
                    mensagem: 'Formato de email inválido'
                });
            }

            // Verificar credenciais
            const usuario = await UsuarioModel.verificarCredenciais(email.trim(), senha);

            // Caso o usuário não tenha sido encontrado
            if (!usuario) {
                return res.status(401).json({
                    sucesso: false,
                    erro: 'Credenciais inválidas',
                    mensagem: 'Email ou senha incorretos'
                });
            }

            // Gerar token JWT
            const token = jwt.sign(
                {
                    id: usuario.id,
                    email: usuario.email,
                    tipo_usuario: usuario.tipo_usuario,
                    id_empresa: usuario.id_empresa
                },
                JWT_CONFIG.secret,
                { expiresIn: JWT_CONFIG.expiresIn }
            );

            // Gerar cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 1000 * 60 * 60 * 2
            });

            // Respondendo com os dados do usuário
            res.status(200).json({
                sucesso: true,
                mensagem: 'Login efetuado com sucesso',
                dados: {
                    token,
                    usuario: {
                        ...usuario,
                        cargo: tiposDeUsuario[usuario.tipo_usuario]
                    }
                }
            });

        } catch (error) {
            console.error('Erro ao fazer login:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível processar o login'
            });
        }
    }

    // POST /auth/logout - Rota para excluir o cookie e fazer logout
    static async logout(req, res) {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });

        return res.status(200).json({
            sucesso: true,
            mensagem: 'Logout realizado com sucesso'
        });
    }

    // GET /auth/perfil - Rota para obter perfil do usuário logado
    static async obterPerfil(req, res) {
        try {
            // Buscando o usuário
            const usuario = await UsuarioModel.buscarPorId(req.usuario.id);

            // Se o usuário não foi encontrado
            if (!usuario) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Usuário não encontrado',
                    mensagem: 'Usuário não foi encontrado'
                });
            }

            // Remover senha dos dados retornados
            const { senha: _, ...usuarioSemSenha } = usuario;

            // Retornando os dados do usuário
            res.status(200).json({
                sucesso: true,
                dados: {
                    usuario: {
                        ...usuarioSemSenha,
                        cargo: tiposDeUsuario[usuario.tipo_usuario]
                    }
                }
            });

        } catch (error) {
            console.error('Erro ao obter perfil:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível obter o perfil'
            });
        }
    }

    


    // PATCH /auth/info - Rota para atualizar as informações do usuário (Exceto senha e foto)
    static async atualizarInformacoes(req, res) {
        try {
            const idUsuario = req.usuario.id; // ID do usuário logado via authMiddleware
            // Obtendo os dados enviados no corpo da requisição
            const dados = {};
            if (req.body.nome) dados.nome = req.body.nome.trim();
            if (req.body.email) dados.email = req.body.email.trim();

            // Verificando se algum dado foi atualizado
            if (Object.keys(dados).length === 0) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: "Nenhum dado enviado para atualização"
                });
            }

            // Verificando se os tipos estão corretos
            if (
                (dados.nome && typeof dados.nome !== "string") ||
                (dados.email && typeof dados.email !== "string")
            ) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'Nome e email devem ser texto'
                });
            }

            // Validando o tamanho do nome
            if (dados.nome && dados.nome.length > 255) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'O nome pode ter no máximo 255 caracteres'
                });
            }

            if (dados.nome && dados.nome.length === 0) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: "O nome não pode estar vazio"
                });
            }

            // Validando o tamanho do e-mail
            if (dados.email && dados.email.length > 255) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'O e-mail pode ter no máximo 255 caracteres'
                });
            }

            if (dados.email && dados.email.length === 0) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: "O e-mail não pode estar vazio"
                });
            }

            // Validação de formato de e-mail
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (dados.email && !emailRegex.test(dados.email)) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'Formato de e-mail inválido'
                });
            }

            // Verificando se o e-mail já está em uso por outro usuário
            if (await UserModel.emailEmUso(dados.email, idUsuario)) {
                return res.status(409).json({
                    sucesso: false,
                    mensagem: "E-mail já está em uso"
                });
            }

            // ATUALIZANDO INFORMAÇÕES
            await UserModel.atualizarInformacoes(idUsuario, dados);

            return res.status(200).json({
                sucesso: true,
                mensagem: 'Informações atualizadas com sucesso!'
            });

        } catch (error) {

            // Erro do servidor
            console.error('Erro ao atualizar as informações do usuário:', error);
            return res.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao atualizar as informações do usuário'
            });
        }
    }

    // PATCH /auth/senha - Rota para atualizar a senha do usuário
    static async atualizarSenha(req, res) {
        try {
            const idUsuario = req.usuario.id; // ID do usuário logado via authMiddleware
            const { senhaAtual, senhaNova } = req.body; // Obtendo a senha enviada no corpo da requisição

            // Verificando se a senha atual foi enviada
            if (!senhaAtual) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'Senha atual não foi fornecida'
                });
            }

            // Verificando se a senha nova foi enviada
            if (!senhaNova) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'Senha nova não foi fornecida'
                });
            }

            // Verificando os tipos das senhas
            if (typeof senhaAtual !== "string" || typeof senhaNova !== "string") {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: "As senhas devem ser texto"
                });
            }

            // Verificando o tamanho da senha 
            if (senhaNova.length < 6) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'A nova senha deve ter no mínimo 6 caracteres'
                });
            }

            // ATUALIZANDO A SENHA
            await UserModel.atualizarSenha(idUsuario, senhaAtual, senhaNova);

            return res.status(200).json({
                sucesso: true,
                mensagem: 'Senha atualizada com sucesso!'
            });

        } catch (error) {
            // Usuário não encontrado
            if (error.message === 'Usuário não encontrado') {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: 'Usuário não encontrado'
                });
            }

            // Senha atual incorreta
            if (error.message === 'Senha incorreta') {
                return res.status(401).json({
                    sucesso: false,
                    mensagem: 'Senha atual incorreta'
                });
            }

            // Erro do servidor
            console.error('Erro ao atualizar a senha do usuário:', error);
            return res.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao atualizar a senha do usuário'
            });
        }
    }

    // PATCH /auth/foto - Rota para atualizar a senha do usuário
    static async atualizarImagem(req, res) {
        try {
            const idUsuario = req.usuario.id; // ID do usuário logado via authMiddleware

            if (!req.file) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: "Nenhuma imagem enviada"
                });
            }

            const nomeFoto = req.file.filename;

            await UserModel.atualizarFoto(idUsuario, nomeFoto);

            return res.json({
                sucesso: true,
                mensagem: 'Foto atualizada com sucesso',
            });

        } catch (error) {
            // Erro do servidor
            console.error('Erro ao atualizar a senha do usuário:', error);
            return res.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao atualizar a senha do usuário'
            });
        }
    }

}


export default AuthController;

