import { create, read, update, deleteRecord, dadosDashboard, dadosPainelChamados, comparePassword, hashPassword } from '../config/database.js';
import UserModel from './User.js';

class EmpresasModel {

    // REGISTRAR EMPRESA 
    static async criar(empresa, gerente) {
        try {
            // REGISTRAR NOVA EMPRESA
            const empresa = await create('empresas', empresa);

            gerente.senha = '123456'
            // REGISTRAR O 1º GERENTE PRINCIPAL DA EMPRESA
            const gerente = await UserModel.criar(gerente, id_empresa);

            // RETORNANDO O ID DA EMPRESA E DO GERENTE
            return { id_empresa: empresa.id, id_gerente: gerente.id }
        } catch (error) {
            // ERRO
            console.error('Erro ao registrar empresa:', error);
            throw error;
        }
    }

    // LISTAR TODAS AS EMPRESAS (Com paginação)
    static async listar(limit, offset, page, where, like, likeOr) {
        try {
            where = {
                ...where,
                id: "> 1"
            }

            // OBTER AS EMPRESAS
            const empresas = await read('empresas', {
                limit,
                offset,
                where,
                like,
                likeOr
            });

            // TOTAL DE EMPRESAS
            const [{ total }] = await read('empresas', {
                columns: ['COUNT(*) as total'],
                where,
                like,
                likeOr
            });

            // TOTAL DE PAGINAS
            const total_paginas = Math.ceil(total / limit)

            // RETORNAR AS EMPRESAS E INFORMAÇÕES DE PAGINAÇÃO
            return {
                lista: empresas,
                paginacao: {
                    total,
                    page,
                    limit,
                    total_paginas,
                }
            }
        } catch (error) {
            // ERRO
            console.error('Erro ao listar empresas: ', error);
            throw error;
        }
    }

    // BUSCAR POR CNPJ
    static async buscarPorCNPJ(cnpj) {
        try {
            // FAZER A CONSULTA
            const rows = await read('empresas', {
                where: {
                    cnpj
                }
            });

            // RETORNAR O PRIMEIRO DADO ENCONTRADO
            return rows[0] || null;
        } catch (error) {
            console.error('Erro ao buscar empresa por CNPJ:', error);
            throw error;
        }
    }

    // BUSCAR POR ID
    static async buscarPorId(id) {
        try {
            // FAZER A CONSULTA
            const rows = await read('empresas', {
                where: { id }
            });

            // RETORNAR O PRIMEIRO DADO ENCONTRADO
            return rows[0] || null;
        } catch (error) {
            console.error('Erro ao buscar usuário por ID:', error);
            throw error;
        }
    }

    // ATUALIZAR EMPRESA
    static async atualizar(id, dadosEmpresa) {
        try {
            return await update('empresas', dadosEmpresa, { id });
        } catch (error) {
            console.error('Erro ao atualizar empresa:', error);
            throw error;
        }
    }

    // ATUALIZAR LOGO
    static async atualizarLogo(id, logoNova) {
        try {
            return await update(
                'empresas',
                { logo: logoNova },
                { id }
            );
        } catch (error) {
            console.error('Erro ao atualizar empresa:', error);
            throw error;
        }
    }

    // OBTER DADOS DA EMPRESA
    static async infosGerais(id) {
        const usuarios = await read("usuarios", {
            columns: [
                "COUNT(*) AS total",
                "COUNT(CASE WHEN status = true THEN 1 END) AS ativos",
                "COUNT(CASE WHEN tipo_usuario IN (2, 3) THEN 1 END) AS gerentes",
                "COUNT(CASE WHEN tipo_usuario = 4 THEN 1 END) AS tecnicos"
            ],
            where: {
                id_empresa: id
            }
        });

        const gerente = await read("usuarios", {
            where: {
                id_empresa: id,
                tipo_usuario: 2
            }
        });

        const setores = await read("setores", {
            columns: [
                "COUNT(*) AS total",
                "COUNT(CASE WHEN status = TRUE THEN 1 END) AS ativos",
                "COUNT(CASE WHEN status = FALSE THEN 1 END) AS inativos"
            ],
            where: {
                id_empresa: id
            }
        });

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
                "s.id_empresa": 2
            }
        });

        const chamados = await read("chamados", {
            columns: [
                "COUNT(*) AS total",
                "COUNT(CASE WHEN estado = 'aberto' THEN 1 END) AS aguardando",
                "COUNT(CASE WHEN estado = 'andamento' THEN 1 END) AS andamento",
                "COUNT(CASE WHEN estado = 'concluido' THEN 1 END) AS concluidos"
            ],
            where: {
                id_empresa: id
            }
        });

        const ultimosChamados = await read("chamados c", {
            columns: [
                "c.*",
                "s.cod_setor as cod_setor",
                "m.cod_maquina as cod_maquina",
            ],
            where: {
                "c.id_empresa": id
            },
            join: [
                { type: "INNER", table: "setores s", on: "s.id = c.id_setor" },
                { type: "INNER", table: "maquinas m", on: "m.id = c.id_maquina" }
            ],
            orderBy: "datahora_abertura DESC",
            limit: 5
        });

        return {
            usuarios: usuarios[0] || null,
            gerente: gerente[0] || null,
            setores: setores[0] || null,
            maquinas: maquinas[0] || null,
            chamados: chamados[0] || null,
            ultimosChamados
        }
    }
}

export default EmpresasModel;