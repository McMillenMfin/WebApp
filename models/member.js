var mongoose    = require("mongoose");

var memberSchema    = new mongoose.Schema({
   name: String,
   gender: String,
   age: String,
   smokes: String,
   height: String,
   weight: String
});

module.exports = mongoose.model('Member', memberSchema);

