/* MCD.dev — kaynak script (dist/app.min.js uretilir) */
(() => {
  "use strict";

  const doc = document;
  const root = doc.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  root.classList.add("js");

  /* --- Mobil menu --- */
  const menuButton = doc.querySelector("#menu-button");
  const mobileMenu = doc.querySelector("#mobile-menu");

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      mobileMenu.classList.toggle("hidden");
    });

    doc.querySelectorAll(".mobile-link").forEach((link) => {
      link.addEventListener("click", () => {
        menuButton.setAttribute("aria-expanded", "false");
        mobileMenu.classList.add("hidden");
      });
    });
  }

  /* --- Scroll reveal --- */
  const revealEls = [...doc.querySelectorAll("[data-reveal]")];

  if (revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach((el, i) => {
      el.style.setProperty("--reveal-delay", `${Math.min(i % 4, 3) * 70}ms`);
      io.observe(el);
    });
  }

  /* --- Yazi scramble efekti --- */
  const GLYPHS = "!<>-_\\/[]{}—=+*^?#$%&";

  const scramble = (el) => {
    const original = el.dataset.text || el.textContent;
    el.dataset.text = original;
    if (reduceMotion || el.dataset.busy) return;
    el.dataset.busy = "1";

    let frame = 0;
    const total = original.length * 3 + 8;

    const tick = () => {
      let out = "";
      for (let i = 0; i < original.length; i++) {
        const ch = original[i];
        if (ch === " " || frame / 3 > i) out += ch;
        else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      el.textContent = out;
      frame++;
      if (frame <= total) requestAnimationFrame(tick);
      else {
        el.textContent = original;
        delete el.dataset.busy;
      }
    };

    requestAnimationFrame(tick);
  };

  doc.querySelectorAll("[data-scramble]").forEach((el) => {
    scramble(el);
    el.addEventListener("pointerenter", () => scramble(el));
  });

  /* --- Hero durum mesaji rotasyonu --- */
  const statusEl = doc.querySelector("#hero-status");
  const STATUSES = [
    "online, muhtemelen kod yaziyor",
    "bug ile pazarlik yapiyor",
    "kahve molasinda (kisa surer)",
    "commit mesaji dusunuyor",
    "dark mode'da felsefe yapiyor",
  ];

  if (statusEl && !reduceMotion) {
    let si = 0;
    setInterval(() => {
      si = (si + 1) % STATUSES.length;
      statusEl.style.opacity = "0";
      setTimeout(() => {
        statusEl.textContent = STATUSES[si];
        statusEl.style.opacity = "1";
      }, 260);
    }, 3600);
    statusEl.style.transition = "opacity .26s ease";
  }

  /* --- Sivi imlec --- */
  if (finePointer && !reduceMotion) {
    const blob = doc.createElement("div");
    blob.id = "cursor-blob";
    const dot = doc.createElement("div");
    dot.id = "cursor-dot";
    doc.body.append(blob, dot);

    let mx = innerWidth / 2;
    let my = innerHeight / 2;
    let bx = mx;
    let by = my;

    addEventListener("pointermove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      doc.body.classList.add("has-cursor");
      dot.style.transform = `translate(${mx}px, ${my}px)`;
    });

    addEventListener("pointerleave", () => doc.body.classList.remove("has-cursor"));

    const follow = () => {
      bx += (mx - bx) * 0.08;
      by += (my - by) * 0.08;
      blob.style.transform = `translate(${bx}px, ${by}px)`;
      requestAnimationFrame(follow);
    };
    follow();
  }

  /* --- 3D tilt + glare --- */
  if (finePointer && !reduceMotion) {
    doc.querySelectorAll("[data-tilt]").forEach((card) => {
      const glare = doc.createElement("span");
      glare.className = "glare";
      card.append(glare);

      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 10}deg) rotateY(${(px - 0.5) * 12}deg) translateY(-4px)`;
        card.style.setProperty("--gx", `${px * 100}%`);
        card.style.setProperty("--gy", `${py * 100}%`);
      });

      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* --- Manyetik butonlar --- */
  if (finePointer && !reduceMotion) {
    doc.querySelectorAll("[data-magnetic]").forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        btn.style.transform = `translate(${dx * 0.22}px, ${dy * 0.3}px)`;
      });
      btn.addEventListener("pointerleave", () => {
        btn.style.transform = "";
      });
    });
  }

  /* --- Emoji konfeti --- */
  const EMOJI = ["✨", "💜", "🚀", "🎮", "☕", "🧃", "💾", "🌙"];

  const burst = (x, y, count = 14) => {
    if (reduceMotion) return;
    for (let i = 0; i < count; i++) {
      const bit = doc.createElement("span");
      bit.className = "confetti-bit";
      bit.textContent = EMOJI[Math.floor(Math.random() * EMOJI.length)];
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.6;
      const dist = 70 + Math.random() * 110;
      bit.style.left = `${x}px`;
      bit.style.top = `${y}px`;
      bit.style.setProperty("--cx", `${Math.cos(angle) * dist}px`);
      bit.style.setProperty("--cy", `${Math.sin(angle) * dist - 40}px`);
      bit.style.setProperty("--cr", `${(Math.random() - 0.5) * 540}deg`);
      doc.body.append(bit);
      setTimeout(() => bit.remove(), 1100);
    }
  };

  doc.querySelectorAll("[data-confetti]").forEach((el) => {
    el.addEventListener("click", (e) => burst(e.clientX, e.clientY));
  });

  /* --- Yukari cik butonu --- */
  const toTop = doc.querySelector("#to-top");

  if (toTop) {
    addEventListener(
      "scroll",
      () => toTop.classList.toggle("is-visible", scrollY > 600),
      { passive: true }
    );
    toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));
  }

  /* --- Konami parti modu --- */
  const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let ki = 0;

  addEventListener("keydown", (e) => {
    ki = e.key === KONAMI[ki] ? ki + 1 : e.key === KONAMI[0] ? 1 : 0;
    if (ki !== KONAMI.length) return;
    ki = 0;
    doc.body.classList.toggle("party");
    burst(innerWidth / 2, innerHeight / 2, 26);
  });
})();
