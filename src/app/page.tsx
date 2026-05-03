"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import LoadingScreen from '@/components/LoadingScreen';
import Navigation from '@/components/Navigation';

// تحميل الخلفية الـ 3D بشكل "فائق التأجيل" (Ultra Lazy)
const ThreeBackground = dynamic(() => import('@/components/ThreeBackground'), { 
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-[#0f172a]" />
});

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [canRender3D, setCanRender3D] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // فحص دعم WebGL بدون استدعاء أي مكتبات خارجية
    const checkSupport = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && 
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    };

    if (checkSupport()) {
      setCanRender3D(true);
    }

    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted || loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative min-h-screen bg-[#0f172a] overflow-x-hidden">
      {/* 3D Background - ONLY if supported */}
      {canRender3D && <ThreeBackground />}

      {/* Fallback Static Background */}
      {!canRender3D && (
        <div className="fixed inset-0 z-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800" />
      )}

      <Navigation />

      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Simple CSS Particles as a safe alternative */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
