import { useEffect, useState, useCallback } from 'react';
import { apiFetch } from '@/lib/api';


// URL base da API
// const API_BASE_URL = 'http://localhost:3000/api/chamados/dashboard';
const API_BASE_ENDPOINT = '/chamados/dashboard';

export function useDashboard({
    dashboardInicial = {},
    fetchOnMount = true
} = {}
) {
    // Estado com os chamados
    const [dashboard, setDashboard] = useState(dashboardInicial);

    // Estado que indica se há uma requisição em andamento
    const [loadingDashboard, setLoading] = useState(fetchOnMount);

    // Estado para armazenar mensagem de erro (se houver)
    const [errorDashboard, setError] = useState(null);

    // Função para requisitar os dados à API
    const fetchDashboard = useCallback(async (options = {}) => {
        setLoading(true);
        setError(null);

        try {
            // Chamada à API
            const response = await apiFetch(`${API_BASE_ENDPOINT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "options": options }),
                credentials: 'include'
                
            });

            // Convertendo a resposta para json
            const data = await response.json();

            console.log(data);
            

            // Se a resposta veio com status de erro
            if (!data.sucesso) {
                setError(data.mensagem)
                console.log(data.mensagem);
                
            }
            else {
                // Atualizando o estado dos chamados
                setDashboard(data.dados.dashboard)
            }

        } catch (err) {
            if (err.message === 'Sessão expirada') return;

            setError('Erro ao buscar dashboard, tente novamente mais tarde.');
        } finally {
            // Independente de sucesso ou erro, o loading termina aqui
            setLoading(false);
        }
    }, []);


    // Obtendo o dashboard
    useEffect(() => {
        if (!fetchOnMount) {
            setLoading(false);
            return;
        }

        fetchDashboard();
    }, [fetchOnMount, fetchDashboard]);


    return {
        dashboard,
        loadingDashboard,
        errorDashboard,
        refetchDashboard: fetchDashboard
    };
}