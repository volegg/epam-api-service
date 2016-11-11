'use strict';
const User = require('../models/User.js');
const Passport = require('../models/Passport.js');

module.exports = function deleteUser(req, res) {
    console.log('delete');
    res.send('success delete');
};
