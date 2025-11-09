import random

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import matplotlib.image as mpimg
import colorsys
import json
from PIL import Image


import cv2
import extcolors

from colormap import rgb2hex

from PIL import Image
from matplotlib.offsetbox import OffsetImage, AnnotationBbox

import argparse
if __name__ == "__main__":


    parser = argparse.ArgumentParser(description="Simple calculator.")
    parser.add_argument('filename', type=str)

    args = parser.parse_args()


    colors_x = extcolors.extract_from_path(args.filename, tolerance = 12, limit = 12)



    # Open an image file
    img = Image.open(args.filename)
    pixels = img.load()
    width, height = img.size

    factor_green = 0.001 * 5 * 5
    trees = []
    for x in range(width):
        for y in range(height):
            r, g, b,a = pixels[x,y]
            h, s, v = colorsys.rgb_to_hsv(r, g, b)
            if (50 / 180.0) < h < (70 / 180.0): # green?
                if random.random() < factor_green * s:
                    trees.append({
                        "x": x,
                        "y": y,
                        "hexcolor": "#2D5A27"
                    })
            if (0 / 180.0) < h < (30 / 180.0): # red/brown?
                if random.random() < factor_green * s:
                    trees.append({
                        "x": x,
                        "y": y,
                        "hexcolor": "#D07A04"
                    })

    json_str = json.dumps({
        "trees": trees,
        "width": width,
        "height": height
    })
    print(json_str)



