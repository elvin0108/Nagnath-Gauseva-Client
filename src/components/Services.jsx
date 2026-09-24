import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaHome, FaMedkit, FaUtensils, FaAmbulance, FaHardHat, FaHeart } from 'react-icons/fa';

const Services = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const services = [
    {
      key: 'shelter',
      icon: <FaHome className="text-3xl" />,
      title: 'Shelter & Care',
      titleGuj: 'આશ્રય અને સંભાળ',
      description:
        'Providing safe, clean and comfortable shelter to abandoned and stray cows who have nowhere to go. Every cow gets a permanent, loving home.',
      photo: '/images/IMG-20260920-WA0040.jpg',
      gradient: 'from-saffron-700/80 via-saffron-800/70 to-forest-900/80',
    },
    {
      key: 'medical',
      icon: <FaMedkit className="text-3xl" />,
      title: 'Medical Treatment',
      titleGuj: 'તબીબી સારવાર',
      description:
        'Emergency and ongoing medical care for injured, sick and malnourished cows. We treat wounds, fractures and diseases with dedicated veterinary support.',
      photo: '/images/IMG-20260920-WA0037.jpg',
      gradient: 'from-forest-700/80 via-forest-800/70 to-charcoal-900/80',
    },
    {
      key: 'feeding',
      icon: <FaUtensils className="text-3xl" />,
      title: 'Daily Feeding',
      titleGuj: 'દૈનિક ભોજન',
      description:
        'Nutritious daily meals including fresh green fodder, dry grass, grains and clean water for every cow. No cow goes hungry at our gaushala.',
      photo: '/images/IMG-20260920-WA0075.jpg',
      gradient: 'from-gold-700/80 via-gold-800/70 to-forest-900/80',
    },
    {
      key: 'rescue',
      icon: <FaAmbulance className="text-3xl" />,
      title: 'Rescue Operations',
      titleGuj: 'બચાવ કામગીરી',
      description:
        'Rescuing injured and abandoned cows from roads, accident sites and difficult locations. Our team responds quickly to bring them to safety.',
      photo: '/images/IMG-20260920-WA0034.jpg',
      gradient: 'from-red-800/80 via-red-900/70 to-charcoal-900/80',
    },
    {
      key: 'maintenance',
      icon: <FaHardHat className="text-3xl" />,
      title: 'Gaushala Maintenance',
      titleGuj: 'ગૌશાળા જાળવણી',
      description:
        'Maintaining our modern gaushala with the best facilities for 500+ cows. Our dedicated workers ensure clean, safe and comfortable living conditions every day.',
      photo: '/images/IMG-20260920-WA0044.jpg',
      gradient: 'from-charcoal-800/80 via-charcoal-900/70 to-saffron-900/80',
    },
    {
      key: 'love',
      icon: <FaHeart className="text-3xl" />,
      title: 'Love & Care',
      titleGuj: 'પ્રેમ અને સેવા',
      description:
        'Providing love, attention and gentle care to every cow and calf like our own family. Each one is treated with affection, dignity and respect.',
      photo: '/images/IMG-20260920-WA0007.jpg',
      gradient: 'from-saffron-600/80 via-saffron-700/70 to-gold-900/80',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-14 md:py-28 bg-gradient-to-b from-cream-100 via-white to-cream-50 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-64 h-64 rounded-full bg-saffron-100/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-48 h-48 rounded-full bg-gold-100/40 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-gold-100 to-saffron-100 border border-gold-300/50 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-gold-500" />
              <span className="font-body text-sm font-semibold uppercase tracking-widest text-gold-700">
                Our Services
              </span>
              <span className="w-2 h-2 rounded-full bg-gold-500" />
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-forest-800">
            What We Do
          </h2>
          <p className="mt-2 font-gujarati text-lg text-saffron-600 font-medium">
            {"અમારી સેવાઓ"}
          </p>
          <div className="mt-5 mx-auto w-28 h-1 rounded-full bg-gradient-to-r from-saffron-400 via-gold-500 to-saffron-400" />
          <p className="mt-6 font-body text-lg text-forest-600 max-w-2xl mx-auto">
            Every day, our dedicated team works tirelessly to serve and protect Gau Mata
            through these essential services.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.key}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 cursor-pointer h-[300px] sm:h-[340px] md:h-[360px]"
            >
              {/* Photo Background */}
              <div className="absolute inset-0">
                <img
                  src={service.photo}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${service.gradient} transition-opacity duration-500 group-hover:opacity-80 opacity-90`}
              />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-7">
                {/* Icon */}
                <div className="mb-auto pt-2">
                  <div className="w-14 h-14 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-gold-300 group-hover:bg-white/25 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    {service.icon}
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-gold-200 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="font-gujarati text-gold-300/80 text-xs mb-3">
                    {service.titleGuj}
                  </p>
                  <p className="font-body text-white/80 text-sm leading-relaxed line-clamp-3 group-hover:text-white/90 transition-colors duration-300">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Bottom accent bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-400 via-saffron-400 to-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
