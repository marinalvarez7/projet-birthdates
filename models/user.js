const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  prenom: String,
  email: String,
  password: String,
  members : [ { type : Schema.Types.ObjectId, ref: 'Members'} ]
}, {
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;