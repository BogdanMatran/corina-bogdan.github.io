import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const Navigation = ({ weddingDate = '2026-06-16' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentSection, setCurrentSection] = useState('hero');
  const { scrollY } = useScroll();

  // Section colors - Continuous Blue to Orange Gradient
  const sectionColors = {
    hero: { bg: 'rgba(30, 58, 138, 1)', text: 'white', accent: '#60a5fa', border: 'rgba(96, 165, 250, 0.3)', track: '#1e3a8a', thumb: '#60a5fa', thumbHover: '#3b82f6' },
    story: { bg: 'rgba(59, 130, 246, 1)', text: 'white', accent: '#93c5fd', border: 'rgba(147, 197, 253, 0.3)', track: '#3b82f6', thumb: '#93c5fd', thumbHover: '#60a5fa' },
    bride: { bg: 'rgba(6, 182, 212, 1)', text: 'white', accent: '#67e8f9', border: 'rgba(103, 232, 249, 0.3)', track: '#06b6d4', thumb: '#67e8f9', thumbHover: '#22d3ee' },
    groom: { bg: 'rgba(20, 184, 166, 1)', text: 'white', accent: '#5eead4', border: 'rgba(94, 234, 212, 0.3)', track: '#14b8a6', thumb: '#5eead4', thumbHover: '#2dd4bf' },
    journey: { bg: 'rgba(16, 185, 129, 1)', text: 'white', accent: '#6ee7b7', border: 'rgba(110, 231, 183, 0.3)', track: '#10b981', thumb: '#6ee7b7', thumbHover: '#34d399' },
    gallery: { bg: 'rgba(132, 204, 22, 1)', text: '#365314', accent: '#bef264', border: 'rgba(190, 242, 100, 0.3)', track: '#84cc16', thumb: '#bef264', thumbHover: '#a3e635' },
    proposal: { bg: 'rgba(234, 179, 8, 1)', text: '#713f12', accent: '#fde047', border: 'rgba(253, 224, 71, 0.3)', track: '#eab308', thumb: '#fde047', thumbHover: '#facc15' },
    celebration: { bg: 'rgba(245, 158, 11, 1)', text: 'white', accent: '#fcd34d', border: 'rgba(252, 211, 77, 0.3)', track: '#f59e0b', thumb: '#fcd34d', thumbHover: '#fbbf24' },
    details: { bg: 'rgba(251, 146, 60, 1)', text: 'white', accent: '#fdba74', border: 'rgba(253, 186, 116, 0.3)', track: '#fb923c', thumb: '#fdba74', thumbHover: '#f97316' },
    rsvp: { bg: 'rgba(234, 88, 12, 1)', text: 'white', accent: '#fed7aa', border: 'rgba(254, 215, 170, 0.3)', track: '#ea580c', thumb: '#fed7aa', thumbHover: '#fb923c' },
  };

  const [colors, setColors] = useState(sectionColors.hero);
  const [scrolled, setScrolled] = useState(false);

  // Update CSS variables for scrollbar when colors change
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--scrollbar-track', colors.track);
    root.style.setProperty('--scrollbar-thumb', colors.thumb);
    root.style.setProperty('--scrollbar-thumb-hover', colors.thumbHover);
    root.style.setProperty('--selection-bg', colors.accent);
    root.style.setProperty('--selection-text', colors.track);
  }, [colors]);

  // Detect current section based on scroll position
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);

    const sections = ['hero', 'story', 'bride', 'groom', 'journey', 'gallery', 'proposal', 'celebration', 'details', 'rsvp'];

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i]);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100) {
          if (currentSection !== sections[i]) {
            setCurrentSection(sections[i]);
            setColors(sectionColors[sections[i]]);
          }
          break;
        }
      }
    }
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const wedding = new Date(weddingDate + 'T16:00:00');
      const now = new Date();
      const diff = wedding - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown({ days, hours, minutes, seconds });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [weddingDate]);

  const navLinks = [
    { label: 'Our Story', href: '#story' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Details', href: '#details' },
    { label: 'RSVP', href: '#rsvp' },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const pad = (num) => num.toString().padStart(2, '0');

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white shadow-sm"
      style={{
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: 'rgba(0,0,0,0.1)',
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => scrollToSection(e, '#hero')}
            className="text-xl md:text-2xl transition-colors duration-500 text-black"
            whileHover={{ color: colors.accent }}
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            C & B
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-xs tracking-[0.2em] uppercase font-bold transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm px-2 py-1 text-gray-700"
                whileHover={{ color: colors.accent }}
                style={{ '--tw-ring-color': colors.accent }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Enhanced Countdown Timer */}
          <motion.div
            className="hidden md:flex items-center px-4 py-2 gap-1 rounded-sm relative overflow-hidden shadow-lg"
            animate={{
              background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.thumbHover} 100%)`,
            }}
            style={{
              boxShadow: `0 4px 16px ${colors.accent}40, inset 0 1px 0 rgba(255,255,255,0.2)`,
            }}
          >
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
            <div className="flex flex-col items-center px-2 relative z-10">
              <motion.span
                className="font-bold text-lg leading-none"
                animate={{ color: colors.bg }}
                transition={{ duration: 0.5 }}
                style={{
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  fontVariantNumeric: 'tabular-nums'
                }}
              >
                {countdown.days}
              </motion.span>
              <motion.span
                className="text-[10px] uppercase tracking-wider font-semibold"
                animate={{ color: colors.bg }}
                transition={{ duration: 0.5 }}
                style={{ opacity: 0.9 }}
              >
                days
              </motion.span>
            </div>
            <motion.span
              className="font-bold relative z-10"
              animate={{ color: colors.bg }}
              transition={{ duration: 0.5 }}
            >
              :
            </motion.span>
            <div className="flex flex-col items-center px-2 relative z-10">
              <motion.span
                className="font-bold text-lg leading-none"
                animate={{ color: colors.bg }}
                transition={{ duration: 0.5 }}
                style={{
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  fontVariantNumeric: 'tabular-nums'
                }}
              >
                {pad(countdown.hours)}
              </motion.span>
              <motion.span
                className="text-[10px] uppercase tracking-wider font-semibold"
                animate={{ color: colors.bg }}
                transition={{ duration: 0.5 }}
                style={{ opacity: 0.9 }}
              >
                hrs
              </motion.span>
            </div>
            <motion.span
              className="font-bold relative z-10"
              animate={{ color: colors.bg }}
              transition={{ duration: 0.5 }}
            >
              :
            </motion.span>
            <div className="flex flex-col items-center px-2 relative z-10">
              <motion.span
                className="font-bold text-lg leading-none"
                animate={{ color: colors.bg }}
                transition={{ duration: 0.5 }}
                style={{
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  fontVariantNumeric: 'tabular-nums'
                }}
              >
                {pad(countdown.minutes)}
              </motion.span>
              <motion.span
                className="text-[10px] uppercase tracking-wider font-semibold"
                animate={{ color: colors.bg }}
                transition={{ duration: 0.5 }}
                style={{ opacity: 0.9 }}
              >
                min
              </motion.span>
            </div>
            <motion.span
              className="font-bold relative z-10"
              animate={{ color: colors.bg }}
              transition={{ duration: 0.5 }}
            >
              :
            </motion.span>
            <div className="flex flex-col items-center px-2 relative z-10">
              <motion.span
                className="font-bold text-lg leading-none"
                animate={{ color: colors.bg }}
                transition={{ duration: 0.5 }}
                style={{
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  fontVariantNumeric: 'tabular-nums'
                }}
              >
                {pad(countdown.seconds)}
              </motion.span>
              <motion.span
                className="text-[10px] uppercase tracking-wider font-semibold"
                animate={{ color: colors.bg }}
                transition={{ duration: 0.5 }}
                style={{ opacity: 0.9 }}
              >
                sec
              </motion.span>
            </div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 transition-colors duration-500 text-black"
            whileHover={{ color: colors.accent }}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-4 pb-4 border-t rounded-b-lg backdrop-blur-md"
            style={{
              borderTopColor: colors.border,
              backgroundColor: `${colors.bg}f0`
            }}
          >
            <div className="flex flex-col space-y-3 pt-4">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-xs tracking-[0.2em] uppercase py-2 font-bold"
                  style={{ color: `${colors.text}cc` }}
                >
                  {link.label}
                </motion.a>
              ))}
              {/* Mobile Countdown */}
              <div
                className="flex items-center px-3 py-2 gap-1 w-fit mt-2"
                style={{ backgroundColor: colors.accent }}
              >
                <div className="flex flex-col items-center px-1.5">
                  <span className="font-bold text-sm leading-none" style={{ color: colors.bg }}>{countdown.days}</span>
                  <span className="text-[8px] uppercase" style={{ color: colors.bg }}>days</span>
                </div>
                <span className="font-bold text-sm" style={{ color: colors.bg }}>:</span>
                <div className="flex flex-col items-center px-1.5">
                  <span className="font-bold text-sm leading-none" style={{ color: colors.bg }}>{pad(countdown.hours)}</span>
                  <span className="text-[8px] uppercase" style={{ color: colors.bg }}>hrs</span>
                </div>
                <span className="font-bold text-sm" style={{ color: colors.bg }}>:</span>
                <div className="flex flex-col items-center px-1.5">
                  <span className="font-bold text-sm leading-none" style={{ color: colors.bg }}>{pad(countdown.minutes)}</span>
                  <span className="text-[8px] uppercase" style={{ color: colors.bg }}>min</span>
                </div>
                <span className="font-bold text-sm" style={{ color: colors.bg }}>:</span>
                <div className="flex flex-col items-center px-1.5">
                  <span className="font-bold text-sm leading-none" style={{ color: colors.bg }}>{pad(countdown.seconds)}</span>
                  <span className="text-[8px] uppercase" style={{ color: colors.bg }}>sec</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navigation;
