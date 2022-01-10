const XYZ = require("./People.js");
console.log(XYZ.age);

const { people, age } = require("./People.js");
console.log(people, age);

const os = require("os");
console.log(os.platform(), os.homedir());
