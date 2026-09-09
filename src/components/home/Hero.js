import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaWhatsapp } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-[#1b2430] via-[#1f2937] to-[#2e3b4d] text-white py-20 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(201,168,76,0.18),transparent_55%)]" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          MASTER <span className="text-secondary">ENGINEERING</span>
        </h1>
        <p className="text-xl md:text-2xl mb-2 text-gray-100">Mechanical Workshop & Specialized Manufacturing</p>
        <p className="text-gray-300 mb-8">Industrial Components • Heavy Repair • Structural Work</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/services" className="bg-secondary text-primary px-6 py-3 rounded-full font-semibold hover:bg-[#d7b75a] transition flex items-center gap-2 shadow-sm">
            Our Services <FaArrowRight />
          </Link>
          <Link to="/contact" className="bg-white/10 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/15 transition border border-white/15">
            Get Quote
          </Link>
          <a href="https://wa.me/923004767975" className="bg-[#1f9d5d] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#18814b] transition flex items-center gap-2 shadow-sm">
            <FaWhatsapp /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;