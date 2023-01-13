from flask import Flask, request
import rasterio
from flask_cors import CORS, cross_origin

tif_folder_cwu = "../tile_server/cwu_data"
tif_folder_gpp = "../tile_server/yield_data"

app = Flask(__name__)
CORS(app, supports_credentials=True)


@app.route('/')
@cross_origin(supports_credentials=True)
def index():
    return 'Raster Value Server is Running'


@app.route('/fetchval/<name>/<year>', methods=['POST'])
@cross_origin(supports_credentials=True)
def fetchval(name, year):
    if request.json is None:
        return "Provide coordinates"
    lat = float(request.json['lat'])
    long = float(request.json['long'])
    if name == "cwu":
        if (int(year) < 2001 or int(year) > 2015):
            return "Incorrect year"
        tif_path = f'{tif_folder_cwu}/optimized/cwu_{year}.tif'
    elif name == "gpp":
        if (int(year) < 2000 or int(year) > 2015):
            return "Incorrect year"
        tif_path = f'{tif_folder_gpp}/optimized/gpp_med_{year}.tif'
    else:
        return "Incorrect type"
    try:
        with rasterio.open(tif_path) as src:
            z = src.read()[0]
            val = src.index(long, lat)
            data = src.xy(*val), z[val]
            print(data)
            output = {}
            output['lat'] = data[0][1]
            output['long'] = data[0][0]
            output['val'] = data[1]
            return output
    except:
        return "Error reading the file"


app.run(port=3002)
