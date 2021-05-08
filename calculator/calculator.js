const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);

  var result= num1 + num2;

  res.send("the result is: " + result);
});

app.get("/bc", function(req, res){
  res.sendFile(__dirname +  "/bmi.html");
});

app.post("/bc", function(req, res){
  var h = Number(req.body.h);
  var w = Number(req.body.w);

  var bmi = (h*h)/w;

  res.send("BMI is: " + bmi);
});


app.listen(3000, function(){
  console.log("server is running");
});
