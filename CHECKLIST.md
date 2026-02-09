# Setup Checklist ✓

## Prerequisites Setup

### 1. MongoDB Atlas
- [ ] Create account at https://www.mongodb.com/cloud/atlas
- [ ] Create new cluster (free tier)
- [ ] Create database user
- [ ] Whitelist IP: 0.0.0.0/0
- [ ] Copy connection string
- [ ] Paste into backend/.env as MONGODB_URI

### 2. Firebase
- [ ] Create project at https://console.firebase.google.com/
- [ ] Enable Authentication > Email/Password
- [ ] Create first admin user (email/password)
- [ ] Go to Project Settings > Service Accounts
- [ ] Generate new private key (JSON)
- [ ] Copy entire JSON as single line
- [ ] Paste into backend/.env as FIREBASE_SERVICE_ACCOUNT
- [ ] Go to Project Settings > General
- [ ] Copy Web API config values
- [ ] Paste into frontend/.env (all REACT_APP_FIREBASE_* variables)

### 3. Cloudinary
- [ ] Create account at https://cloudinary.com/
- [ ] Go to Dashboard
- [ ] Copy Cloud Name, API Key, API Secret
- [ ] Paste into backend/.env

## Local Development Setup

### Backend Setup
- [ ] cd backend
- [ ] npm install
- [ ] Create .env file (copy from .env.example)
- [ ] Fill in all environment variables
- [ ] npm run dev
- [ ] Verify server runs on http://localhost:5000
- [ ] Test: http://localhost:5000/api/health

### Frontend Setup
- [ ] cd frontend
- [ ] npm install
- [ ] npx tailwindcss init -p (if needed)
- [ ] Create .env file (copy from .env.example)
- [ ] Fill in all environment variables
- [ ] npm start
- [ ] Verify app opens at http://localhost:3000

## Testing

### Public Pages
- [ ] Visit http://localhost:3000
- [ ] Test Home page loads
- [ ] Test About page
- [ ] Test Services page
- [ ] Test Portfolio page (check category filters)
- [ ] Test Testimonials page
- [ ] Test Contact page
- [ ] Submit test contact form
- [ ] Check mobile responsiveness

### Admin Dashboard
- [ ] Visit http://localhost:3000/admin/login
- [ ] Login with Firebase credentials
- [ ] Should redirect to dashboard
- [ ] Test Services tab
  - [ ] Add new service
  - [ ] Edit service
  - [ ] Delete service
- [ ] Test Portfolio tab
  - [ ] Upload test image
  - [ ] Add portfolio item
  - [ ] Edit item
  - [ ] Delete item
- [ ] Test Testimonials tab
  - [ ] Add testimonial
  - [ ] Edit testimonial
  - [ ] Delete testimonial
- [ ] Test Contacts tab
  - [ ] View contact inquiries
  - [ ] Delete inquiry
- [ ] Logout works

### Backend API Testing
- [ ] GET http://localhost:5000/api/health
- [ ] GET http://localhost:5000/api/services
- [ ] GET http://localhost:5000/api/portfolio
- [ ] GET http://localhost:5000/api/testimonials
- [ ] POST http://localhost:5000/api/contact (test form)

## Production Deployment

### Backend Deployment (Choose One)
- [ ] Railway / Render / Heroku
- [ ] Add all environment variables
- [ ] Deploy backend
- [ ] Copy deployment URL
- [ ] Test API endpoint: https://your-backend.com/api/health

### Frontend Deployment (Choose One)
- [ ] Vercel / Netlify
- [ ] Add environment variables
- [ ] Set REACT_APP_API_URL to backend URL
- [ ] Deploy frontend
- [ ] Visit deployed site
- [ ] Test all pages
- [ ] Test admin login

## Post-Deployment
- [ ] Update Firebase authorized domains
- [ ] Configure custom domain (optional)
- [ ] Test production admin dashboard
- [ ] Upload production images
- [ ] Add real services
- [ ] Add real testimonials
- [ ] Update About page content
- [ ] Test contact form email notifications (if configured)
- [ ] Submit to Google Search Console
- [ ] Add Google Analytics (optional)

## Final Checks
- [ ] All pages load correctly
- [ ] Mobile responsive
- [ ] Admin dashboard accessible
- [ ] Images upload successfully
- [ ] Contact form works
- [ ] No console errors
- [ ] SSL/HTTPS enabled (automatic on Vercel/Netlify)
- [ ] SEO meta tags present
- [ ] Favicon displays
- [ ] Social media links updated

## Common Issues & Solutions

### Issue: MongoDB Connection Failed
**Solution**: 
- Check connection string format
- Verify IP whitelist (0.0.0.0/0)
- Ensure database user has correct permissions

### Issue: Firebase Auth Error
**Solution**:
- Verify all Firebase config variables are correct
- Check Firebase console for enabled auth methods
- Ensure you've created a user in Firebase console

### Issue: Cloudinary Upload Fails
**Solution**:
- Verify credentials are correct
- Check file size (max 50MB)
- Ensure logged in as admin

### Issue: Cannot Access Admin Dashboard
**Solution**:
- Try logging out and back in
- Check browser console for errors
- Verify Firebase user exists
- Clear browser cache

### Issue: CORS Error
**Solution**:
- Check REACT_APP_API_URL is correct
- Verify backend CORS config
- Ensure both servers are running

### Issue: Styles Not Loading
**Solution**:
- Run npm install in frontend
- Check tailwind.config.js exists
- Restart frontend server

## Ready to Launch! 🚀

When all items are checked, your luxury makeup artist website is ready to go live!

---

**Need Help?**
- Check README.md for detailed documentation
- Review SETUP.md for step-by-step instructions
- See DEPLOYMENT.md for deployment guides
