import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import hardikaImg from '../assets/hardika_makeoover.jpeg';
import { FaPlay } from 'react-icons/fa';
import { portfolioAPI, servicesAPI, testimonialsAPI } from '../services/api';

const Home = () => {

  const [reels, setReels] = useState([]);
  const [latestPhotos, setLatestPhotos] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const [playingVideoId, setPlayingVideoId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Disable scroll when modal open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedImage]);

  const fetchReels = async () => {
    try {
      const res = await portfolioAPI.getAll();
      const videos = (res.data || []).filter(item => item.type === 'video');
      const images = (res.data || []).filter(item => item.type === 'image');

      setReels(videos.slice(0, 9));
      setLatestPhotos(images.slice(0, 10));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await servicesAPI.getAll();
      const active = (res.data || []).filter(s => s.isActive !== false);
      setServices(active);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const res = await testimonialsAPI.getAll();
      const active = (res.data || []).filter(t => t.isActive !== false);
      setTestimonials(active.slice(0, 6));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReels();
    fetchServices();
    fetchTestimonials();
  }, []);

  return (
    <div className="pt-20">

      {/* ================= Latest Photos Section ================= */}

      <section className="section-padding bg-black/40">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-10">
            <h3 className="text-4xl font-serif text-luxury-gold mb-2">
              Latest Photos
            </h3>
            <div className="gold-divider mx-auto mb-3" />
            <p className="text-gray-400">
              A selection of our most recent stills
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {latestPhotos.map((p) => (
              <div
                key={p._id || p.id}
                onClick={() => setSelectedImage(p.mediaUrl)}
                className="luxury-card overflow-hidden group cursor-pointer transition duration-300 hover:border-luxury-gold"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={p.mediaUrl}
                    alt="Gallery"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Image Lightbox Modal ================= */}

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Preview"
                className="w-full max-h-[90vh] object-contain rounded-sm shadow-2xl"
              />

              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white text-4xl font-light hover:text-luxury-gold transition"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Home;
