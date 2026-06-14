import { useEffect, useState, useCallback } from 'react';
import { API_FETCH } from '@/lib/api';
import { nestErrors } from '@/lib/zodErrors';

export function useMembros() {

    // MEMBROS DE UMA EMPRESA
    const [membros, setMembros] = useState(null);

    // MEMBRO ESPECÍFICO
    const [membro, setMembro] = useState(null);

    // LOADING
    const [loading, setLoading] = useState({
        obterMembros: null,
        obterMembro: null,
        criarMembro: null,
        atualizarMembro: null,
        obterInfosMembro: null,
    });

    // ERROS
    const [error, setError] = useState({
        obterMembros: null,
        obterMembro: null,
        criarMembro: null,
        atualizarMembro: null,
        obterInfosMembro: null,
    });

    // MENSAGENS
    const [mensagem, setMensagem] = useState({
        obterMembros: null,
        obterMembro: null,
        criarMembro: null,
        atualizarMembro: null,
        obterInfosMembro: null,
    });

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

    // OBTER MEMBROS (Gerente)
    const obterMembros = useCallback(async (id_empresa, filtro = {}) => {
        setLoading((prev) => ({ ...prev, obterMembros: true }));
        setError((prev) => ({ ...prev, obterMembros: null }));
        setMensagem((prev) => ({ ...prev, obterMembros: null }));

        try {
            const params = new URLSearchParams();

            Object.entries(filtro).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== '') {
                    params.append(key, value);
                }
            });

            const query = params.toString();

            const data = await API_FETCH(`/empresas/${id_empresa}/membros?${query}`, {
                method: 'GET'
            });

            if (!data.sucesso) {
                setError((prev) => ({ ...prev, obterMembros: data.mensagem }))
            } else {
                setMembros(data.dados)
            }
        } catch (err) {
            if (err.message === 'Sessão expirada') return;

            setError((prev) => ({
                ...prev,
                obterMembros: 'Erro ao obter membros, tente novamente mais tarde.'
            }));
        } finally {
            setLoading((prev) => ({ ...prev, obterMembros: false }));
        }
    }, []);

    // OBTER MEMBRO (Gerente)
    const obterMembro = useCallback(async (id_empresa, cod_usuario) => {
        setLoading((prev) => ({ ...prev, obterMembro: true }));
        setError((prev) => ({ ...prev, obterMembro: null }));
        setMensagem((prev) => ({ ...prev, obterMembro: null }));


        try {
            const data = await API_FETCH(`/empresas/${id_empresa}/membros/${cod_usuario}`, {
                method: 'GET'
            });

            if (!data.sucesso) {
                setError((prev) => ({ ...prev, obterMembro: data.mensagem }))
            } else {
                setMembro(data.dados.membro)
            }
        } catch (err) {
            if (err.message === 'Sessão expirada') return;

            setError((prev) => ({
                ...prev,
                obterMembro: 'Erro ao obter membro, tente novamente mais tarde.'
            }));
        } finally {
            setLoading((prev) => ({ ...prev, obterMembro: false }));
        }
    }, []);

    // CRIAR MEMBRO
    const criarMembro = useCallback(async (id_empresa, dados) => {
        setLoading((prev) => ({ ...prev, criarMembro: true }));
        setError((prev) => ({ ...prev, criarMembro: null }));
        setMensagem((prev) => ({ ...prev, criarMembro: null }));


        try {

            const data = await API_FETCH(`/empresas/${id_empresa}/membros`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados),
            });

            if (!data.sucesso) {
                if (data.mensagem) {
                    setError((prev) => ({ ...prev, criarMembro: { mensagem: data.mensagem } }))
                } else {
                    const nestedErrors = nestErrors(data.erros_zod);
                    setError((prev) => ({ ...prev, criarMembro: { zod: nestedErrors } }))
                }
            } else {
                setMensagem((prev) => ({ ...prev, criarMembro: data.mensagem }))
                setMembro(data.dados)
            }
        } catch (err) {
            if (err.message === 'Sessão expirada') return;

            setError((prev) => ({
                ...prev,
                criarMembro: 'Erro ao registrar membro, tente novamente mais tarde.'
            }));
        } finally {
            setLoading((prev) => ({ ...prev, criarMembro: false }));
        }
    }, []);

    // ATUALIZAR MEMBRO
    const atualizarMembro = useCallback(async (id_empresa, cod_usuario, dados) => {
        setLoading((prev) => ({ ...prev, atualizarMembro: true }));
        setError((prev) => ({ ...prev, atualizarMembro: null }));
        setMensagem((prev) => ({ ...prev, atualizarMembro: null }));

        try {

            const data = await API_FETCH(`/empresas/${id_empresa}/membros/${cod_usuario}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados),
            });

            if (!data.sucesso) {
                if (data.mensagem) {
                    setError((prev) => ({ ...prev, atualizarMembro: { mensagem: data.mensagem } }))
                } else {
                    const nestedErrors = nestErrors(data.erros_zod);
                    setError((prev) => ({ ...prev, atualizarMembro: { zod: nestedErrors } }))
                }
            } else {
                setMensagem((prev) => ({ ...prev, atualizarMembro: data.mensagem }))
                setMembro(data.dados)
            }
        } catch (err) {
            if (err.message === 'Sessão expirada') return;

            setError((prev) => ({
                ...prev,
                atualizarMembro: 'Erro ao atualizar membro, tente novamente mais tarde.'
            }));
        } finally {
            setLoading((prev) => ({ ...prev, atualizarMembro: false }));
        }
    }, []);

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

    return {
        loading, error, mensagem,
        membros, obterMembros,
        membro, obterMembro,
        criarMembro,
        atualizarMembro,
    };
}