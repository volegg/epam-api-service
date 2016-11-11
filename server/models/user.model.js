const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surename: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  photo: {
    type: String
  },
  country: {
    type: String,
    required: true
  },
  passportId: {
    type: mongoose.Schema.ObjectId
  }
});

module.exports = User = mongoose.model('user', userSchema);
