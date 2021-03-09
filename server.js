const { RSA_NO_PADDING } = require("constants");
const http = require("http");
const fs = require("fs");

const port = 4000;

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  res.setHeader("Content-Type", "text/html");

  let path = "./views/";

  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/tasks":
      path += "tasks.html";
      res.statusCode = 200;
      break;
    case "/tasks-all":
      path += "tasks.html";
      res.statusCode = 301;
      res.setHeader("Location", "/tasks");
      res.end();
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      //   res.write(data);
      res.end(data);
    }
  });
});

server.listen(port, "localhost", () => {
  console.log(`listening on request on port ${port}`);
});
