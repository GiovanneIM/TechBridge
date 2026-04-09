import { useEffect, useState, useCallback } from 'react';
import { apiFetch } from '@/lib/api';

// URL base da API
// const API_BASE_URL = 'http://localhost:3000/api/maquinas';
const API_BASE_URL = '/maquinas';

export function useMaquinas({
    initialMachines = [],
    fetchOnMount = false
} = {}
) {
    // Estado com as maquinas
    const [maquinas, setMaquinas] = useState(initialMachines);

    // Estado que indica se há uma requisição em andamento
    const [loading, setLoading] = useState({
        fetch: false,
    });

    // Estado para armazenar mensagem de erro (se houver)
    const [error, setError] = useState({
        fetch: null,
    });

    // Busca todas as maquinas
    const fetchMaquinas = useCallback(async () => {
        setLoading((prev) => ({ ...prev, fetch: true }));
        setError((prev) => ({ ...prev, fetch: null }));

        try {
            // Chamada à API
            const response = await fetch(API_BASE_URL);

            // Convertendo a resposta para json
            const data = await response.json();

            // Se a resposta veio com status de erro
            if (!data.sucesso) {
                setError((prev) => ({ ...prev, fetch: data.mensagem }))
            }
            else {
                // Atualizando o estado das maquinas
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

    useEffect(() => {
        if (!fetchOnMount) return;
        fetchMaquinas();
    }, [fetchOnMount]);

    return {
        maquinas,
        loading,
        error,
        refetchMaquinas: fetchMaquinas
    };
}