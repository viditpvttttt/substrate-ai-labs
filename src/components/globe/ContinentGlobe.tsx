import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { landAt } from "./landMask";

/*
 * Revolving point-cloud Earth — dense luminous web across the continents,
 * sparse dust over the oceans, swept by a fixed left-to-right spectral
 * gradient (periwinkle → violet → magenta → coral) in view space, so the
 * color wash stays put while the globe turns beneath it. Back-hemisphere
 * points fade to a whisper so the sphere reads as translucent glass.
 *
 * Stripe-flavored additions: great-circle traffic arcs between land hubs
 * with comet pulses riding each one, and a gentle drag-to-spin that keeps
 * its momentum after release.
 */

const CANDIDATES = 34000;
const ARC_COUNT = 12;
const PULSE_TAIL = 16;

function rng(seed: number) {
  let s = seed;
  return () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296;
}

const VERT_COMMON = /* glsl */ `
  varying float vAlpha;
  varying float vT;
  vec3 gradColor(float t) {
    vec3 c1 = vec3(0.376, 0.522, 1.0);  // periwinkle #6085ff
    vec3 c2 = vec3(0.647, 0.361, 1.0);  // violet    #a55cff
    vec3 c3 = vec3(1.0, 0.0, 0.918);    // magenta   #ff00ea
    vec3 c4 = vec3(1.0, 0.404, 0.404);  // coral red #ff6767
    vec3 c5 = vec3(1.0, 0.624, 0.376);  // apricot   #ff9f60
    if (t < 0.30) return mix(c1, c2, t / 0.30);
    if (t < 0.55) return mix(c2, c3, (t - 0.30) / 0.25);
    if (t < 0.80) return mix(c3, c4, (t - 0.55) / 0.25);
    return mix(c4, c5, (t - 0.80) / 0.20);
  }
`;

const POINT_VERT = /* glsl */ `
  ${VERT_COMMON}
  attribute float aLand;
  uniform float uSize;
  uniform float uDpr;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vec3 vn = normalize(normalMatrix * normalize(position));
    vT = clamp(mv.x * 0.58 + 0.5, 0.0, 1.0);
    float face = smoothstep(-0.34, 0.42, vn.z);
    vAlpha = mix(0.08, 0.95, face) * mix(0.30, 1.0, aLand);
    gl_PointSize = uSize * mix(0.6, 1.0, aLand) * uDpr / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const POINT_FRAG = /* glsl */ `
  ${VERT_COMMON}
  uniform float uOpacity;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    float disc = smoothstep(0.5, 0.28, d);
    float a = vAlpha * disc * uOpacity;
    if (a < 0.006) discard;
    gl_FragColor = vec4(gradColor(vT), a);
  }
`;

const LINE_VERT = /* glsl */ `
  ${VERT_COMMON}
  attribute float aFaint;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vec3 vn = normalize(normalMatrix * normalize(position));
    vT = clamp(mv.x * 0.58 + 0.5, 0.0, 1.0);
    float face = smoothstep(-0.30, 0.38, vn.z);
    vAlpha = mix(0.34, 0.10, aFaint) * mix(0.12, 1.0, face);
    gl_Position = projectionMatrix * mv;
  }
`;

const LINE_FRAG = /* glsl */ `
  ${VERT_COMMON}
  uniform float uOpacity;
  void main() {
    gl_FragColor = vec4(gradColor(vT), vAlpha * uOpacity);
  }
`;

const PULSE_VERT = /* glsl */ `
  attribute float aAlpha;
  attribute vec3 aColor;
  varying float vA;
  varying vec3 vC;
  uniform float uSize;
  uniform float uDpr;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vA = aAlpha;
    vC = aColor;
    gl_PointSize = uSize * uDpr / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const PULSE_FRAG = /* glsl */ `
  varying float vA;
  varying vec3 vC;
  uniform float uOpacity;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    float disc = smoothstep(0.5, 0.16, d);
    float a = vA * disc * uOpacity;
    if (a < 0.006) discard;
    gl_FragColor = vec4(vC, a);
  }
`;

