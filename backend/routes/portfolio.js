const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const Category = require('../models/Category');
const { verifyFirebaseToken } = require('../middleware/auth');

// Configurable limits (env vars)
const REELS_LIMIT = parseInt(process.env.REELS_LIMIT, 10) || 9;
const IMAGE_LIMIT = parseInt(process.env.PORTFOLIO_IMAGE_LIMIT, 10) || 50;

// Get all active portfolio items (public)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };
    
    if (category && category !== 'All') {
      filter.category = category;
    }
    
    const portfolioItems = await Portfolio.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(portfolioItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get portfolio categories (public)
// Prefer explicit Category collection when available, otherwise derive from Portfolio items
router.get('/categories', async (req, res) => {
  try {
    const useCategoriesCollection = await Category.countDocuments().catch(() => 0);
    if (useCategoriesCollection > 0) {
      const cats = await Category.find().sort({ name: 1 }).select('name');
      return res.json(cats.map(c => ({ _id: c._id, name: c.name })));
    }

    const categories = await Portfolio.distinct('category', { isActive: true });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new category (admin only)
router.post('/categories', verifyFirebaseToken, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) return res.status(400).json({ error: 'Category name is required' });

    const existing = await Category.findOne({ name: name.trim() });
    if (existing) return res.status(409).json({ error: 'Category already exists' });

    const category = new Category({ name: name.trim() });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a category (admin only)
router.delete('/categories/:id', verifyFirebaseToken, async (req, res) => {
  try {
    // Try to delete by id first
    let cat = null;
    try {
      cat = await Category.findByIdAndDelete(req.params.id);
    } catch (e) {
      // invalid id format, fall through to name-based delete
    }

    if (!cat) {
      // Attempt to delete by name
      cat = await Category.findOneAndDelete({ name: req.params.id });
    }

    if (!cat) return res.status(404).json({ error: 'Category not found' });

    // Update portfolio items that used this category to 'Uncategorized'
    await Portfolio.updateMany({ category: cat.name }, { $set: { category: 'Uncategorized' } });

    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single portfolio item (public)
router.get('/:id', async (req, res) => {
  try {
    const item = await Portfolio.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Portfolio item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create portfolio item (admin only)
router.post('/', verifyFirebaseToken, async (req, res) => {
  try {
    // Debug: log incoming payload
    console.log('Creating portfolio item, payload:', req.body);

    // Basic validation to provide clearer errors
    const { title, category, type, mediaUrl } = req.body;
    const allowedTypes = ['image', 'video'];

    // Title is optional; require category, type and mediaUrl
    if (!category || !type || !mediaUrl) {
      return res.status(400).json({ error: 'Missing required fields: category, type, mediaUrl' });
    }
    if (!allowedTypes.includes(type)) {
      return res.status(400).json({ error: `Invalid type. Allowed: ${allowedTypes.join(', ')}` });
    }

    const portfolioItem = new Portfolio(req.body);
    await portfolioItem.save();

    // Enforce maximum of REELS_LIMIT video reels: if adding a video causes the count to exceed the limit,
    // delete the oldest video portfolio item (and attempt to remove its Cloudinary resource).
    if (portfolioItem.type === 'video') {
      try {
        const videoCount = await Portfolio.countDocuments({ type: 'video', isActive: true });
        if (videoCount > REELS_LIMIT) {
          const oldest = await Portfolio.findOne({ type: 'video', isActive: true, _id: { $ne: portfolioItem._id } })
            .sort({ createdAt: 1 });
          if (oldest) {
            try {
              const cloudinary = require('cloudinary').v2;
              cloudinary.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET
              });
              if (oldest.cloudinaryId) {
                await cloudinary.uploader.destroy(oldest.cloudinaryId, { resource_type: 'video' });
              }
            } catch (cloudErr) {
              console.error('Failed to remove Cloudinary resource for oldest reel:', cloudErr);
            }
            await Portfolio.findByIdAndDelete(oldest._id);
            console.log(`Removed oldest reel to enforce limit of ${REELS_LIMIT}:`, oldest._id.toString());
          }
        }
      } catch (err) {
        console.error('Error enforcing reels limit:', err);
      }
    }

    // Enforce maximum of IMAGE_LIMIT images: if adding an image causes the count to exceed the limit,
    // delete the oldest image portfolio item (and attempt to remove its Cloudinary resource).
    if (portfolioItem.type === 'image') {
      try {
        const imageCount = await Portfolio.countDocuments({ type: 'image', isActive: true });
        if (imageCount > IMAGE_LIMIT) {
          const oldestImage = await Portfolio.findOne({ type: 'image', isActive: true, _id: { $ne: portfolioItem._id } })
            .sort({ createdAt: 1 });
          if (oldestImage) {
            try {
              const cloudinary = require('cloudinary').v2;
              cloudinary.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET
              });
              if (oldestImage.cloudinaryId) {
                await cloudinary.uploader.destroy(oldestImage.cloudinaryId, { resource_type: 'image' });
              }
            } catch (cloudErr) {
              console.error('Failed to remove Cloudinary resource for oldest image:', cloudErr);
            }
            await Portfolio.findByIdAndDelete(oldestImage._id);
            console.log(`Removed oldest image to enforce limit of ${IMAGE_LIMIT}:`, oldestImage._id.toString());
          }
        }
      } catch (err) {
        console.error('Error enforcing images limit:', err);
      }
    }

    res.status(201).json(portfolioItem);
  } catch (error) {
    console.error('Portfolio create error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Update portfolio item (admin only)
router.put('/:id', verifyFirebaseToken, async (req, res) => {
  try {
    const item = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!item) {
      return res.status(404).json({ error: 'Portfolio item not found' });
    }
    // After update, enforce limits in case type/isActive changed to video/image
    try {
      if (item.type === 'video') {
        const videoCount = await Portfolio.countDocuments({ type: 'video', isActive: true });
        if (videoCount > REELS_LIMIT) {
          const oldest = await Portfolio.findOne({ type: 'video', isActive: true, _id: { $ne: item._id } })
            .sort({ createdAt: 1 });
          if (oldest) {
            try {
              const cloudinary = require('cloudinary').v2;
              cloudinary.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET
              });
              if (oldest.cloudinaryId) {
                await cloudinary.uploader.destroy(oldest.cloudinaryId, { resource_type: 'video' });
              }
            } catch (cloudErr) {
              console.error('Failed to remove Cloudinary resource for oldest reel on update:', cloudErr);
            }
            await Portfolio.findByIdAndDelete(oldest._id);
            console.log(`Removed oldest reel to enforce limit of ${REELS_LIMIT} after update:`, oldest._id.toString());
          }
        }
      }

      if (item.type === 'image') {
        const imageCount = await Portfolio.countDocuments({ type: 'image', isActive: true });
        if (imageCount > IMAGE_LIMIT) {
          const oldestImage = await Portfolio.findOne({ type: 'image', isActive: true, _id: { $ne: item._id } })
            .sort({ createdAt: 1 });
          if (oldestImage) {
            try {
              const cloudinary = require('cloudinary').v2;
              cloudinary.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET
              });
              if (oldestImage.cloudinaryId) {
                await cloudinary.uploader.destroy(oldestImage.cloudinaryId, { resource_type: 'image' });
              }
            } catch (cloudErr) {
              console.error('Failed to remove Cloudinary resource for oldest image on update:', cloudErr);
            }
            await Portfolio.findByIdAndDelete(oldestImage._id);
            console.log(`Removed oldest image to enforce limit of ${IMAGE_LIMIT} after update:`, oldestImage._id.toString());
          }
        }
      }
    } catch (enforceErr) {
      console.error('Error enforcing limits after update:', enforceErr);
    }

    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete portfolio item (admin only)
router.delete('/:id', verifyFirebaseToken, async (req, res) => {
  try {
    const item = await Portfolio.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Portfolio item not found' });
    }
    res.json({ message: 'Portfolio item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
