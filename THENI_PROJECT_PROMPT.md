# Project Prompt: AirCast (Advanced AQI Forecasting)

## 1. Project Objective
Develop a production-ready, hyper-local Air Quality Index (AQI) and Pollution Forecasting System specifically tailored for the Theni region. The system must use a **Hybrid Deep Learning Model (CNN + LSTM)** to predict AQI levels 24 hours in advance, ensuring high accuracy by capturing both spatial features (via CNN) and temporal dependencies (via LSTM).

## 2. Branding & Design Language
- **Theme Name**: "Glacier Premium"
- **Core Aesthetic**: Futuristic, "look like wow", Glassmorphism.
- **Typography**: Premium for UI, Serif (**Playfair Display**) for premium headers.
- **Visual Style**:
    - Dark Mode Only (Deep Blue/Black background).
    - Premium text effects for critical metrics.
    - Glassmorphism cards for dashboards.
    - "Glacier" terminology (e.g., "Neural Vision" -> "Glacier Vision").

## 3. Technical Architecture

### A. Backend (Python + Streamlit)
- **Framework**: Streamlit (for the ML dashboard) & Python 3.9+.
- **ML Model**: Hybrid CNN-LSTM Architecture.
- **Input**: Historical data (PM2.5, PM10, NO2, CO, SO2, O3) from CPCB.
- **CNN Layer**: 1D convolutions for feature extraction (noise filtering).
- **LSTM Layer**: Long Short-Term Memory units for time-series forecasting.
- **Output**: Predicted AQI for the next 24 hours.
- **Data Handling**:
    - **Imputation**: Handle missing sensor data using Forward Fill/Interpolation.
    - **Proxy Logic**: Since specific "Theni" sensors may not exist in the training set, implement a **Proxy Mechanism**: If City == "Theni", Use Model/Data from "Coimbatore" (closest proxy).

### B. Frontend (React + Vite)
- **Framework**: React 18, Vite, TypeScript.
- **Styling**: Tailwind CSS with custom "Glacier" config.
- **Components**:
    - **Hero Section**: "Hyper-Local AirCast" with animated gradients.
    - **Live Dashboard**: Displaying Real-time AQI, PM2.5, and Temperature.
    - **Forecasting Graph**: Interactive line charts (Recharts/Chart.js) showing 7-day trends.
    - **Map Interface**: Visual representation of Theni district pollution hotspots.

## 4. Key Features
- **Real-Time Monitoring**: Display current pollution levels with color-coded health advisories (Good, Moderate, Severe).
- **24-Hour Forecast**: Predict hourly AQI changes to help users plan outdoor activities.
- **Historical Analysis**: Visualize pollution trends over the last 30 days.
- **Pollutant Breakdown**: Detailed insights into specific pollutants (PM2.5 vs PM10).
- **Smart Alerts**: "**Glacier Guidelines**" advising users (e.g., "Wear a mask," "Avoid jogging").

## 5. Dataset & Preprocessing
- **Source**: CPCB (Central Pollution Control Board) Dataset (2015-2020).
- **Preprocessing Pipeline**:
    - Drop columns with >40% missing data.
    - Outlier detection using IQR method (capping extreme values).
    - Min-Max Scaling for neural network stability.
    - Sliding Window approach (Lookback: 24h) for Time Series formatting.

## 6. Deliverables
- **Codebase**: Fully commented Python (Backend) and React (Frontend) code.
- **Project Report**: Comprehensive 60+ page report (Anna University format) covering Literature Survey, Methodology, and Results.
- **Deployment**:
    - Streamlit App running on `localhost:8501`.
    - React App running on `localhost:5173`.

## 🚀 Quick Run Commands

### Backend (ML Engine):
```bash
cd "AIR QUALITY INDEX AND POLLUTION FORECASTING"
pip install -r requirements.txt
streamlit run app.py
```

### Frontend (User Interface):
```bash
cd "AIR QUALITY INDEX AND POLLUTION FORECASTING/aqi-frontend"
npm install
npm run dev
```
