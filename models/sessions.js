const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Session = new Schema({
  name: {
    type: String,
    min: 1,
    max: 20,
    default: "New Session"
  },
  expenses: [{
    name: {
      type: String,
      max: 20,
      required: true
    },
    bill: [{
      billName: {
        type: String,
        max: 20,
        required: true
      },
      amount: {
        type: Number,
        max: 99999,
        required: true
      },
      exclude: {
        type: [String]
      }
    }]
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Session", Session);
