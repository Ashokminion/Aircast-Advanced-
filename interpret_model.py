import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from tensorflow.keras.models import load_model
from preprocess import load_and_preprocess, create_sequences, get_train_test_split
from sklearn.metrics import mean_squared_error
import joblib

def interpret_contributions():
    # 1. Load Data and Model
    df, features, target = load_and_preprocess('city_day.csv')
    X, y = create_sequences(df, features, target)
    _, X_test, _, y_test = get_train_test_split(X, y)
    
    model = load_model('hybrid_aqi_model.keras')
    
    # 2. Base accuracy
    y_pred = model.predict(X_test)
    base_error = mean_squared_error(y_test, y_pred)
    
    importances = []
    
    # 3. Permutation Importance
    print("\nCalculating Pollutant Contributions (Permutation Importance)...")
    for i, feature in enumerate(features):
        X_test_permuted = X_test.copy()
        # Permute the values of this specific feature across all samples and time steps in the window
        # We'll shuffle the data for this feature column
        np.random.shuffle(X_test_permuted[:, :, i])
        
        y_pred_permuted = model.predict(X_test_permuted)
        permuted_error = mean_squared_error(y_test, y_pred_permuted)
        
        # Importance = Increase in error
        importance = permuted_error - base_error
        importances.append(importance)
        print(f"Feature: {feature}, Error Increase: {importance:.6f}")

    # 4. Normalize and Visualize
    importances = np.array(importances)
    importances = (importances - importances.min()) / (importances.max() - importances.min())
    
    importance_df = pd.DataFrame({'Pollutant': features, 'Importance': importances})
    importance_df = importance_df.sort_values(by='Importance', ascending=True)
    
    plt.style.use('dark_background')
    plt.figure(figsize=(10, 6), facecolor='#0a0a0a')
    ax = plt.gca()
    ax.set_facecolor('#0a0a0a')
    
    # Glow effect bars
    plt.barh(importance_df['Pollutant'], importance_df['Importance'], color='#3bbdd5', alpha=0.9, edgecolor='#3bbdd5', linewidth=1.5)
    
    plt.title('Pollutant Contribution to AQI (CNN-LSTM Insight)', color='#ffffff', pad=20, fontsize=14, fontweight='bold')
    plt.xlabel('Normalized Importance Score', color='#888888', fontsize=10)
    
    # Remove top/right spines
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['left'].set_color('#333333')
    ax.spines['bottom'].set_color('#333333')
    
    plt.grid(axis='x', color='white', alpha=0.05, linestyle='--')
    plt.tight_layout()
    
    plt.savefig('interpretability_plot.png', facecolor='#0a0a0a')
    print("\nInterpretability plot (Dark Theme) saved to 'interpretability_plot.png'")

if __name__ == "__main__":
    interpret_contributions()