function arcSample(samples: Float32Array, t: number, out: number[]) {
  const n = samples.length / 3 - 1;
  const f = THREE.MathUtils.clamp(t, 0, 1) * n;
  const i = Math.min(n - 1, Math.floor(f));
  const k = f - i;
  out[0] = samples[i * 3] * (1 - k) + samples[(i + 1) * 3] * k;
  out[1] = samples[i * 3 + 1] * (1 - k) + samples[(i + 1) * 3 + 1] * k;
  out[2] = samples[i * 3 + 2] * (1 - k) + samples[(i + 1) * 3 + 2] * k;
}

function useGlobeGeometry() {
  return useMemo(() => {
    const golden = Math.PI * (3 - Math.sqrt(5));
    const pts: number[] = [];
    const lands: number[] = [];
    const landIdx: number[] = [];

    for (let i = 0; i < CANDIDATES; i += 1) {
      const y = 1 - (2 * (i + 0.5)) / CANDIDATES;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = i * golden;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      const lat = (Math.asin(y) * 180) / Math.PI;
      const lon = (Math.atan2(z, x) * 180) / Math.PI;
      const isLand = landAt(lat, lon);
      if (!isLand && i % 3 !== 0) continue;
      pts.push(x, y, z);
      lands.push(isLand ? 1 : 0);
      if (isLand) landIdx.push((lands.length - 1));
    }

    const positions = new Float32Array(pts);
    const landAttr = new Float32Array(lands);

    // Web segments: near links make the continental mesh, longer links
    // stretch the constellation across the oceans.
    const rand = rng(20);
    const segments: number[] = [];
    const faints: number[] = [];
    const tiers = [
      { cos: Math.cos(0.05), quota: 2600, faint: 0, tries: 90000 },
      { cos: Math.cos(0.13), quota: 900, faint: 1, tries: 60000 },
    ];
    for (const tier of tiers) {
      let found = 0;
      for (let t = 0; t < tier.tries && found < tier.quota; t += 1) {
        const a = landIdx[(rand() * landIdx.length) | 0];
        const b = landIdx[(rand() * landIdx.length) | 0];
        if (a === b) continue;
        const dot =
          positions[a * 3] * positions[b * 3] +
          positions[a * 3 + 1] * positions[b * 3 + 1] +
          positions[a * 3 + 2] * positions[b * 3 + 2];
        if (dot > tier.cos) {
          segments.push(
            positions[a * 3], positions[a * 3 + 1], positions[a * 3 + 2],
            positions[b * 3], positions[b * 3 + 1], positions[b * 3 + 2],
          );
          faints.push(tier.faint, tier.faint);
          found += 1;
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(segments), 3));
    lineGeo.setAttribute("aFaint", new THREE.BufferAttribute(new Float32Array(faints), 1));

    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pointGeo.setAttribute("aLand", new THREE.BufferAttribute(landAttr, 1));

    // ——— Traffic arcs (Stripe-style): great-circle routes between land
    // hubs, lifted above the sphere, with comet pulses riding each one.
    const arcRand = rng(77);
    const arcPalette = [
      new THREE.Color("#4d6bff"),
      new THREE.Color("#8f4dff"),
      new THREE.Color("#e019cc"),
      new THREE.Color("#ff7a45"),
    ];
    const arcs: { samples: Float32Array; color: THREE.Color; phase: number; speed: number }[] = [];
    let guard = 0;
    while (arcs.length < ARC_COUNT && guard < 6000) {
      guard += 1;
      const ia = landIdx[(arcRand() * landIdx.length) | 0];
      const ib = landIdx[(arcRand() * landIdx.length) | 0];
      if (ia === ib) continue;
      const ax = positions[ia * 3], ay = positions[ia * 3 + 1], az = positions[ia * 3 + 2];
      const bx = positions[ib * 3], by = positions[ib * 3 + 1], bz = positions[ib * 3 + 2];
      const dot = THREE.MathUtils.clamp(ax * bx + ay * by + az * bz, -1, 1);
      const omega = Math.acos(dot);
      if (omega < 0.5 || omega > 2.3) continue; // medium-length routes only
      const sinw = Math.sin(omega);
      const lift = 0.14 + omega * 0.17;
      const N = 64;
      const samples = new Float32Array((N + 1) * 3);
      for (let i = 0; i <= N; i += 1) {
        const t = i / N;
        const c1 = Math.sin((1 - t) * omega) / sinw;
        const c2 = Math.sin(t * omega) / sinw;
        const rr = 1 + lift * Math.sin(Math.PI * t);
        samples[i * 3] = (c1 * ax + c2 * bx) * rr;
        samples[i * 3 + 1] = (c1 * ay + c2 * by) * rr;
        samples[i * 3 + 2] = (c1 * az + c2 * bz) * rr;
      }
      arcs.push({
        samples,
        color: arcPalette[arcs.length % arcPalette.length],
        phase: arcRand(),
        speed: 0.055 + arcRand() * 0.045,
      });
    }

    // Merge the static arc paths into one faint line geometry.
    const arcSegs: number[] = [];
    const arcFaint: number[] = [];
    for (const arc of arcs) {
      const n = arc.samples.length / 3 - 1;
      for (let i = 0; i < n; i += 1) {
        arcSegs.push(
          arc.samples[i * 3], arc.samples[i * 3 + 1], arc.samples[i * 3 + 2],
          arc.samples[(i + 1) * 3], arc.samples[(i + 1) * 3 + 1], arc.samples[(i + 1) * 3 + 2],
        );
        arcFaint.push(0.35, 0.35);
      }
    }
    const arcGeo = new THREE.BufferGeometry();
    arcGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(arcSegs), 3));
    arcGeo.setAttribute("aFaint", new THREE.BufferAttribute(new Float32Array(arcFaint), 1));

    // Comet pulses — a head plus a fading tail per arc.
    const pulsePos = new Float32Array(arcs.length * PULSE_TAIL * 3);
    const pulseAlpha = new Float32Array(arcs.length * PULSE_TAIL);
    const pulseColor = new Float32Array(arcs.length * PULSE_TAIL * 3);
    arcs.forEach((arc, k) => {
      for (let j = 0; j < PULSE_TAIL; j += 1) {
        const idx = k * PULSE_TAIL + j;
        pulseColor[idx * 3] = arc.color.r;
        pulseColor[idx * 3 + 1] = arc.color.g;
        pulseColor[idx * 3 + 2] = arc.color.b;
      }
    });
    const pulseGeo = new THREE.BufferGeometry();
    pulseGeo.setAttribute("position", new THREE.BufferAttribute(pulsePos, 3));
    pulseGeo.setAttribute("aAlpha", new THREE.BufferAttribute(pulseAlpha, 1));
    pulseGeo.setAttribute("aColor", new THREE.BufferAttribute(pulseColor, 3));

    // Faint orbit rings sweeping past the sphere.
    const ringGeos: THREE.BufferGeometry[] = [];
    for (const radius of [1.42, 1.26]) {
      const pts2: number[] = [];
      const fs: number[] = [];
      for (let i = 0; i < 160; i += 1) {
        const a = (i / 160) * Math.PI * 2;
        pts2.push(Math.cos(a) * radius, 0, Math.sin(a) * radius);
        fs.push(1);
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pts2), 3));
      g.setAttribute("aFaint", new THREE.BufferAttribute(new Float32Array(fs), 1));
      ringGeos.push(g);
    }

    return { pointGeo, lineGeo, arcGeo, pulseGeo, arcs, ringGeos };
  }, []);
}

