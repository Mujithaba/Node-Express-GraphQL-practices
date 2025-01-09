const lodash = require("lodash");
console.log("Hello, Node.js!");
const array = ["arun","mia","john","aswin","ijas"];

const capitalize = lodash.map(array,lodash.capitalize)
console.log(capitalize);
