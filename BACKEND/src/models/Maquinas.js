import { create, read, update, deleteRecord, comparePassword, hashPassword, getConnection } from '../config/database.js';

class MaquinasModel {
    // REGISTRAR MÁQUINA
    static async criar(id_setor, dados) {
        try {
            // REGISTRAR MÁQUINA
            const id_maquina = await create('maquinas', {
                ...dados,
                id_setor
            });

            // RETORNANDO O ID DA MÁQUINA
            return { id_maquina }
        } catch (error) {
            // ERRO
            console.error('Erro ao registrar máquina:', error);
            throw error;
        }
    }

    // LISTAR MÁQUINAS DE UMA EMPRESA
    static async listarDaEmpresa(id_empresa, limit, offset, page, where, like, likeOr) {
        try {
            // FAZER A CONSULTA
            const maquinas = await read("maquinas m", {
                columns: ['m.*', 's.cod_setor', 's.nome as nome_setor', 's.id_empresa'],
                join: [
                    { type: "INNER", table: "setores s", on: "s.id = m.id_setor" },
                    { type: "INNER", table: "empresas e", on: "e.id = s.id_empresa" }
                ],
                where: {
                    'e.id': id_empresa,
                    ...where
                },
                like,
                likeOr,
                limit,
                offset,
            })

            // TOTAL DE SETORES DA BUSCA
            const [{ total }] = await read('maquinas m', {
                columns: ['COUNT(*) as total'],
                join: [
                    { type: "INNER", table: "setores s", on: "s.id = m.id_setor" },
                    { type: "INNER", table: "empresas e", on: "e.id = s.id_empresa" }
                ],
                where: {
                    'e.id': id_empresa,
                    ...where
                },
                like,
                likeOr
            });

            // TOTAL DE PAGINAS
            const total_paginas = Math.ceil(total / limit)

            // RETORNANDO AS MÁQUINAS E INFORMAÇÕES DE PAGINAÇÃO
            return {
                lista: maquinas,
                paginacao: {
                    total,
                    page,
                    limit,
                    total_paginas,
                }
            }
        } catch (error) {
            console.error('Erro ao listar máquinas:', error);
            throw error;
        }
    }

    // LISTAR MÁQUINAS DE UM SETOR
    static async listarDoSetor(id_setor, limit, offset, page, where, like, likeOr) {
        try {
            // FAZER A CONSULTA
            const maquinas = await read("maquinas m", {
                columns: ['m.*', 's.cod_setor', 's.nome as nome_setor', 's.id_empresa'],
                join: [
                    { type: "INNER", table: "setores s", on: "s.id = m.id_setor" },
                ],
                where: {
                    'm.id_setor': id_setor,
                    ...where
                },
                like,
                likeOr,
                limit,
                offset,
            })

            // TOTAL DE SETORES DA BUSCA
            const [{ total }] = await read('maquinas m', {
                columns: ['COUNT(*) as total'],
                join: [
                    { type: "INNER", table: "setores s", on: "s.id = m.id_setor" }
                ],
                where: {
                    'm.id_setor': id_setor,
                    ...where
                },
                like,
                likeOr
            });

            // TOTAL DE PAGINAS
            const total_paginas = Math.ceil(total / limit)

            // RETORNANDO AS MÁQUINAS E INFORMAÇÕES DE PAGINAÇÃO
            return {
                lista: maquinas,
                paginacao: {
                    total,
                    page,
                    limit,
                    total_paginas,
                }
            }
        } catch (error) {
            console.error('Erro ao listar máquinas:', error);
            throw error;
        }
    }

    // BUSCAR POR CÓDIGO
    static async buscarCodigo(id_setor, cod_maquina) {
        try {
            console.log(id_setor);
            console.log(cod_maquina);


            // FAZER A CONSULTA
            const maquina = await read("maquinas", {
                where: { id_setor, cod_maquina }
            })

            // RETORNANDO O SETOR
            return maquina[0] || null
        } catch (error) {
            console.error('Erro ao buscar maquina por código:', error);
            throw error;
        }
    }

    // BUSCAR POR ID
    static async buscarPorId(id_maquina) {
        try {
            // FAZER A CONSULTA
            const setor = await read("maquinas", {
                where: { id_maquina }
            })

            // RETORNANDO O SETOR
            return setor[0] || null
        } catch (error) {
            console.error('Erro ao buscar maquina por id:', error);
            throw error;
        }
    }
}

export default MaquinasModel;