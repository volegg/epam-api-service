'use strict';
const Passport = require('../models/Passport.js');

module.exports = function getPassportById(req, res) {
    Passport.findById(req.params.id)
        .then(passport => {
            res.send(passport);
        })
        .catch(err => {
            res.status(500).send(err);
        });
};
