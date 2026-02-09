# Deployment Guide for Hardika Makeover

## Prerequisites
- GitHub account
- Vercel/Netlify account (frontend)
- Railway/Render/Heroku account (backend)
- MongoDB Atlas account
- Firebase project
- Cloudinary account

## Step 1: Prepare MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user
4. Whitelist all IPs: `0.0.0.0/0`
5. Get connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/makeup-artist?retryWrites=true&w=majority
   ```

## Step 2: Deploy Backend

### Option A: Railway (Recommended)

1. Go to https://railway.app/
2. Connect GitHub repository
3. Select backend folder
4. Add environment variables:
   - `PORT` = 5000
   - `MONGODB_URI` = (your Atlas connection string)
   - `FIREBASE_SERVICE_ACCOUNT` = (Firebase admin JSON)
   - `CLOUDINARY_CLOUD_NAME` = (your cloud name)
   - `CLOUDINARY_API_KEY` = (your API key)
   - `CLOUDINARY_API_SECRET` = (your API secret)
5. Deploy
6. Copy the deployment URL (e.g., `https://your-app.railway.app`)

### Option B: Render

1. Go to https://render.com/
2. Create new Web Service
3. Connect GitHub repository
4. Select backend folder
5. Build command: `npm install`
6. Start command: `npm start`
7. Add environment variables (same as above)
8. Deploy

### Option C: Heroku

1. Install Heroku CLI
2. Commands:
   ```bash
   cd backend
   heroku create your-app-name
   heroku config:set MONGODB_URI="your-uri"
   heroku config:set FIREBASE_SERVICE_ACCOUNT="your-json"
   heroku config:set CLOUDINARY_CLOUD_NAME="your-name"
   heroku config:set CLOUDINARY_API_KEY="your-key"
   heroku config:set CLOUDINARY_API_SECRET="your-secret"
   git push heroku main
   ```

## Step 3: Deploy Frontend

### Option A: Vercel (Recommended)

1. Go to https://vercel.com/
2. Import GitHub repository
3. Select frontend folder
4. Framework preset: Create React App
5. Build command: `npm run build`
6. Output directory: `build`
7. Add environment variables:
   - `REACT_APP_API_URL` = (your backend URL from Step 2)
   - `REACT_APP_FIREBASE_API_KEY` = (from Firebase console)
   - `REACT_APP_FIREBASE_AUTH_DOMAIN` = (from Firebase console)
   - `REACT_APP_FIREBASE_PROJECT_ID` = (from Firebase console)
   - `REACT_APP_FIREBASE_STORAGE_BUCKET` = (from Firebase console)
   - `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` = (from Firebase console)
   - `REACT_APP_FIREBASE_APP_ID` = (from Firebase console)
8. Deploy
9. Your site is live! 🎉

### Option B: Netlify

1. Go to https://www.netlify.com/
2. Connect GitHub repository
3. Select frontend folder
4. Build command: `npm run build`
5. Publish directory: `build`
6. Add environment variables (same as above)
7. Deploy

## Step 4: Configure CORS (Backend)

If you get CORS errors, update backend/server.js:

```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.vercel.app',
  credentials: true
}));
```

## Step 5: Test Everything

1. Visit your deployed frontend
2. Test all pages
3. Test contact form
4. Login to admin dashboard
5. Upload test images/videos
6. Create test content

## Step 6: Custom Domain (Optional)

### Vercel
1. Go to project settings
2. Add custom domain
3. Update DNS records

### Netlify
1. Go to domain settings
2. Add custom domain
3. Update DNS records

## Troubleshooting

### API Not Connecting
- Check `REACT_APP_API_URL` in frontend env vars
- Ensure backend is running
- Check browser console for CORS errors

### MongoDB Connection Failed
- Verify connection string
- Check IP whitelist (0.0.0.0/0)
- Ensure database user has correct permissions

### Firebase Auth Not Working
- Verify all Firebase config variables
- Check Firebase console for enabled auth methods
- Ensure Firebase project is active

### Images Not Uploading
- Verify Cloudinary credentials
- Check file size limits
- Ensure proper permissions in admin dashboard

## Security Checklist

- [ ] MongoDB Atlas IP whitelist configured
- [ ] Firebase authentication enabled
- [ ] Strong admin password set
- [ ] Environment variables secured
- [ ] CORS configured properly
- [ ] API rate limiting (optional)
- [ ] HTTPS enabled (automatic on Vercel/Netlify)

## Post-Deployment

1. **Set up monitoring** - Use Vercel Analytics or Google Analytics
2. **Configure backups** - MongoDB Atlas auto-backups
3. **Test performance** - Google PageSpeed Insights
4. **SEO optimization** - Submit sitemap to Google Search Console
5. **Social media** - Add OG tags (already included)

## Maintenance

- **Update dependencies** regularly
- **Monitor logs** for errors
- **Backup database** weekly
- **Review contact inquiries** daily
- **Update portfolio** monthly

---

Your luxury makeup artist website is now live! 🎨✨
