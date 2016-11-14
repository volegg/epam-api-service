'use strict';
const router = require('express').Router();
const getPassportById = require('../passport/getById.js');
const getPassports = require('../passport/get.js');
const changePassport = require('../passport/put.js');
const deleteUser = require('../user/delete.js');

router.use((req, res, next) => {
    next();
});

router.get('/', getPassports);
router.get('/:id', getPassportById);
router.put('/:id', changePassport);
router.delete('/:id', deleteUser); //??????

module.exports = router;
