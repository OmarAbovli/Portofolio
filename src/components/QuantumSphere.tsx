
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface QuantumSphereProps {
  position: [number, number, number];
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

const QuantumSphere = ({ position, mousePosition }: QuantumSphereProps) => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (sphereRef.current && materialRef.current) {
      sphereRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.6;
      sphereRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.2;

      // Floating animation
      sphereRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.3;

      const hue = (state.clock.elapsedTime * 0.1) % 1;
      const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
      const emissiveColor = new THREE.Color().setHSL(hue, 0.5, 0.2);

      materialRef.current.color = color;
      materialRef.current.emissive = emissiveColor;

      const mouseInfluence = Math.sqrt(mousePosition.current.x ** 2 + mousePosition.current.y ** 2);
      sphereRef.current.scale.setScalar(1 + mouseInfluence * 0.3);

      sphereRef.current.position.x = position[0] + mousePosition.current.x * 2;
      sphereRef.current.position.z = position[2] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });

  return (
    <mesh ref={sphereRef} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#4ecdc4"
        roughness={0.1}
        metalness={0.9}
        transparent={true}
        opacity={0.8}
        emissive="#4ecdc4"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

export default QuantumSphere;
