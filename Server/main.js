'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./router.js');
const app = express();


mongoose.connect('mongodb://localhost/expressdemo');

app.use(express.static('./'));
app.listen(8080, console.log('listen 8080'));
app.use(bodyParser.json());
app.use(router);
