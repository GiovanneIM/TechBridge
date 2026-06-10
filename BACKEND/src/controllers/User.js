import UserModel from "../models/User.js";
import { pertenceAEmpresa } from "../utils/validacoes.js";

class UserController {
    // REGISTRA UM NOVO USUARIO
    static async criar(req, res) {
        const { id_empresa } = req.params;
        const dados = req.body;

        const acesso = pertenceAEmpresa(req, id_empresa);
        if (!acesso) {
            return res.status(403).json({
                sucesso: false,
                mensagem: 'Você não tem acesso a essa rota'
            });
        }

        try {
            // E-MAIL EM USO
            const usuarioEmail = await UserModel.buscarPorEmail(dados.email);
            if (usuarioEmail) {
                return res.status(409).json({
                    sucesso: false,
                    mensagem: 'O e-mail já está em uso'
                });
            }

            const id_usuario = await UserModel.criar(dados, id_empresa);

            return res.status(201).json({
                sucesso: true,
                mensagem: `Usuário registrado com sucesso`,
                dados: { id_empresa, id_usuario }
            });

        } catch (error) {
            console.error('Erro ao registrar um membro na empresa:', error);

            return res.status(500).json({
                sucesso: false,
                mensagem: 'Não foi possível registrar o membro na empresa'
            });
        }
    }

    // LISTAR MEMBROS DE UMA EMPRESA
    static async listar(req, res) {
        const { page, limit, texto, status, cargo } = req.validated.query;
        const { id_empresa } = req.params;

        const acesso = pertenceAEmpresa(req, id_empresa);
        if (!acesso) {
            return res.status(403).json({
                sucesso: false,
                mensagem: 'Você não tem acesso a essa rota'
            });
        }

        const offset = (page - 1) * limit;

        const where = { "u.id_empresa": id_empresa };
        const like = {};
        const likeOr = {};

        if (status && status !== 'all') {
            where["u.status"] = status === 'ativa' ? true : false;
        }

        if (cargo) {
            like["tu.descricao"] = cargo;
        }

        if (texto) {
            likeOr["u.nome"] = texto;
            likeOr["u.email"] = texto;
        }

        try {
            const resultado = await UserModel.listarUsuarios(id_empresa, limit, offset, page, where, like, likeOr);

            return res.status(200).json({
                sucesso: true,
                mensagem: `Empresa ${id_empresa} - Membros listados com sucesso`,
                dados: resultado
            });
        } catch (error) {
            console.error('Erro ao obter os membros da empresa:', error);

            return res.status(500).json({
                sucesso: false,
                mensagem: 'Não foi possível obter os membros da empresa'
            });
        }
    }

    // OBTER UM MEMBRO DA EMPRESA
    static async obter(req, res) {
        const { id_empresa, cod_usuario } = req.params;

        const acesso = pertenceAEmpresa(req, id_empresa);
        if (!acesso) {
            return res.status(403).json({
                sucesso: false,
                mensagem: 'Você não tem acesso a essa rota'
            });
        }

        try {
            const membro = await UserModel.buscarPorCodigo(cod_usuario);

            if (!membro) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: 'O usuário procurado não foi encontrado',
                });
            }

            return res.status(200).json({
                sucesso: true,
                mensagem: `Empresa ${id_empresa} - Membro obtido com sucesso`,
                dados: { membro },
            });
        } catch (error) {
            console.error('Erro ao obter membro da empresa:', error);

            return res.status(500).json({
                sucesso: false,
                mensagem: 'Não foi possível obter o membro da empresa'
            });
        }
    }

    // ATUALIZAR UM USUÁRIO
    static async atualizar(req, res) { }
}

export default UserController;