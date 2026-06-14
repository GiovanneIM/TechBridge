import { useEffect, useState, useCallback } from 'react';
import { API_FETCH } from '@/lib/api';
import { nestErrors } from '@/lib/zodErrors';

export function useMaquinas() {

    // MAQUINAS DE UMA EMPRESA
    const [maquinas, setMaquinas] = useState(null);

    // MAQUINA ESPECÌFICA
    const [maquina, setMaquina] = useState(null);

    // LOADING
    const [loading, setLoading] = useState({
        obterMaquinas: null,
        obterMaquinasDoSetor: null,
        obterMaquina: null,
        criarMaquina: null,
        atualizarMaquina: null,
        obterInfosMaquina: null,
    });

    // ERROS
    const [error, setError] = useState({
        obterMaquinas: null,
        obterMaquinasDoSetor: null,
        obterMaquina: null,
        criarMaquina: null,
        atualizarMaquina: null,
        obterInfosMaquina: null,
    });

    // MENSAGENS
    const [mensagem, setMensagem] = useState({
        obterMaquinas: null,
        obterMaquinasDoSetor: null,
        obterMaquina: null,
        criarMaquina: null,
        atualizarMaquina: null,
        obterInfosMaquina: null,
    });

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

    // OBTER MÁQUINAS DA EMPRESA
    const obterMaquinas = useCallback(async (id_empresa, filtro = {}) => {
        setLoading((prev) => ({ ...prev, obterMaquinas: true }));
        setError((prev) => ({ ...prev, obterMaquinas: null }));

        try {
            const params = new URLSearchParams();

            Object.entries(filtro).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== '') {
                    params.append(key, value);
                }
            });

            const query = params.toString();

            const data = await API_FETCH(`/empresas/${id_empresa}/maquinas?${query}`, {
                method: 'GET'
            });

            if (!data.sucesso) {
                setError((prev) => ({ ...prev, obterMaquinas: data.mensagem }))
            } else {
                setMaquinas(data.dados)
            }
        } catch (err) {
            if (err.message === 'Sessão expirada') return;

            setError((prev) => ({
                ...prev,
                obterMaquinas: 'Erro ao obter membros, tente novamente mais tarde.'
            }));
        } finally {
            setLoading((prev) => ({ ...prev, obterMaquinas: false }));
        }
    }, []);

    // OBTER MÁQUINAS DE UM SETOR DA EMPRESA
    const obterMaquinasDoSetor = useCallback(async (id_empresa, cod_setor, filtro = {}) => {
        setLoading((prev) => ({ ...prev, obterMaquinasDoSetor: true }));
        setError((prev) => ({ ...prev, obterMaquinasDoSetor: null }));

        try {
            const params = new URLSearchParams();

            Object.entries(filtro).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== '') {
                    params.append(key, value);
                }
            });

            const query = params.toString();

            const data = await API_FETCH(`/empresas/${id_empresa}/setores/${cod_setor}/maquinas?${query}`, {
                method: 'GET'
            });

            if (!data.sucesso) {
                setError((prev) => ({ ...prev, obterMaquinasDoSetor: data.mensagem }))
            } else {
                setMaquinas(data.dados)
            }
        } catch (err) {
            if (err.message === 'Sessão expirada') return;

            setError((prev) => ({
                ...prev,
                obterMaquinasDoSetor: 'Erro ao obter membros, tente novamente mais tarde.'
            }));
        } finally {
            setLoading((prev) => ({ ...prev, obterMaquinasDoSetor: false }));
        }
    }, []);

    // OBTER MÁQUINA ESPECÍFICA
    const obterMaquina = useCallback(async (id_empresa, cod_setor, cod_maquina) => {}, []);

    // CRIAR MÁQUINA
    const criarMaquina = useCallback(async (id_empresa, cod_setor, dados) => {}, []);

    // ATUALIZAR MÁQUINAS
    const atualizarMaquina = useCallback(async (id_empresa, cod_setor, cod_maquina, dados) => {}, []);

    // OBTER INFORMAÇÕES GERAIS DA MÁQUINA
    const obterInfosGerais = useCallback(async (id_empresa, cod_setor, cod_maquina) => {}, []);


    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

    return {
        loading, error, mensagem,
        maquinas, obterMaquinas, obterMaquinasDoSetor,
        maquina, obterMaquina,
        criarMaquina,
        atualizarMaquina,
        obterInfosGerais,
    };
}