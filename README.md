# FEND - Travel Planner App

This repository contains the "Travel Planner" app.

## API configuration

1. Sign-up at  [geonames.org](https://www.geonames.org/export/web-services.html)
2. Sign-up at  [weatherbit.io](https://www.weatherbit.io/account/dashboard)
3. Sign-up at  [pixabay.com](https://pixabay.com/api/docs/)
4. Create a `.env` file in the project root directory
5. Edit the `.env` file with your API keys:
   GEONAMES_USERNAME=***
   WEATHERBIT_API_KEY=****
   PIXABAY_API_KEY=*****

## Installing

At the "fend_capstone_travel_app" folder, run:

`npm install` to resolve dependencies

## Running unit tests

Run `npm run test` to execute the unit tests via [Jest](https://jestjs.io/).
Run these tests with no express server up because the same port will/may be used.

## Build and run (production mode)

Run `npm run build-prod` to build the project. The build artifacts will be stored in the `dist/` directory.
Run `npm run start` to start the express back-end production server

## Build and run (development mode)

Run `npm run build-dev` to build the project and start automatically the webpack dev server
On another terminal run `npm run build-prod` and `npm run start` for the express back-end server

## Try the api 

Dev mode at `http://localhost:8080/`

Production mode at `http://localhost:8081/`


