const mongoose = require('mongoose');
const { passportNumberValid, identificationNumberValid, authorityValid } = require('../shared/validators/passport.validator');

const passportSchema = mongoose.Schema({
  passportNumber: {
    type: String,
    required: true,
    validate: {
      validator: passportNumberValid,
      message: '{VALUE} is not a valid. The length 10, 2 upper case letters, 8 digits | AB12345678.'
    }
  },
  identificationNumber: {
    type: String,
    required: true,
    validate: {
      validator: identificationNumberValid,
      message: '{VALUE} is not a valid. The length 9, 7 digits, 2 upper case letters | 1234567(PI|GB|BI).'
    }
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
    required: true,
    validate: {
      validator: authorityValid,
      message: '{VALUE} is not a valid. The length must be less then 100.'
    }
  }
});

module.exports = Passport = mongoose.model('passport', passportSchema);
