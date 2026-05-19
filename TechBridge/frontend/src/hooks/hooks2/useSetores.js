import { useEffect, useState, useCallback } from "react";
import { apiFetch } from "@/lib/api";

const API_BASE_URL = "/setores";

export function useSetores({
    initialSetores = [],
    fetchOnMount = false,
} = {}) {

    // ========================================
    // STATES
    // ========================================

    const [setores, setSetores] = useState(initialSetores);
    const [setorAtual, setSetorAtual] = useState(null);

    const [loading, setLoading] = useState({
        fetch: false,
        fetchOne: false,
    });

    const [error, setError] = useState({
        fetch: null,
        fetchOne: null,
    });

    // ========================================
    // FETCH TODOS
    // ========================================

    const fetchSetores = useCallback(async () => {
        setLoading((prev) => ({
            ...prev,
            fetch: true,
        }));

        setError((prev) => ({
            ...prev,
            fetch: null,
        }));

        try {
            const response = await apiFetch(`${API_BASE_URL}/buscar`);


            if (!response?.sucesso) {
                setError((prev) => ({
                    ...prev,
                    fetch: response?.mensagem || "Erro ao buscar setores",
                }));

                setSetores([]);
                return [];
            }

            // ARRAY CORRETO DA API
            const setoresData = response?.dados?.setores ?? [];

            setSetores(setoresData);

            return setoresData;

        } catch (err) {
            console.error("ERRO FETCH SETORES:", err);

            setError((prev) => ({
                ...prev,
                fetch: "Erro ao buscar setores",
            }));

            setSetores([]);

            return [];

        } finally {
            setLoading((prev) => ({
                ...prev,
                fetch: false,
            }));
        }
    }, []);

    // ========================================
    // FETCH POR ID
    // ========================================

    const fetchSetorById = useCallback(async (id) => {
        if (!id) return null;

        setLoading((prev) => ({
            ...prev,
            fetchOne: true,
        }));

        setError((prev) => ({
            ...prev,
            fetchOne: null,
        }));

        try {
            const response = await apiFetch(`${API_BASE_URL}/${id}`);

            if (!response?.sucesso) {
                setError((prev) => ({
                    ...prev,
                    fetchOne: response?.mensagem || "Erro ao buscar setor",
                }));

                return null;
            }

            const setor = response?.dados?.setor ?? null;

            setSetorAtual(setor);

            return setor;

        } catch (err) {
            console.error("ERRO FETCH SETOR:", err);

            setError((prev) => ({
                ...prev,
                fetchOne: "Erro ao buscar setor",
            }));

            return null;

        } finally {
            setLoading((prev) => ({
                ...prev,
                fetchOne: false,
            }));
        }
    }, []);

    // ========================================
    // AUTO FETCH
    // ========================================

    useEffect(() => {
        if (fetchOnMount) {
            fetchSetores();
        }
    }, [fetchOnMount, fetchSetores]);

    // ========================================
    // RETURN
    // ========================================

    return {
        setores,
        setorAtual,

        loadingSetores: loading,
        errorSetores: error,

        fetchSetores,
        fetchSetorById,
        refetchSetores: fetchSetores,

        setSetores,
        setSetorAtual,
    };
}