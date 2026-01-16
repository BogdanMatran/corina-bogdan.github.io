import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ScrollSection from './ScrollSection';
import { storyContent } from '../data/storyContent';

const InteractiveSection = () => {
  // Song Requests State
  const [songForm, setSongForm] = useState({
    song: '',
    artist: '',
    reason: ''
  });
  const [songSubmitted, setSongSubmitted] = useState(false);
  const [songCount, setSongCount] = useState(0);
  const maxSongs = 3;

  // Predictions State
  const [predictions, setPredictions] = useState({});
  const [predictionSubmitted, setPredictionSubmitted] = useState(false);
  const [results, setResults] = useState(null);

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

  // Load song count from localStorage
  useEffect(() => {
    const count = parseInt(localStorage.getItem('songRequestCount') || '0');
    setSongCount(count);
  }, []);

  // Handle song request submission
  const handleSongSubmit = async (e) => {
    e.preventDefault();

    if (songCount >= maxSongs) {
      alert(`You've already requested ${maxSongs} songs. Thank you!`);
      return;
    }

    // TODO: Replace with your Google Apps Script endpoint
    const endpoint = storyContent.interactive?.songRequestsEndpoint || '#';

    try {
      if (endpoint !== '#') {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            song: songForm.song,
            artist: songForm.artist,
            reason: songForm.reason,
            timestamp: new Date().toISOString()
          })
        });

        if (!response.ok) throw new Error('Submission failed');
      }

      // Update local count
      const newCount = songCount + 1;
      setSongCount(newCount);
      localStorage.setItem('songRequestCount', newCount.toString());

      // Reset form and show success
      setSongForm({ song: '', artist: '', reason: '' });
      setSongSubmitted(true);

      setTimeout(() => setSongSubmitted(false), 3000);
    } catch (error) {
      console.error('Error submitting song:', error);
      alert('There was an error submitting your song. Please try again!');
    }
  };

  // Handle prediction submission
  const handlePredictionSubmit = async (e) => {
    e.preventDefault();

    const questions = storyContent.interactive?.predictions?.questions || [];
    const allAnswered = questions.every(q => predictions[q.id]);

    if (!allAnswered) {
      alert('Please answer all questions!');
      return;
    }

    // TODO: Replace with your Google Apps Script endpoint
    const endpoint = storyContent.interactive?.predictionsEndpoint || '#';

    try {
      if (endpoint !== '#') {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...predictions,
            timestamp: new Date().toISOString()
          })
        });

        if (!response.ok) throw new Error('Submission failed');

        // Fetch results
        const resultsResponse = await fetch(`${endpoint}/results`);
        if (resultsResponse.ok) {
          const data = await resultsResponse.json();
          setResults(data);
        }
      }

      setPredictionSubmitted(true);
      localStorage.setItem('predictionSubmitted', 'true');
    } catch (error) {
      console.error('Error submitting predictions:', error);
      alert('There was an error submitting your predictions. Please try again!');
    }
  };

  const defaultQuestions = [
    {
      id: 'cries',
      text: 'Who will cry first at the ceremony?',
      options: ['Corina', 'Bogdan', 'Both', 'Neither']
    },
    {
      id: 'dancer',
      text: "Who's the better dancer?",
      options: ['Corina', 'Bogdan', 'Tied']
    },
    {
      id: 'wakes',
      text: 'Who wakes up earlier?',
      options: ['Corina', 'Bogdan', 'Same time']
    },
    {
      id: 'iloveyou',
      text: "Who said 'I love you' first?",
      options: ['Corina', 'Bogdan']
    }
  ];

  const questions = storyContent.interactive?.predictions?.questions || defaultQuestions;

  return (
    <ScrollSection
      id="interactive"
      className="bg-gradient-to-b from-lime-50 via-yellow-50 to-lime-50 relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-lime-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-yellow-300 rounded-full blur-3xl" />
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
          variants={itemVariants}
          className="inline-block text-lime-700 text-section-label"
        >
          Get Involved
        </motion.span>

        {/* Title */}
        <motion.h2
          variants={itemVariants}
          className="text-section-title text-lime-900"
        >
          Make It Your Party Too!
        </motion.h2>


        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-8 pt-8">
          {/* Song Requests */}
          <motion.div
            variants={itemVariants}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-lime-100 text-left"
          >
            <h3
              className="text-3xl md:text-4xl font-bold text-lime-800 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Request a Song
            </h3>

            <p className="text-slate-600 mb-6">
              Help us build the perfect playlist! Request up to {maxSongs} songs for the reception.
            </p>

            {songCount >= maxSongs ? (
              <div className="bg-lime-100 border border-lime-300 rounded-lg p-4 text-center">
                <p className="text-lime-800 font-semibold">
                  Thank you! You've requested {maxSongs} songs.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSongSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Song Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={songForm.song}
                    onChange={(e) => setSongForm({ ...songForm, song: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-lime-500 focus:ring-2 focus:ring-lime-200 outline-none transition text-slate-900"
                    placeholder="Enter song title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Artist *
                  </label>
                  <input
                    type="text"
                    required
                    value={songForm.artist}
                    onChange={(e) => setSongForm({ ...songForm, artist: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-lime-500 focus:ring-2 focus:ring-lime-200 outline-none transition text-slate-900"
                    placeholder="Enter artist name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Why this song? (Optional)
                  </label>
                  <textarea
                    value={songForm.reason}
                    onChange={(e) => setSongForm({ ...songForm, reason: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-lime-500 focus:ring-2 focus:ring-lime-200 outline-none transition resize-none text-slate-900"
                    rows="3"
                    placeholder="Share why this song is special"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Submit Song Request ({songCount}/{maxSongs})
                </button>

                {songSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-100 border border-green-300 rounded-lg p-3 text-center text-green-800 font-semibold"
                  >
                    Song request submitted! Thank you!
                  </motion.div>
                )}
              </form>
            )}
          </motion.div>

          {/* Predictions Poll */}
          <motion.div
            variants={itemVariants}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-yellow-100 text-left"
          >
            <h3
              className="text-3xl md:text-4xl font-bold text-yellow-800 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Test Your Knowledge
            </h3>

            <p className="text-slate-600 mb-6">
              How well do you know Corina & Bogdan? Make your predictions!
            </p>

            {predictionSubmitted && results ? (
              <div className="space-y-4">
                <p className="text-green-700 font-semibold text-center bg-green-100 rounded-lg p-3">
                  Thanks for voting! Here are the results so far:
                </p>
                {/* Results display would go here */}
                <div className="text-sm text-slate-600 italic text-center">
                  Results will be revealed at the reception!
                </div>
              </div>
            ) : (
              <form onSubmit={handlePredictionSubmit} className="space-y-6">
                {questions.map((question) => (
                  <div key={question.id} className="space-y-3">
                    <label className="block text-sm font-semibold text-slate-700">
                      {question.text}
                    </label>
                    <div className="space-y-2">
                      {question.options.map((option) => (
                        <label
                          key={option}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-yellow-50 cursor-pointer transition"
                        >
                          <input
                            type="radio"
                            name={question.id}
                            value={option}
                            checked={predictions[question.id] === option}
                            onChange={(e) =>
                              setPredictions({ ...predictions, [question.id]: e.target.value })
                            }
                            className="w-4 h-4 text-yellow-600 focus:ring-yellow-500"
                          />
                          <span className="text-slate-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Submit Predictions
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </motion.div>
    </ScrollSection>
  );
};

export default InteractiveSection;
