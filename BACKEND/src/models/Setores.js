import { create, read, update, deleteRecord, comparePassword, hashPassword, getConnection } from '../config/database.js';

class SetoresModel {
    // REGISTRAR SETOR
    static async criar(id_empresa, dados) {
        try {
            // REGISTRAR SETOR
            const id_setor = await create('setores', {
                ...dados,
                id_empresa
            });

            // RETORNANDO O ID DA EMPRESA E DO SETOR
            return await this.buscarPorId(id_setor);
        } catch (error) {
            // ERRO
            console.error('Erro ao registrar setor:', error);
            throw error;
        }
    }

    // LISTAR SETORES DE UMA EMPRESA
    static async listar(id_empresa, limit, offset, page, where, like, likeOr) {
        try {
            // OBTER OS SETORES
            const setores = await read("setores", {
                where,
                like,
                likeOr,
                limit,
                offset,
            })

            // TOTAL DE SETORES DA BUSCA
            const [{ total }] = await read('setores', {
                columns: ['COUNT(*) as total'],
                where,
                like,
                likeOr
            });

            // TOTAL DE PAGINAS
            const total_paginas = Math.ceil(total / limit)

            // RETORNANDO OS SETORES E INFORMAÇÕES DE PAGINAÇÃO
            return {
                lista: setores,
                paginacao: {
                    total,
                    page,
                    limit,
                    total_paginas,
                }
            }
        } catch (error) {
            console.error('Erro ao listar setores:', error);
            throw error;
        }
    }

    // BUSCAR POR CÓDIGO
    static async buscarCodigo(id_empresa, cod_setor) {
        try {
            // FAZER A CONSULTA
            const setor = await read("setores", {
                where: { id_empresa, cod_setor }
            })

            // RETORNANDO O SETOR
            return setor[0] || null
        } catch (error) {
            console.error('Erro ao buscar setor por código:', error);
            throw error;
        }
    }

    // BUSCAR POR ID
    static async buscarPorId(id_setor) {
        try {
            // FAZER A CONSULTA
            const setor = await read("setores", {
                where: { id: id_setor }
            })

            // RETORNANDO O SETOR
            return setor[0] || null
        } catch (error) {
            console.error('Erro ao buscar setor por id:', error);
            throw error;
        }
    }

