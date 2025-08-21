
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'That Creative Company',
      description: 'software company built with React and Three.js to provide 3D elements. It’s a real company where you can start your project from.',
      image: 'https://imgpx.com/W67aUeAKjeHc.png',
      tech: ['React', 'TypeScript', 'Tailwind', 'Real-time'],
      github: 'https://github.com/OmarAbovli/That-Creative-Company',
      live: 'https://that-creative-company.vercel.app/',
      demoPath: 'https://that-creative-company.vercel.app/'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management with real-time updates, progress tracking, and team features.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500',
      tech: ['React', 'State Management', 'UI/UX', 'Productivity'],
      github: 'https://github.com/OmarAbovli',
      live: '/demo/taskmanager',
      demoPath: 'taskmanager'
    },
    {
      title: 'AI Dashboard',
      description: 'Analytics dashboard with AI-powered insights, real-time data visualization, and machine learning.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500',
      tech: ['React', 'AI/ML', 'Data Viz', 'Analytics'],
      github: 'https://github.com/OmarAbovli',
      live: '/demo/aidashboard',
      demoPath: 'aidashboard'
    },
  ];

  const openDemo = (demoPath: string) => {
  if (demoPath.startsWith('http')) {
    window.open(demoPath, '_blank'); // لينك خارجي كامل
  } else {
    window.open(`/demo/${demoPath}`, '_blank'); // لينك داخلي
  }
};


  return (
    <section id="projects" className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Featured <span className="text-cyan-400">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-4" />
          <p className="text-gray-300 text-lg">Interactive demos you can try right now</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.title}
              className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-500 hover:scale-105"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 text-xs bg-cyan-400/20 text-cyan-300 rounded-full border border-cyan-400/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4 pt-4">
                  <a 
                    href={project.github}
                    className="flex-1 text-center py-2 bg-slate-700 text-white rounded-lg hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                  <button 
                    onClick={() => openDemo(project.demoPath)}
                    className="flex-1 text-center py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={16} />
                    Try Demo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            ✨ All demos are fully functional and interactive - click "Try Demo" to explore!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;
