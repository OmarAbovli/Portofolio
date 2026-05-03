import { useRef } from 'react';
import { PerspectiveCamera, Environment, Stars } from '@react-three/drei';
import DigitalGlobe from './3d/DigitalGlobe';
import TechOrbit from './3d/TechOrbit';
import ParticleField from './ParticleField';
import * as THREE from 'three';

interface Scene3DProps {
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

const Scene3D = ({ mousePosition }: Scene3DProps) => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 12]} fov={60} />

      {/* Terminal Grid Overlay */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        <planeGeometry args={[100, 100, 50, 50]} />
        <meshBasicMaterial
          color="#0A84FF"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* Moody Lighting with Blue/Green Terminal Colors */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#0A84FF" />
      <pointLight position={[-10, -5, -10]} intensity={1} color="#30D158" />
      <spotLight position={[0, 15, 0]} intensity={1} angle={0.5} penumbra={1} color="#0A84FF" />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Environment preset="city" />

      {/* Background Particles */}
      <ParticleField mousePosition={mousePosition} />

      {/* Central Digital Globe */}
      <DigitalGlobe mousePosition={mousePosition} />

      {/* Tech Orbits */}
      <TechOrbit
        radius={4.5}
        speed={0.5}
        items={['React', 'TypeScript', 'Next.js', 'Tailwind']}
        color="#0A84FF"
      />

      <TechOrbit
        radius={6}
        speed={0.3}
        yOffset={1}
        items={['Node.js', 'PostgreSQL', 'Python', 'AWS']}
        color="#30D158"
      />

      <TechOrbit
        radius={7.5}
        speed={0.2}
        yOffset={-1}
        items={['Docker', 'Git', 'MongoDB', 'Redis']}
        color="#0A84FF"
      />
    </>
  );
};

export default Scene3D;
