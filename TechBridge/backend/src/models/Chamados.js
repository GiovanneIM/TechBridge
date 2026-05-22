import { read, update, create, deleteRecord } from "../config/database";

class ChamadosModel {

    // LISTAR CHAMADOS DE UMA EMPRESA
    static async listar(id_empresa) {
        const chamados = read("chamados", {
            where: { id_empresa }
        })

        return chamados;
    }
}

export default ChamadosModel;