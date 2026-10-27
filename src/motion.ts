import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);
const ease = 'expo.out';
const $$ = <T extends Element = HTMLElement>(s: string) => [...document.querySelectorAll<T>(s)] as T[];

export function init() {
  // Smooth scroll, disinkronkan ke ScrollTrigger lewat ticker GSAP (tanpa listener scroll manual).
  const lenis = new Lenis({ anchors: { offset: -64 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  addEventListener('dialogopen', () => lenis.stop());
  addEventListener('dialogclose', () => lenis.start());

  const home = document.body.dataset.page === 'home';
  const intro = home ? preloader(lenis) : Promise.resolve();
  if (!home) curtainIn();
  intro.then(() => { revealTitles(); revealClips(); });
  parallax();
  fieldsStack();
  pageLinks(lenis);
  magnetic();
  cursorLabel();
  if (home) {
    loadStage();
    manifesto();
    featuredPan();
    timeline();
  }

  addEventListener('langchange', () => { if (home) manifesto(); ScrollTrigger.refresh(); });
}

// ---------- Beranda ----------

// Preloader: nama + bilah kemajuan (font & gambar hero). Hanya di kunjungan pertama per sesi,
// berikutnya diganti tirai pendek supaya tidak mengganggu.
function preloader(lenis: Lenis): Promise<void> {
  const el = document.querySelector<HTMLElement>('.loader');
  const seen = sessionStorage.getItem('seen');
  if (!el || seen || sessionStorage.getItem('curtain') !== null) {
    el?.remove();
    curtainIn();
    return Promise.resolve();
  }
  sessionStorage.setItem('seen', '1');
  lenis.stop();
  const bar = el.querySelector('.loader-bar span')!;
  const names = el.querySelectorAll('.loader-name span');
  gsap.from(names, { yPercent: 100, duration: 1, ease, stagger: 0.08 });
  const ready = Promise.all([document.fonts.ready, new Promise((r) => (document.readyState === 'complete' ? r(0) : addEventListener('load', r, { once: true })))]);
  const min = new Promise((r) => setTimeout(r, 1100));
  gsap.to(bar, { scaleX: 0.85, duration: 1.1, ease: 'power2.out' });
  return Promise.all([ready, min]).then(() => new Promise<void>((done) => {
    gsap.timeline({ onComplete: () => { el.remove(); lenis.start(); } })
      .to(bar, { scaleX: 1, duration: 0.3 })
      .to(el, { yPercent: -100, duration: 1, ease: 'expo.inOut' })
      .add(done, '-=0.55');
  }));
}

// Manifesto: kata terisi satu per satu mengikuti scroll (membaca sambil menggulir).
let manifestoST: ScrollTrigger | undefined;
function manifesto() {
  const p = document.querySelector<HTMLElement>('[data-fill]');
  if (!p) return;
  manifestoST?.kill();
  const span = p.querySelector<HTMLElement>(`[lang="${document.documentElement.lang}"]`)!;
  if (!span.dataset.words) {
    span.innerHTML = span.textContent!.trim().split(/\s+/).map((w) => `<span class="word">${w}</span>`).join(' ');
    span.dataset.words = '1';
  }
  const words = span.querySelectorAll('.word');
  gsap.set(words, { opacity: 0.14 });
  manifestoST = gsap.to(words, {
    opacity: 1, stagger: 0.1, ease: 'none',
    scrollTrigger: { trigger: p, start: 'top 75%', end: 'bottom 45%', scrub: true },
  }).scrollTrigger;
}

// Karya pilihan: panel di-pin lalu digeser ke samping; penghitung 01/06 ikut berubah.
function featuredPan() {
  const pin = document.querySelector<HTMLElement>('.featured-pin');
  const track = pin?.querySelector<HTMLElement>('.featured-track');
  if (!pin || !track) return;
  const now = pin.querySelector('.fp-now')!;
  const slides = gsap.utils.toArray<HTMLElement>('.slide', track);
  gsap.matchMedia().add('(min-width: 901px)', () => {
    pin.classList.add('is-pinned');
    const dist = () => track.scrollWidth - innerWidth;
    gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: {
        trigger: pin, start: 'top 64px', end: () => `+=${dist()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true,
        onUpdate: (s) => { now.textContent = String(Math.min(slides.length, Math.round(s.progress * (slides.length - 1)) + 1)).padStart(2, '0'); },
      },
    });
    return () => pin.classList.remove('is-pinned');
  });
}

// Linimasa: garis cobalt tumbuh mengikuti posisi baca.
function timeline() {
  const list = document.querySelector<HTMLElement>('.tl-list');
  if (!list) return;
  gsap.fromTo(list, { '--tl': 0 }, { '--tl': 1, ease: 'none', scrollTrigger: { trigger: list, start: 'top 70%', end: 'bottom 70%', scrub: true } });
  for (const li of list.children) {
    gsap.from(li, { x: -24, opacity: 0, duration: 1, ease, scrollTrigger: { trigger: li, start: 'top 85%', once: true } });
  }
}

// ---------- Detail mikro (hanya pointer presisi: mouse/trackpad) ----------
const fine = () => matchMedia('(hover: hover) and (pointer: fine)').matches;

// Tombol utama sedikit tertarik ke kursor: memberi tanda bisa diklik.
function magnetic() {
  if (!fine()) return;
  for (const el of $$('[data-magnetic]')) {
    const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' });
    const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - r.left - r.width / 2) * 0.3);
      y((e.clientY - r.top - r.height / 2) * 0.3);
    });
    el.addEventListener('pointerleave', () => { x(0); y(0); });
  }
}

// Label mengikuti kursor di atas kartu/bidang: memberi tahu aksi klik ("Buka", "Tonton").
function cursorLabel() {
  const label = document.querySelector<HTMLElement>('.cursor-label');
  if (!label || !fine()) return;
  const x = gsap.quickTo(label, 'x', { duration: 0.35, ease: 'power3' });
  const y = gsap.quickTo(label, 'y', { duration: 0.35, ease: 'power3' });
  addEventListener('pointermove', (e) => { x(e.clientX); y(e.clientY); }, { passive: true });
  for (const el of $$('[data-cursor]')) {
    el.addEventListener('pointerenter', () => {
      const [id, en] = el.dataset.cursor!.split('|');
      label.textContent = document.documentElement.lang === 'en' ? en : id;
      gsap.to(label, { scale: 1, autoAlpha: 1, duration: 0.35, ease: 'back.out(2)' });
    });
    el.addEventListener('pointerleave', () => gsap.to(label, { scale: 0, autoAlpha: 0, duration: 0.25 }));
  }
}

// Stage 3D: hanya bila WebGL2 ada. Jika gagal, hero tetap utuh (teks saja).
function loadStage() {
  const canvas = document.querySelector<HTMLCanvasElement>('.stage');
  if (!canvas || !document.createElement('canvas').getContext('webgl2')) {
    canvas?.remove();
    document.documentElement.classList.add('no-stage');
    return;
  }
  import('./stage3d').then((m) => m.start(canvas)).catch(() => { canvas.remove(); document.documentElement.classList.add('no-stage'); });
}

// Judul utama: terbuka per baris. Hierarki: nama halaman muncul pertama.
function revealTitles() {
  document.fonts.ready.then(() => {
    for (const el of $$('[data-split]')) {
      const s = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'split-line' });
      gsap.set(el, { visibility: 'visible' });
      gsap.from(s.lines, { yPercent: 110, duration: 1.3, stagger: 0.09, ease, delay: 0.15 });
    }
  });
  for (const el of $$('[data-reveal]')) {
    gsap.set(el, { visibility: 'visible' });
    gsap.from(el, { y: 40, opacity: 0, duration: 1.1, ease, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  }
}

// Foto hero & showreel: terbuka dari bawah, menarik fokus ke media utama.
function revealClips() {
  for (const el of $$('[data-reveal-clip]')) {
    gsap.to(el, { clipPath: 'inset(0% 0 0 0)', duration: 1.6, ease, delay: 0.35, scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
  }
}

// Kedalaman ringan pada gambar kartu saat di-scroll.
function parallax() {
  for (const fig of $$('[data-parallax]')) {
    const img = fig.querySelector('img');
    if (!img || img.hasAttribute('data-tall')) continue;
    gsap.fromTo(img, { yPercent: -5, scale: 1.12 }, {
      yPercent: 5, ease: 'none',
      scrollTrigger: { trigger: fig, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  }
}

// Beranda: tiga bidang ditumpuk, tiap bidang naik menutup yang sebelumnya (urutan 01 > 02 > 03).
function fieldsStack() {
  const track = document.querySelector<HTMLElement>('.fields-track');
  if (!track) return;
  gsap.matchMedia().add('(min-width: 901px)', () => {
    const fields = gsap.utils.toArray<HTMLElement>('.field', track);
    track.classList.add('is-stacked');
    gsap.set(fields.slice(1), { yPercent: 100 });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: track, start: 'top 64px', end: () => `+=${innerHeight * (fields.length - 1)}`, pin: true, scrub: 0.6, invalidateOnRefresh: true },
    });
    fields.slice(1).forEach((f, i) => {
      tl.to(f, { yPercent: 0, ease: 'none' }, i);
      tl.to(fields[i], { scale: 0.94, opacity: 0.4, ease: 'none' }, i);
    });
    return () => track.classList.remove('is-stacked');
  });
}

// ---------- Transisi halaman: tirai cobalt membawa nama halaman tujuan ----------
const curtain = () => document.querySelector<HTMLElement>('.curtain')!;

function curtainIn() {
  const label = sessionStorage.getItem('curtain');
  if (label === null) return;
  sessionStorage.removeItem('curtain');
  const c = curtain();
  c.querySelector('.curtain-label')!.textContent = label;
  gsap.fromTo(c, { yPercent: 0, visibility: 'visible' }, { yPercent: -100, duration: 0.9, ease: 'expo.inOut', delay: 0.1, onComplete: () => gsap.set(c, { visibility: 'hidden' }) });
}

function pageLinks(lenis: Lenis) {
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || (url.pathname === location.pathname && url.hash)) return;
    if (url.pathname === location.pathname) return;
    e.preventDefault();
    const label = a.dataset.curtain ?? (url.pathname === '/' ? 'Diandra' : a.textContent?.trim() ?? '');
    try { sessionStorage.setItem('curtain', label); } catch {}
    lenis.stop();
    const c = curtain();
    c.querySelector('.curtain-label')!.textContent = label;
    gsap.fromTo(c, { yPercent: 100, visibility: 'visible' }, { yPercent: 0, duration: 0.7, ease: 'expo.inOut', onComplete: () => { location.href = url.href; } });
  });
  // Kembali lewat bfcache: pastikan tirai tidak menutup halaman.
  addEventListener('pageshow', (e) => { if (e.persisted) { gsap.set(curtain(), { visibility: 'hidden' }); lenis.start(); } });
}


