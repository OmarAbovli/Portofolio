"use client";

import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import Scene3D from './Scene3D';

const ThreeBackground = () => {
  const mousePosition = useRef({ x: 0, y: 0 });

  // تتبع حركة الماوس داخل المكون المعزول
  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    });
  }

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        onCreated={({ gl }) => {
          gl.setClearColor('#0f172a', 1);
        }}
        onError={() => {
          // في حالة فشل المحرك حتى بعد الفحص، نقوم بإخفاءه صمتاً
          console.warn("3D Rendering failed, falling back to static.");
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
