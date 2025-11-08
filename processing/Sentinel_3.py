import datetime
from datetime import timedelta

import openeo
import xarray
import matplotlib.pyplot as plt
import sys

if __name__ == "__main__":
    #west = sys.argv[1]
    #south = sys.argv[2]
    #east = sys.argv[3]
    #north = sys.argv[4]

    conn = openeo.connect("openeo.dataspace.copernicus.eu")
    conn.authenticate_oidc()

    conn.describe_collection("SENTINEL3_OLCI_L1B")

    today = datetime.datetime.today()

    bbox = {"west": 27.564697, "south": 34.764179, "east": 33.002930, "north": 37.387617}
    sentinel3 = conn.load_collection(
        "SENTINEL3_OLCI_L1B",
        spatial_extent=bbox,
        temporal_extent=[today.strftime('%Y-%m-%d'), today.strftime('%Y-%m-%d')],
        bands=["B08", "B06", "B04"],
    )

    #sentinel3.download("sentinel3.nc")

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
    plt.savefig("processing/satellite_images/foo.png", dpi=300, bbox_inches='tight', pad_inches=0)
    plt.close(fig)
