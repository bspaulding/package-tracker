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

var fedex = (function() {
  var FEDEX = require('shipping-fedex');
  var fedex = new FEDEX({
    environment: process.env.FEDEX_ENVIRONMENT,
    key: process.env.FEDEX_API_KEY,
    password: process.env.FEDEX_PASSWORD,
    account_number: process.env.FEDEX_ACCOUNT_NUMBER,
    meter_number: process.env.FEDEX_METER_NUMBER
  });

  return {
    track: function(trackingNumber) {
      return new _Promise(function(resolve, reject) {
        fedex.track({
          SelectionDetails: {
            PackageIdentifier: {
              Type: 'TRACKING_NUMBER_OR_DOORTAG',
              Value: trackingNumber
            }
          }
        }, function(error, response) {
          if (error) {
            reject(error);
          } else {
            var trackingDetails = response.CompletedTrackDetails;
            var hasTrackingInfo = trackingDetails ? false : parseInt(trackingDetails.TrackDetailsCount, 10) > 0;
            if (hasTrackingInfo) {
              resolve({ carrier: 'FEDEX', data: response });
            } else {
              reject("No tracking details found");
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
      usps.track(trackingNumber),
      fedex.track(trackingNumber)
    ]);
  }
};
