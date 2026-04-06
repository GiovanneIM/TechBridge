const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// "Banco de dados" em memória
let chamados = [
  { id: 1, titulo: "Erro no sistema", status: "aberto" },
  { id: 2, titulo: "Bug no login", status: "em_andamento" }
];

// Clientes conectados via SSE
let clientes = [];

// 🔌 Rota SSE
app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.flushHeaders();

  const cliente = { id: Date.now(), res };
  clientes.push(cliente);

  console.log("Cliente conectado:", cliente.id);

  req.on("close", () => {
    clientes = clientes.filter(c => c.id !== cliente.id);
    console.log("Cliente desconectado:", cliente.id);
  });
});

// 📢 Função para notificar clientes
function enviarEvento(data) {
  clientes.forEach(cliente => {
    cliente.res.write(`data: ${JSON.stringify(data)}\n\n`);
  });
}

// 📌 Listar chamados
app.get("/chamados", (req, res) => {
  res.json(chamados);
});

// 📌 Criar chamado
app.post("/chamados", (req, res) => {
  const novo = {
    id: Date.now(),
    titulo: req.body.titulo,
    status: "aberto"
  };

  chamados.push(novo);

  // Notifica frontend
  enviarEvento({ tipo: "NOVO_CHAMADO", chamado: novo });

  res.json(novo);
});

// 📌 Atualizar status
app.put("/chamados/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const chamado = chamados.find(c => c.id == id);

  if (!chamado) {
    return res.status(404).json({ erro: "Não encontrado" });
  }

  chamado.status = status;

  // Notifica frontend
  enviarEvento({ tipo: "STATUS_ATUALIZADO", chamado });

  res.json(chamado);
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});