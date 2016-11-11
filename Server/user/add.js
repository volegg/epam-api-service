'use strict';
const User = require('../models/User.js');
const Passport = require('../models/Passport.js');

module.exports = function addUser(req, res) {
    console.log('post');
    const user = new User({
        name: 'John',
        surname: 'Snow',
        birthday: new Date(),
        sex: 'male',
        photo: 'NA',
        country: 'RUS'
    });
    console.log(user);
    user.save((error) => {
        if (error) {
            res.sendStatus(400);
        } else {
            res.sendStatus(200);
        }
    });
};
