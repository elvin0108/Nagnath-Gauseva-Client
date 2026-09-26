import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const FloatingDonate = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  // Hide on /donate page since that page is already the donate page
  const isDonatePage = location.pathname === '/donate';

  useEffect(() => {
    if (isDonatePage) return;

    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setIsVisible(window.scrollY > heroHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDonatePage]);

  if (isDonatePage) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 80 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          className="fixed right-3 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 group"
        >
          {/* Button body */}
          <Link
            to="/donate"
            className="relative flex flex-col items-center gap-1.5 px-3 py-4 md:px-4 md:py-5 rounded-full bg-gradient-to-b from-gold-400 to-saffron-600 text-white shadow-xl shadow-saffron-500/30 hover:shadow-saffron-500/50 hover:scale-110 transition-all duration-300 overflow-hidden"
            aria-label="Donate now"
          >
            <FaHeart className="text-lg md:text-xl animate-pulse" />
            <span
              className="font-heading font-bold text-[10px] md:text-xs leading-tight hidden sm:block"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              DONATE
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingDonate;
