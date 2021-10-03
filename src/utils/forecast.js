const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=34d8550fee3c18802f54916910dc76c1&query=${longitude},${latitude}&units=m`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect the service', undefined);
    } else if (body.error) {
      callback('Unable to find the forecast', undefined);
    } else {
      const { temperature } = body.current;
      const { weather_descriptions } = body.current;
      callback(
        undefined,
        weather_descriptions[0] +
          '. It is currently ' +
          temperature +
          ' degree out.'
      );
    }
  });
};

module.exports = forecast;
