import React, { useState, useEffect } from 'react';
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
  FaUpload,
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
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalInitialType, setModalInitialType] = useState('');
  const [editItem, setEditItem] = useState(null);
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      switch (activeTab) {
        case 'services':
          const servicesRes = await servicesAPI.getAll();
          setServices(servicesRes.data);
          break;
        case 'portfolio':
          const portfolioRes = await portfolioAPI.getAll();
          setPortfolio(portfolioRes.data);
          break;
        case 'categories':
          try {
            const catsRes = await portfolioAPI.getCategories();
            const raw = catsRes.data || [];
            const normalized = raw.map(r => {
              if (typeof r === 'string') return { _id: r, name: r };
              return { _id: r._id || r.id || r.name, name: r.name || r };
            });
            setCategoriesList(normalized);
          } catch (err) {
            console.error('Failed to fetch categories:', err);
            setCategoriesList([]);
          }
          break;
        case 'reels':
          const allPortfolio = await portfolioAPI.getAll();
          setReels(allPortfolio.data.filter(item => item.type === 'video'));
          break;
        case 'testimonials':
          const testimonialsRes = await testimonialsAPI.getAll();
          setTestimonials(testimonialsRes.data);
          break;
        case 'contacts':
          const contactsRes = await contactAPI.getAll();
          setContacts(contactsRes.data);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {

            {/* Reels Tab */}
            {activeTab === 'reels' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-serif luxury-heading">Manage Reels</h2>
                  <button
                    onClick={() => openModal('portfolio', null, 'video')}
                    className="luxury-button flex items-center space-x-2"
                  >
                    <FaPlus />
                    <span>Add Reel</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {reels.map((item) => (
                    <div key={item._id} className="luxury-card">
                      <div className="relative h-48 mb-4 rounded-sm overflow-hidden bg-gray-900">
                        {item.mediaUrl ? (
                          <video
                            src={item.mediaUrl}
                            poster={item.poster || ''}
                            controls
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-luxury-gold">Video</div>
                        )}
                      </div>
                      <h3 className="text-sm font-serif text-luxury-gold mb-1">{item.title}</h3>
                      <p className="text-xs text-gray-400 mb-3">{item.category}</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openModal('portfolio', item, 'video')}
                          className="flex-1 bg-luxury-gold/20 border border-luxury-gold text-luxury-gold px-3 py-1 text-sm rounded-sm hover:bg-luxury-gold/30 transition-colors"
                        >
                          <FaEdit className="inline" />
                        </button>
                        <button
                          onClick={() => handleDelete('portfolio', item._id)}
                          className="bg-red-500/20 border border-red-500 text-red-400 px-3 py-1 text-sm rounded-sm hover:bg-red-500/30 transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const openModal = (type, item = null, initialType = '') => {
    setModalInitialType(initialType);
    setModalType(type);
    setEditItem(item);
    // If opening portfolio modal, ensure categories are loaded
    if (type === 'portfolio' && (!categoriesList || categoriesList.length === 0)) {
      (async () => {
        try {
          const res = await portfolioAPI.getCategories();
          const raw = res.data || [];
          const normalized = raw.map(r => {
            if (typeof r === 'string') return { _id: r, name: r };
            return { _id: r._id || r.id || r.name, name: r.name || r };
          });
          setCategoriesList(normalized);
        } catch (err) {
          console.error('Failed to fetch categories:', err);
        }
      })();
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setEditItem(null);
    setModalInitialType('');
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      switch (type) {
        case 'service':
          await servicesAPI.delete(id);
          break;
        case 'portfolio':
          await portfolioAPI.delete(id);
          break;
        case 'testimonial':
          await testimonialsAPI.delete(id);
          break;
        case 'contact':
          await contactAPI.delete(id);
          break;
        default:
          break;
      }
      fetchData();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete item');
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return alert('Enter a category name');
    try {
      await portfolioAPI.createCategory({ name: newCategoryName.trim() });
      setNewCategoryName('');
      fetchData();
    } catch (error) {
      console.error('Create category error:', error);
      const serverMessage = error?.response?.data?.error || 'Failed to create category';
      alert(serverMessage);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Delete this category? This will set related items to "Uncategorized".')) return;
    try {
      await portfolioAPI.deleteCategory(id);
      fetchData();
    } catch (error) {
      console.error('Delete category error:', error);
      alert('Failed to delete category');
    }
  };

  return (
    <div className="min-h-screen bg-luxury-black pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-luxury-black to-black border-b border-luxury-gold/20 py-6 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif luxury-heading">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">Welcome back, {currentUser?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 luxury-button-outline"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-black/50 border-b border-luxury-gold/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-6 overflow-x-auto">
            {[
              { id: 'services', label: 'Services', icon: FaCog },
              { id: 'portfolio', label: 'Portfolio', icon: FaImages },
              { id: 'categories', label: 'Categories', icon: FaTags },
              { id: 'reels', label: 'Reels', icon: FaPlay },
              { id: 'testimonials', label: 'Testimonials', icon: FaStar },
              { id: 'contacts', label: 'Contacts', icon: FaEnvelope }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-luxury-gold text-luxury-gold'
                    : 'border-transparent text-gray-400 hover:text-luxury-gold'
                }`}
              >
                <tab.icon />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Services Tab */}
            {activeTab === 'services' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-serif luxury-heading">Manage Services</h2>
                  <button
                    onClick={() => openModal('service')}
                    className="luxury-button flex items-center space-x-2"
                  >
                    <FaPlus />
                    <span>Add Service</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => (
                    <div key={service._id} className="luxury-card">
                      {service.imageUrl && (
                        <img
                          src={service.imageUrl}
                          alt={service.title}
                          className="w-full h-48 object-cover rounded-sm mb-4"
                        />
                      )}
                      <h3 className="text-xl font-serif text-luxury-gold mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3">{service.description}</p>
                      <p className="text-luxury-gold mb-4">{service.price}</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openModal('service', service)}
                          className="flex-1 bg-luxury-gold/20 border border-luxury-gold text-luxury-gold px-4 py-2 rounded-sm hover:bg-luxury-gold/30 transition-colors"
                        >
                          <FaEdit className="inline mr-2" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete('service', service._id)}
                          className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-2 rounded-sm hover:bg-red-500/30 transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-serif luxury-heading">Manage Portfolio</h2>
                  <button
                    onClick={() => openModal('portfolio')}
                    className="luxury-button flex items-center space-x-2"
                  >
                    <FaPlus />
                    <span>Add Portfolio Item</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {portfolio.map((item) => (
                    <div key={item._id} className="luxury-card">
                      <div className="relative h-48 mb-4 rounded-sm overflow-hidden">
                        {item.type === 'image' ? (
                          <img
                            src={item.mediaUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                            <span className="text-luxury-gold">Video</span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-sm font-serif text-luxury-gold mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-400 mb-3">{item.category}</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openModal('portfolio', item)}
                          className="flex-1 bg-luxury-gold/20 border border-luxury-gold text-luxury-gold px-3 py-1 text-sm rounded-sm hover:bg-luxury-gold/30 transition-colors"
                        >
                          <FaEdit className="inline" />
                        </button>
                        <button
                          onClick={() => handleDelete('portfolio', item._id)}
                          className="bg-red-500/20 border border-red-500 text-red-400 px-3 py-1 text-sm rounded-sm hover:bg-red-500/30 transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Categories Tab */}
            {activeTab === 'categories' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-serif luxury-heading">Manage Categories</h2>
                </div>

                <div className="mb-6">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="New category name"
                      className="luxury-input"
                    />
                    <button
                      onClick={handleCreateCategory}
                      className="luxury-button flex items-center space-x-2"
                    >
                      <FaPlus />
                      <span>Add</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {categoriesList.map((c) => (
                    <div key={c._id + c.name} className="luxury-card flex items-center justify-between">
                      <div className="text-luxury-gold font-medium">{c.name}</div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleDeleteCategory(c._id || c.name)}
                          className="bg-red-500/20 border border-red-500 text-red-400 px-3 py-1 text-sm rounded-sm hover:bg-red-500/30 transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonials Tab */}
            {activeTab === 'testimonials' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-serif luxury-heading">Manage Testimonials</h2>
                  <button
                    onClick={() => openModal('testimonial')}
                    className="luxury-button flex items-center space-x-2"
                  >
                    <FaPlus />
                    <span>Add Testimonial</span>
                  </button>
                </div>
                <div className="space-y-4">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial._id} className="luxury-card">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-serif text-luxury-gold">
                            {testimonial.clientName}
                          </h3>
                          <p className="text-sm text-gray-400">{testimonial.eventType}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openModal('testimonial', testimonial)}
                            className="bg-luxury-gold/20 border border-luxury-gold text-luxury-gold px-3 py-1 text-sm rounded-sm hover:bg-luxury-gold/30 transition-colors"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete('testimonial', testimonial._id)}
                            className="bg-red-500/20 border border-red-500 text-red-400 px-3 py-1 text-sm rounded-sm hover:bg-red-500/30 transition-colors"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm">{testimonial.review}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
              <div>
                <h2 className="text-2xl font-serif luxury-heading mb-6">Contact Inquiries</h2>
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div key={contact._id} className="luxury-card">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-serif text-luxury-gold">
                            {contact.fullName}
                          </h3>
                          <p className="text-sm text-gray-400">{contact.phone || contact.email}</p>
                          <p className="text-sm text-gray-400">
                            Event: {new Date(contact.eventDate).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDelete('contact', contact._id)}
                          className="bg-red-500/20 border border-red-500 text-red-400 px-3 py-1 text-sm rounded-sm hover:bg-red-500/30 transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                      <p className="text-gray-300 text-sm">{contact.message}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Received: {new Date(contact.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal */}
      {showModal && (
        <AdminModal
          type={modalType}
          item={editItem}
          onClose={closeModal}
          onSuccess={fetchData}
          initialType={modalInitialType}
          categories={categoriesList}
        />
      )}
    </div>
  );
};

// Admin Modal Component
const AdminModal = ({ type, item, onClose, onSuccess, initialType = '', categories = [] }) => {
  const [formData, setFormData] = useState(item || {});

  // Ensure defaults for new items (so selects have real values in state)
  useEffect(() => {
    if (!item) {
      setFormData(prev => ({
        ...prev,
        // default to image (or provided initialType) for portfolio media
        ...(type === 'portfolio' ? { type: prev.type || initialType || 'image' } : {})
      }));
    }
  }, [item, type]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const predefinedCategories = ['Bridal', 'Editorial', 'Fashion', 'Red Carpet'];
  const availableCategories = (categories && categories.length)
    ? categories.map(c => (typeof c === 'string' ? c : c.name))
    : predefinedCategories;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = async (e, fileType) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const uploadFn = fileType === 'video' ? uploadAPI.video : uploadAPI.image;
      const response = await uploadFn(formData);
      setFormData(prev => ({
        ...prev,
        mediaUrl: response.data.url,
        cloudinaryId: response.data.publicId
      }));
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Ensure payload includes required defaults
      const payload = { ...formData };
      if (!payload.type && type === 'portfolio') payload.type = initialType || 'image';

      // If 'Other' was selected and admin provided a new category, use it
      if (type === 'portfolio' && payload.category === 'Other' && newCategory) {
        payload.category = newCategory.trim();
      }

      // Debug log payload to help diagnose create errors
      console.log('Submitting payload for', type, payload);

      if (item) {
        // Update
        switch (type) {
          case 'service':
            await servicesAPI.update(item._id, payload);
            break;
          case 'portfolio':
            await portfolioAPI.update(item._id, payload);
            break;
          case 'testimonial':
            await testimonialsAPI.update(item._id, payload);
            break;
          default:
            break;
        }
      } else {
        // Create
        switch (type) {
          case 'service':
            await servicesAPI.create(payload);
            break;
          case 'portfolio':
            await portfolioAPI.create(payload);
            break;
          case 'testimonial':
            await testimonialsAPI.create(payload);
            break;
          default:
            break;
        }
      }
      onSuccess();
      // notify other parts of the app (Home) to refresh reels when a video portfolio item changes
      try {
        if (type === 'portfolio' && payload.type === 'video') {
          window.dispatchEvent(new CustomEvent('reelsUpdated'));
        }
      } catch (e) {
        // ignore if window not available in some environments
      }
      onClose();
    } catch (error) {
      console.error('Submit error:', error);
      // Try to show a helpful server error message when available
      const serverMessage = error?.response?.data?.error || error?.message || 'Failed to save item';
      alert(serverMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-luxury-black border border-luxury-gold/30 rounded-sm p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif luxury-heading">
            {item ? 'Edit' : 'Add'} {type.charAt(0).toUpperCase() + type.slice(1)}
          </h2>
          <button onClick={onClose} className="text-luxury-gold hover:text-luxury-gold-light">
            <FaTimes size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'service' && (
            <>
              <input
                type="text"
                name="title"
                value={formData.title || ''}
                onChange={handleChange}
                placeholder="Service Title"
                required
                className="luxury-input"
              />
              <textarea
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                placeholder="Description"
                required
                rows="3"
                className="luxury-input"
              />
              <input
                type="text"
                name="price"
                value={formData.price || ''}
                onChange={handleChange}
                placeholder="Price (e.g., Starting at $350)"
                
                className="luxury-input"
              />
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl || ''}
                onChange={handleChange}
                placeholder="Image URL"
                className="luxury-input"
              />
            </>
          )}

          {type === 'portfolio' && (
            <>
              <input
                type="text"
                name="title"
                value={formData.title || ''}
                onChange={handleChange}
                placeholder="Title"
                className="luxury-input"
              />
              <select
                name="category"
                value={formData.category || ''}
                onChange={handleChange}
                required
                className="luxury-input"
              >
                <option value="">Select Category</option>
                {availableCategories.map((c) => (
                  <option value={c} key={c}>{c}</option>
                ))}
                {/* If editing an item with a custom category, include it in the list */}
                {formData.category && !availableCategories.includes(formData.category) && formData.category !== 'Other' && (
                  <option value={formData.category}>{formData.category}</option>
                )}
                <option value="Other">Other (add new)</option>
              </select>
              {formData.category === 'Other' && (
                <input
                  type="text"
                  name="newCategory"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter new category"
                  className="luxury-input mt-2"
                />
              )}
              <select
                name="type"
                value={formData.type || 'image'}
                onChange={handleChange}
                required
                className="luxury-input"
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Upload Media</label>
                <input
                  type="file"
                  accept={formData.type === 'video' ? 'video/*' : 'image/*'}
                  onChange={(e) => handleFileUpload(e, formData.type)}
                  className="luxury-input"
                />
                {uploading && <p className="text-luxury-gold text-sm mt-2">Uploading...</p>}
              </div>
              {formData.mediaUrl && (
                <input
                  type="text"
                  name="mediaUrl"
                  value={formData.mediaUrl}
                  readOnly
                  className="luxury-input"
                  placeholder="Media URL (auto-filled after upload)"
                />
              )}
            </>
          )}

          {type === 'testimonial' && (
            <>
              <input
                type="text"
                name="clientName"
                value={formData.clientName || ''}
                onChange={handleChange}
                placeholder="Client Name"
                required
                className="luxury-input"
              />
              <textarea
                name="review"
                value={formData.review || ''}
                onChange={handleChange}
                placeholder="Review"
                required
                rows="4"
                className="luxury-input"
              />
              <input
                type="number"
                name="rating"
                value={formData.rating || 5}
                onChange={handleChange}
                min="1"
                max="5"
                placeholder="Rating (1-5)"
                className="luxury-input"
              />
              <input
                type="text"
                name="eventType"
                value={formData.eventType || ''}
                onChange={handleChange}
                placeholder="Event Type"
                className="luxury-input"
              />
              <input
                type="text"
                name="clientImage"
                value={formData.clientImage || ''}
                onChange={handleChange}
                placeholder="Client Image URL"
                className="luxury-input"
              />
            </>
          )}

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={loading || uploading}
              className="flex-1 luxury-button disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 luxury-button-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
