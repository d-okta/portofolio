import './styles.css';

const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)] as T[];
const root = document.documentElement;
const motion = root.classList.contains('motion');

// ---------- Bahasa ----------
const langBtn = document.querySelector<HTMLButtonElement>('[data-lang-toggle]');
const syncLang = () => langBtn?.setAttribute('aria-label', root.lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia');
syncLang();
langBtn?.addEventListener('click', () => {
  root.lang = root.lang === 'id' ? 'en' : 'id';
  try { localStorage.setItem('lang', root.lang); } catch {}
  syncLang();
  window.dispatchEvent(new Event('langchange'));
});

// ---------- Menu mobile ----------
const menuBtn = document.querySelector<HTMLButtonElement>('.menu-btn');
const nav = document.getElementById('site-nav');
const setMenu = (open: boolean) => { nav?.classList.toggle('open', open); menuBtn?.setAttribute('aria-expanded', String(open)); };
menuBtn?.addEventListener('click', () => setMenu(!nav?.classList.contains('open')));
nav?.addEventListener('click', (e) => { if ((e.target as Element).closest('a')) setMenu(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav?.classList.contains('open')) { setMenu(false); menuBtn?.focus(); } });

// ---------- Dialog proyek (native <dialog>: focus trap & Esc bawaan) ----------
for (const a of $$<HTMLAnchorElement>('[data-open]')) {
  a.addEventListener('click', (e) => {
    const d = document.getElementById(a.dataset.open!) as HTMLDialogElement | null;
    if (!d) return;
    e.preventDefault();
    d.showModal();
    window.dispatchEvent(new Event('dialogopen'));
  });
}
for (const d of $$<HTMLDialogElement>('dialog')) {
  d.addEventListener('click', (e) => { if (e.target === d || (e.target as Element).closest('[data-close]')) d.close(); });
  d.addEventListener('close', () => window.dispatchEvent(new Event('dialogclose')));
}

// ---------- YouTube (dimuat hanya saat diklik) ----------
for (const b of $$<HTMLButtonElement>('[data-yt]')) {
  b.addEventListener('click', () => {
    const d = document.createElement('dialog');
    d.className = 'yt-frame';
    const f = document.createElement('iframe');
    f.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(b.dataset.yt!)}?autoplay=1&rel=0`;
    f.title = b.dataset.ytTitle ?? 'YouTube';
    f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    d.append(f);
    d.addEventListener('click', () => d.close());
    d.addEventListener('close', () => { d.remove(); b.focus(); window.dispatchEvent(new Event('dialogclose')); });
    document.body.append(d);
    d.showModal();
    window.dispatchEvent(new Event('dialogopen'));
  });
}

// ---------- Video preview: putar saat terlihat ----------
const videos = $$<HTMLVideoElement>('video');
if (motion) {
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) {
      const v = en.target as HTMLVideoElement;
      if (en.isIntersecting) { v.preload = 'auto'; v.play().catch(() => {}); } else v.pause();
    }
  }, { threshold: 0.35 });
  videos.forEach((v) => io.observe(v));
} else {
  videos.forEach((v) => { v.controls = true; }); // reduced motion: tidak autoplay, pengguna yang memutar
}

// ---------- Tab varian (pola WAI-ARIA tabs) ----------
const tabs = $$<HTMLButtonElement>('[role="tab"]');
const select = (t: HTMLButtonElement) => {
  for (const x of tabs) {
    const on = x === t;
    x.setAttribute('aria-selected', String(on));
    x.tabIndex = on ? 0 : -1;
    document.getElementById(x.getAttribute('aria-controls')!)!.hidden = !on;
  }
  t.focus();
};
tabs.forEach((t, i) => {
  t.addEventListener('click', () => select(t));
  t.addEventListener('keydown', (e) => {
    const n = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (n) { e.preventDefault(); select(tabs[(i + n + tabs.length) % tabs.length]); }
  });
});

// ---------- Penjelajah stack: satu alat aktif, tampilkan proyeknya ----------
const tools = $$<HTMLButtonElement>('.tool');
for (const b of tools) {
  b.addEventListener('click', () => {
    const on = b.getAttribute('aria-pressed') !== 'true';
    tools.forEach((x) => x.setAttribute('aria-pressed', String(x === b && on)));
  });
}

// ---------- Teks bergulir di tombol: gandakan isi (berfungsi di kedua bahasa) ----------
for (const r of $$('.roll')) {
  const a = document.createElement('span'); a.className = 'roll-a';
  const b = document.createElement('span'); b.className = 'roll-b'; b.setAttribute('aria-hidden', 'true');
  a.append(...r.childNodes);
  b.append(...[...a.childNodes].map((n) => n.cloneNode(true)));
  r.append(a, b);
}

// ---------- Gerak ----------
if (motion) import('./motion').then((m) => m.init());
