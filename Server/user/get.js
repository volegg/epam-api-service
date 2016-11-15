'use strict';
const User = require('../models/User.js');
const Passport = require('../models/Passport.js');

module.exports = function getUser(req, res, next) {
    User.find({})
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            next(err);
        });
};
