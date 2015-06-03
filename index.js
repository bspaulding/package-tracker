require('dotenv').load();

var express = require("express");
var app = express();
var serveStatic = require("serve-static");
var ApiHandler = require("./src/api-handler.js");
var DefaultHandler = require("./src/default-handler.js");

app.use(require("compression")());
app.get(/\/api\/([A-Za-z0-9]+)/, ApiHandler);
app.use(serveStatic("dist"));
app.use(DefaultHandler);

app.listen(process.env.PORT || 3000);

