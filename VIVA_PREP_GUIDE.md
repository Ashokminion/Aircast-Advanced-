# SkyPlus Project: Viva-Voce Prep (Q&A)

### 1. General Questions
**Q: What is the main objective of this project?**
A: To build a robust forecasting system named **SkyPlus** that predicts the Air Quality Index (AQI) using a hybrid deep learning model (CNN-LSTM) based on real-world pollution data from Indian cities.

**Q: Why is forecasting AQI important?**
A: Accurate forecasting allows authorities and citizens to take proactive measures (e.g., traffic restrictions, wearing masks) before pollution levels reach hazardous levels.

### 2. Technical Questions
**Q: Why did you choose a "Hybrid" model instead of just an LSTM?**
A: While LSTMs are great for time-series, a CNN layer can extract complex relationships (local patterns) between multiple pollutants in a single time step. Combining them leverages the strengths of both: spatial feature extraction (CNN) and temporal modeling (LSTM).

**Q: What is the role of the CNN layer in your model?**
A: The CNN (1D Convolution) acts as a feature extractor. It looks at the interactions between different attributes (PM2.5, SO2, etc.) across the input window to find non-linear patterns that a simple LSTM might miss.

**Q: Why did you use Min-Max Scaling?**
A: Features like PM2.5 and CO have very different numerical ranges. Scaling them to [0,1] prevents features with larger magnitudes from dominating the weight updates during training, leading to faster and more stable convergence.

**Q: What does the R² score of 0.852 signify?**
A: The R² (Coefficient of Determination) score of 0.852 means that approximately 85.2% of the variance in the AQI can be explained by our model's inputs.

### 3. Dataset & Preprocessing
**Q: How did you handle missing data in the real-world dataset?**
A: Real-world sensor data often has gaps. We used a combined strategy of Forward-Fill (taking the last known value) and Backward-Fill to maintain the continuity of the time series without introducing synthetic noise.

**Q: Which pollutant was most important according to your model?**
A: Our interpretability analysis (Permutation Importance) showed that **PM2.5** was the most critical feature, which is consistent with scientific findings that fine particulate matter is the primary driver of AQI.

### 4. Implementation & UI/UX Details
**Q: Which framework did you use for the project?**
A: We utilized a **Unified Single Page Application (SPA)** architecture for **SkyPlus**. 
- **Frontend**: React + Vite + TailwindCSS for a high-performance, responsive "Ethereal Glassmorphism" interface.
- **Backend**: Python (Streamlit) for generic the neural engine, embedded seamlessly via iframe.
- **Why this stack?**: It allows us to combine the research capability of Python ML libraries with the modern, cinematic experience of a React web app.

**Q: What is the "SkyPlus" branding?**
A: **SkyPlus** stands for "Sky Plus Intelligence". The "Ethereal" theme (violet/fuchsia/glass) was chosen to make environmental data feel futuristic and engaging rather than just static charts.

**Q: How does the "Live Predictor" work?**
A: The "Live Predictor" is a dedicated module where the React frontend communicates with the local Python server running at port 8501. It uses an embedded view to show real-time inference without requiring the user to switch tabs or applications.

### 5. Deployment & Demo Strategy (Viva Tips)

**Pre-Viva Checklist:**
1. **Clean Start**: Ensure no other servers are blocking ports 5173/5179 or 8501.
2. **Launch Order**:
   - Terminal 1: \streamlit run app.py\ (The Engine)
   - Terminal 2: \
pm run dev\ (The Experience)
3. **Browser**: Open \http://localhost:5179\ in Chrome (F11 for Fullscreen mode).

**During Presentation:**
1. **Start with 'The Vibe'**: Don't just show code. Show the **Hero Section**. Let the animations play.
2. **Navigate Smoothly**: Click 'About' -> 'Architecture' -> 'Results' to show the smooth scroll. 
3. **The 'Reveal'**: Say 'And now, for the real-time demonstration...' and click **Launch Predictor**.
4. **Interactive**: Ask the panel 'Which city should we check?'. Select it in the dropdown. The violet charts will update instantly.

**Defending the 'Flashy' UI:**
- If asked 'Why so much styling for a research project?':
- **Answer**: 'User engagement is critical for environmental awareness. A modern interface ensures that complex data is actually consumed and understood by the public, rather than ignored.'

