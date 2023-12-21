const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  name: {
    type: String,
    max: 30,
    required: true
  },
  password: {
    type: String,
    min: 8,
    max: 20,
    required: true
  }
});

module.exports = mongoose.model("User", User);
