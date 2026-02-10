import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { testimonialsAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  /* useEffect(() => {
    window.scrollTo(0, 0);
    fetchTestimonials();
  }, []);
 */
  useEffect(() => {
  window.scrollTo(0, 0);
  fetchTestimonials();
}, [fetchTestimonials]);

  /* const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await testimonialsAPI.getAll();
      setTestimonials(response.data);
    } catch (err) {
      console.error('Failed to fetch testimonials:', err);
      // Load default testimonials
      setTestimonials(getDefaultTestimonials());
    } finally {
      setLoading(false);
    }
  };
 */
  const fetchTestimonials = useCallback(async () => {
  try {
    setLoading(true);
    const response = await testimonialsAPI.getAll();
    setTestimonials(response.data);
  } catch (err) {
    console.error('Failed to fetch testimonials:', err);
    setTestimonials(getDefaultTestimonials());
  } finally {
    setLoading(false);
  }
}, []);

  const getDefaultTestimonials = () => [
    {
      _id: '1',
      clientName: 'Natalie Andrews',
      review: 'There has a gift for understanding exactly what you can\'t even articulate. My bridal makeup was flawless, natural yet glamorous, and it stayed perfect through the tears, the heat, and the dancing. I felt like the most beautiful version of myself. Highly recommended.',
      rating: 5,
      eventType: 'Wedding',
      clientImage: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
      _id: '2',
      clientName: 'Sophia Martinez',
      review: 'Professional, punctual, and incredibly talented. She look she created for our Vegas celebration was stunning and exactly what I envisioned. The makeup lasted all night and the photos turned out perfect. Worth every penny!',
      rating: 5,
      eventType: 'Special Event',
      clientImage: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      _id: '3',
      clientName: 'Emma Richardson',
      review: 'I\'ve worked with many makeup artists, but Elena is by far the best. Her technique is impeccable, her products are top-tier, and she truly listens to what you want. I always feel confident and camera-ready after a session with her.',
      rating: 5,
      eventType: 'Photoshoot',
      clientImage: 'https://randomuser.me/api/portraits/women/3.jpg'
    }
  ];

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
              Client Love
            </h1>
            <div className="gold-divider" />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Hear what my clients have to say about their experience
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white border border-luxury-gold/20 rounded-sm p-8 shadow-luxury hover:shadow-luxury-lg transition-all duration-300"
              >
                {/* Quote Icon */}
                <FaQuoteLeft className="text-luxury-gold text-3xl mb-4 opacity-50" />

                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-luxury-gold" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.review}"
                </p>

                {/* Client Info */}
                <div className="flex items-center border-t border-luxury-gold/20 pt-6">
                  {testimonial.clientImage && (
                    <img
                      src={testimonial.clientImage}
                      alt={testimonial.clientName}
                      className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-luxury-gold/30"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-luxury-black">
                      {testimonial.clientName}
                    </p>
                    {testimonial.eventType && (
                      <p className="text-sm text-gray-600">{testimonial.eventType}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-luxury-gradient">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { number: '100+', label: 'Happy Clients' },
              { number: '98%', label: 'Satisfaction Rate' },
              { number: '2+', label: 'Years Experience' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-5xl font-serif text-luxury-gold mb-2">{stat.number}</p>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif text-luxury-gold mb-4">
              Join Our Happy Clients
            </h2>
            <div className="w-24 h-0.5 bg-luxury-gold mx-auto my-4" />
            <p className="text-gray-700 mb-8 text-lg">
              Experience the art of luxury makeup. Book your session today.
            </p>
            <a href="/contact" className="luxury-button">
              Book Your Appointment
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
