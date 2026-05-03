import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Trash2, Edit2, LogOut, ExternalLink, Github } from 'lucide-react';

interface Project {
  id?: number;
  title: string;
  description: string;
  image_url: string;
  tech_stack: string[];
  github_url: string;
  live_url: string;
  demo_path: string;
}

const AdminDashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Project>({
    title: '',
    description: '',
    image_url: '',
    tech_stack: [],
    github_url: '',
    live_url: '',
    demo_path: ''
  });
  const [techInput, setTechInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      toast.error('Failed to fetch projects');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    const method = editingProject ? 'PUT' : 'POST';
    
    try {
      const res = await fetch('/api/projects', {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editingProject ? { ...formData, id: editingProject.id } : formData),
      });

      if (res.ok) {
        toast.success(`Project ${editingProject ? 'updated' : 'added'} successfully`);
        setEditingProject(null);
        setFormData({ title: '', description: '', image_url: '', tech_stack: [], github_url: '', live_url: '', demo_path: '' });
        setTechInput('');
        fetchProjects();
      } else {
        const error = await res.json();
        toast.error(error.error || 'Failed to save project');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch(`/api/projects?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        toast.success('Project deleted');
        fetchProjects();
      }
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData(project);
    setTechInput(project.tech_stack.join(', '));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size too large (max 2MB)');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image_url: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTechChange = (val: string) => {
    setTechInput(val);
    setFormData({ ...formData, tech_stack: val.split(',').map(s => s.trim()).filter(s => s !== '') });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold font-mono">Admin Dashboard</h1>
          <Button variant="destructive" onClick={handleLogout} className="flex gap-2">
            <LogOut size={16} /> Logout
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="bg-slate-900 border-slate-800 text-white">
            <CardHeader>
              <CardTitle className="font-mono flex items-center gap-2">
                {editingProject ? <Edit2 size={18} /> : <Plus size={18} />}
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">Title</label>
                  <Input 
                    value={formData.title} 
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="bg-slate-800 border-slate-700" 
                    required 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">Description</label>
                  <Textarea 
                    value={formData.description} 
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="bg-slate-800 border-slate-700 h-24" 
                    required 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-400">Project Image</label>
                    <div className="flex flex-col gap-2">
                      {formData.image_url && (
                        <img src={formData.image_url} alt="Preview" className="w-full h-20 object-cover rounded border border-slate-700" />
                      )}
                      <Input 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange}
                        className="bg-slate-800 border-slate-700 text-xs" 
                      />
                      <p className="text-[10px] text-slate-500">Or paste URL below:</p>
                      <Input 
                        value={formData.image_url} 
                        onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                        className="bg-slate-800 border-slate-700 h-8 text-xs" 
                        placeholder="Image URL"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-400">Tech Stack (comma separated)</label>
                    <Input 
                      value={techInput} 
                      onChange={(e) => handleTechChange(e.target.value)}
                      className="bg-slate-800 border-slate-700" 
                      placeholder="React, Node.js, ..."
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-400">GitHub URL</label>
                    <Input 
                      value={formData.github_url} 
                      onChange={(e) => setFormData({...formData, github_url: e.target.value})}
                      className="bg-slate-800 border-slate-700" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-400">Live URL</label>
                    <Input 
                      value={formData.live_url} 
                      onChange={(e) => setFormData({...formData, live_url: e.target.value})}
                      className="bg-slate-800 border-slate-700" 
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">Demo Path (slug or full URL)</label>
                  <Input 
                    value={formData.demo_path} 
                    onChange={(e) => setFormData({...formData, demo_path: e.target.value})}
                    className="bg-slate-800 border-slate-700" 
                    placeholder="ecommerce or https://..."
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-500">
                    {editingProject ? 'Update Project' : 'Add Project'}
                  </Button>
                  {editingProject && (
                    <Button type="button" variant="outline" onClick={() => {
                      setEditingProject(null);
                      setFormData({ title: '', description: '', image_url: '', tech_stack: [], github_url: '', live_url: '', demo_path: '' });
                      setTechInput('');
                    }}>
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* List Section */}
          <div className="space-y-4 overflow-y-auto max-h-[800px] pr-2">
            <h2 className="text-xl font-mono flex items-center gap-2">
              <Plus size={18} /> Current Projects
            </h2>
            {projects.map((p) => (
              <Card key={p.id} className="bg-slate-900 border-slate-800 text-white group">
                <CardContent className="p-4 flex items-center gap-4">
                  <img src={p.image_url} alt={p.title} className="w-20 h-20 object-cover rounded border border-slate-700" />
                  <div className="flex-1">
                    <h3 className="font-bold font-mono">{p.title}</h3>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(p)} className="h-8 w-8 p-0">
                        <Edit2 size={14} />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(p.id!)} className="h-8 w-8 p-0">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {p.github_url && <a href={p.github_url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white"><Github size={16}/></a>}
                    {p.live_url && <a href={p.live_url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white"><ExternalLink size={16}/></a>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
