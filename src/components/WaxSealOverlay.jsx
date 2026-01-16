import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WaxSealOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false);

  useEffect(() => {
    // Check if user has already seen the wax seal in this session
    const hasSeenSeal = sessionStorage.getItem('hasSeenWaxSeal');
    if (!hasSeenSeal) {
      setIsVisible(true);
    }
  }, []);

  const handleBreakSeal = () => {
    if (isBreaking) return; // Prevent double-click

    setIsBreaking(true);

    // Mark as seen in sessionStorage
    sessionStorage.setItem('hasSeenWaxSeal', 'true');

    // After animation completes, hide the overlay
    setTimeout(() => {
      setIsVisible(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleBreakSeal();
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isBreaking ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, delay: isBreaking ? 0.5 : 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900"
        role="dialog"
        aria-label="Wedding invitation entrance"
      >
        {/* Background texture overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />

        <div className="relative z-10 flex flex-col items-center justify-center px-4">
          {/* Wax Seal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: isBreaking ? [1, 1.05, 0.95] : 1,
              opacity: 1
            }}
            transition={{
              scale: { duration: 0.5 },
              opacity: { duration: 0.5 }
            }}
            className="relative cursor-pointer select-none"
            onClick={handleBreakSeal}
            onKeyDown={handleKeyPress}
            tabIndex={0}
            role="button"
            aria-label="Click to break the wax seal and enter"
          >
            {/* Glow effect */}
            <motion.div
              animate={{
                opacity: isBreaking ? [0.6, 0] : [0.4, 0.6, 0.4],
                scale: isBreaking ? [1, 1.5] : [1, 1.1, 1]
              }}
              transition={{
                duration: isBreaking ? 0.5 : 2,
                repeat: isBreaking ? 0 : Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-full bg-rose-500 blur-3xl"
            />

            {/* Main seal circle */}
            <motion.div
              animate={{
                rotate: isBreaking ? [0, 5, -5, 0] : 0
              }}
              transition={{ duration: 0.3 }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-br from-red-900 via-rose-800 to-red-950 shadow-2xl"
              style={{
                boxShadow: isBreaking
                  ? '0 0 80px rgba(225, 29, 72, 0.8)'
                  : '0 20px 60px rgba(0, 0, 0, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Embossed texture overlay */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-rose-700/20 to-transparent opacity-50" />

              {/* Crack lines animation */}
              <AnimatePresence>
                {isBreaking && (
                  <>
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: [0, 1, 0.5] }}
                        transition={{
                          duration: 0.4,
                          delay: i * 0.05,
                          ease: "easeOut"
                        }}
                        className="absolute top-1/2 left-1/2 w-0.5 h-32 bg-black origin-top"
                        style={{
                          transform: `translate(-50%, -50%) rotate(${i * 45}deg)`
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>

              {/* Initials */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    opacity: isBreaking ? [1, 0] : 1,
                    scale: isBreaking ? [1, 0.8] : 1
                  }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-6xl sm:text-7xl font-serif font-bold text-rose-200 tracking-wider"
                       style={{
                         textShadow: '0 2px 4px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.2)',
                         fontFamily: "'Playfair Display', serif"
                       }}>
                    C & B
                  </div>
                  <div className="mt-2 text-xs sm:text-sm text-rose-300/80 tracking-[0.3em] uppercase font-light">
                    June 16, 2026
                  </div>
                </motion.div>
              </div>

              {/* Ribbon texture effect */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-rose-600 to-transparent opacity-30" />
            </motion.div>

            {/* Hover pulse effect */}
            {!isBreaking && (
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-full border-2 border-rose-400/30"
              />
            )}
          </motion.div>

          {/* Instruction text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isBreaking ? 0 : 1,
              y: isBreaking ? -20 : 0
            }}
            transition={{
              duration: 0.5,
              delay: isBreaking ? 0 : 0.5
            }}
            className="mt-12 text-center"
          >
            <p className="text-2xl sm:text-3xl text-rose-100 font-light tracking-wide"
               style={{ fontFamily: "'Dancing Script', cursive" }}>
              Click to enter
            </p>
            <p className="mt-2 text-sm text-stone-400 tracking-wider">
              Press Enter or Space
            </p>
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2 border-rose-700/20" />
          <div className="absolute top-10 right-10 w-20 h-20 border-r-2 border-t-2 border-rose-700/20" />
          <div className="absolute bottom-10 left-10 w-20 h-20 border-l-2 border-b-2 border-rose-700/20" />
          <div className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 border-rose-700/20" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
