import { useEffect, useState, useCallback } from 'react';
import { apiFetch } from '@/lib/api';

const API_BASE_URL = '/maquinas';

export function useMaquinas({
    initialMachines = [],
    fetchOnMount = true
} = {}) {

    const [maquinas, setMaquinas] = useState(initialMachines);

    const [loading, setLoading] = useState({
        fetch: false,
    });

    const [error, setError] = useState({
        fetch: null,
    });

    const fetchMaquinas = useCallback(async () => {
        setLoading((prev) => ({ ...prev, fetch: true }));
        setError((prev) => ({ ...prev, fetch: null }));

        try {
            const data = await apiFetch(API_BASE_URL);

            const lista =
                data?.dados?.maquinas ??
                data?.dados ??
                data?.maquinas ??
                [];

            setMaquinas(Array.isArray(lista) ? lista : []);

        } catch (err) {
            console.error(err);

            setError((prev) => ({
                ...prev,
                fetch: 'Erro ao buscar máquinas.'
            }));
        } finally {
            setLoading((prev) => ({ ...prev, fetch: false }));
        }
    }, []);

    // ✅ FIX PRINCIPAL: não depender de condição instável
    useEffect(() => {
        if (fetchOnMount) {
            fetchMaquinas();
        }
    }, [fetchOnMount, fetchMaquinas]);

    return {
        maquinas,
        loading,
        error,
        refetchMaquinas: fetchMaquinas
    };
}