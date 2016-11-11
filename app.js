const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PORT, PREFIX } = require('./server/config');
const { api, users } = require('./server/routes');


app.use(morgan('dev'))
  .use(cors())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(`/${PREFIX}/`, api)
  .use(`/${PREFIX}/users`, users)
  .use((err, req, res, next) => {
    res.status(200).json({
      errors: err
    });
  });

app.listen(PORT, () => {
  console.log(`Server is starting and listening ${PORT}.`);
});
