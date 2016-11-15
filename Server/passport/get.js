'use strict';
const Passport = require('../models/Passport.js');

module.exports = function getPassports(req, res, next) {
    Passport.find({})
        .then(passport => {
            res.send(passport);
        })
        .catch(err => {
            next(err);
        });
};
