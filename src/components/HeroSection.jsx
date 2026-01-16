import { motion } from 'framer-motion';
import ScrollSection from './ScrollSection';
import { storyContent } from '../data/storyContent';

const HeroSection = () => {
  return (
    <ScrollSection id="hero" className="relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/hero-bg.jpg)`,
        }}
      />

      {/* Subtle vignette overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />

      <div className="relative z-10 text-center px-6 flex flex-col justify-center items-center h-full">
        {/* Top accent */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-amber-400 text-xs md:text-sm tracking-[0.5em] uppercase font-bold">
            THE WEDDING OF
          </span>
        </motion.div>

        {/* Names */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-6xl min-[375px]:text-7xl md:text-8xl lg:text-9xl font-normal text-white leading-none mb-3"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
          }}
        >
          {storyContent.hero.bride}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-5xl min-[375px]:text-6xl md:text-7xl text-amber-400 my-4"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          &
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-6xl min-[375px]:text-7xl md:text-8xl lg:text-9xl font-normal text-white leading-none mb-12"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
          }}
        >
          {storyContent.hero.groom}
        </motion.h1>

        {/* Date badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="bg-amber-500 px-12 py-5 shadow-2xl cursor-default"
        >
          <motion.p
            animate={{ scale: [1, 1.01, 1] }}
            transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
            className="text-slate-900 font-bold text-base md:text-lg tracking-[0.25em] uppercase"
          >
            {storyContent.hero.date}
          </motion.p>
        </motion.div>

        {/* Location */}
        {storyContent.hero.location && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-white mt-8 text-lg md:text-xl tracking-wide font-light"
          >
            {storyContent.hero.location}
          </motion.p>
        )}

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-12"
        >
          <motion.button
            onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-2 cursor-pointer group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to story"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-8 h-12 border-2 border-amber-400/80 rounded-full flex justify-center pt-2 group-hover:border-amber-400 transition-colors"
            >
              <motion.div
                animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-1.5 h-1.5 bg-amber-400 rounded-full"
              />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </ScrollSection>
  );
};

export default HeroSection;
