import { sql } from './db';
import jwt from 'jsonwebtoken';

const verifyAuth = (req: any) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return false;
  try {
    jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    return true;
  } catch {
    return false;
  }
};

export default async function handler(req: any, res: any) {
  try {
    switch (req.method) {
      case 'GET':
        const projects = await sql`SELECT * FROM projects ORDER BY created_at DESC`;
        return res.status(200).json(projects);

      case 'POST':
        if (!verifyAuth(req)) return res.status(401).json({ error: 'Unauthorized' });
        const { title, description, image_url, tech_stack, github_url, live_url, demo_path } = req.body;
        const newProject = await sql`
          INSERT INTO projects (title, description, image_url, tech_stack, github_url, live_url, demo_path)
          VALUES (${title}, ${description}, ${image_url}, ${tech_stack}, ${github_url}, ${live_url}, ${demo_path})
          RETURNING *
        `;
        return res.status(201).json(newProject[0]);

      case 'PUT':
        if (!verifyAuth(req)) return res.status(401).json({ error: 'Unauthorized' });
        const { id, ...updateData } = req.body;
        const updatedProject = await sql`
          UPDATE projects 
          SET title=${updateData.title}, description=${updateData.description}, 
              image_url=${updateData.image_url}, tech_stack=${updateData.tech_stack}, 
              github_url=${updateData.github_url}, live_url=${updateData.live_url}, 
              demo_path=${updateData.demo_path}
          WHERE id=${id}
          RETURNING *
        `;
        return res.status(200).json(updatedProject[0]);

      case 'DELETE':
        if (!verifyAuth(req)) return res.status(401).json({ error: 'Unauthorized' });
        const { id: deleteId } = req.query;
        await sql`DELETE FROM projects WHERE id=${deleteId}`;
        return res.status(200).json({ message: 'Project deleted' });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('Projects API error:', error);
    return res.status(500).json({ error: error.message });
  }
}
