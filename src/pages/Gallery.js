import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projectsData } from '../date/projectsData';
import API from '../api/axios';

const Gallery = () => {
  const [filter, setFilter] = useState('All');
  const [allProjects, setAllProjects] = useState(projectsData);

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
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

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