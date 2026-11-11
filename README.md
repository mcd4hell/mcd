# MCD

Kişisel portföy sitem: projeler, botlar ve iletişim. Sade, hızlı ve SEO dostu tek sayfa.

**Canlı:** https://mcd4hell.github.io/mcd/

## Tasarım

- OLED siyah zemin (`#000`): OLED ekranlarda pikseller tamamen kapalı
- Hero'da WebGL ile çizilen sıvı cam damla: arkasındaki dev MCD yazısını kırarak büyütür, kenarlarında lila / nane / şeftali yansımalar, imleci takip eder. WebGL yoksa CSS ile çizilmiş bir cam yedekte durur
- Öne çıkan proje (Yaprak Doktoru) gerçek ekran görüntüsüyle, diğerleri ince çizgili bir liste
- Yazılar: Anybody (geniş, değişken başlık fontu) ve Hanken Grotesk, ikisi de sitede barındırılıyor ve Türkçe karakterli
- `prefers-reduced-motion` ve `prefers-reduced-transparency` desteklenir

## SEO

- Semantik HTML, tek `h1`, anlamlı başlık hiyerarşisi
- Açıklama, canonical, Open Graph ve Twitter kartı (`og.png`, 1200×630)
- JSON-LD: `Person`, `WebSite` ve projeler için `ItemList`
- `sitemap.xml`, `robots.txt`, `404.html`, web manifest
- Framework yok, CDN yok: bir CSS ve küçük bir JS dosyası

## Yapı

```
index.html        sayfa
styles.css        tüm stiller
main.js           WebGL cam damla, satır parıltısı, aktif menü
fonts/            Anybody + Hanken Grotesk (latin + latin-ext)
img/              proje ekran görüntüleri (WebP)
og.png            paylaşım görseli
favicon.svg, apple-touch-icon.png, site.webmanifest
robots.txt, sitemap.xml, 404.html
github-profile/   GitHub profil README kaynağı
```

## Çalıştırma

```bash
git clone https://github.com/mcd4hell/mcd.git
cd mcd
npx serve .
```

## Lisans

[MIT](LICENSE)
