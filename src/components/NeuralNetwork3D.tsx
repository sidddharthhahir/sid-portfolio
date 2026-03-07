import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

function NeuralNodes() {
  const groupRef = useRef<THREE.Group>(null);
  
  const nodes = useMemo(() => {
    const pts: { pos: [number, number, number]; color: string }[] = [];
    for (let i = 0; i < 40; i++) {
      pts.push({
        pos: [
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4,
        ],
        color: Math.random() > 0.5 ? '#34d399' : '#22d3ee',
      });
    }
    return pts;
  }, []);

  const connections = useMemo(() => {
    const lines: { start: [number, number, number]; end: [number, number, number] }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = Math.sqrt(
          (nodes[i].pos[0] - nodes[j].pos[0]) ** 2 +
          (nodes[i].pos[1] - nodes[j].pos[1]) ** 2 +
          (nodes[i].pos[2] - nodes[j].pos[2]) ** 2
        );
        if (dist < 2.5) {
          lines.push({ start: nodes[i].pos, end: nodes[j].pos });
        }
      }
    }
    return lines;
  }, [nodes]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <Float key={i} speed={1.5} rotationIntensity={0} floatIntensity={0.5}>
          <mesh position={node.pos}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={2} />
          </mesh>
          {/* Glow */}
          <mesh position={node.pos}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color={node.color} transparent opacity={0.15} />
          </mesh>
        </Float>
      ))}
      {connections.map((conn, i) => {
        const points = [new THREE.Vector3(...conn.start), new THREE.Vector3(...conn.end)];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <line key={i} geometry={geometry}>
            <lineBasicMaterial color="#34d399" transparent opacity={0.12} />
          </line>
        );
      })}
    </group>
  );
}

const NeuralNetwork3D = () => {
  return (
    <div className="absolute inset-0 -z-5 opacity-60">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#34d399" />
        <pointLight position={[-5, -5, 3]} intensity={0.3} color="#22d3ee" />
        <Stars radius={50} depth={50} count={500} factor={2} saturation={0} fade speed={1} />
        <NeuralNodes />
      </Canvas>
    </div>
  );
};

export default NeuralNetwork3D;
