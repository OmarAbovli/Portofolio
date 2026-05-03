const fs = require('fs');
require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

async function setup() {
  const sql = neon(process.env.DATABASE_URL);
  
  console.log('Seeding initial projects...');
  const initialProjects = [
    {
      title: 'Ivory Studio',
      description: 'software company built with React and Three.js to provide 3D elements. It\'s a real company where you can start your project from.',
      image_url: 'https://gcdnb.pbrd.co/images/bsHfqJoZlpaY.png?o=1',
      tech_stack: ['React', 'TypeScript', 'Tailwind', 'Real-time'],
      github_url: 'https://github.com/OmarAbovli/That-Creative-Company',
      live_url: 'https://ivory-studio.vercel.app/',
      demo_path: 'https://ivory-studio.vercel.app/'
    },
    {
      title: 'competooo',
      description: 'Tafouq is an educational platform where teachers can be added and upload their own protected and secured videos. Students can purchase videos and subscribe to teachers. Teachers can also upload images and control the access permissions of each student to the content.',
      image_url: 'https://gcdnb.pbrd.co/images/OHVqGWDPVhRV.png?o=1',
      tech_stack: ['React', 'State Management', 'UI/UX', 'Productivity'],
      github_url: 'https://github.com/OmarAbovli/tafawokDEMO',
      live_url: 'https://tafawokdemo.vercel.app/',
      demo_path: 'https://tafawokdemo.vercel.app/'
    },
    {
      title: 'Sahel is an administrative management sass app',
      description: 'Sahel is a SaaS application for managing companies and warehouses, featuring a modern, simple, and eye-friendly design. It includes accounting modules for managing cash, accounts, banks, employees, the general ledger, and debts, as well as employee management. The system can also be integrated with hardware such as fingerprint devices and cameras. Each company has two types of accounts: manager accounts and employee accounts, and every manager can assign and customize permissions for each employee. The platform also provides AI-powered company data analysis, offering recommendations and forecasts using artificial intelligence.',
      image_url: 'https://gcdnb.pbrd.co/images/q48XXDuJeZgr.png?o=1',
      tech_stack: ['React', 'AI/ML', 'Data Viz', 'Analytics'],
      github_url: 'https://github.com/OmarAbovli/Sahl-ERP-sys',
      live_url: 'https://sahl-demo.vercel.app/',
      demo_path: 'https://sahl-demo.vercel.app/'
    }
  ];

  for (const p of initialProjects) {
    await sql`
      INSERT INTO projects (title, description, image_url, tech_stack, github_url, live_url, demo_path)
      VALUES (${p.title}, ${p.description}, ${p.image_url}, ${p.tech_stack}, ${p.github_url}, ${p.live_url}, ${p.demo_path})
    `;
  }
  console.log('Seeding complete.');
}

setup().then(() => console.log('Done!')).catch(console.error);
