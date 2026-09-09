import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, FaFacebook, FaYoutube } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

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
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-secondary bg-secondary/10 px-4 py-1.5 rounded-full mb-4">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary mb-4">
            Contact <span className="text-secondary">Us</span>
          </h1>
          <div className="w-20 h-1 bg-secondary mx-auto mb-4 rounded-full"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's talk about how we can help you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Contact Cards */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-2xl font-bold text-primary mb-6">Get in Touch</h2>
              
              <div className="space-y-4">
                {/* Phone */}
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                    <FaPhone className="text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700 text-sm">Phone</p>
                    <a href="tel:+923004767975" className="text-gray-600 text-sm hover:text-secondary transition-colors">
                      +92 300 4767975
                    </a>
                    <br />
                    <a href="tel:+923434767975" className="text-gray-600 text-sm hover:text-secondary transition-colors">
                      +92 343 4767975
                    </a>
                    <br />
                    <a href="tel:+923068431383" className="text-gray-600 text-sm hover:text-secondary transition-colors">
                      +92 306 8431383
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700 text-sm">Email</p>
                    <a href="mailto:masterengineeringworks@gmail.com" className="text-gray-600 text-sm hover:text-secondary transition-colors">
                      masterengineeringworks@gmail.com
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700 text-sm">Address</p>
                    <p className="text-gray-600 text-sm">
                      Lahore Sargodha Road, Opposite Global Law College,<br />
                      Machike, Sheikhupura
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                    <FaClock className="text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700 text-sm">Working Hours</p>
                    <p className="text-gray-600 text-sm">Saturday - Thursday: 9:00 AM - 9:00 PM</p>
                    <p className="text-gray-600 text-sm">Friday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-3">Follow us on:</p>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-secondary hover:text-white transition-all duration-300">
                    <FaFacebook />
                  </a>
                  <a href="https://wa.me/923004767975" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-green-600 hover:text-white transition-all duration-300">
                    <FaWhatsapp />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white transition-all duration-300">
                    <FaYoutube />
                  </a>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-6 text-center shadow-lg">
              <p className="text-lg font-semibold mb-2">Quick Response on WhatsApp</p>
              <p className="text-white/80 text-sm mb-4">Chat with us directly for instant support</p>
              <a
                href="https://wa.me/923004767975"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-green-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition-all hover:shadow-lg"
              >
                <FaWhatsapp className="inline mr-2" /> Chat Now
              </a>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-primary mb-2">Send Message</h2>
            <p className="text-gray-500 text-sm mb-6">We'll get back to you within 24 hours.</p>

            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-xl text-center"
              >
                <div className="text-4xl mb-2">✅</div>
                <h3 className="font-bold text-lg">Message Sent!</h3>
                <p className="text-sm">We will contact you soon. Thank you!</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+92 300 1234567"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300 resize-none"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-secondary text-white py-3.5 rounded-lg font-semibold hover:bg-orange-700 transition-all hover:shadow-lg hover:-translate-y-0.5 duration-300"
                >
                  Send Message
                </button>
                <p className="text-center text-xs text-gray-400">
                  We respect your privacy. Your information is safe with us.
                </p>
              </form>
            )}
          </motion.div>
        </div>

        {/* Google Maps Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 rounded-2xl overflow-hidden shadow-lg"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3392.883419383118!2d74.1167063151405!3d31.750730281272765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3918e27b38492db5%3A0x6d9f8d8e6f8d8e6f!2sLahore%20Sargodha%20Road%2C%20Machike%2C%20Sheikhupura%2C%20Pakistan!5e0!3m2!1sen!2s!4v1690000000000"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Master Engineering Solutions Location"
            className="w-full"
          ></iframe>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;