/**
 * Chatbot Widget Auto-Injetável — Versão K/DA FIRESTARTER ERA (Atendente Poro & Cliente Poro)
 */
(function () {
  if (window.chatbotInicializado) return;
  window.chatbotInicializado = true;

  // Remove qualquer emoji de textos vindos do JSON ou da base padrão
  function removerEmojis(texto) {
    if (!texto) return "";
    return texto
      .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}\uFE0F]/gu, "")
      .replace(/\s{2,}/g, " ")
      .trim();
  }

  // 1. ESTILOS CSS (VIDRO FOSCO + VERMELHO, ROSA E CIANO NEON)
  const cssStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Rajdhani:wght@500;600;700&display=swap');

    @keyframes kdaChatSlideUp {
      from {
        opacity: 0;
        transform: translateY(16px) scale(0.96);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes kdaPulsePink {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.45; transform: scale(0.85); }
    }

    #faq-chatbot-widget {
      font-family: 'Rajdhani', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      position: fixed !important;
      bottom: 24px !important;
      right: 24px !important;
      z-index: 99999999 !important;
    }

    /* Botão flutuante com ícone de balão de conversa */
   /* Botão flutuante com ícone de balão de conversa */
    #faq-toggle-btn {
      width: 62px !important;
      height: 62px !important;
      border-radius: 50% !important;
      padding: 0 !important;
      background: linear-gradient(135deg, #ff003c 0%, #ff007f 60%, #7e22ce 100%) !important;
      color: #ffffff !important;
      border: 2px solid #ff003c !important;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 0, 60, 0.65) !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      outline: none !important;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.3s ease !important;
    }

    #faq-toggle-btn:hover {
      transform: scale(1.1) rotate(-4deg) !important;
      border-color: #ff4da6 !important;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.85), 0 0 26px rgba(255, 0, 127, 0.85) !important;
    }

    #faq-toggle-btn svg {
      width: 28px !important;
      height: 28px !important;
      fill: #ffffff !important;
      pointer-events: none !important;
    }

    /* Janela principal do chat */
    #faq-chat-window {
      position: fixed !important;
      bottom: 98px !important;
      right: 24px !important;
      width: 385px !important;
      max-width: calc(100vw - 36px) !important;
      height: 530px !important;
      max-height: calc(100vh - 120px) !important;
      background: rgba(14, 5, 20, 0.92) !important;
      backdrop-filter: blur(18px) !important;
      -webkit-backdrop-filter: blur(18px) !important;
      border-radius: 22px !important;
      border: 1px solid rgba(255, 0, 127, 0.45) !important;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.88), 0 0 28px rgba(255, 0, 60, 0.25) !important;
      display: flex !important;
      flex-direction: column !important;
      overflow: hidden !important;
      animation: kdaChatSlideUp 0.28s ease-out !important;
      z-index: 99999999 !important;
    }

    #faq-chat-window.faq-hidden {
      display: none !important;
    }

    /* Cabeçalho com avatar do Poro Atendente */
    .faq-header {
      background: linear-gradient(135deg, rgba(255, 0, 60, 0.35), rgba(255, 0, 127, 0.22) 55%, rgba(0, 240, 255, 0.16)) !important;
      color: #ffffff !important;
      padding: 12px 16px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      border-bottom: 1px solid rgba(255, 0, 127, 0.28) !important;
    }

    .faq-header-title {
      display: flex !important;
      align-items: center !important;
      gap: 11px !important;
    }

    .faq-header-avatar {
      width: 42px !important;
      height: 42px !important;
      border-radius: 50% !important;
      object-fit: cover !important;
      object-position: center 20% !important;
      border: 2.5px solid #ff007f !important;
      box-shadow: 0 0 12px rgba(255, 0, 127, 0.7) !important;
      flex-shrink: 0 !important;
    }

    .faq-header-info {
      display: flex !important;
      flex-direction: column !important;
      gap: 2px !important;
    }

    .faq-header h3 {
      margin: 0 !important;
      font-family: 'Orbitron', sans-serif !important;
      font-size: 12.5px !important;
      font-weight: 700 !important;
      letter-spacing: 1.3px !important;
      color: #ffffff !important;
      text-transform: uppercase !important;
    }

    .faq-header h3 span {
      color: #ff4da6 !important;
    }

    .faq-status-line {
      display: flex !important;
      align-items: center !important;
      gap: 6px !important;
      font-size: 11px !important;
      font-weight: 600 !important;
      color: #fda4af !important;
      letter-spacing: 0.8px !important;
      text-transform: uppercase !important;
    }

    .faq-status-dot {
      width: 7px !important;
      height: 7px !important;
      border-radius: 50% !important;
      background-color: #ff007f !important;
      box-shadow: 0 0 8px #ff007f !important;
      animation: kdaPulsePink 2s infinite ease-in-out !important;
    }

    .faq-header-actions {
      display: flex !important;
      align-items: center !important;
      gap: 4px !important;
    }

    .faq-icon-btn {
      background: rgba(255, 255, 255, 0.06) !important;
      border: 1px solid transparent !important;
      color: #f1f5f9 !important;
      width: 28px !important;
      height: 28px !important;
      font-size: 14px !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      border-radius: 50% !important;
      transition: all 0.2s ease !important;
    }

    .faq-icon-btn svg {
      width: 14px !important;
      height: 14px !important;
      fill: currentColor !important;
    }

    .faq-icon-btn:hover {
      color: #ff4da6 !important;
      background: rgba(255, 0, 127, 0.16) !important;
      border-color: rgba(255, 0, 127, 0.45) !important;
    }

    /* Área de mensagens */
    #faq-messages {
      flex: 1 !important;
      padding: 16px !important;
      overflow-y: auto !important;
      background: radial-gradient(circle at top right, rgba(255, 0, 60, 0.12), transparent 65%) !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 13px !important;
      scrollbar-width: thin !important;
      scrollbar-color: rgba(255, 0, 127, 0.4) transparent !important;
    }

    #faq-messages::-webkit-scrollbar {
      width: 5px !important;
    }

    #faq-messages::-webkit-scrollbar-track {
      background: transparent !important;
    }

    #faq-messages::-webkit-scrollbar-thumb {
      background: rgba(255, 0, 127, 0.4) !important;
      border-radius: 10px !important;
    }

    /* Linha da mensagem do Atendente (Poro headset) */
    .faq-bot-row {
      display: flex !important;
      align-items: flex-end !important;
      gap: 10px !important;
      align-self: flex-start !important;
      max-width: 94% !important;
    }

    .faq-bot-avatar {
      width: 42px !important;
      height: 42px !important;
      border-radius: 50% !important;
      object-fit: cover !important;
      object-position: center 20% !important;
      border: 2.5px solid #ff007f !important;
      box-shadow: 0 0 12px rgba(255, 0, 127, 0.6) !important;
      flex-shrink: 0 !important;
    }

    /* Linha da mensagem do Cliente (Poro interrogações) */
    .faq-user-row {
      display: flex !important;
      align-items: flex-end !important;
      justify-content: flex-end !important;
      gap: 10px !important;
      align-self: flex-end !important;
      max-width: 94% !important;
    }

    .faq-user-avatar {
      width: 42px !important;
      height: 42px !important;
      border-radius: 50% !important;
      object-fit: cover !important;
      border: 2.5px solid #00f0ff !important;
      box-shadow: 0 0 12px rgba(0, 240, 255, 0.6) !important;
      flex-shrink: 0 !important;
    }

    /* Balões de conversa */
    .faq-msg {
      padding: 11px 15px !important;
      font-size: 14.5px !important;
      line-height: 1.45 !important;
      white-space: pre-line !important;
      font-family: 'Rajdhani', sans-serif !important;
      font-weight: 500 !important;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3) !important;
    }

    .faq-msg.bot {
      background: rgba(255, 255, 255, 0.07) !important;
      color: #f8fafc !important;
      border: 1px solid rgba(255, 0, 127, 0.25) !important;
      border-left: 3px solid #ff003c !important;
      border-radius: 16px 16px 16px 4px !important;
    }

    .faq-msg.bot strong {
      color: #ff4da6 !important;
      font-weight: 700 !important;
    }

    .faq-msg.user {
      background: linear-gradient(135deg, #ff003c 0%, #c026d3 100%) !important;
      border: 1px solid rgba(255, 255, 255, 0.2) !important;
      color: #ffffff !important;
      font-weight: 600 !important;
      border-radius: 16px 16px 4px 16px !important;
    }

    /* Lista de perguntas numeradas alinhada com o balão do bot */
    .faq-options {
      display: flex !important;
      flex-direction: column !important;
      gap: 7px !important;
      margin-top: 2px !important;
      padding-left: 52px !important;
    }

    .faq-chip {
      display: flex !important;
      align-items: center !important;
      gap: 9px !important;
      text-align: left !important;
      background: rgba(255, 0, 60, 0.08) !important;
      color: #f1f5f9 !important;
      border: 1px solid rgba(255, 0, 127, 0.35) !important;
      padding: 8px 13px !important;
      border-radius: 12px !important;
      font-size: 13.5px !important;
      font-family: 'Rajdhani', sans-serif !important;
      font-weight: 600 !important;
      cursor: pointer !important;
      transition: all 0.22s ease !important;
    }

    .faq-chip-num {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      min-width: 21px !important;
      height: 21px !important;
      border-radius: 50% !important;
      background: linear-gradient(135deg, #ff003c, #ff007f) !important;
      color: #ffffff !important;
      font-size: 11.5px !important;
      font-weight: 700 !important;
      flex-shrink: 0 !important;
    }

    .faq-chip:hover {
      background: linear-gradient(135deg, rgba(255, 0, 60, 0.85), rgba(255, 0, 127, 0.85)) !important;
      color: #ffffff !important;
      border-color: #00f0ff !important;
      transform: translateX(4px) !important;
      box-shadow: 0 4px 14px rgba(255, 0, 60, 0.4) !important;
    }

    .faq-chip:hover .faq-chip-num {
      background: #00f0ff !important;
      color: #090412 !important;
    }

    /* Rodapé e campo de texto */
    .faq-footer {
      padding: 12px 14px !important;
      background: rgba(9, 3, 14, 0.9) !important;
      border-top: 1px solid rgba(255, 0, 127, 0.2) !important;
    }

    .faq-input-area {
      display: flex !important;
      align-items: center !important;
      background: rgba(255, 255, 255, 0.06) !important;
      border: 1px solid rgba(255, 0, 127, 0.35) !important;
      border-radius: 999px !important;
      padding: 4px 6px 4px 16px !important;
      gap: 8px !important;
      transition: border-color 0.25s ease, box-shadow 0.25s ease !important;
    }

    .faq-input-area:focus-within {
      border-color: #ff007f !important;
      box-shadow: 0 0 12px rgba(255, 0, 127, 0.35) !important;
    }

    #faq-input {
      flex: 1 !important;
      background: transparent !important;
      border: none !important;
      color: #ffffff !important;
      font-family: 'Rajdhani', sans-serif !important;
      font-size: 14.5px !important;
      font-weight: 500 !important;
      outline: none !important;
    }

    #faq-input::placeholder {
      color: #94a3b8 !important;
    }

    #faq-send-btn {
      background: linear-gradient(135deg, #ff003c, #ff007f) !important;
      color: #ffffff !important;
      border: none !important;
      width: 34px !important;
      height: 34px !important;
      border-radius: 50% !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      flex-shrink: 0 !important;
      transition: transform 0.2s ease, box-shadow 0.2s ease !important;
    }

    #faq-send-btn:hover {
      transform: scale(1.08) !important;
      box-shadow: 0 0 14px rgba(255, 0, 127, 0.75) !important;
    }

    #faq-send-btn svg {
      width: 16px !important;
      height: 16px !important;
      fill: #ffffff !important;
      margin-left: 2px !important;
    }
  `;

  // 2. BASE DE DADOS PADRÃO (SEM EMOJIS)
  const FAQ_PADRAO = [
    {
      titulo: "Classificação Etária",
      keywords: ["idade", "menor", "classificacao", "anos", "pais", "acompanhado", "crianca"],
      resposta: "A classificação etária é **18 anos**. Menores de 18 anos podem entrar acompanhados de pai, mãe ou responsável legal munido de autorização por escrito."
    },
    {
      titulo: "Posso comprar na hora?",
      keywords: ["hora", "na hora", "bilheteria", "comprar la", "local", "ingresso la", "fisica"],
      resposta: "Haverá bilheteria no local **apenas se restarem ingressos**. Como a procura é alta, recomendamos garantir a sua credencial antecipada pelo site para não ficar de fora!"
    },
    {
      titulo: "Posso levar comida e bebida?",
      keywords: ["comida", "bebida", "alimento", "garrafa", "entrar com comida", "lanche", "agua"],
      resposta: "É permitida a entrada de **água em garrafa plástica transparente (sem tampa)** e **alimentos industrializados lacrados** (ex: barras de cereal, biscoitos)."
    },
    {
      titulo: "Como recebo o meu ingresso?",
      keywords: ["receber", "ingresso", "qr", "qrcode", "pdf", "email", "voucher", "e-ticket", "mostrar"],
      resposta: "Assim que o pagamento for aprovado, o seu **QR Code / E-Ticket** é enviado para o seu e-mail cadastrado. No dia do evento, basta apresentar a tela do celular na entrada."
    },
    {
      titulo: "Posso passar para outra pessoa?",
      keywords: ["transferir", "passar", "outra pessoa", "amigo", "nome", "titularidade", "trocar nome"],
      resposta: "Sim! Você pode alterar o nome do titular do ingresso diretamente pela sua conta no site até **24 horas antes do início do evento**."
    },
    {
      titulo: "Cancelamento e Reembolso",
      keywords: ["cancelar", "reembolso", "devolucao", "desistir", "trocar", "dinheiro"],
      resposta: "O cancelamento pode ser solicitado em até **7 dias após a compra** (segundo o CDC), desde que seja feito pelo menos 48h antes da data do evento."
    },
    {
      titulo: "O que inclui o Passaporte VIP?",
      keywords: ["vip", "passaporte", "camarote", "backstage", "vantagens", "experiencia"],
      resposta: "A **Experiência VIP** inclui: Acesso antecipado ao show, lugar no Front Stage, Credencial VIP com cordão K/DA, kit de brindes exclusivos e acesso às mentorias."
    }
  ];

  let baseConhecimento = [...FAQ_PADRAO];

  // 3. FUNÇÃO DE INICIALIZAÇÃO
  window.initChatbot = function (opcoes = {}) {
    if (document.getElementById("faq-chatbot-widget")) return;

    // CAMINHO DAS DUAS FOTOS NA PASTA KdaFirestarter
    const poroAtendente = opcoes.atendenteUrl || "KdaFirestarter/poro-atendente.png";
    const poroCliente = opcoes.clienteUrl || "KdaFirestarter/poro-cliente.png";

    const htmlTemplate = `
      <button id="faq-toggle-btn" type="button" aria-label="Abrir Assistente Poro K/DA">
        <svg id="faq-icon-open" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
        </svg>
        <svg id="faq-icon-close" viewBox="0 0 24 24" style="display: none;">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>

      <div id="faq-chat-window" class="faq-hidden">
        <div class="faq-header">
          <div class="faq-header-title">
            <img class="faq-header-avatar" src="${poroAtendente}" alt="Poro Atendente" />
            <div class="faq-header-info">
              <h3>PORO <span>// K/DA AI</span></h3>
              <div class="faq-status-line">
                <span class="faq-status-dot"></span>
                <span>Suporte Oficial Online</span>
              </div>
            </div>
          </div>
          <div class="faq-header-actions">
            <label for="faq-json-file" class="faq-icon-btn" title="Carregar base JSON">
              <svg viewBox="0 0 24 24"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/></svg>
            </label>
            <input type="file" id="faq-json-file" accept=".json" style="display: none;" />
            <button type="button" id="faq-minimize-btn" class="faq-icon-btn" title="Minimizar">−</button>
            <button type="button" id="faq-close-btn" class="faq-icon-btn" title="Fechar">✕</button>
          </div>
        </div>
        <div id="faq-messages"></div>
        <div class="faq-footer">
          <div class="faq-input-area">
            <input type="text" id="faq-input" placeholder="Digite o número ou sua dúvida..." autocomplete="off" />
            <button type="button" id="faq-send-btn" aria-label="Enviar">
              <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </div>
        </div>
      </div>
    `;

    const styleTag = document.createElement("style");
    styleTag.textContent = cssStyles;
    document.head.appendChild(styleTag);

    const container = document.createElement("div");
    container.id = "faq-chatbot-widget";
    container.innerHTML = htmlTemplate;
    document.body.appendChild(container);

    const toggleBtn = document.getElementById("faq-toggle-btn");
    const closeBtn = document.getElementById("faq-close-btn");
    const minimizeBtn = document.getElementById("faq-minimize-btn");
    const chatWindow = document.getElementById("faq-chat-window");
    const iconOpen = document.getElementById("faq-icon-open");
    const iconClose = document.getElementById("faq-icon-close");
    const messagesBox = document.getElementById("faq-messages");
    const sendBtn = document.getElementById("faq-send-btn");
    const input = document.getElementById("faq-input");
    const jsonFileInput = document.getElementById("faq-json-file");

    function addMessage(texto, tipo) {
      const textoLimpo = removerEmojis(texto).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

      if (tipo === "bot") {
        const row = document.createElement("div");
        row.className = "faq-bot-row";

        const avatar = document.createElement("img");
        avatar.className = "faq-bot-avatar";
        avatar.src = poroAtendente;
        avatar.alt = "Atendente Poro";

        const div = document.createElement("div");
        div.className = "faq-msg bot";
        div.innerHTML = textoLimpo;

        row.appendChild(avatar);
        row.appendChild(div);
        messagesBox.appendChild(row);
      } else {
        const row = document.createElement("div");
        row.className = "faq-user-row";

        const div = document.createElement("div");
        div.className = "faq-msg user";
        div.innerHTML = textoLimpo;

        const avatar = document.createElement("img");
        avatar.className = "faq-user-avatar";
        avatar.src = poroCliente;
        avatar.alt = "Cliente Poro";

        row.appendChild(div);
        row.appendChild(avatar);
        messagesBox.appendChild(row);
      }

      messagesBox.scrollTop = messagesBox.scrollHeight;
    }

    function carregarMenuInicial() {
      messagesBox.innerHTML = "";
      addMessage("Oi! Eu sou o **Poro**, atendente da turnê K/DA Firestarter. Escolha um número abaixo ou digite sua dúvida:", "bot");

      const optsContainer = document.createElement("div");
      optsContainer.className = "faq-options";

      baseConhecimento.forEach((item, index) => {
        if (!item.titulo) return;
        const tituloSemEmoji = removerEmojis(item.titulo);
        const numero = index + 1;

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "faq-chip";
        btn.innerHTML = `<span class="faq-chip-num">${numero}</span><span>${tituloSemEmoji}</span>`;

        btn.addEventListener("click", () => {
          addMessage(`${numero}. ${tituloSemEmoji}`, "user");
          setTimeout(() => addMessage(item.resposta, "bot"), 200);
        });
        optsContainer.appendChild(btn);
      });

      messagesBox.appendChild(optsContainer);
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }

    function normalizarTexto(txt) {
      return removerEmojis(txt)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s]/gi, "");
    }

    function buscarResposta(textoUsuario) {
      const numeroDigitado = parseInt(textoUsuario.trim(), 10);
      if (!isNaN(numeroDigitado) && numeroDigitado >= 1 && numeroDigitado <= baseConhecimento.length) {
        return baseConhecimento[numeroDigitado - 1].resposta;
      }

      const queryNorm = normalizarTexto(textoUsuario);
      const palavrasUsuario = queryNorm.split(/\s+/).filter(w => w.length > 2);

      let melhorMatch = null;
      let maiorPontuacao = 0;

      baseConhecimento.forEach(item => {
        let pontos = 0;
        const pergunta = normalizarTexto(item.titulo || item.pergunta || "");
        const resposta = normalizarTexto(item.resposta || "");

        if (pergunta.includes(queryNorm)) pontos += 10;

        palavrasUsuario.forEach(palavra => {
          if (pergunta.includes(palavra)) pontos += 3;
          if (resposta.includes(palavra)) pontos += 1;
          if (item.keywords && Array.isArray(item.keywords)) {
            item.keywords.forEach(kw => {
              if (normalizarTexto(kw).includes(palavra)) pontos += 4;
            });
          }
        });

        if (pontos > maiorPontuacao) {
          maiorPontuacao = pontos;
          melhorMatch = item;
        }
      });

      if (melhorMatch && maiorPontuacao >= 3) {
        return melhorMatch.resposta;
      }
      return "Não encontrei essa informação por aqui. Tente digitar o número de uma das perguntas acima ou pergunte sobre idade, comida, bilheteria ou ingressos!";
    }

    function dispararEnvio() {
      const txt = input.value.trim();
      if (!txt) return;

      addMessage(txt, "user");
      input.value = "";

      setTimeout(() => {
        addMessage(buscarResposta(txt), "bot");
      }, 280);
    }

    function fecharJanela(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      chatWindow.classList.add("faq-hidden");
      iconOpen.style.display = "block";
      iconClose.style.display = "none";
    }

    function abrirJanela(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      chatWindow.classList.remove("faq-hidden");
      iconOpen.style.display = "none";
      iconClose.style.display = "block";
      input.focus();
    }

    function toggleChat(e) {
      if (chatWindow.classList.contains("faq-hidden")) {
        abrirJanela(e);
      } else {
        fecharJanela(e);
      }
    }

    if (opcoes.jsonUrl) {
      fetch(opcoes.jsonUrl)
        .then(res => res.json())
        .then(dados => {
          if (Array.isArray(dados)) {
            baseConhecimento = [...dados];
            carregarMenuInicial();
          }
        })
        .catch(err => console.error("Erro ao carregar JSON:", err));
    }

    jsonFileInput.addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (evt) {
        try {
          const json = JSON.parse(evt.target.result);
          if (Array.isArray(json)) {
            baseConhecimento = [...json];
            carregarMenuInicial();
          }
        } catch (err) {
          alert("Arquivo JSON inválido.");
        }
      };
      reader.readAsText(file);
    });

    toggleBtn.addEventListener("click", toggleChat);
    closeBtn.addEventListener("click", fecharJanela);
    minimizeBtn.addEventListener("click", fecharJanela);
    sendBtn.addEventListener("click", dispararEnvio);

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        dispararEnvio();
      }
    });

    carregarMenuInicial();
  };
})();
