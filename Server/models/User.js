'use strict';
const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z]{1,30}/.test(v);
            },
            message: '{VALUE} is not a valid name!'
        }
    },
    surname: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z]{1,60}/.test(v);
            },
            message: '{VALUE} is not a valid surname!'
        }
    },
    birthday: {
        type: Date,
        required: true
    },
    sex: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /(^male$|^female$)/.test(v);
            },
            message: 'Choose male or female!'
        }
    },
    photo: String,
    country: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[A-Z]{3}$/.test(v);
            },
            message: '{VALUE} is not a valid country code!'
        }
    },
    passportId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Passport'
    }
});

module.exports = mongoose.model('User', User);
