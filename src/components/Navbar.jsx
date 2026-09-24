import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaHeart } from 'react-icons/fa';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Our Work', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Donate', href: '#campaign' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navLinks.map((link) => link.href.substring(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(`#${sections[i]}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.08)] border-b border-gold-200/50'
          : 'bg-white/70 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-24">

          {/* Left: Logo + Trust Name */}
          <a
            href="#home"
            onClick={(e) => handleSmoothScroll(e, '#home')}
            className="flex items-center gap-3 flex-shrink-0 group"
          >
            {/* Logo Image */}
            <div className="relative w-10 h-10 md:w-16 md:h-16 flex-shrink-0">
              <img
                src="/images/logo (2).png"
                alt="Shree Nagnath Gauseva Trust Logo"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Trust Name */}
            <div className="hidden sm:block">
              <h1 className="font-heading text-sm md:text-base font-bold text-charcoal-800 leading-tight tracking-wide group-hover:text-gold-700 transition-colors duration-300">
                Shree Nagnath Gauseva Trust
              </h1>
              <p className="font-gujarati text-[11px] md:text-xs text-gold-600 leading-tight">
                ઈશ્વરીયા
              </p>
            </div>
          </a>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={`relative px-4 py-2 text-sm font-body font-medium rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'text-gold-700'
                      : 'text-charcoal-700 hover:text-gold-600'
                  }`}
                >
                  {link.label}
                  {/* Active indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right: Donate CTA + Mobile Hamburger */}
          <div className="flex items-center gap-3">
            {/* Donate Now CTA - Desktop */}
            <Link
              to="/donate"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-white font-heading font-semibold text-sm shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 hover:scale-105 hover:from-gold-600 hover:to-gold-700 transition-all duration-300"
            >
              <FaHeart className="text-xs" />
              Donate Now
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-lg text-charcoal-700 hover:bg-gold-50 hover:text-gold-700 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-charcoal-900/40 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Slide-in Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl lg:hidden z-50 flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-5 border-b border-gold-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex-shrink-0">
                    <img
                      src="/images/logo (2).png"
                      alt="Trust Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-sm text-charcoal-800">
                      Shree Nagnath
                    </h2>
                    <p className="font-gujarati text-[10px] text-gold-600">
                      ગૌ સેવા ટ્રસ્ટ
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-charcoal-700 hover:bg-gold-50 hover:text-gold-700 transition-colors"
                  aria-label="Close menu"
                >
                  <HiX className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Navigation */}
              <div className="flex-1 py-4 px-3 overflow-y-auto">
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.href;
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + index * 0.05, duration: 0.3 }}
                      className={`flex items-center px-4 py-3.5 mb-1 text-base font-body font-medium rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'text-gold-700 bg-gold-50 border-l-4 border-gold-500'
                          : 'text-charcoal-700 hover:text-gold-700 hover:bg-gold-50/60'
                      }`}
                    >
                      {link.label}
                    </motion.a>
                  );
                })}
              </div>

              {/* Drawer Footer - Donate CTA */}
              <div className="p-4 border-t border-gold-100 bg-cream-50">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                >
                  <Link
                    to="/donate"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-white font-heading font-semibold text-base shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 active:scale-[0.98] transition-all duration-300"
                  >
                    <FaHeart className="text-sm" />
                    Donate Now
                  </Link>
                </motion.div>
                <p className="text-center font-gujarati text-[11px] text-gold-600/80 mt-2">
                  ગૌ સેવા એ જ પ્રભુ સેવા
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