    // INFOS GERAIS DO SETOR
    static async infosGerais(id_empresa, cod_setor) {

        // INFORMAÇÕES DAS MÁQUINAS DO SETOR
        // • total
        // • ativas
        // • inativas
        const maquinas = await read("maquinas m", {
            columns: [
                "COUNT(*) AS total",
                "COUNT(CASE WHEN m.status = 'ativa' THEN 1 END) AS ativas",
                "COUNT(CASE WHEN m.status = 'inativa' THEN 1 END) AS inativas"
            ],
            join: [
                {
                    type: "INNER",
                    table: "setores s",
                    on: "s.id = m.id_setor"
                }
            ],
            where: {
                "s.id_empresa": id_empresa,
                "s.cod_setor": cod_setor
            }
        });

        // INFORMAÇÕES DOS CHAMADOS DO SETOR
        // • total
        // • aguardando
        // • andamento
        // • concluidos
        const chamados = await read("chamados c", {
            columns: [
                "COUNT(*) AS total",
                "COUNT(CASE WHEN estado = 'aberto' THEN 1 END) AS aguardando",
                "COUNT(CASE WHEN estado = 'andamento' THEN 1 END) AS andamento",
                "COUNT(CASE WHEN estado = 'concluido' THEN 1 END) AS concluidos"
            ],
            join: [
                {
                    type: "INNER",
                    table: "setores s",
                    on: "s.id = c.id_setor"
                }
            ],
            where: {
                "c.id_empresa": id_empresa,
                "s.cod_setor": cod_setor
            }
        });

        // INFORMAÇÕES SOBRE TEMPO (Em minutos)
        // • tempo_medio_espera
        const [{ tempo_medio_espera }] = await read("chamados c", {
            columns: [
                `
                AVG(
                    TIMESTAMPDIFF(MINUTE, datahora_abertura, datahora_atendimento)
                ) AS tempo_medio_espera
                `
            ],
            join: [
                {
                    type: "INNER",
                    table: "setores s",
                    on: "s.id = c.id_setor"
                }
            ],
            where: {
                "c.datahora_atendimento": "NOT_NULL",
                "c.id_empresa": id_empresa,
                "s.cod_setor": cod_setor,
            }
        });

        // • tempo_medio_atendimento
        const [{ tempo_medio_atendimento }] = await read("chamados c", {
            columns: [
                `
                AVG(
                    TIMESTAMPDIFF(MINUTE, datahora_atendimento, datahora_conclusao)
                ) AS tempo_medio_atendimento
                `
            ],
            join: [
                {
                    type: "INNER",
                    table: "setores s",
                    on: "s.id = c.id_setor"
                }
            ],
            where: {
                "c.datahora_atendimento": "NOT_NULL",
                "c.datahora_conclusao": "NOT_NULL",
                "c.id_empresa": id_empresa,
                "s.cod_setor": cod_setor,
            }
        });

        // • tempo_medio_maquina_parada
        const [{ tempo_medio_maquina_parada }] = await read("chamados c", {
            columns: [
                `
                AVG(
                    TIMESTAMPDIFF(MINUTE, datahora_abertura, datahora_conclusao)
                ) AS tempo_medio_maquina_parada
                `
            ],
            join: [
                {
                    type: "INNER",
                    table: "setores s",
                    on: "s.id = c.id_setor"
                }
            ],
            where: {
                "c.datahora_conclusao": "NOT_NULL",
                "c.id_empresa": id_empresa,
                "s.cod_setor": cod_setor,
            }
        });

        // ESTADOS DOS CHAMADOS CRIADOS NOS ÚLTIMOS 6 MESES
        const estadoUltimosMeses = await read("chamados c", {
            columns: [
                "DATE_FORMAT(c.datahora_abertura, '%Y-%m') AS mes",
                "SUM(CASE WHEN c.estado = 'aberto' THEN 1 ELSE 0 END) AS aberto",
                "SUM(CASE WHEN c.estado = 'andamento' THEN 1 ELSE 0 END) AS andamento",
                "SUM(CASE WHEN c.estado = 'concluido' THEN 1 ELSE 0 END) AS concluido"
            ],
            join: [
                {
                    type: "INNER",
                    table: "setores s",
                    on: "s.id = c.id_setor"
                }
            ],
            where: {
                "c.datahora_abertura": { raw: ">= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)" },
                "c.id_empresa": id_empresa,
                "s.cod_setor": cod_setor,
            },
            groupBy: ["mes"],
            orderBy: ["mes ASC"]
        })

        // NÚMERO DE CHAMADOS CRIADOS, ATENDIDOS OU CONCLUIDOS NOS ÚLTIMOS 6 MESES POR MES E ESTADO
        const abertosUltimosMeses = await read("chamados c", {
            columns: [
                "DATE_FORMAT(c.datahora_abertura, '%Y-%m') AS mes",
                "COUNT(*) as abertos"
            ],
            join: [
                {
                    type: "INNER",
                    table: "setores s",
                    on: "s.id = c.id_setor"
                }
            ],
            where: {
                "c.datahora_abertura": { raw: ">= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)" },
                "c.id_empresa": id_empresa,
                "s.cod_setor": cod_setor,
            },
            groupBy: ["mes"],
            orderBy: ["mes ASC"]
        })

        const atendidosUltimosMeses = await read("chamados c", {
            columns: [
                "DATE_FORMAT(c.datahora_atendimento, '%Y-%m') AS mes",
                "COUNT(*) as atendidos"
            ],
            join: [
                {
                    type: "INNER",
                    table: "setores s",
                    on: "s.id = c.id_setor"
                }
            ],
            where: {
                "c.datahora_atendimento": { raw: "IS NOT NULL AND c.datahora_atendimento >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)" },
                "c.id_empresa": id_empresa,
                "s.cod_setor": cod_setor,
            },
            groupBy: ["mes"],
            orderBy: ["mes ASC"]
        })

        const concluidosUltimosMeses = await read("chamados c", {
            columns: [
                "DATE_FORMAT(c.datahora_conclusao, '%Y-%m') AS mes",
                "COUNT(*) as concluidos"
            ],
            join: [
                {
                    type: "INNER",
                    table: "setores s",
                    on: "s.id = c.id_setor"
                }
            ],
            where: {
                "c.datahora_conclusao": { raw: "IS NOT NULL AND c.datahora_conclusao >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)" },
                "c.id_empresa": id_empresa,
                "s.cod_setor": cod_setor,
            },
            groupBy: ["mes"],
            orderBy: ["mes ASC"]
        })

        return {
            maquinas: maquinas[0] || null,
            chamados: chamados[0] || null,
            tempo_medio: {
                espera: Number(tempo_medio_espera) || null,
                atendimento: Number(tempo_medio_atendimento) || null,
                maquina_parada: Number(tempo_medio_maquina_parada) || null,
            },
            estadoUltimosMeses: estadoUltimosMeses || null,
            ultimosMeses: {
                criadosUltimosMeses: criadosUltimosMeses || null,
                atendidosUltimosMeses: atendidosUltimosMeses || null,
                concluidosUltimosMeses: concluidosUltimosMeses || null,
            }
        }
    }
}

export default SetoresModel;
