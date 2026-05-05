
import SetoresModel from "../models/setores.js";
import { pertenceAEmpresa } from "../utils/validacoes.js";

class SetoresController {

    // OBTER SETORES DE UMA EMPRESA
    static async obterSetores(req, res) {
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
            const setores = await SetoresModel.obterSetores(id_empresa);

            // SUCESSO: ENVIAR SETORES
            res.status(200).json({
                sucesso: true,
                mensagem: `Empresa ${id_empresa} - Setores listados com sucesso`,
                dados: { setores },
            });
        }
        catch (error) {
            // ERROS:
            console.error('Erro ao obter os setores da empresa:', error);

            // ERRO DO SERVIDOR
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível obter os setores da empresa'
            });
        }
    }
}

export default SetoresController;