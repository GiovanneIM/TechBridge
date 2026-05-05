import UserModel from "../models/model_consertar/UserModel";
import { pertenceAEmpresa } from "../utils/validacoes.js";

class UserController {

    // OBTER MEMBROS DE UMA EMPRESA
    static async obterMembros() {
        // OBTER O ID DA EMPRESA
        const { id_empresa } = req.params;

        try {

        }
        catch (error) {
            // ERROS:
            console.error('Erro ao obter a empresa:', error);

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