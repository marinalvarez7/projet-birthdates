const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const membersSchema = new Schema({
  prenom: String,
  dateOfBirth: Date,
  email: String,
  message: String,
  //idMessage: [ { type : Schema.Types.ObjectId, ref: 'Message'} ]
}, {
  timestamps: true
});

const Members = mongoose.model("Members", membersSchema);

module.exports = Members;