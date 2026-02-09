import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { contactAPI } from '../services/api';
import { FaInstagram, FaWhatsapp, FaPhone, FaYoutube } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    eventDate: '',
    eventType: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await contactAPI.submit(formData);
      setSuccess(true);
      setFormData({
        fullName: '',
        phone: '',
        eventDate: '',
        eventType: '',
        message: ''
      });
      
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
              Secure Your Date
            </h1>
            <div className="gold-divider" />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Let's create magic together. Reach out for bookings and inquiries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-serif luxury-heading mb-6">
                Book Your Session
              </h2>
              
              {success && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-sm">
                  <p className="text-green-400">
                    Thank you! Your inquiry has been submitted successfully. We'll get back to you soon.
                  </p>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-sm">
                  <p className="text-red-400">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="luxury-input"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="luxury-input"
                    placeholder="+91 8169263774"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Event Type & Date *</label>
                  <input
                    type="text"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="luxury-input mb-3"
                    placeholder="e.g., Wedding, Photoshoot, Gala"
                  />
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    required
                    className="luxury-input"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="luxury-input resize-none"
                    placeholder="Tell me about your vision..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full luxury-button disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Submit Inquiry'}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-serif luxury-heading mb-6">
                  Get In Touch
                </h2>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  I'm currently accepting bookings for bridal, editorial, and special event makeup. 
                  For urgent inquiries or last-minute bookings, please reach out via phone or WhatsApp.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-luxury-gold/10 border border-luxury-gold/30 rounded-sm flex items-center justify-center group-hover:bg-luxury-gold/20 transition-colors">
                    <FaPhone className="text-luxury-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <a href="tel:+918169263774" className="text-luxury-gold hover:text-luxury-gold-light transition-colors">
                      +91 8169263774
                    </a>
                  </div>
                </div>

                {/* <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-luxury-gold/10 border border-luxury-gold/30 rounded-sm flex items-center justify-center group-hover:bg-luxury-gold/20 transition-colors">
                    <FaEnvelope className="text-luxury-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <a href="mailto:contact@lumiere.com" className="text-luxury-gold hover:text-luxury-gold-light transition-colors">
                      contact@lumiere.com
                    </a>
                  </div>
                </div> */}

                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-luxury-gold/10 border border-luxury-gold/30 rounded-sm flex items-center justify-center group-hover:bg-luxury-gold/20 transition-colors">
                    <FaWhatsapp className="text-luxury-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">WhatsApp</p>
                    <a href="https://wa.me/918169263774" target="_blank" rel="noopener noreferrer" className="text-luxury-gold hover:text-luxury-gold-light transition-colors">
                      +91 8169263774
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-luxury-gold/10 border border-luxury-gold/30 rounded-sm flex items-center justify-center group-hover:bg-luxury-gold/20 transition-colors">
                    <FaInstagram className="text-luxury-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Instagram</p>
                    <a href="https://www.instagram.com/hardika_makeoover?igsh=ODd6MTI4Y2hieDM3" target="_blank" rel="noopener noreferrer" className="text-luxury-gold hover:text-luxury-gold-light transition-colors">
                      @hardika_makeoover
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-luxury-gold/10 border border-luxury-gold/30 rounded-sm flex items-center justify-center group-hover:bg-luxury-gold/20 transition-colors">
                    <FaYoutube className="text-luxury-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">YouTube</p>
                    <a href="https://www.youtube.com/@Hardika_makeover" target="_blank" rel="noopener noreferrer" className="text-luxury-gold hover:text-luxury-gold-light transition-colors">
                      Hardika Makeover
                    </a>
                  </div>
                </div>

                <div className="mt-4">
                  <a href="https://www.youtube.com/@Hardika_makeover" target="_blank" rel="noopener noreferrer" className="luxury-button inline-flex items-center space-x-3">
                    <FaYoutube />
                    <span>Subscribe on YouTube</span>
                  </a>
                </div>
              </div>

              {/* Availability Note */}
              <div className="luxury-card mt-8">
                <h3 className="text-xl font-serif text-luxury-gold mb-3">
                  Booking Information
                </h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Bridal bookings: 3-6 months advance notice preferred</li>
                  <li>• Trial sessions available for bridal clients</li>
                  <li>• Travel available for destination events</li>
                  <li>• Group bookings welcome (bridal parties, etc.)</li>
                  <li>• Same-day bookings subject to availability</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map/Location Section (Optional) */}
      <section className="section-padding bg-luxury-gradient">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-serif luxury-heading mb-4">
            Service Areas
          </h2>
          <div className="gold-divider" />
          <p className="text-gray-300 max-w-2xl mx-auto">
            Based in Los Angeles, with services available worldwide for destination events. 
            Travel fees may apply for locations outside the greater LA area.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
