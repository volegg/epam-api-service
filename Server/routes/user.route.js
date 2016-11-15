'use strict';
const router = require('express').Router();
const addUser = require('../user/add.js');
const getUsers = require('../user/get.js');
const getUserById = require('../user/getById.js');
const changeUser = require('../user/put.js');
const deleteUser = require('../user/delete.js');

router.use((err, req, res, next) => {
    next();
});

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', addUser);
router.put('/:id', changeUser);
router.delete('/:id', deleteUser);

module.exports = router;
