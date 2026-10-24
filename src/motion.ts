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

  curtainIn();
  revealTitles();
  revealClips();
  parallax();
  fieldsStack();
  pageLinks(lenis);
  if (document.body.dataset.page === 'home') loadHero();

  addEventListener('langchange', () => ScrollTrigger.refresh());
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

// ---------- Hero 3D: dimuat setelah halaman siap dan hanya jika WebGL tersedia ----------
function loadHero() {
  const canvas = document.querySelector<HTMLCanvasElement>('.hero-canvas');
  // ponytail: HP tidak memuat 3D (hemat baterai & data, ruang hero sempit). Tambah versi kecil bila diminta.
  if (!canvas || !matchMedia('(min-width: 901px)').matches || !document.createElement('canvas').getContext('webgl2')) { canvas?.remove(); return; }
  const go = () => import('./hero3d').then((m) => m.start(canvas)).catch(() => canvas.remove());
  if (document.readyState === 'complete') go(); else addEventListener('load', go, { once: true });
}
