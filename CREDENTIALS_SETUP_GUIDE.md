# 🔑 Step-by-Step Credentials Setup Guide

This guide will walk you through setting up **MongoDB Atlas**, **Firebase**, and **Cloudinary** accounts and getting all the credentials you need.

---

## 📋 What You'll Get

By the end of this guide, you'll have:
- ✅ MongoDB connection string
- ✅ Firebase Admin SDK credentials (JSON)
- ✅ Firebase Web API config
- ✅ Cloudinary credentials (Cloud Name, API Key, API Secret)

**Time needed**: 20-30 minutes (all free accounts)

---

## 1️⃣ MongoDB Atlas Setup (Database)

### Step 1: Create Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click **"Try Free"** or **"Sign Up"**
3. Choose signup method:
   - Sign up with Google (recommended - faster)
   - Or use email/password
4. Complete the signup process

### Step 2: Create a Cluster
1. After login, you'll see "Create a Deployment"
2. Choose **M0 (Free)** tier
   - Storage: 512 MB (perfect for this project)
   - Shared RAM: Shared
   - This is completely FREE forever!
3. Choose a **Cloud Provider & Region**:
   - AWS, Google Cloud, or Azure (doesn't matter)
   - Pick a region closest to you (e.g., US East, Europe, Asia)
4. **Cluster Name**: Keep default or name it `MakeupArtist`
5. Click **"Create Deployment"**
6. Wait 1-3 minutes for cluster creation

### Step 3: Create Database User
1. You'll see a security quickstart popup
2. Choose **"Username and Password"** authentication
3. Create credentials:
   - **Username**: `admin` (or any name you want)
   - **Password**: Click "Autogenerate Secure Password" and **COPY IT**
   - ⚠️ **SAVE THIS PASSWORD** - you'll need it!
4. Click **"Create User"**

### Step 4: Set Network Access
1. In the popup, under "Where would you like to connect from?"
2. Choose **"My Local Environment"**
3. Click **"Add My Current IP Address"**
4. **IMPORTANT**: Also add `0.0.0.0/0` to allow access from anywhere
   - Click "Add IP Address" button
   - Enter: `0.0.0.0/0`
   - Description: "Allow all"
   - Click "Add Entry"
5. Click **"Finish and Close"**

### Step 5: Get Connection String
1. Click **"Database"** in the left sidebar
2. Find your cluster and click **"Connect"**
3. Choose **"Connect your application"**
4. **Driver**: Node.js
5. **Version**: 4.1 or later
6. **Copy the connection string** - it looks like:
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
7. **Replace `<password>`** with your actual password from Step 3
8. **Add database name** after `.net/`:
   ```
   mongodb+srv://admin:YourPassword123@cluster0.xxxxx.mongodb.net/makeup-artist?retryWrites=true&w=majority
   ```

### ✅ MongoDB Complete!
**Save this connection string** - you'll paste it into `backend/.env` as `MONGODB_URI`

### 💡 Bonus: Using MongoDB Compass (If You Have It Installed)

MongoDB Compass is a GUI tool that lets you visually explore your database.

#### Connect with Compass:
1. Open **MongoDB Compass**
2. It will show "New Connection"
3. **Paste your connection string** in the URI field:
   ```
   mongodb+srv://admin:YourPassword123@cluster0.xxxxx.mongodb.net/makeup-artist
   ```
4. Click **"Connect"**
5. You should see your cluster connected!

#### What You Can Do:
- ✅ Browse databases and collections
- ✅ View data visually (services, portfolio, testimonials)
- ✅ Test queries
- ✅ Verify data is being saved from your app
- ✅ Manually add/edit/delete records

#### After Your App Runs:
Once you start adding data through the admin dashboard, you can:
1. Open Compass
2. Navigate to `makeup-artist` database
3. See collections: `services`, `portfolios`, `testimonials`, `contacts`
4. Click any collection to view the documents

**This is super helpful for debugging!** 🔍

---

## 2️⃣ Firebase Setup (Authentication)

### Step 1: Create Firebase Project
1. Go to https://console.firebase.google.com/
2. Click **"Add project"** or **"Create a project"**
3. **Project name**: `makeup-artist` (or any name)
4. Click **"Continue"**
5. **Google Analytics**: Turn OFF (not needed for this project)
6. Click **"Create project"**
7. Wait 30 seconds for project creation
8. Click **"Continue"**

### Step 2: Enable Authentication
1. In the left sidebar, click **"Authentication"** (🔐 icon)
2. Click **"Get started"**
3. Under "Sign-in method" tab, click **"Email/Password"**
4. **Enable** the toggle switch
5. Leave "Email link (passwordless sign-in)" DISABLED
6. Click **"Save"**

### Step 3: Create Admin User
1. Stay in Authentication section
2. Click the **"Users"** tab
3. Click **"Add user"** button
4. Enter:
   - **Email**: `admin@lumiere.com` (or your email)
   - **Password**: Create a strong password (min 6 characters)
   - ⚠️ **SAVE THIS PASSWORD** - you'll use it to login!
5. Click **"Add user"**

### Step 4: Get Firebase Web Config (for Frontend)
1. Click the ⚙️ (gear icon) next to "Project Overview"
2. Click **"Project settings"**
3. Scroll down to "Your apps" section
4. Click the **Web icon** `</>`
5. **App nickname**: `makeup-artist-web`
6. **DO NOT** check "Also set up Firebase Hosting"
7. Click **"Register app"**
8. You'll see a config object like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "makeup-artist-xxxxx.firebaseapp.com",
  projectId: "makeup-artist-xxxxx",
  storageBucket: "makeup-artist-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxx"
};
```

9. **COPY ALL THESE VALUES** - you'll need them for frontend/.env

### Step 5: Generate Firebase Admin SDK (for Backend)
1. Still in Project Settings
2. Click the **"Service accounts"** tab at the top
3. Click **"Generate new private key"** button
4. Click **"Generate key"** in the popup
5. A JSON file will download to your computer
6. **KEEP THIS FILE SAFE** - it's like a master password!
7. Open the JSON file in a text editor
8. It looks like this:

```json
{
  "type": "service_account",
  "project_id": "makeup-artist-xxxxx",
  "private_key_id": "xxxxx",
  "private_key": "-----BEGIN PRIVATE KEY-----\nxxxxx\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@makeup-artist-xxxxx.iam.gserviceaccount.com",
  "client_id": "xxxxx",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "xxxxx"
}
```

9. **Copy the ENTIRE JSON** as a **single line** (remove all line breaks)
   - You can use an online JSON minifier: https://jsonformatter.org/json-minify
   - Or manually remove all new lines

### ✅ Firebase Complete!
**Save these values**:
- **Frontend (.env)**: firebaseConfig values
- **Backend (.env)**: Entire service account JSON as single line

---

## 3️⃣ Cloudinary Setup (Media Storage)

### Step 1: Create Account
1. Go to https://cloudinary.com/
2. Click **"Sign Up Free"** (top right)
3. Fill in the form:
   - **Email**: Your email
   - **Password**: Create a password
   - **Cloud name**: This will be auto-generated, or choose your own
     - Example: `makeup-artist-2026`
     - ⚠️ **REMEMBER THIS** - you'll need it!
4. Click **"Sign Up for Free"**
5. Verify your email (check inbox)
6. Click the verification link

### Step 2: Get Credentials from Dashboard
1. After login, you'll see the **Dashboard**
2. Look for the "Account Details" section (usually top of page)
3. You'll see:

```
Cloud name: your-cloud-name
API Key: 123456789012345
API Secret: xxxxx-xxxxxxxxxxxxxxxxxxxx [Click to reveal]
```

4. **Click "Copy" or write down**:
   - ✅ **Cloud Name**
   - ✅ **API Key**
   - ✅ **API Secret** (click the eye icon to reveal, then copy)

### Step 3: Optional - Create Upload Presets
1. Click the ⚙️ (gear icon) for Settings
2. Go to **"Upload"** tab
3. Scroll to "Upload presets"
4. You can create custom presets here (optional - app works without this)

### ✅ Cloudinary Complete!
**Save these values**:
- Cloud Name
- API Key  
- API Secret

---

## 4️⃣ Fill in Environment Variables

Now that you have all credentials, let's set them up!

### Backend Environment Variables

1. Go to `backend/` folder
2. Create a file named `.env` (copy from `.env.example`)
3. Fill it in like this:

```env
PORT=5000

