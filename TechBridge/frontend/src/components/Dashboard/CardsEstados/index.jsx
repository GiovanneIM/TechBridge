// src/components/CardsPorSetor.jsx
import { useEffect, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useEmpresa } from "@/hooks/useEmpresa";

export default function CardsPorSetor() {

  const { user } = useAuth();

  const {
    loading,
    setores,
    obterSetores,
    chamados,
    obterChamados,
  } = useEmpresa();

  // =====================================================
  // FETCH SETORES + CHAMADOS
  // =====================================================

  useEffect(() => {
    if (!user?.id_empresa) return;
    if (!setores)  obterSetores(user.id_empresa);
    if (!chamados) obterChamados(user.id_empresa);
  }, [user?.id_empresa]);

  const isLoading =
    (loading.obterSetores  && (setores  ?? []).length === 0) ||
    (loading.obterChamados && (chamados ?? []).length === 0);

  // =====================================================
  // AGRUPAMENTO: chamados por setor + estado
  // =====================================================

  const contadoresBySetor = useMemo(() => {
    const map = {};

    for (const c of chamados ?? []) {
      const setorId = Number(c.id_setor);
      const estado  = String(c.estado || "").toLowerCase();

      if (!setorId) continue;

      if (!map[setorId]) {
        map[setorId] = { aberto: 0, andamento: 0, concluido: 0 };
      }

      switch (estado) {
        case "aberto":    map[setorId].aberto++;    break;
        case "andamento": map[setorId].andamento++; break;
        case "concluido": map[setorId].concluido++; break;
        default: break;
      }
    }

    return map;
  }, [chamados]);

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-4">

      {/* HEADER */}
      <div className="col-span-full flex items-center justify-between">
        <h3 className="text-lg font-semibold">Chamados por Setor</h3>
        <span className="text-sm text-muted-foreground">
          Total setores: {setores?.length ?? 0}
        </span>
      </div>

      {/* LOADING */}
      {isLoading && (
        <div className="col-span-full text-sm text-muted-foreground">
          Carregando...
        </div>
      )}

      {/* CARDS */}
      {!isLoading && setores?.map((setor) => {
        const cont = contadoresBySetor[Number(setor.id)] ?? {
          aberto: 0,
          andamento: 0,
          concluido: 0,
        };

        return (
          <Card key={setor.id} className="relative overflow-hidden py-4">

            {/* barra lateral */}
            <div
              className="absolute left-0 top-0 h-full w-2"
              style={{
                background: "linear-gradient(180deg, #f59e0b, #3b82f6, #22c55e)",
              }}
            />

            <CardHeader>
              <CardTitle className="text-md">{setor.nome}</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-3">
              <div className="flex justify-between">
                <span>Abertos</span>
                <strong>{cont.aberto}</strong>
              </div>
              <div className="flex justify-between">
                <span>Em andamento</span>
                <strong>{cont.andamento}</strong>
              </div>
              <div className="flex justify-between">
                <span>Concluídos</span>
                <strong>{cont.concluido}</strong>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* EMPTY STATE */}
      {!isLoading && (setores ?? []).length === 0 && (
        <div className="col-span-full text-sm text-muted-foreground">
          Nenhum setor encontrado.
        </div>
      )}
    </div>
  );
}