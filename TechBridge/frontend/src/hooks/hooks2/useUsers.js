import { useEffect, useState, useCallback } from 'react';
import { apiFetch } from '@/lib/api';

// URL base da API
const API_BASE_URL = '/user';

export function useUsers({
    tecnicosIniciais = [],
    fetchOnMount = false
} = {}
) {
    // Estado com os técnicos
    const [tecnicos, setTecnicos] = useState(tecnicosIniciais);

    // Estado que indica se há uma requisição em andamento
    const [loadingTecnicos, setLoading] = useState({
        fetch: false,
    });

    // Estado para armazenar mensagem de erro (se houver)
    const [errorTecnicos, setError] = useState({
        fetch: null,
    });

    // Busca todas os técnicos
    const fetchTecnicos = useCallback(async () => {
        setLoading((prev) => ({ ...prev, fetch: true }));
        setError((prev) => ({ ...prev, fetch: null }));

        try {
            // Chamada à API
            const data = await apiFetch(API_BASE_URL + '/tecnicos');

            // Se a resposta veio com status de erro
            if (!data.sucesso) {
                setError((prev) => ({ ...prev, fetch: data.mensagem }))
            }
            else {
                // Atualizando o estado dos tecnicos 
                setTecnicos(data.dados.tecnicos)
            }

        } catch (err) {
            // Caso dê erro de rede, CORS, servidor, etc, guardamos uma mensagem amigável em `error`
            setError((prev) => ({ ...prev, fetch: 'Erro ao buscar tecnicos, tente novamente mais tarde.' }))

        } finally {
            // Independente de sucesso ou erro, o loading termina aqui
            setLoading((prev) => ({ ...prev, fetch: false }));
        }
    }, []);

    useEffect(() => {
        if (!fetchOnMount) return;
        fetchTecnicos();
    }, [fetchOnMount]);

    return {
        tecnicos,
        loadingTecnicos,
        errorTecnicos,
        refetchTecnicos: fetchTecnicos
    };
}