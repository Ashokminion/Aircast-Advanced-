# 🚀 Quick Deployment Guide - SkyPlus

## ✅ What's Been Done

All code changes are complete:
- ✅ Environment variables configured (`.env` + `.env.production`)
- ✅ `Predictor.tsx` updated to use `VITE_STREAMLIT_URL`
- ✅ Streamlit Cloud config created (`.streamlit/config.toml`)

---

## 🎯 What You Need To Do Now

### Step 1: Deploy Streamlit Backend (5 minutes)

1. **Go to Streamlit Cloud**: https://share.streamlit.io

2. **Sign in** with your GitHub account

3. **Click "New app"**

4. **Configure deployment**:
   - Repository: `Ashokminion/SkyPlus-` (or your repo)
   - Branch: `main`
   - Main file path: `app.py`
   
5. **Click "Deploy!"**

6. **Wait ~2 minutes** for deployment to complete

7. **Copy your URL**: Will look like `https://ashokminion-skyplus.streamlit.app`

---

### Step 2: Configure Vercel Environment Variable (2 minutes)

1. **Go to Vercel dashboard**: https://vercel.com/dashboard

2. **Select your project**: `skyplus`

3. **Go to Settings** → **Environment Variables**

4. **Add new variable**:
   - **Name**: `VITE_STREAMLIT_URL`
   - **Value**: `https://your-streamlit-app.streamlit.app` (paste your URL from Step 1)
   - **Environment**: ✅ Production

5. **Click "Save"**

6. **Trigger redeploy**:
   - Go to **Deployments** tab
   - Click **︙** (three dots) on latest deployment
   - Click **"Redeploy"**

---

### Step 3: Verify It Works

1. Visit: https://skyplus.vercel.app/predictor

2. ✅ Check: Streamlit dashboard loads (no "localhost refused" error)

3. ✅ Test: Select a city and view AQI predictions

4. ✅ Confirm: All charts and visualizations render

---

## 🛠️ Troubleshooting

**Issue**: Still seeing "localhost refused"
- **Fix**: Clear browser cache and hard refresh (Ctrl+Shift+R)
- **Fix**: Ensure Vercel redeploy completed after adding env variable

**Issue**: CORS error in browser console
- **Fix**: Already handled by `.streamlit/config.toml` - Streamlit should auto-detect it

**Issue**: Blank iframe
- **Fix**: Check if your Streamlit app URL is accessible directly in browser
- **Fix**: Ensure `app.py` has no syntax errors

---

## 📝 Test Locally First (Optional)

```bash
# Terminal 1: Start Streamlit
cd "AIR QUALITY INDEX AND POLLUTION FORECASTING"
streamlit run app.py

# Terminal 2: Start React frontend
cd aqi-frontend
npm run dev

# Visit: http://localhost:5173/predictor
```

---

## ⏱️ Total Time: ~10 minutes

You're ready to deploy! 🎉
