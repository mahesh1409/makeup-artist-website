# Hardika Makeover - Luxury Makeup Artist Website 💄✨

A stunning, full-stack luxury makeup artist portfolio and booking website built with the MERN stack, featuring Firebase Authentication and Cloudinary media management.

## 🌟 Features

### Frontend
- **Luxury Black & Gold Design** - Premium editorial aesthetic
- **Fully Responsive** - Mobile-first design with smooth animations
- **Dynamic Sections:**
  - Hero section with full-screen video/image background
  - About page with artist profile and credentials
  - Services showcase with pricing
  - Portfolio gallery with category filtering
  - Client testimonials
  - Contact/booking form
- **Advanced UI/UX:**
  - Framer Motion animations
  - Lazy loading for images
  - Video player integration
  - Smooth scrolling
  - Interactive hover effects

### Backend
- **RESTful API** with Express.js
- **MongoDB** database with Mongoose schemas
- **Firebase Admin SDK** for authentication
- **Cloudinary Integration** for media storage
- **Protected Admin Routes**

### Admin Dashboard
- **Firebase Authentication** for secure access
- **Content Management:**
  - Add/Edit/Delete services
  - Upload portfolio images and videos to Cloudinary
  - Manage testimonials
  - View contact inquiries
- **Media Upload** directly to Cloudinary

## 🛠 Tech Stack

**Frontend:**
- React 18
- React Router v6
- Tailwind CSS
- Framer Motion
- Axios
- React Player
- React Helmet (SEO)
- React Icons

**Backend:**
- Node.js
- Express.js
- MongoDB & Mongoose
- Firebase Admin SDK
- Cloudinary
- Multer (file uploads)

**Authentication:**
- Firebase Authentication

**Media Storage:**
- Cloudinary

## 📦 Project Structure

```
hardika/
├── backend/
│   ├── models/
│   │   ├── Service.js
│   │   ├── Portfolio.js
│   │   ├── Testimonial.js
│   │   └── Contact.js
│   ├── routes/
│   │   ├── services.js
│   │   ├── portfolio.js
│   │   ├── testimonials.js
│   │   ├── contact.js
│   │   └── upload.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── Footer.js
    │   │   ├── LoadingSpinner.js
    │   │   └── PrivateRoute.js
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── About.js
    │   │   ├── Services.js
    │   │   ├── Portfolio.js
    │   │   ├── Testimonials.js
    │   │   ├── Contact.js
    │   │   └── admin/
    │   │       ├── AdminLogin.js
    │   │       └── AdminDashboard.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   ├── index.js
    │   ├── index.css
    │   ├── config.js
    │   └── firebase.js
    ├── package.json
    ├── tailwind.config.js
    └── .env.example
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Firebase account
- Cloudinary account

### 1. Clone the Repository
```bash
cd d:/mern_project/hardika
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/makeup-artist

# Firebase Admin SDK (paste your service account JSON as a single line)
FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api

# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

Start the frontend:
```bash
npm start
```

Visit `http://localhost:3000`

## 🔐 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** → Email/Password
4. Go to Project Settings → Service Accounts
5. Generate new private key (for backend)
6. Copy Web API config (for frontend)

## ☁️ Cloudinary Setup

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Get your Cloud Name, API Key, and API Secret from Dashboard
3. Add to backend `.env`

## 📱 Usage

### Public Pages
- **Home** - Hero section with CTAs
- **About** - Artist profile and story
- **Services** - Service packages with pricing
- **Portfolio** - Image/video gallery with filters
- **Testimonials** - Client reviews
- **Contact** - Booking form

### Admin Dashboard (`/admin/login`)
1. Login with Firebase credentials
2. Manage all website content
3. Upload media to Cloudinary
4. View contact inquiries

## 🎨 Design Features

- **Color Palette:**
  - Primary Black: `#0a0a0a`
  - Luxury Gold: `#d4af37`
  - White: `#ffffff`

- **Typography:**
  - Headings: Playfair Display (serif)
  - Body: Inter (sans-serif)

- **Effects:**
  - Smooth hover transitions
  - Subtle shadows and glows
  - Gradient backgrounds
  - Micro-animations

## 🔧 API Endpoints

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create service (admin)
- `PUT /api/services/:id` - Update service (admin)
- `DELETE /api/services/:id` - Delete service (admin)

### Portfolio
- `GET /api/portfolio` - Get all portfolio items
- `GET /api/portfolio/categories` - Get categories
- `POST /api/portfolio` - Create item (admin)
- `PUT /api/portfolio/:id` - Update item (admin)
- `DELETE /api/portfolio/:id` - Delete item (admin)

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `POST /api/testimonials` - Create testimonial (admin)
- `PUT /api/testimonials/:id` - Update testimonial (admin)
- `DELETE /api/testimonials/:id` - Delete testimonial (admin)

### Contact
- `POST /api/contact` - Submit contact form (public)
- `GET /api/contact` - Get all contacts (admin)
- `PUT /api/contact/:id` - Update contact (admin)
- `DELETE /api/contact/:id` - Delete contact (admin)

### Upload
- `POST /api/upload/image` - Upload image to Cloudinary (admin)
- `POST /api/upload/video` - Upload video to Cloudinary (admin)
- `DELETE /api/upload/:publicId` - Delete media (admin)

## 🚀 Deployment

### Backend (Heroku/Railway/Render)
1. Set environment variables
2. Deploy from GitHub
3. Ensure MongoDB connection string is correct

### Frontend (Vercel/Netlify)
1. Set environment variables
2. Build command: `npm run build`
3. Output directory: `build`
4. Update API URL to production backend

## 📝 Environment Variables Summary

**Backend:**
- `PORT` - Server port
- `MONGODB_URI` - MongoDB connection string
- `FIREBASE_SERVICE_ACCOUNT` - Firebase admin credentials
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

**Frontend:**
- `REACT_APP_API_URL` - Backend API URL
- `REACT_APP_FIREBASE_*` - Firebase web config

## 🎯 Key Features Implementation

✅ Luxury black, white, and gold design  
✅ Full MERN stack with MongoDB  
✅ Firebase Authentication for admin  
✅ Cloudinary for media storage  
✅ Responsive mobile-first design  
✅ Framer Motion animations  
✅ SEO optimization with React Helmet  
✅ Lazy loading for performance  
✅ Admin dashboard with CRUD operations  
✅ Portfolio with image/video support  
✅ Contact form with backend integration  

## 📄 License

This project is private and proprietary.

## 👤 Author

Created with ❤️ for premium makeup artistry

---

**Need Help?** Check the `.env.example` files for configuration templates.
#   m a k e u p - a r t i s t - w e b s i t e  
 