import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv1D, LSTM, Dense, Dropout, Flatten, Input, Bidirectional

def build_hybrid_model(input_shape):
    """
    Hybrid CNN-LSTM Architecture:
    1. CNN Layer: Captures short-term interactions between pollutants (spatial-like patterns).
       Why CNN? Even though this is time-series, the interaction between PM2.5, SO2, and CO
       in a single time step forms a 'local pattern' that CNN can extract as high-level features.
    2. LSTM/Bi-LSTM Layer: Captures long-term temporal dependencies and seasonality.
       Why LSTM? It 'remembers' past pollution levels to predict the future.
    """
    model = Sequential([
        Input(shape=input_shape),
        
        # 1. Convolutional Layer: Learning pollutant interactions
        # Filters=64, Kernel=3 (looks at 3 consecutive hours to find patterns)
        Conv1D(filters=64, kernel_size=3, activation='relu', padding='same'),
        Dropout(0.2), # Prevent overfitting
        
        # 2. LSTM Layer: Capturing temporal sequences
        # Return sequences = False because we need a single vector for prediction
        Bidirectional(LSTM(units=50, return_sequences=False)),
        Dropout(0.2),
        
        # 3. Dense Layers: Mapping features to concentration
        Dense(units=24, activation='relu'),
        Dense(units=1) # Single output (Predicted AQI)
    ])
    
    model.compile(optimizer='adam', loss='mse', metrics=['mae'])
    return model

def build_baseline_lstm(input_shape):
    """
    Standalone LSTM model for comparison.
    """
    model = Sequential([
        Input(shape=input_shape),
        LSTM(units=50, return_sequences=False),
        Dropout(0.2),
        Dense(units=1)
    ])
    model.compile(optimizer='adam', loss='mse', metrics=['mae'])
    return model

if __name__ == "__main__":
    # Example input shape (Window=24, Features=9)
    model = build_hybrid_model((24, 9))
    model.summary()
