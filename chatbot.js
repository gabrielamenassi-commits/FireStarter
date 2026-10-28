/**
 * Chatbot Widget Auto-Injetável — Versão K/DA FIRESTARTER ERA (Dúvidas de Ingressos e Evento)
 */
(function () {
  if (window.chatbotInicializado) return;
  window.chatbotInicializado = true;

  // 1. ESTILOS CSS ADAPTADOS À PALETA K/DA (CIANO NEON & CROMO)
  const cssStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Audiowide&family=Rajdhani:wght@400;600;700&display=swap');

    #faq-chatbot-widget {
      font-family: 'Rajdhani', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      position: fixed !important;
      bottom: 25px !important;
      right: 25px !important;
      z-index: 99999999 !important;
    }

    #faq-toggle-btn {
      width: 62px !important;
      height: 62px !important;
      border-radius: 50% !important;
      background: linear-gradient(135deg, #e2e8f0, #00f0ff) !important;
      color: #08030c !important;
      border: 2px solid #00f0ff !important;
      box-shadow: 0 0 20px rgba(0, 240, 255, 0.5) !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      outline: none !important;
      transition: transform 0.3s ease, box-shadow 0.3s ease !important;
    }

    #faq-toggle-btn:hover {
      transform: scale(1.08) !important;
      box-shadow: 0 0 30px rgba(0, 240, 255, 0.9) !important;
    }

    #faq-toggle-btn svg {
      width: 28px !important;
      height: 28px !important;
      fill: #08030c !important;
      pointer-events: none !important;
    }

    #faq-chat-window {
      position: fixed !important;
      bottom: 98px !important;
      right: 25px !important;
      width: 380px !important;
      max-width: calc(100vw - 40px) !important;
      height: 520px !important;
      max-height: calc(100vh - 120px) !important;
      background-color: rgba(19, 4, 26, 0.95) !important;
      backdrop-filter: blur(12px) !important;
      -webkit-backdrop-filter: blur(12px) !important;
      border-radius: 12px !important;
      border: 1px solid #00f0ff !important;
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.85), 0 0 20px rgba(0, 240, 255, 0.25) !important;
      display: flex !important;
      flex-direction: column !important;
      overflow: hidden !important;
      z-index: 99999999 !important;
    }

    #faq-chat-window.faq-hidden {
      display: none !important;
    }

    .faq-header {
      background: linear-gradient(135deg, rgba(255, 0, 60, 0.3), rgba(0, 240, 255, 0.3)) !important;
      color: #ffffff !important;
      padding: 12px 16px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      border-bottom: 1px solid #2b0c36 !important;
    }

    .faq-header-actions {
      display: flex !important;
      align-items: center !important;
      gap: 8px !important;
    }

    .faq-header h3 {
      margin: 0 !important;
      font-family: 'Audiowide', cursive !important;
      font-size: 13px !important;
      letter-spacing: 1.5px !important;
      color: #00f0ff !important;
      text-transform: uppercase !important;
      white-space: nowrap !important;
    }

    .faq-icon-btn {
      background: transparent !important;
      border: none !important;
      color: #ffffff !important;
      font-size: 18px !important;
      font-weight: bold !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 4px 8px !important;
      border-radius: 4px !important;
      opacity: 0.85;
      line-height: 1 !important;
    }

    .faq-icon-btn:hover {
      opacity: 1;
      color: #00f0ff !important;
      background-color: rgba(0, 240, 255, 0.1) !important;
    }

    #faq-messages {
      flex: 1 !important;
      padding: 16px !important;
      overflow-y: auto !important;
      background-color: #08030c !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 12px !important;

      scrollbar-width: thin !important;
      scrollbar-color: #2b0c36 #08030c !important;
    }

    #faq-messages::-webkit-scrollbar {
      width: 8px !important;
    }

    #faq-messages::-webkit-scrollbar-track {
      background: #08030c !important;
    }

    #faq-messages::-webkit-scrollbar-thumb {
      background-color: #2b0c36 !important;
      border-radius: 4px !important;
      border: 1px solid #00f0ff !important;
    }

    #faq-messages::-webkit-scrollbar-thumb:hover {
      background-color: #00f0ff !important;
    }

    .faq-msg {
      max-width: 85% !important;
      padding: 11px 14px !important;
      border-radius: 8px !important;
      font-size: 14px !important;
      line-height: 1.5 !important;
      white-space: pre-line !important;
      font-family: 'Rajdhani', sans-serif !important;
    }

    .faq-msg.bot {
      align-self: flex-start !important;
      background-color: rgba(43, 12, 54, 0.7) !important;
      color: #f5edf8 !important;
      border: 1px solid #2b0c36 !important;
      border-left: 3px solid #00f0ff !important;
    }

    .faq-msg.user {
      align-self: flex-end !important;
      background: linear-gradient(135deg, rgba(255, 0, 60, 0.4), rgba(102, 0, 34, 0.6)) !important;
      border: 1px solid #ff003c !important;
      color: #ffffff !important;
      font-weight: 500 !important;
      border-radius: 8px !important;
    }

    .faq-msg.system-info {
      align-self: center !important;
      background-color: rgba(0, 240, 255, 0.15) !important;
      color: #00f0ff !important;
      font-size: 12px !important;
      border: 1px solid rgba(0, 240, 255, 0.3) !important;
      border-radius: 6px !important;
      padding: 6px 12px !important;
      text-align: center !important;
    }

    .faq-options {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 8px !important;
      margin-top: 6px !important;
    }

    .faq-chip {
      background-color: #13041a !important;
      color: #00f0ff !important;
      border: 1px solid #2b0c36 !important;
      padding: 8px 12px !important;
      border-radius: 6px !important;
      font-size: 12px !important;
      font-family: 'Rajdhani', sans-serif !important;
      font-weight: 600 !important;
      letter-spacing: 1px !important;
      cursor: pointer !important;
      transition: all 0.2s ease !important;
    }

    .faq-chip:hover {
      background-color: #00f0ff !important;
      color: #08030c !important;
      border-color: #00f0ff !important;
      box-shadow: 0 0 10px rgba(0, 240, 255, 0.5) !important;
    }

    .faq-footer {
      padding: 12px !important;
      background-color: #0d0514 !important;
      border-top: 1px solid #2b0c36 !important;
    }

    .faq-input-area {
      display: flex !important;
      gap: 8px !important;
      margin: 0 !important;
    }

    #faq-input {
      flex: 1 !important;
      padding: 10px 14px !important;
      background-color: #08030c !important;
      border: 1px solid #2b0c36 !important;
      border-radius: 6px !important;
      color: #f5edf8 !important;
      font-family: 'Rajdhani', sans-serif !important;
      font-size: 14px !important;
      outline: none !important;
    }

    #faq-input:focus {
      border-color: #00f0ff !important;
      box-shadow: 0 0 8px rgba(0, 240, 255, 0.3) !important;
    }

    #faq-send-btn {
      background: linear-gradient(135deg, #e2e8f0, #00f0ff) !important;
      color: #08030c !important;
      border: none !important;
      width: 40px !important;
      height: 40px !important;
      border-radius: 6px !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      transition: transform 0.2s ease, box-shadow 0.2s ease !important;
    }

    #faq-send-btn:hover {
      transform: scale(1.05) !important;
      box-shadow: 0 0 12px rgba(0, 240, 255, 0.6) !important;
    }

    #faq-send-btn svg {
      width: 18px !important;
      height: 18px !important;
      fill: #08030c !important;
    }
  `;

  // 2. ESTRUTURA HTML
  const htmlTemplate = `
    <button id="faq-toggle-btn" type="button" aria-label="Abrir Chatbot K/DA">
      <svg id="faq-icon-open" viewBox="0 0 24 24">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
      </svg>
      <svg id="faq-icon-close" viewBox="0 0 24 24" style="display: none;">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    </button>

    <div id="faq-chat-window" class="faq-hidden">
      <div class="faq-header">
        <h3>K/DA // ASSISTENTE AI</h3>
        <div class="faq-header-actions">
          <label for="faq-json-file" class="faq-icon-btn" title="Anexar base JSON extra">📁</label>
          <input type="file" id="faq-json-file" accept=".json" style="display: none;" />
          <button type="button" id="faq-minimize-btn" class="faq-icon-btn" title="Minimizar chat">−</button>
          <button type="button" id="faq-close-btn" class="faq-icon-btn" title="Fechar chat">✕</button>
        </div>
      </div>
      <div id="faq-messages"></div>
      <div class="faq-footer">
        <div class="faq-input-area">
          <input type="text" id="faq-input" placeholder="Tire suas dúvidas sobre ingressos..." autocomplete="off" />
          <button type="button" id="faq-send-btn" aria-label="Enviar">
            <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </div>
      </div>
    </div>
  `;

  // 3. BASE DE DADOS PADRÃO
  const FAQ_PADRAO = [
    {
      titulo: "🔞 Classificação Etária",
      keywords: ["idade", "menor", "classificacao", "anos", "pais", "acompanhado", "crianca"],
      resposta: "A classificação etária é **18 anos**. Menores de 18 anos podem entrar acompanhados de pai, mãe ou responsável legal munido de autorização por escrito."
    },
    {
      titulo: "🎟️ Posso comprar na hora?",
      keywords: ["hora", "na hora", "bilheteria", "comprar la", "local", "ingresso la", "fisica"],
      resposta: "Haverá bilheteria no local **apenas se restarem ingressos**. Como a procura é alta, recomendamos garantir a sua credencial antecedida pelo site para não ficar de fora!"
    },
    {
      titulo: "🍕 Posso levar comida e bebida?",
      keywords: ["comida", "bebida", "alimento", "garrafa", "entrar com comida", "lanche", "agua"],
      resposta: "É permitida a entrada de **água em garrafa plástica transparente (sem tampa)** e **alimentos industrializados lacrados** (ex: barras de cereal, biscoitos)."
    },
    {
      titulo: "📱 Como recebo o meu ingresso?",
      keywords: ["receber", "ingresso", "qr", "qrcode", "pdf", "email", "voucher", "e-ticket", "mostrar"],
      resposta: "Assim que o pagamento for aprovado, o seu **QR Code / E-Ticket** é enviado para o seu e-mail cadastrado. No dia do evento, basta apresentar a tela do celular na entrada."
    },
    {
      titulo: "👥 Posso passar para outra pessoa?",
      keywords: ["transferir", "passar", "outra pessoa", "amigo", "nome", "titularidade", "trocar nome"],
      resposta: "Sim! Você pode alterar o nome do titular do ingresso diretamente pela sua conta no site até **24 horas antes do início do evento**."
    },
    {
      titulo: "🔄 Cancelamento e Reembolso",
      keywords: ["cancelar", "reembolso", "devolucao", "desistir", "trocar", "dinheiro"],
      resposta: "O cancelamento pode ser solicitado em até **7 dias após a compra** (segundo o CDC), desde que seja feito pelo menos 48h antes da data do evento."
    },
    {
      titulo: "👑 O que inclui o Passaporte VIP?",
      keywords: ["vip", "passaporte", "camarote", "backstage", "vantagens", "experiencia"],
      resposta: "A **Experiência VIP** inclui: Acesso antecipado ao show, lugar no Front Stage, Credencial VIP com cordão K/DA, kit de brindes exclusivos e acesso às mentorias."
    }
  ];

  let baseConhecimento = [...FAQ_PADRAO];

  // 4. FUNÇÃO DE INICIALIZAÇÃO
  window.initChatbot = function (opcoes = {}) {
    if (document.getElementById("faq-chatbot-widget")) return;

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
      const div = document.createElement("div");
      div.className = `faq-msg ${tipo}`;
      div.innerHTML = texto.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      messagesBox.appendChild(div);
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }

    function carregarMenuInicial() {
      messagesBox.innerHTML = "";
      addMessage("Olá! 👋 Bem-vindo ao **K/DA Support**. Como posso te ajudar hoje?", "bot");

      const optsContainer = document.createElement("div");
      optsContainer.className = "faq-options";

      baseConhecimento.forEach(item => {
        if (!item.titulo) return;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "faq-chip";
        btn.innerText = item.titulo;
        btn.addEventListener("click", () => {
          addMessage(item.titulo, "user");
          setTimeout(() => addMessage(item.resposta, "bot"), 200);
        });
        optsContainer.appendChild(btn);
      });

      messagesBox.appendChild(optsContainer);
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }

    function normalizarTexto(txt) {
      return txt.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/gi, "");
    }

    function buscarResposta(textoUsuario) {
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
      return "Não encontrei essa informação na minha base. 😅 Tente selecionar uma das opções no menu acima ou pergunte sobre idade, comida, bilheteria ou ingressos!";
    }

    function dispararEnvio() {
      const txt = input.value.trim();
      if (!txt) return;

      addMessage(txt, "user");
      input.value = "";

      setTimeout(() => {
        addMessage(buscarResposta(txt), "bot");
      }, 300);
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
            addMessage(`📂 Base K/DA carregada (${dados.length} tópicos)`, "system-info");
          }
        })
        .catch(err => console.error("Erro ao carregar JSON:", err));
    }

    jsonFileInput.addEventListener("change", function(e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(evt) {
        try {
          const json = JSON.parse(evt.target.result);
          if (Array.isArray(json)) {
            baseConhecimento = [...json];
            carregarMenuInicial();
            addMessage(`📂 Nova base carregada (${json.length} itens)`, "system-info");
          }
        } catch (err) {
          alert("Ficheiro JSON inválido.");
        }
      };
      reader.readAsText(file);
    });

    toggleBtn.addEventListener("click", toggleChat);
    closeBtn.addEventListener("click", fecharJanela);
    minimizeBtn.addEventListener("click", fecharJanela);
    sendBtn.addEventListener("click", dispararEnvio);

    input.addEventListener("keydown", function(e) {
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        dispararEnvio();
      }
    });

    carregarMenuInicial();
  };
})();