function GlobeMesh() {
  const group = useRef<THREE.Group>(null);
  const gl = useThree((state) => state.gl);
  const dpr = useThree((state) => state.viewport.dpr);
  const { pointGeo, lineGeo, arcGeo, pulseGeo, arcs, ringGeos } = useGlobeGeometry();
  const drag = useRef({ active: false, lastX: 0, vel: 0 });
  const sample = useRef([0, 0, 0]);

  const pointMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: POINT_VERT,
        fragmentShader: POINT_FRAG,
        uniforms: { uSize: { value: 5.6 }, uDpr: { value: dpr }, uOpacity: { value: 0.95 } },
        transparent: true,
        depthTest: false,
        depthWrite: false,
      }),
    [dpr],
  );

  const lineMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: LINE_VERT,
        fragmentShader: LINE_FRAG,
        uniforms: { uOpacity: { value: 0.85 } },
        transparent: true,
        depthTest: false,
        depthWrite: false,
      }),
    [],
  );

  const pulseMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: PULSE_VERT,
        fragmentShader: PULSE_FRAG,
        uniforms: { uSize: { value: 11 }, uDpr: { value: dpr }, uOpacity: { value: 0.9 } },
        transparent: true,
        depthTest: false,
        depthWrite: false,
      }),
    [dpr],
  );

  const slow = useMemo(
    () => (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0.004 : 0.03),
    [],
  );

  // Drag-to-spin, with momentum that eases out after release.
  useEffect(() => {
    const el = gl.domElement;
    const down = (e: PointerEvent) => {
      drag.current.active = true;
      drag.current.lastX = e.clientX;
      drag.current.vel = 0;
    };
    const move = (e: PointerEvent) => {
      if (!drag.current.active) return;
      const dx = e.clientX - drag.current.lastX;
      drag.current.lastX = e.clientX;
      const step = dx * 0.005;
      if (group.current) group.current.rotation.y += step;
      drag.current.vel = step;
    };
    const up = () => { drag.current.active = false; };
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [gl]);

  useFrame((state, rawDelta) => {
    const node = group.current;
    if (!node) return;
    const delta = Math.min(rawDelta, 0.05);

    // Grounded auto-revolution — slow, weighted, unhurried.
    node.rotation.y += delta * slow;
    if (!drag.current.active) {
      node.rotation.y += drag.current.vel;
      drag.current.vel *= Math.exp(-1.9 * delta);
    }
    node.rotation.x = THREE.MathUtils.lerp(node.rotation.x, 0.12 + state.pointer.y * 0.1, 1 - Math.exp(-2.5 * delta));
    node.rotation.z = THREE.MathUtils.lerp(node.rotation.z, -0.06 - state.pointer.x * 0.08, 1 - Math.exp(-2.5 * delta));

    // Ride the comet pulses along their arcs.
    const posAttr = pulseGeo.getAttribute("position") as THREE.BufferAttribute;
    const alphaAttr = pulseGeo.getAttribute("aAlpha") as THREE.BufferAttribute;
    const t = state.clock.elapsedTime;
    arcs.forEach((arc, k) => {
      const head = (t * arc.speed + arc.phase) % 1;
      for (let j = 0; j < PULSE_TAIL; j += 1) {
        const u = head - j * 0.016;
        const idx = k * PULSE_TAIL + j;
        if (u < 0) {
          alphaAttr.array[idx] = 0;
          posAttr.array[idx * 3] = arc.samples[0];
          posAttr.array[idx * 3 + 1] = arc.samples[1];
          posAttr.array[idx * 3 + 2] = arc.samples[2];
          continue;
        }
        arcSample(arc.samples, u, sample.current);
        posAttr.array[idx * 3] = sample.current[0];
        posAttr.array[idx * 3 + 1] = sample.current[1];
        posAttr.array[idx * 3 + 2] = sample.current[2];
        alphaAttr.array[idx] = Math.pow(1 - j / PULSE_TAIL, 1.6) * 0.95;
      }
    });
    posAttr.needsUpdate = true;
    alphaAttr.needsUpdate = true;
  });

  return (
    <group ref={group} rotation={[0.12, -0.55, -0.06]}>
      <lineSegments geometry={lineGeo} material={lineMat} />
      <lineSegments geometry={arcGeo} material={lineMat} />
      {ringGeos.map((geo, i) => (
        <lineLoop key={i} geometry={geo} material={lineMat} rotation={i === 0 ? [0.42, 0.2, 0.5] : [1.25, -0.3, 0.2]} />
      ))}
      <points geometry={pulseGeo} material={pulseMat} renderOrder={3} />
      <points geometry={pointGeo} material={pointMat} renderOrder={2} />
    </group>
  );
}

export function ContinentGlobe({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className={`continent-globe ${className}`} aria-label="Revolving point-cloud globe of Earth's research network — drag to spin">
      <div className="continent-globe-haze" aria-hidden="true" />
      {mounted && (
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 2.85], fov: 42 }} gl={{ antialias: true, alpha: true }}>
          <GlobeMesh />
        </Canvas>
      )}
    </div>
  );
}
