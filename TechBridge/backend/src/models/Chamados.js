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
        const chamados = await read("chamados c", {
            columns: [
                "c.*",
                "s.cod_setor as cod_setor",
                "m.cod_maquina as cod_maquina",
            ],
            join: [
                { type: "INNER", table: "setores s", on: "s.id = c.id_setor" },
                { type: "INNER", table: "maquinas m", on: "m.id = c.id_maquina" }
            ],
            where
        })

        return chamados;
    }

    // BUSCAR POR CODIGO
    static async buscarPorCodigo(where) {
        const rows = await read("chamados c", {
            columns: [
                "c.*",
                "s.cod_setor as cod_setor",
                "m.cod_maquina as cod_maquina",
            ],
            join: [
                { type: "INNER", table: "setores s", on: "s.id = c.id_setor" },
                { type: "INNER", table: "maquinas m", on: "m.id = c.id_maquina" }
            ],
            where
        })

        return rows[0];
    }

    // BUSCAR POR ID
    static async buscarPorId(id) {
        const rows = await read("chamados", {
            columns: [
                "c.*",
                "s.cod_setor as cod_setor",
                "m.cod_maquina as cod_maquina",
            ],
            join: [
                { type: "INNER", table: "setores s", on: "s.id = c.id_setor" },
                { type: "INNER", table: "maquinas m", on: "m.id = c.id_maquina" }
            ],
            where: { "c.id": id }
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