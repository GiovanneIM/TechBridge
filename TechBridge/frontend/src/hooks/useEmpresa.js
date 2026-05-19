'use client'

import { useEffect, useState, useCallback } from 'react';
import { API_FETCH, apiFetch } from '@/lib/api';
import { nestErrors } from '@/lib/zodErrors';

// ENDPOINT BASE DA API
const API_BASE_URL = '/empresas';

export function useEmpresa() {
    // LISTA DE EMPRESAS
    const [empresas, setEmpresas] = useState(null);

    // EMPRESA
    const [empresa, setEmpresa] = useState(null);

    // MEMBROS DE UMA EMPRESA
    const [membros, setMembros] = useState(null);

    // SETORES DE UMA EMPRESA
    const [setores, setSetores] = useState(null);

    // MAQUINAS DE UMA EMPRESA
    const [maquinas, setMaquinas] = useState(null);

    // LOADING
    const [loading, setLoading] = useState({
        obterEmpresas: null,
        criarEmpresa: null,
        obterEmpresa: null,
        obterMembros: null,
        obterSetores: null,
        obterMaquinas: null
    });

    // ERROS
    const [error, setError] = useState({
        obterEmpresas: null,
        criarEmpresa: null,
        obterEmpresa: null,
        obterMembros: null,
        obterSetores: null,
        obterMaquinas: null
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
            const data = await API_FETCH(`/admin/empresas?${query}`, {
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
            const data = await API_FETCH(`/admin/empresas`, {
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
            const data = await API_FETCH(`/empresas/${id_empresa}`, {
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
            const data = await API_FETCH(`/empresas/${id_empresa}/membros`, {
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

    // OBTER SETORES
    const obterSetores = useCallback(async (id_empresa) => {
        setLoading((prev) => ({ ...prev, obterSetores: true }));
        setError((prev) => ({ ...prev, obterSetores: null }));

        try {
            console.log(id_empresa);

            // REQUISIÇÃO
            const data = await API_FETCH(`/empresas/${id_empresa}/setores`, {
                method: 'GET'
            });

            console.log(data);


            // ERRO
            if (!data.sucesso) {
                setError((prev) => ({ ...prev, obterSetores: data.mensagem }))
            }

            // SUCESSO
            else {
                // ATUALIZAR MEMBROS
                setSetores(data.dados.membros)
            }
        } catch (err) {
            // Caso dê erro de rede, CORS, servidor, etc, guardamos uma mensagem amigável em `error`
            if (err.message === 'Sessão expirada') return;

            setError((prev) => ({
                ...prev,
                obterSetores: 'Erro ao obter membros, tente novamente mais tarde.'
            }));

        } finally {
            // Independente de sucesso ou erro, o loading termina aqui
            setLoading((prev) => ({ ...prev, obterSetores: false }));
        }
    }, []);

    // OBTER MÁQUINAS
    const obterMaquinas = useCallback(async (id_empresa) => {
        setLoading((prev) => ({ ...prev, obterMaquinas: true }));
        setError((prev) => ({ ...prev, obterMaquinas: null }));

        try {
            console.log(id_empresa);

            // REQUISIÇÃO
            const data = await API_FETCH(`/empresas/${id_empresa}/maquinas`, {
                method: 'GET'
            });

            console.log(data);


            // ERRO
            if (!data.sucesso) {
                setError((prev) => ({ ...prev, obterMaquinas: data.mensagem }))
            }

            // SUCESSO
            else {
                // ATUALIZAR MEMBROS
                setMaquinas(data.dados.membros)
            }
        } catch (err) {
            // Caso dê erro de rede, CORS, servidor, etc, guardamos uma mensagem amigável em `error`
            if (err.message === 'Sessão expirada') return;

            setError((prev) => ({
                ...prev,
                obterMaquinas: 'Erro ao obter membros, tente novamente mais tarde.'
            }));

        } finally {
            // Independente de sucesso ou erro, o loading termina aqui
            setLoading((prev) => ({ ...prev, obterMaquinas: false }));
        }
    }, []);

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

    return {
        loading,
        error,
        empresas, obterEmpresas,
        empresa, obterEmpresa,
        membros, obterMembros,
        setores, obterSetores,
        maquinas, obterMaquinas,
        criarEmpresa,
    };
}