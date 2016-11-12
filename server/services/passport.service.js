const { Passport, User } = require('../models');

module.exports = {
  insertPassport: function(passport) {
    return Passport.create(passport);
  },
  getPassportByidentificationNumber: function(identificationNumber) {
    return Passport.findOne({identificationNumber: identificationNumber});
  },
  getPassports: function() {
    return Passport.find({});
  },
  getPassportBySurname: function(surname) {
    return User.findOne({surname: surname});
  },
  updatePassport: function (id) {
    return Passport.findById(id);
  },
  deletePassport: function(passport) {
    return Passport.findOneAndRemove({_id: passport.id});
  }
};
