/* MCD.dev — kaynak script (dist/app.min.js üretilir) */
(() => {
  "use strict";

  const doc = document;
  const root = doc.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  const $ = (sel, scope = doc) => scope.querySelector(sel);
  const $$ = (sel, scope = doc) => [...scope.querySelectorAll(sel)];
  const lerp = (a, b, t) => a + (b - a) * t;

  root.classList.add("js");

  const PROJECTS = {
    portfolio: {
      category: "web",
      title: "MCD.dev",
      description: "Bu sitenin kendisi: tek sayfalık portföy, Discord esintili arayüz, canlı etkileşimler ve GitHub odaklı içerik güncellemeleri.",
      tags: ["HTML", "Tailwind CSS", "JavaScript"],
      link: "https://github.com/mcd4hell/mcd",
      kicker: "Web · public repo",
      problem: "Portföyü süslü laflarla değil, hızlı açılan ve net okunan içerikle ayakta tutmak.",
      solution: "Tek sayfada güçlü görsel dil, hafif etkileşimler ve günlük GitHub senkronuyla yaşayan bir vitrin kurmak.",
      status: "● Public repo · 1 Ağu 2026 güncellendi",
    },
    profile: {
      category: "profile",
      title: "GitHub Profile README",
      description: "GitHub profilini boş bırakmayan README: stack, istatistik kartları, commit yılanı ve site bağlantıları tek vitrinde.",
      tags: ["Markdown", "SVG", "GitHub"],
      link: "https://github.com/mcd4hell/mcd4hell",
      kicker: "Profil · public repo",
      problem: "GitHub profili boşsa ilk izlenim de boş kalıyor.",
      solution: "README içinde canlı istatistikler, sosyal linkler ve görsel küçük numaralarla profili tek bakışta anlatmak.",
      status: "● Public repo · 20 Tem 2026 güncellendi",
    },
  };

  const syncProjectContent = () => {
    const filterButtons = $$(".project-filter");
    if (filterButtons[1]) {
      filterButtons[1].textContent = "Web";
      filterButtons[1].dataset.filter = "web";
    }
    if (filterButtons[2]) {
      filterButtons[2].textContent = "Profil";
      filterButtons[2].dataset.filter = "profile";
    }
    filterButtons[3]?.remove();

    const cards = $$('[data-project-category]');
    const [portfolioCard, profileCard] = cards;

    if (portfolioCard) {
      portfolioCard.dataset.projectCategory = PROJECTS.portfolio.category;
      portfolioCard.innerHTML = `
        <div class="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-mint to-[#0f766e] p-5">
          <div class="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/20 blur-2xl"></div>
          <div class="rounded-xl border border-white/15 bg-[#101623]/85 p-4 shadow-xl backdrop-blur-xl">
            <div class="flex items-center gap-2 text-xs">
              <span class="grid h-8 w-8 place-items-center rounded-full bg-mint text-sm font-bold text-[#04180f]">&lt;/&gt;</span>
              <p><b class="text-white">MCD.dev</b> <span class="ml-1 rounded bg-mint px-1 text-[9px] font-bold text-[#04180f]">WEB</span></p>
            </div>
            <div class="mt-3 rounded-lg border-l-4 border-aqua bg-black/30 p-3 text-[11px]">
              <p class="font-semibold text-white">Portföy commit'i</p>
              <p class="mt-1 text-white/60">tek sayfa · canlı etkileşim · repo senkronu</p>
            </div>
            <p class="mt-3 text-[10px] text-white/40">✓ açık kaynak · son güncelleme 1 Ağu 2026</p>
          </div>
        </div>
        <div class="relative p-3 pb-2 pt-5">
          <div class="mb-3 flex items-center justify-between gap-3"><span class="rounded-md bg-mint/20 px-2 py-1 text-[10px] font-semibold text-mint">PUBLIC REPO · 1 AĞU 2026</span><a href="${PROJECTS.portfolio.link}" target="_blank" rel="noopener noreferrer" class="text-xs text-mint underline-offset-4 transition hover:text-white hover:underline" aria-label="MCD.dev reposunu aç">Repo'yu aç ↗</a></div>
          <h3 class="font-display text-xl font-bold text-white">${PROJECTS.portfolio.title}</h3>
          <p class="mt-2 text-sm font-light leading-6 text-muted">${PROJECTS.portfolio.description}</p>
          <div class="mt-4 flex items-center justify-between gap-3">
            <div class="flex flex-wrap gap-1.5 text-[10px] text-muted">
              ${PROJECTS.portfolio.tags.map((tag) => `<span class="rounded bg-white/5 px-2 py-1">${tag}</span>`).join("")}
            </div>
            <button type="button" class="project-details shrink-0 rounded-lg border border-mint/30 px-3 py-2 text-[10px] font-semibold text-mint transition hover:bg-mint hover:text-[#04180f]" data-project="portfolio">Detaylar</button>
          </div>
        </div>
      `;
    }

    if (profileCard) {
      profileCard.dataset.projectCategory = PROJECTS.profile.category;
      profileCard.innerHTML = `
        <div class="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-grape to-[#312e81] p-5">
          <div class="absolute -left-10 -bottom-10 h-36 w-36 rounded-full bg-white/15 blur-2xl"></div>
          <div class="rounded-xl border border-white/15 bg-[#101623]/85 p-4 shadow-xl backdrop-blur-xl">
            <div class="flex items-center justify-between text-xs">
              <p class="flex items-center gap-2"><span class="text-base">#</span><b class="text-white">mcd4hell</b></p>
              <span class="rounded-full bg-grape/25 px-2 py-0.5 text-[9px] font-bold text-[#d9d1ff]">README</span>
            </div>
            <div class="mt-3 space-y-2 text-[11px]">
              <p class="flex items-center justify-between rounded-lg bg-black/30 px-3 py-2"><span class="text-white/70">Stack</span><span class="text-mint">✓ görünür</span></p>
              <p class="flex items-center justify-between rounded-lg bg-black/30 px-3 py-2"><span class="text-white/70">İstatistikler</span><span class="text-mint">✓ canlı</span></p>
              <p class="flex items-center justify-between rounded-lg bg-black/30 px-3 py-2"><span class="text-white/70">Site bağlantısı</span><span class="text-mint">✓ açık</span></p>
            </div>
          </div>
        </div>
        <div class="relative p-3 pb-2 pt-5">
          <div class="mb-3 flex items-center justify-between gap-3"><span class="rounded-md bg-grape/20 px-2 py-1 text-[10px] font-semibold text-[#d9d1ff]">PROFİL REPO · 20 TEM 2026</span><a href="${PROJECTS.profile.link}" target="_blank" rel="noopener noreferrer" class="text-xs text-mint underline-offset-4 transition hover:text-white hover:underline" aria-label="GitHub Profile README reposunu aç">Repo'yu aç ↗</a></div>
          <h3 class="font-display text-xl font-bold text-white">${PROJECTS.profile.title}</h3>
          <p class="mt-2 text-sm font-light leading-6 text-muted">${PROJECTS.profile.description}</p>
          <div class="mt-4 flex items-center justify-between gap-3">
            <div class="flex flex-wrap gap-1.5 text-[10px] text-muted">
              ${PROJECTS.profile.tags.map((tag) => `<span class="rounded bg-white/5 px-2 py-1">${tag}</span>`).join("")}
            </div>
            <button type="button" class="project-details shrink-0 rounded-lg border border-mint/30 px-3 py-2 text-[10px] font-semibold text-mint transition hover:bg-mint hover:text-[#04180f]" data-project="profile">Detaylar</button>
          </div>
        </div>
      `;
    }
  };

  syncProjectContent();

  /* ---------- Türkçe / English ---------- */
  const languageButton = $("#language-button");
  const mobileLanguageButton = $("#mobile-language-button");
  const languageMeta = {
    tr: { title: "MCD — full-stack developer", description: "MCD'nin kod, tasarım ve internet köşesi. TypeScript, React ve Node.js ile hızlı, eğlenceli web deneyimleri.", ogLocale: "tr_TR" },
    en: { title: "MCD — full-stack developer", description: "MCD's corner of code, design and the internet. Fast, playful web experiences with TypeScript, React and Node.js.", ogLocale: "en_US" },
  };
  const translations = {
    tr: { heroStatus: "online, muhtemelen kod yazıyor", about: "hakkımda", projects: "projeler", setup: "setup", terminal: "terminal", contact: "iletişim", services: "ne yapıyorum", message: "Mesaj at", projectCount: "proje gösteriliyor" },
    en: { heroStatus: "online, probably writing code", about: "about", projects: "projects", setup: "setup", terminal: "terminal", contact: "contact", services: "what I do", message: "Send a message", projectCount: "projects shown" },
  };
  const setLanguage = (language) => {
    const lang = language === "en" ? "en" : "tr";
    const copy = translations[lang];
    root.lang = lang;
    localStorage.setItem("mcd-language", lang);
    doc.title = languageMeta[lang].title;
    $("meta[name='description']")?.setAttribute("content", languageMeta[lang].description);
    $("meta[property='og:description']")?.setAttribute("content", languageMeta[lang].description);
    $("meta[property='og:locale']")?.setAttribute("content", languageMeta[lang].ogLocale);
    $("#hero-status") && ($("#hero-status").textContent = copy.heroStatus);
    const labels = { about: copy.about, projects: copy.projects, setup: copy.setup, terminal: copy.terminal, contact: copy.contact };
    $$(`[href^="#"]`).forEach((link) => { const key = link.getAttribute("href")?.slice(1); if (labels[key] && link.classList.contains("nav-link")) link.textContent = `# ${labels[key]}`; });
    const projectTotal = doc.querySelectorAll("[data-project-category]").length || 2;
    $("#project-count") && ($("#project-count").textContent = `${projectTotal} ${copy.projectCount}`);
    [languageButton, mobileLanguageButton].forEach((button) => { if (button) { button.dataset.language = lang; button.setAttribute("aria-label", lang === "tr" ? "Dili İngilizceye çevir" : "Switch language to Turkish"); } });
    $$(".language-option").forEach((option, i) => option.classList.toggle("is-active", (lang === "tr" ? i === 0 : i === 1)));
  };
  const toggleLanguage = () => setLanguage(root.lang === "tr" ? "en" : "tr");
  languageButton?.addEventListener("click", toggleLanguage);
  mobileLanguageButton?.addEventListener("click", toggleLanguage);
  setLanguage(localStorage.getItem("mcd-language") || "tr");

  /* ---------- Tema tercihi ---------- */
  const THEMES = ["night", "contrast", "soft"];
  const themeButton = $("#theme-button");
  const savedTheme = localStorage.getItem("mcd-theme");
  const setTheme = (theme) => {
    const next = THEMES.includes(theme) ? theme : "night";
    root.dataset.theme = next;
    localStorage.setItem("mcd-theme", next);
    if (themeButton) themeButton.textContent = next === "soft" ? "☼" : next === "contrast" ? "◑" : "◐";
    if (themeButton) themeButton.setAttribute("aria-label", `Tema: ${next}. Değiştirmek için tıkla`);
  };
  setTheme(savedTheme || "night");
  themeButton?.addEventListener("click", () => {
    const next = THEMES[(THEMES.indexOf(root.dataset.theme) + 1) % THEMES.length];
    setTheme(next);
    toast(`Tema: ${next === "night" ? "gece" : next === "contrast" ? "yüksek kontrast" : "yumuşak"}`);
  });

  /* ---------- Scroll ilerleme çubuğu + küçülen menü ---------- */
  const progress = $("#scroll-progress");

  const onScroll = () => {
    const max = root.scrollHeight - innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    doc.body.classList.toggle("nav-scrolled", scrollY > 40);
  };

  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobil menü ---------- */
  const menuButton = $("#menu-button");
  const mobileMenu = $("#mobile-menu");

  if (menuButton && mobileMenu) {
    const setMenu = (open) => {
      menuButton.setAttribute("aria-expanded", String(open));
      mobileMenu.classList.toggle("is-open", open);
    };

    menuButton.addEventListener("click", () => {
      setMenu(menuButton.getAttribute("aria-expanded") !== "true");
    });

    $$(".mobile-link").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });

    addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMenu(false);
    });

    doc.addEventListener("click", (e) => {
      if (!mobileMenu.contains(e.target) && !menuButton.contains(e.target)) setMenu(false);
    });
  }

  /* ---------- Scrollspy: aktif bölümü menüde işaretle ---------- */
  const navLinks = $$(".nav-link[href^='#']");

  if (navLinks.length) {
    const sections = navLinks
      .map((link) => $(link.getAttribute("href")))
      .filter(Boolean);

    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          navLinks.forEach((link) =>
            link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`)
          );
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((sec) => spy.observe(sec));
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = $$('[data-reveal]');

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

  /* ---------- Sayaçlar (data-count) ---------- */
  const counters = $$('[data-count]');

  if (counters.length) {
    const runCount = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      if (reduceMotion || !Number.isFinite(target)) {
        el.textContent = el.dataset.count + suffix;
        return;
      }
      const dur = 1400;
      const t0 = performance.now();
      const step = (now) => {
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const cio = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          runCount(entry.target);
          cio.unobserve(entry.target);
        }
      },
      { threshold: 0.6 }
    );

    counters.forEach((el) => cio.observe(el));
  }

  /* ---------- Yazı scramble efekti ---------- */
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

  $$('[data-scramble]').forEach((el) => {
    scramble(el);
    el.addEventListener("pointerenter", () => scramble(el));
  });

  /* ---------- Hero durumu: daktilo efekti ---------- */
  const statusEl = $("#hero-status");
  const STATUSES = [
    "online, muhtemelen kod yazıyor",
    "bug ile pazarlık yapıyor",
    "kahve molasında (kısa sürer)",
    "commit mesajı düşünüyor",
    "dark mode'da felsefe yapıyor",
    "tab'ları kapatmayı reddediyor",
    "oirat'ta ortalığı sakinleştiriyor",
    "guard bot'a yeni numara öğretiyor",
  ];

  if (statusEl) {
    if (reduceMotion) {
      statusEl.textContent = STATUSES[0];
    } else {
      let si = 0;
      let ci = 0;
      let deleting = false;

      const type = () => {
        const text = STATUSES[si];
        ci += deleting ? -1 : 1;
        statusEl.textContent = text.slice(0, ci);

        let delay = deleting ? 26 : 46;
        if (!deleting && ci === text.length) {
          delay = 2600;
          deleting = true;
        } else if (deleting && ci === 0) {
          deleting = false;
          si = (si + 1) % STATUSES.length;
          delay = 400;
        }
        setTimeout(type, delay);
      };

      type();
    }
  }

  /* ---------- Profil kartında canlı saat ---------- */
  const clockEl = $("#local-clock");

  if (clockEl) {
    const fmt = new Intl.DateTimeFormat("tr-TR", { hour: "2-digit", minute: "2-digit" });
    const tickClock = () => {
      clockEl.textContent = fmt.format(new Date());
    };
    tickClock();
    setInterval(tickClock, 15000);
  }

  /* ---------- Discord sohbeti: yazıyor → mesaj ---------- */
  const chat = $("#chat-thread");

  if (chat) {
    const messages = $$(".chat-message", chat);
    const typing = $("#chat-typing");
    let played = false;

    const play = () => {
      if (played) return;
      played = true;

      if (reduceMotion) {
        messages.forEach((m) => m.classList.add("is-sent"));
        typing?.remove();
        return;
      }

      messages.forEach((m, i) => {
        setTimeout(() => {
          m.classList.add("is-sent");
          if (typing && i === messages.length - 1) {
            typing.style.opacity = "0";
            setTimeout(() => typing.remove(), 400);
          }
        }, 900 + i * 1300);
      });
    };

    new IntersectionObserver(
      (entries, obs) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        play();
        obs.disconnect();
      },
      { threshold: 0.35 }
    ).observe(chat);
  }

  /* ---------- Yıldız alanı kanvası ---------- */
  const canvas = $("#starfield");

  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext("2d");
    let stars = [];
    let w = 0;
    let h = 0;
    let px = 0;
    let py = 0;
    let running = true;

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth;
      h = innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(Math.floor((w * h) / 11000), 160);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: 0.25 + Math.random() * 0.75,
        r: 0.4 + Math.random() * 1.3,
        tw: Math.random() * Math.PI * 2,
      }));
    };

    addEventListener("resize", resize);
    resize();

    if (finePointer) {
      addEventListener("pointermove", (e) => {
        px = (e.clientX / w - 0.5) * 2;
        py = (e.clientY / h - 0.5) * 2;
      });
    }

    doc.addEventListener("visibilitychange", () => {
      running = !doc.hidden;
      if (running) requestAnimationFrame(draw);
    });

    let t = 0;
    const draw = () => {
      if (!running) return;
      t += 0.016;
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        s.y -= s.z * 0.12;
        if (s.y < -4) s.y = h + 4;

        const ox = px * s.z * -14;
        const oy = py * s.z * -10;
        const alpha = 0.25 + 0.55 * Math.abs(Math.sin(t * 0.8 + s.tw));

        ctx.beginPath();
        ctx.arc(s.x + ox, s.y + oy, s.r * s.z, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(190, 255, 224, ${alpha * s.z})`;
        ctx.fill();
      }

      requestAnimationFrame(draw);
    };

    draw();
  }

  /* ---------- Sıvı imleç ---------- */
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

      const hot = e.target.closest("a, button, [data-tilt], [data-confetti]");
      doc.body.classList.toggle("cursor-hot", Boolean(hot));
    });

    doc.addEventListener("pointerleave", () => doc.body.classList.remove("has-cursor"));

    const follow = () => {
      bx = lerp(bx, mx, 0.08);
      by = lerp(by, my, 0.08);
      blob.style.transform = `translate(${bx}px, ${by}px)`;
      requestAnimationFrame(follow);
    };
    follow();
  }

  /* ---------- 3D tilt + parlama (yumuşatılmış) ---------- */
  if (finePointer && !reduceMotion) {
    $$('[data-tilt]').forEach((card) => {
      const glare = doc.createElement("span");
      glare.className = "glare";
      card.append(glare);

      let tx = 0, ty = 0;
      let cx = 0, cy = 0;
      let hover = false;
      let raf = 0;

      const animate = () => {
        cx = lerp(cx, tx, 0.14);
        cy = lerp(cy, ty, 0.14);
        const settled = !hover && Math.abs(cx) < 0.05 && Math.abs(cy) < 0.05;

        card.style.transform = settled
          ? ""
          : `perspective(900px) rotateX(${cx}deg) rotateY(${cy}deg) translateY(${hover ? -4 : 0}px)`;

        if (settled) {
          raf = 0;
          return;
        }
        raf = requestAnimationFrame(animate);
      };

      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width;
        const ny = (e.clientY - r.top) / r.height;
        tx = (0.5 - ny) * 10;
        ty = (nx - 0.5) * 12;
        hover = true;
        card.style.setProperty("--gx", `${nx * 100}%`);
        card.style.setProperty("--gy", `${ny * 100}%`);
        if (!raf) raf = requestAnimationFrame(animate);
      });

      card.addEventListener("pointerleave", () => {
        tx = 0;
        ty = 0;
        hover = false;
        if (!raf) raf = requestAnimationFrame(animate);
      });
    });
  }

  /* ---------- Manyetik butonlar ---------- */
  if (finePointer && !reduceMotion) {
    $$('[data-magnetic]').forEach((btn) => {
      let tx = 0, ty = 0;
      let cx = 0, cy = 0;
      let raf = 0;

      const animate = () => {
        cx = lerp(cx, tx, 0.2);
        cy = lerp(cy, ty, 0.2);
        const settled = tx === 0 && ty === 0 && Math.abs(cx) < 0.1 && Math.abs(cy) < 0.1;
        btn.style.transform = settled ? "" : `translate(${cx}px, ${cy}px)`;
        if (settled) {
          raf = 0;
          return;
        }
        raf = requestAnimationFrame(animate);
      };

      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        tx = (e.clientX - (r.left + r.width / 2)) * 0.22;
        ty = (e.clientY - (r.top + r.height / 2)) * 0.3;
        if (!raf) raf = requestAnimationFrame(animate);
      });

      btn.addEventListener("pointerleave", () => {
        tx = 0;
        ty = 0;
        if (!raf) raf = requestAnimationFrame(animate);
      });
    });
  }

  /* ---------- Emoji konfeti ---------- */
  const EMOJI = ["✨", "💚", "🚀", "🎮", "☕", "🧃", "💾", "🌙"];

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

  $$('[data-confetti]').forEach((el) => {
    el.addEventListener("click", (e) => burst(e.clientX, e.clientY));
  });

  /* ---------- Toast ---------- */
  let toastTimer = 0;

  const toast = (msg) => {
    let el = $("#toast");
    if (!el) {
      el = doc.createElement("div");
      el.id = "toast";
      el.setAttribute("role", "status");
      el.className = "glass rounded-xl px-5 py-3 text-sm font-medium text-white";
      doc.body.append(el);
    }
    el.textContent = msg;
    clearTimeout(toastTimer);
    requestAnimationFrame(() => el.classList.add("is-visible"));
    toastTimer = setTimeout(() => el.classList.remove("is-visible"), 2400);
  };

  /* ---------- E-posta kopyalama ---------- */
  $$('[data-copy]').forEach((el) => {
    el.addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(el.dataset.copy);
        toast("E-posta panoya kopyalandı ✨");
        burst(e.clientX, e.clientY, 10);
      } catch {
        location.href = `mailto:${el.dataset.copy}`;
      }
    });
  });

  /* ---------- Yukarı çık butonu ---------- */
  const toTop = $("#to-top");

  if (toTop) {
    addEventListener(
      "scroll",
      () => toTop.classList.toggle("is-visible", scrollY > 600),
      { passive: true }
    );
    toTop.addEventListener("click", () =>
      scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
    );
  }

  /* ---------- Proje detay modalı ---------- */
  const projectModal = $("#project-modal");
  const projectData = {
    portfolio: { kicker: PROJECTS.portfolio.kicker, title: PROJECTS.portfolio.title, description: PROJECTS.portfolio.description, problem: PROJECTS.portfolio.problem, solution: PROJECTS.portfolio.solution, tags: PROJECTS.portfolio.tags, status: PROJECTS.portfolio.status, link: PROJECTS.portfolio.link },
    profile: { kicker: PROJECTS.profile.kicker, title: PROJECTS.profile.title, description: PROJECTS.profile.description, problem: PROJECTS.profile.problem, solution: PROJECTS.profile.solution, tags: PROJECTS.profile.tags, status: PROJECTS.profile.status, link: PROJECTS.profile.link },
  };
  const modalFields = { kicker: $("#project-modal-kicker"), title: $("#project-modal-title"), description: $("#project-modal-description"), problem: $("#project-modal-problem"), solution: $("#project-modal-solution"), tags: $("#project-modal-tags"), status: $("#project-modal-status") };
  const modalLink = projectModal?.querySelector('a[href^="https://github.com/"]');
  let lastProjectTrigger = null;
  const closeProjectModal = () => { projectModal?.classList.add("hidden"); projectModal?.classList.remove("flex"); lastProjectTrigger?.focus(); };
  const openProjectModal = (key, trigger) => {
    const data = projectData[key];
    if (!projectModal || !data) return;
    lastProjectTrigger = trigger;
    Object.entries(modalFields).forEach(([field, el]) => { if (field !== "tags" && el) el.textContent = data[field]; });
    if (modalFields.tags) { modalFields.tags.innerHTML = ""; data.tags.forEach((tag) => { const el = doc.createElement("span"); el.className = "rounded-lg bg-mint/15 px-3 py-2 text-xs text-mint"; el.textContent = tag; modalFields.tags.append(el); }); }
    if (modalLink) {
      modalLink.href = data.link;
      modalLink.textContent = "Repo'yu aç ↗";
      modalLink.setAttribute("aria-label", `${data.title} reposunu aç`);
    }
    projectModal.classList.remove("hidden"); projectModal.classList.add("flex"); $("#project-modal-close")?.focus();
  };
  $$(".project-details").forEach((button) => button.addEventListener("click", () => openProjectModal(button.dataset.project, button)));
  $("#project-modal-close")?.addEventListener("click", closeProjectModal);
  $("#project-modal-backdrop")?.addEventListener("click", closeProjectModal);
  addEventListener("keydown", (e) => { if (e.key === "Escape" && projectModal && !projectModal.classList.contains("hidden")) closeProjectModal(); });

  /* ---------- Proje filtreleri ---------- */
  const projectFilters = $$('[data-filter]');
  const projectCards = $$('[data-project-category]');
  const projectCount = $("#project-count");

  if (projectFilters.length && projectCards.length) {
    const applyFilter = (filter) => {
      let visible = 0;
      projectFilters.forEach((button) => {
        const active = button.dataset.filter === filter;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
      projectCards.forEach((card) => {
        const show = filter === "all" || card.dataset.projectCategory === filter;
        card.classList.toggle("is-filtered-out", !show);
        card.setAttribute("aria-hidden", String(!show));
        if (show) visible++;
      });
      if (projectCount) projectCount.textContent = `${visible} proje gösteriliyor`;
    };

    projectFilters.forEach((button) => {
      button.addEventListener("click", () => applyFilter(button.dataset.filter || "all"));
    });
  }

  /* ---------- Konami parti modu ---------- */
  const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let ki = 0;

  addEventListener("keydown", (e) => {
    ki = e.key === KONAMI[ki] ? ki + 1 : e.key === KONAMI[0] ? 1 : 0;
    if (ki !== KONAMI.length) return;
    ki = 0;
    doc.body.classList.toggle("party");
    burst(innerWidth / 2, innerHeight / 2, 26);
    toast(doc.body.classList.contains("party") ? "Parti modu açıldı 🎉" : "Parti bitti, işe dönüyoruz 🧑‍💻");
  });

  /* ---------- Komut paleti (Ctrl+K) ---------- */
  const palette = $("#palette");
  const paletteInput = $("#palette-input");
  const paletteList = $("#palette-list");

  if (palette && paletteInput && paletteList) {
    const norm = (s) => s.toLocaleLowerCase("tr-TR");
    const goTo = (sel) => $(sel)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });

    const ACTIONS = [
      { label: "# hakkımda bölümüne git", hint: "bölüm", run: () => goTo("#about") },
      { label: "# projeler bölümüne git", hint: "bölüm", run: () => goTo("#projects") },
      { label: "# setup bölümüne git", hint: "bölüm", run: () => goTo("#setup") },
      { label: "# terminal bölümüne git", hint: "bölüm", run: () => goTo("#terminal") },
      { label: "# iletişim bölümüne git", hint: "bölüm", run: () => goTo("#contact") },
      { label: "Sayfanın başına dön", hint: "bölüm", run: () => scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }) },
      {
        label: "E-postayı kopyala",
        hint: "aksiyon",
        run: async () => {
          try {
            await navigator.clipboard.writeText("mcdinspace@gmail.com");
            toast("E-posta panoya kopyalandı ✨");
          } catch {
            location.href = "mailto:mcdinspace@gmail.com";
          }
        },
      },
      { label: "GitHub profilini aç (mcd4hell)", hint: "link", run: () => open("https://github.com/mcd4hell", "_blank", "noopener") },
      { label: "Gece temasına geç", hint: "tema", run: () => setTheme("night") },
      { label: "Switch to English", hint: "language", run: () => setLanguage("en") },
      { label: "Türkçeye geç", hint: "dil", run: () => setLanguage("tr") },
      { label: "Yüksek kontrast temasına geç", hint: "tema", run: () => setTheme("contrast") },
      { label: "Yumuşak temaya geç", hint: "tema", run: () => setTheme("soft") },
      { label: "MCD.dev repo detaylarını aç", hint: "proje", run: () => openProjectModal("portfolio") },
      { label: "GitHub profile README detaylarını aç", hint: "proje", run: () => openProjectModal("profile") },
      { label: "Hizmetler bölümüne git", hint: "bölüm", run: () => goTo("#services") },
      { label: "Konfeti patlat", hint: "eğlence", run: () => burst(innerWidth / 2, innerHeight / 3, 20) },
      {
        label: "Parti modunu aç/kapat",
        hint: "eğlence",
        run: () => {
          doc.body.classList.toggle("party");
          burst(innerWidth / 2, innerHeight / 2, 26);
        },
      },
    ];

    let filtered = ACTIONS;
    let active = 0;

    const paint = () => {
      [...paletteList.children].forEach((li, i) => {
        li.classList.toggle("is-active", i === active);
        if (i === active) li.scrollIntoView({ block: "nearest" });
      });
    };

    const runAction = (a) => {
      closePalette();
      a.run();
    };

    const render = () => {
      paletteList.innerHTML = "";
      if (!filtered.length) {
        const li = doc.createElement("li");
        li.className = "px-3 py-6 text-center text-muted";
        li.textContent = "Hiçbir şey bulunamadı 🤷";
        paletteList.append(li);
        return;
      }
      filtered.forEach((a, i) => {
        const li = doc.createElement("li");
        li.className = "palette-item flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5";
        const label = doc.createElement("span");
        label.textContent = a.label;
        const hint = doc.createElement("span");
        hint.className = "shrink-0 text-[10px] uppercase text-muted";
        hint.textContent = a.hint;
        li.append(label, hint);
        li.addEventListener("click", () => runAction(a));
        li.addEventListener("pointerenter", () => {
          active = i;
          paint();
        });
        paletteList.append(li);
      });
      paint();
    };

    const openPalette = () => {
      palette.classList.remove("hidden");
      palette.classList.add("flex");
      paletteInput.value = "";
      filtered = ACTIONS;
      active = 0;
      render();
      paletteInput.focus();
    };

    const closePalette = () => {
      palette.classList.add("hidden");
      palette.classList.remove("flex");
    };

    $("#palette-button")?.addEventListener("click", openPalette);
    $("#palette-backdrop")?.addEventListener("click", closePalette);

    paletteInput.addEventListener("input", () => {
      const q = norm(paletteInput.value.trim());
      filtered = q ? ACTIONS.filter((a) => norm(a.label).includes(q)) : ACTIONS;
      active = 0;
      render();
    });

    addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        palette.classList.contains("hidden") ? openPalette() : closePalette();
        return;
      }
      if (palette.classList.contains("hidden")) return;
      if (e.key === "Escape") {
        closePalette();
        return;
      }
      if (!filtered.length) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        active = (active + 1) % filtered.length;
        paint();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        active = (active - 1 + filtered.length) % filtered.length;
        paint();
      } else if (e.key === "Enter" && filtered[active]) {
        runAction(filtered[active]);
      }
    });
  }

  /* ---------- İnteraktif terminal ---------- */
  const termIn = $("#term-in");
  const termOut = $("#term-out");
  const termBody = $("#term-body");

  if (termIn && termOut && termBody) {
    const print = (text, cls = "") => {
      const line = doc.createElement("div");
      if (cls) line.className = cls;
      line.textContent = text;
      termOut.append(line);
      termBody.scrollTop = termBody.scrollHeight;
    };

    const COMMANDS = {
      help: () => print("komutlar: whoami · projects · filter <tümü|web|profil> · stack · lang <tr|en> · services · theme · oirat · github · setup · contact · coffee · party · ls · date · echo <mesaj> · clear", "text-muted"),
      whoami: () => print("MCD (mcd4hell) — full-stack developer, Oirat kurucusu. TypeScript sever, bug'larla pazarlık eder."),
      projects: () => {
        print("• MCD.dev          — açık kaynak portföy sitesi");
        print("• GitHub README    — profil vitrini, stack ve istatistikler");
        print("private tarafta botlar hâlâ iş başında 🤫", "text-muted");
      },
      filter: (value) => {
        const aliases = { tümü: "all", all: "all", web: "web", profil: "profile", profile: "profile" };
        const key = aliases[value?.toLocaleLowerCase("tr-TR") || "all"];
        const button = key && $(`[data-filter="${key}"]`);
        if (button) {
          button.click();
          print(`proje filtresi: ${value}`);
        } else print("kullanım: filter tümü | web | profil", "text-muted");
      },
      stack: () => print("TypeScript · React · Next.js · Node.js · Tailwind · PostgreSQL · Docker"),
      oirat: () => {
        print("⚔️ Oirat — MCD'nin Discord sunucusu.");
        print("Moderation bot düzeni sağlar, Guard bot kapıda bekler. İkisi de burada yazıldı.");
      },
      github: () => {
        print("github.com/mcd4hell açılıyor...");
        open("https://github.com/mcd4hell", "_blank", "noopener");
      },
      setup: () => print("VS Code + Tailwind + Tame Impala + kahve. Denenmiş, onaylanmış."),
      services: () => print("web deneyimleri · bot & otomasyon · ürünleştirme"),
      lang: (value) => setLanguage(value?.toLocaleLowerCase("tr-TR") === "en" ? "en" : "tr"),
      theme: (value) => {
        const aliases = { gece: "night", night: "night", kontrast: "contrast", contrast: "contrast", yumuşak: "soft", soft: "soft" };
        const next = aliases[value?.toLocaleLowerCase("tr-TR") || ""];
        if (next) { setTheme(next); print(`tema: ${next}`); } else print("kullanım: theme gece | kontrast | yumuşak", "text-muted");
      },
      about: () => print("MCD — full-stack developer, Oirat kurucusu. Temiz kod, küçük sürprizler."),
      contact: () => print("mcdinspace@gmail.com — DM kutusu her zaman açık."),
      coffee: () => {
        print("☕ demleniyor... tamamdır. Verimlilik +%12.");
        burst(innerWidth / 2, innerHeight / 2, 10);
      },
      party: () => {
        doc.body.classList.toggle("party");
        print(doc.body.classList.contains("party") ? "🎉 parti modu: AÇIK" : "parti modu: kapalı. işe dönüyoruz.");
      },
      ls: () => print("projeler/  github-profile/  setup/  private-lab/  (247 öğe)"),
      date: () => print(new Date().toLocaleString("tr-TR")),
      clear: () => {
        termOut.innerHTML = "";
      },
      sudo: () => print("Güzel deneme. Burada root benim. 😎", "text-red-300"),
      exit: () => print("Buradan çıkış yok, kaydırmaya devam. 🙃", "text-muted"),
    };

    print("MCD terminaline hoş geldin. 'help' yazarak başla.", "text-muted");

    termBody.addEventListener("click", () => termIn.focus());

    const history = [];
    let hi = 0;

    termIn.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const partial = termIn.value.trim().toLocaleLowerCase("tr-TR");
        if (!partial) return;
        const matches = [...Object.keys(COMMANDS), "echo"].filter((c) => c.startsWith(partial));
        if (matches.length === 1) termIn.value = matches[0] + " ";
        else if (matches.length > 1) print(matches.join("  "), "text-muted");
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (history.length) {
          hi = Math.max(0, hi - 1);
          termIn.value = history[hi] || "";
        }
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        hi = Math.min(history.length, hi + 1);
        termIn.value = history[hi] || "";
        return;
      }
      if (e.key !== "Enter") return;

      const raw = termIn.value.trim();
      termIn.value = "";
      if (!raw) return;
      history.push(raw);
      hi = history.length;

      print(`mcd@dev:~$ ${raw}`, "text-mint");
      const [cmd, ...rest] = raw.split(/\s+/);
      const key = cmd.toLocaleLowerCase("tr-TR");

      if (key === "echo") print(rest.join(" "));
      else if (["filter", "theme", "lang"].includes(key)) COMMANDS[key](rest.join(" "));
      else if (COMMANDS[key]) COMMANDS[key]();
      else print(`komut bulunamadı: ${cmd} — 'help' dene`, "text-red-300");
    });
  }

  /* ---------- Commit ısı haritası ---------- */
  const contrib = $("#contrib");

  if (contrib) {
    const totalEl = $("#contrib-total");
    const frag = doc.createDocumentFragment();
    let total = 0;

    for (let w = 0; w < 52; w++) {
      const wave = 0.55 + 0.45 * Math.sin(w / 4.2 + 1);
      for (let d = 0; d < 7; d++) {
        const weekend = d === 0 || d === 6 ? 0.55 : 1;
        const heat = Math.random() * wave * weekend;
        const level = heat > 0.72 ? 4 : heat > 0.52 ? 3 : heat > 0.34 ? 2 : heat > 0.16 ? 1 : 0;
        const commits = level === 0 ? 0 : level * 2 + Math.floor(Math.random() * 3);
        total += commits;

        const cell = doc.createElement("i");
        cell.className = "contrib-cell";
        cell.dataset.level = String(level);
        const label = commits ? `${commits} commit` : "dinlenme günü";
        cell.title = label;
        cell.setAttribute("aria-label", label);
        cell.setAttribute("role", "img");
        frag.append(cell);
      }
    }

    contrib.append(frag);
    if (totalEl) totalEl.textContent = total.toLocaleString("tr-TR");
  }

  /* ---------- Şu an çalıyor ---------- */
  const npTrack = $("#np-track");
  const npBar = $("#np-bar");

  if (npTrack && npBar) {
    const TRACKS = [
      "Tame Impala — The Less I Know The Better",
      "Tame Impala — Let It Happen",
      "Tame Impala — Borderline",
      "Daft Punk — Something About Us",
      "Mac DeMarco — Chamber of Reflection",
    ];

    if (reduceMotion) {
      npBar.style.width = "40%";
    } else {
      const DUR = 24000;
      let ti = 0;
      let start = performance.now();

      const tick = (now) => {
        let p = (now - start) / DUR;
        if (p >= 1) {
          start = now;
          p = 0;
          ti = (ti + 1) % TRACKS.length;
          npTrack.textContent = TRACKS[ti];
        }
        npBar.style.width = `${p * 100}%`;
        requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    }
  }

  /* ---------- Sekme başlığı ---------- */
  const baseTitle = doc.title;

  doc.addEventListener("visibilitychange", () => {
    doc.title = doc.hidden ? "gitme 🥺 — MCD" : baseTitle;
  });

  /* ---------- Konsol imzası ---------- */
  console.log(
    "%c MCD.dev %c selam, kaynağa bakan meraklı 👀 — ↑↑↓↓←→←→BA dene ",
    "background:#58f2aa;color:#04120b;font-weight:bold;border-radius:4px 0 0 4px;padding:4px 8px",
    "background:#161a26;color:#dbe0e6;border-radius:0 4px 4px 0;padding:4px 8px"
  );
})();
