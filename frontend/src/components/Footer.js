import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp, FaPhone, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-luxury-gold/20 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-3xl font-serif font-bold text-luxury-gold mb-4">
              Hardika Makeover
            </h3>
            <p className="text-gray-400 mb-4">
              Redefining elegance through professional makeup artistry for the modern muse.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://www.instagram.com/hardika_makeoover?igsh=ODd6MTI4Y2hieDM3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-luxury-gold hover:text-luxury-gold-light transition-colors duration-300"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://wa.me/918169263774"
                target="_blank"
                rel="noopener noreferrer"
                className="text-luxury-gold hover:text-luxury-gold-light transition-colors duration-300"
              >
                <FaWhatsapp size={24} />
              </a>
              <a
                href="https://www.youtube.com/@Hardika_makeover"
                target="_blank"
                rel="noopener noreferrer"
                className="text-luxury-gold hover:text-luxury-gold-light transition-colors duration-300"
              >
                <FaYoutube size={24} />
              </a>
            </div>

            <div className="mt-4">
              <a
                href="https://www.youtube.com/@Hardika_makeover"
                target="_blank"
                rel="noopener noreferrer"
                className="luxury-button inline-flex items-center space-x-3"
              >
                <FaYoutube />
                <span>Subscribe on YouTube</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-serif text-luxury-gold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-luxury-gold transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-luxury-gold transition-colors duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-luxury-gold transition-colors duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-400 hover:text-luxury-gold transition-colors duration-300">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-luxury-gold transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-serif text-luxury-gold mb-4">Get In Touch</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center space-x-2">
                <FaPhone className="text-luxury-gold" />
                <a href="tel:+918169263774" className="text-gray-400 hover:text-luxury-gold transition-colors">+91 8169263774</a>
              </li>
              {/* email contact removed */}
              <li className="text-sm mt-4">
                Available for bookings worldwide
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-luxury-gold/20 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Hardika Makeover. All rights reserved. Crafted with elegance.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
