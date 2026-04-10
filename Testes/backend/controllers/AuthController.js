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

    // POST /auth/logout - Rota para excluir o cookie e fazer logout
    static async logout(req, res) {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });

        return res.status(200).json({
            sucesso: true,
            mensagem: 'Logout realizado com sucesso',
            dados: { logout: true }
        });
    }

}


export default AuthController;

