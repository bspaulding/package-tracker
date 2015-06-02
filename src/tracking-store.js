var _Promise = require("bluebird");

var ups = (function() {
  var UPS = require('shipping-ups');
  var ups = UPS({
    environment: 'live',
    username: process.env.UPS_USERNAME,
    password: process.env.UPS_PASSWORD,
    access_key: process.env.UPS_ACCESS_KEY,
    imperial: true
  });

  return {
    track: function(trackingNumber) {
      return new _Promise(function(resolve, reject) {
        ups.track(trackingNumber, function(err, results) {
          if (err) {
            reject(err);
          } else {
            resolve({ carrier: 'UPS', data: results });
          }
        });
      });
    }
  };
}());

var usps = (function() {
  var USPS = require('shipping-usps');
  var usps = new USPS({
    username: process.env.USPS_USER_ID,
    password: process.env.USPS_PASSWORD,
    imperial: true
  });

  return {
    track: function(trackingNumber) {
      return new _Promise(function(resolve, reject) {
        usps.track([trackingNumber], function(err, results) {
          if (err) {
            reject(err);
          } else {
            if (results.TrackResponse.TrackInfo.TrackSummary.indexOf("could not locate") >= 0) {
              reject(results);
            } else {
              resolve({ carrier: 'USPS', data: results });
            }
          }
        });
      });
    }
  };
}());

module.exports = {
  get: function(trackingNumber) {
    return _Promise.any([
      ups.track(trackingNumber),
      usps.track(trackingNumber)
    ]);
  }
};
