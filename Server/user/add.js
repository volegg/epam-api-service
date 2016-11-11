'use strict';
const User = require('../models/User.js');
const Passport = require('../models/Passport.js');

module.exports = function addUser(req, res) {
    console.log('post '+req);
    res.sendStatus(200);
};
