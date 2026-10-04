/* ============================================================
   Portofolio — Diandra Oktansyah Satria Mandala
   - GANTI bagian CONFIG & konten bertanda TODO dengan data asli.
   ============================================================ */
"use strict";

const CONFIG = {
  email: "diandra.oktansyah.s.m@gmail.com",
  // Nomor WA format internasional tanpa '+'. 083892120807 -> 6283892120807
  whatsapp: "6283892120807",
  instagram: "https://instagram.com/diandra.osm",
  github: "https://github.com/d-okta",
};

/* ---------- i18n strings ---------- */
const i18n = {
  id: {
    "a11y.skip": "Lewati ke konten utama",
    "nav.beranda": "Beranda",
    "nav.tentang": "Tentang",
    "nav.karya": "Karya",
    "nav.layanan": "Layanan",
    "nav.testimoni": "Testimoni",
    "nav.kontak": "Kontak",
    "hero.eyebrow": "Portofolio",
    "hero.title": "Halo, saya Diandra Oktansyah Satria Mandala",
    "hero.role": "Video Editor · UI/UX Designer · Pelajar RPL",
    "hero.desc":
      "Siswa SMK jurusan Rekayasa Perangkat Lunak dengan pengalaman magang UI/UX dan rekam jejak aktif di komunitas kreatif video — mengolah visual dari konsep hingga hasil akhir yang siap tayang.",
    "hero.cta1": "Lihat Karya",
    "hero.cta2": "Hubungi Saya",
    "about.eyebrow": "Profil",
    "about.title": "Tentang Saya",
    "about.desc":
      "Saya Diandra Oktansyah Satria Mandala, siswa SMK Negeri 10 Surabaya jurusan Rekayasa Perangkat Lunak dengan pengalaman magang UI/UX di PT. Lain Group Digital dan rekam jejak aktif di komunitas kreatif video — Black Broadcast, Series Wani Piro, hingga Japan Sekai. Terampil mengolah visual dari konsep hingga hasil akhir yang siap tayang.",
    "about.cv": "Lihat CV",
    "about.skillsLabel": "Keahlian",
    "work.eyebrow": "Portofolio",
    "work.title": "Karya Terpilih",
    "work.subtitle": "Beberapa proyek yang pernah saya kerjakan untuk klien & tim.",
    "work.previewNote":
      "Gambar karya masih placeholder — ganti dengan screenshot atau hasil karya asli dari tiap pengalaman di atas.",
    "work.close": "Tutup",
    "services.eyebrow": "Apa yang saya tawarkan",
    "services.title": "Layanan",
    "services.subtitle": "Layanan yang saya tawarkan untuk mendukung kebutuhan Anda.",
    "proses.eyebrow": "Alur kerja",
    "proses.title": "Cara Saya Bekerja",
    "testimoni.eyebrow": "Social proof",
    "testimoni.title": "Testimoni",
    "testimoni.subtitle": "Apa kata klien yang pernah bekerja sama.",
    "testimoni.previewNote":
      "Preview — testimoni masih contoh dan akan diganti dengan testimoni asli.",
    "harga.eyebrow": "Mulai proyek",
    "harga.title": "Paket & Harga",
    "harga.subtitle": "Ceritakan kebutuhan Anda — saya akan balas dengan estimasi & jadwal.",
    "harga.cta": "Chat WhatsApp",
    "harga.cta2": "Kirim Email",
    "faq.eyebrow": "Bantuan",
    "faq.title": "Pertanyaan Umum",
    "contact.eyebrow": "Kontak",
    "contact.title": "Mari Berkolaborasi",
    "contact.desc":
      "Punya proyek atau ide? Saya siap membantu. Hubungi saya lewat email atau pesan singkat.",
    "contact.nameLabel": "Nama",
    "contact.namePh": "Nama Anda",
    "contact.msgLabel": "Pesan",
    "contact.msgPh": "Ceritakan proyek / kebutuhan Anda…",
    "contact.send": "Kirim Pesan",
    "contact.wa": "Chat WhatsApp",
    "contact.hint": "Form tanpa backend — tombol kirim membuka aplikasi email Anda.",
    "footer.text": "© 2026 Diandra Oktansyah Satria Mandala. Dibuat dengan senang.",
    "meta.desc":
      "Portofolio Diandra Oktansyah Satria Mandala — UI/UX Designer, Video Editor, Software Engineer.",
  },
  en: {
    "a11y.skip": "Skip to main content",
    "nav.beranda": "Home",
    "nav.tentang": "About",
    "nav.karya": "Work",
    "nav.layanan": "Services",
    "nav.testimoni": "Testimonials",
    "nav.kontak": "Contact",
    "hero.eyebrow": "Portfolio",
    "hero.title": "Hi, I'm Diandra Oktansyah Satria Mandala",
    "hero.role": "Video Editor · UI/UX Designer · Software Engineering Student",
    "hero.desc":
      "A vocational high school student majoring in Software Engineering, with UI/UX internship experience and an active track record in creative video communities — taking visuals from concept to final, ready-to-publish results.",
    "hero.cta1": "View Work",
    "hero.cta2": "Get in Touch",
    "about.eyebrow": "Profile",
    "about.title": "About Me",
    "about.desc":
      "I'm Diandra Oktansyah Satria Mandala, a Software Engineering student at SMK Negeri 10 Surabaya with UI/UX internship experience at PT. Lain Group Digital and an active track record in creative video communities — Black Broadcast, Series Wani Piro, and Japan Sekai. Skilled at taking visuals from concept to final, ready-to-publish results.",
    "about.cv": "View CV",
    "about.skillsLabel": "Skills",
    "work.eyebrow": "Portfolio",
    "work.title": "Selected Work",
    "work.subtitle": "A few projects I've done for clients & teams.",
    "work.previewNote":
      "Project images are still placeholders — replace with screenshots or real work from each experience above.",
    "work.close": "Close",
    "services.eyebrow": "What I offer",
    "services.title": "Services",
    "services.subtitle": "Services I offer to support your needs.",
    "proses.eyebrow": "Workflow",
    "proses.title": "How I Work",
    "testimoni.eyebrow": "Social proof",
    "testimoni.title": "Testimonials",
    "testimoni.subtitle": "What clients say after working together.",
    "testimoni.previewNote":
      "Preview — testimonials are samples and will be replaced with real ones.",
    "harga.eyebrow": "Start a project",
    "harga.title": "Packages & Pricing",
    "harga.subtitle": "Tell me about your needs — I'll reply with an estimate & timeline.",
    "harga.cta": "WhatsApp Chat",
    "harga.cta2": "Send Email",
    "faq.eyebrow": "Help",
    "faq.title": "FAQ",
    "contact.eyebrow": "Contact",
    "contact.title": "Let's Collaborate",
    "contact.desc":
      "Have a project or idea? I'd love to help. Reach me via email or a quick message.",
    "contact.nameLabel": "Name",
    "contact.namePh": "Your name",
    "contact.msgLabel": "Message",
    "contact.msgPh": "Tell me about your project / needs…",
    "contact.send": "Send Message",
    "contact.wa": "WhatsApp Chat",
    "contact.hint": "No-backend form — send opens your email app.",
    "footer.text": "© 2026 Diandra Oktansyah Satria Mandala. Made with care.",
    "meta.desc":
      "Portfolio of Diandra Oktansyah Satria Mandala — UI/UX Designer, Video Editor, Software Engineer.",
  },
};

