import numpy as np
import joblib
from tensorflow.keras.models import load_model

def predict_aqi(pollutant_data):
    """
    pollutant_data: numpy array of shape (1, 24, 6) 
    Order: ['PM2.5', 'PM10', 'NO2', 'CO', 'SO2', 'O3']
    """
    model = load_model('hybrid_aqi_model.keras')
    scaler_target = joblib.load('scaler_target.pkl')
    
    prediction_scaled = model.predict(pollutant_data)
    prediction = scaler_target.inverse_transform(prediction_scaled)
    
    return prediction[0][0]

if __name__ == "__main__":
    print("Inference helper ready.")
