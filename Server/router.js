'use strict';
const router = require('express').Router();
const user = require('./routes/user.route.js');
const passport = require('./routes/passport.route.js');

router.use('/user', user);
router.use('/passport', passport);

module.exports = router;
