# PRD: Portofolio v2, Diandra Oktansyah Satria Mandala

## 1. Tujuan

Portofolio multidisiplin yang menampilkan tiga bidang dengan bobot setara (Programming, UI/UX, Video) lewat karya nyata, bukan daftar jabatan. Gerak terinspirasi Lusion/Oryzo: scroll-driven, satu objek 3D di hero, transisi halaman.

## 2. Pemilik

- Pelajar kelas 12 RPL, SMK Negeri 10 Surabaya, segera lulus.
- Sering membuat website dan aplikasi; aktif di dunia broadcasting.
- Status yang ditampilkan: **Terbuka untuk freelance**.

## 3. Pengunjung

| Pengunjung | Yang dicari | Waktu |
|---|---|---|
| Calon klien freelance | Bukti karya live, cara kontak | 30-90 detik |
| Perekrut / HR | Bidang, stack, CV | 1-2 menit |
| Komunitas / juri | Showreel, karya unggulan | bebas |

## 4. Halaman

| Rute | Isi |
|---|---|
| `/` Beranda | Hero (nama, peran, status, foto, objek 3D), 3 pintu bidang, karya pilihan (4 + 2 slot video), tentang singkat, kontak |
| `/programming/` | Hero bidang, sub-bagian Web, App, Game, stack |
| `/uiux/` | Magang PT. Lain Group Digital, proyek berbasis desain (web-print 3 varian, BlockDown, Nike), tools |
| `/video/` | Showreel, 5 aftermovie, peran komunitas, tools |

## 5. Fitur

- F1. Panel detail proyek (dialog): screenshot, stack, peran, link live / Play Store. Tidak ada halaman case study.
- F2. Toggle bahasa ID/EN, tersimpan di `localStorage`, default ID.
- F3. Video: preview lokal tanpa suara; versi penuh lewat YouTube unlisted (dimuat hanya saat diklik).
- F4. Unduh CV.
- F5. Kontak: email (`mailto:` dengan subjek), Instagram, GitHub, Discord.

## 6. Konten

### Karya pilihan Beranda
IAMTA 3D, BlockDown, DCut / NusaCut Studio, Pintar Calistung, + 2 video (dipilih pemilik nanti, sementara slot berlabel).

### Dikecualikan
- Semua proyek IoT/Arduino (fire alarm, traffic light, smart switch, latihan Arduino).
- `landing-makanan` (masih placeholder `[NAMA PRODUK]`).
- Prototipe tanpa screenshot dan tanpa build rilis (RASA, TANAH, BLOKALI/LUMBUNG).

### Kredit
Proyek Nusa Vision Media / Smart Global Nusantara: "Dikerjakan sendiri". Nama pembimbing tidak ditampilkan.

### Privasi
Nomor WhatsApp tidak ditampilkan di situs mana pun. CV lama memuat nomor itu: perlu diekspor ulang tanpa nomor sebelum dipasang.

### Dibuang dari versi lama
Statistik karangan, testimoni dan FAQ contoh, Paket & Harga, Proses, mode gelap ganda.

## 7. Kriteria berhasil

- Lighthouse mobile: Performance >= 85, Accessibility >= 95, SEO >= 95.
- LCP < 2,5 s, CLS < 0,1.
- Semua konten terbaca tanpa JavaScript dan tanpa WebGL.
- `prefers-reduced-motion` mematikan smooth scroll, parallax, 3D, dan pin.
- Tidak ada angka, testimoni, atau klaim yang tidak bisa dibuktikan.

## 8. Di luar cakupan

CMS, blog, formulir server, analitik, mode gelap, halaman case study.
