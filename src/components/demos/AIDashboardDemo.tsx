
import { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, Float, Environment, OrbitControls } from '@react-three/drei';
import { TrendingUp, Users, DollarSign, Activity, Brain, Zap, Code, Briefcase, Award, Github, Linkedin, Mail } from 'lucide-react';
import * as THREE from 'three';

import { LucideIcon } from 'lucide-react';

const FloatingIcon = ({ position, icon: Icon, color }: { position: [number, number, number]; icon: LucideIcon; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.3]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.8}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
};

const Scene3D = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <>
      <Environment preset="city" />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ff6b6b" />
      <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={1} color="#ffd93d" />

      <group ref={groupRef}>
        <FloatingIcon position={[-3, 0, 0]} icon={Code} color="#4ecdc4" />
        <FloatingIcon position={[3, 0, 0]} icon={Briefcase} color="#ff6b6b" />
        <FloatingIcon position={[0, 2, -2]} icon={Award} color="#ffd93d" />
        <FloatingIcon position={[-2, -2, 2]} icon={Brain} color="#9b59b6" />
        <FloatingIcon position={[2, -2, 2]} icon={Zap} color="#e74c3c" />
      </group>

      <Center>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.5}
          height={0.15}
          position={[0, -4, 0]}
        >
          Omar's Universe
          <meshStandardMaterial color="#00ffff" metalness={0.9} roughness={0.1} />
        </Text3D>
      </Center>
    </>
  );
};

const AIDashboardDemo = () => {
  const [metrics, setMetrics] = useState({
    projectsCompleted: 42,
    clientsSatisfied: 28,
    codeLines: 150000,
    experienceYears: 3
  });

  const [skills] = useState([
    { name: 'React/Next.js', level: 95, color: '#61dafb' },
    { name: 'TypeScript', level: 90, color: '#3178c6' },
    { name: 'Node.js', level: 88, color: '#339933' },
    { name: 'Python', level: 85, color: '#3776ab' },
    { name: 'UI/UX Design', level: 92, color: '#ff6b6b' },
    { name: 'Cloud/DevOps', level: 80, color: '#ff9500' }
  ]);

  const [projects] = useState([
    {
      name: "E-Commerce Platform",
      description: "Full-stack marketplace with real-time features",
      tech: ["React", "Node.js", "MongoDB"],
      status: "Live",
      impact: "10k+ users"
    },
    {
      name: "AI Analytics Dashboard",
      description: "ML-powered business intelligence tool",
      tech: ["Python", "TensorFlow", "React"],
      status: "In Progress",
      impact: "85% accuracy"
    },
    {
      name: "Mobile Banking App",
      description: "Secure fintech solution with biometric auth",
      tech: ["React Native", "Blockchain", "AWS"],
      status: "Completed",
      impact: "$2M+ transactions"
    }
  ]);

  const [achievements] = useState([
    "🏆 Top Developer Award 2023",
    "🚀 Successfully launched 25+ projects",
    "⭐ 4.9/5 average client rating",
    "🌟 Open source contributor",
    "💡 Innovation in AI/ML applications"
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        codeLines: prev.codeLines + Math.floor(Math.random() * 100)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </Canvas>
      </div>

      {/* Glassmorphism overlay */}
      <div className="relative z-10 min-h-screen backdrop-blur-sm bg-black/20 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-white shadow-2xl">
                O
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white animate-pulse" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Omar's <span className="text-cyan-400">Portfolio Dashboard</span>
            </h1>
            <p className="text-gray-300 text-xl mb-6">Full-Stack Developer & Creative Technologist</p>

            {/* Social Links */}
            <div className="flex justify-center gap-4 mb-8">
              <a href="#" className="bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-all transform hover:scale-110">
                <Github className="text-white" size={24} />
              </a>
              <a href="#" className="bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-all transform hover:scale-110">
                <Linkedin className="text-white" size={24} />
              </a>
              <a href="#" className="bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-all transform hover:scale-110">
                <Mail className="text-white" size={24} />
              </a>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-cyan-400/50 transition-all transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <Briefcase className="text-blue-400" size={32} />
                <span className="text-green-400 text-sm font-semibold">Active</span>
              </div>
              <h3 className="text-3xl font-bold text-white">{metrics.projectsCompleted}</h3>
              <p className="text-gray-400">Projects Completed</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-cyan-400/50 transition-all transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <Users className="text-green-400" size={32} />
                <span className="text-green-400 text-sm font-semibold">😊 Happy</span>
              </div>
              <h3 className="text-3xl font-bold text-white">{metrics.clientsSatisfied}</h3>
              <p className="text-gray-400">Satisfied Clients</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-cyan-400/50 transition-all transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <Code className="text-purple-400" size={32} />
                <span className="text-green-400 text-sm font-semibold">+100/day</span>
              </div>
              <h3 className="text-3xl font-bold text-white">{metrics.codeLines.toLocaleString()}</h3>
              <p className="text-gray-400">Lines of Code</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-cyan-400/50 transition-all transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <Award className="text-orange-400" size={32} />
                <span className="text-green-400 text-sm font-semibold">Growing</span>
              </div>
              <h3 className="text-3xl font-bold text-white">{metrics.experienceYears}+</h3>
              <p className="text-gray-400">Years Experience</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Skills Chart */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Brain className="text-cyan-400" size={24} />
                Technical Skills
              </h2>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-white">
                      <span className="font-semibold">{skill.name}</span>
                      <span className="text-cyan-400">{skill.level}%</span>
                    </div>
                    <div className="bg-gray-700/50 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 relative"
                        style={{
                          width: `${skill.level}%`,
                          backgroundColor: skill.color,
                          boxShadow: `0 0 20px ${skill.color}50`,
                          animationDelay: `${index * 200}ms`
                        }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Projects */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="text-cyan-400" size={24} />
                Featured Projects
              </h2>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div
                    key={project.name}
                    className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all transform hover:scale-[1.02]"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-white font-semibold text-lg">{project.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${project.status === 'Live' ? 'bg-green-500/20 text-green-400' :
                          project.status === 'Completed' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-yellow-500/20 text-yellow-400'
                        }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.tech.map(tech => (
                        <span key={tech} className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="text-cyan-400 text-sm font-semibold">Impact: {project.impact}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="text-yellow-400" size={24} />
              Achievements & Recognition
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all transform hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <p className="text-gray-300 font-medium">{achievement}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 backdrop-blur-md rounded-xl p-8 border border-cyan-400/30">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to work together?</h3>
              <p className="text-gray-300 mb-6">Let's create something amazing and make it creative!</p>
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95">
                🚀 Let's Connect!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDashboardDemo;
