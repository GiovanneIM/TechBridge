'use client'

import { useEffect, useState, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { nestErrors } from '@/lib/zodErrors';

// ENDPOINT BASE DA API
const API_BASE_URL = '/empresas';

export function useEmpresa({
    empresasIniciais = [],
    fetchOnMount = false
} = {}
) {
    const [empresas, setEmpresas] = useState(null);

    const [loading, setLoading] = useState({
        obterEmpresas: null,
        criarEmpresa: null,
        patch: null
    });

    const [error, setError] = useState({
        obterEmpresas: null,
        criarEmpresa: null,
        patch: null
    });

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

    // OBTER TODAS AS EMPRESAS (Admin)
    const obterEmpresas = useCallback(async (filtro = {}) => {
        setLoading((prev) => ({ ...prev, obterEmpresas: true }));
        setError((prev) => ({ ...prev, obterEmpresas: null }));

        try {
            const params = new URLSearchParams();

            Object.entries(filtro).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== '') {
                    params.append(key, value);
                }
            });

            const query = params.toString();

            // REQUISIÇÃO
            const data = await apiFetch(`/admin/empresas?${query}`, {
                method: 'GET'
            });

            // ERRO
            if (!data.sucesso) {
                setError((prev) => ({ ...prev, obterEmpresas: data.mensagem }))
            }
            // SUCESSO
            else {
                // ATUALIZAR EMPRESAS
                setEmpresas(data.dados)
            }
        } catch (err) {
            // Caso dê erro de rede, CORS, servidor, etc, guardamos uma mensagem amigável em `error`
            if (err.message === 'Sessão expirada') return;

            setError((prev) => ({
                ...prev,
                obterEmpresas: 'Erro ao obter empresas, tente novamente mais tarde.'
            }));

        } finally {
            // Independente de sucesso ou erro, o loading termina aqui
            setLoading((prev) => ({ ...prev, obterEmpresas: false }));
        }
    }, []);


    // REGISTRAR EMPRESA (Admin)
    const criarEmpresa = useCallback(async (novaEmpresa) => {
        setLoading((prev) => ({ ...prev, criarEmpresa: true }));
        setError((prev) => ({ ...prev, criarEmpresa: null }));

        try {
            // REQUISIÇÃO
            const data = await apiFetch(`/admin/empresas`, {
                method: 'POST',
                body: JSON.stringify(novaEmpresa)
            });

            // ERRO
            if (!data.sucesso) {
                if (data.mensagem) {
                    setError((prev) => ({ ...prev, criarEmpresa: { mensagem: data.mensagem } }))
                }
                else {
                    const nestedErrors = nestErrors(data.erros_zod);

                    setError((prev) => ({ ...prev, criarEmpresa: { zod: nestedErrors } }))
                }
            }
            // SUCESSO
            else {
                // MENSAGEM
                setEmpresas(data.dados)
            }
        } catch (err) {
            // Caso dê erro de rede, CORS, servidor, etc, guardamos uma mensagem amigável em `error`
            if (err.message === 'Sessão expirada') return;

            setError((prev) => ({
                ...prev,
                criarEmpresa: 'Erro ao obter empresas, tente novamente mais tarde.'
            }));

        } finally {
            // Independente de sucesso ou erro, o loading termina aqui
            setLoading((prev) => ({ ...prev, criarEmpresa: false }));
        }
    }, []);

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

    useEffect(() => {
        if (!fetchOnMount) return;
        fetchEmpresas();
    }, [fetchOnMount]);

    return {
        empresas,
        loading,
        error,
        obterEmpresas,
        criarEmpresa
    };
}