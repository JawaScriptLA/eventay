const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/eventay");

let db = mongoose.connection;

db.on("error", function() {
  console.log("mongoose connection error");
});

db.once("open", function() {
  console.log("mongoose connected successfully");
});

let userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String
});

let Movie = mongoose.model("User", userSchema);
