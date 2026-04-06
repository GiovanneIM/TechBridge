import { useEffect, useState, useCallback } from 'react';


// URL base da API
const API_BASE_URL = 'http://localhost:3000/api/chamados/dashboard';

export function useDashboard({
    dashboardInicial = {},
    fetchOnMount = true
} = {}
) {
    // Estado com os chamados
    const [dashboard, setDashboard] = useState(dashboardInicial);

    // Estado que indica se há uma requisição em andamento
    const [loadingDashboard, setLoading] = useState(false);

    // Estado para armazenar mensagem de erro (se houver)
    const [errorDashboard, setError] = useState(null);

    // Função para requisitar os dados à API
    const fetchDashboard = useCallback(async (options = {}) => {
        setLoading(true);
        setError(null);

        try {
            // Chamada à API
            const response = await fetch(`${API_BASE_URL}`, {
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
                setError(data.mensagem)
            }
            else {
                // Atualizando o estado dos chamados
                setDashboard(data.dados.dashboard)
            }

        } catch (err) {
            // Caso dê erro de rede, CORS, servidor, etc, guardamos uma mensagem amigável em `error`
            setError('Erro ao buscar dashboard, tente novamente mais tarde.')

        } finally {
            // Independente de sucesso ou erro, o loading termina aqui
            setLoading(false);
        }
    }, []);


    // Obtendo o dashboard
    useEffect(() => {
        if (!fetchOnMount) return;
        fetchDashboard();
    }, [fetchOnMount, fetchDashboard]);


    return {
        dashboard,
        loadingDashboard,
        errorDashboard,
        refetchDashboard: fetchDashboard
    };
}