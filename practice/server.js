const HTTP = require("http");
const fs = require("fs");
const _ = require("lodash");
//creates server
const server = HTTP.createServer((req /*request*/, res /*response*/) => {
  //lodash
  const num = _.random(1, 100);
  console.log(num);

  const greet = _.once(() => {
    console.log("Hello World");
  });
  greet();
  greet();
  //set header content type
  res.setHeader("Content-Type", "text/HTML");

  //making a path to the file based on the url
  let path = "./views";
  switch (req.url) {
    case "/":
      path += "/index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "/about.html";
      res.statusCode = 200;
      break;
    case "/about-us": //for redirecting a url to another url
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      res.statusCode = 404; //100's-info 300's-redirect 400's-client error 500's-server error
      path += "/404.html";
  }

  //read HTML file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      //res.write(data); #if more than 1
      res.end(data); //if only 1 line then can send in end
    }
  });
});

//listens for port
server.listen(3000, "localhost", () => {
  console.log("Server is listening on port 3000");
});
