const express = require('express');
const router = express.Router();
const { passportService, userService } = require('../services');
const moment = require('moment');
const { DATE_FORMAT } = require('../config');
const sex = require('../models/types/sex.type.js');
const countries = require('../constants/countries');
const { countryValidator, isBirthDayValid } = require('../shared/validators/user.validator');
const { isIssueDateValid, isExpiryDateValid } = require('../shared/validators/passport.validator');
const { isUserValid } =  require('../shared/validators/request.validator');

const { User } = require('../models');

router.post('/', (req, res, next) => {
  const { errors, isValid } = isUserValid(req.body);

  if (!isValid) {
    next(errors);
    return;
  }

  passportService.getPassportByidentificationNumber(req.body.identificationNumber)
    .then((passport) => {
      if (passport) {
        next({
          errors: {
            passport: `The user with passport's identification number ${req.body.identificationNumber} already exist.`
          }
        });
        return;
      }

      passportService.insertPassport(req.body)
        .then((passport) => {
          req.body._passport = passport._id;

          userService.insertUser(req.body)
            .then((user) => {
              const userResult = {
                id: user._id,
                name: user.name,
                surname: user.surname,
                birthday: user.birthday,
                sex: user.sex,
                phone: user.photo,
                country: user.country
              };

              res.status(200).json(userResult);
            });
        });
    })
});

router.get('/:id', (req, res, next) => {
  if (req.params.id) {
    userService.getUserById(req.params.id)
      .then((user) => {
        if (!user) {
          res.status(200).json({});
        }

        const userResult = {
          id: user._id,
          name: user.name,
          surname: user.surname,
          birthday: user.birthday,
          sex: user.sex,
          phone: user.photo,
          country: user.country
        };

        res.status(200).json(userResult);
      })
      .catch((err) => {
        next(err);
      });
  }
});

router.get('/', (req, res, next) => {
  userService.getUsers()
    .then((users) => {
      if (!users) {
        res.status(200).json({});
      }

      const usersResult = users.map((user) => {
        return {
          id: user._id,
          name: user.name,
          surname: user.surname,
          birthday: user.birthday,
          sex: user.sex,
          phone: user.photo,
          country: user.country
        };
      });

      res.status(200).json(usersResult);
    })
    .catch((err) => {
      next(err);
    });
});

router.put('/', (req, res, next) => {
  const { errors, isValid } = isUserValid(req.body);

  if (!isValid) {
    next(errors);
    return;
  }

  userService.updateUser(req.body.id)
    .then((user) => {
      user.name = req.body.name;
      user.surname = req.body.surname;
      user.birthday = req.body.birthday;
      user.sex = req.body.sex;
      user.photo = req.body.photo;
      user.country = req.body.country;

      user.save()
        .then((user) => {
          const userResult = {
            id: user._id,
            name: user.name,
            surname: user.surname,
            birthday: user.birthday,
            sex: user.sex,
            phone: user.photo,
            country: user.country
          };

          res.status(200).json(userResult);
        });
    })
    .catch((err) => {
      next({
        errors: {
          message: `The user with id \'${req.body.id}\' doesn't exist.`
        }
      });
    });
});

router.delete('/', (req, res, next) => {
  const { errors, isValid } = isUserValid(req.body);

  if (!isValid) {
    next(errors);
    return;
  }

  userService.deleteUser(req.body)
    .then((user) => {
      passportService.deletePassport({id: user._passport})
        .then(() => {
          res.status(200).json({
            message: 'The user deleted successfully'
          });
        }).catch(() => {});
    })
    .catch((err) => {
      next({
        errors: {
          message: `The user with id \'${req.body.id}\' doesn't exist.`
        }
      });
    });
});

module.exports = router;
