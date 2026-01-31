import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import joblib
from tensorflow.keras.models import load_model
from preprocess import load_and_preprocess

# Page Config
st.set_page_config(page_title="AirCast Pro", layout="wide", page_icon="🌤️")

# Styling for Premium Trending Theme
st.markdown("""
<style>
    /* Main background */
    .stApp {
        background-color: transparent;
        color: #ffffff;
    }
    
    /* Sidebar styling */
    section[data-testid="stSidebar"] {
        background-color: rgba(10, 10, 10, 0.8);
        backdrop-filter: blur(20px);
        border-right: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    /* Metric Card Customization */
    [data-testid="stMetricValue"] {
        color: #7c3aed; /* Vibrant Violet */
        font-family: 'serif';
        font-weight: 800;
        text-shadow: 0 0 20px rgba(124, 58, 237, 0.4);
    }
    
    [data-testid="stMetricLabel"] {
        color: rgba(255, 255, 255, 0.5);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }

    div[data-testid="stMetric"] {
        background-color: rgba(255, 255, 255, 0.02);
        backdrop-filter: blur(10px);
        padding: 25px;
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.05);
        transition: all 0.3s ease;
    }
    
    div[data-testid="stMetric"]:hover {
        border-color: rgba(124, 58, 237, 0.4);
        background-color: rgba(255, 255, 255, 0.05);
    }
    
    /* Tab styling */
    .stTabs [data-baseweb="tab-list"] {
        gap: 30px;
    }

    .stTabs [data-baseweb="tab"] {
        color: rgba(255, 255, 255, 0.4);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }

    .stTabs [aria-selected="true"] {
        color: #d946ef !important; /* Fuchsia */
        border-bottom-color: #d946ef !important;
    }

    /* Headers */
    h1, h2, h3 {
        color: #ffffff !important;
        font-weight: 800 !important;
    }
</style>
""", unsafe_allow_html=True)

@st.cache_resource
def load_assets():
    model = load_model('hybrid_aqi_model.keras')
    scaler_features = joblib.load('scaler_features.pkl')
    scaler_target = joblib.load('scaler_target.pkl')
    return model, scaler_features, scaler_target

@st.cache_data
def load_data_sample():
    df = pd.read_csv('city_day.csv')
    # Filter cities with enough data
    city_counts = df['City'].value_counts()
    valid_cities = city_counts[city_counts > 200].index.tolist()
    return df, valid_cities

def main():
    st.title("🌤️ AI-Powered Air Quality Forecasting")
    st.markdown("### Hybrid CNN-LSTM Architecture for Pollution Prediction")
    
    # Load assets
    try:
        model, scaler_features, scaler_target = load_assets()
        df_raw, cities = load_data_sample()
    except Exception as e:
        st.error(f"Error loading project assets: {e}")
        return

    # Sidebar for Navigation
    st.sidebar.title("Dashboard Controls")
    city = st.sidebar.selectbox("Select City", sorted(cities))
    
    # Process Data for selected city
    city_df = df_raw[df_raw['City'] == city].copy()
    city_df['Date'] = pd.to_datetime(city_df['Date'])
    city_df = city_df.sort_values('Date')
    
    # Features & Metrics
    features = ['PM2.5', 'PM10', 'NO2', 'CO', 'SO2', 'O3']
    
    # Metrics Row
    col1, col2, col3, col4 = st.columns(4)
    latest = city_df.iloc[-1]
    
    with col1:
        st.metric("Current AQI", f"{latest['AQI']:.0f}", delta_color="inverse")
    with col2:
        st.metric("PM2.5", f"{latest['PM2.5']:.1f}")
    with col3:
        st.metric("PM10", f"{latest['PM10']:.1f}")
    with col4:
        st.metric("CO", f"{latest['CO']:.1f}")

    # Forecast Section
    st.markdown("---")
    st.header(f"24-Hour Ahead Forecast for {city}")
    
    # Prepare data for prediction
    # Get last 24 records for window
    last_indices = city_df.iloc[-24:][features].fillna(method='ffill').fillna(method='bfill')
    scaled_input = scaler_features.transform(last_indices)
    scaled_input = scaled_input.reshape(1, 24, len(features))
    
    # Predict
    prediction_scaled = model.predict(scaled_input)
    prediction = scaler_target.inverse_transform(prediction_scaled)[0][0]
    
    col_f1, col_f2 = st.columns([1, 2])
    with col_f1:
        st.subheader("Forecasted Value")
        st.write(f"The predicted AQI for the next period is:")
        st.markdown(f"<h1 style='color: #ff4b4b;'>{prediction:.1f}</h1>", unsafe_allow_html=True)
        
        # AQI Category
        category = ""
        color = ""
        if prediction <= 50: category, color = "Good", "green"
        elif prediction <= 100: category, color = "Satisfactory", "lightgreen"
        elif prediction <= 200: category, color = "Moderate", "yellow"
        elif prediction <= 300: category, color = "Poor", "orange"
        elif prediction <= 400: category, color = "Very Poor", "red"
        else: category, color = "Severe", "purple"
        
        st.info(f"Category: **{category}**")

    with col_f2:
        # Mini History Plot
        st.subheader("AQI Trend (Last 30 Days)")
        plt.style.use('dark_background')
        fig, ax = plt.subplots(figsize=(10, 4), facecolor='none') 
        ax.set_facecolor('none')
        
        # Plot with neon accent color
        ax.plot(city_df['Date'].tail(30), city_df['AQI'].tail(30), 
                color='#7c3aed', marker='o', linestyle='-', 
                linewidth=2.5, markersize=7, 
                markeredgecolor='#0a0a0a', markeredgewidth=1)
        
        # Styling
        ax.set_title(f"Historical Trend - {city}", color='#ffffff', pad=25, fontsize=12, fontweight='bold')
        ax.grid(color='white', alpha=0.1, linestyle='--')
        
        # Remove spines for clean look
        for spine in ax.spines.values():
            spine.set_visible(False)
            
        plt.xticks(rotation=45, color='#888888', fontsize=9)
        plt.yticks(color='#888888', fontsize=9)
        
        # Tight layout to remove white borders
        fig.tight_layout()
        st.pyplot(fig, clear_figure=True, use_container_width=True)

    # Documentation & Insights
    st.markdown("---")
    tab1, tab2 = st.tabs(["📊 Model Insights", "📑 Technical Summary"])
    
    with tab1:
        st.subheader("Pollutant Contribution (Feature Importance)")
        img_path = 'interpretability_plot.png'
        try:
            st.image(img_path, caption="Permutation Importance Scores")
        except:
            st.write("Interpretability plot not found. Run interpret_model.py first.")

    with tab2:
        st.subheader("Project Methodology")
        st.write("""
        This project utilizes a **Hybrid CNN-LSTM** model to forecast air quality.
        - **CNN (Convolutional Neural Network)**: Extracts spatial-like features and interactions between different pollutants.
        - **LSTM (Long Short-Term Memory)**: Learns long-term temporal dependencies and seasonal trends in air pollution data.
        
        **Model Performance (R² Score):** 0.852  
        **Primary Dataset:** National Air Quality Index (Kaggle)
        """)

if __name__ == "__main__":
    main()
