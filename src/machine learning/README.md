Sentinel-2 Tree Detection with Machine Learning
This project automatically detects trees and vegetation from Sentinel-2 satellite imagery using a combination of remote sensing (NDVI) and machine learning (Random Forest classification).
It uses the Sentinel Hub API to download multi-spectral imagery (RGB + NDVI), then processes each image tile to classify pixels as tree or non-tree, outputting a colorized map for each location.

Example Output
RGB Image	NDVI (Vegetation Index)	ML Classified Overlay
Green = Tree / Vegetation
Gray = Non-vegetation (roads, soil, roofs)

Key Features
Sentinel Hub API integration for on-demand satellite imagery
Automatic NDVI computation (B08, B04 bands)
Random Forest classifier trained per tile
Adaptive thresholds to handle different environments (urban, forest, desert)
Failsafe random sampling if NDVI range is weak
Visual outputs for every coordinate:
*_rgb.png → true color
*_ndvi.tif → vegetation index
*_classified.png → ML tree classification
Project Structure
machine learning/
│
├── sentinel_tree_images/        # Downloaded and processed Sentinel-2 images
│   ├── tree_1_rgb.png           # True-color RGB image
│   ├── tree_1_ndvi.tif          # NDVI vegetation index
│   ├── tree_1_classified.png    # Random Forest classification output
│
├── message.txt                  # Coordinates (latitude, longitude) list
├── sentinel.env                 # Sentinel Hub credentials
├── improvement.ipynb         # Script to download RGB + NDVI images, improved detection script
├── tree_classifier.ipynb           # Machine learning classification script
└── README.md                    # (this file)
⚙️ Installation
Clone this repository
git clone https://github.com/YOUR_USERNAME/tourism-technology-festival-2025.git
cd tourism-technology-festival-2025/machine\ learning
Install dependencies
pip install sentinelhub numpy matplotlib pillow rasterio scikit-learn tqdm scikit-image python-dotenv
Set up Sentinel Hub API credentials
Create a file called sentinel.env:
SH_CLIENT_ID=your_client_id
SH_CLIENT_SECRET=your_client_secret
You can find these values in your Sentinel Hub Dashboard.
Usage
Step 1 — Download Sentinel-2 tiles
Use your message.txt file containing lat/lon coordinates:
48.23456 14.12345
48.23512 14.12500
Then run:
python sentinel_download.py
This will:
Read coordinates
Download RGB and NDVI tiles from Sentinel-2
Save them under sentinel_tree_images/
Step 2 — Run the ML Tree Classifier
python tree_classifier.py
This will:
Load all *_rgb.png and *_ndvi.tif pairs
Train a Random Forest per tile (tree vs non-tree)
Save *_classified.png visual outputs
Optionally display RGB + NDVI + classified results
How It Works
Download Stage (Sentinel Hub API)
Fetches RGB bands (B04, B03, B02)
Fetches NDVI from B08 and B04
Feature Extraction
Each pixel = [R, G, B, NDVI]
Automatic Labeling
NDVI > 0.4 → “Tree”
NDVI < 0.2 → “Non-tree”
Adaptive thresholds for different conditions
Machine Learning
Trains a RandomForestClassifier on these pixels
Predicts the class for all pixels in the tile
Visualization
Creates overlay image:
Green = vegetation
Gray = non-vegetation
Example Command Flow
# 1. Download Sentinel-2 imagery for each coordinate
python sentinel_download.py

# 2. Run ML tree classification
python tree_classifier.py
Output example:
Loaded 5 coordinates from message.txt
Processing tree_1: NDVI range = 0.05–0.78
Training with 5200 samples
Saved classified image: sentinel_tree_images/tree_1_classified.png
Troubleshooting
Problem	Cause	Solution
ValueError: Found array with 0 samples	NDVI thresholds too strict	NDVI range auto-adjusts, but ensure your tile includes vegetation
Images appear blank	Cloudy Sentinel-2 tile	Try a different date or location
403 API error	Invalid Sentinel credentials	Check sentinel.env file
NDVI values all near 0	Wrong bands / clouds	Ensure evalscript uses B08 & B04
References
Sentinel Hub API Docs: https://docs.sentinel-hub.com/api/latest/
Sentinel-2 Bands Info: ESA Sentinel-2 MSI
NDVI Formula: Rouse et al. (1974). Monitoring Vegetation Systems in the Great Plains with ERTS.
Future Improvements
Add additional bands (SWIR, Red Edge)
Temporal averaging for seasonal tree stability
Integrate a CNN (U-Net) for spatial tree segmentation
Export classified maps as GeoTIFF for GIS tools (QGIS, ArcGIS)
