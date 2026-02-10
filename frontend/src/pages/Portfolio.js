import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
/* import ReactPlayer from 'react-player';
 */import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { FaTimes } from 'react-icons/fa';

const Portfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  /* ================= DEFAULT DATA ================= */

  const getDefaultPortfolio = () => [
    {
      _id: '1',
      title: 'Elegant Bridal Look',
      category: 'Bridal',
      type: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=1200',
    },
    {
      _id: '2',
      title: 'High Fashion Editorial',
      category: 'Editorial',
      type: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1200',
    },
    {
      _id: '3',
      title: 'Red Carpet Glamour',
      category: 'Red Carpet',
      type: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200',
    },
  ];

  /* ================= FETCH FUNCTIONS ================= */

  const fetchPortfolio = useCallback(async () => {
    try {
      setLoading(true);
      const response = await portfolioAPI.getAll(selectedCategory);
      const items = (response.data || []).filter(it => it.type !== 'video');
      setPortfolioItems(items);
    } catch (err) {
      console.error('Failed to fetch portfolio:', err);
      setPortfolioItems(getDefaultPortfolio());
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await portfolioAPI.getCategories();
      const raw = response.data || [];
      const names = raw.map(r => (typeof r === 'string' ? r : r.name));
      setCategories(['All', ...names]);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      setCategories(['All', 'Bridal', 'Editorial', 'Fashion', 'Red Carpet']);
    }
  }, []);

  /* ================= EFFECTS ================= */

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  /* ================= FILTER ================= */

  const filteredItems =
    selectedCategory === 'All'
      ? portfolioItems
      : portfolioItems.filter(item => item.category === selectedCategory);

  if (loading) {
    return (
      <div className="pt-20">
        <LoadingSpinner />
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding bg-luxury-gradient">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-6xl font-serif luxury-heading mb-4">
              Portfolio
            </h1>
            <div className="gold-divider" />
            <p className="text-xl text-gray-300">
              A glimpse into my world of beauty and artistry
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-black/50">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-sm transition ${
                selectedCategory === category
                  ? 'bg-luxury-gold text-black'
                  : 'border border-luxury-gold text-luxury-gold'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <LazyLoadImage
                src={item.mediaUrl}
                alt={item.title}
                effect="blur"
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
            onClick={() => setSelectedItem(null)}
          >
            <div onClick={e => e.stopPropagation()} className="relative max-w-5xl">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 text-luxury-gold"
              >
                <FaTimes size={24} />
              </button>

              <img
                src={selectedItem.mediaUrl}
                alt={selectedItem.title}
                className="max-h-[80vh]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
