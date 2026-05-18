// src/components/CardsPorSetor.jsx
import { useEffect, useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { useSetores } from "@/hooks/hooks2/useSetores";
import { apiFetch } from "@/lib/api";

export default function CardsPorSetor({
  fetchSetoresOnMount = true,
}) {
  const {
    setores,
    fetchSetores,
  } = useSetores({
    initialSetores: [],
    fetchOnMount: fetchSetoresOnMount,
  });

  const [chamados, setChamados] = useState([]);

  /**
   * 🔹 BUSCA TODOS OS CHAMADOS
   */
  useEffect(() => {
    async function loadChamados() {
      try {
        const res = await apiFetch("/chamados/buscar");

        const data =
          res?.dados?.chamados ??
          res?.dados ??
          res ??
          [];

        setChamados(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erro ao buscar chamados:", err);
        setChamados([]);
      }
    }

    loadChamados();
  }, []);

  /**
   * 🔥 AGRUPAMENTO POR SETOR + ESTADO (CORRETO)
   */
  const contadoresBySetor = useMemo(() => {
    const map = {};

    for (const c of chamados) {
      const setorId = Number(c.id_setor);
      const estado = String(c.estado || "").toLowerCase();

      if (!setorId) continue;

      if (!map[setorId]) {
        map[setorId] = {
          aberto: 0,
          andamento: 0,
          concluido: 0,
        };
      }

      switch (estado) {
        case "aberto":
          map[setorId].aberto++;
          break;

        case "andamento":
          map[setorId].andamento++;
          break;

        case "concluido":
          map[setorId].concluido++;
          break;

        default:
          break;
      }
    }

    return map;
  }, [chamados]);

  /**
   * 🔹 GARANTE SETORES
   */
  useEffect(() => {
    if (!fetchSetoresOnMount && (!setores || setores.length === 0)) {
      fetchSetores();
    }
  }, [fetchSetoresOnMount, setores, fetchSetores]);

  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-4">

      {/* HEADER */}
      <div className="col-span-full flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Chamados por Setor
        </h3>

        <span className="text-sm text-muted-foreground">
          Total setores: {setores?.length ?? 0}
        </span>
      </div>

      {/* CARDS */}
      {setores?.map((setor) => {
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
                background:
                  "linear-gradient(180deg, #f59e0b, #3b82f6, #22c55e)",
              }}
            />

            <CardHeader>
              <CardTitle className="text-md">
                {setor.nome}
              </CardTitle>
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
      {setores?.length === 0 && (
        <div className="col-span-full text-sm text-muted-foreground">
          Nenhum setor encontrado.
        </div>
      )}
    </div>
  );
}