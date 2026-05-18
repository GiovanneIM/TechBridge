// src/components/CardsPorSetor.jsx
import { useEffect, useState, useCallback, useRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { useSetores } from "@/hooks/hooks2/useSetores";
import { apiFetch } from "@/lib/api";

/**
 * Props:
 * - chamadosPorEstados: optional object { bySetor: { [setorId]: { aberto, andamento, concluido } } }
 * - fetchChamadosPorSetor: optional async function (setorId) => { aberto, andamento, concluido }
 * - fetchSetoresOnMount: boolean (default true) -> passed to useSetores
 * - pollInterval: number in ms for realtime polling (optional). If provided, component refetches counts periodically.
 */
export default function CardsPorSetor({
  chamadosPorEstados = null,
  fetchChamadosPorSetor = null,
  fetchSetoresOnMount = true,
  pollInterval = null,
}) {
  const {
    setores,
    loadingSetores,
    errorSetores,
    fetchSetores,
  } = useSetores({ initialSetores: [], fetchOnMount: fetchSetoresOnMount });

  // contadores por setor: { [setorId]: { aberto, andamento, concluido } }
  const [contadoresBySetor, setContadoresBySetor] = useState({});
  const [loadingContadores, setLoadingContadores] = useState(false);
  const [errorContadores, setErrorContadores] = useState(null);

  const pollRef = useRef(null);

  const estadosKeys = [
    { key: "aberto", label: "Abertos", colorVar: "--color-aberto" },
    { key: "andamento", label: "Em andamento", colorVar: "--color-andamento" },
    { key: "concluido", label: "Concluídos", colorVar: "--color-concluido" },
  ];

  // Função que resolve contadores para um setor (prioriza props)
  const resolveContadoresForSetor = useCallback(async (setorId) => {
    // 1) se prop chamadosPorEstados tiver bySetor
    if (chamadosPorEstados?.bySetor && chamadosPorEstados.bySetor[setorId]) {
      const s = chamadosPorEstados.bySetor[setorId];
      return {
        aberto: s.aberto ?? 0,
        andamento: s.andamento ?? 0,
        concluido: s.concluido ?? 0,
      };
    }

    // 2) se foi passada função fetchChamadosPorSetor
    if (typeof fetchChamadosPorSetor === "function") {
      try {
        const data = await fetchChamadosPorSetor(setorId);
        return {
          aberto: data?.aberto ?? 0,
          andamento: data?.andamento ?? 0,
          concluido: data?.concluido ?? 0,
        };
      } catch (err) {
        throw new Error("Erro na função fetchChamadosPorSetor");
      }
    }

    // 3) fallback: chamada interna à API (ajuste a rota conforme sua API)
    try {
      const res = await apiFetch(`/chamados/buscar`);
      
      // espera que a API retorne { sucesso: true, dados: { contagem: { aberto, andamento, concluido } } }
      const cont = res?.dados?.contagem ?? res?.dados ?? null;
      return {
        aberto: cont?.aberto ?? 0,
        andamento: cont?.andamento ?? 0,
        concluido: cont?.concluido ?? 0,
      };
    } catch (err) {
      throw new Error("Erro ao buscar contagem na API");
    }
  }, [chamadosPorEstados, fetchChamadosPorSetor]);

  // Carrega contadores para todos os setores
  const loadAllContadores = useCallback(async () => {
    if (!setores || setores.length === 0) {
      setContadoresBySetor({});
      return;
    }

    setLoadingContadores(true);
    setErrorContadores(null);

    try {
      // busca em paralelo
      const promises = setores.map(async (s) => {
        try {
          const c = await resolveContadoresForSetor(s.id);
          return [s.id, c];
        } catch (err) {
          return [s.id, { aberto: 0, andamento: 0, concluido: 0 }];
        }
      });

      const results = await Promise.all(promises);
      const map = Object.fromEntries(results);
      setContadoresBySetor(map);
    } catch (err) {
      setErrorContadores("Erro ao carregar contadores por setor.");
      setContadoresBySetor({});
    } finally {
      setLoadingContadores(false);
    }
  }, [setores, resolveContadoresForSetor]);

  // Carrega setores (se hook não fez auto fetch) e contadores quando setores mudam
  useEffect(() => {
    // se hook não fez fetch automático, tenta buscar
    if (!fetchSetoresOnMount && (!setores || setores.length === 0)) {
      fetchSetores();
    }
  }, [fetchSetoresOnMount, setores, fetchSetores]);

  useEffect(() => {
    loadAllContadores();
  }, [setores, chamadosPorEstados, loadAllContadores]);

  // Polling (opcional)
  useEffect(() => {
    if (!pollInterval) return;
    // limpa qualquer poll anterior
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
    pollRef.current = setInterval(() => {
      loadAllContadores();
    }, pollInterval);

    return () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, [pollInterval, loadAllContadores]);


  return (
    <div className="w-full h-fit gap-4 grid grid-flow-row grid-cols-1 xl:grid-cols-2">
      <div className="col-span-full flex items-center gap-3">
        <h3 className="text-lg font-semibold">Chamados por Setor</h3>

        <div className="ml-auto flex items-center gap-3 text-sm">


          <div className="text-muted-foreground">
            {loadingSetores.fetch ? "Carregando setores..." : errorSetores.fetch ? errorSetores.fetch : `Total setores: ${setores.length}`}
          </div>
        </div>
      </div>

      {loadingContadores && (
        <div className="col-span-full text-sm text-muted-foreground">Carregando contadores...</div>
      )}

      {errorContadores && (
        <div className="col-span-full text-sm text-red-600">{errorContadores}</div>
      )}

      {setores.map((setor) => {
        const cont = contadoresBySetor[setor.id] ?? { aberto: 0, andamento: 0, concluido: 0 };

        return (
          <Card key={setor.id} className="relative overflow-hidden py-4 gap-0">
            <div
              className="absolute left-0 top-0 h-full w-2"
              style={{ background: "linear-gradient(180deg, var(--color-aberto) 0%, var(--color-andamento) 50%, var(--color-concluido) 100%)", opacity: 0.95 }}
              aria-hidden="true"
            />

            <CardHeader>
              <CardTitle className="text-md h-12">
                {setor.nome}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Chamados abertos</div>
                <div className="text-2xl font-bold">{cont.aberto ?? 0}</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Em andamento</div>
                <div className="text-2xl font-bold">{cont.andamento ?? 0}</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Concluídos</div>
                <div className="text-2xl font-bold">{cont.concluido ?? 0}</div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {setores.length === 0 && !loadingSetores.fetch && (
        <div className="col-span-full text-sm text-muted-foreground">Nenhum setor encontrado.</div>
      )}
    </div>
  );
}
