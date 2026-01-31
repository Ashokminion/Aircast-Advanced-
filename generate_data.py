import pandas as pd
import numpy as np
from datetime import datetime, timedelta

def generate_synthetic_data(num_days=365):
    np.random.seed(42)
    start_date = datetime(2023, 1, 1)
    date_list = [start_date + timedelta(hours=x) for x in range(num_days * 24)]
    
    data = {
        'Timestamp': date_list,
        'PM2.5': np.random.normal(60, 20, len(date_list)).clip(10, 500),
        'PM10': np.random.normal(100, 30, len(date_list)).clip(20, 600),
        'NO2': np.random.normal(30, 10, len(date_list)).clip(5, 200),
        'SO2': np.random.normal(15, 5, len(date_list)).clip(2, 100),
        'O3': np.random.normal(40, 15, len(date_list)).clip(5, 200),
        'CO': np.random.normal(1.0, 0.5, len(date_list)).clip(0.1, 10),
        'Temperature': np.random.normal(25, 5, len(date_list)),
        'Humidity': np.random.normal(60, 15, len(date_list)).clip(10, 100),
        'WindSpeed': np.random.normal(5, 2, len(date_list)).clip(0, 30)
    }
    
    df = pd.DataFrame(data)
    
    # Simulate seasonal effect (higher pollution in winter)
    df['Month'] = df['Timestamp'].dt.month
    df.loc[df['Month'].isin([11, 12, 1]), 'PM2.5'] *= 1.5
    df.loc[df['Month'].isin([11, 12, 1]), 'PM10'] *= 1.3
    
    # Simple AQI calculation logic (Simplified for synthetic data)
    # In real world, complex linear interpolation is used.
    df['AQI'] = (df['PM2.5'] * 0.4 + df['PM10'] * 0.2 + df['NO2'] * 0.15 + 
                 df['SO2'] * 0.1 + df['O3'] * 0.1 + df['CO'] * 5).clip(20, 500)
    
    # Introduce some missing values
    for _ in range(100):
        row = np.random.randint(0, len(df))
        col = np.random.choice(['PM2.5', 'PM10', 'NO2', 'Temperature'])
        df.loc[row, col] = np.nan
        
    df.to_csv('aqi_data.csv', index=False)
    print("Synthetic dataset 'aqi_data.csv' generated with 8760 samples.")

if __name__ == "__main__":
    generate_synthetic_data()
