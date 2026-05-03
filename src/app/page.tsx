"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import LoadingScreen from '@/components/LoadingScreen';
import Navigation from '@/components/Navigation';
import ErrorBoundary from '@/components/ErrorBoundary';

// تحميل الـ Visuals بالكامل بشكل ديناميكي
const Visuals = dynamic(() => import('@/components/Visuals'), { 
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-[#0f172a]" />
});

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [canRender3D, setCanRender3D] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    
    // فحص دعم WebGL الصارم
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl', { failIfMajorPerformanceCaveat: true }) || 
                   canvas.getContext('experimental-webgl', { failIfMajorPerformanceCaveat: true });
        return !!gl;
      } catch (e) {
        return false;
      }
    };

    if (checkWebGL()) {
      setCanRender3D(true);
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

  const fallbackBg = (
    <div className="fixed inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-blue-500/20" />
  );

  return (
    <div className="relative min-h-screen bg-[#0f172a] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-x-hidden">
      {/* 3D Background Scene isolated in its own dynamic component and ErrorBoundary */}
      {canRender3D ? (
        <ErrorBoundary fallback={fallbackBg}>
          <Visuals mousePosition={mousePosition} />
        </ErrorBoundary>
      ) : fallbackBg}

      {/* Navigation */}
      <Navigation />

      {/* Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Floating particles */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
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
