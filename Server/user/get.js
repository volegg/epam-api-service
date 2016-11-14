'use strict';
const User = require('../models/User.js');
const Passport = require('../models/Passport.js');

module.exports = function getUser(req, res) {
    User.find({})
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            res.status(500).send(err);
        });
};
