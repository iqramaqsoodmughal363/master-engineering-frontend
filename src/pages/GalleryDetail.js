import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { projectsData } from '../date/projectsData';

const GalleryDetail = () => {
  const { id } = useParams();
  const project = projectsData.find((item) => String(item.id) === id);

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-primary">Project not found</h1>
        <Link to="/gallery" className="inline-block mt-6 bg-secondary text-primary px-5 py-3 rounded-lg font-semibold">
          Back to Gallery
        </Link>
      </div>
    );
  }

  const images = project.images && project.images.length > 0 ? project.images : [project.thumbnail];

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/gallery" className="inline-flex items-center text-primary font-semibold hover:text-secondary transition">
        &larr; Back to Gallery
      </Link>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="space-y-4">
          {images.map((image, index) => (
            <img
              key={`${image}-${index}`}
              src={image}
              alt={`${project.title} ${index + 1}`}
              className="w-full rounded-xl shadow-lg object-cover max-h-[520px]"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = '/logo512.png';
              }}
            />
          ))}
        </div>

        <article>
          <span className="inline-block bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-semibold">
            {project.category}
          </span>
          <h1 className="mt-4 text-4xl font-bold text-primary">{project.title}</h1>
          <p className="mt-6 text-gray-600 leading-8">{project.description}</p>
        </article>
      </div>
    </div>
  );
};

export default GalleryDetail;