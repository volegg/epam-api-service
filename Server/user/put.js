'use strict';
const User = require('../models/User.js');
const Passport = require('../models/Passport.js');

module.exports = function changeUser(req, res, next) {
    User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            runValidators: true
        })
        .then((user) => {
            console.log(user);
            Passport.findByIdAndUpdate(user.passportId, {
                    $set: req.body
                }, {
                    runValidators: true
                })
                .then((passport) => {
                    res.send(user);
                })
                .catch(err => {
                    next(err)
                });
        })
        .catch(err => {
            next(err)
        });
};
