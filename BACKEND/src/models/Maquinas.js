import { create, read, update, deleteRecord, getConnection } from '../config/database.js';

class MaquinasModel {
    // REGISTRAR MÁQUINA
    static async criar(id_setor, dados) {
        try {
            const id_maquina = await create('maquinas', {
                ...dados,
                id_setor
            });
            return { id_maquina };
        } catch (error) {
            console.error('Erro ao registrar máquina:', error);
            throw error;
        }
    }

    // LISTAR MÁQUINAS DE UMA EMPRESA (com cod_setor para o frontend)
    static async listarDaEmpresa(id_empresa) {
        try {
            const maquinas = await read("maquinas m", {
                columns: ['m.*', 's.cod_setor'],
                where: { 'e.id': id_empresa },
                join: [
                    { type: "INNER", table: "setores s", on: "s.id = m.id_setor" },
                    { type: "INNER", table: "empresas e", on: "e.id = s.id_empresa" }
                ]
            });
            return maquinas;
        } catch (error) {
            console.error('Erro ao listar máquinas:', error);
            throw error;
        }
    }

    // LISTAR MÁQUINAS DE UM SETOR
    static async listarDoSetor(id_setor) {
        try {
            const maquinas = await read("maquinas", {
                where: { id_setor },
            });
            return maquinas;
        } catch (error) {
            console.error('Erro ao listar máquinas:', error);
            throw error;
        }
    }

    // BUSCAR POR CÓDIGO
    static async buscarCodigo(id_setor, cod_maquina) {
        try {
            const maquina = await read("maquinas", {
                where: { id_setor, cod_maquina }
            });
            return maquina[0] || null;
        } catch (error) {
            console.error('Erro ao buscar maquina por código:', error);
            throw error;
        }
    }

    // BUSCAR POR ID
    static async buscarPorId(id_maquina) {
        try {
            const maquina = await read("maquinas", {
                where: { id: id_maquina }
            });
            return maquina[0] || null;
        } catch (error) {
            console.error('Erro ao buscar maquina por id:', error);
            throw error;
        }
    }

    // ATUALIZAR MÁQUINA
    static async atualizar(id_maquina, dados) {
        try {
            const resultado = await update("maquinas", dados, { id: id_maquina });
            return resultado;
        } catch (error) {
            console.error('Erro ao atualizar máquina:', error);
            throw error;
        }
    }

    // DELETAR MÁQUINA (com limpeza de chamados)
    static async deletar(id_maquina) {
        try {
            await deleteRecord("chamados", { id_maquina });
            const resultado = await deleteRecord("maquinas", { id: id_maquina });
            return resultado;
        } catch (error) {
            console.error('Erro ao deletar máquina e seus chamados:', error);
            throw error;
        }
    }
}

export default MaquinasModel;