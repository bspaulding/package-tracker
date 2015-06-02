require('dotenv').load();

var connect = require("connect");
var serveStatic = require("serve-static");
var send = require("send");
var app = connect();
var TrackingStore = require('./src/tracking-store.js');

app.use(require("compression")());
app.use('/api', function(request, response/* , next */) {
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
});
app.use(serveStatic("dist"));
app.use(function(request, response/* , next */) {
  var stream = send(request, "dist/index.html", {});
  stream.pipe(response);
});

app.listen(process.env.PORT || 3000);

