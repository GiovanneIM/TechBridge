import UserModel from "../models/User.js";
import { pertenceAEmpresa } from "../utils/validacoes.js";

class UserController {

    // LISTAR MEMBROS DE UMA EMPRESA
    static async listar(req, res) {
        // OBTER O ID DA EMPRESA
        const { id_empresa } = req.params;

        try {
            // VERIFICANDO SE O USUÁRIO TEM ACESSO
            const acesso = pertenceAEmpresa(req, id_empresa);
            if (!acesso) {
                return res.status(403).json({
                    sucesso: false,
                    mensagem: 'Você não tem acesso a essa rota'
                });
            }

            // REQUISIÇÃO
            const membros = await UserModel.listar(id_empresa);

            // SUCESSO: ENVIAR USUÁRIOS
            res.status(200).json({
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
}

export default UserController;