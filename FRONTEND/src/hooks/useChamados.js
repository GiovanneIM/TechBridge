import { useEffect, useState, useCallback } from 'react';
import { API_FETCH } from '@/lib/api';
import { nestErrors } from '@/lib/zodErrors';

export function useChamados() {

    // LISTA DE CHAMADOS
    const [chamados, setChamados] = useState(null);

    // CHAMADO ESPECÍFICO
    const [chamado, setChamado] = useState(null);

    // LOADING
    const [loading, setLoading] = useState({
        obterChamadosDaEmpresa: null,
        obterChamadosDoSetor: null,
        obterChamadosDaMaquina: null,
    });

    // ERROS
    const [error, setError] = useState({
        obterChamadosDaEmpresa: null,
        obterChamadosDoSetor: null,
        obterChamadosDaMaquina: null,
    });

    // MENSAGENS
    const [mensagem, setMensagem] = useState({
        obterChamadosDaEmpresa: null,
        obterChamadosDoSetor: null,
        obterChamadosDaMaquina: null,
    });

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

    // OBTER CHAMADOS DE UMA EMPRESA
    const obterChamadosDaEmpresa = useCallback(async (id_empresa, filtro = {}) => {
        setLoading((prev) => ({ ...prev, obterChamadosDaEmpresa: true }));
        setError((prev) => ({ ...prev, obterChamadosDaEmpresa: null }));

        try {
            const params = new URLSearchParams();

            Object.entries(filtro).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== '') {
                    params.append(key, value);
                }
            });

            const query = params.toString();

            const data = await API_FETCH(`/empresas/${id_empresa}/chamados?${query}`, {
                method: 'GET'
            });

            if (!data.sucesso) {
                setError((prev) => ({ ...prev, obterChamadosDaEmpresa: data.mensagem }))
            } else {
                setChamados(data.dados)
            }
        } catch (err) {
            if (err.message === 'Sessão expirada') return;

            setError((prev) => ({
                ...prev,
                obterChamadosDaEmpresa: 'Erro ao obter chamados, tente novamente mais tarde.'
            }));
        } finally {
            setLoading((prev) => ({ ...prev, obterChamadosDaEmpresa: false }));
        }
    }, []);

    // OBTER CHAMADOS DE UM SETOR
    const obterChamadosDoSetor = useCallback(async (id_empresa, cod_setor, filtro = {}) => {
        setLoading((prev) => ({ ...prev, obterChamadosDoSetor: true }));
        setError((prev) => ({ ...prev, obterChamadosDoSetor: null }));

        try {
            const params = new URLSearchParams();

            Object.entries(filtro).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== '') {
                    params.append(key, value);
                }
            });

            const query = params.toString();

            const data = await API_FETCH(`/empresas/${id_empresa}/setores/${cod_setor}/chamados?${query}`, {
                method: 'GET'
            });

            if (!data.sucesso) {
                setError((prev) => ({ ...prev, obterChamadosDoSetor: data.mensagem }))
            } else {
                setChamados(data.dados)
            }
        } catch (err) {
            if (err.message === 'Sessão expirada') return;

            setError((prev) => ({
                ...prev,
                obterChamadosDoSetor: 'Erro ao obter chamados, tente novamente mais tarde.'
            }));
        } finally {
            setLoading((prev) => ({ ...prev, obterChamadosDoSetor: false }));
        }
    }, []);


    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

    return {
        loading, error, mensagem,
        chamados, obterChamadosDaEmpresa,
        obterChamadosDoSetor, 
        chamado, obterSetor,
    };
}