import { useEffect, useState, useCallback } from 'react';
import { apiFetch } from '@/lib/api';

// Base da API (SEM duplicar /techbridge, isso já está no apiFetch)
const API_BASE_URL = '/chamados';

export function useChamados({
    chamadosIniciais = [],
    fetchOnMount = true
} = {}) {

    // Estado dos chamados
    const [chamados, setChamados] = useState(chamadosIniciais);

    // Loading
    const [loadingChamados, setLoading] = useState({
        fetch: false,
    });

    // Erro
    const [errorChamados, setError] = useState({
        fetch: null,
    });

    const fetchChamados = useCallback(async (options = {}) => {

        setLoading((prev) => ({ ...prev, fetch: true }));
        setError((prev) => ({ ...prev, fetch: null }));

        try {

            const data = await apiFetch(
                `${API_BASE_URL}/buscar`,
                {
                    method: 'GET',
                    credentials: 'include'
                }
            );

            const listaChamados = data?.dados?.chamados || [];

            setChamados(listaChamados);

        } catch (err) {

            console.error(err);

            setError((prev) => ({
                ...prev,
                fetch: 'Erro ao buscar chamados, tente novamente mais tarde.'
            }));

        } finally {

            setLoading((prev) => ({ ...prev, fetch: false }));

        }

    }, []);

    // fetch inicial
    useEffect(() => {

        if (!fetchOnMount) return;

        fetchChamados();

    }, [fetchOnMount, fetchChamados]);

    return {
        chamados,
        loadingChamados,
        errorChamados,
        refetchChamados: fetchChamados
    };
}