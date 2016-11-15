'use strict';
const Passport = require('../models/Passport.js');

module.exports = function changePassport(req, res, next) {
    Passport.findByIdAndUpdate(req.params.id, {$set: req.body}, {runValidators: true})
        .then(passport => {
            res.send(passport);
        })
        .catch(err => {
            next(err);
        });
};
