'use strict';
const mongoose = require('mongoose');

const Passport = new mongoose.Schema({
    passportNumber: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[A-Z]{2}[0-9]{8}$/.test(v);
            },
            message: '{VALUE} is not a valid passport number!'
        }
    },
    identificationNumber: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[2-3][0-9]{6}(PB|GB|BI)$/.test(v);
            },
            message: '{VALUE} is not a valid identification number!'
        }
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
        maxlength: 100,
        required: true
    }
});

module.exports = mongoose.model('Passport', Passport);
