# MCD

Kişisel portföy sitem: projeler, botlar ve iletişim. Sade, hızlı ve SEO dostu tek sayfa.

**Canlı:** https://mcd4hell.github.io/mcd/

## Tasarım

- Pastel renk havuzları üzerinde liquid glass yüzeyler (menü, iletişim paneli)
- Başlığın üstünde gezinen cam mercek: altındaki yazıyı büyütür, imleci takip eder. Her tarayıcıda (Safari ve iPhone dahil) aynı çalışır
- Tek yazı ailesi: Bricolage Grotesque (sitede barındırılan değişken font, Türkçe karakter desteğiyle)
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
main.js           mercek, kaydırma animasyonu, aktif menü (~5 KB)
fonts/            Bricolage Grotesque (latin + latin-ext)
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
