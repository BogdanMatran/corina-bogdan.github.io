import { motion } from 'framer-motion';
import ScrollSection from './ScrollSection';
import { storyContent } from '../data/storyContent';

const LoveNotesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <ScrollSection
      id="love-notes"
      className="bg-transparent"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 max-w-7xl mx-auto px-6 text-center space-y-12"
      >
        {/* Section Label */}
        <motion.span
          variants={cardVariants}
          className="inline-block text-amber-600 text-section-label"
        >
          Love Notes
        </motion.span>

        {/* Title */}
        <motion.h2
          variants={cardVariants}
          className="text-section-title text-white"
        >
          Words from the Heart
        </motion.h2>


        {/* Notes Grid */}
        <div className="grid md:grid-cols-2 gap-8 pt-8 max-w-6xl mx-auto">
          {/* Corina's Note */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-amber-100"
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center pb-4 border-b border-amber-200">
                <h3
                  className="text-2xl md:text-3xl text-amber-700"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  {storyContent.loveNotes?.corina?.to || 'To my Bogdan'}
                </h3>
              </div>

              {/* Message */}
              <p
                className="text-lg md:text-xl text-slate-700 leading-relaxed text-left"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                {storyContent.loveNotes?.corina?.message ||
                  'From that morning at Zurich HB to every sunrise after, you\'ve been my constant. Thank you for loving me exactly as I am, fries and all. Forever yours, your Corina 💕'}
              </p>

              {/* Signature */}
              <div className="text-right pt-4">
                <p
                  className="text-2xl text-amber-600"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  - Corina
                </p>
              </div>
            </div>
          </motion.div>

          {/* Bogdan's Note */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-amber-100"
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center pb-4 border-b border-amber-200">
                <h3
                  className="text-2xl md:text-3xl text-amber-700"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  {storyContent.loveNotes?.bogdan?.to || 'To my Corina'}
                </h3>
              </div>

              {/* Message */}
              <p
                className="text-lg md:text-xl text-slate-700 leading-relaxed text-left"
                style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                {storyContent.loveNotes?.bogdan?.message ||
                  'You walked into my life at 6 AM and changed everything. Every adventure, every sunset, every croissant tastes better with you. Can\'t wait to spend forever making memories together. Love always, your Bogdan 💙'}
              </p>

              {/* Signature */}
              <div className="text-right pt-4">
                <p
                  className="text-2xl text-amber-600"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  - Bogdan
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom decorative element */}
        <motion.div
          variants={cardVariants}
          className="pt-8"
        >
          <div className="w-16 h-1 bg-amber-300 mx-auto" />
        </motion.div>
      </motion.div>
    </ScrollSection>
  );
};

export default LoveNotesSection;
