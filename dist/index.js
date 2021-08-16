"use strict";

var _http = _interopRequireDefault(require("http"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var node_server = function node_server() {
  var hostname = process.env.HOST || "127.0.0.1";
  var port = process.env.PORT || "5000";
  var server_name = "Node Server";
  return {
    server_name: server_name,
    hostname: hostname,
    port: port
  };
};

var initServer = function initServer() {
  var server = _http["default"].createServer(function (req, res) {
    var filePath = "." + req.url;

    if (filePath === "./") {
      filePath = "./src/routes/index.html";
    }

    var extname = String(_path["default"].extname(filePath)).toLowerCase();
    var mimeTypes = {
      ".html": "text/html",
      ".js": "text/javascript",
      ".css": "text/css",
      ".json": "application/json",
      ".png": "image/png",
      ".jpg": "image/jpg",
      ".gif": "image/gif",
      ".svg": "image/svg",
      ".wav": "audio/wav",
      ".mp4": "video/mp4",
      ".woff": "application/font-woff",
      ".ttf": "application/font-tff",
      ".eot": "application/vnd.ms-fontobject",
      ".otf": "application/font-otf",
      ".wasm": "application/wasm"
    };
    var contentType = mimeTypes[extname] || "application/octet-stream";

    _fs["default"].readFile(filePath, function (error, content) {
      if (error) {
        if (error.code == "ENOENT") {
          _fs["default"].readFile("/404.html", function (error, content) {
            res.writeHead(404, {
              "Content-Type": "text/html"
            });
            res.end(content, "utf-8");
          });
        } else {
          res.writeHead(500);
          res.end("Sorry, check with the site admin for error: " + error.code + " ..\n");
        }
      } else {
        res.writeHead(200, {
          "Content-Type": contentType
        });
        res.end(content, "utf-8");
      }
    });
  });

  server.listen(node_server().port, node_server().hostname, function () {
    var server = node_server();
    var server_name = server.server_name;
    var hostname = server.hostname;
    var port = server.port;
    console.log("".concat(server_name, " Started at http://").concat(hostname, ":").concat(port, "/"));
  });
};

initServer();