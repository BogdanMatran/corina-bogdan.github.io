import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = {
  groom: [
    { q: "What is the circumference of his biceps in cm ?", options: ["36", "28", "40", "44"], a: 2 },
    { q: "What's the groom's favorite drink?", options: ["Whiskey", "Beer", "Coffee", "Wine"], a: 2 },
    { q: "Which city was the groom born in?", options: ["Vaslui", "Iasi", "Bucuresti", "Husi"], a: 3 },
    { q: "What did he think at fiest about the bride?", options: ["Spoiled", "Beautifull", "Sexy", "Complicated"], a: 1 },
    { q: "His favorite tv series?", options: ["Big Bang Theory", "The office", "Friends", "How i met your mother"], a: 1 },
    { q: "Favorite shisha flavor?", options: ["Cane Mint", "Double Apple", "Lemon Lime", "Kashmir Guava"], a: 2 },
    { q: "His go-to breakfast?", options: ["Eggs", "Pancakes", "Eggs", "Eggs"], a: 3 },
    { q: "Favorite thing about the bride?", options: ["Ass", "Eyes", "Soul", "Moods"], a: 2 },
    { q: "Favorite holiday together?", options: ["Bali", "Nice", "Bahamas", "London"], a: 3 },
    { q: "Who said 'I love you' first?", options: ["Bride", "Groom"], a: 1 },
  ],
  bride: [
    { q: "How did they meet?", options: ["At a concert 🎶", "On Tinder 💬", "At university 📚", "In Zurich HB at 6AM in the morning!!"], a: 3 },
    { q: "Where did she grow up?", options: ["Darmanesti", "Maratei", "Precista", "Husi"], a: 0 },
    { q: "Her favorite dessert?", options: ["Cake", "Macaron", "Pasteis de Nata", "Lays cu branza"], a: 3 },
    { q: "What was our first trip together?", options: ["Bali", "Cote d'Azur", "Miami", "Targul de Craciun din Bucuresti"], a: 3 },
    { q: "What’s she most likely to be doing at 8 a.m. on a Sunday?", options: ["Making pancakes 🥞", "Scrolling TikTok 😆", "Going for a run (in theory) 🏃‍♀️", "Sleeping in 💤"], a: 3 },
    { q: "What’s the one thing she’d never share - not even with him?", options: ["Her fries 🍟", "Her blanket 🛏️", "Her skincare products 🧴 (Yes she does have a few of those)", "Her Netflix password 🎬"], a: 0 },
    { q: "What was her first impression of him?", options: ["“This guy talks a lot.” 😂", "“I bet he’ll text me first.” 💬", "“Nope, not tall enough 💃”", "“He’s actually kind of cute…” 😏"], a: 2 },
    { q: "What’s the most likely phrase she’ll say on the wedding day?", options: ["“Where’s my lip gloss?!” 💄", "“Okay, but get a photo of this!” 📸", "Unde-ai disparut iar? 😡", "“Don’t cry, you’ll ruin your mascara.” 😭"], a: 2 },
    { q: "Where did the proposal happen?", options: ["At home, surrounded by laundry and true love 🧺❤️", "At a restaurant that served emotions instead of dessert", "On the beach (but like, a normal beach, not Miami Beach)", "In a HELICOPTER flying over MIAMI BEACH — with the FULL MOON shining like it knew what was going on 🌕💍"], a: 3 },
    { q: "Who said 'I love you' first?", options: ["Bride", "Groom"], a: 0 },
	  { q: "What should you do to get the wedding invite?", options: ["RSVP before the deadline (we’re watching 👀)", "Pretend to cry during the ceremony for bonus points 😭", "Compliment the bride’s dress loudly and repeatedly 👗", "Just show up, we already love you ❤️"], a: 3 },
  ],
};

