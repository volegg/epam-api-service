'use strict';
const mongoose = require('mongoose');

const Passport = new mongoose.Schema({
    passportNumber: {
        type: String, //length 10, 2 upper case letters, 8 digits | AB12345678
        required: true,
        validate: {
            validator: function validate(v) {
                return /^[a-zA-Zа-яА-Я\s]+$/.test(v);
            },
            message: '{VALUE} is not a valid name!'
        }
    },
    identificationNumber: {
        type: String, //length 9, sex number (2 - female, 3 - male), short birthday date, PB/GB/BI | 2020286GB
        required: true
    },
    issueDate: {
        type: Date,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    authority: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Passport', Passport);
