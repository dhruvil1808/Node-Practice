const fs = require("fs");
//reading files
fs.readFile("./DOCS/doc1.txt", "utf8", (err, data) => {
  //asyncronous hence takes some time
  if (err) {
    console.log(err);
  }
  console.log(data);
});
console.log("hello");

//write files
fs.writeFile("./DOCS/doc1.txt", "Hello World", (err) => {
  //asyncronous hence takes some time
  if (err) {
    console, log(err);
  }
  console.log("file written");
});

//directories
if (!fs.existsSync("./newdir")) {
  //Syncronous
  fs.mkdir("./newdir", (err) => {
    //asyncronous
    if (err) {
      console.log(err);
    }
    console.log("directory created");
  });
} else {
  fs.rmdir("./newdir", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("directory removed");
  });
}

//delete files
if (fs.existsSync("./delete.txt")) {
  fs.unlink("./delete.txt", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("file deleted");
  });
}
