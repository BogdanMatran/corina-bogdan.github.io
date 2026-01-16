import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollSection from './ScrollSection';
import { storyContent } from '../data/storyContent';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const gallery = storyContent.gallery || [];

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!selectedImage || gallery.length === 0) return;

    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      } else if (e.key === 'ArrowRight') {
        const currentIndex = gallery.findIndex(img => img.src === selectedImage.src);
        const nextIndex = (currentIndex + 1) % gallery.length;
        setSelectedImage(gallery[nextIndex]);
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = gallery.findIndex(img => img.src === selectedImage.src);
        const prevIndex = (currentIndex - 1 + gallery.length) % gallery.length;
        setSelectedImage(gallery[prevIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, gallery]);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Placeholder state when no gallery images
  if (gallery.length === 0) {
    return (
      <ScrollSection id="gallery" className="bg-transparent">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-6 py-16 text-center relative z-10"
        >
          <span className="inline-block text-amber-900 text-section-label mb-4">
            Gallery
          </span>
          <h2 className="text-section-title text-white mb-4">
            Our Moments
          </h2>


          <p className="text-white mb-6 text-xl font-light leading-relaxed max-w-lg mx-auto">
            Our photographer is still editing the photos.<br />
            <span className="text-white italic text-2xl mt-2 inline-block" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Spoiler: We look amazing
            </span>
          </p>

          {/* Placeholder Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-square bg-white/90 border-2 border-amber-700 relative overflow-hidden"
              >
              </div>
            ))}
          </div>
        </motion.div>
      </ScrollSection>
    );
  }

  return (
    <ScrollSection id="gallery" className="bg-transparent">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-6 py-16 relative z-10"
      >
        <motion.span
          variants={itemVariants}
          className="block text-center text-amber-900 text-section-label mb-4"
        >
          Gallery
        </motion.span>
        <motion.h2
          variants={itemVariants}
          className="text-section-title text-white mb-4 text-center"
        >
          Our Moments
        </motion.h2>


        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {gallery.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative aspect-square overflow-hidden cursor-pointer group border-4 border-amber-700 hover:border-amber-800 transition-colors shadow-md"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={`${process.env.PUBLIC_URL}${image.src}`}
                alt={image.alt || `Gallery image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm font-medium">{image.caption}</p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Enhanced Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/97 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            {/* Navigation Arrows */}
            {gallery.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = gallery.findIndex(img => img.src === selectedImage.src);
                    const prevIndex = (currentIndex - 1 + gallery.length) % gallery.length;
                    setSelectedImage(gallery[prevIndex]);
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center group z-10"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = gallery.findIndex(img => img.src === selectedImage.src);
                    const nextIndex = (currentIndex + 1) % gallery.length;
                    setSelectedImage(gallery[nextIndex]);
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center group z-10"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-6xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image counter badge */}
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <p className="text-white text-sm font-medium" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {gallery.findIndex(img => img.src === selectedImage.src) + 1} / {gallery.length}
                </p>
              </div>

              <img
                src={`${process.env.PUBLIC_URL}${selectedImage.src}`}
                alt={selectedImage.alt || 'Gallery image'}
                className="max-w-full max-h-[85vh] object-contain shadow-floating rounded-sm"
              />

              {selectedImage.caption && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white text-center mt-6 text-lg px-6 py-3 rounded-lg bg-white/5 backdrop-blur-md border border-white/10"
                >
                  {selectedImage.caption}
                </motion.p>
              )}
            </motion.div>

            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:rotate-90 transition-all flex items-center justify-center"
              aria-label="Close lightbox"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-amber-300 text-xs px-4 py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10">
              Arrow keys or click arrows to navigate • ESC to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </ScrollSection>
  );
};

export default GallerySection;
