import { useRef } from 'react';
import { PerspectiveCamera, Environment, Stars } from '@react-three/drei';
import DigitalGlobe from './3d/DigitalGlobe';
import TechOrbit from './3d/TechOrbit';
import ParticleField from './ParticleField';

interface Scene3DProps {
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

const Scene3D = ({ mousePosition }: Scene3DProps) => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 12]} fov={60} />

      {/* Moody Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#06b6d4" />
      <pointLight position={[-10, -5, -10]} intensity={1} color="#8b5cf6" />
      <spotLight position={[0, 15, 0]} intensity={1} angle={0.5} penumbra={1} />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Environment preset="city" />

      {/* Background Particles (Refactored for performance) */}
      <ParticleField mousePosition={mousePosition} />

      {/* Central Digital Globe */}
      <DigitalGlobe mousePosition={mousePosition} />

      {/* Tech Orbits */}
      <TechOrbit
        radius={4.5}
        speed={0.5}
        items={['React', 'TypeScript', 'Next.js', 'Tailwind']}
        color="#06b6d4"
      />

      <TechOrbit
        radius={6}
        speed={0.3}
        yOffset={1}
        items={['Node.js', 'PostgreSQL', 'Python', 'AWS']}
        color="#8b5cf6"
      />

      <TechOrbit
        radius={7.5}
        speed={0.2}
        yOffset={-1}
        items={['Three.js', 'WebGL', 'Blender', 'UI/UX']}
        color="#f472b6"
      />
    </>
  );
};

export default Scene3D;
