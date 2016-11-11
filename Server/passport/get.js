'use strict';
const User = require('../models/User.js');
const Passport = require('../models/Passport.js');

module.exports = function getPassport(req, res) {
    console.log('get');
    res.send('this\'s my passport');
};
