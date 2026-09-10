import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import WhatsAppButton from './components/common/WhatsAppButton';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import GalleryDetail from './pages/GalleryDetail';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';

// Admin Imports
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/common/ProtectedRoute';

// Debug check to locate which component is causing undefined/React Error #130
console.log("Home:", Home);
console.log("About:", About);
console.log("Services:", Services);
console.log("Gallery:", Gallery);
console.log("GalleryDetail:", GalleryDetail);
console.log("Contact:", Contact);
console.log("Login:", Login);
console.log("Register:", Register);
console.log("AdminDashboard:", AdminDashboard);
console.log("ProtectedRoute:", ProtectedRoute);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/gallery/:id" element={<GalleryDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Admin Protected Route */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
          {/* Toast Notifications Container */}
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;