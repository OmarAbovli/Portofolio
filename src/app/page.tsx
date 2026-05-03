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
import ErrorBoundary from '@/components/ErrorBoundary';

// تحميل المكون الـ 3D بشكل معزول
const ThreeBackground = dynamic(() => import('@/components/ThreeBackground'), { 
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-[#0f172a]" />
});

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [load3D, setLoad3D] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // تأخير بسيط لضمان استقرار الصفحة
    const timer3d = setTimeout(() => {
      setLoad3D(true);
    }, 1500);

    const timerLoading = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => {
      clearTimeout(timer3d);
      clearTimeout(timerLoading);
    };
  }, []);

  if (!mounted || loading) {
    return <LoadingScreen />;
  }

  const staticFallback = (
    <div className="fixed inset-0 z-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800" />
  );

  return (
    <div className="relative min-h-screen bg-[#0f172a] overflow-x-hidden">
      {/* 3D Background with ERROR PROTECTION */}
      {load3D ? (
        <ErrorBoundary fallback={staticFallback}>
          <ThreeBackground />
        </ErrorBoundary>
      ) : staticFallback}

      <Navigation />

      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Particles as extra layer */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
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
