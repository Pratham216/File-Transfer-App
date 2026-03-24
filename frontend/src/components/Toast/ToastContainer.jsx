import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Toast from './Toast';
import './Toast.css';

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="toast-container">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;