/* ---------- Data (TODO: ganti dengan data asli) ---------- */
const skills = ["Premiere Pro", "DaVinci Resolve", "CapCut", "Figma", "Photoshop", "Lightroom", "Canva", "UI/UX Design"];

const projects = [
  {
    id: "magang-lain-group", grad: "g1",
    category_id: "UI/UX", category_en: "UI/UX",
    title_id: "Desain UI/UX Website — PT. Lain Group Digital", title_en: "Website UI/UX Design — PT. Lain Group Digital",
    year: "2026", role_id: "UI/UX Designer (Magang, Feb–Apr 2026)", role_en: "UI/UX Designer (Intern, Feb–Apr 2026)",
    desc_id: "Magang di industri digital: merancang antarmuka website dari wireframe hingga prototipe interaktif di Figma, berkolaborasi dengan tim developer untuk memastikan desain sesuai kebutuhan pengguna, dan menghasilkan prototipe siap presentasi kepada klien.",
    desc_en: "Internship at a digital company: designed website interfaces from wireframes to interactive prototypes in Figma, collaborated with developers to keep designs user-focused, and delivered client-ready presentation prototypes.",
  },
  {
    id: "black-broadcast", grad: "g2",
    category_id: "Video & Desain", category_en: "Video & Design",
    title_id: "Koordinator Tim Kreatif — Black Broadcast", title_en: "Creative Team Coordinator — Black Broadcast",
    year: "2025–2026", role_id: "Koordinator Tim Kreatif", role_en: "Creative Team Coordinator",
    desc_id: "Ekstrakurikuler broadcasting sekolah: mendokumentasi dan mengedit video event besar sekolah, serta mengelola akun Instagram dan produksi desain feed rutin.",
    desc_en: "School broadcasting club: documented and edited videos of major school events, and managed the Instagram account plus routine feed design production.",
  },
  {
    id: "wani-piro", grad: "g3",
    category_id: "Video", category_en: "Video",
    title_id: "Editor Utama — Series Wani Piro", title_en: "Lead Editor — Series Wani Piro",
    year: "2026–Sekarang", role_id: "Editor Utama (Mar 2026–Sekarang)", role_en: "Lead Editor (Mar 2026–Present)",
    desc_id: "Bertanggung jawab atas seluruh pipeline editing video produksi komunitas, dan memproduksi konten video kreatif untuk kebutuhan komunitas & studio.",
    desc_en: "Own the full video editing pipeline of community productions, and produce creative video content for community & studio needs.",
  },
  {
    id: "slate-studio", grad: "g4",
    category_id: "Video", category_en: "Video",
    title_id: "Video Editor — Pekan Picture & Slate in Studio", title_en: "Video Editor — Pekan Picture & Slate in Studio",
    year: "2025–Sekarang", role_id: "Video Editor", role_en: "Video Editor",
    desc_id: "Video Editor untuk produksi Pekan Picture & Slate in Studio sejak 2025 — mengerjakan editing video produksi konten studio.",
    desc_en: "Video Editor for Pekan Picture & Slate in Studio productions since 2025 — handling editing for studio content productions.",
  },
  {
    id: "japan-sekai", grad: "g5",
    category_id: "Dokumentasi", category_en: "Documentation",
    title_id: "Tim Dokumentasi — Japan Sekai", title_en: "Documentation Team — Japan Sekai",
    year: "2025–2026", role_id: "Tim Dokumentasi", role_en: "Documentation Team",
    desc_id: "Ekstrakurikuler budaya Jepang: mendokumentasikan kegiatan komunitas secara visual.",
    desc_en: "Japanese culture club: visually documented community activities.",
  },
];

