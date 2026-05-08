import UserModel from "../models/User.js";
import { pertenceAEmpresa } from "../utils/validacoes.js";

class UserController {
    // REGISTRA UM NOVO USUARIO
    static async criar(req, res) {
        // OBTER O ID DA EMPRESA
        const { id_empresa } = req.params;

        // OBTER DADOS DO USUARIO
        const dados = req.body;

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
            const usuarioEmail = UserModel.buscarPorEmail(dados.email)
            if (usuarioEmail) {
                res.status(409).json({
                    sucesso: false,
                    erro: 'E-mail em uso',
                    mensagem: `O e-mail já está em uso`
                });
            }

            const id_usuario = UserModel.criar(dados, id_empresa)

            return res.status(500).json({
                sucesso: false,
                mensagem: `Empresa ${id_empresa} - Usuário registrado com sucesso`,
                dados: { id_empresa, id_usuario }
            });

        } catch (error) {
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

    // LISTAR MEMBROS DE UMA EMPRESA
    static async listar(req, res) {
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

        try {
            // REQUISIÇÃO
            const membros = await UserModel.listar(id_empresa);

            // SUCESSO: ENVIAR USUÁRIOS
            return res.status(200).json({
                sucesso: true,
                mensagem: `Empresa ${id_empresa} - Membros listados com sucesso`,
                dados: { membros },
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
        const { id_empresa, id_usuario } = req.params;

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
            const membro = await UserModel.buscarPorId(id_usuario);

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
                mensagem: `Empresa ${id_empresa} - Membros obtido com sucesso`,
                dados: { membro },
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
}

export default UserController;