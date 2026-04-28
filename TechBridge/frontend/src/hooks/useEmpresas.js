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
        // LIMPANDO ESTADOS
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
                // 
                setMaquinas(data.dados.maquinas)
            }

        } catch (err) {
            // Caso dê erro de rede, CORS, servidor, etc, guardamos uma mensagem amigável em `error`
            setError((prev) => ({ ...prev, fetch: 'Erro ao buscar maquinas, tente novamente mais tarde.' }))

        } finally {
            // Independente de sucesso ou erro, o loading termina aqui
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