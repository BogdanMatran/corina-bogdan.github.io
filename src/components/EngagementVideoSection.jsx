import { motion } from 'framer-motion';
import { useState } from 'react';
import ScrollSection from './ScrollSection';
import { storyContent } from '../data/storyContent';

const EngagementVideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const videoData = storyContent.engagementVideo || {
    title: "The Proposal",
    subtitle: "Relive the moment",
    videoUrl: null,
    placeholder: {
      message: "Our engagement video is coming soon!"
    }
  };

  const hasVideo = videoData.videoUrl;

  // Extract YouTube video ID if it's a YouTube URL
  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const youtubeId = getYouTubeId(videoData.videoUrl);

  return (
    <ScrollSection
      id="engagement-video"
      className="bg-gradient-to-b from-yellow-50 via-amber-50 to-yellow-50 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-amber-300 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-12"
      >
        {/* Section Label */}
        <motion.span
          variants={itemVariants}
          className="inline-block text-amber-600 text-section-label"
        >
          {videoData.subtitle || "Relive the moment"}
        </motion.span>

        {/* Title */}
        <motion.h2
          variants={itemVariants}
          className="text-section-title text-amber-900"
        >
          {videoData.title || "The Proposal"}
        </motion.h2>


        {/* Video Container */}
        <motion.div
          variants={itemVariants}
          className="pt-8 max-w-4xl mx-auto"
        >
          {hasVideo ? (
            // Video player (YouTube or direct video)
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
              {youtubeId ? (
                // YouTube embed
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${youtubeId}${isPlaying ? '?autoplay=1' : ''}`}
                  title="Engagement Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                // Direct video URL
                <video
                  className="w-full h-full object-cover"
                  controls
                  poster={videoData.placeholder?.image}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
                  <source src={videoData.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ) : (
            // Placeholder
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-amber-200 via-yellow-200 to-amber-300">
              {/* Animated background */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-to-br from-yellow-300/50 via-amber-300/50 to-yellow-400/50 blur-2xl"
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-white/20 to-transparent backdrop-blur-sm">
                {/* Play icon placeholder */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="mb-8"
                >
                  <div className="w-24 h-24 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center border-4 border-white/50 shadow-xl">
                    <svg className="w-12 h-12 text-amber-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </motion.div>

                {/* Text */}
                <h3
                  className="text-3xl md:text-4xl font-bold text-amber-900 mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {videoData.placeholder?.message || "Our engagement video is coming soon!"}
                </h3>

                <p className="text-lg text-amber-800 opacity-80">
                  Stay tuned for the magical moment
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Caption */}
        {hasVideo && (
          <motion.p
            variants={itemVariants}
            className="text-lg text-amber-700 italic"
          >
            A moment that changed everything
          </motion.p>
        )}
      </motion.div>
    </ScrollSection>
  );
};

export default EngagementVideoSection;
