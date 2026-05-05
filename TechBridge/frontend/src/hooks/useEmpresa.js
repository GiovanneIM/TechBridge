'use client'

import { useEffect, useState, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { nestErrors } from '@/lib/zodErrors';

// ENDPOINT BASE DA API
const API_BASE_URL = '/empresas';

export function useEmpresa() {
    // Lista de empresas
    const [empresas, setEmpresas] = useState(null);

    // Empresa
    const [empresa, setEmpresa] = useState(null);

    // Membros de uma empresa
    const [membros, setMembros] = useState(null);

    // Loading
    const [loading, setLoading] = useState({
        obterEmpresas: null,
        criarEmpresa: null,
        obterEmpresa: null,
        obterMembros: null,
    });

    // Erros
    const [error, setError] = useState({
        obterEmpresas: null,
        criarEmpresa: null,
        obterEmpresa: null,
        obterMembros: null,
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

    // OBTER EMPRESA
    const obterEmpresa = useCallback(async (id_empresa) => {
        setLoading((prev) => ({ ...prev, obterEmpresa: true }));
        setError((prev) => ({ ...prev, obterEmpresa: null }));

        try {
            // REQUISIÇÃO
            const data = await apiFetch(`/empresas/${id_empresa}`, {
                method: 'GET'
            });

            // ERRO
            if (!data.sucesso) {
                setError((prev) => ({ ...prev, obterEmpresa: data.mensagem }))
            }

            // SUCESSO
            else {
                // ATUALIZAR EMPRESA
                setEmpresa(data.dados.empresa)
            }
        } catch (err) {
            // Caso dê erro de rede, CORS, servidor, etc, guardamos uma mensagem amigável em `error`
            if (err.message === 'Sessão expirada') return;

            setError((prev) => ({
                ...prev,
                obterEmpresa: 'Erro ao obter empresas, tente novamente mais tarde.'
            }));

        } finally {
            // Independente de sucesso ou erro, o loading termina aqui
            setLoading((prev) => ({ ...prev, obterEmpresa: false }));
        }
    }, []);

    // OBTER MEMBROS (Gerente)
    const obterMembros = useCallback(async (id_empresa) => {
        setLoading((prev) => ({ ...prev, obterMembros: true }));
        setError((prev) => ({ ...prev, obterMembros: null }));

        try {
            console.log(id_empresa);
            
            // REQUISIÇÃO
            const data = await apiFetch(`/empresas/${id_empresa}/membros`, {
                method: 'GET'
            });

            console.log(data);


            // ERRO
            if (!data.sucesso) {
                setError((prev) => ({ ...prev, obterMembros: data.mensagem }))
            }

            // SUCESSO
            else {
                // ATUALIZAR MEMBROS
                setMembros(data.dados.membros)
            }
        } catch (err) {
            // Caso dê erro de rede, CORS, servidor, etc, guardamos uma mensagem amigável em `error`
            if (err.message === 'Sessão expirada') return;

            setError((prev) => ({
                ...prev,
                obterMembros: 'Erro ao obter membros, tente novamente mais tarde.'
            }));

        } finally {
            // Independente de sucesso ou erro, o loading termina aqui
            setLoading((prev) => ({ ...prev, obterMembros: false }));
        }
    }, []);

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

    return {
        loading,
        error,
        empresas,
        empresa,
        membros,
        obterEmpresas,
        criarEmpresa,
        obterEmpresa,
        obterMembros,
    };
}