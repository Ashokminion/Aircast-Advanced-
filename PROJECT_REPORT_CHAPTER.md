# Hybrid CNN-LSTM for AQI Forecasting: Project Report Chapter

## 1. Introduction
Air pollution is a critical global challenge affects human health and environment. This project presents a Hybrid Deep Learning approach using Convolutional Neural Networks (CNN) and Long Short-Term Memory (LSTM) networks to forecast the Air Quality Index (AQI) with high accuracy.

## 2. Methodology

### 2.1 Data Collection
The model was trained on the **India Air Quality Dataset** spanning multiple years across various Indian cities. The dataset includes concentrations of key pollutants: PM2.5, PM10, NO2, CO, SO2, and O3.

### 2.2 Proposed Architecture: Hybrid CNN-LSTM
Our model combines two powerful architectures:
1. **CNN Layer**: Captures "spatial-like" correlations and local patterns between different pollutants at a given time window.
2. **LSTM Layer**: Captures the temporal dependencies and long-term trends essential for time-series forecasting.

### 2.3 Data Preprocessing
- **Handling Missing Values**: Applied forward and backward fill to ensure temporal continuity.
- **Normalization**: Min-Max Scaling was applied to map all features to a [0, 1] range.
- **Sequence Creation**: A sliding window of 24 hours was used to predict the AQI for the next time step.

## 3. Results and Discussion

### 3.1 Performance Metrics
The Hybrid model was compared against a baseline LSTM model.

| Metric | Hybrid CNN-LSTM | Baseline LSTM |
|:-------|:---------------:|:-------------:|
| RMSE   | 40.66           | 42.97         |
| R² Score | 0.852         | 0.834         |

### 3.2 Feature Importance
Using **Permutation Importance**, we identified that **PM2.5** is the most significant contributor to the AQI forecast, followed by PM10.

## 4. Conclusion
The Hybrid CNN-LSTM model demonstrated superior performance in capturing both local pollutant interactions and long-term trends, achieving an accuracy (R²) of 85.2%. The system is integrated into a Streamlit dashboard for real-time demonstration.
