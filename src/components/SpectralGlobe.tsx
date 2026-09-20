import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Points, PointMaterial } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const spectral = ["#6857ff", "#ff5f91", "#d648ff", "#ff7b65"] as const;

function ParticleWorld() {
  const group = useRef<THREE.Group>(null);
  const { positions, colors } = useMemo(() => {
    const total = 4200;
    const p = new Float32Array(total * 3);
    const c = new Float32Array(total * 3);
    for (let index = 0; index < total; index += 1) {
      const y = 1 - (index / (total - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const angle = index * Math.PI * (3 - Math.sqrt(5));
      const noise = 1 + Math.sin(index * 12.31) * 0.025;
      p[index * 3] = Math.cos(angle) * radius * noise * 1.72;
      p[index * 3 + 1] = y * noise * 1.72;
      p[index * 3 + 2] = Math.sin(angle) * radius * noise * 1.72;
      const color = new THREE.Color(index % 3 === 0 ? spectral[1] : index % 5 === 0 ? spectral[2] : spectral[0]);
      c[index * 3] = color.r;
      c[index * 3 + 1] = color.g;
      c[index * 3 + 2] = color.b;
    }
    return { positions: p, colors: c };
  }, []);

  useFrame((state, rawDelta) => {
    const node = group.current;
    if (!node) return;
    const delta = Math.min(rawDelta, 0.05);
    node.rotation.y += delta * 0.055;
    node.rotation.x = THREE.MathUtils.lerp(node.rotation.x, state.pointer.y * 0.12, 1 - Math.exp(-3 * delta));
    node.rotation.z = THREE.MathUtils.lerp(node.rotation.z, -state.pointer.x * 0.1, 1 - Math.exp(-3 * delta));
  });

  const arc = (offset: number, lift: number) => Array.from({ length: 44 }, (_, index) => {
    const t = index / 43;
    return new THREE.Vector3(-1.5 + t * 3, Math.sin(t * Math.PI) * lift + offset, Math.cos(t * Math.PI) * 0.55);
  });

  return (
    <group ref={group} rotation={[0.06, -0.45, -0.08]}>
      <Points positions={positions} colors={colors} stride={3} frustumCulled={false}>
        <PointMaterial transparent vertexColors size={0.018} sizeAttenuation depthWrite={false} opacity={0.9} />
      </Points>
      <Line points={arc(-0.45, 1.45)} color={spectral[1]} transparent opacity={0.75} lineWidth={1.1} />
      <Line points={arc(0.2, 1.05)} color={spectral[0]} transparent opacity={0.65} lineWidth={1.1} rotation={[0.3, 0.4, 0.2]} />
      <Line points={arc(-0.15, 1.25)} color={spectral[2]} transparent opacity={0.55} lineWidth={1} rotation={[-0.45, -0.1, -0.35]} />
    </group>
  );
}

const signals = [
  { label: "Vision", value: "native", className: "globe-signal globe-signal-one" },
  { label: "Audio", value: "live", className: "globe-signal globe-signal-two" },
  { label: "Code", value: "grounded", className: "globe-signal globe-signal-three" },
];

export function SpectralGlobe() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="spectral-globe" aria-label="Interactive particle map of Substrate's multimodal network">
      <div className="spectral-globe-haze" aria-hidden="true" />
      {mounted && (
        <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5.1], fov: 48 }} gl={{ antialias: true, alpha: true }}>
          <ParticleWorld />
        </Canvas>
      )}
      {signals.map((signal) => <div key={signal.label} className={signal.className}><span>{signal.label}</span><strong>{signal.value}</strong></div>)}
    </div>
  );
}