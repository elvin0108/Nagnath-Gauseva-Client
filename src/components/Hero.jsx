import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaArrowDown } from 'react-icons/fa';

const stats = [
  { value: '500+', label: 'Cows Sheltered' },
  { value: '1000+', label: 'Treatments' },
  { value: '\u221E', label: 'Serving Since Years' },
];

const Hero = () => {
  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background Image with Ken Burns Effect */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          scale: [1, 1.08, 1.04, 1.1],
          x: ['0%', '-1.5%', '0.5%', '-1%'],
          y: ['0%', '-0.5%', '-1%', '0%'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      >
        <img
          src="/images/IMG-20260920-WA0032.jpg"
          alt="Cows grazing peacefully in the open fields of Ishvariya"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Dark Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/70 via-charcoal-900/50 to-charcoal-950/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/40 via-transparent to-charcoal-950/40" />
      {/* Bottom vignette for stats strip */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-charcoal-950/90 to-transparent" />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 pt-24 pb-12 sm:pt-28 sm:pb-20 flex-1 flex flex-col justify-center items-center text-center">

        {/* Decorative top flourish */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-20 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mb-8"
        />

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
          className="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] tracking-tight"
          style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}
        >
          Shree Nagnath
          <br />
          <span className="text-gold-300">Gauseva Trust</span>
        </motion.h1>

        {/* Gujarati Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-5 font-gujarati text-lg sm:text-xl md:text-2xl text-gold-400 tracking-wide"
          style={{ textShadow: '0 2px 15px rgba(0,0,0,0.4)' }}
        >
          શ્રી નાગનાથ ગૌ સેવા ટ્રસ્ટ &mdash; ઈશ્વરીયા
        </motion.p>

        {/* English Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-4 font-body text-base sm:text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed"
          style={{ textShadow: '0 1px 10px rgba(0,0,0,0.3)' }}
        >
          Protecting and Serving Gau Mata with Love &amp; Devotion
        </motion.p>

        {/* Spiritual Quote Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mt-6 mx-4 sm:mx-auto max-w-md"
        >
          <div className="relative rounded-2xl overflow-hidden">
            {/* Glowing border effect */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-gold-400/40 via-gold-300/60 to-gold-400/40" />
            <div className="relative bg-charcoal-900/60 backdrop-blur-md rounded-2xl px-6 sm:px-8 py-4 sm:py-5 border border-gold-400/20">
              <p className="font-gujarati text-lg sm:text-xl md:text-2xl text-gold-300 font-semibold leading-relaxed">
                &#8220;ગૌ સેવા એ જ પ્રભુ સેવા&#8221;
              </p>
              <p className="mt-1 font-body text-xs sm:text-sm text-white/50 italic">
                &mdash; Gau Seva is Service to God
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Donate Now - Solid Gold */}
          <Link
            to="/donate"
            className="group inline-flex items-center gap-2.5 px-6 py-3.5 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-white font-heading font-bold text-lg shadow-2xl shadow-gold-600/30 hover:shadow-gold-500/50 hover:from-gold-400 hover:to-gold-500 hover:scale-105 active:scale-[0.98] transition-all duration-300"
          >
            <FaHeart className="text-base group-hover:animate-pulse" />
            Donate Now
          </Link>

          {/* Our Mission - Outline White */}
          <a
            href="#about"
            onClick={(e) => handleSmoothScroll(e, '#about')}
            className="inline-flex items-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 rounded-full border-2 border-white/40 text-white font-heading font-semibold text-lg hover:bg-white/10 hover:border-white/70 hover:scale-105 active:scale-[0.98] transition-all duration-300 backdrop-blur-sm"
          >
            Our Mission
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="relative z-10 pb-8 flex justify-center"
      >
        <a
          href="#about"
          onClick={(e) => handleSmoothScroll(e, '#about')}
          className="flex flex-col items-center gap-2 text-white/40 hover:text-white/80 transition-colors duration-300"
          aria-label="Scroll down"
        >
          <span className="text-[10px] font-body tracking-[0.25em] uppercase">
            Scroll Down
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FaArrowDown className="text-sm" />
          </motion.div>
        </a>
      </motion.div>

      {/* Bottom Stats Strip */}
      <div className="relative z-10 bg-charcoal-900/60 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0"
          >
            {stats.map((stat, index) => (
              <React.Fragment key={stat.label}>
                <div className="flex flex-col items-center sm:px-10">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.8 + index * 0.15 }}
                    className="font-heading text-2xl sm:text-3xl font-bold text-gold-400"
                  >
                    {stat.value}
                  </motion.span>
                  <span className="mt-0.5 font-body text-xs sm:text-sm text-white/60 tracking-wide">
                    {stat.label}
                  </span>
                </div>
                {index < stats.length - 1 && (
                  <div className="hidden sm:block w-px h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
