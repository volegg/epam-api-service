'use strict';
const Passport = require('../models/Passport.js');

module.exports = function getPassportById(req, res, next) {
    Passport.findById(req.params.id)
        .then(passport => {
            res.send(passport);
        })
        .catch(err => {
            next(err)
        });
};
