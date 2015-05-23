var UPS = require('shipping-ups');
var _Promise = require("promise");

var ups = UPS({
  environment: 'live',
  username: process.env.UPS_USERNAME,
  password: process.env.UPS_PASSWORD,
  access_key: process.env.UPS_ACCESS_KEY,
  imperial: true
});

module.exports = {
  get: function(trackingNumber) {
    return new _Promise(function(resolve, reject) {
      ups.track(trackingNumber, function(err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
};
