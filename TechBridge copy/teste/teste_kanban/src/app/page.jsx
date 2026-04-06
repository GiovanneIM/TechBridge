"use client"

import { useEffect, useState } from "react";

export default function App() {
  const [chamados, setChamados] = useState([]);

  // 🔄 Carregar inicial
  async function carregarChamados() {
    const res = await fetch("http://localhost:3000/chamados");
    const data = await res.json();
    setChamados(data);
  }

  // 🔌 SSE
  useEffect(() => {
    carregarChamados();

    const eventSource = new EventSource("http://localhost:3000/events");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.tipo === "NOVO_CHAMADO") {
        setChamados(prev => [...prev, data.chamado]);
      }

      if (data.tipo === "STATUS_ATUALIZADO") {
        setChamados(prev =>
          prev.map(c =>
            c.id === data.chamado.id ? data.chamado : c
          )
        );
      }
    };

    return () => eventSource.close();
  }, []);

  // 🧠 Separar por status
  const colunas = {
    aberto: chamados.filter(c => c.status === "aberto"),
    em_andamento: chamados.filter(c => c.status === "em_andamento"),
    fechado: chamados.filter(c => c.status === "fechado"),
  };

  return (
    <div style={{ display: "flex", gap: 20 }}>
      {Object.entries(colunas).map(([status, lista]) => (
        <div key={status}>
          <h2>{status}</h2>

          {lista.map(c => (
            <div key={c.id} style={{ border: "1px solid #ccc", margin: 5 }}>
              <p>{c.titulo}</p>

              <button onClick={() => atualizarStatus(c.id, "aberto")}>
                Aberto
              </button>
              <button onClick={() => atualizarStatus(c.id, "em_andamento")}>
                Em andamento
              </button>
              <button onClick={() => atualizarStatus(c.id, "fechado")}>
                Fechado
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  async function atualizarStatus(id, status) {
    await fetch(`http://localhost:3000/chamados/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
  }
}