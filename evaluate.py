import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from tensorflow.keras.models import load_model
from preprocess import load_and_preprocess, create_sequences, get_train_test_split
import joblib

def evaluate_models():
    # 1. Load Data
    df, features, target = load_and_preprocess('city_day.csv')
    X, y = create_sequences(df, features, target)
    _, X_test, _, y_test = get_train_test_split(X, y)
    
    # 2. Load Models
    hybrid_model = load_model('hybrid_aqi_model.keras')
    baseline_model = load_model('baseline_aqi_model.keras')
    scaler_target = joblib.load('scaler_target.pkl')
    
    # 3. Predictions
    y_pred_hybrid = hybrid_model.predict(X_test)
    y_pred_baseline = baseline_model.predict(X_test)
    
    # Inverse transform to get actual AQI values
    y_test_actual = scaler_target.inverse_transform(y_test.reshape(-1, 1))
    y_pred_hybrid_actual = scaler_target.inverse_transform(y_pred_hybrid)
    y_pred_baseline_actual = scaler_target.inverse_transform(y_pred_baseline)
    
    # 4. Calculate Metrics
    def get_metrics(actual, pred):
        mse = mean_squared_error(actual, pred)
        rmse = np.sqrt(mse)
        mae = mean_absolute_error(actual, pred)
        r2 = r2_score(actual, pred)
        return rmse, mae, r2

    hybrid_rmse, hybrid_mae, hybrid_r2 = get_metrics(y_test_actual, y_pred_hybrid_actual)
    baseline_rmse, baseline_mae, baseline_r2 = get_metrics(y_test_actual, y_pred_baseline_actual)
    
    # 5. Print Comparison Table
    results = pd.DataFrame({
        'Metric': ['RMSE', 'MAE', 'R2 Score'],
        'Hybrid CNN-LSTM': [hybrid_rmse, hybrid_mae, hybrid_r2],
        'Baseline LSTM': [baseline_rmse, baseline_mae, baseline_r2]
    })
    print("\nModel Comparison Results:")
    print(results.to_string(index=False))
    
    # 6. Visualization
    plt.figure(figsize=(15, 6))
    plt.plot(y_test_actual[:100], label='Actual AQI', color='black', linewidth=2)
    plt.plot(y_pred_hybrid_actual[:100], label='Hybrid Forecast', color='blue', linestyle='--')
    plt.plot(y_pred_baseline_actual[:100], label='Baseline Forecast', color='red', linestyle=':')
    plt.title('AQI Forecast Comparison (First 100 Test Samples)')
    plt.xlabel('Time Steps')
    plt.ylabel('AQI Value')
    plt.legend()
    plt.savefig('comparison_plot.png')
    print("\nComparison plot saved to 'comparison_plot.png'")

if __name__ == "__main__":
    evaluate_models()
