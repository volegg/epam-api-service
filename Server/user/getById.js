'use strict';
const User = require('../models/User.js');
const Passport = require('../models/Passport.js');

module.exports = function getUserById(req, res, next) {
    User.findById(req.params.id)
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            next(err)
        });
};
