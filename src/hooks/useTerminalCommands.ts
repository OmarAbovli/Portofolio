import { useState, useCallback } from 'react';

export interface CommandOutput {
    command: string;
    output: string;
    timestamp: Date;
}

export const useTerminalCommands = () => {
    const [history, setHistory] = useState<CommandOutput[]>([]);

    const executeCommand = useCallback((input: string): string => {
        const command = input.trim().toLowerCase();

        switch (command) {
            case 'help':
                return `Available commands:
  help      - Show this help message
  skills    - Navigate to skills section
  projects  - Navigate to projects section
  whoami    - Display information about me
  clear     - Clear terminal history
  ls -la    - List all files (including hidden)
  sudo rm -rf /  - Don't even think about it 😄`;

            case 'whoami':
                return 'Omar Abovli - Full Stack Developer\nSpecializing in React, Node.js, and 3D Web Experiences';

            case 'skills':
                document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
                return 'Navigating to skills section...';

            case 'projects':
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                return 'Navigating to projects section...';

            case 'clear':
                setHistory([]);
                return '';

            case 'ls -la':
                return `total 42
drwxr-xr-x  5 omar  staff   160 Jan 30 01:00 .
drwxr-xr-x  3 omar  staff    96 Jan 29 22:00 ..
-rw-r--r--  1 omar  staff  1337 Jan 30 00:30 .secret_project
drwxr-xr-x  8 omar  staff   256 Jan 30 01:00 projects
drwxr-xr-x  4 omar  staff   128 Jan 29 23:00 skills
-rwxr-xr-x  1 omar  staff  9001 Jan 30 01:00 portfolio.sh`;

            case 'ls':
                return `projects  skills  portfolio.sh`;

            case 'sudo rm -rf /':
                return `Permission denied. Nice try though! 😏
(This portfolio is protected by plot armor)`;

            case 'cat .secret_project':
                return `# Top Secret Project
Building the next generation of web experiences...
Stay tuned! 🚀`;

            case 'pwd':
                return '/home/omar/portfolio';

            case 'date':
                return new Date().toString();

            case '':
                return '';

            default:
                return `zsh: command not found: ${input}
Type 'help' for available commands.`;
        }
    }, []);

    const addToHistory = useCallback((command: string, output: string) => {
        if (command.toLowerCase() !== 'clear' && output) {
            setHistory(prev => [...prev, { command, output, timestamp: new Date() }]);
        }
    }, []);

    return { history, executeCommand, addToHistory, clearHistory: () => setHistory([]) };
};
