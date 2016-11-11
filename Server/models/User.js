'use strict';
const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    sex: {
        type: String,
        required: true //only male/female
    },
    photo: String,
    country: {
        type: String,
        required: true
    }
    // passportId: {
    //     type: mongoose.Schema.ObjectId,
    //     required: true,
    //     ref: 'Passport'
    // }
});

module.exports = mongoose.model('User', User);
