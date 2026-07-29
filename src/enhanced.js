(() => {
  "use strict";

  const doc = document;
  const user = "mcd4hell";
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const styles = `
    .repo-section { position: relative; max-width: 72rem; margin: 0 auto; padding: 6rem 1rem; }
    .repo-shell { border: 1px solid rgba(255,255,255,.12); border-radius: 2rem; background: linear-gradient(145deg, rgba(255,255,255,.09), rgba(255,255,255,.035)); box-shadow: inset 0 1px 0 rgba(255,255,255,.14), 0 24px 80px rgba(3,4,15,.35); padding: clamp(1.25rem, 3vw, 2.25rem); }
    .repo-head { display: flex; align-items: end; justify-content: space-between; gap: 1.5rem; margin-bottom: 1.5rem; }
    .repo-kicker { color: #58f2aa; font-size: .75rem; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; }
    .repo-title { margin: .45rem 0 0; color: #f4f7f5; font: 800 clamp(1.9rem, 4vw, 3.3rem)/1.05 Montserrat, sans-serif; letter-spacing: -.05em; text-wrap: balance; }
    .repo-subtitle { max-width: 38rem; margin: .8rem 0 0; color: #93a0ad; font-size: .9rem; line-height: 1.7; }
    .repo-profile { display: inline-flex; align-items: center; gap: .55rem; white-space: nowrap; color: #dbe0e6; font-size: .8rem; text-decoration: none; }
    .repo-profile:hover { color: #58f2aa; }
    .repo-controls { display: flex; flex-wrap: wrap; gap: .6rem; align-items: center; justify-content: space-between; margin: 1.5rem 0; }
    .repo-filters { display: flex; flex-wrap: wrap; gap: .45rem; }
    .repo-filter, .repo-sort, .repo-search { min-height: 2.55rem; border: 1px solid rgba(255,255,255,.11); border-radius: .8rem; background: rgba(0,0,0,.18); color: #93a0ad; font: 600 .72rem Poppins, sans-serif; }
    .repo-filter { padding: .65rem .85rem; cursor: pointer; transition: transform .2s cubic-bezier(.16,1,.3,1), background .2s, color .2s; }
    .repo-filter:hover { transform: translateY(-2px); color: #f4f7f5; background: rgba(255,255,255,.08); }
    .repo-filter[aria-pressed="true"] { color: #04180f; background: #58f2aa; border-color: #58f2aa; }
    .repo-search { width: min(100%, 15rem); padding: 0 .85rem; outline: none; }
    .repo-search::placeholder { color: #6f7a86; }
    .repo-search:focus-visible, .repo-filter:focus-visible, .repo-sort:focus-visible { outline: 2px solid #58f2aa; outline-offset: 3px; }
    .repo-sort { padding: 0 .7rem; }
    .repo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(15.5rem, 1fr)); gap: .8rem; }
    .repo-card { display: flex; min-height: 12.5rem; flex-direction: column; justify-content: space-between; padding: 1.15rem; border: 1px solid rgba(255,255,255,.09); border-radius: 1.2rem; background: rgba(10,12,21,.48); transition: transform .3s cubic-bezier(.16,1,.3,1), border-color .3s, background .3s; }
    .repo-card:hover { transform: translateY(-5px); border-color: rgba(88,242,170,.45); background: rgba(17,24,31,.8); }
    .repo-card-top { display: flex; align-items: start; justify-content: space-between; gap: 1rem; }
    .repo-name { color: #f4f7f5; font: 700 1rem Montserrat, sans-serif; overflow-wrap: anywhere; }
    .repo-name:hover { color: #58f2aa; }
    .repo-lock { color: #8b7bff; font-size: .7rem; }
    .repo-description { display: -webkit-box; margin: .8rem 0 1rem; overflow: hidden; color: #93a0ad; font-size: .78rem; line-height: 1.65; -webkit-box-orient: vertical; -webkit-line-clamp: 3; }
    .repo-meta { display: flex; flex-wrap: wrap; gap: .7rem; color: #93a0ad; font-size: .7rem; }
    .repo-meta span { display: inline-flex; align-items: center; gap: .28rem; }
    .repo-dot { width: .48rem; height: .48rem; border-radius: 999px; background: var(--repo-color, #58f2aa); }
    .repo-empty { grid-column: 1 / -1; padding: 2.5rem 1rem; border: 1px dashed rgba(255,255,255,.16); border-radius: 1rem; color: #93a0ad; text-align: center; }
    .repo-status { margin-top: 1rem; color: #6f7a86; font-size: .7rem; }
    @media (max-width: 640px) { .repo-section { padding: 4.5rem 1rem; } .repo-head { align-items: start; flex-direction: column; } .repo-profile { margin-top: -.75rem; } .repo-search { width: 100%; } .repo-controls { align-items: stretch; } }
    @media (prefers-reduced-motion: reduce) { .repo-card, .repo-filter { transition: none; } }
  `;

  const style = doc.createElement("style");
  style.textContent = styles;
  doc.head.append(style);

  const projects = doc.querySelector("#projects");
  const setup = doc.querySelector("#setup");
  if (!projects || !setup || doc.querySelector("#github-workspace")) return;

  const section = doc.createElement("section");
  section.id = "github-workspace";
  section.className = "repo-section";
  section.setAttribute("aria-labelledby", "github-workspace-title");
  section.innerHTML = `
    <div class="repo-shell">
      <div class="repo-head">
        <div>
          <div class="repo-kicker"># github workspace</div>
          <h2 id="github-workspace-title" class="repo-title">Kodun yaşayan kısmı.</h2>
          <p class="repo-subtitle">Güncel repoları tek yerde gör, teknolojiye göre filtrele, doğrudan projeye geç. Liste GitHub'dan canlı geliyor.</p>
        </div>
        <a class="repo-profile" href="https://github.com/${user}" target="_blank" rel="noopener noreferrer">@${user} profilini aç ↗</a>
      </div>
      <div class="repo-controls">
        <div class="repo-filters" role="group" aria-label="Repo filtreleri">
          <button class="repo-filter" type="button" data-filter="all" aria-pressed="true">Tümü</button>
          <button class="repo-filter" type="button" data-filter="public" aria-pressed="false">Public</button>
          <button class="repo-filter" type="button" data-filter="private" aria-pressed="false">Private</button>
        </div>
        <div class="repo-controls-right">
          <select class="repo-sort" aria-label="Repoların sıralaması">
            <option value="updated">Son güncellenen</option>
            <option value="stars">Yıldız sayısı</option>
            <option value="name">İsim</option>
          </select>
          <input class="repo-search" type="search" placeholder="Repo ara..." aria-label="Repoda ara">
        </div>
      </div>
      <div class="repo-grid" aria-live="polite"><div class="repo-empty">GitHub'dan repolar çekiliyor...</div></div>
      <div class="repo-status" aria-live="polite">Bağlanıyor...</div>
    </div>
  `;
  setup.parentNode.insertBefore(section, setup);

  const grid = section.querySelector(".repo-grid");
  const status = section.querySelector(".repo-status");
  const search = section.querySelector(".repo-search");
  const sort = section.querySelector(".repo-sort");
  const filters = [...section.querySelectorAll(".repo-filter")];
  let repos = [];
  let activeFilter = "all";

  const ago = (date) => {
    const days = Math.max(0, Math.floor((Date.now() - new Date(date).getTime()) / 86400000));
    return days === 0 ? "bugün" : days === 1 ? "dün" : `${days} gün önce`;
  };

  const render = () => {
    const query = search.value.trim().toLocaleLowerCase("tr-TR");
    const key = sort.value;
    const visible = repos
      .filter((repo) => activeFilter === "all" || (activeFilter === "public" ? !repo.private : repo.private))
      .filter((repo) => `${repo.name} ${repo.description || ""} ${repo.language || ""}`.toLocaleLowerCase("tr-TR").includes(query))
      .sort((a, b) => key === "stars" ? b.stargazers_count - a.stargazers_count : key === "name" ? a.name.localeCompare(b.name) : new Date(b.updated_at) - new Date(a.updated_at));

    grid.innerHTML = "";
    if (!visible.length) {
      grid.innerHTML = `<div class="repo-empty">Bu filtrede repo yok. Aramayı biraz gevşet.</div>`;
      return;
    }

    visible.forEach((repo, index) => {
      const card = doc.createElement("article");
      card.className = "repo-card";
      card.style.setProperty("--repo-color", repo.language === "JavaScript" ? "#f0db4f" : repo.language === "HTML" ? "#e44d26" : repo.language === "TypeScript" ? "#3178c6" : "#58f2aa");
      card.innerHTML = `
        <div>
          <div class="repo-card-top">
            <a class="repo-name" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
            <span class="repo-lock" title="${repo.private ? "Private repo" : "Public repo"}">${repo.private ? "private" : "public"}</span>
          </div>
          <p class="repo-description">${repo.description || "Açıklama eklenmemiş. Kod konuşsun."}</p>
        </div>
        <div class="repo-meta">
          <span><i class="repo-dot" aria-hidden="true"></i>${repo.language || "misc"}</span>
          <span>★ ${repo.stargazers_count}</span>
          <span>${ago(repo.updated_at)}</span>
        </div>
      `;
      if (!reduced) {
        card.style.opacity = "0";
        card.style.transform = "translateY(10px)";
        requestAnimationFrame(() => {
          card.style.transitionDelay = `${Math.min(index, 8) * 35}ms`;
          card.style.opacity = "1";
          card.style.transform = "none";
        });
      }
      grid.append(card);
    });
    status.textContent = `${visible.length} repo gösteriliyor, GitHub ile senkron.`;
  };

  filters.forEach((button) => button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filters.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    render();
  }));
  search.addEventListener("input", render);
  sort.addEventListener("change", render);

  fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=100`)
    .then((response) => {
      if (!response.ok) throw new Error("GitHub bağlantısı başarısız");
      return response.json();
    })
    .then((data) => {
      repos = data;
      render();
    })
    .catch(() => {
      grid.innerHTML = `<div class="repo-empty">GitHub şu an cevap vermiyor. <a href="https://github.com/${user}" target="_blank" rel="noopener noreferrer">Profilden aç ↗</a></div>`;
      status.textContent = "Canlı liste kullanılamıyor.";
    });
})();
