import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import {
  servicesAPI,
  portfolioAPI,
  testimonialsAPI,
  contactAPI,
  uploadAPI
} from '../../services/api';
import {
  FaSignOutAlt,
  FaCog,
  FaImages,
  FaStar,
  FaEnvelope,
  FaPlus,
  FaTags,
  FaEdit,
  FaTrash,
  FaTimes,
  FaPlay
} from 'react-icons/fa';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('services');
  const [services, setServices] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [reels, setReels] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalInitialType, setModalInitialType] = useState('');
  const [editItem, setEditItem] = useState(null);

  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  // ✅ FIXED: useCallback first
  const fetchData = useCallback(async () => {
    try {
      switch (activeTab) {
        case 'services': {
          const res = await servicesAPI.getAll();
          setServices(res.data);
          break;
        }
        case 'portfolio': {
          const res = await portfolioAPI.getAll();
          setPortfolio(res.data);
          break;
        }
        case 'categories': {
          const res = await portfolioAPI.getCategories();
          const normalized = (res.data || []).map(r =>
            typeof r === 'string'
              ? { _id: r, name: r }
              : { _id: r._id || r.name, name: r.name }
          );
          setCategoriesList(normalized);
          break;
        }
        case 'reels': {
          const res = await portfolioAPI.getAll();
          setReels(res.data.filter(i => i.type === 'video'));
          break;
        }
        case 'testimonials': {
          const res = await testimonialsAPI.getAll();
          setTestimonials(res.data);
          break;
        }
        case 'contacts': {
          const res = await contactAPI.getAll();
          setContacts(res.data);
          break;
        }
        default:
          break;
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
  }, [activeTab]);

  // ✅ FIXED dependency
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const openModal = (type, item = null, initialType = '') => {
    setModalType(type);
    setEditItem(item);
    setModalInitialType(initialType);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setEditItem(null);
    setModalInitialType('');
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      if (type === 'service') await servicesAPI.delete(id);
      if (type === 'portfolio') await portfolioAPI.delete(id);
      if (type === 'testimonial') await testimonialsAPI.delete(id);
      if (type === 'contact') await contactAPI.delete(id);
      fetchData();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="min-h-screen bg-luxury-black pt-20">
      {/* header + tabs + content (UNCHANGED UI) */}
      {/* YOUR EXISTING JSX HERE — no logic changes */}
    </div>
  );
};

/* ================= MODAL ================= */

const AdminModal = ({ type, item, onClose, onSuccess, initialType = '', categories = [] }) => {
  const [formData, setFormData] = useState(item || {});
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ RESTORED
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    if (!item && type === 'portfolio') {
      setFormData(prev => ({ ...prev, type: initialType || 'image' }));
    }
  }, [item, type, initialType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (item) {
        if (type === 'service') await servicesAPI.update(item._id, formData);
        if (type === 'portfolio') await portfolioAPI.update(item._id, formData);
        if (type === 'testimonial') await testimonialsAPI.update(item._id, formData);
      } else {
        if (type === 'service') await servicesAPI.create(formData);
        if (type === 'portfolio') await portfolioAPI.create(formData);
        if (type === 'testimonial') await testimonialsAPI.create(formData);
      }
      onSuccess();
      onClose();
    } catch (err) {
      alert('Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center">
      {/* modal JSX unchanged */}
    </div>
  );
};

export default AdminDashboard;
