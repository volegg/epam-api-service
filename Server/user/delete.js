'use strict';
const User = require('../models/User.js');
const Passport = require('../models/Passport.js');

module.exports = function deleteUser(req, res) {
    User.findByIdAndRemove(req.params.id)
        .then((user) => {
            Passport.findByIdAndRemove(user.passportId)
                .then((passport) => {
                    res.send(user);
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        })
        .catch(err => {
            res.status(500).send(err);
        });
};
