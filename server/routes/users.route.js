const express = require('express');
const router = express.Router();
const isUserEmpty = require('../shared/validators/user.validator');

router.get('/', (req, res, next) => {
  res.status(200);
});

router.post('/', (req, res, next) => {
  const { errors, isValid } = isUserEmpty(req.body);

  if (isValid) {
    res.status(200).json({
      user: req.body,
      type: 'POST'
    });
  } else {
    next(errors);
  }
});

router.get('/:id', (req, res, next) => {

});

module.exports = router;
