const mongoose = require('mongoose');

const passportSchema = mongoose.Schema({
  passportNumber: {
    type: String,
    required: true
  },
  identificationNumber: {
    type: String,
    required: true
  },
  issueDate: {
    type: Number,
    required: true
  },
  expiryDate: {
    type: Number,
    required: true
  },
  authority: {
    type: String,
    required: true
  }
});

module.exports = Passport = mongoose.model('passport', passportSchema);
