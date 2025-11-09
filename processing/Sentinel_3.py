import argparse
from datetime import datetime

import matplotlib.pyplot as plt
import openeo
import xarray
import time
import os.path
from dateutil.relativedelta import relativedelta

if __name__ == "__main__":


    parser = argparse.ArgumentParser(description="Simple calculator.")
    parser.add_argument('west', type=float)
    parser.add_argument('south', type=float)
    parser.add_argument('east', type=float)
    parser.add_argument('north', type=float)

    args = parser.parse_args()

    conn = openeo.connect("openeo.dataspace.copernicus.eu")
    conn.authenticate_oidc()
    conn.describe_collection("SENTINEL3_OLCI_L1B")



    start_date = datetime(2025, 6, 1)
    end_date = datetime(2025, 11, 1)

    step = relativedelta(weeks=1)

    current = start_date
    while current <= end_date:
        print(current.strftime("%Y-%m-%d"))
        current += step


        if os.path.isfile(f"satellite_images/{current}.png"):
            continue



        #bbox = {"west": 27.564697, "south": 34.764179, "east": 33.002930, "north": 37.387617}
        bbox = {"west": args.west, "south": args.south, "east": args.east, "north": args.north}
        sentinel3 = conn.load_collection(
            "SENTINEL3_OLCI_L1B",
            spatial_extent=bbox,
            temporal_extent=[current.strftime('%Y-%m-%d'), current.strftime('%Y-%m-%d')],
            bands=["B08", "B06", "B04"],
        )

        time.sleep(3)
        sentinel3.download("sentinel3.nc")

        ds = xarray.load_dataset("sentinel3.nc")

        # Convert xarray DataSet to a (bands, t, x, y) DataArray
        data = ds[["B08", "B06", "B04"]].to_array(dim="bands")


        # Create a figure and axis for only the RGB plot
        fig, axrgb = plt.subplots(figsize=(8, 8))

        # Plot the image
        data[{"t": 0}].plot.imshow(ax=axrgb)

        # Remove axes, borders, and whitespace
        axrgb.axis('off')
        plt.subplots_adjust(left=0, right=1, top=1, bottom=0)

        # Save the clean image
        plt.savefig(f"satellite_images/{current}.png", dpi=300, bbox_inches='tight', pad_inches=0)
        plt.close(fig)
