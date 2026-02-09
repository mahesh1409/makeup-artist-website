import axios from 'axios';
import API_URL from '../config';
import { auth } from '../firebase';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Services API
export const servicesAPI = {
  getAll: () => api.get('/services'),
  getById: (id) => api.get(`/services/${id}`),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`)
};

// Portfolio API
export const portfolioAPI = {
  getAll: (category) => api.get('/portfolio', { params: { category } }),
  getById: (id) => api.get(`/portfolio/${id}`),
  getCategories: () => api.get('/portfolio/categories'),
  createCategory: (data) => api.post('/portfolio/categories', data),
  deleteCategory: (id) => api.delete(`/portfolio/categories/${id}`),
  create: (data) => api.post('/portfolio', data),
  update: (id, data) => api.put(`/portfolio/${id}`, data),
  delete: (id) => api.delete(`/portfolio/${id}`)
};

// Testimonials API
export const testimonialsAPI = {
  getAll: () => api.get('/testimonials'),
  getById: (id) => api.get(`/testimonials/${id}`),
  create: (data) => api.post('/testimonials', data),
  update: (id, data) => api.put(`/testimonials/${id}`, data),
  delete: (id) => api.delete(`/testimonials/${id}`)
};

// Contact API
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getAll: () => api.get('/contact'),
  getById: (id) => api.get(`/contact/${id}`),
  update: (id, data) => api.put(`/contact/${id}`, data),
  delete: (id) => api.delete(`/contact/${id}`)
};

// Upload API
export const uploadAPI = {
  image: (formData) => {
    return api.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  video: (formData) => {
    return api.post('/upload/video', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  delete: (publicId, type) => {
    const formattedId = publicId.replace(/\//g, '--');
    return api.delete(`/upload/${formattedId}`, { params: { type } });
  }
};

export default api;
