import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCog, FaCut, FaIndustry, FaTools, FaWrench, FaPencilAlt, 
  FaTimes, FaCheckCircle, FaArrowRight, FaWhatsapp 
} from 'react-icons/fa';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Services = () => {
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      id: 1,
      icon: <FaCog className="text-4xl" />,
      title: 'Custom Gear Manufacturing',
      category: 'Manufacturing',
      shortDesc: 'High-precision fabrication to specifications',
      description: 'We manufacture high-precision custom gears for diverse industrial applications. Our gear manufacturing process includes precision cutting, grinding, and heat treatment to ensure optimal performance and durability. From spur gears to helical and bevel gears, we deliver components that meet the most demanding specifications.',
      features: [
        'Precision gear cutting and grinding',
        'Custom specifications and designs',
        'Heat treatment for durability',
        'Quality assurance and inspection',
        'Various gear types (spur, helical, bevel)'
      ],
      gradient: 'from-blue-600 to-blue-800'
    },
    {
      id: 2,
      icon: <FaCut className="text-4xl" />,
      title: 'Precision Blades',
      category: 'Manufacturing',
      shortDesc: 'Robust blades for industrial application',
      description: 'Our precision blades are manufactured with high-grade materials to deliver exceptional cutting performance and durability. We produce blades for various industrial applications including metal cutting, paper processing, and food processing industries.',
      features: [
        'High-grade material selection',
        'Precision grinding and sharpening',
        'Durable and long-lasting design',
        'Custom blade specifications',
        'Industrial application ready'
      ],
      gradient: 'from-orange-500 to-orange-700'
    },
    {
      id: 3,
      icon: <FaIndustry className="text-4xl" />,
      title: 'Cubical Bladder Machines',
      category: 'Manufacturing',
      shortDesc: 'Manufacturing and repair of specialized parts',
      description: 'We specialize in manufacturing and repairing cubical bladder machines and their specialized components. Our expertise covers complete machine manufacturing, component replacement, and comprehensive repair services to ensure optimal machine performance.',
      features: [
        'Complete machine manufacturing',
        'Specialized component production',
        'Expert repair services',
        'Quality assurance testing',
        'Custom machine modifications'
      ],
      gradient: 'from-green-600 to-green-800'
    },
    {
      id: 4,
      icon: <FaWrench className="text-4xl" />,
      title: 'Heavy Repair',
      category: 'Repair',
      shortDesc: 'Expert Hopper repair and machinery overhauling',
      description: 'Our heavy repair services cover a wide range of industrial equipment including hoppers, crushers, gearboxes, and heavy machinery. We provide comprehensive repair solutions including structural welding, component replacement, and complete overhauling to restore equipment to peak performance.',
      features: [
        'Expert hopper repair and reinforcement',
        'Machinery overhauling and restoration',
        'Structural welding and fabrication',
        'Component replacement and repair',
        'Performance testing and validation'
      ],
      gradient: 'from-red-600 to-red-800'
    },
    {
      id: 5,
      icon: <FaPencilAlt className="text-4xl" />,
      title: 'Structural Work',
      category: 'Structural',
      shortDesc: 'Piping fabrication and heavy structural jobs',
      description: 'We provide comprehensive structural work services including piping fabrication, heavy structural jobs, and industrial framework construction. Our team delivers quality workmanship for projects ranging from pipeline welding to complete structural installations.',
      features: [
        'Piping fabrication and welding',
        'Heavy structural jobs and frameworks',
        'Steel beam cutting and fabrication',
        'Platform and staircase fabrication',
        'Industrial shed and building construction'
      ],
      gradient: 'from-purple-600 to-purple-800'
    },
    {
      id: 6,
      icon: <FaTools className="text-4xl" />,
      title: 'Custom Shafts Manufacturing',
      category: 'Manufacturing',
      shortDesc: 'High precision turning and grinding for transmission and motor shafts',
      description: 'We manufacture custom shafts with high precision turning and grinding for transmission and motor applications. Our shafts meet the tightest tolerances and are designed for reliable performance in demanding industrial environments.',
      features: [
        'High precision turning and grinding',
        'Custom shaft designs and specifications',
        'Quality material selection',
        'Transmission and motor shaft expertise',
        'Performance and reliability testing'
      ],
      gradient: 'from-teal-600 to-teal-800'
    }
  ];

  if (loading) {
    return <LoadingSpinner text="Loading Engineering Services..." />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-16 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-secondary bg-secondary/10 px-4 py-1.5 rounded-full mb-4">
            What We Offer
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary mb-4 leading-tight">
            Our <span className="text-secondary">Services</span>
          </h1>
          <div className="w-20 h-1 bg-secondary mx-auto mb-4 rounded-full"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            We provide complete mechanical solutions for all your industrial needs, from manufacturing to repair and structural work.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ 
                y: -6,
                transition: { duration: 0.2 }
              }}
              className="group relative bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100"
              onClick={() => setSelectedService(service)}
            >
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Top Gradient Bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${service.gradient}`}></div>

              {/* Card Content */}
              <div className="p-7 relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-primary mb-1.5 group-hover:text-secondary transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Category Badge */}
                <span className="inline-block text-xs font-medium text-gray-500 bg-gray-100 px-3 py-0.5 rounded-full mb-3">
                  {service.category}
                </span>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {service.shortDesc}
                </p>

                {/* View Details */}
                <div className="flex items-center justify-between">
                  <span className="text-secondary font-medium text-sm flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                    Learn More <FaArrowRight className="text-xs" />
                  </span>
                  <span className="text-xs text-gray-400 group-hover:text-secondary transition-colors duration-300">
                    Click →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`bg-gradient-to-r ${selectedService.gradient} text-white p-6 rounded-t-2xl sticky top-0 z-10`}>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      {selectedService.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{selectedService.title}</h2>
                      <span className="text-xs uppercase tracking-wider text-white/80 bg-white/20 px-3 py-0.5 rounded-full inline-block mt-1">
                        {selectedService.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="text-white/70 hover:text-white text-2xl p-2 hover:bg-white/10 rounded-full transition"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-8">
                {/* Description */}
                <div className="mb-6">
                  <h4 className="font-semibold text-primary text-lg mb-3 flex items-center gap-2">
                    <span className="w-1 h-6 bg-secondary rounded-full"></span>
                    Overview
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedService.description}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="font-semibold text-primary text-lg mb-3 flex items-center gap-2">
                    <span className="w-1 h-6 bg-secondary rounded-full"></span>
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedService.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-start gap-2.5 text-gray-600 text-sm bg-gray-50 p-2.5 rounded-lg"
                      >
                        <FaCheckCircle className="text-secondary text-sm mt-0.5 flex-shrink-0" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
                  <a
                    href="/contact"
                    className="inline-block bg-secondary text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-orange-700 transition-all hover:shadow-lg hover:-translate-y-0.5 text-sm"
                  >
                    Get a Quote
                  </a>
                  <a
                    href="https://wa.me/923004767975"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-green-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-green-700 transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 text-sm"
                  >
                    <FaWhatsapp /> WhatsApp
                  </a>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="inline-block bg-gray-100 text-gray-600 px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-all text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Services;