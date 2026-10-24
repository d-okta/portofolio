# EDD: Portofolio v2

## 1. Stack

| Bagian | Pilihan | Alasan |
|---|---|---|
| Build | Vite, multi-page (`build.rollupOptions.input`) | 4 halaman HTML nyata, tanpa router |
| Bahasa | TypeScript vanilla | Tidak butuh framework untuk 4 halaman statis |
| Gerak | `gsap` (ScrollTrigger, SplitText) | Pin, scrub, reveal teks |
| Scroll | `lenis` | Smooth scroll yang disinkronkan ke ScrollTrigger |
| 3D | `three`, di-import dinamis hanya di Beranda | Satu objek hero; tidak membebani halaman lain |
| Deploy | Vercel (static) | Sudah dipakai pemilik |

## 2. Struktur

```
portfolio-v2/
  index.html, programming/index.html, uiux/index.html, video/index.html
  src/
    main.ts        boot: i18n, nav, dialog proyek, video, motion
    motion.ts      Lenis + GSAP + transisi halaman
    hero3d.ts      scene Three.js (lazy)
    i18n.ts        kamus ID/EN untuk teks UI
    data/projects.ts  satu sumber data proyek
    styles.css
  public/img, public/video, public/fonts, public/cv.pdf
  media-src/       file video/foto asli (gitignored)
  scripts/assets.ps1  konversi ffmpeg (ulang-pakai)
```

## 3. Data

Konten kartu proyek ditulis langsung di HTML (terbaca tanpa JS, bagus untuk SEO). `projects.ts` hanya berisi detail panjang untuk dialog (deskripsi, fitur, stack, link), dicari lewat `data-id` kartu.

Teks dwibahasa: elemen pakai `data-i18n="key"`. Teks panjang dalam HTML punya dua span `lang="id"` / `lang="en"`; CSS menyembunyikan yang tidak aktif lewat `html[lang]`. Tidak ada `innerHTML` dari input pengguna.

## 4. Gerak

| Efek | Tempat | Fungsi | Reduced motion |
|---|---|---|---|
| Objek 3D kaca (icosahedron refraksi + aksen cobalt), ikut kursor & scroll | Hero Beranda | Titik fokus, identitas | Tidak dimuat; foto saja |
| Judul terbuka per baris (SplitText) | Judul utama tiap halaman | Hierarki | Tampil langsung |
| Foto hero terbuka dari bawah (`clip-path`) | Beranda | Fokus ke pemilik | Tampil langsung |
| Pintu bidang di-pin, tiap bidang bergeser masuk (scrub) | Beranda | Menceritakan 3 bidang berurutan | Daftar biasa |
| Parallax ringan gambar kartu | Grid karya | Kedalaman | Statis |
| Tirai cobalt saat pindah halaman | Semua link internal | Kontinuitas antar halaman | Navigasi biasa |
| Preview video jalan saat terlihat (IntersectionObserver) | Video | Hemat data/CPU | Poster saja |

Aturan: hanya `transform`, `opacity`, `clip-path`. Tidak ada listener `scroll` manual. Render loop Three.js berhenti saat hero tidak terlihat atau tab tersembunyi.

## 5. Aset

| Jenis | Proses | Target |
|---|---|---|
| Screenshot | ffmpeg ke WebP q80, lebar maks 1600 | < 200 KB |
| Foto profil | WebP 640 & 1120 | < 120 KB |
| Preview video | 8 s, 1280x720, tanpa audio, H.264 CRF 28 + poster WebP | < 3 MB |
| Video penuh | YouTube unlisted (pemilik upload) | - |
| Font | General Sans (Fontshare, lisensi gratis komersial) self-host woff2 | - |
| OG image | 1200x630 dari foto | < 150 KB |

## 6. Aksesibilitas

- Skip link, landmark, satu `h1` per halaman.
- `<dialog>` native: focus trap dan `Esc` bawaan browser.
- Fokus terlihat (`outline` cobalt 2px).
- Kontras: teks `#0E0E0E` di `#F2F2EE` 17:1; `#5A5A56` 6,6:1; putih di `#2F4BFF` 5,9:1; cobalt di `#F2F2EE` 5,2:1.
- Target sentuh >= 44px.

## 7. Performa

- `three` hanya diimpor di Beranda setelah event `load` dan bila WebGL tersedia.
- Gambar `loading="lazy"` + `width`/`height` kecuali foto hero (`fetchpriority="high"`).
- Video `preload="none"`.

## 8. Risiko

| Risiko | Mitigasi |
|---|---|
| CV memuat nomor WhatsApp | Tombol CV disembunyikan sampai pemilik ekspor ulang |
| Link Play Store sebagian belum terverifikasi | Hanya link yang tercatat di spreadsheet yang dipasang |
| Screenshot beberapa proyek tidak ada | Kartu tanpa gambar memakai blok tipografi, bukan gambar palsu |
