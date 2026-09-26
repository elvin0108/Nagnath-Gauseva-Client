import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaHandsHelping, FaEye, FaMapMarkerAlt, FaIdCard } from 'react-icons/fa';
import { GiCow } from 'react-icons/gi';

const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-14 md:py-28 bg-cream-100 overflow-hidden"
    >
      {/* Decorative Patterns */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-saffron-200/30 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full bg-gold-200/30 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-saffron-100/20 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-gold-100 to-saffron-100 border border-gold-300/50 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-gold-500" />
              <span className="font-body text-sm font-semibold uppercase tracking-widest text-gold-700">
                About Us
              </span>
              <span className="w-2 h-2 rounded-full bg-gold-500" />
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-forest-800"
          >
            Inspired by Shree Nagnath Bapu
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-3 font-gujarati text-lg md:text-xl text-saffron-600 font-medium"
          >
            {"ગૌ માતા ની સેવા માં સમર્પિત"}
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="mt-5 mx-auto w-28 h-1 rounded-full bg-gradient-to-r from-saffron-400 via-gold-500 to-saffron-400"
          />
        </motion.div>

        {/* Two Column Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"
        >
          {/* Image Composition (Left) */}
          <motion.div variants={itemVariants} className="relative mb-12 lg:mb-0">
            {/* Main Shree Nagnath Bapu Image */}
            <div className="relative z-10">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-gold-400/60">
                {/* Golden inner border */}
                <div className="absolute inset-0 border-2 border-gold-300/40 rounded-xl z-10 pointer-events-none m-1" />
                <img
                  src="/images/IMG-20260920-WA0038.jpg"
                  alt="Shree Nagnath Bapu - Our Spiritual Inspiration"
                  className="w-full aspect-[4/3] object-cover"
                />
                {/* Subtle golden gradient overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 z-10">
                  <p className="font-heading text-white text-sm md:text-base font-semibold drop-shadow-lg">
                    Shree Nagnath Bapu
                  </p>
                  <p className="font-gujarati text-gold-300 text-xs drop-shadow-lg">
                    {"અમારી પ્રેરણા"}
                  </p>
                </div>
              </div>
              {/* Decorative golden frame shadow */}
              <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-gold-400/30 rounded-2xl -z-10" />
              <div className="absolute -bottom-6 -right-6 w-full h-full border border-gold-300/15 rounded-2xl -z-20" />
            </div>

            {/* Smaller Gaushala Image - overlapping */}
            <motion.div
              variants={itemVariants}
              className="relative z-20 -mt-12 ml-auto mr-2 sm:mr-4 md:mr-0 md:-mt-20 md:ml-auto w-[50%] md:w-[50%]"
            >
              <div className="rounded-xl overflow-hidden shadow-xl border-3 border-white">
                <img
                  src="/images/IMG-20260920-WA0040.jpg"
                  alt="Our Gaushala - Large herd of rescued cows"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/50 to-transparent" />
                <p className="absolute bottom-2 left-0 right-0 text-center font-body text-white text-xs font-medium drop-shadow-lg">
                  Our Gaushala
                </p>
              </div>
            </motion.div>

            {/* Floating Years Badge */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="absolute -bottom-4 left-4 md:left-0 z-30 bg-white rounded-xl shadow-lg px-5 py-3 flex items-center gap-3 border border-gold-200"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-400 to-saffron-500 flex items-center justify-center text-white text-xl shadow-md">
                <FaHandsHelping />
              </div>
              <div>
                <p className="font-heading font-bold text-forest-800 text-2xl leading-tight">
                  10+
                </p>
                <p className="font-body text-forest-600 text-xs">
                  Years of Seva
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Content (Right) */}
          <motion.div variants={itemVariants} className="space-y-7 pt-2">
            {/* Our Inspiration */}
            <div className="group">
              <h3 className="font-heading text-xl md:text-2xl font-bold text-forest-800 mb-3 flex items-center gap-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-gold-400 to-saffron-500 flex items-center justify-center text-white shadow-sm">
                  <GiCow className="text-lg" />
                </span>
                Our Inspiration
              </h3>
              <p className="font-body text-forest-700 leading-relaxed pl-0 sm:pl-[52px]">
                Shree Nagnath Gauseva Trust was established following the divine
                teachings of revered Shree Nagnath Bapu, to serve and protect Gau Mata
                (mother cow). Located in the peaceful village of Ishvariya, our trust
                carries forward the sacred mission of Gau Seva with unwavering
                devotion and selfless service. Our workers tirelessly build and
                maintain the gaushala, inspired by Shree Nagnath Bapu's compassion for
                all living beings.
              </p>
            </div>

            {/* Our Mission */}
            <div className="group">
              <h3 className="font-heading text-xl md:text-2xl font-bold text-forest-800 mb-3 flex items-center gap-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-saffron-400 to-saffron-600 flex items-center justify-center text-white shadow-sm">
                  <FaHandsHelping className="text-lg" />
                </span>
                Our Mission
              </h3>
              <p className="font-body text-forest-700 leading-relaxed pl-0 sm:pl-[52px]">
                To rescue abandoned, injured and sick cows from the streets and
                provide them with safe shelter, nutritious food and proper medical
                care. Our modern gaushala houses 500+ cows with the best
                facilities. Every cow that comes to us receives love, treatment
                and a permanent home.
              </p>
            </div>

            {/* Our Vision */}
            <div className="group">
              <h3 className="font-heading text-xl md:text-2xl font-bold text-forest-800 mb-3 flex items-center gap-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-forest-400 to-forest-600 flex items-center justify-center text-white shadow-sm">
                  <FaEye className="text-lg" />
                </span>
                Our Vision
              </h3>
              <p className="font-body text-forest-700 leading-relaxed pl-0 sm:pl-[52px]">
                A world where no cow is left abandoned or suffering on the streets.
                Every Gau Mata deserves love, care and dignity. We envision a
                future where communities come together to protect and serve these
                gentle, sacred beings who give so much to us.
              </p>
            </div>

            {/* Location & Registration Info */}
            <div className="bg-gradient-to-br from-cream-200 to-cream-300 border border-gold-300/40 rounded-xl p-5 space-y-3 shadow-sm">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-saffron-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-heading font-semibold text-forest-800 text-sm">
                    Location
                  </p>
                  <p className="font-body text-forest-700 text-sm">
                    Mu. Ishvariya ({"ઈશ્વરીયા"}), Ta. Jasdan, Dist. Rajkot, Gujarat
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaIdCard className="text-saffron-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-heading font-semibold text-forest-800 text-sm">
                    Trust Registration
                  </p>
                  <p className="font-body text-forest-700 text-sm">
                    Registered Trust No: 3891/Guj.4968/Rajkot
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
