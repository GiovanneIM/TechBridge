'use client';

import { useState, useCallback } from "react";
import { API_FETCH } from "@/lib/api";

export function useSetores() {
  const [setorAtual, setSetorAtual] = useState(null);

  const [loadingSetores, setLoadingSetores] = useState(false);
  const [errorSetores, setErrorSetores] = useState({ fetchOne: null });

  const [maquinasSetor, setMaquinasSetor] = useState([]);
  const [loadingMaquinas, setLoadingMaquinas] = useState(false);
  const [errorMaquinas, setErrorMaquinas] = useState(null);

  // =========================
  // SETOR BY ID
  // =========================
  const fetchSetorById = useCallback(async (cod_setor, id_empresa) => {
    setLoadingSetores(true);
    setErrorSetores((prev) => ({ ...prev, fetchOne: null }));

    try {
      const res = await API_FETCH(
        `/empresas/${id_empresa}/setores/${cod_setor}`,
        { method: "GET" }
      );

      if (!res.sucesso) {
        setErrorSetores((prev) => ({ ...prev, fetchOne: res.mensagem }));
        return;
      }

      setSetorAtual(res.dados.setor || res.dados);
    } catch {
      setErrorSetores((prev) => ({
        ...prev,
        fetchOne: "Erro ao carregar setor",
      }));
    } finally {
      setLoadingSetores(false);
    }
  }, []);

  // =========================
  // MÁQUINAS DO SETOR
  // =========================
  const fetchMaquinasDoSetor = useCallback(async (id_empresa, cod_setor) => {
    setLoadingMaquinas(true);
    setErrorMaquinas(null);

    try {
      const res = await API_FETCH(
        `/empresas/${id_empresa}/setores/${cod_setor}/maquinas`,
        { method: "GET" }
      );

      if (!res.sucesso) {
        setErrorMaquinas(res.mensagem);
        return;
      }

      setMaquinasSetor(res.dados.maquinas || []);
    } catch {
      setErrorMaquinas("Erro ao carregar máquinas");
    } finally {
      setLoadingMaquinas(false);
    }
  }, []);

  // =========================
  // ADD MÁQUINA
  // =========================
  const addMaquinaToSetor = useCallback(async (id_empresa, cod_setor, id_maquina) => {
    try {
      const res = await API_FETCH(
        `/empresas/${id_empresa}/maquinas/${id_maquina}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_setor: cod_setor, // 🔥 IMPORTANTE (era isso que quebrava)
          }),
        }
      );

      if (!res.sucesso) {
        throw new Error(res.mensagem);
      }

      await fetchMaquinasDoSetor(id_empresa, cod_setor);
    } catch (err) {
      setErrorMaquinas(err.message || "Erro ao adicionar máquina");
    }
  }, []);

  // =========================
  // REMOVE MÁQUINA
  // =========================
  const removeMaquinaFromSetor = useCallback(async (id_empresa, cod_setor, id_maquina) => {
    try {
      const res = await API_FETCH(
        `/empresas/${id_empresa}/maquinas/${id_maquina}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_setor: null, // remove do setor
          }),
        }
      );

      if (!res.sucesso) {
        throw new Error(res.mensagem);
      }

      await fetchMaquinasDoSetor(id_empresa, cod_setor);
    } catch (err) {
      setErrorMaquinas(err.message || "Erro ao remover máquina");
    }
  }, []);

  return {
    setorAtual,
    fetchSetorById,
    loadingSetores,
    errorSetores,

    maquinasSetor,
    fetchMaquinasDoSetor,
    loadingMaquinas,
    errorMaquinas,

    addMaquinaToSetor,
    removeMaquinaFromSetor,
  };
}