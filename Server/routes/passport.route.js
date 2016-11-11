'use strict';
const router = require('express').Router();

router.use((req, res, next) => {
    console.log('passport route');
    next();
});

router.get('/', (req, res) => {
    res.send('passport data');
});

module.exports = router;
