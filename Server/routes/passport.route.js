'use strict';
const router = require('express').Router();
const getPassportById = require('../passport/getById.js');
const getPassportByName = require('../passport/getByName.js');
const getPassports = require('../passport/get.js');
const changePassport = require('../passport/put.js');
const deleteUser = require('../user/delete.js');

router.use((err, req, res, next) => {
    next();
});

router.get('/', getPassports);
router.get('/:id', getPassportById);
router.put('/:id', changePassport);
router.get('/:name/:surname', getPassportByName);

module.exports = router;
