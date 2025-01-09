const path = require("path");

console.log("Directory path",path.dirname(__filename));
console.log("filename path",path.basename(__filename));
console.log("extension path",path.extname(__filename));
console.log("join path",path.join("/user","document","note","js"))
console.log("resolve path",path.resolve("user","document","note","js"))
console.log("normalize path",path.normalize("/user/./document/../../../notes/js"))