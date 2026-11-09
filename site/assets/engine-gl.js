/* Renderizador WebGL das técnicas 3D (three.js).
   Usa os mesmos dados do motor de canvas (Judo.pose3: articulações já resolvidas pelo IK),
   mas desenha com buffer de profundidade, luz e sombra, e câmera orbital livre.
   As anotações (rótulos, setas, carimbo) continuam no canvas 2D, por cima, projetadas da cena. */
import * as THREE from './vendor/three/three.module.min.js';
import { OrbitControls } from './vendor/three/OrbitControls.js';

const J = window.Judo;
const D = Math.PI / 180;
const V3 = (p) => new THREE.Vector3(p[0], p[1], p[2]);
const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
const lerp3 = (a, b, k) => add(a, mul(sub(b, a), k));
const bp = (o, f, u, r) => add(o.hip, add(mul(o.f, f), add(mul(o.u, u), mul(o.r, r))));
const UP = new THREE.Vector3(0, 1, 0);

function css(name) { return getComputedStyle(document.documentElement).getPropertyValue('--' + name).trim(); }

/* Rampa de 3 tons para o sombreado "desenho" (cel shading) com luz de verdade. */
function toonRamp() {
  const data = new Uint8Array([90, 90, 90, 255, 170, 170, 170, 255, 255, 255, 255, 255]);
  const t = new THREE.DataTexture(data, 3, 1, THREE.RGBAFormat);
  t.minFilter = t.magFilter = THREE.NearestFilter; t.needsUpdate = true; return t;
}

/* Tronco como uma malha única no referencial do corpo: anéis elípticos ao longo da coluna
   (u = altura acima do quadril; rx = meia-largura para os lados; rz = meia-profundidade; fz = deslocamento à frente). */
const TORSO = [
  [-0.10, 0.05, 0.04, 0], [-0.07, 0.13, 0.085, 0], [0.0, 0.165, 0.105, 0], [0.08, 0.172, 0.108, 0],
  [0.17, 0.148, 0.095, 0.005], [0.26, 0.158, 0.1, 0.01], [0.35, 0.188, 0.112, 0.012], [0.42, 0.205, 0.108, 0.008],
  [0.47, 0.2, 0.09, 0], [0.51, 0.15, 0.072, 0], [0.545, 0.075, 0.058, 0.005], [0.56, 0.045, 0.045, 0.005]];
function torsoGeometry(extra = 0, seg = 28) {
  const pos = [], idx = [];
  TORSO.forEach(([u, rx, rz, fz], i) => {
    const cap = i === 0 || i === TORSO.length - 1 ? 0.5 : 1;
    for (let k = 0; k < seg; k++) { const a = (k / seg) * Math.PI * 2;
      pos.push(Math.sin(a) * (rx + extra) * cap, u, fz + Math.cos(a) * (rz + extra) * cap); } });
  for (let i = 0; i < TORSO.length - 1; i++) for (let k = 0; k < seg; k++) {
    const a = i * seg + k, b = i * seg + ((k + 1) % seg), c = a + seg, d = b + seg; idx.push(a, b, c, b, d, c); }
  const n = TORSO.length * seg; pos.push(0, TORSO[0][0] - 0.01, 0, 0, TORSO[TORSO.length - 1][0] + 0.005, 0);
  for (let k = 0; k < seg; k++) { idx.push(n, (k + 1) % seg, k); idx.push(n + 1, (TORSO.length - 1) * seg + k, (TORSO.length - 1) * seg + ((k + 1) % seg)); }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals(); return g;
}

