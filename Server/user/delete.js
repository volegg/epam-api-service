'use strict';
const User = require('../models/User.js');
const Passport = require('../models/Passport.js');

module.exports = function deleteUser(req, res, next) {
    User.findByIdAndRemove(req.params.id)
        .then((user) => {
            Passport.findByIdAndRemove(user.passportId)
                .then((passport) => {
                    res.send(user);
                })
                .catch(err => {next(err)});
        })
        .catch(err => {
            next(err)
        });
};
