import requests
from sanic import Sanic
from sanic.response import json
from haversine import haversine, Unit

_API_URL = "https://api.spacexdata.com/v4/starlink"
app = Sanic("get nearest n starlink sats")


@app.route("/")
@app.route("/<path:path>")
async def compute_nearest(request):
    """computes a list of the nearest n satelites"""
    n = int(request.args["n"][0])
    latitude = int(request.args["latitude"][0])
    longitude = int(request.args["longitude"][0])
    user_input = (latitude, longitude)
    sats = get_starlink_positions()
    sat_distances = []
    for sat_id, val in sats.items():
        sat_distances.append((sat_id, latitude, longitude, haversine(user_input, val)))
    sat_distances.sort(key=lambda tup: tup[3])
    return json({"sats": sat_distances[:n]})


@app.middleware("response")
def add_allow_origin(request, response):
    """Adds client origin to response allowed origin header."""
    if "Origin" in request.headers:
        origin = request.headers["Origin"]
        response.headers.update({"Access-Control-Allow-Origin": origin})


def get_starlink_positions():
    resp = requests.get(_API_URL).json()
    positions = {
        sat["id"]: (sat["latitude"], sat["longitude"])
        for sat in resp
        if sat["latitude"] and sat["longitude"]
    }
    return positions
