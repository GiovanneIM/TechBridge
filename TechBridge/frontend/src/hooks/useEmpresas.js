import { useEffect, useState, useCallback } from 'react';
import { apiFetch } from '@/lib/api';

// ENDPOINT BASE DA API
const API_BASE_URL = '/maquinas';

export function useEmpresas({
    empresasIniciais = [],
    fetchOnMount = false
} = {}
) {
    // ESTADO COM AS EMPRESAS
    const [empresas, setEmpresas] = useState(empresasIniciais);

    // ESTADO DE LOADING
    const [loading, setLoading] = useState({
        fetch: false,
    });

    // ESTADO COM MENSAGENS DE ERRO
    const [error, setError] = useState({
        fetch: null,
    });

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

    // BUSCAR TODAS AS EMPRESAS
    const fetchEmpresas = useCallback(async () => {
        // LIMPANDO ERRO E INICIANDO LOADING
        setLoading((prev) => ({ ...prev, fetch: true }));
        setError((prev) => ({ ...prev, fetch: null }));

        try {
            // REQUISITAR À API
            const data = await apiFetch(API_BASE_URL);

            // VERIFICANDO SE HOUVE ERRO
            if (!data.sucesso) {
                setError((prev) => ({ ...prev, fetch: data.mensagem }))
            }
            else {
                // ATUALIZANDO O ESTADO DAS EMPRESAS
                setEmpresas(data.dados.empresas)
            }

        } catch (err) {
            // CASO DÊ ERRO
            setError((prev) => ({ ...prev, fetch: 'Erro ao buscar empresas, tente novamente mais tarde.' }))
        } finally {
            // ENCERRANDO O LOADING
            setLoading((prev) => ({ ...prev, fetch: false }));
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
        refetchEmpresas: fetchEmpresas
    };
}