# Quick Reference Card 📋

## Start Development

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm start
```

## URLs

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **Admin**: http://localhost:3000/admin/login
- **API Health**: http://localhost:5000/api/health

## Environment Files

### backend/.env
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/makeup-artist
FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

### frontend/.env
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_STORAGE_BUCKET=...
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...
```

## Key Commands

```bash
# Install dependencies
cd backend && npm install
cd frontend && npm install

# Development
npm run dev    # Backend with nodemon
npm start      # Frontend with hot reload

# Production
npm start      # Backend production
npm run build  # Frontend production build

# Initialize Tailwind (if needed)
npx tailwindcss init -p
```

## Project Structure

```
backend/
├── models/       # MongoDB schemas
├── routes/       # API endpoints  
├── middleware/   # Auth middleware
└── server.js     # Express server

frontend/
├── components/   # Reusable UI
├── pages/        # Route pages
├── context/      # Auth context
├── services/     # API client
└── App.js        # Main app
```

## API Endpoints

**Public:**
- GET `/api/services`
- GET `/api/portfolio`
- GET `/api/testimonials`
- POST `/api/contact`

**Admin (Auth Required):**
- POST/PUT/DELETE `/api/services/:id`
- POST/PUT/DELETE `/api/portfolio/:id`
- POST/PUT/DELETE `/api/testimonials/:id`
- POST `/api/upload/image`
- POST `/api/upload/video`

## Tech Stack

**Frontend:**
- React 18
- Tailwind CSS
- Framer Motion
- React Router
- Axios
- Firebase Auth

**Backend:**
- Node.js
- Express.js
- MongoDB/Mongoose
- Firebase Admin
- Cloudinary
- Multer

## Common Tasks

### Add New Service (via UI)
1. Login to /admin/dashboard
2. Click "Add Service"
3. Fill form
4. Save

### Upload Portfolio Image
1. Admin Dashboard → Portfolio
2. Click "Add Portfolio Item"
3. Select category and type
4. Upload file
5. Save

### View Contact Inquiries
1. Admin Dashboard → Contacts
2. View all submissions
3. Delete when processed

## Troubleshooting

**Server won't start:**
- Check .env files exist
- Verify MongoDB connection
- Check port 5000 is available

**Can't login to admin:**
- Create user in Firebase console
- Verify Firebase config
- Check browser console

**Images won't upload:**
- Verify Cloudinary credentials
- Check file size (<50MB)
- Ensure logged in as admin

## Color Palette

- Luxury Black: `#0a0a0a`
- Luxury Gold: `#d4af37`
- White: `#ffffff`

## Fonts

- Headings: Playfair Display (serif)
- Body: Inter (sans-serif)

## Default Admin Route

http://localhost:3000/admin/login

## Pages

1. Home - Hero + Services preview
2. About - Artist profile + credentials
3. Services - All services with pricing
4. Portfolio - Gallery with filters
5. Testimonials - Client reviews
6. Contact - Booking form
7. Admin Login - Firebase auth
8. Admin Dashboard - CMS

## Quick Deploy

**Backend (Railway):**
1. railway.app
2. Connect GitHub
3. Add env vars
4. Deploy

**Frontend (Vercel):**
1. vercel.com
2. Import repo
3. Add env vars
4. Deploy

## Support Resources

- README.md - Full documentation
- SETUP.md - Setup guide
- DEPLOYMENT.md - Deploy guide
- CHECKLIST.md - Testing checklist
- PROJECT_SUMMARY.md - Overview

---

**Keep this card handy during development!** 📌
