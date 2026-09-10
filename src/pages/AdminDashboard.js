import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Tabs: 'projects' or 'services'
  const [activeTab, setActiveTab] = useState('projects');

  // Form States for Project / Gallery
  const [projectTitle, setProjectTitle] = useState('');
  const [projectImageUrl, setProjectImageUrl] = useState('');
  const [projectDesc, setProjectDesc] = useState('');

  // Form States for Service
  const [serviceTitle, setServiceTitle] = useState('');
  const [serviceIcon, setServiceIcon] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');

  // Lists
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);

  // Fetch existing data
  useEffect(() => {
    fetchProjects();
    fetchServices();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('https://aster-engineering-backend.vercel.app/api/projects');
      const data = await res.json();
      if (res.ok) setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await fetch('https://aster-engineering-backend.vercel.app/api/services');
      const data = await res.json();
      if (res.ok) setServices(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Project Submit
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://aster-engineering-backend.vercel.app/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: projectTitle, imageUrl: projectImageUrl, description: projectDesc })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || 'Project added successfully!');
        setProjectTitle('');
        setProjectImageUrl('');
        setProjectDesc('');
        fetchProjects();
      } else {
        toast.error(data.message || 'Failed to add project');
      }
    } catch (err) {
      toast.error('Network error!');
    }
  };

  // Handle Service Submit
  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://aster-engineering-backend.vercel.app/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: serviceTitle, icon: serviceIcon, description: serviceDesc })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || 'Service added successfully!');
        setServiceTitle('');
        setServiceIcon('');
        setServiceDesc('');
        fetchServices();
      } else {
        toast.error(data.message || 'Failed to add service');
      }
    } catch (err) {
      toast.error('Network error!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-sm text-gray-600">Welcome, {user?.name || 'Admin'} ({user?.email})</p>
          </div>
          <button 
            onClick={() => { logout(); navigate('/login'); }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded font-semibold ${activeTab === 'projects' ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Manage Gallery (Projects)
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2 rounded font-semibold ${activeTab === 'services' ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Manage Services
          </button>
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Gallery Image / Project</h2>
            <form onSubmit={handleProjectSubmit} className="bg-gray-50 p-4 rounded-lg border mb-8 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Project Title</label>
                <input 
                  type="text" 
                  value={projectTitle} 
                  onChange={(e) => setProjectTitle(e.target.value)} 
                  required 
                  className="w-full mt-1 p-2 border rounded focus:ring focus:ring-amber-300"
                  placeholder="e.g. Industrial Piping"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input 
                  type="text" 
                  value={projectImageUrl} 
                  onChange={(e) => setProjectImageUrl(e.target.value)} 
                  required 
                  className="w-full mt-1 p-2 border rounded focus:ring focus:ring-amber-300"
                  placeholder="Paste direct image link here"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description (Optional)</label>
                <textarea 
                  value={projectDesc} 
                  onChange={(e) => setProjectDesc(e.target.value)} 
                  className="w-full mt-1 p-2 border rounded focus:ring focus:ring-amber-300"
                  placeholder="Short description about the project"
                />
              </div>
              <button type="submit" className="bg-amber-600 text-white px-6 py-2 rounded hover:bg-amber-700 font-semibold">
                Upload to Gallery
              </button>
            </form>

            <h3 className="text-lg font-semibold mb-3">Existing Gallery Items ({projects.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {projects.map((p) => (
                <div key={p._id} className="border rounded-lg p-3 bg-white shadow-sm">
                  <img src={p.imageUrl} alt={p.title} className="w-full h-32 object-cover rounded mb-2" />
                  <h4 className="font-bold">{p.title}</h4>
                  <p className="text-xs text-gray-500">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Service</h2>
            <form onSubmit={handleServiceSubmit} className="bg-gray-50 p-4 rounded-lg border mb-8 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Service Title</label>
                <input 
                  type="text" 
                  value={serviceTitle} 
                  onChange={(e) => setServiceTitle(e.target.value)} 
                  required 
                  className="w-full mt-1 p-2 border rounded focus:ring focus:ring-amber-300"
                  placeholder="e.g. Mechanical Fabrication"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Icon Class (Optional)</label>
                <input 
                  type="text" 
                  value={serviceIcon} 
                  onChange={(e) => setServiceIcon(e.target.value)} 
                  className="w-full mt-1 p-2 border rounded focus:ring focus:ring-amber-300"
                  placeholder="e.g. fa-cog"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea 
                  value={serviceDesc} 
                  onChange={(e) => setServiceDesc(e.target.value)} 
                  required 
                  className="w-full mt-1 p-2 border rounded focus:ring focus:ring-amber-300"
                  placeholder="Detailed service description"
                />
              </div>
              <button type="submit" className="bg-amber-600 text-white px-6 py-2 rounded hover:bg-amber-700 font-semibold">
                Add Service
              </button>
            </form>

            <h3 className="text-lg font-semibold mb-3">Existing Services ({services.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((s) => (
                <div key={s._id} className="border rounded-lg p-4 bg-white shadow-sm">
                  <h4 className="font-bold text-amber-600">{s.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;