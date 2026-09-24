import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  FaHeart,
  FaShieldAlt,
  FaCreditCard,
  FaMobileAlt,
  FaUniversity,
  FaWallet,
  FaCertificate,
  FaLock,
  FaCheck,
  FaRupeeSign,
  FaCopy,
  FaQrcode,
  FaTimes,
  FaSearchPlus,
} from 'react-icons/fa';
import { GiCow, GiMedicines, GiMeal } from 'react-icons/gi';

const API_BASE = import.meta.env?.VITE_API_BASE_URL || '/api';
const RAZORPAY_KEY = import.meta.env?.VITE_RAZORPAY_KEY_ID || 'rzp_test_XXXXXXXXXXXXXX';
const IS_TEST_MODE = !import.meta.env?.VITE_RAZORPAY_KEY_ID || RAZORPAY_KEY.startsWith('rzp_test_');

const presetAmounts = [
  { amount: 251, impact: "One day's food", icon: GiMeal },
  { amount: 501, impact: 'Feed a cow for 2 days', icon: GiMeal },
  { amount: 1100, impact: 'Medical treatment', icon: GiMedicines },
  { amount: 2100, impact: 'Weekly medicine supply', icon: GiMedicines },
  { amount: 5100, impact: 'Monthly cow care', icon: GiCow },
  { amount: 11000, impact: 'Sponsor a cow for a month', icon: GiCow },
  { amount: 21000, impact: 'Shelter construction', icon: GiCow },
  { amount: 51000, impact: 'Major project support', icon: GiCow },
];

const bankDetails = [
  { label: 'Trust Name', value: 'Shree Nagnath Gauseva Trust' },
  { label: 'Bank', value: 'State Bank of India' },
  { label: 'A/C No', value: '42359812037' },
  { label: 'IFSC Code', value: 'SBIN0002641' },
];

const trustIndicators = [
  { icon: FaLock, label: 'Secure Payment' },
  { icon: FaCertificate, label: '80G Tax Benefit' },
  { icon: FaShieldAlt, label: 'Direct to Trust' },
];

const paymentMethods = [
  { icon: FaMobileAlt, label: 'UPI' },
  { icon: FaCreditCard, label: 'Cards' },
  { icon: FaUniversity, label: 'Net Banking' },
  { icon: FaWallet, label: 'Wallets' },
];

