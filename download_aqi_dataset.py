"""
Simple AQI Dataset Downloader

This script attempts to download the India Air Quality dataset from Kaggle.
Make sure you have your kaggle.json in C:\\Users\\ashok\\.kaggle\\
"""

import os
import sys

def check_kaggle_credentials():
    """Check if Kaggle credentials exist"""
    kaggle_path = os.path.expanduser("~/.kaggle/kaggle.json")
    if not os.path.exists(kaggle_path):
        print("❌ Kaggle credentials not found!")
        print(f"\nPlease place your kaggle.json file at: {kaggle_path}")
        print("\nTo get your API key:")
        print("1. Go to https://www.kaggle.com/settings")
        print("2. Scroll to 'API' section")
        print("3. Click 'Create New API Token'")
        print("4. Move the downloaded kaggle.json to the path above")
        return False
    print("✓ Kaggle credentials found!")
    return True

def download_dataset():
    """Download the AQI dataset"""
    try:
        from kaggle.api.kaggle_api_extended import KaggleApi
        
        print("\n" + "="*60)
        print("Downloading India Air Quality Dataset...")
        print("="*60)
        
        api = KaggleApi()
        api.authenticate()
        
        # Download the dataset
        dataset = "rohanrao/air-quality-data-in-india"
        print(f"\nDataset: {dataset}")
        print("This may take a few minutes...\n")
        
        api.dataset_download_files(dataset, path=".", unzip=True)
        
        print("\n✓ Dataset downloaded successfully!")
        print("\nDownloaded files:")
        for file in os.listdir("."):
            if file.endswith(".csv"):
                size_mb = os.path.getsize(file) / (1024 * 1024)
                print(f"  - {file} ({size_mb:.2f} MB)")
        
        return True
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        print("\nTroubleshooting:")
        print("1. Make sure you've accepted the dataset terms on Kaggle website")
        print("2. Check your internet connection")
        print("3. Verify your kaggle.json is valid")
        return False

if __name__ == "__main__":
    print("AQI Dataset Downloader")
    print("=" * 60)
    
    if check_kaggle_credentials():
        if download_dataset():
            print("\n✓ All done! You can now use the downloaded CSV file.")
        else:
            print("\n❌ Download failed. Please check the errors above.")
            sys.exit(1)
    else:
        print("\n❌ Please set up Kaggle credentials first.")
        print("See DOWNLOAD_INSTRUCTIONS.md for details.")
        sys.exit(1)
