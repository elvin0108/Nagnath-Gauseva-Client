import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { FaHeart, FaHandHoldingHeart, FaLock, FaRupeeSign } from 'react-icons/fa';
import { GiCow, GiWheat } from 'react-icons/gi';
import { FaMedkit } from 'react-icons/fa';

const Campaign = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');

  const donationOptions = [
    { amount: 500, description: 'Feed 3 cows for a day' },
    { amount: 1100, description: 'One week of fodder' },
    { amount: 2100, description: 'Medical care for 1 cow' },
    { amount: 5100, description: 'Monthly care for 2 cows' },
    { amount: 11000, description: 'Full medical treatment' },
    { amount: 21000, description: 'Sponsor a cow for a year' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const handleDonate = () => {
    const amount = selectedAmount || customAmount;
    if (amount) {
      const target = document.querySelector('#contact');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="campaign"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Background: Photo with very dark overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/IMG-20260920-WA0040.jpg"
          alt="Cows at our gaushala"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal-950/95" />
      </div>

      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(212,168,67,0.5) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Decorative glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-saffron-600/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-gold-500/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-gold-500/15 border border-gold-400/30 mb-8 backdrop-blur-sm">
              <FaHeart className="text-gold-400" />
              <span className="font-body font-bold text-gold-300 text-sm uppercase tracking-wider">
                Support Gau Seva
              </span>
              <FaHeart className="text-gold-400" />
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Help Us Care for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-saffron-400">
                Gau Mata
              </span>
            </h2>
            <p className="mt-3 font-gujarati text-lg text-gold-400/80 font-medium">
              {"ગૌ માતા ની સેવા માં સહાય કરો"}
            </p>
            <div className="mt-5 mx-auto w-28 h-1 rounded-full bg-gradient-to-r from-saffron-400 via-gold-400 to-saffron-400" />

            <p className="mt-6 font-body text-lg md:text-xl text-gold-100/60 max-w-3xl mx-auto leading-relaxed">
              Our gaushala is home to 500+ cows who need daily feeding, medical care and love.
              Your donation directly provides food, medicine and shelter to these gentle beings.{' '}
              <span className="text-gold-300 font-semibold">Every rupee counts.</span>{' '}
              Help us continue this sacred mission of Gau Seva.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6"
          >
            <div className="bg-white/5 backdrop-blur-md border border-gold-500/20 rounded-xl p-6 text-center hover:bg-white/8 transition-colors duration-300">
              <GiWheat className="text-gold-400 text-3xl mx-auto mb-3" />
              <p className="font-heading font-bold text-2xl md:text-3xl text-white">
                {"Rs. 15,000"}
              </p>
              <p className="font-body text-gold-200/60 text-sm mt-1">
                Daily Feeding Cost
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-gold-500/20 rounded-xl p-6 text-center hover:bg-white/8 transition-colors duration-300">
              <GiCow className="text-gold-400 text-3xl mx-auto mb-3" />
              <p className="font-heading font-bold text-2xl md:text-3xl text-white">
                {"500+"}
              </p>
              <p className="font-body text-gold-200/60 text-sm mt-1">
                Cows Under Our Care
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-gold-500/20 rounded-xl p-6 text-center hover:bg-white/8 transition-colors duration-300">
              <FaMedkit className="text-saffron-400 text-3xl mx-auto mb-3" />
              <p className="font-heading font-bold text-2xl md:text-3xl text-saffron-300">
                {"Rs. 4,50,000"}
              </p>
              <p className="font-body text-saffron-200/60 text-sm mt-1">
                Monthly Care Expense
              </p>
            </div>
          </motion.div>

          {/* Quick Donate Buttons */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="font-heading text-xl md:text-2xl font-bold text-white text-center">
              <FaHandHoldingHeart className="inline mr-2 text-gold-400" />
              Choose Your Donation
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
              {donationOptions.map((option) => (
                <button
                  key={option.amount}
                  onClick={() => {
                    setSelectedAmount(option.amount);
                    setCustomAmount('');
                  }}
                  className={`relative group rounded-xl p-4 md:p-5 text-center transition-all duration-300 border-2 ${
                    selectedAmount === option.amount
                      ? 'border-gold-400 bg-gold-500/15 shadow-lg shadow-gold-500/20 scale-105'
                      : 'border-white/10 bg-white/5 hover:border-gold-500/40 hover:bg-white/8'
                  }`}
                >
                  <p className="font-heading font-bold text-xl md:text-2xl text-gold-400">
                    <FaRupeeSign className="inline text-sm mr-0.5 -mt-1" />
                    {option.amount.toLocaleString('en-IN')}
                  </p>
                  <p className="font-body text-xs md:text-sm text-gold-100/50 mt-1 leading-snug">
                    {option.description}
                  </p>
                </button>
              ))}
            </div>

            {/* Custom Amount Input */}
            <div className="max-w-md mx-auto">
              <div
                className={`rounded-xl p-4 transition-all duration-300 border-2 ${
                  selectedAmount === null && customAmount
                    ? 'border-gold-400 bg-gold-500/15 shadow-lg shadow-gold-500/20'
                    : 'border-white/10 bg-white/5'
                }`}
              >
                <p className="font-heading font-semibold text-sm text-gold-300 mb-2 text-center">
                  Or enter a custom amount
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-gold-400 font-heading font-bold text-lg">
                    <FaRupeeSign />
                  </span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    placeholder="Enter amount..."
                    className="w-full bg-white/10 border border-white/15 rounded-lg px-4 py-2.5 text-white font-body text-base focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 placeholder-white/30 transition-colors duration-200"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Donate CTA */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <Link
              to="/donate"
              className="inline-flex items-center gap-3 px-12 py-4 rounded-full bg-gradient-to-r from-gold-500 via-saffron-500 to-gold-500 text-white font-heading font-bold text-lg shadow-2xl shadow-saffron-500/25 hover:shadow-saffron-500/40 hover:scale-105 active:scale-100 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Shimmer on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <FaHeart className="animate-pulse relative z-10" />
              <span className="relative z-10">Donate Now</span>
            </Link>

            <div className="flex items-center justify-center gap-2 text-white/30">
              <FaLock className="text-xs" />
              <p className="font-body text-sm">
                Secure Payment &bull; Your donation is tax-exempt
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Campaign;
