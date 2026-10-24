# DESIGN.md

Arah dari pemilik: terinspirasi gerak Lusion / Oryzo, tema terang, aksen cobalt elektrik (dipilih pemilik), multidisiplin setara.

Design Read: portofolio kreatif-developer untuk klien freelance dan perekrut, bahasa visual teknis-editorial terang, gerak scroll-driven + satu objek 3D.

Dial taste-skill: DESIGN_VARIANCE 7 / MOTION_INTENSITY 7 / VISUAL_DENSITY 4
Dial antislop: ENERGY 3 / RHYTHM 3 / MOTION 3

## Palet

| Token | Nilai | Pakai |
|---|---|---|
| `--bg` | `#F2F2EE` | Latar |
| `--ink` | `#0E0E0E` | Teks, garis tebal |
| `--muted` | `#5A5A56` | Teks sekunder |
| `--line` | `rgba(14,14,14,.12)` | Pemisah |
| `--accent` | `#2F4BFF` | CTA, link aktif, tirai, tint 3D |
| `--on-accent` | `#FFFFFF` | Teks di atas cobalt |

Satu aksen. Tidak ada gradien. Satu tema terang.

## Tipografi

- General Sans (400/500/600): grotesk dengan karakter sedikit geometris, tegas di ukuran besar tanpa terasa korporat. Dipakai untuk judul dan teks.
- Label kecil (nomor bagian, tahun, stack): General Sans 500, ukuran kecil, `font-variant-numeric: tabular-nums`. Tanpa monospace, tanpa tracking lebar.
- Judul besar `clamp(3rem, 9vw, 9rem)`, `letter-spacing: -0.04em`, `line-height: 0.92`.

## Bentuk

- Radius 0 untuk semua blok, kartu, gambar. Tombol radius 999px (satu-satunya pengecualian, aturan tertulis: elemen interaktif bulat, konten persegi).
- Tanpa bayangan. Pemisahan lewat garis 1px dan ruang.

## Motif identitas

Nomor bagian besar (`01`, `02`, `03`) untuk tiap bidang dan tirai cobalt yang membawa nama halaman tujuan.

## Alasan (R-31)

- Cobalt: dipilih pemilik; kontras tinggi di latar terang, cocok dengan tint refraksi kaca 3D.
- Latar `#F2F2EE` netral dingin-hangat: menyatu dengan latar foto studio abu-abu.
- Radius 0: kesan lembar teknis, kontras dengan objek 3D organik.
- Tanpa kartu berbayang: karya ditampilkan sebagai gambar + teks, bukan kotak melayang.
