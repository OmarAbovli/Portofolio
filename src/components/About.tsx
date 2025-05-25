
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
          <h2 className="text-5xl font-bold text-white mb-6">
            About <span className="text-cyan-400">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-4">
                Passionate Developer
              </h3>
              <p className="text-slate-300 leading-relaxed">
                With over 3 years of experience in full-stack development, I specialize in creating 
                scalable web applications and modern user interfaces. I'm passionate about clean code, 
                innovative solutions, and staying at the forefront of technology.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-4">
                Problem Solver
              </h3>
              <p className="text-slate-300 leading-relaxed">
                I thrive on tackling complex challenges and turning ideas into reality. 
                From concept to deployment, I ensure every project meets the highest standards 
                of performance, security, and user experience.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-white mb-8">Core Technologies</h3>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div 
                  key={skill}
                  className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-4 hover:border-cyan-400/40 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-cyan-400 font-semibold">{skill}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 rounded-2xl">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">3+</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Years of Experience</h4>
                  <p className="text-slate-300">Building exceptional digital solutions</p>
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
