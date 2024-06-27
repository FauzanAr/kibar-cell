import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

interface AlertProps {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  const typeClasses = {
    success: 'bg-green-100 border-green-500 text-green-700',
    error: 'bg-red-100 border-red-500 text-red-700',
    info: 'bg-blue-100 border-blue-500 text-blue-700',
  };

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 500); // Delay to match the animation duration
  };

  return (
    <div
      className={`transform transition-transform duration-500 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      } flex items-center justify-between p-4 border-l-4 ${typeClasses[type]} mb-2`}
    >
      <div>{message}</div>
      <button
        onClick={handleClose}
        className="ml-4"
      >
        <IoClose className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Alert;
