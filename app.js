const express = require("express");

const app = express(); //express app

const morgan = require("morgan"); //3rd party middleware

const mongoose = require("mongoose"); //mongoose object

const DBURI = //the path to connect to the database
  "mongodb+srv://dhruvil1808:Dhruvil1234@dhruvils-db.6wkxh.mongodb.net/Database1?retryWrites=true&w=majority";

const Blog = require("./models/blog"); //importing the blog model

mongoose
  .connect(DBURI, { useNewUrlParser: true, useUnifiedTopology: true }) //connect to mongoDB
  .then(() => app.listen(3000)) //listens for requests after connected to the DB
  .catch((err) => console.log(err));

app.set("view engine", "ejs"); //register view engine
app.set("views", "myviews"); //if views folder = myviews

app.use(express.static("public")); //access static files
app.use(express.urlencoded({ extended: true })); //to add new data to the DB
//midleware for logging
/* app.use((req, res, next) => {
  console.log("\nRequest received");
  console.log("Host: " + req.hostname);
  console.log("Path: " + req.path);
  console.log("Method: " + req.method);
  next(); //for next middleware
}); */

app.use(morgan("dev")); //3rd part middleware for logging

//mongoose and mongoDB sandbox routes
/* app.get("/add-blog", (req, res) => {
  //to add a blog to the database
  const blog = new Blog({
    title: "New Blog 2",
    snippet: "about my 2 new blog",
    body: "This is my 2 new blog",
  });
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-blogs", (req, res) => {
  //to find all the blogs
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/single-blog", (req, res) => {
  //to search for a single blog
  Blog.findById("61c20c555d250c8c70cb8002")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
}); */

//post
app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

//routes
app.get("/", (req, res) => {
  /* const blogs = [
    { title: "Homecoming", snippet: "Homecoming is a movie" },
    { title: "Far From Home", snippet: "Far From Home is a movie" },
    { title: "No way Home", snippet: "No way Home is a movie" },
  ];
  //res.send("<p>Home Page</p>");
  res.render("index", { title: "Home", blogs: blogs }); */
  res.redirect("/blogs");
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});
app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: result.title });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/about-me", (req, res) => {
  res.redirect("/about.html");
});
app.get("/blogs", (req, res) => {
  //to find all the blogs
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result }); //blogs is same as blogs in index.ejs
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/search", (req, res) => {
  res.render("search", { title: "Search" });
});
app.use((req, res) => {
  //404 page
  res.render("404", { title: "404" });
});
