import React from 'react';
import { FaCog, FaCut, FaIndustry, FaTools, FaWrench, FaPencilAlt } from 'react-icons/fa';

const ServicesSection = () => {
  const services = [
    { icon: <FaCog size={40} />, title: 'Custom Gear Manufacturing', description: 'High-precision fabrication' },
    { icon: <FaCut size={40} />, title: 'Precision Blades', description: 'Robust blades for industrial application' },
    { icon: <FaIndustry size={40} />, title: 'Cubical Bladder Machines', description: 'Manufacturing and repair' },
    { icon: <FaWrench size={40} />, title: 'Heavy Repair', description: 'Expert Hopper repair & overhauling' },
    { icon: <FaPencilAlt size={40} />, title: 'Structural Work', description: 'Piping fabrication & structural jobs' },
    { icon: <FaTools size={40} />, title: 'Custom Shafts', description: 'Precision turning and grinding' },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-2">Our <span className="text-secondary">Services</span></h2>
        <p className="text-center text-gray-600 mb-10">We provide complete mechanical solutions</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition text-center border-b-4 border-secondary hover:-translate-y-1">
              <div className="text-secondary flex justify-center mb-3">{service.icon}</div>
              <h3 className="text-lg font-bold text-primary">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;