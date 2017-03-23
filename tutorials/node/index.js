var express = require("express");
var app = express();
app.listen(8899);

// app.use("/first", function(req, res){
//   res.send("/first");
// });
// app.get("/sub", function(req, res){
//   res.send("/sub");
// });

var router = express.Router();

app.use("/first", router);

router.use("/sub", function(req, res){
  res.send("/sub");
});

router.get("/sub2", function(req, res){
  res.send("/sub2");
});