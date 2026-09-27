import React, { useState, useCallback } from 'react';
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
import { GiWheat } from 'react-icons/gi';
import { MdPets, MdLocalHospital, MdHome } from 'react-icons/md';

const API_BASE = import.meta.env?.VITE_API_BASE_URL || '/api';
const RAZORPAY_KEY = import.meta.env?.VITE_RAZORPAY_KEY_ID || 'rzp_test_XXXXXXXXXXXXXX';
const IS_TEST_MODE = !import.meta.env?.VITE_RAZORPAY_KEY_ID || RAZORPAY_KEY.startsWith('rzp_test_');

const campaigns = [
  {
    id: 'general',
    icon: FaHeart,
    title: 'General Donation',
    titleGuj: 'સામાન્ય દાન',
    descGuj: 'ગૌશાળા ની જરૂરિયાત મુજબ વપરાશે',
    color: 'from-saffron-500 to-gold-500',
    colorLight: 'bg-saffron-50 border-saffron-200',
    iconColor: 'text-saffron-600',
    amounts: [
      { amount: 51, label: 'A heartfelt blessing', labelGuj: 'હૃદયપૂર્વક આશીર્વાદ' },
      { amount: 101, label: 'Feed a cow', labelGuj: 'એક ગાય ને ભોજન' },
      { amount: 501, label: 'Feed 3 cows for a day', labelGuj: '3 ગાયો ને ભોજન' },
      { amount: 1100, label: 'One week of fodder', labelGuj: 'એક અઠવાડિયા નો ઘાસચારો' },
      { amount: 2100, label: 'Medical care for 1 cow', labelGuj: '1 ગાય ની તબીબી સારવાર' },
      { amount: 5100, label: 'Monthly cow care', labelGuj: 'માસિક ગાય સંભાળ' },
    ],
  },
  {
    id: 'daily-feeding',
    icon: GiWheat,
    title: 'Daily Feeding',
    titleGuj: 'દૈનિક ભોજન',
    descGuj: 'ગાયો ને રોજ ખોરાક અને પાણી',
    color: 'from-saffron-500 to-gold-500',
    colorLight: 'bg-saffron-50 border-saffron-200',
    iconColor: 'text-saffron-600',
    amounts: [
      { amount: 51, label: 'Bless a cow with food', labelGuj: 'ગાય ને ખોરાક નો આશીર્વાદ' },
      { amount: 101, label: 'Feed a cow for a day', labelGuj: 'એક દિવસ નું ભોજન' },
      { amount: 501, label: 'Feed 3 cows for a day', labelGuj: '3 ગાયો ને એક દિવસ ભોજન' },
      { amount: 1100, label: 'Weekly feeding', labelGuj: 'સાપ્તાહિક ભોજન' },
      { amount: 5100, label: 'Monthly feeding', labelGuj: 'માસિક ભોજન' },
      { amount: 11000, label: 'Feed all cows for a day', labelGuj: 'બધી ગાયો ને એક દિવસ ભોજન' },
    ],
  },
  {
    id: 'medical-care',
    icon: MdLocalHospital,
    title: 'Medical Care',
    titleGuj: 'તબીબી સારવાર',
    descGuj: 'બીમાર અને ઘાયલ ગાયો ની દવા',
    color: 'from-forest-500 to-forest-600',
    colorLight: 'bg-forest-50 border-forest-200',
    iconColor: 'text-forest-600',
    amounts: [
      { amount: 51, label: 'Basic first aid', labelGuj: 'પ્રાથમિક સારવાર' },
      { amount: 101, label: 'Medicines for 1 cow', labelGuj: '1 ગાય ની દવા' },
      { amount: 501, label: 'Veterinary checkup', labelGuj: 'પશુ ચિકિત્સા તપાસ' },
      { amount: 2100, label: 'Full treatment', labelGuj: 'સંપૂર્ણ સારવાર' },
      { amount: 5100, label: 'Surgery for injured cow', labelGuj: 'ઘાયલ ગાય ની સર્જરી' },
      { amount: 11000, label: 'Monthly medical supplies', labelGuj: 'માસિક દવા સામગ્રી' },
    ],
  },
  {
    id: 'cow-shelter',
    icon: MdHome,
    title: 'Shelter & Care',
    titleGuj: 'આશ્રય અને સંભાળ',
    descGuj: 'ગાયો ને સુરક્ષિત ઘર આપો',
    color: 'from-gold-500 to-gold-600',
    colorLight: 'bg-gold-50 border-gold-200',
    iconColor: 'text-gold-600',
    amounts: [
      { amount: 51, label: 'Contribute to shelter', labelGuj: 'આશ્રય માં યોગદાન' },
      { amount: 101, label: 'Daily shelter supplies', labelGuj: 'દૈનિક આશ્રય સામગ્રી' },
      { amount: 501, label: 'Shelter maintenance', labelGuj: 'આશ્રય જાળવણી' },
      { amount: 1100, label: 'Weekly upkeep', labelGuj: 'સાપ્તાહિક જાળવણી' },
      { amount: 5100, label: 'Monthly upkeep', labelGuj: 'માસિક જાળવણી' },
      { amount: 11000, label: 'Sponsor a cow', labelGuj: 'એક ગાય ને દત્તક લો' },
    ],
  },
  {
    id: 'rescue',
    icon: MdPets,
    title: 'Rescue',
    titleGuj: 'બચાવ કામગીરી',
    descGuj: 'રસ્તા પરથી ઘાયલ ગાયો ને બચાવો',
    color: 'from-red-500 to-red-600',
    colorLight: 'bg-red-50 border-red-200',
    iconColor: 'text-red-600',
    amounts: [
      { amount: 51, label: 'Rescue supplies', labelGuj: 'બચાવ સામગ્રી' },
      { amount: 101, label: 'First aid for rescued cow', labelGuj: 'બચાવેલી ગાય ની સારવાર' },
      { amount: 501, label: 'Rescue transport fuel', labelGuj: 'બચાવ વાહન ઈંધણ' },
      { amount: 1100, label: 'Emergency rescue kit', labelGuj: 'કટોકટી બચાવ કિટ' },
      { amount: 2100, label: 'Full rescue operation', labelGuj: 'સંપૂર્ણ બચાવ કામગીરી' },
      { amount: 5100, label: 'Monthly rescue fund', labelGuj: 'માસિક બચાવ ફંડ' },
    ],
  },
];

