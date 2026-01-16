import { motion } from 'framer-motion';
import { useState } from 'react';
import ScrollSection from './ScrollSection';
import { storyContent } from '../data/storyContent';

const RSVPSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [attending, setAttending] = useState('');
  const [essay, setEssay] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzlIYl8HPJkqdkc93QollHkpBAZj-q8IMM5H0KOfS3o7P2-rjG-NlXFbs60nReY8lr9Ww/exec';

  const wordCount = essay.trim().split(/\s+/).filter(word => word.length > 0).length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (attending === 'no' && wordCount < 300) {
      setError('Please write at least 300 words explaining why you cannot attend.');
      setIsSubmitting(false);
      return;
    }

    try {
      const timestamp = new Date().toISOString();
      const params = new URLSearchParams();
      params.append('name', name);
      params.append('email', email);
      params.append('phone', phone);
      params.append('attending', attending);
      params.append('essay', essay || '');
      params.append('timestamp', timestamp);

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
        mode: 'no-cors'
      });

      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollSection id="rsvp" className="relative overflow-hidden" style={{ backgroundColor: '#ea580c' }}>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto px-6 py-16 text-center relative z-10"
      >
        {/* Header */}
        <span className="inline-block text-orange-200 text-section-label mb-4">
          Join Us
        </span>
        <h2 className="text-section-title text-white mb-4">
          {storyContent.rsvp.title}
        </h2>


        <p className="text-xl text-orange-50 font-light mb-2">
          {storyContent.rsvp.message}
        </p>
        <p
          className="text-2xl text-orange-200 italic mb-10"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          {storyContent.rsvp.note}
        </p>

        {/* RSVP Form */}
        {!submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-10 shadow-2xl"
          >
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm text-left">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-left space-y-2 relative group">
                <label
                  htmlFor="name"
                  className="block text-xs text-orange-900 tracking-[0.15em] uppercase font-bold mb-1 transition-colors group-focus-within:text-orange-950"
                >
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="w-full px-5 py-4 border-2 border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 focus:outline-none transition-all disabled:opacity-50 text-lg rounded-sm bg-white shadow-sm focus:shadow-elevated"
                  />
                  {name && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="text-left space-y-2 relative group">
                <label
                  htmlFor="email"
                  className="block text-xs text-orange-900 tracking-[0.15em] uppercase font-bold mb-1 transition-colors group-focus-within:text-orange-950"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="w-full px-5 py-4 border-2 border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 focus:outline-none transition-all disabled:opacity-50 text-lg rounded-sm bg-white shadow-sm focus:shadow-elevated"
                  />
                  {email && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="text-left space-y-2 relative group">
                <label
                  htmlFor="phone"
                  className="block text-xs text-orange-900 tracking-[0.15em] uppercase font-bold mb-1 transition-colors group-focus-within:text-orange-950"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="w-full px-5 py-4 border-2 border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 focus:outline-none transition-all disabled:opacity-50 text-lg rounded-sm bg-white shadow-sm focus:shadow-elevated"
                  />
                  {phone && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="text-left space-y-2">
                <label className="block text-sm text-orange-900 tracking-[0.1em] uppercase font-bold">
                  Will you be attending?
                </label>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer p-4 border-2 border-slate-200 hover:border-rose-300 transition-colors rounded-sm">
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={attending === 'yes'}
                      onChange={(e) => setAttending(e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="w-5 h-5 text-rose-500 focus:ring-rose-500 border-slate-300"
                    />
                    <span className="ml-3 text-orange-900 font-medium">Yes, I'll be there</span>
                  </label>
                  <label className="flex items-center cursor-pointer p-4 border-2 border-slate-200 hover:border-rose-300 transition-colors rounded-sm">
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={attending === 'no'}
                      onChange={(e) => setAttending(e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="w-5 h-5 text-rose-500 focus:ring-rose-500 border-slate-300"
                    />
                    <span className="ml-3 text-orange-900 font-medium">Sorry, I can't make it</span>
                  </label>
                </div>
              </div>

              {attending === 'no' && (
                <div className="text-left space-y-2">
                  <label htmlFor="essay" className="block text-sm text-slate-600 tracking-[0.1em] uppercase font-bold">
                    Please tell us why (min 300 words)
                  </label>
                  <textarea
                    id="essay"
                    value={essay}
                    onChange={(e) => setEssay(e.target.value)}
                    required
                    disabled={isSubmitting}
                    rows="6"
                    className="w-full px-4 py-4 border-2 border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 focus:outline-none transition-colors resize-none disabled:opacity-50 rounded-sm"
                  />
                  <p className={`text-sm mt-2 font-medium ${wordCount >= 300 ? 'text-green-700' : 'text-orange-700'}`}>
                    {wordCount} / 300 words
                  </p>
                </div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="w-full bg-gradient-to-r from-orange-800 to-orange-900 text-white font-bold py-5 text-lg uppercase tracking-wider hover:from-orange-900 hover:to-orange-950 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg relative overflow-hidden rounded-sm"
              >
                {isSubmitting && (
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                )}
                <span className="relative z-10">
                  {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
                </span>
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-12 shadow-2xl"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-orange-900 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3
              className="text-3xl font-bold text-orange-900 mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Thank You
            </h3>
            <p className="text-orange-700 mb-4 text-lg">
              Your RSVP has been received
            </p>
            <p className="text-orange-900 font-medium text-xl">
              {attending === 'yes' ? "We can't wait to celebrate with you!" : "We'll miss you at the celebration"}
            </p>
          </motion.div>
        )}
      </motion.div>
    </ScrollSection>
  );
};

export default RSVPSection;
