"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import HeaderPage from "@/components/blocks/Header/HeaderPage";
import LoadingPage from "@/components/blocks/Holders/LoadingPage";
import ErrorPage from "@/components/blocks/Holders/ErrorPage";

import {
  ArrowLeft,
  Warehouse,
  Wrench,
  PaintRoller,
  BriefcaseBusiness,
  Network,
  Hash,
  CalendarDays,
  Info,
  User,
  Shield,
  AlertTriangle,
  Tag,
  Building2,
} from "lucide-react";

import { useSetores } from "@/hooks/hooks2/useSetores";
import { useAuth } from "@/context/AuthContext";

const icones = {
  Wrench: <Wrench className="h-14 w-14 opacity-90" />,
  PaintRoller: <PaintRoller className="h-14 w-14 opacity-90" />,
  BriefcaseBusiness: <BriefcaseBusiness className="h-14 w-14 opacity-90" />,
  Network: <Network className="h-14 w-14 opacity-90" />,
  default: <Warehouse className="h-14 w-14 opacity-90" />,
};

const cores = {
  Azul: "bg-gradient-to-r from-blue-600 to-indigo-600",
  Verde: "bg-gradient-to-r from-emerald-600 to-teal-600",
  Amarelo: "bg-gradient-to-r from-amber-500 to-orange-500",
  Vermelho: "bg-gradient-to-r from-rose-600 to-red-600",
  Roxo: "bg-gradient-to-r from-purple-600 to-pink-600",
  Cinza: "bg-gradient-to-r from-slate-600 to-slate-800",
};

function getCor(cor) {
  return cores[cor] || cores.Cinza;
}

