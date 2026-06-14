import { log } from "console";
import UserModel from "../models/User.js";
import { pertenceAEmpresa } from "../utils/validacoes.js";

class UserController {
    // REGISTRA UM NOVO USUARIO
    static async criar(req, res) {
        // OBTER O ID DA EMPRESA
        const { id_empresa } = req.params;

        // OBTER DADOS DO USUARIO
        const dados = req.body;

        // DEFININDO SENHA
        dados.senha = '123456';

        // VERIFICANDO SE O USUÁRIO TEM ACESSO
        const acesso = pertenceAEmpresa(req, id_empresa);
        if (!acesso) {
            return res.status(403).json({
                sucesso: false,
                mensagem: 'Você não tem acesso a essa rota'
            });
        }

        try {
            // E-MAIL EM USO
            const usuarioEmail = await UserModel.buscarPorEmail(dados.email)
            if (usuarioEmail) {
                res.status(409).json({
                    sucesso: false,
                    erro: 'E-mail em uso',
                    mensagem: `O e-mail já está em uso`
                });
            }

            const id_usuario = await UserModel.criar(dados, id_empresa)

            return res.status(201).json({
                sucesso: true,
                mensagem: `Empresa ${id_empresa} - Usuário registrado com sucesso`,
                dados: { id_empresa, id_usuario }
            });

        } catch (error) {
            // ERROS:
            console.error('Erro ao registrar um membro na empresa:', error);

            // ERRO DO SERVIDOR
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível registrar o membros na empresa'
            });
        }

    }

    // LISTAR MEMBROS DE UMA EMPRESA
    static async listar(req, res) {
        // OBTER PAGINAÇÃO
        const { page, limit, texto, status, cargo } = req.validated.query;

        // OBTER O ID DA EMPRESA
        const { id_empresa } = req.params;

        // VERIFICANDO SE O USUÁRIO TEM ACESSO
        const acesso = pertenceAEmpresa(req, id_empresa);
        if (!acesso) {
            return res.status(403).json({
                sucesso: false,
                mensagem: 'Você não tem acesso a essa rota'
            });
        }

        // CALCULANDO OFFSET
        const offset = (page - 1) * limit;

        // FILTROS
        const where = { "u.id_empresa": id_empresa };
        const like = {};
        const likeOr = {};

        if (status && status !== 'all') {
            status === 'ativa'
                ? where["u.status"] = true
                : where["u.status"] = false
        }

        if (cargo) {
            like["tu.descricao"] = cargo;
        }

        if (texto) {
            likeOr["u.nome"] = texto;
            likeOr["u.email"] = texto;
        }

        try {
            // BUSCAR USUÁRIOS
            const resultado = await UserModel.listarUsuarios(id_empresa, limit, offset, page, where, like, likeOr);

            // SUCESSO: ENVIAR USUÁRIOS
            return res.status(200).json({
                sucesso: true,
                mensagem: `Empresa ${id_empresa} - Membros listados com sucesso`,
                dados: resultado
            });
        }
        catch (error) {
            // ERROS:
            console.error('Erro ao obter os membros da empresa:', error);

            // ERRO DO SERVIDOR
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível obter os membros da empresa'
            });
        }
    }

    // OBTER UM MEMBRO DA EMPRESA
    static async obter(req, res) {
        // OBTER O ID DA EMPRESA E DO USUÁRIO
        const { id_empresa, cod_usuario } = req.params;

        // VERIFICANDO SE O USUÁRIO TEM ACESSO
        const acesso = pertenceAEmpresa(req, id_empresa);
        if (!acesso) {
            return res.status(403).json({
                sucesso: false,
                mensagem: 'Você não tem acesso a essa rota'
            });
        }

        try {
            // REQUISIÇÃO
            const membro = await UserModel.buscarPorCodigo(cod_usuario);

            // USUARIO NAO ENCONTRADO
            if (!membro) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Usuário não encontrado',
                    mensagem: `O usuário procurado não foi encontrado`,
                });
            }

            // SUCESSO: ENVIAR USUARIO
            return res.status(200).json({
                sucesso: true,
                mensagem: `Empresa ${id_empresa} - Membro obtido com sucesso`,
                dados: { membro },
            });
        }
        catch (error) {
            // ERROS:
            console.error('Erro ao obter membro da empresa:', error);

            // ERRO DO SERVIDOR
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível obter o membro da empresa'
            });
        }
    }

    // ATUALIZAR UM USUÁRIO
    static async atualizar(req, res) { }
}

export default UserController;