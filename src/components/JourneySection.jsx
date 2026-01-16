import { motion } from 'framer-motion';
import ScrollSection from './ScrollSection';
import { storyContent } from '../data/storyContent';

const JourneySection = () => {
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

  const locationVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Journey locations with default placeholder data
  const locations = storyContent.journeyMap || [
    {
      place: "Zurich, Switzerland",
      label: "Where We Met",
      date: "6 AM, Zurich HB",
      image: null
    },
    {
      place: "Romania",
      label: "First Trip",
      date: "Targul de Craciun",
      image: null
    },
    {
      place: "France",
      label: "European Adventure",
      date: "City of Love",
      image: null
    },
    {
      place: "Bali",
      label: "Island Paradise",
      date: "Tropical Escape",
      image: null
    },
    {
      place: "Miami, USA",
      label: "The Proposal",
      date: "Helicopter Over Miami Beach",
      image: null
    },
    {
      place: "Bahamas",
      label: "Celebration",
      date: "Island Bliss",
      image: null
    },
    {
      place: "Castiglioncello, Italy",
      label: "The Wedding",
      date: "June 16, 2026",
      image: null
    }
  ];

  return (
    <ScrollSection id="journey" className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-teal-50 to-cyan-50">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-300 rounded-full blur-3xl" />
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
          variants={locationVariants}
          className="inline-block text-emerald-700 text-section-label"
        >
          Our Journey
        </motion.span>

        {/* Title */}
        <motion.h2
          variants={locationVariants}
          className="text-section-title text-emerald-900"
        >
          From Zurich to Forever
        </motion.h2>


        {/* Journey Map */}
        <div className="pt-8 pb-16">
          {/* Desktop Layout - Winding Path */}
          <div className="hidden lg:block relative py-20">
            {/* SVG Path - Dotted Line */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
              <motion.path
                d="M 100 100 Q 250 50, 400 100 T 700 150 Q 850 180, 1000 150 T 1300 200 Q 1450 230, 1600 200"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeDasharray="10,10"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                viewport={{ once: true }}
              />
            </svg>

            {/* Locations positioned along the path */}
            <div className="relative grid grid-cols-7 gap-4" style={{ minHeight: '400px' }}>
              {locations.map((location, index) => (
                <motion.div
                  key={index}
                  variants={locationVariants}
                  className={`flex flex-col items-center ${
                    index % 2 === 0 ? 'self-start' : 'self-end'
                  }`}
                  style={{
                    marginTop: index % 2 === 0 ? '0' : '120px'
                  }}
                >
                  {/* Location Card */}
                  <div className="relative group">
                    {/* Photo Placeholder */}
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      className="w-32 h-32 bg-white rounded-lg shadow-lg overflow-hidden border-4 border-white relative"
                    >
                      {location.image ? (
                        <img
                          src={location.image}
                          alt={location.place}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-xs font-semibold text-slate-600 mb-1">{location.label}</div>
                            <div className="text-lg font-bold text-slate-700">{index + 1}</div>
                          </div>
                        </div>
                      )}

                      {/* Location Number Badge */}
                      <div className="absolute top-2 right-2 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                        {index + 1}
                      </div>
                    </motion.div>

                    {/* Location Pin */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-emerald-600 rounded-full border-4 border-white shadow-lg z-10" />

                    {/* Info Card - appears on hover */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute top-full mt-6 left-1/2 -translate-x-1/2 w-48 bg-white rounded-xl shadow-xl p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20"
                    >
                      <h3 className="font-bold text-emerald-900 text-sm mb-1">
                        {location.place}
                      </h3>
                      <p className="text-emerald-700 text-xs font-semibold mb-2">
                        {location.label}
                      </p>
                      <p className="text-slate-600 text-xs">
                        {location.date}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile/Tablet Layout - Vertical Path */}
          <div className="lg:hidden relative">
            {/* Vertical Dotted Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 border-l-4 border-dashed border-emerald-400" />

            {/* Locations */}
            <div className="space-y-8 pl-20">
              {locations.map((location, index) => (
                <motion.div
                  key={index}
                  variants={locationVariants}
                  className="relative"
                >
                  {/* Location Pin on line */}
                  <div className="absolute -left-[52px] top-8 w-6 h-6 bg-emerald-600 rounded-full border-4 border-white shadow-lg z-10" />

                  {/* Location Card */}
                  <div className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow">
                    <div className="flex gap-4">
                      {/* Photo Placeholder */}
                      <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg overflow-hidden relative">
                        {location.image ? (
                          <img
                            src={location.image}
                            alt={location.place}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-2xl font-bold text-slate-600">{index + 1}</span>
                          </div>
                        )}
                        {/* Number Badge */}
                        <div className="absolute top-1 right-1 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 text-left">
                        <h3 className="font-bold text-emerald-900 text-lg mb-1">
                          {location.place}
                        </h3>
                        <p className="text-emerald-700 text-sm font-semibold mb-1">
                          {location.label}
                        </p>
                        <p className="text-slate-600 text-sm">
                          {location.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <motion.p
          variants={locationVariants}
          className="text-lg md:text-xl text-emerald-800 italic max-w-2xl mx-auto"
        >
          Seven places, countless memories, one beautiful journey to forever
        </motion.p>
      </motion.div>
    </ScrollSection>
  );
};

export default JourneySection;
