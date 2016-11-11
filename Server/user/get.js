'use strict';
const User = require('../models/User.js');
const Passport = require('../models/Passport.js');

module.exports = function getUser(req, res) {
    console.log('get');
    let responseData = User.find({}, (error, user) => {
        if (error) {
            res.sendStatus(400);
        }
        res.send(user)
    });
};
