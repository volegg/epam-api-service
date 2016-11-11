'use strict';
const User = require('../models/User.js');
const Passport = require('../models/Passport.js');

module.exports = function addPassport(req, res) {
    console.log('post');
    res.sendStatus(200);
};
