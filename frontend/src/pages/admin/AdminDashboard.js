import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import {
  servicesAPI,
  portfolioAPI,
  testimonialsAPI,
  contactAPI
} from '../../services/api';

/* ================= DASHBOARD ================= */

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('services');

  const [services, setServices] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalInitialType, setModalInitialType] = useState('');
  const [editItem, setEditItem] = useState(null);

  const { logout } = useAuth();
  const navigate = useNavigate();

  /* ================= FETCH ================= */

  const fetchData = useCallback(async () => {
    try {
      switch (activeTab) {
        case 'services': {
          const res = await servicesAPI.getAll();
          setServices(res.data || []);
          break;
        }
        case 'portfolio': {
          const res = await portfolioAPI.getAll();
          setPortfolio(res.data || []);
          break;
        }
        case 'categories': {
          const res = await portfolioAPI.getCategories();
          setCategoriesList(
            (res.data || []).map(c =>
              typeof c === 'string'
                ? { _id: c, name: c }
                : { _id: c._id || c.name, name: c.name }
            )
          );
          break;
        }
        case 'testimonials': {
          const res = await testimonialsAPI.getAll();
          setTestimonials(res.data || []);
          break;
        }
        case 'contacts': {
          const res = await contactAPI.getAll();
          setContacts(res.data || []);
          break;
        }
        default:
          break;
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /* ================= ACTIONS ================= */

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
    } catch {
      alert('Delete failed');
    }
  };

  /* ================= UI ================= */

  const renderList = (items, type) => (
    <div className="space-y-3">
      {items.map(item => (
        <div
          key={item._id}
          className="flex justify-between items-center bg-white/10 p-3 rounded"
        >
          <span>{item.title || item.name || item.clientName}</span>
          <div className="flex gap-2">
            <button
              onClick={() => openModal(type, item)}
              className="px-3 py-1 bg-blue-600 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(type, item._id)}
              className="px-3 py-1 bg-red-600 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-luxury-black pt-20 text-white px-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 rounded"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {['services', 'portfolio', 'categories', 'testimonials', 'contacts'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab ? 'bg-gold text-black' : 'bg-white/10'
            }`}
          >
            {tab}
          </button>
        ))}
        <button
          onClick={() => openModal(activeTab)}
          className="ml-auto px-4 py-2 bg-green-600 rounded"
        >
          + Add
        </button>
      </div>

      {/* Content */}
      {activeTab === 'services' && renderList(services, 'service')}
      {activeTab === 'portfolio' && renderList(portfolio, 'portfolio')}
      {activeTab === 'categories' && renderList(categoriesList, 'category')}
      {activeTab === 'testimonials' && renderList(testimonials, 'testimonial')}
      {activeTab === 'contacts' && renderList(contacts, 'contact')}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <AdminModal
            type={modalType}
            item={editItem}
            initialType={modalInitialType}
            categories={categoriesList}
            onClose={closeModal}
            onSuccess={fetchData}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

/* ================= MODAL ================= */

const AdminModal = ({
  type,
  item,
  onClose,
  onSuccess,
  initialType = '',
  categories = []
}) => {
  const [formData, setFormData] = useState(item || {});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!item && type === 'portfolio') {
      setFormData(prev => ({ ...prev, type: initialType || 'image' }));
    }
  }, [item, type, initialType]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
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
    } catch {
      alert('Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black rounded-xl p-6 w-full max-w-lg"
      >
        <h2 className="text-xl font-bold mb-4">
          {item ? 'Edit' : 'Add'} {type}
        </h2>

        <input
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
          placeholder="Title"
          className="w-full mb-4 p-2 border rounded"
        />

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="px-4 py-2 bg-black text-white rounded">
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AdminDashboard;
