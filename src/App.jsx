import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Campaign from './components/Campaign';
import Services from './components/Services';
import Impact from './components/Impact';
import Gallery from './components/Gallery';
import DonateSection from './components/DonateSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingDonate from './components/FloatingDonate';
import WhatsAppButton from './components/WhatsAppButton';
import DonatePage from './pages/DonatePage';

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Campaign />
        <Services />
        <Impact />
        <Gallery />
        <DonateSection />
        <Contact />
      </main>
      <Footer />
      <FloatingDonate />
      <WhatsAppButton />
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Only show loading screen on homepage
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (!isHomePage) {
      setLoading(false);
      return;
    }
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [isHomePage]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence>
        {loading && isHomePage && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-charcoal-950"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative mb-8"
            >
              <div className="w-28 h-28 flex items-center justify-center">
                <img
                  src="/images/logo (2).png"
                  alt="Shree Nagnath Gauseva Trust Logo"
                  className="w-24 h-24 object-contain drop-shadow-lg"
                />
              </div>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-gold-400/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                style={{ borderTopColor: 'transparent', borderRightColor: 'transparent' }}
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-heading text-2xl md:text-3xl font-bold text-gold-400 mb-2"
            >
              Shree Nagnath Gauseva Trust
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-gujarati text-gold-500/60 text-sm tracking-wider"
            >
              {"શ્રી નાગનાથ ગૌ સેવા ટ્રસ્ટ - ઈશ્વરીયા"}
            </motion.p>
            <div className="mt-6 w-48 h-0.5 bg-charcoal-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 rounded-full"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: '50%' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { fontFamily: 'Poppins, sans-serif' },
          success: { style: { background: '#F0F7F0', color: '#2E7D32' } },
          error: { style: { background: '#FFF0F0', color: '#D32F2F' } }
        }}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/donate" element={<DonatePage />} />
      </Routes>
    </>
  );
}

export default App;
