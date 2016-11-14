'use strict';
const User = require('../models/User.js');
const Passport = require('../models/Passport.js');

module.exports = function addUser(req, res) {
    const passport = new Passport({
        passportNumber: req.body.passportNumber,
        identificationNumber: req.body.identificationNumber,
        issueDate: req.body.issueDate,
        expiryDate: req.body.expiryDate,
        authority: req.body.authority
    });
    const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        birthday: req.body.birthday,
        sex: req.body.sex,
        photo: req.body.photo,
        country: req.body.country,
        passportId: passport._id
    });
    user.save()
        .then(() => {
            passport.save()
                .then(() => {
                    let userResponse = {
                        id: user._id,
                        name: user.name,
                        surname: user.surname,
                        birthday: user.birthday,
                        sex: user.sex,
                        photo: user.photo,
                        country: user.country,
                        passportId: passport._id,
                        passportNumber: passport.passportNumber,
                        identificationNumber: passport.identificationNumber,
                    }
                    res.send(userResponse);
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        })
        .catch(err => {
            res.status(500).send(err);
        });
};
