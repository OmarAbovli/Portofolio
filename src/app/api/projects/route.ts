import { NextResponse } from 'next/server';
import { getSql } from '@/lib/db';
import jwt from 'jsonwebtoken';

const verifyAuth = (request: Request) => {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.split(' ')[1];
  if (!token) return false;
  try {
    jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    return true;
  } catch {
    return false;
  }
};

export async function GET() {
  try {
    const sql = getSql();
    const projects = await sql`SELECT * FROM projects ORDER BY id DESC`;
    return NextResponse.json(projects);
  } catch (error: any) {
    console.error('Projects GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!verifyAuth(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    const { title, description, image_url, tech_stack, github_url, live_url, demo_path } = body;
    const sql = getSql();
    
    const newProject = await sql`
      INSERT INTO projects (title, description, image_url, tech_stack, github_url, live_url, demo_path)
      VALUES (${title}, ${description}, ${image_url}, ${tech_stack}, ${github_url}, ${live_url}, ${demo_path})
      RETURNING *
    `;
    return NextResponse.json(newProject[0], { status: 201 });
  } catch (error: any) {
    console.error('Projects POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    if (!verifyAuth(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    const { id, title, description, image_url, tech_stack, github_url, live_url, demo_path } = body;
    const sql = getSql();
    
    const updatedProject = await sql`
      UPDATE projects 
      SET title=${title}, description=${description}, 
          image_url=${image_url}, tech_stack=${tech_stack}, 
          github_url=${github_url}, live_url=${live_url}, 
          demo_path=${demo_path}
      WHERE id=${id}
      RETURNING *
    `;
    return NextResponse.json(updatedProject[0]);
  } catch (error: any) {
    console.error('Projects PUT error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    if (!verifyAuth(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const sql = getSql();
    
    await sql`DELETE FROM projects WHERE id=${id}`;
    return NextResponse.json({ message: 'Project deleted' });
  } catch (error: any) {
    console.error('Projects DELETE error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
