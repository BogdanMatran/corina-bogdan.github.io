import { motion } from 'framer-motion';
import ScrollSection from './ScrollSection';
import { storyContent } from '../data/storyContent';

const StorySection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <ScrollSection id="story" className="bg-transparent">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10"
      >
        {/* Section Label */}
        <motion.span
          variants={itemVariants}
          className="inline-block text-amber-600 text-section-label"
        >
          Our Story
        </motion.span>

        {/* Title */}
        <motion.h2
          variants={itemVariants}
          className="text-section-title text-white"
        >
          {storyContent.beginning.title}
        </motion.h2>


        {/* Content */}
        <motion.div variants={containerVariants} className="space-y-6 pt-4">
          {storyContent.beginning.content.map((line, index) => (
            <motion.p
              key={index}
              variants={itemVariants}
              className="text-body-large text-white"
            >
              {line}
            </motion.p>
          ))}
        </motion.div>
      </motion.div>
    </ScrollSection>
  );
};

export default StorySection;
