const request = require('request');

const geocode = (address, callback) => {
  const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2VhbmxpZGV2ZWxvcGVyIiwiYSI6ImNrdTBwZ293dDB3djUybnM4YWRjNTBxZHIifQ.VPZ5Id5VtsNbE_Fbmb9zMw&limit=1`;

  request({ url: geocodeURL, json: true }, (error, { body }) => {
    if (error) {
      callback('there is error', undefined);
    } else if (body.length === 0) {
      callback(
        'Unable to find the address, please try another address',
        undefined
      );
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
