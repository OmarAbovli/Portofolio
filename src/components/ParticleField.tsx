
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleFieldProps {
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

const ParticleField = ({ mousePosition }: ParticleFieldProps) => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Create a galaxy-like distribution
      const radius = Math.random() * 20;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 10;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      // Color based on distance from center
      const normalizedRadius = radius / 20;
      colors[i * 3] = 1 - normalizedRadius; // Red
      colors[i * 3 + 1] = 0.5 + normalizedRadius * 0.5; // Green
      colors[i * 3 + 2] = 1; // Blue
    }

    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;

      // Mouse interaction
      pointsRef.current.position.x = mousePosition.current.x * 2;
      pointsRef.current.position.y = mousePosition.current.y * 1;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors}>
      <PointMaterial
        transparent
        vertexColors
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

export default ParticleField;
