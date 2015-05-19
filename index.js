require('dotenv').load();

var connect = require("connect");
var serveStatic = require("serve-static");
var send = require("send");
var app = connect();
var http = require("http");
var UPS = require("shipping-ups");

var ups = UPS({
  environment: 'live',
  username: process.env.UPS_USERNAME,
  password: process.env.UPS_PASSWORD,
  access_key: process.env.UPS_ACCESS_KEY,
  imperial: true
});

app.use(require("compression")());
app.use('/api', function(request, response, next) {
  var match = request.originalUrl.match(/\/api\/(.+)/);
  if (!match) {
    response.end(JSON.stringify({ error: "No tracking number provided" }));
  }

  ups.track(match[1], function(err, results) {
    var result = {};
    if (err) {
      result = { error: err };
    } else {
      result = results;
    }

    response.end(JSON.stringify(result));
  });
});
app.use(serveStatic("dist"));
app.use(function(request, response, next) {
  var stream = send(request, "dist/index.html", {});
  stream.pipe(response);
});

app.listen(process.env.PORT || 3000);
