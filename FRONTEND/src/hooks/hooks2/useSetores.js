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
        return null;
      }

      const setor = res.dados?.setor || res.dados || null;
      setSetorAtual(setor);
      return setor;
    } catch (err) {
      setErrorSetores((prev) => ({
        ...prev,
        fetchOne: "Erro ao carregar setor",
      }));
      return null;
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
        setErrorMaquinas(res.mensagem || "Erro ao listar máquinas");
        setMaquinasSetor([]);
        return [];
      }

      const lista = res.dados?.maquinas || [];
      setMaquinasSetor(lista);
      return lista;
    } catch (err) {
      setErrorMaquinas(err.message || "Erro ao carregar máquinas");
      setMaquinasSetor([]);
      return [];
    } finally {
      setLoadingMaquinas(false);
    }
  }, []);

  // =========================
  // ADICIONAR / CRIAR NOVA MÁQUINA NO SETOR
  // =========================
  const addMaquinaToSetor = useCallback(async (id_empresa, cod_setor, dadosMaquina) => {
    setErrorMaquinas(null);
    try {
      const res = await API_FETCH(
        `/empresas/${id_empresa}/setores/${cod_setor}/maquinas`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dadosMaquina),
        }
      );

      if (!res.sucesso) {
        throw new Error(res.mensagem || "Erro ao criar máquina");
      }

      // Refetch automático para atualizar a lista na tela
      await fetchMaquinasDoSetor(id_empresa, cod_setor);
      return true;
    } catch (err) {
      setErrorMaquinas(err.message || "Erro ao adicionar máquina");
      throw err;
    }
  }, [fetchMaquinasDoSetor]);

  // =========================
  // DELETAR MÁQUINA DEFINITIVAMENTE (Corrigido)
  // =========================
  const deleteMaquina = useCallback(async (id_empresa, cod_setor, id_maquina) => {
    setErrorMaquinas(null);
    setLoadingMaquinas(true);

    try {
      // CORREÇÃO: Adicionado o prefixo "/empresas" para alinhar com o backend
      const res = await API_FETCH(
        `/empresas/${id_empresa}/maquinas/${id_maquina}`,
        { method: "DELETE" }
      );

      if (!res.sucesso) {
        throw new Error(res.mensagem || "Erro ao deletar máquina");
      }

      // Atualização otimista do estado local para resposta instantânea na UI
      setMaquinasSetor((prev) => prev.filter((m) => m.id !== id_maquina));

      // Garante sincronia final com o banco de dados
      await fetchMaquinasDoSetor(id_empresa, cod_setor);
      return true;
    } catch (err) {
      setErrorMaquinas(err.message || "Erro ao deletar máquina");
      throw err;
    } finally {
      setLoadingMaquinas(false);
    }
  }, [fetchMaquinasDoSetor]);

  // Outros métodos auxiliares mantidos...
  const assignMaquinaToSetor = useCallback(async (id_empresa, cod_setor, id_maquina) => { /* ... */ }, [fetchMaquinasDoSetor]);
  const disassociateMaquinaFromSetor = useCallback(async (id_empresa, cod_setor, id_maquina) => { /* ... */ }, [fetchMaquinasDoSetor]);

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
    deleteMaquina,
    assignMaquinaToSetor,
    disassociateMaquinaFromSetor,
  };
}

export default useSetores;