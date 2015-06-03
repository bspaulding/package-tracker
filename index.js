require('dotenv').load();

var express = require("express");
var app = express();
var serveStatic = require("serve-static");
var send = require("send");
var ApiHandler = require("./src/api-handler.js");

app.use(require("compression")());
app.get(/\/api\/([A-Za-z0-9]+)/, ApiHandler);
app.use(serveStatic("dist"));
app.use(function(request, response/* , next */) {
  var stream = send(request, "dist/index.html", {});
  stream.pipe(response);
});

app.listen(process.env.PORT || 3000);

