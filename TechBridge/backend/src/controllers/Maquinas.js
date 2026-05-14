import MaquinasModel from "../models/Maquinas.js";
import { pertenceAEmpresa } from "../utils/validacoes.js";

class MaquinaController {
    // REGISTRAR UMA NOVA MÁQUINA
    static async criar(req, res) { }

    // LISTAR MAQUINAS DE UMA EMPRESA
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
            const membros = await MaquinasModel.listar(id_empresa);

            // SUCESSO: ENVIAR USUÁRIOS
            return res.status(200).json({
                sucesso: true,
                mensagem: `Empresa ${id_empresa} - Máquinas listadas com sucesso`,
                dados: { membros },
            });
        }
        catch (error) {
            // ERROS:
            console.error('Erro ao obter as máquinas da empresa:', error);

            // ERRO DO SERVIDOR
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível obter as máquinas da empresa'
            });
        }
    }

    // OBTER UMA MÁQUINA DA EMPRESA
    static async obter(req, res) { }
}

export default MaquinaController;