import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import hardikaImg from '../assets/hardika_makeoover.jpeg';
import { FaPlay } from 'react-icons/fa';
import { portfolioAPI, servicesAPI, testimonialsAPI } from '../services/api';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const [reels, setReels] = useState([]);
  const [latestPhotos, setLatestPhotos] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialSlide, setTestimonialSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const viewportRef = useRef(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const CARD_GAP = 20; // px gap between cards
  const [playingVideoId, setPlayingVideoId] = useState(null);

  const fetchReels = async () => {
    try {
      const res = await portfolioAPI.getAll();
      const videos = (res.data || []).filter(item => item.type === 'video');
      setReels(videos.slice(0, 9)); // limit to latest 9 reels
      // Also set latest photos (images) limited to 10
      const images = (res.data || []).filter(item => item.type === 'image');
      setLatestPhotos(images.slice(0, 10));
    } catch (err) {
      console.error('Failed to load reels', err);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await servicesAPI.getAll();
      const items = res.data || [];
      const active = items.filter(s => s.isActive !== false).sort((a, b) => (a.order || 0) - (b.order || 0));
      setServices(active);
    } catch (err) {
      console.error('Failed to load services', err);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const res = await testimonialsAPI.getAll();
      const items = (res.data || []).filter(t => t.isActive !== false);
      setTestimonials(items.slice(0, 6));
    } catch (err) {
      console.error('Failed to load testimonials', err);
    }
  };

  // helper: chunk array into groups of size n
/*   const chunk = (arr, n) => {
    const res = [];
    for (let i = 0; i < arr.length; i += n) res.push(arr.slice(i, i + n));
    return res;
  }; */

  // set itemsPerSlide responsive
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setItemsPerSlide(1);
      else if (w < 1024) setItemsPerSlide(2);
      else setItemsPerSlide(3);
      setViewportWidth(viewportRef.current ? viewportRef.current.clientWidth : 0);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // auto-advance testimonial slides
  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;
    const maxIndex = Math.max(0, testimonials.length - itemsPerSlide);
    // ensure current slide within bounds
    setTestimonialSlide(s => Math.min(s, maxIndex));
    const id = setInterval(() => {
      setTestimonialSlide(s => {
        const next = Math.min(s + 1, maxIndex);
        return next > maxIndex ? 0 : (s + 1) % (maxIndex + 1);
      });
    }, 4500);
    return () => clearInterval(id);
  }, [testimonials, itemsPerSlide]);
