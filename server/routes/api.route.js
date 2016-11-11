const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'OK'
  });
});

router.get('/error', (req, res, next) => {
  next(new Error('Server error'));
});

module.exports = router;
