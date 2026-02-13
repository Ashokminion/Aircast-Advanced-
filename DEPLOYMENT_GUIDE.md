# 🚀 Publishing "SkyPlus" Online (Free)

## Step 0: Push Code to GitHub (Required)
*Streamlit Cloud and Vercel need your code to be on GitHub first.*

Run these commands in your terminal (one by one):

1.  `git init`
2.  `git add .`
3.  `git commit -m "Initial commit for SkyPlus"`
4.  **Create a Repository**: Go to [github.com/new](https://github.com/new) and create a repository named `SkyPlus`.
5.  **Connect & Push**:
    - `git remote add origin https://github.com/YOUR_USERNAME/SkyPlus.git` (Replace YOUR_USERNAME with your GitHub name)
    - `git branch -M main`
    - `git push -u origin main`

---

To make your project searchable on Google as "SkyPlus", you need to host it online. Since your project has two parts (React Frontend + Python Backend), we will host them separately for free.

## Part 1: Deploy the Backend (Streamlit) - Super Easy Method!
*Idhu dhaan prediction engine. Idhai online-la poda romba simple steps:*

1.  **GitHub Upload**: Unga project folder-a GitHub-la oru repo create panni upload pannunga.
2.  **Streamlit Login**: [share.streamlit.io](https://share.streamlit.io/) poyi unga GitHub account vechi login pannunga.
3.  **One Click Deploy**: 
    - Click **"Create App"**.
    - Search unga GitHub repo name.
    - Main file-la `app.py` nu select pannunga.
    - Click **"Deploy!"**. 
4.  **Ready!**: Avvalavu dhaan! Streamlit oru URL tharum (e.g., `skyplus-app.streamlit.app`). Adha mattum copy panni vechikonga. ✨

## Part 2: Connect Frontend to Backend
1.  Open `aqi-frontend/src/pages/Predictor.tsx` in your code.
2.  Find the line: `src="http://127.0.0.1:8501/?embedded=true"`
3.  Change it to your new Streamlit URL:
    `src="https://YOUR-NEW-STREAMLIT-URL.streamlit.app/?embedded=true"`
4.  Save the file.

## Part 3: Deploy the Frontend (React)
*This is your main website.*

1.  **Vercel**: Go to [vercel.com](https://vercel.com) and sign up.
2.  **Import**: Click "Add New" -> "Project".
3.  **GitHub**: Import the same repository (or a new one if you separated them).
4.  **Settings**:
    *   **Root Directory**: Click "Edit" and select `aqi-frontend`.
    *   **Framework Preset**: Vite.
5.  **Deploy**: Click Deploy.
6.  **Done!**: You will get a URL like `https://skyplus-project.vercel.app`.

## 🌍 Getting on Google (SEO)
1.  **Search Console**: Go to [Google Search Console](https://search.google.com/search-console).
2.  **Add Property**: Enter your Vercel URL (e.g., `https://skyplus-project.vercel.app`).
3.  **Request Indexing**: Once verified, use the "URL Inspection" tool to inspect your URL and click "Request Indexing".
4.  **Wait**: It usually takes 2-5 days for Google to start showing your site when searching for "SkyPlus".

---
**Note**: Since "SkyPlus" is a unique name we chose, you have a very high chance of ranking #1 for it quickly!
