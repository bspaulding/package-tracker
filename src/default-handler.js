var send = require("send");

module.exports = function(request, response/* , next */) {
  var stream = send(request, "dist/index.html", {});
  stream.pipe(response);
};

