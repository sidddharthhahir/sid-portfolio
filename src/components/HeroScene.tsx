import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NODE_COUNT = 170;
const CONNECT_DIST = 1.55;
const RADIUS = 3.5;
const COLOR = '#6fe0ff';
// Same category palette as the Skills graph, weighted toward the brand cyan
// so it reads as "mostly cyan, with colorful accents" rather than a flat
// wireframe or a chaotic rainbow — alive, still cohesive.
const PALETTE = [COLOR, COLOR, COLOR, '#f87171', '#34d399', '#fbbf24', '#c084fc', '#60a5fa'];

/**
 * A sparse cloud of glowing nodes, connected to their near neighbours —
 * reads as a small neural net / knowledge graph rather than a generic
 * 3D primitive. Slowly rotates and drifts toward the cursor.
 */
function Constellation() {
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const { nodePositions, nodeColors, linePositions } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      // sample roughly uniformly inside a sphere
      const r = RADIUS * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pts.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        )
      );
    }

    const nodePositions = new Float32Array(pts.length * 3);
    pts.forEach((p, i) => p.toArray(nodePositions, i * 3));

    const nodeColors = new Float32Array(pts.length * 3);
    const c = new THREE.Color();
    for (let i = 0; i < pts.length; i++) {
      c.set(PALETTE[Math.floor(Math.random() * PALETTE.length)]);
      c.toArray(nodeColors, i * 3);
    }

    const lines: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < CONNECT_DIST) {
          lines.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
        }
      }
    }

    return { nodePositions, nodeColors, linePositions: new Float32Array(lines) };
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;
    g.rotation.y += delta * 0.05;
    g.rotation.x += (pointer.current.y * 0.22 - g.rotation.x) * 1.2 * delta;
    g.rotation.y += pointer.current.x * 0.08 * delta;
  });

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={COLOR} transparent opacity={0.15} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodePositions.length / 3}
            array={nodePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={nodeColors.length / 3}
            array={nodeColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          size={0.06}
          sizeAttenuation
          transparent
          opacity={0.95}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

// Gated by the caller (HeroSection): only mounted/imported for viewers who
// haven't asked for reduced motion, on screens wide enough for it to matter.
export const HeroScene = () => {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 opacity-80"
      style={{ pointerEvents: 'none' }}
    >
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Constellation />
      </Canvas>
    </div>
  );
};
