
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface InteractiveModelsProps {
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

const DNA = ({ mousePosition }: { mousePosition: React.MutableRefObject<{ x: number; y: number }> }) => {
  const groupRef = useRef<THREE.Group>(null);

  const spirals = useMemo(() => {
    const points = [];
    for (let i = 0; i < 50; i++) {
      const t = (i / 50) * Math.PI * 4;
      points.push({
        position: [Math.cos(t) * 1.5, i * 0.08 - 2, Math.sin(t) * 1.5] as [number, number, number],
        hue: (i / 50) * 0.8 + 0.2,
      });
    }
    return points;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.position.x = mousePosition.current.x * 1.5;
      groupRef.current.position.y = mousePosition.current.y * 0.8;
    }
  });

  return (
    <group ref={groupRef} position={[3, 0, -2]}>
      {spirals.map((point, i) => (
        <mesh key={i} position={point.position}>
          <sphereGeometry args={[0.08]} />
          <meshStandardMaterial
            color={new THREE.Color().setHSL(point.hue, 0.8, 0.6)}
            transparent={true}
            opacity={0.8}
            emissive={new THREE.Color().setHSL(point.hue, 0.5, 0.3)}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

const MorphingCrystal = ({ mousePosition }: { mousePosition: React.MutableRefObject<{ x: number; y: number }> }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.5) * 0.2;

      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      meshRef.current.scale.setScalar(scale);

      // Floating animation
      meshRef.current.position.y = 1 + mousePosition.current.y * 0.6 + Math.sin(state.clock.elapsedTime * 1.5) * 0.4;
      meshRef.current.position.x = -3 + mousePosition.current.x * 1.2;
    }
  });

  return (
    <mesh ref={meshRef} position={[-3, 1, -1.5]}>
      <icosahedronGeometry args={[1.2]} />
      <meshStandardMaterial
        color="#ff6b6b"
        roughness={0.1}
        metalness={0.8}
        transparent={true}
        opacity={0.9}
        emissive="#aa3333"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};

const HolographicText = () => {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
      textRef.current.position.y = 3 + Math.sin(state.clock.elapsedTime) * 0.2;

      const material = textRef.current.material as THREE.Material;
      if (material) {
        material.opacity = 0.7 + Math.sin(state.clock.elapsedTime * 4) * 0.3;
      }
    }
  });

  return (
    <Text
      ref={textRef}
      fontSize={0.4}
      color="#00ffff"
      position={[0, 3, -3]}
      anchorX="center"
      anchorY="middle"
    >
      Make It Creative
    </Text>
  );
};

const InteractiveModels = ({ mousePosition }: InteractiveModelsProps) => {
  return (
    <>
      <DNA mousePosition={mousePosition} />
      <MorphingCrystal mousePosition={mousePosition} />
      <HolographicText />
    </>
  );
};

export default InteractiveModels;
