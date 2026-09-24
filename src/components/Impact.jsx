import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import {
  GiCow,
  GiMedicines,
  GiMeal,
  GiSandsOfTime,
} from 'react-icons/gi';

const counterData = [
  {
    id: 1,
    icon: GiCow,
    end: 500,
    suffix: '+',
    label: 'Cows Sheltered',
    labelGuj: 'ગાયોને આશ્રય',
  },
  {
    id: 2,
    icon: GiMedicines,
    end: 1000,
    suffix: '+',
    label: 'Medical Treatments',
    labelGuj: 'તબીબી સારવાર',
  },
  {
    id: 3,
    icon: GiMeal,
    end: 50000,
    suffix: '+',
    label: 'Meals Served',
    labelGuj: 'ભોજન પીરસ્યા',
  },
  {
    id: 4,
    icon: GiSandsOfTime,
    end: 10,
    suffix: '+',
    label: 'Years of Seva',
    labelGuj: 'વર્ષોની સેવા',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const CounterCard = ({ data, index, inView }) => {
  const Icon = data.icon;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 p-7 md:p-8 text-center group overflow-hidden hover:bg-white/15 transition-all duration-300"
    >
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-gold-500/10 to-transparent pointer-events-none" />

      {/* Icon */}
      <div className="mx-auto w-16 h-16 rounded-full bg-gold-400/15 border border-gold-400/30 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-gold-400/25 transition-all duration-300">
        <Icon className="w-8 h-8 text-gold-400" />
      </div>

      {/* Counter */}
      <div className="font-heading text-4xl md:text-5xl font-bold text-white mb-2">
        {inView ? (
          <CountUp
            start={0}
            end={data.end}
            duration={2.5}
            separator=","
            suffix={data.suffix}
            useEasing
          />
        ) : (
          <span>0{data.suffix}</span>
        )}
      </div>

      {/* Label */}
      <p className="font-body text-base text-gold-200/90 mt-1">
        {data.label}
      </p>
      <p className="font-gujarati text-xs text-gold-300/50 mt-1">
        {data.labelGuj}
      </p>

      {/* Decorative corner */}
      <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-gold-400/5 group-hover:bg-gold-400/10 transition-colors duration-300" />
    </motion.div>
  );
};

const Impact = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section
      id="impact"
      className="relative py-14 md:py-28 overflow-hidden"
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <img
          src="/images/IMG-20260920-WA0008.jpg"
          alt="Majestic cows at sunset"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/85 via-charcoal-950/80 to-charcoal-950/90" />
      </div>

      {/* Subtle decorative pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-gold-400/30 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
              <span className="font-body text-sm font-semibold uppercase tracking-widest text-gold-300">
                Our Impact
              </span>
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            </span>
          </div>

          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
            Our Impact
          </h2>
          <p className="font-gujarati text-lg text-gold-300/70 mb-4">
            {"અમારી અસર"}
          </p>
          <div className="w-28 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto rounded-full mb-6" />
          <p className="font-body text-lg text-gold-100/60 max-w-2xl mx-auto">
            Through years of dedicated service and community support, we have touched
            the lives of hundreds of cows and made a real difference.
          </p>
        </motion.div>

        {/* Counter Cards Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto"
        >
          {counterData.map((data, index) => (
            <CounterCard
              key={data.id}
              data={data}
              index={index}
              inView={inView}
            />
          ))}
        </div>

        {/* Sanskrit Shlok Quote */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 max-w-3xl mx-auto text-center"
        >
          <div className="relative bg-white/8 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-gold-400/20 shadow-xl overflow-hidden">
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gold-400/40 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gold-400/40 rounded-br-2xl" />

            {/* Decorative element */}
            <div className="text-gold-400/60 text-5xl mb-4 font-heading leading-none">
              {"\""}
            </div>

            <blockquote className="font-heading text-2xl md:text-3xl text-gold-200 leading-relaxed mb-4">
              {"गावो विश्वस्य मातरः"}
            </blockquote>

            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto rounded-full my-4" />

            <p className="font-body text-base text-gold-100/70 mb-2 italic">
              "Cows are the mothers of the world"
            </p>

            <cite className="font-body text-sm text-gold-400/80 not-italic font-semibold">
              {"— Vedic Scripture"}
            </cite>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Impact;
