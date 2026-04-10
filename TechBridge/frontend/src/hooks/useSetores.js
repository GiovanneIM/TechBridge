import { useEffect, useState, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { API_URL } from '@/lib/utils';

// URL base da API
// const API_BASE_URL = 'http://localhost:3000/api/setores';
const API_BASE_URL = '/setores';

export function useSetores({
    initialSetores = [],
    fetchOnMount = false
} = {}
) {
    // Estado com as setores
    const [setores, setSetores] = useState(initialSetores);

    // Estado que indica se há uma requisição em andamento
    const [loading, setLoading] = useState({
        fetch: false,
    });

    // Estado para armazenar mensagem de erro (se houver)
    const [error, setError] = useState({
        fetch: null,
    });

    // Busca todas as setores
    const fetchSetores = useCallback(async () => {
        setLoading((prev) => ({ ...prev, fetch: true }));
        setError((prev) => ({ ...prev, fetch: null }));

        try {
            // Chamada à API
            const response = await apiFetch(API_BASE_URL + '/buscar');

            // Convertendo a resposta para json
            const data = await response.json();

            // Se a resposta veio com status de erro
            if (!data.sucesso) {
                setError((prev) => ({ ...prev, fetch: data.mensagem }))
            }
            else {
                // Atualizando o estado das setores
                setSetores(data.dados.setores)
            }

        } catch (err) {
            // Caso dê erro de rede, CORS, servidor, etc, guardamos uma mensagem amigável em `error`
            setError((prev) => ({ ...prev, fetch: 'Erro ao buscar setores, tente novamente mais tarde.' }))

        } finally {
            // Independente de sucesso ou erro, o loading termina aqui
            setLoading((prev) => ({ ...prev, fetch: false }));
        }
    }, []);

    useEffect(() => {
        if (!fetchOnMount) return;
        fetchSetores();
    }, [fetchOnMount]);

    return {
        setores,
        loading,
        error,
        refetchSetores: fetchSetores
    };
}