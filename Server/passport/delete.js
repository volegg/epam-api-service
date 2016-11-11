'use strict';
const User = require('../models/User.js');
const Passport = require('../models/Passport.js');

module.exports = function deletePassport(req, res) {
    console.log('delete');
    res.sendStatus(200);
};
