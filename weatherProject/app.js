const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  var cityname = req.body.cn;

  const url="https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=metric&appid=5c44be5ec1303142dc0c409b26b77ae0";
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherdata= JSON.parse(data);
      const temp = weatherdata.main.temp;
      res.send("<h1> The temperature of " + cityname + " is " + temp + "</h1>" )
    })
  });
});


app.listen(3000, function(req,res){
  console.log("server running");
});