export default function PageSetorId() {
  const params = useParams();
  const { user } = useAuth();

  const {
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
  } = useSetores();

  const [novaMaquinaNome, setNovaMaquinaNome] = useState("");
  const [novaMaquinaCodigo, setNovaMaquinaCodigo] = useState("");
  const [operacaoMaquinaLoading, setOperacaoMaquinaLoading] = useState(false);

  useEffect(() => {
    if (params?.id && user?.id_empresa) {
      fetchSetorById(params.id, user.id_empresa);
      fetchMaquinasDoSetor(user.id_empresa, params.id);
    }
  }, [params?.id, user?.id_empresa, fetchSetorById, fetchMaquinasDoSetor]);

  if (loadingSetores && !setorAtual) {
    return (
      <LoadingPage
        loadingTitle="Carregando setor"
        loadingSubtitle={["Aguarde alguns segundos"]}
      />
    );
  }

  if (errorSetores.fetchOne) {
    return (
      <ErrorPage
        errorTitle="Erro ao carregar setor"
        errorSubtitle={[errorSetores.fetchOne]}
      />
    );
  }

  if (!setorAtual) {
    return (
      <ErrorPage
        errorTitle="Setor não encontrado"
        errorSubtitle={["Nenhum setor encontrado com esse ID"]}
      />
    );
  }

  const icone = icones[setorAtual.icone] || icones.default;
  const cor = getCor(setorAtual.cor);
  const isAtivo = Boolean(Number(setorAtual.status));
  const isBloqueado = Boolean(setorAtual.bloqueado);

  // Handler simplificado: cria a máquina pelo hook
  const handleAddMaquina = async () => {
    if (!novaMaquinaNome.trim()) {
      return alert("Informe o nome da máquina.");
    }
    if (!user?.id_empresa || !setorAtual?.cod_setor) {
      return alert("Dados do setor/empresa indisponíveis.");
    }

    try {
      setOperacaoMaquinaLoading(true);

      const payload = {
        nome: novaMaquinaNome.trim(),
        cod_maquina: novaMaquinaCodigo ? novaMaquinaCodigo.trim() : undefined,
        descricao: `${novaMaquinaNome.trim()} do setor ${setorAtual.id}`,  // ← automático
      };

      await addMaquinaToSetor(user.id_empresa, setorAtual.cod_setor, payload);

      setNovaMaquinaNome("");
      setNovaMaquinaCodigo("");
    } catch (err) {
      alert(err.message || "Erro ao adicionar máquina");
    } finally {
      setOperacaoMaquinaLoading(false);
    }
  };

  // Handler simplificado: deleta a máquina usando o hook
  const handleDeleteMaquina = async (maquina) => {
    if (!confirm(`Deseja realmente deletar a máquina "${maquina.nome}"?`)) return;
    if (!user?.id_empresa || !setorAtual?.cod_setor) {
      return alert("Dados do setor/empresa indisponíveis.");
    }

    try {
      setOperacaoMaquinaLoading(true);
      await deleteMaquina(user.id_empresa, setorAtual.cod_setor, maquina.id);
    } catch (err) {
      alert(err.message || "Erro ao deletar máquina");
    } finally {
      setOperacaoMaquinaLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-sidebar flex flex-col">
      <HeaderPage
        icon={Warehouse}
        title={setorAtual.nome}
        actions={[
          {
            icon: <ArrowLeft />,
            text: "Voltar",
            onClick: () => window.history.back(),
          },
        ]}
      />

      <div className="w-full max-w-screen-2xl mx-auto px-6 py-6 space-y-6">
        {/* Banner do Setor */}
        <div className={`rounded-3xl p-8 text-white shadow-xl ${cor}`}>
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                {icone}
              </div>

              <div>
                <h1 className="text-3xl font-bold">{setorAtual.nome}</h1>
                <p className="text-white/80 mt-2 max-w-xl">
                  {setorAtual.descricao || "Sem descrição cadastrada"}
                </p>

                <div className="flex gap-2 mt-3 flex-wrap">
                  <span className="bg-white/15 px-3 py-1 rounded-full text-sm">
                    Código: {setorAtual.cod_setor}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${isAtivo ? "bg-emerald-500/30" : "bg-red-500/30"}`}>
                    {isAtivo ? "Ativo" : "Inativo"}
                  </span>
                  {isBloqueado && (
                    <span className="bg-red-700/40 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4" />
                      Bloqueado
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-2xl p-5 min-w-[220px]">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <Hash className="h-4 w-4" />
                ID do setor
              </div>
              <div className="text-3xl font-bold mt-1">#{setorAtual.id}</div>
              <div className="text-sm text-white/80 mt-2 flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Empresa #{setorAtual.id_empresa}
              </div>
            </div>
          </div>
        </div>

        {/* Informações detalhadas e Seção de Máquinas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-sidebar p-6 rounded-2xl border shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Info className="text-blue-500" />
                <h2 className="font-bold text-lg">Descrição</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {setorAtual.descricao || "Sem descrição cadastrada."}
              </p>
            </div>

            <div className="bg-white dark:bg-sidebar p-6 rounded-2xl border shadow-sm">
              <h2 className="font-bold text-lg mb-4">Metadados</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-gray-500" />
                  Código interno: <b>{setorAtual.cod_setor}</b>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  Empresa ID: <b>{setorAtual.id_empresa}</b>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-gray-500" />
                  Status:{" "}
                  <b className={isAtivo ? "text-emerald-500" : "text-red-500"}>
                    {isAtivo ? "Ativo" : "Inativo"}
                  </b>
                </div>
                {setorAtual.data_criacao && (
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-gray-500" />
                    Criado em:{" "}
                    <b>
                      {new Date(setorAtual.data_criacao).toLocaleDateString("pt-BR")}
                    </b>
                  </div>
                )}
              </div>
            </div>

            {/* SEÇÃO DE MÁQUINAS DO SETOR */}
            <div className="bg-white dark:bg-sidebar p-6 rounded-2xl border shadow-sm">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Máquinas do setor
              </h2>

              {loadingMaquinas ? (
                <p className="text-sm text-gray-500">Carregando máquinas...</p>
              ) : errorMaquinas ? (
                <p className="text-sm text-red-500">{errorMaquinas}</p>
              ) : (
                <>
                  <div className="mb-4 flex gap-2">
                    <input
                      value={novaMaquinaNome}
                      onChange={(e) => setNovaMaquinaNome(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border dark:bg-sidebar"
                      placeholder="Nome da máquina"
                      disabled={operacaoMaquinaLoading}
                    />
                    <input
                      value={novaMaquinaCodigo}
                      onChange={(e) => setNovaMaquinaCodigo(e.target.value)}
                      className="w-36 px-3 py-2 rounded-lg border dark:bg-sidebar"
                      placeholder="Código"
                      disabled={operacaoMaquinaLoading}
                    />
                    <button
                      onClick={handleAddMaquina}
                      className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium disabled:opacity-50"
                      disabled={operacaoMaquinaLoading}
                    >
                      {operacaoMaquinaLoading ? "Salvando..." : "Adicionar"}
                    </button>
                  </div>

                  {maquinasSetor.length === 0 ? (
                    <p className="text-sm text-gray-500">Nenhuma máquina cadastrada</p>
                  ) : (
                    <div className="space-y-3">
                      {maquinasSetor.map((m) => (
                        <div
                          key={m.id}
                          className="p-3 rounded-xl border flex items-center justify-between dark:border-gray-700"
                        >
                          <div>
                            <p className="font-semibold">{m.nome}</p>
                            <p className="text-xs text-gray-500">Código: {m.cod_maquina}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">#{m.id}</span>
                            <button
                              onClick={() => handleDeleteMaquina(m)}
                              className="text-red-500 hover:text-red-600 text-sm px-2 py-1 disabled:opacity-50"
                              disabled={operacaoMaquinaLoading}
                            >
                              Excluir
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Coluna Lateral */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-sidebar p-6 rounded-2xl border shadow-sm">
              <h2 className="font-bold text-lg mb-4">Status</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${isAtivo ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                {isAtivo ? "Ativo" : "Inativo"}
              </span>
              {isBloqueado && (
                <div className="mt-3 flex items-center gap-2 text-red-500 text-sm">
                  <AlertTriangle className="h-4 w-4" />
                  Este setor está bloqueado
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-sidebar rounded-2xl p-6 border shadow-sm">
              <h2 className="text-xl font-bold mb-4">Controle</h2>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <Shield className="h-4 w-4 text-gray-500" />
                Nível: {setorAtual.nivel_acesso || "Não definido"}
              </div>
              <div className="flex items-center gap-2 mt-3 text-sm text-gray-600 dark:text-gray-300">
                <CalendarDays className="h-4 w-4 text-gray-500" />
                {new Date(setorAtual.data_criacao).toLocaleDateString("pt-BR")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}