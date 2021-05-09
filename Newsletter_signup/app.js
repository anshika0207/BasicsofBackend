const express = require("express");
const bodyParser = require("body-parser")
const request = require("request");

const app = express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  var name = req.body.fullname;
  var email = req.body.email;

  console.log(name + " and " + email);

});

app.listen(3000, function(req, res){
  console.log("Port running on 3000");
});
