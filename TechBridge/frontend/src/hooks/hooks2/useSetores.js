import { useEffect, useState, useCallback } from "react";
import { apiFetch } from "@/lib/api";

const API_BASE_URL = "/setores";

export function useSetores({
    initialSetores = [],
    fetchOnMount = false,
} = {}) {

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
        setLoading((prev) => ({ ...prev, fetch: true }));
        setError((prev) => ({ ...prev, fetch: null }));

        try {
            const data = await apiFetch(`${API_BASE_URL}/buscar`);

            if (!data?.sucesso) {
                setError((prev) => ({
                    ...prev,
                    fetch: data?.mensagem || "Erro ao buscar setores",
                }));
            } else {
                setSetores(data?.dados?.setores ?? []);
            }

        } catch (err) {
            setError((prev) => ({
                ...prev,
                fetch: "Erro ao buscar setores, tente novamente mais tarde.",
            }));
        } finally {
            setLoading((prev) => ({ ...prev, fetch: false }));
        }
    }, []);

    // ========================================
    // FETCH POR ID
    // ========================================

    const fetchSetorById = useCallback(async (id) => {
        if (!id) return null;

        setLoading((prev) => ({ ...prev, fetchOne: true }));
        setError((prev) => ({ ...prev, fetchOne: null }));

        try {
            const data = await apiFetch(`${API_BASE_URL}/${id}`);

            if (!data?.sucesso) {
                setError((prev) => ({
                    ...prev,
                    fetchOne: data?.mensagem || "Erro ao buscar setor",
                }));
                return null;
            }

            const setor = data?.dados?.setor ?? null;
            setSetorAtual(setor);

            return setor;

        } catch (err) {
            setError((prev) => ({
                ...prev,
                fetchOne: "Erro ao buscar setor, tente novamente mais tarde.",
            }));
            return null;

        } finally {
            setLoading((prev) => ({ ...prev, fetchOne: false }));
        }
    }, []);

    // ========================================
    // REFETCH (MESMO PADRÃO)
    // ========================================

    const refetchSetores = fetchSetores;

    // ========================================
    // AUTO FETCH (MESMO PADRÃO DO SEU MAQUINAS)
    // ========================================

    useEffect(() => {
        if (!fetchOnMount) return;
        fetchSetores();
    }, [fetchOnMount]);

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
        refetchSetores,
        setSetores,
        setSetorAtual,
    };
}