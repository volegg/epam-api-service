const mongoose = require('mongoose');
const { nameValidator, surnameValidator, countryValidator } = require('../shared/validators/user.validator');
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: nameValidator,
      message: '{VALUE} is not a valid. The length must be 30.'
    }
  },
  surname: {
    type: String,
    required: true,
    validate: {
      validator: surnameValidator,
      message: '{VALUE} is not a valid. The length must be 60.'
    }
  },
  birthday: {
    type: Number,
    required: true
  },
  sex: {
    type: Number,
    required: true
  },
  photo: {
    type: String
  },
  country: {
    type: String,
    required: true,
    validate: {
      validator: countryValidator,
      message: '{VALUE} is not a valid. The country must be format alpha 3.'
    }
  },
  passportId: {
    type: mongoose.Schema.ObjectId,
    required: true
  }
});

module.exports = User = mongoose.model('user', userSchema);
