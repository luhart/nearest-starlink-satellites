import requests
from sanic import Sanic
from sanic.response import json
from haversine import haversine, Unit

_API_URL = "https://api.spacexdata.com/v4/starlink"
app = Sanic("get all starlink sats")


@app.route("/")
@app.route("/<path:path>")
async def get_all_sats(request):
    sats = get_starlink_positions()
    return json({"sats": sats})


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