const services = [
  {
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
    title_id: "UI/UX Design", title_en: "UI/UX Design",
    desc_id: "Desain antarmuka aplikasi & web yang mudah digunakan dan menyenangkan.",
    desc_en: "Interface design for apps & web that are easy and enjoyable to use.",
  },
  {
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>',
    title_id: "Video Editing", title_en: "Video Editing",
    desc_id: "Edit video produk, promosi, dan konten sosial media yang memukau.",
    desc_en: "Editing for product, promo, and social media videos that captivate.",
  },
  {
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    title_id: "Web & Mobile Development", title_en: "Web & Mobile Development",
    desc_id: "Membangun aplikasi web & mobile yang cepat dan handal.",
    desc_en: "Building fast and reliable web & mobile apps.",
  },
  {
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>',
    title_id: "Brand & Visual", title_en: "Brand & Visual",
    desc_id: "Identitas visual, logo, dan panduan brand yang konsisten.",
    desc_en: "Visual identity, logo, and consistent brand guidelines.",
  },
];

const process = [
  { step: "01", title_id: "Diskusi", title_en: "Discovery", desc_id: "Memahami kebutuhan & tujuan Anda.", desc_en: "Understand your needs & goals." },
  { step: "02", title_id: "Desain", title_en: "Design", desc_id: "Membuat konsep & antarmuka.", desc_en: "Craft concepts & UI." },
  { step: "03", title_id: "Review", title_en: "Review", desc_id: "Revisi bersama sampai pas.", desc_en: "Iterate together until right." },
  { step: "04", title_id: "Rilis", title_en: "Launch", desc_id: "Serah & dukungan pasca-rilis.", desc_en: "Deliver & post-launch support." },
];

