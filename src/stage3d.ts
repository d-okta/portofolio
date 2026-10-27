import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Objek kaca layar penuh di Beranda.
// Fungsi: titik fokus hero yang bisa "dimainkan" (ditarik kursor, ditekan saat diklik) dan menemani
// pengunjung sampai manifesto, lalu memudar saat konten karya dimulai.

const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+10.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 q0=vec3(a0.xy,h.x); vec3 q1=vec3(a0.zw,h.y); vec3 q2=vec3(a1.xy,h.z); vec3 q3=vec3(a1.zw,h.w);
  vec4 nm=taylorInvSqrt(vec4(dot(q0,q0),dot(q1,q1),dot(q2,q2),dot(q3,q3)));
  q0*=nm.x; q1*=nm.y; q2*=nm.z; q3*=nm.w;
  vec4 m=max(0.5-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 105.0*dot(m*m,vec4(dot(q0,x0),dot(q1,x1),dot(q2,x2),dot(q3,x3)));
}`;

const HEAD = /* glsl */ `
uniform float uTime; uniform float uAmp; uniform float uPull; uniform vec3 uMouse;
${NOISE}
float disp(vec3 n0){
  float n = snoise(n0 * 1.3 + vec3(0.0, uTime * 0.2, uTime * 0.13));
  float k = max(dot(n0, normalize(uMouse)), 0.0);
  return n * uAmp + uPull * pow(k, 5.0);
}
`;

// Normal dihitung ulang dari permukaan yang sudah terdeformasi (beda hingga), supaya pembiasan ikut berubah.
const NORMAL = /* glsl */ `
vec3 objectNormal;
{
  vec3 n0 = normalize(position);
  vec3 t = normalize(cross(n0, abs(n0.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0)));
  vec3 b = cross(n0, t);
  float e = 0.012;
  vec3 q1 = normalize(n0 + t * e); vec3 q2 = normalize(n0 + b * e);
  vec3 p0 = n0 * (1.0 + disp(n0)); vec3 p1 = q1 * (1.0 + disp(q1)); vec3 p2 = q2 * (1.0 + disp(q2));
  objectNormal = normalize(cross(p1 - p0, p2 - p0));
}
`;

type Pose = { fx: number; fy: number; r: number };

export function start(canvas: HTMLCanvasElement, onReady?: () => void) {
  const small = matchMedia('(max-width: 900px)').matches;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !small, alpha: true, powerPreference: 'high-performance' });
  // ponytail: DPR dibatasi demi baterai; naikkan bila tampak kabur di layar 4K.
  renderer.setPixelRatio(Math.min(devicePixelRatio, small ? 1.25 : 1.6));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.z = 10;

  const uniforms = {
    uTime: { value: 0 }, uAmp: { value: 0.1 }, uPull: { value: 0 },
    uMouse: { value: new THREE.Vector3(0, 0, 1) },
  };
  const glass = new THREE.MeshPhysicalMaterial({
    color: 0xffffff, roughness: 0.05, transmission: 1, thickness: 1.4, ior: 1.42, dispersion: 5,
    iridescence: 0.3, clearcoat: 1, attenuationColor: new THREE.Color(0xd2d8ff), attenuationDistance: 2.5,
  });
  glass.onBeforeCompile = (s) => {
    Object.assign(s.uniforms, uniforms);
    s.vertexShader = HEAD + s.vertexShader
      .replace('#include <beginnormal_vertex>', NORMAL)
      .replace('#include <begin_vertex>', '#include <begin_vertex>\ntransformed = normalize(position) * (1.0 + disp(normalize(position)));');
  };
  const blob = new THREE.Mesh(new THREE.IcosahedronGeometry(1, small ? 28 : 56), glass);
  const core = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.34, 0.1, 220, 28),
    new THREE.MeshStandardMaterial({ color: 0x2f4bff, roughness: 0.3, metalness: 0.15 }),
  );
  scene.add(blob, core);

  // Pose dalam satuan layar: fx/fy = posisi pusat (0..1), r = jari-jari dalam piksel.
  const heroPose = (): Pose => (innerWidth > 900
    ? { fx: 0.7, fy: 0.5, r: Math.min(innerHeight * 0.3, innerWidth * 0.2) }
    : { fx: 0.72, fy: 0.24, r: Math.min(innerWidth * 0.26, innerHeight * 0.13) });
  const manifestoPose = (): Pose => (innerWidth > 900
    ? { fx: 0.86, fy: 0.62, r: Math.min(innerHeight * 0.16, 170) }
    : { fx: 0.82, fy: 0.18, r: innerWidth * 0.16 });
  const pose: Pose = heroPose();

  let halfH = 1, halfW = 1;
  const resize = () => {
    renderer.setSize(innerWidth, innerHeight, false);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    halfH = camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    halfW = halfH * camera.aspect;
  };
  resize();
  addEventListener('resize', resize);

  // Koreografi scroll: hero -> manifesto, lalu memudar saat bagian bidang masuk.
  gsap.timeline({
    scrollTrigger: { trigger: '.hero', start: 'top top', endTrigger: '.manifesto', end: 'top 20%', scrub: 1, invalidateOnRefresh: true },
  }).fromTo(pose,
    { fx: () => heroPose().fx, fy: () => heroPose().fy, r: () => heroPose().r },
    { fx: () => manifestoPose().fx, fy: () => manifestoPose().fy, r: () => manifestoPose().r, ease: 'none' });
  const fade = { o: 1 };
  gsap.to(fade, { o: 0, ease: 'none', scrollTrigger: { trigger: '.fields', start: 'top bottom', end: 'top 40%', scrub: true } });

  // Kursor: menarik permukaan ke arahnya; gerakan cepat membuat kaca bergelombang; klik menekan.
  const m = { x: 0, y: 0, near: 0, vel: 0 };
  const pull = gsap.quickTo(uniforms.uPull, 'value', { duration: 0.8, ease: 'power3' });
  const center = () => ({ x: pose.fx * innerWidth, y: pose.fy * innerHeight });
  addEventListener('pointermove', (e) => {
    m.vel = Math.min(m.vel + Math.hypot(e.movementX, e.movementY) / 400, 1);
    m.x = e.clientX; m.y = e.clientY;
    const c = center();
    m.near = gsap.utils.clamp(0, 1, 1.9 - Math.hypot(e.clientX - c.x, e.clientY - c.y) / pose.r);
    pull(m.near * 0.32 * fade.o);
  }, { passive: true });
  const spin = { v: 0 };
  addEventListener('pointerdown', (e) => {
    const c = center();
    if (Math.hypot(e.clientX - c.x, e.clientY - c.y) > pose.r * 1.15 || fade.o < 0.5) return;
    gsap.killTweensOf(uniforms.uPull);
    gsap.fromTo(uniforms.uPull, { value: -0.42 }, { value: m.near * 0.32, duration: 1.6, ease: 'elastic.out(1, 0.3)' });
    gsap.fromTo(spin, { v: 6 }, { v: 0, duration: 2, ease: 'power3.out' });
  });

  const dir = new THREE.Vector3();
  const inv = new THREE.Quaternion();
  const clock = new THREE.Timer();
  let rot = 0;
  const intro = { s: 0 };
  gsap.to(intro, { s: 1, duration: 2, ease: 'expo.out', delay: 0.15 });

  const tick = () => {
    if (document.hidden || fade.o <= 0.001) { canvas.style.opacity = '0'; return; }
    canvas.style.opacity = String(fade.o);
    clock.update();
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.getElapsed();
    m.vel *= 0.94;
    uniforms.uTime.value = t;
    uniforms.uAmp.value = 0.09 + m.vel * 0.2;
    rot += dt * (0.12 + spin.v);

    const unit = (2 * halfH) / innerHeight; // satuan dunia per piksel
    const s = pose.r * unit * intro.s;
    blob.position.set((pose.fx - 0.5) * 2 * halfW, -(pose.fy - 0.5) * 2 * halfH, 0);
    blob.scale.setScalar(s);
    blob.rotation.set(rot * 0.6, rot, 0);
    core.position.copy(blob.position);
    core.scale.setScalar(s);
    core.rotation.set(t * 0.3, rot * 1.4, ScrollTrigger.isScrolling() ? t : core.rotation.z);

    // Arah kursor relatif ke pusat objek, dalam ruang objek.
    const c = center();
    dir.set((m.x - c.x) / pose.r, -(m.y - c.y) / pose.r, 1.2).normalize();
    uniforms.uMouse.value.copy(dir.applyQuaternion(inv.copy(blob.quaternion).invert()));

    renderer.render(scene, camera);
  };
  gsap.ticker.add(tick);
  onReady?.();
}
