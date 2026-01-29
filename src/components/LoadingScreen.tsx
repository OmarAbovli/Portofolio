
import { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('Initializing 3D Engine...');

  useEffect(() => {
    const stages = [
      'Initializing 3D Engine...',
      'Loading Quantum Shaders...',
      'Generating Particle Systems...',
      'Calibrating Neural Networks...',
      'Synchronizing Reality Matrix...',
      'Portfolio Ready'
    ];

    let currentStage = 0;
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        
        // Update stage based on progress
        const stageProgress = Math.floor((newProgress / 100) * stages.length);
        if (stageProgress < stages.length && stageProgress !== currentStage) {
          currentStage = stageProgress;
          setStage(stages[currentStage]);
        }
        
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
      <div className="text-center relative">
        {/* Animated background circles */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-32 h-32 border border-cyan-400/30 rounded-full animate-ping"
              style={{ 
                animationDelay: `${i * 0.5}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10">
          <div className="w-80 h-3 bg-slate-700 rounded-full overflow-hidden mb-8 border border-cyan-400/30">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-6 animate-pulse">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              NEURAL
            </span>{' '}
            PORTFOLIO
          </h1>
          
          <p className="text-cyan-400 text-lg mb-8 font-mono">{stage}</p>
          
          <div className="flex space-x-3 justify-center">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          
          <div className="mt-8 text-slate-400 text-sm">
            {progress}% Complete
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
