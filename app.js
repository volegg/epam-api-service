const express = require('express');
const app = express();
const morgan = require('morgan');
const { PORT, PREFIX } = require('./server/config');
const { api, users } = require('./server/routes');

app.use(morgan('dev'))
  .use(`/${PREFIX}/`, api)
  .use(`/${PREFIX}/users`, users)
  .use((err, req, res, next) => {
    console.log(err);
    res.status(200).json({
      message: 'Error server'
    });
  });

app.listen(PORT, () => {
  console.log(`Server is starting and listening ${PORT}.`);
});
