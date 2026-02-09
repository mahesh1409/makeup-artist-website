import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-16 h-16',
    large: 'w-24 h-24'
  };

  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <motion.div
        className={`${sizeClasses[size]} border-4 border-luxury-gold/20 border-t-luxury-gold rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

export default LoadingSpinner;
