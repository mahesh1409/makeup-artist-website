import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ReactPlayer from 'react-player';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { FaTimes } from 'react-icons/fa';

const Portfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPortfolio();
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchPortfolio();
  }, [selectedCategory]);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const response = await portfolioAPI.getAll(selectedCategory);
      // Do not include videos in the public portfolio grid
      const items = (response.data || []).filter(it => it.type !== 'video');
      setPortfolioItems(items);
    } catch (err) {
      console.error('Failed to fetch portfolio:', err);
      // Load default portfolio items
      setPortfolioItems(getDefaultPortfolio());
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await portfolioAPI.getCategories();
      const raw = response.data || [];
      const names = raw.map(r => (typeof r === 'string' ? r : r.name));
      setCategories(['All', ...names]);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      setCategories(['All', 'Bridal', 'Editorial', 'Fashion', 'Red Carpet']);
    }
  };

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
    {
      _id: '4',
      title: 'Natural Bridal Glow',
      category: 'Bridal',
      type: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200',
    },
    {
      _id: '5',
      title: 'Bold Editorial Statement',
      category: 'Editorial',
      type: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200',
    },
    {
      _id: '6',
      title: 'Fashion Week Look',
      category: 'Fashion',
      type: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1583001931096-959a9f7a9e6f?w=1200',
    },
  ];

  const filteredItems = selectedCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  if (loading) return <div className="pt-20"><LoadingSpinner /></div>;

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-luxury-gradient">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-serif luxury-heading mb-4">
              Portfolio
            </h1>
            <div className="gold-divider" />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A glimpse into my world of beauty and artistry
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-black/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-luxury-gold text-luxury-black shadow-luxury'
                    : 'border border-luxury-gold/30 text-luxury-gold hover:bg-luxury-gold/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative group cursor-pointer overflow-hidden rounded-sm shadow-luxury"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="aspect-square overflow-hidden bg-gray-900">
                    {item.type === 'image' ? (
                      <LazyLoadImage
                        src={item.mediaUrl}
                        alt={item.title}
                        effect="blur"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="relative w-full h-full">
                        <ReactPlayer
                          url={item.mediaUrl}
                          width="100%"
                          height="100%"
                          playing={false}
                          muted
                          className="react-player"
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-xs text-luxury-gold mb-1">{item.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 text-luxury-gold hover:text-luxury-gold-light transition-colors"
              >
                <FaTimes size={24} />
              </button>
              
              {selectedItem.type === 'image' ? (
                <img
                  src={selectedItem.mediaUrl}
                  alt={selectedItem.title}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-sm"
                />
              ) : (
                <ReactPlayer
                  url={selectedItem.mediaUrl}
                  width="100%"
                  height="auto"
                  controls
                  playing
                />
              )}
              
                <div className="mt-4 text-center">
                <p className="text-luxury-gold text-sm mb-1">{selectedItem.category}</p>
                {selectedItem.description && (
                  <p className="text-gray-400 mt-2">{selectedItem.description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
