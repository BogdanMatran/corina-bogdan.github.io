import { motion } from 'framer-motion';
import ScrollSection from './ScrollSection';
import { storyContent } from '../data/storyContent';

const DetailsSection = () => {
  const details = storyContent.details || {};

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
    <ScrollSection id="details" className="relative overflow-hidden" style={{ backgroundColor: '#fb923c' }}>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-3xl mx-auto px-6 py-16 text-center relative z-10"
      >
        {/* Label */}
        <motion.span
          variants={itemVariants}
          className="inline-block text-orange-200 text-section-label mb-4"
        >
          The Details
        </motion.span>

        {/* Title */}
        <motion.h2
          variants={itemVariants}
          className="text-section-title text-white mb-4"
        >
          Wedding Details
        </motion.h2>


        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Date & Time Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white p-8 border-l-4 border-orange-400 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-orange-600 flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-sm text-orange-600 tracking-[0.2em] uppercase mb-2 font-bold">When</h3>
            <p
              className="text-2xl font-bold text-orange-900 mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {details.date || 'Date TBD'}
            </p>
            <p className="text-orange-700 text-lg">
              {details.time || 'Time TBD'}
            </p>
          </motion.div>

          {/* Venue Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white p-8 border-l-4 border-orange-400 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-orange-600 flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-sm text-orange-600 tracking-[0.2em] uppercase mb-2 font-bold">Where</h3>
            <p
              className="text-2xl font-bold text-orange-900 mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {details.venue || 'Venue TBD'}
            </p>
            <p className="text-orange-700 text-lg">
              {details.address || 'Address coming soon'}
            </p>
          </motion.div>
        </div>

        {/* Dress Code */}
        {details.dressCode && (
          <motion.div
            variants={itemVariants}
            className="bg-white/90 p-8 border-l-4 border-white shadow-lg max-w-sm mx-auto mb-10"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-orange-600 flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-sm text-orange-600 tracking-[0.2em] uppercase mb-2 font-bold">Dress Code</h3>
            <p className="text-orange-900 text-xl font-medium">
              {details.dressCode}
            </p>
          </motion.div>
        )}

        {/* Additional Notes */}
        {details.notes && details.notes.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="text-left max-w-md mx-auto bg-white p-8 shadow-lg"
          >
            <h3 className="text-sm text-orange-600 tracking-[0.2em] uppercase mb-4 text-center font-bold">
              Good to Know
            </h3>
            <ul className="space-y-4">
              {details.notes.map((note, index) => (
                <li key={index} className="flex items-start space-x-4">
                  <span className="w-3 h-3 rounded-full bg-orange-600 mt-1.5 flex-shrink-0" />
                  <span className="text-orange-900">{note}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </motion.div>
    </ScrollSection>
  );
};

export default DetailsSection;
