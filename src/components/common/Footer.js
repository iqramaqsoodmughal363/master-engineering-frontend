import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaWhatsapp, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold">MASTER <span className="text-secondary">ENGINEERING</span></h3>
            <p className="text-gray-400 text-sm mt-2">Mechanical Workshop & Specialized Manufacturing</p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-2">Contact</h4>
            <p className="text-gray-400 text-sm flex items-center gap-2"><FaPhone className="text-secondary" /> +923004767975</p>
            <p className="text-gray-400 text-sm flex items-center gap-2"><FaPhone className="text-secondary" /> +923434767975</p>
            <p className="text-gray-400 text-sm flex items-center gap-2"><FaPhone className="text-secondary" /> +923068431383</p>
            <p className="text-gray-400 text-sm flex items-center gap-2"><FaEnvelope className="text-secondary" /> masterengineeringworks@gmail.com</p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-2">Address</h4>
            <p className="text-gray-400 text-sm flex items-start gap-2"><FaMapMarkerAlt className="text-secondary mt-1" /> Lahore Sargodha Road, Opp. Global Law College, Machike, Sheikhupura</p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-secondary text-xl"><FaFacebook /></a>
              <a href="https://wa.me/923004767975" className="text-gray-400 hover:text-secondary text-xl"><FaWhatsapp /></a>
              <a href="/" className="text-gray-400 hover:text-secondary text-xl"><FaYoutube /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-6 pt-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Master Engineering Solutions
        </div>
      </div>
    </footer>
  );
};

export default Footer;