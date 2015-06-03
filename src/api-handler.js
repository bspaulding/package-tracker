var TrackingStore = require('./tracking-store.js');

module.exports = function(request, response/* , next */) {
  var match = request.originalUrl.match(/\/api\/([A-Za-z0-9]+)/);
  if (!match) {
    response.end(JSON.stringify({ error: "No tracking number provided" }));
  }

  TrackingStore.get(match[1])
    .then(function(result) {
      response.end(JSON.stringify({ status: 'ok', result: result }));
    })
    .catch(function(error) {
      response.end(JSON.stringify({ status: 'error', error: error }));
    });
};
