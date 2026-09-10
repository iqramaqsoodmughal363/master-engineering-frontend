import React, { useState } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('project');
  
  // Project/Gallery Form State
  const [projectForm, setProjectForm] = useState({ title: '', imageUrl: '', description: '' });
  
  // Service Form State
  const [serviceForm, setServiceForm] = useState({ title: '', icon: '', description: '' });

  // Handle Project Submit
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/projects', projectForm);
      toast.success(res.data.message);
      setProjectForm({ title: '', imageUrl: '', description: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add project');
    }
  };

  // Handle Service Submit
  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/services', serviceForm);
      toast.success(res.data.message);
      setServiceForm({ title: '', icon: '', description: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add service');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">Admin Management Panel</h2>
        
        {/* Tab Switcher */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('project')}
            className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
              activeTab === 'project' ? 'bg-secondary text-white shadow-md' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Add Gallery Project
          </button>
          <button
            onClick={() => setActiveTab('service')}
            className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
              activeTab === 'service' ? 'bg-secondary text-white shadow-md' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Add New Service
          </button>
        </div>

        {/* Project Form */}
        {activeTab === 'project' ? (
          <form onSubmit={handleProjectSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Upload Project to Gallery</h3>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Project Title</label>
              <input
                type="text"
                value={projectForm.title}
                onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
                placeholder="e.g. Mechanical Part Design"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Image URL</label>
              <input
                type="text"
                value={projectForm.imageUrl}
                onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
                placeholder="Paste direct image link here"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
              <textarea
                value={projectForm.description}
                onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
                placeholder="Short description of the project"
                rows="3"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-all shadow-md"
            >
              Upload Project
            </button>
          </form>
        ) : (
          /* Service Form */
          <form onSubmit={handleServiceSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Add New Service</h3>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Service Title</label>
              <input
                type="text"
                value={serviceForm.title}
                onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
                placeholder="e.g. CNC Machining"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Icon Name (Optional)</label>
              <input
                type="text"
                value={serviceForm.icon}
                onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
                placeholder="e.g. FaTools"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
              <textarea
                value={serviceForm.description}
                onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
                placeholder="Detailed service description"
                rows="3"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-all shadow-md"
            >
              Add Service
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;