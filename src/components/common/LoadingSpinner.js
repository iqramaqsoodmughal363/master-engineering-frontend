import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 min-h-[40vh]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-gray-200 border-t-secondary rounded-full"
      />
      <p className="text-gray-500 text-sm mt-4 font-medium animate-pulse">{text}</p>
    </div>
  );
};

export default LoadingSpinner;