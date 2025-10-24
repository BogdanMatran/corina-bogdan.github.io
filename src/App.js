import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = {
  groom: [
    { q: "Where did the groom propose?", options: ["Paris", "At home", "On the beach", "At a concert"], a: 2 },
    { q: "What's the groom's favorite drink?", options: ["Whiskey", "Beer", "Coffee", "Wine"], a: 0 },
    { q: "Which city was the groom born in?", options: ["Rome", "London", "New York", "Tokyo"], a: 2 },
    { q: "The groom's hidden talent?", options: ["Dancing", "Singing", "Cooking", "Drawing"], a: 2 },
    { q: "His favorite movie genre?", options: ["Comedy", "Action", "Drama", "Sci-Fi"], a: 1 },
    { q: "Favorite season?", options: ["Spring", "Summer", "Fall", "Winter"], a: 1 },
    { q: "His go-to breakfast?", options: ["Omelet", "Pancakes", "Cereal", "Croissant"], a: 3 },
    { q: "Favorite color?", options: ["Blue", "Green", "Black", "Gold"], a: 0 },
    { q: "Favorite holiday spot?", options: ["Bali", "Paris", "New York", "Maldives"], a: 3 },
    { q: "Who said 'I love you' first?", options: ["Bride", "Groom"], a: 1 },
  ],
  bride: [
    { q: "What's the bride's favorite flower?", options: ["Rose", "Peony", "Lily", "Tulip"], a: 1 },
    { q: "Where did she grow up?", options: ["Paris", "New York", "London", "Rome"], a: 2 },
    { q: "Her favorite dessert?", options: ["Cake", "Macaron", "Ice Cream", "Tiramisu"], a: 1 },
    { q: "What's her dream honeymoon spot?", options: ["Bali", "Venice", "Santorini", "Kyoto"], a: 2 },
    { q: "Favorite color?", options: ["White", "Pink", "Gold", "Lavender"], a: 2 },
    { q: "Her morning ritual?", options: ["Yoga", "Coffee", "Jogging", "Meditation"], a: 1 },
    { q: "Favorite type of movie?", options: ["Rom-Com", "Thriller", "Drama", "Fantasy"], a: 0 },
    { q: "The bride's zodiac sign?", options: ["Leo", "Cancer", "Taurus", "Virgo"], a: 3 },
    { q: "Her favorite drink?", options: ["Tea", "Wine", "Smoothie", "Coffee"], a: 0 },
    { q: "Who said 'I love you' first?", options: ["Bride", "Groom"], a: 0 },
  ],
};

export default function WeddingQuizApp() {
  const [step, setStep] = useState("choose");
  const [side, setSide] = useState(null);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleChoice = (choice) => {
    setSide(choice);
    setStep("quiz");
  };

  const handleAnswer = (i) => {
    const correct = questions[side][index].a;
    if (i === correct) setScore(score + 1);
    if (index + 1 < questions[side].length) setIndex(index + 1);
    else setStep("result");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <AnimatePresence mode="wait">
        {step === "choose" && (
          <motion.div
            key="choose"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="space-y-8 z-10 px-6"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-8xl md:text-9xl text-white tracking-tight mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
                Choose Your Side
              </h1>
              <p className="text-5xl md:text-5xl text-white tracking-tight mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
                Pick your team before the wedding quiz begins
              </p>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-8 justify-center mt-12 w-full max-w-6xl">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleChoice("groom")}
                className="group relative w-full md:w-96 h-96 bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold rounded-3xl shadow-2xl hover:shadow-3xl transition-all overflow-hidden"
                style={{
                  backgroundImage: `url(${process.env.PUBLIC_URL}/groom.jpg)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-600/50 to-transparent" />
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <div className="relative h-full flex flex-col items-center justify-end pb-8 gap-4">
                  <span className="text-3xl font-bold drop-shadow-lg">Team Groom</span>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleChoice("bride")}
                className="group relative w-full md:w-96 h-96 bg-gradient-to-br from-pink-500 to-rose-600 text-white font-semibold rounded-3xl shadow-2xl hover:shadow-3xl transition-all overflow-hidden"
                style={{
                  backgroundImage: `url(${process.env.PUBLIC_URL}/bride.jpg)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/90 via-pink-600/50 to-transparent" />
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <div className="relative h-full flex flex-col items-center justify-end pb-8 gap-4">
                  <span className="text-3xl font-bold drop-shadow-lg">Team Bride</span>
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === "quiz" && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl w-full z-10 mx-6"
          >
            <div className="bg-white/80 backdrop-blur-xl border-2 border-white/50 rounded-3xl shadow-2xl p-8 md:p-12">
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-600">Progress</span>
                  <span className="text-sm font-medium text-gray-800">
                    {index + 1} / {questions[side].length}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((index + 1) / questions[side].length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                    className={`h-full rounded-full ${side === "bride" ? "bg-gradient-to-r from-pink-500 to-rose-500" : "bg-gradient-to-r from-blue-500 to-indigo-600"
                      }`}
                  />
                </div>
              </div>

              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-8 leading-tight">
                  {questions[side][index].q}
                </h2>

                <div className="grid gap-4">
                  {questions[side][index].options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(i)}
                      className={`relative border-2 rounded-2xl py-4 px-6 text-left font-medium transition-all group ${side === "bride"
                          ? "border-pink-200 hover:border-pink-400 hover:bg-pink-50 text-gray-700 hover:text-pink-700"
                          : "border-blue-200 hover:border-blue-400 hover:bg-blue-50 text-gray-700 hover:text-blue-700"
                        }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-all ${side === "bride"
                            ? "border-pink-300 group-hover:border-pink-500 group-hover:bg-pink-500 group-hover:text-white"
                            : "border-blue-300 group-hover:border-blue-500 group-hover:bg-blue-500 group-hover:text-white"
                          }`}>
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="text-lg">{opt}</span>
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {step === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="space-y-8 z-10 px-6"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-xl border-2 border-white/50 rounded-3xl shadow-2xl p-12 max-w-2xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="text-7xl mb-6"
              >
                {score >= 7 ? "🎉" : "😅"}
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-serif text-gray-800 mb-6 bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
                {score >= 7 ? "Congratulations!" : "Nice Try!"}
              </h1>

              <div className="mb-8">
                <p className="text-2xl text-gray-600 mb-4">Your Score</p>
                <div className="flex items-center justify-center gap-4">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className={`text-6xl font-bold ${side === "bride" ? "text-pink-600" : "text-blue-600"
                      }`}
                  >
                    {score}
                  </motion.span>
                  <span className="text-4xl text-gray-400">/</span>
                  <span className="text-4xl text-gray-600">{questions[side].length}</span>
                </div>
              </div>

              {score >= 7 ? (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-center gap-2 text-4xl mb-4">
                    <span>💍</span>
                    <span>✨</span>
                    <span>💐</span>
                  </div>
                  <p className="text-2xl font-medium bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                    You've earned your golden invite!
                  </p>
                  <p className="text-gray-600 text-lg">
                    See you at the celebration!
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-4"
                >
                  <p className="text-xl text-gray-600">
                    Almost there! Give it another shot to secure your invitation.
                  </p>
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setStep("choose");
                  setScore(0);
                  setIndex(0);
                }}
                className={`mt-8 px-12 py-4 rounded-2xl font-semibold text-white shadow-xl hover:shadow-2xl transition-all ${side === "bride"
                    ? "bg-gradient-to-r from-pink-500 to-rose-600"
                    : "bg-gradient-to-r from-blue-500 to-indigo-600"
                  }`}
              >
                Try Again
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}