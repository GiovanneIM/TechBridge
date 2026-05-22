import { read, update, create, deleteRecord } from "../config/database.js";

class ChamadosModel {

    // LISTAR CHAMADOS DE UMA EMPRESA
    static async listar(where) {
        const chamados = await read("chamados", {
            where
        })

        return chamados;
    }

    static async buscarPorCodigo(where) {
        const rows = await read("chamados", {
            where
        })

        return rows[0];
    }

    static async buscarPorId(id) {
        const rows = await read("chamados", {
            where: { id }
        })

        return rows[0];
    }
}

export default ChamadosModel;