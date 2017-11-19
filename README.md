# Crypto Charts

#### Installation

After cloning this repo onto your machine, please install dependencies by running the following command:
```sh
$ npm install
```

##### Development

To run the app in development (with Hot Module Reloading):
```sh
$ npm run dev
```
Go to http://localhost:8080 in your browser.

##### Production

To run the production build:
```sh
$ npm run build
$ npm start
```
Go to http://localhost:3000 in your browser.

##### Docker

To run the app from a Docker container:
```sh
$ docker pull jacobworrel/crypto-charts
$ docker run -p 5000:3000 jacobworrel/crypto-charts
```
Go to http://localhost:5000 in your browser.
