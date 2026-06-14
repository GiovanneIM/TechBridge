import { useEffect, useState, useCallback } from 'react';
import { API_FETCH } from '@/lib/api';
import { nestErrors } from '@/lib/zodErrors';

export function useEmpresas() {

    // EMPRESAS
    const [empresas, setEmpresas] = useState(null);

    // EMPRESA ESPECÍFICA
    const [empresa, setEmpresa] = useState(null);

    // LOADING
    const [loading, setLoading] = useState({
        obterEmpresas: null,
        criarEmpresa: null,
        obterEmpresa: null,
        atualizarEmpresa: null,
        atualizarLogo: null,
        obterInfosGerais: null,
    });

    // ERROS
    const [error, setError] = useState({
        obterEmpresas: null,
        criarEmpresa: null,
        obterEmpresa: null,
        atualizarEmpresa: null,
        atualizarLogo: null,
        obterInfosGerais: null,
    });

    // MENSAGENS
    const [mensagem, setMensagem] = useState({
        obterEmpresas: null,
        criarEmpresa: null,
        obterEmpresa: null,
        atualizarEmpresa: null,
        atualizarLogo: null,
        obterInfosGerais: null,
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

            const data = await API_FETCH(`/admin/empresas?${query}`, {
                method: 'GET'
            });

            if (!data.sucesso) {
                setError((prev) => ({ ...prev, obterEmpresas: data.mensagem }))
            } else {
                setEmpresas(data.dados)
            }
        } catch (err) {
            if (err.message === 'Sessão expirada') return;

            setError((prev) => ({
                ...prev,
                obterEmpresas: 'Erro ao obter empresas, tente novamente mais tarde.'
            }));
        } finally {
            setLoading((prev) => ({ ...prev, obterEmpresas: false }));
        }
    }, []);


    // REGISTRAR EMPRESA (Admin)
    const criarEmpresa = useCallback(async (novaEmpresa) => {
        setLoading((prev) => ({ ...prev, criarEmpresa: true }));
        setError((prev) => ({ ...prev, criarEmpresa: null }));

        try {

            const data = await API_FETCH(`/admin/empresas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novaEmpresa),
            });

            if (!data.sucesso) {
                if (data.mensagem) {
                    setError((prev) => ({ ...prev, criarEmpresa: { mensagem: data.mensagem } }))
                } else {
                    const nestedErrors = nestErrors(data.erros_zod);
                    setError((prev) => ({ ...prev, criarEmpresa: { zod: nestedErrors } }))
                }
            } else {
                setMensagem((prev) => ({ ...prev, criarEmpresa: data.mensagem }))
                setEmpresa(data.dados)
            }
        } catch (err) {
            if (err.message === 'Sessão expirada') return;

            setError((prev) => ({
                ...prev,
                criarEmpresa: 'Erro ao obter empresas, tente novamente mais tarde.'
            }));
        } finally {
            setLoading((prev) => ({ ...prev, criarEmpresa: false }));
        }
    }, []);

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

    // OBTER EMPRESA
    const obterEmpresa = useCallback(async (id_empresa) => {
        setLoading((prev) => ({ ...prev, obterEmpresa: true }));
        setError((prev) => ({ ...prev, obterEmpresa: null }));

        try {
            const data = await API_FETCH(`/empresas/${id_empresa}`, {
                method: 'GET'
            });

            if (!data.sucesso) {
                setError((prev) => ({ ...prev, obterEmpresa: data.mensagem }))
            } else {
                setEmpresa(data.dados.empresa)
            }
        } catch (err) {
            if (err.message === 'Sessão expirada') return;

            setError((prev) => ({
                ...prev,
                obterEmpresa: 'Erro ao obter empresas, tente novamente mais tarde.'
            }));
        } finally {
            setLoading((prev) => ({ ...prev, obterEmpresa: false }));
        }
    }, []);

    // OBTER INFORMAÇÕES GERAIS
    const obterInfosGerais = useCallback(async (id_empresa) => {
        setLoading((prev) => ({ ...prev, obterInfosGerais: true }));
        setError((prev) => ({ ...prev, obterInfosGerais: null }));

        try {
            const data = await API_FETCH(`/empresas/${id_empresa}/infosGerais`, {
                method: 'GET'
            });

            if (!data.sucesso) {
                setError((prev) => ({ ...prev, obterInfosGerais: data.mensagem }));
            } else {
                return data.dados.infosGerais;
            }
        } catch (err) {
            if (err.message === 'Sessão expirada') return;

            setError((prev) => ({
                ...prev,
                obterInfosGerais: 'Erro ao obter informações gerais, tente novamente mais tarde.'
            }));
        } finally {
            setLoading((prev) => ({ ...prev, obterInfosGerais: false }));
        }
    }, []);

    // ATUALIZAR EMPRESA (GERENTE PRINCIPAL)
    const atualizarEmpresa = useCallback(async (id_empresa, novosDados) => {
        setLoading((prev) => ({ ...prev, atualizarEmpresa: true }));
        setError((prev) => ({ ...prev, atualizarEmpresa: null }));

        try {
            const data = await API_FETCH(`/empresas/${id_empresa}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novosDados),
                credentials: 'include'
            });

            if (!data.sucesso) {
                setError((prev) => ({ ...prev, atualizarEmpresa: data.mensagem }))
            } else {
                setMensagem((prev) => ({ ...prev, atualizarEmpresa: data.mensagem }))
            }
        } catch (err) {
            if (err.message === 'Sessão expirada') return;

            setError((prev) => ({
                ...prev,
                atualizarEmpresa: 'Erro ao atualizar logo, tente novamente mais tarde.'
            }));
        } finally {
            setLoading((prev) => ({ ...prev, atualizarEmpresa: false }));
        }
    }, [])

    // ATUALIZAR LOGO (GERENTE PRINCIPAL)
    const atualizarLogo = useCallback(async (id_empresa, logo) => {
        setLoading((prev) => ({ ...prev, atualizarLogo: true }));
        setError((prev) => ({ ...prev, atualizarLogo: null }));

        try {
            const formData = new FormData()
            formData.append('imagem', logo)

            for (const pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }

            const data = await API_FETCH(`/empresas/${id_empresa}/logo`, {
                method: 'PATCH',
                body: formData,
                credentials: 'include'
            });

            if (!data.sucesso) {
                setError((prev) => ({ ...prev, atualizarLogo: data.mensagem }))
            } else {
                setMensagem((prev) => ({ ...prev, atualizarLogo: data.mensagem }))
            }
        } catch (err) {
            if (err.message === 'Sessão expirada') return;

            setError((prev) => ({
                ...prev,
                atualizarLogo: 'Erro ao atualizar logo, tente novamente mais tarde.'
            }));
        } finally {
            setLoading((prev) => ({ ...prev, atualizarLogo: false }));
        }
    }, [])

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

    return {
        loading, error, mensagem,
        empresas, obterEmpresas,
        empresa, obterEmpresa,
        criarEmpresa,
        atualizarEmpresa,
        atualizarLogo,
        obterInfosGerais,
    };
}