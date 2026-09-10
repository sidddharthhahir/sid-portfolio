import { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import type { Mesh } from 'three';

/**
 * Slowly rotating distorted icosahedron, reacting to cursor position.
 * Runs only when the viewer hasn't asked for reduced motion, and is
 * purely decorative — pointer-events are disabled so it never blocks
 * clicks on the hero content in front of it.
 */
function Blob() {
  const meshRef = useRef<Mesh>(null);
  const { viewport } = useThree();
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.08;
    meshRef.current.rotation.y += delta * 0.12;
    // gently ease toward the pointer position rather than snapping to it
    meshRef.current.rotation.x += (pointer.current.y * 0.3 - meshRef.current.rotation.x * 0.02) * delta;
    meshRef.current.rotation.y += (pointer.current.x * 0.3 - meshRef.current.rotation.y * 0.02) * delta;
  });

  const scale = Math.min(viewport.width, viewport.height) * 0.16;

  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={meshRef} scale={scale}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#6fe0ff"
          attach="material"
          distort={0.35}
          speed={1.5}
          roughness={0.25}
          metalness={0.4}
          transparent
          opacity={0.5}
          wireframe
        />
      </mesh>
    </Float>
  );
}

// Gated by the caller (HeroSection): only mounted/imported for viewers who
// haven't asked for reduced motion, on screens wide enough for it to matter.
export const HeroScene = () => {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 opacity-70"
      style={{ pointerEvents: 'none' }}
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[3, 3, 3]} intensity={0.8} color="#6fe0ff" />
        <Suspense fallback={null}>
          <Blob />
        </Suspense>
      </Canvas>
    </div>
  );
};
