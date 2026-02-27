# Briefing

### 🚨 Tema 7: Sistema de Chamado de Manutenção Interna (Andon Digital)

**1. O Contexto e a História (O Problema)**
A "Usinagem Rápida Ltda" (cliente fictício) tem um galpão imenso com dezenas de tornos CNC. Quando uma máquina trava ou quebra uma ferramenta, o operador precisa parar o que está fazendo, sair andando pela fábrica para procurar o supervisor ou o mecânico de manutenção, ou simplesmente ficar gritando. Enquanto isso, a máquina fica parada, não produzindo, e ninguém mede quanto tempo o mecânico demorou para chegar. A comunicação é caótica e o tempo de resposta à falha é altíssimo.

**2. A Solução Esperada**
O grupo vai desenvolver o **"FastAndon"** (ou "HelpDesk Industrial"). A ideia é colocar o poder de pedir ajuda na ponta dos dedos do operador, sem que ele saia do posto de trabalho. Um botão físico (IoT) na máquina abrirá um chamado instantâneo. O painel Web, visível para a gestão, mostrará quem está precisando de ajuda em tempo real. O aplicativo móvel será a ferramenta de trabalho do mecânico, que receberá o chamado no bolso, aceitará e registrará o conserto.

**3. Entregas Técnicas e Requisitos por Plataforma**

- **🔌 IoT (O Botão de Pânico / Andon)**
    - **Hardware Sugerido:** Microcontrolador (ESP32/NodeMCU) + 1 Botão físico tipo "cogumelo" ou push-button industrial + 1 LED (ou fita LED pequena).
    - **A Lógica:** 1. Operador aperta o botão. O IoT envia um sinal (HTTP POST ou MQTT) para a API criando o chamado.
    2. O LED da máquina acende (indicando: "Chamado aberto, aguarde").
    3. Quando o mecânico finalizar o atendimento pelo celular, o back-end avisa o IoT para apagar o LED. Simples e extremamente visual.
- **🌐 Web (Next.js - O Centro de Controle de Manutenção)**
    - **Painel de Chamados (Real-Time):** Uma tela (estilo Kanban ou Lista dinâmica) para ficar numa TV na sala de manutenção. Mostra: Máquina que chamou, Status (Aguardando / Em Atendimento), e um cronômetro rodando com o tempo de espera.
    - **Cadastros (CRUD):** *Máquinas*, *Setores*, *Técnicos de Manutenção* e *Causas Padrão de Falha* (ex: Elétrica, Mecânica, Falta de Peça).
    - **Indicadores e Relatórios:** O gestor precisa ver um ranking: Quais setores dão mais problema? Qual é o tempo médio de espera (MTTA - *Mean Time To Acknowledge*)? Qual o tempo médio de reparo (MTTR - *Mean Time To Repair*)?
- **📱 Mobile (O App do Mecânico)**
    - **Notificação Ativa:** O celular do técnico toca/vibra (Push Notification) assim que o botão IoT é apertado.
    - **Fluxo de Atendimento (Obrigatório):** 1. O técnico abre o app e clica em **"Aceitar Chamado"** (isso para o relógio de "espera" e inicia o relógio de "atendimento" no painel Web).
    2. Ele vai até a máquina, faz o conserto e clica em **"Finalizar Chamado"**.
    3. O app o obriga a selecionar a **Causa** do problema e digitar uma breve observação antes de fechar de vez.
- **🗄️ Banco de Dados (MySQL)**
    - **Gestão de Estados:** A tabela principal será a de `Chamados`. Ela precisa ter colunas cruciais para a métrica de tempo: `ID_Maquina`, `ID_Tecnico`, `Status`, `DataHora_Abertura` (criada pelo IoT), `DataHora_Aceite` (criada pelo Mobile), `DataHora_Fechamento` (criada pelo Mobile) e `Causa_ID`.

**4. Desafio Extra (Opcional - Para se destacar na banca)**
Implementar atualização em tempo real no painel Web (Next.js) sem precisar dar *refresh* (F5) na página. O grupo pode usar **WebSockets** (ex: *Socket.io*) ou **SSE (Server-Sent Events)** para que, no exato milissegundo em que o operador apertar o botão físico lá na máquina, o "card" pule na tela do painel Web da manutenção. Isso dá um efeito "UAU" na apresentação!