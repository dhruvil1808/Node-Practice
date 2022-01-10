const fs = require("fs");

const readStream = fs.createReadStream("./DOCS/streams.txt", {
  encoding: "utf8",
});

const writeStream = fs.createWriteStream("./DOCS/streams2.txt");
// readStream.on("data", (chunk) => {
//   console.log("----------------------");
//   console.log(chunk);
//   writeStream.write("\nNEW CHUNK\n");
//   writeStream.write(chunk);
// });

//piping
readStream.pipe(writeStream);
