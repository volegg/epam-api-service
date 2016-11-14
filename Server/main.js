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

module.exports = app;
