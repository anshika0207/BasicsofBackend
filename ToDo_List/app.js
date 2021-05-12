const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("Public"));
var items = [];
var worklist = [];

app.get("/", function(req, res){
  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  var today  = new Date();
  var tday = today.toLocaleDateString("en-US", options);
  res.render("index",{day: tday, itm: items});

});

app.get("/work", function(req,res){
  res.render("index",{day: "WorkList", itm: worklist});
});

app.post("/", function(req, res){

  // console.log(req.body);
  let inp = req.body.i;

  if(req.body.list === "WorkList"){
    console.log(worklist);
    worklist.push(inp);
    res.redirect("/work");
  }
  else{
    items.push(inp);
    res.redirect("/");
  }

});


// app.post("/", function(req, res){
//   document.getElementById("add").onclick()= function(){
//     var text = document.getElementById("item").value;
//     var li = "<li>"+ text + "</li>";
//     document.getElementById("list").appendChild(li);
//   }
//   res.send()
// });


app.listen(3000, function(req, res){
  console.log("server up and running on prot 3000");
})
