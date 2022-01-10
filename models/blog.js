const mongoose = require("mongoose");
const schema = mongoose.Schema; //create a schema

const blogSchema = new schema( //creating a schema
  {
    title: { type: String, required: true },
    snippet: { type: String, required: true },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema); //creating a model with schema
module.exports = Blog;
