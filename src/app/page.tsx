"use client";

import { useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import LoadingScreen from '@/components/LoadingScreen';
import Navigation from '@/components/Navigation';

// تحميل المكون الـ 3D بشكل معزول تماماً
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
    
    // الانتظار قليلاً قبل محاولة تحميل الـ 3D لضمان استقرار المتصفح
    const timer3d = setTimeout(() => {
      setLoad3D(true);
    }, 2000);

    const timerLoading = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer3d);
      clearTimeout(timerLoading);
    };
  }, []);

  if (!mounted || loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative min-h-screen bg-[#0f172a] overflow-x-hidden">
      {/* 3D Background - Loaded with delay for stability */}
      {load3D && <ThreeBackground />}

      {/* Background Fallback while 3D is loading or if it fails */}
      {!load3D && (
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

      {/* Subtle particles for extra atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
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
