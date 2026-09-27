import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaPaperPlane,
  FaUser,
  FaEnvelope,
  FaTag,
  FaCommentDots,
  FaExclamationCircle,
  FaExclamationTriangle,
} from 'react-icons/fa';

const API_BASE = import.meta.env?.VITE_API_BASE_URL || '/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please enter a subject';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await axios.post(`${API_BASE}/contact/submit`, formData);

      toast.success('Message sent successfully! We will get back to you soon.', {
        duration: 4000,
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setErrors({});
    } catch (error) {
      const msg =
        error.response?.data?.message || 'Something went wrong. Please try again.';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInput = (field, icon, type = 'text', placeholder = '') => {
    const Icon = icon;
    const hasError = !!errors[field];
    const labels = {
      name: 'Your Name',
      email: 'Email Address',
      phone: 'Phone Number',
      subject: 'Subject',
    };
    const placeholders = {
      name: 'Enter your full name',
      email: 'your@email.com',
      phone: '9023263763',
      subject: 'How can we help?',
    };
    return (
      <div>
        <label className="font-body text-sm font-semibold text-gray-700 block mb-1.5">
          {labels[field]}
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="w-4 h-4" />
          </span>
          <input
            type={type}
            value={formData[field]}
            onChange={(e) => handleChange(field, e.target.value)}
            placeholder={placeholder || placeholders[field]}
            className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 outline-none font-body transition-all ${
              hasError
                ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/20'
                : 'border-gray-200 focus:border-saffron-500 focus:ring-4 focus:ring-saffron-500/20'
            }`}
          />
        </div>
        {hasError && (
          <p className="mt-1.5 flex items-center gap-1 text-red-500 text-xs font-body">
            <FaExclamationCircle className="w-3 h-3" />
            {errors[field]}
          </p>
        )}
      </div>
    );
  };

  return (
    <section
      id="contact"
      className="py-14 md:py-28 bg-cream-50 overflow-hidden"
    >
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
            Reach Out
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-forest-900 mb-2">
            Get In Touch
          </h2>
          <p className="font-gujarati text-lg text-saffron-600 mb-4">
            {"સંપર્ક કરો"}
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-saffron-400 to-gold-500 mx-auto rounded-full mb-6" />
          <p className="font-body text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or want to visit? We would love to hear from you.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
              <h3 className="font-heading text-xl font-bold text-forest-900 mb-6">
                Send us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {renderInput('name', FaUser)}
                {renderInput('email', FaEnvelope, 'email')}
                {renderInput('phone', FaPhone, 'tel')}
                {renderInput('subject', FaTag)}

                {/* Message Textarea */}
                <div>
                  <label className="font-body text-sm font-semibold text-gray-700 block mb-1.5">
                    Your Message
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-gray-400">
                      <FaCommentDots className="w-4 h-4" />
                    </span>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Tell us how we can help..."
                      rows={4}
                      className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 outline-none font-body transition-all resize-none ${
                        errors.message
                          ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/20'
                          : 'border-gray-200 focus:border-saffron-500 focus:ring-4 focus:ring-saffron-500/20'
                      }`}
                    />
                  </div>
                  {errors.message && (
                    <p className="mt-1.5 flex items-center gap-1 text-red-500 text-xs font-body">
                      <FaExclamationCircle className="w-3 h-3" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-white font-heading text-lg font-bold rounded-xl shadow-lg shadow-saffron-500/30 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Right: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-saffron-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="w-5 h-5 text-saffron-600" />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-forest-900 mb-1">
                    Our Address
                  </h4>
                  <p className="font-body text-sm text-gray-600 leading-relaxed">
                    Mu. Ishvariya, Ta. Jasdan,<br />
                    Dist. Rajkot, Gujarat
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.a
              href="tel:+919023263763"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="block bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaPhone className="w-5 h-5 text-forest-600" />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-forest-900 mb-1">
                    Phone
                  </h4>
                  <p className="font-body text-sm text-gray-600 leading-relaxed">
                    +91 90232 63763
                  </p>
                </div>
              </div>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaClock className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-forest-900 mb-1">
                    Visiting Hours
                  </h4>
                  <p className="font-body text-sm text-gray-600 leading-relaxed">
                    Open every day<br />
                    6:00 AM - 8:00 PM
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Google Maps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3699.7116457722605!2d71.00828207485135!3d21.984027379915247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39585bbb13fbb081%3A0x8742757ce7b48aa!2sNagnath%20gaushala%20Ishwariya!5e0!3m2!1sen!2sin!4v1790515822897!5m2!1sen!2sin"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Nagnath Gaushala Ishwariya - Google Maps"
                className="w-full"
              />
            </motion.div>

            {/* Emergency CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-xl p-6 text-center text-white"
            >
              <FaExclamationTriangle className="w-8 h-8 mx-auto mb-3 animate-pulse" />
              <h4 className="font-heading text-lg font-bold mb-1">
                Found an injured cow?
              </h4>
              <p className="font-body text-sm text-white/80 mb-4">
                Call us immediately! We provide 24/7 rescue and emergency medical care.
              </p>
              <a
                href="tel:+919023263763"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-saffron-600 font-heading font-bold rounded-full hover:bg-saffron-50 transition-colors shadow-lg"
              >
                <FaPhone className="w-4 h-4" />
                Call +91 90232 63763
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
