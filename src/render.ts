// Dijalankan saat build/dev oleh plugin di vite.config.ts. Mengganti penanda <!--x--> di HTML.
import { projects, featured, type L, type Project, type Field } from './data/projects.ts';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const t = (l: L) => `<span lang="id">${esc(l.id)}</span><span lang="en">${esc(l.en)}</span>`;

const byId = (id: string) => {
  const p = projects.find((x) => x.id === id);
  if (!p) throw new Error(`proyek tidak ada: ${id}`);
  return p;
};

function media(p: Project, sizes = '(min-width: 900px) 50vw, 100vw') {
  if (!p.img) return `<div class="card-type" aria-hidden="true">${esc(p.title)}</div>`;
  return `<img src="/img/${p.img}.webp" alt="" loading="lazy" decoding="async" width="1600" height="1000" sizes="${sizes}"${p.tall ? ' data-tall' : ''}>`;
}

function dialog(p: Project) {
  const links = (p.links ?? [])
    .map((l) => `<a class="btn btn-ghost" href="${esc(l.href)}" target="_blank" rel="noopener">${t(l.label)}</a>`)
    .join('');
  const solo = p.solo ? `<p class="meta">${t({ id: 'Dikerjakan sendiri', en: 'Solo build' })}</p>` : '';
  const img = p.img ? `<img src="/img/${p.img}.webp" alt="${esc(p.title)}" loading="lazy" decoding="async"${p.tall ? ' data-tall' : ''}>` : '';
  return `<dialog class="detail" id="d-${p.id}" aria-labelledby="t-${p.id}" data-lenis-prevent>
  <div class="detail-inner">
    <button class="detail-close" type="button" data-close aria-label="Tutup">${t({ id: 'Tutup', en: 'Close' })}</button>
    ${img ? `<figure class="detail-media">${img}</figure>` : ''}
    <div class="detail-body">
      <h3 id="t-${p.id}">${esc(p.title)}</h3>
      ${solo}
      <p>${t(p.desc)}</p>
      <ul class="stack">${p.stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
      ${links ? `<div class="detail-links">${links}</div>` : ''}
    </div>
  </div>
</dialog>`;
}

export function card(p: Project, cls = '') {
  return `<article class="card ${cls}">
  <a class="card-hit" href="#d-${p.id}" data-open="d-${p.id}" aria-haspopup="dialog">
    <figure class="card-media" data-parallax>${media(p)}</figure>
    <div class="card-body">
      <h3>${esc(p.title)}</h3>
      <p>${t(p.summary)}</p>
      <p class="tags">${p.stack.slice(0, 3).map(esc).join(' / ')}</p>
    </div>
  </a>
  ${dialog(p)}
</article>`;
}

export function videoCard(p: Project, cls = '') {
  const yt = p.youtube
    ? `<button class="btn btn-ghost" type="button" data-yt="${esc(p.youtube)}" data-yt-title="${esc(p.title)}">${t({ id: 'Tonton versi penuh', en: 'Watch full film' })}</button>`
    : '';
  return `<article class="card video-card ${cls}">
  <figure class="card-media">
    <video src="/video/${p.video}.mp4" poster="/video/${p.video}.webp" muted loop playsinline preload="none" aria-label="Cuplikan ${esc(p.title)}"></video>
  </figure>
  <div class="card-body">
    <h3>${esc(p.title)}</h3>
    <p>${t(p.summary)}</p>
    ${yt}
  </div>
</article>`;
}

const of = (f: Field) => projects.filter((p) => p.fields.includes(f));

const EMAIL = 'diandra.oktansyah.s.m@gmail.com';
const pages = [
  { key: 'programming', href: '/programming/', label: 'Programming' },
  { key: 'uiux', href: '/uiux/', label: 'UI/UX' },
  { key: 'video', href: '/video/', label: 'Video' },
];

function header(current: string) {
  const links = pages
    .map((p) => `<li><a href="${p.href}"${p.key === current ? ' aria-current="page"' : ''}>${p.label}</a></li>`)
    .join('');
  return `<a class="skip" href="#main">${t({ id: 'Lewati ke konten', en: 'Skip to content' })}</a>
<header class="site-header">
  <a class="brand" href="/"${current === 'home' ? ' aria-current="page"' : ''}>Diandra OSM</a>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav">${t({ id: 'Menu', en: 'Menu' })}</button>
  <nav id="site-nav" class="site-nav" aria-label="${current === 'home' ? 'Utama' : 'Halaman'}">
    <ul>${links}<li><a href="#kontak">${t({ id: 'Kontak', en: 'Contact' })}</a></li></ul>
    <button class="lang-btn" type="button" data-lang-toggle><span lang="id" aria-label="Switch to English">EN</span><span lang="en" aria-label="Ganti ke Bahasa Indonesia">ID</span></button>
  </nav>
</header>`;
}

function footer() {
  const subject = encodeURIComponent('Proyek freelance');
  return `<footer class="contact" id="kontak">
  <p class="contact-kicker">${t({ id: 'Terbuka untuk freelance', en: 'Available for freelance' })}</p>
  <h2 class="contact-title">${t({ id: 'Ada proyek? Tulis ke saya.', en: 'Got a project? Write to me.' })}</h2>
  <a class="contact-mail" href="mailto:${EMAIL}?subject=${subject}">${EMAIL}</a>
  <ul class="contact-links">
    <li><a href="https://instagram.com/diandra.osm" target="_blank" rel="noopener">Instagram</a></li>
    <li><a href="https://github.com/d-okta" target="_blank" rel="noopener">GitHub</a></li>
    <li><a href="https://discord.com/users/1152814653680914484" target="_blank" rel="noopener">Discord</a></li>
  </ul>
  <p class="contact-foot">Diandra Oktansyah Satria Mandala, Surabaya</p>
</footer>
<div class="curtain" aria-hidden="true"><span class="curtain-label"></span></div>`;
}

export const blocks: Record<string, () => string> = {
  'header:home': () => header('home'),
  'header:programming': () => header('programming'),
  'header:uiux': () => header('uiux'),
  'header:video': () => header('video'),
  footer,
  'cards:web': () => of('web').map((p, i) => card(p, i < 4 ? 'card-lg' : '')).join('\n'),
  'cards:app': () => of('app').map((p) => card(p, 'card-row')).join('\n'),
  'cards:game': () => of('game').map((p) => card(p, 'card-fit')).join('\n'),
  'cards:uiux': () => of('uiux').filter((p) => p.id !== 'web-cetak').map((p) => card(p)).join('\n'),
  'cards:video': () => of('video').map((p, i) => videoCard(p, i < 2 ? 'card-lg' : '')).join('\n'),
  featured: () =>
    [
      ...featured.map((id, i) => card(byId(id), `f-${i + 1}`)),
      // ponytail: 2 video sementara (versi final); ganti ID di sini setelah pemilik memilih.
      videoCard(byId('v-xploration'), 'f-5'),
      videoCard(byId('v-good-day'), 'f-6'),
    ].join('\n'),
};

export function renderHtml(html: string) {
  return html.replace(/<!--([\w:]+)-->/g, (m, key: string) => (blocks[key] ? blocks[key]() : m));
}
