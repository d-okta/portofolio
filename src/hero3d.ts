import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import gsap from 'gsap';

// Objek kaca di hero. Fungsi: satu titik fokus yang bereaksi ke kursor dan scroll (identitas gaya Lusion).
export function start(canvas: HTMLCanvasElement) {
  const hero = canvas.parentElement!;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 9);

  // Inti cobalt di dalam kaca: tanpa sesuatu untuk dibiaskan, kaca transparan tidak terlihat.
  const back = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.62, 0.2, 160, 24),
    new THREE.MeshStandardMaterial({ color: 0x2f4bff, roughness: 0.35, metalness: 0.1 }),
  );
  scene.add(back);

  const geo = new THREE.IcosahedronGeometry(1.55, 48);
  const base = geo.attributes.position.array.slice() as Float32Array;
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff, metalness: 0, roughness: 0.06, transmission: 1, thickness: 1.6, ior: 1.45,
    dispersion: 4, iridescence: 0.35, clearcoat: 1, attenuationColor: new THREE.Color(0xc9d1ff), attenuationDistance: 3,
  });
  const blob = new THREE.Mesh(geo, mat);
  scene.add(blob);

  // Objek diletakkan di ruang kosong di atas judul (piksel layar -> koordinat dunia), jauh dari teks dan foto.
  let baseY = 0;
  const place = () => {
    const w = hero.clientWidth, h = hero.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const halfH = camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const halfW = halfH * camera.aspect;
    const r = Math.min(h * 0.15, 150);
    const s = (r * halfH) / (1.55 * (h / 2));
    blob.position.set((0.46 - 0.5) * 2 * halfW, -(0.22 - 0.5) * 2 * halfH, 0);
    baseY = blob.position.y;
    blob.scale.setScalar(s);
    back.scale.setScalar(s);
  };
  place();
  new ResizeObserver(place).observe(hero);

  // Input: kursor (dihaluskan quickTo) dan progres scroll hero.
  const target = { x: 0, y: 0, scroll: 0 };
  const qx = gsap.quickTo(target, 'x', { duration: 1.2, ease: 'power3' });
  const qy = gsap.quickTo(target, 'y', { duration: 1.2, ease: 'power3' });
  addEventListener('pointermove', (e) => { qx(e.clientX / innerWidth - 0.5); qy(e.clientY / innerHeight - 0.5); }, { passive: true });
  gsap.to(target, { scroll: 1, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });

  // Deformasi: noise sinus murah di CPU (geometri kecil, tetap ringan).
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  const deform = (t: number, amp: number) => {
    for (let i = 0; i < pos.count; i++) {
      v.fromArray(base, i * 3);
      const n = Math.sin(v.x * 1.7 + t) * Math.cos(v.y * 1.9 + t * 0.8) * Math.sin(v.z * 1.5 + t * 0.6);
      v.multiplyScalar(1 + n * amp);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
  };

  // Render hanya saat hero terlihat dan tab aktif.
  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(hero);

  const clock = new THREE.Clock();
  const s0 = blob.scale.x;
  gsap.fromTo([blob.scale, back.scale], { x: 0, y: 0, z: 0 }, { x: s0, y: s0, z: s0, duration: 1.8, ease: 'expo.out', delay: 0.2 });
  gsap.ticker.add(() => {
    if (!visible || document.hidden) return;
    const t = clock.getElapsedTime();
    deform(t * 0.6, 0.12 + target.scroll * 0.25);
    blob.rotation.set(target.y * 0.8 + t * 0.05, target.x * 1.2 + t * 0.08, 0);
    blob.position.y = baseY + target.scroll * 1.2;
    back.position.copy(blob.position);
    back.rotation.set(t * 0.3 - target.y, t * 0.4 + target.x * 2, target.scroll * 3);
    renderer.render(scene, camera);
  });
}
