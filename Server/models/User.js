'use strict';
const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required field'],
        validate: {
            validator: function(v) {
                return /^[a-zA-Z]{1,30}/.test(v);
            },
            message: '{VALUE} is not a valid name. Only letters, length from 1 to 30'
        }
    },
    surname: {
        type: String,
        required: [true, 'Surname is required field'],
        validate: {
            validator: function(v) {
                return /^[a-zA-Z]{1,60}/.test(v);
            },
            message: '{VALUE} is not a valid surname. Only letters, length from 1 to 60'
        }
    },
    birthday: {
        type: Date,
        required: [true, 'Birthday is required field'],
    },
    sex: {
        type: String,
        required: [true, 'Sex is required field'],
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
        required: [true, 'Country code is required field'],
        validate: {
            validator: function(v) {
                return /^[A-Z]{3}$/.test(v);
            },
            message: '{VALUE} is not a valid country code. 3 uppercase letters'
        }
    },
    passportId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Passport'
    }
});

module.exports = mongoose.model('User', User);
