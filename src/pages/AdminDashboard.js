import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL || 'https://master-engineering-api.vercel.app';

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
  const [orders, setOrders] = useState([]);
  const [customerCarts, setCustomerCarts] = useState([]);
  const authHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Fetch existing data
  useEffect(() => {
    fetchProjects();
    fetchServices();
    fetchOrders();
    fetchCustomerCarts();
  }, []);

  const fetchCustomerCarts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/carts`, { headers: authHeaders() });
      const data = await res.json();
      if (res.ok) setCustomerCarts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/orders`, { headers: authHeaders() });
      const data = await res.json();
      if (res.ok) setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/api/projects`, { headers: authHeaders() });
      const data = await res.json();
      if (res.ok) setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await fetch(`${API_URL}/api/services`, { headers: authHeaders() });
      const data = await res.json();
      if (res.ok) setServices(data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const res = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Unable to update order status.');
      setOrders((current) => current.map((order) => order._id === orderId ? data.order : order));
      toast.success('Order status updated successfully.');
    } catch (error) { toast.error(error.message || 'Unable to update order status.'); }
  };

  // Handle Project Submit
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
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
      const res = await fetch(`${API_URL}/api/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
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
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded font-semibold ${activeTab === 'orders' ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Track Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('carts')}
            className={`px-4 py-2 rounded font-semibold ${activeTab === 'carts' ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            View Customer Carts ({customerCarts.length})
          </button>
        </div>

        {activeTab === 'carts' && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Customer Carts</h2>
            {customerCarts.length === 0 ? <p className="text-gray-500">No customer has added items to a cart yet.</p> : <div className="space-y-4">{customerCarts.map((cart) => (
              <div key={cart._id} className="border rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3"><div><h3 className="font-bold">{cart.user?.name || 'Customer'}</h3><p className="text-sm text-gray-500">{cart.user?.email || 'No email'}</p></div><span className="text-sm text-gray-600">{cart.items.length} selected item(s)</span></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">{cart.items.map((item) => <div key={item.productId} className="flex items-center gap-3 bg-gray-50 rounded p-2"><img src={item.thumbnail} alt={item.title} className="w-12 h-12 rounded object-cover" /><div><p className="font-semibold text-sm">{item.title}</p><p className="text-xs text-gray-500">Quantity: {item.quantity}</p></div></div>)}</div>
              </div>
            ))}</div>}
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Customer Orders</h2>
            {orders.length === 0 ? <p className="text-gray-500">No customer orders have been placed yet.</p> : <div className="overflow-x-auto"><table className="w-full text-left"><thead><tr className="border-b text-sm text-gray-500"><th className="py-3 pr-4">Order</th><th className="py-3 pr-4">Customer</th><th className="py-3 pr-4">Contact</th><th className="py-3 pr-4">Items</th><th className="py-3 pr-4">Status</th><th className="py-3">Update</th></tr></thead><tbody>{orders.map((order) => <tr key={order._id} className="border-b last:border-0 align-top"><td className="py-4 pr-4 font-semibold">#{order._id.slice(-6).toUpperCase()}<p className="text-xs text-gray-500 mt-1">{new Date(order.createdAt).toLocaleDateString()}</p></td><td className="py-4 pr-4"><p className="font-semibold">{order.customer?.name || order.user?.name || 'Customer'}</p><p className="text-xs text-gray-500">{order.user?.email || 'No email'}</p></td><td className="py-4 pr-4 text-sm"><p>{order.customer?.phone || 'No phone'}</p><p className="max-w-xs text-gray-500">{order.customer?.address || 'No address'}</p></td><td className="py-4 pr-4 text-sm">{order.items.map((item) => <div key={item.productId}>{item.title} x {item.quantity}</div>)}</td><td className="py-4 pr-4"><span className="font-semibold text-amber-600">{order.status}</span></td><td className="py-4"><select value={order.status} onChange={(event) => updateOrderStatus(order._id, event.target.value)} className="border rounded px-2 py-2 text-sm"><option value="Pending">Pending</option><option value="Confirmed">Confirmed</option><option value="In Progress">In Progress</option><option value="Completed">Complete</option></select></td></tr>)}</tbody></table></div>}
          </div>
        )}

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