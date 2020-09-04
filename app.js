const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// connecting to database
mongoose.connect("mongodb://localhost:27017/wrangleSite", { useUnifiedTopology: true, useNewUrlParser: true })

app.get("/", function(req,res){
  res.render('home');
});



// rendering console view
app.get("/console", function(req,res){
  res.render('console');
});

app.post("/console", function(req,res){

})



// rendering showcase view
app.get("/showcase", function(req,res) {
  res.render('showcase');
});

app.listen(3002, function(){
  console.log("running on port 3002");
});
