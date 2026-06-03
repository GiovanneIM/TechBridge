import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';

const SERIAL_PORT = process.env.SERIAL_PORT || "COM12";
const BAUD_RATE   = parseInt(process.env.SERIAL_BAUD) || 115200;
const API_URL     = `${process.env.API_URL || "http://localhost:3000"}/techbridge/chamados2`;
const API_HEADERS = { "Content-Type": "application/json" };

const RECONNECT_MS = 5000;

export function startSerialGateway() {
  tryConnect();
}

function tryConnect() {
  const port = new SerialPort({ path: SERIAL_PORT, baudRate: BAUD_RATE, autoOpen: false });

  port.open((err) => {
    if (err) {
      console.warn(`[Serial] ESP32 não encontrado em ${SERIAL_PORT}. Tentando em ${RECONNECT_MS / 1000}s...`);
      setTimeout(tryConnect, RECONNECT_MS);
      return;
    }

    console.log(`[Serial] ESP32 conectado em ${SERIAL_PORT} ✓`);

    const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

    port.on("error", (err) => console.error("[Serial] Erro:", err.message));
    port.on("close", () => {
      console.warn("[Serial] ESP32 desconectado. Reconectando...");
      setTimeout(tryConnect, RECONNECT_MS);
    });

    parser.on("data", async (line) => {
      line = line.trim();
      if (!line.startsWith("POST:")) return;

      let body;
      try {
        body = JSON.parse(line.slice(5));
      } catch (e) {
        console.error("[Serial] JSON inválido:", line);
        return;
      }

      // Gera código numérico único (últimos 8 dígitos do timestamp)
      body.cod_chamado = parseInt(Date.now().toString().slice(-8));

      console.log(`[Serial] Botão pressionado → máquina ${body.id_maquina} | cod: ${body.cod_chamado}`);

      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: API_HEADERS,
          body: JSON.stringify(body),
        });
        console.log(`[Serial] API respondeu [${res.status}]`);
      } catch (err) {
        console.error("[Serial] Erro ao chamar API:", err.message);
      }
    });
  });
}