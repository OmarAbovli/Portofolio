import jwt from 'jsonwebtoken';
import { getSql } from './_lib/db';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;
  const sql = getSql();

  const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

  if (username?.trim() === ADMIN_USERNAME?.trim() && password?.trim() === ADMIN_PASSWORD?.trim()) {
    const token = jwt.sign({ username: username.trim() }, JWT_SECRET, { expiresIn: '24h' });
    return res.status(200).json({ token });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
}
