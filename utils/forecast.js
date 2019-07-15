const request = require('request');
const chalk = require('chalk');

const forecast = (latitude, longitude, countryName) => {

    const url = `https://api.darksky.net/forecast/5a9f3ebfae037c192d18ddf4971d63dd/${longitude},${latitude}?units=si&exclude=hourly,flags`;

    request({ url, json: true }, (error, response) => {
        if (error) {
            console.log(chalk.red('Unable to connect to the services API.'));
        } else if (response.body.error) {
            console.log(chalk.red(response.body.error));
        } else {
            const temperature = response.body.currently.temperature;
            const currentSummary = response.body.currently.summary;
            const summary = response.body.daily.summary;

            const message = `Name of the country is ${countryName}. ${currentSummary}. Current temperature is ${temperature}°C. ${summary}`

            console.log(chalk.green(message));
        }
    });

}

module.exports = forecast;