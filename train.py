import matplotlib.pyplot as plt
from preprocess import load_and_preprocess, create_sequences, get_train_test_split
from model import build_hybrid_model, build_baseline_lstm
import tensorflow as tf

def train_and_evaluate():
    # 1. Load and Preprocess
    print("Pre-processing data...")
    df, features, target = load_and_preprocess('city_day.csv')
    X, y = create_sequences(df, features, target)
    X_train, X_test, y_train, y_test = get_train_test_split(X, y)
    
    # 2. Build Models
    input_shape = (X.shape[1], X.shape[2])
    hybrid_model = build_hybrid_model(input_shape)
    baseline_model = build_baseline_lstm(input_shape)
    
    # 3. Training Hybrid Model
    print("\nTraining Hybrid CNN-LSTM Model...")
    history_hybrid = hybrid_model.fit(
        X_train, y_train,
        epochs=15, # Increased for better convergence
        batch_size=32,
        validation_split=0.1,
        verbose=1
    )
    
    # 4. Training Baseline Model
    print("\nTraining Baseline LSTM Model...")
    history_baseline = baseline_model.fit(
        X_train, y_train,
        epochs=15,
        batch_size=32,
        validation_split=0.1,
        verbose=1
    )
    
    # 5. Plot training history
    plt.figure(figsize=(12, 5))
    plt.plot(history_hybrid.history['loss'], label='Hybrid Train Loss')
    plt.plot(history_hybrid.history['val_loss'], label='Hybrid Val Loss')
    plt.plot(history_baseline.history['loss'], label='Baseline Train Loss', linestyle='--')
    plt.plot(history_baseline.history['val_loss'], label='Baseline Val Loss', linestyle='--')
    plt.title('Model Training History (MSE Loss)')
    plt.xlabel('Epochs')
    plt.ylabel('Loss')
    plt.legend()
    plt.savefig('training_history.png')
    print("\nTraining history saved to 'training_history.png'")
    
    # 6. Save Models
    hybrid_model.save('hybrid_aqi_model.keras')
    baseline_model.save('baseline_aqi_model.keras')
    print("Models saved successfully.")

if __name__ == "__main__":
    train_and_evaluate()
