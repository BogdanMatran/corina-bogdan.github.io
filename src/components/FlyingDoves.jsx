import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FlyingDoves = () => {
  const [doves, setDoves] = useState([]);

  useEffect(() => {
    // Generate 8-12 doves with random properties
    const newDoves = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      startX: Math.random() * 100, // Random horizontal start position (%)
      duration: 8 + Math.random() * 6, // 8-14 seconds
      delay: Math.random() * 8, // Stagger the start times
      size: 30 + Math.random() * 30, // 30-60px
    }));
    setDoves(newDoves);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {doves.map((dove) => (
        <motion.div
          key={dove.id}
          initial={{
            y: '110vh',
            x: `${dove.startX}vw`,
            opacity: 0
          }}
          animate={{
            y: '-20vh',
            x: `${dove.startX + (Math.random() * 20 - 10)}vw`, // Slight horizontal drift
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: dove.duration,
            delay: dove.delay,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "linear",
            opacity: {
              times: [0, 0.1, 0.9, 1],
            }
          }}
          style={{
            position: 'absolute',
            fontSize: `${dove.size}px`,
            filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))',
          }}
        >
          🕊️
        </motion.div>
      ))}
    </div>
  );
};

export default FlyingDoves;
