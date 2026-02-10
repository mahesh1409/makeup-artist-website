import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
/* import { FaAward, FaHeart, FaStar } from 'react-icons/fa';
 */import hardikaImg from '../assets/hardika_makeoover.jpeg';
import { FaAward, FaHeart } from "react-icons/fa";


const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-luxury-gradient">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h1 className="text-5xl md:text-6xl font-serif luxury-heading mb-4">
              The Art of Beauty
            </h1>
            <div className="gold-divider" />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Where passion meets perfection, and every face tells a story
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main About Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-sm overflow-hidden shadow-luxury-lg">
                <img
                  src={hardikaImg}
                  alt="Hardika Makeover - Hardika Dhobale"
                  className="w-full h-auto max-h-[700px] object-contain"
                />
                <div className="absolute inset-0 border-4 border-luxury-gold/30 pointer-events-none" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-4 border-luxury-gold" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-serif luxury-heading mb-6">
                Hardika Dhobale
              </h2>
              <div className="w-16 h-0.5 bg-luxury-gold mb-6" />
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Beauty is not just about appearance, it is about confidence, 
                self-love, and the way we present ourselves to the world. For me, 
                makeup is a powerful tool to enhance what's already beautiful.
              </p>

              <p className="text-gray-300 mb-6 leading-relaxed">
                With over a decade of experience in the beauty industry, I've had 
                the privilege of working with celebrities, brides, editorial shoots, 
                and fashion runways. My passion lies in creating timeless, elegant 
                looks that make every client feel like the best version of themselves.
              </p>

              <p className="text-gray-300 mb-8 leading-relaxed">
                My philosophy is simple: <span className="text-luxury-gold italic">
                  "Great makeup starts with great skin."
                </span> I believe in enhancing natural beauty with refined techniques, 
                using only premium products that deliver flawless, long-lasting results.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <FaAward className="text-luxury-gold text-3xl mx-auto mb-2" />
                  <p className="text-3xl font-bold text-luxury-gold">2+</p>
                  <p className="text-sm text-gray-400">Years Experience</p>
                </div>
                <div className="text-center">
                  <FaHeart className="text-luxury-gold text-3xl mx-auto mb-2" />
                  <p className="text-3xl font-bold text-luxury-gold">100+</p>
                  <p className="text-sm text-gray-400">Happy Clients</p>
                </div>
                {/* <div className="text-center">
                  <FaStar className="text-luxury-gold text-3xl mx-auto mb-2" />
                  <p className="text-3xl font-bold text-luxury-gold">50+</p>
                  <p className="text-sm text-gray-400">Awards Won</p>
                </div> */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding bg-gradient-radial from-luxury-black via-black to-luxury-black">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif luxury-heading mb-4">
              My Approach
            </h2>
            <div className="gold-divider" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Personalized Consultation',
                description: 'Every client is unique. I take time to understand your vision, skin type, and desired look.',
                icon: '💎'
              },
              {
                title: 'Premium Products',
                description: 'I exclusively use high-end, cruelty-free products that ensure flawless results and skin health.',
                icon: '✨'
              },
              {
                title: 'Timeless Elegance',
                description: 'My signature style blends classic beauty with contemporary trends for looks that last.',
                icon: '👑'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="luxury-card text-center"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-serif text-luxury-gold mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif luxury-heading mb-4">
              Credentials & Training
            </h2>
            <div className="gold-divider" />
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="luxury-card">
                <p className="text-luxury-gold mb-2">🎓 Master Makeup Artist Certification</p>
                <p className="text-gray-400 text-sm">International Beauty Academy, 2014</p>
              </div>
              <div className="luxury-card">
                <p className="text-luxury-gold mb-2">🎨 Advanced Bridal Specialist</p>
                <p className="text-gray-400 text-sm">Luxury Bridal Institute, 2016</p>
              </div>
              <div className="luxury-card">
                <p className="text-luxury-gold mb-2">📸 Editorial & Fashion Makeup</p>
                <p className="text-gray-400 text-sm">Fashion Week Academy, 2017</p>
              </div>
              <div className="luxury-card">
                <p className="text-luxury-gold mb-2">💄 Celebrity Makeup Masterclass</p>
                <p className="text-gray-400 text-sm">Hollywood Beauty School, 2018</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
