const mongoose = require('mongoose');
const { passportValid, identificationNumber, authority } = require('../shared/validators/passport.validator');

const passportSchema = mongoose.Schema({
  passportNumber: {
    type: String,
    required: true,
    validate: {
      validator: passportValid,
      message: '{VALUE} is not a valid. The length 10, 2 upper case letters, 8 digits | AB12345678.'
    }
  },
  identificationNumber: {
    type: String,
    required: true,
    validate: {
      validator: identificationNumber,
      message: '{VALUE} is not a valid. The length 9.'
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
      validator: authority,
      message: '{VALUE} is not a valid. The length must be less then 100.'
    }
  }
});

module.exports = Passport = mongoose.model('passport', passportSchema);
