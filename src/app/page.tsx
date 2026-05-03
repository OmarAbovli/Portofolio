"use client";

import { Suspense, useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import LoadingScreen from '@/components/LoadingScreen';
import Navigation from '@/components/Navigation';

// تحميل الـ Canvas بشكل ديناميكي جداً لضمان عدم تحميل Three.js إلا عند الحاجة
const Scene3D = dynamic(() => import('@/components/Scene3D'), { ssr: false });
const Canvas = dynamic(() => import('@react-three/fiber').then(m => m.Canvas), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    
    // فحص دعم WebGL بدقة قبل تفعيل أي كود 3D
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && 
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    };

    if (checkWebGL()) {
      setShow3D(true);
    }

    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mounted]);

  if (!mounted || loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative min-h-screen bg-[#0f172a] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-x-hidden">
      {/* 3D Background - Render ONLY if confirmed support and mounted */}
      {show3D && (
        <div className="fixed inset-0 z-0">
          <Suspense fallback={<div className="fixed inset-0 bg-[#0f172a]" />}>
            <Canvas
              camera={{ position: [0, 0, 5], fov: 75 }}
              onCreated={({ gl }) => {
                gl.setClearColor('#0f172a', 1);
              }}
            >
              <Scene3D mousePosition={mousePosition} />
            </Canvas>
          </Suspense>
        </div>
      )}

      {/* Fallback Static Background */}
      {!show3D && (
        <div className="fixed inset-0 z-0 bg-[#0f172a]" />
      )}

      <Navigation />

      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Particles effect for extra depth even without 3D */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
