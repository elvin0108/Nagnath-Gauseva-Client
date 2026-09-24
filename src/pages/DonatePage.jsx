import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
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
  FaWhatsapp,
  FaPhone,
  FaArrowLeft,
  FaExclamationTriangle,
} from 'react-icons/fa';
import { GiCow, GiMedicines, GiMeal, GiWheat } from 'react-icons/gi';
import { MdPets, MdLocalHospital, MdHome } from 'react-icons/md';

const API_BASE = import.meta.env?.VITE_API_BASE_URL || '/api';
const RAZORPAY_KEY = import.meta.env?.VITE_RAZORPAY_KEY_ID || 'rzp_test_XXXXXXXXXXXXXX';
const IS_TEST_MODE = !import.meta.env?.VITE_RAZORPAY_KEY_ID || RAZORPAY_KEY.startsWith('rzp_test_');

const campaigns = [
  {
    id: 'daily-feeding',
    icon: GiWheat,
    title: 'Daily Feeding',
    titleGuj: 'દૈનિક ભોજન',
    description: 'Provide nutritious food, green fodder and clean water to 500+ cows every day. No cow goes hungry at our gaushala.',
    image: '/images/IMG-20260920-WA0075.jpg',
    color: 'from-saffron-500 to-gold-500',
    colorLight: 'bg-saffron-50 border-saffron-200',
    iconColor: 'text-saffron-600',
    amounts: [
      { amount: 51, label: 'Bless a cow with food', labelGuj: 'ગાય ને ખોરાક નો આશીર્વાદ' },
      { amount: 101, label: 'Feed a cow for a day', labelGuj: 'એક દિવસ નું ભોજન' },
      { amount: 501, label: 'Feed 3 cows for a day', labelGuj: '3 ગાયો ને એક દિવસ ભોજન' },
      { amount: 1100, label: 'One week of fodder', labelGuj: 'એક અઠવાડિયા નો ઘાસચારો' },
      { amount: 5100, label: 'Monthly feeding support', labelGuj: 'માસિક ભોજન સહાય' },
      { amount: 11000, label: 'Feed all cows for a day', labelGuj: 'બધી ગાયો ને એક દિવસ ભોજન' },
    ],
  },
  {
    id: 'medical-care',
    icon: MdLocalHospital,
    title: 'Medical Treatment',
    titleGuj: 'તબીબી સારવાર',
    description: 'Emergency and ongoing medical care for injured, sick and malnourished cows. Includes surgery, medicines and veterinary support.',
    image: '/images/IMG-20260920-WA0037.jpg',
    color: 'from-forest-500 to-forest-600',
    colorLight: 'bg-forest-50 border-forest-200',
    iconColor: 'text-forest-600',
    amounts: [
      { amount: 51, label: 'Basic first aid supplies', labelGuj: 'પ્રાથમિક સારવાર સામગ્રી' },
      { amount: 101, label: 'Medicines for 1 cow', labelGuj: '1 ગાય ની દવા' },
      { amount: 501, label: 'Veterinary checkup', labelGuj: 'પશુ ચિકિત્સા તપાસ' },
      { amount: 2100, label: 'Full medical treatment', labelGuj: 'સંપૂર્ણ તબીબી સારવાર' },
      { amount: 5100, label: 'Surgery for injured cow', labelGuj: 'ઘાયલ ગાય ની સર્જરી' },
      { amount: 11000, label: 'Monthly medical supplies', labelGuj: 'માસિક દવા સામગ્રી' },
    ],
  },
  {
    id: 'cow-shelter',
    icon: MdHome,
    title: 'Shelter & Care',
    titleGuj: 'આશ્રય અને સંભાળ',
    description: 'Maintain safe, clean and comfortable shelter for abandoned and stray cows. Every cow gets a permanent, loving home.',
    image: '/images/IMG-20260920-WA0040.jpg',
    color: 'from-gold-500 to-gold-600',
    colorLight: 'bg-gold-50 border-gold-200',
    iconColor: 'text-gold-600',
    amounts: [
      { amount: 51, label: 'Contribute to shelter', labelGuj: 'આશ્રય માં યોગદાન' },
      { amount: 101, label: 'Daily shelter supplies', labelGuj: 'દૈનિક આશ્રય સામગ્રી' },
      { amount: 501, label: 'Shelter maintenance', labelGuj: 'આશ્રય જાળવણી' },
      { amount: 1100, label: 'Weekly upkeep', labelGuj: 'સાપ્તાહિક જાળવણી' },
      { amount: 5100, label: 'Monthly shelter upkeep', labelGuj: 'માસિક આશ્રય જાળવણી' },
      { amount: 11000, label: 'Sponsor a cow for a month', labelGuj: 'એક ગાય ને એક મહિનો દત્તક' },
    ],
  },
  {
    id: 'rescue',
    icon: MdPets,
    title: 'Rescue Operations',
    titleGuj: 'બચાવ કામગીરી',
    description: 'Rescue injured and abandoned cows from roads and accident sites. Our team responds quickly to bring them to safety.',
    image: '/images/IMG-20260920-WA0034.jpg',
    color: 'from-red-500 to-red-600',
    colorLight: 'bg-red-50 border-red-200',
    iconColor: 'text-red-600',
    amounts: [
      { amount: 51, label: 'Rescue supplies', labelGuj: 'બચાવ સામગ્રી' },
      { amount: 101, label: 'First aid for rescued cow', labelGuj: 'બચાવેલી ગાય ની પ્રાથમિક સારવાર' },
      { amount: 501, label: 'Rescue transport fuel', labelGuj: 'બચાવ વાહન ઈંધણ' },
      { amount: 1100, label: 'Emergency rescue kit', labelGuj: 'કટોકટી બચાવ કિટ' },
      { amount: 2100, label: 'Full rescue operation', labelGuj: 'સંપૂર્ણ બચાવ કામગીરી' },
      { amount: 5100, label: 'Monthly rescue fund', labelGuj: 'માસિક બચાવ ફંડ' },
    ],
  },
];

