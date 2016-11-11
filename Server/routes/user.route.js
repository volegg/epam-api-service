'use strict';
const router = require('express').Router();
const addUser = require('../user/add.js');
const getUser = require('../user/get.js');
const changeUser = require('../user/put.js');
const deleteUser = require('../user/delete.js');

router.use((req, res, next) => {
    console.log('user route');
    next();
});

router.get('/', getUser);

router.post('/', addUser);

router.put('/', changeUser);

router.delete('/', deleteUser);

module.exports = router;
