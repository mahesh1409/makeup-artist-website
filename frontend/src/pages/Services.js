import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { servicesAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaCheck } from 'react-icons/fa';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await servicesAPI.getAll();
      setServices(response.data);
    } catch (err) {
      setError('Failed to load services');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
              Curated Services
            </h1>
            <div className="gold-divider" />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Elevated makeup experiences tailored to your occasion
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          {error && (
            <div className="text-center text-red-500 mb-8">{error}</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.length > 0 ? (
              services.map((service, index) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="luxury-card group cursor-pointer"
                >
                  {service.imageUrl && (
                    <div className="relative h-56 mb-4 overflow-hidden rounded-sm">
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-serif text-luxury-gold mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-2 mb-4">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-gray-400 text-sm">
                          <FaCheck className="text-luxury-gold mr-2 mt-1 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  <div className="border-t border-luxury-gold/20 pt-4 mt-4">
                    <p className="text-luxury-gold font-semibold text-xl">
                      {service.price}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              // Default Services if database is empty
              [
                {
                  title: 'Bridal Glamour',
                  description: 'Complete bridal makeup package including trial session, wedding day makeup, touch-up kit, and lash application. Perfect for your special day.',
                  price: 'Starting at $350',
                  features: [
                    'Pre-wedding consultation & trial',
                    'Airbrush foundation for flawless finish',
                    'Premium lash application',
                    'Touch-up kit included',
                    'Up to 8 hours wear guarantee'
                  ],
                  image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800'
                },
                {
                  title: 'Editorial & Print',
                  description: 'High-fashion makeup designed for photoshoots, magazines, and editorial work. Dramatic, camera-ready looks.',
                  price: 'Starting at $280',
                  features: [
                    'Concept consultation',
                    'Bold, high-impact looks',
                    'Photography-optimized application',
                    'On-location service available',
                    'Quick touch-ups between shots'
                  ],
                  image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800'
                },
                {
                  title: 'Red Carpet',
                  description: 'Glamorous makeup for galas, award shows, and special events. Look stunning under the spotlight.',
                  price: 'Starting at $320',
                  features: [
                    'Red carpet worthy glamour',
                    'Long-lasting formula',
                    'Contouring & highlighting',
                    'False lashes included',
                    'Last-minute touch-ups'
                  ],
                  image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800'
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="luxury-card group cursor-pointer"
                >
                  <div className="relative h-56 mb-4 overflow-hidden rounded-sm">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                  
                  <h3 className="text-2xl font-serif text-luxury-gold mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-gray-400 text-sm">
                        <FaCheck className="text-luxury-gold mr-2 mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="border-t border-luxury-gold/20 pt-4 mt-4">
                    <p className="text-luxury-gold font-semibold text-xl">
                      {service.price}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-luxury-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif luxury-heading mb-4">
              Ready to Book?
            </h2>
            <div className="gold-divider" />
            <p className="text-gray-300 mb-8 text-lg">
              Let's create something beautiful together. Schedule your appointment today.
            </p>
            <a href="/contact" className="luxury-button">
              Book Your Session
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
