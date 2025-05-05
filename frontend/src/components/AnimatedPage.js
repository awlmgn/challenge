import React from 'react';
import { motion } from 'framer-motion';

const AnimatedPage = ({ children }) => {
  const pageVariants = {
    initial: { opacity: 0, scale: 0.95, y: 50 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -50 },
  };

  const pageTransition = {
    duration: 0.8, // Увеличиваем длительность для плавности
    ease: 'easeInOut',
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      style={{ overflow: 'hidden' }} // Убираем возможные артефакты
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;