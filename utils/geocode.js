const request = require('request');
const forecast = require('./forecast');
const chalk = require('chalk');

const geocode = (location) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?limit=1&access_token=pk.eyJ1Ijoid2ViZGV2d2l0aG9tYXIiLCJhIjoiY2p4a3JlZWZ1MTVycTN0cXBpdmRxbTl1eiJ9.jyfkWpdxdMAHJ41sy-SgbA`;

    request({ url, json: true }, (error, response) => {
        if (error) {
            console.log(chalk.red('Unable to connect to server'));
        } else if (response.body.features.length === 0) {
            console.log(chalk.red('Unable to find the place you are looking for. Please try again'));
        } else {
            const responseBody = response.body.features[0];
            const countryName = responseBody.context[1].text;
            const longitude = responseBody.center[0];
            const latitude = responseBody.center[1];
            forecast(longitude, latitude, countryName);
        }
    });

}

module.exports = geocode;