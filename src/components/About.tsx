import { Code, Zap, Award } from 'lucide-react';

const About = () => {
  const skills = [
    'React & Next.js',
    'Node.js & Express',
    'TypeScript',
    'Php & Laravel',
    'PostgreSQL & MongoDB',
    'AWS & Docker',
  ];

  return (
    <section id="about" className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6 font-mono">
            About <span className="text-blue-500">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto mb-4" />
          <p className="text-gray-400 font-mono">~/about $ cat README.md</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Bio Terminal */}
          <div className="terminal-window rounded-xl overflow-hidden">
            <div className="bg-[#2d2d2d] px-4 py-2 flex items-center border-b border-black/50">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex-1 text-center text-[10px] font-mono text-gray-500 ml-[-40px]">
                bio.txt — vim
              </div>
            </div>

            <div className="bg-[#1e1e1e] p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Code className="text-blue-400 mt-1" size={20} />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 font-mono">Passionate Developer</h3>
                    <p className="text-gray-400 text-sm font-mono leading-relaxed">
                      With over 3 years of experience in full-stack development, I specialize in creating
                      scalable web applications and modern user interfaces.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Zap className="text-green-400 mt-1" size={20} />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 font-mono">Problem Solver</h3>
                    <p className="text-gray-400 text-sm font-mono leading-relaxed">
                      I thrive on tackling complex challenges and turning ideas into reality.
                      From concept to deployment, ensuring highest standards.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Award className="text-blue-400 mt-1" size={20} />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 font-mono">3+ Years Experience</h3>
                    <p className="text-gray-400 text-sm font-mono leading-relaxed">
                      Building exceptional digital solutions with cutting-edge technologies
                      and best practices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack Terminal */}
          <div className="terminal-window rounded-xl overflow-hidden">
            <div className="bg-[#2d2d2d] px-4 py-2 flex items-center border-b border-black/50">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex-1 text-center text-[10px] font-mono text-gray-500 ml-[-40px]">
                tech_stack.sh — bash
              </div>
            </div>

            <div className="bg-[#1e1e1e] p-8 space-y-6">
              <div>
                <div className="text-gray-500 text-xs font-mono mb-4">$ ls core_technologies/</div>
                <div className="grid grid-cols-2 gap-3">
                  {skills.map((skill, index) => (
                    <div
                      key={skill}
                      className="px-4 py-3 bg-[#2c2c2e] border border-blue-500/20 rounded text-blue-300 font-mono text-sm hover:bg-[#3a3a3c] transition-all"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <div className="text-gray-500 text-xs font-mono mb-3">$ cat stats.json</div>
                <div className="space-y-3 text-sm font-mono">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Experience:</span>
                    <span className="text-green-400">3+ years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Projects:</span>
                    <span className="text-green-400">25+ completed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Clients:</span>
                    <span className="text-green-400">25+ satisfied</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-blue-400">Available for hire</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