const bankDetails = [
  { label: 'Trust Name', labelGuj: 'ટ્રસ્ટ નું નામ', value: 'Shree Nagnath Gauseva Trust' },
  { label: 'Bank', labelGuj: 'બેંક', value: 'State Bank of India' },
  { label: 'A/C No', labelGuj: 'ખાતા નંબર', value: '42359812037' },
  { label: 'IFSC Code', labelGuj: 'IFSC કોડ', value: 'SBIN0002641' },
];

const DonatePage = () => {
  const [selectedCampaign, setSelectedCampaign] = useState('general');
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    anonymous: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [donateMethod, setDonateMethod] = useState('online');

  const activeCampaign = campaigns.find((c) => c.id === selectedCampaign);

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
      toast.success('Copied! / કૉપી થયું!', { duration: 2000 });
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
      toast.error('કૃપા કરી રકમ પસંદ કરો / Please select an amount');
      return false;
    }
    if (!formData.name.trim() && !formData.anonymous) {
      toast.error('કૃપા કરી નામ લખો / Please enter your name');
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error('કૃપા કરી ફોન નંબર લખો / Please enter phone number');
      return false;
    }
    if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      toast.error('કૃપા કરી સાચો 10 આંકડાનો ફોન નંબર લખો');
      return false;
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('કૃપા કરી સાચો ઈમેલ લખો / Please enter a valid email');
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
        toast.error('Payment gateway લોડ થયું નહીં. ફરી પ્રયાસ કરો.');
        setIsProcessing(false);
        return;
      }

      const { data: orderData } = await axios.post(
        `${API_BASE}/donations/create-order`,
        {
          amount,
          donorName: formData.anonymous ? 'Anonymous' : formData.name,
          donorEmail: formData.email || '',
          donorPhone: formData.phone,
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
            toast.success('દાન સફળ! ધન્યવાદ! / Thank you for your donation!', { duration: 5000 });
            setTimeout(() => {
              setShowSuccess(false);
              setFormData({ name: '', email: '', phone: '', anonymous: false });
              setSelectedAmount(null);
              setCustomAmount('');
            }, 5000);
          } catch {
            toast.error('Payment verification failed. કૃપા કરી અમારો સંપર્ક કરો.');
          }
        },
        modal: {
          ondismiss: () => toast.error('Payment રદ થયું / Payment was cancelled'),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', () => toast.error('Payment નિષ્ફળ. ફરી પ્રયાસ કરો.'));
      rzp.open();
    } catch (error) {
      const msg = error.response?.data?.message || 'કંઈક ખોટું થયું. ફરી પ્રયાસ કરો.';
      toast.error(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <Toaster
        position="top-center"
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
              className="bg-white rounded-2xl p-8 sm:p-10 max-w-md w-full text-center shadow-2xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <FaCheck className="w-10 h-10 text-forest-600" />
              </motion.div>
              <h3 className="font-heading text-2xl font-bold text-forest-900 mb-2">
                Thank You! / ધન્યવાદ!
              </h3>
              <p className="font-gujarati text-lg text-saffron-600 font-semibold mb-2">
                {"તમારું દાન સફળતાપૂર્વક મળ્યું છે"}
              </p>
              <p className="font-body text-gray-600">
                Your donation has been received successfully.
              </p>
              <p className="font-gujarati text-sm text-forest-600 mt-2 font-medium">
                {"તમારું દાન ગૌ માતા ની સેવા માં લાગશે"}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compact Header */}
      <header className="bg-white/95 backdrop-blur-xl shadow-sm border-b border-gold-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 md:w-11 md:h-11 flex-shrink-0">
                <img
                  src="/images/logo (2).png"
                  alt="Shree Nagnath Gauseva Trust Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-heading text-sm font-bold text-charcoal-800 leading-tight group-hover:text-gold-700 transition-colors">
                  Shree Nagnath Gauseva Trust
                </h1>
                <p className="font-gujarati text-[10px] text-gold-600">
                  {"શ્રી નાગનાથ ગૌ સેવા ટ્રસ્ટ"}
                </p>
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold-300 text-gold-700 font-body font-semibold text-xs hover:bg-gold-50 transition-colors"
              >
                <FaArrowLeft className="text-[10px]" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Home</span>
              </Link>
              <a
                href="tel:+919023263763"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-forest-600 text-white font-body font-semibold text-xs hover:bg-forest-700 transition-colors"
              >
                <FaPhone className="text-[10px]" />
                <span className="hidden md:inline">Call Us</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Compact Title Strip */}
      <div className="bg-gradient-to-r from-saffron-500 via-gold-500 to-saffron-500 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
            <FaHeart className="inline w-5 h-5 mr-2 -mt-1" />
            Donate for Gau Seva
          </h1>
          <p className="font-gujarati text-sm sm:text-base text-white/90 font-medium mb-3">
            {"ગૌ સેવા માટે દાન કરો - તમારું દાન જીવન બચાવે છે"}
          </p>
          <p className="font-gujarati text-xs sm:text-sm text-white/90 italic mb-2">
            {"\"ફૂલ ના થાય તો ફૂલ ની પાંખડી, તમારી શ્રદ્ધા જ સૌથી મોટું દાન છે\""}
          </p>
          <div className="max-w-xl mx-auto bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
            <p className="font-gujarati text-[11px] sm:text-xs text-white/90 leading-relaxed">
              <FaCertificate className="inline w-3 h-3 mr-1 -mt-0.5" />
              {"રજિસ્ટર્ડ ટ્રસ્ટ (નં: 3891) | દાન નું પ્રમાણપત્ર WhatsApp પર મળશે | 80G ટેક્સ છૂટ"}
            </p>
            <p className="font-gujarati text-[11px] sm:text-xs text-white/75 mt-0.5">
              {"નીચે રકમ પસંદ કરો, માહિતી ભરો અને દાન કરો"}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">

        {/* Online / Bank Transfer Toggle */}
        <div className="flex justify-center mb-5 sm:mb-6">
          <div className="inline-flex rounded-xl bg-white border border-gold-200 shadow-sm p-1">
            <button
              onClick={() => setDonateMethod('online')}
              className={`px-4 sm:px-6 py-2 rounded-lg font-body text-sm font-semibold transition-all ${
                donateMethod === 'online'
                  ? 'bg-saffron-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-saffron-600'
              }`}
            >
              <FaCreditCard className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />
              Online Pay
              <span className="block font-gujarati text-[10px] font-normal mt-0.5">
                {"ઓનલાઈન પેમેન્ટ"}
              </span>
            </button>
            <button
              onClick={() => setDonateMethod('bank')}
              className={`px-4 sm:px-6 py-2 rounded-lg font-body text-sm font-semibold transition-all ${
                donateMethod === 'bank'
                  ? 'bg-saffron-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-saffron-600'
              }`}
            >
              <FaUniversity className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />
              Bank / UPI
              <span className="block font-gujarati text-[10px] font-normal mt-0.5">
                {"બેંક / UPI"}
              </span>
            </button>
          </div>
        </div>

        {donateMethod === 'online' ? (
          <>
            {/* Campaign Selection Cards */}
            <div className="mb-5 sm:mb-6">
              <p className="font-body text-xs text-gray-500 text-center mb-3">
                <span className="font-gujarati">{"કારણ પસંદ કરો"}</span> / Choose a cause (optional)
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3 max-w-3xl mx-auto">
                {campaigns.map((campaign) => {
                  const Icon = campaign.icon;
                  const isActive = selectedCampaign === campaign.id;
                  return (
                    <button
                      key={campaign.id}
                      onClick={() => {
                        setSelectedCampaign(campaign.id);
                        setSelectedAmount(null);
                        setCustomAmount('');
                      }}
                      className={`relative flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-b from-saffron-500 to-saffron-600 text-white shadow-lg shadow-saffron-500/25 scale-[1.03]'
                          : 'bg-white text-gray-600 border border-gray-200 hover:border-saffron-300 hover:shadow-md hover:-translate-y-0.5'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                          <FaCheck className="w-2.5 h-2.5 text-saffron-500" />
                        </div>
                      )}
                      <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center mb-2 transition-colors ${
                        isActive
                          ? 'bg-white/20'
                          : 'bg-gradient-to-br from-saffron-50 to-gold-50'
                      }`}>
                        <Icon className={`text-xl ${isActive ? 'text-white' : campaign.iconColor}`} />
                      </div>
                      <span className={`font-gujarati text-xs font-semibold leading-tight ${isActive ? 'text-white' : 'text-forest-800'}`}>
                        {campaign.titleGuj}
                      </span>
                      <span className={`font-body text-[10px] leading-tight mt-0.5 ${isActive ? 'text-white/80' : 'text-gray-400'}`}>
                        {campaign.title}
                      </span>
                    </button>
                  );
                })}
              </div>
              {activeCampaign?.descGuj && (
                <div className="text-center mt-2.5">
                  <span className="font-gujarati text-xs text-saffron-600 bg-saffron-50 border border-saffron-200/50 rounded-full py-1 px-4 inline-block">
                    {activeCampaign.descGuj}
                  </span>
                </div>
              )}
            </div>

            {/* Test Mode Notice */}
            {IS_TEST_MODE && (
              <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-2.5 mb-5 max-w-2xl mx-auto">
                <p className="font-body text-xs text-yellow-800 text-center">
                  <strong>Test Mode:</strong> Online payments are in test mode. Use bank transfer for real donations.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
              {/* Left: Amount + Form (2 cols) */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gold-200/50 shadow-sm">
                  {/* Amount Selection */}
                  <div className="mb-5">
                    <h2 className="font-heading text-lg font-bold text-forest-900 mb-0.5">
                      {activeCampaign?.title === 'General Donation' ? 'Select Amount' : `Donate for ${activeCampaign?.title}`}
                    </h2>
                    <p className="font-gujarati text-sm text-saffron-600 mb-4">
                      {"રકમ પસંદ કરો"} - {activeCampaign?.titleGuj}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                      {activeCampaign?.amounts.map((option) => {
                        const isSelected = selectedAmount === option.amount && !customAmount;
                        return (
                          <button
                            key={option.amount}
                            onClick={() => handleAmountSelect(option.amount)}
                            className={`relative p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                              isSelected
                                ? 'border-saffron-500 bg-saffron-50 shadow-lg shadow-saffron-500/15'
                                : 'border-gray-200 bg-cream-50 hover:border-saffron-300 hover:bg-saffron-50/50'
                            }`}
                          >
                            {isSelected && (
                              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-saffron-500 rounded-full flex items-center justify-center">
                                <FaCheck className="w-2.5 h-2.5 text-white" />
                              </div>
                            )}
                            <div className="flex items-center gap-1 mb-1">
                              <FaRupeeSign className="w-3 h-3 text-forest-700" />
                              <span className="font-heading text-xl font-bold text-forest-900">
                                {option.amount.toLocaleString('en-IN')}
                              </span>
                            </div>
                            <span className="font-body text-xs text-gray-500 block leading-tight">
                              {option.label}
                            </span>
                            <span className="font-gujarati text-[11px] text-saffron-500 block leading-tight">
                              {option.labelGuj}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Custom Amount */}
                  <div className="mb-5">
                    <label className="font-body text-sm font-semibold text-gray-700 mb-1.5 block">
                      Other Amount / <span className="font-gujarati">{"બીજી રકમ"}</span>
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
                        placeholder="Enter amount / રકમ લખો"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-saffron-500 focus:ring-4 focus:ring-saffron-500/20 outline-none font-body text-lg transition-all"
                      />
                    </div>
                  </div>

                  {/* Donor Form */}
                  <div className="border-t border-gray-100 pt-5">
                    <p className="font-body text-sm font-semibold text-gray-700 mb-1">
                      Your Details / <span className="font-gujarati">{"તમારી માહિતી"}</span>
                    </p>
                    <p className="font-gujarati text-xs text-gray-400 mb-3">
                      {"ફક્ત નામ અને ફોન નંબર જરૂરી છે"}
                    </p>

                    <div className="space-y-3">
                      <div>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleFormChange('name', e.target.value)}
                          disabled={formData.anonymous}
                          placeholder="Full Name / તમારું નામ *"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-saffron-500 focus:ring-4 focus:ring-saffron-500/20 outline-none font-body transition-all disabled:bg-gray-100 disabled:text-gray-400"
                        />
                      </div>
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
                          placeholder="Phone Number / ફોન નંબર *"
                          className="w-full pl-14 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-saffron-500 focus:ring-4 focus:ring-saffron-500/20 outline-none font-body transition-all"
                        />
                      </div>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleFormChange('email', e.target.value)}
                        placeholder="Email (optional) / ઈમેલ"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-saffron-500 focus:ring-4 focus:ring-saffron-500/20 outline-none font-body transition-all"
                      />
                    </div>

                    <label className="flex items-center gap-2 mt-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.anonymous}
                        onChange={(e) => handleFormChange('anonymous', e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-saffron-500 focus:ring-saffron-500"
                      />
                      <span className="font-body text-sm text-gray-600">
                        Donate anonymously / <span className="font-gujarati">{"ગુપ્ત દાન"}</span>
                      </span>
                    </label>
                  </div>

                  {/* Amount Summary + Donate Button */}
                  <div className="mt-5">
                    {getDonationAmount() > 0 && (
                      <div className="bg-saffron-50 rounded-xl p-3 mb-4 text-center border border-saffron-200">
                        <p className="font-gujarati text-xs text-gray-500 mb-0.5">{"તમારું દાન"} / Your Donation</p>
                        <p className="font-heading text-3xl font-bold text-forest-900">
                          &#8377;{getDonationAmount().toLocaleString('en-IN')}
                        </p>
                      </div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDonate}
                      disabled={isProcessing}
                      className="w-full py-4 bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-white font-heading text-lg sm:text-xl font-bold rounded-xl shadow-lg shadow-saffron-500/30 hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center gap-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </div>
                      ) : (
                        <>
                          <span className="flex items-center gap-2">
                            <FaHeart className="w-5 h-5" />
                            Donate Now / {"દાન કરો"}
                          </span>
                          <span className="font-gujarati text-xs font-normal opacity-80">
                            {"સુરક્ષિત ઓનલાઈન પેમેન્ટ"}
                          </span>
                        </>
                      )}
                    </motion.button>

                    {/* Trust Badges inline */}
                    <div className="flex items-center justify-center gap-4 mt-3">
                      <span className="flex items-center gap-1 text-gray-400">
                        <FaLock className="w-3 h-3" />
                        <span className="font-body text-[10px]">Secure</span>
                      </span>
                      <span className="flex items-center gap-1 text-gray-400">
                        <FaCertificate className="w-3 h-3" />
                        <span className="font-body text-[10px]">80G Tax Benefit</span>
                      </span>
                      <span className="flex items-center gap-1 text-gray-400">
                        <FaShieldAlt className="w-3 h-3" />
                        <span className="font-body text-[10px]">Verified Trust</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar: QR + Help */}
              <div className="space-y-4">
                {/* Quick QR */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gold-200/50 text-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <FaQrcode className="w-4 h-4 text-gold-600" />
                    <h3 className="font-heading text-base font-bold text-forest-900">
                      Scan & Pay
                    </h3>
                  </div>
                  <p className="font-gujarati text-xs text-saffron-600 mb-3">
                    {"QR કોડ સ્કેન કરો અને દાન કરો"}
                  </p>
                  <div className="inline-block bg-white rounded-xl p-2 border-2 border-gold-200 shadow-sm mb-3">
                    <img
                      src="/images/Screenshot 2026-09-24 230440.png"
                      alt="Scan to donate via UPI"
                      className="w-36 h-36 sm:w-40 sm:h-40 object-contain"
                    />
                  </div>
                  <p className="font-body text-xs text-gray-500 mb-2">
                    Scan with any UPI app
                  </p>
                  <p className="font-gujarati text-xs text-gray-400 mb-3">
                    {"કોઈ પણ UPI એપ થી સ્કેન કરો"}
                  </p>
                  <button
                    onClick={openBanner}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-gold-50 hover:bg-gold-100 border border-gold-300 text-gold-700 font-body text-xs font-semibold transition-colors"
                  >
                    <FaSearchPlus className="w-3 h-3" />
                    View Full Banner / {"બેનર જુઓ"}
                  </button>
                </div>

                {/* WhatsApp Help */}
                <div className="bg-forest-700 rounded-2xl p-4 sm:p-5 text-white text-center">
                  <FaWhatsapp className="w-8 h-8 mx-auto mb-2" />
                  <h4 className="font-heading text-base font-bold mb-1">
                    Need Help? / {"મદદ જોઈએ?"}
                  </h4>
                  <p className="font-gujarati text-xs text-white/80 mb-1">
                    {"દાન કરવામાં કોઈ મુશ્કેલી?"}
                  </p>
                  <p className="font-body text-xs text-white/70 mb-3">
                    WhatsApp us for any queries
                  </p>
                  <a
                    href="https://wa.me/919023263763"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 bg-green-500 text-white font-heading font-bold text-sm rounded-full hover:bg-green-600 transition-colors shadow-lg"
                  >
                    <FaWhatsapp className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>

                {/* Emergency */}
                <div className="bg-gradient-to-br from-saffron-500 to-saffron-600 rounded-2xl p-4 sm:p-5 text-white text-center">
                  <FaExclamationTriangle className="w-7 h-7 mx-auto mb-2 animate-pulse" />
                  <h4 className="font-heading text-base font-bold mb-1">
                    Found an injured cow?
                  </h4>
                  <p className="font-gujarati text-xs text-white/80 mb-3">
                    {"ઘાયલ ગાય મળી? તરત ફોન કરો!"}
                  </p>
                  <a
                    href="tel:+919023263763"
                    className="inline-flex items-center gap-2 px-5 py-2 bg-white text-saffron-600 font-heading font-bold text-sm rounded-full hover:bg-saffron-50 transition-colors shadow-lg"
                  >
                    <FaPhone className="w-3.5 h-3.5" />
                    +91 90232 63763
                  </a>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Bank Transfer / UPI Tab */
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-5 sm:p-8 border border-gold-200/50 shadow-sm mb-5">
              <div className="text-center mb-6">
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-forest-900 mb-1">
                  Bank Transfer / UPI
                </h2>
                <p className="font-gujarati text-sm text-saffron-600">
                  {"બેંક ટ્રાન્સફર અથવા UPI થી દાન કરો"}
                </p>
                <p className="font-body text-xs text-gray-500 mt-1">
                  Transfer directly to our bank account or scan QR code
                </p>
                <p className="font-gujarati text-xs text-gray-400">
                  {"સીધા અમારા બેંક ખાતામાં ટ્રાન્સફર કરો અથવા QR કોડ સ્કેન કરો"}
                </p>
              </div>

              {/* Bank Details */}
              <div className="bg-charcoal-900 rounded-xl p-4 sm:p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-gold-500/20 rounded-lg flex items-center justify-center">
                    <FaUniversity className="w-4 h-4 text-gold-400" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-white">Bank Details</h3>
                    <p className="font-gujarati text-xs text-gold-400">{"બેંક ની વિગતો"}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {bankDetails.map((detail, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-charcoal-800 rounded-xl p-3 border border-charcoal-700"
                    >
                      <div>
                        <span className="font-body text-[10px] text-gray-400 block">
                          {detail.label} / <span className="font-gujarati">{detail.labelGuj}</span>
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
                      toast.success('બધી બેંક વિગતો કૉપી થઈ! / All details copied!');
                    });
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 mt-3 rounded-xl bg-gold-500/15 hover:bg-gold-500/25 border border-gold-500/30 text-gold-400 font-body text-sm font-semibold transition-colors"
                >
                  <FaCopy className="w-3.5 h-3.5" />
                  Copy All / {"બધું કૉપી કરો"}
                </button>
              </div>

              {/* QR Code */}
              <div className="text-center mb-6">
                <h3 className="font-heading text-lg font-bold text-forest-900 mb-1">
                  Scan QR Code & Pay
                </h3>
                <p className="font-gujarati text-sm text-saffron-600 mb-4">
                  {"QR કોડ સ્કેન કરો અને પેમેન્ટ કરો"}
                </p>
                <div className="inline-block bg-white rounded-xl p-3 border-2 border-gold-200 shadow-md mb-3">
                  <img
                    src="/images/Screenshot 2026-09-24 230440.png"
                    alt="Scan to donate via UPI"
                    className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
                  />
                </div>
                <p className="font-body text-sm text-gray-500 mb-1">
                  Scan with any UPI app (GPay, PhonePe, Paytm)
                </p>
                <p className="font-gujarati text-xs text-gray-400">
                  {"GPay, PhonePe, Paytm - કોઈ પણ UPI એપ થી સ્કેન કરો"}
                </p>
              </div>

              {/* View Banner */}
              <button
                onClick={openBanner}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gold-50 hover:bg-gold-100 border border-gold-300 text-gold-700 font-body text-sm font-semibold transition-colors"
              >
                <FaSearchPlus className="w-3.5 h-3.5" />
                View Full Trust Banner / {"ટ્રસ્ટ બેનર જુઓ"}
              </button>
            </div>

            {/* 80G + Trust Info */}
            <div className="bg-gradient-to-r from-gold-50 to-saffron-50 rounded-xl p-4 border border-gold-200/50 text-center mb-5">
              <div className="flex items-center justify-center gap-2 mb-1">
                <FaCertificate className="w-4 h-4 text-gold-600" />
                <p className="font-heading text-sm font-bold text-forest-900">
                  80G Tax Benefit Available
                </p>
              </div>
              <p className="font-gujarati text-xs text-saffron-600">
                {"80G ટેક્સ લાભ ઉપલબ્ધ છે - દાન પર ટેક્સ છૂટ મળશે"}
              </p>
            </div>

            {/* Help CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-forest-700 rounded-xl p-5 text-white text-center">
                <FaWhatsapp className="w-7 h-7 mx-auto mb-2" />
                <h4 className="font-heading text-sm font-bold mb-1">
                  Need Help? / {"મદદ જોઈએ?"}
                </h4>
                <p className="font-gujarati text-xs text-white/80 mb-3">
                  {"દાન કરવામાં કોઈ મુશ્કેલી? અમને WhatsApp કરો"}
                </p>
                <a
                  href="https://wa.me/919023263763"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-green-500 text-white font-heading font-bold text-sm rounded-full hover:bg-green-600 transition-colors"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
              <div className="bg-gradient-to-br from-saffron-500 to-saffron-600 rounded-xl p-5 text-white text-center">
                <FaPhone className="w-7 h-7 mx-auto mb-2" />
                <h4 className="font-heading text-sm font-bold mb-1">
                  Call Us / {"ફોન કરો"}
                </h4>
                <p className="font-gujarati text-xs text-white/80 mb-3">
                  {"ફોન પર દાન ની માહિતી લો"}
                </p>
                <a
                  href="tel:+919023263763"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-white text-saffron-600 font-heading font-bold text-sm rounded-full hover:bg-saffron-50 transition-colors"
                >
                  <FaPhone className="w-3.5 h-3.5" />
                  +91 90232 63763
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Payment Methods */}
        <div className="mt-6 text-center">
          <p className="font-body text-xs text-gray-400 mb-2">
            Accepted Methods / <span className="font-gujarati">{"સ્વીકૃત પેમેન્ટ"}</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { icon: FaMobileAlt, label: 'UPI' },
              { icon: FaCreditCard, label: 'Cards' },
              { icon: FaUniversity, label: 'Net Banking' },
              { icon: FaWallet, label: 'Wallets' },
            ].map((method, i) => (
              <div key={i} className="flex items-center gap-1.5 text-gray-400">
                <method.icon className="w-4 h-4" />
                <span className="font-body text-xs">{method.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-charcoal-950 text-white py-5 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img src="/images/logo (2).png" alt="Logo" className="w-9 h-9 object-contain" />
              <div>
                <p className="font-heading text-sm font-bold text-gold-400">
                  Shree Nagnath Gauseva Trust
                </p>
                <p className="font-gujarati text-[10px] text-gold-400/60">
                  {"શ્રી નાગનાથ ગૌ સેવા ટ્રસ્ટ - ઈશ્વરીયા"}
                </p>
              </div>
            </div>
            <div className="font-body text-xs text-gray-500 flex items-center gap-1">
              &copy; {new Date().getFullYear()} All rights reserved. Made with
              <FaHeart className="w-3 h-3 text-red-500 inline flex-shrink-0" />
              for Gau Seva
            </div>
            <Link
              to="/"
              className="font-body text-xs text-gold-400 hover:text-gold-300 transition-colors"
            >
              Visit Main Website / {"મુખ્ય વેબસાઈટ"}
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
              <p className="text-center font-gujarati text-white/40 text-xs mt-1">
                {"બેનર પર QR કોડ સ્કેન કરો"}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DonatePage;
