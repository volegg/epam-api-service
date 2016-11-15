'use strict';
const User = require('../models/User.js');
const Passport = require('../models/Passport.js');

module.exports = function getPassportByName(req, res, next) {
    User.find({name: req.params.name, surname: req.params.surname})
        .then(user => {
            user.forEach((current) => {
                Passport.findById(current.passportId)
                    .then(passport => {
                        res.send(passport);
                    })
                    .catch(err => {
                        next(err);
                    });
            });
        })
        .catch(err => {
            next(err);
        });
};
