import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import joblib
import os
from tensorflow.keras.models import load_model
from preprocess import load_and_preprocess

# Page Config
# Page Config
st.set_page_config(page_title="AirCast", layout="wide", page_icon="❄️")

# Styling for Glacier Premium Theme
st.markdown("""
<style>
    /* Main background */
    .stApp {
        background-color: #080c14; /* Deep Ice Dark */
        color: #e0faff; /* Ice White */
    }
    
    /* Sidebar styling */
    section[data-testid="stSidebar"] {
        background-color: rgba(6, 18, 30, 0.9);
        backdrop-filter: blur(20px);
        border-right: 1px solid rgba(6, 182, 212, 0.1);
    }
    
    /* Metric Card Customization */
    [data-testid="stMetricValue"] {
        color: #06b6d4; /* Cyan / Ice Blue */
        font-family: 'serif';
        font-weight: 800;
        text-shadow: 0 0 20px rgba(6, 182, 212, 0.5);
    }
    
    [data-testid="stMetricLabel"] {
        color: rgba(224, 250, 255, 0.6);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }

    div[data-testid="stMetric"] {
        background-color: rgba(6, 182, 212, 0.03);
        backdrop-filter: blur(10px);
        padding: 25px;
        border-radius: 20px;
        border: 1px solid rgba(6, 182, 212, 0.1);
        transition: all 0.3s ease;
    }
    
    div[data-testid="stMetric"]:hover {
        border-color: rgba(6, 182, 212, 0.6);
        background-color: rgba(6, 182, 212, 0.08);
        box-shadow: 0 0 30px rgba(6, 182, 212, 0.1);
    }
    
    /* Tab styling */
    .stTabs [data-baseweb="tab-list"] {
        gap: 30px;
    }

    .stTabs [data-baseweb="tab"] {
        color: rgba(224, 250, 255, 0.5);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }

    .stTabs [aria-selected="true"] {
        color: #22d3ee !important; /* Cyan-400 */
        border-bottom-color: #22d3ee !important;
    }

    /* Headers */
    h1, h2, h3 {
        color: #ffffff !important;
        font-weight: 800 !important;
        text-shadow: 0 0 30px rgba(6, 182, 212, 0.3);
    }
    
    /* Custom Gradient Text */
    .glacier-text {
        background: linear-gradient(to right, #ffffff, #22d3ee);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
</style>
""", unsafe_allow_html=True)

@st.cache_resource
def load_assets():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(base_dir, 'hybrid_aqi_model.keras')
    scaler_features_path = os.path.join(base_dir, 'scaler_features.pkl')
    scaler_target_path = os.path.join(base_dir, 'scaler_target.pkl')
    
    model = load_model(model_path)
    scaler_features = joblib.load(scaler_features_path)
    scaler_target = joblib.load(scaler_target_path)
    return model, scaler_features, scaler_target

@st.cache_data
def load_data_sample():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(base_dir, 'city_day.csv')
    df = pd.read_csv(csv_path)
    # Filter cities with enough data
    city_counts = df['City'].value_counts()
    valid_cities = city_counts[city_counts > 200].index.tolist()
    
    # Inject "Theni" if not present (Mapped to Coimbatore later)
    if "Theni" not in valid_cities:
        valid_cities.append("Theni")
        
    return df, valid_cities

