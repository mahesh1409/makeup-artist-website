import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { testimonialsAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= DEFAULT DATA ================= */

  const getDefaultTestimonials = () => [
    {
      _id: '1',
      clientName: 'Natalie Andrews',
      review:
        "There has a gift for understanding exactly what you can't even articulate. My bridal makeup was flawless, natural yet glamorous, and it stayed perfect through the tears, the heat, and the dancing.",
      rating: 5,
      eventType: 'Wedding',
      clientImage: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      _id: '2',
      clientName: 'Sophia Martinez',
      review:
        'Professional, punctual, and incredibly talented. The look she created was stunning and exactly what I envisioned.',
      rating: 5,
      eventType: 'Special Event',
      clientImage: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
      _id: '3',
      clientName: 'Emma Richardson',
      review:
        "I've worked with many makeup artists, but this was by far the best experience. Truly listens to what you want.",
      rating: 5,
      eventType: 'Photoshoot',
      clientImage: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
  ];

  /* ================= FETCH FUNCTION ================= */

  const fetchTestimonials = useCallback(async () => {
    try {
      setLoading(true);
      const response = await testimonialsAPI.getAll();
      setTestimonials(response.data || []);
    } catch (err) {
      console.error('Failed to fetch testimonials:', err);
      setTestimonials(getDefaultTestimonials());
    } finally {
      setLoading(false);
    }
  }, []);

  /* ================= EFFECT ================= */

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchTestimonials();
  }, [fetchTestimonials]);

  /* ================= LOADING ================= */

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
              Client Love
            </h1>
            <div className="gold-divider" />
            <p className="text-xl text-gray-300">
              Hear what my clients have to say about their experience
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 border border-luxury-gold/20 shadow-luxury"
            >
              <FaQuoteLeft className="text-luxury-gold text-3xl mb-4 opacity-50" />

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-luxury-gold" />
                ))}
              </div>

              <p className="italic text-gray-700 mb-6">
                “{testimonial.review}”
              </p>

              <div className="flex items-center border-t pt-4">
                <img
                  src={testimonial.clientImage}
                  alt={testimonial.clientName}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">{testimonial.clientName}</p>
                  <p className="text-sm text-gray-500">{testimonial.eventType}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
