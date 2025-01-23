const mongoose = require("mongoose");

const AuthorScehma = new mongoose.Schema({
    name:String,
    bio:String
})


module.exports = mongoose.model("Author",AuthorScehma);


