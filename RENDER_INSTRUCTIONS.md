# Render Deployment Configuration Guide

## Required Steps After Pushing Code

### 1. **Verify Render Backend Service**

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Find your **`bolzaa-backend`** service
3. Copy the **Public URL** (example: `https://bolzaa-xyz.onrender.com`)
4. Test it manually:
   - Open `https://<your-backend-url>/api/health` in browser
   - Should return JSON: `{"ok":true,"status":"healthy","timestamp":"..."}`

### 2. **Verify Render Backend Environment Variables**

1. In Render Dashboard → **bolzaa-backend** service → **Environment**
2. Confirm these variables are set:
   - `NODE_ENV` = `production`
   - `PORT` = `3001`
   - `ADMIN_EMAIL` = your-email@gmail.com
   - `EMAIL_PASS` = your-gmail-app-password (16 chars)
   - `ALLOWED_ORIGINS` = `https://bolzaa-frontend.onrender.com,https://your-vercel-domain.vercel.app,https://your-custom-domain.com`
   - `ALLOWED_ORIGIN_REGEX` = `^https://.*\.vercel\.app$,^https://.*\.onrender\.com$`

### 3. **Get Vercel Frontend Settings**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Find your Bolzaa project
3. Go to **Settings** → **Environment Variables**
4. Verify/Add these:
   - `VITE_API_BASE_URL` = `https://<your-backend-url>`
   - `VITE_API_FALLBACK_URL` = `https://<your-backend-url>`
   - `VITE_ADMIN_EMAIL` = `bolzaa277@gmail.com`

**Important:** Use the same Render backend URL for both variables!

### 4. **Redeploy Vercel**

1. Vercel Dashboard → Your Project
2. Go to **Deployments**
3. Click **Redeploy** on the latest deployment
4. Wait for build & deploy to complete

### 5. **Test Contact Form**

1. Open your Vercel app
2. Go to Contact page
3. Fill form and submit
4. Should see success message (not "signal timed out")

---

## Troubleshooting

### Still getting "signal timed out"?

**Check 1: Is Render backend running?**
```bash
# Test backend health endpoint
curl https://<your-backend-url>/api/health
# Should return: {"ok":true,...}
```

**Check 2: Are Vercel env vars set?**
- Vercel Dashboard → Settings → Environment Variables
- Look for `VITE_API_BASE_URL` 
- **Value must be your actual Render backend URL**

**Check 3: Is CORS configured?**
- Render backend logs should show CORS allowed origins
- If not, add your Vercel domain to `ALLOWED_ORIGINS` and redeploy

**Check 4: Email credentials**
- Render backend needs `ADMIN_EMAIL` and `EMAIL_PASS` set
- Gmail app password (not regular password)
- Get from: [Google Account → Security → App passwords](https://myaccount.google.com/apppasswords)

---

## One-Time Setup Checklist

- [ ] Render backend URL verified (health endpoint returns 200)
- [ ] Vercel env vars set to correct backend URL
- [ ] Vercel redeployed after env var changes
- [ ] Contact form submit works without "signal timed out"
- [ ] Admin receives verification email when form submitted
