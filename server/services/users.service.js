const User = require('../models/user.model');

module.exports = {
  insertUser: function(user) {
    return User.create(user);
  },
  getUsers: function() {
    return User.find({});
  },
  getUserById: function(id) {
    return User.findOne({_id: id});
  }
};
