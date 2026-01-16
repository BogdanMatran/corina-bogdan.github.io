import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CursorTrail() {
  const [particles, setParticles] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const lastTimeRef = useRef(0);
  const particleIdRef = useRef(0);

  useEffect(() => {
    // Check if device is mobile/touch
    const checkMobile = () => {
      const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(hasTouchScreen || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Don't create trail on mobile devices

    const handleMouseMove = (e) => {
      const currentTime = Date.now();

      // Throttle: Only create particle every 80ms
      if (currentTime - lastTimeRef.current < 80) return;

      lastTimeRef.current = currentTime;

      const particle = {
        id: particleIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        // Random size
        size: Math.random() * 0.3 + 0.5,
        // Random slight offset for more natural feel
        offsetX: (Math.random() - 0.5) * 20,
        offsetY: (Math.random() - 0.5) * 20
      };

      setParticles((prev) => {
        // Keep only last 12 particles for performance
        const newParticles = [...prev, particle];
        return newParticles.slice(-12);
      });

      // Remove particle after animation completes
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== particle.id));
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  // Don't render on mobile
  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]" aria-hidden="true">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              opacity: 0.8,
              scale: particle.size,
              x: particle.x + particle.offsetX,
              y: particle.y + particle.offsetY
            }}
            animate={{
              opacity: 0,
              scale: particle.size * 0.3,
              y: particle.y + particle.offsetY - 30
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1,
              ease: "easeOut"
            }}
            className="absolute"
            style={{
              left: 0,
              top: 0,
              transform: `translate(${particle.x}px, ${particle.y}px)`,
              willChange: 'transform, opacity'
            }}
          >
            <div className="w-2 h-2 bg-rose-400 rounded-full opacity-60" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
