'use strict';
const User = require('../models/User.js');
const Passport = require('../models/Passport.js');

module.exports = function changeUser(req, res) {
    console.log('put');
    res.send('success put');
};
