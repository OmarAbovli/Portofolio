
import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, Float, Environment, OrbitControls } from '@react-three/drei';
import { Plus, Check, Trash2, Clock, User, Target } from 'lucide-react';
import * as THREE from 'three';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
}

const Floating3DTask = ({ task, index }: { task: Task; index: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 + index;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8 + index) * 0.5;

      // Change color based on completion
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      if (task.completed) {
        material.color.setHex(0x00ff88);
        material.emissive.setHex(0x004422);
      } else {
        const priorityColors = { low: 0x4ecdc4, medium: 0xffd93d, high: 0xff6b6b };
        material.color.setHex(priorityColors[task.priority]);
        material.emissive.setHex(priorityColors[task.priority] * 0.3);
      }
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[index * 1.5 - 2, 0, Math.sin(index) * 2]}>
        <octahedronGeometry args={[0.5]} />
        <meshStandardMaterial
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={task.completed ? 0.6 : 0.9}
        />
      </mesh>
    </Float>
  );
};

const Scene3D = ({ tasks }: { tasks: Task[] }) => {
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <>
      <Environment preset="sunset" />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ff6b6b" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#4ecdc4" />

      {tasks.slice(0, 6).map((task, index) => (
        <Floating3DTask key={task.id} task={task} index={index} />
      ))}

      <Center>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.4}
          height={0.1}
          position={[0, -3, 0]}
        >
          Task Universe
          <meshStandardMaterial color="#ffd93d" metalness={0.8} roughness={0.2} />
        </Text3D>
      </Center>
    </>
  );
};

const TaskManagerDemo = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Design Homepage',
      description: 'Create responsive homepage design with modern UI',
      completed: false,
      priority: 'high',
      assignee: 'Omar',
      dueDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'Implement Authentication',
      description: 'Set up user login and registration system',
      completed: true,
      priority: 'medium',
      assignee: 'Sarah',
      dueDate: '2024-01-12'
    },
    {
      id: 3,
      title: 'Database Optimization',
      description: 'Optimize database queries for better performance',
      completed: false,
      priority: 'low',
      assignee: 'Mike',
      dueDate: '2024-01-20'
    }
  ]);

  const [newTask, setNewTask] = useState<{
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    assignee: string;
    dueDate: string;
  }>({
    title: '',
    description: '',
    priority: 'medium',
    assignee: '',
    dueDate: ''
  });

  const [showForm, setShowForm] = useState(false);

  const addTask = () => {
    if (newTask.title.trim()) {
      const task: Task = {
        id: Date.now(),
        ...newTask,
        completed: false
      };
      setTasks(prev => [...prev, task]);
      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
        assignee: '',
        dueDate: ''
      });
      setShowForm(false);
    }
  };

  const toggleTask = (id: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <Suspense fallback={null}>
            <Scene3D tasks={tasks} />
          </Suspense>
        </Canvas>
      </div>

      {/* Glassmorphism overlay */}
      <div className="relative z-10 min-h-screen backdrop-blur-sm bg-black/30 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <Target className="text-cyan-400" size={40} />
                3D Task Manager
              </h1>
              <p className="text-gray-300">
                {completedTasks} of {totalTasks} tasks completed in the digital universe
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-cyan-500/80 to-blue-600/80 hover:from-cyan-600/80 hover:to-blue-700/80 backdrop-blur-sm text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all transform hover:scale-105"
            >
              <Plus size={20} />
              Add Task
            </button>
          </div>

          {/* Enhanced Progress Bar */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6 border border-white/20">
            <div className="flex justify-between text-white mb-2">
              <span className="flex items-center gap-2">
                <Target className="text-cyan-400" size={20} />
                Progress
              </span>
              <span className="text-2xl font-bold text-cyan-400">{Math.round((completedTasks / totalTasks) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-4 rounded-full transition-all duration-500 relative"
                style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Add Task Form */}
          {showForm && (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6 border border-white/20 animate-fadeIn">
              <h2 className="text-xl font-bold text-white mb-4">🚀 Create New Task</h2>
              <div className="grid gap-4">
                <input
                  type="text"
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-white placeholder-gray-400 focus:border-cyan-400 transition-colors"
                />
                <textarea
                  placeholder="Task description"
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-white placeholder-gray-400 h-24 focus:border-cyan-400 transition-colors"
                />
                <div className="grid grid-cols-3 gap-4">
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' }))}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-white focus:border-cyan-400 transition-colors"
                  >
                    <option value="low">🟢 Low Priority</option>
                    <option value="medium">🟡 Medium Priority</option>
                    <option value="high">🔴 High Priority</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Assignee"
                    value={newTask.assignee}
                    onChange={(e) => setNewTask(prev => ({ ...prev, assignee: e.target.value }))}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-white placeholder-gray-400 focus:border-cyan-400 transition-colors"
                  />
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-white focus:border-cyan-400 transition-colors"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={addTask}
                    className="bg-green-500/80 hover:bg-green-600/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg transition-all transform hover:scale-105"
                  >
                    ✨ Add Task
                  </button>
                  <button
                    onClick={() => setShowForm(false)}
                    className="bg-gray-500/80 hover:bg-gray-600/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg transition-all transform hover:scale-105"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tasks List */}
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <div
                key={task.id}
                className={`bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 transition-all transform hover:scale-[1.02] hover:border-cyan-400/50 ${task.completed ? 'opacity-70' : ''
                  }`}
                style={{
                  animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`mt-1 p-2 rounded-full transition-all transform hover:scale-110 ${task.completed
                        ? 'bg-green-500/80 text-white shadow-lg shadow-green-500/30'
                        : 'bg-white/20 text-gray-400 hover:bg-white/30'
                        }`}
                    >
                      <Check size={16} />
                    </button>
                    <div>
                      <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-400' : 'text-white'
                        }`}>
                        {task.title}
                      </h3>
                      <p className="text-gray-300 text-sm">{task.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)} shadow-lg`} />
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-400 hover:text-red-300 transition-colors transform hover:scale-110 p-1 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    {task.assignee}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {task.dueDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default TaskManagerDemo;
