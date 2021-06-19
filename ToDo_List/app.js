const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("Public"));

mongoose.connect('mongodb://localhost:27017/todoDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter valid name!"]
  }
});

const customListSchema = new mongoose.Schema({
  name: String,
  items: [listSchema]
})

const Item = mongoose.model("Item", listSchema);
const Custom = mongoose.model("Custom", customListSchema);

const Food = new Item({
  name: "Eat food"
});

const Sleep = new Item({
  name: "Sleep right"
})

const Happy = new Item({
  name: "Be happy!"
})

const defaultArray = [Food, Sleep, Happy]

app.get("/", function(req, res) {

  Item.find({}, function(err, items) {
    if (items.length == 0) {
      Item.insertMany(defaultArray, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("All inserted successfully");
        }
      })
      res.redirect("/");
    } else {
      res.render("index", {
        listTitle: "Today",
        newListItems: items
      });
    }
  })

});

app.get("/:other", function(req, res) {
  var name = req.params.other;

  const custom = new Custom({
    name: name,
    items: defaultArray
  })

  custom.save();

});

app.post("/", function(req, res) {

  // console.log(req.body);
  var inp = req.body.addedItem;

  var added = new Item({
    name: inp
  });

  Item.insertMany(added, function(err, added) {
    if (err) {
      console.log(err);
    } else {
      console.log("New item added");
    }
  });
  res.redirect("/");
});


// app.post("/", function(req, res){
//   document.getElementById("add").onclick()= function(){
//     var text = document.getElementById("item").value;
//     var li = "<li>"+ text + "</li>";
//     document.getElementById("list").appendChild(li);
//   }
//   res.send()
// });

app.post("/delete", function(req, res) {
  var checkedId = req.body.checkbox;
  Item.deleteOne({
    _id: checkedId
  }, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Item deleted");
    }
  });
  res.redirect("/");
})


app.listen(3000, function(req, res) {
  console.log("server up and running on port 3000");
})
