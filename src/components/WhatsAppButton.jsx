import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const phoneNumber = '+919023263763';
  const message = encodeURIComponent(
    'Hello, I want to know more about Shree Nagnath Gauseva Trust'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${message}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: 'spring',
        damping: 15,
        stiffness: 200,
        delay: 2,
      }}
      className="fixed bottom-6 left-6 z-40"
    >
      {/* Tooltip */}
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 whitespace-nowrap bg-charcoal-900 text-white font-body text-sm px-3 py-1.5 rounded-lg shadow-lg"
        >
          Chat with us
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-charcoal-900 rotate-45" />
        </motion.div>
      )}

      {/* Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        aria-label="Chat with us on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] text-white shadow-xl shadow-green-500/30 hover:shadow-green-500/50 hover:scale-110 transition-all duration-300"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        <FaWhatsapp className="relative text-2xl md:text-3xl" />
      </a>
    </motion.div>
  );
};

export default WhatsAppButton;
