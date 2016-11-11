'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router.js');
const app = express();

app.use(express.static('./'));
app.listen(8080, console.log('listen 8080'));
app.use(bodyParser.json());
app.use(router);
