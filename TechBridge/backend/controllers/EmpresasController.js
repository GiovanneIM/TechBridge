import EmpresasModel from "../models/EmpresasModel.js";
import { validarNome } from "../utils/validacoes.js";

class EmpresasController {

    // REGISTAR UMA NOVA EMPRESA
    static async registrarEmpresas(req, res) {
        const { empresa, gerente } = req.body;

        try {
            // VALIDADAR DADOS DA NOVA EMPRESA
            const validacaoEmpresa = validarEmpresa(empresa)

            // VALIDADAR DADOS DO NOVO GERENTE

        }
        catch {
        }
    }

    static async atualizarEmpresas(req, res) {
        const {
            cnpj,
            razao_social,
            nome_fantasia,
            endereco
        } = req.body;


    }
}

export default EmpresasController;
