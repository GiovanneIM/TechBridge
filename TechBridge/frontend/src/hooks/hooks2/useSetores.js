import { useEffect, useState, useCallback } from "react";

import { apiFetch } from "@/lib/api";

// ========================================
// BASE URL
// ========================================

const API_BASE_URL = "/setores";

// ========================================
// HOOK
// ========================================

export function useSetores({
    initialSetores = [],
    fetchOnMount = false,
} = {}) {

    // ========================================
    // STATES
    // ========================================

    // Lista de setores
    const [setores, setSetores] = useState(initialSetores);

    // Setor individual
    const [setorAtual, setSetorAtual] = useState(null);

    // Loading
    const [loadingSetores, setLoadingSetores] = useState({
        fetch: false,
        fetchOne: false,
    });

    // Errors
    const [errorSetores, setErrorSetores] = useState({
        fetch: null,
        fetchOne: null,
    });

    // ========================================
    // BUSCAR TODOS OS SETORES
    // ========================================

    const fetchSetores = useCallback(async () => {

        setLoadingSetores((prev) => ({
            ...prev,
            fetch: true,
        }));

        setErrorSetores((prev) => ({
            ...prev,
            fetch: null,
        }));

        try {

            // GET /setores/buscar
            const data = await apiFetch(
                `${API_BASE_URL}/buscar`
            );

            // API retornou erro
            if (!data?.sucesso) {

                setErrorSetores((prev) => ({
                    ...prev,
                    fetch:
                        data?.mensagem ||
                        "Erro ao buscar setores",
                }));

                return;
            }

            // Atualiza lista
            setSetores(
                data?.dados?.setores || []
            );

        } catch (err) {

            // Erro de rede / servidor
            setErrorSetores((prev) => ({
                ...prev,
                fetch:
                    "Erro ao buscar setores, tente novamente mais tarde.",
            }));

        } finally {

            // Finaliza loading
            setLoadingSetores((prev) => ({
                ...prev,
                fetch: false,
            }));

        }

    }, []);

    // ========================================
    // BUSCAR SETOR POR ID
    // ========================================

    const fetchSetorById = useCallback(async (id) => {

        if (!id) return null;

        setLoadingSetores((prev) => ({
            ...prev,
            fetchOne: true,
        }));

        setErrorSetores((prev) => ({
            ...prev,
            fetchOne: null,
        }));

        try {

            // GET /setores/:idSetor
            const data = await apiFetch(
                `${API_BASE_URL}/${id}`
            );

            // API retornou erro
            if (!data?.sucesso) {

                setErrorSetores((prev) => ({
                    ...prev,
                    fetchOne:
                        data?.mensagem ||
                        "Erro ao buscar setor",
                }));

                return null;
            }

            // Atualiza setor atual
            const setor =
                data?.dados?.setor || null;

            setSetorAtual(setor);

            return setor;

        } catch (err) {

            // Erro de rede / servidor
            setErrorSetores((prev) => ({
                ...prev,
                fetchOne:
                    "Erro ao buscar setor, tente novamente mais tarde.",
            }));

            return null;

        } finally {

            // Finaliza loading
            setLoadingSetores((prev) => ({
                ...prev,
                fetchOne: false,
            }));

        }

    }, []);

    // ========================================
    // REFETCH
    // ========================================

    const refetchSetores = () => {
        fetchSetores();
    };

    // ========================================
    // AUTO FETCH
    // ========================================

    useEffect(() => {

        if (!fetchOnMount) return;

        fetchSetores();

    }, [fetchOnMount, fetchSetores]);

    // ========================================
    // RETURN
    // ========================================

    return {

        // Dados
        setores,
        setorAtual,

        // Loading
        loadingSetores,

        // Errors
        errorSetores,

        // Actions
        fetchSetores,
        fetchSetorById,
        refetchSetores,

        // Setters
        setSetores,
        setSetorAtual,
    };
}