'use strict';
const User = require('../models/User.js');
const Passport = require('../models/Passport.js');

module.exports = function getUser(req, res) {
    console.log('get');
    let user = {
        name: 'Alan',
        surname: 'Wake',
        query: req.query.id
    }
    res.send(user);
};