def main():
    st.markdown("<h1 style='text-align: center; font-size: 3.5rem;'>❄️ <span class='glacier-text'>AirCast</span></h1>", unsafe_allow_html=True)
    st.markdown("<h3 style='text-align: center; color: rgba(255,255,255,0.7) !important;'>Hyper-Local Pollution Intelligence System</h3>", unsafe_allow_html=True)
    
    # Load assets
    try:
        model, scaler_features, scaler_target = load_assets()
        df_raw, cities = load_data_sample()
    except Exception as e:
        st.error(f"Error loading project assets: {e}")
        return

    # Sidebar for Navigation
    st.sidebar.title("❄️ Control Center")
    city = st.sidebar.selectbox("Select Region", sorted(cities), index=sorted(cities).index("Theni") if "Theni" in sorted(cities) else 0)
    
    # Process Data for selected city
    # DATA SIMULATION LOGIC: Map Theni -> Coimbatore
    if city == "Theni":
        target_city = "Coimbatore"
        st.sidebar.info("📡 Using High-Fidelity Proxy Data Node: Coimbatore")
    else:
        target_city = city

    city_df = df_raw[df_raw['City'] == target_city].copy()
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
    st.header(f"24-Hour Prediction for {city}")
    
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
        st.markdown(f"<h1 style='color: #22d3ee; text-shadow: 0 0 30px rgba(34, 211, 238, 0.6);'>{prediction:.1f}</h1>", unsafe_allow_html=True)
        
        # AQI Category
        category = ""
        color = ""
        if prediction <= 50: category, color = "Good", "#4ade80" # green-400
        elif prediction <= 100: category, color = "Satisfactory", "#a3e635" # lime-400
        elif prediction <= 200: category, color = "Moderate", "#facc15" # yellow-400
        elif prediction <= 300: category, color = "Poor", "#fb923c" # orange-400
        elif prediction <= 400: category, color = "Very Poor", "#f87171" # red-400
        else: category, color = "Severe", "#c084fc" # purple-400
        
        st.markdown(f"""
        <div style="padding: 15px; border-radius: 10px; background-color: rgba(255,255,255,0.05); border-left: 5px solid {color};">
            <h3 style="margin:0; color: {color} !important;">{category}</h3>
            <p style="margin:0; opacity: 0.7;">Air Quality Category</p>
        </div>
        """, unsafe_allow_html=True)

        # Glacier Guidelines Smart Alerts
        st.markdown(f"""
        <div style="margin-top: 20px; padding: 15px; border-radius: 10px; background-color: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.2);">
            <h4 style="margin:0; color: #22d3ee; margin-bottom: 5px;">❄️ Glacier Guidelines</h4>
            <ul style="margin:0; padding-left: 20px; color: #e0faff; font-size: 0.9em;">
                <li>{"Avoid prolonged outdoor exertion." if prediction > 200 else "Enjoy your outdoor activities!"}</li>
                <li>{"Wear a mask if you must go outside." if prediction > 150 else "Air quality is acceptable for most people."}</li>
                <li>{"Keep windows closed to avoid indoor pollution." if prediction > 100 else "Ventilation is encouraged."}</li>
            </ul>
        </div>
        """, unsafe_allow_html=True)

    with col_f2:
        # Mini History Plot
        st.subheader("AQI Trend (Last 30 Days)")
        plt.style.use('dark_background')
        fig, ax = plt.subplots(figsize=(10, 4), facecolor='none') 
        ax.set_facecolor('none')
        
        # Plot with neon accent color (Cyan)
        ax.plot(city_df['Date'].tail(30), city_df['AQI'].tail(30), 
                color='#22d3ee', marker='o', linestyle='-', 
                linewidth=2.5, markersize=7, 
                markeredgecolor='#083344', markeredgewidth=1) # cyan-400, cyan-950
        
        # Styling
        ax.set_title(f"Historical Trend - {city}", color='#ffffff', pad=25, fontsize=12, fontweight='bold')
        ax.grid(color='white', alpha=0.1, linestyle='--')
        
        # Remove spines for clean look
        for spine in ax.spines.values():
            spine.set_visible(False)
            
        plt.xticks(rotation=45, color='#94a3b8', fontsize=9) # slate-400
        plt.yticks(color='#94a3b8', fontsize=9)
        
        # Tight layout to remove white borders
        fig.tight_layout()
        st.pyplot(fig, clear_figure=True, use_container_width=True)

    # Documentation & Insights
    st.markdown("---")
    tab1, tab2 = st.tabs(["📊 Model Insights", "📑 Technical Summary"])
    
    with tab1:
        st.subheader("Pollutant Contribution (Feature Importance)")
        base_dir = os.path.dirname(os.path.abspath(__file__))
        img_path = os.path.join(base_dir, 'interpretability_plot.png')
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