class Figure {
  constructor(scene, colors, ramp) {
    this.parts = []; this.scene = scene;
    const mat = (c) => new THREE.MeshToonMaterial({ color: c, gradientMap: ramp });
    this.m = { gi: mat(colors.gi), gi2: mat(colors.gi2), skin: mat(colors.skin), hair: mat(colors.hair), belt: mat(colors.belt), lapel: mat(colors.lapel) };
    this.line = new THREE.MeshBasicMaterial({ color: colors.line, side: THREE.BackSide });
    this.sphereG = new THREE.SphereGeometry(1, 24, 16);
    this.cylG = new THREE.CylinderGeometry(1, 1, 1, 20, 1, true);
  }
  /* malha + casca de contorno (inverted hull) */
  mesh(geo, mat, outline = 0.012) {
    const m = new THREE.Mesh(geo, mat); m.castShadow = true; m.receiveShadow = true;
    const o = new THREE.Mesh(geo, this.line); o.userData.outline = outline;
    this.scene.add(m); this.scene.add(o); const p = { m, o }; this.parts.push(p); return p;
  }
  sphere(mat) { return this.mesh(this.sphereG, mat); }
  /* segmento: cilindro afunilado + esferas nas pontas, desenhado entre dois pontos */
  segment(mat) { return { a: this.sphere(mat), b: this.sphere(mat), c: this.mesh(new THREE.CylinderGeometry(1, 1, 1, 20, 1, true), mat) }; }
  static place(p, pos, scale, quat) {
    for (const [mm, k] of [[p.m, 0], [p.o, p.o.userData.outline]]) {
      mm.position.copy(pos);
      if (quat) mm.quaternion.copy(quat); else mm.quaternion.identity();
      mm.scale.set(scale.x + k, scale.y + (quat ? 0 : k), scale.z + k);
    }
  }
  static setSeg(s, a, b, ra, rb) {
    const A = V3(a), Bv = V3(b), d = Bv.clone().sub(A), L = Math.max(d.length(), 1e-4);
    const q = new THREE.Quaternion().setFromUnitVectors(UP, d.clone().normalize());
    Figure.place(s.a, A, new THREE.Vector3(ra, ra, ra));
    Figure.place(s.b, Bv, new THREE.Vector3(rb, rb, rb));
    const g = s.c.m.geometry, k = s.c.o.userData.outline;
    if (g.userData.ra !== ra || g.userData.rb !== rb) {
      const ng = new THREE.CylinderGeometry(rb, ra, 1, 20, 1, true); ng.userData = { ra, rb };
      const og = new THREE.CylinderGeometry(rb + k, ra + k, 1, 20, 1, true);
      s.c.m.geometry.dispose(); if (s.c.o.geometry !== g) s.c.o.geometry.dispose();
      s.c.m.geometry = ng; s.c.o.geometry = og;
    }
    const mid = A.clone().add(d.multiplyScalar(0.5));
    for (const mm of [s.c.m, s.c.o]) { mm.position.copy(mid); mm.quaternion.copy(q); mm.scale.set(1, L, 1); }
  }
  setGlow(list, color, k) {
    for (const s of list) for (const p of [s.a, s.b, s.c]) {
      p.m.material = p.m.userData.base || p.m.material;
      if (k > 0) { p.m.userData.base = p.m.userData.base || p.m.material;
        const g = p.m.userData.base.clone(); g.emissive = new THREE.Color(color); g.emissiveIntensity = 0.32 * k; p.m.material = g; }
    }
  }
}

/* Monta o boneco uma vez e atualiza as transformações a cada quadro. */
class Body extends Figure {
  constructor(scene, colors, ramp) {
    super(scene, colors, ramp);
    this.torso = this.mesh(torsoGeometry(0), this.m.gi); this.torso.o.geometry = torsoGeometry(0.012);
    this.neck = this.segment(this.m.skin); this.head = this.sphere(this.m.skin); this.hair = this.sphere(this.m.hair);
    this.nose = this.sphere(this.m.skin);
    this.belt = this.mesh(new THREE.TorusGeometry(1, 0.13, 10, 32), this.m.belt, 0.01);
    this.lapL = this.segment(this.m.lapel); this.lapR = this.segment(this.m.lapel);
    this.limbs = {};
    for (const s of ['R', 'L']) {
      this.limbs['leg' + s] = { th: this.segment(this.m.gi), sh: this.segment(this.m.gi), foot: this.segment(this.m.skin) };
      this.limbs['arm' + s] = { ua: this.segment(this.m.gi), fa: this.segment(this.m.gi), hand: this.sphere(this.m.skin), wrist: this.segment(this.m.skin) };
    }
  }
  frameQuat(o) {
    const m = new THREE.Matrix4().makeBasis(V3(o.r), V3(o.u), V3(o.f));
    return new THREE.Quaternion().setFromRotationMatrix(m);
  }
  update(o) {
    const q = this.frameQuat(o);
    for (const mm of [this.torso.m, this.torso.o]) { mm.position.copy(V3(o.hip)); mm.quaternion.copy(q); mm.scale.set(1, 1, 1); }
    Figure.place(this.belt, V3(bp(o, 0, 0.1, 0)), new THREE.Vector3(0.178, 0.115, 0.13),
      q.clone().multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2)));
    Figure.setSeg(this.lapL, bp(o, 0.12, 0.52, -0.07), bp(o, 0.135, 0.24, 0.02), 0.012, 0.012);
    Figure.setSeg(this.lapR, bp(o, 0.12, 0.52, 0.07), bp(o, 0.14, 0.31, -0.03), 0.012, 0.012);
    Figure.setSeg(this.neck, o.neck, lerp3(o.neck, o.head, 0.6), 0.045, 0.045);
    const hq = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(V3(o.r), V3(o.hu), V3(o.hf)));
    Figure.place(this.head, V3(o.head), new THREE.Vector3(0.095, 0.115, 0.105), hq);
    Figure.place(this.hair, V3(add(o.head, add(mul(o.hu, 0.025), mul(o.hf, -0.02)))), new THREE.Vector3(0.1, 0.105, 0.1), hq);
    Figure.place(this.nose, V3(add(o.head, mul(o.hf, 0.1))), new THREE.Vector3(0.02, 0.025, 0.02));
    for (const s of ['R', 'L']) {
      const L = o['leg' + s], A = o['arm' + s], l = this.limbs['leg' + s], a = this.limbs['arm' + s];
      Figure.setSeg(l.th, L.root, L.E, 0.085, 0.066);
      Figure.setSeg(l.sh, L.E, lerp3(L.E, L.H, 0.92), 0.064, 0.05);
      Figure.setSeg(l.foot, L.heel, L.toe, 0.035, 0.03);
      const cuff = lerp3(A.E, A.H, 0.74);
      Figure.setSeg(a.ua, A.root, A.E, 0.066, 0.056);
      Figure.setSeg(a.fa, A.E, cuff, 0.056, 0.054);
      Figure.setSeg(a.wrist, cuff, A.H, 0.03, 0.03);
      Figure.place(a.hand, V3(A.H), new THREE.Vector3(0.045, 0.05, 0.04));
    }
  }
}

