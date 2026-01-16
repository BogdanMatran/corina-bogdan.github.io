import { motion } from 'framer-motion';
import ScrollSection from './ScrollSection';
import ParallaxImage from './ParallaxImage';
import { storyContent } from '../data/storyContent';

const GroomSection = () => {
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
    <ScrollSection id="groom" className="bg-white relative overflow-hidden">

      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div>
            <motion.p
              variants={itemVariants}
              className="text-slate-600 text-section-label mb-2"
            >
              {storyContent.groom.subtitle}
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="text-section-title text-slate-900"
            >
              {storyContent.groom.title}
            </motion.h2>
          </div>


          {/* Facts */}
          <motion.div variants={containerVariants} className="space-y-4">
            {storyContent.groom.facts.map((fact, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-4 bg-white/95 backdrop-blur-sm p-4 border-l-4 border-teal-400 hover:bg-white hover:shadow-md transition-all cursor-default"
              >
                <span className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0" />
                <p className={`text-teal-900 leading-relaxed ${index === 0 ? 'text-lg font-semibold' : 'font-medium'}`}>
                  {fact}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Image with Multi-layer Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="relative overflow-hidden h-[450px] bg-white border-4 border-white shadow-lg">
            <ParallaxImage
              src={`${process.env.PUBLIC_URL}/groom.jpg`}
              alt="The Groom"
              speed={15}
              className="h-full"
            />
          </div>
        </motion.div>
      </div>
    </ScrollSection>
  );
};

export default GroomSection;
