'use strict';
const mongoose = require('mongoose');

const Passport = new mongoose.Schema({
    passportNumber: {
        type: String,
        required: [true, 'Passport number is required field'],
        validate: {
            validator: function(v) {
                return /^[A-Z]{2}[0-9]{8}$/.test(v);
            },
            message: '{VALUE} is not a valid passport number. Length 10, 2 uppercase letters, 8 digits | AB12345678'
        }
    },
    identificationNumber: {
        type: String,
        required: [true, 'Identification number is required field'],
        validate: {
            validator: function(v) {
                return /^[2-3][0-9]{6}(PB|GB|BI)$/.test(v);
            },
            message: '{VALUE} is not a valid identification number. Length 9, sex number (2 - female, 3 - male), short birthday date, PB/GB/BI | 2020286GB'
        }
    },
    issueDate: {
        type: Date,
        required: [true, 'Issue date is required field']
    },
    expiryDate: {
        type: Date,
        required: [true, 'Expiry date is required field']
    },
    authority: {
        type: String,
        maxlength: [100, 'max length 100'],
        required: [true, 'authority is required field']
    }
});

module.exports = mongoose.model('Passport', Passport);