function floor(scene, colors) {
  const g = new THREE.PlaneGeometry(40, 40);
  const c = document.createElement('canvas'); c.width = c.height = 512; const x = c.getContext('2d');
  x.fillStyle = colors.tatami; x.fillRect(0, 0, 512, 512);
  x.strokeStyle = colors.tatami2; x.lineWidth = 3;
  for (let i = 0; i <= 5; i++) { x.beginPath(); x.moveTo(i * 102.4, 0); x.lineTo(i * 102.4, 512); x.stroke(); }
  for (let i = 0; i <= 10; i++) { const off = (i % 2) * 51.2; x.beginPath(); x.moveTo(0, i * 51.2); x.lineTo(512, i * 51.2); x.stroke(); void off; }
  const tex = new THREE.CanvasTexture(c); tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(8, 8); tex.colorSpace = THREE.SRGBColorSpace;
  const m = new THREE.Mesh(g, new THREE.MeshLambertMaterial({ map: tex }));
  m.rotation.x = -Math.PI / 2; m.receiveShadow = true; scene.add(m);
}

function themeColors() {
  return {
    bg: css('wall') || '#E2E7DE', tatami: css('tatami') || '#A3B57F', tatami2: css('tatami-2') || '#8EA36A',
    tori: { gi: css('tori'), gi2: css('tori-2'), skin: css('skin'), hair: css('hair'), belt: css('belt'), lapel: css('tori-2'), line: css('tori-line') },
    uke: { gi: css('uke'), gi2: css('uke-2'), skin: css('skin'), hair: css('hair'), belt: css('belt'), lapel: css('uke-2'), line: css('uke-line') },
  };
}

/* Câmera a partir de uma vista do motor de canvas: azimute a, elevação e, centro e span. */
function viewToCamera(view, aspect, fov) {
  const a = view.a * D, e = view.e * D;
  const dir = new THREE.Vector3(Math.sin(a) * Math.cos(e), Math.sin(e), Math.cos(a) * Math.cos(e));
  const halfH = view.span / Math.min(1.5, aspect) / 2;
  const dist = halfH / Math.tan((fov * D) / 2) * 1.05;
  const target = V3(view.center);
  return { pos: target.clone().add(dir.multiplyScalar(dist)), target };
}

