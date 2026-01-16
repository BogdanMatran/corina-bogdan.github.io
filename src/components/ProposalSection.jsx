import { motion } from 'framer-motion';
import ScrollSection from './ScrollSection';
import { storyContent } from '../data/storyContent';

const ProposalSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <ScrollSection id="proposal" className="relative overflow-hidden" style={{ backgroundColor: '#eab308' }}>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-3xl mx-auto px-6 py-16 text-center space-y-8 relative z-10"
      >
        {/* Label */}
        <motion.span
          variants={itemVariants}
          className="inline-block text-yellow-900 text-section-label"
        >
          The Moment
        </motion.span>

        {/* Title */}
        <motion.h2
          variants={itemVariants}
          className="text-section-title text-yellow-950"
        >
          {storyContent.proposal.title}
        </motion.h2>


        {/* Story Points */}
        <motion.div variants={containerVariants} className="space-y-6 pt-4">
          {storyContent.proposal.story.map((line, index) => (
            <motion.p
              key={index}
              variants={itemVariants}
              className="text-body-large text-yellow-950"
            >
              {line}
            </motion.p>
          ))}
        </motion.div>

        {/* Emphasis Line */}
        <motion.div
          variants={itemVariants}
          className="pt-8"
        >
          <p
            className="text-2xl md:text-3xl text-yellow-900 italic"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            {storyContent.proposal.emphasis}
          </p>
        </motion.div>

        {/* Decorative ring */}
        <motion.div
          variants={itemVariants}
          className="pt-8"
        >
          <div className="inline-block p-4 rounded-full border-2 border-fuchsia-500/50">
            <svg className="w-12 h-12 text-yellow-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </ScrollSection>
  );
};

export default ProposalSection;
