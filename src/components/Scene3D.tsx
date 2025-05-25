
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import InteractiveModels from './InteractiveModels';
import ParticleField from './ParticleField';
import QuantumSphere from './QuantumSphere';

interface Scene3DProps {
  mousePosition: { x: number; y: number };
}

const FloatingGeometry = ({ position, type, mousePosition }: { 
  position: [number, number, number]; 
  type: 'sphere' | 'box' | 'torus' | 'octahedron';
  mousePosition: { x: number; y: number };
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      
      // Enhanced mouse interaction
      meshRef.current.position.x = position[0] + mousePosition.x * 0.8;
      meshRef.current.position.y = position[1] + mousePosition.y * 0.5;
      meshRef.current.position.z = position[2] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });

  const getGeometry = () => {
    switch (type) {
      case 'sphere':
        return <sphereGeometry args={[0.8, 32, 32]} />;
      case 'box':
        return <boxGeometry args={[1.2, 1.2, 1.2]} />;
      case 'torus':
        return <torusGeometry args={[1, 0.4, 16, 100]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1]} />;
      default:
        return <sphereGeometry args={[0.8, 32, 32]} />;
    }
  };

  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        {getGeometry()}
        <MeshDistortMaterial
          color="#00bcd4"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          transparent={true}
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
};

const Scene3D = ({ mousePosition }: Scene3DProps) => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={75} />
      
      {/* Enhanced lighting setup */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} color="#ff0080" intensity={0.8} />
      <pointLight position={[0, 10, -10]} color="#00ffff" intensity={0.6} />
      <spotLight position={[5, 15, 5]} intensity={1} angle={0.3} penumbra={0.5} color="#ffaa00" />
      
      {/* Environment for realistic reflections */}
      <Environment preset="night" />
      
      {/* Particle field background */}
      <ParticleField mousePosition={mousePosition} />
      
      {/* Simplified floating geometries */}
      <FloatingGeometry 
        position={[-3, 2, -2]} 
        type="sphere"
        mousePosition={mousePosition}
      />
      
      <FloatingGeometry 
        position={[3, -1, -1]} 
        type="box"
        mousePosition={mousePosition}
      />
      
      <FloatingGeometry 
        position={[0, -3, -3]} 
        type="torus"
        mousePosition={mousePosition}
      />
      
      <FloatingGeometry 
        position={[-2, -1, -4]} 
        type="octahedron"
        mousePosition={mousePosition}
      />
      
      {/* New quantum spheres */}
      <QuantumSphere position={[2, 3, -5]} mousePosition={mousePosition} />
      <QuantumSphere position={[-4, -2, -6]} mousePosition={mousePosition} />
      
      {/* Interactive models */}
      <InteractiveModels mousePosition={mousePosition} />
    </>
  );
};

export default Scene3D;
