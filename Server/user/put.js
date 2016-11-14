'use strict';
const User = require('../models/User.js');
const Passport = require('../models/Passport.js');

module.exports = function changeUser(req, res) {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, {runValidators: true})
        .then(user => {
            Passport.findByIdAndUpdate(user.passportId, {$set: req.body}, {runValidators: true})
                .then(passport => {
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