# MongoDB (from Step 1)
MONGODB_URI=mongodb+srv://admin:YourPassword123@cluster0.xxxxx.mongodb.net/makeup-artist?retryWrites=true&w=majority

# Firebase Admin SDK (from Step 2.5 - single line JSON)
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"makeup-artist-xxxxx","private_key_id":"xxxxx","private_key":"-----BEGIN PRIVATE KEY-----\nxxxxx\n-----END PRIVATE KEY-----\n","client_email":"firebase-adminsdk-xxxxx@xxxxx.iam.gserviceaccount.com","client_id":"xxxxx","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"xxxxx"}

# Cloudinary (from Step 3)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=xxxxx-xxxxxxxxxxxxxxxxxxxx
```

### Frontend Environment Variables

1. Go to `frontend/` folder
2. Create a file named `.env` (copy from `.env.example`)
3. Fill it in like this:

```env
# Backend API URL
REACT_APP_API_URL=http://localhost:5000/api

# Firebase Web Config (from Step 2.4)
REACT_APP_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
REACT_APP_FIREBASE_AUTH_DOMAIN=makeup-artist-xxxxx.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=makeup-artist-xxxxx
REACT_APP_FIREBASE_STORAGE_BUCKET=makeup-artist-xxxxx.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789012
REACT_APP_FIREBASE_APP_ID=1:123456789012:web:xxxxxxxxxxxxx
```

---

## 5️⃣ Test Your Setup

### Test Backend
```bash
cd backend
npm run dev
```

Expected output:
```
🚀 Server running on port 5000
✅ MongoDB connected successfully
```

If you see errors:
- ❌ MongoDB error → Check connection string
- ❌ Firebase error → Check JSON format (must be single line)

### Test Frontend
```bash
cd frontend
npm start
```

Browser should open to `http://localhost:3000`

