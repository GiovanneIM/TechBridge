import ChamadosModel from "../models/Chamados";

class ChamadosController {

    // LISTAR CHAMADOS DE UMA EMPRESA
    static async listar(req, res) {
        // OBTER O ID DA EMPRESA
        const { id_empresa } = req.params;

        // VERIFICANDO SE O USUÁRIO TEM ACESSO
        const acesso = pertenceAEmpresa(req, id_empresa);
        if (!acesso) {
            return res.status(403).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Você não tem acesso a essa rota'
            });
        }


        // OBTER PAGINAÇÃO
        const { page, limit, status, nome_empresa, estado } = req.validated.query;

        // FILTROS
        const where = {}

        if (cod_setor) { }
        if (cod_maquina) { }
        if (id_tecnico) { }
        if (datahora_abertura) { }
        if (datahora_atendimento) { }
        if (datahora_conclusao) { }

        try {
            // BUSCAR CHAMADOS
            const setores = await SetoresModel.listar(id_empresa);

            // SUCESSO: ENVIAR SETORES
            res.status(200).json({
                sucesso: true,
                mensagem: `Empresa ${id_empresa} - Setores listados com sucesso`,
                dados: { setores },
            });
        }
        catch (error) {
            // ERROS:
            console.error('Erro ao obter os chamadosl da empresa:', error);

            // ERRO DO SERVIDOR
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível obter os chamados da empresa'
            });
        }
    }
}


function ajustarIntervalo(data) {
    if (!data) return undefined;

    const de = data?.de
        ? new Date(data.de.setHours(0, 0, 0, 0))
        : undefined;

    const ate = data.ate
        ? new Date(data.ate.setHours(23, 59, 59, 999))
        : undefined;

    return { de, ate };
}

export default ChamadosController;