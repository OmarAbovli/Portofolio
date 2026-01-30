import { ArrowRight, Github, Linkedin, Mail, Terminal } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useTerminalCommands } from '../hooks/useTerminalCommands';

const Hero = () => {
  const [text, setText] = useState('');
  const [input, setInput] = useState('');
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fullText = "Full Stack Developer";
  const { history, executeCommand, addToHistory } = useTerminalCommands();

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
        setTimeout(() => setShowInput(true), 500);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const output = executeCommand(input);
      addToHistory(input, output);
      setInput('');
    }
  };

  const asciiArt = `
   ___  __  __   _   ___ 
  / _ \\|  \\/  | /_\\ | _ \\
 | (_) | |\\/| |/ _ \\|   /
  \\___/|_|  |_/_/ \\_\\_|_\\
  `;

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative px-6 z-10">
      <div className="max-w-4xl w-full">
        <div className="terminal-window rounded-xl overflow-hidden group">

          {/* MacOS Window Title Bar */}
          <div className="bg-[#2d2d2d] px-4 py-3 flex items-center border-b border-black/50">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="flex-1 text-center text-xs font-mono text-gray-400 ml-[-50px]">
              omarabovli — -zsh — 80x24
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-6 relative z-10 bg-[#1e1e1e]/95 max-h-[600px] overflow-y-auto">
            {/* ASCII Art */}
            <pre className="text-blue-400 text-xs md:text-sm leading-tight opacity-60">
              {asciiArt}
            </pre>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white font-mono">
              OMAR <br />
              <span className="text-blue-500">
                ABOVLI
              </span>
            </h1>

            <div className="h-8 flex items-center">
              <span className="text-xl md:text-2xl text-gray-300 font-mono">
                {">"} {text}<span className="animate-pulse text-gray-500">_</span>
              </span>
            </div>

            <p className="text-gray-400 text-base max-w-xl leading-relaxed font-mono">
              Crafting high-performance digital experiences with a focus on
              <span className="text-blue-400"> interactive 3D elements</span> and
              <span className="text-green-400"> scalable architecture</span>.
            </p>

            {/* Command History */}
            {history.length > 0 && (
              <div className="space-y-2 border-t border-white/10 pt-4">
                {history.map((entry, i) => (
                  <div key={i} className="font-mono text-sm">
                    <div className="text-green-400">$ {entry.command}</div>
                    <pre className="text-gray-400 whitespace-pre-wrap ml-2">{entry.output}</pre>
                  </div>
                ))}
              </div>
            )}

            {/* Interactive Input */}
            {showInput && (
              <div className="flex items-center gap-2 font-mono text-sm border-t border-white/10 pt-4">
                <span className="text-green-400">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleCommand}
                  placeholder="Type 'help' for commands..."
                  className="flex-1 bg-transparent text-white outline-none placeholder:text-gray-600"
                  autoFocus
                />
              </div>
            )}

            <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
              <a href="#projects" className="px-6 py-3 bg-[#3a3a3c] hover:bg-[#48484a] text-white rounded-md transition-all flex items-center gap-2 font-mono group/btn border border-white/10">
                <Terminal size={18} />
                <span>./view_work.sh</span>
              </a>

              <div className="flex items-center gap-4 px-6">
                <SocialLink href="https://github.com/OmarAbovli" icon={<Github size={18} />} />
                <SocialLink href="https://linkedin.com" icon={<Linkedin size={18} />} />
                <SocialLink href="mailto:contact@example.com" icon={<Mail size={18} />} />
              </div>
            </div>
          </div>
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
    className="w-10 h-10 flex items-center justify-center rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
  >
    {icon}
  </a>
);

export default Hero;
