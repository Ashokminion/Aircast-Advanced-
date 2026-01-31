# How to Download AQI Dataset from Kaggle

## Step 1: Get Kaggle API Key

1. Go to https://www.kaggle.com/settings
2. Scroll down to "API" section
3. Click "Create New API Token"
4. This will download `kaggle.json` file

## Step 2: Place the API Key

Move the `kaggle.json` file to:
```
C:\Users\ashok\.kaggle\kaggle.json
```

## Step 3: Run the Download Script

Once you've placed the kaggle.json file, run:
```bash
python download_aqi_dataset.py
```

This will download the India Air Quality dataset automatically!

## Alternative: Manual Download

If you prefer, you can manually download from:
https://www.kaggle.com/datasets/rohanrao/air-quality-data-in-india

Then extract the CSV file to this folder.
