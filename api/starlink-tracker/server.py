import requests
from sanic import Sanic
from sanic.response import json
from haversine import haversine, Unit

_API_URL = "https://api.spacexdata.com/v4/starlink"
app = Sanic("ETH Rate Normalizer API")


def test_starlink_get(sats):
    assert len(sats) == 891, "missing satellites"


def get_starlink_positions():
    resp = requests.get(_API_URL).json()
    positions = {
        sat["id"]: (sat["latitude"], sat["longitude"])
        for sat in resp
        if sat["latitude"] and sat["longitude"]
    }
    return positions


@app.route("/get_nearest_n")
def compute_nearest(request):
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


@app.route("/get_all_sats")
def get_all_sats(request):
    sats = get_starlink_positions()
    return json({"sats": sats})


@app.middleware("response")
def add_allow_origin(request, response):
    """Adds client origin to response allowed origin header."""
    if "Origin" in request.headers:
        origin = request.headers["Origin"]
        response.headers.update({"Access-Control-Allow-Origin": origin})


def main():
    app.run(host="0.0.0.0", port=8000)
    """
    sats = get_starlink_positions()
    test_starlink_get(sats)
    while True:
        # assume user will enter intable/floatable input, change this later
        n = int(input("n: "))
        latitude = float(input("latitude: "))
        longitude = float(input("longitude: "))
        ans = compute_nearest(sats, n, latitude, longitude)
        print(ans)
    """

if __name__ == "__main__":
    main()
