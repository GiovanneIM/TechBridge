import UserModel from '../models/UserModel.js';

// CONTROLLER PARA OPERAÇÕES DE USUÁRIOS

class UserController {

    // PATCH /user/info - Rota para atualizar as informações do usuário (Exceto senha e foto)
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

    // PATCH /user/senha - Rota para atualizar a senha do usuário
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

    // PATCH /user/foto - Rota para atualizar a senha do usuário
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
                foto: nomeFoto
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



    // ACREDITO QUE ESSA ROTA NÃO SERÁ NECESSÁRIA
    // POST /auth/registrar - Registrar novo usuário
    static async registrar(req, res) {
        try {
            const { nome, email, senha, tipo } = req.body;

            // Verificando se o nome foi enviado
            if (!nome || nome.trim() === '') {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Nome obrigatório',
                    mensagem: 'O nome é obrigatório'
                });
            }

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

            // Validando o nome
            if (nome.length < 2) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Nome muito curto',
                    mensagem: 'O nome deve ter pelo menos 2 caracteres'
                });
            }

            if (nome.length > 100) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Nome muito longo',
                    mensagem: 'O nome deve ter no máximo 100 caracteres'
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

            if (email.length > 255) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'E-mail muito longo',
                    mensagem: 'O E-mail deve ter no máximo 255 caracteres'
                });
            }

            // Validando a senha
            if (senha.length < 6) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Senha muito curta',
                    mensagem: 'A senha deve ter pelo menos 6 caracteres'
                });
            }

            // Verificar se o email já existe
            const usuarioExistente = await UsuarioModel.buscarPorEmail(email);
            if (usuarioExistente) {
                return res.status(409).json({
                    sucesso: false,
                    erro: 'Email já cadastrado',
                    mensagem: 'Este email já está sendo usado por outro usuário'
                });
            }

            // Preparar dados do usuário
            const dadosUsuario = {
                nome: nome.trim(),
                email: email.trim().toLowerCase(),
                senha: senha,
                tipo: tipo
            };

            // Criar usuário
            const usuarioId = await UsuarioModel.criar(dadosUsuario);

            res.status(201).json({
                sucesso: true,
                mensagem: 'Usuário registrado com sucesso',
                dados: {
                    id: usuarioId,
                    nome: dadosUsuario.nome,
                    email: dadosUsuario.email,
                    tipo: dadosUsuario.tipo
                }
            });
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível registrar o usuário'
            });
        }
    }

    // GET /usuarios - Listar todos os usuários (apenas admin, com paginação)
    static async listarUsuarios(req, res) {
        try {
            // Obter parâmetros de paginação da query string
            const pagina = parseInt(req.query.pagina) || 1;
            const limite = parseInt(req.query.limite) || 10;

            // Validações
            if (pagina < 1) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Página inválida',
                    mensagem: 'A página deve ser um número maior que zero'
                });
            }

            const limiteMaximo = parseInt(process.env.PAGINACAO_LIMITE_MAXIMO) || 100;
            if (limite < 1 || limite > limiteMaximo) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Limite inválido',
                    mensagem: `O limite deve ser um número entre 1 e ${limiteMaximo}`
                });
            }

            const resultado = await UsuarioModel.listarTodos(pagina, limite);

            // Remover senha de todos os usuários
            const usuariosSemSenha = resultado.usuarios.map(({ senha, ...usuario }) => usuario);

            res.status(200).json({
                sucesso: true,
                dados: usuariosSemSenha,
                paginacao: {
                    pagina: resultado.pagina,
                    limite: resultado.limite,
                    total: resultado.total,
                    totalPaginas: resultado.totalPaginas
                }
            });
        } catch (error) {
            console.error('Erro ao listar usuários:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar os usuários'
            });
        }
    }

    // POST /usuarios - Criar novo usuário (apenas admin)
    static async criarUsuario(req, res) {
        try {
            const { nome, email, senha, tipo, id_equipe } = req.body;

            // Validações básicas
            if (!nome || nome.trim() === '') {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Nome obrigatório',
                    mensagem: 'O nome é obrigatório'
                });
            }

            if (!email || email.trim() === '') {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Email obrigatório',
                    mensagem: 'O email é obrigatório'
                });
            }

            if (!senha || senha.trim() === '') {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Senha obrigatória',
                    mensagem: 'A senha é obrigatória'
                });
            }

            // Validações de formato
            if (nome.length < 2) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Nome muito curto',
                    mensagem: 'O nome deve ter pelo menos 2 caracteres'
                });
            }

            if (nome.length > 255) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Nome muito longo',
                    mensagem: 'O nome deve ter no máximo 255 caracteres'
                });
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Email inválido',
                    mensagem: 'Formato de email inválido'
                });
            }

            if (senha.length < 6) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Senha muito curta',
                    mensagem: 'A senha deve ter pelo menos 6 caracteres'
                });
            }

            // Verificar se o email já existe
            const usuarioExistente = await UsuarioModel.buscarPorEmail(email);
            if (usuarioExistente) {
                return res.status(409).json({
                    sucesso: false,
                    erro: 'Email já cadastrado',
                    mensagem: 'Este email já está sendo usado por outro usuário'
                });
            }

            // Preparar dados do usuário
            const dadosUsuario = {
                nome: nome.trim(),
                email: email.trim().toLowerCase(),
                senha: senha,
                tipo: tipo || 'mt',
                id_equipe: id_equipe
            };

            // Criar usuário
            const usuarioId = await UsuarioModel.criar(dadosUsuario);

            res.status(201).json({
                sucesso: true,
                mensagem: 'Usuário criado com sucesso',
                dados: {
                    id: usuarioId,
                    nome: dadosUsuario.nome,
                    email: dadosUsuario.email,
                    tipo: dadosUsuario.tipo,
                    id_equipe: dadosUsuario.id_equipe
                }
            });
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível criar o usuário'
            });
        }
    }

    // PUT /usuarios/:id - Atualizar usuário (apenas admin)
    static async atualizarUsuario(req, res) {
        try {
            const { id } = req.params;
            const { nome, email, senha, tipo } = req.body;

            // Validação do ID
            if (!id || isNaN(id)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O ID deve ser um número válido'
                });
            }

            // Verificar se o usuário existe
            const usuarioExistente = await UsuarioModel.buscarPorId(id);
            if (!usuarioExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Usuário não encontrado',
                    mensagem: `Usuário com ID ${id} não foi encontrado`
                });
            }

            // Preparar dados para atualização
            const dadosAtualizacao = {};

            if (nome !== undefined) {
                if (nome.trim() === '') {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Nome inválido',
                        mensagem: 'O nome não pode estar vazio'
                    });
                }
                if (nome.length < 2) {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Nome muito curto',
                        mensagem: 'O nome deve ter pelo menos 2 caracteres'
                    });
                }
                dadosAtualizacao.nome = nome.trim();
            }

            if (email !== undefined) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Email inválido',
                        mensagem: 'Formato de email inválido'
                    });
                }

                // Verificar se o email já está em uso por outro usuário
                const usuarioComEmail = await UsuarioModel.buscarPorEmail(email);
                if (usuarioComEmail && usuarioComEmail.id !== parseInt(id)) {
                    return res.status(409).json({
                        sucesso: false,
                        erro: 'Email já cadastrado',
                        mensagem: 'Este email já está sendo usado por outro usuário'
                    });
                }

                dadosAtualizacao.email = email.trim().toLowerCase();
            }

            if (senha !== undefined) {
                if (senha.length < 6) {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Senha muito curta',
                        mensagem: 'A senha deve ter pelo menos 6 caracteres'
                    });
                }
                dadosAtualizacao.senha = senha;
            }

            if (tipo !== undefined) {
                dadosAtualizacao.tipo = tipo;
            }

            // Verificar se há dados para atualizar
            if (Object.keys(dadosAtualizacao).length === 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Nenhum dado para atualizar',
                    mensagem: 'Forneça pelo menos um campo para atualizar'
                });
            }

            // Atualizar usuário
            const resultado = await UsuarioModel.atualizar(id, dadosAtualizacao);

            res.status(200).json({
                sucesso: true,
                mensagem: 'Usuário atualizado com sucesso',
                dados: {
                    linhasAfetadas: resultado || 1
                }
            });
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível atualizar o usuário'
            });
        }
    }

    // DELETE /usuarios/:id - Excluir usuário (apenas admin)
    static async excluirUsuario(req, res) {
        try {
            const { id } = req.params;

            // Validação do ID
            if (!id || isNaN(id)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O ID deve ser um número válido'
                });
            }

            // Verificar se o usuário existe
            const usuarioExistente = await UsuarioModel.buscarPorId(id);
            if (!usuarioExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Usuário não encontrado',
                    mensagem: `Usuário com ID ${id} não foi encontrado`
                });
            }

            // Excluir usuário
            const resultado = await UsuarioModel.excluir(id);

            res.status(200).json({
                sucesso: true,
                mensagem: 'Usuário excluído com sucesso',
                dados: {
                    linhasAfetadas: resultado || 1
                }
            });
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível excluir o usuário'
            });
        }
    }



}


export default UserController;

