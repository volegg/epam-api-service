'use strict';
const router = require('express').Router();
const addPassport = require('../passport/add.js');
const getPassport = require('../passport/get.js');
const changePassport = require('../passport/put.js');
const deletePassport = require('../passport/delete.js');

router.use((req, res, next) => {
    console.log('passport route');
    next();
});

router.get('/', getPassport);

router.post('/', addPassport);

router.put('/', changePassport);

router.delete('/', deletePassport);

module.exports = router;
