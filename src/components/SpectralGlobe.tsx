import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const spectral = ["#ff5f8f", "#715cff", "#28c8d8", "#ffd35a"] as const;

function OrbitalSystem() {
  const group = useRef<THREE.Group>(null);
  const points = useMemo(() => {
    return Array.from({ length: 54 }, (_, index) => {
      const y = 1 - (index / 53) * 2;
      const radius = Math.sqrt(1 - y * y);
      const angle = index * Math.PI * (3 - Math.sqrt(5));
      return new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
    });
  }, []);

  useFrame((state, rawDelta) => {
    const node = group.current;
    if (!node) return;
    const delta = Math.min(rawDelta, 0.05);
    node.rotation.y += delta * 0.09;
    node.rotation.x = THREE.MathUtils.lerp(node.rotation.x, state.pointer.y * 0.12, 1 - Math.exp(-3 * delta));
    node.rotation.z = THREE.MathUtils.lerp(node.rotation.z, -state.pointer.x * 0.09, 1 - Math.exp(-3 * delta));
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[1.55, 64, 64]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.08} metalness={0.02} transmission={0.52} thickness={0.7} transparent opacity={0.24} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.58, 32, 32]} />
        <meshBasicMaterial color="#7c65ff" wireframe transparent opacity={0.11} />
      </mesh>
      {points.map((point, index) => (
        <mesh key={index} position={point.clone().multiplyScalar(1.62)}>
          <sphereGeometry args={[index % 7 === 0 ? 0.035 : 0.018, 12, 12]} />
          <meshBasicMaterial color={spectral[index % spectral.length] ?? spectral[0]} />
        </mesh>
      ))}
      {[0, 1, 2].map((ring) => (
        <Line
          key={ring}
          points={Array.from({ length: 65 }, (_, i) => {
            const angle = (i / 64) * Math.PI * 2;
            return [Math.cos(angle) * (1.78 + ring * 0.08), Math.sin(angle) * (1.78 + ring * 0.08), 0] as [number, number, number];
          })}
          color={spectral[ring] ?? spectral[0]}
          transparent
          opacity={0.36}
          lineWidth={1}
          rotation={[0.5 + ring * 0.65, 0.45 + ring * 0.4, ring * 0.3]}
        />
      ))}
    </group>
  );
}

export function SpectralGlobe() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="spectral-globe" aria-label="Interactive Substrate network">
      <div className="spectral-globe-fallback" aria-hidden="true" />
      {mounted && (
        <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5.2], fov: 44 }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={1.8} />
          <pointLight position={[3, 3, 4]} intensity={16} color="#ffffff" />
          <pointLight position={[-3, -2, 2]} intensity={10} color="#ff75a8" />
          <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.18}>
            <OrbitalSystem />
          </Float>
        </Canvas>
      )}
    </div>
  );
}