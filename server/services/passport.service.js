const { Passport, User } = require('../models');

module.exports = {
  insertPassport: function(passport) {
    return Passport.create(passport);
  },
  getPassports: function() {
    return Passport.find({});
  },
  getPassportBySurname: function(surname) {
    return User.findOne({surname: surname});
    // return Passport.findOne({_id: id});
  },
  updatePassport: function (id) {
    return Passport.findById(id);
  },
  deletePassport: function(passport) {
    return Passport.findOneAndRemove({_id: passport.id});
  }
};