### Test Admin Login
1. Go to `http://localhost:3000/admin/login`
2. Enter:
   - **Email**: The email you created in Firebase (Step 2.3)
   - **Password**: Your Firebase password
3. Click "Sign In"
4. You should be redirected to the dashboard!

---

## 🎉 You're All Set!

### What You Have Now:
✅ MongoDB database connected  
✅ Firebase authentication working  
✅ Cloudinary ready for uploads  
✅ Admin login credentials  
✅ All environment variables configured  

### Next Steps:
1. Start both servers (backend and frontend)
2. Login to admin dashboard
3. Add your first service
4. Upload portfolio images
5. Customize content

---

## 📝 Quick Reference

### MongoDB Atlas
- **Dashboard**: https://cloud.mongodb.com/
- **Connection String Format**: `mongodb+srv://user:password@cluster.mongodb.net/dbname`

### Firebase
- **Console**: https://console.firebase.google.com/
- **Auth Users**: Project → Authentication → Users
- **Admin Email**: `admin@lumiere.com` (or your email)

### Cloudinary
- **Dashboard**: https://console.cloudinary.com/
- **Upload URL**: Automatic (handled by backend)

---

## ⚠️ Security Tips

1. **Never commit .env files** to Git (already in .gitignore)
2. **Keep Firebase Admin JSON safe** - anyone with it can access your auth
3. **Use strong passwords** for Firebase admin user
4. **Rotate API keys** if you suspect they're compromised
5. **MongoDB**: In production, restrict IP access instead of 0.0.0.0/0

---

## 🆘 Troubleshooting

### MongoDB Connection Issues
**Error**: `MongoServerError: bad auth`
- **Fix**: Check username/password in connection string
- Make sure you replaced `<password>` with actual password

**Error**: `MongooseServerSelectionError`
- **Fix**: Check IP whitelist includes 0.0.0.0/0
- Verify cluster is running (check Atlas dashboard)

### Firebase Issues
**Error**: `Service account JSON is invalid`
- **Fix**: Ensure JSON is on a SINGLE LINE with no line breaks
- Check for missing quotes or commas

**Error**: `Firebase auth/user-not-found`
- **Fix**: Create user in Firebase Console → Authentication → Users

### Cloudinary Issues
**Error**: `Invalid API credentials`
- **Fix**: Double-check Cloud Name, API Key, and API Secret
- Ensure no extra spaces in .env file

**Error**: `Upload failed`
- **Fix**: Check file size (max 50MB)
- Verify you're logged in as admin

---

## 📞 Need More Help?

- **MongoDB**: https://www.mongodb.com/docs/atlas/
- **Firebase**: https://firebase.google.com/docs/auth
- **Cloudinary**: https://cloudinary.com/documentation

---

**Congratulations!** 🎉 Your credentials are now set up and ready to use!