export function mountGL(host, def, { onFrame } = {}) {
  J.readTheme();
  const colors = themeColors();
  const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  host.appendChild(renderer.domElement);
  renderer.domElement.className = 'gl-canvas';
  const overlay = document.createElement('canvas'); overlay.className = 'gl-overlay'; host.appendChild(overlay);

  const scene = new THREE.Scene(); scene.background = new THREE.Color(colors.bg);
  scene.fog = new THREE.Fog(colors.bg, 7, 16);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x8a8f80, 1.6));
  const sun = new THREE.DirectionalLight(0xffffff, 1.4); sun.position.set(2.5, 5, 3.5); sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048); Object.assign(sun.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3, near: 0.5, far: 15 });
  sun.shadow.radius = 4; scene.add(sun);
  floor(scene, colors);
  const ramp = toonRamp();
  const bodies = { tori: new Body(scene, colors.tori, ramp), uke: new Body(scene, colors.uke, ramp) };

  const fov = 32;
  const camera = new THREE.PerspectiveCamera(fov, 1.5, 0.05, 50);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = 0.12;
  controls.minDistance = 1.2; controls.maxDistance = 9; controls.maxPolarAngle = Math.PI * 0.495;
  controls.enablePan = false;

  let t = 0, annot = true, size = [1, 1];
  function setView(i, animate = true) {
    const v = def.views[i] || def.views[0];
    const { pos, target } = viewToCamera(v, size[0] / size[1], fov);
    if (!animate) { camera.position.copy(pos); controls.target.copy(target); controls.update(); return; }
    const p0 = camera.position.clone(), t0 = controls.target.clone(); let k = 0;
    const step = () => { k = Math.min(1, k + 0.08); const e = k * k * (3 - 2 * k);
      camera.position.lerpVectors(p0, pos, e); controls.target.lerpVectors(t0, target, e); controls.update(); draw(); if (k < 1) requestAnimationFrame(step); };
    step();
  }
  function resize() {
    const r = host.getBoundingClientRect(); size = [Math.max(1, r.width), Math.max(1, r.height)];
    renderer.setSize(size[0], size[1], false);
    const dpr = window.devicePixelRatio || 1; overlay.width = size[0] * dpr; overlay.height = size[1] * dpr;
    camera.aspect = size[0] / size[1]; camera.updateProjectionMatrix();
  }
  /* "V" compatível com as primitivas 2D do motor (rótulo, seta, anel, carimbo) */
  function overlayView() {
    const [w, h] = size, dist = camera.position.distanceTo(controls.target);
    const sc = h / (2 * dist * Math.tan((fov * D) / 2));
    const S = (p) => { const v = V3(p).project(camera); return [(v.x + 1) / 2 * w, (1 - v.y) / 2 * h]; };
    return { w, h, sc, S, lw: Math.max(1, sc * 0.011), fs: Math.min(13.5, Math.max(10.5, w / 60)) };
  }
  function makeApi(ctx, V, F) {
    const P = J.prim;
    return { ctx, V, F, t: F.t, C: J.C, D, win: J.win, clamp: J.clamp, add, sub, mul, lerp3, bp,
      tag: (text, wp, dx, dy, col, a, lead = true) => P.tag(ctx, V, text, wp, dx, dy, col, a, lead),
      arrow: (a, b, col, al) => P.arrow(ctx, V, a, b, col, al), dashed: (a, b, col, al, wd) => P.dashed(ctx, V, a, b, col, al, wd),
      ring: (p, r, col, al) => P.ring(ctx, V, p, r, col, al),
      arc: (c, ax, ay, r, a0, a1, col, al) => { if (!(al > 0)) return; const pts = [];
        for (let i = 0; i <= 24; i++) { const an = (a0 + (a1 - a0) * i / 24) * D; pts.push(add(c, add(mul(ax, r * Math.cos(an)), mul(ay, r * Math.sin(an))))); }
        for (let i = 0; i < pts.length - 2; i++) P.dashed(ctx, V, pts[i], pts[i + 1], col, al, Math.max(2, V.fs * 0.2));
        P.arrow(ctx, V, pts[pts.length - 3], pts[pts.length - 1], col, al); } };
  }
  function draw() {
    const F = J.pose3(def, t);
    bodies.tori.update(F.tori); bodies.uke.update(F.uke);
    const g = def.glow, ga = annot && g ? J.win(t, g.s, g.e) : 0;
    for (const [who, B] of [['T', bodies.tori], ['U', bodies.uke]]) for (const s of ['R', 'L']) for (const kind of ['leg', 'arm']) {
      const key = `${who}.${s}.${kind}`, glow = g && g.limbs ? g.limbs[key] : null;
      const parts = Object.values(B.limbs[kind + s]).filter((p) => p.a);
      B.setGlow(parts, glow ? J.C[glow] : 0, glow ? ga : 0);
    }
    renderer.render(scene, camera);
    const ctx = overlay.getContext('2d'), dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, size[0], size[1]);
    if (annot) {
      const V = overlayView(), C = J.C, nm = def.names ? def.names(F) : {};
      const top = (o) => [o.hip[0], Math.max(o.head[1], o.hip[1]) + 0.3, o.hip[2]];
      J.prim.tag(ctx, V, 'TORI', nm.tori || top(F.tori), 0, 0, C['tori-line'], 0.95, false);
      J.prim.tag(ctx, V, 'UKE', nm.uke || top(F.uke), 0, 0, C.uke, 0.95, false);
      if (def.annotate) def.annotate(makeApi(ctx, V, F), F, 0);
      if (def.stamp) J.prim.stamp(ctx, V, def.stamp, t);
    }
    if (onFrame) onFrame(t);
  }
  controls.addEventListener('change', draw);
  new ResizeObserver(() => { resize(); draw(); }).observe(host);
  resize(); setView(0, false); draw();
  return {
    setTime(x) { t = x; draw(); }, setAnnot(v) { annot = v; draw(); }, setView, draw,
    camera, controls, renderer, get time() { return t; },
  };
}
