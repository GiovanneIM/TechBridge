import { create, read, update, deleteRecord, comparePassword, hashPassword } from '../config/database.js';

class ChamadosModel {

    //  LISTAR CHAMADOS
    static async listarChamados(options) {
        try {
            // Fazendo a consulta
            const chamados = await read("chamados", options);

            // Retornando os chamados
            return { chamados };
        } catch (error) {
            console.error('Erro ao listar chamados:', error);
            throw error;
        }
    }

}

export default ChamadosModel;