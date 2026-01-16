import { motion } from 'framer-motion';
import ScrollSection from './ScrollSection';
import { storyContent } from '../data/storyContent';

const CelebrationSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <ScrollSection id="celebration" className="bg-transparent">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-3xl mx-auto px-6 py-16 space-y-8 relative z-10"
      >
        {/* Header */}
        <div className="text-center">
          <motion.p
            variants={itemVariants}
            className="text-amber-200 text-section-label mb-2"
          >
            {storyContent.celebration.subtitle}
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-section-title text-white"
          >
            {storyContent.celebration.title}
          </motion.h2>
        </div>


        {/* Moments List */}
        <motion.div variants={containerVariants} className="space-y-4 pt-4">
          {storyContent.celebration.moments.map((moment, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/95 p-6 border-l-4 border-amber-400 hover:bg-white transition-colors group"
            >
              <div className="flex items-center gap-4">
                <span className="w-3 h-3 bg-amber-600 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform" />
                <p className="text-amber-900 leading-relaxed text-lg">
                  {moment}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </ScrollSection>
  );
};

export default CelebrationSection;
