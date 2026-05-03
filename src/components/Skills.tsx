import { useState, useEffect } from 'react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [animatedSkills, setAnimatedSkills] = useState<string[]>([]);

  const skillCategories = {
    frontend: [
      { name: 'React/Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'Three.js', level: 80 },
    ],
    backend: [
      { name: 'Node.js', level: 90 },
      { name: 'LaravelPHP', level: 85 },
      { name: 'SQL', level: 98 },
      { name: 'MongoDB', level: 82 },
    ],
    tools: [
      { name: 'AWS', level: 50 },
      { name: 'Docker', level: 80 },
      { name: 'Git', level: 95 },
    ],
  };

  useEffect(() => {
    setAnimatedSkills([]);
    const skills = skillCategories[activeCategory as keyof typeof skillCategories];
    skills.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedSkills(prev => [...prev, skills[index].name]);
      }, index * 200);
    });
  }, [activeCategory]);

  const renderProgressBar = (level: number) => {
    const totalBlocks = 10;
    const filledBlocks = Math.round((level / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;

    return (
      <span className="text-blue-400">
        [<span className="text-green-400">{'█'.repeat(filledBlocks)}</span>
        <span className="text-gray-600">{'░'.repeat(emptyBlocks)}</span>]
      </span>
    );
  };

  return (
    <section id="skills" className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6 font-mono">
            My <span className="text-blue-500">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto mb-4" />
          <p className="text-gray-400 font-mono">~/skills $ cat expertise.txt</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Terminal Skills Display */}
          <div className="terminal-window rounded-xl overflow-hidden">
            <div className="bg-[#2d2d2d] px-4 py-2 flex items-center border-b border-black/50">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex-1 text-center text-[10px] font-mono text-gray-500 ml-[-40px]">
                skills.sh — bash
              </div>
            </div>

            <div className="bg-[#1e1e1e] p-6 space-y-6">
              {/* Category Tabs */}
              <div className="flex space-x-2 mb-4 flex-wrap gap-2">
                {Object.keys(skillCategories).map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded font-mono text-sm transition-all ${activeCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-[#3a3a3c] text-gray-400 hover:bg-[#48484a]'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Skills List */}
              <div className="space-y-3 font-mono text-sm">
                {skillCategories[activeCategory as keyof typeof skillCategories].map((skill) => (
                  <div
                    key={skill.name}
                    className={`transition-all duration-300 ${animatedSkills.includes(skill.name) ? 'opacity-100' : 'opacity-0'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 min-w-[140px]">{skill.name}</span>
                      <span className="mx-2">{renderProgressBar(skill.level)}</span>
                      <span className="text-green-400 min-w-[45px] text-right">{skill.level}%</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-gray-500 text-xs font-mono">
                  $ echo "Continuously learning and evolving..."
                </p>
              </div>
            </div>
          </div>

          {/* What I Bring Section */}
          <div className="space-y-8">
            <div className="terminal-window rounded-xl overflow-hidden">
              <div className="bg-[#2d2d2d] px-4 py-2 flex items-center border-b border-black/50">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex-1 text-center text-[10px] font-mono text-gray-500 ml-[-40px]">
                  about.txt — vim
                </div>
              </div>

              <div className="bg-[#1e1e1e] p-6">
                <h3 className="text-xl font-bold text-white mb-4 font-mono">What I Bring</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3">
                    <span className="text-green-500 font-mono">✓</span>
                    <p className="text-gray-400 font-mono">
                      <strong className="text-white">Performance Optimization:</strong> Building lightning-fast applications
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-500 font-mono">✓</span>
                    <p className="text-gray-400 font-mono">
                      <strong className="text-white">Scalable Architecture:</strong> Systems that grow with your needs
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-500 font-mono">✓</span>
                    <p className="text-gray-400 font-mono">
                      <strong className="text-white">User-Centric Design:</strong> Interfaces that users love
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="terminal-window rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1 font-mono">25+</div>
                <div className="text-gray-400 text-sm font-mono">Projects</div>
              </div>
              <div className="terminal-window rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-green-400 mb-1 font-mono">25+</div>
                <div className="text-gray-400 text-sm font-mono">Clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
