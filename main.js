(() => {
  const root = document.documentElement;
  root.classList.add("js");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- liquid lens ---------- */
  const hero = document.querySelector(".hero");
  const lens = document.querySelector(".lens");
  const MAG = 1.4;

  if (hero && lens) {
    // The lens magnifies a live copy of the hero: same result in every browser, iPhone included.
    let clone = null;
    {
      clone = document.createElement("div");
      clone.className = "lens__copy";
      for (const el of hero.querySelectorAll(".hero__title, .hero__lede, .hero__actions, .hero__meta")) {
        const copy = el.cloneNode(true);
        copy.removeAttribute("id");
        copy.querySelectorAll("a").forEach((a) => { a.removeAttribute("href"); a.setAttribute("tabindex", "-1"); });
        clone.appendChild(copy);
      }
      lens.prepend(clone);
      lens.classList.add("has-copy");
    }

    let tx = 0, ty = 0, x = 0, y = 0, raf = 0, idle = true, t0 = performance.now();

    function home() {
      const h = hero.getBoundingClientRect();
      const title = hero.querySelector(".hero__title").getBoundingClientRect();
      const s = lens.offsetWidth;
      return {
        x: Math.max(0, Math.min(h.width - s - 8, title.left - h.left + title.width * 0.74 - s / 2)),
        y: title.top - h.top + title.height * 0.7 - s / 2,
      };
    }

    function syncClone() {
      if (!clone) return;
      const s = lens.offsetWidth;
      const pad = getComputedStyle(hero);
      clone.style.width = hero.clientWidth + "px";
      clone.style.padding = `${pad.paddingTop} ${pad.paddingRight} ${pad.paddingBottom} ${pad.paddingLeft}`;
      clone.style.height = hero.clientHeight + "px";
      // map hero point (x + s/2, y + s/2) to lens centre, scaled
      const cx = x + s / 2, cy = y + s / 2;
      clone.style.transformOrigin = `${cx}px ${cy}px`;
      clone.style.transform = `translate(${-x}px, ${-y}px) scale(${MAG})`;
    }

    function frame(now) {
      if (idle) {
        const p = home();
        const t = (now - t0) / 1000;
        tx = p.x + Math.sin(t * 0.45) * 26;
        ty = p.y + Math.cos(t * 0.6) * 16;
      }
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      lens.style.setProperty("--x", x + "px");
      lens.style.setProperty("--y", y + "px");
      syncClone();
      raf = requestAnimationFrame(frame);
    }

    function start() {
      const p = home();
      x = tx = p.x; y = ty = p.y;
      lens.style.setProperty("--x", x + "px");
      lens.style.setProperty("--y", y + "px");
      syncClone();
      lens.classList.add("is-ready");
      if (!reduce) raf = requestAnimationFrame(frame);
    }

    let idleTimer = 0;
    hero.addEventListener("pointermove", (e) => {
      if (reduce || e.pointerType === "touch") return;
      const h = hero.getBoundingClientRect();
      const s = lens.offsetWidth;
      tx = e.clientX - h.left - s / 2;
      ty = e.clientY - h.top - s / 2;
      idle = false;
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => { idle = true; t0 = performance.now(); }, 2500);
    });
    hero.addEventListener("pointerleave", () => { idle = true; t0 = performance.now(); });

    // pause when the hero is off screen
    new IntersectionObserver(([en]) => {
      if (reduce) return;
      if (en.isIntersecting) { if (!raf) raf = requestAnimationFrame(frame); }
      else { cancelAnimationFrame(raf); raf = 0; }
    }).observe(hero);

    addEventListener("resize", () => { if (reduce || idle) { const p = home(); x = tx = p.x; y = ty = p.y; syncClone(); lens.style.setProperty("--x", x + "px"); lens.style.setProperty("--y", y + "px"); } });
    document.fonts ? document.fonts.ready.then(start) : addEventListener("load", start);
  }

  /* ---------- reveal on scroll ---------- */
  const targets = document.querySelectorAll(".section__head, .work__row, .about__text, .does, .contact__panel");
  if (!reduce && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      for (const en of entries) if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    }, { rootMargin: "0px 0px -8% 0px" });
    targets.forEach((el, i) => {
      el.classList.add("reveal");
      if (el.classList.contains("work__row")) el.style.transitionDelay = (Array.prototype.indexOf.call(el.parentNode.children, el) * 60) + "ms";
      io.observe(el);
    });
  }

  /* ---------- current section in nav ---------- */
  const links = [...document.querySelectorAll(".nav__links a")];
  const secs = links.map((a) => document.querySelector(a.getAttribute("href")));
  if ("IntersectionObserver" in window) {
    const so = new IntersectionObserver((entries) => {
      for (const en of entries) {
        const a = links[secs.indexOf(en.target)];
        if (en.isIntersecting) { links.forEach((l) => l.removeAttribute("aria-current")); a.setAttribute("aria-current", "true"); }
      }
    }, { rootMargin: "-45% 0px -50% 0px" });
    secs.forEach((s) => s && so.observe(s));
  }
})();
