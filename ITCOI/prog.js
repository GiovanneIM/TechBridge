// ================= PINOS =================
const LED1 = 25, LED2 = 26, LED3 = 27;
const BT1 = 14,  BT2 = 12,  BT3 = 13;

pinMode(LED1, "output");
pinMode(LED2, "output");
pinMode(LED3, "output");
pinMode(BT1, "input_pullup");
pinMode(BT2, "input_pullup");
pinMode(BT3, "input_pullup");

let lastBT1 = 1, lastBT2 = 1, lastBT3 = 1;
let statusLED1 = 0, statusLED2 = 0, statusLED3 = 0;

// ================= FUNÇÃO SERIAL =================
function criarChamado(id_maquina) {
  const payload = {
    id_empresa: 2,
    id_setor: 1,
    id_maquina: id_maquina,
    cod_chamado: "ESP32_BTN"
  };
  Serial1.println("POST:" + JSON.stringify(payload));
  console.log("Chamado enviado - máquina:", id_maquina);
}

// ================= LOOP =================
setInterval(function () {

  // Botão 1 → máquina 1
  let bt1 = digitalRead(BT1);
  if (lastBT1 == 1 && bt1 == 0) {
    statusLED1 = !statusLED1;
    digitalWrite(LED1, statusLED1);
    criarChamado(1);
  }
  lastBT1 = bt1;

  // Botão 2 → máquina 2
  let bt2 = digitalRead(BT2);
  if (lastBT2 == 1 && bt2 == 0) {
    statusLED2 = !statusLED2;
    digitalWrite(LED2, statusLED2);
    criarChamado(2);
  }
  lastBT2 = bt2;

  // Botão 3 → máquina 3
  let bt3 = digitalRead(BT3);
  if (lastBT3 == 1 && bt3 == 0) {
    statusLED3 = !statusLED3;
    digitalWrite(LED3, statusLED3);
    criarChamado(3);
  }
  lastBT3 = bt3;

}, 50);

Serial1.setup(115200, { tx: D1, rx: D3 });
console.log("Sistema iniciado.");