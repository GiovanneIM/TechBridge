import { useEffect, useState, useCallback } from 'react';
import { apiFetch } from '@/lib/api';

// URL base da API
// const API_BASE_URL = 'http://localhost:3000/api/chamados';
const API_BASE_URL = '/chamados';

export function useChamados({
    chamadosIniciais = [],
    fetchOnMount = true
} = {}
) {
    // Estado com os chamados
    const [chamados, setChamados] = useState(chamadosIniciais);

    // Estado que indica se há uma requisição em andamento
    const [loadingChamados, setLoading] = useState({
        fetch: false,
    });

    // Estado para armazenar mensagem de erro (se houver)
    const [errorChamados, setError] = useState({
        fetch: null,
    });

    const fetchChamados = useCallback(async (options = {}) => {
        setLoading((prev) => ({ ...prev, fetch: true }));
        setError((prev) => ({ ...prev, fetch: null }));

        try {
            // Chamada à API
            const response = await apiFetch(`${API_BASE_URL}/buscar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "options": options }),
                credentials: 'include'
            });

            // Convertendo a resposta para json
            const data = await response.json();

            // Se a resposta veio com status de erro
            if (!data.sucesso) {
                setError((prev) => ({ ...prev, fetch: data.mensagem }))
            }
            else {
                // Atualizando o estado dos chamados
                setChamados(data.dados.chamados)
            }

        } catch (err) {
            // Caso dê erro de rede, CORS, servidor, etc, guardamos uma mensagem amigável em `error`
            setError((prev) => ({ ...prev, fetch: 'Erro ao buscar chamados, tente novamente mais tarde.' }))

        } finally {
            // Independente de sucesso ou erro, o loading termina aqui
            setLoading((prev) => ({ ...prev, fetch: false }));
        }
    }, []);

    // Obtendo o perfil
    useEffect(() => {
        if (!fetchOnMount) return;
        fetchChamados();
    }, [fetchOnMount]);

    return {
        chamados,
        loadingChamados,
        errorChamados,
        refetchChamados: fetchChamados
    };
}