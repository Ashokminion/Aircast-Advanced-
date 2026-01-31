import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
import joblib

def load_and_preprocess(filename='city_day.csv'):
    """Load and preprocess the real AQI dataset"""
    df = pd.read_csv(filename)
    
    # Select relevant pollutant columns and target
    features = ['PM2.5', 'PM10', 'NO2', 'CO', 'SO2', 'O3']
    target = 'AQI'
    
    # Keep only necessary columns
    df = df[features + [target]].copy()
    
    # Handle missing values - forward fill then backward fill
    df = df.fillna(method='ffill').fillna(method='bfill')
    
    # Drop any remaining rows with NaN
    df = df.dropna()
    
    print(f"Dataset shape after preprocessing: {df.shape}")
    print(f"Features: {features}")
    
    # Normalize features and target
    scaler_features = MinMaxScaler()
    scaler_target = MinMaxScaler()
    
    df[features] = scaler_features.fit_transform(df[features])
    df[[target]] = scaler_target.fit_transform(df[[target]])
    
    # Save scalers
    joblib.dump(scaler_features, 'scaler_features.pkl')
    joblib.dump(scaler_target, 'scaler_target.pkl')
    
    return df, features, target

def create_sequences(df, features, target, window_size=24):
    """Create sequences for time-series prediction"""
    X, y = [], []
    data = df[features + [target]].values
    
    for i in range(len(data) - window_size):
        X.append(data[i:i+window_size, :-1])  # Features only
        y.append(data[i+window_size, -1])      # Target (AQI)
    
    return np.array(X), np.array(y)

def get_train_test_split(X, y, test_size=0.2):
    """Split data into train and test sets"""
    return train_test_split(X, y, test_size=test_size, shuffle=False)
