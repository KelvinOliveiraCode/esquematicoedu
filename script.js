/* =========================================================
   EsquemáticoEdu
   Interações: menu, abas, relógio da aula e entrada de seção.
   ========================================================= */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Cabeçalho ---------- */

  var header = document.querySelector(".site-header");

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 6);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menu do celular ---------- */

  var menuButton = document.getElementById("menu-button");
  var menuPanel = document.getElementById("menu-mobile");

  function closeMenu(returnFocus) {
    if (!menuPanel || !menuButton) return;
    menuPanel.hidden = true;
    menuButton.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    if (returnFocus) menuButton.focus();
  }

  function openMenu() {
    if (!menuPanel || !menuButton) return;
    menuPanel.hidden = false;
    menuButton.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    var first = menuPanel.querySelector("a");
    if (first) first.focus();
  }

  if (menuButton && menuPanel) {
    menuButton.addEventListener("click", function () {
      if (menuButton.getAttribute("aria-expanded") === "true") {
        closeMenu(false);
      } else {
        openMenu();
      }
    });

    menuPanel.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
        closeMenu(true);
      }
    });

    document.addEventListener("click", function (event) {
      if (menuButton.getAttribute("aria-expanded") !== "true") return;
      if (menuPanel.contains(event.target) || menuButton.contains(event.target)) return;
      closeMenu(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 980 && menuButton.getAttribute("aria-expanded") === "true") {
        closeMenu(false);
      }
    });
  }

  /* ---------- Abas genéricas ---------- */

  function setupTabs(tabSelector, panelSelector) {
    var tabs = Array.prototype.slice.call(document.querySelectorAll(tabSelector));
    var panels = Array.prototype.slice.call(document.querySelectorAll(panelSelector));
    if (!tabs.length) return;

    function select(tab, moveFocus) {
      tabs.forEach(function (item) {
        var isCurrent = item === tab;
        item.setAttribute("aria-selected", isCurrent ? "true" : "false");
        item.tabIndex = isCurrent ? 0 : -1;
      });

      panels.forEach(function (panel) {
        var isCurrent = panel.id === tab.getAttribute("aria-controls");
        panel.hidden = !isCurrent;
        if (isCurrent) {
          panel.removeAttribute("aria-hidden");
        } else {
          panel.setAttribute("aria-hidden", "true");
        }
      });

      if (moveFocus) tab.focus();
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        select(tab, false);
      });

      tab.addEventListener("keydown", function (event) {
        var next = null;
        var key = event.key;

        if (key === "ArrowDown" || key === "ArrowRight") next = tabs[(index + 1) % tabs.length];
        else if (key === "ArrowUp" || key === "ArrowLeft") next = tabs[(index - 1 + tabs.length) % tabs.length];
        else if (key === "Home") next = tabs[0];
        else if (key === "End") next = tabs[tabs.length - 1];

        if (next) {
          event.preventDefault();
          select(next, true);
        }
      });
    });
  }

  setupTabs(".track-tab", ".track-panel");
  setupTabs(".map-node", ".fig-panel");

  /* ---------- Relógio da aula ---------- */

  var phases = [
    {
      name: "Abertura",
      start: 0,
      end: 3,
      range: "00:00 a 03:00",
      desc: "O que a aula cobre, por que o tema importa e como ele costuma ser cobrado nas provas.",
      pdf: "No material em breve: a abertura fica de fora do PDF."
    },
    {
      name: "Conteúdo",
      start: 3,
      end: 40,
      range: "03:00 a 40:00",
      desc: "De 4 a 5 blocos de 8 a 10 minutos. Cada bloco traz conceito, exemplo e um mini exercício.",
      pdf: "No material em breve: vira resumo esquematizado, com o mesmo desenho do vídeo."
    },
    {
      name: "Exercícios",
      start: 40,
      end: 55,
      range: "40:00 a 55:00",
      desc: "Questões de provas reais, com ano e fonte, resolvidas passo a passo, e o porquê de cada etapa.",
      pdf: "No material em breve: lista de exercícios com resolução comentada."
    },
    {
      name: "Resumo",
      start: 55,
      end: 60,
      range: "55:00 a 60:00",
      desc: "O assunto inteiro em um esquema, com as conexões entre os conceitos e a chamada para o material de revisão.",
      pdf: "No material em breve: a página final de revisão, pronta para imprimir."
    }
  ];

  var clockInput = document.getElementById("clock-input");
  var clockMarker = document.getElementById("clock-marker");
  var clockTime = document.getElementById("clock-time");
  var phaseTitle = document.getElementById("phase-title");
  var phaseRange = document.getElementById("phase-range");
  var phaseDesc = document.getElementById("phase-desc");
  var phasePdf = document.querySelector(".phase-pdf");
  var segments = Array.prototype.slice.call(document.querySelectorAll(".seg"));
  var legendButtons = Array.prototype.slice.call(document.querySelectorAll(".legend-btn"));

  function phaseFor(minute) {
    for (var i = 0; i < phases.length; i += 1) {
      if (minute >= phases[i].start && minute < phases[i].end) return { phase: phases[i], index: i };
    }
    return { phase: phases[phases.length - 1], index: phases.length - 1 };
  }

  function updateClock(minute, fromInput) {
    var result = phaseFor(minute);
    var phase = result.phase;
    var index = result.index;
    var position = (minute / 60) * 100;

    if (clockInput && !fromInput) clockInput.value = String(minute);
    if (clockMarker) clockMarker.style.left = position + "%";
    if (clockTime) clockTime.textContent = minute >= 60 ? "60 min, fim" : minute + " min de 60";

    if (phaseTitle) phaseTitle.textContent = phase.name;
    if (phaseRange) phaseRange.textContent = phase.range;
    if (phaseDesc) phaseDesc.textContent = phase.desc;
    if (phasePdf) phasePdf.innerHTML = phase.pdf.replace("em breve", "<strong>em breve</strong>");

    segments.forEach(function (segment, segmentIndex) {
      segment.classList.toggle("is-on", segmentIndex === index);
    });

    legendButtons.forEach(function (button, buttonIndex) {
      button.classList.toggle("is-on", buttonIndex === index);
    });

    if (clockInput) {
      clockInput.setAttribute("aria-valuetext", "Minuto " + minute + " de 60: " + phase.name);
    }
  }

  if (clockInput) {
    clockInput.addEventListener("input", function () {
      updateClock(Number(clockInput.value), true);
    });

    legendButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        updateClock(Number(button.dataset.minute), false);
      });
    });

    updateClock(Number(clockInput.value), true);
  }

  /* ---------- Seção atual ---------- */

  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav a"));
  var watchedSections = ["canal", "trilhas", "aula", "materiais", "perguntas"]
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);

  var currentId = null;
  var sectionTops = [];

  function setCurrentSection(id) {
    if (id === currentId) return;
    currentId = id;

    navLinks.forEach(function (link) {
      var isCurrent = link.getAttribute("href") === "#" + id;
      link.classList.toggle("is-active", isCurrent);
      if (isCurrent) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    watchedSections.forEach(function (section) {
      section.classList.toggle("is-current", section.id === id);
    });
  }

  function measureSections() {
    sectionTops = watchedSections.map(function (section) {
      return { id: section.id, top: section.getBoundingClientRect().top + window.scrollY };
    });
  }

  function updateCurrentSection() {
    if (!watchedSections.length) return;

    var line = window.scrollY + Math.max(150, window.innerHeight * 0.32);
    var active = "";

    sectionTops.forEach(function (item) {
      if (item.top <= line) active = item.id;
    });

    var doc = document.documentElement;
    if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
      active = watchedSections[watchedSections.length - 1].id;
    }

    setCurrentSection(active);
  }

  var scrollQueued = false;

  function onSectionScroll() {
    if (scrollQueued) return;
    scrollQueued = true;
    window.requestAnimationFrame(function () {
      scrollQueued = false;
      updateCurrentSection();
    });
  }

  measureSections();
  updateCurrentSection();
  window.addEventListener("scroll", onSectionScroll, { passive: true });
  window.addEventListener("resize", function () {
    measureSections();
    updateCurrentSection();
  });
  window.addEventListener("load", measureSections);

  /* ---------- Entrada de seção ---------- */

  var revealItems = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if ("IntersectionObserver" in window && !reduceMotion.matches) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-in");
    });
  }
})();
