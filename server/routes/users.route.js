const express = require('express');
const router = express.Router();
const { passportService, userService } = require('../services');
const moment = require('moment');
const { DATE_FORMAT } = require('../config');
const sex = require('../models/types/sex.type.js');
const countries = require('../constants/countries');
const { countryValidator, isBirthDayValid } = require('../shared/validators/user.validator');
const { isIssueDateValid, isExpiryDateValid } = require('../shared/validators/passport.validator');

router.post('/', (req, res, next) => {
  const identificationNumber = req.body.identificationNumber;

  passportService.getPassportByidentificationNumber(identificationNumber)
    .then((passport) => {
      if (!passport) {
        let userErrors = {
          type: 'ValidationError',
          message: 'user validation failed',
          errors: []
        };
        let passportErrors = {
          type: 'ValidationError',
          message: 'passport validation failed',
          errors: []
        };

        if (!countryValidator(req.body.country)) {
          userErrors.errors.push({
            path: 'country',
            message: 'BLR1 is not a valid. The country must be format alpha 3 (BLR|USA) or she is not exist.'
          });
        }

        if (isBirthDayValid(req.body.birthday)) {
          userErrors.errors.push({
            path: 'birthday',
            message: `${req.body.birthday} is not a valid.`
          });
        }

        if (isExpiryDateValid(req.body.issueDate)) {
          passportErrors.errors.push({
            path: 'issueDate',
            message: `${req.body.issueDate} is not a valid.`
          });
        }

        if (isIssueDateValid(req.body.expiryDate)) {
          passportErrors.errors.push({
              path: 'expiryDate',
              message: `${req.body.expiryDate} is not a valid.`
            });
        }

        if (passportErrors.errors.length) {
          next(passportErrors);
          return;
        }
        if (userErrors.errors.length) {
          next(userErrors);
          return;
        }

        passportService.insertPassport({
          passportNumber: req.body.passportNumber,
          identificationNumber: req.body.identificationNumber,
          issueDate: moment(req.body.issueDate, DATE_FORMAT, true).unix(),
          expiryDate: moment(req.body.expiryDate, DATE_FORMAT, true).unix(),
          authority: req.body.authority
        })
        .then((passport) => {
          userService.insertUser({
            name: req.body.name,
            surname: req.body.surname,
            birthday: moment(req.body.birthday, DATE_FORMAT, true).unix(),
            sex: sex[req.body.sex],
            photo: req.body.photo,
            country: req.body.country,
            _passport: passport._id
          })
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
            })
            .catch((err, passport) => {
              next(err);
            });
        })
        .catch((err) => {
          next(err);
        });
      } else {
        next(new Error('The user with this identification number already exist.'));
      }
    })
    .catch((err) => {
      next(err);
    });
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
  userService.updateUser(req.body.id)
    .then((user) => {
      user.name = req.body.name;
      user.surname = req.body.surname;
      user.birthday = moment(req.body.birthday, DATE_FORMAT, true).unix();
      user.sex = sex[req.body.sex];
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
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/', (req, res, next) => {

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
      next(err);
    });
});

module.exports = router;
