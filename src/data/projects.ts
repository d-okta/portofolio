// Satu sumber data. Dirender ke HTML saat build (lihat vite.config.ts), jadi terbaca tanpa JS.
export type L = { id: string; en: string };
export type Field = 'web' | 'app' | 'game' | 'uiux' | 'video';
export type Link = { label: L; href: string };

export type Project = {
  id: string;
  title: string;
  fields: Field[];
  summary: L;
  desc: L;
  stack: string[];
  img?: string; // nama file di /img tanpa ekstensi
  tall?: boolean; // screenshot HP (portrait)
  links?: Link[];
  solo?: boolean; // dikerjakan sendiri (Nusa Vision Media / SGN)
  video?: string; // nama preview di /video
  youtube?: string; // ID video YouTube unlisted, isi setelah upload
};

const live = (href: string): Link => ({ label: { id: 'Buka situs', en: 'Open site' }, href });
const play = (pkg: string): Link => ({
  label: { id: 'Google Play', en: 'Google Play' },
  href: `https://play.google.com/store/apps/details?id=${pkg}`,
});

export const projects: Project[] = [
  // ---------- WEB ----------
  {
    id: 'iamta-3d', title: 'IAMTA 3D', fields: ['web', 'uiux'], img: 'iamta-3d',
    summary: { id: 'Situs asosiasi dengan mesin turbofan 3D interaktif', en: 'Association site with an interactive 3D turbofan' },
    desc: {
      id: 'Versi situs IAMTA (Indonesia Aircraft Maintenance Training Association) dengan tampilan bergaya lembar teknis bernomor dan model mesin turbofan 3D yang bisa diputar. Navigasi dibagi per lembar: profil, anatomi, struktur, anggota, regulasi, kontak.',
      en: 'A version of the IAMTA (Indonesia Aircraft Maintenance Training Association) site styled as numbered technical sheets, with a rotatable 3D turbofan engine. Navigation is split into sheets: profile, anatomy, structure, members, regulation, contact.',
    },
    stack: ['Three.js', 'JavaScript', 'HTML', 'CSS'], links: [live('https://iamta-3d.vercel.app/')],
  },
  {
    id: 'iamta', title: 'IAMTA', fields: ['web'], img: 'iamta',
    summary: { id: 'Situs resmi asosiasi pelatihan perawatan pesawat', en: 'Official site of an aircraft maintenance training association' },
    desc: {
      id: 'Profil, visi-misi, timeline program kerja, news ticker, dan bagan struktur organisasi interaktif. Versi pengembangan menambah panel admin dengan API Node.js/Express untuk mengelola berita.',
      en: 'Profile, mission, work-program timeline, news ticker, and an interactive org chart. The development build adds an admin panel with a Node.js/Express API for managing news.',
    },
    stack: ['JavaScript', 'Node.js', 'Express'], links: [live('https://iamta.vercel.app/')],
  },
  {
    id: 'apbp', title: 'APBP', fields: ['web'], img: 'apbp',
    summary: { id: 'Profil Asosiasi Prodi Bidang Penerbangan', en: 'Profile of an aviation study-program association' },
    desc: {
      id: 'Situs profil asosiasi program studi penerbangan: kartu data organisasi, visi dan tujuan, struktur organisasi, pesawat 3D, dan logo yang terurai menjadi lapisan saat di-scroll. Semua isi diambil dari satu berkas data.',
      en: 'Profile site for an association of aviation study programs: organisation data, goals, structure, a 3D aircraft, and a logo that splits into layers on scroll. All content comes from one data file.',
    },
    stack: ['JavaScript', 'Three.js', 'HTML', 'CSS'], links: [live('https://apbp.my.id/')],
  },
  {
    id: 'sgn', title: 'Smart Global Nusantara', fields: ['web'], img: 'sgn', solo: true,
    summary: { id: 'Situs penerbit buku anggota IKAPI', en: 'Website for an IKAPI member book publisher' },
    desc: {
      id: 'Profil penerbit, daftar layanan penerbitan, katalog buku, dan blog. Data katalog dan blog disimpan di Supabase.',
      en: 'Publisher profile, publishing services, book catalogue, and blog. Catalogue and blog data live in Supabase.',
    },
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Supabase'], links: [live('https://smartglobalnusantara.my.id/')],
  },
  {
    id: 'perpus-sgn', title: 'Perpustakaan Digital SGN', fields: ['web'], img: 'perpus-sgn', solo: true,
    summary: { id: 'Perpustakaan e-book dengan reader per halaman', en: 'E-book library with a page-by-page reader' },
    desc: {
      id: 'Katalog 90 e-book dan 21 novel/komik dengan pencarian, filter, reader halaman WebP yang menyimpan progres baca, dan panel admin. Gambar halaman dilayani dari Cloudflare R2 privat lewat signed URL.',
      en: 'A catalogue of 90 e-books and 21 novels/comics with search, filters, a WebP page reader that saves reading progress, and an admin panel. Page images are served from private Cloudflare R2 through signed URLs.',
    },
    stack: ['Next.js', 'TypeScript', 'Turso', 'Cloudflare R2'], links: [live('https://perpustakaan.nvmedia.my.id/')],
  },
  {
    id: 'keuangan-sgn', title: 'Keuangan SGN', fields: ['web'], img: 'keuangan-sgn', solo: true,
    summary: { id: 'Dashboard keuangan yang terhubung ke bot WhatsApp', en: 'Finance dashboard connected to a WhatsApp bot' },
    desc: {
      id: 'Pencatatan pemasukan dan pengeluaran per pengguna: multi-dompet, anggaran, transaksi berulang, utang/piutang, laporan ekspor Excel/PDF, scan struk, dan asisten keuangan. Tersedia juga sebagai APK Android.',
      en: 'Per-user income and expense tracking: multiple wallets, budgets, recurring transactions, debts, Excel/PDF reports, receipt scanning, and a finance assistant. Also ships as an Android APK.',
    },
    stack: ['Next.js', 'TypeScript', 'Neon Postgres', 'Capacitor'], links: [live('https://keuangan-vercel.vercel.app/')],
  },
  {
    id: 'nvm', title: 'Nusa Vision Media', fields: ['web'], img: 'nvm', solo: true,
    summary: { id: 'Situs penerbit dengan katalog, blog, dan panel admin', en: 'Publisher site with catalogue, blog, and admin panel' },
    desc: {
      id: 'Katalog buku, blog dengan komentar, asisten tanya-jawab, dan halaman kebijakan privasi dua bahasa untuk setiap aplikasi Nusa Vision Media. Panel admin mengelola buku, blog, komentar, dan kebijakan.',
      en: 'Book catalogue, blog with comments, a Q&A assistant, and bilingual privacy pages for every Nusa Vision Media app. An admin panel manages books, posts, comments, and policies.',
    },
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Supabase'], links: [live('https://www.nusavisionmedia.com/')],
  },
  {
    id: 'nvmedia', title: 'NV Media', fields: ['web'], img: 'nvmedia', solo: true,
    summary: { id: 'Situs agensi dengan simulator estimasi proyek', en: 'Agency site with a project estimate simulator' },
    desc: {
      id: 'Landing page agensi desain web dan aplikasi dengan Dream Builder (simulator estimasi proyek), portal klien untuk memantau status pengerjaan, dan konsol admin tersembunyi.',
      en: 'Landing page for a web and app agency with Dream Builder (a project estimate simulator), a client portal for tracking project status, and a hidden admin console.',
    },
    stack: ['Vite', 'JavaScript', 'Supabase'], links: [live('https://www.nvmedia.my.id/')],
  },
  {
    id: 'pos-smkn10', title: 'POS SMKN 10', fields: ['web'], img: 'pos-smkn10',
    summary: { id: 'Kasir dan manajemen usaha unit sekolah', en: 'Point of sale for the school business unit' },
    desc: {
      id: 'Sistem kasir dengan akses berbasis peran (admin, bendahara, kasir, kepala sekolah, mitra), stok, pengeluaran, bagi hasil mitra, dan laporan PDF/Excel.',
      en: 'Point of sale with role-based access (admin, treasurer, cashier, principal, partner), stock, expenses, partner revenue sharing, and PDF/Excel reports.',
    },
    stack: ['Next.js', 'TypeScript', 'Prisma', 'Supabase'], links: [live('https://pos-smkn10.vercel.app/')],
  },
  {
    id: 'cbt', title: 'CBT Poltekbang Surabaya', fields: ['web'], img: 'cbt',
    summary: { id: 'Portal ujian berbasis komputer', en: 'Computer-based test portal' },
    desc: {
      id: 'Login multi-peran (taruna, dosen, kaprodi), daftar ujian, pengerjaan soal, dan riwayat nilai untuk Politeknik Penerbangan Surabaya. Masih memakai data contoh.',
      en: 'Multi-role login (cadet, lecturer, head of program), exam list, test taking, and score history for Politeknik Penerbangan Surabaya. Still runs on sample data.',
    },
    stack: ['Next.js', 'React', 'Tailwind CSS'], links: [live('https://cbt-poltekbang-sby.vercel.app/')],
  },
  {
    id: 'lulus-ta', title: 'Lulus TA', fields: ['web'], img: 'lulus-ta',
    summary: { id: 'Situs jasa pendampingan tugas akhir', en: 'Thesis mentoring service site' },
    desc: {
      id: 'Daftar layanan dari bimbingan judul sampai persiapan sidang, dengan alur pemesanan yang jelas.',
      en: 'Services from topic selection to defence preparation, with a clear ordering flow.',
    },
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'], links: [live('https://lulusta.my.id/')],
  },
  {
    id: 'konsultasi-ta', title: 'Konsultasi TA', fields: ['web'], img: 'konsultasi-ta',
    summary: { id: 'Landing page bimbingan skripsi, tesis, disertasi', en: 'Landing page for thesis mentoring' },
    desc: { id: 'Landing page satu halaman untuk jasa bimbingan tugas akhir.', en: 'Single-page landing for a thesis mentoring service.' },
    stack: ['HTML', 'CSS', 'JavaScript'], links: [live('https://konsultasita.my.id/')],
  },
  {
    id: 'al-habiibah', title: 'Yayasan Al-Habiibah', fields: ['web'], img: 'al-habiibah',
    summary: { id: 'Situs yayasan dengan panel CMS', en: 'Foundation site with a CMS panel' },
    desc: {
      id: 'Situs resmi yayasan keagamaan dan sosial di Surabaya. Seluruh isi halaman (hero, profil, kegiatan) bisa diubah lewat panel admin.',
      en: 'Official site of a religious and social foundation in Surabaya. Every section (hero, profile, activities) is editable from an admin panel.',
    },
    stack: ['Next.js', 'React', 'Supabase'], links: [live('https://yayasan-al-habiibah.vercel.app/')],
  },
  {
    id: 'bina-amanah', title: 'Yayasan Bina Amanah', fields: ['web'], img: 'bina-amanah',
    summary: { id: 'Platform donasi wakaf, infak, sedekah', en: 'Donation platform for a foundation' },
    desc: {
      id: 'Hero slider tiga tema, daftar kampanye donasi dengan progres, dan alur donasi. Data kampanye masih data contoh.',
      en: 'Three-theme hero slider, donation campaigns with progress, and a donation flow. Campaign data is still sample data.',
    },
    stack: ['HTML', 'CSS', 'JavaScript'], links: [live('https://yayasan-bina-amanah-ilmu-mulia.vercel.app/')],
  },
  {
    id: 'villa', title: 'Masterpiece Villa', fields: ['web'], img: 'villa',
    summary: { id: 'Situs promosi dan booking villa', en: 'Villa promotion and booking site' },
    desc: {
      id: 'Widget booking dengan validasi tanggal, katalog tiga villa, galeri, dan kontak. Booking masih simulasi di sisi klien.',
      en: 'Booking widget with date validation, a three-villa catalogue, gallery, and contact. Booking is simulated client-side.',
    },
    stack: ['HTML', 'CSS', 'JavaScript'], links: [live('https://masterpiecevilla.vercel.app/')],
  },
  {
    id: 'nafisa', title: 'Nafisa Spa & Beauty', fields: ['web'], img: 'nafisa',
    summary: { id: 'Situs salon dan spa khusus perempuan', en: 'Women-only salon and spa site' },
    desc: { id: 'Daftar layanan dengan pemilihan paket dan promo.', en: 'Service list with package selection and promotions.' },
    stack: ['HTML', 'CSS', 'JavaScript'], links: [live('https://nafisa-spa-beauty.vercel.app/')],
  },
  {
    id: 'sevel', title: 'Sevel Stamina', fields: ['web'], img: 'sevel',
    summary: { id: 'Landing page kopi herbal', en: 'Herbal coffee landing page' },
    desc: {
      id: 'Landing page penjualan dengan roda interaktif tujuh bahan herbal yang menampilkan detail tiap bahan.',
      en: 'Sales landing page with an interactive wheel of seven herbal ingredients showing details for each one.',
    },
    stack: ['HTML', 'CSS', 'JavaScript'], links: [live('https://sevel-stamina.vercel.app/')],
  },
  {
    id: 'pintar-calistung', title: 'Pintar Calistung', fields: ['web', 'uiux'], img: 'pintar-calistung',
    summary: { id: 'PWA belajar baca, tulis, hitung untuk anak 4-7 tahun', en: 'Reading, writing, and counting PWA for ages 4-7' },
    desc: {
      id: 'Aplikasi web progresif yang bisa dipakai offline. Anak belajar bersama Robi si robot melalui tiga planet: membaca, menulis, dan berhitung.',
      en: 'A progressive web app that works offline. Children learn with Robi the robot across three planets: reading, writing, and counting.',
    },
    stack: ['PWA', 'JavaScript', 'HTML', 'CSS'], links: [live('https://pintar-calistung-orpin.vercel.app/')],
  },

  // ---------- APP ----------
  {
    id: 'nusacut', title: 'DCut / NusaCut Studio', fields: ['app'], img: 'nusacut',
    summary: { id: 'Editor video desktop yang berjalan offline', en: 'Offline desktop video editor' },
    desc: {
      id: 'Editor video bergaya CapCut/Premiere yang berjalan sepenuhnya di komputer: timeline multi-track (video, teks, audio) dengan drag, trim, split, snap, zoom, preview real-time, subtitle, dan ekspor lewat FFmpeg.',
      en: 'A CapCut/Premiere-style editor that runs entirely on your machine: multi-track timeline (video, text, audio) with drag, trim, split, snap, zoom, live preview, subtitles, and FFmpeg export.',
    },
    stack: ['Electron', 'React', 'TypeScript', 'FFmpeg'],
  },
  {
    id: 'warungku', title: 'WarungKu POS', fields: ['app'],
    summary: { id: 'Aplikasi kasir UMKM, dirilis bersama 6 varian di Google Play', en: 'Small-business POS, released with 6 variants on Google Play' },
    desc: {
      id: 'Kasir untuk warung dan UMKM: penjualan harian, produk dan stok, cetak struk lewat printer thermal Bluetooth, laporan pemasukan. Basis kode yang sama dipakai untuk BarberKu, BengkelKu, LaundryKu, SalonKu, SPBU POS, dan TokoKueKu.',
      en: 'POS for small shops: daily sales, products and stock, Bluetooth thermal receipt printing, income reports. The same codebase powers BarberKu, BengkelKu, LaundryKu, SalonKu, SPBU POS, and TokoKueKu.',
    },
    stack: ['Flutter', 'Dart', 'SQLite'],
    links: [play('com.nusavisionmedia.warungku_pos'), { label: { id: 'BarberKu', en: 'BarberKu' }, href: 'https://play.google.com/store/apps/details?id=com.nusavisionmedia.barberkupos' }, { label: { id: 'LaundryKu', en: 'LaundryKu' }, href: 'https://play.google.com/store/apps/details?id=com.nusavisionmedia.laundrykupos' }],
  },
  {
    id: 'retailpos', title: 'RetailPOS Desktop', fields: ['app'], img: 'retailpos',
    summary: { id: 'Kasir desktop Windows dengan installer ringan', en: 'Windows desktop POS with a small installer' },
    desc: { id: 'Transaksi kasir, produk dan stok, laporan penjualan dengan grafik, data tersimpan lokal.', en: 'Checkout, products and stock, sales reports with charts, data stored locally.' },
    stack: ['Tauri', 'Rust', 'React', 'SQLite'],
  },
  {
    id: 'smartlib', title: 'SmartLib AI', fields: ['app'], img: 'smartlib',
    summary: { id: 'Perpustakaan digital self-hosted dengan pencarian semantik', en: 'Self-hosted digital library with semantic search' },
    desc: {
      id: 'Pencarian semantik koleksi, tanya jawab isi dokumen berbasis RAG, dan pembuat sitasi akademik. Model bahasa berjalan lokal lewat Ollama.',
      en: 'Semantic search, RAG-based Q&A over documents, and an academic citation builder. The language model runs locally through Ollama.',
    },
    stack: ['FastAPI', 'Python', 'Next.js', 'Ollama'],
  },
  {
    id: 'yolo', title: 'AI Scan Vision', fields: ['app'], img: 'yolo',
    summary: { id: 'Deteksi objek kamera dengan penjelasan bahasa manusia', en: 'Camera object detection with plain-language captions' },
    desc: {
      id: 'Dashboard lokal dengan tiga mode (deteksi, kecepatan, absen): mendeteksi objek dari kamera dengan YOLO lalu menjelaskan isi gambar memakai model visi-bahasa.',
      en: 'A local dashboard with three modes (detection, speed, attendance): detects objects from a camera with YOLO and describes the scene with a vision-language model.',
    },
    stack: ['Python', 'YOLO'],
  },
  {
    id: 'calistung-app', title: 'CALISTUNG', fields: ['app'], img: 'calistung', tall: true, solo: true,
    summary: { id: 'Aplikasi pendamping buku cetak calistung', en: 'Companion app for a printed early-learning book' },
    desc: {
      id: 'Aplikasi Android untuk anak 4-8 tahun yang tersambung ke halaman buku cetak lewat QR: latihan baca, tulis, hitung, progres anak, dan mode untuk orang tua. Masih tahap prototipe.',
      en: 'Android app for ages 4-8 linked to printed book pages by QR: reading, writing, and counting practice, child progress, and a parent mode. Still a prototype.',
    },
    stack: ['Flutter', 'Dart', 'Python'],
  },
  {
    id: 'property', title: 'SmartGlobal Property', fields: ['app'], img: 'property', solo: true,
    summary: { id: 'Manajemen aset dan sewa properti', en: 'Property asset and rental management' },
    desc: { id: 'Pencatatan aset (rumah, ruko, villa, tanah), sewa harian/bulanan, dan laporan pendapatan.', en: 'Asset records (houses, shophouses, villas, land), daily/monthly rentals, and revenue reports.' },
    stack: ['PHP', 'React', 'Vite', 'Chart.js'],
  },
  {
    id: 'todolist', title: 'Todo List CSGN', fields: ['app'], img: 'todolist', solo: true,
    summary: { id: 'Manajemen tugas dengan empat level akses', en: 'Task management with four access levels' },
    desc: { id: 'Alur tugas dari owner ke supervisor ke worker, dengan dashboard per peran.', en: 'Task flow from owner to supervisor to worker, with a dashboard per role.' },
    stack: ['Next.js', 'Express', 'Prisma'],
  },
  {
    id: 'titik-baca', title: 'Titik Baca', fields: ['app'], img: 'titik-baca', solo: true,
    summary: { id: 'Perpustakaan offline untuk titik baca komunitas', en: 'Offline library for community reading spots' },
    desc: { id: 'PWA dengan reader PDF/EPUB, audiobook, video edukasi, dan aplikasi Android pendamping.', en: 'PWA with a PDF/EPUB reader, audiobooks, educational video, and an Android companion app.' },
    stack: ['PWA', 'PHP', 'JavaScript', 'Java'],
  },
  {
    id: 'penerbit', title: 'Penerbit Buku Nusantara', fields: ['app'], img: 'penerbit',
    summary: { id: 'Manajemen penerbit dengan REST API', en: 'Publisher management with a REST API' },
    desc: { id: 'Dashboard ringkasan, CRUD buku, penulis, dan stok dengan grafik per kategori.', en: 'Summary dashboard, CRUD for books, authors, and stock, with per-category charts.' },
    stack: ['Flask', 'Python', 'SQLite'],
  },

  // ---------- GAME ----------
  {
    id: 'blockdown', title: 'BlockDown', fields: ['game', 'uiux'], img: 'blockdown', tall: true,
    summary: { id: 'Puzzle balok jatuh dengan leaderboard yang diverifikasi server', en: 'Falling-block puzzle with a server-verified leaderboard' },
    desc: {
      id: 'PWA puzzle dengan empat mode, dua bahasa, dan leaderboard online. Skor diverifikasi dengan memutar ulang permainan di server, jadi skor palsu ditolak. Antarmuka dirancang dulu di Stitch sebelum dibangun.',
      en: 'A puzzle PWA with four modes, two languages, and an online leaderboard. Scores are verified by replaying the game on the server, so forged scores are rejected. The UI was designed in Stitch before it was built.',
    },
    stack: ['TypeScript', 'Vite', 'PWA'], links: [live('https://block-down.vercel.app')],
  },
  {
    id: 'balung-wesi', title: 'Balung Wesi: Iron Bones', fields: ['game'], img: 'balung-wesi',
    summary: { id: 'Platformer wayang: Gatotkaca merebut Pringgondani', en: 'Wayang platformer: Gatotkaca reclaims Pringgondani' },
    desc: {
      id: 'Platformer aksi 2D tiga bab dengan musuh dari cerita wayang, toko, cerita bergambar antar bab, dan efek suara gamelan slendro yang disintesis tanpa berkas audio. Lulus 203 uji otomatis.',
      en: 'A three-chapter 2D action platformer with enemies from wayang stories, a shop, illustrated interludes, and slendro gamelan sound synthesised without audio files. Passes 203 automated tests.',
    },
    stack: ['Phaser', 'JavaScript', 'Capacitor'], links: [play('com.nusavision.gatotkaca')],
  },
  {
    id: 'serangan-fajar', title: 'Serangan Fajar 1947', fields: ['game'], img: 'serangan-fajar',
    summary: { id: 'Game sejarah operasi udara pertama AURI', en: 'History game about the first Indonesian Air Force operation' },
    desc: {
      id: 'Empat misi mengikuti peristiwa 29 Juli 1947, dua pesawat (Guntei dan Cureng), ensiklopedia dalam game, dan profil 12 tokoh sejarah dengan sumber.',
      en: 'Four missions following the events of 29 July 1947, two aircraft (Guntei and Cureng), an in-game encyclopedia, and 12 sourced historical profiles.',
    },
    stack: ['Java', 'Android SDK'], links: [play('com.nusavisionmedia.seranganfajar1947')],
  },
  {
    id: 'jinn-chase', title: 'Jinn Chase', fields: ['game'], img: 'jinn-chase',
    summary: { id: 'Endless runner kota gurun seribu satu malam', en: 'Arabian-nights desert endless runner' },
    desc: {
      id: 'Pencuri kecil dikejar jin raksasa: lompat, meluncur, empat power-up, toko upgrade, dan misi harian. Berjalan 120 FPS di Galaxy A53.',
      en: 'A small thief chased by a giant jinn: jump, slide, four power-ups, an upgrade shop, and daily missions. Runs at 120 FPS on a Galaxy A53.',
    },
    stack: ['Godot', 'GDScript'], links: [play('com.nusavisionmedia.jinnchase')],
  },
  {
    id: 'momentum', title: 'Momentum', fields: ['game'], img: 'momentum', tall: true,
    summary: { id: 'Game aksi satu jempol: tahan, lepas, melesat', en: 'One-thumb action: hold, release, launch' },
    desc: {
      id: 'Tahan untuk mencengkeram tali, lepas untuk melesat. Saat cukup cepat, tubuh menembus musuh. Ada tantangan harian berbasis tanggal dan hantu rekor. Terpasang di bawah 1 MB.',
      en: 'Hold to grab the rope, release to launch. Fast enough and you pierce enemies. Includes date-seeded daily challenges and a ghost of your best run. Installs under 1 MB.',
    },
    stack: ['JavaScript', 'Canvas', 'Web Audio'], links: [play('com.nusavisionmedia.momentum')],
  },
  {
    id: 'sky-blitz', title: 'Sky Blitz 90', fields: ['game'], img: 'sky-blitz', tall: true,
    summary: { id: 'Shoot \'em up pesawat gaya arcade 90-an', en: '90s arcade-style shoot \'em up' },
    desc: {
      id: 'Tembakan otomatis, gelombang musuh terstruktur, dan beberapa bos raksasa. Dibuat sebagai game web lalu dibungkus jadi aplikasi Android.',
      en: 'Auto-fire, structured enemy waves, and several giant bosses. Built as a web game and wrapped as an Android app.',
    },
    stack: ['JavaScript', 'Canvas', 'Capacitor'], links: [play('com.nusavisionmedia.skyblitz90'), live('https://sky-blitz.vercel.app')],
  },
  {
    id: 'sky-warfront', title: 'Sky Warfront', fields: ['game'],
    summary: { id: 'Dogfight pixel-art dengan lima senjata dan bos tiga fase', en: 'Pixel-art dogfight with five weapons and three-phase bosses' },
    desc: {
      id: 'Joystick virtual bermomentum, enam medan tempur dengan cuaca sendiri, mode kampanye dan tanpa akhir, pangkat pilot. Native Android tanpa engine, game loop 60 Hz.',
      en: 'Momentum-based virtual joystick, six battlefields with their own weather, campaign and endless modes, pilot ranks. Native Android without an engine, 60 Hz game loop.',
    },
    stack: ['Java', 'Android SDK'], links: [play('com.nusavisionmedia.skywarfront')],
  },
  {
    id: 'glass-tetris', title: 'Glass Tetris', fields: ['game'], img: 'glass-tetris', tall: true,
    summary: { id: 'Puzzle balok kaca dengan empat mode', en: 'Glass block puzzle with four modes' },
    desc: {
      id: 'Marathon, Sprint 40, Ultra 2 menit, dan Zen Flow. Kesulitan adaptif, hold, ghost piece, misi harian. Offline tanpa iklan.',
      en: 'Marathon, Sprint 40, Ultra 2 minutes, and Zen Flow. Adaptive difficulty, hold, ghost piece, daily missions. Offline with no ads.',
    },
    stack: ['Kotlin', 'Android SDK'], links: [play('com.nusavisionmedia.glasstetris')],
  },
  {
    id: 'brick-tetris', title: 'Brick Tetris', fields: ['game'], img: 'brick-tetris', tall: true,
    summary: { id: 'Varian bata dari Glass Tetris', en: 'Brick-themed sibling of Glass Tetris' },
    desc: { id: 'Arsitektur yang sama dengan Glass Tetris, tema dinding bata, toko item dalam game.', en: 'Same architecture as Glass Tetris, brick-wall theme, in-game item shop.' },
    stack: ['Kotlin', 'Android SDK'], links: [play('com.nusavisionmedia.bricktetris')],
  },

  // ---------- UI/UX ----------
  {
    id: 'web-cetak', title: 'Web Cetak', fields: ['uiux', 'web'], img: 'cetak-monokrom',
    summary: { id: 'Situs percetakan dalam tiga arah visual', en: 'Print-shop site in three visual directions' },
    desc: {
      id: 'Situs percetakan (kemasan, sablon, souvenir, buku) yang dirancang dalam tiga varian palet: monokrom, emas, dan pink. Setiap varian diuji di desktop dan HP sebelum dipilih.',
      en: 'A print-shop site (packaging, screen printing, souvenirs, books) designed in three palette variants: monochrome, gold, and pink. Each variant was reviewed on desktop and phone before choosing.',
    },
    stack: ['Next.js', 'Tailwind CSS', 'Figma'], links: [live('https://web-cetak-lovat.vercel.app')],
  },
  {
    id: 'nike', title: 'Nike Timeline', fields: ['uiux'], img: 'nike-live',
    summary: { id: 'Latihan desain: sejarah Nike 1972-2019', en: 'Design study: Nike history 1972-2019' },
    desc: {
      id: 'Latihan desain halaman linimasa sepatu Nike dengan pencari ukuran dari panjang kaki. Bukan proyek resmi Nike.',
      en: 'A design exercise: a Nike shoe timeline with a size finder based on foot length. Not an official Nike project.',
    },
    stack: ['HTML', 'CSS', 'JavaScript'], links: [live('https://nike-website-bay.vercel.app')],
  },

  // ---------- VIDEO ----------
  { id: 'v-xploration', title: 'Aftermovie Xploration', fields: ['video'], video: 'xploration', summary: { id: 'Aftermovie acara', en: 'Event aftermovie' }, desc: { id: '', en: '' }, stack: [] },
  { id: 'v-good-day', title: 'Aftermovie Good Day', fields: ['video'], video: 'good-day', summary: { id: 'Aftermovie acara', en: 'Event aftermovie' }, desc: { id: '', en: '' }, stack: [] },
  { id: 'v-pelindo', title: 'Aftermovie Pelindo', fields: ['video'], video: 'pelindo', summary: { id: 'Aftermovie acara', en: 'Event aftermovie' }, desc: { id: '', en: '' }, stack: [] },
  { id: 'v-sariayu', title: 'Aftermovie Sariayu', fields: ['video'], video: 'sariayu', summary: { id: 'Aftermovie acara', en: 'Event aftermovie' }, desc: { id: '', en: '' }, stack: [] },
  { id: 'v-smekten', title: 'Smekten Bersholawat', fields: ['video'], video: 'smekten-bersholawat', summary: { id: 'Aftermovie acara sekolah', en: 'School event aftermovie' }, desc: { id: '', en: '' }, stack: [] },
];

export const featured = ['iamta-3d', 'blockdown', 'nusacut', 'pintar-calistung'];