const bankDetails = [
  { label: 'Trust Name', value: 'Shree Nagnath Gauseva Trust' },
  { label: 'Bank', value: 'State Bank of India' },
  { label: 'A/C No', value: '42359812037' },
  { label: 'IFSC Code', value: 'SBIN0002641' },
];

const DonatePage = () => {
  const [selectedCampaign, setSelectedCampaign] = useState(null);
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
  const donateFormRef = useRef(null);

  const activeCampaign = selectedCampaign
    ? campaigns.find((c) => c.id === selectedCampaign)
    : null;

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

  const openBanner = useCallback(() => {
    setShowBanner(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeBanner = useCallback(() => {
    setShowBanner(false);
    document.body.style.overflow = '';
  }, []);

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
          campaign: activeCampaign?.title || 'General Donation',
        }
      );

      const options = {
        key: RAZORPAY_KEY,
        amount: orderData.order.amount,
        currency: orderData.order.currency || 'INR',
        name: 'Shree Nagnath Gauseva Trust',
        description: activeCampaign
          ? `Donation for ${activeCampaign.title}`
          : 'Donation for Gau Seva',
        order_id: orderData.order.id,
        prefill: {
          name: formData.anonymous ? '' : formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: '#D4A843' },
        handler: async (response) => {
          try {
            await axios.post(`${API_BASE}/donations/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            setShowSuccess(true);
            toast.success('Thank you for your generous donation!', { duration: 5000 });
            setTimeout(() => {
              setShowSuccess(false);
              setFormData({ name: '', email: '', phone: '', message: '', anonymous: false });
              setSelectedAmount(null);
              setCustomAmount('');
            }, 5000);
          } catch {
            toast.error('Payment verification failed. Please contact us.');
          }
        },
        modal: {
          ondismiss: () => toast.error('Payment was cancelled'),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', () => toast.error('Payment failed. Please try again.'));
      rzp.open();
    } catch (error) {
      const msg = error.response?.data?.message || 'Something went wrong. Please try again.';
      toast.error(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { fontFamily: 'Poppins, sans-serif' },
          success: { style: { background: '#F0F7F0', color: '#2E7D32' } },
          error: { style: { background: '#FFF0F0', color: '#D32F2F' } },
        }}
      />

      {/* Success Overlay */}
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
                Your donation has been received successfully.
              </p>
              <p className="font-gujarati text-sm text-saffron-600 font-semibold">
                {"તમારું દાન ગૌ માતા ની સેવા માં લાગશે"}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-xl shadow-sm border-b border-gold-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-24">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 md:w-16 md:h-16 flex-shrink-0">
                <img
                  src="/images/logo (2).png"
                  alt="Shree Nagnath Gauseva Trust Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-heading text-sm md:text-base font-bold text-charcoal-800 leading-tight tracking-wide group-hover:text-gold-700 transition-colors">
                  Shree Nagnath Gauseva Trust
                </h1>
                <p className="font-gujarati text-[11px] md:text-xs text-gold-600 leading-tight">
                  ઈશ્વરીયા
                </p>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-gold-300 text-gold-700 font-body font-semibold text-sm hover:bg-gold-50 transition-colors"
              >
                <FaArrowLeft className="text-xs" />
                Back to Home
              </Link>
              <a
                href="tel:+919023263763"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest-600 text-white font-body font-semibold text-sm hover:bg-forest-700 transition-colors"
              >
                <FaPhone className="text-xs" />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/IMG-20260920-WA0032.jpg"
            alt="Cows at Shree Nagnath Gaushala"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/80 via-charcoal-950/70 to-charcoal-950/85" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gold-500/20 border border-gold-400/40 backdrop-blur-sm mb-6">
              <FaHeart className="text-gold-400 text-sm" />
              <span className="font-body font-bold text-gold-300 text-sm uppercase tracking-wider">
                Donate for Gau Seva
              </span>
              <FaHeart className="text-gold-400 text-sm" />
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold text-white leading-tight mb-3">
              Your Donation Saves{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-saffron-400">
                Lives
              </span>
            </h1>
            <p className="font-gujarati text-lg text-gold-400/80 mb-4">
              {"તમારું દાન જીવન બચાવે છે"}
            </p>
            <p className="font-body text-base md:text-lg text-white/70 max-w-2xl mx-auto">
              Choose a cause close to your heart and make a direct impact on the lives of 500+ cows at our gaushala.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Campaign Cards */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-forest-900 mb-2">
              Choose a Cause
            </h2>
            <p className="font-body text-sm text-gray-500 mt-1">
              Step 1: Select a cause below, then fill in your details to donate
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {campaigns.map((campaign, index) => {
              const Icon = campaign.icon;
              const isSelected = selectedCampaign === campaign.id;
              return (
                <motion.button
                  key={campaign.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  onClick={() => {
                    const newCampaign = isSelected ? null : campaign.id;
                    setSelectedCampaign(newCampaign);
                    setSelectedAmount(null);
                    setCustomAmount('');
                    if (newCampaign && donateFormRef.current) {
                      setTimeout(() => {
                        donateFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 100);
                    }
                  }}
                  className={`relative text-left rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-2 ${
                    isSelected
                      ? 'border-gold-500 shadow-gold-500/20 ring-2 ring-gold-400/30'
                      : 'border-transparent'
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-28 sm:h-40 overflow-hidden">
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${campaign.color} opacity-60`} />
                    <div className="absolute top-3 left-3">
                      <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                        <Icon className="text-xl" />
                      </div>
                    </div>
                    {isSelected && (
                      <div className="absolute top-3 right-3">
                        <div className="w-7 h-7 rounded-full bg-gold-500 flex items-center justify-center">
                          <FaCheck className="text-white text-xs" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-4 bg-white">
                    <h3 className="font-heading text-sm sm:text-lg font-bold text-forest-900 mb-0.5">
                      {campaign.title}
                    </h3>
                    <p className="font-gujarati text-xs text-saffron-600 mb-2">
                      {campaign.titleGuj}
                    </p>
                    <p className="font-body text-sm text-gray-600 leading-relaxed line-clamp-1 sm:line-clamp-2">
                      {campaign.description}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="py-8 md:py-16 bg-white" ref={donateFormRef}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left: Amount Selection + Form (3 cols) */}
            <div className="lg:col-span-3">
              <div className="bg-cream-50 rounded-2xl p-4 sm:p-6 md:p-8 border border-gold-200/50">
                {/* Step 2 label */}
                <p className="font-body text-xs text-saffron-600 font-semibold uppercase tracking-wider mb-2">Step 2: Choose Amount & Donate</p>

                {/* Campaign-specific heading */}
                {activeCampaign ? (
                  <div className={`flex items-center gap-3 mb-6 p-4 rounded-xl border ${activeCampaign.colorLight}`}>
                    <activeCampaign.icon className={`text-2xl ${activeCampaign.iconColor}`} />
                    <div>
                      <h3 className="font-heading text-lg font-bold text-forest-900">
                        Donate for {activeCampaign.title}
                      </h3>
                      <p className="font-gujarati text-xs text-saffron-600">
                        {activeCampaign.titleGuj}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6">
                    <h3 className="font-heading text-xl font-bold text-forest-900 mb-1">
                      General Donation
                    </h3>
                    <p className="font-body text-sm text-gray-600">
                      Your donation will be used where it is needed the most
                    </p>
                  </div>
                )}

                {/* Test Mode Notice */}
                {IS_TEST_MODE && (
                  <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-3 mb-6">
                    <p className="font-body text-xs text-yellow-800 text-center">
                      <strong>Test Mode:</strong> Online payments are in test mode. Use bank transfer for real donations.
                    </p>
                  </div>
                )}

                {/* Amount Options */}
                <div className="mb-6">
                  <p className="font-body text-sm font-semibold text-gray-700 mb-3">
                    Select Donation Amount
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {(activeCampaign ? activeCampaign.amounts : [
                      { amount: 51, label: 'A heartfelt blessing', labelGuj: 'હૃદયપૂર્વક આશીર્વાદ' },
                      { amount: 101, label: 'Feed a cow', labelGuj: 'એક ગાય ને ભોજન' },
                      { amount: 501, label: 'Feed 3 cows for a day', labelGuj: '3 ગાયો ને ભોજન' },
                      { amount: 1100, label: 'One week of fodder', labelGuj: 'એક અઠવાડિયા નો ઘાસચારો' },
                      { amount: 2100, label: 'Medical care for 1 cow', labelGuj: '1 ગાય ની તબીબી સારવાર' },
                      { amount: 5100, label: 'Monthly cow care', labelGuj: 'માસિક ગાય સંભાળ' },
                    ]).map((option) => {
                      const isSelected = selectedAmount === option.amount && !customAmount;
                      return (
                        <button
                          key={option.amount}
                          onClick={() => handleAmountSelect(option.amount)}
                          className={`relative p-2.5 sm:p-3.5 rounded-xl border-2 transition-all duration-300 text-left ${
                            isSelected
                              ? 'border-saffron-500 bg-saffron-50 shadow-lg shadow-saffron-500/15'
                              : 'border-gray-200 bg-white hover:border-saffron-300 hover:bg-saffron-50/50'
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute -top-2 -right-2 w-5 h-5 bg-saffron-500 rounded-full flex items-center justify-center">
                              <FaCheck className="w-2.5 h-2.5 text-white" />
                            </div>
                          )}
                          <div className="flex items-center gap-1 mb-0.5">
                            <FaRupeeSign className="w-3 h-3 text-forest-700" />
                            <span className="font-heading text-lg font-bold text-forest-900">
                              {option.amount.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <span className="font-body text-xs text-gray-500 block">
                            {option.label}
                          </span>
                          {option.labelGuj && (
                            <span className="font-gujarati text-[10px] text-saffron-500/80 block">
                              {option.labelGuj}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
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
                      className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-saffron-500 focus:ring-4 focus:ring-saffron-500/20 outline-none font-body text-lg transition-all bg-white"
                    />
                  </div>
                </div>

                {/* Donor Info */}
                <div className="border-t border-gray-200 pt-6">
                  <p className="font-body text-sm font-semibold text-gray-700 mb-4">
                    Your Information
                  </p>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleFormChange('name', e.target.value)}
                      disabled={formData.anonymous}
                      placeholder="Full Name"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-saffron-500 focus:ring-4 focus:ring-saffron-500/20 outline-none font-body transition-all disabled:bg-gray-100 disabled:text-gray-400"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                            handleFormChange('phone', e.target.value.replace(/[^0-9]/g, '').slice(0, 10))
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

                  <div className="flex items-center gap-3 mt-4 mb-5">
                    <input
                      type="checkbox"
                      id="anonymous-page"
                      checked={formData.anonymous}
                      onChange={(e) => handleFormChange('anonymous', e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-saffron-500 focus:ring-saffron-500 cursor-pointer"
                    />
                    <label htmlFor="anonymous-page" className="font-body text-sm text-gray-600 cursor-pointer">
                      Donate anonymously
                    </label>
                  </div>

                  {/* Amount Display */}
                  {getDonationAmount() > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-saffron-50 rounded-xl p-4 mb-5 text-center border border-saffron-200"
                    >
                      <p className="font-body text-gray-600 text-sm mb-1">Your Donation</p>
                      <p className="font-heading text-3xl font-bold text-forest-900">
                        &#8377;{getDonationAmount().toLocaleString('en-IN')}
                      </p>
                      {activeCampaign && (
                        <p className="font-body text-xs text-saffron-600 mt-1">
                          for {activeCampaign.title}
                        </p>
                      )}
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
            </div>

            {/* Right: Bank Transfer + QR (2 cols) */}
            <div className="lg:col-span-2 space-y-5">
              {/* Bank Transfer */}
              <div className="bg-charcoal-900 rounded-2xl p-4 sm:p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-gold-500/20 rounded-xl flex items-center justify-center">
                    <FaUniversity className="w-5 h-5 text-gold-400" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white">Bank Transfer</h3>
                    <p className="font-gujarati text-xs text-gold-400">{"બેંક ટ્રાન્સફર"}</p>
                  </div>
                </div>

                <div className="space-y-2.5 mb-4">
                  {bankDetails.map((detail, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-charcoal-800 rounded-xl p-3.5 border border-charcoal-700"
                    >
                      <div>
                        <span className="font-body text-[10px] text-gray-400 block">
                          {detail.label}
                        </span>
                        <span className="font-body text-sm text-white font-semibold">
                          {detail.value}
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(detail.value)}
                        className="w-8 h-8 rounded-lg bg-charcoal-700 hover:bg-gold-500/20 flex items-center justify-center transition-colors group"
                        aria-label={`Copy ${detail.label}`}
                      >
                        <FaCopy className="w-3 h-3 text-gray-400 group-hover:text-gold-400 transition-colors" />
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
                  className="w-full flex items-center justify-center gap-2 py-2.5 mb-5 rounded-xl bg-gold-500/15 hover:bg-gold-500/25 border border-gold-500/30 text-gold-400 font-body text-sm font-semibold transition-colors"
                >
                  <FaCopy className="w-3.5 h-3.5" />
                  Copy All Bank Details
                </button>

                {/* 80G */}
                <div className="bg-gradient-to-r from-gold-500/10 to-saffron-500/10 rounded-xl p-3 border border-gold-500/20">
                  <div className="flex items-center justify-center gap-2">
                    <FaCertificate className="w-4 h-4 text-gold-400" />
                    <p className="font-body text-sm font-semibold text-gold-400">
                      80G Tax Benefit Available
                    </p>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-gold-200/50 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <FaQrcode className="w-5 h-5 text-gold-600" />
                  <h3 className="font-heading text-lg font-bold text-forest-900">
                    Scan & Pay
                  </h3>
                </div>
                <div className="inline-block bg-white rounded-xl p-3 border-2 border-gold-200 shadow-sm mb-4">
                  <img
                    src="/images/Screenshot 2026-09-24 230440.png"
                    alt="Scan to donate via UPI"
                    className="w-44 h-44 object-contain"
                  />
                </div>
                <p className="font-body text-sm text-gray-500 mb-3">
                  Scan with any UPI app to donate instantly
                </p>
                <button
                  onClick={openBanner}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gold-50 hover:bg-gold-100 border border-gold-300 text-gold-700 font-body text-sm font-semibold transition-colors"
                >
                  <FaSearchPlus className="w-3 h-3" />
                  View Full Trust Banner
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: FaLock, label: 'Secure' },
                  { icon: FaCertificate, label: '80G Benefit' },
                  { icon: FaShieldAlt, label: 'Direct' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                    <item.icon className="w-4 h-4 text-forest-600" />
                    <span className="font-body text-[10px] font-semibold text-gray-600">{item.label}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Emergency + Contact - Full Width Below Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
            {/* Emergency Rescue CTA */}
            <div className="bg-gradient-to-br from-saffron-500 to-saffron-600 rounded-2xl p-5 md:p-8 text-white flex flex-col sm:flex-row items-center gap-5">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <FaExclamationTriangle className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
                </div>
              </div>
              <div className="text-center sm:text-left flex-1">
                <h4 className="font-heading text-xl font-bold mb-1">
                  Found an injured cow?
                </h4>
                <p className="font-body text-sm text-white/80 mb-3">
                  Call us immediately! We provide 24/7 rescue and emergency medical care.
                </p>
                <a
                  href="tel:+919023263763"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-saffron-600 font-heading font-bold text-sm rounded-full hover:bg-saffron-50 transition-colors shadow-lg"
                >
                  <FaPhone className="w-4 h-4" />
                  Call +91 90232 63763
                </a>
              </div>
            </div>

            {/* Contact / WhatsApp */}
            <div className="bg-forest-700 rounded-2xl p-5 md:p-8 text-white flex flex-col sm:flex-row items-center gap-5">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <FaWhatsapp className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
              </div>
              <div className="text-center sm:text-left flex-1">
                <h4 className="font-heading text-xl font-bold mb-1">
                  Need Help Donating?
                </h4>
                <p className="font-body text-sm text-white/80 mb-3">
                  Contact us for any donation related queries
                </p>
                <a
                  href="https://wa.me/919023263763"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-500 text-white font-heading font-bold text-sm rounded-full hover:bg-green-600 transition-colors shadow-lg"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mt-8 text-center">
            <p className="font-body text-sm text-gray-500 mb-3">Accepted Payment Methods</p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {[
                { icon: FaMobileAlt, label: 'UPI' },
                { icon: FaCreditCard, label: 'Cards' },
                { icon: FaUniversity, label: 'Net Banking' },
                { icon: FaWallet, label: 'Wallets' },
              ].map((method, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-400">
                  <method.icon className="w-5 h-5" />
                  <span className="font-body text-sm">{method.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal-950 text-white py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="/images/logo (2).png" alt="Logo" className="w-10 h-10 object-contain" />
              <div>
                <p className="font-heading text-sm font-bold text-gold-400">
                  Shree Nagnath Gauseva Trust
                </p>
                <p className="font-gujarati text-[10px] text-gold-400/60">
                  {"શ્રી નાગનાથ ગૌ સેવા ટ્રસ્ટ - ઈશ્વરીયા"}
                </p>
              </div>
            </div>
            <div className="font-body text-sm text-gray-500 flex items-center gap-1">
              &copy; {new Date().getFullYear()} All rights reserved. Made with
              <FaHeart className="w-3 h-3 text-red-500 inline" />
              for Gau Seva
            </div>
            <Link
              to="/"
              className="font-body text-sm text-gold-400 hover:text-gold-300 transition-colors"
            >
              Visit Main Website
            </Link>
          </div>
        </div>
      </footer>

      {/* Banner Lightbox */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
    </div>
  );
};

export default DonatePage;