const testimonials = [
  {
    name_id: "Nama Klien (Contoh)", name_en: "Client Name (Sample)",
    role_id: "CEO, Perusahaan X", role_en: "CEO, Company X",
    quote_id: "Contoh — pengalaman bekerja sama yang baik, hasil memuaskan dan komunikatif.",
    quote_en: "Sample — a great collaboration experience, satisfying results and communicative.",
  },
  {
    name_id: "Nama Klien 2 (Contoh)", name_en: "Client Name 2 (Sample)",
    role_id: "Founder, Startup Y", role_en: "Founder, Startup Y",
    quote_id: "Contoh — video dan desainnya membantu brand kami terlihat lebih profesional.",
    quote_en: "Sample — the video and design helped our brand look more professional.",
  },
  {
    name_id: "Nama Klien 3 (Contoh)", name_en: "Client Name 3 (Sample)",
    role_id: "Manager, Tim Z", role_en: "Manager, Team Z",
    quote_id: "Contoh — pengerjaan cepat, rapi, dan mudah diajak diskusi.",
    quote_en: "Sample — fast, neat work and easy to discuss with.",
  },
];

const faq = [
  {
    q_id: "Berapa harga jasanya? (Contoh)", q_en: "How much do you charge? (Sample)",
    a_id: "Tergantung ruang lingkup proyek. Hubungi saya via WhatsApp/email untuk estimasi — bagian ini contoh dan akan diganti.",
    a_en: "Depends on project scope. Contact me via WhatsApp/email for an estimate — this is a sample and will be replaced.",
  },
  {
    q_id: "Berapa lama pengerjaan? (Contoh)", q_en: "How long does it take? (Sample)",
    a_id: "Proyek kecil biasanya 1–2 minggu, proyek besar menyesuaikan. Jadwal pasti dibahas di awal. (Contoh)",
    a_en: "Small projects usually take 1–2 weeks; larger ones vary. The exact timeline is agreed upfront. (Sample)",
  },
  {
    q_id: "Apakah ada revisi? (Contoh)", q_en: "Do you offer revisions? (Sample)",
    a_id: "Ya, ada revisi sesuai kesepakatan di tiap tahap agar hasil pas. (Contoh)",
    a_en: "Yes, revisions are included per stage as agreed so the result fits. (Sample)",
  },
];

const stats = [
  { value: "3+", label_id: "Tahun Pengalaman", label_en: "Years Experience" },
  { value: "20+", label_id: "Proyek Selesai", label_en: "Projects Done" },
  { value: "15+", label_id: "Klien Puas", label_en: "Happy Clients" },
];

/* ---------- State ---------- */
let lang = localStorage.getItem("lang") || detectLang();
let lastFocused = null;

