import { ExternalLink, Github } from 'lucide-react';
import { useState, useEffect } from 'react';

const Projects = () => {
  const [loadingProjects, setLoadingProjects] = useState<number[]>([]);

  const projects = [
    {
      title: 'Ivory Studio',
      description: 'software company built with React and Three.js to provide 3D elements. It\'s a real company where you can start your project from.',
      image: 'https://gcdnb.pbrd.co/images/bsHfqJoZlpaY.png?o=1',
      tech: ['React', 'TypeScript', 'Tailwind', 'Real-time'],
      github: 'https://github.com/OmarAbovli/That-Creative-Company',
      live: 'https://ivory-studio.vercel.app/',
      demoPath: 'https://ivory-studio.vercel.app/'
    },
    {
      title: 'competooo',
      description: 'Tafouq is an educational platform where teachers can be added and upload their own protected and secured videos. Students can purchase videos and subscribe to teachers. Teachers can also upload images and control the access permissions of each student to the content.',
      image: 'https://gcdnb.pbrd.co/images/OHVqGWDPVhRV.png?o=1',
      tech: ['React', 'State Management', 'UI/UX', 'Productivity'],
      github: 'https://github.com/OmarAbovli/tafawokDEMO',
      live: 'https://tafawokdemo.vercel.app/',
      demoPath: 'https://tafawokdemo.vercel.app/'
    },
    {
      title: 'Sahel is an administrative management sass app',
      description: 'Sahel is a SaaS application for managing companies and warehouses, featuring a modern, simple, and eye-friendly design. It includes accounting modules for managing cash, accounts, banks, employees, the general ledger, and debts, as well as employee management. The system can also be integrated with hardware such as fingerprint devices and cameras. Each company has two types of accounts: manager accounts and employee accounts, and every manager can assign and customize permissions for each employee. The platform also provides AI-powered company data analysis, offering recommendations and forecasts using artificial intelligence.',
      image: 'https://gcdnb.pbrd.co/images/q48XXDuJeZgr.png?o=1',
      tech: ['React', 'AI/ML', 'Data Viz', 'Analytics'],
      github: 'https://github.com/OmarAbovli/Sahl-ERP-sys',
      live: 'https://sahl-demo.vercel.app/',
      demoPath: 'https://sahl-demo.vercel.app/'
    },
  ];

  const openDemo = (demoPath: string) => {
    if (demoPath.startsWith('http')) {
      window.open(demoPath, '_blank');
    } else {
      window.open(`/demo/${demoPath}`, '_blank');
    }
  };

  useEffect(() => {
    projects.forEach((_, index) => {
      setTimeout(() => {
        setLoadingProjects(prev => [...prev, index]);
      }, index * 300);
    });
  }, []);


  return (
    <section id="projects" className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6 font-mono">
            Featured <span className="text-blue-500">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto mb-4" />
          <p className="text-gray-400 text-lg font-mono">~/projects $ ls -la</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="terminal-window rounded-xl overflow-hidden hover:translate-y-[-5px] transition-all duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="bg-[#2d2d2d] px-4 py-2 flex items-center border-b border-black/50">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex-1 text-center text-[10px] font-mono text-gray-500 ml-[-40px]">
                  {project.title.substring(0, 15).toLowerCase().replace(/\s/g, '_')} — bash
                </div>
              </div>

              <div className="relative overflow-hidden group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>

              <div className="p-6 space-y-4 bg-[#1e1e1e]">
                <h3 className="text-xl font-bold text-white font-mono group-hover:text-blue-400 transition-colors">
                  ./{project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-mono">
                  <span className="text-green-500">{">"}</span> {project.description.length > 100 ? project.description.substring(0, 100) + '...' : project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-[#3a3a3c] text-blue-300 rounded border border-blue-500/20 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4 pt-4 border-t border-white/5">
                  <a
                    href={project.github}
                    className="flex-1 text-center py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded transition-colors flex items-center justify-center gap-2 font-mono"
                  >
                    <Github size={14} />
                    source
                  </a>
                  <button
                    onClick={() => openDemo(project.demoPath)}
                    className="flex-1 text-center py-2 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors flex items-center justify-center gap-2 font-mono shadow-lg shadow-blue-900/20"
                  >
                    <ExternalLink size={14} />
                    ./run
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm font-mono">
            # All demos are fully functional. Click './run' to execute.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;
