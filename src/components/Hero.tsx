import { ArrowRight, Github, Linkedin, Mail, Terminal } from 'lucide-react';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "Full Stack Developer";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative px-6 z-10">
      <div className="max-w-4xl w-full">
        <div className="glass-card p-12 rounded-3xl border-l-4 border-cyan-400 relative overflow-hidden group">

          {/* Decorative Terminal Header */}
          <div className="absolute top-0 left-0 w-full h-8 bg-slate-900/50 border-b border-white/5 flex items-center px-4 space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
            <div className="ml-4 font-mono text-xs text-slate-500">omarabovli@portfolio:~$</div>
          </div>

          <div className="mt-8 space-y-6 relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-sm font-mono mb-4 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>Available for hire</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white font-mono">
              OMAR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 neon-text">
                ABOVLI
              </span>
            </h1>

            <div className="h-12 flex items-center">
              <span className="text-2xl md:text-3xl text-slate-300 font-mono">
                {">"} {text}<span className="animate-pulse text-cyan-400">_</span>
              </span>
            </div>

            <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
              Crafting high-performance digital experiences with a focus on
              <span className="text-cyan-400"> interactive 3D elements</span> and
              <span className="text-purple-400"> scalable architecture</span>.
            </p>

            <div className="flex flex-wrap gap-4 pt-6">
              <a href="#projects" className="px-8 py-4 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition-all flex items-center gap-2 font-mono group/btn">
                <Terminal size={20} />
                View Work
                <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
              </a>

              <div className="flex items-center gap-4 px-6">
                <SocialLink href="https://github.com/OmarAbovli" icon={<Github size={20} />} />
                <SocialLink href="https://linkedin.com" icon={<Linkedin size={20} />} />
                <SocialLink href="mailto:contact@example.com" icon={<Mail size={20} />} />
              </div>
            </div>
          </div>

          {/* Background Gradient Blob */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-700" />
        </div>
      </div>
    </section>
  );
};

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-400 hover:scale-110 transition-all duration-300"
  >
    {icon}
  </a>
);

export default Hero;
