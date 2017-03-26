var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var compression = require("compression");

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false,
  limit: '10mb'
}));

// parse application/json
app.use(bodyParser.json());


// parse multipart/form-data to req.body
app.use(multer({
  dest: 'uploads/',
  limits: {
    fileSize : 50 * 1024 * 1024
  }
}).fields());

// gzip, deflate
app.use(compression());

app.use("/", express.static(path.join(__dirname, "public")));

app.all("/user", function(req, res){
  res.send({
    name: "sunqun",
    job: "developer"
  });
});

app.listen(3000);

console.log("server is listening 3000");