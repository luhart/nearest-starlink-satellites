# Nearest SpaceX Starlink Satellite Finder

Two things live in this repo:

1. An API for retrieving information about the whereabouts of different Starlink satellites.
2. A web application that visualizes the positions of these satelites.

## API

The API runs as two serverless functions on Vercel's edge network. It uses the [SpaceX-API](https://github.com/r-spacex/SpaceX-API) for getting the satellite data.

### Usage:

/get_nearest_sats: Get the n-nearest satellites of a given lat/long coordinate.
```http
GET https://nearby-starlink-sats.vercel.app/api/starlink-tracker/get_nearest_sats?latitude=40&longitude=50&n=5
```

/get_all_sats: Get all satellites with a non-null lat/long coordinate.
```http
GET https://nearby-starlink-sats.vercel.app/api/starlink-tracker/get_all_sats
```

## Visualization

The visualization is running [here](https://nearby-starlink-sats.vercel.app/) on Vercel. It's a pretty simple React + NextJS app that makes use of [react-globe](https://github.com/chrisrzhou/react-globe). It would be fun to try making my own globe visualization with WebGL - we'll see if I find the time for that.