function detectLang() {
  try {
    const nav = (navigator.language || navigator.userLanguage || "id").toLowerCase();
    return nav.startsWith("en") ? "en" : "id";
  } catch {
    return "id";
  }
}

/* ---------- Renderers ---------- */
const $ = (sel) => document.querySelector(sel);

function t(key) {
  return (i18n[lang] && i18n[lang][key]) || i18n.id[key] || key;
}

function applyLang(next) {
  lang = next === "en" ? "en" : "id";
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;
  document.querySelector('meta[name="description"]').setAttribute("content", t("meta.desc"));
  document.title =
    lang === "en"
      ? "Diandra Oktansyah Satria Mandala — Portfolio"
      : "Diandra Oktansyah Satria Mandala — Portofolio";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph")));
  });
  document.querySelectorAll(".lang-opt").forEach((el) => {
    el.classList.toggle("active", el.getAttribute("data-lang-opt") === lang);
  });
  const toggle = $("#langToggle");
  toggle.setAttribute("aria-label", lang === "id" ? "Ganti ke bahasa Inggris" : "Switch to Indonesian");

  renderSkills();
  renderStats();
  renderWork();
  renderServices();
  renderProcess();
  renderTesti();
  renderFaq();
  observeReveals();
}

function renderSkills() {
  $("#skillsList").innerHTML = skills.map((s) => `<li>${s}</li>`).join("");
}

function renderStats() {
  $("#statsRow").innerHTML = stats
    .map((s) => `<div class="stat"><b>${s.value}</b><span>${lang === "en" ? s.label_en : s.label_id}</span></div>`)
    .join("");
}

function renderWork() {
  $("#workGrid").innerHTML = projects
    .map(
      (p, i) => `
    <button type="button" class="work-card reveal" data-project="${p.id}" style="transition-delay:${i * 0.06}s"
      aria-haspopup="dialog" aria-label="${lang === "en" ? p.title_en : p.title_id}">
      <span class="work-thumb ${p.grad}" aria-hidden="true">${lang === "en" ? p.category_en : p.category_id}</span>
      <span class="work-info">
        <h3>${lang === "en" ? p.title_en : p.title_id}</h3>
        <span class="work-meta"><span class="tag">${lang === "en" ? p.category_en : p.category_id}</span><span>·</span><span>${p.year}</span></span>
      </span>
    </button>`
    )
    .join("");
  document.querySelectorAll("[data-project]").forEach((card) => {
    card.addEventListener("click", () => openModal(card.getAttribute("data-project"), card));
  });
}

function renderServices() {
  $("#servicesGrid").innerHTML = services
    .map(
      (s, i) => `
    <article class="service-card reveal" style="transition-delay:${i * 0.06}s">
      <div class="service-icon" aria-hidden="true">${s.icon}</div>
      <h3>${lang === "en" ? s.title_en : s.title_id}</h3>
      <p>${lang === "en" ? s.desc_en : s.desc_id}</p>
    </article>`
    )
    .join("");
}

function renderProcess() {
  $("#processGrid").innerHTML = process
    .map(
      (s, i) => `
    <li class="reveal" style="transition-delay:${i * 0.06}s">
      <span class="process-step">${s.step}</span>
      <h3>${lang === "en" ? s.title_en : s.title_id}</h3>
      <p>${lang === "en" ? s.desc_en : s.desc_id}</p>
    </li>`
    )
    .join("");
}

function renderTesti() {
  $("#testiGrid").innerHTML = testimonials
    .map((tc, i) => {
      const name = lang === "en" ? tc.name_en : tc.name_id;
      const initial = name.trim().charAt(0).toUpperCase() || "?";
      return `
    <article class="testi-card reveal" style="transition-delay:${i * 0.06}s">
      <blockquote>“${lang === "en" ? tc.quote_en : tc.quote_id}”</blockquote>
      <div class="testi-who">
        <span class="testi-ava" aria-hidden="true">${initial}</span>
        <div><b>${name}</b><span>${lang === "en" ? tc.role_en : tc.role_id}</span></div>
      </div>
    </article>`;
    })
    .join("");
}

