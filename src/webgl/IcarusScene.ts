import * as THREE from "three";
import { NOISE_GLSL } from "./noise.glsl";

/**
 * The signature moment: a volumetric FBM sun and procedurally-modelled wings
 * whose feathers disintegrate as Icarus climbs too close. Driven entirely by a
 * single scroll `progress` value in [0, 1].
 *
 * Self-contained: knows nothing about React. `create()` returns a handle, or
 * null if a WebGL context can't be acquired (caller then shows a fallback).
 */

export type IcarusHandle = {
  setProgress: (p: number) => void;
  resize: (w: number, h: number) => void;
  setRunning: (running: boolean) => void;
  dispose: () => void;
};

// Brand palette as linear-ish THREE colors.
const COL_OBSIDIAN = new THREE.Color("#0A0807");
const COL_GOLD = new THREE.Color("#C8841E");
const COL_GOLD_BRIGHT = new THREE.Color("#E8A33D");
const COL_EMBER = new THREE.Color("#7A2410");
const COL_SOLAR = new THREE.Color("#F4ECDD");

function gradient3(t: number, out: THREE.Color): THREE.Color {
  // root(obsidian) -> mid(gold) -> tip(gold-bright), used along each feather.
  if (t < 0.5) out.copy(COL_OBSIDIAN).lerp(COL_GOLD, t / 0.5);
  else out.copy(COL_GOLD).lerp(COL_GOLD_BRIGHT, (t - 0.5) / 0.5);
  return out;
}

/** Build one feather pointing along +X, root at origin. */
function buildFeather(
  length: number,
  maxHalfWidth: number,
  segments: number,
): {
  positions: number[];
  colors: number[];
  barb: number[]; // 0 at spine, 1 at vane edge
  indices: number[];
} {
  const positions: number[] = [];
  const colors: number[] = [];
  const barb: number[] = [];
  const indices: number[] = [];
  const c = new THREE.Color();

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = t * length;
    // Leaf taper: narrow root, swelling middle, fine tip.
    const w = Math.sin(Math.pow(t, 0.7) * Math.PI) * maxHalfWidth;
    gradient3(t, c);
    // Spine is darker than the vane.
    const spine = c.clone().multiplyScalar(0.35);

    // center (spine), top edge, bottom edge
    positions.push(x, 0, 0);
    colors.push(spine.r, spine.g, spine.b);
    barb.push(0);

    positions.push(x, w, 0);
    colors.push(c.r, c.g, c.b);
    barb.push(1);

    positions.push(x, -w, 0);
    colors.push(c.r, c.g, c.b);
    barb.push(1);
  }

  for (let i = 0; i < segments; i++) {
    const a = i * 3; // center
    const top = a + 1;
    const bot = a + 2;
    const a2 = (i + 1) * 3;
    const top2 = a2 + 1;
    const bot2 = a2 + 2;
    // upper vane
    indices.push(a, top, top2, a, top2, a2);
    // lower vane
    indices.push(a, bot2, bot, a, a2, bot2);
  }

  return { positions, colors, barb, indices };
}

