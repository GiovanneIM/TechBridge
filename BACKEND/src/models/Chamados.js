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
                "u.nome as tecnico_nome"
            ],
            join: [
                { type: "INNER", table: "setores s", on: "s.id = c.id_setor" },
                { type: "INNER", table: "maquinas m", on: "m.id = c.id_maquina" },
                { type: "LEFT", table: "usuarios u", on: "u.id = c.id_tecnico" },
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
            where: { "c.id": id }
        })

        return rows[0];
    }

    // ATUALIZAR
    static async atualizar(id, data) {
        const affectedRows = await update("chamados",
            data,
            { id }
        )

        return affectedRows;
    }

    static async obterDashboard(options = {}) {
        try {
            const where = {};
            if (options.id_empresa) where["c.id_empresa"] = options.id_empresa;
            if (options.estado) where["c.estado"] = options.estado;

            // TOTAL GERAL
            const [{ total }] = await read("chamados c", {
                columns: ["COUNT(*) as total"],
                where
            });

            // POR ESTADO
            const porEstado = await read("chamados c", {
                columns: ["estado", "COUNT(*) as total"],
                where,
                groupBy: "estado"
            });

            // POR DIA (últimos 30 dias)
            const chamadosPorDia = await read("chamados c", {
                columns: [
                    "DATE(datahora_abertura) as dia",
                    "COUNT(*) as total"
                ],
                where,
                groupBy: "DATE(datahora_abertura)",
                orderBy: "dia ASC"
            });

            const dashboard = {
                totalChamados: total,
                porEstado: [
                    { estado: "aberto", total: porEstado.find(e => e.estado === "aberto")?.total ?? 0 },
                    { estado: "andamento", total: porEstado.find(e => e.estado === "andamento")?.total ?? 0 },
                    { estado: "concluido", total: porEstado.find(e => e.estado === "concluido")?.total ?? 0 },
                ],
                chamadosPorDia
            };

            return dashboard;
        } catch (error) {
            console.error('Erro ao obter dados para dashboard:', error);
            throw error;
        }
    }
}

export default ChamadosModel;