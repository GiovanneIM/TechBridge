import { read, update, create, deleteRecord } from "../config/database.js";

class ChamadosModel {
    // CRIAR CHAMADOS
    static async chamar(data) {
        // OBTENDO CÓDIGO DO CHAMADO
        const [resultado] = await read("chamados", {
            columns: ["MAX(cod_chamado) as max_cod"],
            where: {
                id_maquina: data.id_maquina
            }
        });
        const cod_chamado = (resultado?.max_cod || 0) + 1;

        // CRIANDO O CHAMADO
        const chamado = await create("chamados", {
            ...data,
            cod_chamado,
        })

        return chamado;
    }

    // LISTAR CHAMADOS DE UMA EMPRESA
    static async listar(where) {
        const chamados = await read("chamados", {
            where
        })

        return chamados;
    }

    // BUSCAR POR CODIGO
    static async buscarPorCodigo(where) {
        const rows = await read("chamados", {
            where
        })

        return rows[0];
    }

    // BUSCAR POR ID
    static async buscarPorId(id) {
        const rows = await read("chamados", {
            where: { id }
        })

        return rows[0];
    }

    // BUSCAR POR ID
    static async atualizar(id, data) {
        const affectedRows = await update("chamados",
            data,
            { id }
        )

        return affectedRows;
    }
}

export default ChamadosModel;