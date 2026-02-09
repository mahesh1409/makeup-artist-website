# Quick Setup Guide

## 1. Install Dependencies

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## 2. Configure Environment Variables

### Backend (.env)
Copy `.env.example` to `.env` and fill in:
- MongoDB URI
- Firebase Service Account JSON
- Cloudinary credentials

### Frontend (.env)
Copy `.env.example` to `.env` and fill in:
- Backend API URL
- Firebase web configuration

## 3. Start Development Servers

### Backend (Terminal 1)
```bash
cd backend
npm run dev
```
Server runs on: http://localhost:5000

### Frontend (Terminal 2)
```bash
cd frontend
npm start
```
App runs on: http://localhost:3000

## 4. Access Admin Dashboard

1. Go to http://localhost:3000/admin/login
2. Login with your Firebase credentials
3. Start managing content!

## Default Routes
- Home: http://localhost:3000/
- About: http://localhost:3000/about
- Services: http://localhost:3000/services
- Portfolio: http://localhost:3000/portfolio
- Testimonials: http://localhost:3000/testimonials
- Contact: http://localhost:3000/contact
- Admin: http://localhost:3000/admin/login

## MongoDB Setup (if using local)
```bash
# Install MongoDB
# Start MongoDB service
mongod

# Or use MongoDB Atlas (cloud)
# Get connection string from atlas.mongodb.com
```

## Common Issues

**MongoDB Connection Error:**
- Check if MongoDB is running
- Verify MONGODB_URI in backend/.env

**Firebase Auth Error:**
- Verify Firebase config in frontend/.env
- Check Firebase Admin SDK in backend/.env

**CORS Error:**
- Backend CORS is configured for all origins
- Check API_URL in frontend config

**Cloudinary Upload Fails:**
- Verify Cloudinary credentials
- Check file size limits (50MB)

## Production Build

### Frontend
```bash
cd frontend
npm run build
```

### Backend
```bash
cd backend
npm start
```

---
For detailed documentation, see README.md
