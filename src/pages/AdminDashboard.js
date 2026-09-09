import React, { useState } from 'react';
import ImageUpload from '../components/common/ImageUpload';
import { FaImages, FaCloudUploadAlt, FaSignOutAlt } from 'react-icons/fa';

const AdminDashboard = () => {
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleUploadSuccess = (url) => {
    setUploadedImages((prev) => [url, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Admin Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Control Panel</h1>
            <p className="text-sm text-gray-500">Manage site content and uploaded media</p>
          </div>
          <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full">
            Admin Mode
          </span>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Side: Upload Section */}
          <div className="md:col-span-1">
            <ImageUpload onUploadSuccess={handleUploadSuccess} />
          </div>

          {/* Right Side: Uploaded Images Grid */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaImages className="text-orange-600" /> Recent Uploads
            </h2>

            {uploadedImages.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-10">
                No new images uploaded in this session.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {uploadedImages.map((imgUrl, index) => (
                  <div key={index} className="relative group rounded-lg overflow-hidden border border-gray-200">
                    <img src={imgUrl} alt={`Upload ${index}`} className="w-full h-32 object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;