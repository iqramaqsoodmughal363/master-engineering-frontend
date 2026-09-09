import React, { useState } from 'react';
import API from '../../api/axios';
import { FaCloudUploadAlt, FaSpinner } from 'react-icons/fa';

const ImageUpload = ({ onUploadSuccess }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return setError('Pehle ek image select karein!');

    const formData = new FormData();
    formData.append('image', image);

    setLoading(true);
    setError('');

    try {
      const res = await API.post('/gallery/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const uploadedUrl = res.data.imageUrl;
      if (onUploadSuccess) {
        onUploadSuccess(uploadedUrl);
      }
      alert('✅ Image successfully uploaded to Cloudinary!');
    } catch (err) {
      setError(err.response?.data?.message || '❌ Image upload failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200 max-w-lg mx-auto">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Upload Image</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-lg text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleUpload} className="space-y-4">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer">
          <FaCloudUploadAlt className="text-4xl text-gray-400 mb-2" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
          />
        </div>

        {preview && (
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 mb-2">Selected Preview:</p>
            <img src={preview} alt="Preview" className="h-40 mx-auto rounded-lg object-cover shadow" />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-600 text-white py-2.5 rounded-lg font-semibold hover:bg-orange-700 transition duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" /> Uploading...
            </>
          ) : (
            'Upload Image'
          )}
        </button>
      </form>
    </div>
  );
};

export default ImageUpload;