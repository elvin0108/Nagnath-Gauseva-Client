import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'cows', label: 'Cows' },
  { id: 'construction', label: 'Construction' },
  { id: 'treatment', label: 'Treatment' },
];

const galleryItems = [
  // Cows
  { id: 1, category: 'cows', src: '/images/IMG-20260920-WA0032.jpg', caption: 'Cows grazing in open field' },
  { id: 2, category: 'cows', src: '/images/IMG-20260920-WA0040.jpg', caption: 'Our gaushala - home to 500+ cows' },
  { id: 3, category: 'cows', src: '/images/IMG-20260920-WA0031.jpg', caption: 'Our beloved calves' },
  { id: 4, category: 'cows', src: '/images/IMG-20260920-WA0033.jpg', caption: 'Every calf is precious' },
  { id: 5, category: 'cows', src: '/images/IMG-20260920-WA0036.jpg', caption: 'Calves at the shelter' },
  { id: 6, category: 'cows', src: '/images/IMG-20260920-WA0039.jpg', caption: 'Calves walking together' },
  { id: 7, category: 'cows', src: '/images/IMG-20260920-WA0041.jpg', caption: 'Curious calves' },
  { id: 8, category: 'cows', src: '/images/IMG-20260920-WA0007.jpg', caption: 'Love and care' },
  { id: 9, category: 'cows', src: '/images/IMG-20260920-WA0008.jpg', caption: 'Majestic desi cows at sunset' },
  { id: 10, category: 'cows', src: '/images/IMG-20260920-WA0075.jpg', caption: 'Feeding time - green fodder' },
  { id: 11, category: 'cows', src: '/images/IMG-20260920-WA0080.jpg', caption: 'Cows enjoying their meal' },
  { id: 12, category: 'cows', src: '/images/IMG-20260920-WA0045.jpg', caption: 'Cow in shelter' },
  { id: 13, category: 'cows', src: '/images/IMG-20260920-WA0034.jpg', caption: 'Safe and sheltered' },
  // Construction
  { id: 14, category: 'construction', src: '/images/IMG-20260920-WA0028.jpg', caption: 'Foundation work in progress' },
  { id: 15, category: 'construction', src: '/images/IMG-20260920-WA0029.jpg', caption: 'Building the new gaushala' },
  { id: 16, category: 'construction', src: '/images/IMG-20260920-WA0044.jpg', caption: 'Steel structure work' },
  { id: 17, category: 'construction', src: '/images/IMG-20260920-WA0001.jpg', caption: 'Workers building with dedication' },
  { id: 18, category: 'construction', src: '/images/IMG-20260920-WA0009.jpg', caption: 'Structure taking shape' },
  { id: 19, category: 'construction', src: '/images/IMG-20260920-WA0000.jpg', caption: 'Night construction work' },
  { id: 20, category: 'construction', src: '/images/IMG-20260920-WA0061.jpg', caption: 'Construction site panorama' },
  { id: 21, category: 'construction', src: '/images/IMG-20260920-WA0080.jpg', caption: 'Workers installing steel beams' },
  // Treatment
  { id: 22, category: 'treatment', src: '/images/IMG-20260920-WA0037.jpg', caption: 'Treating injured cow' },
  { id: 23, category: 'treatment', src: '/images/IMG-20260920-WA0065.jpg', caption: 'Emergency medical care' },
  { id: 24, category: 'treatment', src: '/images/IMG-20260920-WA0035.jpg', caption: 'Cow under medical observation' },
];

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredItems =
    activeFilter === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  }, []);

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === 0 ? filteredItems.length - 1 : prev - 1
    );
  }, [filteredItems.length]);

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === filteredItems.length - 1 ? 0 : prev + 1
    );
  }, [filteredItems.length]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    },
    [closeLightbox, goToPrev, goToNext]
  );

  React.useEffect(() => {
    if (lightboxOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [lightboxOpen, handleKeyDown]);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-saffron-100 text-saffron-700 rounded-full text-sm font-body font-semibold mb-4">
            Photo Gallery
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-forest-900 mb-2">
            Our Gaushala
          </h2>
          <p className="font-gujarati text-lg text-saffron-600 mb-4">
            {"અમારી ગૌશાળા"}
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-saffron-400 to-gold-500 mx-auto rounded-full mb-6" />
          <p className="font-body text-lg text-gray-600 max-w-2xl mx-auto">
            See our work and the lives we touch every day
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-6 py-2.5 rounded-full font-body text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-saffron-500 to-gold-500 text-white shadow-lg shadow-saffron-500/30'
                    : 'bg-gray-100 text-gray-600 hover:bg-saffron-100 hover:text-saffron-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                className="group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="relative rounded-xl overflow-hidden aspect-square bg-gray-100">
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="font-body text-white text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && filteredItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
              aria-label="Close lightbox"
            >
              <FaTimes className="w-6 h-6 text-white" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
              aria-label="Previous image"
            >
              <FaChevronLeft className="w-5 h-5 text-white" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
              aria-label="Next image"
            >
              <FaChevronRight className="w-5 h-5 text-white" />
            </button>

            {/* Lightbox Content */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredItems[lightboxIndex]?.src}
                alt={filteredItems[lightboxIndex]?.caption}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg"
              />
              <div className="mt-4 text-center">
                <p className="font-body text-white text-lg">
                  {filteredItems[lightboxIndex]?.caption}
                </p>
                <p className="font-body text-white/50 text-sm mt-1">
                  {lightboxIndex + 1} / {filteredItems.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