/** Merge many feathers into one geometry, baking a wing arc transform. */
function buildWings(): THREE.BufferGeometry {
  const positions: number[] = [];
  const colors: number[] = [];
  const barb: number[] = [];
  const random: number[] = [];
  const anchor: number[] = [];
  const indices: number[] = [];

  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const v = new THREE.Vector3();
  const euler = new THREE.Euler();
  const anchorVec = new THREE.Vector3();

  const FEATHERS_PER_WING = 16;

  const addWing = (side: 1 | -1) => {
    for (let j = 0; j < FEATHERS_PER_WING; j++) {
      const t = j / (FEATHERS_PER_WING - 1); // 0 (shoulder) -> 1 (wingtip)
      const len = THREE.MathUtils.lerp(2.6, 1.0, t);
      const halfW = THREE.MathUtils.lerp(0.42, 0.16, t);
      const f = buildFeather(len, halfW, 7);

      // Arc placement: feathers fan upward and outward from a shoulder point.
      const arc = THREE.MathUtils.lerp(0.15, 1.25, t); // radians up the arc
      const rootX = side * (0.5 + t * 3.2);
      const rootY = Math.sin(arc) * 1.1 - 0.2;
      const rootZ = -t * 0.5;
      anchorVec.set(rootX, rootY, rootZ);

      // Point feather out & up; mirror for the other wing.
      euler.set(0, 0, side * (0.35 + arc * 0.55));
      q.setFromEuler(euler);
      m.compose(anchorVec, q, new THREE.Vector3(side, 1, 1));

      const baseIndex = positions.length / 3;
      const rnd = Math.random();
      for (let k = 0; k < f.positions.length; k += 3) {
        v.set(f.positions[k], f.positions[k + 1], f.positions[k + 2]).applyMatrix4(m);
        positions.push(v.x, v.y, v.z);
        anchor.push(anchorVec.x, anchorVec.y, anchorVec.z);
        random.push(rnd);
      }
      colors.push(...f.colors);
      barb.push(...f.barb);
      for (const idx of f.indices) indices.push(baseIndex + idx);
    }
  };

  addWing(1);
  addWing(-1);

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geo.setAttribute("aBarb", new THREE.Float32BufferAttribute(barb, 1));
  geo.setAttribute("aRandom", new THREE.Float32BufferAttribute(random, 1));
  geo.setAttribute("aAnchor", new THREE.Float32BufferAttribute(anchor, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

export function createIcarusScene(canvas: HTMLCanvasElement): IcarusHandle | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
  } catch {
    return null;
  }
  if (!renderer.getContext()) return null;

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 10);

  // Shared scroll-driven state.
  const params = { heat: 0, disintegration: 0 };
  let targetHeat = 0;
  let targetDisint = 0;

  // ---- SUN -----------------------------------------------------------------
  const sunUniforms = {
    uTime: { value: 0 },
    uHeat: { value: 0 },
    uColorCore: { value: COL_SOLAR.clone() },
    uColorMid: { value: COL_GOLD_BRIGHT.clone() },
    uColorEdge: { value: COL_EMBER.clone() },
  };
  const sunGeo = new THREE.IcosahedronGeometry(2.6, 24);
  const sunMat = new THREE.ShaderMaterial({
    uniforms: sunUniforms,
    vertexShader: /* glsl */ `
      ${NOISE_GLSL}
      uniform float uTime;
      uniform float uHeat;
      varying float vNoise;
      varying vec3 vNormalW;
      varying vec3 vView;
      void main(){
        vec3 p = position;
        float n = fbm(normalize(position) * 2.2 + uTime * 0.25);
        vNoise = n;
        // Surface boils: displace along normal, stronger with heat.
        float disp = n * (0.12 + uHeat * 0.28);
        p += normal * disp;
        vec4 world = modelMatrix * vec4(p, 1.0);
        vNormalW = normalize(mat3(modelMatrix) * normal);
        vView = normalize(cameraPosition - world.xyz);
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uHeat;
      uniform vec3 uColorCore;
      uniform vec3 uColorMid;
      uniform vec3 uColorEdge;
      varying float vNoise;
      varying vec3 vNormalW;
      varying vec3 vView;
      void main(){
        float n = vNoise * 0.5 + 0.5;
        // Hotter plasma in the troughs, charred ember on the crests.
        vec3 col = mix(uColorEdge, uColorMid, smoothstep(0.25, 0.6, n));
        col = mix(col, uColorCore, smoothstep(0.6, 0.95, n) * (0.5 + uHeat * 0.5));
        // Fresnel rim cools toward ember.
        float fres = pow(1.0 - max(dot(vNormalW, vView), 0.0), 2.5);
        col = mix(col, uColorEdge, fres * 0.6);
        float intensity = 1.0 + uHeat * 1.4;
        gl_FragColor = vec4(col * intensity, 1.0);
      }
    `,
  });
  const sun = new THREE.Mesh(sunGeo, sunMat);
  scene.add(sun);

  // ---- CORONA (additive shell) --------------------------------------------
  const coronaUniforms = {
    uTime: { value: 0 },
    uHeat: { value: 0 },
    uColor: { value: COL_GOLD.clone() },
  };
  const coronaMat = new THREE.ShaderMaterial({
    uniforms: coronaUniforms,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.BackSide,
    vertexShader: /* glsl */ `
      ${NOISE_GLSL}
      uniform float uTime;
      uniform float uHeat;
      varying float vRim;
      void main(){
        vec3 p = position;
        float n = fbm(normalize(position) * 3.0 + uTime * 0.4);
        p += normal * n * (0.3 + uHeat * 0.5);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        vec3 vn = normalize(normalMatrix * normal);
        vRim = pow(1.0 - abs(vn.z), 3.0);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uHeat;
      uniform vec3 uColor;
      varying float vRim;
      void main(){
        float a = vRim * (0.35 + uHeat * 0.65);
        gl_FragColor = vec4(uColor, a);
      }
    `,
  });
  const corona = new THREE.Mesh(new THREE.IcosahedronGeometry(3.1, 12), coronaMat);
  scene.add(corona);

  // ---- HALO (camera-facing radial glow) -----------------------------------
  const haloUniforms = {
    uHeat: { value: 0 },
    uColor: { value: COL_GOLD_BRIGHT.clone() },
  };
  const haloMat = new THREE.ShaderMaterial({
    uniforms: haloUniforms,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: false,
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main(){
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uHeat;
      uniform vec3 uColor;
      varying vec2 vUv;
      void main(){
        float d = distance(vUv, vec2(0.5));
        float a = smoothstep(0.5, 0.0, d);
        a = pow(a, 2.0) * (0.25 + uHeat * 0.75);
        gl_FragColor = vec4(uColor, a);
      }
    `,
  });
  const halo = new THREE.Mesh(new THREE.PlaneGeometry(16, 16), haloMat);
  halo.position.z = -2;
  scene.add(halo);

  // ---- WINGS / FEATHERS ----------------------------------------------------
  const wingUniforms = {
    uTime: { value: 0 },
    uDisint: { value: 0 },
    uEmber: { value: COL_EMBER.clone() },
  };
  const wingGeo = buildWings();
  const wingMat = new THREE.ShaderMaterial({
    uniforms: wingUniforms,
    transparent: true,
    side: THREE.DoubleSide,
    vertexColors: true,
    vertexShader: /* glsl */ `
      uniform float uTime;
      uniform float uDisint;
      attribute float aBarb;
      attribute float aRandom;
      attribute vec3 aAnchor;
      varying vec3 vColor;
      varying float vBurn;
      void main(){
        vColor = color;
        // Higher feathers (closer to the sun) cede first; stagger by random.
        float start = aRandom * 0.4 + (1.0 - smoothstep(-1.0, 2.5, aAnchor.y)) * 0.2;
        float d = clamp((uDisint - start) / max(1.0 - start, 0.001), 0.0, 1.0);
        vBurn = d;

        vec3 p = position;
        // The wax gives: feathers fall down, scatter out, barbs detach further.
        vec3 fall = vec3(sin(aRandom * 6.2831) * 0.7, -1.0, cos(aRandom * 6.2831) * 0.45);
        float amount = d * (0.5 + aBarb * 1.8);
        p += fall * amount * 3.2;
        // Flutter as they come apart.
        p.x += sin(uTime * 3.0 + aRandom * 12.0) * d * aBarb * 0.25;
        p.z += cos(uTime * 2.4 + aRandom * 9.0) * d * aBarb * 0.2;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uEmber;
      varying vec3 vColor;
      varying float vBurn;
      void main(){
        // Char toward ember, then fade to ash.
        vec3 col = mix(vColor, uEmber, smoothstep(0.2, 0.8, vBurn));
        float alpha = 1.0 - smoothstep(0.65, 1.0, vBurn);
        if (alpha <= 0.01) discard;
        gl_FragColor = vec4(col, alpha);
      }
    `,
  });
  const wings = new THREE.Mesh(wingGeo, wingMat);
  wings.position.set(0, -0.6, 1.5);
  scene.add(wings);

  // ---- RENDER LOOP ---------------------------------------------------------
  const clock = new THREE.Clock();
  let raf = 0;
  let running = true;
  let width = 1;
  let height = 1;

  const render = () => {
    raf = requestAnimationFrame(render);
    const t = clock.getElapsedTime();

    // Ease params toward scroll targets for buttery response.
    params.heat += (targetHeat - params.heat) * 0.06;
    params.disintegration += (targetDisint - params.disintegration) * 0.06;

    sunUniforms.uTime.value = t;
    sunUniforms.uHeat.value = params.heat;
    coronaUniforms.uTime.value = t;
    coronaUniforms.uHeat.value = params.heat;
    haloUniforms.uHeat.value = params.heat;
    wingUniforms.uTime.value = t;
    wingUniforms.uDisint.value = params.disintegration;

    sun.rotation.y = t * 0.05;
    corona.rotation.y = -t * 0.03;

    // Camera drifts in as we approach the apogee, then recedes in the fall.
    const p = params.disintegration;
    camera.position.z = 10 - params.heat * 1.6 + p * 2.2;
    camera.position.y = -p * 1.4;
    camera.lookAt(0, -p * 0.6, 0);

    renderer.render(scene, camera);
  };

  const start = () => {
    if (!raf) {
      clock.getDelta();
      render();
    }
  };
  const stop = () => {
    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };

  start();

  return {
    setProgress(pIn: number) {
      const p = Math.min(Math.max(pIn, 0), 1);
      // Heat builds through the ascent, peaks at the apogee.
      targetHeat = THREE.MathUtils.smoothstep(p, 0.0, 0.55);
      // Disintegration begins at the apogee and completes in the fall.
      targetDisint = THREE.MathUtils.smoothstep(p, 0.5, 1.0);
    },
    resize(w: number, h: number) {
      width = Math.max(1, w);
      height = Math.max(1, h);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    },
    setRunning(r: boolean) {
      if (r === running) return;
      running = r;
      if (r) start();
      else stop();
    },
    dispose() {
      stop();
      sunGeo.dispose();
      sunMat.dispose();
      corona.geometry.dispose();
      coronaMat.dispose();
      halo.geometry.dispose();
      haloMat.dispose();
      wingGeo.dispose();
      wingMat.dispose();
      renderer.dispose();
    },
  };
}
