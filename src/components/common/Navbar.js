import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
    { name: 'Login', path: '/login' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white text-primary shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-3 group min-w-0">
            <div className="relative flex-shrink-0">
              <img 
                src="/images/logo.jpg" 
                alt="Master Engineering" 
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            
            <div className="flex flex-col leading-tight truncate min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-sm sm:text-base lg:text-xl font-bold whitespace-nowrap text-primary">
                  MASTER
                </span>
                <span className="text-sm sm:text-base lg:text-xl font-bold text-secondary whitespace-nowrap">
                  ENGINEERING
                </span>
              </div>
              <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.12em] text-gray-500 font-light truncate">
                Solutions & Manufacturing
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition duration-200 hover:text-secondary ${
                  isActive(link.path) ? 'text-secondary border-b-2 border-secondary pb-1' : 'text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden text-2xl flex-shrink-0 text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block py-2 px-4 rounded hover:bg-gray-100 transition text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;