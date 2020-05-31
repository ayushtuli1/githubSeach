var express = require("express"),
  path = require("path"),
  compression = require("compression"),
  config = require("./config/config.js");

var app = express();

app.use(compression());

app.use("/app", express.static(path.join("./dist/app")));

app.get("/app/bundle.js", function(req, res) {
  res.sendFile(__dirname + "/dist/bundle.js");
});

app.get("/*", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(config.PORT || 8080, () =>
  console.log(`app listening on port ${config.PORT}!`)
);
