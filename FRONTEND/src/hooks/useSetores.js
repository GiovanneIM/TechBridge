import { useEffect, useState, useCallback } from 'react';
import { API_FETCH } from '@/lib/api';
import { nestErrors } from '@/lib/zodErrors';

export function useSetores() {

    // SETORES DE UMA EMPRESA
    const [setores, setSetores] = useState(null);

    // SETOR ESPECÌFICO
    const [setor, setSetor] = useState(null);

    // LOADING
    const [loading, setLoading] = useState({
        obterSetores: null,
        obterSetor: null,
        criarSetor: null,
        atualizarSetor: null,
        obterInfosSetor: null,
    });

    // ERROS
    const [error, setError] = useState({
        obterSetores: null,
        criarSetor: null,
        obterSetor: null,
        atualizarSetor: null,
        obterInfosSetor: null,
    });

    // MENSAGENS
    const [mensagem, setMensagem] = useState({
        obterSetores: null,
        criarSetor: null,
        obterSetor: null,
        atualizarSetor: null,
        obterInfosSetor: null,
    });

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

    // OBTER SETORES DE UMA EMPRESA
    const obterSetores = useCallback(async (id_empresa, filtro = {}) => {
        setLoading((prev) => ({ ...prev, obterSetores: true }));
        setError((prev) => ({ ...prev, obterSetores: null }));

        try {
            const params = new URLSearchParams();

            Object.entries(filtro).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== '') {
                    params.append(key, value);
                }
            });

            const query = params.toString();

            const data = await API_FETCH(`/empresas/${id_empresa}/setores?${query}`, {
                method: 'GET'
            });

            if (!data.sucesso) {
                setError((prev) => ({ ...prev, obterSetores: data.mensagem }))
            } else {
                setSetores(data.dados)
            }
        } catch (err) {
            if (err.message === 'Sessão expirada') return;

            setError((prev) => ({
                ...prev,
                obterSetores: 'Erro ao obter membros, tente novamente mais tarde.'
            }));
        } finally {
            setLoading((prev) => ({ ...prev, obterSetores: false }));
        }
    }, []);

    // OBTER SETOR ESPECÍFICO
    const obterSetor = useCallback(async (id_empresa, cod_setor) => {
        setLoading((prev) => ({ ...prev, obterSetor: true }));
        setError((prev) => ({ ...prev, obterSetor: null }));

        try {
            const data = await API_FETCH(`/empresas/${id_empresa}/setores/${cod_setor}`, {
                method: 'GET'
            });

            if (!data.sucesso) {
                setError((prev) => ({ ...prev, obterSetor: data.mensagem }))
            } else {
                setSetor(data.dados)
            }
        } catch (err) {
            if (err.message === 'Sessão expirada') return;

            setError((prev) => ({
                ...prev,
                obterSetor: 'Erro ao obter setor, tente novamente mais tarde.'
            }));
        } finally {
            setLoading((prev) => ({ ...prev, obterSetor: false }));
        }
    }, []);

    // CRIAR SETOR
    const criarSetor = useCallback(async (id_empresa, dados) => {
        setLoading((prev) => ({ ...prev, criarSetor: true }));
        setError((prev) => ({ ...prev, criarSetor: null }));
        setMensagem((prev) => ({ ...prev, criarSetor: null }));


        try {
            const data = await API_FETCH(`/empresas/${id_empresa}/setores`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados),
            });

            if (!data.sucesso) {
                if (data.mensagem) {
                    setError((prev) => ({ ...prev, criarSetor: { mensagem: data.mensagem } }))
                } else {
                    const nestedErrors = nestErrors(data.erros_zod);
                    setError((prev) => ({ ...prev, criarSetor: { zod: nestedErrors } }))
                }
            } else {
                setMensagem((prev) => ({ ...prev, criarSetor: data.mensagem }))
                setSetor(data.dados);

                return true;
            }
        } catch (err) {
            if (err.message === 'Sessão expirada') return;

            setError((prev) => ({
                ...prev,
                criarSetor: 'Erro ao registrar setor, tente novamente mais tarde.'
            }));
        } finally {
            setLoading((prev) => ({ ...prev, criarSetor: false }));
        }
    }, []);

    // ATUALIZAR SETOR
    const atualizarSetor = useCallback(async (id_empresa, cod_setor, dados) => {
        setLoading((prev) => ({ ...prev, atualizarSetor: true }));
        setError((prev) => ({ ...prev, atualizarSetor: null }));
        setMensagem((prev) => ({ ...prev, atualizarSetor: null }));

        try {
            const data = await API_FETCH(`/empresas/${id_empresa}/setores/${cod_setor}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados),
            });

            if (!data.sucesso) {
                if (data.mensagem) {
                    setError((prev) => ({ ...prev, atualizarSetor: { mensagem: data.mensagem } }))
                } else {
                    const nestedErrors = nestErrors(data.erros_zod);
                    setError((prev) => ({ ...prev, atualizarSetor: { zod: nestedErrors } }))
                }
            } else {
                setMensagem((prev) => ({ ...prev, atualizarSetor: data.mensagem }))
                setSetor(data.dados)
            }
        } catch (err) {
            if (err.message === 'Sessão expirada') return;

            setError((prev) => ({
                ...prev,
                atualizarSetor: 'Erro ao atualizar setor, tente novamente mais tarde.'
            }));
        } finally {
            setLoading((prev) => ({ ...prev, atualizarSetor: false }));
        }
    }, []);

    // OBTER INFORMAÇÕES GERAIS DO SETOR
    const obterInfosGerais = useCallback(async (id_empresa, cod_setor) => { }, []);

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

    return {
        loading, error, mensagem,
        setores, obterSetores,
        setor, obterSetor,
        criarSetor,
        atualizarSetor,
        obterInfosGerais,
    };
}