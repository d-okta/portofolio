// Latar Beranda: gradien mesh WebGL yang bergerak pelan dan bereaksi ke scroll/kursor.
const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes; uniform float uTime, uScroll; uniform vec2 uMouse;
out vec4 o;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.-2.*f);
  return mix(mix(h(i), h(i+vec2(1,0)), f.x), mix(h(i+vec2(0,1)), h(i+vec2(1,1)), f.x), f.y); }
float fbm(vec2 p){ float v = 0., a = .5; for (int i = 0; i < 5; i++){ v += a*n(p); p *= 2.02; a *= .5; } return v; }
void main(){
  vec3 bg = vec3(.949, .949, .933), cobalt = vec3(.184, .294, 1.), lilac = vec3(.72, .66, 1.);
  vec2 uv = gl_FragCoord.xy / uRes.y;
  vec2 m = uMouse * vec2(uRes.x / uRes.y, 1.);
  float t = uTime, s = uScroll;
  vec3 c = bg;
  // Domain warp pelan; warna bergeser dari lila ke cobalt sepanjang scroll, melengkung dekat kursor.
    vec2 q = uv * 1.3 + vec2(0., s * 2.5);
    vec2 w = vec2(fbm(q + t * .04), fbm(q + 4.3 - t * .03));
    float f = fbm(q + 2. * w + (m - uv) * .25);
    c = mix(bg, mix(lilac, cobalt, s), smoothstep(.45, .85, f) * .55);
    c = mix(c, vec3(1.), smoothstep(.6, .2, f) * .35);

  o = vec4(c, 1.);
}`;

export function start(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl2', { antialias: false });
  if (!gl) return canvas.remove();
  const sh = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
  const p = gl.createProgram()!;
  gl.attachShader(p, sh(gl.VERTEX_SHADER, `#version 300 es
  void main(){ vec2 v = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2); gl_Position = vec4(v * 2. - 1., 0., 1.); }`));
  gl.attachShader(p, sh(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) return canvas.remove();
  gl.useProgram(p);
  const u = (k: string) => gl.getUniformLocation(p, k);

  // Gradien lembut: DPR 1 cukup dan hemat GPU.
  const dpr = 1;
  const resize = () => {
    canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(u('uRes'), canvas.width, canvas.height);
  };
  resize(); addEventListener('resize', resize);

  const mouse = { x: .5, y: .5, tx: .5, ty: .5 };
  addEventListener('pointermove', (e) => { mouse.tx = e.clientX / innerWidth; mouse.ty = 1 - e.clientY / innerHeight; }, { passive: true });
  let scroll = 0;
  const t0 = performance.now();
  const frame = () => {
    requestAnimationFrame(frame);
    if (document.hidden) return;
    const max = document.documentElement.scrollHeight - innerHeight;
    scroll += ((max > 0 ? scrollY / max : 0) - scroll) * .08;
    mouse.x += (mouse.tx - mouse.x) * .06; mouse.y += (mouse.ty - mouse.y) * .06;
    gl.uniform1f(u('uTime'), (performance.now() - t0) / 1000);
    gl.uniform1f(u('uScroll'), scroll);
    gl.uniform2f(u('uMouse'), mouse.x, mouse.y);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  frame();
}