/* 
  useEffect(() => {
    fetchReels();
    fetchServices();
    fetchTestimonials();
    const handler = () => fetchReels();
    window.addEventListener('reelsUpdated', handler);
    return () => window.removeEventListener('reelsUpdated', handler);
  }, []); */
  useEffect(() => {
  fetchReels();
  fetchServices();
  fetchTestimonials();

  const handler = () => fetchReels();
  window.addEventListener('reelsUpdated', handler);

  return () => window.removeEventListener('reelsUpdated', handler);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(10, 10, 10, 0.5), rgba(10, 10, 10, 0.7)), url(https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-luxury-gold mb-6">
              Redefining Elegance
            </h1>
            <div className="gold-divider" />
            <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light tracking-wide">
              Professional Artistry for the Modern Muse
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/portfolio" className="luxury-button">
                View Portfolio
              </Link>
              <Link to="/contact" className="luxury-button-outline">
                Book Now
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-luxury-gold rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-luxury-gold rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Featured Services Preview */}
      <section className="section-padding bg-gradient-radial from-luxury-black via-black to-luxury-black">
        <div className="max-w-7xl mx-auto">
          {/* About section with framed image and details */}
          <motion.div className="mb-12" {...fadeInUp}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="flex justify-center lg:justify-end">
                <div className="about-frame relative">
                  <img
                    src={hardikaImg}
                    alt="Hardika Dhobale"
                    className="about-image"
                  />
                  <div className="about-badge" aria-hidden="true" />
                </div>
              </div>

              <div className="px-4 lg:px-0">
                <div className="flex items-center gap-6">
                  <h3 className="text-4xl font-serif luxury-heading">About</h3>
                  <div className="gold-divider" style={{ width: '5rem' }} />
                </div>

                <h4 className="text-2xl font-serif text-luxury-gold mt-4">Hardika Dhobale</h4>

                <p className="text-gray-400 mt-4 max-w-xl">
                  Meet Hardika Dhobale, a passionate and skilled professional makeup
                  artist dedicated to enhancing your natural beauty. With years of
                  experience and certified training, she transforms her clients' visions
                  into stunning reality. Hardika specializes in bridal makeup, party looks,
                  and special event styling, ensuring every client feels confident and
                  beautiful on their special day.
                </p>

                <ul className="mt-6 space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="w-3 h-3 rounded-full bg-luxury-gold mt-1" />
                    <span className="text-gray-200">Certified Professional Makeup Artist</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-3 h-3 rounded-full bg-luxury-gold mt-1" />
                    <span className="text-gray-200">2+ Years Experience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-3 h-3 rounded-full bg-luxury-gold mt-1" />
                    <span className="text-gray-200">100+ Happy Clients</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-serif luxury-heading mb-4">
              Signature Services
            </h2>
            <div className="gold-divider" />
            <p className="text-gray-400 max-w-2xl mx-auto">
              Elevate your beauty with bespoke makeup artistry tailored to your vision
            </p>
          </motion.div>

          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service._id || index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="luxury-card group cursor-pointer overflow-hidden"
                >
                  <div className="relative h-64 mb-4 overflow-hidden rounded-sm">
                    <img
                      src={service.imageUrl || 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=800'}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                  <h3 className="text-2xl font-serif text-luxury-gold mb-2">{service.title}</h3>
                  <p className="text-gray-400 mb-4">{service.description}</p>
                  {service.price && <p className="text-luxury-gold font-semibold">Starting at {service.price}</p>}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400">No services available yet.</div>
          )}

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link to="/services" className="luxury-button-outline">
              View All Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Reels Section */}
      <section className="section-padding bg-black/40">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-8" {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-serif luxury-heading mb-2">Reels</h2>
            <div className="gold-divider" />
            <p className="text-gray-400 max-w-2xl mx-auto">Short videos showcasing our work</p>
          </motion.div>

          <motion.div
            className="reels-grid"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {reels.length === 0 && (
              <div className="text-gray-400 col-span-full">No reels available yet.</div>
            )}

            {reels.map((r) => {
              const vidId = `video-${r._id || r.id}`;
              return (
                <div key={r._id || r.id} className="reel-card">
                  <div className="reel-aspect relative">
                    {r.mediaUrl ? (
                      <>
                        <video
                          id={vidId}
                          src={r.mediaUrl}
                          poster={r.thumbnail || r.poster || r.mediaUrl}
                          controls
                          className="reel-video"
                          onPlay={() => setPlayingVideoId(vidId)}
                          onPause={() => setPlayingVideoId(null)}
                        />

                        {/* Centered Play Overlay */}
                        {playingVideoId !== vidId && (
                          <button
                            className="reel-play-overlay"
                            onClick={() => document.getElementById(vidId)?.play()}
                            aria-label="Play reel"
                          >
                            <FaPlay className="reel-play-button" />
                          </button>
                        )}
                      </>
                    ) : (
                      <img src={r.thumbnail || r.mediaUrl || r.poster} alt={r.title} className="reel-poster" />
                    )}
                  </div>
                  <div className="px-4 py-3">
                    {/* Title intentionally hidden for reels */}
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Latest Photos below reels */}
          <motion.div className="mt-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-center mb-6">
              <h3 className="text-3xl font-serif luxury-heading">Latest Photos</h3>
              <div className="gold-divider" />
              <p className="text-gray-400 max-w-2xl mx-auto">A selection of our most recent stills</p>
            </div>

           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
  {latestPhotos.map((p) => (
    <div key={p._id || p.id} className="luxury-card overflow-hidden group">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={p.mediaUrl}
          alt={p.title || 'Photo'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </div>
  ))}
</div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      {/* Testimonials Section (clients reviews) */}
      <section className="section-padding bg-black/30">
        <div className="max-w-7xl mx-auto text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-serif luxury-heading mb-2">What Clients Say</h2>
          <div className="gold-divider mx-auto mb-4" style={{ width: '6rem' }} />
          <p className="text-gray-400 max-w-2xl mx-auto">Real reviews from clients — only published testimonials are shown.</p>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          {testimonials.length === 0 ? (
            <div className="text-center text-gray-400">No testimonials available yet.</div>
          ) : (
            <div className="testimonials-viewport" ref={viewportRef}>
              <div
                className="testimonials-track"
                style={{ gap: `${CARD_GAP}px`, transform: `translateX(-${testimonialSlide * ((viewportWidth / itemsPerSlide) + CARD_GAP)}px)` }}
              >
                {testimonials.map((t, i) => {
                  const cardStyle = viewportWidth
                    ? { flex: `0 0 ${viewportWidth / itemsPerSlide}px`, maxWidth: `${viewportWidth / itemsPerSlide}px` }
                    : { flex: `0 0 ${100 / itemsPerSlide}%` };
                  return (
                    <div key={t._id || i} className="testimonial-card bg-gradient-to-br from-gray-900 to-black border border-luxury-gold/10 p-6 rounded-sm" style={cardStyle}>
                      <div className="flex items-start gap-4">
                        <img src={t.clientImage || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200'} alt={t.clientName} className="w-12 h-12 rounded-full object-cover" />
                        <div className="flex-1 text-left">
                          <div className="flex items-center justify-between">
                            <h4 className="text-luxury-gold font-serif">{t.clientName}</h4>
                            <div className="text-sm text-yellow-400">{Array.from({ length: t.rating || 5 }).map((_, idx) => '★').join('')}</div>
                          </div>
                            <p className="text-gray-400 mt-3">{t.review}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section-padding bg-luxury-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif luxury-heading mb-6">
              Ready to Transform?
            </h2>
            <div className="gold-divider" />
            <p className="text-xl text-gray-300 mb-8">
              Book your consultation and discover the art of luxury makeup
            </p>
            <Link to="/contact" className="luxury-button">
              Secure Your Date
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
