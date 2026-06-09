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
    static async listarDaEmpresa(id_empresa) {
        try {
            // FAZER A CONSULTA
            const maquinas = await read("maquinas m", {
                columns: ['m.*'],
                where: { 'e.id': id_empresa },
                join: [
                    { type: "INNER", table: "setores s", on: "s.id = m.id_setor" },
                    { type: "INNER", table: "empresas e", on: "e.id = s.id_empresa" }
                ]
            })

            // RETORNANDO AS MÁQUINAS
            return maquinas
        } catch (error) {
            console.error('Erro ao listar máquinas:', error);
            throw error;
        }
    }

    // LISTAR MÁQUINAS DE UM SETOR
    static async listarDoSetor(id_setor) {
        try {
            // FAZER A CONSULTA
            const maquinas = await read("maquinas", {
                where: { id_setor },
            })

            // RETORNANDO AS MÁQUINAS
            return maquinas
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
                where: { id: id_maquina }
            })

            // RETORNANDO O SETOR
            return setor[0] || null
        } catch (error) {
            console.error('Erro ao buscar maquina por id:', error);
            throw error;
        }
    }

    // DELETAR MÁQUINA POR ID (Com limpeza de chamados)
    static async deletar(id_maquina) {
        try {
            // 1. Apaga primeiro todos os chamados que apontam para essa máquina
            await deleteRecord("chamados", {
                id_maquina: id_maquina
            });

            // 2. Agora que a máquina está "livre", podemos apagá-la
            const resultado = await deleteRecord("maquinas", {
                id: id_maquina
            });

            return resultado;
        } catch (error) {
            console.error('Erro ao deletar máquina e seus chamados:', error);
            throw error;
        }
    }
}

export default MaquinasModel;