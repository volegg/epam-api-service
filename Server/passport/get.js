'use strict';
const Passport = require('../models/Passport.js');

module.exports = function getPassports(req, res) {
    Passport.find({})
        .then(passport => {
            res.send(passport);
        })
        .catch(err => {
            res.status(500).send(err);
        });
};
