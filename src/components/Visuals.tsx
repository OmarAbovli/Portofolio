"use client";

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Scene3D from './Scene3D';

interface VisualsProps {
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

export default function Visuals({ mousePosition }: VisualsProps) {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ 
          antialias: false, 
          powerPreference: 'low-power',
          failIfMajorPerformanceCaveat: true 
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
}
