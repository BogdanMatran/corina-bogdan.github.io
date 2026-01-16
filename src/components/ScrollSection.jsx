import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const ScrollSection = ({ children, className = '', id = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`min-h-screen flex items-center justify-center relative bg-transparent ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default ScrollSection;
