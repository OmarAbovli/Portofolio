import { ExternalLink, Github, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Project {
  id?: number;
  title: string;
  description: string;
  image_url: string;
  tech_stack: string[];
  github_url: string;
  live_url: string;
  demo_path: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const openDemo = (demoPath: string) => {
    if (demoPath.startsWith('http')) {
      window.open(demoPath, '_blank');
    } else {
      window.open(`/demo/${demoPath}`, '_blank');
    }
  };

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

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-blue-500" size={48} />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id || project.title}
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
                    src={project.image_url}
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
                    {project.tech_stack?.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs bg-[#3a3a3c] text-blue-300 rounded border border-blue-500/20 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-4 pt-4 border-t border-white/5">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 text-center py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded transition-colors flex items-center justify-center gap-2 font-mono"
                      >
                        <Github size={14} />
                        source
                      </a>
                    )}
                    {project.demo_path && (
                      <button
                        onClick={() => openDemo(project.demo_path)}
                        className="flex-1 text-center py-2 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors flex items-center justify-center gap-2 font-mono shadow-lg shadow-blue-900/20"
                      >
                        <ExternalLink size={14} />
                        ./run
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

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
