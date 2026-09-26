import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaHeart,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUniversity,
  FaCopy,
  FaArrowUp,
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const socialLinks = [
  { icon: FaFacebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
  { icon: FaInstagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
  { icon: FaYoutube, href: '#', label: 'YouTube', color: 'hover:bg-red-600' },
  { icon: FaWhatsapp, href: 'https://wa.me/919023263763', label: 'WhatsApp', color: 'hover:bg-green-600' },
];

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Our Work', href: '#our-work' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Donate', href: '#donate' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  { label: 'Cow Shelter' },
  { label: 'Medical Treatment' },
  { label: 'Daily Feeding' },
  { label: 'Rescue Operations' },
  { label: 'Gaushala Maintenance' },
];

const bankDetailsList = [
  { label: 'Trust Name', value: 'Shree Nagnath Gauseva Trust' },
  { label: 'Bank', value: 'State Bank of India' },
  { label: 'A/C No', value: '42359812037' },
  { label: 'IFSC Code', value: 'SBIN0002641' },
];

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard!', { duration: 2000 });
    });
  };

  return (
    <footer className="bg-charcoal-950 text-white relative overflow-hidden">
      {/* Bank Details Banner */}
      <div className="bg-charcoal-900 border-b border-charcoal-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <FaUniversity className="w-6 h-6 text-gold-400" />
              <h3 className="font-heading text-xl font-bold text-gold-400">
                Donate via Bank Transfer
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
              {bankDetailsList.map((detail, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-charcoal-950/60 rounded-xl p-3.5 border border-charcoal-800"
                >
                  <div className="min-w-0 flex-1">
                    <span className="font-body text-xs text-gray-500 block">
                      {detail.label}
                    </span>
                    <span className="font-body text-sm text-white font-semibold truncate block">
                      {detail.value}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(detail.value)}
                    className="w-8 h-8 rounded-lg bg-charcoal-800 hover:bg-gold-500/20 flex items-center justify-center transition-colors ml-2 flex-shrink-0 group"
                    aria-label={`Copy ${detail.label}`}
                  >
                    <FaCopy className="w-3 h-3 text-gray-500 group-hover:text-gold-400 transition-colors" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-8 md:gap-10">
          {/* Column 1: Organization Info */}
          <div>
            <div className="mb-6">
              <h3 className="font-heading text-xl font-bold text-gold-400 mb-1">
                Shree Nagnath Gauseva Trust
              </h3>
              <p className="font-gujarati text-sm text-gold-400/70">
                {"શ્રી નાગનાથ ગૌ સેવા ટ્રસ્ટ"}
              </p>
            </div>
            <p className="font-body text-sm text-gray-400 leading-relaxed mb-6">
              Dedicated to the protection, shelter, and medical care of cows.
              Every life is sacred, every cow deserves love and care.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={social.label}
                    className={`w-10 h-10 rounded-full bg-charcoal-800 flex items-center justify-center text-gray-400 hover:text-white ${social.color} transition-all duration-300`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-bold text-white mb-6 relative">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gold-500 rounded-full" />
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-gray-400 hover:text-gold-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500/40 group-hover:bg-gold-400 transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div>
            <h4 className="font-heading text-lg font-bold text-white mb-6 relative">
              Our Services
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gold-500 rounded-full" />
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="font-body text-sm text-gray-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest-500/50" />
                    {service.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="font-heading text-lg font-bold text-white mb-6 relative">
              Contact Info
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gold-500 rounded-full" />
            </h4>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-4 h-4 text-gold-400 mt-1 flex-shrink-0" />
                <p className="font-body text-sm text-gray-400 leading-relaxed">
                  Mu. Ishvariya, Ta. Jasdan,<br />
                  Dist. Rajkot, Gujarat
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a
                  href="tel:+919023263763"
                  className="font-body text-sm text-gray-400 hover:text-gold-400 transition-colors"
                >
                  +91 90232 63763
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a
                  href="mailto:info@nagnathgauseva.org"
                  className="font-body text-sm text-gray-400 hover:text-gold-400 transition-colors"
                >
                  info@nagnathgauseva.org
                </a>
              </div>
            </div>

            {/* Final Donate CTA */}
            <Link
              to="/donate"
              className="mt-8 block w-full py-3 bg-gradient-to-r from-gold-500 to-saffron-500 hover:from-gold-600 hover:to-saffron-600 text-white font-heading font-bold text-center rounded-xl shadow-lg shadow-gold-500/20 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
            >
              <FaHeart className="inline w-4 h-4 mr-2 -mt-0.5" />
              Donate Now
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-charcoal-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Copyright */}
            <div className="font-body text-xs sm:text-sm text-gray-500 text-center md:text-left">
              <span>
                &copy; {new Date().getFullYear()} Shree Nagnath Gauseva Trust.
              </span>
              <span className="hidden sm:inline mx-2">|</span>
              <br className="sm:hidden" />
              <span className="inline-flex items-center gap-1">
                Made with
                <FaHeart className="w-3 h-3 text-red-500 inline" />
                for Gau Seva
              </span>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4 sm:gap-6">
              <a
                href="#"
                className="font-body text-xs sm:text-sm text-gray-500 hover:text-gold-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="font-body text-xs sm:text-sm text-gray-500 hover:text-gold-400 transition-colors"
              >
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-r from-gold-500 to-saffron-500 hover:from-gold-600 hover:to-saffron-600 text-white rounded-full shadow-lg shadow-gold-500/30 flex items-center justify-center z-40 transition-colors"
            aria-label="Scroll to top"
          >
            <FaArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
