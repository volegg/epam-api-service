'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./router.js');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/expressdemo');

app.listen(3000, console.log('listen 3000'));
app.use(bodyParser.json());
app.use(router);
app.use((err, req, res, next) => {
    const errObj = { message: err.message };
    for (let prop in err.errors) {
        errObj[prop] = err.errors[prop].message;
    }
    res.status(500).send(errObj);
});

module.exports = app;
