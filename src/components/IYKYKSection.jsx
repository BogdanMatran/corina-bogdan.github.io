import { motion } from 'framer-motion';
import ScrollSection from './ScrollSection';
import { storyContent } from '../data/storyContent';

const IYKYKSection = () => {
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const defaultIYKYK = [
    {
      title: "The 6 AM Meeting",
      text: "Zurich HB never looked the same after that morning..."
    },
    {
      title: "Helicopter Proposal",
      text: "When a simple dinner just won't do. Miami Beach from above hits different."
    },
    {
      title: "The Fries Rule",
      text: "No sharing. Not even with him. Especially not with him."
    },
    {
      title: "Unde-ai disparut?",
      text: "If you've heard this phrase, you know. You just know."
    },
    {
      title: "Lip Gloss Emergency",
      text: "Always missing. Always needed. Always a crisis."
    },
    {
      title: "The Height Question",
      text: "First words: 'Are you tall?' Romantic? No. Memorable? Absolutely."
    }
  ];

  const iykykItems = storyContent.iykyk || defaultIYKYK;

  return (
    <ScrollSection
      id="iykyk"
      className="bg-gradient-to-b from-purple-50 via-violet-50 to-purple-50 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-300 rounded-full blur-3xl" />
        <div className="absolute bottom-32 left-20 w-96 h-96 bg-violet-300 rounded-full blur-3xl" />
      </div>

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
          className="inline-block text-purple-600 text-section-label"
        >
          Inside Jokes
        </motion.span>

        {/* Title */}
        <motion.h2
          variants={cardVariants}
          className="text-section-title text-purple-900"
        >
          If You Know, You Know
        </motion.h2>


        {/* Subtitle */}
        <motion.p
          variants={cardVariants}
          className="text-lg md:text-xl text-purple-700 max-w-2xl mx-auto"
        >
          Moments that make us smile. References only the inner circle understands.
        </motion.p>

        {/* IYKYK Cards Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8"
        >
          {iykykItems.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="group bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-purple-100 cursor-default"
            >
              {/* Title */}
              <h3
                className="text-xl md:text-2xl font-bold text-purple-800 mb-3 pt-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {item.title}
              </h3>

              {/* Divider */}
              <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-violet-400 mx-auto mb-3 group-hover:w-full transition-all duration-300" />

              {/* Text */}
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                {item.text}
              </p>

              {/* Corner decoration */}
              <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-purple-200 group-hover:border-purple-400 transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          variants={cardVariants}
          className="pt-8"
        >
          <p
            className="text-xl md:text-2xl text-purple-600 opacity-70 italic"
          >
            You had to be there
          </p>
        </motion.div>
      </motion.div>
    </ScrollSection>
  );
};

export default IYKYKSection;
