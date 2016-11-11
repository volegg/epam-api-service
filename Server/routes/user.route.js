'use strict';
const router = require('express').Router();
const addUser = require('../user/add.js');
const getUser = require('../user/get.js');

router.use((req, res, next) => {
    console.log('user route');
    next();
});

router.get('/', getUser);

router.post('/', addUser);

module.exports = router;