function renderFaq() {
  $("#faqList").innerHTML = faq
    .map(
      (f, i) => `
    <div class="faq-item">
      <button type="button" class="faq-q" aria-expanded="false" aria-controls="faq-a-${i}" id="faq-q-${i}">
        <span>${lang === "en" ? f.q_en : f.q_id}</span>
        <span class="faq-plus" aria-hidden="true">+</span>
      </button>
      <div class="faq-a" id="faq-a-${i}" role="region" aria-labelledby="faq-q-${i}">
        <p>${lang === "en" ? f.a_en : f.a_id}</p>
      </div>
    </div>`
    )
    .join("");
  document.querySelectorAll(".faq-q").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const ans = item.querySelector(".faq-a");
      const open = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      ans.style.maxHeight = open ? ans.scrollHeight + "px" : "0px";
    });
  });
}

/* ---------- Modal ---------- */
function openModal(id, opener) {
  const p = projects.find((x) => x.id === id);
  if (!p) return;
  lastFocused = opener || document.activeElement;
  $("#modalMedia").className = "modal-media " + p.grad;
  $("#modalMedia").textContent = lang === "en" ? p.category_en : p.category_id;
  $("#modalMeta").textContent = `${lang === "en" ? p.role_en : p.role_id} · ${p.year}`;
  $("#modalTitle").textContent = lang === "en" ? p.title_en : p.title_id;
  $("#modalDesc").textContent = lang === "en" ? p.desc_en : p.desc_id;
  const overlay = $("#modalOverlay");
  overlay.hidden = false;
  document.body.style.overflow = "hidden";
  $("#modalClose").focus();
}

function closeModal() {
  $("#modalOverlay").hidden = true;
  document.body.style.overflow = "";
  if (lastFocused && lastFocused.focus) lastFocused.focus();
}

/* ---------- Reveal on scroll ---------- */
let observer = null;
function observeReveals() {
  const els = document.querySelectorAll(".reveal:not(.visible)");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("visible"));
    return;
  }
  if (observer) observer.disconnect();
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => observer.observe(el));
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  // Contact links from config
  $("#bookingWa").href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent("Halo Diandra, saya tertarik dengan layanan Anda.")}`;
  document.querySelectorAll('a[href^="https://instagram.com"]').forEach((a) => (a.href = CONFIG.instagram));
  document.querySelectorAll('a[href^="https://github.com"]').forEach((a) => (a.href = CONFIG.github));

  // Theme: stored > OS preference
  const storedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.setAttribute("data-theme", storedTheme || (prefersDark ? "dark" : "light"));

  $("#themeToggle").addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme");
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  // Language toggle ID <-> EN
  $("#langToggle").addEventListener("click", () => {
    applyLang(lang === "id" ? "en" : "id");
  });

  // Sticky header blur
  const header = $("#siteHeader");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav
  const navToggle = $("#navToggle");
  const nav = $("#mainNav");
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Modal events
  $("#modalClose").addEventListener("click", closeModal);
  $("#modalX").addEventListener("click", closeModal);
  $("#modalOverlay").addEventListener("click", (e) => {
    if (e.target === $("#modalOverlay")) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !$("#modalOverlay").hidden) closeModal();
  });

  // Contact form -> mailto (no backend)
  $("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#cfName").value.trim();
    const msg = $("#cfMsg").value.trim();
    const subject = encodeURIComponent(
      lang === "en" ? `Portfolio inquiry from ${name}` : `Permintaan dari ${name} — Portofolio`
    );
    const body = encodeURIComponent((lang === "en" ? `Hi Diandra,\n\n${msg}\n\n— ${name}` : `Halo Diandra,\n\n${msg}\n\n— ${name}`));
    window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
  });

  applyLang(lang);
});
