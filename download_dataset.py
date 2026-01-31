"""
Download Air Quality Dataset from Kaggle

This script helps download the India Air Quality dataset from Kaggle.
You need to have a Kaggle account and API token.

Setup Instructions:
1. Go to https://www.kaggle.com/settings
2. Scroll to "API" section
3. Click "Create New API Token"
4. Save the kaggle.json file to: C:\\Users\\ashok\\.kaggle\\kaggle.json

Then run this script.
"""

import os
import subprocess
import sys

def install_kaggle():
    """Install kaggle package if not already installed"""
    try:
        import kaggle
        print("✓ Kaggle package already installed")
    except ImportError:
        print("Installing kaggle package...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "kaggle"])
        print("✓ Kaggle package installed")

def download_dataset():
    """Download the air quality dataset"""
    try:
        import kaggle
        
        # Dataset identifier
        dataset = "rohanrao/air-quality-data-in-india"
        
        print(f"Downloading dataset: {dataset}")
        print("This may take a few minutes...")
        
        # Download to current directory
        kaggle.api.dataset_download_files(dataset, path=".", unzip=True)
        
        print("✓ Dataset downloaded successfully!")
        print("\nDownloaded files:")
        for file in os.listdir("."):
            if file.endswith(".csv"):
                print(f"  - {file}")
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        print("\nPlease ensure:")
        print("1. You have a Kaggle account")
        print("2. Your kaggle.json is in C:\\Users\\ashok\\.kaggle\\")
        print("3. You have accepted the dataset terms on Kaggle website")

if __name__ == "__main__":
    print("=" * 60)
    print("Air Quality Dataset Downloader")
    print("=" * 60)
    
    install_kaggle()
    download_dataset()