const DonateSection = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    anonymous: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const openBanner = useCallback(() => {
    setShowBanner(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeBanner = useCallback(() => {
    setShowBanner(false);
    document.body.style.overflow = '';
  }, []);

  const getDonationAmount = () => {
    if (customAmount && Number(customAmount) > 0) return Number(customAmount);
    return selectedAmount || 0;
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(val);
    if (val) setSelectedAmount(null);
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard!', { duration: 2000 });
    });
  };

  const validateForm = () => {
    const amount = getDonationAmount();
    if (!amount || amount < 1) {
      toast.error('Please select or enter a donation amount');
      return false;
    }
    if (!formData.name.trim() && !formData.anonymous) {
      toast.error('Please enter your name');
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('Please enter your email');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error('Please enter your phone number');
      return false;
    }
    if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      toast.error('Please enter a valid 10-digit phone number');
      return false;
    }
    return true;
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleDonate = async () => {
    if (!validateForm()) return;

    const amount = getDonationAmount();
    setIsProcessing(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error('Failed to load payment gateway. Please try again.');
        setIsProcessing(false);
        return;
      }

      const { data: orderData } = await axios.post(
        `${API_BASE}/donations/create-order`,
        {
          amount,
          donorName: formData.anonymous ? 'Anonymous' : formData.name,
          donorEmail: formData.email,
          donorPhone: formData.phone,
          message: formData.message,
          anonymous: formData.anonymous,
        }
      );

      const options = {
        key: RAZORPAY_KEY,
        amount: orderData.order.amount,
        currency: orderData.order.currency || 'INR',
        name: 'Shree Nagnath Gauseva Trust',
        description: 'Donation for Gau Seva',
        order_id: orderData.order.id,
        prefill: {
          name: formData.anonymous ? '' : formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#E8722A',
        },
        handler: async (response) => {
          try {
            await axios.post(`${API_BASE}/donations/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            setShowSuccess(true);
            toast.success('Thank you for your generous donation!', {
              duration: 5000,
            });

            setTimeout(() => {
              setShowSuccess(false);
              setFormData({
                name: '',
                email: '',
                phone: '',
                message: '',
                anonymous: false,
              });
              setSelectedAmount(null);
              setCustomAmount('');
            }, 5000);
          } catch {
            toast.error('Payment verification failed. Please contact us.');
          }
        },
        modal: {
          ondismiss: () => {
            toast.error('Payment was cancelled');
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', () => {
        toast.error('Payment failed. Please try again.');
      });
      rzp.open();
    } catch (error) {
      const msg =
        error.response?.data?.message || 'Something went wrong. Please try again.';
      toast.error(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section
      id="donate"
      className="py-20 md:py-28 bg-cream-100 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-saffron-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-400/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-saffron-100 text-saffron-700 rounded-full text-sm font-body font-semibold mb-4">
            Make a Difference
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-forest-900 mb-2">
            Support Our Cause
          </h2>
          <p className="font-gujarati text-lg text-saffron-600 mb-4">
            {"અમારા કાર્યને ટેકો આપો"}
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-saffron-400 to-gold-500 mx-auto rounded-full mb-6" />
          <p className="font-body text-lg text-gray-600 max-w-2xl mx-auto">
            Your donation directly helps feed, shelter and treat cows in need
          </p>
        </motion.div>

        {/* Test Mode Notice */}
        {IS_TEST_MODE && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto mb-8"
          >
            <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 text-center">
              <p className="font-body text-sm text-yellow-800">
                <strong>Test Mode:</strong>{' '}
                Online payments are in test mode. Use bank transfer for real donations.
              </p>
            </div>
          </motion.div>
        )}

        {/* Success Animation Overlay */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                className="bg-white rounded-2xl p-10 max-w-md w-full text-center shadow-2xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <FaCheck className="w-10 h-10 text-forest-600" />
                </motion.div>
                <h3 className="font-heading text-2xl font-bold text-forest-900 mb-3">
                  Thank You!
                </h3>
                <p className="font-body text-gray-600 mb-2">
                  Your donation has been received successfully. A receipt will be sent to your email.
                </p>
                <p className="font-gujarati text-sm text-saffron-600 font-semibold">
                  {"તમારું દાન ગૌ માતા ની સેવા માં લાગશે"}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Two Column Layout */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT COLUMN - Bank Transfer Details */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-charcoal-900 rounded-2xl p-6 md:p-8 shadow-2xl h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
                  <FaUniversity className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-white">
                    Bank Transfer
                  </h3>
                  <p className="font-gujarati text-sm text-gold-400">
                    {"બેંક ટ્રાન્સફર"}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {bankDetails.map((detail, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-charcoal-800 rounded-xl p-4 border border-charcoal-700"
                  >
                    <div>
                      <span className="font-body text-xs text-gray-400 block mb-0.5">
                        {detail.label}
                      </span>
                      <span className="font-body text-sm text-white font-semibold">
                        {detail.value}
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(detail.value)}
                      className="w-9 h-9 rounded-lg bg-charcoal-700 hover:bg-gold-500/20 flex items-center justify-center transition-colors group"
                      aria-label={`Copy ${detail.label}`}
                    >
                      <FaCopy className="w-3.5 h-3.5 text-gray-400 group-hover:text-gold-400 transition-colors" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  const allDetails = bankDetails.map((d) => `${d.label}: ${d.value}`).join('\n');
                  navigator.clipboard.writeText(allDetails).then(() => {
                    toast.success('All bank details copied!', { duration: 2000 });
                  });
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 mb-6 rounded-xl bg-gold-500/15 hover:bg-gold-500/25 border border-gold-500/30 text-gold-400 font-body text-sm font-semibold transition-colors"
              >
                <FaCopy className="w-3.5 h-3.5" />
                Copy All Bank Details
              </button>

              {/* QR Code for Quick Payment */}
              <div className="bg-charcoal-800 rounded-xl p-5 border border-charcoal-700 mb-6">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <FaQrcode className="w-4 h-4 text-gold-400" />
                  <p className="font-body text-sm font-semibold text-gold-300">
                    Scan QR Code to Pay
                  </p>
                </div>
                <div className="flex justify-center mb-3">
                  <div className="bg-white rounded-xl p-2 shadow-lg">
                    <img
                      src="/images/Screenshot 2026-09-24 230440.png"
                      alt="Scan to donate via UPI"
                      className="w-36 h-36 object-contain"
                    />
                  </div>
                </div>
                <button
                  onClick={openBanner}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gold-500/15 hover:bg-gold-500/25 border border-gold-500/30 text-gold-400 font-body text-sm font-medium transition-colors duration-200"
                >
                  <FaSearchPlus className="w-3 h-3" />
                  View Full Banner
                </button>
              </div>

              <div className="bg-gradient-to-r from-gold-500/10 to-saffron-500/10 rounded-xl p-4 border border-gold-500/20">
                <div className="flex items-center justify-center gap-2">
                  <FaCertificate className="w-5 h-5 text-gold-400" />
                  <div className="text-center">
                    <p className="font-body text-sm font-semibold text-gold-400">
                      80G Tax Benefit Available
                    </p>
                    <p className="font-gujarati text-xs text-gold-400/70">
                      80G ટેક્સ લાભ ઉપલબ્ધ
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN - Online Donation */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-saffron-100">
              <h3 className="font-heading text-xl font-bold text-forest-900 mb-6 text-center">
                Online Donation
              </h3>

              {/* Amount Selection */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {presetAmounts.map((preset) => {
                  const Icon = preset.icon;
                  const isSelected = selectedAmount === preset.amount && !customAmount;
                  return (
                    <motion.button
                      key={preset.amount}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleAmountSelect(preset.amount)}
                      className={`relative p-3 rounded-xl border-2 transition-all duration-300 text-left group ${
                        isSelected
                          ? 'border-saffron-500 bg-saffron-50 shadow-lg shadow-saffron-500/20'
                          : 'border-gray-200 hover:border-saffron-300 hover:bg-saffron-50/50'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute -top-2 -right-2 w-5 h-5 bg-saffron-500 rounded-full flex items-center justify-center">
                          <FaCheck className="w-2.5 h-2.5 text-white" />
                        </div>
                      )}
                      <div className="flex items-center gap-1 mb-1">
                        <FaRupeeSign className="w-3 h-3 text-forest-700" />
                        <span className="font-heading text-lg font-bold text-forest-900">
                          {preset.amount.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon className="w-3 h-3 text-saffron-500 flex-shrink-0" />
                        <span className="font-body text-[10px] text-gray-500 leading-tight">
                          {preset.impact}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Custom Amount */}
              <div className="mb-6">
                <label className="font-body text-sm font-semibold text-gray-700 block mb-2">
                  Or enter custom amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-heading text-lg">
                    &#8377;
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    placeholder="Enter amount"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-saffron-500 focus:ring-4 focus:ring-saffron-500/20 outline-none font-body text-lg transition-all"
                  />
                </div>
              </div>

              {/* Donor Form */}
              <div className="border-t border-gray-100 pt-6">
                <h4 className="font-body text-sm font-semibold text-gray-700 mb-4">
                  Your Information
                </h4>

                <div className="space-y-4 mb-4">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleFormChange('name', e.target.value)}
                    disabled={formData.anonymous}
                    placeholder="Full Name"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-saffron-500 focus:ring-4 focus:ring-saffron-500/20 outline-none font-body transition-all disabled:bg-gray-100 disabled:text-gray-400"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleFormChange('email', e.target.value)}
                      placeholder="Email Address"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-saffron-500 focus:ring-4 focus:ring-saffron-500/20 outline-none font-body transition-all"
                    />
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-body text-sm">
                        +91
                      </span>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleFormChange(
                            'phone',
                            e.target.value.replace(/[^0-9]/g, '').slice(0, 10)
                          )
                        }
                        placeholder="Phone Number"
                        className="w-full pl-14 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-saffron-500 focus:ring-4 focus:ring-saffron-500/20 outline-none font-body transition-all"
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    value={formData.message}
                    onChange={(e) => handleFormChange('message', e.target.value)}
                    placeholder="Message (optional)"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-saffron-500 focus:ring-4 focus:ring-saffron-500/20 outline-none font-body transition-all"
                  />
                </div>

                {/* Anonymous Checkbox */}
                <div className="flex items-center gap-3 mb-6">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={formData.anonymous}
                    onChange={(e) =>
                      handleFormChange('anonymous', e.target.checked)
                    }
                    className="w-5 h-5 rounded border-gray-300 text-saffron-500 focus:ring-saffron-500 cursor-pointer"
                  />
                  <label
                    htmlFor="anonymous"
                    className="font-body text-sm text-gray-600 cursor-pointer"
                  >
                    Donate anonymously
                  </label>
                </div>

                {/* Selected Amount Display */}
                {getDonationAmount() > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-saffron-50 rounded-xl p-4 mb-5 text-center"
                  >
                    <p className="font-body text-gray-600 text-sm mb-1">
                      Your Donation
                    </p>
                    <p className="font-heading text-3xl font-bold text-forest-900">
                      &#8377;{getDonationAmount().toLocaleString('en-IN')}
                    </p>
                  </motion.div>
                )}

                {/* Donate Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDonate}
                  disabled={isProcessing}
                  className="w-full py-4 bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-white font-heading text-xl font-bold rounded-xl shadow-lg shadow-saffron-500/30 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaHeart className="w-5 h-5" />
                      Donate Now
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 mb-6"
        >
          {trustIndicators.map((indicator, index) => {
            const Icon = indicator.icon;
            return (
              <div
                key={index}
                className="flex items-center justify-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              >
                <Icon className="w-5 h-5 text-forest-600 flex-shrink-0" />
                <span className="font-body text-sm font-semibold text-gray-700">
                  {indicator.label}
                </span>
              </div>
            );
          })}
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <p className="font-body text-sm text-gray-500 mb-4">
            Accepted Payment Methods
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {paymentMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-400"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-body text-sm">{method.label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Banner Lightbox Modal */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeBanner}
          >
            <button
              onClick={closeBanner}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
              aria-label="Close banner"
            >
              <FaTimes className="w-6 h-6 text-white" />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="/images/IMG-20260911-WA0007.jpg"
                alt="Shree Nagnath Gauseva Trust - Donation Banner"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              <p className="text-center font-body text-white/60 text-sm mt-4">
                Scan the QR code on the banner to donate via UPI
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DonateSection;
