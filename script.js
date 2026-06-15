const header = document.getElementById("header");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const contactForm = document.getElementById("contactForm");
const newsletterForm = document.getElementById("newsletterForm");
const cursorGlow = document.querySelector(".cursor-glow");
const carouselTrack = document.getElementById("carouselTrack");
const carousel = document.querySelector(".carousel");

// Carrossel infinito — duplica os cards para loop contínuo
if (carouselTrack) {
  const cards = [...carouselTrack.children];
  cards.forEach((card) => {
    carouselTrack.appendChild(card.cloneNode(true));
  });
}

if (carousel) {
  carousel.addEventListener("mouseenter", () => carousel.classList.add("is-paused"));
  carousel.addEventListener("mouseleave", () => carousel.classList.remove("is-paused"));
  carousel.addEventListener("touchstart", () => carousel.classList.add("is-paused"), { passive: true });
  carousel.addEventListener("touchend", () => {
    setTimeout(() => carousel.classList.remove("is-paused"), 2000);
  });
}

// Header scroll effect
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 60);
});

// Mobile navigation
navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.classList.toggle("active");
  navToggle.setAttribute("aria-expanded", isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  });
});

// Scroll reveal
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const siblings = [...entry.target.parentElement.querySelectorAll(".reveal")];
        const index = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 0.1}s`;
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);

revealElements.forEach((el) => revealObserver.observe(el));

// Animated counters
const statNumbers = document.querySelectorAll(".stat-number");
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const duration = 2000;
      const start = performance.now();

      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(animate);
        else el.textContent = target;
      };

      requestAnimationFrame(animate);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);

statNumbers.forEach((el) => counterObserver.observe(el));

// Cursor glow (desktop only)
if (window.matchMedia("(pointer: fine)").matches && cursorGlow) {
  document.addEventListener("mousemove", (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });
}

// Form handling
function showToast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: #c9a962;
    color: #0a0a0a;
    padding: 1rem 2rem;
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.4s, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(20px)";
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  showToast("Obrigado — entraremos em contato em breve.");
  contactForm.reset();
});

newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  showToast("Bem-vinda à lista exclusiva da ÉLITE.");
  newsletterForm.reset();
});

// ── Widget WhatsApp + FAQ ───────────────────────────────────
const WA_PHONE = "551140028922";

const waFaq = [
  {
    id: "ser-modelo",
    label: "Quero ser modelo",
    answer:
      "Para entrar no casting da ÉLITE, envie fotos naturais (rosto e corpo inteiro), nome completo, idade, altura, cidade e contato. Nosso time de scouting analisa todos os perfis em até 15 dias úteis. Não é necessário experiência prévia — buscamos potencial e personalidade.",
  },
  {
    id: "requisitos",
    label: "Requisitos",
    answer:
      "Não temos um padrão único de beleza. Para passarela feminina, geralmente buscamos altura a partir de 1,75 m; masculina, a partir de 1,85 m. Para comercial e beleza, os requisitos são mais flexíveis. O mais importante é atitude, presença e disponibilidade para desenvolvimento.",
  },
  {
    id: "custo",
    label: "A agência cobra?",
    answer:
      "A ÉLITE não cobra taxa de adesão, curso obrigatório ou book para representar modelos. Nosso modelo é comissionado: recebemos uma porcentagem apenas dos trabalhos efetivamente realizados. Desconfie de agências que pedem pagamento antecipado.",
  },
  {
    id: "contratar",
    label: "Contratar modelos",
    answer:
      "Marcas e produtoras podem solicitar modelos para campanhas, editoriais, desfiles e eventos. Informe data, local, tipo de job, quantidade de modelos e referências visuais. Nossa equipe de bookings responde em até 24 horas úteis com opções e orçamento.",
  },
  {
    id: "valores",
    label: "Valores e cachê",
    answer:
      "O cachê varia conforme o tipo de trabalho, tempo de uso da imagem, exclusividade e perfil da modelo. Jobs editoriais, campanhas nacionais e contratos de embassadoria têm faixas diferentes. Solicite um orçamento personalizado pelo WhatsApp com os detalhes do seu projeto.",
  },
  {
    id: "casting",
    label: "Como funciona o casting?",
    answer:
      "Realizamos castings presenciais em SP e RJ e também aceitamos inscrições online. Se selecionada, você será convidada para um encontro de avaliação com nosso booker. Lá apresentamos a agência, alinhamos expectativas e, em caso de match, iniciamos o contrato de representação.",
  },
  {
    id: "book",
    label: "Preciso de book?",
    answer:
      "Para a primeira análise, fotos simples feitas com celular em boa luz são suficientes. Se aprovada, orientamos sobre book profissional e testes com fotógrafos parceiros. A agência pode indicar profissionais, mas a contratação é decisão da modelo.",
  },
  {
    id: "horario",
    label: "Horário de atendimento",
    answer:
      "Atendimento de segunda a sexta, das 9h às 18h (horário de Brasília). Mensagens enviadas fora do expediente são respondidas no próximo dia útil. Para urgências de produção e bookings, temos plantão para clientes cadastrados.",
  },
  {
    id: "cidades",
    label: "Atendem outras cidades?",
    answer:
      "Sim! Temos escritórios em São Paulo e Rio de Janeiro, mas representamos modelos de todo o Brasil e atendemos clientes internacionais. Castings online estão disponíveis para candidatas de qualquer região do país.",
  },
  {
    id: "material",
    label: "Como envio meu material?",
    answer:
      "Você pode enviar pelo formulário do site, por e-mail (bookings@elite-models.com) ou pelo WhatsApp. Anexe até 6 fotos em boa resolução e inclua medidas atualizadas (altura, busto, cintura, quadril, manequim e calçado). Vídeos curtos de passarela são um diferencial.",
  },
];

const waWidget = document.getElementById("waWidget");
const waFab = document.getElementById("waFab");
const waChat = document.getElementById("waChat");
const waChatClose = document.getElementById("waChatClose");
const waChatBody = document.getElementById("waChatBody");
const waChatOptions = document.getElementById("waChatOptions");
const waDirectBtn = document.getElementById("waDirectBtn");
const waWelcomeTime = document.getElementById("waWelcomeTime");

function formatWaTime(date = new Date()) {
  return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

if (waWelcomeTime) {
  waWelcomeTime.textContent = formatWaTime();
}

function scrollWaChat() {
  requestAnimationFrame(() => {
    waChatBody.scrollTop = waChatBody.scrollHeight;
  });
}

function addWaMessage(text, type = "in") {
  const msg = document.createElement("div");
  msg.className = `wa-msg wa-msg--${type}`;
  msg.innerHTML = text;
  waChatBody.appendChild(msg);

  const time = document.createElement("div");
  time.className = "wa-msg wa-msg--time";
  time.innerHTML = `<span>${formatWaTime()}</span>`;
  waChatBody.appendChild(time);

  scrollWaChat();
}

function renderWaOptions(showBack = false) {
  waChatOptions.innerHTML = "";

  if (showBack) {
    const backBtn = document.createElement("button");
    backBtn.type = "button";
    backBtn.className = "wa-option-btn wa-option-btn--back";
    backBtn.textContent = "← Outras dúvidas";
    backBtn.addEventListener("click", () => {
      addWaMessage("← Outras dúvidas", "out");
      renderWaOptions(false);
      addWaMessage("Sem problemas! Escolha outro assunto abaixo:", "in");
    });
    waChatOptions.appendChild(backBtn);
  }

  waFaq.forEach((item) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "wa-option-btn";
    btn.textContent = item.label;
    btn.addEventListener("click", () => handleWaQuestion(item));
    waChatOptions.appendChild(btn);
  });
}

function handleWaQuestion(item) {
  addWaMessage(item.label, "out");
  setTimeout(() => {
    addWaMessage(`<p>${item.answer}</p>`, "in");
    setTimeout(() => {
      addWaMessage(
        "<p>Ainda ficou alguma dúvida? Toque em <strong>Falar com atendente</strong> abaixo ou escolha outro assunto.</p>",
        "in"
      );
      renderWaOptions(true);
    }, 400);
  }, 500);
}

function openWaChat() {
  waWidget.classList.add("is-open");
  waFab.setAttribute("aria-expanded", "true");
  waChat.setAttribute("aria-hidden", "false");
  if (!waChatOptions.hasChildNodes()) renderWaOptions(false);
}

function closeWaChat() {
  waWidget.classList.remove("is-open");
  waFab.setAttribute("aria-expanded", "false");
  waChat.setAttribute("aria-hidden", "true");
}

function openWhatsApp(message) {
  const text = encodeURIComponent(message);
  window.open(`https://wa.me/${WA_PHONE}?text=${text}`, "_blank", "noopener,noreferrer");
}

waFab.addEventListener("click", () => {
  waWidget.classList.contains("is-open") ? closeWaChat() : openWaChat();
});

waChatClose.addEventListener("click", closeWaChat);

waDirectBtn.addEventListener("click", () => {
  openWhatsApp(
    "Olá! Visitei o site da ÉLITE e gostaria de falar com a equipe de atendimento. Podem me ajudar?"
  );
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && waWidget.classList.contains("is-open")) closeWaChat();
});
