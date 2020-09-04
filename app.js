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


// creating a Schema
const buildsSchema = {
  title: String,
  imageURL: String,
  description: String

};

const Build = mongoose.model("Build", buildsSchema);


const design1 = new Build ({
  title: "SliceLine",
  imageURL: "https://www.webdesignerdepot.com/cdn-origin/uploads/2020/01/004-1.jpg",
  description: " This is an interesting mother fucker eh"
});

design1.save()

app.get("/", function(req,res){
  res.render('home');
});



// rendering console view
app.get("/console", function(req,res){
  res.render('console');
});

app.post("/console", function(req,res){

  const buildPost = new Build ({
    title: req.body.title,
    imageURL: req.body.image,
    description: req.body.description
  });

  buildPost.save();
  res.redirect("/showcase");

});



// rendering showcase view
app.get("/showcase", function(req,res) {

  Build.find({}, function(err, buildsFound){
    if(buildsFound === 0){
      Build.insertMany(buildsFound, function(err){
        if(err){
          console.log(err);
        }else{
          console.log("Successfully submitted blog to db");
        }
      });
      res.redirect("/showcase")
    }else{
      res.render('showcase', {builds:buildsFound});
    }
  });
});

app.listen(3002, function(){
  console.log("running on port 3002");
});
