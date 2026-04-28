import { create, read, update, deleteRecord, dadosDashboard, dadosPainelChamados, comparePassword, hashPassword } from '../config/database.js';

class EmpresasModel {
    // LISTAR TODAS AS EMPRESAS
    static async listarEmpresas() {
        try {
            // OBTER AS EMPRESAS
            const empresas = await read('empresas');

            // RETORNAR AS EMPRESAS
            return { empresas }
        } catch (error) {
            // ERRO
            console.error('Erro ao listar empresass: ', error);
            throw error;
        }
    }
}

export default EmpresasModel;