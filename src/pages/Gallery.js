import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { projectsData } from '../date/projectsData';
import API from '../api/axios';
import { AuthContext, isAdminUser } from '../context/AuthContext';

const Gallery = () => {
  const [filter, setFilter] = useState('All');
  const [allProjects, setAllProjects] = useState(projectsData);
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const canAddToCart = Boolean(user) && !isAdminUser(user);

  const categories = ['All', 'Manufacturing', 'Heavy Repair', 'Structural', 'Blades', 'Bladder Machines', 'Custom Built'];

  useEffect(() => {
    // Database se custom uploaded images fetch karna
    const fetchUploadedImages = async () => {
      try {
        const res = await API.get('/gallery');
        if (res.data && res.data.length > 0) {
          const apiProjects = res.data.map((item) => ({
            id: item._id,
            title: item.title,
            category: item.category || 'Custom Built',
            thumbnail: item.imageUrl
          }));
          setAllProjects([...apiProjects, ...projectsData]);
        }
      } catch (err) {
        console.log('MongoDB connection error, showing static data.');
      }
    };

    fetchUploadedImages();
  }, []);

  const filteredProjects = filter === 'All' 
    ? allProjects 
    : allProjects.filter(p => p.category.toLowerCase() === filter.toLowerCase());

  const openProjectFeatures = (project) => {
    setSelectedProject(project);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCartAction = async (project, orderNow = false) => {
    if (!canAddToCart) {
      toast.info(user ? 'Admins can manage orders but cannot use the customer cart.' : 'Please sign in to add items to your cart.');
      if (!user) navigate('/login');
      return;
    }
    const token = localStorage.getItem('token');
    if (!token) {
      toast.info('Please sign in to add items to your cart.');
      navigate('/login');
      return;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'https://master-engineering-api.vercel.app'}/api/cart/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ productId: project.id, title: project.title, thumbnail: project.thumbnail, category: project.category }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to add this item.');
      toast.success('Item added to your cart.');
      setSelectedProject(null);
      if (orderNow) navigate('/dashboard');
    } catch (error) { toast.error(error.message || 'Unable to add this item to your cart.'); }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-primary text-center mb-2">
        Our <span className="text-secondary">Gallery</span>
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Explore our machinery and manufacturing capabilities
      </p>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === cat 
                ? 'bg-secondary text-white shadow-md' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03, duration: 0.4 }}
            whileHover={{ 
              scale: 1.05, 
              y: -8,
              transition: { duration: 0.2 }
            }}
            className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-2xl transition-all"
          >
            <Link to={`/gallery/${project.id}`}>
              {/* Thumbnail Image */}
              <div className="h-48 overflow-hidden bg-gray-100">
                {project.thumbnail ? (
                  <img 
                    src={encodeURI(project.thumbnail)} 
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              
              {/* Card Body */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-primary truncate">{project.title}</h3>
                <span className="inline-block mt-1 text-xs bg-secondary/10 text-secondary px-3 py-1 rounded-full">
                  {project.category}
                </span>
                {canAddToCart && <div className="flex gap-2 mt-3" onClick={(event) => event.preventDefault()}>
                  <button onClick={() => openProjectFeatures(project)} className="flex-1 py-2 bg-secondary text-white rounded text-xs font-semibold">Add to Cart</button>
                  <button onClick={() => openProjectFeatures(project)} className="flex-1 py-2 bg-primary text-white rounded text-xs font-semibold">Order Now</button>
                </div>}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {selectedProject && canAddToCart && (
        <section className="max-w-3xl mx-auto mt-10 bg-white border border-secondary/30 rounded-xl shadow-lg p-6" aria-live="polite">
          <div className="flex flex-col sm:flex-row gap-5">
            <img src={selectedProject.thumbnail} alt={selectedProject.title} className="w-full sm:w-48 h-36 object-cover rounded-lg" />
            <div className="flex-1">
              <span className="text-xs uppercase tracking-wide text-secondary font-semibold">Product Details</span>
              <h2 className="text-2xl font-bold text-primary mt-1">{selectedProject.title}</h2>
              <p className="text-gray-600 mt-2">{selectedProject.description || 'Professional engineering equipment built for reliable industrial performance.'}</p>
              <ul className="mt-3 list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Industrial-grade construction</li>
                <li>Built for reliable production performance</li>
                <li>Suitable for custom engineering requirements</li>
              </ul>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => handleCartAction(selectedProject)} className="flex-1 py-3 bg-secondary text-white rounded-lg font-semibold">Add to Cart</button>
            <button onClick={() => setSelectedProject(null)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold">Cancel</button>
          </div>
        </section>
      )}

      {/* No Projects Found */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No projects found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;