"use client";

import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import Scene3D from './Scene3D';

const ThreeBackground = () => {
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ 
          antialias: false, 
          powerPreference: "high-performance",
          alpha: false,
          stencil: false,
          depth: true
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#0f172a', 1);
        }}
      >
        <Suspense fallback={null}>
          <Scene3D mousePosition={mousePosition} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
