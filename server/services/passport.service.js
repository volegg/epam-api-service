const Passport = require('../models/passport.model');

module.exports = {
  insertPassport: function(passport) {
    return Passport.create(passport);
  },
  getPassports: function() {
  }
};
