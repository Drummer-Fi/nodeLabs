import http from "http";
import fs from "fs";
import path from "path";

const node_server = () => {
  let hostname = process.env.HOST || "127.0.0.1";
  let port = process.env.PORT || "5000";
  let server_name = "Node Server";

  return {
    server_name,
    hostname,
    port,
  };
};

const initServer = () => {
  let server = http.createServer((req, res) => {
    let filePath = "." + req.url;
    if (filePath === "./") {
      filePath = "./src/routes/index.html";
    }
    let extname = String(path.extname(filePath)).toLowerCase();
    let mimeTypes = {
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
      ".wasm": "application/wasm",
    };


    
    let contentType = mimeTypes[extname] || "application/octet-stream";

    fs.readFile(filePath, function (error, content) {
      if (error) {
        if (error.code == "ENOENT") {
          fs.readFile("/404.html", function (error, content) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end(content, "utf-8");
          });
        } else {
          res.writeHead(500);
          res.end(
            "Sorry, check with the site admin for error: " +
              error.code +
              " ..\n"
          );
        }
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content, "utf-8");
      }
    });
  });

  server.listen(node_server().port, node_server().hostname, () => {
    const server = node_server();
    const server_name = server.server_name;
    const hostname = server.hostname;
    const port = server.port;

    console.log(`${server_name} Started at http://${hostname}:${port}/`);
  });
};

initServer();