export default function WeddingQuizApp() {
  const [step, setStep] = useState("choose");
  const [side, setSide] = useState(null);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    attending: "",
    essay: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const handleChoice = (choice) => {
    setSide(choice);
    setStep("quiz");
  };

  const handleAnswer = (i) => {
    setSelectedAnswer(i);
    setShowResult(true);
    
    const correct = questions[side][index].a;
    if (i === correct) setScore(score + 1);
    
    setTimeout(() => {
      setShowResult(false);
      setSelectedAnswer(null);
      if (index + 1 < questions[side].length) setIndex(index + 1);
      else setStep("result");
    }, 2000);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Validate essay if attending is "no"
    if (formData.attending === "no" && wordCount < 300) {
      alert(`Your essay must be at least 300 words. Current word count: ${wordCount}`);
      return;
    }
    
    setIsSubmitting(true);

    // Replace with your Google Apps Script Web App URL
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbygnuDB2N30apAVXHYMtuhC4nSlPNbEFeFKVFy1p4LUR-8pqwtRO5_Ep3hVCjJVqOs/exec";

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          attending: formData.attending,
          essay: formData.essay || "N/A",
          team: side,
          score: score,
          timestamp: new Date().toISOString()
        }),
      });

      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
      }, 1000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
      alert("There was an error submitting your response. Please try again.");
    }
  };

  const handleEssayChange = (e) => {
    const text = e.target.value;
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    setFormData({ ...formData, essay: text });
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
                  {questions[side][index].options.map((opt, i) => {
                    const isCorrect = i === questions[side][index].a;
                    const isSelected = i === selectedAnswer;
                    const shouldBlink = showResult && isCorrect;
                    const shouldShowWrong = showResult && isSelected && !isCorrect;
                    
                    return (
                      <motion.button
                        key={i}
                        whileHover={!showResult ? { scale: 1.02, x: 5 } : {}}
                        whileTap={!showResult ? { scale: 0.98 } : {}}
                        onClick={() => !showResult && handleAnswer(i)}
                        disabled={showResult}
                        className={`relative border-2 rounded-2xl py-4 px-6 text-left font-medium transition-all group ${
                          shouldBlink
                            ? "border-green-500 bg-green-100 animate-pulse"
                            : shouldShowWrong
                            ? "border-red-500 bg-red-100"
                            : side === "bride"
                            ? "border-pink-200 hover:border-pink-400 hover:bg-pink-50 text-gray-700 hover:text-pink-700"
                            : "border-blue-200 hover:border-blue-400 hover:bg-blue-50 text-gray-700 hover:text-blue-700"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-all ${
                            shouldBlink
                              ? "border-green-500 bg-green-500 text-white"
                              : shouldShowWrong
                              ? "border-red-500 bg-red-500 text-white"
                              : side === "bride"
                              ? "border-pink-300 group-hover:border-pink-500 group-hover:bg-pink-500 group-hover:text-white"
                              : "border-blue-300 group-hover:border-blue-500 group-hover:bg-blue-500 group-hover:text-white"
                          }`}>
                            {shouldBlink ? "✓" : shouldShowWrong ? "✗" : String.fromCharCode(65 + i)}
                          </span>
                          <span className={`text-lg ${shouldBlink ? "text-green-700 font-semibold" : shouldShowWrong ? "text-red-700" : ""}`}>{opt}</span>
                        </span>
                      </motion.button>
                    );
                  })}
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
              {!submitSuccess ? (
                <>
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
                      className="space-y-4 mb-8"
                    >
                      <div className="flex items-center justify-center gap-2 text-4xl mb-4">
                        <span>💍</span>
                        <span>✨</span>
                        <span>💐</span>
                      </div>
                      <p className="text-2xl font-medium bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                        You've earned your golden invite!
                      </p>
                      <p className="text-gray-600 text-lg mb-6">
                        Please fill out the form below to confirm your attendance
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="space-y-4 mb-8"
                    >
                      <p className="text-xl text-gray-600 mb-6">
                        Almost there! But let's get your details anyway...
                      </p>
                    </motion.div>
                  )}

                  {/* RSVP Form */}
                  <motion.form
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    onSubmit={handleFormSubmit}
                    className="space-y-6 text-left"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
                        placeholder="+1 234 567 8900"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Will you be attending? *
                      </label>
                      <div className="flex gap-4">
                        <label className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.attending === "yes"
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-green-300"
                        }`}>
                          <input
                            type="radio"
                            name="attending"
                            value="yes"
                            required
                            checked={formData.attending === "yes"}
                            onChange={(e) => {
                              setFormData({ ...formData, attending: e.target.value, essay: "" });
                              setWordCount(0);
                            }}
                            className="w-5 h-5 text-green-500"
                          />
                          <span className="font-semibold text-gray-700">Yes! 🎉</span>
                        </label>
                        <label className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.attending === "no"
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 hover:border-red-300"
                        }`}>
                          <input
                            type="radio"
                            name="attending"
                            value="no"
                            required
                            checked={formData.attending === "no"}
                            onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                            className="w-5 h-5 text-red-500"
                          />
                          <span className="font-semibold text-gray-700">Can't make it 😢</span>
                        </label>
                      </div>
                    </div>

                    {/* Essay field for "No" responses */}
                    {formData.attending === "no" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Please write a 300-word essay explaining why you can't attend *
                        </label>
                        <textarea
                          required={formData.attending === "no"}
                          value={formData.essay}
                          onChange={handleEssayChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-400 focus:outline-none transition-colors min-h-[200px] resize-y"
                          placeholder="We're disappointed you can't make it! You are now obligated to explain in at least 300 words why you'll be missing Corina's special day..."
                        />
                        <div className="flex justify-between items-center mt-2">
                          <span className={`text-sm font-medium ${wordCount >= 300 ? "text-green-600" : "text-red-600"}`}>
                            Word count: {wordCount} / 300 {wordCount >= 300 ? "✓" : ""}
                          </span>
                          {wordCount < 300 && (
                            <span className="text-xs text-gray-500">
                              {300 - wordCount} more words needed
                            </span>
                          )}
                        </div>
                      </motion.div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full px-12 py-4 rounded-2xl font-semibold text-white shadow-xl hover:shadow-2xl transition-all ${
                        side === "bride"
                          ? "bg-gradient-to-r from-pink-500 to-rose-600"
                          : "bg-gradient-to-r from-blue-500 to-indigo-600"
                      } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {isSubmitting ? "Submitting..." : "Submit RSVP"}
                    </motion.button>
                  </motion.form>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setStep("choose");
                      setScore(0);
                      setIndex(0);
                      setFormData({ name: "", email: "", phone: "", attending: "" });
                    }}
                    className="mt-6 px-8 py-3 rounded-xl font-medium text-gray-600 border-2 border-gray-300 hover:border-gray-400 transition-all"
                  >
                    Retake Quiz
                  </motion.button>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="text-8xl mb-6"
                  >
                    ✅
                  </motion.div>
                  <h2 className="text-4xl font-serif text-gray-800 mb-4">
                    Thank You!
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    Your response has been recorded. We can't wait to celebrate with you!
                  </p>
                  <div className="flex items-center justify-center gap-3 text-5xl">
                    <span>💒</span>
                    <span>💕</span>
                    <span>🥂</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setStep("choose");
                      setScore(0);
                      setIndex(0);
                      setFormData({ name: "", email: "", phone: "", attending: "" });
                      setSubmitSuccess(false);
                    }}
                    className={`mt-8 px-12 py-4 rounded-2xl font-semibold text-white shadow-xl hover:shadow-2xl transition-all ${
                      side === "bride"
                        ? "bg-gradient-to-r from-pink-500 to-rose-600"
                        : "bg-gradient-to-r from-blue-500 to-indigo-600"
                    }`}
                  >
                    Start Over
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}