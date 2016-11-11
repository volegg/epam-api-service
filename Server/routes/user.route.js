'use strict';
const router = require('express').Router();

router.use((req, res, next) => {
    console.log('user route');
    next();
});

router.get('/', (req, res) => {
    res.send('I\'m user');
});

module.exports = router;
