const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { PORT, PREFIX, DATABASE, DATABASE_TEST } = require('./server/config');
const { api, users, passports } = require('./server/routes');
const { isRequestValid } = require('./server/shared/validators/request.validator');

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV === 'test') {
  mongoose.connect(DATABASE_TEST);
} else {
  app.use(morgan('dev'));
  mongoose.connect(DATABASE);
}

app.use(cors())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(`/${PREFIX}/`, api)
  .use(`/${PREFIX}/users`, users)
  .use(`/${PREFIX}/passports`, passports)
  .use((err, req, res, next) => {
    let errors = {};

    errors.type = 'Error';
    errors.errors = err;

    res.status(200).json(errors);
  });

app.listen(PORT, () => {
  // console.log(`Server is starting and listening ${PORT}.`);
});

module.exports = app;
