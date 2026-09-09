import React from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaUserTie, FaUsers, FaTools, FaCheckCircle, FaHandshake, FaComments, FaEnvelope } from 'react-icons/fa';

const About = () => {
  const stats = [
    { number: '200+', label: 'Happy Clients', icon: <FaUsers /> },
    { number: '15+', label: 'Years Experience', icon: <FaTools /> },
    { number: '500+', label: 'Projects Completed', icon: <FaCheckCircle /> },
    { number: '12+', label: 'Expert Team', icon: <FaUserTie /> },
  ];

  const values = [
    {
      icon: <FaTools className="text-4xl text-secondary" />,
      title: 'Practical Engineering',
      description: 'We focus on what the machine needs to do and choose the right process for the job.'
    },
    {
      icon: <FaHandshake className="text-4xl text-secondary" />,
      title: 'Clear Accountability',
      description: 'You know who is handling your work and where it stands.'
    },
    {
      icon: <FaComments className="text-4xl text-secondary" />,
      title: 'Direct Contact',
      description: 'Reach the people responsible for your work without unnecessary layers.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-12 bg-gray-50"
    >
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Meet The People <span className="text-secondary">Behind The Work</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Speak directly with the team responsible for your fabrication, repair and engineering requirements.
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-md text-center border-b-4 border-secondary hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="text-3xl text-secondary flex justify-center mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-primary">{stat.number}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Team Section */}
        <h2 className="text-3xl font-bold text-primary text-center mb-10">
          Our <span className="text-secondary">Leadership</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Proprietor Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >
            <div className="bg-gradient-to-r from-primary to-primary/90 text-white p-6">
              <div className="flex items-center gap-5">
                {/* Photo - Proprietor */}
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/40 shadow-lg flex-shrink-0 bg-white">
                  <img 
                    src="/images/team/proprietor.png" 
                    alt="Muhammad Shafique Matloob"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://ui-avatars.com/api/?name=Muhammad+Shafique+Matloob&background=C9A84C&color=fff&size=100&bold=true';
                    }}
                  />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-white/70 bg-white/20 px-3 py-1 rounded-full">Proprietor</span>
                  <h3 className="text-2xl font-bold mt-1">Muhammad Shafique</h3>
                  <p className="text-white/80 text-sm">Matloob</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4 leading-relaxed">
                The direct point of contact for workshop planning, repairs and fabrication requirements.
              </p>
              <div className="flex items-center gap-3 text-primary bg-gray-50 p-3 rounded-lg">
                <FaPhone className="text-secondary" />
                <a href="tel:+923004767975" className="hover:text-secondary transition-colors font-medium">
                  +92 300 4767975
                </a>
              </div>
            </div>
          </motion.div>

          {/* Director Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >
            <div className="bg-gradient-to-r from-secondary to-secondary/90 text-white p-6">
              <div className="flex items-center gap-5">
                {/* Photo - Director */}
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/40 shadow-lg flex-shrink-0 bg-white">
                  <img 
                    src="/images/team/director.png" 
                    alt="Muhammad Adnan Mughal"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://ui-avatars.com/api/?name=Muhammad+Adnan+Mughal&background=C9A84C&color=fff&size=100&bold=true';
                    }}
                  />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-white/70 bg-white/20 px-3 py-1 rounded-full">Director</span>
                  <h3 className="text-2xl font-bold mt-1">Muhammad Adnan</h3>
                  <p className="text-white/80 text-sm">Mughal</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4 leading-relaxed">
                Coordinates client requirements and helps move each job from specification to completion.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-primary bg-gray-50 p-3 rounded-lg">
                  <FaPhone className="text-secondary" />
                  <a href="tel:+923068431383" className="hover:text-secondary transition-colors font-medium">
                    +92 306 8431383
                  </a>
                </div>
                <div className="flex items-center gap-3 text-primary bg-gray-50 p-3 rounded-lg">
                  <FaPhone className="text-secondary" />
                  <a href="tel:+923344942004" className="hover:text-secondary transition-colors font-medium">
                    +92 334 4942004
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <h2 className="text-3xl font-bold text-primary text-center mb-10">
          Our <span className="text-secondary">Core Values</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all text-center border-t-4 border-secondary hover:-translate-y-1"
            >
              <div className="flex justify-center mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold text-primary mb-3">{value.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 bg-gradient-to-r from-primary to-primary/90 text-white rounded-2xl p-10 text-center shadow-xl"
        >
          <h3 className="text-3xl font-bold mb-3">Ready to Work With Us?</h3>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Contact our team directly for your engineering and manufacturing needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+923004767975"
              className="inline-block bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-all hover:shadow-lg hover:-translate-y-1"
            >
              Call Now
            </a>
            <a
              href="/contact"
              className="inline-block bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-all hover:shadow-lg hover:-translate-y-1"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;