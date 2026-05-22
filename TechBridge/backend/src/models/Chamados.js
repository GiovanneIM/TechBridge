import { read, update, create, deleteRecord } from "../config/database.js";

class ChamadosModel {

    // LISTAR CHAMADOS DE UMA EMPRESA
    static async listar(id_empresa) {
        const chamados = await read("chamados", {
            where: { id_empresa }
        })

        return chamados;
    }

    static async buscarPorId(id) {
        const rows = await read("chamados", {
            where: { id }
        })

        return rows[0];
    }
}

export default ChamadosModel;