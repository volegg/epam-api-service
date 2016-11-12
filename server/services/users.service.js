const { User } = require('../models');

module.exports = {
  insertUser: function(user) {
    return User.create(user);
  },
  getUsers: function() {
    return User.find({});
  },
  getUserById: function(id) {
    return User.findOne({_id: id});
  },
  updateUser: function (id) {
    return User.findById(id);
  },
  deleteUser: function(user) {
    return User.findOneAndRemove({_id: user.id});
  }
};
