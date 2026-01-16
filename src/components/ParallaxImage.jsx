import { motion } from 'framer-motion';
import { useParallax } from '../hooks/useParallax';

const ParallaxImage = ({ src, alt, speed = 50, className = '' }) => {
  const { ref, y } = useParallax(speed);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ParallaxImage;
