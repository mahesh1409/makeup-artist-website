# Hosting Guide — Render (backend), Vercel (frontend), GoDaddy (domain)

## Overview
This document explains how to deploy the backend to Render, the frontend to Vercel, and configure a custom domain purchased at GoDaddy. It includes required environment variables, build/start commands, DNS steps, and verification checks.

## Prerequisites
- GitHub (or Git) repository containing this project.
- Accounts: Render, Vercel, GoDaddy.
- Local repo permissions and CI/CD access (connect GitHub to Render & Vercel).

## Important repo notes
- Backend folder: `backend`
- Frontend folder: `frontend`
- Backend health endpoint: `/api/health`

## Environment variables (set these in Render and Vercel dashboard)
Backend (Render service):
- `MONGODB_URI` — MongoDB connection string
- `FIREBASE_SERVICE_ACCOUNT` — JSON string of Firebase service account (stringified)
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `PORT` (optional)
- Any other secrets your `backend` expects (JWT secret, etc.)

Frontend (Vercel project / Environment Variables):
- `REACT_APP_API_URL` — points to backend base API URL (example: `https://your-backend.onrender.com/api`)
- `REACT_APP_FIREBASE_API_KEY`
- `REACT_APP_FIREBASE_AUTH_DOMAIN`
- `REACT_APP_FIREBASE_PROJECT_ID`
- `REACT_APP_FIREBASE_STORAGE_BUCKET`
- `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
- `REACT_APP_FIREBASE_APP_ID`

> Tip: The backend reads `process.env.FIREBASE_SERVICE_ACCOUNT` (stringified JSON) and Cloudinary vars in `backend/config`.

## Build & start commands
Backend (Render service settings)
- Root directory: `backend`
- Build command: `npm install`
- Start command: `node server.js`

Frontend (Vercel settings)
- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `build` (Create React App default)

## Deploy backend to Render
1. Log in to Render, click **New > Web Service**.
2. Connect your GitHub repo and choose the branch to deploy.
3. In **Root Directory** set `backend` (this tells Render to use the backend folder).
4. Set Build Command to `npm install` and Start Command to `node server.js`.
5. Set Environment Variables (use the list above). Paste `FIREBASE_SERVICE_ACCOUNT` as the JSON string (escape quotes or use Render UI which accepts multi-line values).
6. Choose instance type and deploy.
7. After deployment you will get a Render domain like `your-service.onrender.com`.
8. Verify: `curl https://your-service.onrender.com/api/health` or visit the URL in browser.

Notes:
- If you prefer Docker, you can add a Dockerfile in the `backend` folder and select Docker on Render.
- Configure logs and auto-deploy on push in Render settings.

## Deploy frontend to Vercel
Option A — Connect GitHub (recommended):
1. Log in to Vercel and import the project from GitHub.
2. In Project Settings, set `Root Directory` to `frontend`.
3. Framework Preset: `Create React App` or leave as `Other` and set Build Command `npm run build` and Output Directory `build`.
4. Add Environment Variables in Vercel (see list above). Make sure `REACT_APP_API_URL` points to your Render backend: `https://your-backend.onrender.com/api`.
5. Deploy — Vercel will build and provide a domain like `your-project.vercel.app`.

Option B — Vercel CLI (quick test):
```bash
npm i -g vercel
cd frontend
vercel --prod
```
You will be prompted to provide project settings; ensure `REACT_APP_API_URL` is set in the Vercel dashboard or via `vercel env add`.

## Add custom domain from GoDaddy
High-level: Add your domain in Vercel for the frontend, and (optionally) add a subdomain for the backend in Render.

### Add domain in Vercel (frontend)
1. In Vercel dashboard, open your project → Domains → Add.
2. Enter `example.com` (your domain) and `www.example.com` as desired.
3. Vercel will display DNS records to add in GoDaddy. Common options:
   - Add an A record for the apex (`@`) pointing to Vercel's IP addresses (if provided), OR
   - Add a CNAME for `www` pointing to `cname.vercel-dns.com` (or the specific target Vercel shows).
4. In GoDaddy DNS settings, add/modify records as Vercel instructs. If offered, you can optionally change nameservers to Vercel's nameservers — this transfers DNS control.
5. Wait for propagation and then verify domain in Vercel (it will provision SSL automatically).

### Add backend domain in Render (optional)
1. In Render, open your backend service → Settings → Custom Domains → Add Domain (e.g., `api.example.com`).
2. Render will provide a DNS target (typically a CNAME target). In GoDaddy, add a CNAME for `api` pointing to the provided Render target (or an A record if Render provides one).
3. Wait for verification and SSL issuance.

### GoDaddy DNS steps (concise)
1. Log in to GoDaddy → My Products → DNS (for your domain).
2. To point `www` to Vercel: Add/Edit a CNAME record:
   - Name: `www`
   - Type: `CNAME`
   - Value: the CNAME target provided by Vercel (e.g., `cname.vercel-dns.com` or a Vercel-specific target)
   - TTL: default
3. For the root domain (`@`): follow Vercel's instructions (A records or change nameservers). If Vercel provides IPs, add A records for `@`.
4. To add backend subdomain (e.g., `api`): Add CNAME `api` → Render target (as provided by Render).
5. Save and wait (can take minutes to hours).

## HTTPS / SSL
- Vercel and Render automatically provision Let's Encrypt certificates for verified custom domains.
- Wait for verification; the dashboards show status.

## CORS and API URL
- The frontend uses `REACT_APP_API_URL` from `frontend/src/config.js`. Set it to your backend public API URL (with `/api` if needed).
- Backend uses `cors()` without origin restrictions in `server.js`; if you lock it down, allow the Vercel domain and your domain.

## Verification checklist
- [ ] Backend deployed and `GET /api/health` returns `{ status: 'OK' }`.
- [ ] Frontend deployed and loads on `https://your-domain.com` or `https://your-project.vercel.app`.
- [ ] Custom domain resolves and shows SSL.
- [ ] Environment variables set in both platforms (Firebase, Cloudinary, MongoDB URI, etc.).
- [ ] Uploads (Cloudinary) and auth (Firebase) work in production.

## Common troubleshooting
- Missing env vars → 500 errors; check platform logs.
- `FIREBASE_SERVICE_ACCOUNT` must be a JSON string (stringify the JSON object when pasting into the Render UI).
- DNS propagation delays — allow up to 24 hours (usually much faster).
- If using GoDaddy forwarding, ensure that forwarding doesn’t conflict with DNS records.

## Quick commands (local/deploy)
- Frontend local build (to inspect):
```bash
cd frontend
npm install
npm run build
```
- Backend run locally:
```bash
cd backend
npm install
node server.js
# or `npm run dev` if you use nodemon in package.json scripts
```

## Where to edit this doc
This file: `HOSTING_GUIDE.md` in the repository root.

---
If you want, I can also:
- Add exact DNS records values by connecting to your Vercel/Render dashboards, or
- Prepare a short `README_DEPLOY.md` with screenshots and exact step-by-step screenshots for GoDaddy.

