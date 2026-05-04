import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';
import { JWT_CONFIG } from '../config/jwt.js';
import { validarEmail, validarNome, validarSenha } from '../utils/validacoes.js';
import { negrito, verde } from '../utils/modificadoresDeSaida.js';
import { removerArquivoAntigo, TIPOS_PASTA } from '../middlewares/uploadMiddleware.js';


// CONTROLLER PARA OPERAÇÕES DE AUTENTICAÇÃO
class AuthController {

    // POST /auth/login - FAZER LOGIN
    static async login(req, res) {
        try {
            // RECEBER E-MAIL E SENHA
            const { email, senha } = req.body;

            // VERIFICAR CREDENCIAIS
            const usuario = await UserModel.verificarCredenciais(email.trim(), senha);

            // CASO O USUÁRIO NÃO TENHA SIDO ENVIADO
            if (!usuario) {
                return res.status(401).json({
                    sucesso: false,
                    erro: 'Credenciais inválidas',
                    mensagem: 'Email ou senha incorretos'
                });
            }

            // GERAR TOKEN JWT
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

            // GERAR COOKIE
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 1000 * 60 * 60 * 2
            });

            // SUCESSO: ENVIAR DADOS DO USUÁRIO E TOKEN
            res.status(200).json({
                sucesso: true,
                mensagem: 'Login efetuado com sucesso',
                dados: {
                    token,
                    usuario: {
                        ...usuario
                    }
                }
            });

        } catch (error) {
            console.error('Erro ao fazer login:', error);

            // ERRO DO SERVIDOR
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível processar o login'
            });
        }
    }

    // POST /auth/logout - APAGAR COOKIE 
    static async logout(req, res) {
        // APAGAR COOKIE
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });

        // SUCESSO: ENVIAR MENSAGEM
        return res.status(200).json({
            sucesso: true,
            mensagem: 'Logout realizado com sucesso'
        });
    }

    // GET /auth/perfil - OBTER PERFIL
    static async obterPerfil(req, res) {
        try {
            // BUSCANDO O USUÁRIO LOGADO
            const usuario = await UserModel.buscarPorId(req.usuario.id);

            // USUÁRIO NÃO ENCONTRADO
            if (!usuario) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Usuário não encontrado',
                    mensagem: 'Usuário não foi encontrado'
                });
            }

            // REMOVER SENHA DOS DADOS
            const { senha: _, ...usuarioSemSenha } = usuario;

            // SUCESSO: ENVIAR DADOS DO USUÁRIO
            res.status(200).json({
                sucesso: true,
                dados: {
                    usuario: {
                        ...usuarioSemSenha,
                        foto_perfil: `http://localhost:3000/uploads/imagens/usuarios/${usuario.id}/${usuario.foto_perfil}`
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



    // PATCH /auth/info - ATUALIZAR INFORMAÇÕES (nome, email)
    static async atualizarInformacoes(req, res) {
        try {
            // OBTER ID DO USUÁRIO LOGADO
            const idUsuario = req.usuario.id;

            // OBTER DADOS DA REQUISIÇÃO
            const { nome, email } = req.body;
            const dados = {};

            // VALIDAR O NOME, SE RECEBIDO
            if (nome) {
                const validacaoNome = validarNome(nome);

                if (!validacaoNome.sucesso) {
                    return res.status(400).json({
                        ...validacaoNome
                    })
                }

                dados.nome = nome;
            }

            // VALIDAR O E-MAIL, SE RECEBIDO
            if (email) {
                const validacaoEmail = validarEmail(email);

                if (!validacaoEmail.sucesso) {
                    return res.status(400).json({
                        ...validacaoEmail
                    })
                }

                // VERIFICAR SE JÁ EXISTE UM USUÁRIO COM O E-MAIL RECEBIDO
                const emUso = await UserModel.emailEmUso(email, idUsuario)
                if (emUso) {
                    return res.status(409).json({
                        sucesso: false,
                        mensagem: "E-mail já está em uso"
                    });
                }

                dados.email = email;
            }


            // ATUALIZAR INFORMAÇÕES
            await UserModel.atualizarInformacoes(idUsuario, dados);

            // SUCESSO: ENVIAR MENSAGEM
            return res.status(200).json({
                sucesso: true,
                mensagem: 'Informações atualizadas com sucesso!'
            });

        } catch (error) {
            console.error('Erro ao atualizar as informações do usuário:', error);

            // ERRO DO SERVIDOR
            return res.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao atualizar as informações do usuário'
            });
        }
    }

    // PATCH /auth/senha - ATUALIZAR SENHA
    static async atualizarSenha(req, res) {
        try {
            // OBTER ID DO USUÁRIO LOGADO
            const idUsuario = req.usuario.id;

            // OBTER DADOS DA REQUISIÇÃO
            const { senhaAtual, senhaNova } = req.body;


            // VALIDAR A SENHA ATUAL
            const validacaoSenhaAtual = validarSenha(senhaAtual);
            if (!validacaoSenhaAtual.sucesso) {
                return res.status(400).json({
                    ...validacaoSenhaAtual
                })
            }

            // VALIDAR A SENHA NOVA
            const validacaoSenhaNova = validarSenha(senhaNova);
            if (!validacaoSenhaNova.sucesso) {
                return res.status(400).json({
                    ...validacaoSenhaNova
                })
            }


            // ATUALIZANDO A SENHA
            await UserModel.atualizarSenha(idUsuario, senhaAtual, senhaNova);

            // SUCESSO: ENVIAR MENSAGEM
            return res.status(200).json({
                sucesso: true,
                mensagem: 'Senha atualizada com sucesso!'
            });

        } catch (error) {
            console.error('Erro ao atualizar a senha do usuário:', error);

            // USUÁRIO NÃO ENCONTRADO
            if (error.message === 'Usuário não encontrado') {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: 'Usuário não encontrado'
                });
            }

            // SENHA ATUAL INCORRETA
            if (error.message === 'Senha incorreta') {
                return res.status(401).json({
                    sucesso: false,
                    mensagem: 'Senha atual incorreta'
                });
            }

            // ERRO DO SERVIDOR
            return res.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao atualizar a senha do usuário'
            });
        }
    }





    // PATCH /auth/foto - Rota para atualizar a foto de perfil do usuário
    static async atualizarFoto(req, res) {
        try {
            // ID DO USUÁRIO
            const idUsuario = req.usuario.id;

            // CASO IMAGEM NÃO TENHA SIDO ENVIADA
            if (!req.file) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: "Nenhuma imagem enviada"
                });
            }

            // EXIBIR INFORMAÇÕES DA IMAGEM
            console.log({
                original: req.file.originalname,
                salvo: req.file.filename,
                tipo: req.file.mimetype,
                tamanho: req.file.size
            });

            // OBTER O NOME DA FOTO
            const nomeFoto = req.file.filename;

            // OBTER O USUARIO ANTES DE ATUALIZAR (Para excluir a foto antiga)
            const usuario = await UserModel.buscarPorId(idUsuario)

            // ATUALIZAR A IMAGEM DO USUÁRIO NO BANCO
            await UserModel.atualizarFoto(idUsuario, nomeFoto)

            // REMOVER A IMAGEM ANTIGA DO USUÁRIO
            if (usuario.foto_perfil && usuario.foto_perfil !== nomeFoto) {
                await removerArquivoAntigo(usuario.foto_perfil, idUsuario, TIPOS_PASTA.IMAGENS);
            }

            return res.json({
                sucesso: true,
                mensagem: 'Foto atualizada com sucesso',
                foto: nomeFoto
            });

        } catch (error) {
            // Erro do servidor
            console.error('Erro ao atualizar a foto do usuário:', error);
            return res.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao atualizar a foto do usuário'
            });
        }
    }

}


export default AuthController;

