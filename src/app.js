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

  /* ================= ÇEVİRİ SÖZLÜĞÜ (TR / EN) ================= */
  const i18n = {
    tr: {
      metaTitle: "MCD — full-stack developer",
      metaDesc: "MCD'nin kod, tasarım ve internet köşesi. TypeScript, React ve Node.js ile hızlı, eğlenceli web deneyimleri.",
      ogLocale: "tr_TR",
      skip: "İçeriğe atla",
      navAria: "Ana menü",
      langBtnAria: "Dili İngilizceye çevir",
      menuAria: "Menüyü aç/kapat",
      paletteAria: "Komut paleti",
      skill: "ara / komut",
      message: "Mesaj at",
      about: "hakkımda",
      projects: "projeler",
      setup: "setup",
      terminal: "terminal",
      contact: "iletişim",
      heroHi: "selam, ben",
      heroDesc: "İnternette bir şeyler tasarlayan, kodlayan ve arada sırada bozan full-stack developer. Temiz kod severim ama kahvem kadar ciddi değilim.",
      ctaWork: "Yaptıklarıma bak",
      ctaGitHub: "GitHub'a ışınlan ↗",
      statExp: "yıl deneyim",
      statProj: "tamamlanan proje",
      statCoffee: "içilen kahve",
      heroStack: "TypeScript, React, Node.js ve bolca Ctrl+Z",
      city: "İstanbul",
      cardAddFriend: "Arkadaş ekle",
      cardAbout: "Hakkımda",
      cardAboutText: "Kafamdaki pikselleri ekrana koyuyorum. Bazen backend de yazıyorum. ☕",
      cardMember: "Üyelik tarihi",
      cardMemberText: "İnternetin eski ve güzel zamanları",
      badgeDev: "🎮 developer",
      badgeFounder: "⚔️ oirat kurucusu",
      badgeMusic: "🎧 tame impala enjoyer",
      badgeOwl: "🌙 night owl",
      buildBadgeTitle: "Build başarılı",
      buildBadgeText: "hiç şüphemiz yoktu",
      oiratBadgeText: "sunucu kurucusu",
      scrollHint: "kaydır",
      aboutHeading: "hakkımda",
      chanGenel: "# genel",
      chanKahve: "# kahve-molası",
      chanKod: "# kod-yardım",
      chanRadio: "🔊 tame impala radio",
      threadName: "MCD hakkında birkaç şey",
      chatTime1: "Bugün 14:32",
      chatTime2: "Bugün 14:33",
      chatTime3: "Bugün 14:35",
      chatMsg1: "Benim için iyi bir web sitesi sadece güzel görünen bir şey değil; hızlı, kolay ve kullanırken küçük sürprizler bırakan bir yer.",
      chatMsg2: "Uzmanlık alanları bulundu:",
      chatMsg3: "Bu arada Oirat'ın botlarını da ben yazıyorum — Moderation düzeni sağlıyor, Guard kapıda bekliyor. Sıradaki bot: belli olmaz 👀",
      chipFront: "Frontend büyüsü",
      chipBack: "Backend işleri",
      chipUI: "UI detayları",
      typingSuffix: "yazıyor...",
      onlineMembers: "Çevrimiçi — 3",
      memberMcdStatus: "VS Code",
      memberTsStatus: "hata buluyor",
      memberCoffeeStatus: "az kaldı",
      heatTitle: "Commit ısı haritası",
      heatSub: "son 52 hafta, gayet bilimsel",
      heatUnit: "commit",
      heatLow: "az",
      heatHigh: "çok",
      heatRest: "dinlenme günü",
      servicesHeading: "ne yapıyorum",
      svc1Title: "Web deneyimleri",
      svc1Text: "Hızlı, responsive ve karakteri olan landing page'ler ve portföyler.",
      svc2Title: "Bot & otomasyon",
      svc2Text: "Discord toplulukları için moderasyon, güvenlik ve iş akışı araçları.",
      svc3Title: "Ürünleştirme",
      svc3Text: "Fikri netleştirip çalışan, bakımı kolay ve ölçülebilir bir ürüne dönüştürme.",
      projectsHeading: "projeler",
      filterAll: "Tümü",
      filterBot: "Discord bot",
      filterWeb: "Web",
      filterTool: "Araç",
      countSuffix: "proje gösteriliyor",
      badgeActive: "DISCORD BOT · AKTİF",
      ghView: "GitHub'da gör ↗",
      detailsBtn: "Detaylar",
      p1LogTitle: "Moderasyon kaydı",
      p1LogText: "@troll42 susturuldu — sebep: spam · 10 dk",
      p1LogOk: "✓ log kanalına iletildi",
      p1Desc: "Oirat sunucusunun düzenini sağlayan bot: uyarı, susturma, otomatik kural ve detaylı log sistemi.",
      protActive: "KORUMA AKTİF",
      p2AntiRaid: "Anti-raid",
      p2AntiSpam: "Anti-spam",
      p2Fake: "Sahte hesap filtresi",
      p2On: "✓ açık",
      p2Desc: "Sunucuyu raid, spam ve sahte hesaplara karşı koruyan güvenlik botu. Uyumaz, kahve de içmez.",
      setupTitle: "Günün çoğu burada geçiyor.",
      setupDesc: "Karanlık tema, gereğinden fazla açık sekme ve arka planda dönüp duran bir playlist.",
      setupEditor: "Editör",
      setupDesign: "Tasarım",
      setupSound: "Ses",
      setupFuel: "Yakıt",
      setupFuelValue: "Kahve",
      npLabel: "Şu an çalıyor",
      termHint: "gerçekten çalışıyor, dene",
      termAria: "Terminal komutu",
      contactTitle: "Bir fikrin mi var? DM kutum açık.",
      contactDesc: "Web projesi, ilginç bir iş birliği ya da sadece selam vermek için yazabilirsin.",
      discordLink: "Discord'a gel ↗",
      copyBtn: "Kopyala",
      modalProblem: "Problem",
      modalSolution: "Çözüm",
      modalGitHub: "GitHub profilini aç ↗",
      modalCloseAria: "Proje detayını kapat",
      toTopAria: "Sayfanın başına dön",
      footerCopy: "İnternette sevgiyle kodlandı.",
      footerHint: "(psst: ↑↑↓↓←→←→BA · Ctrl+K)",
      tabAway: "gitme 🥺 — MCD",
      copyToast: "E-posta panoya kopyalandı ✨",
      refreshToast: "Discord durumu güncellendi ✨",
      partyOn: "Parti modu açıldı 🎉",
      partyOff: "Parti bitti, işe dönüyoruz 🧑‍💻",
      themeAria: "Tema:",
      themeToast: "Tema: {theme}",
      themeNight: "gece",
      themeContrast: "yüksek kontrast",
      themeSoft: "yumuşak",
      palettePh: "Komut yaz ya da ara...",
      paletteEmpty: "Hiçbir şey bulunamadı 🤷",
      modKicker: "Discord bot · aktif",
      modTitle: "Oirat Moderation",
      modDesc: "Oirat sunucusunun günlük düzenini görünmez bir yardımcı gibi ayakta tutan moderasyon sistemi.",
      modProblem: "Yoğun toplulukta kuralları hızlı ve tutarlı uygulamak.",
      modSolution: "Uyarı, susturma, otomatik kural ve detaylı log akışlarını tek bir botta birleştirmek.",
      modStatus: "● Aktif geliştirme",
      guardTitle: "Oirat Guard",
      guardDesc: "Raid, spam ve sahte hesaplara karşı sunucunun kapısında bekleyen güvenlik botu.",
      guardProblem: "Kötü niyetli girişleri moderatörlerden önce tespit etmek.",
      guardSolution: "Anti-raid, anti-spam ve sahte hesap filtrelerini Redis destekli hızlı kontrollerle çalıştırmak.",
      guardStatus: "● Koruma aktif",
      presOnline: "çevrimiçi",
      presIdle: "boşta",
      presDnd: "rahatsız etme modunda",
      presOffline: "çevrimdışı",
      contactOnline: "MCD şu an çevrimiçi",
      contactIdle: "MCD biraz boşta",
      contactDnd: "MCD meşgul, kapıyı vurma",
      contactOffline: "MCD şu an çevrimdışı",
      statuses: [
        "online, muhtemelen kod yazıyor",
        "bug ile pazarlık yapıyor",
        "kahve molasında (kısa sürer)",
        "commit mesajı düşünüyor",
        "dark mode'da felsefe yapıyor",
        "tab'ları kapatmayı reddediyor",
        "oirat'ta ortalığı sakinleştiriyor",
        "guard bot'a yeni numara öğretiyor",
      ],
      hintSection: "bölüm",
      hintAction: "aksiyon",
      hintLink: "link",
      hintTheme: "tema",
      hintLang: "dil",
      hintProject: "proje",
      hintFun: "eğlence",
      plAbout: "# hakkımda bölümüne git",
      plProjects: "# projeler bölümüne git",
      plSetup: "# setup bölümüne git",
      plTerminal: "# terminal bölümüne git",
      plContact: "# iletişim bölümüne git",
      plServices: "Hizmetler bölümüne git",
      plTop: "Sayfanın başına dön",
      plCopyEmail: "E-postayı kopyala",
      plGitHub: "GitHub profilini aç (mcd4hell)",
      plDiscord: "Discord'a ışınlan (Oirat)",
      plRefresh: "Discord durumunu yenile",
      plNight: "Gece temasına geç",
      plContrast: "Yüksek kontrast temasına geç",
      plSoft: "Yumuşak temaya geç",
      plTR: "Türkçeye geç",
      plEN: "Switch to English",
      plMod: "Oirat Moderation detaylarını aç",
      plGuard: "Oirat Guard detaylarını aç",
      plConfetti: "Konfeti patlat",
      plParty: "Parti modunu aç/kapat",
      termWelcome: "MCD terminaline hoş geldin. 'help' yazarak başla.",
      termHelpCmd: "komutlar: whoami · projects · filter <tümü|bot> · stack · lang <tr|en> · services · theme · oirat · github · setup · contact · coffee · party · ls · date · echo <mesaj> · clear",
      termWhoami: "MCD (mcd4hell) — full-stack developer, Oirat kurucusu. TypeScript sever, bug'larla pazarlık eder.",
      termProjects1: "• Oirat Moderation — Oirat sunucusunun düzen botu (uyarı, susturma, log)",
      termProjects2: "• Oirat Guard      — anti-raid & anti-spam güvenlik botu",
      termRest: "gerisi gizli-planlar/ klasöründe 🤫",
      termFilterUsage: "kullanım: filter tümü | bot | web | araç",
      termFilterSet: "proje filtresi: {v}",
      termStack: "TypeScript · React · Next.js · Node.js · Tailwind · PostgreSQL · Docker",
      termOirat1: "⚔️ Oirat — MCD'nin Discord sunucusu.",
      termOirat2: "Moderation bot düzeni sağlar, Guard bot kapıda bekler. İkisi de burada yazıldı.",
      termGitHub: "github.com/mcd4hell açılıyor...",
      termSetup: "VS Code + Tailwind + Tame Impala + kahve. Denenmiş, onaylanmış.",
      termServices: "web deneyimleri · bot & otomasyon · ürünleştirme",
      termThemeUsage: "kullanım: theme gece | kontrast | yumuşak",
      termThemeSet: "tema: {v}",
      termAbout: "MCD — full-stack developer, Oirat kurucusu. Temiz kod, küçük sürprizler.",
      termContact: "mcdinspace@gmail.com — DM kutusu her zaman açık.",
      termCoffee: "☕ demleniyor... tamamdır. Verimlilik +%12.",
      termPartyOn: "🎉 parti modu: AÇIK",
      termPartyOff: "parti modu: kapalı. işe dönüyoruz.",
      termLs: "projeler/  setup/  gizli-planlar/  bitmemis-yan-projeler/  (247 öğe)",
      termSudo: "Güzel deneme. Burada root benim. 😎",
      termExit: "Buradan çıkış yok, kaydırmaya devam. 🙃",
      termUnknown: "komut bulunamadı: {cmd} — 'help' dene",
    },
    en: {
      metaTitle: "MCD — full-stack developer",
      metaDesc: "MCD's corner of code, design and the internet. Fast, playful web experiences with TypeScript, React and Node.js.",
      ogLocale: "en_US",
      skip: "Skip to content",
      navAria: "Main menu",
      langBtnAria: "Switch language to Turkish",
      menuAria: "Open/close menu",
      paletteAria: "Command palette",
      skill: "search / commands",
      message: "Send a message",
      about: "about",
      projects: "projects",
      setup: "setup",
      terminal: "terminal",
      contact: "contact",
      heroHi: "hey, I'm",
      heroDesc: "A full-stack developer who designs, codes and occasionally breaks things on the internet. I love clean code, but I'm not as serious as my coffee.",
      ctaWork: "See my work",
      ctaGitHub: "Beam me to GitHub ↗",
      statExp: "years of experience",
      statProj: "projects completed",
      statCoffee: "coffees drank",
      heroStack: "TypeScript, React, Node.js and plenty of Ctrl+Z",
      city: "Istanbul",
      cardAddFriend: "Add friend",
      cardAbout: "About me",
      cardAboutText: "Putting the pixels in my head on screen. I write backend sometimes too. ☕",
      cardMember: "Member since",
      cardMemberText: "The good old days of the internet",
      badgeDev: "🎮 developer",
      badgeFounder: "⚔️ oirat founder",
      badgeMusic: "🎧 tame impala enjoyer",
      badgeOwl: "🌙 night owl",
      buildBadgeTitle: "Build successful",
      buildBadgeText: "we never doubted it",
      oiratBadgeText: "server founder",
      scrollHint: "scroll",
      aboutHeading: "about",
      chanGenel: "# general",
      chanKahve: "# coffee-break",
      chanKod: "# code-help",
      chanRadio: "🔊 tame impala radio",
      threadName: "a few things about MCD",
      chatTime1: "Today 14:32",
      chatTime2: "Today 14:33",
      chatTime3: "Today 14:35",
      chatMsg1: "For me, a good website isn't just something that looks nice; it's a place that's fast, easy and leaves little surprises while you use it.",
      chatMsg2: "Specialties found:",
      chatMsg3: "By the way, I also write Oirat's bots — Moderation keeps order, Guard stands at the gate. Next bot: who knows 👀",
      chipFront: "Frontend magic",
      chipBack: "Backend work",
      chipUI: "UI details",
      typingSuffix: "is typing...",
      onlineMembers: "Online — 3",
      memberMcdStatus: "VS Code",
      memberTsStatus: "finding bugs",
      memberCoffeeStatus: "running low",
      heatTitle: "Commit heatmap",
      heatSub: "last 52 weeks, very scientific",
      heatUnit: "commits",
      heatLow: "less",
      heatHigh: "more",
      heatRest: "rest day",
      servicesHeading: "what I do",
      svc1Title: "Web experiences",
      svc1Text: "Fast, responsive landing pages and portfolios with a character of their own.",
      svc2Title: "Bots & automation",
      svc2Text: "Moderation, security and workflow tools for Discord communities.",
      svc3Title: "Productization",
      svc3Text: "Turning an idea into a working, maintainable and measurable product.",
      projectsHeading: "projects",
      filterAll: "All",
      filterBot: "Discord bot",
      filterWeb: "Web",
      filterTool: "Tools",
      countSuffix: "projects shown",
      badgeActive: "DISCORD BOT · ACTIVE",
      ghView: "View on GitHub ↗",
      detailsBtn: "Details",
      p1LogTitle: "Moderation log",
      p1LogText: "@troll42 muted — reason: spam · 10 min",
      p1LogOk: "✓ forwarded to log channel",
      p1Desc: "The bot keeping Oirat's server in order: warnings, mutes, auto rules and a detailed logging system.",
      protActive: "PROTECTION ACTIVE",
      p2AntiRaid: "Anti-raid",
      p2AntiSpam: "Anti-spam",
      p2Fake: "Fake account filter",
      p2On: "✓ on",
      p2Desc: "A security bot guarding the server against raids, spam and fake accounts. Never sleeps, doesn't drink coffee either.",
      setupTitle: "Most of the day happens here.",
      setupDesc: "A dark theme, way too many open tabs and a playlist going in the background.",
      setupEditor: "Editor",
      setupDesign: "Design",
      setupSound: "Sound",
      setupFuel: "Fuel",
      setupFuelValue: "Coffee",
      npLabel: "Now playing",
      termHint: "it actually works, try it",
      termAria: "Terminal command",
      contactTitle: "Got an idea? My DMs are open.",
      contactDesc: "Write to me for a web project, an interesting collaboration, or just to say hi.",
      discordLink: "Join on Discord ↗",
      copyBtn: "Copy",
      modalProblem: "Problem",
      modalSolution: "Solution",
      modalGitHub: "Open GitHub profile ↗",
      modalCloseAria: "Close project details",
      toTopAria: "Back to top",
      footerCopy: "Coded with love on the internet.",
      footerHint: "(psst: ↑↑↓↓←→←→BA · Ctrl+K)",
      tabAway: "don't go 🥺 — MCD",
      copyToast: "Email copied to clipboard ✨",
      refreshToast: "Discord status updated ✨",
      partyOn: "Party mode on 🎉",
      partyOff: "Party over, back to work 🧑‍💻",
      themeAria: "Theme:",
      themeToast: "Theme: {theme}",
      themeNight: "night",
      themeContrast: "high contrast",
      themeSoft: "soft",
      palettePh: "Type a command or search...",
      paletteEmpty: "Nothing found 🤷",
      modKicker: "Discord bot · active",
      modTitle: "Oirat Moderation",
      modDesc: "The moderation system keeping Oirat's server running like an invisible helper.",
      modProblem: "Enforcing rules quickly and consistently in a busy community.",
      modSolution: "Combining warnings, mutes, auto rules and detailed log flows into a single bot.",
      modStatus: "● Active development",
      guardTitle: "Oirat Guard",
      guardDesc: "The security bot standing at the server's gate against raids, spam and fake accounts.",
      guardProblem: "Detecting malicious entries before moderators do.",
      guardSolution: "Running anti-raid, anti-spam and fake account filters with fast Redis-backed checks.",
      guardStatus: "● Protection active",
      presOnline: "online",
      presIdle: "idle",
      presDnd: "do-not-disturb",
      presOffline: "offline",
      contactOnline: "MCD is online right now",
      contactIdle: "MCD is idle for a bit",
      contactDnd: "MCD is busy, don't knock",
      contactOffline: "MCD is offline right now",
      statuses: [
        "online, probably writing code",
        "negotiating with a bug",
        "on a coffee break (won't last)",
        "thinking of a commit message",
        "philosophizing in dark mode",
        "refusing to close tabs",
        "calming things down on Oirat",
        "teaching the guard bot new tricks",
      ],
      hintSection: "section",
      hintAction: "action",
      hintLink: "link",
      hintTheme: "theme",
      hintLang: "language",
      hintProject: "project",
      hintFun: "fun",
      plAbout: "# go to about section",
      plProjects: "# go to projects section",
      plSetup: "# go to setup section",
      plTerminal: "# go to terminal section",
      plContact: "# go to contact section",
      plServices: "Go to services section",
      plTop: "Back to top",
      plCopyEmail: "Copy email",
      plGitHub: "Open GitHub profile (mcd4hell)",
      plDiscord: "Beam to Discord (Oirat)",
      plRefresh: "Refresh Discord status",
      plNight: "Switch to night theme",
      plContrast: "Switch to high contrast theme",
      plSoft: "Switch to soft theme",
      plTR: "Switch to Turkish",
      plEN: "Switch to English",
      plMod: "Open Oirat Moderation details",
      plGuard: "Open Oirat Guard details",
      plConfetti: "Fire confetti",
      plParty: "Toggle party mode",
      termWelcome: "Welcome to the MCD terminal. Type 'help' to start.",
      termHelpCmd: "commands: whoami · projects · filter <all|bot> · stack · lang <tr|en> · services · theme · oirat · github · setup · contact · coffee · party · ls · date · echo <message> · clear",
      termWhoami: "MCD (mcd4hell) — full-stack developer, founder of Oirat. Loves TypeScript, negotiates with bugs.",
      termProjects1: "• Oirat Moderation — Oirat's server discipline bot (warn, mute, log)",
      termProjects2: "• Oirat Guard      — anti-raid & anti-spam security bot",
      termRest: "the rest is in the secret-plans/ folder 🤫",
      termFilterUsage: "usage: filter all | bot | web | tool",
      termFilterSet: "project filter: {v}",
      termStack: "TypeScript · React · Next.js · Node.js · Tailwind · PostgreSQL · Docker",
      termOirat1: "⚔️ Oirat — MCD's Discord server.",
      termOirat2: "The Moderation bot keeps order, the Guard bot stands at the gate. Both were written here.",
      termGitHub: "opening github.com/mcd4hell...",
      termSetup: "VS Code + Tailwind + Tame Impala + coffee. Tried and approved.",
      termServices: "web experiences · bots & automation · productization",
      termThemeUsage: "usage: theme night | contrast | soft",
      termThemeSet: "theme: {v}",
      termAbout: "MCD — full-stack developer, founder of Oirat. Clean code, little surprises.",
      termContact: "mcdinspace@gmail.com — DMs always open.",
      termCoffee: "☕ brewing... done. Productivity +12%.",
      termPartyOn: "🎉 party mode: ON",
      termPartyOff: "party mode: off. back to work.",
      termLs: "projects/  setup/  secret-plans/  unfinished-side-projects/  (247 items)",
      termSudo: "Nice try. I'm root here. 😎",
      termExit: "No exit here, keep scrolling. 🙃",
      termUnknown: "command not found: {cmd} — try 'help'",
    },
  };

  const lang = () => (root.lang === "en" ? "en" : "tr");
  const t = (key) => {
    const copy = i18n[lang()];
    return key in copy ? copy[key] : i18n.tr[key];
  };

  /* ------------------------------------------------------------
     Dil sistemi
  ------------------------------------------------------------ */
  const languageButton = $("#language-button");
  const mobileLanguageButton = $("#mobile-language-button");
  const SECTION_KEYS = new Set(["about", "projects", "setup", "terminal", "contact"]);
  let baseTitle = doc.title;
  let clockFmt = new Intl.DateTimeFormat(lang() === "tr" ? "tr-TR" : "en-US", { hour: "2-digit", minute: "2-digit" });

  const setLanguage = (language) => {
    const next = language === "en" ? "en" : "tr";
    root.lang = next;
    try { localStorage.setItem("mcd-language", next); } catch {}

    doc.title = t("metaTitle");
    baseTitle = doc.title;
    $("meta[name='description']")?.setAttribute("content", t("metaDesc"));
    $("meta[property='og:description']")?.setAttribute("content", t("metaDesc"));
    $("meta[property='og:locale']")?.setAttribute("content", t("ogLocale"));
    $("meta[property='og:title']")?.setAttribute("content", t("metaTitle"));
    $("meta[name='twitter:title']")?.setAttribute("content", t("metaTitle"));
    $("meta[name='twitter:description']")?.setAttribute("content", t("metaDesc"));

    $$("[data-i18n]").forEach((el) => {
      const text = t(el.dataset.i18n);
      if (SECTION_KEYS.has(el.dataset.i18n) && (el.classList.contains("nav-link") || el.classList.contains("mobile-link"))) el.textContent = `# ${text}`;
      else el.textContent = text;
    });
    $$("[data-i18n-placeholder]").forEach((el) => { if (el.dataset.i18nPlaceholder) el.setAttribute("placeholder", t(el.dataset.i18nPlaceholder)); });
    $$("[data-i18n-aria]").forEach((el) => { if (el.dataset.i18nAria) el.setAttribute("aria-label", t(el.dataset.i18nAria)); });

    $$(".language-option").forEach((option, i) => option.classList.toggle("is-active", next === "tr" ? i === 0 : i === 1));

    clockFmt = new Intl.DateTimeFormat(next === "tr" ? "tr-TR" : "en-US", { hour: "2-digit", minute: "2-digit" });
    $("#local-clock") && ( $("#local-clock").textContent = clockFmt.format(new Date()) );

    if (projectCountEl) projectCountEl.textContent = `${shownCount} ${t("countSuffix")}`;
    startStatusTyping();
    syncPresence();
    if (palette && !palette.classList.contains("hidden") && paletteInput) {
      paletteInput.setAttribute("placeholder", t("palettePh"));
      renderPalette();
    }
  };

  const toggleLanguage = () => setLanguage(lang() === "tr" ? "en" : "tr");
  languageButton?.addEventListener("click", toggleLanguage);
  mobileLanguageButton?.addEventListener("click", toggleLanguage);

  /* ---------- Tema tercihi ---------- */
  const THEMES = ["night", "contrast", "soft"];
  const themeButton = $("#theme-button");
  const savedTheme = (() => { try { return localStorage.getItem("mcd-theme"); } catch { return null; } })();
  const setTheme = (theme) => {
    const next = THEMES.includes(theme) ? theme : "night";
    root.dataset.theme = next;
    try { localStorage.setItem("mcd-theme", next); } catch {}
    const icon = next === "soft" ? "☼" : next === "contrast" ? "◑" : "◐";
    if (themeButton) {
      themeButton.textContent = icon;
      themeButton.setAttribute("aria-label", `${t("themeAria")} ${t(next === "night" ? "themeNight" : next === "contrast" ? "themeContrast" : "themeSoft")}`);
    }
  };
  setTheme(savedTheme || "night");
  themeButton?.addEventListener("click", () => {
    const next = THEMES[(THEMES.indexOf(root.dataset.theme) + 1) % THEMES.length];
    setTheme(next);
    toast(t("themeToast").replace("{theme}", t(next === "night" ? "themeNight" : next === "contrast" ? "themeContrast" : "themeSoft")));
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
  const revealEls = $$("[data-reveal]");

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
  const counters = $$("[data-count]");

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

  $$("[data-scramble]").forEach((el) => {
    scramble(el);
    el.addEventListener("pointerenter", () => scramble(el));
  });

  /* ---------- Hero durumu: daktilo efekti (dile duyarlı) ---------- */
  const statusEl = $("#hero-status");
  let statusTimer = 0;
  let statusVersion = 0;

  const startStatusTyping = () => {
    if (!statusEl) return;
    const version = ++statusVersion;
    clearTimeout(statusTimer);
    const list = i18n[lang()].statuses;

    if (reduceMotion) {
      statusEl.textContent = list[0];
      return;
    }

    let si = 0;
    let ci = 0;
    let deleting = false;

    const type = () => {
      if (version !== statusVersion) return;
      const text = list[si];
      ci += deleting ? -1 : 1;
      statusEl.textContent = text.slice(0, ci);

      let delay = deleting ? 26 : 46;
      if (!deleting && ci === text.length) {
        delay = 2600;
        deleting = true;
      } else if (deleting && ci === 0) {
        deleting = false;
        si = (si + 1) % list.length;
        delay = 400;
      }
      if (version === statusVersion) statusTimer = setTimeout(type, delay);
    };

    type();
  };

  /* ---------- Profil kartında canlı saat ---------- */
  const clockEl = $("#local-clock");

  const tickClock = () => {
    if (clockEl) clockEl.textContent = clockFmt.format(new Date());
  };
  tickClock();
  setInterval(tickClock, 15000);

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
    $$("[data-tilt]").forEach((card) => {
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
    $$("[data-magnetic]").forEach((btn) => {
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

  $$("[data-confetti]").forEach((el) => {
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
  $$("[data-copy]").forEach((el) => {
    el.addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(el.dataset.copy);
        toast(t("copyToast"));
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
    moderation: { kicker: "modKicker", title: "modTitle", description: "modDesc", problem: "modProblem", solution: "modSolution", tags: ["Discord.js", "Node.js", "MongoDB"], status: "modStatus" },
    guard: { kicker: "modKicker", title: "guardTitle", description: "guardDesc", problem: "guardProblem", solution: "guardSolution", tags: ["Discord.js", "TypeScript", "Redis"], status: "guardStatus" },
  };
  const modalFields = { kicker: $("#project-modal-kicker"), title: $("#project-modal-title"), description: $("#project-modal-description"), problem: $("#project-modal-problem"), solution: $("#project-modal-solution"), tags: $("#project-modal-tags"), status: $("#project-modal-status") };
  let lastProjectTrigger = null;
  const closeProjectModal = () => { projectModal?.classList.add("hidden"); projectModal?.classList.remove("flex"); lastProjectTrigger?.focus(); };
  const openProjectModal = (key, trigger) => {
    const data = projectData[key];
    if (!projectModal || !data) return;
    lastProjectTrigger = trigger;
    Object.entries(modalFields).forEach(([field, el]) => {
      if (field !== "tags" && el) el.textContent = t(data[field]);
    });
    if (modalFields.tags) {
      modalFields.tags.innerHTML = "";
      data.tags.forEach((tag) => {
        const el = doc.createElement("span");
        el.className = "rounded-lg bg-mint/15 px-3 py-2 text-xs text-mint";
        el.textContent = tag;
        modalFields.tags.append(el);
      });
    }
    projectModal.classList.remove("hidden"); projectModal.classList.add("flex");
    $("#project-modal-close")?.focus();
  };
  $$(".project-details").forEach((button) => button.addEventListener("click", () => openProjectModal(button.dataset.project, button)));
  $("#project-modal-close")?.addEventListener("click", closeProjectModal);
  $("#project-modal-backdrop")?.addEventListener("click", closeProjectModal);
  addEventListener("keydown", (e) => { if (e.key === "Escape" && projectModal && !projectModal.classList.contains("hidden")) closeProjectModal(); });

  /* ---------- Proje filtreleri ---------- */
  const projectFilters = $$("[data-filter]");
  const projectCards = $$('[data-project-category]');
  const projectCountEl = $("#project-count");
  let shownCount = projectCards.length || 2;

  if (projectFilters.length && projectCards.length) {
    const applyFilter = (filter) => {
      let visible = 0;
      projectFilters.forEach((button) => {
        const a = button.dataset.filter === filter;
        button.classList.toggle("is-active", a);
        button.setAttribute("aria-pressed", String(a));
      });
      projectCards.forEach((card) => {
        const show = filter === "all" || card.dataset.projectCategory === filter;
        card.classList.toggle("is-filtered-out", !show);
        card.setAttribute("aria-hidden", String(!show));
        if (show) visible++;
      });
      shownCount = visible;
      if (projectCountEl) projectCountEl.textContent = `${visible} ${t("countSuffix")}`;
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
    toast(doc.body.classList.contains("party") ? t("partyOn") : t("partyOff"));
  });

  /* ---------- Komut paleti (Ctrl+K) ---------- */
  const palette = $("#palette");
  const paletteInput = $("#palette-input");
  const paletteList = $("#palette-list");

  if (palette && paletteInput && paletteList) {
    const norm = (s) => s.toLocaleLowerCase("en-US");
    const goTo = (sel) => $(sel)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });

    const buildActions = () => [
      { label: t("plAbout"), hint: t("hintSection"), run: () => goTo("#about") },
      { label: t("plProjects"), hint: t("hintSection"), run: () => goTo("#projects") },
      { label: t("plSetup"), hint: t("hintSection"), run: () => goTo("#setup") },
      { label: t("plTerminal"), hint: t("hintSection"), run: () => goTo("#terminal") },
      { label: t("plContact"), hint: t("hintSection"), run: () => goTo("#contact") },
      { label: t("plServices"), hint: t("hintSection"), run: () => goTo("#services") },
      { label: t("plTop"), hint: t("hintSection"), run: () => scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }) },
      {
        label: t("plCopyEmail"),
        hint: t("hintAction"),
        run: async () => {
          try {
            await navigator.clipboard.writeText("mcdinspace@gmail.com");
            toast(t("copyToast"));
          } catch {
            location.href = "mailto:mcdinspace@gmail.com";
          }
        },
      },
      { label: t("plGitHub"), hint: t("hintLink"), run: () => open("https://github.com/mcd4hell", "_blank", "noopener") },
      { label: t("plDiscord"), hint: t("hintLink"), run: () => open("https://discord.gg/oirat", "_blank", "noopener") },
      { label: t("plRefresh"), hint: t("hintAction"), run: () => { fetchLanyard(); toast(t("refreshToast")); } },
      { label: t("plNight"), hint: t("hintTheme"), run: () => setTheme("night") },
      { label: t("plContrast"), hint: t("hintTheme"), run: () => setTheme("contrast") },
      { label: t("plSoft"), hint: t("hintTheme"), run: () => setTheme("soft") },
      { label: t("plTR"), hint: t("hintLang"), run: () => setLanguage("tr") },
      { label: t("plEN"), hint: t("hintLang"), run: () => setLanguage("en") },
      { label: t("plMod"), hint: t("hintProject"), run: () => openProjectModal("moderation") },
      { label: t("plGuard"), hint: t("hintProject"), run: () => openProjectModal("guard") },
      { label: t("plConfetti"), hint: t("hintFun"), run: () => burst(innerWidth / 2, innerHeight / 3, 20) },
      {
        label: t("plParty"),
        hint: t("hintFun"),
        run: () => {
          doc.body.classList.toggle("party");
          burst(innerWidth / 2, innerHeight / 2, 26);
          toast(doc.body.classList.contains("party") ? t("partyOn") : t("partyOff"));
        },
      },
    ];

    let filtered = buildActions();
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

    const renderPalette = () => {
      paletteList.innerHTML = "";
      if (!filtered.length) {
        const li = doc.createElement("li");
        li.className = "px-3 py-6 text-center text-muted";
        li.textContent = t("paletteEmpty");
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
      filtered = buildActions();
      active = 0;
      renderPalette();
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
      filtered = q ? buildActions().filter((a) => norm(a.label).includes(q)) : buildActions();
      active = 0;
      renderPalette();
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

  /* ---------- İnteraktif terminal (dile duyarlı) ---------- */
  const termIn = $("#term-in");
  const termOut = $("#term-out");
  const termBody = $("#term-body");
  let bootTerminal = null;

  if (termIn && termOut && termBody) {
    const print = (text, cls = "") => {
      const line = doc.createElement("div");
      if (cls) line.className = cls;
      line.textContent = text;
      termOut.append(line);
      termBody.scrollTop = termBody.scrollHeight;
    };

    const COMMANDS = {
      help: () => print(t("termHelpCmd"), "text-muted"),
      whoami: () => print(t("termWhoami")),
      projects: () => {
        print(t("termProjects1"));
        print(t("termProjects2"));
        print(t("termRest"), "text-muted");
      },
      filter: (value) => {
        const aliases = { tümü: "all", all: "all", bot: "bot", web: "web", araç: "tool", tool: "tool" };
        const key = aliases[value?.toLocaleLowerCase("tr-TR") || "all"];
        const button = key && $(`[data-filter="${key}"]`);
        if (button) {
          button.click();
          print(t("termFilterSet").replace("{v}", value || key));
        } else print(t("termFilterUsage"), "text-muted");
      },
      stack: () => print(t("termStack")),
      oirat: () => {
        print(t("termOirat1"));
        print(t("termOirat2"));
      },
      github: () => {
        print(t("termGitHub"));
        open("https://github.com/mcd4hell", "_blank", "noopener");
      },
      setup: () => print(t("termSetup")),
      services: () => print(t("termServices")),
      lang: (value) => setLanguage(value?.toLocaleLowerCase("tr-TR") === "en" ? "en" : "tr"),
      theme: (value) => {
        const aliases = { gece: "night", night: "night", kontrast: "contrast", contrast: "contrast", yumuşak: "soft", soft: "soft" };
        const next = aliases[value?.toLocaleLowerCase("tr-TR") || ""];
        if (next) {
          setTheme(next);
          print(t("termThemeSet").replace("{v}", t(next === "night" ? "themeNight" : next === "contrast" ? "themeContrast" : "themeSoft")));
        } else print(t("termThemeUsage"), "text-muted");
      },
      about: () => print(t("termAbout")),
      contact: () => print(t("termContact")),
      coffee: () => {
        print(t("termCoffee"));
        burst(innerWidth / 2, innerHeight / 2, 10);
      },
      party: () => {
        doc.body.classList.toggle("party");
        print(doc.body.classList.contains("party") ? t("termPartyOn") : t("termPartyOff"));
      },
      ls: () => print(t("termLs")),
      date: () => print(new Date().toLocaleString(lang() === "tr" ? "tr-TR" : "en-US")),
      clear: () => {
        termOut.innerHTML = "";
      },
      sudo: () => print(t("termSudo"), "text-red-300"),
      exit: () => print(t("termExit"), "text-muted"),
    };

    bootTerminal = () => print(t("termWelcome"), "text-muted");

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
      else print(t("termUnknown").replace("{cmd}", cmd), "text-red-300");
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
        const label = commits ? `${commits} ${t("heatUnit")}` : t("heatRest");
        cell.title = label;
        cell.setAttribute("aria-label", label);
        cell.setAttribute("role", "img");
        frag.append(cell);
      }
    }

    contrib.append(frag);
    if (totalEl) totalEl.textContent = total.toLocaleString(lang() === "tr" ? "tr-TR" : "en-US");
  }

  /* ---------- Şu an çalıyor (Lanyard canlı verisi ya da demo) ---------- */
  const npTrack = $("#np-track");
  const npBar = $("#np-bar");
  const spotifyProgressEl = $("#spotify-progress");
  const spotifyElapsedEl = $("#spotify-elapsed");
  const spotifyTotalEl = $("#spotify-total");
  const TRACKS = [
    "Tame Impala — The Less I Know The Better",
    "Tame Impala — Let It Happen",
    "Tame Impala — Borderline",
    "Daft Punk — Something About Us",
    "Mac DeMarco — Chamber of Reflection",
  ];

  if (npTrack && npBar) {
    if (reduceMotion) {
      npBar.style.width = "40%";
    } else {
      const DUR = 24000;
      let ti = 0;
      let npStart = performance.now();

      const tick = (now) => {
        const sp = lanyard?.spotify;
        if (sp && sp.timestamps && sp.timestamps.start && sp.timestamps.end) {
          const p = (now - sp.timestamps.start) / (sp.timestamps.end - sp.timestamps.start);
          npBar.style.width = `${Math.min(Math.max(p, 0), 1) * 100}%`;
          npTrack.textContent = `🎵 ${sp.song} — ${sp.artist}`;
          if (spotifyProgressEl && spotifyElapsedEl && spotifyTotalEl) {
            spotifyProgressEl.style.width = `${Math.min(Math.max(p, 0), 1) * 100}%`;
            const fmtTime = (ms) => `${Math.floor(ms / 60000)}:${String(Math.floor((ms % 60000) / 1000)).padStart(2, "0")}`;
            spotifyElapsedEl.textContent = fmtTime(Math.max(now - sp.timestamps.start, 0));
            spotifyTotalEl.textContent = fmtTime(Math.max(sp.timestamps.end - sp.timestamps.start, 0));
          }
        } else {
          let p = (now - npStart) / DUR;
          if (p >= 1) {
            npStart = now;
            p = 0;
            ti = (ti + 1) % TRACKS.length;
            if (!lanyard?.spotify) npTrack.textContent = TRACKS[ti];
          }
          npBar.style.width = `${(p % 1) * 100}%`;
        }
        requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    }
  }

  /* ---------- Lanyard: canlı Discord durumu ---------- */
  const LANYARD_ID = "1028208350489485322";
  let lanyard = null;
  let lanyardRefreshing = false;

  const lanyardEnabled = () => LANYARD_ID !== "REPLACE_WITH_YOUR_DISCORD_USER_ID";

  const fetchLanyard = async () => {
    if (!lanyardEnabled() || lanyardRefreshing) return;
    lanyardRefreshing = true;
    try {
      const res = await fetch(`https://api.lanyard.rest/v1/users/${LANYARD_ID}`, { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        lanyard = json && json.data ? json.data : null;
        syncPresence();
      }
    } catch { /* sessizce geç */ }
    lanyardRefreshing = false;
  };

  const syncPresence = () => {
    const status = lanyard ? (lanyard.discord_status || "offline") : "online";
    const label = { online: t("presOnline"), idle: t("presIdle"), dnd: t("presDnd"), offline: t("presOffline") }[status] || status;

    $$("[data-presence]").forEach((el) => { el.dataset.presence = status; });

    const spotify = lanyard?.spotify;
    const activity = (lanyard?.activities || []).find((a) => a && a.type !== 4);

    const presenceText = $("#presence-text");
    if (presenceText) {
      if (spotify) presenceText.textContent = label;
      else if (activity) presenceText.textContent = `${activity.emoji?.name || "🎮"} ${activity.name}`;
      else presenceText.textContent = label;
    }

    const contactText = $("#contact-presence-text");
    if (contactText) contactText.textContent = t(status === "online" ? "contactOnline" : status === "idle" ? "contactIdle" : status === "dnd" ? "contactDnd" : "contactOffline");

    const memberStatus = $("#member-mcd-status");
    if (memberStatus) {
      if (spotify) memberStatus.textContent = `🎧 ${spotify.song}`;
      else if (activity) memberStatus.textContent = activity.name;
      else memberStatus.textContent = t("memberMcdStatus");
    }

    /* Discord kartı: gerçek profil verisi (avatar, isim, bio, üyelik tarihi) */
    const user = lanyard?.discord_user || null;

    const avatarEl = $("#discord-avatar");
    if (avatarEl && user && user.avatar) {
      const ext = user.avatar.startsWith("a_") ? "gif" : "png";
      avatarEl.src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=256`;
    }

    const nameEl = $("#discord-name");
    if (nameEl && user) nameEl.textContent = user.global_name || user.display_name || user.username || nameEl.textContent;

    const usernameEl = $("#discord-username");
    if (usernameEl && user) {
      const tag = user.discriminator && user.discriminator !== "0" ? `${user.username}#${user.discriminator}` : user.username;
      usernameEl.textContent = tag || usernameEl.textContent;
    }

    const guildTagEl = $("#discord-guild-tag");
    if (guildTagEl && user) {
      const guildTag = user.primary_guild?.tag;
      if (guildTag) {
        guildTagEl.textContent = guildTag;
        guildTagEl.classList.remove("hidden");
      } else {
        guildTagEl.classList.add("hidden");
      }
    }

    const customEl = $("#discord-custom-status");
    if (customEl) {
      const custom = (lanyard?.activities || []).find((a) => a && a.type === 4);
      if (custom && custom.state) {
        customEl.textContent = `${custom.emoji?.name || ""} ${custom.state}`.trim();
        customEl.classList.remove("hidden");
      } else {
        customEl.classList.add("hidden");
      }
    }

    const bioEl = $("#discord-bio");
    if (bioEl) {
      const realBio = (user && (user.bio || lanyard.bio)) || "";
      if (realBio) bioEl.textContent = realBio;
    }

    const spotifyWidgetEl = $("#spotify-widget");
    if (spotifyWidgetEl) {
      if (spotify) {
        const albumArtEl = $("#spotify-album-art");
        if (albumArtEl) albumArtEl.src = spotify.album_art_url || "";
        const songEl = $("#spotify-song");
        if (songEl) songEl.textContent = spotify.song || "";
        const artistEl = $("#spotify-artist");
        if (artistEl) artistEl.textContent = spotify.artist || "";
        spotifyWidgetEl.classList.remove("hidden");
      } else {
        spotifyWidgetEl.classList.add("hidden");
      }
    }

    const createdEl = $("#discord-created");
    if (createdEl) {
      let date = null;
      if (user) {
        if (user.created_at) date = new Date(user.created_at);
        else if (user.id) date = new Date(user.id / 4194304 + 1420070400000);
      }
      const fmt = date && !isNaN(date) ? new Intl.DateTimeFormat(lang() === "tr" ? "tr-TR" : "en-US", { dateStyle: "long" }).format(date) : t("cardMemberText");
      createdEl.textContent = fmt;
    }

    const bannerEl = $("#discord-banner");
    if (bannerEl && user) {
      if (user.banner) {
        const ext = user.banner.startsWith("a_") ? "gif" : "png";
        bannerEl.style.backgroundImage = `url(https://cdn.discordapp.com/banners/${user.id}/${user.banner}.${ext}?size=512)`;
      } else if (user.banner_color) {
        bannerEl.style.background = user.banner_color;
      }
    }

    if (npTrack && spotify) npTrack.textContent = `🎵 ${spotify.song} — ${spotify.artist}`;
  };

  /* ---------- Sekme başlığı ---------- */
  doc.addEventListener("visibilitychange", () => {
    doc.title = doc.hidden ? t("tabAway") : baseTitle;
  });

  /* ---------- Konsol imzası ---------- */
  console.log(
    "%c MCD.dev %c selam, kaynağa bakan meraklı 👀 — ↑↑↓↓←→←→BA dene ",
    "background:#58f2aa;color:#04120b;font-weight:bold;border-radius:4px 0 0 4px;padding:4px 8px",
    "background:#161a26;color:#dbe0e6;border-radius:0 4px 4px 0;padding:4px 8px"
  );

  /* ---------- Başlangıç: dil + Lanyard ---------- */
  const savedLang = (() => { try { return localStorage.getItem("mcd-language"); } catch { return null; } })();
  setLanguage(savedLang || "tr");
  bootTerminal?.();
  fetchLanyard();
  setInterval(fetchLanyard, 60000);
  doc.addEventListener("visibilitychange", () => { if (!doc.hidden) fetchLanyard(); });
})();