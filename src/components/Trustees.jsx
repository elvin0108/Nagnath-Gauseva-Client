import React from 'react';
import { motion } from 'framer-motion';
import {
  FaPhone,
  FaCertificate,
  FaFileAlt,
  FaSearchDollar,
} from 'react-icons/fa';

const trusteesData = [
  {
    id: 1,
    name: 'Trustee Member',
    designation: 'President',
    bio: 'Committed to the welfare and protection of cows with years of seva experience.',
    phone: '+91-XXXXX-XXXXX',
    initials: 'RP',
    gradientFrom: 'from-saffron-400',
    gradientTo: 'to-saffron-600',
  },
  {
    id: 2,
    name: 'Trustee Member',
    designation: 'Secretary',
    bio: 'Dedicated to managing trust operations and ensuring transparency in all activities.',
    phone: '+91-XXXXX-XXXXX',
    initials: 'MS',
    gradientFrom: 'from-forest-400',
    gradientTo: 'to-forest-600',
  },
  {
    id: 3,
    name: 'Trustee Member',
    designation: 'Treasurer',
    bio: 'Overseeing financial management with complete accountability and dedication.',
    phone: '+91-XXXXX-XXXXX',
    initials: 'DJ',
    gradientFrom: 'from-gold-400',
    gradientTo: 'to-gold-600',
  },
  {
    id: 4,
    name: 'Trustee Member',
    designation: 'Trustee',
    bio: 'Active participant in daily gaushala operations and cow rescue missions.',
    phone: '+91-XXXXX-XXXXX',
    initials: 'SD',
    gradientFrom: 'from-saffron-500',
    gradientTo: 'to-forest-500',
  },
];

const verificationItems = [
  {
    icon: FaCertificate,
    title: 'Registered Trust',
    description: 'Reg. No: 3891/Guj.4968/Rajkot',
    color: 'text-saffron-600',
    bg: 'bg-saffron-100',
  },
  {
    icon: FaFileAlt,
    title: '80G Tax Benefit',
    description: 'Donations are tax deductible under section 80G',
    color: 'text-forest-600',
    bg: 'bg-forest-100',
  },
  {
    icon: FaSearchDollar,
    title: 'Transparent Operations',
    description: 'Regular audits and financial reports published',
    color: 'text-gold-600',
    bg: 'bg-gold-100',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
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

const Trustees = () => {
  return (
    <section id="trustees" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-saffron-100 text-saffron-700 rounded-full text-sm font-body font-semibold mb-4">
            Leadership
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-forest-900 mb-2">
            Our Team
          </h2>
          <p className="font-gujarati text-lg text-saffron-600 mb-4">
            {"\""}amari teem{"\""}
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-saffron-400 to-gold-500 mx-auto rounded-full mb-6" />
          <p className="font-body text-lg text-gray-600 max-w-2xl mx-auto">
            Guided by compassion and driven by service, our dedicated team works tirelessly for Gau Seva.
          </p>
        </motion.div>

        {/* Trustees Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
          {trusteesData.map((trustee, index) => (
            <motion.div
              key={trustee.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
            >
              {/* Card top gradient bar */}
              <div
                className={`h-1.5 bg-gradient-to-r ${trustee.gradientFrom} ${trustee.gradientTo}`}
              />

              <div className="p-6 text-center">
                {/* Avatar */}
                <div
                  className={`w-20 h-20 rounded-full bg-gradient-to-br ${trustee.gradientFrom} ${trustee.gradientTo} flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-105 transition-transform duration-300`}
                >
                  <span className="font-heading text-xl font-bold text-white">
                    {trustee.initials}
                  </span>
                </div>

                {/* Name */}
                <h3 className="font-heading text-base font-bold text-forest-900 mb-1">
                  {trustee.name}
                </h3>

                {/* Designation */}
                <span className="inline-block px-3 py-1 bg-saffron-50 text-saffron-700 rounded-full text-xs font-body font-semibold mb-3">
                  {trustee.designation}
                </span>

                {/* Bio */}
                <p className="font-body text-sm text-gray-500 mb-4 leading-relaxed">
                  {trustee.bio}
                </p>

                {/* Phone */}
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <FaPhone className="w-3 h-3" />
                  <span className="font-body text-xs">{trustee.phone}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Verification Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-forest-900 text-center mb-10">
            Trust Verification
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {verificationItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100 hover:shadow-md transition-shadow duration-300"
                >
                  <div
                    className={`w-14 h-14 ${item.bg} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className={`w-7 h-7 ${item.color}`} />
                  </div>
                  <h4 className="font-heading text-base font-bold text-forest-900 mb-2">
                    {item.title}
                  </h4>
                  <p className="font-body text-sm text-gray-600">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Trustees;
